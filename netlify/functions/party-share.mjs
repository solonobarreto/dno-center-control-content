import { getStore } from "@netlify/blobs";
import { createHash, randomUUID } from "node:crypto";

// =============================================================================
// Grupo Automático — convite online (puxar o backup de quem está online)
//
// Fluxo:
//   1. Quem monta a party (HOST) manda  POST {action:"invite", id, to}
//      -> o servidor cria um pedido "pending" na caixa de entrada do alvo.
//   2. O alvo recebe o pedido no próprio heartbeat (/api/presence devolve
//      "invites") e vê um aviso Aceitar / Recusar. Nada é enviado sem o aceite.
//   3. Se aceitar, o alvo manda  POST {action:"respond", id, reqId, accept:true, data}.
//   4. O HOST faz polling  GET ?req=..&to=..&id=..  e recebe o JSON uma única vez
//      (o servidor apaga o dado logo depois de entregar).
//   5. Conteúdo concluído: o HOST manda  POST {action:"complete", id, to, content, chars}.
//      Só funciona para quem aceitou um convite dele ("grant" g:<alvo>:<host>). O servidor
//      cria um aviso n:<alvo>:<id> que o alvo recebe no heartbeat (/api/presence devolve
//      "notices"), aplica na própria tabela e confirma com  POST {action:"ack"}.
//
// Identificação: o navegador de cada pessoa tem um id privado (localStorage).
// Ele NUNCA é exposto: para os outros usuários só aparece o "pub" (hash curto
// do id). Por isso, saber o pub de alguém não permite se passar por ela.
// =============================================================================

// --- Mantenha estes helpers idênticos aos de presence.mjs -------------------
const INVITE_TTL_MS = 120000; // um convite vale 2 min
const NOTICE_TTL_MS = 3600000; // aviso de conteúdo concluído vale 1 h (o alvo está online: chega em segundos)
const GRANT_TTL_MS = 21600000; // quem aceitou um convite pode receber avisos do líder por 6 h
const pubOf = (id) =>
  createHash("sha256").update("dn-origins-presence:" + id).digest("hex").slice(0, 20);
const cleanId = (id) =>
  typeof id === "string" ? id.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64) : "";
// ----------------------------------------------------------------------------

const MAX_BODY_BYTES = 2000000;   // ~2 MB (um backup normal tem dezenas de KB)
const MAX_CHARACTERS = 300;
const MAX_PENDING_PER_TARGET = 5; // evita spam de convites para uma pessoa só
const MAX_NOTICES_PER_TARGET = 20;
const MAX_NOTICE_CHARS = 20;
const PUB_RE = /^[a-f0-9]{20}$/;
const REQ_RE = /^[a-z0-9]{6,12}-[a-f0-9-]{36}$/;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" }
  });

// O id do pedido carrega o horário de criação (base36) — dá para saber se
// expirou olhando só a chave, sem precisar ler o conteúdo.
const reqTs = (reqId) => parseInt(String(reqId).split("-")[0], 36) || 0;
const isExpired = (reqId, now) => {
  const ts = reqTs(reqId);
  return !ts || now - ts > INVITE_TTL_MS;
};

async function readJson(store, key) {
  try { return JSON.parse((await store.get(key)) || "null"); } catch (_) { return null; }
}

// Remove pedidos/dados vencidos (só olha as chaves — barato).
async function sweep(store, now) {
  try {
    const { blobs } = await store.list();
    await Promise.all(
      blobs.map(async ({ key }) => {
        if (key.startsWith("n:")) {   // aviso de conteúdo concluído
          const ts = reqTs(key.split(":")[2]);
          if (!ts || now - ts > NOTICE_TTL_MS) await store.delete(key);
          return;
        }
        if (key.startsWith("g:")) {   // permissão dada ao aceitar um convite
          const g = await readJson(store, key);
          if (!g || !g.ts || now - Number(g.ts) > GRANT_TTL_MS) await store.delete(key);
          return;
        }
        const reqId = key.startsWith("r:") ? key.split(":")[2] : key.startsWith("d:") ? key.slice(2) : "";
        if (reqId && isExpired(reqId, now)) await store.delete(key);
      })
    );
  } catch (_) { /* limpeza é best-effort */ }
}

async function handleInvite(body, store, presence, now) {
  const id = cleanId(body.id);
  const to = String(body.to || "");
  if (!id || !PUB_RE.test(to)) return json({ error: "bad_request" }, 400);

  const fromPub = pubOf(id);
  if (to === fromPub) return json({ error: "self" }, 400);

  // Quem convida é identificado pelo nome que o próprio servidor já guardou na
  // presença (nickname da 1ª classe da tabela) — o cliente não escolhe o nome.
  const me = await readJson(presence, id);
  if (!me || !me.name) return json({ error: "no_name" }, 409);
  if (now - Number(me.ts) > 60000) return json({ error: "not_online" }, 409);

  await sweep(store, now);

  const prefix = `r:${to}:`;
  const { blobs } = await store.list({ prefix });
  let pending = 0;
  for (const { key } of blobs) {
    const reqId = key.slice(prefix.length);
    const rec = await readJson(store, key);
    if (rec && rec.status === "pending" && !isExpired(reqId, now)) {
      if (rec.fromPub === fromPub) return json({ reqId }); // já existe um convite seu pendente
      pending++;
    }
  }
  if (pending >= MAX_PENDING_PER_TARGET) return json({ error: "busy" }, 429);

  const reqId = `${now.toString(36)}-${randomUUID()}`;
  await store.set(
    `r:${to}:${reqId}`,
    JSON.stringify({ fromPub, fromName: me.name, fromClassId: me.classId || "", status: "pending" })
  );
  return json({ reqId });
}

async function handleRespond(body, store, now) {
  const id = cleanId(body.id);
  const reqId = String(body.reqId || "");
  if (!id || !REQ_RE.test(reqId)) return json({ error: "bad_request" }, 400);

  // A chave inclui o pub calculado a partir do id de quem responde: só o
  // destinatário do convite consegue responder a ele.
  const key = `r:${pubOf(id)}:${reqId}`;
  const rec = await readJson(store, key);
  if (!rec) return json({ error: "not_found" }, 404);
  if (isExpired(reqId, now)) {
    await store.delete(key);
    return json({ error: "expired" }, 410);
  }
  if (rec.status !== "pending") return json({ ok: true }); // resposta repetida: ignora

  if (body.accept === true) {
    const data = body.data;
    if (!data || typeof data !== "object" || !Array.isArray(data.characters) || data.characters.length > MAX_CHARACTERS) {
      return json({ error: "bad_data" }, 400);
    }
    // Primeiro o dado, depois o status: o host nunca vê "accepted" sem dado.
    await store.set(`d:${reqId}`, JSON.stringify(data));
    // Quem aceitou passa a poder receber o aviso de "conteúdo concluído" deste líder (e só dele).
    await store.set(`g:${pubOf(id)}:${rec.fromPub}`, JSON.stringify({ ts: now }));
    rec.status = "accepted";
  } else {
    rec.status = "declined";
  }
  await store.set(key, JSON.stringify(rec));
  return json({ ok: true });
}

async function handleComplete(body, store, presence, now) {
  const id = cleanId(body.id);
  const to = String(body.to || "");
  const content = typeof body.content === "string" ? body.content.slice(0, 120) : "";
  if (!id || !PUB_RE.test(to) || !content || !Array.isArray(body.chars)) return json({ error: "bad_request" }, 400);

  const chars = body.chars.slice(0, MAX_NOTICE_CHARS).map((c) => ({
    classId: typeof c?.classId === "string" ? c.classId.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 32) : "",
    nickname: typeof c?.nickname === "string" ? c.nickname.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 60) : ""
  })).filter((c) => c.classId);
  if (!chars.length) return json({ error: "bad_request" }, 400);

  // Só quem aceitou um convite deste líder recebe o aviso.
  const fromPub = pubOf(id);
  const grant = await readJson(store, `g:${to}:${fromPub}`);
  if (!grant || !grant.ts || now - Number(grant.ts) > GRANT_TTL_MS) return json({ error: "no_grant" }, 403);

  const me = await readJson(presence, id);
  const fromName = me && me.name ? String(me.name).slice(0, 30) : "";

  const prefix = `n:${to}:`;
  const { blobs } = await store.list({ prefix });
  if (blobs.length >= MAX_NOTICES_PER_TARGET) return json({ error: "busy" }, 429);

  const noticeId = `${now.toString(36)}-${randomUUID()}`;
  await store.set(`${prefix}${noticeId}`, JSON.stringify({ fromPub, fromName, content, chars }));
  return json({ ok: true });
}

async function handleAck(body, store) {
  const id = cleanId(body.id);
  const noticeId = String(body.noticeId || "");
  if (!id || !REQ_RE.test(noticeId)) return json({ error: "bad_request" }, 400);
  await store.delete(`n:${pubOf(id)}:${noticeId}`);   // a chave leva o pub de quem confirma: só o destinatário apaga
  return json({ ok: true });
}

async function handleCancel(body, store) {
  const id = cleanId(body.id);
  const to = String(body.to || "");
  const reqId = String(body.reqId || "");
  if (!id || !PUB_RE.test(to) || !REQ_RE.test(reqId)) return json({ error: "bad_request" }, 400);

  const key = `r:${to}:${reqId}`;
  const rec = await readJson(store, key);
  if (rec && rec.fromPub === pubOf(id)) {
    await store.delete(key);
    await store.delete(`d:${reqId}`);
  }
  return json({ ok: true });
}

async function handlePoll(url, store, now) {
  const reqId = url.searchParams.get("req") || "";
  const to = url.searchParams.get("to") || "";
  const id = cleanId(url.searchParams.get("id"));
  if (!id || !PUB_RE.test(to) || !REQ_RE.test(reqId)) return json({ error: "bad_request" }, 400);

  const key = `r:${to}:${reqId}`;
  const rec = await readJson(store, key);
  if (!rec) return json({ status: "expired" });
  if (rec.fromPub !== pubOf(id)) return json({ error: "forbidden" }, 403);
  if (isExpired(reqId, now)) {
    await store.delete(key);
    await store.delete(`d:${reqId}`);
    return json({ status: "expired" });
  }

  if (rec.status === "pending") return json({ status: "pending" });

  if (rec.status === "declined") {
    await store.delete(key);
    return json({ status: "declined" });
  }

  if (rec.status === "accepted") {
    const raw = await store.get(`d:${reqId}`);
    await store.delete(key);
    await store.delete(`d:${reqId}`); // entrega única
    if (!raw) return json({ status: "expired" });
    // "raw" já é JSON válido (foi validado antes de gravar): não precisa re-parsear.
    return new Response(`{"status":"accepted","data":${raw}}`, {
      headers: { "content-type": "application/json", "cache-control": "no-store" }
    });
  }

  return json({ status: "expired" });
}

export default async (req) => {
  const store = getStore({ name: "party-invites", consistency: "strong" });
  const now = Date.now();

  if (req.method === "GET") return handlePoll(new URL(req.url), store, now);
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const text = await req.text();
  if (text.length > MAX_BODY_BYTES) return json({ error: "too_large" }, 413);

  let body;
  try { body = JSON.parse(text); } catch (_) { return json({ error: "bad_json" }, 400); }
  if (!body || typeof body !== "object") return json({ error: "bad_json" }, 400);

  switch (body.action) {
    case "invite": {
      const presence = getStore({ name: "presence", consistency: "strong" });
      return handleInvite(body, store, presence, now);
    }
    case "respond": return handleRespond(body, store, now);
    case "cancel":  return handleCancel(body, store);
    case "complete": {
      const presence = getStore({ name: "presence", consistency: "strong" });
      return handleComplete(body, store, presence, now);
    }
    case "ack":     return handleAck(body, store);
    default:        return json({ error: "unknown_action" }, 400);
  }
};

export const config = { path: "/api/party-share" };

// Cloudflare Function: banco de dados da área FREEDOM (Comunidade).
// Guarda um registro por jogador: { nick, classes: [ { id, classId, set: {r,l}|null, weapon: {r,l}|null } ], updated }
//   (a mesma classe pode aparecer várias vezes, cada uma com seu id; o formato antigo { <classId>: {set,weapon} } ainda é aceito e convertido)
//   r = raridade ("epic" | "unique" | "legend"), l = nível (80 | 90)
//
// Rota: /api/freedom   (todas as chamadas exigem o cabeçalho x-freedom-key com a senha)
//   GET  -> { players: [...] }
//   PUT  -> body { player, oldNick? } (cria/atualiza; se oldNick vier e for diferente, renomeia)
//   DELETE -> body { nick } (remove a pessoa do database)
//   POST -> body { action: "discord", ts, group, members: [{cls, nick, legend?}], hook: 1|2 } (posta a escalação no Discord; precisa de DISCORD_WEBHOOK_URL)
//
// Senha: variável de ambiente FREEDOM_PASSWORD (painel/wrangler); se não existir, usa 2846.

const DEFAULT_PASSWORD = "2846";

// ---- Discord: emojis de classe ----
// O ID do Discord de cada pessoa agora é cadastrado no próprio database (campo ao lado do nick) e vem no post.
// Aqui ficam só os emojis das classes (classId -> "<:Nome:ID>"). Sem emoji cadastrado, sai ":NomeDaClasse:" em texto.
const EMOJI_IDS = {
  barbarian: "<:Barbarian:1424609685360738314>",
  destroyer: "<:Destroyer:1424611079950172264>",
  gladiator: "<:Gladiator:1424611093959020564>",
  moonlord: "<:Moonlord:1424611100842004490>",
  darkavenger: "<:DarkAvenger:1424610973993537536>",
  tempest: "<:Tempest:1424612183739863071>",
  sentinel: "<:Sentinel:1424611128054513684>",
  sniper: "<:Sniper:1424611130483015830>",
  obscuria: "<:Obscuria:1424611102918049832>",
  ilumia: "<:Ilumia:1424611096463015946>",
  glaciana: "<:Glaciana:1424611092549865573>",
  saleana: "<:Saleana:1442563843128688650>",
  shootingstar: "<:ShootingStar:1424611120487993384>",
  gearmaster: "<:GearMaster:1424611091299696783>",
  adept: "<:Adept:1424609767032361010>",
  physician: "<:Physician:1424611106936193065>",
  crusader: "<:Crusader:1424609650065674291>",
  guardian: "<:Guardian:1424611095200530494>",
  inquisitor: "<:Inquisitor:1424611097641619468>",
  saint: "<:Saint:1424611122828415057>",
  spiritdancer: "<:SpiritDancer:1424612618835857418>",
  bladedancer: "<:BladeDancer:1424609718399271034>",
  souleater: "<:SoulEater:1424611117770215524>",
  darksummoner: "<:DarkSummoner:1424611077764943973>",
  abysswalker: "<:AbyssWalker:1424609580335501352>",
  raven: "<:Raven:1424611109184213072>",
  ripper: "<:Ripper:1424612022783447110>",
  valkyrie: "<:Valkyrie:1424611134744301588>",
  flurry: "<:Flurry:1424611082877669397>",
  ruina: "<:Ruina:1424611113022132285>",
  defensio: "<:Defensio:1424612387931291689>",
  // faltam (emoji não encontrado no servidor): silverhunter, windwalker, lightfury
};
const RARITIES = ["epic", "unique", "legend"];
const LEVELS = [80, 90];

// ---- Armazenamento em cima do D1 (mesma tabela kv usada por presence/party-share) ----
let ready = null;
async function ensure(db) {
  if (!ready) {
    ready = db
      .prepare("CREATE TABLE IF NOT EXISTS kv (s TEXT NOT NULL, k TEXT NOT NULL, v TEXT NOT NULL, PRIMARY KEY (s, k))")
      .run()
      .catch((e) => { ready = null; throw e; });
  }
  return ready;
}

function getStore(env, name) {
  const db = env.DB;
  if (!db) throw new Error("Binding D1 'DB' não configurado (veja wrangler.toml).");
  return {
    async get(key) {
      await ensure(db);
      const r = await db.prepare("SELECT v FROM kv WHERE s = ?1 AND k = ?2").bind(name, key).first();
      return r ? r.v : null;
    },
    async set(key, value) {
      await ensure(db);
      await db.prepare("INSERT INTO kv (s, k, v) VALUES (?1, ?2, ?3) ON CONFLICT (s, k) DO UPDATE SET v = excluded.v")
        .bind(name, key, String(value)).run();
    },
    async delete(key) {
      await ensure(db);
      await db.prepare("DELETE FROM kv WHERE s = ?1 AND k = ?2").bind(name, key).run();
    },
    async list(prefix) {
      await ensure(db);
      const { results } = await db
        .prepare("SELECT k, v FROM kv WHERE s = ?1 AND substr(k, 1, length(?2)) = ?2")
        .bind(name, prefix || "").all();
      return results.map((r) => ({ key: r.k, value: r.v }));
    }
  };
}

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
  });

function cleanGear(g) {
  if (!g || typeof g !== "object") return null;
  const r = String(g.r);
  const l = Number(g.l);
  return RARITIES.includes(r) && LEVELS.includes(l) ? { r, l } : null;
}

const MAX_ENTRIES = 80;

function cleanPlayer(p) {
  if (!p || typeof p !== "object") return null;
  const nick = String(p.nick || "").trim().replace(/\s+/g, " ");
  if (!nick || nick.length > 20) return null;

  // Aceita lista (novo) ou objeto { classId: {set,weapon} } (antigo).
  let list = [];
  if (Array.isArray(p.classes)) list = p.classes;
  else if (p.classes && typeof p.classes === "object") {
    list = Object.keys(p.classes).map((id) => ({ id, classId: id, ...(p.classes[id] || {}) }));
  }
  const classes = [];
  const seen = new Set();
  for (const e of list) {
    if (!e || typeof e !== "object") continue;
    const classId = String(e.classId || "");
    if (!/^[a-z]{3,24}$/.test(classId)) continue;
    const set = cleanGear(e.set);
    const weapon = cleanGear(e.weapon);
    if (!set && !weapon) continue;
    let id = String(e.id || classId).replace(/[^a-zA-Z0-9]/g, "").slice(0, 24) || classId;
    while (seen.has(id)) id += "x";
    seen.add(id);
    classes.push({ id, classId, set, weapon });
    if (classes.length >= MAX_ENTRIES) break;
  }
  const discord = /^\d{5,25}$/.test(String(p.discord || "").trim()) ? String(p.discord).trim() : "";
  return { nick, discord, classes, updated: Date.now() };
}

const pkey = (nick) => "p:" + String(nick).trim().toLowerCase();

export async function onRequest(context) {
  const { request, env } = context;
  const password = env.FREEDOM_PASSWORD || DEFAULT_PASSWORD;
  if (request.headers.get("x-freedom-key") !== password) return json({ error: "unauthorized" }, 401);

  const store = getStore(env, "freedom");

  if (request.method === "GET") {
    const rows = await store.list("p:");
    const players = [];
    for (const row of rows) {
      try {
        const p = JSON.parse(row.value);
        if (p && p.nick) players.push(p);
      } catch (_) { /* registro corrompido: ignora */ }
    }
    return json({ players });
  }

  if (request.method === "PUT") {
    const text = await request.text();
    if (text.length > 20000) return json({ error: "too_large" }, 413);
    let body;
    try { body = JSON.parse(text); } catch (_) { return json({ error: "bad_json" }, 400); }
    const player = cleanPlayer(body && body.player);
    if (!player) return json({ error: "bad_player" }, 400);

    const old = body && typeof body.oldNick === "string" ? body.oldNick.trim() : "";
    if (old && old.toLowerCase() !== player.nick.toLowerCase()) {
      // Renomear não pode sobrescrever o registro de outra pessoa.
      if (await store.get(pkey(player.nick))) return json({ error: "nick_taken" }, 409);
      await store.delete(pkey(old));
    }
    await store.set(pkey(player.nick), JSON.stringify(player));
    return json({ ok: true, player });
  }

  // Envia a escalação de um grupo para o Discord.
  // Webhooks: variáveis DISCORD_WEBHOOK_URL (canal 1) e DISCORD_WEBHOOK_URL_2 (canal 2) (secrets no painel/wrangler; nunca vai pro navegador).
  if (request.method === "POST") {
    const text = await request.text();
    if (text.length > 8000) return json({ error: "too_large" }, 413);
    let body;
    try { body = JSON.parse(text); } catch (_) { return json({ error: "bad_json" }, 400); }
    if (!body || body.action !== "discord") return json({ error: "bad_action" }, 400);

    // hook 1 (padrão) -> DISCORD_WEBHOOK_URL · hook 2 -> DISCORD_WEBHOOK_URL_2
    const which = Number(body.hook) === 2 ? 2 : 1;
    const hook = which === 2 ? env.DISCORD_WEBHOOK_URL_2 : env.DISCORD_WEBHOOK_URL;
    if (!hook) return json({ error: "webhook_missing" }, 503);

    const ts = Number(body.ts);
    if (!Number.isInteger(ts) || ts < 1e9 || ts > 4e9) return json({ error: "bad_ts" }, 400);
    // limpa o texto (uma linha, sem markdown/menções) e limita o tamanho
    const clean = (v, n) => String(v == null ? "" : v).replace(/[\r\n]+/g, " ").replace(/[\\*_~`|>@]/g, "\\$&").trim().slice(0, n);
    const group = clean(body.group, 40);
    const members = (Array.isArray(body.members) ? body.members : []).slice(0, 8)
      .map((m) => ({
        classId: /^[a-z]{3,24}$/.test(String(m && m.classId)) ? String(m.classId) : "",
        discord: /^\d{5,25}$/.test(String((m && m.discord) || "").trim()) ? String(m.discord).trim() : "",
        cls: String((m && m.cls) || "").replace(/[^A-Za-z0-9]/g, "").slice(0, 30),   // emoji: sem espaços (Dark Avenger -> DarkAvenger)
        nick: clean(m && m.nick, 20),
        legend: !!(m && m.legend === true)
      }))
      .filter((m) => m.cls);
    if (!group || !members.length) return json({ error: "bad_group" }, 400);

    const pingIds = [];
    const lines = [
      `**${group}**`,
      `<t:${ts}:d> at <t:${ts}:t> ➜ <t:${ts}:R>`,
      "",
      ...members.map((m) => {
        const emoji = EMOJI_IDS[m.classId] || `:${m.cls}:`;
        let who = "";
        if (m.discord) { who = ` <@${m.discord}>`; pingIds.push(m.discord); }   // marca de verdade (ID cadastrado)
        else if (m.nick) who = ` @${m.nick}`;                                     // sem ID: só texto, sem notificação
        // item lendário: classe + 5 espaços + triângulo vermelho + nick
        return m.legend ? `${emoji}     :small_red_triangle:${who}` : emoji + who;
      })
    ];
    let res;
    try {
      res = await fetch(hook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content: lines.join("\n"), allowed_mentions: { parse: [], users: pingIds } })
      });
    } catch (_) { return json({ error: "discord_unreachable" }, 502); }
    if (!res.ok) return json({ error: "discord_failed", status: res.status }, 502);
    return json({ ok: true });
  }

  // Remove uma pessoa do database da comunidade.
  if (request.method === "DELETE") {
    const text = await request.text();
    let body;
    try { body = JSON.parse(text); } catch (_) { return json({ error: "bad_json" }, 400); }
    const nick = String((body && body.nick) || "").trim();
    if (!nick || nick.length > 20) return json({ error: "bad_nick" }, 400);
    await store.delete(pkey(nick));
    return json({ ok: true });
  }

  return json({ error: "method_not_allowed" }, 405);
}

import { getStore } from "@netlify/blobs";
import { createHash } from "node:crypto";

// Uma sessão é considerada "online" se mandou heartbeat nos últimos 25s.
const STALE_MS = 25000;

const KNOWN_REGIONS = new Set([
  "southAmerica", "northAmerica", "europe", "asia", "africa", "oceania", "unknown"
]);

// Códigos de país (ISO-3166 alpha-2) aceitos como está; qualquer coisa fora
// do formato cai em "XX" (agrupado como "outros" dentro da região).
function sanitizeCountry(country) {
  if (typeof country === "string" && /^[A-Z]{2}$/.test(country)) return country;
  return "XX";
}

// País (ISO-3166 alpha-2) -> região/continente, com o mesmo agrupamento que
// o front-end usava antes (America Central + Caribe entram em "northAmerica",
// igual ao detectRegion() baseado em timezone que existia no app.js).
const COUNTRY_TO_REGION = {
  // América do Sul
  AR: "southAmerica", BO: "southAmerica", BR: "southAmerica", CL: "southAmerica",
  CO: "southAmerica", EC: "southAmerica", FK: "southAmerica", GF: "southAmerica",
  GY: "southAmerica", PE: "southAmerica", PY: "southAmerica", SR: "southAmerica",
  UY: "southAmerica", VE: "southAmerica",
  // América do Norte, Central e Caribe
  US: "northAmerica", CA: "northAmerica", MX: "northAmerica", GT: "northAmerica",
  BZ: "northAmerica", SV: "northAmerica", HN: "northAmerica", NI: "northAmerica",
  CR: "northAmerica", PA: "northAmerica", CU: "northAmerica", DO: "northAmerica",
  HT: "northAmerica", JM: "northAmerica", PR: "northAmerica", TT: "northAmerica",
  BS: "northAmerica", BB: "northAmerica", GP: "northAmerica", MQ: "northAmerica",
  // Europa
  PT: "europe", ES: "europe", FR: "europe", DE: "europe", GB: "europe", IT: "europe",
  RU: "europe", NL: "europe", BE: "europe", AT: "europe", PL: "europe", GR: "europe",
  RO: "europe", HU: "europe", CZ: "europe", SE: "europe", NO: "europe", DK: "europe",
  FI: "europe", IE: "europe", CH: "europe", UA: "europe", TR: "europe", BG: "europe",
  RS: "europe", HR: "europe", SK: "europe", SI: "europe", LT: "europe", LV: "europe",
  EE: "europe", IS: "europe", LU: "europe", MT: "europe", CY: "europe", BA: "europe",
  MK: "europe", AL: "europe", MD: "europe", BY: "europe",
  // Ásia
  PH: "asia", ID: "asia", CN: "asia", JP: "asia", KR: "asia", TH: "asia", IN: "asia",
  SG: "asia", MY: "asia", VN: "asia", AE: "asia", SA: "asia", PK: "asia", BD: "asia",
  TW: "asia", HK: "asia", MM: "asia", KH: "asia", LA: "asia", IL: "asia", IQ: "asia",
  IR: "asia", JO: "asia", KW: "asia", QA: "asia", OM: "asia", LB: "asia", NP: "asia",
  LK: "asia", KZ: "asia", UZ: "asia", MN: "asia", BN: "asia", MO: "asia", AZ: "asia",
  GE: "asia", AM: "asia",
  // África
  NG: "africa", EG: "africa", ZA: "africa", KE: "africa", MA: "africa", GH: "africa",
  DZ: "africa", TN: "africa", AO: "africa", MZ: "africa", ET: "africa", TZ: "africa",
  UG: "africa", CI: "africa", CM: "africa", SN: "africa", ZW: "africa", ZM: "africa",
  NA: "africa", BW: "africa", ML: "africa", LY: "africa", SD: "africa", RW: "africa",
  // Oceania
  AU: "oceania", NZ: "oceania", FJ: "oceania", GU: "oceania", PG: "oceania",
  NC: "oceania", WS: "oceania", VU: "oceania"
};

// Deriva a região a partir do código de país detectado pela Netlify via IP
// (context.geo). Substitui o antigo fluxo em que o front-end mandava
// region/country no body — o app.js parou de enviar isso, então essa é a
// única fonte de verdade agora.
function regionFromCountry(country) {
  return COUNTRY_TO_REGION[country] || "unknown";
}

// Dia em UTC ("YYYY-MM-DD") — usado para deduplicar 1 acesso por dispositivo
// por dia, igual ao fallback local do front, só que de verdade compartilhado
// entre todos os visitantes.
function todayKey(now) {
  return new Date(now).toISOString().slice(0, 10);
}

// --- Convites do Grupo Automático -------------------------------------------
// Mantenha estes helpers idênticos aos de party-share.mjs.
const INVITE_TTL_MS = 120000;
const NOTICE_TTL_MS = 3600000;   // igual ao de party-share.mjs
const pubOf = (id) =>
  createHash("sha256").update("dn-origins-presence:" + id).digest("hex").slice(0, 20);

// Nome exibido para os outros = nickname da 1ª classe da tabela do usuário
// (enviado pelo front-end no heartbeat). Só tira caracteres de controle e limita o tamanho.
function sanitizeName(name) {
  if (typeof name !== "string") return "";
  return name.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 30);
}
function sanitizeClassId(classId) {
  return typeof classId === "string" && /^[A-Za-z0-9_-]{1,32}$/.test(classId) ? classId : "";
}

// Convites pendentes endereçados a este usuário (entregues no próprio heartbeat).
async function readInbox(pub, now) {
  const store = getStore({ name: "party-invites", consistency: "strong" });
  const prefix = `r:${pub}:`;
  const { blobs } = await store.list({ prefix });
  const out = [];
  await Promise.all(
    blobs.map(async ({ key }) => {
      const reqId = key.slice(prefix.length);
      const ts = parseInt(reqId.split("-")[0], 36) || 0;
      if (!ts || now - ts > INVITE_TTL_MS) {
        await store.delete(key);
        await store.delete(`d:${reqId}`);
        return;
      }
      let rec = null;
      try { rec = JSON.parse((await store.get(key)) || "null"); } catch (_) { rec = null; }
      if (rec && rec.status === "pending") {
        out.push({ reqId, fromName: rec.fromName || "", fromClassId: rec.fromClassId || "", ts });
      }
    })
  );
  return out.sort((a, b) => a.ts - b.ts);
}

// Avisos de "conteúdo concluído" enviados pelo líder da party (party-share.mjs, action "complete").
// Ficam na caixa de entrada até o destinatário confirmar (action "ack") ou vencerem.
async function readNotices(pub, now) {
  const store = getStore({ name: "party-invites", consistency: "strong" });
  const prefix = `n:${pub}:`;
  const { blobs } = await store.list({ prefix });
  const out = [];
  await Promise.all(
    blobs.map(async ({ key }) => {
      const noticeId = key.slice(prefix.length);
      const ts = parseInt(noticeId.split("-")[0], 36) || 0;
      if (!ts || now - ts > NOTICE_TTL_MS) { await store.delete(key); return; }
      let rec = null;
      try { rec = JSON.parse((await store.get(key)) || "null"); } catch (_) { rec = null; }
      if (rec && Array.isArray(rec.chars)) {
        out.push({ noticeId, fromName: rec.fromName || "", content: rec.content || "", chars: rec.chars, ts });
      }
    })
  );
  return out.sort((a, b) => a.ts - b.ts);
}
// -----------------------------------------------------------------------------

export default async (req, context) => {
  const presenceStore = getStore({ name: "presence", consistency: "strong" });
  const statsStore = getStore({ name: "presence-stats", consistency: "strong" });
  const now = Date.now();
  const today = todayKey(now);

  let body = {};
  if (req.method === "POST") {
    try { body = await req.json(); } catch (_) {}
  }

  const id = typeof body.id === "string" ? body.id.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64) : "";

  // Geolocalização vem do context.geo da Netlify (resolvido a partir do IP
  // real da requisição), não mais do que o cliente manda no body — o
  // front-end (app.js) só envia { id } / { id, leave } hoje em dia.
  const country = sanitizeCountry(context?.geo?.country?.code);
  const region = regionFromCountry(country);

  if (id) {
    if (body.leave) {
      await presenceStore.delete(id);
    } else {
      await presenceStore.set(id, JSON.stringify({
        ts: now, region, country,
        name: sanitizeName(body.name),
        classId: sanitizeClassId(body.classId),
        pub: pubOf(id)
      }));

      // Acessos totais + média diária + região/país: conta no máximo 1 acesso
      // por dispositivo por dia (dedupe via chave própria), então soma de
      // verdade entre TODOS os visitantes — não só o navegador de quem olha.
      const visitKey = `visit:${id}:${today}`;
      const alreadyVisitedToday = await statsStore.get(visitKey);
      if (!alreadyVisitedToday) {
        await statsStore.set(visitKey, "1");

        let totals = null;
        try { totals = JSON.parse((await statsStore.get("totals")) || "null"); } catch (_) { totals = null; }
        if (!totals || typeof totals !== "object") totals = { total: 0, days: {}, regions: {} };
        totals.days = totals.days || {};
        totals.regions = totals.regions || {};

        totals.total = (totals.total || 0) + 1;
        totals.days[today] = (totals.days[today] || 0) + 1;

        const regionEntry = totals.regions[region] || { total: 0, countries: {} };
        regionEntry.total = (regionEntry.total || 0) + 1;
        regionEntry.countries = regionEntry.countries || {};
        regionEntry.countries[country] = (regionEntry.countries[country] || 0) + 1;
        totals.regions[region] = regionEntry;

        await statsStore.set("totals", JSON.stringify(totals));
      }
    }
  }

  // Varre as sessões de presença: descarta as que não mandam heartbeat há
  // mais de STALE_MS e agrega quantas estão online, por região e por país
  // dentro de cada região (isso é o que o painel "Pessoas online por região"
  // mostra, incluindo o detalhamento por país ao expandir uma região).
  const { blobs } = await presenceStore.list();
  const regionCounts = {};
  const countryCounts = {}; // { region: { countryCode: count } }
  let aliveCount = 0;
  const onlineUsers = []; // { pub, name, classId } — só quem tem personagem na tabela

  await Promise.all(
    blobs.map(async ({ key }) => {
      let raw = null;
      try { raw = JSON.parse((await presenceStore.get(key)) || "null"); } catch (_) { raw = null; }

      // Compatível com o formato antigo (valor era só o timestamp em texto,
      // sem região/país) — entradas assim caem em "unknown"/"XX" até expirarem.
      const isObj = raw && typeof raw === "object";
      const ts = isObj ? Number(raw.ts) : Number(raw);
      const region = isObj && KNOWN_REGIONS.has(raw.region) ? raw.region : "unknown";
      const country = isObj ? sanitizeCountry(raw.country) : "XX";

      if (!ts || now - ts > STALE_MS) {
        await presenceStore.delete(key);
        return;
      }
      aliveCount++;
      if (isObj && raw.pub && raw.name) {
        onlineUsers.push({ pub: raw.pub, name: raw.name, classId: raw.classId || "" });
      }
      regionCounts[region] = (regionCounts[region] || 0) + 1;
      countryCounts[region] = countryCounts[region] || {};
      countryCounts[region][country] = (countryCounts[region][country] || 0) + 1;
    })
  );

  const count = Math.max(1, aliveCount);

  // Lista de online + caixa de convites só vão para quem mandou o heartbeat
  // (POST com id). O GET anônimo do painel de regiões não recebe nomes.
  const myPub = id && !body.leave ? pubOf(id) : "";
  const users = myPub
    ? onlineUsers
        .filter((u) => u.pub !== myPub)
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 100)
    : [];
  let invites = [];
  let notices = [];
  if (myPub) {
    try { invites = await readInbox(myPub, now); } catch (_) { invites = []; } // nunca derruba o heartbeat
    try { notices = await readNotices(myPub, now); } catch (_) { notices = []; }
  }

  // Estatísticas globais: acessos totais (todos os visitantes, desde sempre),
  // a média diária a partir de quantos dias distintos já tiveram acesso, e o
  // detalhamento por região/país usado pelo painel "Total de visitantes".
  let totals = null;
  try { totals = JSON.parse((await statsStore.get("totals")) || "null"); } catch (_) { totals = null; }
  const total = (totals && totals.total) || count; // nunca menos que quem está online agora
  const dayCount = totals && totals.days ? Math.max(1, Object.keys(totals.days).length) : 1;
  const dailyAverage = total / dayCount;

  const totalRegionCounts = {};
  const totalCountryCounts = {};
  if (totals && totals.regions && typeof totals.regions === "object") {
    for (const [region, entry] of Object.entries(totals.regions)) {
      if (!entry || typeof entry !== "object") continue;
      totalRegionCounts[region] = entry.total || 0;
      totalCountryCounts[region] = entry.countries || {};
    }
  }

  // Acessos antigos (de antes de existir o rastreamento por região/país nesta
  // function) engordam "total" mas nunca entraram em nenhuma região — sem
  // isso, a soma das regiões ficaria menor que o total exibido no topo, o
  // que parecia "sumir" visitas ao abrir o detalhamento. Jogamos a diferença
  // em "unknown" para a soma bater sempre com o total, deixando claro que
  // esses acessos só não têm região conhecida (em vez de terem sumido).
  const knownRegionSum = Object.values(totalRegionCounts).reduce((a, b) => a + b, 0);
  const untracked = total - knownRegionSum;
  if (untracked > 0) {
    totalRegionCounts.unknown = (totalRegionCounts.unknown || 0) + untracked;
    totalCountryCounts.unknown = totalCountryCounts.unknown || {};
    totalCountryCounts.unknown.XX = (totalCountryCounts.unknown.XX || 0) + untracked;
  }

  return new Response(JSON.stringify({
    count,
    regions: regionCounts,
    countries: countryCounts,
    users,
    invites,
    notices,
    stats: { total, dailyAverage, regions: totalRegionCounts, countries: totalCountryCounts }
  }), {
    headers: { "content-type": "application/json", "cache-control": "no-store" }
  });
};

export const config = { path: "/api/presence" };

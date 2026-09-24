import { getStore } from "@netlify/blobs";

// Uma sessão é considerada "online" se mandou heartbeat nos últimos 25s.
const STALE_MS = 25000;

const KNOWN_REGIONS = new Set([
  "southAmerica", "northAmerica", "europe", "asia", "africa", "oceania", "unknown"
]);

// País (ISO-3166 alpha-2) -> região/continente usada nos painéis. Agrupamento
// segue o mesmo critério já usado no front-end (América Central e Caribe
// dentro de "northAmerica"; Rússia e Turquia dentro de "europe").
const COUNTRY_REGION = {
  // South America
  AR: "southAmerica", BO: "southAmerica", BR: "southAmerica", CL: "southAmerica",
  CO: "southAmerica", EC: "southAmerica", FK: "southAmerica", GF: "southAmerica",
  GY: "southAmerica", PE: "southAmerica", PY: "southAmerica", SR: "southAmerica",
  UY: "southAmerica", VE: "southAmerica",
  // North, Central America & Caribbean
  US: "northAmerica", CA: "northAmerica", MX: "northAmerica", GT: "northAmerica",
  BZ: "northAmerica", SV: "northAmerica", HN: "northAmerica", NI: "northAmerica",
  CR: "northAmerica", PA: "northAmerica", CU: "northAmerica", DO: "northAmerica",
  HT: "northAmerica", JM: "northAmerica", PR: "northAmerica", BS: "northAmerica",
  BB: "northAmerica", TT: "northAmerica", AG: "northAmerica", DM: "northAmerica",
  GD: "northAmerica", KN: "northAmerica", LC: "northAmerica", VC: "northAmerica",
  TC: "northAmerica", VG: "northAmerica", VI: "northAmerica", AI: "northAmerica",
  AW: "northAmerica", BM: "northAmerica", CW: "northAmerica", SX: "northAmerica",
  BQ: "northAmerica", GP: "northAmerica", MQ: "northAmerica", MF: "northAmerica",
  BL: "northAmerica", KY: "northAmerica", MS: "northAmerica",
  // Europe (incl. Rússia e Turquia, mesmo critério do mapa de fusos antigo)
  AD: "europe", AL: "europe", AT: "europe", BA: "europe", BE: "europe", BG: "europe",
  BY: "europe", CH: "europe", CY: "europe", CZ: "europe", DE: "europe", DK: "europe",
  EE: "europe", ES: "europe", FI: "europe", FO: "europe", FR: "europe", GB: "europe",
  GG: "europe", GI: "europe", GR: "europe", HR: "europe", HU: "europe", IE: "europe",
  IM: "europe", IS: "europe", IT: "europe", JE: "europe", LI: "europe", LT: "europe",
  LU: "europe", LV: "europe", MC: "europe", MD: "europe", ME: "europe", MK: "europe",
  MT: "europe", NL: "europe", NO: "europe", PL: "europe", PT: "europe", RO: "europe",
  RS: "europe", RU: "europe", SE: "europe", SI: "europe", SJ: "europe", SK: "europe",
  SM: "europe", TR: "europe", UA: "europe", VA: "europe", XK: "europe",
  // Asia
  AE: "asia", AF: "asia", AM: "asia", AZ: "asia", BD: "asia", BH: "asia", BN: "asia",
  BT: "asia", CN: "asia", GE: "asia", HK: "asia", ID: "asia", IL: "asia", IN: "asia",
  IQ: "asia", IR: "asia", JO: "asia", JP: "asia", KG: "asia", KH: "asia", KP: "asia",
  KR: "asia", KW: "asia", KZ: "asia", LA: "asia", LB: "asia", LK: "asia", MM: "asia",
  MN: "asia", MO: "asia", MV: "asia", MY: "asia", NP: "asia", OM: "asia", PH: "asia",
  PK: "asia", PS: "asia", QA: "asia", SA: "asia", SG: "asia", SY: "asia", TH: "asia",
  TJ: "asia", TL: "asia", TM: "asia", TW: "asia", UZ: "asia", VN: "asia", YE: "asia",
  // Africa
  DZ: "africa", AO: "africa", BJ: "africa", BW: "africa", BF: "africa", BI: "africa",
  CM: "africa", CV: "africa", CF: "africa", TD: "africa", KM: "africa", CG: "africa",
  CD: "africa", CI: "africa", DJ: "africa", EG: "africa", GQ: "africa", ER: "africa",
  SZ: "africa", ET: "africa", GA: "africa", GM: "africa", GH: "africa", GN: "africa",
  GW: "africa", KE: "africa", LS: "africa", LR: "africa", LY: "africa", MG: "africa",
  MW: "africa", ML: "africa", MR: "africa", MU: "africa", YT: "africa", MA: "africa",
  MZ: "africa", NA: "africa", NE: "africa", NG: "africa", RE: "africa", RW: "africa",
  SH: "africa", ST: "africa", SN: "africa", SC: "africa", SL: "africa", SO: "africa",
  ZA: "africa", SS: "africa", SD: "africa", TZ: "africa", TG: "africa", TN: "africa",
  UG: "africa", EH: "africa", ZM: "africa", ZW: "africa",
  // Oceania
  AU: "oceania", NZ: "oceania", FJ: "oceania", PG: "oceania", SB: "oceania",
  VU: "oceania", NC: "oceania", PF: "oceania", WS: "oceania", TO: "oceania",
  KI: "oceania", FM: "oceania", MH: "oceania", NR: "oceania", PW: "oceania",
  TV: "oceania", GU: "oceania", MP: "oceania", AS: "oceania", CK: "oceania",
  NU: "oceania", TK: "oceania", WF: "oceania"
};

// Códigos de país (ISO-3166 alpha-2) aceitos como está; qualquer coisa fora
// do formato cai em "XX" (agrupado como "outros" dentro da região).
function sanitizeCountry(country) {
  if (typeof country === "string" && /^[A-Z]{2}$/.test(country)) return country;
  return "XX";
}

function regionForCountry(country) {
  return COUNTRY_REGION[country] || "unknown";
}

// Dia em UTC ("YYYY-MM-DD") — usado para deduplicar 1 acesso por dispositivo
// por dia, igual ao fallback local do front, só que de verdade compartilhado
// entre todos os visitantes.
function todayKey(now) {
  return new Date(now).toISOString().slice(0, 10);
}

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

  // País real do visitante, calculado pela Netlify a partir do IP da
  // requisição (não depende do que o navegador/front-end informa, então não
  // dá pra forjar mandando outro valor no corpo da requisição).
  const geoCountry = context && context.geo && context.geo.country && typeof context.geo.country.code === "string"
    ? context.geo.country.code.toUpperCase()
    : null;
  const country = sanitizeCountry(geoCountry);
  const region = regionForCountry(country);

  if (id) {
    if (body.leave) {
      await presenceStore.delete(id);
    } else {
      await presenceStore.set(id, JSON.stringify({ ts: now, region, country }));

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
      regionCounts[region] = (regionCounts[region] || 0) + 1;
      countryCounts[region] = countryCounts[region] || {};
      countryCounts[region][country] = (countryCounts[region][country] || 0) + 1;
    })
  );

  const count = Math.max(1, aliveCount);

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
    stats: { total, dailyAverage, regions: totalRegionCounts, countries: totalCountryCounts }
  }), {
    headers: { "content-type": "application/json", "cache-control": "no-store" }
  });
};

export const config = { path: "/api/presence" };

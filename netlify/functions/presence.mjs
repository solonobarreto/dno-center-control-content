import { getStore } from "@netlify/blobs";

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

// Dia em UTC ("YYYY-MM-DD") — usado para deduplicar 1 acesso por dispositivo
// por dia, igual ao fallback local do front, só que de verdade compartilhado
// entre todos os visitantes.
function todayKey(now) {
  return new Date(now).toISOString().slice(0, 10);
}

export default async (req) => {
  const presenceStore = getStore({ name: "presence", consistency: "strong" });
  const statsStore = getStore({ name: "presence-stats", consistency: "strong" });
  const now = Date.now();
  const today = todayKey(now);

  let body = {};
  if (req.method === "POST") {
    try { body = await req.json(); } catch (_) {}
  }

  const id = typeof body.id === "string" ? body.id.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64) : "";

  if (id) {
    if (body.leave) {
      await presenceStore.delete(id);
    } else {
      const region = KNOWN_REGIONS.has(body.region) ? body.region : "unknown";
      const country = sanitizeCountry(body.country);
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

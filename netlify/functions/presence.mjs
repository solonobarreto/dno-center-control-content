import { getStore } from "@netlify/blobs";

// Uma sessão é considerada "online" se mandou heartbeat nos últimos 25s.
const STALE_MS = 25000;

const KNOWN_REGIONS = new Set([
  "southAmerica", "northAmerica", "europe", "asia", "africa", "oceania", "unknown"
]);

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
      await presenceStore.set(id, JSON.stringify({ ts: now, region }));

      // Acessos totais + média diária: conta no máximo 1 acesso por
      // dispositivo por dia (dedupe via chave própria), então soma de
      // verdade entre TODOS os visitantes — não só o navegador de quem olha.
      const visitKey = `visit:${id}:${today}`;
      const alreadyVisitedToday = await statsStore.get(visitKey);
      if (!alreadyVisitedToday) {
        await statsStore.set(visitKey, "1");

        let totals = null;
        try { totals = JSON.parse((await statsStore.get("totals")) || "null"); } catch (_) { totals = null; }
        if (!totals || typeof totals !== "object") totals = { total: 0, days: {} };
        totals.days = totals.days || {};

        totals.total = (totals.total || 0) + 1;
        totals.days[today] = (totals.days[today] || 0) + 1;

        await statsStore.set("totals", JSON.stringify(totals));
      }
    }
  }

  // Varre as sessões de presença: descarta as que não mandam heartbeat há
  // mais de STALE_MS e agrega quantas estão online, por região, com as que
  // sobraram (isso é o que o painel "Pessoas online por região" mostra).
  const { blobs } = await presenceStore.list();
  const regionCounts = {};
  let aliveCount = 0;

  await Promise.all(
    blobs.map(async ({ key }) => {
      let raw = null;
      try { raw = JSON.parse((await presenceStore.get(key)) || "null"); } catch (_) { raw = null; }

      // Compatível com o formato antigo (valor era só o timestamp em texto,
      // sem região) — entradas assim caem em "unknown" até expirarem.
      const isObj = raw && typeof raw === "object";
      const ts = isObj ? Number(raw.ts) : Number(raw);
      const region = isObj && KNOWN_REGIONS.has(raw.region) ? raw.region : "unknown";

      if (!ts || now - ts > STALE_MS) {
        await presenceStore.delete(key);
        return;
      }
      aliveCount++;
      regionCounts[region] = (regionCounts[region] || 0) + 1;
    })
  );

  const count = Math.max(1, aliveCount);

  // Estatísticas globais: acessos totais (todos os visitantes, desde sempre)
  // e a média diária a partir de quantos dias distintos já tiveram acesso.
  let totals = null;
  try { totals = JSON.parse((await statsStore.get("totals")) || "null"); } catch (_) { totals = null; }
  const total = (totals && totals.total) || count; // nunca menos que quem está online agora
  const dayCount = totals && totals.days ? Math.max(1, Object.keys(totals.days).length) : 1;
  const dailyAverage = total / dayCount;

  return new Response(JSON.stringify({
    count,
    regions: regionCounts,
    stats: { total, dailyAverage }
  }), {
    headers: { "content-type": "application/json", "cache-control": "no-store" }
  });
};

export const config = { path: "/api/presence" };

import { getStore } from "@netlify/blobs";

// Uma sessão é considerada "online" se mandou heartbeat nos últimos 25s.
const STALE_MS = 25000;

export default async (req) => {
  const store = getStore({ name: "presence", consistency: "strong" });
  const now = Date.now();

  let body = {};
  if (req.method === "POST") {
    try { body = await req.json(); } catch (_) {}
  }

  const id = typeof body.id === "string" ? body.id.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64) : "";
  if (id) {
    if (body.leave) await store.delete(id);
    else await store.set(id, String(now));
  }

  const { blobs } = await store.list();
  const alive = await Promise.all(
    blobs.map(async ({ key }) => {
      const ts = Number(await store.get(key));
      if (!ts || now - ts > STALE_MS) {
        await store.delete(key);
        return 0;
      }
      return 1;
    })
  );

  const count = Math.max(1, alive.reduce((a, b) => a + b, 0));
  return new Response(JSON.stringify({ count }), {
    headers: { "content-type": "application/json", "cache-control": "no-store" }
  });
};

export const config = { path: "/api/presence" };

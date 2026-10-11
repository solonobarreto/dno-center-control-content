// Entrada do Worker (Cloudflare). Atende só /api/*; todo o resto (site estático) é servido
// direto pelos assets, sem passar por aqui (veja run_worker_first em ../wrangler.toml).
import * as presence from "./functions/api/presence.js";
import * as partyShare from "./functions/api/party-share.js";
import * as events from "./functions/api/dno-events.js";

const notFound = () =>
  new Response(JSON.stringify({ error: "not_found" }), { status: 404, headers: { "content-type": "application/json" } });

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    const c = { request, env, ctx };
    switch (pathname) {
      case "/api/presence": return presence.onRequest(c);
      case "/api/party-share": return partyShare.onRequest(c);
      case "/api/dno-events":
        return request.method === "GET" || request.method === "HEAD"
          ? events.onRequestGet(c)
          : new Response(JSON.stringify({ error: "method_not_allowed" }), { status: 405, headers: { "content-type": "application/json" } });
      default:
        return pathname.startsWith("/api/") ? notFound() : env.ASSETS.fetch(request);
    }
  }
};

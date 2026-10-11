// Entrada do Worker (Cloudflare): faz o papel do netlify.toml + "config.path" de cada Function.
// Só /api/* passa por aqui; o resto do site é servido como estático (veja wrangler.toml).
import * as presence from "./functions/presence.mjs";
import * as partyShare from "./functions/party-share.mjs";
import * as events from "./functions/dno-events.js";

const json = (obj, status) => new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json" } });

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    const c = { request, env, ctx };
    if (pathname === "/api/presence") return presence.onRequest(c);
    if (pathname === "/api/party-share") return partyShare.onRequest(c);
    if (pathname === "/api/dno-events") {
      return request.method === "GET" || request.method === "HEAD" ? events.onRequestGet() : json({ error: "method_not_allowed" }, 405);
    }
    if (pathname.startsWith("/api/")) return json({ error: "not_found" }, 404);
    return env.ASSETS.fetch(request);
  }
};

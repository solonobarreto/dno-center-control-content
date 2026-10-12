// Entrada do Worker (Cloudflare): faz o papel do netlify.toml + "config.path" de cada Function.
// Só /api/* passa por aqui; o resto do site é servido como estático (veja wrangler.toml).
import * as presence from "./functions/presence.mjs";
import * as partyShare from "./functions/party-share.mjs";
import * as events from "./functions/dno-events.js";

const json = (obj, status) => new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json" } });

// GET /api/status: diagnóstico rápido (banco D1, país detectado e leitura dos eventos).
async function status(env, request) {
  const out = { worker: "ok", build: "2026-10-12-a", country: (request.cf && request.cf.country) || null, db: null, events: null };
  try {
    if (!env.DB) out.db = "ERRO: binding DB ausente (wrangler.toml / painel Bindings)";
    else {
      await env.DB.prepare("SELECT 1 AS ok").first();
      try { out.db = "ok, linhas em kv: " + (await env.DB.prepare("SELECT count(*) AS c FROM kv").first()).c; }
      catch (_) { out.db = "ok (tabela kv ainda não criada: será criada no 1º acesso a /api/presence)"; }
    }
  } catch (e) { out.db = "ERRO: " + ((e && e.message) || e); }
  try {
    const r = await events.onRequestGet();
    const j = JSON.parse(await r.text());
    out.events = r.status === 200 ? { status: 200, patch: j.patch && j.patch.title, eventos: (j.events || []).length } : { status: r.status, erro: j.error };
  } catch (e) { out.events = "ERRO: " + ((e && e.message) || e); }
  return json(out, 200);
}

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    const c = { request, env, ctx };
    try {
      if (pathname === "/api/status") return await status(env, request);
      if (pathname === "/api/presence") return await presence.onRequest(c);
      if (pathname === "/api/party-share") return await partyShare.onRequest(c);
      if (pathname === "/api/dno-events") {
        return request.method === "GET" || request.method === "HEAD" ? await events.onRequestGet() : json({ error: "method_not_allowed" }, 405);
      }
      if (pathname.startsWith("/api/")) return json({ error: "not_found" }, 404);
    } catch (err) {
      // Mostra o motivo real (ex.: binding D1 ausente) em vez de uma página de erro genérica.
      return json({ error: String((err && err.message) || err) }, 500);
    }
    return env.ASSETS.fetch(request);
  }
};

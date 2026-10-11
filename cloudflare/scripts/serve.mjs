// Servidor local simples para abrir o site em http://localhost:8888 (em vez de file://).
// Assim o screenshot usa o método rápido/4K, com os ícones de classe e sem bloqueio do navegador.
//
// Uso (na pasta do projeto):  node cloudflare/scripts/serve.mjs        (porta opcional: node cloudflare/scripts/serve.mjs 3000)
// A rota /api/dno-events usa cloudflare/functions/api/dno-events.js. As demais Functions (presença, convites) respondem
// 404 e o site usa os fallbacks locais. Para testar tudo (com D1 local): npx wrangler dev

import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Este arquivo fica em cloudflare/scripts/; a raiz do projeto é duas pastas acima.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const port = Number(process.argv[2]) || 8888;

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".cur": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf",
  ".mp3": "audio/mpeg", ".mp4": "video/mp4", ".txt": "text/plain; charset=utf-8"
};

async function runEventsFunction(res) {
  try {
    const mod = await import(pathToFileURL(path.join(root, "cloudflare", "functions", "api", "dno-events.js")).href);
    const r = await mod.onRequestGet();
    res.writeHead(r.status || 200, Object.fromEntries(r.headers));
    res.end(await r.text());
  } catch (err) {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "dno-events indisponível localmente: " + err.message }));
  }
}

http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    let p = decodeURIComponent(url.pathname);

    if (p === "/api/dno-events") return runEventsFunction(res);
    if (p.startsWith("/api/")) {
      res.writeHead(404, { "content-type": "application/json" });
      return res.end(JSON.stringify({ error: "Function não disponível no servidor local" }));
    }

    if (p.endsWith("/")) p += "index.html";
    const file = path.normalize(path.join(root, p));
    if (!file.startsWith(root)) { res.writeHead(403); return res.end("Proibido"); }

    let target = file;
    try { if ((await stat(target)).isDirectory()) target = path.join(target, "index.html"); } catch (_) {}
    const data = await readFile(target);
    res.writeHead(200, {
      "content-type": TYPES[path.extname(target).toLowerCase()] || "application/octet-stream",
      "cache-control": "no-store"
    });
    res.end(data);
  } catch (_) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Não encontrado");
  }
}).listen(port, () => {
  console.log(`Site local: http://localhost:${port}`);
  console.log("Ctrl+C para parar.");
});

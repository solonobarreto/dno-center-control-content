// Servidor local simples para abrir o site em http://localhost:8888 (em vez de file://).
// Assim o screenshot usa o método rápido/4K, com os ícones de classe e sem bloqueio do navegador.
//
// Uso (na pasta do projeto):  node netlify/serve.mjs        (porta opcional: node netlify/serve.mjs 3000)
// Se existir netlify/functions/dno-events.js, a rota /.netlify/functions/dno-events também funciona.
// As demais Functions (presença, convites) respondem 404 e o site usa os fallbacks locais.

import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Este arquivo fica em netlify/; a raiz do projeto é a pasta acima.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.argv[2]) || 8888;
const require = createRequire(import.meta.url);

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".cur": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf",
  ".mp3": "audio/mpeg", ".mp4": "video/mp4", ".txt": "text/plain; charset=utf-8"
};

async function runEventsFunction(res) {
  try {
    const { handler } = require(path.join(root, "netlify", "functions", "dno-events.js"));
    const r = await handler({});
    res.writeHead(r.statusCode || 200, r.headers || {});
    res.end(r.body || "");
  } catch (err) {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "dno-events indisponível localmente: " + err.message }));
  }
}

http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    let p = decodeURIComponent(url.pathname);

    if (p === "/.netlify/functions/dno-events") return runEventsFunction(res);
    if (p.startsWith("/.netlify/") || p.startsWith("/api/")) {
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

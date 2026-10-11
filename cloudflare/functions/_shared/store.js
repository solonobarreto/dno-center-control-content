// Armazenamento chave→valor em cima do Cloudflare D1 (substitui o Netlify Blobs).
// D1 tem consistência forte (um único primário), como o antigo `consistency: "strong"`.
// API igual à que as functions já usavam: get / set / delete / list({ prefix }).
// list() devolve também o valor de cada chave ({ key, value }) para evitar uma consulta por chave
// (o plano gratuito limita as consultas por requisição).

let ready = null;
async function ensure(db) {
  if (!ready) {
    ready = db
      .prepare("CREATE TABLE IF NOT EXISTS kv (s TEXT NOT NULL, k TEXT NOT NULL, v TEXT NOT NULL, PRIMARY KEY (s, k))")
      .run()
      .catch((e) => { ready = null; throw e; });
  }
  return ready;
}

export function getStore(env, name) {
  const db = env.DB;
  if (!db) throw new Error("Binding D1 'DB' não configurado (veja wrangler.toml).");
  return {
    async get(key) {
      await ensure(db);
      const r = await db.prepare("SELECT v FROM kv WHERE s = ?1 AND k = ?2").bind(name, key).first();
      return r ? r.v : null;
    },
    async set(key, value) {
      await ensure(db);
      await db.prepare("INSERT INTO kv (s, k, v) VALUES (?1, ?2, ?3) ON CONFLICT (s, k) DO UPDATE SET v = excluded.v")
        .bind(name, key, String(value)).run();
    },
    async delete(key) {
      await ensure(db);
      await db.prepare("DELETE FROM kv WHERE s = ?1 AND k = ?2").bind(name, key).run();
    },
    async list(opts) {
      await ensure(db);
      const prefix = (opts && opts.prefix) || "";
      const { results } = await db
        .prepare("SELECT k, v FROM kv WHERE s = ?1 AND substr(k, 1, length(?2)) = ?2")
        .bind(name, prefix).all();
      return { blobs: results.map((r) => ({ key: r.k, value: r.v })) };
    }
  };
}

// SHA-256 em hex (Web Crypto) — mesmo resultado do createHash("sha256") do Node.
export async function sha256(text, len) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  const hex = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return len ? hex.slice(0, len) : hex;
}

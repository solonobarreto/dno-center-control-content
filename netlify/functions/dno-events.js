// Netlify Function: lê o patch [Patch] mais recente em dnorigins.com/news e devolve os eventos da
// seção "Events" (nome + data de fim). O navegador não pode ler dnorigins.com direto (CORS),
// por isso a leitura acontece aqui, no servidor, e o site consome só este JSON.
//
// URL depois de publicado: /.netlify/functions/dno-events
// Resposta: { patch: { title, url, published }, events: [{ id, name, until|null }], fetchedAt }

const BASE = "https://dnorigins.com";

const MONTHS = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
};

// Dia da semana citado no texto do evento (ex.: "only available Fridays, Saturdays
// & Sundays") → índice JS (domingo = 0 ... sábado = 6). Sem menção a dia = todo dia.
const WEEKDAYS = {
  sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6
};

// "Server Time", como usado nos patch notes, está 5h à frente do horário de Brasília
// (GMT-3) → Server Time = UTC+2, fixo (o jogo não observa horário de verão).
const SERVER_TZ_OFFSET_MS = 2 * 60 * 60 * 1000;

async function get(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { "user-agent": "dno-center-control/1.0" } });
    if (!res.ok) throw new Error(`HTTP ${res.status} em ${url}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&quot;/g, '"')
   .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const stripTags = (s) => decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Primeiro post da lista de /news cujo título começa com "[Patch]" (a lista vem do mais novo pro mais antigo).
function findLatestPatch(listHtml) {
  const re = /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(listHtml))) {
    const title = stripTags(m[2]);
    if (/^\[Patch\]/i.test(title)) return { title, url: new URL(m[1], BASE + "/news/").href };
  }
  return null;
}

// "5th of October 00:00 Server Time." → ISO em UTC de verdade (o texto dá a hora em
// Server Time = UTC+2, então subtrai o offset do valor "de calendário" lido do texto).
function parseEndDate(text, publishedIso) {
  const m = text.match(/(\d{1,2})(?:st|nd|rd|th)?\s+(?:of\s+)?([A-Za-z]+)(?:,?\s+(\d{4}))?(?:[\s,]+(?:at\s+)?(\d{1,2}):(\d{2}))?/);
  if (!m) return null;
  const month = MONTHS[m[2].toLowerCase()];
  if (month === undefined) return null;
  const pub = publishedIso ? new Date(publishedIso) : new Date();
  let year = m[3] ? Number(m[3]) : pub.getUTCFullYear();
  const day = Number(m[1]), hh = Number(m[4] || 0), mm = Number(m[5] || 0);
  let d = new Date(Date.UTC(year, month, day, hh, mm) - SERVER_TZ_OFFSET_MS);
  if (!m[3] && d.getTime() < pub.getTime() - 24 * 3600 * 1000) {
    d = new Date(Date.UTC(year + 1, month, day, hh, mm) - SERVER_TZ_OFFSET_MS);
  }
  return d.toISOString();
}

// Dias da semana citados na descrição do evento (ex.: "only available Fridays,
// Saturdays & Sundays") → array de índices JS, únicos, na ordem em que aparecem no
// texto. Sem nenhum dia citado → undefined (evento roda todo dia, sem restrição).
function parseDays(text) {
  const found = [];
  const re = /sundays?|mondays?|tuesdays?|wednesdays?|thursdays?|fridays?|saturdays?/gi;
  let m;
  while ((m = re.exec(text))) {
    const key = m[0].toLowerCase().replace(/s$/, "");
    const idx = WEEKDAYS[key];
    if (idx !== undefined && !found.includes(idx)) found.push(idx);
  }
  return found.length ? found : undefined;
}

// Acha a seção (h2) cujo título contém "Event" e devolve os eventos: nome em negrito no começo do
// parágrafo + o "End Date:" que vem logo depois dele.
function parseEvents(patchHtml, publishedIso) {
  const chunks = patchHtml.split(/<h2\b/i).slice(1);
  const section = chunks.find((c) => /\bevents?\b/i.test(stripTags(c.slice(0, c.search(/<\/h2>/i) + 5))));
  if (!section) return [];
  const body = section.slice(section.search(/<\/h2>/i) + 5).split(/<h2\b/i)[0];

  // Nome (negrito no começo do parágrafo) + o texto inteiro do próprio parágrafo,
  // pra também dar pra achar dias da semana citados ali (ex.: "only available
  // Fridays, Saturdays & Sundays").
  const names = [];
  const nameRe = /<(p|h3|h4)\b[^>]*>\s*<(?:strong|b)>([\s\S]*?)<\/(?:strong|b)>/gi;
  let m;
  while ((m = nameRe.exec(body))) {
    const name = stripTags(m[2]).replace(/[:.\-–—\s]+$/, "");
    if (!name || /^end date/i.test(name)) continue;
    const closeTag = `</${m[1]}>`;
    const closeIdx = body.indexOf(closeTag, m.index);
    const paragraphText = stripTags(body.slice(m.index, closeIdx === -1 ? body.length : closeIdx + closeTag.length));
    names.push({ name, pos: m.index, days: parseDays(paragraphText) });
  }
  const ends = [];
  const endRe = /End\s*Date\s*:?\s*([^<]+)/gi;
  while ((m = endRe.exec(body))) ends.push({ text: stripTags(m[1]), pos: m.index });

  return names.map((n, i) => {
    const nextPos = i + 1 < names.length ? names[i + 1].pos : Infinity;
    const end = ends.find((e) => e.pos > n.pos && e.pos < nextPos);
    const event = { id: slug(n.name), name: n.name, until: end ? parseEndDate(end.text, publishedIso) : null };
    if (n.days) event.days = n.days;
    return event;
  }).filter((e) => e.id);
}

async function fetchLatestEvents() {
  const patch = findLatestPatch(await get(BASE + "/news/"));
  if (!patch) throw new Error("Nenhum post [Patch] encontrado em /news");
  const html = await get(patch.url);
  const pub = (html.match(/property="article:published_time"\s+content="([^"]+)"/i) ||
               html.match(/datetime="([^"]+)"/i) || [])[1] || null;
  return { patch: { title: patch.title, url: patch.url, published: pub }, events: parseEvents(html, pub), fetchedAt: new Date().toISOString() };
}

exports.handler = async () => {
  const headers = { "content-type": "application/json; charset=utf-8", "access-control-allow-origin": "*" };
  try {
    const data = await fetchLatestEvents();
    return { statusCode: 200, headers: { ...headers, "cache-control": "public, max-age=600" }, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 502, headers, body: JSON.stringify({ error: String(err && err.message || err) }) };
  }
};

exports._test = { findLatestPatch, parseEvents, parseEndDate };

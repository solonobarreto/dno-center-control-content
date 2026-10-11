// Gera js/class-icons.js: um mapa { idDaClasse: "data:image/png;base64,..." } com todos os PNGs de img/classes.
// Serve para o print (screenshot) incluir os ícones de classe mesmo quando o site é aberto direto do disco (file://),
// onde o navegador bloqueia a leitura de imagens locais.
//
// Uso (na pasta do projeto):  node netlify/build-class-icons.mjs
// Rode de novo sempre que adicionar/trocar ícones em img/classes.

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Este arquivo fica em netlify/; a raiz do projeto é a pasta acima.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "img", "classes");
const outDir = path.join(root, "js");
const outFile = path.join(outDir, "class-icons.js");

let files;
try {
  files = (await readdir(dir)).filter((f) => /\.png$/i.test(f)).sort();
} catch (err) {
  console.error(`Não consegui ler a pasta ${dir}\n${err.message}`);
  process.exit(1);
}
if (!files.length) {
  console.error(`Nenhum .png encontrado em ${dir}`);
  process.exit(1);
}

const map = {};
for (const f of files) {
  const buf = await readFile(path.join(dir, f));
  map[f.replace(/\.png$/i, "")] = "data:image/png;base64," + buf.toString("base64");
}

await mkdir(outDir, { recursive: true });
const js =
  "// Gerado por build-class-icons.mjs — não edite à mão.\n" +
  "window.DNO_CLASS_ICONS = " + JSON.stringify(map) + ";\n";
await writeFile(outFile, js);
console.log(`OK: ${files.length} ícones → ${path.relative(root, outFile)} (${(js.length / 1024).toFixed(0)} KB)`);

// =========================================================
// Dragon Nest Origins — Content Control Center
// =========================================================

// Normal mode: 10 rows per table (tables side by side). "Coluna Especial" mode sets this to Infinity
// (single table, see the "Coluna Especial / Coluna Normal" block at the end of this file).
let MAX_ROWS_PER_TABLE = 10;

const ALL_CLASSES = [
  { id: "barbarian", name: "Barbarian" },
  { id: "destroyer", name: "Destroyer" },
  { id: "gladiator", name: "Gladiator" },
  { id: "moonlord", name: "Moonlord" },
  { id: "darkavenger", name: "Dark Avenger" },
  { id: "silverhunter", name: "Silver Hunter" },
  { id: "tempest", name: "Tempest" },
  { id: "windwalker", name: "Wind Walker" },
  { id: "sentinel", name: "Sentinel" },
  { id: "sniper", name: "Sniper" },
  { id: "obscuria", name: "Obscuria" },
  { id: "ilumia", name: "Ilumia" },
  { id: "glaciana", name: "Glaciana" },
  { id: "saleana", name: "Saleana" },
  { id: "shootingstar", name: "Shooting Star" },
  { id: "gearmaster", name: "Gear Master" },
  { id: "adept", name: "Adept" },
  { id: "physician", name: "Physician" },
  { id: "crusader", name: "Crusader" },
  { id: "guardian", name: "Guardian" },
  { id: "inquisitor", name: "Inquisitor" },
  { id: "saint", name: "Saint" },
  { id: "spiritdancer", name: "Spirit Dancer" },
  { id: "bladedancer", name: "Blade Dancer" },
  { id: "souleater", name: "Soul Eater" },
  { id: "darksummoner", name: "Dark Summoner" },
  { id: "abysswalker", name: "Abyss Walker" },
  { id: "lightfury", name: "Light Fury" },
  { id: "raven", name: "Raven" },
  { id: "ripper", name: "Ripper" },
  { id: "valkyrie", name: "Valkyrie" },
  { id: "flurry", name: "Flurry" },
  { id: "ruina", name: "Ruina" },
  { id: "defensio", name: "Defensio" }
];

// Translated display names for each class, keyed by class id then language.
// English is the fallback for any language/id combination not listed here.
const CLASS_NAME_TRANSLATIONS = {
  barbarian:    { "pt-BR": "Bárbaro",              "pt-PT": "Bárbaro",              es: "Bárbaro",            ru: "Варвар" },
  destroyer:    { "pt-BR": "Destruidor",           "pt-PT": "Destruidor",           es: "Destructor",         ru: "Разрушитель" },
  gladiator:    { "pt-BR": "Gladiador",            "pt-PT": "Gladiador",            es: "Gladiador",          ru: "Гладиатор" },
  moonlord:     { "pt-BR": "Senhor da Lua",        "pt-PT": "Senhor da Lua",        es: "Señor de la Luna",   ru: "Лунный Лорд" },
  darkavenger:  { "pt-BR": "Vingador das Trevas",  "pt-PT": "Vingador das Trevas",  es: "Vengador Oscuro",    ru: "Тёмный Мститель" },
  silverhunter: { "pt-BR": "Caçador de Prata",     "pt-PT": "Caçador de Prata",     es: "Cazador de Plata",   ru: "Серебряный Охотник" },
  tempest:      { "pt-BR": "Tempestade",           "pt-PT": "Tempestade",           es: "Tempestad",          ru: "Шторм" },
  windwalker:   { "pt-BR": "Andarilho do Vento",   "pt-PT": "Andarilho do Vento",   es: "Caminante del Viento", ru: "Странник Ветра" },
  sentinel:     { "pt-BR": "Sentinela",            "pt-PT": "Sentinela",            es: "Centinela",          ru: "Страж" },
  sniper:       { "pt-BR": "Atirador",             "pt-PT": "Atirador",             es: "Francotirador",      ru: "Снайпер" },
  obscuria:     { "pt-BR": "Obscúria",             "pt-PT": "Obscúria",             es: "Obscuria",           ru: "Обскурия" },
  ilumia:       { "pt-BR": "Ilúmia",               "pt-PT": "Ilúmia",               es: "Ilumia",             ru: "Илюмия" },
  glaciana:     { "pt-BR": "Glaciana",             "pt-PT": "Glaciana",             es: "Glaciana",           ru: "Глациана" },
  saleana:      { "pt-BR": "Saleana",              "pt-PT": "Saleana",              es: "Saleana",            ru: "Салеана" },
  shootingstar: { "pt-BR": "Estrela Cadente",      "pt-PT": "Estrela Cadente",      es: "Estrella Fugaz",     ru: "Падающая Звезда" },
  gearmaster:   { "pt-BR": "Mestre das Engrenagens","pt-PT": "Mestre das Engrenagens", es: "Maestro Mecánico", ru: "Мастер Механизмов" },
  adept:        { "pt-BR": "Adepto",               "pt-PT": "Adepto",               es: "Adepto",             ru: "Адепт" },
  physician:    { "pt-BR": "Médico",               "pt-PT": "Médico",               es: "Médico",             ru: "Врач" },
  crusader:     { "pt-BR": "Cruzado",              "pt-PT": "Cruzado",              es: "Cruzado",            ru: "Крестоносец" },
  guardian:     { "pt-BR": "Guardião",             "pt-PT": "Guardião",             es: "Guardián",           ru: "Хранитель" },
  inquisitor:   { "pt-BR": "Inquisidor",           "pt-PT": "Inquisidor",           es: "Inquisidor",         ru: "Инквизитор" },
  saint:        { "pt-BR": "Santo",                "pt-PT": "Santo",                es: "Santo",              ru: "Святой" },
  spiritdancer: { "pt-BR": "Dançarina Espiritual", "pt-PT": "Dançarina Espiritual", es: "Bailarina Espiritual", ru: "Танцовщица Духа" },
  bladeddancer: { "pt-BR": "Dançarina das Lâminas","pt-PT": "Dançarina das Lâminas", es: "Bailarina de Cuchillas", ru: "Танцовщица Клинков" },
  souleater:    { "pt-BR": "Devorador de Almas",   "pt-PT": "Devorador de Almas",   es: "Devorador de Almas", ru: "Пожиратель Душ" },
  darksummoner: { "pt-BR": "Invocador das Trevas", "pt-PT": "Invocador das Trevas", es: "Invocador Oscuro",   ru: "Тёмный Призыватель" },
  abysswalker:  { "pt-BR": "Andarilho do Abismo",  "pt-PT": "Andarilho do Abismo",  es: "Caminante del Abismo", ru: "Странник Бездны" },
  lightfury:    { "pt-BR": "Fúria da Luz",         "pt-PT": "Fúria da Luz",         es: "Furia de Luz",       ru: "Ярость Света" },
  raven:        { "pt-BR": "Corvo",                "pt-PT": "Corvo",                es: "Cuervo",             ru: "Ворон" },
  ripper:       { "pt-BR": "Retalhador",           "pt-PT": "Retalhador",           es: "Destripador",        ru: "Потрошитель" },
  valkyrie:     { "pt-BR": "Valquíria",            "pt-PT": "Valquíria",            es: "Valquiria",          ru: "Валькирия" },
  flurry:       { "pt-BR": "Rajada",               "pt-PT": "Rajada",               es: "Ráfaga",             ru: "Шквал" },
  ruina:        { "pt-BR": "Ruína",                "pt-PT": "Ruína",                es: "Ruina",              ru: "Руина" },
  defensio:     { "pt-BR": "Defensio",             "pt-PT": "Defensio",             es: "Defensio",           ru: "Дефенсио" }
};

function getCurrentLang() {
  return localStorage.getItem("dnOriginsSelectedLang") || "pt-BR";
}

// Returns the class name in the currently selected language, falling back
// to the original (English) name when no translation is registered.
function getClassName(cls) {
  const lang = getCurrentLang();
  const entry = CLASS_NAME_TRANSLATIONS[cls.id];
  return (entry && entry[lang]) || cls.name;
}

// Builds/refreshes a character row's name label so it reads
// `Class "Nickname"` (e.g. Saleana "Loretta"), class name first. The raw
// nickname is always kept in data-nickname — export/import, the "nick
// already in use" check and the character filter all read from there
// instead of the rendered text, so the class name shown alongside it never
// leaks into any of that logic.
function renderClassNickLabel(labelEl, cls, nickname) {
  const className = getClassName(cls);
  labelEl.dataset.nickname = nickname;
  labelEl.dataset.classId = cls.id;
  labelEl.innerHTML = "";

  const classSpan = document.createElement("span");
  classSpan.className = "class-nickname-class";
  classSpan.textContent = className;

  const nameSpan = document.createElement("span");
  nameSpan.className = "class-nickname-name";
  nameSpan.textContent = `"${nickname}"`;

  labelEl.appendChild(classSpan);
  labelEl.appendChild(nameSpan);
  labelEl.title = `${className} "${nickname}"`; // nome completo ao passar o mouse (caso seja truncado)
  labelEl.classList.toggle("nick-long", `${className} ${nickname}`.length >= 14);
}
window.renderClassNickLabel = renderClassNickLabel;

// Re-labels every already-rendered class icon (dropdown grid + character
// rows) after the user switches languages. Exposed on window so the
// language-selection code in index.html can call it.
function refreshClassLabels() {
  document.querySelectorAll(".class-icon-btn[data-class-id]").forEach((btn) => {
    const cls = ALL_CLASSES.find((c) => c.id === btn.dataset.classId);
    if (!cls) return;
    const label = getClassName(cls);
    btn.title = label;
    const img = btn.querySelector("img");
    if (img) img.alt = label;
  });

  document.querySelectorAll("img[data-class-id]").forEach((img) => {
    const cls = ALL_CLASSES.find((c) => c.id === img.dataset.classId);
    if (cls) img.alt = getClassName(cls);
  });

  // Re-render each row's "Class "Nick"" label too, so the class-name portion
  // (and the tooltip) follow the newly selected language.
  document.querySelectorAll(".class-nickname[data-nickname]").forEach((labelEl) => {
    const row = labelEl.closest("tr");
    const classId = row ? row.dataset.classId : labelEl.dataset.classId;
    const cls = ALL_CLASSES.find((c) => c.id === classId);
    if (cls) renderClassNickLabel(labelEl, cls, labelEl.dataset.nickname);
  });
}
window.refreshClassLabels = refreshClassLabels;

// Labels for the "Preset" and "Extra" sections of each row's content dropdown.
// English is the fallback for any language not listed here.
const EXTRA_MENU_LABELS = {
  "pt-BR": { extra: "Extra", addAll: "Adicionar Todos", removeAll: "Remover Todos",
             preset: "Preset", savePreset: "Salvar no Preset", noPresets: "Nenhum preset salvo",
             presetSaved: "Preset salvo", emptyPreset: "Adicione conteúdos antes de salvar um preset",
             deletePreset: "Excluir preset" },
  "pt-PT": { extra: "Extra", addAll: "Adicionar Todos", removeAll: "Remover Todos",
             preset: "Preset", savePreset: "Guardar no Preset", noPresets: "Nenhum preset guardado",
             presetSaved: "Preset guardado", emptyPreset: "Adicione conteúdos antes de guardar um preset",
             deletePreset: "Eliminar preset" },
  es:      { extra: "Extra", addAll: "Añadir Todos",     removeAll: "Eliminar Todos",
             preset: "Preset", savePreset: "Guardar en Preset", noPresets: "Ningún preset guardado",
             presetSaved: "Preset guardado", emptyPreset: "Añade contenidos antes de guardar un preset",
             deletePreset: "Eliminar preset" },
  en:      { extra: "Extra", addAll: "Add All",          removeAll: "Remove All",
             preset: "Preset", savePreset: "Save to Preset", noPresets: "No presets saved",
             presetSaved: "Preset saved", emptyPreset: "Add some content before saving a preset",
             deletePreset: "Delete preset" },
  ru:      { extra: "Дополнительно", addAll: "Добавить всё", removeAll: "Удалить всё",
             preset: "Пресет", savePreset: "Сохранить в пресет", noPresets: "Нет сохранённых пресетов",
             presetSaved: "Пресет сохранён", emptyPreset: "Сначала добавьте контент, чтобы сохранить пресет",
             deletePreset: "Удалить пресет" },
  fil:     { extra: "Extra", addAll: "Idagdag Lahat", removeAll: "Alisin Lahat",
             preset: "Preset", savePreset: "I-save sa Preset", noPresets: "Walang naka-save na preset",
             presetSaved: "Na-save ang preset", emptyPreset: "Magdagdag muna ng content bago mag-save ng preset",
             deletePreset: "Burahin ang preset" },
  id:      { extra: "Ekstra", addAll: "Tambah Semua", removeAll: "Hapus Semua",
             preset: "Preset", savePreset: "Simpan ke Preset", noPresets: "Belum ada preset tersimpan",
             presetSaved: "Preset tersimpan", emptyPreset: "Tambahkan konten sebelum menyimpan preset",
             deletePreset: "Hapus preset" },
  zh:      { extra: "额外", addAll: "全部添加", removeAll: "全部移除",
             preset: "预设", savePreset: "保存为预设", noPresets: "尚无已保存的预设",
             presetSaved: "预设已保存", emptyPreset: "请先添加内容再保存预设",
             deletePreset: "删除预设" },
  fr:      { extra: "Extra", addAll: "Tout ajouter", removeAll: "Tout retirer",
             preset: "Préréglage", savePreset: "Enregistrer comme préréglage", noPresets: "Aucun préréglage enregistré",
             presetSaved: "Préréglage enregistré", emptyPreset: "Ajoutez du contenu avant d'enregistrer un préréglage",
             deletePreset: "Supprimer le préréglage" },
  de:      { extra: "Extra", addAll: "Alle hinzufügen", removeAll: "Alle entfernen",
             preset: "Preset", savePreset: "Als Preset speichern", noPresets: "Keine gespeicherten Presets",
             presetSaved: "Preset gespeichert", emptyPreset: "Fügen Sie zuerst Inhalte hinzu, bevor Sie ein Preset speichern",
             deletePreset: "Preset löschen" }
};

function getExtraLabels() {
  return EXTRA_MENU_LABELS[getCurrentLang()] || EXTRA_MENU_LABELS["pt-BR"];
}

// Re-labels every already-rendered "Preset"/"Extra" dropdown section after the
// user switches languages. Exposed on window so the language-selection code in
// index.html can call it, same as refreshClassLabels.
function refreshExtraMenuLabels() {
  const labels = getExtraLabels();
  document.querySelectorAll('.content-dropdown-divider[data-section="extra"]').forEach((el) => {
    el.textContent = labels.extra;
  });
  document.querySelectorAll('.content-dropdown-divider[data-section="preset"]').forEach((el) => {
    el.textContent = labels.preset;
  });
  document.querySelectorAll('.content-item-mini[data-action="add-all"]').forEach((el) => {
    el.textContent = labels.addAll;
  });
  document.querySelectorAll('.content-item-mini[data-action="remove-all"]').forEach((el) => {
    el.textContent = labels.removeAll;
  });
  document.querySelectorAll('.content-item-mini[data-action="save-preset"]').forEach((el) => {
    el.textContent = labels.savePreset;
  });
  refreshAllPresetMenus();
  refreshContentLabels();
}
window.refreshExtraMenuLabels = refreshExtraMenuLabels;

// =========================================================
// Presets — saved sets of content that can be applied to any character row.
// Kept in localStorage (so they survive a reload) and included in the JSON
// backup on export. Each preset: { name: "Preset-dd/mm/yyyy-hh:mm", contents: [titles] }
// =========================================================
const PRESETS_KEY = "dnOriginsPresets";

function sanitizePresets(arr) {
  if (!Array.isArray(arr)) return [];
  return arr
    .filter((p) => p && typeof p.name === "string" && Array.isArray(p.contents))
    .map((p) => ({
      name: p.name,
      contents: p.contents
        .map((t) => (typeof t === "string" ? t : t && t.title))
        .filter((t) => typeof t === "string" && t)
    }));
}

function loadPresetsFromStorage() {
  try {
    return sanitizePresets(JSON.parse(localStorage.getItem(PRESETS_KEY) || "[]"));
  } catch (_) {
    return [];
  }
}

function savePresetsToStorage() {
  try {
    localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
  } catch (_) {}
}

let presets = loadPresetsFromStorage();

// Default name: Preset-<date>-<time>, e.g. "Preset-19/09/2026-14:32".
function makePresetName() {
  const d = new Date();
  const p2 = (n) => String(n).padStart(2, "0");
  const base = `Preset-${p2(d.getDate())}/${p2(d.getMonth() + 1)}/${d.getFullYear()}-${p2(d.getHours())}:${p2(d.getMinutes())}`;
  let name = base;
  let n = 2;
  while (presets.some((x) => x.name === name)) name = `${base} (${n++})`;
  return name;
}

// Every row has its own dropdown; when a preset is saved/deleted/imported all of
// them re-render their "Preset" list.
const presetMenuRenderers = new Set();
function refreshAllPresetMenus() {
  presetMenuRenderers.forEach((r) => {
    if (!r.dropdown.isConnected) presetMenuRenderers.delete(r);
    else r.render();
  });
}

const ALL_CONTENTS = [
  "Missão diária",
  "Black Dragon Memorial",
  "Red Dragon Memorial",
  "Red Dragon Normal",
  "Red Dragon Hardcore",
  "Desert Dragon Hardcore",
  "Ice Dragon Normal",
  "Duel Dragon",
  "Daidalos Easy",
  "Daidalos Normal",
  "Granom Easy",
  "Granom Normal",
  "Hero Battlefield",
  "Circus: Boss Rush",
  "Circus: Monastery",
  "Dragon Fellowship",
  "Stronghold: Cerberus",
  "Stronghold: Manticore",
  "Stronghold: Apocalypse",
  "Stronghold: Archbishop",
  "Stronghold: Gigant",
  "Third Core",
  "Typhoom Kim Hardcore",
  "Professor K Hardcore"
];

// O título em português é a "chave" do conteúdo (backup JSON, presets, filtro), então não muda.
// Só o texto exibido é traduzido. Conteúdos que não estão aqui aparecem com o nome original.
const CONTENT_LABELS = {
  "Missão diária": {
    "pt-BR": "Missão diária",
    "pt-PT": "Missão diária",
    es: "Misión diaria",
    en: "Daily Quest",
    ru: "Ежедневное задание",
    fil: "Daily Quest",
    id: "Misi Harian",
    zh: "每日任务",
    fr: "Quête quotidienne",
    de: "Tägliche Quest"
  }
};

function getContentLabel(title) {
  const entry = CONTENT_LABELS[title];
  return (entry && entry[getCurrentLang()]) || title;
}

// Re-labels chips and dropdown items already on screen after a language switch.
function refreshContentLabels() {
  document.querySelectorAll(".content-item-mini[data-content-title]").forEach((el) => {
    el.textContent = getContentLabel(el.dataset.contentTitle);
  });
  document.querySelectorAll(".content-chip").forEach((chip) => {
    const label = getContentLabel(chip.dataset.title);
    chip.title = label;
    const text = chip.querySelector(".chip-main span:not(.chip-status)");
    if (text) text.innerText = label;
  });
}
window.refreshContentLabels = refreshContentLabels;

let activeGearFlyouts = [];
let activeNickPopover = null;

document.addEventListener("DOMContentLoaded", () => {
  spawnEmbers();

  const addClassBtn = document.getElementById("addClassBtn");
  const classDropdown = document.getElementById("classDropdown");
  const tablesWrapper = document.getElementById("tablesWrapper");

  // Manual Modal Elements
  const manualOverlay = document.getElementById("manualOverlay");
  const closeManualBtn = document.getElementById("closeManualBtn");

  // Reseta a animação CSS de slide-in para que ela rode novamente a cada abertura.
  function restartModalAnimation(overlay) {
    const box = overlay.querySelector(".guide-modal, .manual-modal, .leveling-modal");
    if (!box) return;
    box.style.animation = "none";
    void box.offsetWidth; // força reflow
    box.style.animation = "";
  }

  // Side Menu Elements
  const menuBtn = document.getElementById("menuBtn");
  const sideMenuOverlay = document.getElementById("sideMenuOverlay");
  const closeSideMenuBtn = document.getElementById("closeSideMenuBtn");
  const sideMenuPanels = document.querySelector(".side-menu-panels");
  const openLanguageBtn = document.getElementById("openLanguageBtn");
  const openManualFromMenuBtn = document.getElementById("openManualFromMenuBtn");
  const backToMainMenuBtn = document.getElementById("backToMainMenuBtn");
  const langItems = document.querySelectorAll(".lang-item");

  const SELECTED_LANG_KEY = "dnOriginsSelectedLang";

  // Backup Elements
  const exportBtn = document.getElementById("exportBtn");
  const importBtn = document.getElementById("importBtn");
  const importFileInput = document.getElementById("importFileInput");

  // Initial Table Container
  createNewTableContainer();

  addClassBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    classDropdown.classList.toggle("hidden");
  });

  // Side Menu Open/Close
  function openSideMenu() {
    sideMenuPanels.classList.remove("show-language");
    sideMenuOverlay.classList.remove("hidden");
    markActiveLanguage();
  }

  function closeSideMenu() {
    sideMenuOverlay.classList.add("hidden");
  }

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openSideMenu();
  });

  closeSideMenuBtn.addEventListener("click", closeSideMenu);

  sideMenuOverlay.addEventListener("click", (e) => {
    if (e.target === sideMenuOverlay) {
      closeSideMenu();
    }
  });

  // Side Menu - Navigate to Language Panel
  openLanguageBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sideMenuPanels.classList.add("show-language");
  });

  backToMainMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sideMenuPanels.classList.remove("show-language");
  });

  // Side Menu - Open Manual
  openManualFromMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeSideMenu();
    restartModalAnimation(manualOverlay);
    manualOverlay.classList.remove("hidden");
  });

  // Side Menu - Language Selection
  function markActiveLanguage() {
    const selected = localStorage.getItem(SELECTED_LANG_KEY);
    langItems.forEach((item) => {
      item.classList.toggle("lang-active", item.dataset.lang === selected);
    });
  }

  langItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      localStorage.setItem(SELECTED_LANG_KEY, item.dataset.lang);
      markActiveLanguage();
      closeSideMenu();
    });
  });

  // Manual Modal Close
  closeManualBtn.addEventListener("click", () => {
    manualOverlay.classList.add("hidden");
  });

  manualOverlay.addEventListener("click", (e) => {
    if (e.target === manualOverlay) {
      manualOverlay.classList.add("hidden");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      manualOverlay.classList.add("hidden");
      closeSideMenu();
    }
  });

  // Backup - Export
  exportBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    exportData();
  });

  // Backup - Import
  importBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    importFileInput.click();
  });

  importFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      importData(file);
    }
    importFileInput.value = "";
  });

  async function exportData() {
    const data = { savedAt: Date.now(), characters: [], presets: presets.map((p) => ({ name: p.name, contents: [...p.contents] })) };

    document.querySelectorAll("#tablesWrapper tbody tr").forEach((row) => {
      const classId = row.dataset.classId;
      const nicknameEl = row.querySelector(".class-nickname");
      const nickname = nicknameEl ? (nicknameEl.dataset.nickname || nicknameEl.innerText) : "";

      let gear = { set: null, weapon: null };
      try {
        gear = JSON.parse(row.dataset.gear || "{}");
      } catch (err) {
        gear = { set: null, weapon: null };
      }

      const contents = [];
      row.querySelectorAll(".content-chip").forEach((chip) => {
        const entry = {
          title: chip.dataset.title,
          done: chip.classList.contains("done")
        };
        if (chip.dataset.account) entry.account = chip.dataset.account;
        contents.push(entry);
      });

      data.characters.push({ classId, nickname, gear, contents });
    });

    const jsonStr = JSON.stringify(data, null, 2);
    const dateStr = new Date().toISOString().slice(0, 10);
    const suggestedName = `dragon-nest-backup-${dateStr}.json`;

    // Prefer the native "Save As" dialog so the person can pick the exact
    // folder (e.g. their own "file" backup folder) instead of the browser
    // silently dropping the file into the default Downloads folder.
    if (window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName,
          types: [
            {
              description: "Dragon Nest Backup",
              accept: { "application/json": [".json"] }
            }
          ]
        });
        const writable = await handle.createWritable();
        await writable.write(jsonStr);
        await writable.close();
        return;
      } catch (err) {
        if (err && err.name === "AbortError") {
          // User cancelled the save dialog — do nothing further.
          return;
        }
        // Any other error: fall back to the classic download method below.
      }
    }

    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = suggestedName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data || !Array.isArray(data.characters)) {
          throw new Error("Invalid backup file format");
        }

        // Presets travel with the backup. Older backups without them keep the current presets.
        if (Array.isArray(data.presets)) {
          presets = sanitizePresets(data.presets);
          savePresetsToStorage();
        }

        // Clear existing board (and the floating dropdowns that belonged to the old rows)
        document.querySelectorAll(".content-dropdown-mini").forEach((el) => el.remove());
        tablesWrapper.innerHTML = "";
        createNewTableContainer();

        data.characters.forEach((charData) => {
          const cls = ALL_CLASSES.find((c) => c.id === charData.classId);
          if (!cls) return;
          addClassRow(cls, charData.nickname || cls.name, charData.gear, charData.contents);
        });
        refreshAllPresetMenus();

        // Resets (Missão diária 04:00 todo dia / demais conteúdos 04:00 de sábado, GMT-3) que
        // aconteceram entre o momento em que o backup foi salvo e agora.
        if (window.applyContentResetsSince) {
          window.applyContentResetsSince(Number(data.savedAt) || file.lastModified);
        }
      } catch (err) {
        alert("Failed to import backup file: " + err.message);
      }
    };
    reader.readAsText(file);
  }

  document.addEventListener("click", () => {
    closeAllDropdowns();
  });

  function closeAllGearFlyouts() {
    activeGearFlyouts.forEach(el => el.remove());
    activeGearFlyouts = [];
  }

  function closeNickPopover() {
    if (activeNickPopover) {
      activeNickPopover.remove();
      activeNickPopover = null;
    }
  }

  function closeAllDropdowns() {
    classDropdown.classList.add("hidden");
    document.querySelectorAll(".content-dropdown-mini").forEach(el => el.classList.add("hidden"));
    closeAllGearFlyouts();
    closeNickPopover();
  }

  // Render Class Grid Options
  ALL_CLASSES.forEach((cls) => {
    const btn = document.createElement("button");
    btn.className = "class-icon-btn";
    btn.dataset.classId = cls.id;
    btn.title = getClassName(cls);

    const img = document.createElement("img");
    img.src = `img/${cls.id}.png`;
    img.alt = getClassName(cls);

    img.onerror = () => {
      img.style.display = "none";
      btn.innerText = cls.id.substring(0, 3).toUpperCase();
    };

    btn.appendChild(img);
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openSideNickPopover(btn, cls);
    });
    classDropdown.appendChild(btn);
  });

  function openSideNickPopover(anchorBtn, cls) {
    closeNickPopover();

    const rect = anchorBtn.getBoundingClientRect();
    const popover = document.createElement("div");
    popover.className = "nick-popover";
    popover.style.left = `${rect.right + 8}px`;
    popover.style.top = `${rect.top}px`;

    popover.innerHTML = `
      <div class="nick-popover-title">${getClassName(cls)}</div>
      <input type="text" id="nickPopoverInput" placeholder="Enter Nick..." maxlength="20" />
      <div class="nick-popover-error hidden" id="nickPopoverError">This name is already in use</div>
      <div class="nick-popover-actions">
        <button id="cancelNickPopover" class="btn nick-popover-btn">Cancel</button>
        <button id="confirmNickPopover" class="btn nick-popover-btn" style="background:var(--accent-flame); color:var(--bg-void);">Add</button>
      </div>
    `;

    popover.addEventListener("click", (e) => e.stopPropagation());
    document.body.appendChild(popover);
    activeNickPopover = popover;

    const input = popover.querySelector("#nickPopoverInput");
    const errorLabel = popover.querySelector("#nickPopoverError");
    setTimeout(() => input.focus(), 50);

    input.addEventListener("input", () => {
      errorLabel.classList.add("hidden");
      input.classList.remove("input-error");
    });

    const handleConfirm = () => {
      const nick = input.value.trim() || getClassName(cls);

      if (isNicknameTaken(nick)) {
        errorLabel.classList.remove("hidden");
        input.classList.add("input-error");
        input.focus();
        return;
      }

      addClassRow(cls, nick);
      closeAllDropdowns();
    };

    popover.querySelector("#confirmNickPopover").addEventListener("click", handleConfirm);
    popover.querySelector("#cancelNickPopover").addEventListener("click", closeNickPopover);

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleConfirm();
    });
  }

  // Character names must be unique across every table on the board
  function isNicknameTaken(nick) {
    const normalized = nick.trim().toLowerCase();
    const existing = document.querySelectorAll(".class-nickname");
    for (const el of existing) {
      const existingNick = (el.dataset.nickname || el.innerText).trim().toLowerCase();
      if (existingNick === normalized) {
        return true;
      }
    }
    return false;
  }

  // Create a New Table Component
  function createNewTableContainer() {
    const container = document.createElement("main");
    container.className = "table-container";
    container.innerHTML = `
      <table>
        <thead>
          <tr>
            <th style="width: 180px;">Class</th>
            <th class="col-content">Class Content</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
    tablesWrapper.appendChild(container);
    return container.querySelector("tbody");
  }
  // Also used by the drag & drop code (second DOMContentLoaded block) to open a
  // new table when a row pushed between tables overflows the last one.
  window.createNewTableContainer = createNewTableContainer;

  // Get Available Table Body or Create Next Side-by-Side Table
  function getTargetTableBody() {
    const tbodies = tablesWrapper.querySelectorAll("tbody");
    for (let tbody of tbodies) {
      if (tbody.children.length < MAX_ROWS_PER_TABLE) {
        return tbody;
      }
    }
    return createNewTableContainer();
  }

  function addClassRow(cls, nickname, initialGear = null, initialContents = null) {
    const targetBody = getTargetTableBody();
    const row = document.createElement("tr");
    row.dataset.classId = cls.id;

    const rowGearState = {
      set: (initialGear && initialGear.set) || null,
      weapon: (initialGear && initialGear.weapon) || null
    };
    row.dataset.gear = JSON.stringify(rowGearState);

    // Class Cell
    const classTd = document.createElement("td");
    classTd.className = "cell-class";

    const container = document.createElement("div");
    container.className = "class-cell-container";

    const cellContent = document.createElement("div");
    cellContent.className = "class-cell-content";

    const wrapper = document.createElement("div");
    wrapper.className = "class-cell-wrapper";

    const classImg = document.createElement("img");
    classImg.src = `img/${cls.id}.png`;
    classImg.alt = getClassName(cls);
    classImg.dataset.classId = cls.id;

    const miniPlusBtn = document.createElement("div");
    miniPlusBtn.className = "btn-add-content-mini";
    miniPlusBtn.innerText = "+";
    miniPlusBtn.title = "Add Content";

    const miniGearBtn = document.createElement("div");
    miniGearBtn.className = "btn-gear-mini";
    miniGearBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 L4 5 V11 C4 16 7.5 20.5 12 22 C16.5 20.5 20 16 20 11 V5 Z"/></svg>`;
    miniGearBtn.title = "Configure Equipment";

    const gearBubble = document.createElement("div");
    gearBubble.className = "gear-bubble hidden";

    function updateGearBubbleDisplay() {
      row.dataset.gear = JSON.stringify(rowGearState);
      const hasSet = !!rowGearState.set;
      const hasWeapon = !!rowGearState.weapon;

      if (!hasSet && !hasWeapon) {
        gearBubble.classList.add("hidden");
        return;
      }

      gearBubble.classList.remove("hidden");
      let html = "";

      if (hasSet) {
        const rarityClass = `rarity-${rowGearState.set.rarity.toLowerCase()}`;
        html += `<div class="gear-bubble-item"><span class="gear-bubble-label">Set:</span> <span class="${rarityClass}">${rowGearState.set.text}</span></div>`;
      }

      if (hasWeapon) {
        const rarityClass = `rarity-${rowGearState.weapon.rarity.toLowerCase()}`;
        html += `<div class="gear-bubble-item"><span class="gear-bubble-label">Weap:</span> <span class="${rarityClass}">${rowGearState.weapon.text}</span></div>`;
      }

      gearBubble.innerHTML = html;
    }

    if (rowGearState.set || rowGearState.weapon) {
      updateGearBubbleDisplay();
    }

    const miniDropdown = document.createElement("div");
    miniDropdown.className = "content-dropdown-mini hidden";
    document.body.appendChild(miniDropdown);

    ALL_CONTENTS.forEach((contentTitle) => {
      const item = document.createElement("div");
      item.className = "content-item-mini";
      item.innerText = getContentLabel(contentTitle);
      item.dataset.contentTitle = contentTitle;
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        addContentChipToRow(chipsContainer, contentTitle);
        miniDropdown.classList.add("hidden");
      });
      miniDropdown.appendChild(item);
    });

    const extraLabels = getExtraLabels();

    // "Preset" section — saved sets of content that can be applied to this row.
    const presetDivider = document.createElement("div");
    presetDivider.className = "content-dropdown-divider";
    presetDivider.dataset.section = "preset";
    presetDivider.textContent = extraLabels.preset;
    miniDropdown.appendChild(presetDivider);

    const presetList = document.createElement("div");
    presetList.className = "content-preset-list";
    miniDropdown.appendChild(presetList);

    const renderPresetList = () => {
      const labels = getExtraLabels();
      presetList.innerHTML = "";

      if (!presets.length) {
        const empty = document.createElement("div");
        empty.className = "content-preset-empty";
        empty.textContent = labels.noPresets;
        presetList.appendChild(empty);
        return;
      }

      presets.forEach((preset) => {
        const item = document.createElement("div");
        item.className = "content-item-mini content-item-preset";
        item.title = `${preset.name}\n${preset.contents.map(getContentLabel).join(", ")}`;

        const nameSpan = document.createElement("span");
        nameSpan.className = "preset-name";
        nameSpan.textContent = preset.name;

        const delSpan = document.createElement("span");
        delSpan.className = "preset-delete";
        delSpan.textContent = "✕";
        delSpan.title = labels.deletePreset;
        delSpan.addEventListener("click", (e) => {
          e.stopPropagation();
          if (!confirm(`${labels.deletePreset}: ${preset.name}?`)) return;
          presets = presets.filter((p) => p !== preset);
          savePresetsToStorage();
          refreshAllPresetMenus();
        });

        item.addEventListener("click", (e) => {
          e.stopPropagation();
          preset.contents.forEach((title) => addContentChipToRow(chipsContainer, title));
          miniDropdown.classList.add("hidden");
        });

        item.appendChild(nameSpan);
        item.appendChild(delSpan);
        presetList.appendChild(item);
      });
    };

    presetMenuRenderers.add({ dropdown: miniDropdown, render: renderPresetList });
    renderPresetList();

    // "Extra" section — Add All / Remove All / Save to Preset for this character's content list.
    const extraDivider = document.createElement("div");
    extraDivider.className = "content-dropdown-divider";
    extraDivider.dataset.section = "extra";
    extraDivider.textContent = extraLabels.extra;
    miniDropdown.appendChild(extraDivider);

    const addAllItem = document.createElement("div");
    addAllItem.className = "content-item-mini content-item-extra";
    addAllItem.dataset.action = "add-all";
    addAllItem.textContent = extraLabels.addAll;
    addAllItem.addEventListener("click", (e) => {
      e.stopPropagation();
      ALL_CONTENTS.forEach((contentTitle) => addContentChipToRow(chipsContainer, contentTitle));
      miniDropdown.classList.add("hidden");
    });
    miniDropdown.appendChild(addAllItem);

    const removeAllItem = document.createElement("div");
    removeAllItem.className = "content-item-mini content-item-extra content-item-danger";
    removeAllItem.dataset.action = "remove-all";
    removeAllItem.textContent = extraLabels.removeAll;
    removeAllItem.addEventListener("click", (e) => {
      e.stopPropagation();
      chipsContainer.innerHTML = "";
      miniDropdown.classList.add("hidden");
    });
    miniDropdown.appendChild(removeAllItem);

    const savePresetItem = document.createElement("div");
    savePresetItem.className = "content-item-mini content-item-extra";
    savePresetItem.dataset.action = "save-preset";
    savePresetItem.textContent = extraLabels.savePreset;
    savePresetItem.addEventListener("click", (e) => {
      e.stopPropagation();
      const labels = getExtraLabels();
      const titles = Array.from(chipsContainer.querySelectorAll(".content-chip")).map((c) => c.dataset.title);
      miniDropdown.classList.add("hidden");

      if (!titles.length) {
        if (window.showToast) window.showToast(labels.emptyPreset);
        return;
      }

      const name = makePresetName();
      presets.push({ name, contents: titles });
      savePresetsToStorage();
      refreshAllPresetMenus();
      if (window.showToast) window.showToast(`${labels.presetSaved}: ${name}`);
    });
    miniDropdown.appendChild(savePresetItem);

    miniPlusBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = miniDropdown.classList.contains("hidden");
      closeAllDropdowns();

      if (isHidden) {
        const rect = miniPlusBtn.getBoundingClientRect();
        miniDropdown.style.maxHeight = "";
        miniDropdown.style.top = `${rect.bottom + 4}px`;
        miniDropdown.style.left = `${rect.left}px`;
        miniDropdown.classList.remove("hidden");

        // Keep the whole dropdown inside the viewport: open upwards when there
        // isn't room below (rows near the bottom of the page), and shrink it
        // (it scrolls internally) if it doesn't fit either way.
        const margin = 8;
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        let h = miniDropdown.offsetHeight;
        if (h > vh - margin * 2) {
          miniDropdown.style.maxHeight = `${vh - margin * 2}px`;
          h = miniDropdown.offsetHeight;
        }
        let top = rect.bottom + 4;
        if (top + h > vh - margin) {
          const above = rect.top - 4 - h;
          top = above >= margin ? above : Math.max(margin, vh - margin - h);
        }
        miniDropdown.style.top = `${top}px`;
        const w = miniDropdown.offsetWidth;
        if (rect.left + w > vw - margin) {
          miniDropdown.style.left = `${Math.max(margin, vw - margin - w)}px`;
        }
      }
    });

    miniGearBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = activeGearFlyouts.length > 0;
      closeAllDropdowns();

      if (!isOpen) {
        openGearMainMenu(miniGearBtn, rowGearState, updateGearBubbleDisplay);
      }
    });

    wrapper.appendChild(classImg);
    wrapper.appendChild(miniPlusBtn);
    wrapper.appendChild(miniGearBtn);

    const nickLabel = document.createElement("div");
    nickLabel.className = "class-nickname";
    renderClassNickLabel(nickLabel, cls, nickname);

    // Nome (classe + nick) acima do ícone da classe.
    cellContent.appendChild(nickLabel);
    cellContent.appendChild(wrapper);

    container.appendChild(cellContent);
    container.appendChild(gearBubble);
    classTd.appendChild(container);

    // Remove-row '×' — top-right corner of the Class cell (replaces the old Actions column).
    // Same drawn SVG "X" as the content chips' remove button (.chip-remove), so both
    // look identical instead of this one using a plain, permanently-red glyph.
    const removeBtn = document.createElement("button");
    removeBtn.className = "btn-remove-row";
    removeBtn.innerHTML = '<svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" focusable="false" aria-hidden="true"><path d="M4 4L12 12M12 4L4 12"/></svg>';
    removeBtn.title = "Remove Character";
    removeBtn.onclick = (e) => {
      e.stopPropagation();
      miniDropdown.remove();
      closeAllGearFlyouts();
      const parentTbody = row.parentElement;
      row.remove();

      // Remove empty table container if there are multiple tables
      if (parentTbody && parentTbody.children.length === 0) {
        const allContainers = tablesWrapper.querySelectorAll(".table-container");
        if (allContainers.length > 1) {
          parentTbody.closest(".table-container").remove();
        }
      }
    };
    classTd.appendChild(removeBtn);

    // Content Chips Cell
    const contentsTd = document.createElement("td");
    contentsTd.className = "col-content";
    const chipsContainer = document.createElement("div");
    chipsContainer.className = "content-chips-container";
    contentsTd.appendChild(chipsContainer);

    row.appendChild(classTd);
    row.appendChild(contentsTd);

    targetBody.appendChild(row);

    if (Array.isArray(initialContents)) {
      initialContents.forEach((item) => {
        if (item && item.title) {
          addContentChipToRow(chipsContainer, item.title, !!item.done, item.account || null);
        }
      });
    }
  }

  // Equipment Menus - Level 1
  function openGearMainMenu(anchorBtn, stateObj, updateBubbleCb) {
    closeAllGearFlyouts();

    const rect = anchorBtn.getBoundingClientRect();
    const menu1 = createFlyoutMenu("Equipment", rect.right + 6, rect.top);

    const setOption = createFlyoutItem("Set", true, () => {
      removeGearFlyoutsFromLevel(2);
      openRarityMenu(setOption, "Set", stateObj, updateBubbleCb);
    });

    const weaponOption = createFlyoutItem("Weap", true, () => {
      removeGearFlyoutsFromLevel(2);
      openRarityMenu(weaponOption, "Weap", stateObj, updateBubbleCb);
    });

    menu1.appendChild(setOption);
    menu1.appendChild(weaponOption);
    activeGearFlyouts.push(menu1);
  }

  // Equipment Menus - Level 2 (Includes Option to Clear Set/Weapon)
  function openRarityMenu(anchorEl, slotType, stateObj, updateBubbleCb) {
    const rect = anchorEl.getBoundingClientRect();
    const menu2 = createFlyoutMenu(`${slotType} Rarity`, rect.right + 6, rect.top, 2);

    // Option to Remove/Clear Equipment
    const clearOption = createFlyoutItem("Clear", false, () => {
      if (slotType === "Set") {
        stateObj.set = null;
      } else {
        stateObj.weapon = null;
      }
      updateBubbleCb();
      closeAllGearFlyouts();
    });
    menu2.appendChild(clearOption);

    ["Epic", "Unique", "Legend"].forEach((rarity) => {
      const item = createFlyoutItem(rarity, true, () => {
        removeGearFlyoutsFromLevel(3);
        openLevelMenu(item, slotType, rarity, stateObj, updateBubbleCb);
      });
      menu2.appendChild(item);
    });

    activeGearFlyouts.push(menu2);
  }

  // Equipment Menus - Level 3
  function openLevelMenu(anchorEl, slotType, rarity, stateObj, updateBubbleCb) {
    const rect = anchorEl.getBoundingClientRect();
    const menu3 = createFlyoutMenu("Level", rect.right + 6, rect.top, 3);

    ["Lv80", "Lv90"].forEach((level) => {
      const item = createFlyoutItem(level, true, () => {
        removeGearFlyoutsFromLevel(4);
        openEnhanceMenu(item, slotType, rarity, level, stateObj, updateBubbleCb);
      });
      menu3.appendChild(item);
    });

    activeGearFlyouts.push(menu3);
  }

  // Equipment Menus - Level 4
  function openEnhanceMenu(anchorEl, slotType, rarity, level, stateObj, updateBubbleCb) {
    const rect = anchorEl.getBoundingClientRect();
    const menu4 = createFlyoutMenu("Refinement", rect.right + 6, rect.top, 4);

    const grid = document.createElement("div");
    grid.className = "gear-enhance-grid";

    for (let i = 0; i <= 15; i++) {
      const enhanceStr = `+${i}`;
      const btn = document.createElement("button");
      btn.className = "gear-enhance-btn";
      btn.innerText = enhanceStr;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        const formattedVal = {
          rarity: rarity,
          text: `${rarity} ${level.replace("Lv", "")} ${enhanceStr}`
        };

        if (slotType === "Set") {
          stateObj.set = formattedVal;
        } else {
          stateObj.weapon = formattedVal;
        }

        updateBubbleCb();
        closeAllGearFlyouts();
      });
      grid.appendChild(btn);
    }

    menu4.appendChild(grid);
    activeGearFlyouts.push(menu4);
  }

  function createFlyoutMenu(titleText, left, top, level = 1) {
    // Ensure the fixed flyout layer exists (created once, lives on body)
    let flyoutLayer = document.getElementById("flyout-layer");
    if (!flyoutLayer) {
      flyoutLayer = document.createElement("div");
      flyoutLayer.id = "flyout-layer";
      document.body.appendChild(flyoutLayer);
    }

    const menu = document.createElement("div");
    menu.className = "gear-flyout-menu";
    menu.dataset.level = level;

    // left/top come from getBoundingClientRect() which are already
    // viewport-relative — they map 1-to-1 onto the fixed layer.
    // Clamp so the menu never starts below the visible area.
    const clampedTop = Math.min(top, window.innerHeight - 40);
    menu.style.left = `${left}px`;
    menu.style.top  = `${clampedTop}px`;

    const title = document.createElement("div");
    title.className = "gear-flyout-title";
    title.innerText = titleText;
    menu.appendChild(title);

    flyoutLayer.appendChild(menu);
    return menu;
  }

  function createFlyoutItem(label, hasArrow = true, onClick = () => {}) {
    const item = document.createElement("div");
    item.className = "gear-flyout-item";

    const labelSpan = document.createElement("span");
    labelSpan.innerText = label;
    item.appendChild(labelSpan);

    if (hasArrow) {
      const arrowSpan = document.createElement("span");
      arrowSpan.className = "flyout-arrow";
      arrowSpan.innerHTML = "&#10095;";
      item.appendChild(arrowSpan);
    }

    item.addEventListener("click", (e) => {
      e.stopPropagation();
      onClick();
    });
    return item;
  }

  function removeGearFlyoutsFromLevel(level) {
    activeGearFlyouts = activeGearFlyouts.filter((menu) => {
      if (parseInt(menu.dataset.level) >= level) {
        menu.remove();
        return false;
      }
      return true;
    });
  }

  // -------------------------------------------------------
  // Priority content (Missão diária, Duel Dragon): always sorted first in
  // the chips container and given a "double" slot (2 of the 3 reserved rows
  // in their column) so their extra sub-line has room — a countdown for the
  // daily reset, an account tag for Duel Dragon.
  // -------------------------------------------------------
  const DAILY_TITLE = window.DAILY_CONTENT_TITLE || "Missão diária";
  const DUEL_DRAGON_TITLE = "Duel Dragon";
  const PRIORITY_TITLES = [DAILY_TITLE, DUEL_DRAGON_TITLE];
  const CHIP_SLOT_COST = 3; // total reserved rows per column

  // SVG icons for the chip status (done/pending) and remove "X" — drawn shapes
  // instead of Unicode glyphs (✓/✗/✕), whose font metrics don't share a common
  // optical center and rendered visibly off-center between the chip's top and
  // bottom edges. SVG paths center exactly the same way regardless of font/OS.
  const CHIP_ICON_CHECK =
    '<svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true"><path d="M3 8.5L6.5 12L13 4"/></svg>';
  const CHIP_ICON_X =
    '<svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" focusable="false" aria-hidden="true"><path d="M4 4L12 12M12 4L4 12"/></svg>';

  function chipSlotCost() {
    return 1; // every chip — priority or not — takes exactly 1 of the 3 reserved rows
  }
  function chipPriorityWeight(chip) {
    const idx = PRIORITY_TITLES.indexOf(chip.dataset.title);
    return idx === -1 ? PRIORITY_TITLES.length : idx;
  }

  // Rebuilds the .content-chip-col columns for a container so priority
  // chips (Daily, Duel Dragon) always come first, each column holding at
  // most 3 "slot units" (a priority chip costs 2, a normal chip costs 1).
  // First-fit bin packing: a chip is placed in the first column that still
  // has room, not necessarily the last one created — this backfills the
  // leftover single slot under a priority chip (2 of 3 used) with the next
  // normal chip instead of leaving it permanently empty.
  function reflowChipColumns(container) {
    const chips = Array.from(container.querySelectorAll(".content-chip"));
    if (chips.length === 0) {
      container.querySelectorAll(".content-chip-col").forEach((c) => c.remove());
      return;
    }
    // Stable sort: priority chips first (Daily, then Duel Dragon), everything
    // else keeps its existing relative order.
    const ordered = chips
      .map((chip, i) => ({ chip, i }))
      .sort((a, b) => (chipPriorityWeight(a.chip) - chipPriorityWeight(b.chip)) || (a.i - b.i))
      .map((x) => x.chip);

    container.querySelectorAll(".content-chip-col").forEach((c) => c.remove());
    const cols = [];
    ordered.forEach((chip) => {
      const cost = chipSlotCost(chip);
      let target = cols.find((c) => c.used + cost <= CHIP_SLOT_COST);
      if (!target) {
        const el = document.createElement("div");
        el.className = "content-chip-col";
        container.appendChild(el);
        target = { el, used: 0 };
        cols.push(target);
      }
      target.el.appendChild(chip);
      target.used += cost;
    });
  }

  // ---- Daily-reset countdown shown under the "Missão diária" chip ----
  function formatCountdown(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));
    const h = String(Math.floor(total / 3600)).padStart(2, "0");
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    return `${h}:${m}`;
  }
  function updateDailyCountdowns() {
    if (typeof window.getNextDailyResetMs !== "function") return;
    const now = Date.now();
    const target = window.getNextDailyResetMs(now);
    const label = i18n("dailyResetIn", "Reset em");
    const text = `${label} ${formatCountdown(target - now)}`;
    document.querySelectorAll(`.content-chip[data-title="${DAILY_TITLE}"] .chip-sublabel`).forEach((el) => {
      el.textContent = text;
    });
  }
  setInterval(updateDailyCountdowns, 30000);
  window.updateDailyCountdowns = updateDailyCountdowns; // exposto para ser chamado logo na troca de idioma, sem esperar o próximo tick de 30s

  // ---- Duel Dragon account-number linking ----
  // Lets several characters that share the SAME (real) account number have
  // their "Duel Dragon" chip marked done together, since the reward is
  // per-account and not per-character. The number is typed by the player
  // (digits only) and shown, highlighted, right next to the chip's label.
  //
  // The account number lives on the chip itself (data-account), the same way
  // "title"/"done" already do — NOT in a side localStorage map keyed by a
  // freshly-generated row id. A row id created fresh on every page load/import
  // never matches an older id saved separately, which was why Export → Import
  // used to forget the number and ask for it again for every character.

  // Small popover with a numeric-only, required input for the Duel Dragon
  // account number. Calls onConfirm(number) only once a non-empty, digits-only
  // value is confirmed; otherwise nothing happens (caller never adds the chip).
  function openAccountNumberPopover(anchorEl, onConfirm) {
    document.querySelectorAll(".account-id-popover").forEach((p) => p.remove());
    const pop = document.createElement("div");
    pop.className = "account-id-popover";
    pop.setAttribute("data-html2canvas-ignore", "");

    const title = document.createElement("div");
    title.className = "account-id-title";
    title.textContent = i18n("accountIdPrompt", "Number ID");
    pop.appendChild(title);

    const inputRow = document.createElement("div");
    inputRow.className = "account-id-input-row";

    const input = document.createElement("input");
    input.type = "text";
    input.inputMode = "numeric";
    input.autocomplete = "off";
    input.className = "account-id-input";
    input.placeholder = i18n("accountIdPlaceholder", "Ex: 123456");
    input.maxLength = 20;
    inputRow.appendChild(input);

    const confirmBtn = document.createElement("button");
    confirmBtn.type = "button";
    confirmBtn.className = "account-id-confirm";
    confirmBtn.textContent = "✓";
    inputRow.appendChild(confirmBtn);

    pop.appendChild(inputRow);

    const errorEl = document.createElement("div");
    errorEl.className = "account-id-error hidden";
    errorEl.textContent = i18n("accountIdRequired", "Informe o Number ID");
    pop.appendChild(errorEl);

    // Only digits — any letter/symbol typed or pasted is silently stripped.
    input.addEventListener("input", () => {
      const digitsOnly = input.value.replace(/[^0-9]/g, "");
      if (digitsOnly !== input.value) input.value = digitsOnly;
      if (!errorEl.classList.contains("hidden")) errorEl.classList.add("hidden");
    });

    let confirmed = false;
    const doConfirm = () => {
      const val = input.value.trim();
      if (!val) {
        errorEl.classList.remove("hidden");
        input.focus();
        return;
      }
      confirmed = true;
      pop.remove();
      document.removeEventListener("click", closeOnOutside, true);
      document.removeEventListener("keydown", onKeydown, true);
      onConfirm(val);
    };

    confirmBtn.addEventListener("click", (e) => { e.stopPropagation(); doConfirm(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); doConfirm(); }
    });

    pop.addEventListener("click", (e) => e.stopPropagation());
    document.body.appendChild(pop);

    // Always anchored to the class row that triggered it: opens level with
    // that row (vertically centered on it, same line — never stacked above
    // or below it), positioned to the right of the row's content by default,
    // but flipped to the left instead whenever there isn't enough room on
    // the right in the viewport — never lets either edge get cropped.
    const rect = anchorEl.getBoundingClientRect();
    const popRect = pop.getBoundingClientRect();
    const margin = 8;
    const fitsRight = rect.right + 6 + popRect.width <= window.innerWidth - margin;
    const left = fitsRight
      ? rect.right + 6
      : Math.max(margin, rect.left - 6 - popRect.width);
    const centeredTop = rect.top + (rect.height / 2) - (popRect.height / 2);
    const top = Math.max(margin, Math.min(centeredTop, window.innerHeight - popRect.height - margin));
    pop.style.top = `${top}px`;
    pop.style.left = `${left}px`;

    setTimeout(() => input.focus(), 0);

    // Closing without confirming (outside click or Escape) discards it —
    // required means the chip is simply never added.
    const closeOnOutside = (ev) => {
      if (!pop.contains(ev.target)) {
        pop.remove();
        document.removeEventListener("click", closeOnOutside, true);
        document.removeEventListener("keydown", onKeydown, true);
      }
    };
    const onKeydown = (ev) => {
      if (ev.key === "Escape") {
        pop.remove();
        document.removeEventListener("click", closeOnOutside, true);
        document.removeEventListener("keydown", onKeydown, true);
      }
    };
    setTimeout(() => {
      document.addEventListener("click", closeOnOutside, true);
      document.addEventListener("keydown", onKeydown, true);
    }, 0);
  }

  // When a "Duel Dragon" chip is toggled done/undone, apply the same state
  // to every other "Duel Dragon" chip that shares the same account number
  // (matched straight off the chip's own data-account, no row id involved).
  function syncLinkedAccountChips(sourceChip) {
    const myAccount = sourceChip.dataset.account;
    if (!myAccount) return;
    const isDone = sourceChip.classList.contains("done");
    document.querySelectorAll(
      `#tablesWrapper .content-chip[data-title="${DUEL_DRAGON_TITLE}"][data-account="${CSS.escape(myAccount)}"]`
    ).forEach((chip) => {
      if (chip === sourceChip) return;
      const status = chip.querySelector(".chip-status");
      if (isDone && !chip.classList.contains("done")) {
        chip.classList.add("done");
        if (status) status.innerHTML = CHIP_ICON_CHECK;
      } else if (!isDone && chip.classList.contains("done")) {
        chip.classList.remove("done");
        if (status) status.innerHTML = CHIP_ICON_X;
      }
    });
  }

  function addContentChipToRow(container, title, isDone = false, accountNumber = null) {
    if (container.querySelector(`[data-title="${title}"]`)) return;

    const isPriority = PRIORITY_TITLES.includes(title);
    const isDuelDragon = title === DUEL_DRAGON_TITLE;

    const chip = document.createElement("div");
    chip.className = "content-chip" + (isPriority ? " chip-priority" : "");
    chip.dataset.title = title;
    chip.title = getContentLabel(title); // full name on hover (in case a very long label is squeezed)

    // Top row: status + label (+ account number, for Duel Dragon) on the left,
    // remove "X" pinned on the right — same arrangement for every chip, normal
    // (pill) or priority (square), so the "X" never moves.
    const chipTop = document.createElement("div");
    chipTop.className = "chip-top";

    const chipMain = document.createElement("div");
    chipMain.className = "chip-main";

    const statusSpan = document.createElement("span");
    statusSpan.className = "chip-status";

    const textSpan = document.createElement("span");
    textSpan.className = "chip-label";
    textSpan.innerText = getContentLabel(title);

    const removeSpan = document.createElement("span");
    removeSpan.className = "chip-remove";
    removeSpan.innerHTML = CHIP_ICON_X;

    const setDone = (done) => {
      statusSpan.innerHTML = done ? CHIP_ICON_CHECK : CHIP_ICON_X;
      chip.classList.toggle("done", done);
    };

    const toggleStatus = () => {
      setDone(!chip.classList.contains("done"));
      if (isDuelDragon) syncLinkedAccountChips(chip);
    };

    statusSpan.addEventListener("click", toggleStatus);
    textSpan.addEventListener("click", toggleStatus);

    removeSpan.addEventListener("click", (e) => {
      e.stopPropagation();
      chip.remove();
      reflowChipColumns(container);
    });

    chipMain.appendChild(statusSpan);
    chipMain.appendChild(textSpan);
    chipTop.appendChild(chipMain);
    chipTop.appendChild(removeSpan);
    chip.appendChild(chipTop);

    if (title === DAILY_TITLE) {
      // Appended to chip-main (same row as the icon/label), never as a second
      // line below chip-top — keeps this chip the same single-row height as
      // every other content chip.
      const sub = document.createElement("span");
      sub.className = "chip-sublabel";
      chipMain.appendChild(sub);
    }

    const finishAdd = () => {
      container.appendChild(chip);
      reflowChipColumns(container);
      if (title === DAILY_TITLE) updateDailyCountdowns();
    };

    if (isDuelDragon) {
      const applyAccountNumber = (num) => {
        chip.dataset.account = num;
        chipMain.querySelectorAll(".chip-account-tag").forEach((t) => t.remove());
        const tag = document.createElement("span");
        tag.className = "chip-account-tag";
        tag.textContent = num;
        chipMain.appendChild(tag);
      };

      // Any other "Duel Dragon" chip already sharing this account number —
      // used both to skip re-asking for the number and to inherit its
      // current done/pending state, since the reward is per-account.
      const findLinked = (num) =>
        document.querySelector(
          `#tablesWrapper .content-chip[data-title="${DUEL_DRAGON_TITLE}"][data-account="${CSS.escape(String(num))}"]`
        );

      if (accountNumber) {
        // Restoring from a saved backup — the number travels with the chip,
        // no popover needed.
        applyAccountNumber(accountNumber);
        const linked = findLinked(accountNumber);
        setDone(isDone || (!!linked && linked.classList.contains("done")));
        finishAdd();
      } else {
        // Required: the chip is only added once a valid account number is confirmed.
        // Anchored to the whole class row (not the chips container div, which
        // can be empty/zero-height the first time a content is added to a
        // fresh character) so the popover always opens level with the class
        // row currently being edited.
        // Use the class cell (td.cell-class) as anchor — its right edge is where the
        // popover should open, not the row's right edge which spans the full table width.
        const anchorForPopover = (container.closest("tr") || container).querySelector("td.cell-class") || container.closest("tr") || container;
        openAccountNumberPopover(anchorForPopover, (num) => {
          applyAccountNumber(num);
          const linked = findLinked(num);
          setDone(!!linked && linked.classList.contains("done"));
          finishAdd();
        });
      }
      return;
    }

    setDone(isDone);
    finishAdd();
  }
});

// Decorative floating embers in the background — purely visual "life" for the Dragon Nest theme
function spawnEmbers() {
  const wrap = document.createElement("div");
  wrap.className = "embers";
  document.body.prepend(wrap);

  const EMBER_COUNT = 22;
  for (let i = 0; i < EMBER_COUNT; i++) {
    const span = document.createElement("span");
    const left = Math.random() * 100;
    const duration = 9 + Math.random() * 10;
    const delay = Math.random() * 12;
    const size = 2 + Math.random() * 2.5;

    span.style.left = `${left}vw`;
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.animationDuration = `${duration}s`;
    span.style.animationDelay = `${delay}s`;

    wrap.appendChild(span);
  }
}

// =========================================================
// Patch — override menu/language panel logic for new multi-panel system
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const panels = document.getElementById("sideMenuPanels");
  const overlay = document.getElementById("sideMenuOverlay");
  const menuBtn = document.getElementById("menuBtn");
  const closeSideMenuBtn2 = document.getElementById("closeSideMenuBtn");

  function openSideMenuNew() {
    if (panels) panels.className = "side-menu-panels";
    overlay.classList.remove("hidden");
    markActiveLang();
  }
  function closeSideMenuNew() { overlay.classList.add("hidden"); }

  if (menuBtn) { menuBtn.onclick = e => { e.stopPropagation(); openSideMenuNew(); }; }
  if (closeSideMenuBtn2) { closeSideMenuBtn2.onclick = closeSideMenuNew; }
  overlay.addEventListener("click", e => { if (e.target === overlay) closeSideMenuNew(); });

  // Language panel
  const openLangBtn2 = document.getElementById("openLanguageBtn");
  const backMain2    = document.getElementById("backToMainMenuBtn");
  if (openLangBtn2) openLangBtn2.onclick = e => { e.stopPropagation(); if(panels) panels.className = "side-menu-panels show-language"; };
  if (backMain2)    backMain2.onclick    = e => { e.stopPropagation(); if(panels) panels.className = "side-menu-panels"; };

  // Manual from menu
  const openManualNew = document.getElementById("openManualFromMenuBtn");
  const manualOvl     = document.getElementById("manualOverlay");
  if (openManualNew) openManualNew.onclick = e => { e.stopPropagation(); closeSideMenuNew(); restartModalAnimation(manualOvl); manualOvl.classList.remove("hidden"); };

  function markActiveLang() {
    const sel = localStorage.getItem("dnOriginsSelectedLang");
    document.querySelectorAll(".lang-item").forEach(it => {
      it.classList.toggle("lang-active", it.dataset.lang === sel);
    });
  }

  document.querySelectorAll(".lang-item").forEach(item => {
    const prev = item.onclick;
    item.onclick = e => {
      e.stopPropagation();
      localStorage.setItem("dnOriginsSelectedLang", item.dataset.lang);
      markActiveLang();
      closeSideMenuNew();
      if (typeof applyTranslations === "function") applyTranslations(item.dataset.lang);
      if (typeof refreshClassLabels === "function") refreshClassLabels();
      refreshContentLabels();
      if (typeof window.updateDailyCountdowns === "function") window.updateDailyCountdowns(); // sincroniza o "Reset em" na hora, em vez de esperar o próximo tick
    };
  });

  // Override createNewTableContainer to use i18n headers
  // (table headers are set by the original function; we add data-i18n attrs after)
  const tablesWrapperEl = document.getElementById("tablesWrapper");
  function translateTableHeaders() {
    document.querySelectorAll("#tablesWrapper th").forEach(th => {
      if (!th.dataset.i18n) {
        const txt = th.textContent.trim();
        if (txt === "Class" || txt === "Classe" || txt === "Clase" || txt === "Класс") { th.dataset.i18n = "tableClass"; }
        if (txt === "Class Content" || txt === "Conteúdo da Classe" || txt === "Contenido de Clase" || txt === "Контент класса") { th.dataset.i18n = "tableContent"; }
      }
      if (th.dataset.i18n) {
        const t = (window.TRANSLATIONS || {})[localStorage.getItem("dnOriginsSelectedLang") || "pt-BR"] || {};
        const target = t[th.dataset.i18n];
        // Only touch the DOM when the text actually needs to change — writing
        // the same value still fires a childList mutation, which would keep
        // re-triggering the MutationObserver below in an endless loop.
        if (target && th.textContent !== target) th.textContent = target;
      }
    });
  }
  // Run once for the table already on screen, then keep watching for new tables.
  translateTableHeaders();
  window.translateTableHeaders = translateTableHeaders;
  const obs = new MutationObserver(translateTableHeaders);
  if (tablesWrapperEl) obs.observe(tablesWrapperEl, { childList: true, subtree: true });
});

// =========================================================
// NEW FEATURES — Screenshot, Online Counter, Switch Class, Drag Reorder
// =========================================================

// Small helper: fetch a translated string for the current language, with a
// fallback (used by dynamically-created UI such as toasts and popovers that
// aren't covered by the declarative data-i18n scan).
function i18n(key, fallback) {
  const lang = getCurrentLang();
  const dict = (window.TRANSLATIONS || {})[lang] || {};
  return dict[key] !== undefined ? dict[key] : (fallback !== undefined ? fallback : key);
}
window.i18n = i18n;

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------------------------------
  // FEATURE 1: Screenshot / copy-to-clipboard button
  // -------------------------------------------------------
  const screenshotBtn = document.getElementById("screenshotBtn");
  if (screenshotBtn) {
    screenshotBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      try {
        // Use html2canvas loaded from CDN (injected below if not present)
        if (typeof html2canvas === "undefined") {
          await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
        }

        // Opções comuns. allowTaint fica desligado; vídeos (iframe) e elementos marcados com
        // data-html2canvas-ignore não entram na captura.
        const baseOptions = {
          backgroundColor: "#0c0908",
          scale: 1,
          useCORS: true,
          allowTaint: false,
          logging: false,
          ignoreElements: (el) =>
            el.tagName === "IFRAME" || (el.hasAttribute && el.hasAttribute("data-html2canvas-ignore"))
        };

        // Versão normal: só tira da cópia as imagens de outro domínio.
        const renderNormal = () => html2canvas(document.body, {
          ...baseOptions,
          onclone: (doc) => {
            doc.querySelectorAll("img").forEach((img) => {
              try {
                const u = new URL(img.src, location.href);
                if (u.protocol !== "data:" && u.protocol !== "blob:" && u.origin !== location.origin) img.remove();
              } catch (_) {}
            });
          }
        });

        // Versão simplificada: sem nenhuma imagem (img, svg, canvas, vídeo e backgrounds com url()).
        // Nenhuma imagem = nenhuma chance de "contaminar" o canvas; só o texto e as cores da tela saem.
        const renderSimple = () => html2canvas(document.body, {
          ...baseOptions,
          onclone: (doc) => {
            doc.querySelectorAll("img, svg, canvas, video, iframe").forEach((el) => el.remove());
            const win = doc.defaultView;
            doc.querySelectorAll("*").forEach((el) => {
              try {
                const cs = win.getComputedStyle(el);
                ["backgroundImage", "listStyleImage", "borderImageSource", "webkitMaskImage"].forEach((prop) => {
                  const v = cs[prop];
                  if (v && v.indexOf("url(") !== -1) {
                    const cssName = prop.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
                    el.style.setProperty(cssName, "none", "important");
                  }
                });
              } catch (_) {}
            });
          }
        });

        // Um canvas "contaminado" (tainted) deixa desenhar, mas não deixa exportar. Testa antes de seguir.
        const isTainted = (cv) => {
          try { cv.getContext("2d").getImageData(0, 0, 1, 1); return false; } catch (_) { return true; }
        };

        // Aberta como arquivo local (file://), o navegador trata TODA imagem como de outra origem e
        // contamina o canvas: nesse caso já vai direto para a versão simplificada.
        let simplified = location.protocol === "file:";
        let canvas = null;
        if (!simplified) {
          try { canvas = await renderNormal(); } catch (_) { canvas = null; }
          if (!canvas || isTainted(canvas)) { canvas = null; simplified = true; }
        }
        if (!canvas) canvas = await renderSimple();

        // Flash effect
        const flash = document.createElement("div");
        flash.className = "screenshot-flash";
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 500);

        const blob = await new Promise((resolve, reject) => {
          try {
            canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob vazio"))), "image/png");
          } catch (err) { reject(err); }
        });

        // Try clipboard first, fallback to download
        let copied = false;
        try {
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          copied = true;
        } catch (_) {}

        const note = simplified ? i18n("toastNoImages", " (versão sem imagens — abra pelo site publicado para incluir os ícones)") : "";
        if (copied) {
          showToast(i18n("toastCopied", "📋 Screenshot copiado para a área de transferência!") + note);
        } else {
          // Fallback: download
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `dragon-nest-ccc-${new Date().toISOString().slice(0,10)}.png`;
          a.click();
          URL.revokeObjectURL(url);
          showToast(i18n("toastSaved", "📥 Screenshot salvo como arquivo!") + note);
        }
      } catch (err) {
        showToast(i18n("toastError", "⚠️ Não foi possível capturar a tela: ") + (err && err.name ? err.name : "erro"));
        console.error("Screenshot error:", err);
      }
    });
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function showToast(msg) {
    const t = document.createElement("div");
    t.className = "screenshot-toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2600);
  }
  window.showToast = showToast;

  // -------------------------------------------------------
  // FEATURE 6: Online user counter (real, shared between all visitors)
  // Each open tab sends a heartbeat to a Netlify Function (/api/presence),
  // which stores it in Netlify Blobs and answers with how many sessions
  // sent a heartbeat recently. If the function is unreachable (e.g. the file
  // is opened locally), it falls back to the old same-browser localStorage count.
  //
  // IMPORTANT: the id sent to the server is a per-DEVICE id (localStorage),
  // not a per-TAB id. Opening several tabs of the same browser re-sends the
  // same id, so the server (which counts unique ids) counts one person, not
  // one tab. A small tab-reference-count (also in localStorage) makes sure
  // we only tell the server "this visitor left" once every tab of that
  // device has actually closed.
  // -------------------------------------------------------
  const PRESENCE_URL = "/api/presence";
  const HEARTBEAT_INTERVAL = 10000; // 10s

  const DEVICE_KEY = "dnOrigins_deviceId";
  let DEVICE_ID;
  try {
    DEVICE_ID = localStorage.getItem(DEVICE_KEY);
    if (!DEVICE_ID) {
      DEVICE_ID = `d_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(DEVICE_KEY, DEVICE_ID);
    }
  } catch (_) {
    DEVICE_ID = `d_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  }
  // Kept as SESSION_ID for the rest of this block/legacy fallback code below.
  const SESSION_ID = DEVICE_ID;

  // Unique id for *this tab* — used only for the local open-tabs reference count.
  const TAB_ID = `t_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  const OPEN_TABS_KEY = "dnOrigins_openTabs";
  const TAB_STALE_THRESHOLD = 20000;

  function pruneAndReadOpenTabs() {
    try {
      const raw = localStorage.getItem(OPEN_TABS_KEY);
      const tabs = raw ? JSON.parse(raw) : {};
      const now = Date.now();
      const fresh = {};
      for (const [id, entry] of Object.entries(tabs)) {
        if (entry && now - entry.ts < TAB_STALE_THRESHOLD) fresh[id] = entry;
      }
      return fresh;
    } catch (_) {
      return {};
    }
  }

  function touchOwnTab() {
    try {
      const tabs = pruneAndReadOpenTabs();
      tabs[TAB_ID] = { device: DEVICE_ID, ts: Date.now() };
      localStorage.setItem(OPEN_TABS_KEY, JSON.stringify(tabs));
    } catch (_) {}
  }

  // Returns true if, after removing this tab, no other tab of the SAME device
  // is still open (so it's safe to tell the server the whole device left).
  function isLastTabForDevice() {
    try {
      const tabs = pruneAndReadOpenTabs();
      delete tabs[TAB_ID];
      localStorage.setItem(OPEN_TABS_KEY, JSON.stringify(tabs));
      return !Object.values(tabs).some((entry) => entry.device === DEVICE_ID);
    } catch (_) {
      return true;
    }
  }

  // ---- Region detection (client-side, no extra network request) ----
  // Approximated from the browser's IANA timezone — good enough to bucket a
  // visitor into a continent without asking for geolocation permission or
  // calling an external IP-lookup service.
  const SOUTH_AMERICA_TOKENS = new Set([
    "Argentina", "Bahia", "Buenos_Aires", "Catamarca", "Cordoba", "Jujuy", "La_Rioja",
    "Mendoza", "Rio_Gallegos", "Salta", "San_Juan", "San_Luis", "Tucuman", "Ushuaia",
    "Asuncion", "Bogota", "Caracas", "Cayenne", "Cuiaba", "Eirunepe", "Fortaleza",
    "Guayaquil", "Guyana", "La_Paz", "Lima", "Maceio", "Manaus", "Montevideo",
    "Noronha", "Paramaribo", "Porto_Velho", "Punta_Arenas", "Recife", "Rio_Branco",
    "Santarem", "Santiago", "Sao_Paulo", "Belem", "Boa_Vista", "Campo_Grande"
  ]);
  function detectRegion() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      const parts = tz.split("/");
      const area = parts[0];
      if (area === "Europe") return "europe";
      if (area === "Africa") return "africa";
      if (area === "Asia") return "asia";
      if (area === "Australia") return "oceania";
      if (area === "Pacific") return "oceania";
      if (area === "America") {
        return SOUTH_AMERICA_TOKENS.has(parts[1]) ? "southAmerica" : "northAmerica";
      }
      return "unknown";
    } catch (_) {
      return "unknown";
    }
  }
  const VISITOR_REGION = detectRegion();

  // ---- Country detection (client-side, same idea as detectRegion) ----
  // Maps the browser's IANA timezone to an ISO-3166 country code. Not
  // perfect (a timezone can span more than one country), but good enough to
  // give a "by country" breakdown inside each region's panel without asking
  // for geolocation permission or calling an external IP-lookup service.
  const TZ_COUNTRY_MAP = {
    // South America
    "America/Sao_Paulo": "BR", "America/Bahia": "BR", "America/Fortaleza": "BR", "America/Recife": "BR",
    "America/Manaus": "BR", "America/Belem": "BR", "America/Boa_Vista": "BR", "America/Campo_Grande": "BR",
    "America/Cuiaba": "BR", "America/Eirunepe": "BR", "America/Maceio": "BR", "America/Noronha": "BR",
    "America/Porto_Velho": "BR", "America/Rio_Branco": "BR", "America/Santarem": "BR",
    "America/Argentina/Buenos_Aires": "AR", "America/Argentina/Catamarca": "AR", "America/Argentina/Cordoba": "AR",
    "America/Argentina/Jujuy": "AR", "America/Argentina/La_Rioja": "AR", "America/Argentina/Mendoza": "AR",
    "America/Argentina/Rio_Gallegos": "AR", "America/Argentina/Salta": "AR", "America/Argentina/San_Juan": "AR",
    "America/Argentina/San_Luis": "AR", "America/Argentina/Tucuman": "AR", "America/Argentina/Ushuaia": "AR",
    "America/Buenos_Aires": "AR", "America/Cordoba": "AR", "America/Mendoza": "AR",
    "America/Santiago": "CL", "America/Punta_Arenas": "CL",
    "America/Bogota": "CO", "America/Caracas": "VE", "America/Guayaquil": "EC", "America/Lima": "PE",
    "America/La_Paz": "BO", "America/Asuncion": "PY", "America/Montevideo": "UY",
    "America/Guyana": "GY", "America/Paramaribo": "SR", "America/Cayenne": "GF",
    // North & Central America
    "America/New_York": "US", "America/Chicago": "US", "America/Denver": "US", "America/Los_Angeles": "US",
    "America/Anchorage": "US", "America/Phoenix": "US", "America/Detroit": "US", "America/Boise": "US",
    "America/Indiana/Indianapolis": "US", "America/Kentucky/Louisville": "US", "America/Adak": "US",
    "America/Honolulu": "US", "America/Juneau": "US",
    "America/Toronto": "CA", "America/Vancouver": "CA", "America/Edmonton": "CA", "America/Winnipeg": "CA",
    "America/Halifax": "CA", "America/St_Johns": "CA", "America/Montreal": "CA", "America/Regina": "CA",
    "America/Mexico_City": "MX", "America/Tijuana": "MX", "America/Cancun": "MX", "America/Monterrey": "MX",
    "America/Merida": "MX", "America/Hermosillo": "MX", "America/Chihuahua": "MX",
    "America/Guatemala": "GT", "America/Costa_Rica": "CR", "America/Panama": "PA", "America/Tegucigalpa": "HN",
    "America/Managua": "NI", "America/El_Salvador": "SV", "America/Belize": "BZ",
    "America/Santo_Domingo": "DO", "America/Havana": "CU", "America/Jamaica": "JM", "America/Puerto_Rico": "PR",
    // Europe
    "Europe/Lisbon": "PT", "Atlantic/Azores": "PT", "Atlantic/Madeira": "PT",
    "Europe/Madrid": "ES", "Atlantic/Canary": "ES",
    "Europe/Paris": "FR", "Europe/Berlin": "DE", "Europe/London": "GB", "Europe/Rome": "IT",
    "Europe/Moscow": "RU", "Europe/Kaliningrad": "RU", "Europe/Samara": "RU",
    "Europe/Amsterdam": "NL", "Europe/Brussels": "BE", "Europe/Vienna": "AT", "Europe/Warsaw": "PL",
    "Europe/Athens": "GR", "Europe/Bucharest": "RO", "Europe/Budapest": "HU", "Europe/Prague": "CZ",
    "Europe/Stockholm": "SE", "Europe/Oslo": "NO", "Europe/Copenhagen": "DK", "Europe/Helsinki": "FI",
    "Europe/Dublin": "IE", "Europe/Zurich": "CH", "Europe/Kyiv": "UA", "Europe/Kiev": "UA",
    "Europe/Istanbul": "TR", "Europe/Sofia": "BG", "Europe/Belgrade": "RS",
    // Asia
    "Asia/Manila": "PH", "Asia/Jakarta": "ID", "Asia/Makassar": "ID", "Asia/Jayapura": "ID",
    "Asia/Shanghai": "CN", "Asia/Urumqi": "CN", "Asia/Tokyo": "JP", "Asia/Seoul": "KR",
    "Asia/Bangkok": "TH", "Asia/Kolkata": "IN", "Asia/Calcutta": "IN", "Asia/Singapore": "SG",
    "Asia/Kuala_Lumpur": "MY", "Asia/Ho_Chi_Minh": "VN", "Asia/Dubai": "AE", "Asia/Riyadh": "SA",
    "Asia/Karachi": "PK", "Asia/Dhaka": "BD", "Asia/Taipei": "TW", "Asia/Hong_Kong": "HK",
    "Asia/Yangon": "MM", "Asia/Phnom_Penh": "KH", "Asia/Vientiane": "LA", "Asia/Tel_Aviv": "IL",
    "Asia/Jerusalem": "IL",
    // Africa
    "Africa/Lagos": "NG", "Africa/Cairo": "EG", "Africa/Johannesburg": "ZA", "Africa/Nairobi": "KE",
    "Africa/Casablanca": "MA", "Africa/Accra": "GH", "Africa/Algiers": "DZ", "Africa/Tunis": "TN",
    "Africa/Luanda": "AO", "Africa/Maputo": "MZ",
    // Oceania
    "Pacific/Auckland": "NZ", "Pacific/Fiji": "FJ", "Pacific/Guam": "GU", "Pacific/Port_Moresby": "PG"
  };
  function detectCountry() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (TZ_COUNTRY_MAP[tz]) return TZ_COUNTRY_MAP[tz];
      if (tz.startsWith("Australia/")) return "AU";
      return "XX"; // unmapped — grouped as "other" within its region
    } catch (_) {
      return "XX";
    }
  }
  const VISITOR_COUNTRY = detectCountry();

  // ---- Fallback (same browser only) ----
  const ONLINE_KEY = "dnOrigins_onlineHeartbeat";
  const STALE_THRESHOLD = 25000;
  function localCount() {
    try {
      const raw = localStorage.getItem(ONLINE_KEY);
      const beats = raw ? JSON.parse(raw) : {};
      const now = Date.now();
      beats[SESSION_ID] = now;
      const fresh = {};
      let count = 0;
      for (const [id, ts] of Object.entries(beats)) {
        if (now - ts < STALE_THRESHOLD) { fresh[id] = ts; count++; }
      }
      localStorage.setItem(ONLINE_KEY, JSON.stringify(fresh));
      return Math.max(1, count);
    } catch (_) {
      return 1;
    }
  }

  function localRegions() {
    // No real cross-visitor data available without the backend, so this
    // fallback can only report the current device's own region.
    return { [VISITOR_REGION]: 1 };
  }
  function localCountries(region) {
    // Same limitation as localRegions: only knows about this device.
    if (region !== VISITOR_REGION) return {};
    return { [VISITOR_COUNTRY]: 1 };
  }

  let lastRegions = null;
  let lastCountries = null; // { region: { countryCode: count } }
  function showOnline(n) {
    const el = document.getElementById("onlineCountValue");
    if (el) el.textContent = n;
  }

  async function heartbeat() {
    touchOwnTab();
    try {
      const res = await fetch(PRESENCE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: SESSION_ID, region: VISITOR_REGION, country: VISITOR_COUNTRY }),
        cache: "no-store"
      });
      if (!res.ok) throw new Error(`presence ${res.status}`);
      const data = await res.json();
      if (typeof data.count !== "number") throw new Error("bad response");
      showOnline(data.count);
      lastRegions = (data.regions && typeof data.regions === "object") ? data.regions : null;
      lastCountries = (data.countries && typeof data.countries === "object") ? data.countries : null;
    } catch (_) {
      showOnline(localCount());
      lastRegions = null;
      lastCountries = null;
    }
    if (typeof window.refreshRegionPanel === "function") window.refreshRegionPanel();
  }
  window.getOnlineRegions = () => lastRegions || localRegions();
  window.getOnlineCountries = (region) => (lastCountries && lastCountries[region]) || localCountries(region);
  window.VISITOR_REGION = VISITOR_REGION;
  window.VISITOR_COUNTRY = VISITOR_COUNTRY;

  // Tell the server this session is gone (so the count drops right away) —
  // but only once every tab belonging to this device has closed.
  window.addEventListener("pagehide", () => {
    if (!isLastTabForDevice()) return;
    try {
      const blob = new Blob([JSON.stringify({ id: SESSION_ID, leave: true })], { type: "application/json" });
      navigator.sendBeacon(PRESENCE_URL, blob);
    } catch (_) {}
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") heartbeat();
  });

  heartbeat();
  setInterval(heartbeat, HEARTBEAT_INTERVAL);

  // -------------------------------------------------------
  // FEATURE 4 & 5: Switch Class button + Right-click drag reorder
  // Injected on each new row via MutationObserver on the tbody
  // -------------------------------------------------------

  // Open the class-switch popover anchored near the clicked button
  function openSwitchClassPopover(anchorBtn, currentRow) {
    // Reuse the class dropdown grid but as a floating popover
    document.querySelectorAll(".switch-class-popover").forEach(p => p.remove());

    const popover = document.createElement("div");
    popover.className = "switch-class-popover dropdown-menu class-grid";
    popover.style.position = "fixed";
    popover.style.zIndex = "10500";

    ALL_CLASSES.forEach(cls => {
      const btn = document.createElement("button");
      btn.className = "class-icon-btn";
      btn.dataset.classId = cls.id;
      btn.title = typeof getClassName === "function" ? getClassName(cls) : cls.name;

      const img = document.createElement("img");
      img.src = `img/${cls.id}.png`;
      img.alt = btn.title;
      img.onerror = () => { img.style.display = "none"; btn.textContent = cls.id.slice(0,3).toUpperCase(); };
      btn.appendChild(img);

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        // Update the row's class
        currentRow.dataset.classId = cls.id;
        // Update the class image in the row
        const rowImg = currentRow.querySelector("img[data-class-id]");
        if (rowImg) {
          rowImg.src = `img/${cls.id}.png`;
          rowImg.alt = btn.title;
          rowImg.dataset.classId = cls.id;
        }
        // Update the main class-cell-wrapper img
        const wrapperImg = currentRow.querySelector(".class-cell-wrapper img");
        if (wrapperImg) {
          wrapperImg.src = `img/${cls.id}.png`;
          wrapperImg.alt = btn.title;
          wrapperImg.dataset.classId = cls.id;
        }
        // Update the "Class "Nick"" label so the class-name portion matches
        // the newly picked class (nickname itself is unchanged).
        const nickLabelEl = currentRow.querySelector(".class-nickname");
        if (nickLabelEl) {
          const nickname = nickLabelEl.dataset.nickname || nickLabelEl.textContent;
          renderClassNickLabel(nickLabelEl, cls, nickname);
        }
        popover.remove();
      });
      popover.appendChild(btn);
    });

    // Position near anchor
    const rect = anchorBtn.getBoundingClientRect();
    popover.style.top = `${rect.top - 4}px`;
    popover.style.left = `${rect.right + 6}px`;

    // Close on outside click
    const closePopover = (ev) => {
      if (!popover.contains(ev.target)) {
        popover.remove();
        document.removeEventListener("click", closePopover, true);
      }
    };
    setTimeout(() => document.addEventListener("click", closePopover, true), 0);

    document.body.appendChild(popover);
  }

  // -------------------------------------------------------
  // Drag & drop helpers — rows can be reordered inside a table AND moved
  // between tables (the tables sit side by side).
  // -------------------------------------------------------

  // Picks the table under the pointer. The horizontal position decides the
  // table (so the empty space below a short table still belongs to it); if the
  // pointer is outside every table's column, the closest table wins.
  function pickTableContainer(x, y) {
    let best = null;
    let bestScore = Infinity;
    document.querySelectorAll("#tablesWrapper .table-container").forEach((c) => {
      const r = c.getBoundingClientRect();
      const inColumn = x >= r.left && x <= r.right;
      const dx = inColumn ? 0 : Math.min(Math.abs(x - r.left), Math.abs(x - r.right));
      const dy = y < r.top ? r.top - y : (y > r.bottom ? y - r.bottom : 0);
      const score = inColumn ? dy : 100000 + Math.hypot(dx, dy);
      if (score < bestScore) { bestScore = score; best = c; }
    });
    return best;
  }

  // Works out where the dragged row would land: which table, which row it goes
  // next to, and whether before or after it. Above the first row / below the
  // last row of a table means "first" / "last" position of that table.
  function getDropTarget(x, y, dragRow) {
    const container = pickTableContainer(x, y);
    if (!container) return null;
    const tbody = container.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll(":scope > tr"));
    if (rows.length === 0) return { container, tbody, row: null, before: true };

    let hit = rows.find((r) => {
      const rect = r.getBoundingClientRect();
      return y >= rect.top && y <= rect.bottom;
    });
    if (!hit) {
      hit = y < rows[0].getBoundingClientRect().top ? rows[0] : rows[rows.length - 1];
    }
    if (hit === dragRow) return null; // hovering over itself → nothing to do

    const rect = hit.getBoundingClientRect();
    return { container, tbody, row: hit, before: y < rect.top + rect.height / 2 };
  }

  function clearDropMarks() {
    document.querySelectorAll("tr.drag-over-top, tr.drag-over-bottom").forEach((r) => {
      r.classList.remove("drag-over-top", "drag-over-bottom");
    });
    document.querySelectorAll(".table-container.drop-active").forEach((c) => {
      c.classList.remove("drop-active");
    });
  }

  // Keeps every table within MAX_ROWS_PER_TABLE: if a row was dropped into a
  // full table, its last row moves to the top of the next table (a new table is
  // created when needed). Tables left empty are removed (one always stays).
  function rebalanceTables() {
    const wrapper = document.getElementById("tablesWrapper");
    let containers = Array.from(wrapper.querySelectorAll(".table-container"));

    for (let i = 0; i < containers.length; i++) {
      const tbody = containers[i].querySelector("tbody");
      while (tbody.children.length > MAX_ROWS_PER_TABLE) {
        if (!containers[i + 1]) {
          window.createNewTableContainer();
          containers = Array.from(wrapper.querySelectorAll(".table-container"));
        }
        const nextBody = containers[i + 1].querySelector("tbody");
        nextBody.insertBefore(tbody.lastElementChild, nextBody.firstElementChild);
      }
    }

    wrapper.querySelectorAll(".table-container").forEach((c) => {
      const total = wrapper.querySelectorAll(".table-container").length;
      if (total > 1 && c.querySelector("tbody").children.length === 0) c.remove();
    });
  }

  // Attach switch-class button + left-click drag to a row
  function instrumentRow(row) {
    if (row.dataset.instrumented) return;
    row.dataset.instrumented = "1";

    const classTd = row.querySelector("td.cell-class");
    if (!classTd) return;

    // --- Switch class button (⇄ icon, bottom-right of class cell) ---
    const switchBtn = document.createElement("button");
    switchBtn.className = "btn-switch-class";
    switchBtn.title = "Trocar classe";
    switchBtn.innerHTML = "⇄";
    switchBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openSwitchClassPopover(switchBtn, row);
    });
    classTd.appendChild(switchBtn);

    // --- Left-click drag to reorder / move between tables ---
    // Drag starts on mousedown inside the class cell (but not on buttons/inputs)
    classTd.addEventListener("mousedown", (e) => {
      // Only left button; ignore clicks on the interactive children
      if (e.button !== 0) return;
      if (e.target.closest("button, input, .btn-add-content-mini, .btn-gear-mini, .btn-remove-row, .btn-switch-class")) return;

      e.preventDefault(); // prevent text selection while dragging

      let dragging = false;
      let ghost = null;
      let target = null;
      const startX = e.clientX;
      const startY = e.clientY;

      const onMouseMove = (mv) => {
        if (!dragging) {
          if (Math.abs(mv.clientX - startX) < 4 && Math.abs(mv.clientY - startY) < 4) return;
          dragging = true;

          // Make original row semi-transparent (keeps its layout space)
          row.style.opacity = "0.25";
          document.body.classList.add("is-dragging-row");

          // Compact ghost that follows the cursor on both axes, so it stays
          // visible (and doesn't hide the drop marker) when crossing tables.
          ghost = document.createElement("div");
          ghost.className = "drag-ghost";
          ghost.style.cssText = `
            position:fixed; pointer-events:none; z-index:99999;
            background:var(--bg-panel-alt); border:2px solid var(--accent-flame);
            border-radius:4px; opacity:0.9; box-shadow:0 6px 20px rgba(0,0,0,0.7);
            padding:5px 12px; white-space:nowrap;
            color:var(--accent-gold); font-size:12px; font-weight:bold;
          `;
          const nick = row.querySelector(".class-nickname");
          ghost.textContent = "⠿ " + (nick ? nick.innerText : "");
          document.body.appendChild(ghost);
        }

        ghost.style.left = `${mv.clientX + 14}px`;
        ghost.style.top  = `${mv.clientY + 10}px`;

        // Show where the row will land (table highlight + line above/below a row)
        clearDropMarks();
        target = getDropTarget(mv.clientX, mv.clientY, row);
        if (target) {
          target.container.classList.add("drop-active");
          if (target.row) {
            target.row.classList.add(target.before ? "drag-over-top" : "drag-over-bottom");
          }
        }
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        if (ghost) ghost.remove();
        row.style.opacity = "";
        document.body.classList.remove("is-dragging-row");
        clearDropMarks();

        if (dragging && target) {
          if (!target.row) {
            target.tbody.appendChild(row);
          } else if (target.before) {
            target.tbody.insertBefore(row, target.row);
          } else {
            target.row.insertAdjacentElement("afterend", row);
          }
          rebalanceTables();
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  }

  // Watch for new rows and instrument them
  const tbodyObserver = new MutationObserver(() => {
    document.querySelectorAll("#tablesWrapper tbody tr").forEach(instrumentRow);
  });
  const tablesWrapperEl2 = document.getElementById("tablesWrapper");
  if (tablesWrapperEl2) {
    tbodyObserver.observe(tablesWrapperEl2, { childList: true, subtree: true });
    // Instrument existing rows
    document.querySelectorAll("#tablesWrapper tbody tr").forEach(instrumentRow);
  }

  // FEATURE 2: Gear flyout scroll fix
  // Handled by #flyout-layer (position:fixed, overflow:visible) — menus now use
  // absolute coords inside that layer and never move on page scroll.
  // After mount we clamp upward if the menu bottom would overflow the viewport.
  const flyoutLayer = document.getElementById("flyout-layer") ||
    (() => {
      const l = document.createElement("div");
      l.id = "flyout-layer";
      document.body.appendChild(l);
      return l;
    })();
  const flyoutObserver = new MutationObserver((mutations) => {
    mutations.forEach(mut => {
      mut.addedNodes.forEach(node => {
        if (node.nodeType === 1 && node.classList && node.classList.contains("gear-flyout-menu")) {
          requestAnimationFrame(() => {
            const rect = node.getBoundingClientRect();
            const overflow = rect.bottom - window.innerHeight + 8;
            if (overflow > 0) {
              const currentTop = parseFloat(node.style.top) || 0;
              node.style.top = `${Math.max(8, currentTop - overflow)}px`;
            }
          });
        }
      });
    });
  });
  flyoutObserver.observe(flyoutLayer, { childList: true });

});


// =========================================================
// Menu lateral: abre ao encostar o mouse no canto esquerdo da tela
// (o botão de hambúrguer continua existindo só em telas de toque)
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("sideMenuOverlay");
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeSideMenuBtn");
  if (!overlay || !menuBtn || !closeBtn) return;

  const zone = document.createElement("div");
  zone.className = "menu-hover-zone";
  zone.setAttribute("aria-hidden", "true");
  zone.setAttribute("data-html2canvas-ignore", "");
  document.body.appendChild(zone);

  let openTimer = null;
  let closeTimer = null;

  // Abre quando o mouse SE MOVE dentro da faixa (assim, recarregar a página com o mouse parado
  // no canto não abre o menu sozinho). A pausa de 120 ms evita abrir por um esbarrão rápido.
  zone.addEventListener("mousemove", (e) => {
    if (e.buttons) return; // arrastando algo (ex.: reordenar linhas) não abre o menu
    if (openTimer) return;
    openTimer = setTimeout(() => {
      openTimer = null;
      if (overlay.classList.contains("hidden")) menuBtn.click();
    }, 120);
  });
  zone.addEventListener("mouseleave", () => { clearTimeout(openTimer); openTimer = null; });

  // Tirar o mouse de cima do menu (para a área escurecida) fecha o menu. Usa a posição do mouse em
  // relação à LARGURA FINAL do menu, então não fecha por engano enquanto ele ainda está deslizando.
  const menuEl = overlay.querySelector(".side-menu");
  const scheduleClose = () => {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      if (!overlay.classList.contains("hidden")) closeBtn.click();
    }, 250);
  };
  overlay.addEventListener("mousemove", (e) => {
    const w = menuEl ? menuEl.offsetWidth : 260;
    if (e.clientX > w + 6) scheduleClose();
    else clearTimeout(closeTimer);
  });
  overlay.addEventListener("mouseleave", scheduleClose);

});


// =========================================================
// Filtro (canto superior direito): Classe, Personagem (por nick) e Conteúdo (completado / pendente)
// =========================================================
const FILTER_LABELS = {
  "pt-BR": { title: "Filtro", cls: "Classe", character: "Personagem", content: "Conteúdo", specific: "Por conteúdo", done: "Conteúdo completado", pending: "Conteúdo pendente", clear: "Limpar filtros", none: "Nenhum personagem adicionado" },
  "pt-PT": { title: "Filtro", cls: "Classe", character: "Personagem", content: "Conteúdo", specific: "Por conteúdo", done: "Conteúdo completado", pending: "Conteúdo pendente", clear: "Limpar filtros", none: "Nenhum personagem adicionado" },
  es:      { title: "Filtro", cls: "Clase", character: "Personaje", content: "Contenido", specific: "Por contenido", done: "Contenido completado", pending: "Contenido pendiente", clear: "Limpiar filtros", none: "Ningún personaje añadido" },
  en:      { title: "Filter", cls: "Class", character: "Character", content: "Content", specific: "By content", done: "Completed content", pending: "Pending content", clear: "Clear filters", none: "No characters added" },
  ru:      { title: "Фильтр", cls: "Класс", character: "Персонаж", content: "Контент", specific: "По контенту", done: "Пройденный контент", pending: "Непройденный контент", clear: "Сбросить фильтры", none: "Персонажи не добавлены" },
  fil:     { title: "Filter", cls: "Class", character: "Character", content: "Content", specific: "Ayon sa content", done: "Tapos na content", pending: "Nakabinbing content", clear: "I-clear ang mga filter", none: "Walang naka-add na character" },
  id:      { title: "Filter", cls: "Kelas", character: "Karakter", content: "Konten", specific: "Berdasarkan konten", done: "Konten selesai", pending: "Konten tertunda", clear: "Hapus filter", none: "Belum ada karakter yang ditambahkan" },
  zh:      { title: "筛选", cls: "职业", character: "角色", content: "内容", specific: "按内容", done: "已完成内容", pending: "待完成内容", clear: "清除筛选", none: "尚未添加角色" },
  fr:      { title: "Filtre", cls: "Classe", character: "Personnage", content: "Contenu", specific: "Par contenu", done: "Contenu terminé", pending: "Contenu en attente", clear: "Effacer les filtres", none: "Aucun personnage ajouté" },
  de:      { title: "Filter", cls: "Klasse", character: "Charakter", content: "Inhalt", specific: "Nach Inhalt", done: "Abgeschlossener Inhalt", pending: "Ausstehender Inhalt", clear: "Filter zurücksetzen", none: "Kein Charakter hinzugefügt" }
};

function getFilterLabels() {
  return FILTER_LABELS[getCurrentLang()] || FILTER_LABELS["pt-BR"];
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("filterBtn");
  const panel = document.getElementById("filterPanel");
  const badge = document.getElementById("filterBadge");
  const tablesWrapper = document.getElementById("tablesWrapper");
  if (!btn || !panel || !tablesWrapper) return;

  const state = { classes: new Set(), characters: new Set(), contents: new Set(), content: null, open: null }; // classes: ids de classe; characters: nicks; content: null | "done" | "pending"

  const nickOf = (row) => {
    const el = row.querySelector(".class-nickname");
    return el ? (el.dataset.nickname || el.innerText).trim() : "";
  };
  const allRows = () => Array.from(tablesWrapper.querySelectorAll("tbody tr"));
  const isActive = () => state.classes.size > 0 || state.characters.size > 0 || state.contents.size > 0 || !!state.content;

  // Aplica o filtro: esconde linhas / chips e tabelas que ficaram sem linhas visíveis.
  function apply() {
    const rows = allRows();

    // remove da seleção classes / nicks que não existem mais
    const existingNicks = new Set(rows.map(nickOf));
    state.characters.forEach((n) => { if (!existingNicks.has(n)) state.characters.delete(n); });
    const existingClasses = new Set(rows.map((r) => r.dataset.classId));
    state.classes.forEach((id) => { if (!existingClasses.has(id)) state.classes.delete(id); });

    const mode = state.content;
    rows.forEach((row) => {
      let visible = (state.classes.size === 0 || state.classes.has(row.dataset.classId)) &&
                    (state.characters.size === 0 || state.characters.has(nickOf(row)));

      const container = row.querySelector(".content-chips-container");
      if (container) {
        let matches = 0;
        container.querySelectorAll(".content-chip").forEach((chip) => {
          const done = chip.classList.contains("done");
          const show = (!mode || (mode === "done" ? done : !done)) &&
                       (state.contents.size === 0 || state.contents.has(chip.dataset.title));
          chip.classList.toggle("filter-hidden", !show);
          if (show) matches++;
        });
        const chipFilter = !!mode || state.contents.size > 0;
        container.classList.toggle("is-filtered", chipFilter);
        if (chipFilter && matches === 0) visible = false;
      }

      row.classList.toggle("filter-hidden-row", !visible);
    });

    tablesWrapper.querySelectorAll(".table-container").forEach((c) => {
      const anyVisible = c.querySelector("tbody tr:not(.filter-hidden-row)");
      c.classList.toggle("filter-hidden-table", isActive() && !anyVisible);
    });

    const count = state.classes.size + state.characters.size + state.contents.size + (state.content ? 1 : 0);
    badge.textContent = count;
    badge.classList.toggle("hidden", count === 0);
    btn.classList.toggle("is-active", count > 0);
  }

  // Mantém o filtro em dia quando algo muda na tabela (chip concluído, adicionado, importação...)
  let raf = 0;
  const observer = new MutationObserver(() => {
    if (!isActive()) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => { apply(); observer.takeRecords(); });
  });
  observer.observe(tablesWrapper, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "data-class-id"] });

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function render() {
    const L = getFilterLabels();
    const prevScroll = panel.scrollTop;
    panel.innerHTML = "";
    btn.title = L.title;

    // ---- Classe (por classe: Archer, Cleric...) ----
    const clsHead = el("button", "filter-section-head" + (state.open === "class" ? " open" : ""));
    clsHead.type = "button";
    clsHead.appendChild(el("span", "", L.cls + (state.classes.size ? ` (${state.classes.size})` : "")));
    clsHead.appendChild(el("span", "filter-chevron", "▾"));
    clsHead.addEventListener("click", () => { state.open = state.open === "class" ? null : "class"; render(); });
    panel.appendChild(clsHead);

    if (state.open === "class") {
      const list = el("div", "filter-options");
      const seenClasses = new Set();
      allRows().forEach((row) => {
        const id = row.dataset.classId;
        if (!id || seenClasses.has(id)) return;
        seenClasses.add(id);
        const cls = ALL_CLASSES.find((c) => c.id === id);
        const on = state.classes.has(id);
        const opt = el("button", "filter-option" + (on ? " on" : ""));
        opt.type = "button";
        opt.appendChild(el("span", "filter-check", on ? "✓" : ""));
        const img = row.querySelector(".class-cell-wrapper img");
        if (img) {
          const icon = document.createElement("img");
          icon.src = img.src;
          icon.alt = "";
          icon.className = "filter-option-icon";
          opt.appendChild(icon);
        }
        opt.appendChild(el("span", "filter-option-text", cls ? getClassName(cls) : id));
        opt.addEventListener("click", () => {
          if (on) state.classes.delete(id); else state.classes.add(id);
          apply();
          render();
        });
        list.appendChild(opt);
      });
      if (!seenClasses.size) list.appendChild(el("div", "filter-empty", L.none));
      panel.appendChild(list);
    }

    // ---- Personagem (por nick) ----
    const chHead = el("button", "filter-section-head" + (state.open === "character" ? " open" : ""));
    chHead.type = "button";
    chHead.appendChild(el("span", "", L.character + (state.characters.size ? ` (${state.characters.size})` : "")));
    chHead.appendChild(el("span", "filter-chevron", "▾"));
    chHead.addEventListener("click", () => { state.open = state.open === "character" ? null : "character"; render(); });
    panel.appendChild(chHead);

    if (state.open === "character") {
      const list = el("div", "filter-options");
      const seen = new Set();
      allRows().forEach((row) => {
        const nick = nickOf(row);
        if (!nick || seen.has(nick)) return;
        seen.add(nick);
        const on = state.characters.has(nick);
        const opt = el("button", "filter-option" + (on ? " on" : ""));
        opt.type = "button";
        opt.appendChild(el("span", "filter-check", on ? "✓" : ""));
        const img = row.querySelector(".class-cell-wrapper img");
        if (img) {
          const icon = document.createElement("img");
          icon.src = img.src;
          icon.alt = "";
          icon.className = "filter-option-icon";
          opt.appendChild(icon);
        }
        opt.appendChild(el("span", "filter-option-text", nick));
        opt.addEventListener("click", () => {
          if (on) state.characters.delete(nick); else state.characters.add(nick);
          apply();
          render();
        });
        list.appendChild(opt);
      });
      if (!seen.size) list.appendChild(el("div", "filter-empty", L.none));
      panel.appendChild(list);
    }

    // ---- Conteúdo ----
    const ctHead = el("button", "filter-section-head" + (state.open === "content" ? " open" : ""));
    ctHead.type = "button";
    ctHead.appendChild(el("span", "", L.content + ((state.content ? 1 : 0) + state.contents.size ? ` (${(state.content ? 1 : 0) + state.contents.size})` : "")));
    ctHead.appendChild(el("span", "filter-chevron", "▾"));
    ctHead.addEventListener("click", () => { state.open = state.open === "content" ? null : "content"; render(); });
    panel.appendChild(ctHead);

    if (state.open === "content") {
      const list = el("div", "filter-options");
      [["done", L.done], ["pending", L.pending]].forEach(([key, label]) => {
        const on = state.content === key;
        const opt = el("button", "filter-option" + (on ? " on" : ""));
        opt.type = "button";
        opt.appendChild(el("span", "filter-radio" + (on ? " on" : "")));
        opt.appendChild(el("span", "filter-status " + key, key === "done" ? "✓" : "✗"));
        opt.appendChild(el("span", "filter-option-text", label));
        opt.addEventListener("click", () => {
          state.content = on ? null : key;
          apply();
          render();
        });
        list.appendChild(opt);
      });

      // Cada conteúdo (multisseleção): mostra só os conteúdos escolhidos
      list.appendChild(el("div", "filter-subhead", L.specific));
      ALL_CONTENTS.forEach((title) => {
        const chosen = state.contents.has(title);
        const opt = el("button", "filter-option" + (chosen ? " on" : ""));
        opt.type = "button";
        opt.appendChild(el("span", "filter-check", chosen ? "✓" : ""));
        opt.appendChild(el("span", "filter-option-text", getContentLabel(title)));
        opt.addEventListener("click", () => {
          if (chosen) state.contents.delete(title); else state.contents.add(title);
          apply();
          render();
        });
        list.appendChild(opt);
      });
      panel.appendChild(list);
    }

    // ---- Limpar ----
    if (isActive()) {
      const clear = el("button", "filter-clear", L.clear);
      clear.type = "button";
      clear.addEventListener("click", () => {
        state.classes.clear();
        state.characters.clear();
        state.contents.clear();
        state.content = null;
        apply();
        render();
      });
      panel.appendChild(clear);
    }

    panel.scrollTop = prevScroll;
  }

  function openPanel() {
    render();
    panel.classList.remove("hidden");
    btn.setAttribute("aria-expanded", "true");
  }
  function closePanel() {
    panel.classList.add("hidden");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (panel.classList.contains("hidden")) openPanel(); else closePanel();
  });
  panel.addEventListener("click", (e) => e.stopPropagation());
  document.addEventListener("click", closePanel);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePanel(); });

  btn.title = getFilterLabels().title;
  btn.addEventListener("mouseenter", () => { btn.title = getFilterLabels().title; });
});


// =========================================================
// Scrollbars personalizadas (para o cursor personalizado valer também sobre elas)
// Só em telas com mouse; em telas de toque ficam as scrollbars nativas.
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const SELECTOR = [
    ".switch-class-popover", ".class-grid", ".content-dropdown-mini", ".gear-flyout-menu",
    ".content-chips-container", ".manual-modal-body", ".side-menu-panel", ".guide-modal-body",
    ".guide-table-wrapper", ".progression-wrapper", ".filter-panel", ".filter-options",
    "[data-custom-scroll]"
  ].join(",");

  const BAR = 9;          // espessura da ÁREA DE CLIQUE da barra (px) — maior que a linha visível, pra facilitar arrastar com o cursor personalizado; a linha fina em si é desenhada por CSS (ver .cs-thumb-v/.cs-thumb-h)
  const EDGE = 2;         // distância da borda do elemento (px)
  const PAGE = { page: true };   // a própria página (viewport)
  const root = document.documentElement;

  const layer = document.createElement("div");
  layer.id = "csLayer";
  layer.setAttribute("data-html2canvas-ignore", "");
  document.body.appendChild(layer);
  root.classList.add("cs-on");

  const state = new Map(); // alvo -> { v: bar, h: bar }

  function scrollerOf(t) { return t === PAGE ? document.scrollingElement || root : t; }

  function metrics(t) {
    const el = scrollerOf(t);
    if (t === PAGE) {
      return { sl: el.scrollLeft, st: el.scrollTop, sw: el.scrollWidth, sh: el.scrollHeight,
               cw: root.clientWidth, ch: root.clientHeight, left: 0, top: 0 };
    }
    const r = el.getBoundingClientRect();
    return { sl: el.scrollLeft, st: el.scrollTop, sw: el.scrollWidth, sh: el.scrollHeight,
             cw: el.clientWidth, ch: el.clientHeight, left: r.left + el.clientLeft, top: r.top + el.clientTop };
  }

  function scrollBy(t, dx, dy) {
    const el = scrollerOf(t);
    el.scrollLeft += dx;
    el.scrollTop += dy;
  }

  function makeBar(axis, t) {
    const track = document.createElement("div");
    track.className = "cs-track";
    const thumb = document.createElement("div");
    thumb.className = "cs-thumb " + (axis === "v" ? "cs-thumb-v" : "cs-thumb-h"); // eixo em classe própria: o CSS desenha a linha fina (visual) centralizada dentro da área de clique (maior, para facilitar arrastar)
    track.appendChild(thumb);
    layer.appendChild(track);

    const bar = { axis, track, thumb, trackLen: 0, thumbLen: 0, maxScroll: 0, thumbPos: 0 };

    // arrastar a barra
    thumb.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      thumb.setPointerCapture(e.pointerId);
      thumb.classList.add("dragging");
      const start = axis === "v" ? e.clientY : e.clientX;
      const el = scrollerOf(t);
      const s0 = axis === "v" ? el.scrollTop : el.scrollLeft;
      const move = (ev) => {
        const free = bar.trackLen - bar.thumbLen;
        if (free <= 0) return;
        const d = (axis === "v" ? ev.clientY : ev.clientX) - start;
        const v = s0 + d * (bar.maxScroll / free);
        if (axis === "v") el.scrollTop = v; else el.scrollLeft = v;
      };
      const up = () => {
        thumb.classList.remove("dragging");
        thumb.removeEventListener("pointermove", move);
        thumb.removeEventListener("pointerup", up);
        thumb.removeEventListener("pointercancel", up);
      };
      thumb.addEventListener("pointermove", move);
      thumb.addEventListener("pointerup", up);
      thumb.addEventListener("pointercancel", up);
    });

    // clicar na trilha rola uma "página" na direção do clique
    track.addEventListener("pointerdown", (e) => {
      if (e.target !== track || e.button !== 0) return;
      e.preventDefault();
      const rect = thumb.getBoundingClientRect();
      const m = metrics(t);
      if (axis === "v") scrollBy(t, 0, (e.clientY < rect.top ? -1 : 1) * m.ch * 0.9);
      else scrollBy(t, (e.clientX < rect.left ? -1 : 1) * m.cw * 0.9, 0);
    });

    // roda do mouse sobre a barra também rola o elemento
    track.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (axis === "v") scrollBy(t, 0, e.deltaY); else scrollBy(t, e.deltaY || e.deltaX, 0);
    }, { passive: false });

    return bar;
  }

  function hide(bar) { if (bar) bar.track.style.display = "none"; }

  // Elemento coberto por outra coisa (modal, menu, cabeçalho fixo...)? Então a barra não aparece.
  function occluded(t, x, y) {
    const hit = document.elementFromPoint(x, y);
    if (!hit) return true;
    if (t === PAGE) {
      for (let n = hit; n && n !== document.body && n !== root; n = n.parentElement) {
        if (getComputedStyle(n).position === "fixed") return true;
      }
      return false;
    }
    return !scrollerOf(t).contains(hit);
  }

  function place(t, axis, m, other) {
    let s = state.get(t);
    if (!s) { s = { v: null, h: null }; state.set(t, s); }

    const overflow = axis === "v" ? m.sh - m.ch : m.sw - m.cw;
    if (overflow <= 1 || m.cw <= 0 || m.ch <= 0) { hide(s[axis]); return; }

    let x, y, w, h, trackLen;
    if (axis === "v") {
      trackLen = m.ch - EDGE * 2 - (other ? BAR + EDGE : 0);
      x = m.left + m.cw - BAR - EDGE; y = m.top + EDGE; w = BAR; h = trackLen;
    } else {
      trackLen = m.cw - EDGE * 2 - (other ? BAR + EDGE : 0);
      x = m.left + EDGE; y = m.top + m.ch - BAR - EDGE; w = trackLen; h = BAR;
    }
    if (trackLen < 20) { hide(s[axis]); return; }

    // fora da tela, ou coberto por outro elemento
    if (x + w < 0 || y + h < 0 || x > window.innerWidth || y > window.innerHeight) { hide(s[axis]); return; }
    // Testa vários pontos ao longo da barra (não só o meio): se um menu/popover cobrir qualquer
    // trecho dela, a barra some, em vez de ficar desenhada por cima do menu.
    const covered = t === PAGE
      ? occluded(t, window.innerWidth - 24, window.innerHeight / 2)
      : [0.02, 0.25, 0.5, 0.75, 0.98].some((f) => {
          const px = axis === "v" ? x - 3 : x + w * f;
          const py = axis === "v" ? y + h * f : y - 3;
          if (px < 0 || py < 0 || px >= window.innerWidth || py >= window.innerHeight) return false; // trecho fora da tela
          return occluded(t, px, py);
        });
    if (covered) { hide(s[axis]); return; }

    let bar = s[axis];
    if (!bar) bar = s[axis] = makeBar(axis, t);

    const ratio = axis === "v" ? m.ch / m.sh : m.cw / m.sw;
    const thumbLen = Math.max(28, Math.min(trackLen, trackLen * ratio));
    const pos = axis === "v" ? m.st : m.sl;
    const free = trackLen - thumbLen;
    const thumbPos = overflow > 0 ? Math.max(0, Math.min(free, (pos / overflow) * free)) : 0;

    bar.trackLen = trackLen; bar.thumbLen = thumbLen; bar.maxScroll = overflow; bar.thumbPos = thumbPos;

    const ts = bar.track.style;
    ts.display = "block";
    ts.left = x + "px"; ts.top = y + "px"; ts.width = w + "px"; ts.height = h + "px";
    const th = bar.thumb.style;
    if (axis === "v") { th.width = "100%"; th.height = thumbLen + "px"; th.transform = `translateY(${thumbPos}px)`; }
    else { th.height = "100%"; th.width = thumbLen + "px"; th.transform = `translateX(${thumbPos}px)`; }
  }

  let raf = 0;
  function update() {
    raf = 0;
    const els = Array.from(document.querySelectorAll(SELECTOR));
    const targets = [PAGE, ...els];

    els.forEach((el) => { if (!el.classList.contains("cs-managed")) el.classList.add("cs-managed"); });

    // remove barras de elementos que saíram da página
    state.forEach((s, t) => {
      if (t !== PAGE && !t.isConnected) {
        if (s.v) s.v.track.remove();
        if (s.h) s.h.track.remove();
        state.delete(t);
      }
    });

    targets.forEach((t) => {
      const el = scrollerOf(t);
      if (t !== PAGE) {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") {
          const s = state.get(t);
          if (s) { hide(s.v); hide(s.h); }
          return;
        }
      }
      const m = metrics(t);
      const vNeeded = m.sh - m.ch > 1;
      const hNeeded = m.sw - m.cw > 1;
      place(t, "v", m, hNeeded);
      place(t, "h", m, vNeeded);
    });
  }

  const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };

  document.addEventListener("scroll", schedule, { capture: true, passive: true });
  window.addEventListener("resize", schedule);
  // ignora as mudanças feitas pelas próprias barras (senão elas se atualizariam em loop)
  new MutationObserver((records) => {
    if (records.some((r) => !layer.contains(r.target))) schedule();
  }).observe(document.body, {
    childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style", "hidden"]
  });
  document.addEventListener("transitionend", schedule, true);
  document.addEventListener("animationend", schedule, true);
  setInterval(schedule, 500); // rede de segurança (fontes/imagens que terminam de carregar, etc.)
  schedule();
});

// =========================================================
// Cursor virtual em JS
// Substitui o cursor do SO por um <img> que flutua sobre a
// página, de forma que nunca desaparece — nem durante diálogos
// nativos de arquivo (Save As / Open File), nem ao retornar
// deles. O cursor real do browser fica invisível via
// "cursor: none" (classe js-cursor-on no <html>).
// Só ativa em dispositivos com mouse (hover: hover).
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const CUR_SRC = "extra/cursor.cur"; // caminho relativo à raiz do projeto
  const html    = document.documentElement;

  // Cria o elemento cursor dentro do #csLayer (z-index máximo, pointer-events: none)
  const csLayer = document.getElementById("csLayer");
  if (!csLayer) return;

  const img = document.createElement("img");
  img.id  = "jsCursor";
  img.src = CUR_SRC;
  img.setAttribute("aria-hidden", "true");
  img.setAttribute("data-html2canvas-ignore", "");
  csLayer.appendChild(img);

  // Só ativa após o .cur carregar com sucesso
  img.addEventListener("load", () => {
    html.classList.add("js-cursor-on");
    img.style.display = "block";
  }, { once: true });

  // Se o .cur não carregar (caminho errado, etc.) não quebra nada:
  // o cursor do SO continua visível normalmente.
  img.addEventListener("error", () => {
    html.classList.remove("js-cursor-on");
  }, { once: true });

  // Segue o mouse em tempo real
  document.addEventListener("pointermove", (e) => {
    // Pega o csLayer como referência de coordenadas (position: fixed, inset: 0)
    img.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
  }, { passive: true });

  // Esconde ao sair da janela, mostra ao entrar
  window.addEventListener("mouseleave", () => { img.style.display = "none"; });
  window.addEventListener("mouseenter", () => { img.style.display = "block"; });
});


// =========================================================
// Resets automáticos de conteúdo (GMT-3)
//  - "Missão diária": desmarcada todo dia às 04:00.
//  - Todos os demais conteúdos: desmarcados todo sábado às 04:00.
// O quadro não fica salvo no navegador (só no backup JSON), então o reset acontece:
//  1) ao vivo, enquanto a página está aberta (checagem a cada 30 s e ao voltar para a aba);
//  2) ao importar um backup: vale tudo que "venceu" entre o momento em que o backup foi salvo
//     (campo savedAt do JSON; em backups antigos usa a data do arquivo) e agora.
// =========================================================
(function () {
  const TZ_OFFSET_MS = -3 * 60 * 60 * 1000; // GMT-3 (fixo)
  const DAY_MS = 24 * 60 * 60 * 1000;
  const RESET_HOUR = 4;
  const SATURDAY = 6;
  const DAILY_TITLE = "Missão diária";

  // Último instante de reset (epoch ms) que já passou em relação a nowMs.
  // Truque: deslocando o relógio em -3h, os getters UTC passam a mostrar a hora de GMT-3.
  function latestBoundary(nowMs, weekly) {
    const shifted = new Date(nowMs + TZ_OFFSET_MS);
    let b = Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate(), RESET_HOUR, 0, 0);
    if (shifted.getTime() < b) b -= DAY_MS; // ainda não deu 04:00 hoje → vale o de ontem
    if (weekly) {
      const dow = new Date(b).getUTCDay();
      b -= ((dow - SATURDAY + 7) % 7) * DAY_MS; // volta até o último sábado 04:00
    }
    return b - TZ_OFFSET_MS;
  }

  function uncheckChips(kind) {
    document.querySelectorAll("#tablesWrapper .content-chip.done").forEach((chip) => {
      const isDaily = chip.dataset.title === DAILY_TITLE;
      if (kind === "daily" ? !isDaily : isDaily) return;
      chip.classList.remove("done");
      const status = chip.querySelector(".chip-status");
      if (status) status.innerHTML = CHIP_ICON_X;
    });
  }

  function applyResetsBetween(fromMs, toMs) {
    if (!isFinite(fromMs) || !isFinite(toMs) || fromMs >= toMs) return;
    if (latestBoundary(toMs, false) > fromMs) uncheckChips("daily");
    if (latestBoundary(toMs, true) > fromMs) uncheckChips("weekly");
  }

  window.applyContentResetsSince = (fromMs) => applyResetsBetween(Number(fromMs), Date.now());

  // Exposes the next daily-reset instant (epoch ms) so the priority chip
  // countdown (added below) can reuse the exact same boundary logic.
  window.getNextDailyResetMs = (nowMs) => latestBoundary(nowMs === undefined ? Date.now() : nowMs, false) + DAY_MS;
  window.DAILY_CONTENT_TITLE = DAILY_TITLE;

  let lastTick = Date.now();
  function tick() {
    const now = Date.now();
    applyResetsBetween(lastTick, now);
    lastTick = now;
  }
  setInterval(tick, 30 * 1000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) tick(); });
})();


// =========================================================
// Coluna Especial / Coluna Normal (botão no canto superior direito da tabela)
//  - Normal: modelo atual (tabelas de até 10 personagens, lado a lado, coluna de conteúdo de largura fixa).
//  - Especial: tabela única; a coluna de conteúdo ocupa toda a largura restante da tela, então dá para
//    adicionar mais conteúdos sem precisar da scrollbar e sem abrir várias tabelas.
// A escolha fica salva no navegador.
// =========================================================
const COLUMN_MODE_LABELS = {
  "pt-BR": { title: "Layout da coluna", special: "Coluna Especial", specialDesc: "Tabela única; o conteúdo ocupa toda a largura", normal: "Coluna Normal", normalDesc: "Modelo padrão (tabelas lado a lado)" },
  "pt-PT": { title: "Layout da coluna", special: "Coluna Especial", specialDesc: "Tabela única; o conteúdo ocupa toda a largura", normal: "Coluna Normal", normalDesc: "Modelo padrão (tabelas lado a lado)" },
  es:      { title: "Diseño de columna", special: "Columna Especial", specialDesc: "Tabla única; el contenido ocupa todo el ancho", normal: "Columna Normal", normalDesc: "Modelo estándar (tablas lado a lado)" },
  en:      { title: "Column layout", special: "Special Column", specialDesc: "Single table; content fills the full width", normal: "Normal Column", normalDesc: "Default model (tables side by side)" },
  ru:      { title: "Вид колонки", special: "Особая колонка", specialDesc: "Одна таблица; контент на всю ширину", normal: "Обычная колонка", normalDesc: "Стандартный вид (таблицы рядом)" },
  fil:     { title: "Layout ng column", special: "Special Column", specialDesc: "Iisang table; sakop ng content ang buong lapad", normal: "Normal Column", normalDesc: "Karaniwang modelo (magkakatabing table)" },
  id:      { title: "Tata letak kolom", special: "Kolom Khusus", specialDesc: "Satu tabel; konten memenuhi seluruh lebar", normal: "Kolom Normal", normalDesc: "Model standar (tabel berdampingan)" },
  zh:      { title: "列布局", special: "特殊列", specialDesc: "单表格；内容占满整个宽度", normal: "常规列", normalDesc: "默认模式（表格并排显示）" },
  fr:      { title: "Disposition des colonnes", special: "Colonne spéciale", specialDesc: "Un seul tableau ; le contenu occupe toute la largeur", normal: "Colonne normale", normalDesc: "Modèle par défaut (tableaux côte à côte)" },
  de:      { title: "Spaltenlayout", special: "Spezialspalte", specialDesc: "Eine Tabelle; der Inhalt füllt die gesamte Breite aus", normal: "Normale Spalte", normalDesc: "Standardmodell (Tabellen nebeneinander)" }
};

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("tablesWrapper");
  if (!wrapper) return;

  const MODE_KEY = "dnOriginsColumnMode"; // "normal" | "special"
  let mode = "normal";
  try { mode = localStorage.getItem(MODE_KEY) === "special" ? "special" : "normal"; } catch (e) { /* ignore */ }

  const labels = () => COLUMN_MODE_LABELS[getCurrentLang()] || COLUMN_MODE_LABELS["pt-BR"];

  // Reorganiza as linhas existentes: tudo numa tabela (especial) ou de 10 em 10 (normal).
  function relayout() {
    document.body.classList.toggle("col-special", mode === "special");
    MAX_ROWS_PER_TABLE = mode === "special" ? Infinity : 10;

    let containers = Array.from(wrapper.querySelectorAll(".table-container"));
    if (!containers.length) return;

    const rows = Array.from(wrapper.querySelectorAll("tbody > tr"));
    const needed = Math.max(1, Math.ceil(rows.length / MAX_ROWS_PER_TABLE));
    while (containers.length < needed) {
      window.createNewTableContainer();
      containers = Array.from(wrapper.querySelectorAll(".table-container"));
    }
    rows.forEach((row, i) => {
      const target = containers[Math.floor(i / MAX_ROWS_PER_TABLE)].querySelector("tbody");
      if (row.parentElement !== target) target.appendChild(row);
    });
    containers.slice(needed).forEach((c) => c.remove());
  }

  // ---- popover de escolha ----
  let pop = null;
  function closePopover() {
    if (pop) { pop.remove(); pop = null; }
  }

  function openPopover(anchor) {
    closePopover();
    const L = labels();
    pop = document.createElement("div");
    pop.className = "col-mode-popover";
    pop.setAttribute("data-html2canvas-ignore", "");

    const title = document.createElement("div");
    title.className = "col-mode-title";
    title.textContent = L.title;
    pop.appendChild(title);

    [["special", L.special, L.specialDesc], ["normal", L.normal, L.normalDesc]].forEach(([key, name, desc]) => {
      const on = mode === key;
      const opt = document.createElement("button");
      opt.type = "button";
      opt.className = "col-mode-option" + (on ? " on" : "");

      const radio = document.createElement("span");
      radio.className = "filter-radio" + (on ? " on" : "");
      const text = document.createElement("span");
      text.className = "col-mode-option-text";
      const n = document.createElement("strong");
      n.textContent = name;
      const d = document.createElement("small");
      d.textContent = desc;
      text.appendChild(n);
      text.appendChild(d);
      opt.appendChild(radio);
      opt.appendChild(text);

      opt.addEventListener("click", () => {
        mode = key;
        try { localStorage.setItem(MODE_KEY, mode); } catch (e) { /* ignore */ }
        relayout();
        closePopover();
      });
      pop.appendChild(opt);
    });

    pop.addEventListener("click", (e) => e.stopPropagation());
    document.body.appendChild(pop);

    const r = anchor.getBoundingClientRect();
    pop.style.top = `${r.bottom + 6}px`;
    pop.style.right = `${Math.max(8, document.documentElement.clientWidth - r.right)}px`;
  }

  // ---- botão no canto superior direito de cada tabela ----
  function ensureButtons() {
    wrapper.querySelectorAll(".table-container").forEach((c) => {
      if (c.querySelector(":scope > .col-mode-btn")) return;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "col-mode-btn";
      b.setAttribute("data-html2canvas-ignore", "");
      b.setAttribute("aria-haspopup", "true");
      b.title = labels().title;
      b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/></svg>';
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        if (pop) closePopover(); else openPopover(b);
      });
      b.addEventListener("mouseenter", () => { b.title = labels().title; });
      c.appendChild(b);
    });
  }

  let raf = 0;
  new MutationObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(ensureButtons);
  }).observe(wrapper, { childList: true });

  document.addEventListener("click", closePopover);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePopover(); });

  ensureButtons();
  relayout();
});

// =========================================================
// Region breakdown slide-in panel — shared by two triggers:
//   - the online-counter badge ("Pessoas online por região")
//   - the total-visitors counter ("Total de visitantes por região")
// Each region row can be clicked to expand and show a breakdown by
// country within that region. Data source depends on which trigger opened
// the panel: window.getOnlineRegions/getOnlineCountries (from the
// presence/heartbeat block above) for the online mode, and
// window.getTotalRegions/getTotalCountries (from the total-access block
// below) for the total-visitors mode.
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const onlineCounter = document.getElementById("onlineCounter");
  const totalCounter = document.getElementById("totalAccessCounter");
  const overlay = document.getElementById("regionPanelOverlay");
  const closeBtn = document.getElementById("closeRegionPanelBtn");
  const body = document.getElementById("regionPanelBody");
  const titleEl = document.getElementById("regionPanelTitle");
  if (!overlay || !body) return;

  const REGION_ORDER = ["southAmerica", "northAmerica", "europe", "asia", "africa", "oceania", "unknown"];
  const REGION_KEY_I18N = {
    southAmerica: "regionSouthAmerica",
    northAmerica: "regionNorthAmerica",
    europe: "regionEurope",
    asia: "regionAsia",
    africa: "regionAfrica",
    oceania: "regionOceania",
    unknown: "regionUnknown"
  };

  let currentMode = "online"; // "online" | "total"
  let expandedRegion = null;

  function countryName(code) {
    if (!code || code === "XX") return i18n("regionUnknown", "Unknown");
    try {
      const dn = new Intl.DisplayNames([getCurrentLang()], { type: "region" });
      return dn.of(code) || code;
    } catch (_) {
      return code;
    }
  }

  function getRegions() {
    if (currentMode === "total") {
      return (typeof window.getTotalRegions === "function") ? window.getTotalRegions() : {};
    }
    return (typeof window.getOnlineRegions === "function") ? window.getOnlineRegions() : {};
  }
  function getCountries(region) {
    if (currentMode === "total") {
      return (typeof window.getTotalCountries === "function") ? window.getTotalCountries(region) : {};
    }
    return (typeof window.getOnlineCountries === "function") ? window.getOnlineCountries(region) : {};
  }

  function renderRegions() {
    const regions = getRegions() || {};
    body.innerHTML = "";
    const entries = REGION_ORDER
      .map((key) => [key, regions[key] || 0])
      .filter(([, count]) => count > 0);

    if (entries.length === 0) {
      const empty = document.createElement("div");
      empty.className = "region-row";
      empty.textContent = "—";
      body.appendChild(empty);
      return;
    }

    entries
      .sort((a, b) => b[1] - a[1])
      .forEach(([key, count]) => {
        const row = document.createElement("button");
        row.type = "button";
        row.className = "region-row region-row-toggle";
        row.setAttribute("aria-expanded", String(expandedRegion === key));

        const left = document.createElement("span");
        left.className = "region-row-left";
        const arrow = document.createElement("span");
        arrow.className = "region-row-arrow";
        arrow.textContent = "▸";
        const label = document.createElement("span");
        label.textContent = i18n(REGION_KEY_I18N[key], key);
        left.appendChild(arrow);
        left.appendChild(label);

        const countEl = document.createElement("span");
        countEl.className = "region-row-count";
        countEl.textContent = String(count).padStart(2, "0");

        row.appendChild(left);
        row.appendChild(countEl);
        row.addEventListener("click", (e) => {
          e.stopPropagation();
          expandedRegion = (expandedRegion === key) ? null : key;
          renderRegions();
        });
        body.appendChild(row);

        if (expandedRegion === key) {
          const countries = getCountries(key) || {};
          const countryEntries = Object.entries(countries)
            .filter(([, c]) => c > 0)
            .sort((a, b) => b[1] - a[1]);

          const wrap = document.createElement("div");
          wrap.className = "region-country-list";
          if (countryEntries.length === 0) {
            const empty = document.createElement("div");
            empty.className = "region-country-row";
            empty.textContent = "—";
            wrap.appendChild(empty);
          } else {
            countryEntries.forEach(([code, c]) => {
              const crow = document.createElement("div");
              crow.className = "region-country-row";
              const cLabel = document.createElement("span");
              cLabel.textContent = countryName(code);
              const cCount = document.createElement("span");
              cCount.className = "region-row-count";
              cCount.textContent = String(c).padStart(2, "0");
              crow.appendChild(cLabel);
              crow.appendChild(cCount);
              wrap.appendChild(crow);
            });
          }
          body.appendChild(wrap);
        }
      });
  }

  function openPanel(mode) {
    currentMode = mode;
    expandedRegion = null;
    if (titleEl) titleEl.textContent = i18n(mode === "total" ? "totalByRegionTitle" : "onlineByRegionTitle");
    renderRegions();
    overlay.classList.remove("hidden");
    overlay.classList.remove("closing");
  }
  function closePanel() {
    overlay.classList.add("closing");
    setTimeout(() => overlay.classList.add("hidden"), 200);
  }

  // Re-renders the panel in place (new heartbeat/stats data, or language
  // switch) without closing it, but only while it's actually open.
  window.refreshRegionPanel = () => {
    if (overlay.classList.contains("hidden")) return;
    if (titleEl) titleEl.textContent = i18n(currentMode === "total" ? "totalByRegionTitle" : "onlineByRegionTitle");
    renderRegions();
  };

  if (onlineCounter) {
    onlineCounter.addEventListener("click", (e) => {
      e.stopPropagation();
      openPanel("online");
    });
  }
  if (totalCounter) {
    totalCounter.classList.add("stat-counter-clickable");
    totalCounter.addEventListener("click", (e) => {
      e.stopPropagation();
      openPanel("total");
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", closePanel);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closePanel(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !overlay.classList.contains("hidden")) closePanel(); });
});

// =========================================================
// Total access counter + daily average
// Counts unique visits (one per device per day) client-side via
// localStorage, and, when available, prefers real numbers reported by the
// backend presence endpoint (a "stats" field on the /api/presence response,
// or a dedicated /api/stats endpoint — either is used if present). Without a
// backend, falls back to a local, per-browser approximation so the UI is
// never left blank; this is clearly the weaker of the two behaviours since
// it can only see this one browser's history.
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const totalEl = document.getElementById("totalAccessValue");
  const avgEl = document.getElementById("dailyAvgValue");
  if (!totalEl || !avgEl) return;

  const STATS_KEY = "dnOrigins_accessStats";
  const TODAY_KEY = "dnOrigins_accessStatsLastDay";

  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  function loadLocalStats() {
    try {
      const raw = localStorage.getItem(STATS_KEY);
      return raw ? JSON.parse(raw) : { total: 0, firstDay: null, days: {} };
    } catch (_) {
      return { total: 0, firstDay: null, days: {} };
    }
  }

  function saveLocalStats(stats) {
    try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)); } catch (_) {}
  }

  // Registers at most one visit per calendar day for this browser/device,
  // so refreshing the page repeatedly doesn't inflate the count.
  function registerLocalVisitIfNeeded() {
    const stats = loadLocalStats();
    const today = todayStr();
    let lastDay = null;
    try { lastDay = localStorage.getItem(TODAY_KEY); } catch (_) {}
    if (lastDay !== today) {
      stats.total = (stats.total || 0) + 1;
      if (!stats.firstDay) stats.firstDay = today;
      stats.days = stats.days || {};
      stats.days[today] = (stats.days[today] || 0) + 1;
      saveLocalStats(stats);
      try { localStorage.setItem(TODAY_KEY, today); } catch (_) {}
    }
    return stats;
  }

  function renderLocalStats() {
    const stats = registerLocalVisitIfNeeded();
    const dayCount = Object.keys(stats.days || {}).length || 1;
    totalEl.textContent = stats.total || 1;
    avgEl.textContent = Math.ceil((stats.total || 1) / dayCount);
  }

  // Region/country breakdown for the "Total de visitantes" panel — mirrors
  // window.getOnlineRegions/getOnlineCountries but backed by the server's
  // all-time totals (data.stats.regions / data.stats.countries) instead of
  // who's online right now. Falls back to just this device's own
  // region/country (same weaker local approximation used elsewhere).
  let lastTotalRegions = null;
  let lastTotalCountries = null; // { region: { countryCode: count } }
  function localTotalRegions() {
    const region = (typeof window.VISITOR_REGION === "string") ? window.VISITOR_REGION : "unknown";
    return { [region]: 1 };
  }
  function localTotalCountries(region) {
    const visitorRegion = (typeof window.VISITOR_REGION === "string") ? window.VISITOR_REGION : "unknown";
    if (region !== visitorRegion) return {};
    const country = (typeof window.VISITOR_COUNTRY === "string") ? window.VISITOR_COUNTRY : "XX";
    return { [country]: 1 };
  }
  window.getTotalRegions = () => lastTotalRegions || localTotalRegions();
  window.getTotalCountries = (region) => (lastTotalCountries && lastTotalCountries[region]) || localTotalCountries(region);

  async function loadServerStats() {
    try {
      const res = await fetch("/api/presence", { method: "GET", cache: "no-store" });
      if (!res.ok) throw new Error(`stats ${res.status}`);
      const data = await res.json();
      if (data && data.stats && typeof data.stats.total === "number" && typeof data.stats.dailyAverage === "number") {
        totalEl.textContent = data.stats.total;
        avgEl.textContent = Math.ceil(data.stats.dailyAverage);
        lastTotalRegions = (data.stats.regions && typeof data.stats.regions === "object") ? data.stats.regions : null;
        lastTotalCountries = (data.stats.countries && typeof data.stats.countries === "object") ? data.stats.countries : null;
        if (typeof window.refreshRegionPanel === "function") window.refreshRegionPanel();
        return true;
      }
    } catch (_) {}
    return false;
  }

  // Prefer the real, cross-visitor server numbers; fall back to (and always
  // seed) the local approximation so the header never shows a blank value.
  renderLocalStats();
  loadServerStats().then((ok) => { if (!ok) renderLocalStats(); });
});

// =========================================================
// Auto-save — salva automaticamente o backup JSON a cada mudança feita
// no board (sem precisar de interação do usuário). Ativado/desativado
// pela flag no botão "Auto" no cabeçalho. O estado persiste em localStorage.
//
// Na primeira vez que é ativado, se o navegador suportar a File System
// Access API, é pedido (via diálogo "Salvar como") o arquivo/local de
// destino — esse é o "primeiro download". A referência ao arquivo (file
// handle) é guardada no IndexedDB, e todo auto-save seguinte grava
// silenciosamente NESSE MESMO arquivo, substituindo o conteúdo — sem
// abrir diálogo nenhum e sem disparar a barra/notificação de download
// do navegador. Em navegadores sem suporte a essa API (ex.: Firefox),
// cai de volta no método antigo (um novo download a cada auto-save).
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const AUTOSAVE_KEY = "dnOriginsAutoSave";
  const AUTOSAVE_DELAY = 2000; // debounce: espera 2s após a última mudança
  const DB_NAME = "dnOriginsAutoSaveDB";
  const STORE_NAME = "handles";
  const HANDLE_KEY = "autosaveFileHandle";
  const supportsFsAccess = typeof window.showSaveFilePicker === "function";

  const btn = document.getElementById("autoSaveToggleBtn");
  const tablesWrapperEl = document.getElementById("tablesWrapper");
  if (!btn || !tablesWrapperEl) return;

  let autoSaveEnabled = localStorage.getItem(AUTOSAVE_KEY) === "true";
  if (autoSaveEnabled && !supportsFsAccess) {
    // Estado herdado de uma sessão anterior neste navegador (ou de outro
    // navegador, se o localStorage foi importado) — sem a File System Access
    // API não há como continuar salvando num único arquivo, então desligamos
    // em vez de retomar o download repetido/quebrado.
    autoSaveEnabled = false;
    localStorage.setItem(AUTOSAVE_KEY, "false");
  }
  let saveTimer = null;
  let lastSavedHash = null;
  let fileHandle = null; // FileSystemFileHandle cached in memory once obtained/loaded

  function updateBtnState() {
    btn.setAttribute("aria-pressed", String(autoSaveEnabled));
    const label = btn.querySelector(".autosave-label");
    if (autoSaveEnabled) {
      btn.title = supportsFsAccess
        ? "Auto-save: ativado — salva no arquivo escolhido a cada mudança"
        : "Auto-save: ativado — salva na pasta Downloads a cada mudança";
      if (label) label.textContent = "Auto";
    } else {
      btn.title = "Auto-save: desativado — clique para ativar";
      if (label) label.textContent = "Auto";
    }
  }

  // ---- IndexedDB: guarda o file handle entre sessões ----
  function openHandleDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains(STORE_NAME)) {
          req.result.createObjectStore(STORE_NAME);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function saveHandleToDB(handle) {
    try {
      const db = await openHandleDB();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).put(handle, HANDLE_KEY);
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
      });
    } catch (_) {}
  }

  async function loadHandleFromDB() {
    try {
      const db = await openHandleDB();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const req = tx.objectStore(STORE_NAME).get(HANDLE_KEY);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    } catch (_) {
      return null;
    }
  }

  async function clearHandleFromDB() {
    try {
      const db = await openHandleDB();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).delete(HANDLE_KEY);
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
      });
    } catch (_) {}
  }

  async function getStoredHandle() {
    if (fileHandle) return fileHandle;
    const stored = await loadHandleFromDB();
    if (stored) fileHandle = stored;
    return fileHandle;
  }

  // Pede permissão de leitura/escrita ao handle. Sem gesto do usuário (ex.:
  // durante um auto-save automático em background) o navegador só concede
  // se a permissão já tiver sido dada antes — por isso a checagem/pedido
  // "de verdade" acontece no clique do botão (verifyPermissionWithPrompt).
  async function hasPermission(handle) {
    try {
      return (await handle.queryPermission({ mode: "readwrite" })) === "granted";
    } catch (_) {
      return false;
    }
  }

  async function verifyPermissionWithPrompt(handle) {
    try {
      if ((await handle.queryPermission({ mode: "readwrite" })) === "granted") return true;
      return (await handle.requestPermission({ mode: "readwrite" })) === "granted";
    } catch (_) {
      return false;
    }
  }

  function gatherExportData() {
    const data = { savedAt: Date.now(), characters: [], presets: [] };
    try {
      const raw = localStorage.getItem("dnOriginsPresets");
      if (raw) data.presets = JSON.parse(raw);
    } catch (_) {}

    tablesWrapperEl.querySelectorAll("tbody tr").forEach((row) => {
      const classId = row.dataset.classId;
      const nicknameEl = row.querySelector(".class-nickname");
      const nickname = nicknameEl ? (nicknameEl.dataset.nickname || nicknameEl.innerText) : "";
      let gear = { set: null, weapon: null };
      try { gear = JSON.parse(row.dataset.gear || "{}"); } catch (_) {}
      const contents = [];
      row.querySelectorAll(".content-chip").forEach((chip) => {
        const entry = { title: chip.dataset.title, done: chip.classList.contains("done") };
        if (chip.dataset.account) entry.account = chip.dataset.account;
        contents.push(entry);
      });
      data.characters.push({ classId, nickname, gear, contents });
    });
    return data;
  }

  function flashBtn() {
    btn.classList.add("autosave-flash");
    setTimeout(() => btn.classList.remove("autosave-flash"), 600);
  }

  // Fallback antigo: dispara um download de verdade a cada save. Só é usado
  // quando o navegador não suporta a File System Access API.
  function legacyDownloadSave(jsonStr) {
    const dateStr = new Date().toISOString().slice(0, 10);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dragon-nest-autosave-${dateStr}.json`;
    link.setAttribute("data-html2canvas-ignore", "");
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function autoSave() {
    if (!autoSaveEnabled) return;
    const data = gatherExportData();
    const jsonStr = JSON.stringify(data, null, 2);

    // Avoid redundant saves: skip if content hasn't changed since last save.
    if (jsonStr === lastSavedHash) return;

    if (supportsFsAccess) {
      const handle = await getStoredHandle();
      if (handle && (await hasPermission(handle))) {
        try {
          const writable = await handle.createWritable();
          await writable.write(jsonStr);
          await writable.close();
          lastSavedHash = jsonStr;
          flashBtn();
          return;
        } catch (_) {
          // Handle went stale (file/pasta movida ou apagada) — cai no fallback abaixo.
        }
      } else {
        // Ainda não temos um arquivo escolhido, ou a permissão expirou e não
        // há gesto do usuário agora para repedi-la. Não há como salvar
        // silenciosamente neste momento; espera o usuário clicar no botão
        // novamente (verifyPermissionWithPrompt cuida disso no listener de click).
        return;
      }
    }

    legacyDownloadSave(jsonStr);
    lastSavedHash = jsonStr;
    flashBtn();
  }

  function scheduleAutoSave() {
    if (!autoSaveEnabled) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(autoSave, AUTOSAVE_DELAY);
  }

  // Watch for any DOM change inside the tables wrapper
  const observer = new MutationObserver(scheduleAutoSave);
  observer.observe(tablesWrapperEl, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "data-gear", "data-account"]
  });

  btn.addEventListener("click", async (e) => {
    e.stopPropagation();
    const turningOn = !autoSaveEnabled;

    // Sem a File System Access API (ex.: Firefox) não há como sobrescrever um
    // único arquivo silenciosamente — cada "auto-save" acabaria disparando um
    // novo download (o navegador numera como "(1)", "(2)"...) e, se a opção
    // "perguntar onde salvar cada arquivo" estiver ativa, um diálogo a cada
    // vez. Em vez de repetir esse comportamento quebrado, avisamos e não
    // ativamos — o botão "Exportar" continua disponível para salvar na hora.
    if (turningOn && !supportsFsAccess) {
      if (window.showToast) {
        window.showToast(
          "Auto-save em arquivo único não é suportado neste navegador. Use Chrome/Edge, ou clique em Exportar para salvar manualmente."
        );
      }
      return;
    }

    if (turningOn && supportsFsAccess) {
      let handle = await getStoredHandle();
      if (handle) {
        // Já existe um arquivo escolhido de uma sessão anterior — este
        // clique (gesto do usuário) é a chance de re-confirmar a permissão.
        const ok = await verifyPermissionWithPrompt(handle);
        if (!ok) {
          if (window.showToast) window.showToast("Permissão de escrita negada — auto-save desativado");
          return;
        }
      } else {
        // Primeira ativação: pede onde salvar. Esse é o "primeiro download";
        // todo auto-save seguinte sobrescreve este mesmo arquivo.
        try {
          const dateStr = new Date().toISOString().slice(0, 10);
          handle = await window.showSaveFilePicker({
            suggestedName: `dragon-nest-autosave-${dateStr}.json`,
            types: [
              {
                description: "Dragon Nest Backup",
                accept: { "application/json": [".json"] }
              }
            ]
          });
          fileHandle = handle;
          await saveHandleToDB(handle);
        } catch (err) {
          if (err && err.name === "AbortError") return; // usuário cancelou — mantém desativado
          if (window.showToast) window.showToast("Não foi possível escolher o arquivo de auto-save");
          return;
        }
      }
    }

    autoSaveEnabled = turningOn;
    localStorage.setItem(AUTOSAVE_KEY, String(autoSaveEnabled));
    lastSavedHash = null; // força o próximo autoSave a gravar mesmo sem mudanças
    updateBtnState();
    if (window.showToast) {
      window.showToast(autoSaveEnabled ? "Auto-save ativado" : "Auto-save desativado");
    }
    if (autoSaveEnabled) scheduleAutoSave();
  });

  updateBtnState();
});

// =========================================================
// Hide the "+" (add class) button while the page is scrolled — it sits
// right above the tables, close enough to the sticky header that its own
// hover glow could peek out from under the header's edge while scrolling
// past it. Instead of fighting the glow, just hide the button outright as
// soon as there's any scroll, and bring it back once at the very top.
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const controlsBar = document.querySelector(".controls");
  if (!controlsBar) return;

  const SCROLL_TOP_THRESHOLD = 2; // px de tolerância pra ainda contar como "no topo"

  function updateControlsVisibility() {
    const scrollTop = document.scrollingElement ? document.scrollingElement.scrollTop : (window.scrollY || 0);
    controlsBar.classList.toggle("controls-scrolled", scrollTop > SCROLL_TOP_THRESHOLD);
  }

  window.addEventListener("scroll", updateControlsVisibility, { passive: true });
  updateControlsVisibility();
});

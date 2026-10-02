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
  nameSpan.textContent = nickname;

  labelEl.appendChild(classSpan);
  labelEl.appendChild(nameSpan);
  labelEl.title = `${nickname} · ${className}`; // nome completo ao passar o mouse (caso seja truncado)
  labelEl.classList.toggle("nick-long", `${className} ${nickname}`.length >= 14);
}
window.renderClassNickLabel = renderClassNickLabel;

// =========================================================
// Criador de Composições — dados de buff/debuff por classe
// (fonte: aba "BUFFS/DEBUFFS (DNO)" da planilha). Chaves batem
// com os ids de ALL_CLASSES. "patk: '*'" = valor variável na
// planilha original (não somado no total, mostrado como "*").
// =========================================================
const CLASS_COMP_DATA = {
  barbarian:    { buff: { pdef: 30, mdef: 30 }, debuff: { patk: 50, matk: 50, critdmg: 20 }, buffs: [ "Charging Howl" ], debuffs: [ "Devastating Howl", "Taunting Howl" ], variableBuffs: [ "Highlander", "Battle Howl" ] },
  destroyer:    { buff: { pdef: 30, mdef: 30 }, debuff: { patk: 70, matk: 70, critdmg: 20 }, buffs: [ "Charging Howl" ], debuffs: [ "Devastating Howl EX", "Taunting Howl" ], variableBuffs: [ "Highlander", "Battle Howl" ] },
  gladiator:    { buff: {}, debuff: { pdef: 50, mdef: 50 }, buffs: [ "" ], debuffs: [ "Piercing Thrust" ], variableBuffs: [ "Highlander" ] },
  moonlord:     { buff: {}, debuff: { pdef: 50, mdef: 80 }, buffs: [ "" ], debuffs: [ "Piercing Thrust", "Cyclone Slash EX" ], variableBuffs: [ "Highlander" ] },
  darkavenger:  { buff: { fire: 28 }, debuff: { fire: 28, pdef: 28, mdef: 28 }, buffs: [ "Shadow Call" ], debuffs: [ "Avenger Force", "Soul Cutter" ], variableBuffs: [ "Highlander" ] },
  // silverhunter: ainda não tem dados de buff/debuff na planilha de origem.

  tempest:      { buff: { mvspeed: 40, cd: 40, crit: 100 }, debuff: { pdef: 30 }, buffs: [ "Owls Insight", "Owls Rage", "Spirit Boost" ], debuffs: [ "Binding Shot EX" ] },
  windwalker:   { buff: { mvspeed: 40, cd: 40, crit: 100 }, debuff: {}, buffs: [ "Owls Insight", "Owls Rage", "Spirit Boost" ], debuffs: [""] },
  sentinel:     { buff: { crit: 100 }, debuff: { pdef: 30, mdef: 30, resist: 11 }, buffs: [ "Owls Insight", "Owls Rage" ], debuffs: [ "Bulls Eye" ] },
  sniper:       { buff: { crit: 100 }, debuff: { pdef: 30, mdef: 30, resist: 11 }, buffs: [ "Owls Insight", "Owls Rage" ], debuffs: [ "Bulls Eye" ] },

  obscuria:     { buff: { mvspeed: 10, cd: 80 }, debuff: { dark: 40, mdef: 35, icestack: 50 }, buffs: [ "Mana Flow", "Beyond Time" ], debuffs: [ "Glacial Spikes", "Force Mirror", "Gravity Ascension EX" ] },
  ilumia:       { buff: { mvspeed: 10, cd: 80 }, debuff: { light: 10, mdef: 35, icestack: 50 }, buffs: [ "Mana Flow", "Beyond Time" ], debuffs: [ "Glacial Spikes", "Force Mirror", "Linear Ray EX" ] },
  glaciana:     { buff: { mvspeed: 10 }, debuff: { ice: 10, icestack: 100 }, buffs: [ "Mana Flow" ], debuffs: [ "Glacial Spikes", "Frost Wind", "Icy Shards", "Freezing Field EX", "Freezing Spikes", "Chilling Mist", "Glacial Wave", "Blizzard Storm", "Ice Sphere" ] },
  saleana:      { buff: { mvspeed: 10 }, debuff: { ice: 10, fire: 44, icestack: 100 }, buffs: [ "Mana Flow" ], debuffs: [ "Glacial Spikes", "Frost Wind", "Glacial Wave", "Phoenix Storm EX", "Inferno EX" ] },

  shootingstar: { buff: { mvspeed: 50 }, debuff: { patk: 60, matk: 60, light: 15, dark: 15, ice: 45, fire: 15, pdef: 20, mdef: 20, resist: 15 }, buffs: [ "Wax" ], debuffs: [ "Chemical Granade", "Chemical Missile EX" ] },
  gearmaster:   { buff: { mvspeed: 50 }, debuff: { patk: 60, matk: 60, light: 15, dark: 15, ice: 45, fire: 15, resist: 15 }, buffs: [ "Wax" ], debuffs: [ "Chemical Granade" ] },
  adept:        { buff: { acspeed: 36, mvspeed: 50, cd: 15, str: 20, agi: 20, int: 20 }, debuff: { pdef: 20, mdef: 20, resist: 20, light: 20, dark: 20, ice: 50, fire: 20, icestack: 50 }, buffs: [ "Wax", "Cocktail", "Injector" ], debuffs: ["Engine Coolant", "C2H50H", "Ice Beam" ] },
  physician:    { buff: { acspeed: 36, mvspeed: 50, fd: 50, cd: 15, str: 20, agi: 20, int: 20 }, debuff: { ice: 30, pdef: 33, mdef: 33 }, buffs: [ "Wax", "Cocktail", "Injector EX" ], debuffs: [ "Engine Coolant", "Love Virus" ] },

  crusader:     { buff: { light: 30, ice: 30, fire: 30 }, debuff: { critdmg: 16, light: 45, pdef: 39, mdef: 39 }, buffs: [ "Elemental Aura" ], debuffs: [ "Charge Bolt", "Provoke", "Armor Break", "Lightning Zap", "Smite" ], variableBuffs: [ "Aura Restoration" ] },
  guardian:     { buff: { light: 30, ice: 30, fire: 30 }, debuff: { critdmg: 16, light: 45, pdef: 39, mdef: 39 }, buffs: [ "Elemental Aura" ], debuffs: [ "Charge Bolt", "Provoke", "Armor Break", "Lightning Zap", "Smite" ], variableBuffs: [ "Aura Restoration" ] },
  inquisitor:   { buff: { light: 25, ice: 15, fire: 15, patk: 21, matk: 21, pdef: 24, mdef: 24 }, debuff: { light: 63, patk: 70, matk: 70 }, buffs: [ "Blessing of Light", "Protection Shell", "Striking", "Cure Relic" ], debuffs: [ "Charge Bolt", "Lightning Bolt", "Mind Breaker EX", "Chain Lightning", "Heavens Judgment", "Consecration", "Miracle Relic" ], variableBuffs: [ "Aura Restoration" ] },
  saint:        { buff: { mvspeed: 15, light: 25, ice: 15, fire: 15, patk: 21, matk: 21,  pdef: 24, mdef: 24 }, debuff: { light: 48, patk: 70, matk: 70 }, buffs: ["Blessing of Light", "Protection Shell", "Striking", "Cure Relic EX" ], debuffs: [ "Charge Bolt", "Lightning Bolt", "Chain Lightning", "Binding Relic EX", "Heavens Judgment", "Miracle Relic" ], variableBuffs: [ "Aura Restoration" ] },

  spiritdancer: { buff: { str:80, agi: 80, int: 80, vit: 80, pdef: 35, mdef: 35 }, debuff: {}, buffs: [ "Phantom Guard", "Genie" ], debuffs: [ "" ], variableBuffs: [ "Ecstatic Dance 2 EX" ] },
  bladedancer:  { buff: { str:80, agi: 80, int: 80, vit: 80, pdef: 35, mdef: 35 }, debuff: {}, buffs: [ "Phantom Guard", "Genie" ], debuffs: [ "" ], variableBuffs: [ "Ecstatic Dance 2 EX" ] },
  souleater:    { buff: { cd: 20, str:80, agi: 80, int: 80, vit: 80, patk: 35, matk: 35, pdef: 24, mdef: 24 }, debuff: { pdef: 5, mdef: 5, light: 5, dark: 5, ice: 5, fire: 5 }, buffs: [ "Phantom Guard", "Genie", "Grudge Formation", "Soul Scream"], debuffs: [ "Spirit Paper" ,"Soul Gate", "Beast Spirit" ] },
  darksummoner: { buff: { str:80, agi: 80, int: 80, vit: 80, dark: 28.5, patk: 35, matk: 35, fd: 12 }, debuff: { patk: 5, matk: 5, light: 5, dark: 5, ice: 5, fire: 5 }, buffs: ["Phantom Guard", "Genie", "Grudge Formation", "Sadism Pleasure"], debuffs: ["Spirit Paper" ,"Soul Gate", "Beast Spirit" ] },

  abysswalker:  { buff: { light: 14, dark: 53 }, debuff: { dark: 20, pdef: 32, mdef: 32 }, buffs: ["Blessing of Ajna", "Incarnation of the Dark" ], debuffs: [ "Nightfall" ], variableBuffs: [ "Raid" ] },
  lightfury:    { buff: { mvspeed: 50, fd: 10, light: 14, dark: 28, patk: 46.8, matk: 46.8, pdef: 75, mdef: 75 }, debuff: { light: 10, patk: 25, matk: 25 }, buffs: [ "Blessing of Ajna", "Chakra Ring", "Chakra Miracle", , "Chakra Heal EX" ], debuffs: ["Sunshine Sparks"], variableBuffs: [ "Raid" ] },
  raven:        { buff: {}, debuff: { dark: 30, pdef: 20, mdef: 20 }, buffs: [ "" ], debuffs: [ "Applause EX","Punishment EX" ], variableBuffs: [ "Raid", "Dedicate Crow" ] },
  ripper:       { buff: { fire: 30 }, debuff: { fire: 15, pdef: 20, mdef: 20 }, buffs: [ "Arsonist" ], debuffs: [ "Applause","Punishment", "Blade Runner EX" ], variableBuffs: [ "Raid", "Dedicate Crow" ] },

  valkyrie:     { buff: { light: 16, patk: 20, matk: 20, mdef: 14, pdef: 14 }, debuff: { light: 16 }, buffs: [ "Scar Maker", "Will Maker" ], debuffs: [ "Arcane Focus" ], variableBuffs: [ "Harmonize" ] },
  flurry:       { buff: { patk: 20, matk: 20 }, debuff: { resist: 20 }, buffs: [ "Scar Maker", "Will Maker" ], debuffs: [ "Stab Screw EX" ], variableBuffs: [ "Harmonize" ] },

  ruina:        { buff: { fd: 30 }, debuff: { light: 30, dark: 30, ice: 30, fire: 30, pdef: 30, mdef: 30 }, buffs: [ "" ], debuffs: [ "Flow Through EX", "Deus Ex Machina" ], variableBuffs: [ "Overhowl" ] },
  defensio:     { buff: { fd: 30 }, debuff: { pdef: 12, mdef: 12 }, buffs: [ "" ], debuffs: [ "" ], variableBuffs: [ "Overhowl" ]  }
};

// O segundo item de cada par é a chave de tradução (window.TRANSLATIONS),
// não mais o texto fixo em português — renderCompStatGrid busca o rótulo
// no idioma atual via i18n(), com o texto em pt-BR como fallback.
// Quarto item opcional: "+" = status positivo (sinal +), padrão = negativo (sinal -).
// Ordem: negativos nas linhas de cima, positivos na linha de baixo.
const COMP_DEBUFF_FIELDS = [
  ["light",   "debLightRes", "Resist. Luz"],    ["dark",    "debDarkRes", "Resist. Trevas"],
  ["ice",     "debIceRes",   "Resist. Gelo"],   ["fire",    "debFireRes", "Resist. Fogo"],
  ["resist",  "debCritRes",  "Resist. Crítica"],  ["critdmg", "statCritDmg", "Dano Crítico"],
  ["patk",    "debRedPAtk",  "Redução ATK Físico"],["matk",    "debRedMAtk", "Redução ATK Mágico"],
  ["pdef",    "debTakenPAtk", "ATK Físico Recebido", "+"], ["mdef", "debTakenMAtk", "ATK Mágico Recebido", "+"],
  ["icestack","statIceAmp",  "Amp. Gelo"]
];
const COMP_BUFF_FIELDS = [
  ["pdef", "buffIncPDef", "Aumento DEF Física"],  ["mdef", "buffIncMDef", "Aumento DEF Mágica"],
  ["patk", "buffIncPAtk", "Aumento ATK Físico"],  ["matk", "buffIncMAtk", "Aumento ATK Mágico"],
  ["str",  "buffIncStr",  "Aumento FOR"],         ["agi",  "buffIncAgi",  "Aumento AGI"],
  ["int",  "buffIncInt",  "Aumento INT"],         ["vit",  "buffIncVit",  "Aumento VIT"],
  ["light","buffIncLight","Aumento ATK Luz"],  ["dark", "buffIncDark", "Aumento ATK Trevas"],
  ["ice",  "buffIncIce",  "Aumento ATK Gelo"], ["fire", "buffIncFire", "Aumento ATK Fogo"],
  ["crit", "buffIncCrit", "Aumento Crítico"],     ["cd", "statCdReduction", "Red. Recarga"],
  ["mvspeed", "statMoveSpeed", "Mov. Speed"],        ["acspeed", "statActSpeed", "Act. Speed"],
  ["fd", "statFinalDmg", "Amp. Final Damage"]
];
const COMP_SLOTS_KEY = "dnOriginsCompMaker";
const COMP_SLOT_COUNT = 8;

function loadCompSlots() {
  try {
    const raw = JSON.parse(localStorage.getItem(COMP_SLOTS_KEY) || "[]");
    const arr = Array.isArray(raw) ? raw.slice(0, COMP_SLOT_COUNT) : [];
    while (arr.length < COMP_SLOT_COUNT) arr.push(null);
    return arr;
  } catch (_) {
    return new Array(COMP_SLOT_COUNT).fill(null);
  }
}
let compSlots = loadCompSlots();
function saveCompSlots() {
  try { localStorage.setItem(COMP_SLOTS_KEY, JSON.stringify(compSlots)); } catch (_) {}
}

function computeCompTotals() {
  const debuffTotals = {}; COMP_DEBUFF_FIELDS.forEach(([k]) => debuffTotals[k] = 0);
  const buffTotals = {}; COMP_BUFF_FIELDS.forEach(([k]) => buffTotals[k] = 0);
  const buffList = [];
  const debuffList = [];

  compSlots.forEach((clsId) => {
    if (!clsId) return;
    const data = CLASS_COMP_DATA[clsId];
    const cls = ALL_CLASSES.find((c) => c.id === clsId);
    if (!data) {
      buffList.push({ classId: clsId, name: cls ? getClassName(cls) : clsId, buffs: [] });
      debuffList.push({ classId: clsId, name: cls ? getClassName(cls) : clsId, debuffs: [] });
      return;
    }
    COMP_DEBUFF_FIELDS.forEach(([k]) => { debuffTotals[k] += (data.debuff && data.debuff[k]) || 0; });
    COMP_BUFF_FIELDS.forEach(([k]) => {
      const v = data.buff && data.buff[k];
      // "*" marca um valor variável que não entra na soma — ignorado
      // silenciosamente, sem nenhuma sinalização visual no total.
      if (v === "*") return;
      buffTotals[k] += v || 0;
    });
    if (data.buffs && data.buffs.length) {
      buffList.push({
        classId: clsId,
        name: cls ? getClassName(cls) : clsId,
        buffs: data.buffs,
        cd: data.cd || null,
        // Skills que dão buff pra party mas cujo valor não entra na soma
        // da composição (situacionais, variáveis, etc.) — aparecem numa
        // linha separada, abaixo da linha principal de skills da classe.
        variableBuffs: data.variableBuffs || []
      });
    }
    debuffList.push({
      classId: clsId,
      name: cls ? getClassName(cls) : clsId,
      debuffs: (data.debuffs || []),
      // Skills de debuff que a party recebe mas cujo valor não entra na
      // soma da composição — mostradas inline, depois do último debuff
      // normal (mesmo padrão do "Buffs Flex").
      variableDebuffs: data.variableDebuffs || []
    });
  });

  return { debuffTotals, buffTotals, buffList, debuffList };
}

document.addEventListener("DOMContentLoaded", () => {
  const openCompMakerBtn = document.getElementById("openCompMakerBtn");
  const compMakerOverlay = document.getElementById("compMakerOverlay");
  const closeCompMakerBtn = document.getElementById("closeCompMakerBtn");
  const compMakerBody = document.getElementById("compMakerBody");
  const compSlotsEl = document.getElementById("compSlots");
  const compClassDropdown = document.getElementById("compClassDropdown");
  const compDebuffGrid = document.getElementById("compDebuffGrid");
  const compBuffGrid = document.getElementById("compBuffGrid");
  const compClassBuffsEl = document.getElementById("compClassBuffs");
  const compClassDebuffsEl = document.getElementById("compClassDebuffs");
  const compMakerClearBtn = document.getElementById("compMakerClearBtn");
  const sideMenuOverlay = document.getElementById("sideMenuOverlay");
  const closeSideMenuBtn = document.getElementById("closeSideMenuBtn");
  const compDebuffSlide = document.getElementById("compDebuffSlide");
  const compBuffSlide   = document.getElementById("compBuffSlide");
  const compDebuffToggle = document.getElementById("compDebuffToggle");
  const compBuffToggle   = document.getElementById("compBuffToggle");
  const compDebuffSlideBack = document.getElementById("compDebuffSlideBack");
  const compBuffSlideBack   = document.getElementById("compBuffSlideBack");
  if (!openCompMakerBtn || !compMakerOverlay) return; // segurança caso o HTML ainda não tenha sido atualizado

  function openSlide(panel) { panel.classList.add("comp-slide-open"); }
  function closeSlide(panel) { panel.classList.remove("comp-slide-open"); }

  // Abre slide "exclusivos" animando por cima do painel principal (que permanece visível por baixo)
  // Voltar: fecha o slide atual → o painel principal fica exposto novamente (mesma mecânica)
  if (compDebuffToggle) {
    compDebuffToggle.addEventListener("click", () => openSlide(compDebuffSlide));
    compDebuffToggle.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") openSlide(compDebuffSlide); });
  }
  if (compBuffToggle) {
    compBuffToggle.addEventListener("click", () => openSlide(compBuffSlide));
    compBuffToggle.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") openSlide(compBuffSlide); });
  }
  if (compDebuffSlideBack) compDebuffSlideBack.addEventListener("click", () => closeSlide(compDebuffSlide));
  if (compBuffSlideBack)   compBuffSlideBack.addEventListener("click", () => closeSlide(compBuffSlide));

  // Converte o nome da skill (ex.: "Charging Howl", "Injector EX") no slug
  // usado pelos arquivos de imagem (ex.: "charging_howl", "injector_ex"),
  // seguindo o padrão do exemplo dado ("Cocktail" → "cocktail_icone.png").
  function skillSlug(name) {
    return String(name)
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
  }

  // Skills "EX" (ex.: "Injector EX", "Cure Relic EX") têm 2 ícones e 2
  // imagens de descrição — nomeados a partir do nome BASE da skill (sem o
  // "EX"), ex.: injector_icone_1.png / injector_icone_2.png /
  // injector_descricao_1.png / injector_descricao_2.png. Na lista de
  // buffs/debuffs só o icone_1 é exibido; o icone_2 (versão EX) só
  // aparece no tooltip, sobreposto no canto superior esquerdo da
  // descricao_2.
  function isExSkill(name) {
    return /(^|\s)ex$/i.test(String(name).trim());
  }
  function baseSkillSlug(name) {
    return skillSlug(String(name).replace(/\s*ex$/i, ""));
  }

  // Tooltip flutuante com a imagem de descrição da skill (img/skill/descricao/<slug>_descricao.png).
  // Elemento único, reaproveitado por todos os ícones de skill do painel de composição.
  let skillTooltipEl = null;
  function getSkillTooltip() {
    if (!skillTooltipEl) {
      skillTooltipEl = document.createElement("div");
      skillTooltipEl.className = "comp-skill-tooltip hidden";
      document.body.appendChild(skillTooltipEl);
    }
    return skillTooltipEl;
  }
  // Skills normais têm 1 imagem de descrição (<slug>_descricao.png).
  // Skills "EX" têm 2 imagens de descrição, mostradas lado a lado
  // (<baseSlug>_descricao_1.png e <baseSlug>_descricao_2.png), com o
  // ícone 2 (<baseSlug>_icone_2.png) sobreposto no canto superior
  // esquerdo da segunda imagem.
  function showSkillTooltip(skillName, slug, anchorEl) {
    const tooltip = getSkillTooltip();
    tooltip.innerHTML = "";
    tooltip.classList.remove("comp-skill-tooltip-textonly");

    const ex = isExSkill(skillName);
    const baseSlug = ex ? baseSkillSlug(skillName) : slug;

    const imagesWrap = document.createElement("div");
    imagesWrap.className = "comp-skill-tooltip-images";
    tooltip.appendChild(imagesWrap);

    const nameEl = document.createElement("span");
    nameEl.className = "comp-skill-tooltip-name";
    nameEl.textContent = skillName;
    tooltip.appendChild(nameEl);

    // Se nenhuma imagem de descrição existir/carregar, não escondemos o
    // tooltip inteiro — mostramos o nome da skill em texto, pra sempre dar
    // algum feedback visual ao passar o cursor.
    const totalImages = ex ? 2 : 1;
    let failedImages = 0;
    function onImageError(imgEl) {
      imgEl.classList.add("hidden");
      failedImages++;
      if (failedImages >= totalImages) tooltip.classList.add("comp-skill-tooltip-textonly");
      positionSkillTooltipNear(anchorEl);
    }
    function onImageLoad() {
      positionSkillTooltipNear(anchorEl);
    }

    if (!ex) {
      const img = document.createElement("img");
      img.className = "comp-skill-tooltip-img";
      img.alt = skillName;
      img.onload = onImageLoad;
      img.onerror = () => onImageError(img);
      img.src = `img/skill/descricao/${slug}_descricao.png`;
      imagesWrap.appendChild(img);
    } else {
      const img1 = document.createElement("img");
      img1.className = "comp-skill-tooltip-img";
      img1.alt = skillName;
      img1.onload = onImageLoad;
      img1.onerror = () => onImageError(img1);
      img1.src = `img/skill/descricao/${baseSlug}_descricao_1.png`;
      imagesWrap.appendChild(img1);

      const panel2 = document.createElement("div");
      panel2.className = "comp-skill-tooltip-panel2";
      const img2 = document.createElement("img");
      img2.className = "comp-skill-tooltip-img";
      img2.alt = skillName;
      img2.onload = onImageLoad;
      img2.onerror = () => onImageError(img2);
      img2.src = `img/skill/descricao/${baseSlug}_descricao_2.png`;
      panel2.appendChild(img2);

      const badge = document.createElement("img");
      badge.className = "comp-skill-tooltip-ex-badge";
      badge.alt = "";
      badge.onerror = () => badge.classList.add("hidden");
      badge.src = `img/skill/icones/${baseSlug}_icone_2.png`;
      panel2.appendChild(badge);

      imagesWrap.appendChild(panel2);
    }

    tooltip.classList.remove("hidden");
    positionSkillTooltipNear(anchorEl);
  }
  // Ancora o tooltip ao lado do ícone (como a janela de skill do jogo),
  // em vez de seguir o cursor — mais previsível com a imagem grande.
  // Prefere a direita do ícone; se não couber, vai pra esquerda; sempre
  // travado dentro da viewport (nunca sai da tela).
  function positionSkillTooltipNear(anchorEl) {
    const tooltip = getSkillTooltip();
    const margin = 10;
    const rect = anchorEl.getBoundingClientRect();
    const tw = tooltip.offsetWidth;
    const th = tooltip.offsetHeight;

    let left = rect.right + margin;
    if (left + tw > window.innerWidth - margin) {
      left = rect.left - tw - margin;
    }
    left = Math.max(margin, Math.min(left, window.innerWidth - tw - margin));

    let top = rect.top + rect.height / 2 - th / 2;
    top = Math.max(margin, Math.min(top, window.innerHeight - th - margin));

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }
  function hideSkillTooltip() {
    if (skillTooltipEl) skillTooltipEl.classList.add("hidden");
  }

  // Monta a lista de ícones de skill (usada tanto pelos Buffs quanto pelos
  // Debuffs exclusivos por classe): 1 ícone por skill — pras "EX" mostra
  // sempre o icone_1 (o icone_2 é exclusivo do tooltip, ver
  // showSkillTooltip) —, com hover abrindo o tooltip de descrição, e
  // fallback pro nome em texto se a imagem do ícone não existir.
  function buildSkillIconsWrap(skillNames, emptyText, emptyClass) {
    const wrap = document.createElement("span");
    wrap.className = "comp-class-buff-skills comp-class-buff-skill-icons";
    const realSkills = (skillNames || []).filter(Boolean);
    if (!realSkills.length) {
      // Sem emptyText, o campo fica realmente vazio — sem "—" nem
      // qualquer outra sinalização — quando a classe não tem skill ali.
      if (emptyText) {
        const empty = document.createElement("span");
        empty.textContent = emptyText;
        if (emptyClass) empty.classList.add(emptyClass);
        wrap.appendChild(empty);
      }
      return wrap;
    }
    realSkills.forEach((skillName) => {
      const slug = skillSlug(skillName);
      const ex = isExSkill(skillName);
      const iconSlug = ex ? baseSkillSlug(skillName) : slug;
      const iconSuffix = ex ? "_icone_1" : "_icone";

      const icon = document.createElement("img");
      icon.className = "comp-skill-icon";
      icon.src = `img/skill/icones/${iconSlug}${iconSuffix}.png`;
      icon.alt = skillName;
      icon.addEventListener("mouseenter", () => showSkillTooltip(skillName, slug, icon));
      icon.addEventListener("mouseleave", hideSkillTooltip);
      icon.addEventListener("error", () => {
        const fallback = document.createElement("span");
        fallback.className = "comp-skill-icon-fallback";
        fallback.textContent = skillName;
        fallback.addEventListener("mouseenter", () => showSkillTooltip(skillName, slug, fallback));
        fallback.addEventListener("mouseleave", hideSkillTooltip);
        icon.replaceWith(fallback);
      });
      wrap.appendChild(icon);
    });
    return wrap;
  }

  // Grupo "Flex": skills que dão buff/debuff pra party mas cujo valor não
  // entra na soma da composição (efeito situacional/variável). Mostrado
  // na MESMA linha da classe, logo depois do último ícone de skill
  // normal — classe › buffs (ou debuffs) › Flex › ícones — e só aparece
  // quando há algo na lista.
  function appendFlexGroup(textWrap, skillNames, labelKey, labelFallback) {
    const real = (skillNames || []).filter(Boolean);
    if (!real.length) return;

    // Seta + rótulo "Flex" + ícones ficam dentro do MESMO sub-container
    // flex (em vez de 3 itens soltos do textWrap). Isso garante que, se o
    // textWrap precisar quebrar linha por falta de espaço, o grupo inteiro
    // quebra junto (nunca a seta/rótulo separados dos ícones), e que os
    // três fiquem sempre centralizados entre si, independente de quantos
    // ícones vierem antes deles na linha.
    const group = document.createElement("span");
    group.className = "comp-flex-group";

    const arrow = document.createElement("span");
    arrow.className = "comp-class-buff-arrow";
    arrow.textContent = "›";
    group.appendChild(arrow);

    const label = document.createElement("span");
    label.className = "comp-class-buff-flex-label";
    label.textContent = i18n(labelKey, labelFallback);
    group.appendChild(label);

    group.appendChild(buildSkillIconsWrap(real));
    textWrap.appendChild(group);
  }

  function renderCompStatGrid(container, fields, totals, opts) {
    container.innerHTML = "";
    let positiveStarted = false;
    fields.forEach(([key, labelKey, labelFallback, sign]) => {
      const val = totals[key] || 0;
      const cell = document.createElement("div");
      cell.className = "comp-stat-cell" + (val ? " comp-stat-cell-active" : "");
      const isPositive = sign === "+";
      // Primeiro status positivo sempre começa na coluna 1 (nova linha), separando dos negativos.
      if (isPositive && !positiveStarted) { cell.style.gridColumnStart = "1"; }
      if (isPositive) positiveStarted = true;
      const labelEl = document.createElement("span");
      labelEl.className = "comp-stat-label";
      labelEl.textContent = i18n(labelKey, labelFallback);
      const valueEl = document.createElement("span");
      valueEl.className = "comp-stat-value";
      const rounded = Math.round(val * 100) / 100;
      let text;
      if (opts && opts.isDebuff && !isPositive) {
        text = (rounded ? "-" : "") + rounded + "%";
      } else {
        text = (rounded > 0 ? "+" : "") + rounded + "%";
      }
      valueEl.textContent = text;
      cell.appendChild(labelEl);
      cell.appendChild(valueEl);
      container.appendChild(cell);
    });
  }

  function renderCompResults() {
    const { debuffTotals, buffTotals, buffList, debuffList } = computeCompTotals();
    renderCompStatGrid(compDebuffGrid, COMP_DEBUFF_FIELDS, debuffTotals, { isDebuff: true });
    renderCompStatGrid(compBuffGrid, COMP_BUFF_FIELDS, buffTotals);

    // --- Slide panel: Debuffs exclusivos por classe ---
    // Rótulo classe/skills segue a mesma fonte e layout do rótulo
    // "Classe \"Nickname\"" da coluna de classe da tabela principal
    // (classe em Cinzel/dourado, skills em itálico mais suave).
    compClassDebuffsEl.innerHTML = "";
    debuffList.forEach(({ classId, name, debuffs, variableDebuffs }) => {
      const row = document.createElement("div");
      row.className = "comp-class-buff-row";
      const img = document.createElement("img");
      img.src = `img/classes/${classId}.png`;
      img.alt = name;
      img.title = name;
      row.appendChild(img);

      const textWrap = document.createElement("span");
      textWrap.className = "comp-class-buff-text";

      // Nome da classe removido do texto (o ícone da classe já identifica
      // quem é); no lugar, a mesma seta "›" usada no título do painel.
      // Quando não há debuff normal mas existe Debuffs Flex, essa seta é
      // omitida — o Flex "toma o espaço" do debuff e vira a única seta da
      // linha, em vez de mostrar duas setas seguidas (› › Flex).
      const hasNormalDebuffs = (debuffs || []).some(Boolean);
      const hasFlexDebuffs = (variableDebuffs || []).some(Boolean);
      if (hasNormalDebuffs || !hasFlexDebuffs) {
        const classSpan = document.createElement("span");
        classSpan.className = "comp-class-buff-arrow";
        classSpan.textContent = "›";
        textWrap.appendChild(classSpan);
      }

      // Sem skill de debuff, o campo fica vazio (sem "(preencher)" nem
      // qualquer outra sinalização) — mesmo comportamento dos Buffs.
      // Só entra na linha se tiver ícone de verdade: um wrap vazio ainda
      // conta como item pro "gap" do flex, abrindo um espaço extra antes
      // do grupo Flex nas classes sem debuff normal.
      if (hasNormalDebuffs) {
        textWrap.appendChild(buildSkillIconsWrap(debuffs));
      }

      // "Debuffs Flex": skills de debuff que a party aplica mas cujo
      // valor não entra na soma — mesma linha, logo após os debuffs
      // normais (classe › debuffs › Debuffs Flex › ícones).
      appendFlexGroup(textWrap, variableDebuffs, "compVariableDebuffsLabel", "Flex");

      row.appendChild(textWrap);
      compClassDebuffsEl.appendChild(row);
    });

    // --- Slide panel: Buffs exclusivos por classe ---
    compClassBuffsEl.innerHTML = "";
    buffList.forEach(({ classId, name, buffs, cd, variableBuffs }) => {
      const row = document.createElement("div");
      row.className = "comp-class-buff-row";
      const img = document.createElement("img");
      img.src = `img/classes/${classId}.png`;
      img.alt = name;
      img.title = name;
      row.appendChild(img);

      const textWrap = document.createElement("span");
      textWrap.className = "comp-class-buff-text";

      // Nome da classe removido do texto (o ícone da classe já identifica
      // quem é); no lugar, a mesma seta "›" usada no título do painel.
      // Quando não há buff normal mas existe Buffs Flex, essa seta é
      // omitida — o Flex "toma o espaço" do buff e vira a única seta da
      // linha, em vez de mostrar duas setas seguidas (› › Flex).
      const hasNormalBuffs = (buffs || []).some(Boolean);
      const hasFlexBuffs = (variableBuffs || []).some(Boolean);
      if (hasNormalBuffs || !hasFlexBuffs) {
        const classSpan = document.createElement("span");
        classSpan.className = "comp-class-buff-arrow";
        classSpan.textContent = "›";
        textWrap.appendChild(classSpan);
      }

      // Skills: em vez do nome em texto, mostra o ícone da skill
      // (img/skill/icones/<slug>_icone.png). Passar o cursor por cima
      // mostra a descrição (img/skill/descricao/<slug>_descricao.png)
      // num tooltip flutuante. Se a imagem do ícone não existir, cai
      // de volta pro nome em texto (mesmo padrão de fallback usado nos
      // ícones de boss da Rotação Diária). Skills "EX" mostram aqui
      // apenas o icone_1 (<baseSlug>_icone_1.png) — o icone_2 só aparece
      // no tooltip, sobreposto na 2ª imagem de descrição.
      // Se a classe não tem skill de buff, o campo fica vazio (sem "—"
      // nem qualquer outra sinalização).
      const skillsWrap = buildSkillIconsWrap(buffs);
      if (cd) {
        const cdSpan = document.createElement("span");
        cdSpan.className = "comp-skill-cd";
        cdSpan.textContent = `CD: -${cd}%`;
        skillsWrap.appendChild(cdSpan);
      }
      // Só entra na linha se tiver conteúdo (ícone e/ou CD): um wrap vazio
      // ainda conta como item pro "gap" do flex, abrindo um espaço extra
      // antes do grupo Flex nas classes sem buff normal.
      if (skillsWrap.children.length) {
        textWrap.appendChild(skillsWrap);
      }

      // "Buffs Flex": skills que dão buff pra party mas cujo valor NÃO
      // entra na soma da composição (efeito situacional/variável) —
      // mesma linha, logo após os buffs normais (classe › buffs ›
      // Buffs Flex › ícones).
      appendFlexGroup(textWrap, variableBuffs, "compVariableBuffsLabel", "Flex");

      row.appendChild(textWrap);
      compClassBuffsEl.appendChild(row);
    });
  }

  function closeCompClassDropdown() {
    compClassDropdown.classList.add("hidden");
  }

  function openCompClassPicker(idx, anchorEl) {
    compClassDropdown.innerHTML = "";
    // Mesma ordem da lista de classes da tela inicial (botão de +),
    // sem reordenar por ordem alfabética.
    ALL_CLASSES.forEach((cls) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "class-icon-btn";
      btn.title = getClassName(cls);
      const img = document.createElement("img");
      img.src = `img/classes/${cls.id}.png`;
      img.alt = "";
      btn.appendChild(img);
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        compSlots[idx] = cls.id;
        saveCompSlots();
        closeCompClassDropdown();
        renderCompMaker();
      });
      compClassDropdown.appendChild(btn);
    });

    const bodyRect = compMakerBody.getBoundingClientRect();
    const anchorRect = anchorEl.getBoundingClientRect();
    compClassDropdown.style.left = (anchorRect.left - bodyRect.left + compMakerBody.scrollLeft) + "px";
    compClassDropdown.style.top = (anchorRect.bottom - bodyRect.top + compMakerBody.scrollTop + 4) + "px";
    compClassDropdown.classList.remove("hidden");
  }

  function renderCompMaker() {
    compSlotsEl.innerHTML = "";
    compSlots.forEach((clsId, idx) => {
      const slot = document.createElement("div");
      slot.className = "comp-slot" + (clsId ? "" : " comp-slot-empty");

      if (clsId) {
        const cls = ALL_CLASSES.find((c) => c.id === clsId);
        const img = document.createElement("img");
        img.src = `img/classes/${clsId}.png`;
        img.alt = cls ? getClassName(cls) : clsId;
        slot.appendChild(img);

        const label = document.createElement("span");
        label.className = "comp-slot-label";
        label.textContent = cls ? getClassName(cls) : clsId;
        slot.appendChild(label);

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "comp-slot-remove";
        removeBtn.textContent = "✕";
        removeBtn.title = i18n("compRemoveTitle", "Remover");
        removeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          compSlots[idx] = null;
          saveCompSlots();
          renderCompMaker();
        });
        slot.appendChild(removeBtn);
      } else {
        slot.textContent = "+";
      }

      slot.addEventListener("click", () => openCompClassPicker(idx, slot));
      compSlotsEl.appendChild(slot);
    });

    renderCompResults();
  }

  openCompMakerBtn.addEventListener("click", () => {
    if (sideMenuOverlay) sideMenuOverlay.classList.add("hidden");
    compMakerOverlay.classList.remove("hidden");
    renderCompMaker();
  });
  if (closeSideMenuBtn) { /* no-op: mantém o listener original do menu lateral intacto */ }

  function closeCompMaker() {
    compMakerOverlay.classList.add("hidden");
    closeCompClassDropdown();
    if (compDebuffSlide) closeSlide(compDebuffSlide);
    if (compBuffSlide)   closeSlide(compBuffSlide);
  }
  closeCompMakerBtn.addEventListener("click", closeCompMaker);
  compMakerOverlay.addEventListener("click", (e) => {
    if (e.target === compMakerOverlay) closeCompMaker();
  });
  document.addEventListener("click", (e) => {
    if (!compClassDropdown.classList.contains("hidden") &&
        !compClassDropdown.contains(e.target) &&
        !e.target.closest(".comp-slot")) {
      closeCompClassDropdown();
    }
  });
  compMakerClearBtn.addEventListener("click", () => {
    compSlots = new Array(COMP_SLOT_COUNT).fill(null);
    saveCompSlots();
    renderCompMaker();
  });

  // Exposto para que a troca de idioma (index.html / listener de .lang-item)
  // possa re-renderizar os rótulos dinâmicos do Criador de Composições
  // (grade de stats, título "Remover", texto "(preencher)" etc.) — os
  // textos estáticos do modal (hint, títulos de painel, botão Limpar) já
  // são cobertos pelo data-i18n/applyTranslations.
  window.refreshCompMaker = renderCompMaker;
});

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
  if (typeof refreshEventLabels === "function") refreshEventLabels();
}
window.refreshContentLabels = refreshContentLabels;

// =========================================================
// EVENT CONTENT (coluna "Evento Content" — tecla ' vira a coluna de conteúdo)
// Lista FIXA de conteúdos de evento da temporada: quem mantém o site edita SÓ este array.
//   id     → chave estável (vai no backup JSON; não mude depois de publicado, senão o "feito" se perde)
//   labels → nome exibido por idioma (falta idioma → usa en, depois pt-BR, depois o id)
//   until  → (opcional) data/hora de fim em ISO; depois dela o evento some sozinho da coluna
// Para ADICIONAR um evento novo: copie um bloco { ... }, troque o id e os nomes.
// Para ENCERRAR um evento: apague o bloco (ou comente). Nada mais precisa ser mexido.
// =========================================================
// Server Time (como usado nos patch notes) está 5h à frente do horário de Brasília
// (GMT-3) → Server Time = UTC+2, fixo (o jogo não observa horário de verão).
const SERVER_TZ_OFFSET_MS = 2 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const EVENT_CONTENTS = [
  // Semente (usada até a primeira busca funcionar e se o site estiver fora do ar).
  // Fonte: dnorigins.com/news → [Patch] 20-09-2026 (seção "Events")
  {
    id: "crazy-duck-nest",
    labels: { en: "Crazy Duck Nest" },
    until: "2026-10-05T07:00:00Z"   // fim: 5 de outubro 09:00 Server Time = 04:00 Brasília (= 05/10 07:00 UTC)
    // sem "days": roda todo dia
  },
  {
    id: "althea-continent-exploration",
    labels: { en: "Althea Continent Exploration" },
    until: "2026-10-10T07:00:00Z", // fim: 10 de outubro 09:00 Server Time (= 10/10 07:00 UTC)
    days: [5, 6, 0]                 // sex/sáb/dom, com o dia virando às 04:00 de Brasília = 09:00 Server Time (ver isEventActiveNow)
  }
];

// Está dentro do período (until) E, se o evento só roda em certos dias (days, índices
// JS: domingo=0...sábado=6), hoje é um desses dias.
// O "dia" do evento NÃO começa à meia-noite: começa no reset diário do jogo, 04:00 de Brasília
// (GMT-3) = 09:00 de Server Time. Ou seja, um evento de sexta só aparece a partir de sexta 04:00
// (Brasília) e não na quinta à noite, quando o relógio do servidor já virou para sexta.
// Funciona igual em qualquer fuso de quem está vendo a tela.
const EVENT_DAY_START_MS = 9 * 60 * 60 * 1000;   // 09:00 Server Time = 04:00 Brasília
function isEventActiveNow(ev, nowMs) {
  if (ev.until && Date.parse(ev.until) <= nowMs) return false;
  if (ev.days && ev.days.length) {
    // Server Time deslocado -9h: os getters UTC passam a mostrar o "dia do jogo" (vira às 09:00 do servidor)
    const dow = new Date(nowMs + SERVER_TZ_OFFSET_MS - EVENT_DAY_START_MS).getUTCDay();
    if (!ev.days.includes(dow)) return false;
  }
  return true;
}

// "05/10/2026 - Tempo restante: 3 dias 5 horas" — data de fim (em horário de Brasília,
// GMT-3, igual ao resto do site) + tempo restante em dias e horas, no idioma escolhido.
// Sem "until" (evento sem data marcada no patch) devolve null e o chip fica só com o nome.
// d/h = [singular, plural]; idiomas sem plural repetem a mesma palavra.
const EVENT_TIME_WORDS = {
  "pt-BR": { left: "Tempo restante",    d: ["dia", "dias"],     h: ["hora", "horas"] },
  "pt-PT": { left: "Tempo restante",    d: ["dia", "dias"],     h: ["hora", "horas"] },
  es:      { left: "Tiempo restante",   d: ["día", "días"],     h: ["hora", "horas"] },
  en:      { left: "Time remaining",    d: ["day", "days"],     h: ["hour", "hours"] },
  ru:      { left: "Осталось",          d: ["дн.", "дн."],      h: ["ч.", "ч."] },
  fil:     { left: "Natitirang oras",   d: ["araw", "araw"],    h: ["oras", "oras"] },
  id:      { left: "Sisa waktu",        d: ["hari", "hari"],    h: ["jam", "jam"] },
  zh:      { left: "剩余时间",           d: ["天", "天"],         h: ["小时", "小时"] },
  fr:      { left: "Temps restant",     d: ["jour", "jours"],   h: ["heure", "heures"] },
  de:      { left: "Verbleibende Zeit", d: ["Tag", "Tage"],     h: ["Stunde", "Stunden"] }
};
function formatEventSublabel(ev, nowMs) {
  if (!ev.until) return null;
  const untilMs = Date.parse(ev.until);
  if (!isFinite(untilMs)) return null;
  const BR_TZ_OFFSET_MS = -3 * 60 * 60 * 1000;
  const shifted = new Date(untilMs + BR_TZ_OFFSET_MS);
  const dd = String(shifted.getUTCDate()).padStart(2, "0");
  const mm = String(shifted.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = shifted.getUTCFullYear();
  const left = Math.max(0, untilMs - nowMs);
  const days = Math.floor(left / DAY_MS);
  const hours = Math.floor((left % DAY_MS) / (60 * 60 * 1000));
  const w = EVENT_TIME_WORDS[getCurrentLang()] || EVENT_TIME_WORDS.en;
  return `${dd}/${mm}/${yyyy} - ${w.left}: ${days} ${w.d[days === 1 ? 0 : 1]} ${hours} ${w.h[hours === 1 ? 0 : 1]}`;
}

// Mantém "Tempo restante: X dias Y horas" atualizado sem precisar recriar os chips.
function updateEventSublabels() {
  const now = Date.now();
  document.querySelectorAll(".event-chip .chip-sublabel[data-until]").forEach((el) => {
    const t = formatEventSublabel({ until: el.dataset.until }, now);
    if (t && el.textContent !== t) el.textContent = t;
  });
}
window.updateEventSublabels = updateEventSublabels;
setInterval(updateEventSublabels, 30000);

// Patch mais recente lido do dnorigins.com ({ title, url, published }) — usado no cabeçalho
// da coluna quando ela está no modo Evento.
// Semente: o tópico do patch de onde vêm os eventos da lista fixa acima. A busca automática
// (Netlify Function) e o cache substituem isto pelo patch mais recente.
let EVENT_PATCH = { title: "[Patch] 20-09-2026", url: "https://dnorigins.com/news/patch-20-09-2026/" };

// Busca automática dos eventos: a cada importação de backup (e ao abrir a página) o site consulta
// a Netlify Function netlify/functions/dno-events.js, que lê o [Patch] mais recente de
// dnorigins.com/news. Sem a função no ar (ex.: abrindo o index.html direto do computador),
// a busca falha em silêncio e continua valendo a última lista conhecida.
// Ambiente: o site roda em dois cenários.
//  • Com servidor (Netlify publicado ou `netlify dev`): as Functions (/api/presence, /api/party-share,
//    /.netlify/functions/dno-events) existem e tudo funciona (contador real, convites, eventos).
//  • Aberto direto do computador (file://): não há Functions; o navegador bloqueia qualquer fetch. Nesse modo o
//    site nem tenta chamá-las (sem erros no console) e usa os fallbacks locais (contador local, última lista de eventos).
// Um servidor estático simples (ex.: python -m http.server) responde 404 às Functions; isso é detectado em runtime
// (apiMissing, no bloco de presença) e as chamadas passam a ser raras.
const DNO_IS_FILE = location.protocol === "file:";
const EVENTS_ENDPOINT = "/.netlify/functions/dno-events";
const EVENTS_CACHE_KEY = "dnoEventsCache";

const EVENT_EMPTY_TEXT = {
  "pt-BR": "Não há evento ocorrendo.",
  "pt-PT": "Não há nenhum evento a decorrer.",
  es: "No hay ningún evento en curso.",
  en: "No event is currently running.",
  ru: "Сейчас нет активных событий.",
  fil: "Walang kasalukuyang event.",
  id: "Tidak ada event yang sedang berlangsung.",
  zh: "当前没有进行中的活动。",
  fr: "Aucun événement en cours.",
  de: "Derzeit läuft kein Event."
};
function getEventEmptyText() {
  return EVENT_EMPTY_TEXT[getCurrentLang()] || EVENT_EMPTY_TEXT.en;
}

// Os patch notes dão a data de fim como 00:00 de Server Time (UTC+2 = 22:00 UTC do dia anterior).
// Mas o "dia" do jogo vira às 09:00 Server Time = 04:00 Brasília, então o evento só termina nesse
// horário. Se o "until" cair exatamente em 00:00 do servidor, empurra para 09:00 do servidor.
function normalizeEventUntil(until) {
  if (!until) return null;
  const ms = Date.parse(until);
  if (!isFinite(ms)) return until;
  const serverMs = ms + SERVER_TZ_OFFSET_MS;
  if (serverMs % DAY_MS === 0) return new Date(ms + EVENT_DAY_START_MS).toISOString();
  return until;
}

// Troca a lista de eventos em uso (mantém o mesmo array, que é lido em vários lugares).
function setEventList(list) {
  EVENT_CONTENTS.splice(0, EVENT_CONTENTS.length, ...list.map((e) => ({
    id: e.id,
    labels: e.labels || { en: e.name || e.id },
    until: normalizeEventUntil(e.until),
    days: Array.isArray(e.days) && e.days.length ? e.days : undefined
  })));
}
try {
  const cached = JSON.parse(localStorage.getItem(EVENTS_CACHE_KEY) || "null");
  if (cached && Array.isArray(cached.events)) setEventList(cached.events);
  if (cached && cached.patch && cached.patch.url) EVENT_PATCH = cached.patch;
} catch (_) {}

function getEventLabel(ev) {
  const l = ev.labels || {};
  return l[getCurrentLang()] || l.en || l["pt-BR"] || ev.id;
}

// Re-labels the event chips already on screen after a language switch.
function refreshEventLabels() {
  document.querySelectorAll(".event-chip").forEach((chip) => {
    const ev = EVENT_CONTENTS.find((e) => e.id === chip.dataset.eventId);
    if (!ev) return;
    const label = getEventLabel(ev);
    chip.title = label;
    const text = chip.querySelector(".chip-label");
    if (text) text.innerText = label;
  });
  document.querySelectorAll(".event-empty").forEach((el) => { el.textContent = getEventEmptyText(); });
}

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
  // Com a File System Access API (Chrome/Edge) o arquivo é aberto por um handle: assim o Auto-save passa a
  // gravar NESSE mesmo arquivo importado a cada mudança. Sem a API (ou se falhar), cai no input de arquivo.
  importBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    if (typeof window.showOpenFilePicker === "function") {
      try {
        const [handle] = await window.showOpenFilePicker({
          multiple: false,
          types: [{ description: "Dragon Nest Backup", accept: { "application/json": [".json"] } }]
        });
        const file = await handle.getFile();
        // Libera a escrita já agora (ainda dentro do gesto do clique); se o navegador negar, o Auto-save pede depois.
        try { await handle.requestPermission({ mode: "readwrite" }); } catch (_) { /* pedido de novo no próximo clique */ }
        window.dispatchEvent(new CustomEvent("dn:import-handle", { detail: { handle, name: file.name } }));
        importData(file);
        return;
      } catch (err) {
        if (err && err.name === "AbortError") return;   // cancelou o seletor
        // qualquer outro erro: usa o método antigo abaixo
      }
    }
    importFileInput.click();
  });

  importFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      importData(file);
    }
    importFileInput.value = "";
  });

  // Monta o objeto de backup a partir da tabela. Separado do exportData para poder ser
  // reutilizado (ex.: Criador de Grupos → convite online, que envia uma versão enxuta).
  function buildBackupData() {
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

      data.characters.push({ classId, nickname, gear, contents, events: collectDoneEvents(row) });
    });

    return data;
  }
  window.buildBackupData = buildBackupData;

  async function exportData() {
    const data = buildBackupData();

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
          addClassRow(cls, charData.nickname || cls.name, charData.gear, charData.contents, charData.events);
        });
        refreshAllPresetMenus();

        // Resets (Missão diária 04:00 todo dia / demais conteúdos 04:00 de sábado, GMT-3) que
        // aconteceram entre o momento em que o backup foi salvo e agora.
        if (window.applyContentResetsSince) {
          window.applyContentResetsSince(Number(data.savedAt) || file.lastModified);
        }
        // Importou arquivo → confere no dnorigins.com quais eventos estão ocorrendo (patch mais recente).
        if (window.refreshEventsFromSite) window.refreshEventsFromSite();
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
    img.src = `img/classes/${cls.id}.png`;
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
    if (window.applyContentHeaderState) window.applyContentHeaderState();
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

  function addClassRow(cls, nickname, initialGear = null, initialContents = null, initialEvents = null) {
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
    classImg.src = `img/classes/${cls.id}.png`;
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

    // Duas "faces" na mesma célula: frente = Class Content (chips normais),
    // verso = Event Content (chips fixos da temporada). A tecla ' gira a coluna.
    const flip = document.createElement("div");
    flip.className = "content-flip";
    const flipInner = document.createElement("div");
    flipInner.className = "content-flip-inner";
    const faceFront = document.createElement("div");
    faceFront.className = "content-face content-face-front";
    faceFront.appendChild(chipsContainer);
    const faceBack = document.createElement("div");
    faceBack.className = "content-face content-face-back";
    faceBack.appendChild(buildEventChipsContainer(initialEvents));
    flipInner.appendChild(faceFront);
    flipInner.appendChild(faceBack);
    flip.appendChild(flipInner);
    contentsTd.appendChild(flip);

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

  // ---------- Event Content (verso da coluna de conteúdo) ----------
  // Chips FIXOS (vêm de EVENT_CONTENTS): só marcam feito/pendente, sem botão de remover.
  // Usam a classe .event-chip (não .content-chip) de propósito, para não entrarem no
  // filtro, nos resets semanais/diários nem na lista "contents" do backup.
  function buildEventChipsContainer(doneIds) {
    const done = new Set(Array.isArray(doneIds) ? doneIds : []);
    const container = document.createElement("div");
    container.className = "event-chips-container";

    let col = null;
    const now = Date.now();
    const activeEvents = EVENT_CONTENTS.filter((ev) => isEventActiveNow(ev, now));

    // Ids marcados como feitos que ainda não têm chip (ex.: backup com evento de um patch novo,
    // antes da busca terminar) ficam guardados aqui e voltam a valer quando o chip aparecer.
    const known = new Set(activeEvents.map((ev) => ev.id));
    const pending = [...done].filter((id) => !known.has(id));
    if (pending.length) container.dataset.pendingDone = JSON.stringify(pending);

    if (!activeEvents.length) {
      const empty = document.createElement("div");
      empty.className = "event-empty";
      empty.textContent = getEventEmptyText();
      container.appendChild(empty);
      return container;
    }

    activeEvents.forEach((ev, i) => {
      if (i % 3 === 0) {
        col = document.createElement("div");
        col.className = "content-chip-col";
        container.appendChild(col);
      }
      const chip = document.createElement("div");
      chip.className = "event-chip";
      chip.dataset.eventId = ev.id;
      chip.title = getEventLabel(ev);

      const top = document.createElement("div");
      top.className = "chip-top";
      const main = document.createElement("div");
      main.className = "chip-main";
      const status = document.createElement("span");
      status.className = "chip-status";
      const text = document.createElement("span");
      text.className = "chip-label";
      text.innerText = getEventLabel(ev);

      // Data de fim + dias restantes, no mesmo estilo do "Reset em HH:MM" do chip
      // Missão diária: um .chip-sublabel na mesma linha do nome, não uma segunda linha.
      const sublabelText = formatEventSublabel(ev, now);
      let sub = null;
      if (sublabelText) {
        sub = document.createElement("span");
        sub.className = "chip-sublabel";
        sub.dataset.until = ev.until;
        sub.textContent = sublabelText;
      }

      const setDone = (d) => {
        status.innerHTML = d ? CHIP_ICON_CHECK : CHIP_ICON_X;
        chip.classList.toggle("done", d);
      };
      const toggle = () => setDone(!chip.classList.contains("done"));
      status.addEventListener("click", toggle);
      text.addEventListener("click", toggle);
      setDone(done.has(ev.id));

      main.appendChild(status);
      main.appendChild(text);
      if (sub) main.appendChild(sub);
      top.appendChild(main);
      chip.appendChild(top);
      col.appendChild(chip);
    });
    return container;
  }

  function collectDoneEvents(row) {
    return Array.from(row.querySelectorAll(".event-chip.done")).map((c) => c.dataset.eventId);
  }
  window.collectDoneEvents = collectDoneEvents;

  // Refaz os chips de evento de todas as linhas com a lista atual, mantendo o que já estava marcado.
  function rebuildEventChips() {
    document.querySelectorAll(".event-chips-container").forEach((old) => {
      const ids = Array.from(old.querySelectorAll(".event-chip.done")).map((c) => c.dataset.eventId);
      let pending = [];
      try { pending = JSON.parse(old.dataset.pendingDone || "[]"); } catch (_) {}
      old.replaceWith(buildEventChipsContainer([...ids, ...pending]));
    });
  }
  window.rebuildEventChips = rebuildEventChips;

  let eventsFetching = null;
  // Consulta o site (via Netlify Function) e atualiza a coluna Event Content.
  // Chamada a cada importação de backup e uma vez ao abrir a página.
  window.refreshEventsFromSite = function () {
    if (eventsFetching) return eventsFetching;
    if (DNO_IS_FILE) return Promise.resolve(false);   // sem Functions em file://: segue com a última lista conhecida
    eventsFetching = fetch(EVENTS_ENDPOINT, { cache: "no-store" })
      .then((res) => { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
      .then((data) => {
        if (!data || !Array.isArray(data.events)) throw new Error("resposta inesperada");
        setEventList(data.events);
        if (data.patch && data.patch.url) EVENT_PATCH = data.patch;
        try { localStorage.setItem(EVENTS_CACHE_KEY, JSON.stringify({ events: data.events, patch: data.patch, savedAt: Date.now() })); } catch (_) {}
        rebuildEventChips();
        if (window.applyContentHeaderState) window.applyContentHeaderState();
        return true;
      })
      .catch((err) => {
        console.warn("[eventos] não foi possível atualizar pelo dnorigins.com:", err && err.message);
        return false;
      })
      .finally(() => { eventsFetching = null; });
    return eventsFetching;
  };
  setTimeout(() => window.refreshEventsFromSite(), 800); // ao abrir a página

  // Tecla ' → gira a coluna de conteúdo (Class Content ⇄ Event Content). A coluna Class não gira.
  // O título do patch já começa com "[Patch]", então o rótulo é só "Evento:".
  const EVENT_PATCH_LABEL = {
    "pt-BR": "Evento:",
    "pt-PT": "Evento:",
    es: "Evento:",
    en: "Event:",
    ru: "Событие:",
    fil: "Event:",
    id: "Event:",
    zh: "活动:",
    fr: "Événement :",
    de: "Event:"
  };
  let eventViewOn = false;

  // Cabeçalho da coluna de conteúdo em duas faces, com o MESMO giro 3D das células
  // (classes .content-flip*, acionadas por html.events-view):
  //   frente: "Class Content" (traduzido)   verso: "Evento: [Patch] dd-mm-aaaa" (link do patch)
  // As duas faces ficam dentro de spans, sem data-i18n no <th>, então a tradução
  // automática dos cabeçalhos não desmonta a estrutura; o texto é refeito aqui.
  function setContentHeaders() {
    document.querySelectorAll("th.col-content").forEach((th) => {
      let front = th.querySelector(".content-face-front");
      let back = th.querySelector(".content-face-back");
      if (!front || !back) {
        delete th.dataset.i18n;
        th.textContent = "";
        const flip = document.createElement("div");
        flip.className = "content-flip th-flip";
        const inner = document.createElement("div");
        inner.className = "content-flip-inner";
        front = document.createElement("span");
        front.className = "content-face content-face-front";
        back = document.createElement("span");
        back.className = "content-face content-face-back";
        inner.appendChild(front);
        inner.appendChild(back);
        flip.appendChild(inner);
        th.appendChild(flip);
      }
      front.textContent = i18n("tableContent", "Class Content");

      back.textContent = "";
      back.appendChild(document.createTextNode((EVENT_PATCH_LABEL[getCurrentLang()] || EVENT_PATCH_LABEL.en) + " "));
      const safe = EVENT_PATCH && /^https:\/\/(www\.)?dnorigins\.com\//i.test(EVENT_PATCH.url || "");
      const a = document.createElement("a");
      a.className = "event-patch-link";
      a.href = safe ? EVENT_PATCH.url : "https://dnorigins.com/news/";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = safe && EVENT_PATCH.title ? EVENT_PATCH.title : "dnorigins.com/news";
      back.appendChild(a);
    });
  }
  window.applyContentHeaderState = setContentHeaders; // tabelas novas / idioma novo / patch novo
  setContentHeaders(); // tabela que já está na tela

  function toggleEventView() {
    eventViewOn = !eventViewOn;
    document.documentElement.classList.toggle("events-view", eventViewOn);
  }

  document.addEventListener("keydown", (e) => {
    const isApostrophe = e.key === "'" || (e.key === "Dead" && e.code === "Quote");
    if (!isApostrophe || e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
    e.preventDefault();
    toggleEventView();
  });

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
      if (typeof window.refreshCompMaker === "function") window.refreshCompMaker();
      if (typeof window.refreshAutoParty === "function") window.refreshAutoParty();
      refreshContentLabels();
      if (typeof window.applyContentHeaderState === "function") window.applyContentHeaderState(); // reaplica o cabeçalho (Classe/Evento) no idioma novo
      if (typeof window.updateEventSublabels === "function") window.updateEventSublabels();
      if (typeof window.updateDailyCountdowns === "function") window.updateDailyCountdowns(); // sincroniza o "Reset em" na hora, em vez de esperar o próximo tick
    };
  });

  // Override createNewTableContainer to use i18n headers
  // (table headers are set by the original function; we add data-i18n attrs after)
  const tablesWrapperEl = document.getElementById("tablesWrapper");
  function translateTableHeaders() {
    // Cabeçalho da coluna de conteúdo é montado em duas faces (Classe/Evento) por
    // applyContentHeaderState; tabelas novas passam por aqui e ganham a estrutura.
    if (typeof window.applyContentHeaderState === "function" &&
        document.querySelector("#tablesWrapper th.col-content:not(:has(.th-flip))")) {
      window.applyContentHeaderState();
    }
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
  const shotImgCache = new Map();   // url -> Promise<dataURL>: imagens do próprio site embutidas na captura
  let shotBusy = false;
  let shotFontCSS = null;   // CSS das fontes (Cinzel etc.) embutido no print; calculado uma vez e reaproveitado
  const HTI_SRC = "https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js";
  // Fora da captura: o que não aparece no print (scripts, modais/painéis fechados com a classe .hidden, iframes e
  // o que é marcado com data-html2canvas-ignore). Menos nós = captura bem mais leve e menos tempo com a tela presa.
  const SHOT_SKIP_TAGS = new Set(["SCRIPT", "NOSCRIPT", "TEMPLATE", "IFRAME"]);
  const shotSkip = (el) => {
    if (!el || el.nodeType !== 1) return false;
    if (SHOT_SKIP_TAGS.has(el.tagName)) return true;
    if (el.hasAttribute && el.hasAttribute("data-html2canvas-ignore")) return true;
    if (el.classList && el.classList.contains("hidden")) return true;
    // Face oculta da coluna de conteúdo (Class ⇄ Event): o verso é absolute e não define a altura da célula,
    // então quando não está visível não precisa ser clonado (metade dos nós a menos = captura bem mais leve).
    if (el.classList && el.classList.contains("content-face-back") &&
        !document.documentElement.classList.contains("events-view")) return true;
    return false;
  };
  const shotFilter = (node) => !shotSkip(node);
  // Mapa de ícones embutidos (js/class-icons.js): procura o nome exato e, se não achar, ignorando maiúsculas/minúsculas
  const lookupClassIcon = (map, name) => {
    if (!map || !name) return null;
    if (map[name]) return map[name];
    const norm = (x) => String(x).toLowerCase().replace(/[^a-z0-9]/g, "");   // "Dark Avenger" = "darkavenger"
    const n = norm(name);
    for (const k in map) if (norm(k) === n) return map[k];
    return null;
  };
  // Escalas de captura: alvo 1080p (largura 1920 px). Menos pixels = o navegador codifica o PNG quase na hora,
  // sem prender a tela. Limita também o total de pixels (páginas muito altas) e tenta escala 1 se a primeira falhar.
  // Qualidade: alvo 2x (largura ~3840 px) para o zoom ficar nítido; o teto de pixels protege páginas muito altas
  // e, se a escala alta falhar, tenta 1.5x e depois 1x antes de desistir.
  const SHOT_TARGET_W = 3840;   // 4K (UHD): a imagem final sai com 3840 px de largura
  const SHOT_MAX_PIXELS = 36e6; // teto de segurança (memória do navegador) para páginas muito altas
  const computeShotScales = () => {
    const w = Math.max(document.body.scrollWidth, document.documentElement.clientWidth) || 1;
    const h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) || 1;
    let t = SHOT_TARGET_W / w;
    t = Math.max(1, Math.min(t, 3, Math.sqrt(SHOT_MAX_PIXELS / (w * h))));
    const list = [t];
    if (t > 2) list.push(2);
    if (t > 1.5) list.push(1.5);
    if (t > 1) list.push(1);
    return list;
  };
  // ---- Fontes no print ----
  // Antes: se a 1ª tentativa de embutir as fontes falhasse (ou rodasse antes do Google Fonts terminar de carregar),
  // o resultado vazio ficava em cache para sempre e todos os prints saíam com fonte genérica (Segoe/serif).
  // Agora: só guarda em cache quando deu certo; espera document.fonts.ready; e, se o html-to-image não conseguir,
  // monta o CSS das fontes por conta própria (baixa o CSS do Google Fonts + cada .woff2 e converte em data URL).
  const hasEmbeddedFonts = (css) => /@font-face/i.test(css || "") && /url\(\s*["']?data:/i.test(css);
  const blobToDataURL = (bl) => new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = () => rej(fr.error); fr.readAsDataURL(bl); });
  const buildGoogleFontCSS = async () => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"][href*="fonts.googleapis.com"]'));
    const URL_RE = /url\((["']?)(https?:[^)"']+)\1\)/g;
    let out = "";
    for (const l of links) {
      let css = await (await fetch(l.href)).text();
      const urls = Array.from(new Set(Array.from(css.matchAll(URL_RE)).map((m) => m[2])));
      const map = {};
      await Promise.all(urls.map(async (u) => {
        try { map[u] = await blobToDataURL(await (await fetch(u)).blob()); } catch (e) { console.warn("Screenshot: fonte não baixou", u, e); }
      }));
      out += css.replace(URL_RE, (all, q, u) => (map[u] ? 'url("' + map[u] + '")' : all)) + "\n";
    }
    return out;
  };
  const getShotFontCSS = async () => {
    if (shotFontCSS) return shotFontCSS;
    try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (_) {}
    let css = "";
    try { css = await htmlToImage.getFontEmbedCSS(document.body, { filter: shotFilter }); } catch (e) { console.warn("Screenshot: getFontEmbedCSS falhou", e); }
    if (!hasEmbeddedFonts(css)) {
      try { css = await buildGoogleFontCSS(); } catch (e) { console.warn("Screenshot: fontes manuais falharam", e); }
    }
    if (hasEmbeddedFonts(css)) shotFontCSS = css;
    else console.warn("Screenshot: fontes NÃO embutidas — o print vai sair com a fonte padrão");
    return css;
  };
  // Captura rápida com html-to-image: usa o próprio motor do navegador (mantém ícones e SVGs) e é bem mais
  // leve que o html2canvas. Se falhar, o caminho antigo (html2canvas) assume.
  const captureFast = async () => {
    if (typeof htmlToImage === "undefined") await loadScript(HTI_SRC);
    if (typeof htmlToImage === "undefined") throw new Error("html-to-image indisponível");
    // Desfaz o giro 3D da coluna de conteúdo só durante a captura (visualmente idêntico ao estado atual)
    const eventsView = document.documentElement.classList.contains("events-view");
    const st = document.createElement("style");
    st.textContent =
      ".content-flip{perspective:none!important}" +
      ".content-flip-inner{transform:none!important;transition:none!important;transform-style:flat!important}" +
      ".content-face{backface-visibility:visible!important;-webkit-backface-visibility:visible!important}" +
      ".content-face-back{transform:none!important}" +
      // sem animações/transições durante a captura: o navegador não recalcula estilos animados enquanto clona
      "*,*::before,*::after{animation-play-state:paused!important;transition:none!important}" +
      // Ícone de classe: na clonagem, will-change/backface-visibility + sombra neon geram um "fantasma" roxo borrado
      // fora do lugar e o ícone some. Durante a captura vira uma caixa simples com a mesma borda neon (sem sombra).
      ".class-cell-wrapper,.btn-gear-mini,.btn-add-content-mini,.btn-remove-row,.gear-bubble,.class-nickname{will-change:auto!important;backface-visibility:visible!important;-webkit-backface-visibility:visible!important}" +
      // Neon roxo do ícone de volta no print (mesmos valores do style.css). O "fantasma" borrado vinha de will-change +
      // backface-visibility junto com a sombra; como essas duas já são neutralizadas acima, a sombra pode voltar.
      ".class-cell-wrapper{box-shadow:0 0 0 1px rgba(184,129,252,.18),0 0 8px 1px rgba(184,129,252,.45),0 0 16px 2px rgba(184,129,252,.22),inset 0 0 8px rgba(184,129,252,.18)!important;border:1px solid rgba(184,129,252,.55)!important;transform:none!important;filter:none!important}" +
      ".class-cell-wrapper img{display:block!important;opacity:1!important;visibility:visible!important}" +
      // Botão "+": a cruz é desenhada com ::before/::after, e na clonagem do html-to-image ela saía duplicada
      // (um "+" escuro deslocado por cima do outro). Durante a captura a cruz vira dois degradês no próprio fundo.
      ".btn-add-content-mini::before,.btn-add-content-mini::after{content:none!important;display:none!important}" +
      ".btn-add-content-mini{box-shadow:none!important;background-color:var(--accent-flame)!important;" +
        "background-image:linear-gradient(currentColor,currentColor),linear-gradient(currentColor,currentColor)!important;" +
        "background-size:8px 2px,2px 8px!important;background-position:center,center!important;background-repeat:no-repeat!important}" +
      (eventsView ? ".content-face-front{visibility:hidden!important}" : ".content-face-back{visibility:hidden!important}");
    document.head.appendChild(st);
    // Ícones/imagens do próprio site: troca o src por data URL (cache) ANTES de capturar e espera decodificar.
    // Assim o ícone de classe já está pronto e embutido quando o html-to-image clona a página (antes ele
    // podia clonar a <img> ainda sem pixels e o ícone saía vazio). O src original é restaurado no final.
    const swapped = [];
    try {
      const imgs = Array.from(document.querySelectorAll("#tablesWrapper img, .class-cell-wrapper img"));
      await Promise.all(imgs.map(async (img) => {
        try {
          const raw = img.getAttribute("src") || "";
          if (!raw || /^(data|blob):/i.test(raw)) return;
          const u = new URL(raw, location.href);
          if (u.origin !== location.origin) return;
          let p = shotImgCache.get(u.href);
          if (!p) {
            p = fetch(u.href).then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.blob(); })
              .then((bl) => new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = () => rej(fr.error); fr.readAsDataURL(bl); }));
            shotImgCache.set(u.href, p);
          }
          let data;
          try { data = await p; } catch (e) {
            shotImgCache.delete(u.href);
            // fetch falhou: reaproveita a imagem já carregada na tela, desenhando-a num canvas
            if (!img.complete || !img.naturalWidth) throw e;
            const cv = document.createElement("canvas");
            cv.width = img.naturalWidth; cv.height = img.naturalHeight;
            cv.getContext("2d").drawImage(img, 0, 0);
            data = cv.toDataURL("image/png");
          }
          swapped.push([img, raw, img.getAttribute("srcset")]);
          img.removeAttribute("srcset");
          img.src = data;
          if (img.decode) await img.decode().catch(() => {});
        } catch (err) { console.warn("Screenshot: não consegui embutir a imagem " + (img.getAttribute("src") || ""), err); }
      }));
      console.info("Screenshot (rápido): " + swapped.length + "/" + imgs.length + " imagens embutidas");
    } catch (_) {}
    try {
      const fontCSS = await getShotFontCSS();
      for (const sc of computeShotScales()) {
        try {
          await new Promise((r) => setTimeout(r, 0));   // devolve o controle ao navegador (a tela respira entre tentativas)
          const b = await htmlToImage.toBlob(document.body, {
            pixelRatio: sc, backgroundColor: "#09090d", cacheBust: false, filter: shotFilter,
            fontEmbedCSS: fontCSS || undefined
          });
          if (b && b.size > 2000) return b;
        } catch (err) { console.warn("Screenshot (html-to-image) falhou em escala " + sc + ":", err); }
      }
      return null;
    } finally {
      st.remove();
      swapped.forEach(([img, raw, srcset]) => { img.src = raw; if (srcset) img.setAttribute("srcset", srcset); });
    }
  };
  // Aquece o que dá para preparar antes do clique (biblioteca + CSS das fontes), para o print sair sem espera
  const warmShot = () => {
    const go = async () => {
      try {
        if (typeof htmlToImage === "undefined") await loadScript(HTI_SRC);
        if (!shotFontCSS && typeof htmlToImage !== "undefined") await getShotFontCSS();
      } catch (_) { /* tenta de novo no clique */ }
    };
    if (window.requestIdleCallback) requestIdleCallback(go, { timeout: 4000 }); else setTimeout(go, 2500);
  };
  if (screenshotBtn && location.protocol !== "file:") warmShot();
  if (screenshotBtn) {
    screenshotBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (shotBusy) return;
      shotBusy = true;
      screenshotBtn.classList.remove("is-clicked");
      void screenshotBtn.offsetWidth;                 // reinicia a animação da linha
      screenshotBtn.classList.add("is-clicked", "is-busy");
      // Clipboard: o ClipboardItem é criado AGORA (dentro do gesto do clique) com uma Promise do PNG. Antes a
      // gravação só era tentada depois da captura (vários segundos); o Brave/Chrome já tinham expirado o gesto
      // do usuário e negavam a cópia. Se a cópia não for possível, cai no download como antes.
      let resolveBlob, rejectBlob, clipPromise = null;
      const blobPromise = new Promise((res, rej) => { resolveBlob = res; rejectBlob = rej; });
      blobPromise.catch(() => {});
      try {
        if (navigator.clipboard && navigator.clipboard.write && typeof ClipboardItem !== "undefined") {
          clipPromise = navigator.clipboard.write([new ClipboardItem({ "image/png": blobPromise })]);
          clipPromise.catch(() => {});
        }
      } catch (_) { clipPromise = null; }
      try {
        // Feedback imediato (flash), sem aviso de espera; o flash não entra no print
        const flash = document.createElement("div");
        flash.className = "screenshot-flash";
        flash.setAttribute("data-html2canvas-ignore", "");
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 500);
        // Dois frames + um tick: o botão/flash pintam ANTES do trabalho pesado, então a tela não "congela" no clique
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 0))));

        let blob = null;
        let simplified = false;
        let lastErr = null;
        let shotMissing = 0;   // imagens que ficaram de fora do print (plano B em file:// sem js/class-icons.js)
        // Em file:// o navegador bloqueia a leitura de imagens/CSS: o método rápido falharia sempre (e só gastaria
        // tempo), então vai direto para o plano B (versão sem imagens).
        if (location.protocol !== "file:") {
          try { blob = await captureFast(); } catch (err) { lastErr = err; console.warn("Screenshot rápido falhou:", err); }
        }

        if (!blob) {
        // Plano B: html2canvas (mais lento)
        console.info("Screenshot: usando o plano B (html2canvas)" + (DNO_IS_FILE ? " — site aberto por file://" : "") +
          "");
        if (typeof html2canvas === "undefined") {
          await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
        }

        // Opções comuns. allowTaint fica desligado; vídeos (iframe) e elementos marcados com
        // data-html2canvas-ignore não entram na captura.
        const baseOptions = {
          backgroundColor: "#09090d",
          useCORS: true,
          allowTaint: false,
          logging: false,
          ignoreElements: (el) => shotSkip(el)
        };

        // Qualidade 1080p: a captura sai com largura alvo de 1920 px (leve e rápida). Se a captura falhar ou sair
        // vazia, tenta de novo com escala 1.
        const bodyW = Math.max(document.body.scrollWidth, document.documentElement.clientWidth) || 1;
        const bodyH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) || 1;
        // Plano B (html2canvas) também em 1080p (largura 1920 px), igual ao método rápido.
        let target = SHOT_TARGET_W / bodyW;
        target = Math.max(1, Math.min(target, 3, Math.sqrt(SHOT_MAX_PIXELS / (bodyW * bodyH))));
        const scales = [target];
        if (target > 1.5) scales.push(1.5);
        if (target > 1) scales.push(1);
        let shotScale = target;

        // html2canvas não entende 3D (rotateY / backface-visibility) e desenharia as duas faces da coluna de
        // conteúdo (Class Content e Event Content) sobrepostas e espelhadas. Na cópia usada para a captura o
        // giro é desfeito e só a face que está visível na tela é mantida.
        const flattenFlip = (doc) => {
          const eventsView = doc.documentElement.classList.contains("events-view");
          const st = doc.createElement("style");
          st.textContent =
            ".content-flip{perspective:none!important}" +
            ".content-flip-inner{transform:none!important;transition:none!important;transform-style:flat!important;will-change:auto!important}" +
            ".content-face{backface-visibility:visible!important;-webkit-backface-visibility:visible!important}" +
            ".content-face-back{transform:none!important}" +
            // html2canvas não sabe desenhar box-shadow com blur: a sombra neon do ícone de classe vira um bloco roxo
            // sólido e deslocado (o "borrão roxo"). Na cópia o ícone fica com borda neon simples, sem sombra.
            ".class-cell-wrapper{box-shadow:none!important;border:1px solid rgba(184,129,252,.8)!important;will-change:auto!important;backface-visibility:visible!important;-webkit-backface-visibility:visible!important}" +
            ".btn-gear-mini,.btn-add-content-mini,.btn-remove-row,.gear-bubble,.class-nickname{will-change:auto!important;backface-visibility:visible!important;-webkit-backface-visibility:visible!important}" +
            "*,*::before,*::after{animation:none!important;transition:none!important}" +
            (eventsView ? ".content-face-front{visibility:hidden!important}" : ".content-face-back{visibility:hidden!important}");
          doc.head.appendChild(st);
        };

        // Imagens do próprio site (ícones de classe, skills...) viram data URL na cópia: assim entram na captura
        // sem depender de CORS nem "contaminar" o canvas. Imagens de outro domínio são retiradas.
        // Em file:// o navegador não deixa ler nenhum arquivo local. Para os ícones de classe saírem mesmo assim,
        // usa o mapa js/class-icons.js (opcional) com os PNGs já em data URL.
        const inlineImages = async (doc) => {
          const iconMap = window.DNO_CLASS_ICONS || null;
          const imgs = Array.from(doc.querySelectorAll("img"));
          await Promise.all(imgs.map(async (img) => {
            let href = "";
            try {
              const u = new URL(img.getAttribute("src") || "", location.href);
              if (u.protocol === "data:" || u.protocol === "blob:") return;
              const mm = /\/img\/classes\/([^\/?#]+)\.png$/i.exec(u.pathname);
              if (mm && iconMap) {
                const data = lookupClassIcon(iconMap, decodeURIComponent(mm[1]));
                if (data) { img.removeAttribute("srcset"); img.src = data; return; }
                console.warn("Screenshot: ícone sem entrada em js/class-icons.js: " + decodeURIComponent(mm[1]));
              }
              if (u.protocol === "file:") { shotMissing++; img.remove(); return; }   // qualquer outra imagem local contaminaria o canvas
              if (u.origin !== location.origin) { img.remove(); return; }
              href = u.href;
              let p = shotImgCache.get(href);
              if (!p) {
                p = fetch(href).then((r) => {
                  if (!r.ok) throw new Error("HTTP " + r.status);
                  return r.blob();
                }).then((bl) => new Promise((res, rej) => {
                  const fr = new FileReader();
                  fr.onload = () => res(fr.result);
                  fr.onerror = () => rej(fr.error);
                  fr.readAsDataURL(bl);
                }));
                shotImgCache.set(href, p);
              }
              const data = await p;
              img.removeAttribute("srcset");
              img.src = data;
            } catch (_) {
              if (href) shotImgCache.delete(href);   // mantém o src original nesse caso
            }
          }));
        };

        // Backgrounds/máscaras com url(...) (imagens de CSS) saem da cópia: em file:// contaminariam o canvas.
        const stripUrlBackgrounds = (doc) => {
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
        };

        // Versão normal: mantém as imagens do site (embutidas) e tira só as de outro domínio.
        const renderNormal = () => html2canvas(document.body, {
          ...baseOptions, scale: shotScale,
          onclone: async (doc) => {
            flattenFlip(doc);
            await inlineImages(doc);
            if (DNO_IS_FILE) stripUrlBackgrounds(doc);
          }
        });

        // Versão simplificada: sem nenhuma imagem (img, svg, canvas, vídeo e backgrounds com url()).
        // Nenhuma imagem = nenhuma chance de "contaminar" o canvas; só o texto e as cores da tela saem.
        const renderSimple = () => html2canvas(document.body, {
          ...baseOptions, scale: shotScale,
          onclone: (doc) => {
            flattenFlip(doc);
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

        // Em file:// qualquer imagem lida do disco contamina o canvas; por isso só entram os ícones embutidos
        // (js/class-icons.js) e, se mesmo assim o canvas ficar contaminado, cai na versão simplificada.
        simplified = false;
        let canvas = null;
        for (const sc of scales) {
          shotScale = sc;
          canvas = null; blob = null;
          simplified = false;
          try {
            if (!simplified) {
              try { canvas = await renderNormal(); }
              catch (err) { canvas = null; lastErr = err; console.warn("Screenshot (normal) falhou em escala " + sc + ":", err); }
              if (canvas && isTainted(canvas)) { canvas = null; console.warn("Screenshot (normal): canvas contaminado"); }
              if (!canvas) simplified = true;
            }
            if (!canvas) canvas = await renderSimple();
            if (!canvas || !canvas.width || !canvas.height) continue;
            blob = await new Promise((resolve) => {
              try { canvas.toBlob((b) => resolve(b), "image/png"); } catch (_) { resolve(null); }
            });
            if (blob) break;
          } catch (err) { lastErr = err; }
        }
        }   // fim do plano B
        if (!blob) throw lastErr || new Error("toBlob vazio");

        // Try clipboard first, fallback to download
        let copied = false;
        resolveBlob(blob);
        if (clipPromise) { try { await clipPromise; copied = true; } catch (err) { console.warn("Screenshot: clipboard negado, vai baixar o arquivo", err); } }

        let note = simplified ? i18n("toastNoImages", " (versão sem imagens — abra pelo site publicado para incluir os ícones)") : "";
        if (!simplified && shotMissing > 0) {
          note = " ⚠ " + shotMissing + " ícone(s) ficaram de fora: o navegador bloqueia imagens locais (file://). Abra pelo site publicado no Netlify.";
          console.warn("Screenshot: " + shotMissing + " imagem(ns) local(is) removida(s) do print (file://). Use o site publicado.");
        }
        if (copied) {
          showToast(i18n("toastCopied", "📋 Screenshot copiado para a área de transferência!") + note, note ? 9000 : 0);
        } else {
          // Fallback: download
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `dragon-nest-ccc-${new Date().toISOString().slice(0,10)}.png`;
          a.click();
          URL.revokeObjectURL(url);
          showToast(i18n("toastSaved", "📥 Screenshot salvo como arquivo!") + note, note ? 9000 : 0);
        }
      } catch (err) {
        rejectBlob(err);
        showToast(i18n("toastError", "⚠️ Não foi possível capturar a tela: ") + (err && err.name ? err.name : "erro"));
        console.error("Screenshot error:", err);
      } finally {
        shotBusy = false;
        screenshotBtn.classList.remove("is-busy");
        setTimeout(() => screenshotBtn.classList.remove("is-clicked"), 600);
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

  function showToast(msg, ms) {
    const t = document.createElement("div");
    t.className = "screenshot-toast";
    t.setAttribute("data-html2canvas-ignore", "");   // o aviso não aparece dentro do print
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), ms || 2600);
    return t;
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

  // -------------------------------------------------------
  // Criador de Grupos — convite online
  // Cada heartbeat leva o nome público desta pessoa (nickname da PRIMEIRA classe da
  // tabela, coluna "Classe" — a mesma que vira characters[0] no backup) e traz de volta
  // a lista de quem está online + os convites recebidos. O envio dos dados só acontece
  // depois que a pessoa clica em "Aceitar".
  // -------------------------------------------------------
  const SHARE_URL = "/api/party-share";
  let onlineUsers = [];      // [{ pub, name, classId }] — sem a própria pessoa
  let onlineTotal = 0;       // total de sessões online segundo o servidor (inclui quem não tem classe na tabela)
  let presenceLive = false;  // true = a function de presença respondeu no último heartbeat
  let apiMissing = false;    // true = servidor sem as Functions (404/405), ex.: servidor estático simples
  let hbCount = 0;
  window.isLocalMode = () => DNO_IS_FILE || apiMissing;   // usado pelo Criador de Grupos para explicar por que não há convites

  function getShareProfile() {
    try {
      const row = document.querySelector("#tablesWrapper tbody tr");
      if (!row) return null;
      const el = row.querySelector(".class-nickname");
      const clsEl = el && el.querySelector(".class-nickname-class");
      const name = ((el && (el.dataset.nickname || (clsEl && clsEl.textContent))) || "").trim();
      const classId = row.dataset.classId || (el && el.dataset.classId) || "";
      return name ? { name: name.slice(0, 30), classId } : null;
    } catch (_) {
      return null;
    }
  }

  // Versão enxuta do backup para compartilhar: só o que o Criador de Grupos usa
  // (classe, nickname, gear e conteúdos feitos/pendentes). Number ID (account),
  // eventos e presets ficam de fora.
  function buildSharedPayload() {
    const full = window.buildBackupData();
    return {
      savedAt: full.savedAt,
      characters: (full.characters || []).map((c) => ({
        classId: c.classId,
        nickname: c.nickname,
        gear: c.gear,
        contents: (c.contents || []).map((x) => ({ title: x.title, done: !!x.done }))
      }))
    };
  }

  const inviteCards = new Map();   // reqId -> elemento do aviso
  const answeredInvites = new Set();

  function ensureInviteHost() {
    let host = document.getElementById("inviteHost");
    if (!host) {
      host = document.createElement("div");
      host.id = "inviteHost";
      host.className = "invite-host";
      host.setAttribute("data-html2canvas-ignore", "");
      document.body.appendChild(host);
    }
    return host;
  }

  function dropInviteCard(reqId) {
    const card = inviteCards.get(reqId);
    if (card) card.remove();
    inviteCards.delete(reqId);
  }

  async function respondInvite(inv, accept, buttons) {
    answeredInvites.add(inv.reqId);
    buttons.forEach((b) => { b.disabled = true; });
    try {
      const payload = { action: "respond", id: SESSION_ID, reqId: inv.reqId, accept };
      if (accept) {
        if (typeof window.buildBackupData !== "function") throw new Error("no data");
        payload.data = buildSharedPayload();
      }
      const res = await fetch(SHARE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok && res.status !== 404 && res.status !== 410) throw new Error("share " + res.status);
      if (accept && res.ok) showToast(i18n("apSentToast", "📤 Dados enviados"));
    } catch (_) {
      answeredInvites.delete(inv.reqId);
      buttons.forEach((b) => { b.disabled = false; });
      showToast(i18n("apShareError", "⚠️ Não foi possível enviar seus dados"));
      return;
    }
    dropInviteCard(inv.reqId);
  }

  function showInviteCard(inv) {
    const card = document.createElement("div");
    card.className = "invite-card";
    card.setAttribute("role", "alertdialog");

    const head = document.createElement("div");
    head.className = "invite-head";
    if (inv.fromClassId) {
      const img = document.createElement("img");
      img.src = "img/classes/" + encodeURIComponent(inv.fromClassId) + ".png";
      img.alt = "";
      img.onerror = () => { img.style.display = "none"; };
      head.appendChild(img);
    }
    const text = document.createElement("div");
    text.className = "invite-text";
    const who = document.createElement("strong");
    who.textContent = inv.fromName || "?";
    const msg = document.createElement("span");
    msg.textContent = " " + i18n("apInboundText", "quer importar os dados dos seus personagens para montar uma party.");
    text.appendChild(who);
    text.appendChild(msg);
    head.appendChild(text);

    const actions = document.createElement("div");
    actions.className = "invite-actions";
    const decline = document.createElement("button");
    decline.type = "button";
    decline.className = "invite-btn";
    decline.textContent = i18n("apDecline", "Recusar");
    const accept = document.createElement("button");
    accept.type = "button";
    accept.className = "invite-btn accept";
    accept.textContent = i18n("apAccept", "Aceitar");
    decline.addEventListener("click", () => respondInvite(inv, false, [accept, decline]));
    accept.addEventListener("click", () => respondInvite(inv, true, [accept, decline]));
    actions.appendChild(decline);
    actions.appendChild(accept);

    card.appendChild(head);
    card.appendChild(actions);
    ensureInviteHost().appendChild(card);
    inviteCards.set(inv.reqId, card);
  }

  // "list" = convites pendentes que o servidor devolveu neste heartbeat.
  function handleIncomingInvites(list) {
    const ids = new Set(list.map((i) => i && i.reqId));
    // convite cancelado/expirado/respondido em outro lugar → o aviso some sozinho
    Array.from(inviteCards.keys()).forEach((reqId) => { if (!ids.has(reqId)) dropInviteCard(reqId); });
    list.forEach((inv) => {
      if (!inv || !inv.reqId || inviteCards.has(inv.reqId) || answeredInvites.has(inv.reqId)) return;
      showInviteCard(inv);
    });
  }

  // -------------------------------------------------------
  // Conteúdo concluído pelo líder da party: o servidor entrega o aviso no heartbeat. Aqui o
  // conteúdo é marcado como feito nos personagens indicados (mesmo clique do chip) e a pessoa
  // recebe uma mensagem dizendo que o líder finalizou o conteúdo.
  // -------------------------------------------------------
  const appliedNotices = new Set();

  // Marca o conteúdo como feito no personagem (classe + nickname) da tabela. Devolve o rótulo do
  // conteúdo (no idioma atual) se o personagem e o chip existem, ou null.
  function markContentDone(classId, nickname, title, strict) {
    const rows = Array.from(document.querySelectorAll("#tablesWrapper tbody tr")).filter((r) => r.dataset.classId === classId);
    if (!rows.length) return null;
    let row = rows.find((r) => {
      const el = r.querySelector(".class-nickname");
      return el && (el.dataset.nickname || "") === nickname;
    });
    // strict = usado pelo líder na própria tela: só marca se classe + nickname baterem (não chuta)
    if (!row && !strict && rows.length === 1) row = rows[0];
    if (!row) return null;
    const chip = Array.from(row.querySelectorAll(".content-chip")).find((c) => c.dataset.title === title);
    if (!chip) return null;
    if (!chip.classList.contains("done")) {
      const st = chip.querySelector(".chip-status");
      if (st) st.click();   // mesmo caminho do clique do usuário (ícone, Duel Dragon vinculado, etc.)
    }
    const lab = chip.querySelector(".chip-label");
    return (lab && lab.textContent) || title;
  }

  // O Criador de Grupos (outro bloco) usa isto para marcar o conteúdo na tabela do próprio líder.
  window.dnMarkContentDone = (classId, nickname, title) => markContentDone(String(classId || ""), String(nickname || ""), String(title || ""), true);

  function showNoticeCard(text) {
    const card = document.createElement("div");
    card.className = "invite-card";
    card.setAttribute("role", "alertdialog");
    const head = document.createElement("div");
    head.className = "invite-head";
    const text_ = document.createElement("div");
    text_.className = "invite-text";
    text_.textContent = text;
    head.appendChild(text_);
    const actions = document.createElement("div");
    actions.className = "invite-actions";
    const ok = document.createElement("button");
    ok.type = "button";
    ok.className = "invite-btn accept";
    ok.textContent = i18n("apOk", "OK");
    ok.addEventListener("click", () => card.remove());
    actions.appendChild(ok);
    card.appendChild(head);
    card.appendChild(actions);
    ensureInviteHost().appendChild(card);
  }

  function handleIncomingNotices(list) {
    list.forEach((n) => {
      if (!n || !n.noticeId || appliedNotices.has(n.noticeId)) return;
      appliedNotices.add(n.noticeId);
      const done = [];
      let label = "";
      (Array.isArray(n.chars) ? n.chars : []).forEach((c) => {
        const lab = markContentDone(String(c.classId || ""), String(c.nickname || ""), String(n.content || ""));
        if (lab) { label = lab; done.push(c.nickname || c.classId); }
      });
      // confirma o recebimento (o servidor apaga o aviso); se falhar, o aviso volta e é ignorado pelo Set
      fetch(SHARE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ack", id: SESSION_ID, noticeId: n.noticeId })
      }).catch(() => {});
      const leader = n.fromName || "?";
      const what = label || n.content || "";
      const who = done.length ? done.map((x) => "\"" + x + "\"").join(", ") : "";
      showNoticeCard(
        who
          ? i18n("apLeaderDone", "👑 {leader}, líder da party, finalizou o conteúdo {content}. Marcado como concluído em: {chars}.")
              .replace("{leader}", leader).replace("{content}", what).replace("{chars}", who)
          : i18n("apLeaderDoneNoChar", "👑 {leader}, líder da party, finalizou o conteúdo {content}.")
              .replace("{leader}", leader).replace("{content}", what)
      );
    });
  }

  async function heartbeat() {
    touchOwnTab();
    // Sem Functions (file:// ou servidor estático): não chama a API (ou chama só de vez em quando, para o caso de
    // ela aparecer) e usa o contador local.
    if (DNO_IS_FILE || (apiMissing && (hbCount++ % 6) !== 0)) {
      showOnline(localCount());
      lastRegions = null;
      lastCountries = null;
      presenceLive = false;
      if (typeof window.refreshRegionPanel === "function") window.refreshRegionPanel();
      window.dispatchEvent(new Event("dn:online-users"));
      return;
    }
    try {
      const res = await fetch(PRESENCE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // region/country não são mais enviados aqui: o backend agora calcula
        // isso sozinho a partir do IP real da requisição (context.geo da
        // Netlify), então o que o navegador mandasse seria ignorado mesmo.
        // name/classId = nickname e classe da 1ª linha da tabela (convite do Criador de Grupos).
        body: JSON.stringify({ id: SESSION_ID, ...(getShareProfile() || {}) }),
        cache: "no-store"
      });
      if (res.status === 404 || res.status === 405) apiMissing = true;
      if (!res.ok) throw new Error(`presence ${res.status}`);
      const data = await res.json();
      if (typeof data.count !== "number") throw new Error("bad response");
      apiMissing = false;
      showOnline(data.count);
      lastRegions = (data.regions && typeof data.regions === "object") ? data.regions : null;
      lastCountries = (data.countries && typeof data.countries === "object") ? data.countries : null;
      presenceLive = true;
      onlineUsers = Array.isArray(data.users) ? data.users.filter((u) => u && u.pub && u.name) : [];
      onlineTotal = data.count;
      handleIncomingInvites(Array.isArray(data.invites) ? data.invites : []);
      handleIncomingNotices(Array.isArray(data.notices) ? data.notices : []);
    } catch (_) {
      showOnline(localCount());
      lastRegions = null;
      lastCountries = null;
      presenceLive = false; // mantém a última lista e os avisos abertos: falha de rede é passageira
    }
    if (typeof window.refreshRegionPanel === "function") window.refreshRegionPanel();
    window.dispatchEvent(new Event("dn:online-users"));
  }
  window.getOnlineRegions = () => lastRegions || localRegions();
  window.getOnlineCountries = (region) => (lastCountries && lastCountries[region]) || localCountries(region);
  window.VISITOR_REGION = VISITOR_REGION;
  window.VISITOR_COUNTRY = VISITOR_COUNTRY;
  window.getOnlineUsers = () => onlineUsers;
  window.getOnlineTotal = () => onlineTotal;
  window.isPresenceLive = () => presenceLive;
  window.dnDeviceId = DEVICE_ID; // usado pelo Criador de Grupos para convidar/receber

  // Tell the server this session is gone (so the count drops right away) —
  // but only once every tab belonging to this device has closed.
  window.addEventListener("pagehide", () => {
    if (!isLastTabForDevice()) return;
    if (DNO_IS_FILE || apiMissing) return;
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
      img.src = `img/classes/${cls.id}.png`;
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
          rowImg.src = `img/classes/${cls.id}.png`;
          rowImg.alt = btn.title;
          rowImg.dataset.classId = cls.id;
        }
        // Update the main class-cell-wrapper img
        const wrapperImg = currentRow.querySelector(".class-cell-wrapper img");
        if (wrapperImg) {
          wrapperImg.src = `img/classes/${cls.id}.png`;
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
    ".content-chips-container", ".event-chips-container", ".manual-modal-body", ".side-menu-panel", ".guide-modal-body",
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
//  - Chips de evento (coluna Event Content): desmarcados todo dia às 04:00.
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

  // Cópia local do ícone "X" do chip: o original (CHIP_ICON_X) é declarado
  // dentro de OUTRO closure (DOMContentLoaded mais acima) e não é visível
  // aqui. Antes essa função referenciava aquele identificador inexistente
  // neste escopo, o que lançava um ReferenceError assim que um reset era
  // disparado — interrompendo o forEach no primeiro chip e impedindo o
  // reset automático (diário e semanal) de completar.
  const RESET_CHIP_ICON_X =
    '<svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" focusable="false" aria-hidden="true"><path d="M4 4L12 12M12 4L4 12"/></svg>';

  function uncheckChips(kind) {
    document.querySelectorAll("#tablesWrapper .content-chip.done").forEach((chip) => {
      const isDaily = chip.dataset.title === DAILY_TITLE;
      if (kind === "daily" ? !isDaily : isDaily) return;
      chip.classList.remove("done");
      const status = chip.querySelector(".chip-status");
      if (status) status.innerHTML = RESET_CHIP_ICON_X;
    });
  }

  // Eventos (coluna "Event Content") desmarcam todo dia, junto com a Missão diária (04:00 GMT-3).
  function uncheckEventChips() {
    document.querySelectorAll("#tablesWrapper .event-chips-container[data-pending-done]").forEach((c) => { delete c.dataset.pendingDone; });
    document.querySelectorAll("#tablesWrapper .event-chip.done").forEach((chip) => {
      chip.classList.remove("done");
      const status = chip.querySelector(".chip-status");
      if (status) status.innerHTML = RESET_CHIP_ICON_X;
    });
  }

  function applyResetsBetween(fromMs, toMs) {
    if (!isFinite(fromMs) || !isFinite(toMs) || fromMs >= toMs) return;
    if (latestBoundary(toMs, false) > fromMs) { uncheckChips("daily"); uncheckEventChips(); }
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
    // Remove sozinho o chip de evento que expirou (until) ou saiu da janela de dias
    // (ex.: Althea, que só roda sex/sáb/dom) e atualiza a data/contagem regressiva
    // dos que continuam — mesma cadência dos resets, sem precisar dar F5.
    if (typeof window.rebuildEventChips === "function") window.rebuildEventChips();
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
  let expandedRegions = new Set(); // allows more than one region row open at once

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
        row.setAttribute("aria-expanded", String(expandedRegions.has(key)));

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
          if (expandedRegions.has(key)) expandedRegions.delete(key);
          else expandedRegions.add(key);
          renderRegions();
        });
        body.appendChild(row);

        if (expandedRegions.has(key)) {
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
    expandedRegions.clear();
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
    if (DNO_IS_FILE) return false;   // sem Functions em file://: usa os números locais
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

  // true = o auto-save está ligado mas o navegador ainda não liberou a escrita no arquivo (acontece sempre que a
  // página é reaberta: a permissão do arquivo expira). Até um clique do usuário liberar, NADA é gravado.
  let needsReconnect = false;
  let reconnectAsking = false;

  function updateBtnState() {
    btn.setAttribute("aria-pressed", String(autoSaveEnabled));
    const label = btn.querySelector(".autosave-label");
    if (autoSaveEnabled && needsReconnect) {
      btn.title = "Auto-save: aguardando permissão — clique em qualquer lugar da página e permita a edição do arquivo";
      if (label) label.textContent = "Auto ⚠";
    } else if (autoSaveEnabled) {
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
      data.characters.push({ classId, nickname, gear, contents, events: collectDoneEvents(row) });
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

  let saving = false;      // trava: nunca dois saves gravando ao mesmo tempo
  let savePending = false; // mudou enquanto gravava: roda de novo no fim

  async function autoSave() {
    if (!autoSaveEnabled) return;
    if (saving) { savePending = true; return; }
    saving = true;
    try {
      await autoSaveOnce();
    } finally {
      saving = false;
      if (savePending) { savePending = false; scheduleAutoSave(); }
    }
  }

  async function autoSaveOnce() {
    let data;
    try {
      data = typeof window.buildBackupData === "function" ? window.buildBackupData() : gatherExportData();
    } catch (_) {
      data = gatherExportData();
    }
    // A tabela não é guardada no navegador: ao abrir a página ela começa vazia. Sem esta trava, o primeiro
    // auto-save gravava "0 personagens" POR CIMA do backup real (arquivo de ~1 KB). Tabela vazia nunca é gravada.
    if (!data.characters || data.characters.length === 0) return;
    const jsonStr = JSON.stringify(data, null, 2);

    // Avoid redundant saves: skip if content hasn't changed since last save.
    const hashStr = JSON.stringify(Object.assign({}, data, { savedAt: 0 }));
    if (hashStr === lastSavedHash) return;

    // Sem suporte à File System Access API: único caso em que o fallback de
    // download avulso faz sentido, pois não há como sobrescrever um arquivo
    // específico de jeito nenhum neste navegador.
    if (!supportsFsAccess) {
      legacyDownloadSave(jsonStr);
      lastSavedHash = hashStr;
      flashBtn();
      return;
    }

    const handle = await getStoredHandle();
    if (handle && !(await hasPermission(handle))) {
      // Permissão expirou (página reaberta): o navegador só deixa pedir de novo com um clique do usuário.
      if (!needsReconnect) {
        needsReconnect = true;
        updateBtnState();
        if (window.showToast) window.showToast("⚠️ Auto-save pausado: clique em qualquer lugar e permita a edição do arquivo para voltar a salvar");
      }
      return;
    }
    if (handle && (await hasPermission(handle))) {
      if (needsReconnect) { needsReconnect = false; updateBtnState(); }
      try {
        const writable = await handle.createWritable();
        await writable.write(jsonStr);
        await writable.close();
        lastSavedHash = hashStr;
        flashBtn();
      } catch (err) {
        console.error("Auto-save: falha ao gravar", err);
        // A escrita no arquivo/pasta escolhido falhou (arquivo movido/apagado,
        // permissão perdida, etc). Antes, esse erro caía no download avulso —
        // que salva sempre na pasta Downloads padrão com um novo nome
        // ("(1)", "(2)"...), em vez de atualizar o arquivo/pasta escolhido.
        // Era exatamente esse o bug relatado, então não fazemos mais isso:
        // apenas avisamos e esperamos o usuário reconectar.
        if (window.showToast) {
          window.showToast("⚠️ Auto-save não conseguiu gravar no arquivo escolhido — desative e reative o botão Auto para reconectar");
        }
      }
      return;
    }

    // Ainda não há um arquivo escolhido, ou a permissão expirou e não há
    // gesto do usuário agora para repedi-la. Não há como salvar
    // silenciosamente neste momento nem, principalmente, salvar em outro
    // lugar — espera o usuário clicar no botão novamente
    // (verifyPermissionWithPrompt cuida disso no listener de click).
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
    characterData: true,
    attributeFilter: ["class", "data-gear", "data-account", "data-nickname", "data-class-id"]
  });

  // O arquivo importado vira o destino do Auto-save (um único arquivo: o que você importou).
  window.addEventListener("dn:import-handle", async (ev) => {
    const d = ev.detail || {};
    if (!d.handle) return;
    fileHandle = d.handle;
    await saveHandleToDB(d.handle);
    lastSavedHash = null;
    needsReconnect = autoSaveEnabled && !(await hasPermission(d.handle));
    updateBtnState();
    if (window.showToast) {
      window.showToast(autoSaveEnabled
        ? "Auto-save vinculado ao arquivo importado: " + (d.name || "")
        : "Arquivo importado: ao ligar o Auto, ele será atualizado automaticamente");
    }
    if (autoSaveEnabled) scheduleAutoSave();
  });

  // Reconexão: qualquer clique (gesto do usuário) pede a permissão de volta e grava o que ficou pendente.
  async function tryReconnect() {
    if (!autoSaveEnabled || !needsReconnect || reconnectAsking || !supportsFsAccess) return;
    const handle = await getStoredHandle();
    if (!handle) return;
    reconnectAsking = true;
    try {
      const ok = await verifyPermissionWithPrompt(handle);
      if (ok) {
        needsReconnect = false;
        lastSavedHash = null;
        updateBtnState();
        if (window.showToast) window.showToast("Auto-save reconectado");
        scheduleAutoSave();
      }
    } finally {
      reconnectAsking = false;
    }
  }
  document.addEventListener("click", tryReconnect, true);
  document.addEventListener("keydown", tryReconnect, true);

  // Ao abrir a página já com o auto-save ligado, confere a permissão logo de cara para avisar.
  if (autoSaveEnabled && supportsFsAccess) {
    getStoredHandle().then(async (h) => {
      if (!h) { needsReconnect = false; return; }
      if (!(await hasPermission(h))) {
        needsReconnect = true;
        updateBtnState();
        if (window.showToast) window.showToast("⚠️ Auto-save pausado: clique em qualquer lugar e permita a edição do arquivo");
      }
    });
  }

  btn.addEventListener("click", async (e) => {
    e.stopPropagation();
    // Ligado mas sem permissão (página reaberta): o clique no botão reconecta em vez de desligar.
    if (autoSaveEnabled && needsReconnect) { await tryReconnect(); return; }
    const turningOn = !autoSaveEnabled;

    // Sem a File System Access API (ex.: Firefox) não há como sobrescrever um
    // único arquivo silenciosamente — cada "auto-save" acabaria disparando um
    // novo download (o navegador numera como "(1)", "(2)"...) e, se a opção
    // "perguntar onde salvar cada arquivo" estiver ativa, um diálogo a cada
    // vez. Em vez de repetir esse comportamento quebrado, avisamos e não
    // ativamos — o botão "Exportar" continua disponível para salvar na hora.
    if (turningOn && !supportsFsAccess) {
      // Brave desliga a File System Access API por padrão (é ela que permite gravar sempre no mesmo arquivo).
      const isBrave = !!(navigator.brave && typeof navigator.brave.isBrave === "function");
      if (isBrave && window.showToast) {
        window.showToast(
          "Brave: o Auto-save precisa da API de arquivos, que vem desligada. Abra brave://flags/#file-system-access-api, " +
          "mude para Enabled, reinicie o Brave e ative o Auto de novo. Enquanto isso, use Exportar.", 14000
        );
        return;
      }
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

// =========================================================
// CRIADOR DE GRUPOS / PARTY MAKER (menu lateral)
// Recebe 2/4/6/8 backups (.json, um por jogador), o tipo de party e um conteúdo da lista do "+"
// e monta a melhor composição usando, de cada arquivo, UM personagem que ainda NÃO concluiu
// esse conteúdo. Botão "Conteúdo concluído" marca os personagens escolhidos como feitos nos
// arquivos (permite gerar a próxima party) e o histórico guarda composição + status.
// =========================================================
(function () {
  "use strict";

  /* AP-LOGIC-START */
  // ---------------------------------------------------------------- DADOS
  const AP_ELEMENTS = {
    light: ["crusader", "inquisitor", "lightfury", "valkyrie", "ilumia", "guardian", "saint"],
    fire:  ["adept", "saleana", "darkavenger", "guardian", "crusader", "saint", "souleater", "ripper"],
    dark:  ["raven", "abysswalker", "darksummoner", "obscuria", "lightfury", "physician"],
    ice:   ["glaciana", "adept", "guardian", "crusader", "saint"]
  };
  const AP_ELEMENT_KEYS = ["light", "fire", "dark", "ice"];
  // Neutros. Silver Hunter não consta na regra: tratado como DPS neutro.
  const AP_NEUTRAL_DPS = ["barbarian", "moonlord", "gladiator", "ruina", "defensio", "sentinel", "sniper", "shootingstar", "gearmaster", "silverhunter"];
  const AP_NEUTRAL_TANK = ["destroyer"];
  const AP_NEUTRAL_SUPPORT = ["tempest", "windwalker", "spiritdancer", "bladedancer", "flurry"];
  const AP_NEUTRAL = AP_NEUTRAL_DPS.concat(AP_NEUTRAL_TANK, AP_NEUTRAL_SUPPORT);
  // Regra de elemento: em party de FOGO, neutros só entram como SUPORTE (Destroyer conta como Support-Tank).
  // Em Light, Dark e Ice, qualquer neutro (suporte, subdps ou dps) pode ser usado.
  const AP_FIRE_NEUTRAL_OK = AP_NEUTRAL_SUPPORT.concat(AP_NEUTRAL_TANK);

  // Papéis (conforme a lista de classes das regras)
  const AP_DPS = ["adept", "saleana", "darkavenger", "raven", "crusader", "barbarian", "moonlord", "gladiator", "ruina",
                  "sentinel", "sniper", "shootingstar", "gearmaster", "silverhunter"];
  const AP_SUBDPS = ["inquisitor", "valkyrie", "ilumia", "ripper", "abysswalker", "obscuria", "defensio",
                     "tempest", "windwalker", "spiritdancer", "bladedancer", "flurry"];
  const AP_SUPPORT = ["lightfury", "saint", "physician", "guardian", "souleater", "darksummoner", "glaciana", "destroyer"];
  const AP_HEALERS = ["lightfury", "physician", "saint"];
  const AP_SUBHEALERS = ["abysswalker"];
  const AP_TANKS = ["guardian", "crusader", "destroyer", "defensio"];
  const AP_PURE_TANKS = ["guardian", "destroyer"];      // Support-Tank: não servem de tank na party de 6
  const AP_HYBRID_TANKS = ["crusader", "defensio"];     // DPS-Tank / SubDPS-Tank
  // Carry = DPS (fora tanks) + SubDPS ofensivos. Healers, suportes, tanks e SubDPS de cooldown/burst não contam.
  const AP_CARRY = ["adept", "saleana", "darkavenger", "raven", "barbarian", "moonlord", "gladiator", "ruina",
                    "sentinel", "sniper", "shootingstar", "gearmaster", "silverhunter", "inquisitor", "valkyrie", "ripper"];
  // Redução de recarga — ordem de prioridade (tempest/windwalker são cooldown, mas ficam depois)
  const AP_CD_PRIORITY = ["ilumia", "obscuria", "souleater", "physician", "adept", "tempest", "windwalker"];
  const AP_BURST = ["souleater", "spiritdancer", "bladedancer", "darksummoner", "physician", "adept"]; // buff de STR/INT
  const AP_NEEDS_CD = ["sentinel", "gearmaster", "moonlord"];
  const AP_NEEDS_BURST = ["barbarian", "moonlord", "sniper", "crusader"];
  const AP_ICE_GUESTS = ["glaciana", "saint"];          // únicas do Ice que entram em party de outro elemento
  // Suportes de outro elemento (não-Ice) que podem completar a party: "completar com supports e neutros".
  // Só SUPORTES entram aqui. Ilumia (Light) e Obscuria (Dark) são SubDPS: ter redução de recarga não os torna
  // suporte, e antes isso deixava uma Obscuria cair numa party de Fogo. Fora do elemento, só no modo relaxado.
  const AP_FOREIGN_OK = ["lightfury", "physician", "souleater", "darksummoner"];
  const AP_SUPPORT_SLOT = ["souleater", "darksummoner", "glaciana"]; // "vaga de 1 suporte" quando há convidado Ice
  const AP_BEAM = 1200;
  const AP_RANK = { Epic: 1, Unique: 2, Legend: 3 };

  const apElementsOf = (id) => AP_ELEMENT_KEYS.filter((e) => AP_ELEMENTS[e].includes(id));
  const apKnown = (id) => AP_NEUTRAL.includes(id) || apElementsOf(id).length > 0;
  const apNeutralAllowed = (id, E) => E !== "fire" || AP_FIRE_NEUTRAL_OK.includes(id);
  const apFits = (id, E) => (AP_NEUTRAL.includes(id) && apNeutralAllowed(id, E)) || AP_ELEMENTS[E].includes(id);
  const apIsNeutral = (id) => AP_NEUTRAL.includes(id);

  function apParseGear(g) {
    if (!g || typeof g !== "object") return { rank: 0, level: 0, enh: 0, text: "" };
    const text = String(g.text || "");
    const rarity = g.rarity || text.split(" ")[0];
    const m = /(\d+)\s*\+(\d+)/.exec(text);
    return { rank: AP_RANK[rarity] || 0, level: m ? Number(m[1]) : 0, enh: m ? Number(m[2]) : 0, text };
  }
  // Hierarquia: Legend 90 > Legend 80 > Unique 90 > Epic 90 > Unique 80 > Epic 80 (rank → nível → posição)
  const AP_TIER = { 3: { 90: 6, 80: 5 }, 2: { 90: 4, 80: 2 }, 1: { 90: 3, 80: 1 } };
  const apGearTier = (p) => (p.rank && AP_TIER[p.rank] ? AP_TIER[p.rank][p.level >= 90 ? 90 : 80] : 0);
  const apGearValue = (p) => (p.rank ? apGearTier(p) * 10 + p.enh * 0.15 : 0);   // +enh (máx. ~2) só desempata dentro do mesmo degrau

  // Faixa de carries por tamanho de party [mín, máx]. Party de 2 não tem regra de carry.
  const AP_CARRY_RANGE = { 4: [1, 2], 6: [3, 4], 8: [4, 8] };

  // Melhor personagem PENDENTE (conteúdo presente e não concluído) de cada classe de um backup.
  function apCandidates(data, contentTitle, skip) {
    const best = new Map();
    const alt = new Map();
    ((data && data.characters) || []).forEach((ch, idx) => {
      if (!ch || !apKnown(ch.classId)) return;
      const ei = (ch.contents || []).findIndex((c) => c && c.title === contentTitle);
      if (ei < 0 || ch.contents[ei].done || (skip && skip(ch))) return;
      const set = apParseGear(ch.gear && ch.gear.set);
      const wp = apParseGear(ch.gear && ch.gear.weapon);
      const cand = {
        classId: ch.classId, nick: ch.nickname || "", idx, ei,
        setText: set.text, weaponText: wp.text, setRank: set.rank,
        val: apGearValue(set) + apGearValue(wp) * 0.5,
        carry: set.rank >= 2 && AP_CARRY.includes(ch.classId)
      };
      const cur = best.get(ch.classId);
      if (!cur || cand.val > cur.val) best.set(ch.classId, cand);
      // Alternativa sem status de carry (set Epic) da mesma classe: permite respeitar o teto de carries da party
      if (AP_CARRY.includes(ch.classId) && !cand.carry) {
        const curNc = alt.get(ch.classId);
        if (!curNc || cand.val > curNc.val) alt.set(ch.classId, cand);
      }
    });
    alt.forEach((cand, id) => { const b = best.get(id); if (b && b.carry) best.set(id + "#nc", cand); });
    return Array.from(best.values());
  }

  // O que existe nos arquivos (para as regras de prioridade de healer)
  function apContext(files) {
    const all = [].concat(...files);
    const nativeHealer = {};
    AP_ELEMENT_KEYS.forEach((E) => {
      nativeHealer[E] = all.some((c) => AP_HEALERS.includes(c.classId) && AP_ELEMENTS[E].includes(c.classId));
    });
    return { trueHealer: all.some((c) => AP_HEALERS.includes(c.classId)), nativeHealer };
  }

  // Alvo de classes do elemento: 2 → 1 | 4 → 2 | 6/8 → 4 (ideal 5–6)
  const apMinElement = (N) => (N >= 6 ? 4 : N >= 4 ? 2 : 1);

  function apEvaluate(ms, E, N, ctx, final) {
    const ids = ms.map((m) => m.classId);
    const has = (id) => ids.includes(id);
    const any = (list) => list.some(has);

    // --- healer
    const healerMs = ms.filter((m) => AP_HEALERS.includes(m.classId));
    const healers = healerMs.length;
    // Sub-healer só assume a vaga se NENHUM arquivo tem healer verdadeiro para o conteúdo
    const designated = !ctx.trueHealer ? (ms.find((m) => AP_SUBHEALERS.includes(m.classId)) || null) : null;
    const healerOK = healers > 0 || !!designated;
    const healerNative = healerMs.some((m) => !m.guest);

    // --- carries (sets Unique/Legend) e mescla
    const range = AP_CARRY_RANGE[N] || null;
    const need = range ? range[0] : 0;
    const maxCarry = range ? range[1] : N;
    let carries = 0, hasU = false, hasL = false, val = 0;
    ms.forEach((m) => {
      val += m.val;
      if (m !== designated && m.carry && !m.guest) {
        carries++;
        if (m.setRank === 2) hasU = true;
        if (m.setRank === 3) hasL = true;
      }
    });
    const mix = hasU && hasL;

    // --- elemento
    const eCount = ms.filter((m) => !m.guest && apElementsOf(m.classId).includes(E)).length;
    const neutralPair = N === 2 && ms.length === 2 && ms.every((m) => apIsNeutral(m.classId));
    const minE = apMinElement(N);
    const elementOK = eCount >= minE || neutralPair;

    // --- tank
    const tankMs = ms.filter((m) => AP_TANKS.includes(m.classId));
    const tanks = tankMs.length;
    const tankOK = N >= 8 ? tanks === 1 : N >= 6 ? any(AP_HYBRID_TANKS) : true;
    let tankWithDps = true;
    if (tanks === 1) {
      const t = tankMs[0];
      const others = ms.filter((m) => m !== t && m !== designated && !AP_HEALERS.includes(m.classId));
      const dpsCount = others.filter((m) => AP_DPS.includes(m.classId) || AP_SUBDPS.includes(m.classId)).length;
      tankWithDps = N === 2 ? ms.filter((m) => m !== t).every((m) => AP_DPS.includes(m.classId))
                            : dpsCount >= Math.ceil((N - 2) / 2);
    }

    // --- party de 2: nunca 2 suportes/healers; suporte só com DPS; ou 2 SubDPS
    let pairOK = true;
    if (N === 2 && ms.length === 2) {
      const sups = ms.filter((m) => AP_SUPPORT.includes(m.classId));
      if (sups.length >= 2) pairOK = false;
      else if (sups.length === 1 && !AP_DPS.includes(ms.find((m) => m !== sups[0]).classId)) pairOK = false;
    }

    // --- dependências de cooldown e de burst de atributo
    const cdNeeded = any(AP_NEEDS_CD);
    const cdOK = !cdNeeded || any(AP_CD_PRIORITY);
    const burstDeps = ms.filter((m) => AP_NEEDS_BURST.includes(m.classId));
    const burstNeeded = burstDeps.length > 0;
    const burstOK = !burstNeeded || ms.some((m) => AP_BURST.includes(m.classId) && !burstDeps.every((d) => d === m));

    const offCount = ms.filter((m) => m.gtype === "off").length;   // só existe no modo "relaxado"

    // --- pontuação
    let score = val - offCount * 1500;
    score += healerOK ? 5000 : 0;
    score += healerNative ? 300 : 0;                       // healer do elemento da party tem prioridade
    score -= Math.max(0, healers - 1) * 800;               // só 1 healer
    if (range) {
      score += Math.min(carries, need) * 400 + Math.max(0, Math.min(carries, maxCarry) - need) * 40;
      score -= Math.max(0, carries - maxCarry) * 1200;     // acima do teto (só ocorre nas passadas relaxadas)
      if (carries >= 2 && mix) score += 350;               // mescla Unique + Legend
    }
    score += Math.min(eCount, minE) * 500;
    if (N >= 6) score += Math.min(Math.max(eCount - minE, 0), 2) * 150;   // 5º e 6º do elemento
    if (N === 2) { score += neutralPair ? 500 : 0; score += eCount >= 2 ? 100 : 0; }
    if (N >= 6 && tankOK) score += 2500;
    AP_CD_PRIORITY.forEach((id, i) => { if (has(id)) score += (AP_CD_PRIORITY.length - i) * 12; });
    if (final) {
      if (!tankWithDps) score -= 1500;
      if (!pairOK) score -= 4000;
      if (!cdOK) score -= 800;
      if (!burstOK) score -= 800;
    }
    return { score, healerOK, healers, designated, healerNative, carries, need, maxCarry, hasU, hasL, mix,
             eCount, minE, elementOK, neutralPair, tanks, tankOK, tankWithDps, pairOK,
             cdNeeded, cdOK, burstNeeded, burstOK, offCount };
  }

  // Regras duras ao adicionar um personagem ao estado do beam. Devolve { guest, gtype } ou null.
  function apTryAdd(st, c, E, N, ctx, relax, capOn) {
    const g = apTryAddBase(st, c, E, N, ctx, relax);
    if (g && capOn && !g.guest && c.carry) {
      const range = AP_CARRY_RANGE[N];
      if (range && (st.carryCount || 0) >= range[1]) return null;   // no máx. N carries na party
    }
    return g;
  }
  function apTryAddBase(st, c, E, N, ctx, relax) {
    if (st.classes.includes(c.classId)) return null;                       // sem classes repetidas
    if (AP_TANKS.includes(c.classId) && st.tanks >= 1) return null;        // no máx. 1 tank
    if (N === 6 && AP_PURE_TANKS.includes(c.classId)) return null;         // party de 6: tank não pode ser só tanker
    // Party de fogo: neutro que não seja suporte é proibido (vale também no modo relaxado)
    if (AP_NEUTRAL.includes(c.classId) && !apNeutralAllowed(c.classId, E)) return null;
    const slotClass = AP_SUPPORT_SLOT.includes(c.classId);
    if (apFits(c.classId, E)) {
      if (slotClass && st.ig > 0) return null;
      return { guest: false, gtype: null };
    }
    // Fora do elemento: NUNCA. A party é sempre do elemento escolhido ou neutro (ex.: Dark não entra em party Fire).
    return null;
  }

  // Beam search: um personagem por arquivo (jogador).
  // Assinatura de uma composição = classes usadas (a mesma chave que o beam usa para distinguir composições)
  const apSig = (ms) => ms.map((m) => m.classId).sort().join(",");

  function apPlanForElement(files, N, E, ctx, relax, capOn, exclude) {
    let beam = [{ ms: [], classes: [], tanks: 0, fh: 0, ig: 0, slotCount: 0, carryCount: 0, score: 0 }];
    for (let i = 0; i < N; i++) {
      const final = i === N - 1;
      const next = new Map();
      for (const st of beam) {
        for (const c of files[i]) {
          const g = apTryAdd(st, c, E, N, ctx, relax, capOn);
          if (!g) continue;
          const ms = st.ms.concat({ ...c, file: i, guest: g.guest, gtype: g.gtype });
          const ev = apEvaluate(ms, E, N, ctx, final);
          const classes = st.classes.concat(c.classId);
          const key = classes.slice().sort().join(",") + "|" + ev.carries + (ev.hasU ? "u" : "") + (ev.hasL ? "l" : "") + (ev.healerOK ? "h" : "");
          const cur = next.get(key);
          if (!cur || ev.score > cur.score) {
            next.set(key, {
              ms, classes, score: ev.score,
              tanks: st.tanks + (AP_TANKS.includes(c.classId) ? 1 : 0),
              fh: st.fh + (g.gtype === "healer" ? 1 : 0),
              ig: st.ig + (g.gtype === "ice" ? 1 : 0),
              slotCount: st.slotCount + (slotClassOf(c.classId) ? 1 : 0),
              carryCount: st.carryCount + (!g.guest && c.carry ? 1 : 0)
            });
          }
        }
      }
      beam = Array.from(next.values()).sort((a, b) => b.score - a.score).slice(0, N >= 8 ? 600 : AP_BEAM);
      if (!beam.length) return null;
    }
    // beam já vem ordenado do melhor para o pior: pega a melhor que ainda não foi rejeitada
    const top = beam.find((st) => !exclude || !exclude.has(apSig(st.ms)));
    if (!top) return null;
    const ev = apEvaluate(top.ms, E, N, ctx, true);
    return { element: E, members: top.ms, eval: ev, score: ev.score, relaxed: !!relax };
  }
  const slotClassOf = (id) => AP_SUPPORT_SLOT.includes(id);

  // Testa os 4 elementos-base e devolve a melhor party (ou null).
  // 1ª passada: regras de elemento estritas. Se nenhuma party for possível, 2ª passada relaxada
  // (classes de outro elemento entram com penalidade e aparecem como violação no resultado).
  function apBuildBestParty(files, N, exclude) {
    const ctx = apContext(files);
    let best = null;
    // Sem passada "relaxada": classe de outro elemento nunca entra. Só se afrouxa o teto de carries.
    [[false, true], [false, false]].forEach(([relax, capOn]) => {
      if (best) return;
      AP_ELEMENT_KEYS.forEach((E) => {
        const plan = apPlanForElement(files, N, E, ctx, relax, capOn, exclude);
        if (plan && (!best || plan.score > best.score)) best = plan;
      });
    });
    if (best && best.eval.eCount === 0 && best.eval.neutralPair) best.element = "neutral";
    return best;
  }

  function apRoleTags(m, ev) {
    const tags = [];
    if (AP_HEALERS.includes(m.classId)) tags.push("Healer");
    else if (ev.designated === m) tags.push("Sub-Healer");
    if (AP_TANKS.includes(m.classId)) tags.push("Tank");
    if (AP_SUPPORT.includes(m.classId) && !AP_HEALERS.includes(m.classId) && !AP_TANKS.includes(m.classId)) tags.push("Support");
    else if (AP_NEUTRAL_SUPPORT.includes(m.classId)) tags.push("Support");
    if (m !== ev.designated && m.carry && !m.guest) tags.push("Carry");
    if (AP_CD_PRIORITY.includes(m.classId)) tags.push("CD");
    if (AP_BURST.includes(m.classId)) tags.push("Burst");
    if (m.gtype === "off") tags.push("Off");
    else if (m.guest) tags.push("Guest");
    if (!tags.some((t) => ["Healer", "Sub-Healer", "Tank", "Support", "Carry"].includes(t))) tags.unshift(AP_DPS.includes(m.classId) ? "DPS" : "SubDPS");
    return tags;
  }
  /* AP-LOGIC-END */

  // ---------------------------------------------------------------- UI
  const openBtn = document.getElementById("openAutoPartyBtn");
  const overlay = document.getElementById("autoPartyOverlay");
  if (!openBtn || !overlay) return;

  const sideMenuOverlay = document.getElementById("sideMenuOverlay");
  const closeBtn   = document.getElementById("closeAutoPartyBtn");
  const typesEl    = document.getElementById("apTypes");
  const contentSel = document.getElementById("apContent");
  const filesEl    = document.getElementById("apFiles");
  const genBtn     = document.getElementById("apGenerate");
  const resetBtn   = document.getElementById("apReset");
  const resultEl   = document.getElementById("apResult");
  const historyEl  = document.getElementById("apHistory");
  const histClearBtn = document.getElementById("apHistoryClear");
  const onlineListEl = document.getElementById("apOnlineList");
  const onlineCountEl = document.getElementById("apOnlineCount");
  const onlineMsgEl = document.getElementById("apOnlineMsg");
  const onlineOpenBtn = document.getElementById("apOnlineOpen");
  const onlineStatusEl = document.getElementById("apOnlineStatus");
  const invitePanel = document.getElementById("apInvitePanel");
  const inviteCloseBtn = document.getElementById("apInviteClose");
  const inviteBackdrop = document.getElementById("apInviteBackdrop");

  const PARTY_SIZES = [2, 4, 6, 8];
  // Conteúdos por tipo de party. Party-4 = todo o resto. As chaves são os títulos gravados nos backups
  // (por isso "Typhoom Kim Hardcore" mantém a grafia do backup).
  const AP_HIDDEN_CONTENTS = ["Missão diária", "Circus: Boss Rush", "Hero Battlefield", "Circus: Monastery"];
  const AP_CONTENTS_BY_SIZE = {
    2: ["Duel Dragon", "Dragon Fellowship"],
    6: ["Typhoom Kim Hardcore", "Professor K Hardcore"],
    8: ["Desert Dragon Hardcore", "Red Dragon Normal", "Red Dragon Hardcore", "Ice Dragon Normal"]
  };
  function apContentsFor(n) {
    const fixed = AP_CONTENTS_BY_SIZE[n];
    if (fixed) return ALL_CONTENTS.filter((t) => fixed.includes(t));
    const taken = [].concat(...Object.values(AP_CONTENTS_BY_SIZE));
    return ALL_CONTENTS.filter((t) => !AP_HIDDEN_CONTENTS.includes(t) && !taken.includes(t));
  }
  const HISTORY_KEY = "dnAutoPartyHistory";
  let partySize = 4;
  let contentTitle = "";
  const slots = new Array(8).fill(null);   // { name, data, source? } por arquivo carregado (source = veio de um convite online)
  const dirty = new Set();                 // arquivos marcados como concluídos e ainda não baixados
  let lastPlan = null;                     // { plan, content, size, concluded }
  // Personagens concluídos nesta sessão (chave: arquivo/pessoa + classe + nick + conteúdo). Garante que, mesmo que o
  // arquivo seja carregado de novo ou a pessoa seja convidada de novo (dados "frescos" sem a marcação), quem já
  // concluiu o conteúdo não volta a ser sugerido.
  const concluded = new Set();
  const slotKey = (s) => (s ? (s.source ? "on:" + s.source.pub : "f:" + s.name) : "");
  const concludedKey = (s, ch, content) => slotKey(s) + "|" + (ch.classId || "") + "|" + (ch.nickname || "") + "|" + content;
  const rejected = new Set();              // composições já mostradas e descartadas (para "Gerar" trazer outra)

  // Convites online enviados por mim: pub do convidado -> { reqId, name, classId, status, timer, startedAt }
  // status: "waiting" (aguardando) | "declined" | "expired" | "error"
  const SHARE_URL = "/api/party-share";
  const INVITE_POLL_MS = 2000;
  const INVITE_TIMEOUT_MS = 125000;        // um pouco acima do TTL de 120s do servidor
  const invites = new Map();

  const T = (key, fb) => i18n(key, fb);
  const EL_KEYS = { light: "apElLight", fire: "apElFire", dark: "apElDark", ice: "apElIce", neutral: "apElNeutral" };
  const EL_FB = { light: "Light", fire: "Fire", dark: "Dark", ice: "Ice", neutral: "Neutro" };
  const elLabel = (k) => T(EL_KEYS[k], EL_FB[k]);

  // ---------------------------------------------------------------- histórico (só da sessão)
  // O histórico vive apenas em memória: ao sair do site e entrar de novo ele começa zerado.
  // A chave antiga do localStorage (versões anteriores salvavam lá) é apagada para não "voltar" do cache.
  try { localStorage.removeItem(HISTORY_KEY); } catch (_) { /* sem storage */ }
  let history = [];
  function saveHistory() {
    history = history.slice(0, 60);
  }

  // Rótulo Classe "nickname" (igual à tabela da tela inicial): classe com a fonte do título
  // "Criador de Grupos" e nickname com a fonte dos botões.
  function apNickLabel(clsName, nick) {
    const wrap = document.createElement("span");
    wrap.className = "ap-nick-label";
    const c = document.createElement("span");
    c.className = "ap-nick-class";
    c.textContent = clsName;
    wrap.appendChild(c);
    if (nick) {
      const n = document.createElement("span");
      n.className = "ap-nick-name";
      n.textContent = '"' + nick + '"';
      wrap.appendChild(n);
    }
    wrap.title = nick ? clsName + ' "' + nick + '"' : clsName;
    return wrap;
  }

  function renderHistory() {
    historyEl.textContent = "";
    histClearBtn.classList.toggle("hidden", !history.length);
    if (!history.length) {
      historyEl.appendChild(note(T("apHistoryEmpty", "Nenhuma party gerada ainda.")));
      return;
    }
    history.forEach((h) => {
      const row = document.createElement("div");
      row.className = "ap-hist-item" + (h.done ? " done" : "");

      const head = document.createElement("div");
      head.className = "ap-hist-head";
      const title = document.createElement("strong");
      title.className = "ap-hist-title";
      title.textContent = getContentLabel(h.content) + " · Party-" + h.size + " · " + elLabel(h.element);
      const status = document.createElement("span");
      status.className = "ap-hist-status " + (h.done ? "ok" : "pending");
      status.textContent = h.done ? "✔ " + T("apDoneLabel", "Concluído") : "⏳ " + T("apPendingLabel", "Pendente");
      const date = document.createElement("span");
      date.className = "ap-hist-date";
      date.textContent = new Date(h.done && h.doneAt ? h.doneAt : h.ts).toLocaleString();
      const del = document.createElement("button");
      del.type = "button";
      del.className = "ap-hist-del";
      del.textContent = "✕";
      del.title = T("compRemoveTitle", "Remover");
      del.addEventListener("click", () => {
        history = history.filter((x) => x.id !== h.id);
        saveHistory(); renderHistory();
      });
      head.appendChild(title); head.appendChild(status); head.appendChild(date); head.appendChild(del);

      const members = document.createElement("div");
      members.className = "ap-hist-members";
      h.members.forEach((m) => {
        const cls = ALL_CLASSES.find((c) => c.id === m.classId);
        const chip = document.createElement("span");
        chip.className = "ap-hist-member";
        const img = document.createElement("img");
        img.src = "img/classes/" + m.classId + ".png";
        img.alt = "";
        img.onerror = () => { img.style.display = "none"; };
        const txt = apNickLabel(cls ? getClassName(cls) : m.classId, m.nick);
        chip.appendChild(img); chip.appendChild(txt);
        members.appendChild(chip);
      });

      row.appendChild(head); row.appendChild(members);
      historyEl.appendChild(row);
    });
  }

  // ---------------------------------------------------------------- seleção de tipo / conteúdo / arquivos
  function clearResult() { resultEl.textContent = ""; lastPlan = null; }

  function renderTypes() {
    typesEl.textContent = "";
    PARTY_SIZES.forEach((n) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ap-type-btn" + (n === partySize ? " active" : "");
      b.textContent = "Party-" + n;
      b.addEventListener("click", () => {
        partySize = n;
        if (!apContentsFor(n).includes(contentTitle)) contentTitle = "";   // conteúdo não existe neste tipo de party
        rejected.clear(); clearResult(); renderTypes(); renderContentOptions(); renderFiles(); renderOnline();
      });
      typesEl.appendChild(b);
    });
  }

  function renderContentOptions() {
    contentSel.textContent = "";
    const ph = document.createElement("option");
    ph.value = "";
    ph.textContent = T("apSelectContent", "Selecione o Conteúdo");
    contentSel.appendChild(ph);
    apContentsFor(partySize).forEach((title) => {
      const o = document.createElement("option");
      o.value = title;
      o.textContent = getContentLabel(title);
      contentSel.appendChild(o);
    });
    contentSel.value = contentTitle;
  }

  function renderFiles() {
    filesEl.textContent = "";
    for (let i = 0; i < partySize; i++) {
      const box = document.createElement("div");
      box.className = "ap-file" + (slots[i] ? " loaded" : "");
      const lab = document.createElement("span");
      lab.className = "ap-file-label";
      lab.textContent = T("apFile", "Arquivo") + " " + (i + 1);
      const pick = document.createElement("button");
      pick.type = "button";
      pick.className = "ap-file-btn";
      pick.textContent = T("apChoose", "Escolher arquivo");
      const info = document.createElement("span");
      info.className = "ap-file-info";
      if (slots[i]) {
        info.textContent = slots[i].name + " · " + slots[i].data.characters.length + " " + T("apChars", "personagens")
          + (slots[i].source ? " · " + T("apViaOnline", "online") : "")
          + (dirty.has(i) ? " · " + T("apFileUpdated", "atualizado") : "")
          + (slots[i].synced ? " · " + T("apSyncedOnline", "atualizado online") : "");
      }
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json,.json";
      input.className = "hidden";
      pick.addEventListener("click", () => input.click());
      input.addEventListener("change", () => {
        const file = input.files && input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            if (!data || !Array.isArray(data.characters)) throw new Error("format");
            slots[i] = { name: file.name, data };
            dirty.delete(i);
          } catch (_) {
            slots[i] = null;
            alert(T("apBadFile", "Arquivo inválido") + ": " + file.name);
          }
          rejected.clear(); clearResult(); updateDl(); renderFiles(); renderOnline();
        };
        reader.readAsText(file);
      });
      box.appendChild(lab);
      box.appendChild(pick);
      if (slots[i]) {
        const clr = document.createElement("button");
        clr.type = "button";
        clr.className = "ap-file-clear";
        clr.textContent = "✕";
        clr.title = T("apClearSlot", "Remover");
        clr.addEventListener("click", () => {
          slots[i] = null; dirty.delete(i);
          rejected.clear(); clearResult(); updateDl(); renderFiles(); renderOnline();
        });
        box.appendChild(clr);
      }
      box.appendChild(info);
      box.appendChild(input);
      filesEl.appendChild(box);
    }
  }

  function note(text, cls) {
    const p = document.createElement("p");
    p.className = "ap-note " + (cls || "");
    p.textContent = text;
    return p;
  }

  // Sem botão de download: a marcação de concluído vai direto para a tabela do líder e, online, para a dos convidados.
  function updateDl() { /* mantido só para não quebrar as chamadas existentes */ }

  // ---------------------------------------------------------------- gerar
  function generate() {
    // Party anterior ainda pendente = usuário não gostou: descarta e traz a próxima melhor composição diferente
    if (lastPlan && !lastPlan.concluded) rejected.add(apSig(lastPlan.plan.members));
    clearResult();
    const ready = contentTitle && slots.slice(0, partySize).every(Boolean);
    if (!ready) { resultEl.appendChild(note(T("apMissing", "Escolha o conteúdo e carregue todos os arquivos."), "warn")); return; }

    const files = [];
    let empty = false;
    for (let i = 0; i < partySize; i++) {
      const sl = slots[i];
      const c = apCandidates(sl.data, contentTitle, (ch) => concluded.has(concludedKey(sl, ch, contentTitle)));
      files.push(c);
      if (!c.length) {
        empty = true;
        resultEl.appendChild(note(T("apFile", "Arquivo") + " " + (i + 1) + " (" + slots[i].name + "): " + T("apNoPending", "sem personagem pendente neste conteúdo"), "warn"));
      }
    }
    if (empty) return;

    let plan = apBuildBestParty(files, partySize, rejected);
    if (!plan && rejected.size) {
      // acabaram as combinações diferentes: recomeça pela melhor
      rejected.clear();
      plan = apBuildBestParty(files, partySize);
      if (plan) resultEl.appendChild(note(T("apNoMore", "Não há mais combinações diferentes: recomeçando pela melhor.")));
    }
    if (!plan) { resultEl.appendChild(note(T("apNoResult", "Não foi possível formar uma party com esses arquivos."), "warn")); return; }
    plan.attempt = rejected.size + 1;

    // Gerar não entra no histórico: só o conteúdo concluído é contabilizado (ver concludeCurrent)
    lastPlan = { plan, content: contentTitle, size: partySize, concluded: false };
    renderResult(plan);
  }

  // ---------------------------------------------------------------- concluir conteúdo
  // Avisa online quem foi importado pelo convite: o arquivo dessa pessoa NÃO é baixado — o servidor
  // entrega o aviso no heartbeat dela e o conteúdo é marcado como concluído na tabela dela.
  async function notifyOnlineDone(pub, slot, content, chars) {
    try {
      const res = await fetch(SHARE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "complete", id: window.dnDeviceId, to: pub, content, chars })
      });
      if (!res.ok) throw new Error("complete " + res.status);
      slot.synced = true;
      return true;
    } catch (_) {
      return false;
    }
  }

  function concludeCurrent() {
    if (!lastPlan || lastPlan.concluded) return;
    const { plan, content, size } = lastPlan;
    const online = new Map();   // pub -> { slot, chars: [{ classId, nickname }] }
    plan.members.forEach((m) => {
      const s = slots[m.file];
      const chr = s && s.data.characters[m.idx];
      const e = chr && chr.contents && chr.contents[m.ei];
      if (e && e.title === content) {
        e.done = true;
        s.data.savedAt = Date.now();   // evita que o reset semanal do import "desfaça" a marcação
        concluded.add(concludedKey(s, chr, content));
        // Tabela do próprio líder (coluna de conteúdo): marca o mesmo personagem como concluído.
        // Só arquivos locais; quem veio por convite online é atualizado na tela dele pelo aviso do servidor.
        if (!(s.source && s.source.pub) && typeof window.dnMarkContentDone === "function") {
          try { window.dnMarkContentDone(chr.classId, chr.nickname, content); } catch (_) { /* tabela indisponível */ }
        }
        if (s.source && s.source.pub) {
          // arquivo vindo do convite online: atualizado online, sem baixar
          const o = online.get(s.source.pub) || { slot: s, chars: [] };
          o.chars.push({ classId: chr.classId || "", nickname: chr.nickname || "" });
          online.set(s.source.pub, o);
        } else {
          dirty.add(m.file);
        }
      }
    });
    lastPlan.concluded = true;
    rejected.clear();   // os arquivos mudaram (personagens concluídos): próxima party parte do zero
    // histórico: só entra quando o conteúdo é concluído
    const now = Date.now();
    history.unshift({
      id: now + "-" + Math.random().toString(36).slice(2, 7),
      ts: now, doneAt: now, content, size, element: plan.element, done: true,
      members: plan.members.slice().sort((a, b) => a.file - b.file).map((m) => ({ classId: m.classId, nick: m.nick, file: m.file }))
    });
    saveHistory(); renderHistory(); renderFiles(); updateDl();
    const row = resultEl.querySelector(".ap-done-row");
    if (row) {
      row.textContent = "";
      row.appendChild(note("✔ " + T("apDoneMsgOnline", "Conteúdo concluído. Gere uma nova party com os personagens restantes.")));
      const failNote = () => note("⚠️ " + T("apSyncFail", "Não foi possível avisar {names} online. Convide a pessoa de novo e conclua o conteúdo outra vez."), "warn");
      if (online.size) {
        const pending = note("⏳ " + T("apSyncing", "Atualizando online os dados dos jogadores convidados…"));
        row.appendChild(pending);
        Promise.all(Array.from(online.entries()).map(async ([pub, o]) => ({ o, ok: await notifyOnlineDone(pub, o.slot, content, o.chars) }))).then((results) => {
          pending.remove();
          const failed = results.filter((r) => !r.ok).map((r) => r.o.slot.name);
          if (failed.length) {
            const n = failNote();
            n.textContent = n.textContent.replace("{names}", failed.join(", "));
            row.appendChild(n);
          } else {
            row.appendChild(note("📤 " + T("apSyncedMsg", "Os jogadores convidados foram avisados: o líder finalizou o conteúdo e o arquivo deles foi atualizado online.")));
          }
          renderFiles();
        });
      }
    }
  }

  // ---------------------------------------------------------------- resultado
  function renderResult(plan) {
    const ev = plan.eval;
    const N = partySize;
    const h = document.createElement("h4");
    h.className = "ap-result-title";
    h.textContent = T("apResult", "Melhor composição") + " · " + T("apElement", "Elemento da party") + ": " + elLabel(plan.element)
      + (plan.attempt > 1 ? " · " + T("apAlternative", "Alternativa") + " " + plan.attempt : "");
    resultEl.appendChild(h);

    // Classes em 2 colunas (Arquivo 1 | Arquivo 2, Arquivo 3 | Arquivo 4, ...), para party de 2/4/6/8
    const membersGrid = document.createElement("div");
    membersGrid.className = "ap-members";
    resultEl.appendChild(membersGrid);

    plan.members.slice().sort((a, b) => a.file - b.file).forEach((m) => {
      const cls = ALL_CLASSES.find((c) => c.id === m.classId);
      const row = document.createElement("div");
      row.className = "ap-member";
      const img = document.createElement("img");
      img.src = "img/classes/" + m.classId + ".png";
      img.alt = "";
      img.onerror = () => { img.style.visibility = "hidden"; };
      const who = document.createElement("div");
      who.className = "ap-member-who";
      const name = apNickLabel(cls ? getClassName(cls) : m.classId, m.nick);
      const gear = document.createElement("span");
      gear.className = "ap-member-gear";
      gear.textContent = "Set: " + (m.setText || "—") + " · " + (m.weaponText || "—");
      who.appendChild(name);
      who.appendChild(gear);
      const file = document.createElement("span");
      file.className = "ap-member-file";
      file.textContent = T("apFile", "Arquivo") + " " + (m.file + 1);
      const tags = document.createElement("div");
      tags.className = "ap-tags";
      apRoleTags(m, ev).forEach((t) => {
        const s = document.createElement("span");
        s.className = "ap-tag ap-tag-" + t.toLowerCase().replace("-", "");
        s.textContent = t;
        tags.appendChild(s);
      });
      row.appendChild(img); row.appendChild(who); row.appendChild(tags); row.appendChild(file);
      membersGrid.appendChild(row);
    });

    // ---- checklist das regras
    const checks = [];
    checks.push([ev.healerOK && ev.healers <= 1,
      T("apRuleHealer", "1 healer") + (ev.designated ? " — " + T("apRuleSubHealer", "sub-healer (nenhum healer disponível nos arquivos)") : "")]);
    if (N >= 4) {
      checks.push([ev.carries >= ev.need && ev.carries <= ev.maxCarry, T("apRuleCarry", "Carries com set Unique/Legend") + " (" + ev.carries + " · " + ev.need + "–" + ev.maxCarry + ")"]);
      checks.push([ev.carries < 2 || ev.mix, T("apRuleMix", "Carries mesclando Unique e Legend")]);
    }
    const minTxt = N >= 6 ? "mín. " + ev.minE + ", ideal 5–6" : "mín. " + ev.minE;
    checks.push([ev.elementOK, ev.neutralPair
      ? T("apRuleNeutralPair", "2 classes neutras")
      : T("apRuleElement", "Classes do elemento") + " (" + ev.eCount + " · " + minTxt + ")"]);
    if (N >= 6) checks.push([ev.tankOK, N === 8
      ? T("apRuleTank8", "1 tank")
      : T("apRuleTank6", "1 tank DPS/SubDPS (Crusader ou Defensio)")]);
    if (ev.tanks > 0) checks.push([ev.tankWithDps, T("apRuleTankDps", "Tank acompanhado de DPS")]);
    if (N === 2) checks.push([ev.pairOK, T("apRulePair", "Sem 2 suportes/healers — suporte junto de DPS")]);
    if (ev.cdNeeded) checks.push([ev.cdOK, T("apRuleCd", "Sentinel/Gear Master/Moonlord com classe de cooldown")]);
    if (ev.burstNeeded) checks.push([ev.burstOK, T("apRuleBurst", "Barbarian/Moonlord/Sniper/Crusader com classe de burst")]);
    if (ev.offCount > 0) checks.push([false, T("apRuleOff", "Sem classes de outro elemento") + " (" + ev.offCount + ")"]);
    checks.push([true, T("apRuleTank", "Máx. 1 tank") + " · " + T("apRuleDup", "Sem classes repetidas")]);

    const list = document.createElement("ul");
    list.className = "ap-checks";
    checks.forEach(([ok, text]) => {
      const li = document.createElement("li");
      li.className = ok ? "ok" : "bad";
      li.textContent = (ok ? "✔ " : "✖ ") + text;
      list.appendChild(li);
    });

    // ---- botão de conteúdo concluído
    const doneRow = document.createElement("div");
    doneRow.className = "ap-done-row";
    const doneBtn = document.createElement("button");
    doneBtn.type = "button";
    doneBtn.className = "side-menu-item ap-done-btn";
    doneBtn.textContent = "✔ " + T("apMarkDone", "Conteúdo concluído");
    doneBtn.addEventListener("click", concludeCurrent);
    doneRow.appendChild(doneBtn);

    // Regras à esquerda e botão à direita, na mesma grade de 2 colunas dos arquivos:
    // o botão fica na coluna do Arquivo 2/4 (canto direito), ao lado do checklist.
    const bottom = document.createElement("div");
    bottom.className = "ap-bottom";
    bottom.appendChild(list);
    bottom.appendChild(doneRow);
    resultEl.appendChild(bottom);
  }

  // ---------------------------------------------------------------- convite online
  let onlineMsgTimer = null;
  function onlineMsg(text) {
    if (!onlineMsgEl) return;
    onlineMsgEl.textContent = text || "";
    clearTimeout(onlineMsgTimer);
    if (text) onlineMsgTimer = setTimeout(() => { onlineMsgEl.textContent = ""; }, 7000);
  }

  // Arquivo (dentro do tipo de party atual) que já foi preenchido por essa pessoa, ou -1
  function slotOf(pub) {
    for (let i = 0; i < partySize; i++) if (slots[i] && slots[i].source && slots[i].source.pub === pub) return i;
    return -1;
  }
  function freeSlot() {
    for (let i = 0; i < partySize; i++) if (!slots[i]) return i;
    return -1;
  }

  // Janela de convite (entra da esquerda para a direita; fecha ao escolher alguém)
  function openInvitePanel() {
    if (!invitePanel) return;
    renderOnline();
    invitePanel.classList.add("open");
    if (inviteBackdrop) inviteBackdrop.classList.add("open");
    invitePanel.setAttribute("aria-hidden", "false");
  }
  function closeInvitePanel(instant) {
    if (!invitePanel) return;
    if (instant) { invitePanel.classList.add("no-anim"); if (inviteBackdrop) inviteBackdrop.classList.add("no-anim"); }
    invitePanel.classList.remove("open");
    if (inviteBackdrop) inviteBackdrop.classList.remove("open");
    invitePanel.setAttribute("aria-hidden", "true");
    if (onlineOpenBtn) onlineOpenBtn.blur();
    if (instant) { void invitePanel.offsetWidth; invitePanel.classList.remove("no-anim"); if (inviteBackdrop) inviteBackdrop.classList.remove("no-anim"); }
  }
  const invitePanelOpen = () => !!invitePanel && invitePanel.classList.contains("open");

  // Resumo dos convites na tela da party (a lista fica na janela, que fecha ao convidar)
  function renderInviteStatus() {
    if (!onlineStatusEl) return;
    onlineStatusEl.textContent = "";
    invites.forEach((st) => {
      const key = st.status === "waiting" ? ["apInviteWaiting", "Aguardando…", "wait"]
        : st.status === "declined" ? ["apInviteDeclined", "Recusou", "bad"]
        : st.status === "expired" ? ["apInviteExpired", "Sem resposta", "bad"]
        : st.status === "error" ? ["apInviteError", "Falhou", "bad"] : null;
      if (!key) return;
      const line = document.createElement("div");
      line.className = "ap-online-status " + key[2];
      line.textContent = st.name + " — " + T(key[0], key[1]);
      onlineStatusEl.appendChild(line);
    });
  }

  function renderOnline() {
    renderInviteStatus();
    if (!onlineListEl) return;
    const keep = onlineListEl.scrollTop;
    onlineListEl.textContent = "";
    const live = typeof window.isPresenceLive === "function" && window.isPresenceLive();
    const users = ((typeof window.getOnlineUsers === "function" && window.getOnlineUsers()) || []).slice();
    // convite em andamento continua visível mesmo se a pessoa sumiu da lista por um instante
    invites.forEach((st, pub) => {
      if (st.status === "waiting" && !users.some((u) => u.pub === pub)) users.push({ pub, name: st.name, classId: st.classId });
    });
    onlineCountEl.textContent = live && users.length ? "(" + users.length + ")" : "";

    if (!live && !users.length) {
      const localMode = typeof window.isLocalMode === "function" && window.isLocalMode();
      onlineListEl.appendChild(note(localMode
        ? T("apOnlineLocal", "Modo local: os convites só funcionam no site publicado ou com \"netlify dev\".")
        : T("apOnlineOffline", "Convites indisponíveis: não foi possível falar com o servidor."))); return; }
    if (!users.length) {
      const total = typeof window.getOnlineTotal === "function" ? window.getOnlineTotal() : 0;
      const others = Math.max(0, total - 1);   // o total inclui a própria pessoa
      onlineListEl.appendChild(note(T("apOnlineEmpty", "Ninguém online com personagens no momento.")
        + (others > 0 ? " (" + others + " " + T("apOnlineNoChars", "online sem classe na tabela ou com versão antiga do site") + ")" : "")));
      return;
    }

    users.forEach((u) => {
      const st = invites.get(u.pub);
      const waiting = st && st.status === "waiting";
      const loaded = slotOf(u.pub);

      const row = document.createElement("div");
      row.className = "ap-online-item";
      const img = document.createElement("img");
      img.src = "img/classes/" + encodeURIComponent(u.classId || "") + ".png";
      img.alt = "";
      img.onerror = () => { img.style.visibility = "hidden"; };
      const name = document.createElement("span");
      name.className = "ap-online-name";
      name.textContent = u.name;
      name.title = u.name;
      const status = document.createElement("span");
      status.className = "ap-online-status";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ap-file-btn";

      if (waiting) {
        status.textContent = T("apInviteWaiting", "Aguardando…");
        status.classList.add("wait");
        btn.textContent = T("apInviteCancel", "Cancelar");
        btn.addEventListener("click", () => cancelInvite(u.pub));
      } else {
        if (st && st.status === "declined") { status.textContent = T("apInviteDeclined", "Recusou"); status.classList.add("bad"); }
        else if (st && st.status === "expired") { status.textContent = T("apInviteExpired", "Sem resposta"); status.classList.add("bad"); }
        else if (st && st.status === "error") { status.textContent = T("apInviteError", "Falhou"); status.classList.add("bad"); }
        else if (loaded >= 0) { status.textContent = "✔ " + T("apFile", "Arquivo") + " " + (loaded + 1); status.classList.add("ok"); }
        btn.textContent = T("apInvite", "Convidar");
        btn.addEventListener("click", () => { btn.blur(); closeInvitePanel(); inviteUser(u); });
      }
      row.appendChild(img); row.appendChild(name); row.appendChild(status); row.appendChild(btn);
      onlineListEl.appendChild(row);
    });
    onlineListEl.scrollTop = keep;
  }

  function stopInvite(pub) {
    const st = invites.get(pub);
    if (!st) return null;
    clearTimeout(st.timer);
    invites.delete(pub);
    return st;
  }

  function cancelRemote(pub, reqId) {
    if (!reqId) return;
    fetch(SHARE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "cancel", id: window.dnDeviceId, to: pub, reqId })
    }).catch(() => {});
  }

  function cancelInvite(pub) {
    const st = stopInvite(pub);
    if (st) cancelRemote(pub, st.reqId);
    renderOnline();
  }
  function cancelAllInvites() {
    Array.from(invites.keys()).forEach((pub) => { const st = stopInvite(pub); if (st) cancelRemote(pub, st.reqId); });
  }

  async function inviteUser(u) {
    const cur = invites.get(u.pub);
    if (cur && cur.status === "waiting") return;
    if (slotOf(u.pub) < 0 && freeSlot() < 0) {
      onlineMsg(T("apInviteFull", "Todos os arquivos já estão preenchidos. Remova um (✕) para convidar."));
      return;
    }
    onlineMsg("");
    const st = { reqId: null, name: u.name, classId: u.classId, status: "waiting", timer: null, startedAt: Date.now() };
    invites.set(u.pub, st);
    renderOnline();
    try {
      const res = await fetch(SHARE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "invite", id: window.dnDeviceId, to: u.pub })
      });
      const j = await res.json().catch(() => ({}));
      if (invites.get(u.pub) !== st) { if (j.reqId) cancelRemote(u.pub, j.reqId); return; }   // cancelado enquanto enviava
      if (!res.ok || !j.reqId) {
        invites.delete(u.pub);
        if (j.error === "no_name") onlineMsg(T("apNeedChar", "Adicione uma classe à tabela primeiro: o nickname dela identifica você no convite."));
        else if (j.error === "busy") onlineMsg(T("apInviteBusy", "Essa pessoa já tem convites pendentes. Tente de novo em instantes."));
        else { invites.set(u.pub, Object.assign(st, { status: "error" })); }
        renderOnline();
        return;
      }
      st.reqId = j.reqId;
      st.startedAt = Date.now();
      pollInvite(u.pub, st);
    } catch (_) {
      if (invites.get(u.pub) === st) { st.status = "error"; renderOnline(); }
    }
  }

  function pollInvite(pub, st) {
    const tick = async () => {
      if (invites.get(pub) !== st || st.status !== "waiting") return;
      if (Date.now() - st.startedAt > INVITE_TIMEOUT_MS) {
        st.status = "expired"; cancelRemote(pub, st.reqId); renderOnline(); return;
      }
      try {
        const res = await fetch(SHARE_URL + "?req=" + encodeURIComponent(st.reqId) + "&to=" + encodeURIComponent(pub)
          + "&id=" + encodeURIComponent(window.dnDeviceId), { cache: "no-store" });
        const j = await res.json();
        if (invites.get(pub) !== st) return;   // cancelado durante a requisição
        if (j.status === "accepted") { receiveShared(pub, st, j.data); return; }
        if (j.status === "declined") { st.status = "declined"; renderOnline(); return; }
        if (j.status === "expired") { st.status = "expired"; renderOnline(); return; }
      } catch (_) { /* falha de rede: tenta de novo até o tempo acabar */ }
      st.timer = setTimeout(tick, INVITE_POLL_MS);
    };
    st.timer = setTimeout(tick, INVITE_POLL_MS);
  }

  // Dados chegaram: entram no mesmo slot que um arquivo escolhido à mão ocuparia.
  function receiveShared(pub, st, data) {
    if (!data || !Array.isArray(data.characters)) { st.status = "error"; renderOnline(); return; }
    let idx = slotOf(pub);                    // convidar de novo a mesma pessoa atualiza o arquivo dela
    if (idx < 0) idx = freeSlot();
    if (idx < 0) {                            // todos ocupados enquanto esperava a resposta
      stopInvite(pub);
      onlineMsg(T("apInviteFull", "Todos os arquivos já estão preenchidos. Remova um (✕) para convidar."));
      renderOnline();
      return;
    }
    stopInvite(pub);
    slots[idx] = { name: st.name, data, source: { pub, name: st.name } };
    dirty.delete(idx);
    rejected.clear(); clearResult(); updateDl(); renderFiles(); renderOnline();
    if (typeof window.showToast === "function") {
      window.showToast(T("apLoadedToast", "📥 {name} carregado no Arquivo {n}").replace("{name}", st.name).replace("{n}", idx + 1));
    }
  }

  window.addEventListener("dn:online-users", () => { if (!overlay.classList.contains("hidden")) renderOnline(); });

  function renderAll() { renderTypes(); renderContentOptions(); renderFiles(); renderOnline(); renderHistory(); updateDl(); }

  contentSel.addEventListener("change", () => { contentTitle = contentSel.value; rejected.clear(); clearResult(); });
  genBtn.addEventListener("click", generate);
  if (onlineOpenBtn) onlineOpenBtn.addEventListener("click", () => { onlineOpenBtn.blur(); openInvitePanel(); });
  if (inviteCloseBtn) inviteCloseBtn.addEventListener("click", () => closeInvitePanel());
  if (inviteBackdrop) inviteBackdrop.addEventListener("click", () => closeInvitePanel());
  resetBtn.addEventListener("click", () => {
    cancelAllInvites(); invites.clear(); onlineMsg("");
    slots.fill(null); dirty.clear(); contentTitle = ""; rejected.clear(); clearResult(); renderAll();
  });
  histClearBtn.addEventListener("click", () => {
    if (!confirm(T("apHistoryClearConfirm", "Apagar todo o histórico de parties?"))) return;
    history = []; saveHistory(); renderHistory();
  });

  openBtn.addEventListener("click", () => {
    if (sideMenuOverlay) sideMenuOverlay.classList.add("hidden");
    closeInvitePanel(true);
    overlay.classList.remove("hidden");
    renderAll();
  });
  const close = () => { closeInvitePanel(true); overlay.classList.add("hidden"); };
  closeBtn.addEventListener("click", close);
  // clicar no fundo escuro fecha (inclui a folga entre o modal e o painel de histórico)
  const layoutEl = document.getElementById("apLayout");
  // Qualquer clique que não caia dentro de um painel (modal, histórico, janela de convite) fecha.
  // A checagem por "closest" cobre também as folgas/padding do layout. Elementos que saíram do DOM
  // durante o clique (re-render de lista) são ignorados para não fechar sem querer.
  overlay.addEventListener("click", (e) => {
    const t = e.target;
    if (!t || !t.isConnected) return;
    if (t === overlay || t === layoutEl || !t.closest(".guide-modal, .ap-invite-panel, .ap-invite-backdrop")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || overlay.classList.contains("hidden")) return;
    if (invitePanelOpen()) closeInvitePanel(); else close();   // Esc fecha primeiro a janela de convite
  });

  // troca de idioma: refaz os textos dinâmicos (os estáticos usam data-i18n)
  window.refreshAutoParty = () => { if (!overlay.classList.contains("hidden")) { renderAll(); clearResult(); } };
})();

// =========================================================
// FREEDOM — área da Comunidade
//  • Acesso por senha (menu ☰ → FREEDOM)
//  • Lateral esquerda: nickname + "gaveta" DATABASE (Classe / Lista)
//  • Lado direito: grupos de 6 ou 8 slots (Classe + Nickname)
//  • Cada jogador pode ter a MESMA classe várias vezes (cada uma com seu equipamento)
//  • Botão do olho em cada grupo: a tabela vira (flip) e mostra buffs/debuffs da composição
// Dados: localStorage (sempre) + /api/freedom (D1) quando o servidor responde.
// Todos os textos seguem o idioma escolhido no site (dnOriginsSelectedLang).
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const openBtn = $("openFreedomBtn");
  const passOverlay = $("freedomPassOverlay");
  const overlay = $("freedomOverlay");
  if (!openBtn || !overlay || !passOverlay || typeof ALL_CLASSES === "undefined") return;

  const modal = $("freedomModal");
  const side = $("freedomSide");
  let sideList = null;   // área rolável da lateral (o título DATABASE fica fora dela)
  const groupsBox = $("freedomGroups");
  let rosterBox = null;                                   // lista "Selecionáveis" (à direita dos grupos)
  let sideHidden = false;                                 // database oculto pela setinha
  try { sideHidden = localStorage.getItem("dnoFdSideHidden") === "1"; } catch (_) {}
  const UI_TXT = {   // [título da lista, coluna nick, coluna vezes, ocultar database, mostrar database]
    pt: ["Selecionáveis", "Nick", "Vezes", "Ocultar database", "Mostrar database"],
    en: ["Selectable", "Nickname", "Times", "Hide database", "Show database"],
    es: ["Seleccionables", "Nick", "Veces", "Ocultar database", "Mostrar database"],
    ru: ["Доступные", "Ник", "Раз", "Скрыть базу", "Показать базу"],
    fr: ["Sélectionnables", "Pseudo", "Fois", "Masquer la base", "Afficher la base"],
    de: ["Auswählbar", "Nick", "Mal", "Datenbank ausblenden", "Datenbank anzeigen"],
    id: ["Dapat dipilih", "Nick", "Kali", "Sembunyikan database", "Tampilkan database"],
    fil: ["Mapipili", "Nick", "Beses", "Itago ang database", "Ipakita ang database"],
    zh: ["可选列表", "昵称", "次数", "隐藏数据库", "显示数据库"]
  };
  const uiTxt = () => UI_TXT[(typeof getCurrentLang === "function" ? getCurrentLang() : "pt-BR").toLowerCase().split("-")[0]] || UI_TXT.en;
  const addGroupBtn = $("freedomAddGroupBtn");
  const statusEl = $("freedomStatus");
  const toastEl = $("freedomToast");
  const passBox = $("freedomPassBox");
  const passInput = $("freedomPassInput");
  const passErr = $("freedomPassError");
  const passOk = $("freedomPassOk");

  const NICK_KEY = "dnoFreedomNick";
  const DB_KEY = "dnoFreedomDB";
  const GROUPS_KEY = "dnoFreedomGroups";
  const GROUP_W = 332;   // largura do card de grupo (mantenha igual a .fd-group no CSS)
  const API = "/api/freedom";
  const LOCAL_PASS = "2846"; // só usado se o servidor não responder (modo local)

  const RAR = {
    epic:   { label: "Epic",   color: "var(--rarity-epic)" },
    unique: { label: "Unique", color: "var(--rarity-unique)" },
    legend: { label: "Legend", color: "var(--rarity-legend)" }
  };
  const RAR_ORDER = ["epic", "unique", "legend"];
  const LEVELS = [80, 90];

  // ------------------------------------------------------------ idiomas
  const FD = {
    "pt-BR": {
      discordLabel: "ID do Discord (opcional)", discordPh: "ID do Discord", addPerson: "Adicionar pessoa", addClass: "Adicionar classe", delPerson: "Remover pessoa",
      confirmDelPerson: "Remover {p} e todas as classes dela do database?", discordBad: "O ID do Discord deve ter só números.", emptyList2: "Nenhuma classe salva ainda. Clique em + para adicionar.",
      timeTitle: "Horário do evento", timeZone: "Fuso", timeConfirm: "Confirmar", sentOk: "{g} enviado ao Discord.", sendFail: "Não foi possível enviar ao Discord.",
      sendNoHook: "O webhook do Discord ainda não foi configurado no servidor.", sendNeedOnline: "Entre na área com a senha (modo sincronizado) para enviar ao Discord.", sendEmpty: "Preencha ao menos um slot do grupo antes de enviar.",
      comm: "Comunidade", groups: "Grupos", newGroup: "Novo grupo",
      passInfo: "Área da Comunidade. Digite a senha para entrar.", passPh: "Senha",
      cancel: "Cancelar", enter: "Entrar", close: "Fechar", wrongPass: "Senha incorreta.",
      syncOn: "● Sincronizado com a comunidade", syncOff: "● Somente neste navegador",
      nickLabel: "Nickname do jogador", nickPh: "Seu nick no jogo", confirm: "Confirmar",
      nickEmpty: "Digite um nickname.", nickMax: "Máximo de 20 caracteres.",
      nickDup: "Esse nick já existe no database.", nickDupComm: "Esse nick já existe no database da comunidade.",
      editNick: "Editar nick", menu: "Menu", mClass: "Classe", mList: "Lista",
      pickClass: "Escolha a classe", classes: "Classes", rarity: "Raridade", level: "Nível",
      set: "Set", weapon: "Arma", clearSet: "Limpar Set", clearWeapon: "Limpar Arma",
      delClass: "Remover da lista", confirmDelClass: "Remover {c} da lista?",
      saveList: "Salvar na lista", saved: "{c} salvo na lista.", removed: "{c} removido da lista.",
      emptyList: "Nenhuma classe salva ainda. Abra o menu ≡ e escolha “Classe”.",
      tileEdit: "{c} — clique para editar",
      emptyGroups: "Clique em + para criar um grupo de 6 ou 8 slots.",
      group: "GRUPO", send: "Enviar para o Discord", sendSoon: "O envio para o Discord ainda não está ativo — será ligado em breve.",
      delGroup: "Remover grupo", confirmDelGroup: "Remover {g}?",
      colClass: "Classe", colNick: "Nickname", selClass: "Selecionar classe", selNick: "Selecionar nick",
      clearRow: "Limpar linha", clearNick: "Limpar nick", whoHas: "Quem tem {c}",
      nobody: "Ninguém no database tem essa classe (ou já está neste grupo).",
      slotsQ: "Quantos slots?", viewComp: "Ver buffs e debuffs", viewTable: "Ver tabela"
    },
    "pt-PT": {
      discordLabel: "ID do Discord (opcional)", discordPh: "ID do Discord", addPerson: "Adicionar pessoa", addClass: "Adicionar classe", delPerson: "Remover pessoa",
      confirmDelPerson: "Remover {p} e todas as classes dela da base de dados?", discordBad: "O ID do Discord deve ter apenas números.", emptyList2: "Ainda não há classes guardadas. Clique em + para adicionar.",
      timeTitle: "Horário do evento", timeZone: "Fuso", timeConfirm: "Confirmar", sentOk: "{g} enviado para o Discord.", sendFail: "Não foi possível enviar para o Discord.",
      sendNoHook: "O webhook do Discord ainda não foi configurado no servidor.", sendNeedOnline: "Entre na área com a palavra-passe (modo sincronizado) para enviar para o Discord.", sendEmpty: "Preencha pelo menos uma vaga do grupo antes de enviar.",
      comm: "Comunidade", groups: "Grupos", newGroup: "Novo grupo",
      passInfo: "Área da Comunidade. Introduza a palavra-passe para entrar.", passPh: "Palavra-passe",
      cancel: "Cancelar", enter: "Entrar", close: "Fechar", wrongPass: "Palavra-passe incorreta.",
      syncOn: "● Sincronizado com a comunidade", syncOff: "● Apenas neste navegador",
      nickLabel: "Nickname do jogador", nickPh: "O seu nick no jogo", confirm: "Confirmar",
      nickEmpty: "Introduza um nickname.", nickMax: "Máximo de 20 caracteres.",
      nickDup: "Esse nick já existe na base de dados.", nickDupComm: "Esse nick já existe na base de dados da comunidade.",
      editNick: "Editar nick", menu: "Menu", mClass: "Classe", mList: "Lista",
      pickClass: "Escolha a classe", classes: "Classes", rarity: "Raridade", level: "Nível",
      set: "Set", weapon: "Arma", clearSet: "Limpar Set", clearWeapon: "Limpar Arma",
      delClass: "Remover da lista", confirmDelClass: "Remover {c} da lista?",
      saveList: "Guardar na lista", saved: "{c} guardado na lista.", removed: "{c} removido da lista.",
      emptyList: "Ainda não há classes guardadas. Abra o menu ≡ e escolha “Classe”.",
      tileEdit: "{c} — clique para editar",
      emptyGroups: "Clique em + para criar um grupo de 6 ou 8 vagas.",
      group: "GRUPO", send: "Enviar para o Discord", sendSoon: "O envio para o Discord ainda não está ativo — será ligado em breve.",
      delGroup: "Remover grupo", confirmDelGroup: "Remover {g}?",
      colClass: "Classe", colNick: "Nickname", selClass: "Selecionar classe", selNick: "Selecionar nick",
      clearRow: "Limpar linha", clearNick: "Limpar nick", whoHas: "Quem tem {c}",
      nobody: "Ninguém na base de dados tem esta classe (ou já está neste grupo).",
      slotsQ: "Quantas vagas?", viewComp: "Ver buffs e debuffs", viewTable: "Ver tabela"
    },
    es: {
      discordLabel: "ID de Discord (opcional)", discordPh: "ID de Discord", addPerson: "Añadir persona", addClass: "Añadir clase", delPerson: "Quitar persona",
      confirmDelPerson: "¿Quitar a {p} y todas sus clases de la base de datos?", discordBad: "El ID de Discord debe tener solo números.", emptyList2: "Aún no hay clases guardadas. Haz clic en + para añadir.",
      timeTitle: "Hora del evento", timeZone: "Zona", timeConfirm: "Confirmar", sentOk: "{g} enviado a Discord.", sendFail: "No se pudo enviar a Discord.",
      sendNoHook: "El webhook de Discord aún no está configurado en el servidor.", sendNeedOnline: "Entra con la contraseña (modo sincronizado) para enviar a Discord.", sendEmpty: "Rellena al menos un slot del grupo antes de enviar.",
      comm: "Comunidad", groups: "Grupos", newGroup: "Nuevo grupo",
      passInfo: "Área de la Comunidad. Escribe la contraseña para entrar.", passPh: "Contraseña",
      cancel: "Cancelar", enter: "Entrar", close: "Cerrar", wrongPass: "Contraseña incorrecta.",
      syncOn: "● Sincronizado con la comunidad", syncOff: "● Solo en este navegador",
      nickLabel: "Nickname del jugador", nickPh: "Tu nick en el juego", confirm: "Confirmar",
      nickEmpty: "Escribe un nickname.", nickMax: "Máximo 20 caracteres.",
      nickDup: "Ese nick ya existe en la base de datos.", nickDupComm: "Ese nick ya existe en la base de datos de la comunidad.",
      editNick: "Editar nick", menu: "Menú", mClass: "Clase", mList: "Lista",
      pickClass: "Elige la clase", classes: "Clases", rarity: "Rareza", level: "Nivel",
      set: "Set", weapon: "Arma", clearSet: "Limpiar Set", clearWeapon: "Limpiar Arma",
      delClass: "Quitar de la lista", confirmDelClass: "¿Quitar {c} de la lista?",
      saveList: "Guardar en la lista", saved: "{c} guardado en la lista.", removed: "{c} quitado de la lista.",
      emptyList: "Aún no hay clases guardadas. Abre el menú ≡ y elige “Clase”.",
      tileEdit: "{c} — clic para editar",
      emptyGroups: "Haz clic en + para crear un grupo de 6 u 8 espacios.",
      group: "GRUPO", send: "Enviar a Discord", sendSoon: "El envío a Discord aún no está activo; se activará pronto.",
      delGroup: "Eliminar grupo", confirmDelGroup: "¿Eliminar {g}?",
      colClass: "Clase", colNick: "Nickname", selClass: "Elegir clase", selNick: "Elegir nick",
      clearRow: "Limpiar fila", clearNick: "Limpiar nick", whoHas: "Quién tiene {c}",
      nobody: "Nadie en la base de datos tiene esta clase (o ya está en este grupo).",
      slotsQ: "¿Cuántos espacios?", viewComp: "Ver buffs y debuffs", viewTable: "Ver tabla"
    },
    en: {
      discordLabel: "Discord ID (optional)", discordPh: "Discord ID", addPerson: "Add person", addClass: "Add class", delPerson: "Remove person",
      confirmDelPerson: "Remove {p} and all their classes from the database?", discordBad: "The Discord ID must be numbers only.", emptyList2: "No class saved yet. Click + to add one.",
      timeTitle: "Event time", timeZone: "Zone", timeConfirm: "Confirm", sentOk: "{g} sent to Discord.", sendFail: "Could not send to Discord.",
      sendNoHook: "The Discord webhook isn’t configured on the server yet.", sendNeedOnline: "Sign in with the password (synced mode) to send to Discord.", sendEmpty: "Fill at least one slot in the group before sending.",
      comm: "Community", groups: "Groups", newGroup: "New group",
      passInfo: "Community area. Enter the password to get in.", passPh: "Password",
      cancel: "Cancel", enter: "Enter", close: "Close", wrongPass: "Wrong password.",
      syncOn: "● Synced with the community", syncOff: "● This browser only",
      nickLabel: "Player nickname", nickPh: "Your in-game nick", confirm: "Confirm",
      nickEmpty: "Enter a nickname.", nickMax: "Maximum 20 characters.",
      nickDup: "That nick already exists in the database.", nickDupComm: "That nick already exists in the community database.",
      editNick: "Edit nick", menu: "Menu", mClass: "Class", mList: "List",
      pickClass: "Choose the class", classes: "Classes", rarity: "Rarity", level: "Level",
      set: "Set", weapon: "Weapon", clearSet: "Clear Set", clearWeapon: "Clear Weapon",
      delClass: "Remove from list", confirmDelClass: "Remove {c} from the list?",
      saveList: "Save to list", saved: "{c} saved to the list.", removed: "{c} removed from the list.",
      emptyList: "No class saved yet. Open the ≡ menu and choose “Class”.",
      tileEdit: "{c} — click to edit",
      emptyGroups: "Click + to create a group of 6 or 8 slots.",
      group: "GROUP", send: "Send to Discord", sendSoon: "Sending to Discord isn’t active yet — it will be enabled soon.",
      delGroup: "Remove group", confirmDelGroup: "Remove {g}?",
      colClass: "Class", colNick: "Nickname", selClass: "Select class", selNick: "Select nick",
      clearRow: "Clear row", clearNick: "Clear nick", whoHas: "Who has {c}",
      nobody: "Nobody in the database has this class (or they’re already in this group).",
      slotsQ: "How many slots?", viewComp: "View buffs and debuffs", viewTable: "View table"
    },
    ru: {
      comm: "Сообщество", groups: "Группы", newGroup: "Новая группа",
      passInfo: "Раздел сообщества. Введите пароль, чтобы войти.", passPh: "Пароль",
      cancel: "Отмена", enter: "Войти", close: "Закрыть", wrongPass: "Неверный пароль.",
      syncOn: "● Синхронизировано с сообществом", syncOff: "● Только в этом браузере",
      nickLabel: "Никнейм игрока", nickPh: "Ваш ник в игре", confirm: "Подтвердить",
      nickEmpty: "Введите никнейм.", nickMax: "Максимум 20 символов.",
      nickDup: "Такой ник уже есть в базе.", nickDupComm: "Такой ник уже есть в базе сообщества.",
      editNick: "Изменить ник", menu: "Меню", mClass: "Класс", mList: "Список",
      pickClass: "Выберите класс", classes: "Классы", rarity: "Редкость", level: "Уровень",
      set: "Сет", weapon: "Оружие", clearSet: "Очистить сет", clearWeapon: "Очистить оружие",
      delClass: "Убрать из списка", confirmDelClass: "Убрать {c} из списка?",
      saveList: "Сохранить в список", saved: "{c} сохранён в списке.", removed: "{c} убран из списка.",
      emptyList: "Сохранённых классов пока нет. Откройте меню ≡ и выберите «Класс».",
      tileEdit: "{c} — нажмите для изменения",
      emptyGroups: "Нажмите +, чтобы создать группу на 6 или 8 мест.",
      group: "ГРУППА", send: "Отправить в Discord", sendSoon: "Отправка в Discord пока не активна — скоро появится.",
      delGroup: "Удалить группу", confirmDelGroup: "Удалить {g}?",
      colClass: "Класс", colNick: "Никнейм", selClass: "Выбрать класс", selNick: "Выбрать ник",
      clearRow: "Очистить строку", clearNick: "Очистить ник", whoHas: "У кого есть {c}",
      nobody: "В базе нет никого с этим классом (или он уже в этой группе).",
      slotsQ: "Сколько мест?", viewComp: "Показать баффы и дебаффы", viewTable: "Показать таблицу"
    },
    fil: {
      comm: "Komunidad", groups: "Mga Grupo", newGroup: "Bagong grupo",
      passInfo: "Lugar ng Komunidad. Ilagay ang password para makapasok.", passPh: "Password",
      cancel: "Kanselahin", enter: "Pumasok", close: "Isara", wrongPass: "Maling password.",
      syncOn: "● Naka-sync sa komunidad", syncOff: "● Sa browser na ito lang",
      nickLabel: "Nickname ng manlalaro", nickPh: "Iyong nick sa laro", confirm: "Kumpirmahin",
      nickEmpty: "Maglagay ng nickname.", nickMax: "Hanggang 20 character lang.",
      nickDup: "Mayroon nang ganitong nick sa database.", nickDupComm: "Mayroon nang ganitong nick sa database ng komunidad.",
      editNick: "I-edit ang nick", menu: "Menu", mClass: "Class", mList: "Listahan",
      pickClass: "Piliin ang class", classes: "Mga class", rarity: "Rarity", level: "Level",
      set: "Set", weapon: "Sandata", clearSet: "I-clear ang Set", clearWeapon: "I-clear ang Sandata",
      delClass: "Alisin sa listahan", confirmDelClass: "Alisin ang {c} sa listahan?",
      saveList: "I-save sa listahan", saved: "Na-save ang {c} sa listahan.", removed: "Naalis ang {c} sa listahan.",
      emptyList: "Wala pang naka-save na class. Buksan ang menu ≡ at piliin ang “Class”.",
      tileEdit: "{c} — i-click para i-edit",
      emptyGroups: "I-click ang + para gumawa ng grupong may 6 o 8 slot.",
      group: "GRUPO", send: "Ipadala sa Discord", sendSoon: "Hindi pa aktibo ang pagpapadala sa Discord — malapit na.",
      delGroup: "Alisin ang grupo", confirmDelGroup: "Alisin ang {g}?",
      colClass: "Class", colNick: "Nickname", selClass: "Pumili ng class", selNick: "Pumili ng nick",
      clearRow: "I-clear ang hanay", clearNick: "I-clear ang nick", whoHas: "Sino ang may {c}",
      nobody: "Walang may ganitong class sa database (o nasa grupong ito na).",
      slotsQ: "Ilang slot?", viewComp: "Tingnan ang buffs at debuffs", viewTable: "Tingnan ang talahanayan"
    },
    id: {
      comm: "Komunitas", groups: "Grup", newGroup: "Grup baru",
      passInfo: "Area Komunitas. Masukkan kata sandi untuk masuk.", passPh: "Kata sandi",
      cancel: "Batal", enter: "Masuk", close: "Tutup", wrongPass: "Kata sandi salah.",
      syncOn: "● Tersinkron dengan komunitas", syncOff: "● Hanya di browser ini",
      nickLabel: "Nickname pemain", nickPh: "Nick kamu di game", confirm: "Konfirmasi",
      nickEmpty: "Masukkan nickname.", nickMax: "Maksimal 20 karakter.",
      nickDup: "Nick ini sudah ada di database.", nickDupComm: "Nick ini sudah ada di database komunitas.",
      editNick: "Ubah nick", menu: "Menu", mClass: "Kelas", mList: "Daftar",
      pickClass: "Pilih kelas", classes: "Kelas", rarity: "Kelangkaan", level: "Level",
      set: "Set", weapon: "Senjata", clearSet: "Hapus Set", clearWeapon: "Hapus Senjata",
      delClass: "Hapus dari daftar", confirmDelClass: "Hapus {c} dari daftar?",
      saveList: "Simpan ke daftar", saved: "{c} disimpan ke daftar.", removed: "{c} dihapus dari daftar.",
      emptyList: "Belum ada kelas tersimpan. Buka menu ≡ dan pilih “Kelas”.",
      tileEdit: "{c} — klik untuk mengedit",
      emptyGroups: "Klik + untuk membuat grup dengan 6 atau 8 slot.",
      group: "GRUP", send: "Kirim ke Discord", sendSoon: "Pengiriman ke Discord belum aktif — segera hadir.",
      delGroup: "Hapus grup", confirmDelGroup: "Hapus {g}?",
      colClass: "Kelas", colNick: "Nickname", selClass: "Pilih kelas", selNick: "Pilih nick",
      clearRow: "Kosongkan baris", clearNick: "Kosongkan nick", whoHas: "Siapa yang punya {c}",
      nobody: "Tidak ada di database yang punya kelas ini (atau sudah ada di grup ini).",
      slotsQ: "Berapa slot?", viewComp: "Lihat buff dan debuff", viewTable: "Lihat tabel"
    },
    zh: {
      comm: "社区", groups: "队伍", newGroup: "新建队伍",
      passInfo: "社区专区。请输入密码进入。", passPh: "密码",
      cancel: "取消", enter: "进入", close: "关闭", wrongPass: "密码错误。",
      syncOn: "● 已与社区同步", syncOff: "● 仅限此浏览器",
      nickLabel: "玩家昵称", nickPh: "你的游戏昵称", confirm: "确认",
      nickEmpty: "请输入昵称。", nickMax: "最多 20 个字符。",
      nickDup: "该昵称已存在于数据库中。", nickDupComm: "该昵称已存在于社区数据库中。",
      editNick: "编辑昵称", menu: "菜单", mClass: "职业", mList: "列表",
      pickClass: "选择职业", classes: "职业", rarity: "稀有度", level: "等级",
      set: "套装", weapon: "武器", clearSet: "清空套装", clearWeapon: "清空武器",
      delClass: "从列表中移除", confirmDelClass: "从列表中移除 {c}？",
      saveList: "保存到列表", saved: "{c} 已保存到列表。", removed: "{c} 已从列表中移除。",
      emptyList: "还没有保存的职业。打开菜单 ≡ 并选择“职业”。",
      tileEdit: "{c} — 点击编辑",
      emptyGroups: "点击 + 创建 6 或 8 个位置的队伍。",
      group: "队伍", send: "发送到 Discord", sendSoon: "Discord 发送功能尚未启用，即将开放。",
      delGroup: "删除队伍", confirmDelGroup: "删除 {g}？",
      colClass: "职业", colNick: "昵称", selClass: "选择职业", selNick: "选择昵称",
      clearRow: "清空此行", clearNick: "清空昵称", whoHas: "谁有 {c}",
      nobody: "数据库中没有人有此职业（或已在该队伍中）。",
      slotsQ: "多少个位置？", viewComp: "查看增益和减益", viewTable: "查看表格"
    },
    fr: {
      comm: "Communauté", groups: "Groupes", newGroup: "Nouveau groupe",
      passInfo: "Espace Communauté. Saisissez le mot de passe pour entrer.", passPh: "Mot de passe",
      cancel: "Annuler", enter: "Entrer", close: "Fermer", wrongPass: "Mot de passe incorrect.",
      syncOn: "● Synchronisé avec la communauté", syncOff: "● Uniquement dans ce navigateur",
      nickLabel: "Pseudo du joueur", nickPh: "Votre pseudo en jeu", confirm: "Confirmer",
      nickEmpty: "Saisissez un pseudo.", nickMax: "20 caractères maximum.",
      nickDup: "Ce pseudo existe déjà dans la base.", nickDupComm: "Ce pseudo existe déjà dans la base de la communauté.",
      editNick: "Modifier le pseudo", menu: "Menu", mClass: "Classe", mList: "Liste",
      pickClass: "Choisir la classe", classes: "Classes", rarity: "Rareté", level: "Niveau",
      set: "Set", weapon: "Arme", clearSet: "Vider le Set", clearWeapon: "Vider l’Arme",
      delClass: "Retirer de la liste", confirmDelClass: "Retirer {c} de la liste ?",
      saveList: "Enregistrer dans la liste", saved: "{c} enregistré dans la liste.", removed: "{c} retiré de la liste.",
      emptyList: "Aucune classe enregistrée. Ouvrez le menu ≡ et choisissez « Classe ».",
      tileEdit: "{c} — cliquer pour modifier",
      emptyGroups: "Cliquez sur + pour créer un groupe de 6 ou 8 places.",
      group: "GROUPE", send: "Envoyer sur Discord", sendSoon: "L’envoi vers Discord n’est pas encore actif — bientôt disponible.",
      delGroup: "Supprimer le groupe", confirmDelGroup: "Supprimer {g} ?",
      colClass: "Classe", colNick: "Pseudo", selClass: "Choisir la classe", selNick: "Choisir le pseudo",
      clearRow: "Vider la ligne", clearNick: "Vider le pseudo", whoHas: "Qui a {c}",
      nobody: "Personne dans la base n’a cette classe (ou il est déjà dans ce groupe).",
      slotsQ: "Combien de places ?", viewComp: "Voir buffs et debuffs", viewTable: "Voir le tableau"
    },
    de: {
      comm: "Community", groups: "Gruppen", newGroup: "Neue Gruppe",
      passInfo: "Community-Bereich. Gib das Passwort ein, um einzutreten.", passPh: "Passwort",
      cancel: "Abbrechen", enter: "Betreten", close: "Schließen", wrongPass: "Falsches Passwort.",
      syncOn: "● Mit der Community synchronisiert", syncOff: "● Nur in diesem Browser",
      nickLabel: "Spieler-Nickname", nickPh: "Dein Ingame-Nick", confirm: "Bestätigen",
      nickEmpty: "Gib einen Nickname ein.", nickMax: "Maximal 20 Zeichen.",
      nickDup: "Dieser Nick existiert bereits in der Datenbank.", nickDupComm: "Dieser Nick existiert bereits in der Community-Datenbank.",
      editNick: "Nick bearbeiten", menu: "Menü", mClass: "Klasse", mList: "Liste",
      pickClass: "Klasse wählen", classes: "Klassen", rarity: "Seltenheit", level: "Level",
      set: "Set", weapon: "Waffe", clearSet: "Set leeren", clearWeapon: "Waffe leeren",
      delClass: "Aus der Liste entfernen", confirmDelClass: "{c} aus der Liste entfernen?",
      saveList: "In der Liste speichern", saved: "{c} in der Liste gespeichert.", removed: "{c} aus der Liste entfernt.",
      emptyList: "Noch keine Klasse gespeichert. Öffne das Menü ≡ und wähle „Klasse“.",
      tileEdit: "{c} — zum Bearbeiten klicken",
      emptyGroups: "Klicke auf +, um eine Gruppe mit 6 oder 8 Plätzen zu erstellen.",
      group: "GRUPPE", send: "An Discord senden", sendSoon: "Der Versand an Discord ist noch nicht aktiv – er wird bald freigeschaltet.",
      delGroup: "Gruppe entfernen", confirmDelGroup: "{g} entfernen?",
      colClass: "Klasse", colNick: "Nickname", selClass: "Klasse wählen", selNick: "Nick wählen",
      clearRow: "Zeile leeren", clearNick: "Nick leeren", whoHas: "Wer hat {c}",
      nobody: "Niemand in der Datenbank hat diese Klasse (oder ist schon in dieser Gruppe).",
      slotsQ: "Wie viele Plätze?", viewComp: "Buffs und Debuffs anzeigen", viewTable: "Tabelle anzeigen"
    }
  };

  const lang = () => (typeof getCurrentLang === "function" ? getCurrentLang() : "pt-BR");
  function t(k, vars) {
    const d = FD[lang()] || FD.en;
    let s = d[k];
    if (s === undefined) s = FD.en[k] !== undefined ? FD.en[k] : k;
    if (vars) Object.keys(vars).forEach((v) => { s = s.split("{" + v + "}").join(vars[v]); });
    return s;
  }
  const SEND_CH = { pt: "Enviar para o canal {n}", es: "Enviar al canal {n}", en: "Send to channel {n}", ru: "Отправить в канал {n}",
    fil: "Ipadala sa channel {n}", tl: "Ipadala sa channel {n}", id: "Kirim ke kanal {n}", zh: "发送到频道 {n}", fr: "Envoyer sur le canal {n}", de: "An Kanal {n} senden" };
  const HOOK_NAMES = ["Geraint", "Velskud"];   // esquerda = webhook 1 (img/webhooks/geraint.png) · direita = webhook 2 (img/webhooks/velskud.png)
  const sendCh = (n) => (SEND_CH[lang().toLowerCase().split("-")[0]] || SEND_CH.en).replace("{n}", HOOK_NAMES[n - 1]);
  const groupName = (n) => (lang().toLowerCase().startsWith("en") ? "PARTY" : "Grupo") + " " + n;

  // Textos estáticos do index.html (data-fd / data-fd-title / data-fd-ph)
  function applyStatic() {
    document.querySelectorAll("[data-fd]").forEach((e) => { e.textContent = t(e.dataset.fd); });
    document.querySelectorAll("[data-fd-title]").forEach((e) => {
      const v = t(e.dataset.fdTitle);
      e.title = v; e.setAttribute("aria-label", v);
    });
    document.querySelectorAll("[data-fd-ph]").forEach((e) => { e.placeholder = t(e.dataset.fdPh); });
  }

  // ------------------------------------------------------------ utilidades
  const store = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (_) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} }
  };
  const key = (n) => String(n || "").trim().toLowerCase();
  const valid = (g) => !!(g && RAR[g.r] && LEVELS.includes(Number(g.l)));
  const classById = (id) => ALL_CLASSES.find((c) => c.id === id);
  const clsName = (c) => (typeof getClassName === "function" ? getClassName(c) : c.name);
  const newId = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-3);
  const cleanGear = (g) => (valid(g) ? { r: g.r, l: Number(g.l) } : null);
  function cleanDiscord(v) { const s = String(v == null ? "" : v).trim(); return /^\d{5,25}$/.test(s) ? s : ""; }   // só números (ID do Discord)

  function h(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function icon(id) {
    const i = document.createElement("img");
    i.src = `img/classes/${id}.png`;
    i.alt = "";
    i.draggable = false;
    return i;
  }
  function restart(box) { if (!box) return; box.style.animation = "none"; void box.offsetWidth; box.style.animation = ""; }

  // Ícones (traço, herdam a cor do botão)
  const ICONS = {
    edit: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
    broom: '<path d="m16 22-1-4"/><path d="M19 13.99a1 1 0 0 0 1-1V12a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v.99a1 1 0 0 0 1 1"/><path d="M5 14h14l1.973 6.767A1 1 0 0 1 20 22H4a1 1 0 0 1-.973-1.233z"/><path d="m8 22 1-4"/>',
    send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>'
  };
  function iconBtn(cls, name, title) {
    const b = h("button", cls);
    b.type = "button";
    b.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
    b.title = title; b.setAttribute("aria-label", title);
    return b;
  }

  // "S80" / "W80" com a bolinha da raridade (S = Set, W = Weapon). Ficam EMPILHADOS (um abaixo do outro).
  function chip(kind, g) {
    const c = h("span", "fd-chip");
    const d = h("i", "fd-dot");
    d.style.background = RAR[g.r].color;
    c.appendChild(d);
    c.appendChild(document.createTextNode(kind + " " + g.l));
    c.title = t(kind === "S" ? "set" : "weapon") + " " + g.l + " " + RAR[g.r].label;
    return c;
  }
  function chips(entry) {
    const w = h("span", "fd-chips");
    if (entry && valid(entry.set)) w.appendChild(chip("S", entry.set));
    if (entry && valid(entry.weapon)) w.appendChild(chip("W", entry.weapon));
    return w;
  }
  function gearScore(entry) {
    const s = (g) => (valid(g) ? (RAR_ORDER.indexOf(g.r) + 1) * 100 + Number(g.l) : 0);
    return s(entry && entry.set) + s(entry && entry.weapon);
  }

  // ------------------------------------------------------------ dados
  // Registro do jogador: { nick, classes: [ { id, classId, set, weapon } ], updated }
  // A mesma classe pode aparecer várias vezes (cada item tem seu id).
  // Aceita também o formato antigo { <classId>: { set, weapon } }.
  function normList(src) {
    let list = [];
    if (Array.isArray(src)) list = src;
    else if (src && typeof src === "object") list = Object.keys(src).map((id) => Object.assign({ id, classId: id }, src[id]));
    const seen = new Set();
    const out = [];
    list.forEach((e) => {
      if (!e || !classById(e.classId)) return;
      const set = cleanGear(e.set), weapon = cleanGear(e.weapon);
      if (!set && !weapon) return;
      let id = String(e.id || newId());
      while (seen.has(id)) id += "x";
      seen.add(id);
      out.push({ id, classId: e.classId, set, weapon });
    });
    return out;
  }
  function normPlayer(p) {
    return { nick: p.nick, discord: cleanDiscord(p.discord), classes: normList(p.classes), updated: p.updated || 0, pending: !!p.pending };
  }

  // ------------------------------------------------------------ estado
  let me = "";
  try { me = localStorage.getItem(NICK_KEY) || ""; } catch (_) {}
  let db = store.get(DB_KEY, {});           // { [nick minúsculo]: { nick, classes: [...], updated } }
  if (!db || typeof db !== "object" || Array.isArray(db)) db = {};
  Object.keys(db).forEach((k) => { if (db[k] && db[k].nick) db[k] = normPlayer(db[k]); else delete db[k]; });

  let groups = store.get(GROUPS_KEY, []);
  if (!Array.isArray(groups)) groups = [];
  groups = groups.filter((g) => g && Array.isArray(g.rows)).map((g) => ({
    id: String(g.id || Math.random().toString(36).slice(2)),
    n: Number(g.n) || 1,
    size: g.rows.length,
    hook: g.hook === 2 ? 2 : 1,   // chave de envio: 1 = esquerda (webhook 1) · 2 = direita (webhook 2)
    rows: g.rows.map((r) => ({ classId: (r && r.classId) || "", nick: (r && r.nick) || "", eid: (r && r.eid) || "" }))
  }));
  const groupOpen = new Set();  // grupos expandidos (gaveta); começam guardados
  const compOpen = new Set();   // grupos que estão na visão "buffs/debuffs" (só na memória)

  let editor = null;         // { key, stage: "classes" | "gear" }: gaveta que está escolhendo classe / editando equipamento
  let personForm = null;     // null | { mode: "first" | "add" | "edit", key? }: formulário de nick + ID do Discord
  const openDrawers = new Set();  // gavetas (pessoas) abertas; começam guardadas
  let pickClass = "";
  let editId = null;         // id do item que está sendo editado (null = novo)
  let draft = { set: null, weapon: null };
  let tab = "set";
  let sessionKey = "";       // senha aceita pelo servidor (só na memória)
  let syncState = "local";   // "online" | "local"
  let pop = null;

  const saveGroups = () => store.set(GROUPS_KEY, groups);
  const persistDB = () => store.set(DB_KEY, db);
  function recOf(k) {
    const r = db[k];
    if (r && !Array.isArray(r.classes)) r.classes = [];
    return r;
  }

  // ------------------------------------------------------------ servidor
  async function api(method, body, pass) {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 8000);
    try {
      const res = await fetch(API, {
        method,
        headers: { "content-type": "application/json", "x-freedom-key": pass },
        body: body ? JSON.stringify(body) : undefined,
        signal: ctrl.signal
      });
      let data = null;
      try { data = await res.json(); } catch (_) {}
      return { status: res.status, data };
    } catch (_) {
      return { status: 0, data: null };
    } finally {
      clearTimeout(to);
    }
  }

  function setStatus() {
    statusEl.textContent = t(syncState === "online" ? "syncOn" : "syncOff");
    statusEl.className = "fd-status " + syncState;
  }

  // Envia o cadastro de UMA pessoa ao servidor (mantém "pending" enquanto não sincronizar)
  async function pushPlayer(k, oldNick) {
    const rec = db[k];
    if (!rec) return;
    if (!sessionKey) { rec.pending = true; persistDB(); return; }
    rec.pending = true; persistDB();
    const r = await api("PUT", { player: rec, oldNick: oldNick || undefined }, sessionKey);
    if (r.status === 200) {
      syncState = "online";
      if (db[k]) { delete db[k].pending; persistDB(); }
    } else if (r.status === 409) {
      toast(t("nickDupComm"));
    } else {
      syncState = "local";
    }
    setStatus();
  }
  const pushMine = (oldNick) => (me ? pushPlayer(key(me), oldNick) : undefined);

  // Junta o que veio do servidor com o que está só aqui (alterações feitas offline e ainda não enviadas vencem)
  function mergeRemote(players) {
    const next = {};
    players.forEach((p) => { if (p && p.nick) next[key(p.nick)] = normPlayer(p); });
    const toPush = [];
    Object.keys(db).forEach((k) => {
      const local = db[k];
      if (!local) return;
      const remote = next[k];
      const mine = k === key(me);
      if ((local.pending || mine) && (!remote || (local.updated || 0) > (remote.updated || 0))) {
        next[k] = local; toPush.push(k);
      }
    });
    db = next;
    persistDB();
    toPush.forEach((k) => pushPlayer(k));
  }

  // ------------------------------------------------------------ pessoas (nick + ID do Discord)
  // mode: "first" (meu primeiro nick) | "add" (outra pessoa) | "edit" (editar nick/ID de k0)
  function savePerson(mode, k0, rawNick, rawDiscord) {
    const v = String(rawNick).trim().replace(/\s+/g, " ");
    if (!v) return t("nickEmpty");
    if (v.length > 20) return t("nickMax");
    const dRaw = String(rawDiscord || "").trim();
    if (dRaw && !cleanDiscord(dRaw)) return t("discordBad");
    const discord = cleanDiscord(dRaw);

    if (mode === "edit") {
      const rec = db[k0];
      if (!rec) { personForm = null; renderSide(); return null; }
      const old = rec.nick;
      const renamed = key(old) !== key(v);
      if (renamed && db[key(v)]) return t("nickDup");
      if (renamed) {
        delete db[k0];
        groups.forEach((g) => g.rows.forEach((r) => { if (key(r.nick) === key(old)) r.nick = v; }));
        saveGroups();
        if (openDrawers.delete(k0)) openDrawers.add(key(v));
        if (editor && editor.key === k0) editor.key = key(v);
        if (key(me) === k0) { me = v; try { localStorage.setItem(NICK_KEY, me); } catch (_) {} }
      }
      rec.nick = v; rec.discord = discord; rec.updated = Date.now();
      db[key(v)] = rec;
      personForm = null;
      pushPlayer(key(v), renamed ? old : undefined);
      renderAll();
      return null;
    }

    if (mode === "add" && db[key(v)]) return t("nickDup");
    if (db[key(v)]) {                       // já existe (ex.: veio da comunidade / outro aparelho): assume o cadastro
      db[key(v)].nick = v;
      if (discord) db[key(v)].discord = discord;
      db[key(v)].updated = Date.now();
    } else {
      db[key(v)] = { nick: v, discord, classes: [], updated: Date.now() };
    }
    if (mode === "first") {
      me = v;
      try { localStorage.setItem(NICK_KEY, me); } catch (_) {}
    } else {
      openDrawers.add(key(v));
    }
    personForm = null;
    pushPlayer(key(v));
    renderAll();
    return null;
  }

  async function removePerson(k) {
    const rec = db[k];
    if (!rec) return;
    if (!window.confirm(t("confirmDelPerson", { p: rec.nick }))) return;
    // Removendo o próprio nick: limpa "me" para não ser reenviado ao servidor e voltar a pedir o nick
    if (k === key(me)) { me = ""; try { localStorage.removeItem(NICK_KEY); } catch (_) {} }
    delete db[k];
    openDrawers.delete(k);
    if (editor && editor.key === k) editor = null;
    persistDB();
    renderSide();
    if (sessionKey) await api("DELETE", { nick: rec.nick }, sessionKey);
  }

  // ------------------------------------------------------------ lateral esquerda
  // DATABASE [+]  →  uma gaveta por pessoa (nick + ID do Discord); dentro, as classes dela e o botão + para adicionar classes.
  function renderSide() {
    const prevScroll = sideList ? sideList.scrollTop : 0;
    side.innerHTML = "";
    const head = h("div", "fd-side-head");
    head.appendChild(h("div", "fd-side-title", "DATABASE"));
    if (me) {
      const plus = h("button", "fd-plus fd-plus-sm", "+");
      plus.type = "button"; plus.title = t("addPerson"); plus.setAttribute("aria-label", t("addPerson"));
      plus.onclick = () => { personForm = { mode: "add" }; renderSide(); };
      head.appendChild(plus);
    }
    const hideBtn = h("button", "fd-plus fd-plus-sm fd-side-toggle", "<");
    hideBtn.type = "button"; hideBtn.title = uiTxt()[3]; hideBtn.setAttribute("aria-label", uiTxt()[3]);
    hideBtn.onclick = () => setSideHidden(true);
    head.appendChild(hideBtn);
    side.appendChild(head);
    // Só a lista rola; o título DATABASE fica congelado e a barra de rolagem começa abaixo dele
    sideList = h("div", "fd-side-list");
    side.appendChild(sideList);

    const form = personForm || (!me ? { mode: "first" } : null);
    if (form && form.mode !== "edit") renderPersonForm(form);

    const mk = key(me);
    Object.keys(db)
      .sort((a, b) => (a === mk ? -1 : b === mk ? 1 : String(db[a].nick).localeCompare(String(db[b].nick))))
      .forEach((k) => {
        if (form && form.mode === "edit" && form.key === k) renderPersonForm(form);
        else renderDrawer(k);
      });
    sideList.scrollTop = prevScroll;
  }

  function renderPersonForm(form) {
    const rec = form.mode === "edit" ? db[form.key] : null;
    const box = h("div", "fd-nick-form fd-person-form");
    box.appendChild(h("label", "fd-label", t("nickLabel")));
    const input = h("input", "fd-input");
    input.type = "text"; input.maxLength = 20; input.placeholder = t("nickPh");
    input.value = rec ? rec.nick : ""; input.autocomplete = "off"; input.spellcheck = false;
    box.appendChild(input);

    box.appendChild(h("label", "fd-label fd-label-gap", t("discordLabel")));
    const row = h("div", "fd-nick-row");
    const did = h("input", "fd-input");
    did.type = "text"; did.inputMode = "numeric"; did.maxLength = 25; did.placeholder = t("discordPh");
    did.value = rec ? rec.discord || "" : ""; did.autocomplete = "off"; did.spellcheck = false;
    did.oninput = () => { did.value = did.value.replace(/\D/g, ""); };
    const ok = h("button", "fd-mini fd-ok", "✓");
    ok.type = "button"; ok.title = t("confirm"); ok.setAttribute("aria-label", t("confirm"));
    row.append(did, ok);
    if (me || form.mode !== "first") {
      const cancel = h("button", "fd-mini", "✕");
      cancel.type = "button"; cancel.title = t("cancel"); cancel.setAttribute("aria-label", t("cancel"));
      cancel.onclick = () => { personForm = null; renderSide(); };
      row.appendChild(cancel);
    }
    const err = h("div", "fd-error");
    box.append(row, err);
    sideList.appendChild(box);
    const submit = () => { const msg = savePerson(form.mode, form.key, input.value, did.value); if (msg) err.textContent = msg; };
    ok.onclick = submit;
    input.onkeydown = did.onkeydown = (e) => { if (e.key === "Enter") submit(); };
    setTimeout(() => input.focus(), 0);
  }

  function renderDrawer(k) {
    const rec = db[k];
    if (!rec) return;
    const open = openDrawers.has(k);
    const dr = h("div", "fd-drawer" + (open ? " open" : ""));
    const head = h("div", "fd-drawer-head");

    // Nick = gaveta: clicou, expande; clicou de novo, guarda
    const nickBtn = h("button", "fd-drawer-nick");
    nickBtn.type = "button";
    nickBtn.setAttribute("aria-expanded", open ? "true" : "false");
    nickBtn.append(h("span", "fd-caret", open ? "▾" : "▸"), h("span", "fd-drawer-nick-text", rec.nick));
    nickBtn.onclick = () => {
      if (open) { openDrawers.delete(k); if (editor && editor.key === k) editor = null; }
      else openDrawers.add(k);
      renderSide();
    };

    // Editar nick / ID do Discord
    const edit = iconBtn("fd-mini fd-icon-btn fd-edit", "edit", t("editNick"));
    edit.onclick = () => { personForm = { mode: "edit", key: k }; renderSide(); };

    // + adiciona classes na gaveta
    const add = h("button", "fd-mini fd-icon-btn fd-add-class", "+");
    add.type = "button"; add.title = t("addClass"); add.setAttribute("aria-label", t("addClass"));
    add.onclick = () => { openDrawers.add(k); editor = { key: k, stage: "classes" }; renderSide(); };

    head.append(nickBtn, edit, add);
    const del = h("button", "btn-close-guide fd-person-x", "✕");
    del.type = "button"; del.title = t("delPerson"); del.setAttribute("aria-label", t("delPerson"));
    del.onclick = () => removePerson(k);
    head.appendChild(del);
    dr.appendChild(head);

    if (open) {
      const body = h("div", "fd-drawer-body");
      if (editor && editor.key === k) {
        if (editor.stage === "gear") buildGear(body, k);
        else buildClasses(body, k);
      } else buildList(body, k);
      dr.appendChild(body);
    }
    sideList.appendChild(dr);
  }

  function startEdit(entry, classId, k) {
    pickClass = classId;
    editId = entry ? entry.id : null;
    draft = { set: entry ? cleanGear(entry.set) : null, weapon: entry ? cleanGear(entry.weapon) : null };
    tab = "set";
    openDrawers.add(k);
    editor = { key: k, stage: "gear" };
    renderSide();
  }

  // Menu Classe → grade com todas as classes (clicar SEMPRE cria um item novo: pode repetir classe)
  function buildClasses(body, k) {
    const topRow = h("div", "fd-gear-top");
    const back = h("button", "fd-mini fd-icon-btn", "‹");
    back.type = "button"; back.title = t("cancel"); back.setAttribute("aria-label", t("cancel"));
    back.onclick = () => { editor = null; renderSide(); };
    topRow.appendChild(back);
    body.appendChild(topRow);
    body.appendChild(h("div", "fd-sub", t("pickClass")));
    const grid = h("div", "fd-class-grid");
    const mine = recOf(k).classes;
    ALL_CLASSES.forEach((c) => {
      const n = mine.filter((e) => e.classId === c.id).length;
      const b = h("button", "fd-class-btn" + (n ? " has" : ""));
      b.type = "button"; b.title = clsName(c);
      b.appendChild(icon(c.id));
      if (n > 1) b.appendChild(h("b", "fd-count", String(n)));
      b.onclick = () => startEdit(null, c.id, k);
      grid.appendChild(b);
    });
    body.appendChild(grid);
  }

  // Equipamento → abas Set / Weapon (estilo abas do navegador)
  function buildGear(body, k) {
    const c = classById(pickClass);
    if (!c) { editor.stage = "classes"; return buildClasses(body, k); }

    // Topo: "‹" para voltar à esquerda e a classe alinhada à direita.
    // Logo abaixo, à direita, o ✕ de limpar a aba atual (mesmo visual do ✕ de fechar janela).
    const top = h("div", "fd-gear-top");
    const back = h("button", "fd-mini fd-icon-btn", "‹");
    back.type = "button"; back.title = t("classes"); back.setAttribute("aria-label", t("classes"));
    back.onclick = () => { editor.stage = "classes"; renderSide(); };
    const title = h("div", "fd-gear-title");
    title.append(icon(c.id), h("span", null, clsName(c)));
    top.append(back, title);
    body.appendChild(top);

    const clearLabel = t(tab === "set" ? "clearSet" : "clearWeapon");
    const clearRow = h("div", "fd-gear-clear");
    const clear = h("button", "btn-close-guide fd-clear-x", "✕");
    clear.type = "button"; clear.title = clearLabel; clear.setAttribute("aria-label", clearLabel);
    clear.onclick = () => { draft[tab] = null; renderSide(); };
    clearRow.appendChild(clear);
    body.appendChild(clearRow);

    const tabs = h("div", "fd-tabs");
    [["set", "S"], ["weapon", "W"]].forEach(([id, kind]) => {
      const tb = h("button", "fd-tab" + (tab === id ? " active" : ""));
      tb.type = "button";
      tb.appendChild(document.createTextNode(t(id)));
      if (valid(draft[id])) tb.appendChild(chip(kind, draft[id]));
      tb.onclick = () => { tab = id; renderSide(); };
      tabs.appendChild(tb);
    });
    body.appendChild(tabs);

    const panel = h("div", "fd-tab-panel");
    const cur = () => draft[tab] || (draft[tab] = { r: null, l: null });

    // Duas colunas na mesma linha: Raridade (só as bolinhas) à esquerda, Nível à direita
    const cols = h("div", "fd-gear-cols");

    const rcol = h("div", "fd-gear-col");
    rcol.appendChild(h("div", "fd-sub", t("rarity")));
    const rrow = h("div", "fd-opt-row");
    RAR_ORDER.forEach((r) => {
      const b = h("button", "fd-opt fd-opt-dot" + (draft[tab] && draft[tab].r === r ? " on" : ""));
      b.type = "button";
      b.title = RAR[r].label; b.setAttribute("aria-label", RAR[r].label);
      const d = h("i", "fd-dot"); d.style.background = RAR[r].color;
      b.appendChild(d);
      b.onclick = () => { const g = cur(); g.r = r; if (!g.l) g.l = 80; renderSide(); };
      rrow.appendChild(b);
    });
    rcol.appendChild(rrow);

    const lcol = h("div", "fd-gear-col fd-gear-col-right");
    lcol.appendChild(h("div", "fd-sub", t("level")));
    const lrow = h("div", "fd-opt-row");
    LEVELS.forEach((l) => {
      const b = h("button", "fd-opt" + (draft[tab] && Number(draft[tab].l) === l ? " on" : ""), String(l));
      b.type = "button";
      b.onclick = () => { cur().l = l; renderSide(); };
      lrow.appendChild(b);
    });
    lcol.appendChild(lrow);

    cols.append(rcol, lcol);
    panel.appendChild(cols);
    body.appendChild(panel);

    const save = h("button", "fd-save", t("saveList"));
    save.type = "button";
    save.onclick = () => {
      const entry = { set: cleanGear(draft.set), weapon: cleanGear(draft.weapon) };
      const has = !!(entry.set || entry.weapon);
      const rec = recOf(k);
      if (editId) {
        const i = rec.classes.findIndex((e) => e.id === editId);
        if (i >= 0) { if (has) Object.assign(rec.classes[i], entry); else rec.classes.splice(i, 1); }
        else if (has) rec.classes.push(Object.assign({ id: editId, classId: pickClass }, entry));
      } else if (has) {
        rec.classes.push(Object.assign({ id: newId(), classId: pickClass }, entry));
      }
      rec.updated = Date.now();
      pushPlayer(k);
      editor = null;
      renderAll();
      if (has) toast(t("saved", { c: clsName(c) }));
      else if (editId) toast(t("removed", { c: clsName(c) }));
    };
    body.appendChild(save);
  }

  // Menu Lista → um cartão por item salvo (a mesma classe pode aparecer várias vezes):
  // ícone à esquerda e as bolinhas (S80 / W80) uma abaixo da outra, à direita. ✕ sempre visível para excluir.
  // Carimbo "Dragon Nest" nos itens do database que já estão em algum grupo.
  // Para usar a logo oficial, coloque o arquivo em img/carimbo-dn.png; se ele não existir, aparece o desenho padrão abaixo.
  const STAMP_SRC = "img/carimbo-dn.png";
  const STAMP_SVG = '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">'
    + '<circle cx="32" cy="32" r="28"/><circle cx="32" cy="32" r="24" stroke-width="1"/>'
    + '<path d="M32 12 L38 23 L50 19 L45 31 L52 43 L39 40 L32 52 L25 40 L12 43 L19 31 L14 19 L26 23 Z" fill="currentColor" fill-opacity=".28"/>'
    + '<path d="M24 31 Q32 20 40 31 Q38 40 32 45 Q26 40 24 31 Z" fill="currentColor"/>'
    + '<path d="M28 31 l2 2 M36 31 l-2 2" stroke="#000" stroke-width="1.6"/></svg>';
  function makeStamp() {
    const st = h("span", "fd-stamp");
    const im = document.createElement("img");
    im.src = STAMP_SRC; im.alt = ""; im.draggable = false;
    im.onerror = () => { st.innerHTML = STAMP_SVG; };
    st.appendChild(im);
    return st;
  }
  // personagens (nick + item do database) escolhidos em qualquer grupo
  function pickedSet() {
    const set = new Set();
    groups.forEach((gr) => gr.rows.forEach((r) => {
      if (!r.nick) return;
      const e = entryFor(r);
      if (e) set.add(key(r.nick) + "|" + e.id);
    }));
    return set;
  }
  function refreshStamps() {
    if (!sideList) return;
    const picked = pickedSet();
    sideList.querySelectorAll(".fd-tile").forEach((tl) => tl.classList.toggle("is-picked", picked.has(tl.dataset.pk + "|" + tl.dataset.eid)));
  }

  function buildList(body, k) {
    const mine = recOf(k).classes;
    const items = mine
      .filter((e) => classById(e.classId))
      .slice()
      .sort((a, b) => ALL_CLASSES.findIndex((c) => c.id === a.classId) - ALL_CLASSES.findIndex((c) => c.id === b.classId));
    if (!items.length) {
      body.appendChild(h("div", "fd-empty-small", t("emptyList2")));
      return;
    }
    const grid = h("div", "fd-list-grid");
    const picked = pickedSet();
    items.forEach((e) => {
      const c = classById(e.classId);
      const tile = h("div", "fd-tile");
      tile.dataset.pk = k; tile.dataset.eid = e.id;
      if (picked.has(k + "|" + e.id)) tile.classList.add("is-picked");
      tile.appendChild(makeStamp());
      tile.title = t("tileEdit", { c: clsName(c) });
      tile.appendChild(icon(c.id));
      tile.appendChild(chips(e));
      const rm = h("button", "fd-tile-x", "✕");
      rm.type = "button"; rm.title = t("delClass"); rm.setAttribute("aria-label", t("delClass"));
      rm.onclick = (ev) => {
        ev.stopPropagation();
        const rec = recOf(k);
        rec.classes = rec.classes.filter((x) => x.id !== e.id);
        rec.updated = Date.now();
        pushPlayer(k);
        renderAll();
      };
      tile.appendChild(rm);
      tile.onclick = () => startEdit(e, e.classId, k);
      grid.appendChild(tile);
    });
    body.appendChild(grid);
  }

  // ------------------------------------------------------------ popovers
  function closePop() { if (pop) { pop.remove(); pop = null; } }
  function openPop(anchor, build) {
    closePop();
    pop = h("div", "fd-pop");
    build(pop);
    document.body.appendChild(pop);
    const r = anchor.getBoundingClientRect();
    const pw = pop.offsetWidth, ph = pop.offsetHeight;
    const left = Math.max(8, Math.min(r.left, window.innerWidth - pw - 8));
    let top = r.bottom + 4;
    if (top + ph > window.innerHeight - 8) top = Math.max(8, r.top - ph - 4);
    pop.style.left = left + "px";
    pop.style.top = top + "px";
  }
  document.addEventListener("mousedown", (e) => { if (pop && !pop.contains(e.target)) closePop(); });
  groupsBox.addEventListener("scroll", closePop);

  // ------------------------------------------------------------ horário + envio ao Discord
  // Fuso fixo America/Bahia (sem horário de verão). A data/hora escolhida vale NESSE fuso e vira
  // um timestamp Unix, que o Discord mostra no horário de cada pessoa (<t:…:d>, <t:…:t>, <t:…:R>).
  const TZ = "America/Bahia";
  function zoneParts(ms) {
    const p = {};
    new Intl.DateTimeFormat("en-US", { timeZone: TZ, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" })
      .formatToParts(new Date(ms)).forEach((x) => { p[x.type] = Number(x.value); });
    return { y: p.year, mo: p.month - 1, d: p.day, h: p.hour % 24, mi: p.minute, s: p.second };
  }
  function zoneOffset(ms) {
    const z = zoneParts(ms);
    return Date.UTC(z.y, z.mo, z.d, z.h, z.mi, z.s) - Math.floor(ms / 1000) * 1000;
  }
  function zonedToUnix(y, mo, d, h, mi, s) {
    const guess = Date.UTC(y, mo, d, h, mi, s);
    let ts = guess - zoneOffset(guess);
    ts = guess - zoneOffset(ts);
    return Math.floor(ts / 1000);
  }
  function zoneLabel() {
    const off = zoneOffset(Date.now()) / 60000;
    const sg = off < 0 ? "-" : "+", a = Math.abs(off);
    return TZ + " (GMT" + sg + Math.floor(a / 60) + (a % 60 ? ":" + String(a % 60).padStart(2, "0") : "") + ")";
  }
  const loc = () => { try { new Intl.DateTimeFormat(lang()); return lang(); } catch (_) { return "en"; } };
  const pad2 = (n) => String(n).padStart(2, "0");

  let timeBox = null;
  function closeTimePicker() { if (timeBox) { timeBox.remove(); timeBox = null; } }

  // onPick(timestampEmSegundos)
  function openTimePicker(onPick) {
    closeTimePicker(); closePop();
    const now = zoneParts(Date.now());
    const st = { y: now.y, mo: now.mo, d: now.d, h: now.h, mi: now.mi, s: 0, vy: now.y, vm: now.mo, field: "h" };

    const ov = h("div", "fd-time-overlay");
    const box = h("div", "fd-time-box");
    ov.appendChild(box);
    ov.addEventListener("mousedown", (e) => { if (e.target === ov) closeTimePicker(); });

    box.appendChild(h("div", "fd-time-title", t("timeTitle")));
    box.appendChild(h("div", "fd-time-zone", t("timeZone") + ": " + zoneLabel()));

    const grid = h("div", "fd-time-grid");
    const calCol = h("div", "fd-cal");
    const clkCol = h("div", "fd-clock-col");
    grid.append(calCol, clkCol);
    box.appendChild(grid);

    // ---------- calendário
    function drawCal() {
      calCol.innerHTML = "";
      const nav = h("div", "fd-cal-nav");
      const prev = h("button", "fd-cal-arrow", "‹"); prev.type = "button";
      const next = h("button", "fd-cal-arrow", "›"); next.type = "button";
      const label = h("div", "fd-cal-month");
      label.textContent = new Intl.DateTimeFormat(loc(), { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(st.vy, st.vm, 1)));
      const shift = (n) => { const d = new Date(Date.UTC(st.vy, st.vm + n, 1)); st.vy = d.getUTCFullYear(); st.vm = d.getUTCMonth(); drawCal(); };
      prev.onclick = () => shift(-1); next.onclick = () => shift(1);
      nav.append(prev, label, next);
      calCol.appendChild(nav);

      const g = h("div", "fd-cal-grid");
      for (let i = 0; i < 7; i++) {
        g.appendChild(h("div", "fd-cal-wd", new Intl.DateTimeFormat(loc(), { weekday: "short", timeZone: "UTC" }).format(new Date(Date.UTC(2024, 0, 7 + i)))));
      }
      const first = new Date(Date.UTC(st.vy, st.vm, 1)).getUTCDay();
      for (let i = 0; i < 42; i++) {
        const dt = new Date(Date.UTC(st.vy, st.vm, 1 - first + i));
        const y = dt.getUTCFullYear(), mo = dt.getUTCMonth(), d = dt.getUTCDate();
        const b = h("button", "fd-cal-day" + (mo !== st.vm ? " other" : "") + (y === st.y && mo === st.mo && d === st.d ? " sel" : ""), String(d));
        b.type = "button";
        b.onclick = () => { st.y = y; st.mo = mo; st.d = d; st.vy = y; st.vm = mo; drawCal(); };
        g.appendChild(b);
      }
      calCol.appendChild(g);
    }

    // ---------- hora (hh : mm : ss) + relógio
    const inputs = {};
    const MAXV = { h: 23, mi: 59, s: 59 };
    const timeRow = h("div", "fd-time-row");
    [["h", "hh"], ["mi", "mm"], ["s", "ss"]].forEach(([k], i) => {
      if (i) timeRow.appendChild(h("span", "fd-time-sep", ":"));
      const inp = h("input", "fd-time-in");
      inp.type = "text"; inp.inputMode = "numeric"; inp.maxLength = 2; inp.autocomplete = "off";
      inp.onfocus = () => { st.field = k; drawClock(); inp.select(); };
      inp.oninput = () => {
        const v = inp.value.replace(/\D/g, "").slice(0, 2);
        inp.value = v;
        if (v !== "") { st[k] = Math.min(MAXV[k], Number(v)); drawClock(false); }
      };
      inp.onblur = () => { inp.value = pad2(st[k]); };
      inputs[k] = inp;
      timeRow.appendChild(inp);
    });
    const dial = h("div", "fd-dial");
    clkCol.append(timeRow, dial);

    const NS = "http://www.w3.org/2000/svg";
    const svgEl = (tag, attrs) => { const e = document.createElementNS(NS, tag); Object.keys(attrs || {}).forEach((a) => e.setAttribute(a, attrs[a])); return e; };
    const R_OUT = 80, R_IN = 52;
    const pos = (idx, r) => { const a = (idx % 12) * Math.PI / 6; return [Math.sin(a) * r, -Math.cos(a) * r]; };

    function drawClock(syncInputs = true) {
      if (syncInputs) Object.keys(inputs).forEach((k) => { if (document.activeElement !== inputs[k]) inputs[k].value = pad2(st[k]); });
      Object.keys(inputs).forEach((k) => inputs[k].classList.toggle("active", st.field === k));
      dial.innerHTML = "";
      const svg = svgEl("svg", { viewBox: "-100 -100 200 200", class: "fd-dial-svg" });
      const f = st.field;
      const val = st[f];
      let sx, sy;
      if (f === "h") { [sx, sy] = pos(val % 12, val < 12 ? R_OUT : R_IN); }
      else { const a = val * Math.PI / 30; sx = Math.sin(a) * R_OUT; sy = -Math.cos(a) * R_OUT; }
      svg.appendChild(svgEl("line", { x1: 0, y1: 0, x2: sx, y2: sy, class: "fd-dial-hand" }));
      svg.appendChild(svgEl("circle", { cx: sx, cy: sy, r: 12, class: "fd-dial-sel" }));
      const put = (txt, x, y, on) => { const tx = svgEl("text", { x, y, class: "fd-dial-num" + (on ? " on" : "") }); tx.textContent = txt; svg.appendChild(tx); };
      if (f === "h") {
        for (let i = 0; i < 12; i++) { const [x, y] = pos(i, R_OUT); put(i, x, y, val === i); }
        for (let i = 0; i < 12; i++) { const [x, y] = pos(i, R_IN); put(i + 12, x, y, val === i + 12); }
      } else {
        for (let i = 0; i < 12; i++) { const [x, y] = pos(i, R_OUT); put(i * 5, x, y, val === i * 5); }
      }
      dial.appendChild(svg);

      const pick = (ev) => {
        const r = svg.getBoundingClientRect();
        const px = ((ev.clientX - r.left) / r.width) * 200 - 100;
        const py = ((ev.clientY - r.top) / r.height) * 200 - 100;
        let ang = Math.atan2(px, -py); if (ang < 0) ang += Math.PI * 2;
        if (st.field === "h") {
          const n = Math.round(ang / (Math.PI / 6)) % 12;
          st.h = Math.hypot(px, py) < (R_OUT + R_IN) / 2 ? n + 12 : n;
        } else {
          st[st.field] = Math.round(ang / (Math.PI / 30)) % 60;
        }
        drawClock();
      };
      let drag = false;
      svg.addEventListener("pointerdown", (ev) => { drag = true; try { svg.setPointerCapture(ev.pointerId); } catch (_) {} pick(ev); });
      svg.addEventListener("pointermove", (ev) => { if (drag) pick(ev); });
      svg.addEventListener("pointerup", () => {
        if (!drag) return; drag = false;
        const nx = { h: "mi", mi: "s" }[st.field];   // hora → minuto → segundo
        if (nx) { st.field = nx; drawClock(); }
      });
    }

    const actions = h("div", "fd-time-actions");
    const ok = h("button", "fd-time-ok", t("timeConfirm")); ok.type = "button";
    const no = h("button", "fd-time-no", t("close")); no.type = "button";
    ok.onclick = () => {
      const ts = zonedToUnix(st.y, st.mo, st.d, st.h, st.mi, st.s);
      closeTimePicker();
      onPick(ts);
    };
    no.onclick = closeTimePicker;
    actions.append(ok, no);
    box.appendChild(actions);

    drawCal(); drawClock();
    document.body.appendChild(ov);
    timeBox = ov;
  }

  // Enviar: pergunta o horário → confirma → posta no Discord (via servidor, que guarda o webhook)
  function startSend(g) {
    const members = g.rows.filter((r) => r.classId && classById(r.classId))
      .map((r) => {
        const e = entryFor(r);
        const legend = !!(e && ((e.set && e.set.r === "legend") || (e.weapon && e.weapon.r === "legend")));
        return { classId: r.classId, cls: classById(r.classId).name, nick: r.nick || "", discord: (db[key(r.nick)] && db[key(r.nick)].discord) || "", legend };
      });
    // Sempre abre o seletor de data/hora; as checagens vêm depois de confirmar.
    openTimePicker(async (ts) => {
      if (!members.length) return toast(t("sendEmpty"));
      if (!sessionKey) return toast(t("sendNeedOnline"));
      const hook = g.hook === 2 ? 2 : 1;
      const r = await api("POST", { action: "discord", ts, group: groupName(g.n), members, hook }, sessionKey);
      if (r.status === 200) toast(t("sentOk", { g: groupName(g.n) }) + " (" + HOOK_NAMES[hook - 1] + ")");
      else if (r.status === 503) toast(t("sendNoHook") + " (" + HOOK_NAMES[hook - 1] + ")");
      else toast(t("sendFail"));
    });
  }

  // ------------------------------------------------------------ grupos
  // Item do database que a linha usa (pelo eid; linhas antigas, sem eid, pegam o primeiro da classe)
  function entryFor(row) {
    const p = row.nick && db[key(row.nick)];
    if (!p || !Array.isArray(p.classes)) return null;
    return (row.eid && p.classes.find((e) => e.id === row.eid)) || p.classes.find((e) => e.classId === row.classId) || null;
  }

  // Redesenhar a lista zera a rolagem; guarda a posição e devolve depois, para a janela não pular pro topo
  function renderGroups() {
    const top = groupsBox.scrollTop, left = groupsBox.scrollLeft;
    ensureLayout();
    renderGroupsInner();
    renderRoster();
    refreshStamps();
    if (groupsBox.scrollTop !== top) groupsBox.scrollTop = top;
    if (groupsBox.scrollLeft !== left) groupsBox.scrollLeft = left;
  }
  function renderGroupsInner() {
    groupsBox.innerHTML = "";
    if (!groups.length) {
      groupsBox.appendChild(h("div", "fd-empty", t("emptyGroups")));
      return;
    }
    // Colunas independentes: expandir um grupo só empurra os que estão abaixo dele NA MESMA coluna.
    const w = groupsBox.clientWidth - 24;
    const cols = Math.min(2, Math.max(1, w > 0 ? Math.floor((w + 14) / (GROUP_W + 14)) : 2));
    layoutCols = cols;
    const colEls = Array.from({ length: Math.min(cols, groups.length) }, () => {
      const c = h("div", "fd-col");
      groupsBox.appendChild(c);
      return c;
    });
    groups.forEach((g, i) => colEls[i % colEls.length].appendChild(buildGroup(g)));
  }
  let layoutCols = 0;

  // Estrutura extra criada por JS: [grupos | Selecionáveis] lado a lado + setinha ">" para reabrir o database
  let showBtn = null;
  function ensureLayout() {
    if (rosterBox) return;
    const body = h("div", "fd-main-body");
    groupsBox.parentNode.insertBefore(body, groupsBox);
    body.appendChild(groupsBox);
    rosterBox = h("aside", "fd-roster");
    body.appendChild(rosterBox);
    const mainHead = groupsBox.closest(".fd-main").querySelector(".fd-main-head");
    showBtn = h("button", "fd-plus fd-plus-sm fd-side-show", ">");
    showBtn.type = "button";
    showBtn.onclick = () => setSideHidden(false);
    mainHead.insertBefore(showBtn, mainHead.firstChild);
    applySideHidden();
  }
  function applySideHidden() {
    modal.classList.toggle("fd-side-hidden", sideHidden);
    if (showBtn) { showBtn.title = uiTxt()[4]; showBtn.setAttribute("aria-label", uiTxt()[4]); }
  }
  function setSideHidden(v) {
    sideHidden = !!v;
    try { localStorage.setItem("dnoFdSideHidden", sideHidden ? "1" : "0"); } catch (_) {}
    applySideHidden();
    renderGroups();
  }

  // Lista "Selecionáveis": todos os nicks do database + quantas vezes cada um foi escolhido nos grupos
  function renderRoster() {
    if (!rosterBox) return;
    const T = uiTxt();
    const counts = {};
    groups.forEach((gr) => gr.rows.forEach((r) => { if (r.nick) counts[key(r.nick)] = (counts[key(r.nick)] || 0) + 1; }));
    const list = Object.values(db)
      .filter((pl) => pl && pl.nick)
      .map((pl) => ({ nick: pl.nick, n: counts[key(pl.nick)] || 0 }))
      .sort((a, b) => b.n - a.n || a.nick.localeCompare(b.nick));
    rosterBox.innerHTML = "";
    rosterBox.appendChild(h("div", "fd-roster-title", T[0]));
    const head = h("div", "fd-roster-row fd-roster-headrow");
    head.append(h("span", "fd-roster-nick", T[1]), h("span", "fd-roster-n", T[2]));
    rosterBox.appendChild(head);
    const box = h("div", "fd-roster-list");
    list.forEach((it) => {
      const row = h("div", "fd-roster-row" + (it.n ? "" : " zero"));
      row.append(h("span", "fd-roster-nick", it.nick), h("span", "fd-roster-n", String(it.n)));
      box.appendChild(row);
    });
    rosterBox.appendChild(box);
  }
  window.addEventListener("resize", () => {
    if (overlay.classList.contains("hidden") || !groups.length) return;
    const w = groupsBox.clientWidth - 24;
    const cols = Math.min(2, Math.max(1, Math.floor((w + 14) / (GROUP_W + 14))));
    if (cols !== layoutCols) renderGroups();
  });

  function buildGroup(g) {
    const card = h("div", "fd-group" + (compOpen.has(g.id) ? " comp" : "") + (groupOpen.has(g.id) ? " open" : ""));
    card.dataset.gid = g.id;
    const head = h("div", "fd-group-head");
    // Nome do grupo = gaveta: clicou, expande; clicou de novo, guarda
    const title = h("button", "fd-group-title");
    title.type = "button";
    title.setAttribute("aria-expanded", groupOpen.has(g.id) ? "true" : "false");
    const caret = h("span", "fd-caret", groupOpen.has(g.id) ? "▾" : "▸");
    title.append(caret, h("span", null, groupName(g.n)));
    const setOpen = (on) => {
      card.classList.toggle("open", on);
      if (on) groupOpen.add(g.id); else groupOpen.delete(g.id);
      caret.textContent = on ? "▾" : "▸";
      title.setAttribute("aria-expanded", on ? "true" : "false");
      if (!on) closePop();
    };
    title.onclick = () => setOpen(!card.classList.contains("open"));
    head.appendChild(title);

    // Aviãozinho de papel (enviar) — só o ícone
    // Chave de 2 posições: esquerda = webhook 1 · direita = webhook 2 (só seleciona o canal).
    // O botão de enviar (aviãozinho) fica FORA da chave e posta no webhook da posição atual.
    const sw = h("div", "fd-switch");
    sw.setAttribute("role", "switch"); sw.tabIndex = 0;
    const hookImg = (side, n) => {
      const w = h("span", "fd-sw-lab " + side);
      const im = document.createElement("img");
      im.src = "img/webhooks/" + HOOK_NAMES[n - 1].toLowerCase() + ".png"; im.alt = HOOK_NAMES[n - 1]; im.draggable = false;
      im.onerror = () => { w.textContent = String(n); };   // sem a imagem: mostra o número
      w.appendChild(im);
      return w;
    };
    sw.append(h("span", "fd-sw-knob"), hookImg("l", 1), hookImg("r", 2));
    const send = iconBtn("fd-send", "send", "");
    const paintSwitch = () => {
      const n = g.hook === 2 ? 2 : 1;
      sw.dataset.pos = String(n);
      sw.setAttribute("aria-checked", n === 2 ? "true" : "false");
      sw.title = sendCh(n); send.title = sendCh(n); send.setAttribute("aria-label", sendCh(n));
    };
    const setHook = (n) => { g.hook = n; saveGroups(); paintSwitch(); };
    sw.onclick = () => setHook(g.hook === 2 ? 1 : 2);
    sw.onkeydown = (ev) => {
      if (ev.key === "ArrowLeft") { ev.preventDefault(); setHook(1); }
      else if (ev.key === "ArrowRight") { ev.preventDefault(); setHook(2); }
      else if (ev.key === " " || ev.key === "Enter") { ev.preventDefault(); setHook(g.hook === 2 ? 1 : 2); }
    };
    send.onclick = () => startSend(g);
    paintSwitch();

    // Olhinho: vira a tabela (Classe/Nickname ⇄ buffs e debuffs da composição)
    const eye = iconBtn("fd-send fd-eye" + (compOpen.has(g.id) ? " on" : ""), "eye", t(compOpen.has(g.id) ? "viewTable" : "viewComp"));
    eye.onclick = () => {
      setOpen(true);
      const on = card.classList.toggle("comp");
      if (on) compOpen.add(g.id); else compOpen.delete(g.id);
      eye.classList.toggle("on", on);
      const label = t(on ? "viewTable" : "viewComp");
      eye.title = label; eye.setAttribute("aria-label", label);
      if (!on) card.querySelectorAll(".comp-slide-panel").forEach((p) => p.classList.remove("comp-slide-open"));
    };

    const del = h("button", "fd-x", "✕");
    del.type = "button"; del.title = t("delGroup"); del.setAttribute("aria-label", t("delGroup"));
    del.onclick = () => {
      groups = groups.filter((x) => x.id !== g.id);
      compOpen.delete(g.id); groupOpen.delete(g.id);
      saveGroups(); renderGroups();
    };
    head.append(sw, send, eye, del);
    card.appendChild(head);

    const flip = h("div", "fd-flip");
    const inner = h("div", "fd-flip-inner");
    const front = h("div", "fd-face fd-face-front");
    const back = h("div", "fd-face fd-face-back");
    front.appendChild(buildTable(g));
    back.appendChild(buildComp(g));
    inner.append(front, back);
    flip.appendChild(inner);
    card.appendChild(flip);
    return card;
  }

  // Tabela Classe | Nickname (layout/fonte padrão)
  function buildTable(g) {
    const table = h("table", "fd-table");
    const thead = h("thead");
    const hr = h("tr");
    hr.append(h("th", null, t("colClass")), h("th", null, t("colNick")));
    thead.appendChild(hr);
    table.appendChild(thead);

    const tbody = h("tbody");
    g.rows.forEach((row, i) => {
      const tr = h("tr");

      const tdC = h("td");
      const cb = h("button", "fd-slot" + (row.classId ? " filled" : ""));
      cb.type = "button";
      const cls = row.classId && classById(row.classId);
      if (cls) {
        cb.title = clsName(cls);
        cb.appendChild(icon(cls.id));
        const txt = h("span", "fd-slot-text");
        txt.appendChild(h("span", "fd-slot-name", clsName(cls)));
        cb.appendChild(txt);
        const entry = entryFor(row);
        if (entry) cb.appendChild(chips(entry));   // bolinhas à direita, uma abaixo da outra
      } else {
        cb.textContent = t("selClass");
      }
      cb.onclick = () => openClassPop(cb, g, i);
      tdC.appendChild(cb);

      const tdN = h("td");
      const nb = h("button", "fd-slot fd-slot-nick" + (row.nick ? " filled" : ""));
      nb.type = "button";
      nb.textContent = row.nick || t("selNick");
      nb.disabled = !cls;
      nb.onclick = () => openNickPop(nb, g, i);
      tdN.appendChild(nb);

      tr.append(tdC, tdN);
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
  }

  // Verso da tabela: debuffs/buffs da composição do grupo, com a seta › que abre o painel
  // com as skills de cada classe (mesma mecânica do Criador de Composições, em tamanho compacto).
  function buildComp(g) {
    const wrap = h("div", "fd-comp-wrap");
    const C = window.DNOComp;
    if (!C) return wrap;
    const tr = (k, fb) => (typeof window.i18n === "function" ? window.i18n(k, fb) : fb);
    const ids = g.rows.map((r) => r.classId).filter(Boolean);
    const tot = C.computeTotals(ids);
    const nonZero = (fields, totals) => fields.filter((f) => (Math.round((totals[f[0]] || 0) * 100) / 100) !== 0);

    function classRows(container, list, kind) {
      list.forEach((item) => {
        const normal = kind === "buff" ? item.buffs : item.debuffs;
        const flex = kind === "buff" ? item.variableBuffs : item.variableDebuffs;
        const row = h("div", "comp-class-buff-row");
        const img = document.createElement("img");
        img.src = `img/classes/${item.classId}.png`; img.alt = item.name; img.title = item.name;
        row.appendChild(img);
        const textWrap = h("span", "comp-class-buff-text");
        const hasN = (normal || []).some(Boolean), hasF = (flex || []).some(Boolean);
        if (hasN || !hasF) textWrap.appendChild(h("span", "comp-class-buff-arrow", "›"));
        const sw = C.buildSkillIconsWrap(normal);
        if (kind === "buff" && item.cd) sw.appendChild(h("span", "comp-skill-cd", `CD: -${item.cd}%`));
        if (sw.children.length) textWrap.appendChild(sw);
        C.appendFlexGroup(textWrap, flex, kind === "buff" ? "compVariableBuffsLabel" : "compVariableDebuffsLabel", "Flex");
        row.appendChild(textWrap);
        container.appendChild(row);
      });
    }

    function section(titleKey, titleFb, slideKey, slideFb, fields, totals, opts, list, kind) {
      const panel = h("div", "comp-result-panel");
      const hd = h("h4", "comp-panel-toggle");
      hd.tabIndex = 0; hd.setAttribute("role", "button");
      hd.append(h("span", null, tr(titleKey, titleFb)), h("span", "comp-panel-arrow", "›"));
      const grid = h("div", "comp-stat-grid");
      C.renderStatGrid(grid, nonZero(fields, totals), totals, opts);
      grid.querySelectorAll(".comp-stat-cell").forEach((cell) => {
        const l = cell.querySelector(".comp-stat-label"), v = cell.querySelector(".comp-stat-value");
        if (l && v) cell.title = l.textContent + " " + v.textContent;
      });
      panel.append(hd, grid);

      const slide = h("div", "comp-slide-panel");
      const bk = h("h4", "comp-panel-toggle");
      bk.tabIndex = 0; bk.setAttribute("role", "button");
      bk.append(h("span", "comp-panel-arrow comp-panel-arrow-left", "‹"), document.createTextNode(" "), h("span", null, tr(slideKey, slideFb)));
      const rows = h("div", "comp-class-buffs");
      classRows(rows, list, kind);
      slide.append(bk, rows);

      const open = () => slide.classList.add("comp-slide-open");
      const close = () => slide.classList.remove("comp-slide-open");
      hd.addEventListener("click", open);
      hd.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
      bk.addEventListener("click", close);
      bk.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); close(); } });
      return [panel, slide];
    }

    const d = section("compDebuffPanelTitle", "Debuffs aplicados ao inimigo", "compDebuffSlideTitle", "Debuffs exclusivos por classe",
      C.DEBUFF_FIELDS, tot.debuffTotals, { isDebuff: true }, tot.debuffList, "debuff");
    const b = section("compBuffPanelTitle", "Buffs da composição", "compBuffSlideTitle", "Buffs da composição por Classe",
      C.BUFF_FIELDS, tot.buffTotals, undefined, tot.buffList, "buff");
    wrap.append(d[0], b[0], d[1], b[1]);
    return wrap;
  }

  function openClassPop(anchor, g, i) {
    openPop(anchor, (p) => {
      p.classList.add("fd-pop-classes");
      // X padrão no canto superior direito: limpa a linha (classe + nick)
      if (g.rows[i].classId) {
        const head = h("div", "fd-pop-head fd-pop-head-end");
        const x = h("button", "btn-close-guide fd-pop-x", "✕");
        x.type = "button"; x.title = t("clearRow"); x.setAttribute("aria-label", t("clearRow"));
        x.onclick = () => { g.rows[i] = { classId: "", nick: "", eid: "" }; saveGroups(); closePop(); renderGroups(); };
        head.appendChild(x);
        p.appendChild(head);
      }
      const grid = h("div", "fd-class-grid");
      ALL_CLASSES.forEach((c) => {
        const b = h("button", "fd-class-btn" + (g.rows[i].classId === c.id ? " has" : ""));
        b.type = "button"; b.title = clsName(c);
        b.appendChild(icon(c.id));
        b.onclick = () => {
          if (g.rows[i].classId !== c.id) { g.rows[i].classId = c.id; g.rows[i].nick = ""; g.rows[i].eid = ""; }
          saveGroups(); closePop(); renderGroups();
        };
        grid.appendChild(b);
      });
      p.appendChild(grid);
    });
  }

  function openNickPop(anchor, g, i) {
    const row = g.rows[i];
    // Personagens (nick + item do database) já usados em QUALQUER linha de QUALQUER grupo não aparecem de novo.
    // Quem tem a mesma classe cadastrada 2x no database tem 2 itens diferentes, então ainda pode entrar 2 vezes.
    const used = new Set();
    groups.forEach((gr) => {
      gr.rows.forEach((r, j) => {
        if ((gr === g && j === i) || !r.nick) return;
        const e = entryFor(r);
        used.add(key(r.nick) + "|" + (e ? e.id : r.classId));
      });
    });
    const options = [];
    Object.values(db).forEach((pl) => {
      if (!pl || !Array.isArray(pl.classes)) return;
      pl.classes.forEach((e) => {
        if (e.classId !== row.classId) return;
        if (used.has(key(pl.nick) + "|" + e.id)) return;
        options.push({ pl, e });
      });
    });
    options.sort((a, b) => gearScore(b.e) - gearScore(a.e) || a.pl.nick.localeCompare(b.pl.nick));

    openPop(anchor, (p) => {
      p.classList.add("fd-pop-nicks");
      const c = classById(row.classId);
      // Cabeçalho: título + X padrão no canto superior direito (remove o nick da linha)
      const head = h("div", "fd-pop-head");
      head.appendChild(h("div", "fd-sub", t("whoHas", { c: c ? clsName(c) : "" })));
      if (row.nick) {
        const x = h("button", "btn-close-guide fd-pop-x", "✕");
        x.type = "button"; x.title = t("clearNick"); x.setAttribute("aria-label", t("clearNick"));
        x.onclick = () => { row.nick = ""; row.eid = ""; saveGroups(); closePop(); renderGroups(); };
        head.appendChild(x);
      }
      p.appendChild(head);
      if (!options.length) p.appendChild(h("div", "fd-empty-small", t("nobody")));
      options.forEach(({ pl, e }) => {
        const it = h("button", "fd-nick-item");
        it.type = "button";
        it.appendChild(icon(row.classId));
        it.appendChild(chips(e));
        it.appendChild(h("span", "fd-nick-name", pl.nick));
        it.onclick = () => { row.nick = pl.nick; row.eid = e.id; saveGroups(); closePop(); renderGroups(); };
        p.appendChild(it);
      });
    });
  }

  addGroupBtn.addEventListener("click", () => {
    openPop(addGroupBtn, (p) => {
      p.classList.add("fd-pop-size");
      p.appendChild(h("div", "fd-sub", t("slotsQ")));
      const row = h("div", "fd-opt-row");
      [6, 8].forEach((n) => {
        const b = h("button", "fd-opt", String(n));
        b.type = "button";
        b.onclick = () => {
          const next = groups.reduce((m, g) => Math.max(m, g.n), 0) + 1;
          groups.push({
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
            n: next, size: n,
            rows: Array.from({ length: n }, () => ({ classId: "", nick: "", eid: "" }))
          });
          groupOpen.add(groups[groups.length - 1].id);
          saveGroups(); closePop(); renderGroups();
          const last = groupsBox.querySelector('[data-gid="' + groups[groups.length - 1].id + '"]');
          if (last && last.scrollIntoView) last.scrollIntoView({ block: "nearest", behavior: "smooth" });
        };
        row.appendChild(b);
      });
      p.appendChild(row);
    });
  });

  // ------------------------------------------------------------ toast
  let toastTimer = null;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2800);
  }

  // ------------------------------------------------------------ abrir / fechar
  function renderAll() { applyStatic(); setStatus(); renderSide(); renderGroups(); }

  function openFreedom() {
    restart(modal);
    overlay.classList.remove("hidden");
    editor = null;
    personForm = null;
    openDrawers.clear();
    renderAll();
  }
  function closeFreedom() {
    closePop();
    overlay.classList.add("hidden");
    sessionKey = ""; // a próxima abertura pede a senha de novo
  }

  // ------------------------------------------------------------ senha
  function openPass() {
    const sm = $("sideMenuOverlay");
    if (sm) sm.classList.add("hidden");
    applyStatic();
    passInput.value = "";
    passErr.textContent = "";
    restart(passBox);
    passOverlay.classList.remove("hidden");
    setTimeout(() => passInput.focus(), 0);
  }
  function closePass() { passOverlay.classList.add("hidden"); }

  function wrongPass() {
    passErr.textContent = t("wrongPass");
    passInput.value = "";
    passBox.classList.remove("shake"); void passBox.offsetWidth; passBox.classList.add("shake");
    passInput.focus();
  }

  let busy = false;
  async function submitPass() {
    const v = passInput.value.trim();
    if (!v || busy) return;
    busy = true; passOk.disabled = true; passErr.textContent = "";
    try {
      const r = await api("GET", null, v);
      if (r.status === 200 && r.data && Array.isArray(r.data.players)) {
        sessionKey = v; syncState = "online";
        mergeRemote(r.data.players);
      } else if (r.status === 401) {
        return wrongPass();
      } else if (v === LOCAL_PASS) {   // servidor indisponível (ex.: abrindo local) → modo local
        sessionKey = ""; syncState = "local";
      } else {
        return wrongPass();
      }
      closePass();
      openFreedom();
    } finally {
      busy = false; passOk.disabled = false;
    }
  }

  openBtn.addEventListener("click", (e) => { e.stopPropagation(); openPass(); });
  passOk.addEventListener("click", submitPass);
  passInput.addEventListener("keydown", (e) => { if (e.key === "Enter") submitPass(); });
  $("freedomPassCancel").addEventListener("click", closePass);
  passOverlay.addEventListener("click", (e) => { if (e.target === passOverlay) closePass(); });
  $("closeFreedomBtn").addEventListener("click", closeFreedom);
  // A janela FREEDOM só fecha pelo X (ou Esc): clicar fora dela não fecha mais.
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (timeBox) { closeTimePicker(); e.stopPropagation(); return; }
    if (pop) return closePop();
    if (!passOverlay.classList.contains("hidden")) return closePass();
    if (!overlay.classList.contains("hidden")) closeFreedom();
  });

  // Troca de idioma: reaplica os textos estáticos e redesenha o que estiver aberto
  window.refreshFreedom = () => {
    applyStatic();
    closePop();
    if (!overlay.classList.contains("hidden")) { setStatus(); renderAll(); }
    else if (!passOverlay.classList.contains("hidden")) { passErr.textContent = ""; }
  };

  applyStatic();
});

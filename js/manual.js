/* =========================================================
   Manual do Usuário — abas estilo navegador
   Conteúdo por idioma em MANUAL[<lang>]. Idiomas sem texto próprio usam pt-BR.
   Para traduzir: copie o bloco "en" e traduza os textos (títulos, parágrafos e tabs).
   ========================================================= */
(function () {
  "use strict";

  // ---- ícones usados no texto (mesma aparência dos botões reais da tela) ----
  const I = {
    add:    '<span class="manual-icon manual-icon-add">+</span>',
    rm:     '<span class="manual-icon manual-icon-remove-row">×</span>',
    mini:   '<span class="manual-icon manual-icon-mini-add">+</span>',
    status: '<span class="manual-icon manual-icon-status">✗ ✓</span>',
    chiprm: '<span class="manual-icon manual-icon-chip-remove">✕</span>',
    gear:   '<span class="manual-icon manual-icon-gear"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 L4 5 V11 C4 16 7.5 20.5 12 22 C16.5 20.5 20 16 20 11 V5 Z"/></svg></span>',
    swap:   '<span class="manual-icon manual-icon-swap">⇄</span>'
  };

  // ---- ícones das abas (SVG de traço, 24x24) ----
  const TAB_ICONS = {
    home:   "M3 11l9-8 9 8M5 10v10h14V10",
    users:  "M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM4 21c0-4 4-6 8-6s8 2 8 6",
    list:   "M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2",
    event:  "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
    filter: "M3 4h18l-7 8.5V19l-4 2v-8.5z",
    save:   "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8",
    comp:   "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 18l9 5 9-5",
    party:  "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
    book:   "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"
  };

  const tip  = (h) => `<div class="manual-tip">${h}</div>`;
  const steps = (arr) => `<ol class="manual-steps">${arr.map((x) => `<li>${x}</li>`).join("")}</ol>`;
  const list  = (arr) => `<ul class="manual-list">${arr.map((x) => `<li>${x}</li>`).join("")}</ul>`;
  const S = (title, html, icon) => ({ title, html, icon: icon || "" });

  const MANUAL = {};

  /* =======================================================
     PORTUGUÊS (BRASIL) — padrão
     ======================================================= */
  MANUAL["pt-BR"] = {
    tabs: [
      {
        id: "start", icon: "home", label: "Início",
        lead: "Bem-vindo à <strong>Central de Controle de Conteúdo</strong> do Dragon Nest Origins. Ela serve para acompanhar, personagem por personagem, o que você já concluiu nos conteúdos diários e semanais — e ainda traz guias, um criador de composições e um criador de grupos.",
        sections: [
          S("Primeiros passos", steps([
            `Clique em ${I.add} na barra de controles, escolha a <strong>classe</strong> e digite um <strong>nickname</strong>.`,
            `Clique no ${I.mini} pequeno sobre o ícone da classe e escolha os <strong>conteúdos</strong> que esse personagem faz.`,
            `Ao concluir um conteúdo, clique no chip dele para marcá-lo (${I.status}).`,
            `Salve seu quadro: use <strong>Exportar</strong> ou ligue o <strong>Auto-save</strong> (aba <em>Backup e Barra</em>).`
          ])),
          S("Onde ficam seus dados", `<p>O quadro (personagens e conteúdos marcados) <strong>não é guardado automaticamente no navegador</strong>: ele só sobrevive se você exportar um backup ou usar o Auto-save. Já os <em>presets</em>, o <em>idioma</em> e o <em>layout de coluna</em> ficam salvos no próprio navegador.</p>${tip("⚠️ Fechou a aba sem salvar? Os personagens e marcações se perdem. Exporte sempre que fizer mudanças importantes — ou deixe o Auto-save ligado.")}`),
          S("Mapa da tela", list([
            "<strong>Cabeçalho:</strong> título, botão de menu ☰, contadores, Exportar / Importar, Auto-save, screenshot e filtro.",
            `<strong>Barra de controles:</strong> o botão ${I.add} que adiciona personagens.`,
            "<strong>Tabelas:</strong> uma linha por personagem — classe à esquerda e conteúdos (chips) à direita.",
            "<strong>Menu ☰:</strong> Guide, Criador de Composições, Criador de Grupos, Idioma e este Manual."
          ])),
          S("Atalhos", list([
            "<kbd>'</kbd> (apóstrofo) — alterna entre <em>Class Content</em> e <em>Event Content</em> (aba <em>Eventos</em>).",
            "<kbd>Esc</kbd> — fecha o menu, o manual e a maioria das janelas e popovers.",
            "<kbd>Enter</kbd> — confirma o nickname ao adicionar um personagem."
          ]))
        ]
      },
      {
        id: "chars", icon: "users", label: "Personagens",
        lead: "Cada linha da tabela é um personagem. A célula da classe mostra o ícone, o nickname e a classe, além dos botões de ação.",
        sections: [
          S("Adicionar personagem", `<p>Clique em ${I.add} na barra de controles → escolha a classe na grade → digite o nickname → confirme com <kbd>Enter</kbd> ou no botão. <kbd>Esc</kbd> ou um clique fora cancela.</p><p>O nickname precisa ser <strong>único entre todas as tabelas</strong> (maiúsculas e minúsculas contam como iguais). Se já existir, aparece o aviso <em>“This name is already in use”</em>.</p>`, I.add),
          S("Botões da célula de classe", list([
            `${I.mini} <strong>Adicionar conteúdo</strong> — canto superior direito do ícone.`,
            `${I.gear} <strong>Equipamento</strong> — canto inferior direito do ícone.`,
            `${I.rm} <strong>Remover personagem</strong> — canto superior direito da célula.`,
            `${I.swap} <strong>Trocar classe</strong> — canto inferior esquerdo da célula.`
          ])),
          S("Remover personagem", `<p>Clique em ${I.rm}. A linha some <strong>sem pedir confirmação</strong>. Se a tabela ficar vazia e houver outras tabelas, ela também é removida.</p>`, I.rm),
          S("Trocar a classe", `<p>Clique em ${I.swap} e escolha a nova classe na grade. O <strong>nickname e os conteúdos são mantidos</strong>; só o ícone e o nome da classe mudam. Útil para quando você refaz o personagem numa classe diferente.</p>`, I.swap),
          S("Reordenar e mover", `<p>Clique com o botão esquerdo na célula da classe (fora dos botões) e <strong>arraste</strong> para outra posição — ou para <strong>outra tabela</strong>. A linha de destino fica destacada enquanto você arrasta.</p>`),
          S("Várias tabelas", `<p>No layout <em>Coluna Normal</em>, cada tabela comporta até <strong>10 personagens</strong>; ao encher, uma nova tabela é criada ao lado. No layout <em>Coluna Especial</em> existe uma única tabela, sem esse limite (veja a aba <em>Filtro e Layout</em>).</p>`),
          S("Equipamento (Set e Arma)", `<p>Clique em ${I.gear} para abrir o menu em cascata. Escolha <strong>Set</strong> ou <strong>Arma</strong> e depois: o slot, a <strong>raridade</strong> (Epic, Unique ou Legend), o <strong>nível</strong> (Lv80 / Lv90) e o <strong>refino</strong> (+0 a +15).</p><p>O resultado aparece num balão ao lado do ícone (<em>Set:</em> e <em>Weap:</em>), colorido pela raridade. Essas informações também são usadas pelo <strong>Criador de Grupos</strong> para identificar os <em>carries</em> (set Unique/Legend).</p>`, I.gear)
        ]
      },
      {
        id: "content", icon: "list", label: "Conteúdos",
        lead: "Os conteúdos aparecem como <strong>chips</strong> na coluna da direita. Cada chip é um conteúdo diário ou semanal do personagem.",
        sections: [
          S("Adicionar conteúdo", `<p>Clique no ${I.mini} sobre o ícone da classe, e depois no conteúdo desejado. Um conteúdo já adicionado não duplica. A lista inclui: Missão diária, Black Dragon Memorial, Red Dragon (Memorial, Normal e Hardcore), Desert Dragon Hardcore, Ice Dragon Normal, Duel Dragon, Daidalos e Granom (Easy e Normal), Hero Battlefield, Circus (Boss Rush e Monastery), Dragon Fellowship, Strongholds (Cerberus, Manticore, Apocalypse, Archbishop, Gigant), Third Core, Typhoom Kim Hardcore e Professor K Hardcore.</p>`, I.mini),
          S("Marcar como concluído", `<p>Clique no ícone ou no texto do chip para alternar entre <strong>pendente</strong> (✗, borda vermelha) e <strong>concluído</strong> (✓, borda verde).</p>`, I.status),
          S("Remover conteúdo", `<p>Clique no ${I.chiprm} à direita do chip.</p>`, I.chiprm),
          S("Seção “Extra” do menu de conteúdo", list([
            "<strong>Adicionar Todos</strong> — adiciona todos os conteúdos de uma vez.",
            "<strong>Remover Todos</strong> — limpa todos os chips do personagem (sem confirmação).",
            "<strong>Salvar no Preset</strong> — guarda a lista atual de conteúdos como um preset."
          ])),
          S("Presets", `<p>Um preset é uma lista de conteúdos salva para reaproveitar. Ao salvar, ele ganha um nome automático e passa a aparecer no topo do menu de conteúdo de <strong>todos</strong> os personagens. Clique nele para <strong>adicionar</strong> todos os conteúdos do preset; clique no ✕ ao lado do nome para excluí-lo (pede confirmação). Os presets ficam salvos no navegador.</p>`),
          S("Missão diária", `<p>É sempre o primeiro chip da lista e mostra uma <strong>contagem regressiva</strong> até o próximo reset.</p>`),
          S("Duel Dragon e o Number ID", `<p>A recompensa do Duel Dragon é <strong>por conta</strong>, não por personagem. Por isso, ao adicionar o chip, o app pede o <strong>Number ID</strong> da conta (somente números, obrigatório). O número aparece em destaque ao lado do nome do chip.</p><p>Personagens com o <strong>mesmo Number ID</strong> têm o Duel Dragon marcado juntos: concluiu em um, conclui em todos da mesma conta.</p>`),
          S("Resets automáticos", `${list([
            "<strong>Missão diária:</strong> desmarcada todo dia às 04:00 (Brasília).",
            "<strong>Demais conteúdos:</strong> desmarcados todo sábado às 04:00 (Brasília) — 09:00 no horário do servidor.",
            "<strong>Chips de evento:</strong> desmarcados todo dia às 04:00 (Brasília)."
          ])}<p>O reset acontece ao vivo (o app confere a cada 30 segundos e ao voltar para a aba) e também <strong>ao importar um backup</strong>: tudo que “venceu” desde que o backup foi salvo é desmarcado.</p>`),
          S("Muitos chips", `<p>Os chips se organizam em colunas de 3. Quando não cabem na célula, aparece uma barra de rolagem horizontal fina embaixo deles.</p>`)
        ]
      },
      {
        id: "events", icon: "event", label: "Eventos",
        lead: "Cada linha tem duas faces na coluna de conteúdo: <strong>Class Content</strong> (seus conteúdos) e <strong>Event Content</strong> (eventos da temporada).",
        sections: [
          S("Alternar as faces", `<p>Pressione <kbd>'</kbd> (apóstrofo) para virar a coluna de conteúdo — ela gira em 3D como uma página. Pressione de novo para voltar. A coluna da classe não gira. O atalho é ignorado enquanto você digita em campos de texto.</p>`),
          S("Event Content", `<p>Mostra chips dos <strong>eventos em andamento</strong>, cada um com a data de término e o <strong>tempo restante</strong>. Alguns eventos só rodam em certos dias da semana (por exemplo, sexta a domingo) e só aparecem nesses dias. O dia começa no reset diário: <strong>04:00 de Brasília (09:00 do servidor)</strong>. Um evento de sexta só aparece a partir de sexta 04:00, e não na quinta à noite.</p><p>Quando não há evento ocorrendo, o verso mostra uma mensagem avisando. A lista é atualizada consultando o site oficial (patch notes) e, no modo Evento, o cabeçalho da coluna traz o <strong>link do patch</strong>.</p>`),
          S("Marcar eventos", `<p>Funciona igual aos outros chips: clique para marcar como concluído. Os chips de evento são desmarcados <strong>todo dia às 04:00 (Brasília)</strong>.</p>`),
          S("Dica", tip("💡 O botão de screenshot do cabeçalho captura a face que estiver visível (Class ou Event Content)."))
        ]
      },
      {
        id: "filter", icon: "filter", label: "Filtro e Layout",
        lead: "Ferramentas para enxergar só o que importa e para escolher como as tabelas ocupam a tela.",
        sections: [
          S("Filtro", `<p>O botão de funil no cabeçalho abre o painel de filtros. Um número no botão indica quantos filtros estão ativos. Você pode filtrar por:</p>${list([
            "<strong>Classe</strong> — mostra só as classes escolhidas.",
            "<strong>Personagem</strong> — mostra só os personagens escolhidos.",
            "<strong>Conteúdo</strong> — somente <em>completados</em> ou somente <em>pendentes</em>.",
            "<strong>Por conteúdo</strong> — acompanha um conteúdo específico em todos os personagens."
          ])}<p>Use <strong>Limpar filtros</strong> para voltar a ver tudo. Filtrar apenas esconde; nada é apagado. Com filtro ativo, os chips restantes são reorganizados em colunas de 3.</p>`),
          S("Layout da coluna", `<p>Cada tabela tem um botão de layout. Ele abre a janela <em>Layout da coluna</em> com duas opções:</p>${list([
            "<strong>Coluna Normal</strong> — modelo padrão: tabelas lado a lado (até 10 personagens cada).",
            "<strong>Coluna Especial</strong> — tabela única; a coluna de conteúdo ocupa toda a largura, então cabem mais chips sem rolagem e sem abrir várias tabelas."
          ])}<p>A escolha fica salva no navegador.</p>`)
        ]
      },
      {
        id: "backup", icon: "save", label: "Backup e Barra",
        lead: "Como guardar seus dados e o que cada item do cabeçalho faz.",
        sections: [
          S("Exportar e Importar", `<p><strong>Exportar</strong> baixa um arquivo .json com todos os personagens, conteúdos marcados, equipamentos e Number IDs. <strong>Importar</strong> carrega esse arquivo de volta. Ao importar, os resets que já venceram são aplicados (veja a aba <em>Conteúdos</em>).</p><p>O arquivo exportado também é o que o <strong>Criador de Grupos</strong> usa para ler os personagens de cada jogador.</p>`),
          S("Auto-save", `<p>O botão <strong>Auto</strong> (com um ponto de status) salva sozinho num único arquivo, cerca de <strong>2 segundos depois da última alteração</strong>.</p>${list([
            "Disponível apenas em navegadores com acesso a arquivos, como <strong>Chrome e Edge</strong>.",
            "Na primeira vez, você escolhe onde o arquivo será salvo.",
            "Ao reabrir a página, o navegador pede permissão de novo: clique no botão para <strong>reconectar</strong>. Até lá, nada é gravado.",
            "Em navegadores sem suporte, o recurso se desliga e você usa o Exportar manual."
          ])}`),
          S("Screenshot", `<p>O botão de câmera copia uma imagem da tela, em alta resolução, para a <strong>área de transferência</strong> — é só colar onde quiser. Se não for possível copiar, a imagem é salva como arquivo. Abrindo o app como arquivo local, os ícones podem ficar de fora da imagem.</p>`),
          S("Contadores do cabeçalho", list([
            "<strong>online</strong> — usuários online agora. Clique para ver por região.",
            "<strong>Acessos totais</strong> — total de visitantes. Clique para ver por região.",
            "<strong>Média diária de acessos</strong> — média de visitas por dia.",
            "<strong>Reset de Conteúdo em</strong> — contagem regressiva até o reset semanal: todo sábado às 09:00 (horário do servidor)."
          ])),
          S("Horário do servidor", tip("🕒 O horário do servidor é UTC+2 fixo, sem horário de verão. Nos resets automáticos o app usa o horário de Brasília (GMT-3): 04:00 em Brasília = 09:00 no servidor."))
        ]
      },
      {
        id: "comp", icon: "comp", label: "Composições",
        lead: "Menu ☰ → <strong>Criador de Composições</strong>. Monte uma equipe de até 8 classes e veja os buffs e debuffs somados.",
        sections: [
          S("Montar a composição", `<p>Clique em um slot vazio e escolha a classe na grade. Repita até completar <strong>8 classes</strong>. Os bônus de cada uma são <strong>somados automaticamente</strong>. Para tirar uma classe, use o botão de remover do slot; para recomeçar, use <strong>Limpar composição</strong>.</p>`),
          S("Debuffs aplicados ao inimigo", `<p>Painel principal com a soma dos debuffs da equipe: ATK Físico e Mágico, DEF Física e Mágica, resistências de Luz, Trevas, Gelo e Fogo, entre outros. Clique na seta <strong>›</strong> do título para abrir <em>Debuffs exclusivos por classe</em>.</p>`),
          S("Buffs da composição", `<p>Painel com a soma dos buffs: atributos (Força, Agilidade, Inteligência, Vitality), DEF, ATK, Mov. Speed, Act. Speed, Red. Recarga, Critical, Dano Crítico, Amp. Final Damage e outros. A seta <strong>›</strong> abre <em>Buffs da composição por Classe</em>, com as skills de cada uma.</p>`),
          S("Descrição das skills", `<p>Nas listas por classe, passe o mouse sobre uma skill para ver um <strong>tooltip com a imagem da descrição</strong>. Skills EX mostram duas imagens lado a lado.</p>`)
        ]
      },
      {
        id: "party", icon: "party", label: "Grupos",
        lead: "Menu ☰ → <strong>Criador de Grupos</strong> <em>(em fase de adaptação)</em>. Gera a melhor party com os personagens que <strong>ainda não concluíram</strong> o conteúdo.",
        sections: [
          S("Como usar", steps([
            "Escolha o <strong>tipo de party</strong> e o <strong>conteúdo</strong>.",
            "Carregue os <strong>arquivos</strong> — um por jogador — com <em>Escolher arquivo</em> (backup exportado) ou pelo convite online (abaixo).",
            "Clique em <strong>Gerar</strong>. O resultado mostra a melhor composição, o elemento da party e tags de função de cada personagem.",
            "Clique em <strong>Gerar</strong> de novo para ver uma <strong>Alternativa</strong>. Quando as combinações acabam, volta para a melhor."
          ])),
          S("Online agora · importar sem arquivo", `<p>Em vez do arquivo, você pode <strong>convidar</strong> alguém que está online: a pessoa recebe um aviso para <strong>Aceitar</strong> ou <strong>Recusar</strong> o envio dos dados dos personagens dela. O status aparece como <em>Aguardando</em>, <em>Recusou</em>, <em>Sem resposta</em> ou <em>Falhou</em>.</p>${list([
            "Você precisa ter pelo menos uma classe na tabela: o nickname dela identifica você no convite.",
            "Funciona só no site publicado (não no modo local).",
            "Se todos os arquivos já estão preenchidos, remova um (✕) para convidar outra pessoa."
          ])}`),
          S("Regras da composição", list([
            "1 healer (ou sub-healer, se não houver healer nos arquivos).",
            "Carries com set Unique/Legend (mesclando os dois quando possível).",
            "Classes do mesmo elemento: Luz, Fogo, Trevas, Gelo ou Neutro.",
            "No máximo 1 tank, sempre acompanhado de DPS.",
            "Sem classes repetidas e sem 2 suportes/healers juntos.",
            "Classes dependentes de cooldown e de burst são combinadas com quem as complementa."
          ])),
          S("Concluir o conteúdo", `<p>Depois de rodar a party, use <strong>Conteúdo concluído</strong> para marcar o conteúdo como feito nos arquivos carregados. Os convidados online são avisados e os dados deles atualizados. Então gere uma nova party com os personagens restantes ou use <strong>Baixar arquivos atualizados</strong>. Se alguém finalizar por você, aparece o aviso com a coroa 👑 indicando o líder.</p>`),
          S("Histórico e limpeza", `<p>O painel lateral <strong>Histórico de parties</strong> lista as parties geradas, com o estado <em>Concluído</em> ou <em>Pendente</em>. Dá para apagar um item ou usar <strong>Limpar histórico</strong>. O botão <strong>Limpar</strong> zera a tela atual (avisa se há arquivos atualizados ainda não baixados).</p>`)
        ]
      },
      {
        id: "guides", icon: "book", label: "Guides e Idiomas",
        lead: "Conteúdo de apoio dentro do app e a escolha do idioma.",
        sections: [
          S("Guide", `<p>Menu ☰ → <strong>Guide</strong>. Submenus:</p>${list([
            "<strong>Enhancement Jade</strong> e <strong>Enhancement Spirit</strong> — tabelas de aprimoramento.",
            "<strong>Daily Rotation</strong> — rotação diária de Nest Lv80, que muda todo dia depois das 00:00 (horário do servidor).",
            "<strong>Progressão no Jogo</strong> — chart de progressão do leveling ao endgame (créditos ao jogador Jeru), com o guia de Dungeon Grind e o de Leveling em painéis que deslizam por cima.",
            "<strong>Raid</strong> — Desert Dragon e Red Dragon; o Ice Dragon está em processo de adaptação."
          ])}`),
          S("Idioma", `<p>Menu ☰ → <strong>Idioma</strong>. Disponíveis: Português (Brasil e Portugal), Espanhol, Inglês, Russo, Filipino, Indonésio, Chinês (Mandarim), Francês e Alemão. A escolha fica salva no navegador. Nomes de classes e conteúdos também são traduzidos.</p>`),
          S("Sobre este manual", tip("ℹ️ Este manual está completo em Português e Inglês. Nos demais idiomas, o texto é exibido em Português."))
        ]
      }
    ]
  };

  /* =======================================================
     ENGLISH
     ======================================================= */
  MANUAL.en = {
    tabs: [
      {
        id: "start", icon: "home", label: "Start",
        lead: "Welcome to the Dragon Nest Origins <strong>Content Control Center</strong>. Use it to track, character by character, which daily and weekly content you have completed — it also includes guides, a composition maker and a party maker.",
        sections: [
          S("Getting started", steps([
            `Click ${I.add} in the controls bar, pick a <strong>class</strong> and type a <strong>nickname</strong>.`,
            `Click the small ${I.mini} over the class icon and choose the <strong>content</strong> that character runs.`,
            `When you finish a content, click its chip to mark it (${I.status}).`,
            `Save your board: use <strong>Export</strong> or turn on <strong>Auto-save</strong> (<em>Backup &amp; Bar</em> tab).`
          ])),
          S("Where your data lives", `<p>The board (characters and ticked content) is <strong>not stored automatically in the browser</strong>: it only survives if you export a backup or use Auto-save. <em>Presets</em>, <em>language</em> and <em>column layout</em> are kept in the browser.</p>${tip("⚠️ Closed the tab without saving? Characters and ticks are lost. Export after important changes — or keep Auto-save on.")}`),
          S("Screen map", list([
            "<strong>Header:</strong> title, ☰ menu button, counters, Export / Import, Auto-save, screenshot and filter.",
            `<strong>Controls bar:</strong> the ${I.add} button that adds characters.`,
            "<strong>Tables:</strong> one row per character — class on the left, content chips on the right.",
            "<strong>☰ Menu:</strong> Guide, Composition Maker, Party Maker, Language and this Manual."
          ])),
          S("Shortcuts", list([
            "<kbd>'</kbd> (apostrophe) — switches between <em>Class Content</em> and <em>Event Content</em>.",
            "<kbd>Esc</kbd> — closes the menu, the manual and most windows and popovers.",
            "<kbd>Enter</kbd> — confirms the nickname when adding a character."
          ]))
        ]
      },
      {
        id: "chars", icon: "users", label: "Characters",
        lead: "Each table row is a character. The class cell shows the icon, nickname and class, plus the action buttons.",
        sections: [
          S("Add a character", `<p>Click ${I.add} in the controls bar → pick the class in the grid → type the nickname → confirm with <kbd>Enter</kbd> or the button. <kbd>Esc</kbd> or clicking outside cancels.</p><p>The nickname must be <strong>unique across all tables</strong> (upper/lower case count as the same). If it exists you will see <em>“This name is already in use”</em>.</p>`, I.add),
          S("Class cell buttons", list([
            `${I.mini} <strong>Add content</strong> — top-right corner of the icon.`,
            `${I.gear} <strong>Equipment</strong> — bottom-right corner of the icon.`,
            `${I.rm} <strong>Remove character</strong> — top-right corner of the cell.`,
            `${I.swap} <strong>Switch class</strong> — bottom-left corner of the cell.`
          ])),
          S("Remove a character", `<p>Click ${I.rm}. The row disappears <strong>without asking for confirmation</strong>. If the table becomes empty and other tables exist, it is removed too.</p>`, I.rm),
          S("Switch class", `<p>Click ${I.swap} and pick the new class in the grid. The <strong>nickname and content are kept</strong>; only the icon and class name change.</p>`, I.swap),
          S("Reorder and move", `<p>Left-click the class cell (outside the buttons) and <strong>drag</strong> it to another position — or to <strong>another table</strong>. The target row is highlighted while you drag.</p>`),
          S("Multiple tables", `<p>In <em>Normal Column</em> layout each table holds up to <strong>10 characters</strong>; when full, a new table is created beside it. <em>Special Column</em> layout uses a single table with no limit (see the <em>Filter &amp; Layout</em> tab).</p>`),
          S("Equipment (Set and Weapon)", `<p>Click ${I.gear} to open the cascading menu. Choose <strong>Set</strong> or <strong>Weapon</strong>, then the slot, the <strong>rarity</strong> (Epic, Unique or Legend), the <strong>level</strong> (Lv80 / Lv90) and the <strong>refine</strong> (+0 to +15).</p><p>The result shows in a bubble beside the icon (<em>Set:</em> and <em>Weap:</em>), colored by rarity. The <strong>Party Maker</strong> also uses it to detect <em>carries</em> (Unique/Legend set).</p>`, I.gear)
        ]
      },
      {
        id: "content", icon: "list", label: "Content",
        lead: "Content shows up as <strong>chips</strong> in the right-hand column. Each chip is a daily or weekly content for that character.",
        sections: [
          S("Add content", `<p>Click the ${I.mini} over the class icon, then the content you want. Content already added is not duplicated. The list covers Daily Quest, Black Dragon Memorial, Red Dragon (Memorial, Normal, Hardcore), Desert Dragon Hardcore, Ice Dragon Normal, Duel Dragon, Daidalos and Granom (Easy and Normal), Hero Battlefield, Circus (Boss Rush and Monastery), Dragon Fellowship, Strongholds, Third Core, Typhoom Kim Hardcore and Professor K Hardcore.</p>`, I.mini),
          S("Mark as completed", `<p>Click the chip's icon or text to toggle between <strong>pending</strong> (✗, red border) and <strong>completed</strong> (✓, green border).</p>`, I.status),
          S("Remove content", `<p>Click the ${I.chiprm} at the right of the chip.</p>`, I.chiprm),
          S("The “Extra” section", list([
            "<strong>Add All</strong> — adds every content at once.",
            "<strong>Remove All</strong> — clears all of the character's chips (no confirmation).",
            "<strong>Save to Preset</strong> — stores the current content list as a preset."
          ])),
          S("Presets", `<p>A preset is a saved list of content. It gets an automatic name and appears at the top of the content menu of <strong>every</strong> character. Click it to <strong>add</strong> all its content; click the ✕ beside the name to delete it (asks for confirmation). Presets are kept in the browser.</p>`),
          S("Daily Quest", `<p>Always the first chip, with a <strong>countdown</strong> to the next reset.</p>`),
          S("Duel Dragon and the Number ID", `<p>Duel Dragon rewards are <strong>per account</strong>, not per character. So when you add the chip the app asks for the account <strong>Number ID</strong> (digits only, required). The number is shown highlighted beside the chip name.</p><p>Characters with the <strong>same Number ID</strong> get Duel Dragon ticked together.</p>`),
          S("Automatic resets", `${list([
            "<strong>Daily Quest:</strong> unticked every day at 04:00 (Brasília).",
            "<strong>Other content:</strong> unticked every Saturday at 04:00 (Brasília) — 09:00 server time.",
            "<strong>Event chips:</strong> unticked every day at 04:00 (Brasília)."
          ])}<p>Resets run live (checked every 30 seconds and when you return to the tab) and also <strong>when you import a backup</strong>: anything that “expired” since the backup was saved is unticked.</p>`),
          S("Many chips", `<p>Chips are arranged in columns of 3. When they don't fit the cell, a thin horizontal scrollbar appears below them.</p>`)
        ]
      },
      {
        id: "events", icon: "event", label: "Events",
        lead: "Each row has two faces in the content column: <strong>Class Content</strong> (your content) and <strong>Event Content</strong> (season events).",
        sections: [
          S("Flip the faces", `<p>Press <kbd>'</kbd> (apostrophe) to flip the content column — it turns in 3D like a page. Press again to go back. The class column does not flip. The shortcut is ignored while you type in text fields.</p>`),
          S("Event Content", `<p>Shows chips for the <strong>events running now</strong>, each with its end date and <strong>time left</strong>. Some events only run on certain weekdays (for example Friday to Sunday) and only show on those days. The day starts at the daily reset: <strong>04:00 Brasília (09:00 server time)</strong>. A Friday event only shows from Friday 04:00 on, not on Thursday night.</p><p>When no event is running, the back face says so. The list is updated by querying the official site (patch notes), and in Event mode the column header carries the <strong>patch link</strong>.</p>`),
          S("Mark events", `<p>Works like the other chips: click to mark as completed. Event chips are unticked <strong>every day at 04:00 (Brasília)</strong>.</p>`),
          S("Tip", tip("💡 The header screenshot button captures whichever face is visible (Class or Event Content)."))
        ]
      },
      {
        id: "filter", icon: "filter", label: "Filter & Layout",
        lead: "Tools to see only what matters and to choose how tables use the screen.",
        sections: [
          S("Filter", `<p>The funnel button in the header opens the filter panel. A number on the button shows how many filters are active. You can filter by:</p>${list([
            "<strong>Class</strong> — shows only the chosen classes.",
            "<strong>Character</strong> — shows only the chosen characters.",
            "<strong>Content</strong> — only <em>completed</em> or only <em>pending</em>.",
            "<strong>By content</strong> — follows one specific content across all characters."
          ])}<p>Use <strong>Clear filters</strong> to see everything again. Filtering only hides; nothing is deleted.</p>`),
          S("Column layout", `<p>Each table has a layout button that opens <em>Column layout</em> with two options:</p>${list([
            "<strong>Normal Column</strong> — default: tables side by side (up to 10 characters each).",
            "<strong>Special Column</strong> — a single table; the content column uses the full width, so more chips fit without scrolling or opening several tables."
          ])}<p>Your choice is saved in the browser.</p>`)
        ]
      },
      {
        id: "backup", icon: "save", label: "Backup & Bar",
        lead: "How to keep your data and what each header item does.",
        sections: [
          S("Export and Import", `<p><strong>Export</strong> downloads a .json file with all characters, ticked content, equipment and Number IDs. <strong>Import</strong> loads it back. On import, resets that already expired are applied (see the <em>Content</em> tab).</p><p>The exported file is also what the <strong>Party Maker</strong> reads for each player's characters.</p>`),
          S("Auto-save", `<p>The <strong>Auto</strong> button (with a status dot) saves by itself to a single file, about <strong>2 seconds after the last change</strong>.</p>${list([
            "Only in browsers with file access, such as <strong>Chrome and Edge</strong>.",
            "The first time, you choose where the file is saved.",
            "When you reopen the page the browser asks for permission again: click the button to <strong>reconnect</strong>. Nothing is written until then.",
            "In unsupported browsers the feature turns itself off — use manual Export."
          ])}`),
          S("Screenshot", `<p>The camera button copies a high-resolution image of the screen to the <strong>clipboard</strong> — just paste it anywhere. If copying isn't possible, the image is saved as a file. When opening the app as a local file, icons may be missing from the image.</p>`),
          S("Header counters", list([
            "<strong>online</strong> — users online now. Click to see by region.",
            "<strong>Total visits</strong> — total visitors. Click to see by region.",
            "<strong>Daily average</strong> — average visits per day.",
            "<strong>Content reset in</strong> — countdown to the weekly reset: every Saturday at 09:00 (server time)."
          ])),
          S("Server time", tip("🕒 Server time is a fixed UTC+2 (no daylight saving). Automatic resets use Brasília time (GMT-3): 04:00 in Brasília = 09:00 server time."))
        ]
      },
      {
        id: "comp", icon: "comp", label: "Compositions",
        lead: "☰ Menu → <strong>Composition Maker</strong>. Build a team of up to 8 classes and see the summed buffs and debuffs.",
        sections: [
          S("Build the composition", `<p>Click an empty slot and pick the class in the grid. Repeat until you have <strong>8 classes</strong>. Each class's bonuses are <strong>summed automatically</strong>. To remove a class use the slot's remove button; to start over use <strong>Clear composition</strong>.</p>`),
          S("Debuffs applied to the enemy", `<p>Main panel with the team's summed debuffs: Physical and Magic ATK, Physical and Magic DEF, Light, Dark, Ice and Fire resistances and more. Click the <strong>›</strong> arrow in the title to open <em>Class-exclusive debuffs</em>.</p>`),
          S("Composition buffs", `<p>Panel with summed buffs: stats (Strength, Agility, Intelligence, Vitality), DEF, ATK, Move Speed, Act. Speed, Cooldown Reduction, Critical, Critical Damage, Final Damage Amp and more. The <strong>›</strong> arrow opens <em>Composition buffs by class</em>, with each class's skills.</p>`),
          S("Skill descriptions", `<p>In the per-class lists, hover a skill to see a <strong>tooltip with its description image</strong>. EX skills show two images side by side.</p>`)
        ]
      },
      {
        id: "party", icon: "party", label: "Party Maker",
        lead: "☰ Menu → <strong>Party Maker</strong> <em>(being adapted)</em>. Generates the best party from characters that <strong>haven't completed</strong> the content yet.",
        sections: [
          S("How to use", steps([
            "Pick the <strong>party type</strong> and the <strong>content</strong>.",
            "Load the <strong>files</strong> — one per player — with <em>Choose file</em> (exported backup) or through the online invite (below).",
            "Click <strong>Generate</strong>. The result shows the best composition, the party element and role tags for each character.",
            "Click <strong>Generate</strong> again to see an <strong>Alternative</strong>. When combinations run out, it starts again from the best."
          ])),
          S("Online now · import without a file", `<p>Instead of a file you can <strong>invite</strong> someone who is online: they get a notice to <strong>Accept</strong> or <strong>Decline</strong> sending their characters' data. Status shows as <em>Waiting</em>, <em>Declined</em>, <em>No answer</em> or <em>Failed</em>.</p>${list([
            "You need at least one class in your table: its nickname identifies you in the invite.",
            "Works only on the published site (not in local mode).",
            "If every file slot is already filled, remove one (✕) to invite someone else."
          ])}`),
          S("Composition rules", list([
            "1 healer (or sub-healer if no healer is in the files).",
            "Carries with Unique/Legend set (mixing both when possible).",
            "Classes of the same element: Light, Fire, Dark, Ice or Neutral.",
            "At most 1 tank, always accompanied by DPS.",
            "No repeated classes and no 2 supports/healers together.",
            "Cooldown- and burst-dependent classes are paired with those that complement them."
          ])),
          S("Finishing the content", `<p>After running the party, use <strong>Content completed</strong> to mark it as done in the loaded files. Online guests are notified and their data updated. Then generate a new party with the remaining characters or use <strong>Download updated files</strong>. If someone finishes for you, a 👑 notice names the party leader.</p>`),
          S("History and clearing", `<p>The side panel <strong>Party history</strong> lists generated parties with <em>Completed</em> or <em>Pending</em> status. You can delete an item or use <strong>Clear history</strong>. The <strong>Clear</strong> button resets the current screen (it warns if updated files haven't been downloaded).</p>`)
        ]
      },
      {
        id: "guides", icon: "book", label: "Guides & Languages",
        lead: "Support content inside the app and language selection.",
        sections: [
          S("Guide", `<p>☰ Menu → <strong>Guide</strong>. Submenus:</p>${list([
            "<strong>Enhancement Jade</strong> and <strong>Enhancement Spirit</strong> — enhancement tables.",
            "<strong>Daily Rotation</strong> — daily Lv80 Nest rotation, which changes every day after 00:00 (server time).",
            "<strong>Game Progression</strong> — progression chart from leveling to endgame (credits to player Jeru), with the Dungeon Grind and Leveling guides in sliding panels.",
            "<strong>Raid</strong> — Desert Dragon and Red Dragon; Ice Dragon is still being adapted."
          ])}`),
          S("Language", `<p>☰ Menu → <strong>Language</strong>. Available: Portuguese (Brazil and Portugal), Spanish, English, Russian, Filipino, Indonesian, Chinese (Mandarin), French and German. Your choice is saved in the browser. Class and content names are translated as well.</p>`),
          S("About this manual", tip("ℹ️ This manual is complete in Portuguese and English. In other languages the text is shown in Portuguese."))
        ]
      }
    ]
  };

  // ---------------------------------------------------------
  // Renderização
  // ---------------------------------------------------------
  const KEY = "dnOriginsSelectedLang";
  const overlay = document.getElementById("manualOverlay");
  const tabsEl  = document.getElementById("manualTabs");
  const bodyEl  = document.getElementById("manualBody");
  if (!overlay || !tabsEl || !bodyEl) return;

  let activeId = "start";
  let renderedLang = null;

  function getData() {
    let lang = "pt-BR";
    try { lang = localStorage.getItem(KEY) || "pt-BR"; } catch (_) { /* sem storage */ }
    return { lang, data: MANUAL[lang] || MANUAL["pt-BR"] };
  }

  function sectionHTML(sec) {
    const icon = sec.icon ? `<span class="manual-sec-icon">${sec.icon}</span>` : "";
    return `<div class="manual-section"><h4>${icon}<span>${sec.title}</span></h4><div class="manual-sec-body">${sec.html}</div></div>`;
  }

  function render() {
    const { lang, data } = getData();
    renderedLang = lang;
    if (!data.tabs.some((t) => t.id === activeId)) activeId = data.tabs[0].id;

    tabsEl.innerHTML = data.tabs.map((t) => {
      const on = t.id === activeId;
      return `<button type="button" class="manual-tab${on ? " active" : ""}" role="tab" id="mtab-${t.id}" aria-selected="${on}" aria-controls="mpanel-${t.id}" tabindex="${on ? 0 : -1}" data-tab="${t.id}">` +
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${TAB_ICONS[t.icon] || ""}"/></svg>` +
        `<span>${t.label}</span></button>`;
    }).join("");

    bodyEl.innerHTML = data.tabs.map((t) => {
      const on = t.id === activeId;
      return `<section class="manual-panel${on ? " active" : ""}" role="tabpanel" id="mpanel-${t.id}" aria-labelledby="mtab-${t.id}"${on ? "" : " hidden"}>` +
        (t.lead ? `<p class="manual-lead">${t.lead}</p>` : "") +
        t.sections.map(sectionHTML).join("") + `</section>`;
    }).join("");
  }

  function activate(id, focus) {
    activeId = id;
    tabsEl.querySelectorAll(".manual-tab").forEach((b) => {
      const on = b.dataset.tab === id;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
      if (on) {
        if (focus) b.focus();
        if (typeof b.scrollIntoView === "function") b.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    });
    bodyEl.querySelectorAll(".manual-panel").forEach((p) => {
      const on = p.id === "mpanel-" + id;
      p.classList.toggle("active", on);
      p.hidden = !on;
    });
    bodyEl.scrollTop = 0;
  }

  tabsEl.addEventListener("click", (e) => {
    const b = e.target.closest(".manual-tab");
    if (b) activate(b.dataset.tab, false);
  });

  tabsEl.addEventListener("keydown", (e) => {
    const tabs = Array.from(tabsEl.querySelectorAll(".manual-tab"));
    const i = tabs.findIndex((b) => b.dataset.tab === activeId);
    let n = -1;
    if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = tabs.length - 1;
    if (n < 0) return;
    e.preventDefault();
    activate(tabs[n].dataset.tab, true);
  });

  // Rodas do mouse sobre a barra de abas rolam na horizontal
  tabsEl.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { tabsEl.scrollLeft += e.deltaY; e.preventDefault(); }
  }, { passive: false });

  // Monta quando o manual abre (renderiza de novo se o idioma mudou)
  function onOpen() {
    if (renderedLang !== getData().lang || !tabsEl.children.length) render();
    activate(activeId, false);
  }
  new MutationObserver(() => {
    if (!overlay.classList.contains("hidden")) onOpen();
  }).observe(overlay, { attributes: true, attributeFilter: ["class"] });

  render();
})();

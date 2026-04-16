/* ================================================================
   DATA.JS — T.News · Canal Interno T.Group
   ──────────────────────────────────────────────────────────────
   Edite este arquivo mensalmente para atualizar o conteúdo.
   Não é necessário alterar o index.html para manutenção rotineira.

   CAMPOS OBRIGATÓRIOS estão marcados com [*]
   ================================================================ */

window.TNEWS = {

  // ─── IDENTIFICAÇÃO DO MÊS ────────────────────────────────────
  mes: 'Abril',       // [*] Nome do mês em português
  ano: 2026,          // [*] Ano
  missao: 'Criar momentos marcantes através de experiências inesquecíveis.',


  // ─── NOVOS COLABORADORES ─────────────────────────────────────
  // Remova o array inteiro (deixe []) se não houver novos no mês.
  // genero: 'f' (feminino) ou 'm' (masculino) — define bem-vinda/bem-vindo
  // photo: caminho relativo para a imagem em assets/people/
  //        Nomeie o arquivo como: welcome_NOME.png
  newcomers: [
    {
      name:   'Gabriela Mattar',    // [*] Nome completo
      dept:   'T.Youth',          // [*] Empresa/área
      role:   'Criação',          // [*] Cargo/função
      genero: 'f',                // [*] 'f' ou 'm'
      photo:  'assets/people/welcomer_gabriela_tyouth.png', // caminho da arte
    },
     {
      name:   'Erika Ferreira',    // [*] Nome completo
      dept:   'T.Venues',          // [*] Empresa/área
      role:   'Comercial',          // [*] Cargo/função
      genero: 'f',                // [*] 'f' ou 'm'
      photo:  'assets/people/welcomer_erika_tvenues.png', // caminho da arte
    },

    // ── Descomente e preencha para adicionar mais ──
    // {
    //   name:   'Nome Sobrenome',
    //   dept:   'T.Brands',
    //   role:   'Estratégia',
    //   genero: 'm',
    //   photo:  'assets/people/welcome_nome.png',
    // },
  ],


  // ─── ANIVERSARIANTES DO MÊS ──────────────────────────────────
  // Deixe photo: null para quem não tiver arte — aparecerão as iniciais.
  // day + month: usados para detectar aniversário hoje.
  birthdays: [
    {
      name:      'Gabriel',           // [*] Nome completo
      firstname: 'Brasa',              // [*] Primeiro nome em minúsculo (aparece grande)
      dept:      'Neo Formaturas',           // [*]
      date:      '01 de Abril',       // [*] Texto da data
      day:       1,                   // [*] Dia (número)
      month:     4,                   // [*] Mês (número 1–12)
      photo:     'assets/people/0104_BDAY_GABRIEL_NEOpng.png', // caminho da arte ou null
    },
    {
      name:      'Gustavo',
      firstname: 'Gus',
      dept:      'T.Youth',
      date:      '01 de Abril',
      day:       1,
      month:     4,
      photo:     'assets/people/0104_BDAY_GUS_TY.png', // caminho da arte ou null
    },
    {
      name:      'Matheus',
      firstname: 'Mapp',
      dept:      'Neo Formaturas',
      date:      '01 de Abril',
      day:       1,
      month:     4,
      photo:     'assets/people/0104_BDAY_MATHEUS_NEO.png', // caminho da arte ou null
    },
    {
      name:      'Cláudia',
      firstname: 'Clau',
      dept:      'T.Youth',
      date:      '07 de Abril',
      day:       7,
      month:     4,
      photo:     'assets/people/0704_BDAY_CLAU_TY.png', // caminho da arte ou null
    },
    {
      name:      'Bruno',
      firstname: 'Bruninho',
      dept:      'Neo Formaturas',
      date:      '30 de Abril',
      day:       10,
      month:     4,
      photo:     'assets/people/1004_BDAY_bruniho_NF.png', // caminho da arte ou null
    },
     {
      name:      'Eduarda',
      firstname: 'Duda',
      dept:      'T.Youth',
      date:      '10 de Abril',
      day:       10,
      month:     4,
      photo:     'assets/people/1004_BDAY_duda_ty.png', // caminho da arte ou null
    },
     {
      name:      'Francisco',
      firstname: 'Fran',
      dept:      'Neo Formaturas',
      date:      '12 de Abril',
      day:       12,
      month:     4,
      photo:     'assets/people/120426_bday_fran_tyouth.png', // caminho da arte ou null
    },
     {
      name:      'Vinicius David',
      firstname: 'Viny',
      dept:      'T.Youth',
      date:      '12 de Abril',
      day:       12,
      month:     4,
      photo:     'assets/people/120426_bday_viny_tyouth.png', // caminho da arte ou null
    },
     {
      name:      'Yasmin',
      firstname: 'Yas',
      dept:      'T.Youth',
      date:      '14 de Abril',
      day:       14,
      month:     4,
      photo:     'assets/people/140426_bday_yasmin_tyouth.png', // caminho da arte ou null
    },
  ],


  // ─── CARDÁPIO DA SEMANA ───────────────────────────────────────
  // Chaves exatas: 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'
  menu: {
    'Segunda': {
      main:  ['Arroz branco', 'Feijão tropeiro', 'Filé de Frango grelhado', 'Bife bovino', 'Farofa especial', 'Purê de Abóbora'],
      salad: ['Alface crespa', 'Tomate italiano', 'Pepino japonês', 'Cenoura ralada'],
    },
    'Terça': {
      main:  ['Arroz branco', 'Feijão', 'Filé de Frango grelhado', 'Creme de Milho especial'],
      salad: ['Alface crespa', 'Tomate', 'Pepino', 'Cenoura', 'Beterraba'],
    },
    'Quarta': {
      main:  ['Arroz branco', 'Feijão', 'Strogonoff de Frango', 'Batata Palha crocante'],
      salad: ['Alface', 'Tomate', 'Pepino', 'Cenoura', 'Beterraba', 'Ovos de Codorna', 'Palmito', 'Manga'],
    },
    'Quinta': {
      main:  ['Arroz branco', 'Feijão', 'Bife bovino', 'Creme de Cebola', 'Farofa especial'],
      salad: ['Alface', 'Tomate', 'Pepino', 'Cenoura', 'Beterraba', 'Ovos de Codorna', 'Palmito', 'Manga'],
    },
    'Sexta': {
      main:  ['Arroz branco', 'Feijão', 'Bife bovino grelhado', 'Batata Assada rústica'],
      salad: ['Alface crespa', 'Tomate italiano', 'Pepino japonês', 'Cenoura ralada'],
    },
  },


  // ─── NOTÍCIAS T.NEWS ─────────────────────────────────────────
  // ac: cor hexadecimal de destaque da notícia
  // ic: emoji do ícone visual
  // src: fonte/origem da notícia
  news: [
    {
      cat:  'FESTIVAL',
      ttl:  'Lollapalooza Brasil 2026 anuncia headliners para edição histórica em Interlagos',
      body: 'Mais de 80 atrações em 3 dias no Autódromo de Interlagos. A expectativa é de público recorde e a edição promete ser a maior da história do festival no Brasil.',
      tag:  'São Paulo',
      src:  'Folha de SP',
      ac:   '#e63946',
      ic:   '🎸',
    },
    {
      cat:  'CULTURA',
      ttl:  'Carnaval de SP bate recorde com 8 milhões de foliões nas ruas da cidade',
      body: 'Blocos de rua atraíram público histórico, consolidando São Paulo como o maior destino carnavalesco nacional e internacional.',
      tag:  'Carnaval',
      src:  'G1',
      ac:   '#f4a261',
      ic:   '🎉',
    },
    {
      cat:  'TENDÊNCIA',
      ttl:  'Experiências XR dominam o mercado de eventos premium em 2026',
      body: 'Produtoras apostam em tecnologia de realidade mista e instalações interativas para criar memórias únicas e inesquecíveis.',
      tag:  'Inovação',
      src:  'TechCrunch',
      ac:   '#a78bfa',
      ic:   '🥽',
    },
    {
      cat:  'MÚSICA',
      ttl:  'Shows ao vivo superam streaming como principal fonte de renda dos artistas',
      body: 'Novo relatório confirma a virada: a experiência ao vivo é irreversível e o mercado de venues responde com espaços cada vez mais sofisticados.',
      tag:  'Mercado',
      src:  'Billboard',
      ac:   '#38bdf8',
      ic:   '🎵',
    },
    {
      cat:  'GASTRONOMIA',
      ttl:  'São Paulo entra no top 5 dos destinos gastronômicos mais relevantes do mundo',
      body: 'Guia World\'s Best eleva SP ao ranking global, impulsionado pela cena criativa de bares, restaurantes e projetos culturais únicos.',
      tag:  'Gastronomia',
      src:  'Veja SP',
      ac:   '#34d399',
      ic:   '🍽️',
    },
    {
      cat:  'LIFESTYLE',
      ttl:  'Rooftop bars transformam a paisagem noturna e redefinem hospitalidade em SP',
      body: 'Nova geração de bares em altura redefine o conceito de hospitalidade urbana e atrai o público mais exigente e conectado da capital.',
      tag:  'Nightlife',
      src:  'Time Out SP',
      ac:   '#FF5B1D',
      ic:   '🌆',
    },
  ],


  // ─── AGENDA DE EVENTOS ────────────────────────────────────────
  // type: 'gc'       → Gente & Cultura (interno)
  //       'company'  → Evento de uma empresa do grupo
  // company: Nome da empresa (apenas quando type='company')
  // color: cor hexadecimal de destaque do evento
  events: [
    {
      day:     23,
      month:   4,
      year:    2026,
      time:    '20h – 22h',
      title:   'Esportes T.Group',
      desc:    'Vôlei de Areia + Futebol Society. Participação gratuita para todos os colaboradores!',
      type:    'gc',
      ic:      '⚽',
      color:   '#7AC231',
    },
    {
      day:     30,
      month:   4,
      year:    2026,
      time:    '17h',
      title:   'Café com T',
      desc:    'Momento especial de conexão entre as equipes.',
      type:    'gc',
      ic:      '☕',
      color:   '#FF5B1D',
    },
    {
      day:     30,
      month:   4,
      year:    2026,
      time:    '18h20',
      title:   'Aniversariantes de Março & Abril',
      desc:    'Celebração especial dos aniversariantes dos dois meses.',
      type:    'gc',
      ic:      '🎂',
      color:   '#FFAA00',
    },
    {
      day:     30,
      month:   4,
      year:    2026,
      time:    '18h30',
      title:   'Happy Hour T.Group',
      desc:    'Confraternização mensal. Vem celebrar com a gente!',
      type:    'gc',
      ic:      '🥂',
      color:   '#9B45FF',
    },

    // ── Exemplo de evento de empresa: ──
    // {
    //   day:     15,
    //   month:   5,
    //   year:    2026,
    //   time:    '19h',
    //   title:   'Opening Night T.Venues',
    //   desc:    'Abertura do novo espaço. Convidados especiais.',
    //   type:    'company',
    //   company: 'T.Venues',
    //   ic:      '🏟️',
    //   color:   '#9B45FF',
    // },
  ],

};

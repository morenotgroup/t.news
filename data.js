/* ================================================================
   DATA.JS — T.News · Canal Interno T.Group
   Edite este arquivo mensalmente. Nunca altere index.html.
   ================================================================ */
window.TNEWS = {
  mes: 'Abril', ano: 2026,
  missao: 'Criar momentos marcantes através de experiências inesquecíveis.',
  newcomers: [
    { name:'Gabriela Mattar', dept:'T.Youth', role:'Criação', genero:'f', photo:'assets/people/welcome_gabriela.png' },
  ],
  birthdays: [
    { name:'Claudia',      firstname:'clau',    dept:'T.Youth',  date:'07 de Abril', day:7,  month:4, photo:'assets/people/bday_clau.png' },
    { name:'Gustavo',      firstname:'Gus',     dept:'T.Youth',  date:'01 de Abril', day:1,  month:4, photo:null },
    { name:'Rafael Mendes',firstname:'rafael',  dept:'T.Brands', date:'18 de Abril', day:18, month:4, photo:null },
    { name:'Juliana Costa',firstname:'juliana', dept:'T.Venues', date:'22 de Abril', day:22, month:4, photo:null },
    { name:'Pedro Alves',  firstname:'pedro',   dept:'T.Dreams', date:'25 de Abril', day:25, month:4, photo:null },
    { name:'Marina Silva', firstname:'marina',  dept:'T.Youth',  date:'30 de Abril', day:30, month:4, photo:null },
  ],
  menu: {
    'Segunda':{ main:['Arroz branco','Feijão tropeiro','Filé de Frango grelhado','Bife bovino','Farofa especial','Purê de Abóbora'], salad:['Alface crespa','Tomate italiano','Pepino japonês','Cenoura ralada'] },
    'Terça':  { main:['Arroz branco','Feijão','Filé de Frango grelhado','Creme de Milho especial'], salad:['Alface crespa','Tomate','Pepino','Cenoura','Beterraba'] },
    'Quarta': { main:['Arroz branco','Feijão','Strogonoff de Frango','Batata Palha crocante'], salad:['Alface','Tomate','Pepino','Cenoura','Beterraba','Ovos de Codorna','Palmito','Manga'] },
    'Quinta': { main:['Arroz branco','Feijão','Bife bovino','Creme de Cebola','Farofa especial'], salad:['Alface','Tomate','Pepino','Cenoura','Beterraba','Ovos de Codorna','Palmito','Manga'] },
    'Sexta':  { main:['Arroz branco','Feijão','Bife bovino grelhado','Batata Assada rústica'], salad:['Alface crespa','Tomate italiano','Pepino japonês','Cenoura ralada'] },
  },
  news: [
    { cat:'FESTIVAL',    ttl:'Lollapalooza Brasil 2026 anuncia headliners para edição histórica em Interlagos', body:'Mais de 80 atrações em 3 dias. Expectativa de público recorde na maior edição da história.', tag:'São Paulo',  src:'Folha de SP', ac:'#e63946', ic:'🎸' },
    { cat:'CULTURA',     ttl:'Carnaval de SP bate recorde com 8 milhões de foliões nas ruas da cidade',         body:'Blocos de rua consolidam São Paulo como maior destino carnavalesco do país.',               tag:'Carnaval',  src:'G1',         ac:'#f4a261', ic:'🎉' },
    { cat:'TENDÊNCIA',   ttl:'Experiências XR dominam o mercado de eventos premium em 2026',                    body:'Realidade mista e instalações interativas criam memórias únicas para cada convidado.',        tag:'Inovação',  src:'TechCrunch', ac:'#a78bfa', ic:'🥽' },
    { cat:'MÚSICA',      ttl:'Shows ao vivo superam streaming como principal fonte de renda dos artistas',       body:'A experiência ao vivo é irreversível — venues respondem com espaços cada vez mais sofisticados.', tag:'Mercado',  src:'Billboard',  ac:'#38bdf8', ic:'🎵' },
    { cat:'GASTRONOMIA', ttl:'São Paulo entra no top 5 dos destinos gastronômicos mais relevantes do mundo',     body:'Guia World\'s Best eleva SP ao ranking global pela cena criativa de bares e restaurantes.',    tag:'Gastronomia',src:'Veja SP',    ac:'#34d399', ic:'🍽️' },
    { cat:'LIFESTYLE',   ttl:'Rooftop bars transformam a paisagem noturna e redefinem a hospitalidade em SP',    body:'Nova geração de bares em altura atrai o público mais exigente e conectado da capital.',         tag:'Nightlife', src:'Time Out SP', ac:'#FF5B1D', ic:'🌆' },
  ],
  events: [
    { day:23, month:4, year:2026, time:'20h – 22h', title:'Esportes T.Group',             desc:'Vôlei de Areia + Futebol Society. Participação gratuita para todos os colaboradores!', type:'gc', ic:'⚽', color:'#7AC231' },
    { day:30, month:4, year:2026, time:'17h00',     title:'Café com T',                    desc:'Momento especial de conexão entre as equipes.',                                        type:'gc', ic:'☕', color:'#FF5B1D' },
    { day:30, month:4, year:2026, time:'18h20',     title:'Aniversariantes de Março & Abril', desc:'Celebração especial dos aniversariantes dos dois meses.',                           type:'gc', ic:'🎂', color:'#FFAA00' },
    { day:30, month:4, year:2026, time:'18h30',     title:'Happy Hour T.Group',             desc:'Confraternização mensal — vem celebrar com a gente!',                                type:'gc', ic:'🥂', color:'#9B45FF' },
  ],
};

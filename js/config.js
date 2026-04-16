/* ══════════════════════════════════════════
   T.NEWS — CONFIG
   App settings — change freely
══════════════════════════════════════════ */
export const CFG = {
  // Scene durations (ms)
  SCENE_DUR:      22000,  // default scene duration
  NC_ITEM_DUR:    5500,   // each newcomer card
  BD_ITEM_DUR:    5500,   // each birthday card
  NC_ITEMS_VISIT: 4,      // max newcomers shown per scene visit
  BD_ITEMS_VISIT: 4,      // max birthdays shown per scene visit

  // News refresh interval (ms) — how often to re-fetch RSS
  NEWS_REFRESH:   600000, // 10 minutes

  // Weather: São Paulo
  WEATHER_LAT:    -23.5505,
  WEATHER_LNG:    -46.6333,
  WEATHER_CITY:   'São Paulo, SP',

  // Brand colors
  COLORS: {
    youth:  '#FFAA00',
    dreams: '#7AC231',
    brands: '#2B72FF',
    venues: '#9B45FF',
    orange: '#FF5B1D',
  },

  // Days / months PT-BR
  DAYS:   ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  DAYS_S: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  MONTHS: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],

  // Food emoji map
  FOOD_ICONS: {
    'arroz':'🍚','feijão':'🫘','feijao':'🫘','frango':'🍗','bife':'🥩','bovino':'🥩',
    'farofa':'🌾','purê':'🥣','pure':'🥣','creme':'🥣','strogonoff':'🍲','batata':'🥔',
    'alface':'🥬','tomate':'🍅','cenoura':'🥕','pepino':'🥒','manga':'🥭',
    'ovo':'🥚','ovos':'🥚','palmito':'🌿','beterraba':'❤️','milho':'🌽',
    'abóbora':'🎃','abobora':'🎃','cebola':'🧅',
  },
};

export function foodIcon(item) {
  const l = item.toLowerCase();
  for (const [k,v] of Object.entries(CFG.FOOD_ICONS)) {
    if (l.includes(k)) return v;
  }
  return '🍴';
}

export function todayName() {
  return CFG.DAYS[new Date().getDay()];
}

export function isToday(day, month) {
  const n = new Date();
  return n.getDate() === day && (n.getMonth() + 1) === month;
}

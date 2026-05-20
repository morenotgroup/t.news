export const CFG = {
  SCENE_DUR:      22000,
  NC_ITEM_DUR:    5500,
  BD_ITEM_DUR:    5500,
  HL_ITEM_DUR:    6000,
  GI_ITEM_DUR:    5000,
  NC_ITEMS_VISIT: 4,
  BD_ITEMS_VISIT: 4,
  NEWS_REFRESH:   600000,
  WEATHER_LAT:    -23.5505,
  WEATHER_LNG:    -46.6333,
  WEATHER_CITY:   'Sao Paulo, SP',
  DAYS:   ['Domingo','Segunda','Terca','Quarta','Quinta','Sexta','Sabado'],
  DAYS_PT:['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  DAYS_S: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
  MONTHS: ['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  FOOD_ICONS: {
    'arroz':'🍚','feijao':'🫘','frango':'🍗','bife':'🥩','bovino':'🥩','farofa':'🌾',
    'pure':'🥣','creme':'🥣','strogonoff':'🍲','batata':'🥔','alface':'🥬',
    'tomate':'🍅','cenoura':'🥕','pepino':'🥒','manga':'🥭','ovo':'🥚','ovos':'🥚',
    'palmito':'🌿','beterraba':'❤️','milho':'🌽','abobora':'🎃','cebola':'🧅',
    'iscas':'🥩','abobrinha':'🥒','mandioquinha':'🥣','barbecue':'🔥','acebolado':'🧅',
  },
};
export function foodIcon(item) {
  const l = item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  for (const [k,v] of Object.entries(CFG.FOOD_ICONS)) if (l.includes(k)) return v;
  return '🍴';
}
export function todayName() { return CFG.DAYS[new Date().getDay()]; }
export function todayNamePT() { return CFG.DAYS_PT[new Date().getDay()]; }
export function isToday(day, month) { const n=new Date(); return n.getDate()===day&&(n.getMonth()+1)===month; }
export function pad2(n) { return String(n).padStart(2,'0'); }

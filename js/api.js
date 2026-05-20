import { CFG } from './config.js';

/* ═══ WEATHER ═══ */
const WCM = {
  0:{i:'☀️',l:'Ensolarado'},1:{i:'🌤',l:'Poucas nuvens'},2:{i:'⛅',l:'Parcialmente nublado'},
  3:{i:'☁️',l:'Nublado'},45:{i:'🌫',l:'Neblina'},51:{i:'🌦',l:'Garoa'},
  61:{i:'🌧',l:'Chuva leve'},63:{i:'🌧',l:'Chuva'},80:{i:'🌦',l:'Pancadas'},
  95:{i:'⛈',l:'Tempestade'},99:{i:'⛈',l:'Tempestade'},
};
export const wcInfo = c => WCM[c] || {i:'🌡',l:'--'};

export async function fetchWeather() {
  try {
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${CFG.WEATHER_LAT}&longitude=${CFG.WEATHER_LNG}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America/Sao_Paulo&forecast_days=4`);
    return await r.json();
  } catch { return null; }
}

/* ═══ NEWS — RSS with image fallback by category ═══ */
const RSS_FEEDS = [
  { url:'https://g1.globo.com/rss/g1/entretenimento/', name:'G1 Entretenimento' },
  { url:'https://feeds.folha.uol.com.br/ilustrada/rss091.xml', name:'Folha Ilustrada' },
  { url:'https://rss.uol.com.br/feed/entretenimento.xml', name:'UOL' },
];
/* Curated Unsplash photo IDs by category — free to use, no API key */
const CAT_IMAGES = {
  'FESTIVAL':      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=700&q=80',
  'CULTURA':       'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=700&q=80',
  'MUSICA':        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=700&q=80',
  'MERCADO':       'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80',
  'GASTRONOMIA':   'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80',
  'ENTRETENIMENTO':'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=80',
  'INOVACAO':      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80',
  'LIFESTYLE':     'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=700&q=80',
  'DEFAULT':       'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=700&q=80',
};
const NEWS_COLORS = ['#e63946','#f4a261','#a78bfa','#38bdf8','#34d399','#FF5B1D','#fb923c','#60a5fa'];
const NEWS_ICONS  = ['🎭','🎵','🎬','🎪','🎨','🎤','🎧','📸'];
export function getCatImage(cat) {
  const k = (cat||'').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  for (const [key, url] of Object.entries(CAT_IMAGES)) if (k.includes(key)) return url;
  return CAT_IMAGES['DEFAULT'];
}

export async function fetchNews(fallback=[]) {
  const results = [];
  for (const feed of RSS_FEEDS) {
    if (results.length >= 6) break;
    try {
      const r = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&count=4`);
      const d = await r.json();
      if (d.status==='ok' && d.items?.length) {
        for (const item of d.items.slice(0,3)) {
          if (results.length>=6) break;
          const idx=results.length;
          const body=(item.description||item.content||'').replace(/<[^>]+>/g,'').replace(/&[^;]+;/g,' ').replace(/\s+/g,' ').trim().slice(0,160);
          const cat='ENTRETENIMENTO';
          results.push({
            cat, title:item.title, body:body||'Leia mais na fonte.', tag:feed.name,
            source:d.feed?.title||feed.name, color:NEWS_COLORS[idx%NEWS_COLORS.length],
            icon:NEWS_ICONS[idx%NEWS_ICONS.length], image:item.thumbnail||item.enclosure?.link||null,
          });
        }
      }
    } catch {}
  }
  if (results.length<6) results.push(...fallback.slice(0,6-results.length));
  return results.slice(0,6);
}

/* ═══ RADIO — SomaFM HTTPS (ice6) — 100% free, no royalties ═══ */
const STATIONS = [
  { name:'PopTron',       genre:'Synth Pop & Hits',  url:'https://ice6.somafm.com/poptron-128-mp3',      icon:'🔥' },
  { name:'Lush',          genre:'Indie Pop',          url:'https://ice6.somafm.com/lush-128-mp3',         icon:'🌸' },
  { name:'Indie Pop',     genre:'Indie Alternativo',  url:'https://ice6.somafm.com/indiepop-128-mp3',     icon:'🎸' },
  { name:'Left Coast 70s',genre:'Classic Rock 70s',  url:'https://ice6.somafm.com/seventies-128-mp3',    icon:'🤘' },
  { name:'Underground 80',genre:'New Wave 80s',       url:'https://ice6.somafm.com/u80s-128-mp3',         icon:'🎺' },
  { name:'Groove Salad',  genre:'Chill / Ambient',    url:'https://ice6.somafm.com/groovesalad-128-mp3',  icon:'🌿' },
  { name:'Soul Food',     genre:'Soul / Funk / R&B',  url:'https://ice6.somafm.com/soulfood-128-mp3',     icon:'🎷' },
  { name:'Drone Zone',    genre:'Electronic Ambient', url:'https://ice6.somafm.com/dronezone-128-mp3',    icon:'⚡' },
  { name:'Deep Space',    genre:'Space Electronic',   url:'https://ice6.somafm.com/deepspaceone-128-mp3', icon:'🌌' },
];
export async function fetchRadioStations() { return STATIONS; }

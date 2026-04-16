/* ══════════════════════════════════════════
   T.NEWS — EXTERNAL APIs
   Weather (Open-Meteo), News (RSS2JSON), Radio (RadioBrowser)
══════════════════════════════════════════ */
import { CFG } from './config.js';

/* ─── WEATHER ─── */
const WC = {
  0:{i:'☀️',l:'Ensolarado'},1:{i:'🌤',l:'Poucas nuvens'},
  2:{i:'⛅',l:'Parcialmente nublado'},3:{i:'☁️',l:'Nublado'},
  45:{i:'🌫',l:'Neblina'},48:{i:'🌫',l:'Neblina'},
  51:{i:'🌦',l:'Garoa'},53:{i:'🌦',l:'Garoa'},55:{i:'🌧',l:'Garoa forte'},
  61:{i:'🌧',l:'Chuva leve'},63:{i:'🌧',l:'Chuva'},65:{i:'🌧',l:'Chuva forte'},
  80:{i:'🌦',l:'Pancadas'},81:{i:'🌦',l:'Pancadas'},82:{i:'⛈',l:'Tempestade'},
  95:{i:'⛈',l:'Tempestade'},99:{i:'⛈',l:'Tempestade'},
};
export const wcInfo = (code) => WC[code] || { i: '🌡', l: '--' };

export async function fetchWeather() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast`
      + `?latitude=${CFG.WEATHER_LAT}&longitude=${CFG.WEATHER_LNG}`
      + `&current=temperature_2m,weather_code`
      + `&daily=weather_code,temperature_2m_max,temperature_2m_min`
      + `&timezone=America/Sao_Paulo&forecast_days=4`;
    const r = await fetch(url);
    return await r.json();
  } catch { return null; }
}

/* ─── NEWS RSS ─── */
const FEEDS = [
  { url: 'https://g1.globo.com/rss/g1/entretenimento/', name: 'G1' },
  { url: 'https://feeds.folha.uol.com.br/ilustrada/rss091.xml', name: 'Folha' },
  { url: 'https://rss.uol.com.br/feed/entretenimento.xml', name: 'UOL' },
];

const NEWS_COLORS = [
  '#e63946','#f4a261','#a78bfa','#38bdf8','#34d399','#FF5B1D',
  '#fb923c','#60a5fa','#4ade80','#e879f9'
];
const NEWS_ICONS = ['🎭','🎵','🎬','🎪','🎨','🎤','🎧','📸','🎞️','🎶'];

export async function fetchNews(fallback = []) {
  const results = [];
  for (const feed of FEEDS) {
    if (results.length >= 6) break;
    try {
      const r = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&count=6`
      );
      const d = await r.json();
      if (d.status === 'ok' && d.items?.length) {
        for (const item of d.items.slice(0, 3)) {
          const idx = results.length;
          const body = (item.description || item.content || '')
            .replace(/<[^>]+>/g, '')
            .replace(/&[^;]+;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 160);
          results.push({
            cat:    'ENTRETENIMENTO',
            title:  item.title,
            body:   body || 'Leia mais no site.',
            tag:    item.categories?.[0] || feed.name,
            source: d.feed?.title || feed.name,
            color:  NEWS_COLORS[idx % NEWS_COLORS.length],
            icon:   NEWS_ICONS[idx % NEWS_ICONS.length],
            image:  item.thumbnail || item.enclosure?.link || null,
            link:   item.link || null,
          });
          if (results.length >= 6) break;
        }
      }
    } catch { /* continue with next feed */ }
  }
  // Pad with fallback if needed
  if (results.length < 6) {
    const needed = 6 - results.length;
    results.push(...fallback.slice(0, needed));
  }
  return results.slice(0, 6);
}

/* ─── RADIO STATIONS (RadioBrowser API + curated fallback) ─── */
const CURATED_STATIONS = [
  { name: 'Mix FM SP',       genre: 'Pop / Hits',       url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/MIXFM_SPAAC.aac', icon: '🔥' },
  { name: 'ENERGY 97 FM',    genre: 'Electronic / Pop', url: 'https://cast1.hoost.com.br:8085/energy9', icon: '⚡' },
  { name: 'Nova Brasil FM',  genre: 'Pop Brasileiro',   url: 'https://azuracast.novabrasil.com.br/radio/8000/radio.mp3', icon: '🇧🇷' },
  { name: 'Rádio Globo',     genre: 'Pop / MPB',        url: 'https://streams.rds.fm/radioglobo128', icon: '🌟' },
  { name: 'Hit FM',          genre: 'Pop Hits',         url: 'https://hitfm.br/stream', icon: '🎵' },
  { name: 'Groove Salad',    genre: 'Chill / Ambient',  url: 'https://ice1.somafm.com/groovesalad-128-mp3', icon: '🌿' },
  { name: 'PopTron',         genre: 'Pop Electronics',  url: 'https://ice1.somafm.com/poptron-128-mp3', icon: '🎹' },
  { name: 'Lush',            genre: 'Indie Pop',        url: 'https://ice1.somafm.com/lush-128-mp3', icon: '🌸' },
];

export async function fetchRadioStations() {
  try {
    // Try RadioBrowser for popular Brazilian pop stations
    const r = await fetch(
      'https://de1.api.radio-browser.info/json/stations/search?country=Brazil&tag=pop&order=clickcount&reverse=true&limit=4&hidebroken=true&codec=MP3',
      { headers: { 'User-Agent': 'T.News/1.0' } }
    );
    const live = await r.json();
    if (live?.length) {
      const liveStations = live
        .filter(s => s.url_resolved)
        .slice(0, 4)
        .map(s => ({
          name:  s.name.length > 20 ? s.name.slice(0, 20) + '…' : s.name,
          genre: s.tags?.split(',')[0] || 'Pop',
          url:   s.url_resolved,
          icon:  '📻',
        }));
      return [...liveStations, ...CURATED_STATIONS.slice(0, 4)];
    }
  } catch { /* fall through to curated */ }
  return CURATED_STATIONS;
}

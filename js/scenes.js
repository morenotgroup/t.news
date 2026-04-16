/* ══════════════════════════════════════════
   T.NEWS — SCENE RENDERERS
══════════════════════════════════════════ */
import { CFG, foodIcon, todayName, isToday } from './config.js';
import { wcInfo } from './api.js';

/* ─── WELCOME ─── */
export function renderWelcome(weather) {
  const wthHTML = buildWeatherHTML(weather);
  return `
<div class="scene scene-welcome">
  <!-- Animated sky clouds -->
  <div class="wel-sky">
    <div class="wel-cloud"></div>
    <div class="wel-cloud"></div>
    <div class="wel-cloud"></div>
    <div class="wel-cloud"></div>
  </div>
  <div class="wel-vignette"></div>

  <!-- TOP: Welcome text -->
  <div class="wel-top fu1">
    <div class="wel-greeting-label">Canal Interno T.Group</div>
    <div class="wel-greeting">
      Seja bem-vind<span class="wel-hl">o</span>, vind<span class="wel-hl">a</span> e vind<span class="wel-hl">e</span>
    </div>
  </div>

  <!-- MIDDLE: 4 brand logos — large, no boxes -->
  <div class="wel-logos fu2">
    <div class="wel-logo-row">
      <img class="wel-brand-logo"
        src="assets/logos/brands/tyouth.png" alt="T.Youth"
        onerror="this.outerHTML='<span style=font-family:var(--fG);font-size:2.5rem;color:white;font-weight:800;text-shadow:0 2px 20px rgba(0,0,0,.5)>T.Youth</span>'">
      <img class="wel-brand-logo"
        src="assets/logos/brands/tdreams.png" alt="T.Dreams"
        onerror="this.outerHTML='<span style=font-family:var(--fG);font-size:2.5rem;color:white;font-weight:800;text-shadow:0 2px 20px rgba(0,0,0,.5)>T.Dreams</span>'">
      <img class="wel-brand-logo"
        src="assets/logos/brands/tbrands.png" alt="T.Brands"
        onerror="this.outerHTML='<span style=font-family:var(--fG);font-size:2.5rem;color:white;font-weight:800;text-shadow:0 2px 20px rgba(0,0,0,.5)>T.Brands</span>'">
      <img class="wel-brand-logo"
        src="assets/logos/brands/tvenues.png" alt="T.Venues"
        onerror="this.outerHTML='<span style=font-family:var(--fG);font-size:2.5rem;color:white;font-weight:800;text-shadow:0 2px 20px rgba(0,0,0,.5)>T.Venues</span>'">
    </div>
  </div>

  <!-- BOTTOM: Cinematic weather widget -->
  <div class="wel-bottom fu3">
    ${wthHTML}
  </div>
</div>`;
}

function buildWeatherHTML(weather) {
  if (!weather) {
    return `<div class="weather-card">
      <div class="wth-current">
        <span class="wth-icon">🌡</span>
        <div class="wth-main">
          <div class="wth-temp">--°C</div>
          <div class="wth-cond">São Paulo, SP</div>
        </div>
      </div>
      <div class="wth-divider"></div>
      <div class="wth-forecast">
        <div class="wth-day-card"><div class="wth-day-name">--</div><div class="wth-day-ic">🌡</div><div class="wth-day-max">--°</div><div class="wth-day-min">--°</div></div>
        <div class="wth-day-card"><div class="wth-day-name">--</div><div class="wth-day-ic">🌡</div><div class="wth-day-max">--°</div><div class="wth-day-min">--°</div></div>
        <div class="wth-day-card"><div class="wth-day-name">--</div><div class="wth-day-ic">🌡</div><div class="wth-day-max">--°</div><div class="wth-day-min">--°</div></div>
      </div>
    </div>`;
  }
  const cur = weather.current;
  const d   = weather.daily;
  const wi  = wcInfo(cur.weather_code);
  const days = [1, 2, 3].map(i => {
    const dd = new Date(); dd.setDate(dd.getDate() + i);
    const di = wcInfo(d.weather_code[i]);
    return `<div class="wth-day-card">
      <div class="wth-day-name">${CFG.DAYS_S[dd.getDay()]}</div>
      <div class="wth-day-ic">${di.i}</div>
      <div class="wth-day-max">${Math.round(d.temperature_2m_max[i])}°</div>
      <div class="wth-day-min">${Math.round(d.temperature_2m_min[i])}°</div>
    </div>`;
  }).join('');
  return `<div class="weather-card">
    <div class="wth-current">
      <span class="wth-icon">${wi.i}</span>
      <div class="wth-main">
        <div class="wth-temp">${Math.round(cur.temperature_2m)}°C</div>
        <div class="wth-cond">${wi.l} &nbsp;·&nbsp; ${CFG.WEATHER_CITY}</div>
      </div>
    </div>
    <div class="wth-divider"></div>
    <div class="wth-forecast">${days}</div>
  </div>`;
}

/* ─── BOAS-VINDAS ─── */
export function renderNewcomer(person, allPeople, currentIndex, mes, ano) {
  const hl = person.genero === 'f'
    ? 'bem-<br>vinda<span class="nc-excl">!</span>'
    : 'bem-<br>vindo<span class="nc-excl">!</span>';

  const rowText = 'bem-vindo! bem-vinda! bem-vindo! bem-vinda! bem-vindo! bem-vinda! ';
  // TV-safe: only 8 rows (16 causes GPU drop on WebOS/Android TV)
  const rows = Array(8).fill(null).map(() =>
    `<div class="nc-bg-row">${rowText + rowText + rowText}</div>`
  ).join('');

  const init = (person.name || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const photoHTML = person.photo
    ? `<img class="nc-photo-img" src="${person.photo}" alt="${person.name}"
         onerror="this.outerHTML='<div class=nc-photo-init>${init}</div>'">`
    : `<div class="nc-photo-init">${init}</div>`;

  const dots = allPeople.length > 1
    ? `<div class="nc-dots fu5">
        ${allPeople.map((_, i) =>
          `<div class="nc-dot${i === currentIndex ? ' on' : ''}" onclick="window.__jumpNC(${i})"></div>`
        ).join('')}
      </div>`
    : '';

  return `
<div class="scene scene-welcome-person">
  <div class="nc-bg">${rows}</div>
  <div class="nc-photo-side fu2">${photoHTML}</div>
  <div class="nc-text-side">
    <div class="nc-eyebrow fu1">Novo Colaborador · ${mes} ${ano}</div>
    <div class="nc-headline fu2">${hl}</div>
    <div class="nc-name fu3">${person.name}</div>
    <div class="nc-role fu4">${person.role} &nbsp;·&nbsp; ${person.dept}</div>
    <div class="fu4"><div class="nc-badge">${person.dept}</div></div>
    ${dots}
  </div>
</div>`;
}

/* ─── ANIVERSÁRIOS ─── */
export function renderBirthday(person, allPeople, currentIndex, mes) {
  const isBday = isToday(person.day, person.month);
  const init = (person.firstname || '??').slice(0, 2).toUpperCase();
  const photoHTML = person.photo
    ? `<img class="pol-photo" src="${person.photo}" alt="${person.name}"
         onerror="this.outerHTML='<div class=pol-initials>${init}</div>'">`
    : `<div class="pol-initials">${init}</div>`;

  const svgLines = Array.from({ length: 18 }, (_, i) =>
    `<ellipse cx="${260+i*92}" cy="540" rx="${48+i*13}" ry="${440+i*8}" fill="none" stroke="#8B5E3C" stroke-width=".7"/>`
  ).join('');

  const dots = allPeople.map((_, i) =>
    `<div class="bday-dot${i === currentIndex ? ' on' : ''}" onclick="window.__jumpBD(${i})"></div>`
  ).join('');

  return `
<div class="scene scene-birthday">
  <div class="bday-bg">
    <svg viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">${svgLines}</svg>
  </div>

  <div class="bday-photo-side fu2">
    <div class="polaroid">
      <div class="pol-stripe"><div></div><div></div><div></div><div></div></div>
      ${photoHTML}
      <div class="pol-caption">
        <div class="pol-date">${person.date}</div>
        <div class="pol-brand">t.group</div>
      </div>
    </div>
  </div>

  <div class="bday-text-side">
    <div class="bday-eyebrow fu1">Aniversariantes de ${mes}</div>
    <div class="bday-message fu2">feliz<br>aniversário!</div>
    <div class="bday-firstname fu3">${person.firstname}</div>
    <div class="bday-dept fu4">${person.dept}</div>
    <div class="bday-date fu4">${person.date}</div>
    ${isBday ? '<div class="bday-today-pill fu4">🎉 Hoje é o seu dia!</div>' : ''}
    <div class="bday-dots fu5">${dots}</div>
  </div>
</div>`;
}

/* ─── CARDÁPIO ─── */
export function renderMenu(menuData) {
  const day = todayName();
  const m = menuData[day] || menuData['Quarta'] || { main: [], salad: [] };
  const allDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  const weekStrip = allDays.map(d => {
    const dm = menuData[d] || { main: [], salad: [] };
    return `<div class="menu-day${d === day ? ' today' : ''}">
      <div class="menu-day-name">${d}</div>
      <div class="menu-day-items">${dm.main.slice(0, 3).join(' · ')}</div>
    </div>`;
  }).join('');

  const mainItems = m.main.map(x =>
    `<div class="menu-item"><span class="menu-emoji">${foodIcon(x)}</span>${x}</div>`
  ).join('');
  const saladItems = m.salad.map(x =>
    `<div class="menu-item"><span class="menu-emoji">${foodIcon(x)}</span>${x}</div>`
  ).join('');

  return `
<div class="scene scene-menu fu1">
  <div class="menu-bg-glow"></div>
  <div class="menu-inner">
    <div class="menu-eyebrow fu1">Refeitório T.Group</div>
    <div class="menu-title fu2">Cardápio de <span class="menu-title-day">${day}</span></div>
    <div class="menu-sub fu2">Chef Adriana &nbsp;·&nbsp; Almoço 12h30 – 14h30 &nbsp;·&nbsp; Confirme presença na enquete do WhatsApp 📲</div>
    <div class="menu-grid fu3">
      <div class="menu-col">
        <div class="menu-col-header">🍽️ &nbsp;Prato Principal</div>
        ${mainItems}
      </div>
      <div class="menu-col">
        <div class="menu-col-header">🥗 &nbsp;Saladas &amp; Guarnições</div>
        ${saladItems}
      </div>
    </div>
    <div class="menu-week fu4">${weekStrip}</div>
    <div class="menu-notice fu5">
      <span>⚠️</span>
      <span>Restrições alimentares? Comunique imediatamente à equipe de <strong>Facilities</strong>.</span>
    </div>
  </div>
</div>`;
}

/* ─── AGENDA ─── */
export function renderEvents(events, mes, ano) {
  const now = new Date();
  const sorted = [...events].sort((a, b) =>
    new Date(a.year, a.month - 1, a.day) - new Date(b.year, b.month - 1, b.day)
  );

  const cards = sorted.map(e => {
    const ed = new Date(e.year, e.month - 1, e.day);
    const past = ed < new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const soon = !past && (ed - now) < 5 * 864e5;
    const typeLabel = e.type === 'gc' ? 'Gente & Cultura' : (e.company || 'T.Group');
    return `
    <div class="ev-card${soon ? ' soon' : ''}" style="opacity:${past ? .42 : 1}">
      <div class="ev-icon-box" style="background:${e.color}1e;border:1.5px solid ${e.color}44">
        ${e.ic}
      </div>
      <div class="ev-info">
        <div class="ev-meta">
          <span class="ev-date-pill" style="background:${e.color}1a;color:${e.color};border:1.5px solid ${e.color}44">
            ${String(e.day).padStart(2,'0')}/${String(e.month).padStart(2,'0')} · ${CFG.DAYS[ed.getDay()]}
          </span>
          <span class="ev-type-pill" style="color:var(--dim);background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08)">
            ${typeLabel}
          </span>
          ${soon ? `<span class="ev-type-pill" style="color:${e.color};background:${e.color}1a;border-color:${e.color}44">Em breve</span>` : ''}
        </div>
        <div class="ev-title">${e.title}</div>
        <div class="ev-desc">${e.desc}</div>
      </div>
      <div class="ev-time">${e.time}</div>
    </div>`;
  }).join('');

  // Diagonal SVG lines background
  const lines = Array.from({ length: 10 }, (_, i) =>
    `<line x1="${-80+i*260}" y1="0" x2="${650+i*160}" y2="1080" stroke="rgba(155,69,255,.22)" stroke-width="${.8+i*.25}"/>`
  ).join('');

  return `
<div class="scene scene-events fu1">
  <div class="ev-bg-deco"></div>
  <svg class="ev-lines" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg"
    style="position:absolute;inset:0;width:100%;height:100%;opacity:.07;pointer-events:none">
    ${lines}
  </svg>
  <div class="ev-left-panel">
    <div class="ev-eyebrow fu1">Agenda</div>
    <div class="fu2">
      <div class="ev-month">${mes}</div>
      <div class="ev-year">${ano}</div>
    </div>
    <div class="ev-rule fu3"></div>
    <div class="ev-legend fu4">
      <div class="ev-legend-item"><div class="ev-legend-dot" style="background:var(--or)"></div>Gente &amp; Cultura</div>
      <div class="ev-legend-item"><div class="ev-legend-dot" style="background:var(--vn)"></div>Eventos das Empresas</div>
    </div>
  </div>
  <div class="ev-right-panel fu3">${cards}</div>
</div>`;
}

/* ─── NOTÍCIAS — 6-tile grid ─── */
export function renderNews(newsItems) {
  const tiles = newsItems.slice(0, 6).map((n, i) => {
    const bgStyle = n.image
      ? `background:linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.5) 50%, rgba(0,0,0,.25) 100%), url('${n.image}') center/cover`
      : `background:linear-gradient(135deg, ${n.color}cc, ${n.color}44)`;

    return `
    <div class="news-tile fu${(i % 3) + 1}">
      <div class="news-tile-bg" style="${bgStyle}"></div>
      <div class="news-tile-overlay"></div>
      <div class="news-tile-pattern">${n.icon}</div>
      <div class="news-tile-content">
        <span class="news-tile-cat" style="border-color:${n.color}66;color:${n.color}">${n.cat}</span>
        <div class="news-tile-headline">${n.title}</div>
        <div class="news-tile-footer">
          <span class="news-tile-source">${n.source}</span>
          <span class="news-tile-num">0${i + 1}</span>
        </div>
      </div>
    </div>`;
  }).join('');

  return `
<div class="scene scene-news fu1">
  <div class="news-header">
    <div>
      <div class="news-eyebrow">T.News</div>
      <div class="news-title-bar">Entretenimento &amp; Cultura</div>
    </div>
    <div class="news-source-tag">Atualizado automaticamente</div>
  </div>
  <div class="news-grid">${tiles}</div>
</div>`;
}
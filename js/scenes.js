import { CFG, foodIcon, todayName, todayNamePT, isToday, pad2 } from './config.js';
import { wcInfo, getCatImage } from './api.js';

/* ── WELCOME ── */
export function renderWelcome(weather) {
  return `<div class="scene scene-welcome">
  <div class="wel-sky"><div class="wel-cloud"></div><div class="wel-cloud"></div><div class="wel-cloud"></div></div>
  <div class="wel-vignette"></div>
  <div class="wel-top fu1">
    <div class="wel-greeting-label">Canal Interno T.Group</div>
    <div class="wel-greeting">Seja bem-vind<span class="wel-hl">o</span>, vind<span class="wel-hl">a</span> e vind<span class="wel-hl">e</span></div>
  </div>
  <div class="wel-logos fu2">
    <div class="wel-logo-row">
      <img class="wel-brand-logo" src="assets/logos/brands/tyouth.png" alt="T.Youth" onerror="this.outerHTML='<span style=font-family:var(--fG);font-size:2rem;color:white;font-weight:800>T.Youth</span>'">
      <img class="wel-brand-logo" src="assets/logos/brands/tdreams.png" alt="T.Dreams" onerror="this.outerHTML='<span style=font-family:var(--fG);font-size:2rem;color:white;font-weight:800>T.Dreams</span>'">
      <img class="wel-brand-logo" src="assets/logos/brands/tbrands.png" alt="T.Brands" onerror="this.outerHTML='<span style=font-family:var(--fG);font-size:2rem;color:white;font-weight:800>T.Brands</span>'">
      <img class="wel-brand-logo" src="assets/logos/brands/tvenues.png" alt="T.Venues" onerror="this.outerHTML='<span style=font-family:var(--fG);font-size:2rem;color:white;font-weight:800>T.Venues</span>'">
    </div>
  </div>
  <div class="wel-bottom fu3">${buildWeatherHTML(weather)}</div>
</div>`;
}
function buildWeatherHTML(w) {
  if (!w) return `<div class="weather-card"><div class="wth-current"><span class="wth-icon">🌡</span><div><div class="wth-temp">--°C</div><div class="wth-cond">Carregando...</div></div></div><div class="wth-divider"></div><div class="wth-forecast"><div class="wth-day-card"><div class="wth-day-name">--</div><div class="wth-day-ic">🌡</div><div class="wth-day-max">--°</div><div class="wth-day-min">--°</div></div><div class="wth-day-card"><div class="wth-day-name">--</div><div class="wth-day-ic">🌡</div><div class="wth-day-max">--°</div><div class="wth-day-min">--°</div></div><div class="wth-day-card"><div class="wth-day-name">--</div><div class="wth-day-ic">🌡</div><div class="wth-day-max">--°</div><div class="wth-day-min">--°</div></div></div></div>`;
  const cur=w.current, d=w.daily, wi=wcInfo(cur.weather_code);
  const days=[1,2,3].map(i=>{const dd=new Date();dd.setDate(dd.getDate()+i);const di=wcInfo(d.weather_code[i]);
    return`<div class="wth-day-card"><div class="wth-day-name">${CFG.DAYS_S[dd.getDay()]}</div><div class="wth-day-ic">${di.i}</div><div class="wth-day-max">${Math.round(d.temperature_2m_max[i])}°</div><div class="wth-day-min">${Math.round(d.temperature_2m_min[i])}°</div></div>`;}).join('');
  return `<div class="weather-card"><div class="wth-current"><span class="wth-icon">${wi.i}</span><div><div class="wth-temp">${Math.round(cur.temperature_2m)}°C</div><div class="wth-cond">${wi.l} &nbsp;·&nbsp; ${CFG.WEATHER_CITY}</div></div></div><div class="wth-divider"></div><div class="wth-forecast">${days}</div></div>`;
}

/* ── BOAS-VINDAS ── */
export function renderNewcomer(person, all, idx, mes, ano) {
  const hl = person.genero==='f'?'bem-<br>vinda<span class="nc-excl">!</span>':'bem-<br>vindo<span class="nc-excl">!</span>';
  const row='bem-vindo! bem-vinda! bem-vindo! bem-vinda! bem-vindo! bem-vinda! ';
  const rows=Array(8).fill(`<div class="nc-bg-row">${row+row+row}</div>`).join('');
  const init=(person.name||'').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  const photo=person.photo?`<img class="nc-photo-img" src="${person.photo}" alt="${person.name}" onerror="this.outerHTML='<div class=nc-photo-init>${init}</div>'">`:`<div class="nc-photo-init">${init}</div>`;
  const dots=all.length>1?`<div class="nc-dots">${all.map((_,i)=>`<div class="ncd${i===idx?' on':''}" onclick="window.__jumpNC(${i})"></div>`).join('')}</div>`:'';
  return `<div class="scene scene-welcome-person"><div class="nc-bg">${rows}</div>
  <div class="nc-photo-side fu2">${photo}</div>
  <div class="nc-text-side">
    <div class="nc-eyebrow fu1">Novo Colaborador · ${mes} ${ano}</div>
    <div class="nc-headline fu2">${hl}</div>
    <div class="nc-name fu3">${person.name}</div>
    <div class="nc-role fu4">${person.role} &nbsp;·&nbsp; ${person.dept}</div>
    <div class="fu4"><div class="nc-badge">${person.dept}</div></div>
    ${all.length>1?`<div class="fu5">${dots}</div>`:''}
  </div></div>`;
}

/* ── ANIVERSÁRIOS ── */
export function renderBirthday(person, all, idx, mes) {
  const isBday=isToday(person.day,person.month);
  const init=(person.firstname||'??').slice(0,2).toUpperCase();
  const photo=person.photo?`<img class="pol-photo" src="${person.photo}" alt="${person.name}" onerror="this.outerHTML='<div class=pol-initials>${init}</div>'">`:`<div class="pol-initials">${init}</div>`;
  const svg=Array.from({length:16},(_,i)=>`<ellipse cx="${260+i*90}" cy="540" rx="${48+i*13}" ry="${440+i*8}" fill="none" stroke="#8B5E3C" stroke-width=".7"/>`).join('');
  const dots=all.map((_,i)=>`<div class="bday-dot${i===idx?' on':''}" onclick="window.__jumpBD(${i})"></div>`).join('');
  return `<div class="scene scene-birthday">
  <div class="bday-bg"><svg viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">${svg}</svg></div>
  <div class="bday-photo-side fu2"><div class="polaroid">
    <div class="pol-stripe"><div></div><div></div><div></div><div></div></div>
    ${photo}<div class="pol-caption"><div class="pol-date">${person.date}</div><div class="pol-brand">t.group</div></div>
  </div></div>
  <div class="bday-text-side">
    <div class="bday-eyebrow fu1">Aniversariantes de ${mes}</div>
    <div class="bday-message fu2">feliz<br>aniversario!</div>
    <div class="bday-firstname fu3">${person.firstname}</div>
    <div class="bday-dept fu4">${person.dept}</div>
    <div class="bday-date fu4">${person.date}</div>
    ${isBday?'<div class="bday-today-pill fu4">🎉 Hoje é o seu dia!</div>':''}
    <div class="bday-dots fu5">${dots}</div>
  </div></div>`;
}

/* ── CARDÁPIO ── */
export function renderMenu(menuData) {
  const day=todayName(), dayPT=todayNamePT();
  /* fallback: try normalized day name */
  const m=menuData[day]||menuData[dayPT]||Object.values(menuData)[0]||{main:[],salad:[]};
  const allDays=['Segunda','Terca','Quarta','Quinta','Sexta'];
  const allDaysPT=['Segunda','Terça','Quarta','Quinta','Sexta'];
  const strip=allDays.map((d,i)=>{const dm=menuData[d]||menuData[allDaysPT[i]]||{main:[],salad:[]};
    return`<div class="menu-day${(d===day||allDaysPT[i]===dayPT)?' today':''}"><div class="menu-day-name">${allDaysPT[i]}</div><div class="menu-day-items">${dm.main.slice(0,3).join(' · ')}</div></div>`;}).join('');
  return `<div class="scene scene-menu fu1">
  <div class="menu-bg-glow"></div>
  <div class="menu-inner">
    <div class="menu-eyebrow">Refeitório T.Group</div>
    <div class="menu-title">Cardápio de <span class="menu-title-day">${dayPT}</span></div>
    <div class="menu-sub">Chef Adriana &nbsp;·&nbsp; Almoço 12h30 – 14h30 &nbsp;·&nbsp; Confirme na enquete do WhatsApp 📲</div>
    <div class="menu-grid fu2">
      <div class="menu-col"><div class="menu-col-header">🍽️ &nbsp;Prato Principal</div>${m.main.map(x=>`<div class="menu-item"><span class="menu-emoji">${foodIcon(x)}</span>${x}</div>`).join('')}</div>
      <div class="menu-col"><div class="menu-col-header">🥗 &nbsp;Saladas &amp; Guarnições</div>${m.salad.map(x=>`<div class="menu-item"><span class="menu-emoji">${foodIcon(x)}</span>${x}</div>`).join('')}</div>
    </div>
    <div class="menu-week fu3">${strip}</div>
    <div class="menu-notice fu4"><span>⚠️</span><span>Restrições alimentares? Comunique imediatamente à equipe de <strong>Facilities</strong>.</span></div>
  </div></div>`;
}

/* ── AGENDA ── */
export function renderEvents(events, mes, ano) {
  const now=new Date();
  const sorted=[...events].sort((a,b)=>new Date(a.year,a.month-1,a.day)-new Date(b.year,b.month-1,b.day));
  const cards=sorted.map(e=>{
    const ed=new Date(e.year,e.month-1,e.day);
    const past=ed<new Date(now.getFullYear(),now.getMonth(),now.getDate());
    const soon=!past&&(ed-now)<5*864e5;
    const tl=e.type==='gc'?'Gente & Cultura':(e.company||'T.Group');
    return`<div class="ev-card${soon?' soon':''}" style="opacity:${past?.42:1}">
      <div class="ev-icon-box" style="background:${e.color}1e;border:1.5px solid ${e.color}44">${e.ic}</div>
      <div class="ev-info"><div class="ev-meta">
        <span class="ev-date-pill" style="background:${e.color}1a;color:${e.color};border:1.5px solid ${e.color}44">${pad2(e.day)}/${pad2(e.month)} · ${CFG.DAYS_PT[ed.getDay()]}</span>
        <span class="ev-type-pill" style="color:var(--dim);background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08)">${tl}</span>
        ${soon?`<span class="ev-type-pill" style="color:${e.color};background:${e.color}1a;border-color:${e.color}44">Em breve</span>`:''}
      </div><div class="ev-title">${e.title}</div><div class="ev-desc">${e.desc}</div></div>
      <div class="ev-time">${e.time}</div></div>`;
  }).join('');
  const lines=Array.from({length:8},(_,i)=>`<line x1="${-80+i*260}" y1="0" x2="${650+i*160}" y2="1080" stroke="rgba(155,69,255,.22)" stroke-width="${.8+i*.25}"/>`).join('');
  return `<div class="scene scene-events fu1">
  <div class="ev-bg-deco"></div>
  <svg class="ev-lines" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;pointer-events:none">${lines}</svg>
  <div class="ev-left-panel">
    <div class="ev-eyebrow fu1">Agenda</div>
    <div class="fu2"><div class="ev-month">${mes}</div><div class="ev-year">${ano}</div></div>
    <div class="ev-rule fu3"></div>
    <div class="ev-legend fu4">
      <div class="ev-legend-item"><div class="ev-legend-dot" style="background:var(--or)"></div>Gente &amp; Cultura</div>
      <div class="ev-legend-item"><div class="ev-legend-dot" style="background:var(--vn)"></div>Eventos das Empresas</div>
    </div>
  </div>
  <div class="ev-right-panel fu3">${cards}</div></div>`;
}

/* ── NOTÍCIAS — 6 tiles com imagem de fundo ── */
export function renderNews(news) {
  const tiles=news.slice(0,6).map((n,i)=>{
    const imgUrl=n.image||getCatImage(n.cat||'');
    const bgStyle=`background:linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.4) 50%, transparent 100%), url('${imgUrl}') center/cover no-repeat`;
    return`<div class="news-tile fu${(i%3)+1}">
      <div class="news-tile-bg" style="${bgStyle}"></div>
      <div class="news-tile-ic">${n.icon}</div>
      <div class="news-tile-content">
        <span class="news-tile-cat" style="border-color:${n.color}66;color:${n.color}">${n.cat}</span>
        <div class="news-tile-headline">${n.title}</div>
        <div class="news-tile-footer">
          <span class="news-tile-source">${n.source}</span>
          <span class="news-tile-num">0${i+1}</span>
        </div>
      </div></div>`;}).join('');
  return `<div class="scene scene-news fu1">
  <div class="news-hdr">
    <div><div class="news-eyebrow">T.News</div><div class="news-title-bar">Entretenimento &amp; Cultura</div></div>
    <div class="news-src-tag">Atualizado automaticamente</div>
  </div>
  <div class="news-grid">${tiles}</div></div>`;
}

/* ── HIGHLIGHTS ── */
export function renderHighlights(items, idx) {
  if (!items || !items.length) {
    return`<div class="scene scene-highlights"><div style="position:relative;z-index:2;text-align:center"><div class="hl-coming-soon"><div class="hl-cs-title">EM BREVE</div><div style="font-family:var(--fS);font-size:var(--t-label);letter-spacing:.3em;color:rgba(255,255,255,.25);text-transform:uppercase;margin-top:12px">Highlights das Empresas</div></div></div></div>`;
  }
  const item=items[idx%items.length];
  const dots=items.map((_,i)=>`<div class="hld${i===idx?' on':''}"></div>`).join('');
  return `<div class="scene scene-highlights">
  <div class="hl-bg"><img class="hl-img" src="${item.image}" alt="${item.label}" onerror="this.style.opacity='.2'"></div>
  <div class="hl-overlay"></div>
  <div class="hl-footer">
    <div><div class="hl-company fu1">${item.company}</div><div class="hl-label fu2">${item.label}</div></div>
    <div class="hl-dots fu3">${dots}</div>
  </div></div>`;
}

/* ── GINGA / COPA ── */
export function renderGinga(ginga, flyerIdx) {
  if (!ginga) return `<div class="scene scene-ginga"><div style="position:relative;z-index:2;font-family:var(--fG);font-size:4rem;color:rgba(255,215,0,.2)">GINGA 2026</div></div>`;
  const flyers=ginga.flyers||[];
  const flyer=flyers[flyerIdx%Math.max(flyers.length,1)];
  const countdown=buildCountdown(ginga.copa_inicio, ginga.ginga_inicio);
  const dots=flyers.length>1?`<div class="ginga-dots-row">${flyers.map((_,i)=>`<div class="gingad${i===flyerIdx?' on':''}"></div>`).join('')}</div>`:'';
  return `<div class="scene scene-ginga">
  <div class="ginga-bg">${flyer?`<img class="ginga-flyer" src="${flyer}" alt="Ginga SP" onerror="this.style.opacity='.2'">`:''}
  </div>
  <div class="ginga-overlay"></div>
  <div class="ginga-side-panel">
    <div class="ginga-eye fu1">${ginga.subtitulo||'T.Group Apresenta'}</div>
    <img class="ginga-logo fu2" src="assets/ginga/logo_principal.png" alt="Ginga SP" onerror="this.style.display='none'">
    <div class="ginga-title fu2">${ginga.titulo}</div>
    <div class="ginga-local fu3">📍 ${ginga.local}</div>
    <div class="ginga-ctdwn fu3">${countdown}</div>
    ${dots}
  </div></div>`;
}

function buildCountdown(copaISO, gingaISO) {
  const now=Date.now();
  const copa=new Date(copaISO).getTime();
  const ginga=new Date(gingaISO).getTime();
  /* Show Copa countdown if Copa hasn't started, else Ginga */
  const target=now<copa?copa:ginga;
  const label=now<copa?'Copa 2026':'Ginga SP';
  if (now>ginga) return `<div class="ctd-block"><div class="ctd-num">🎉</div><div class="ctd-lbl">Já Começou!</div></div>`;
  const diff=target-now;
  const days=Math.floor(diff/864e5);
  const hours=Math.floor((diff%864e5)/36e5);
  const mins=Math.floor((diff%36e5)/6e4);
  return `
    <div style="font-family:var(--fS);font-size:var(--t-label);letter-spacing:.26em;text-transform:uppercase;color:rgba(255,215,0,.7);margin-bottom:6px">${label}</div>
    <div class="ginga-ctdwn">
      <div class="ctd-block"><div class="ctd-num">${pad2(days)}</div><div class="ctd-lbl">Dias</div></div>
      <div class="ctd-block"><div class="ctd-num">${pad2(hours)}</div><div class="ctd-lbl">Horas</div></div>
      <div class="ctd-block"><div class="ctd-num">${pad2(mins)}</div><div class="ctd-lbl">Min</div></div>
    </div>`;
}

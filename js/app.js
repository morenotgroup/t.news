/* ══════════════════════════════════════════
   T.NEWS — MAIN APP CONTROLLER
══════════════════════════════════════════ */
import { CFG, isToday, todayName } from './config.js';
import { fetchWeather, fetchNews } from './api.js';
import { Player } from './player.js';
import {
  renderWelcome, renderNewcomer, renderBirthday,
  renderMenu, renderEvents, renderNews
} from './scenes.js';

/* ─── LOAD DATA ─── */
async function loadContent() {
  const r = await fetch('data/content.json');
  return await r.json();
}

/* ─── CLOCK ─── */
function startClock() {
  const tick = () => {
    const n   = new Date();
    const hh  = String(n.getHours()).padStart(2, '0');
    const mm  = String(n.getMinutes()).padStart(2, '0');
    const day = CFG.DAYS[n.getDay()];
    const mon = CFG.MONTHS[n.getMonth()];
    document.getElementById('clock-time').textContent = `${hh}:${mm}`;
    document.getElementById('clock-date').textContent = `${day}, ${n.getDate()} de ${mon}`;
  };
  tick();
  setInterval(tick, 1000);
}

/* ─── TICKER ─── */
function buildTicker(news) {
  const items = [...news, ...news].map(n => `
    <span class="tk-item">
      <span class="tk-bullet" style="background:${n.color}"></span>
      <span class="tk-cat" style="color:${n.color}">${n.cat}</span>
      <span class="tk-mid">·</span>
      <span class="tk-headline">${n.title}</span>
      <span class="tk-mid">—</span>
      <span class="tk-source">${n.source}</span>
    </span>`).join('');
  document.getElementById('ticker-track').innerHTML = items;
}

/* ─── CONFETTI ─── */
function launchConfetti() {
  const colors = ['#FF5B1D','#FFAA00','#7AC231','#2B72FF','#9B45FF','#F5F5F5','#FF8A5E'];
  for (let i = 0; i < 80; i++) {
    const e = document.createElement('div');
    const sz = 6 + Math.random() * 10;
    const clr = colors[Math.floor(Math.random() * colors.length)];
    const dur = 2 + Math.random() * 3;
    const dl  = Math.random() * .9;
    e.style.cssText = [
      'position:fixed', 'pointer-events:none', 'z-index:996',
      `left:${Math.random() * 100}%`, 'top:0',
      `width:${sz}px`, `height:${sz}px`,
      `background:${clr}`,
      `border-radius:${Math.random() > .5 ? '50%' : '3px'}`,
      `animation:confetti ${dur}s ${dl}s linear both`,
    ].join(';');
    document.body.appendChild(e);
    setTimeout(() => e.remove(), (dur + dl + .5) * 1000);
  }
}

/* ─── MAIN APP ─── */
class App {
  constructor(content, weather, news) {
    this.C       = content;
    this.weather = weather;
    this.news    = news;
    this.scenes  = this._buildSceneList();
    this.scIdx   = 0;
    this.ncIdx   = 0;   // persists across scene visits
    this.bdIdx   = 0;   // persists across scene visits
    this.transitioning = false;
    this.timers  = {};
    this._wrap   = document.getElementById('scene-wrap');
    this._curtain = document.getElementById('curtain');
    this._newsRefreshTimer = null;
  }

  _buildSceneList() {
    const s = ['welcome'];
    if (this.C.newcomers?.length) s.push('newcomers');
    if (this.C.birthdays?.length) s.push('birthday');
    s.push('menu');
    if (this.C.events?.length) s.push('events');
    s.push('news');
    return s;
  }

  // Which scene label to show in footer
  _sceneLabel(name) {
    return {
      welcome: 'WELCOME', newcomers: 'BOAS-VINDAS', birthday: 'ANIVERSÁRIOS',
      menu: 'CARDÁPIO', events: 'AGENDA', news: 'T.NEWS',
    }[name] || name.toUpperCase();
  }

  // Scene duration — scales with number of items
  _scDur(name) {
    if (name === 'newcomers') {
      const n = Math.min(CFG.NC_ITEMS_VISIT, this.C.newcomers.length);
      return n * CFG.NC_ITEM_DUR + 1000;
    }
    if (name === 'birthday') {
      const n = Math.min(CFG.BD_ITEMS_VISIT, this.C.birthdays.length);
      return n * CFG.BD_ITEM_DUR + 1000;
    }
    return CFG.SCENE_DUR;
  }

  render() {
    const name = this.scenes[this.scIdx];
    let html = '';

    switch (name) {
      case 'welcome':
        html = renderWelcome(this.weather);
        break;
      case 'newcomers':
        html = renderNewcomer(
          this.C.newcomers[this.ncIdx],
          this.C.newcomers, this.ncIdx,
          this.C.meta.mes, this.C.meta.ano
        );
        break;
      case 'birthday':
        html = renderBirthday(
          this.C.birthdays[this.bdIdx],
          this.C.birthdays, this.bdIdx,
          this.C.meta.mes
        );
        break;
      case 'menu':
        html = renderMenu(this.C.menu);
        break;
      case 'events':
        html = renderEvents(this.C.events, this.C.meta.mes, this.C.meta.ano);
        break;
      case 'news':
        html = renderNews(this.news);
        break;
    }

    this._wrap.innerHTML = html;
    this._wrap.classList.remove('scene-enter');
    void this._wrap.offsetWidth;
    this._wrap.classList.add('scene-enter');

    // Footer indicators
    document.getElementById('scene-indicators').innerHTML =
      this.scenes.map((_, i) =>
        `<div class="si${i === this.scIdx ? ' active' : ''}"></div>`
      ).join('');
    document.getElementById('scene-label').textContent = this._sceneLabel(name);

    // Confetti on today's birthday
    if (name === 'birthday' && this.C.birthdays.some(b => isToday(b.day, b.month))) {
      setTimeout(launchConfetti, 600);
    }
  }

  // Sub-scene crossfade (for carousel items)
  _subFade(updateFn) {
    const el = this._wrap;
    el.style.cssText = 'transition:opacity .3s ease,transform .28s ease;opacity:0;transform:translateY(-10px)';
    setTimeout(() => {
      updateFn();
      el.style.cssText = 'transition:none;opacity:0;transform:translateY(14px)';
      el.offsetHeight;
      el.style.cssText = 'transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1);opacity:1;transform:none';
      setTimeout(() => el.style.cssText = '', 580);
    }, 310);
  }

  // Curtain transition between main scenes
  transition(updateFn) {
    if (this.transitioning) return;
    this.transitioning = true;
    const c = this._curtain;
    c.classList.remove('up');
    c.classList.add('down');
    setTimeout(() => {
      updateFn();
      c.classList.remove('down');
      c.classList.add('up');
      setTimeout(() => {
        c.classList.remove('up');
        this.transitioning = false;
      }, 400);
    }, 380);
  }

  goNext() {
    clearTimeout(this.timers.sc);
    clearInterval(this.timers.nc);
    clearInterval(this.timers.bd);

    this.transition(() => {
      this.scIdx = (this.scIdx + 1) % this.scenes.length;
      this.render();
      this._startProgress();
      this._scheduleNext();
      this._startSubCarousels();
    });
  }

  _scheduleNext() {
    clearTimeout(this.timers.sc);
    const dur = this._scDur(this.scenes[this.scIdx]);
    this.timers.sc = setTimeout(() => this.goNext(), dur);
    // Also start progress bar
    this._startProgressBar(dur);
  }

  _startProgress() {
    const fill = document.getElementById('progress-fill');
    if (fill) { fill.style.width = '0%'; fill.style.transition = 'none'; }
  }

  _startProgressBar(dur) {
    clearInterval(this.timers.pr);
    const fill = document.getElementById('progress-fill');
    if (!fill) return;
    const start = Date.now();
    this.timers.pr = setInterval(() => {
      const p = Math.min((Date.now() - start) / dur * 100, 100);
      fill.style.cssText = `width:${p}%;transition:none`;
    }, 120);
  }

  _startSubCarousels() {
    const name = this.scenes[this.scIdx];

    if (name === 'newcomers' && this.C.newcomers.length > 1) {
      let shown = 0;
      this.timers.nc = setInterval(() => {
        shown++;
        if (shown >= CFG.NC_ITEMS_VISIT) { clearInterval(this.timers.nc); return; }
        this.ncIdx = (this.ncIdx + 1) % this.C.newcomers.length;
        this._subFade(() => this.render());
      }, CFG.NC_ITEM_DUR);
    }

    if (name === 'birthday' && this.C.birthdays.length > 1) {
      let shown = 0;
      this.timers.bd = setInterval(() => {
        shown++;
        if (shown >= CFG.BD_ITEMS_VISIT) { clearInterval(this.timers.bd); return; }
        this.bdIdx = (this.bdIdx + 1) % this.C.birthdays.length;
        this._subFade(() => {
          this.render();
          if (isToday(this.C.birthdays[this.bdIdx].day, this.C.birthdays[this.bdIdx].month)) {
            setTimeout(launchConfetti, 300);
          }
        });
      }, CFG.BD_ITEM_DUR);
    }
  }

  // Public jump methods (called from onclick in scene HTML)
  jumpNC(i) {
    this.ncIdx = i;
    this._subFade(() => this.render());
  }

  jumpBD(i) {
    this.bdIdx = i;
    this._subFade(() => this.render());
  }

  // Periodic news refresh
  startNewsRefresh() {
    this._newsRefreshTimer = setInterval(async () => {
      try {
        const fresh = await fetchNews(this.C.news_fallback || []);
        if (fresh.length) {
          this.news = fresh;
          buildTicker(fresh);
        }
      } catch {}
    }, CFG.NEWS_REFRESH);
  }

  boot() {
    this.render();
    this._scheduleNext();
    this._startSubCarousels();
    buildTicker(this.news);
    this.startNewsRefresh();
    if (this.C.birthdays.some(b => isToday(b.day, b.month))) {
      setTimeout(launchConfetti, 2500);
    }
  }
}

/* ═══════════════════════════
   ENTRY POINT
═══════════════════════════ */
async function main() {
  startClock();

  // Parallel loads
  const [content, weather] = await Promise.all([
    loadContent(),
    fetchWeather(),
  ]);

  // News (with fallback)
  let news = [];
  try {
    news = await fetchNews(content.news_fallback || []);
  } catch {
    news = content.news_fallback || [];
  }

  // Setup curtain color
  document.getElementById('curtain').style.background = '#FF5B1D';

  // Init player
  const player = new Player();
  window.__player = player;
  document.getElementById('music-toggle').addEventListener('click', () => player.toggle());

  // Init app
  const app = new App(content, weather, news);
  window.__jumpNC = (i) => app.jumpNC(i);
  window.__jumpBD = (i) => app.jumpBD(i);

  app.boot();
}

main().catch(console.error);

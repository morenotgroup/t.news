import { CFG, isToday, pad2 } from './config.js';
import { fetchWeather, fetchNews } from './api.js';
import { Player } from './player.js';
import { renderWelcome, renderNewcomer, renderBirthday, renderMenu, renderEvents, renderNews, renderHighlights, renderGinga } from './scenes.js';

async function loadContent() {
  const r=await fetch('data/content.json');return await r.json();
}
function startClock() {
  const tick=()=>{
    const n=new Date();
    document.getElementById('clock-time').textContent=pad2(n.getHours())+':'+pad2(n.getMinutes());
    document.getElementById('clock-date').textContent=CFG.DAYS_PT[n.getDay()]+', '+n.getDate()+' de '+CFG.MONTHS[n.getMonth()];
  };tick();setInterval(tick,1000);
}
function buildTicker(news) {
  const items=[...news,...news].map(n=>`<span class="tk-item"><span class="tk-bullet" style="background:${n.color}"></span><span class="tk-cat" style="color:${n.color}">${n.cat}</span><span class="tk-sep">·</span><span class="tk-headline">${n.title}</span><span class="tk-sep">—</span><span class="tk-source">${n.source}</span></span>`).join('');
  const el=document.getElementById('ticker-track');if(el)el.innerHTML=items;
}
function launchConfetti() {
  const c=['#FF5B1D','#FFAA00','#7AC231','#2B72FF','#9B45FF','#F5F5F5','#FFD700'];
  for(let i=0;i<80;i++){
    const e=document.createElement('div');const sz=6+Math.random()*10;const dur=2+Math.random()*3;const dl=Math.random()*.9;
    e.style.cssText=`position:fixed;pointer-events:none;z-index:996;left:${Math.random()*100}%;top:0;width:${sz}px;height:${sz}px;background:${c[Math.floor(Math.random()*c.length)]};border-radius:${Math.random()>.5?'50%':'3px'};animation:confetti ${dur}s ${dl}s linear both`;
    document.body.appendChild(e);setTimeout(()=>e.remove(),(dur+dl+.5)*1000);
  }
}
const SC_LABELS={welcome:'WELCOME',newcomers:'BOAS-VINDAS',birthday:'ANIVERSARIOS',menu:'CARDAPIO',events:'AGENDA',news:'T.NEWS',highlights:'HIGHLIGHTS',ginga:'GINGA 2026'};

class App {
  constructor(C,weather,news){
    this.C=C;this.weather=weather;this.news=news;
    this.scenes=this._buildScenes();
    this.scIdx=0;this.ncIdx=0;this.bdIdx=0;this.hlIdx=0;this.giIdx=0;
    this.transitioning=false;this.timers={};
    this._wrap=document.getElementById('scene-wrap');
    this._curtain=document.getElementById('curtain');
  }
  _buildScenes(){
    const s=['welcome'];
    if(this.C.newcomers?.length)s.push('newcomers');
    if(this.C.birthdays?.length)s.push('birthday');
    s.push('menu');
    if(this.C.events?.length)s.push('events');
    s.push('news');
    if(this.C.ginga)s.push('ginga');
    /* highlights only if images exist */
    if(this.C.highlights?.length)s.push('highlights');
    return s;
  }
  _scDur(name){
    if(name==='newcomers')return Math.min(this.C.newcomers.length,CFG.NC_ITEMS_VISIT)*CFG.NC_ITEM_DUR+1000;
    if(name==='birthday') return Math.min(this.C.birthdays.length,CFG.BD_ITEMS_VISIT)*CFG.BD_ITEM_DUR+1000;
    return CFG.SCENE_DUR;
  }
  render(){
    const name=this.scenes[this.scIdx];
    const sl=SC_LABELS[name]||name.toUpperCase();
    document.getElementById('scene-label').textContent=sl;
    document.getElementById('scene-indicators').innerHTML=this.scenes.map((_,i)=>`<div class="si${i===this.scIdx?' active':''}"></div>`).join('');
    let html='';
    switch(name){
      case 'welcome':    html=renderWelcome(this.weather);break;
      case 'newcomers':  html=renderNewcomer(this.C.newcomers[this.ncIdx],this.C.newcomers,this.ncIdx,this.C.meta.mes,this.C.meta.ano);break;
      case 'birthday':   html=renderBirthday(this.C.birthdays[this.bdIdx],this.C.birthdays,this.bdIdx,this.C.meta.mes);break;
      case 'menu':       html=renderMenu(this.C.menu);break;
      case 'events':     html=renderEvents(this.C.events,this.C.meta.mes,this.C.meta.ano);break;
      case 'news':       html=renderNews(this.news);break;
      case 'highlights': html=renderHighlights(this.C.highlights||[],this.hlIdx);break;
      case 'ginga':      html=renderGinga(this.C.ginga,this.giIdx);break;
    }
    this._wrap.innerHTML=html;
    this._wrap.classList.remove('scene-enter');void this._wrap.offsetWidth;this._wrap.classList.add('scene-enter');
    if(name==='birthday'&&this.C.birthdays.some(b=>isToday(b.day,b.month)))setTimeout(launchConfetti,600);
  }
  _subFade(fn){
    /* Smooth opacity-only crossfade - sem translateY para evitar piscar na TV */
    const el=this._wrap;
    el.style.transition='opacity .28s ease';
    el.style.opacity='0';
    setTimeout(()=>{
      fn();
      el.style.transition='none';
      el.style.opacity='0';
      el.offsetHeight;
      el.style.transition='opacity .5s ease';
      el.style.opacity='1';
      setTimeout(()=>{ el.style.transition=''; el.style.opacity=''; },520);
    },290);
  }
  transition(fn){
    if(this.transitioning)return;this.transitioning=true;
    const c=this._curtain;
    c.classList.remove('up'); c.classList.add('down');
    /* wait for fade-to-black (320ms), swap content, then fade out */
    setTimeout(()=>{
      fn();
      c.classList.remove('down'); c.classList.add('up');
      setTimeout(()=>{ c.classList.remove('up'); this.transitioning=false; },360);
    },340);
  }
  goNext(){
    clearTimeout(this.timers.sc);clearInterval(this.timers.nc);clearInterval(this.timers.bd);clearInterval(this.timers.hl);clearInterval(this.timers.gi);
    this.transition(()=>{this.scIdx=(this.scIdx+1)%this.scenes.length;this.render();this._startPr();this._sched();this._startSubs();});
  }
  _sched(){clearTimeout(this.timers.sc);this.timers.sc=setTimeout(()=>this.goNext(),this._scDur(this.scenes[this.scIdx]));}
  _startPr(){
    const fill=document.getElementById('progress-fill');
    if(fill){fill.style.width='0%';fill.style.transition='none';}
    clearInterval(this.timers.pr);
    const dur=this._scDur(this.scenes[this.scIdx]);const start=Date.now();
    this.timers.pr=setInterval(()=>{const p=Math.min((Date.now()-start)/dur*100,100);const f=document.getElementById('progress-fill');if(f)f.style.cssText=`width:${p}%;transition:none`;},120);
  }
  _startSubs(){
    const name=this.scenes[this.scIdx];
    if(name==='newcomers'&&this.C.newcomers.length>1){
      let shown=0;
      this.timers.nc=setInterval(()=>{shown++;if(shown>=CFG.NC_ITEMS_VISIT){clearInterval(this.timers.nc);return;}
        this.ncIdx=(this.ncIdx+1)%this.C.newcomers.length;this._subFade(()=>this.render());},CFG.NC_ITEM_DUR);
    }
    if(name==='birthday'&&this.C.birthdays.length>1){
      let shown=0;
      this.timers.bd=setInterval(()=>{shown++;if(shown>=CFG.BD_ITEMS_VISIT){clearInterval(this.timers.bd);return;}
        this.bdIdx=(this.bdIdx+1)%this.C.birthdays.length;this._subFade(()=>{this.render();if(isToday(this.C.birthdays[this.bdIdx].day,this.C.birthdays[this.bdIdx].month))setTimeout(launchConfetti,300);});},CFG.BD_ITEM_DUR);
    }
    if(name==='highlights'&&(this.C.highlights||[]).length>1){
      this.timers.hl=setInterval(()=>{this.hlIdx=(this.hlIdx+1)%(this.C.highlights||[]).length;this._subFade(()=>this.render());},CFG.HL_ITEM_DUR);
    }
    if(name==='ginga'&&(this.C.ginga?.flyers||[]).length>1){
      this.timers.gi=setInterval(()=>{this.giIdx=(this.giIdx+1)%(this.C.ginga.flyers||[]).length;this._subFade(()=>this.render());},CFG.GI_ITEM_DUR);
    }
    /* Refresh Ginga countdown every minute */
    if(name==='ginga'){this.timers.gclock=setInterval(()=>{if(this.scenes[this.scIdx]==='ginga')this._subFade(()=>this.render());},60000);}
  }
  jumpNC(i){this.ncIdx=i;this._subFade(()=>this.render());}
  jumpBD(i){this.bdIdx=i;this._subFade(()=>this.render());}
  startNewsRefresh(){setInterval(async()=>{try{const fresh=await fetchNews(this.C.news_fallback||[]);if(fresh.length){this.news=fresh;buildTicker(fresh);}}catch{};},CFG.NEWS_REFRESH);}
  boot(){this.render();this._startPr();this._sched();this._startSubs();buildTicker(this.news);this.startNewsRefresh();if(this.C.birthdays?.some(b=>isToday(b.day,b.month)))setTimeout(launchConfetti,2500);}
}

async function main(){
  startClock();
  const[C,weather]=await Promise.all([loadContent(),fetchWeather()]);
  let news=[];
  try{news=await fetchNews(C.news_fallback||[]);}catch{news=C.news_fallback||[];}
  document.getElementById('curtain').style.background='#000';
  const player=new Player();window.__player=player;
  document.getElementById('music-toggle').addEventListener('click',()=>player.toggle());
  const app=new App(C,weather,news);
  window.__jumpNC=i=>app.jumpNC(i);window.__jumpBD=i=>app.jumpBD(i);
  app.boot();
}
main().catch(console.error);

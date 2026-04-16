/* ══════════════════════════════════════════
   T.NEWS — MUSIC PLAYER
══════════════════════════════════════════ */
import { fetchRadioStations } from './api.js';

export class Player {
  constructor() {
    this.audio    = document.getElementById('audio-player');
    this.panel    = document.getElementById('player-panel');
    this.stations = [];
    this.current  = null;
    this.playing  = false;
    this._init();
  }

  async _init() {
    this.stations = await fetchRadioStations();
    // Update column count based on station count
    const grid = document.getElementById('station-grid');
    if (grid) {
      const cols = Math.min(this.stations.length, 8);
      grid.style.setProperty('--cols', cols);
    }
    this._renderStations();
    this._setupVolumeSlider();
  }

  toggle() {
    this.panel.classList.toggle('open');
    if (this.panel.classList.contains('open')) {
      this._renderStations();
      this._renderControls();
    }
  }

  close() { this.panel.classList.remove('open') }

  pickStation(index) {
    this.current = this.stations[index];
    this.audio.src = this.current.url;
    this.audio.volume = parseFloat(document.getElementById('vol-slider')?.value || .42);
    this.audio.play()
      .then(() => { this.playing = true; this._onPlayChange(); })
      .catch(() => { this.playing = false; this._onPlayChange(); });
    this._renderStations();
    this._renderControls();
    setTimeout(() => this.close(), 1800);
  }

  togglePlay() {
    if (!this.current) return;
    if (this.playing) {
      this.audio.pause();
      this.playing = false;
    } else {
      this.audio.play().then(() => { this.playing = true; this._onPlayChange(); }).catch(() => {});
    }
    this._onPlayChange();
  }

  _onPlayChange() {
    // Update header button
    const led   = document.getElementById('music-led');
    const label = document.getElementById('music-label');
    if (led)   led.style.display = this.playing ? 'block' : 'none';
    if (label) label.textContent = this.playing && this.current
      ? `▶ ${this.current.name}`
      : '♩ Música';
    // Update play button
    const btn = document.getElementById('play-btn');
    if (btn) btn.innerHTML = this.playing ? '⏸' : '▶';
  }

  _renderStations() {
    const grid = document.getElementById('station-grid');
    if (!grid) return;
    grid.innerHTML = this.stations.map((s, i) => `
      <div class="station-card${this.current && this.current.name === s.name ? ' active' : ''}"
           onclick="window.__player.pickStation(${i})">
        <div class="station-icon">${s.icon || '📻'}</div>
        <div class="station-name">${s.name}</div>
        <div class="station-genre">${s.genre}</div>
      </div>
    `).join('');
  }

  _renderControls() {
    const el = document.getElementById('player-controls');
    if (!el) return;
    if (!this.current) {
      el.innerHTML = '<div class="player-idle">Selecione uma estação acima para começar.</div>';
      return;
    }
    el.innerHTML = `
      <button class="play-btn" id="play-btn" onclick="window.__player.togglePlay()">
        ${this.playing ? '⏸' : '▶'}
      </button>
      <div class="now-playing-info">
        <div class="np-name">${this.current.icon || '📻'} ${this.current.name}</div>
        <div class="np-genre">${this.current.genre}</div>
      </div>
      <div class="volume-row">
        <span style="font-size:1.1rem;color:var(--dim)">🔊</span>
        <input type="range" class="vol-slider" id="vol-slider"
          min="0" max="1" step="0.05"
          value="${this.audio.volume.toFixed(2)}"
          oninput="document.getElementById('audio-player').volume=+this.value">
      </div>`;
  }

  _setupVolumeSlider() {
    this.audio.volume = .42;
  }
}

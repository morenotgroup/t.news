# Guia passo a passo — T.Group Living Wall v2.0

Este guia foi feito para tirar o projeto do zero e colocar em produção sem travar.

---

## 0) Kickoff (Dia 1)

### 0.1 Definir baseline técnico
- Runtime: **Node 22 LTS**.
- App: **React + Vite + TypeScript**.
- Estilo: **Tailwind** (rápido para UI) + CSS modules para efeitos especiais.
- Estado: `zustand` (global leve) + context para mood.
- Qualidade: `eslint`, `prettier`, `vitest`, `playwright` (smoke visual).

### 0.2 Meta visual inicial
- Resolução principal: **1920x1080**.
- FPS alvo: **60fps** (aceitável 30fps em cenas pesadas).
- Easing padrão da casa: `cubic-bezier(.22,1,.36,1)`.

---

## 1) Estrutura de pastas (fundação)

> Crie esta estrutura assim que o projeto React subir.

```txt
src/
  signage/
    director/
      SceneDirector.tsx
      schedule.ts
      mood.ts
      useSignageEvents.ts
    transitions/
      MaskWipe.tsx
      FilmCut.tsx
      MorphDissolve.tsx
    fx/
      Grain.tsx
      Vignette.tsx
      ParallaxLayer.tsx
    stages/
      WelcomeStage.tsx
      WeatherStage.tsx
      NewsStage.tsx
      AgendaStage.tsx
      LunchStage.tsx
      BirthdayStage.tsx
      BrandReelStage.tsx
      ManifestoStage.tsx
      NumbersStage.tsx
      PlaylistStage.tsx
      SextouStage.tsx
    shared/
      Clock.tsx
      BrandMark.tsx
      Ticker.tsx
  assets/
    logos/
    photos/
    lottie/
    sfx/
    video/
```

---

## 2) Onde subir seus arquivos (logos, fotos, etc.)

Como você já tem os materiais, use este padrão:

- **Logos** (`SVG` preferencial):
  - `src/assets/logos/tgroup.svg`
  - `src/assets/logos/tbrands.svg`
  - `src/assets/logos/tvenues.svg`
  - `src/assets/logos/tdreams.svg`
  - `src/assets/logos/tyouth.svg`

- **Fotos institucionais/time/eventos**:
  - `src/assets/photos/team/`
  - `src/assets/photos/events/`
  - `src/assets/photos/clients/`

- **Animações Lottie** (`.json`):
  - `src/assets/lottie/icons/`
  - `src/assets/lottie/transitions/`

- **Áudio (SFX/ambient)**:
  - `src/assets/sfx/transitions/`
  - `src/assets/sfx/ambient/`

- **Vídeos/loops (se usar)**:
  - `src/assets/video/backgrounds/`

### Regras de arquivo
- Nomeie em `kebab-case` (`happy-hour-loop.mp4`).
- Evite acentos e espaços.
- Mantenha versão mestre em alta qualidade fora do repo e suba versão otimizada no projeto.

---

## 3) Stack recomendada (ordem de instalação)

### Sprint 1 — obrigatório
1. `motion` (Framer Motion novo)
2. `gsap`
3. `lottie-react`
4. `zustand`
5. `dayjs`

### Sprint 2 — cenas ricas
6. `@react-three/fiber`
7. `@react-three/drei`
8. `@react-three/postprocessing`
9. `canvas-confetti`

### Sprint 3 — opcional (efeitos avançados)
10. Escolher **1** entre `lenis`, `ogl`, `pixi.js`
11. `howler` (SFX)

---

## 4) Ordem de implementação (sem travar)

## Fase 1 — Fundação de Motion (1 sprint)

### Objetivo
Trocar percepção de “slideshow” para “canal vivo” em 1 semana.

### Entregas
- `SceneDirector` funcional.
- `schedule.ts` por blocos de horário.
- `MaskWipe` e `FilmCut` operacionais.
- Overlay global: `Grain` + `Vignette`.
- `WelcomeStage` cinematográfica (POC).

### Critério de pronto
- Troca de cena com transição mascarada de 1200ms.
- Relógio persistente entre cenas (shared element).

## Fase 2 — Upgrade das cenas existentes (2 sprints)

### Entregas
- `WeatherStage` com fundo dinâmico e tipografia viva.
- `NewsStage` com kinetic type (SplitText-like).
- `AgendaStage` timeline horizontal com profundidade.
- `LunchStage` com carrossel semanal opcional.

## Fase 3 — Cenas novas de impacto (2 sprints)

### Entregas
- `BrandReelStage`
- `ManifestoStage`
- `NumbersStage`
- `PlaylistStage`
- `SextouStage` (sexta 17h+)

## Fase 4 — Polish/Eventos (1 sprint)

### Entregas
- modo noturno automático após 19h.
- easter eggs por data sazonal.
- QR pulsante por contexto.
- event bus para interrupções (aniversário/cliente).

---

## 5) Playlist dinâmica (modelo inicial)

```ts
// Exemplo conceitual
07:00–10:59 => Welcome, Weather, News, Manifesto, Playlist
11:30–14:00 => +Lunch com prioridade alta
14:01–16:59 => News, Agenda, BrandReel, Numbers
17:00–18:59 => Agenda, BrandReel, Cases, Playlist
Sexta 17:00+ => inserir Sextou a cada 2 blocos
```

---

## 6) Mood global

Estados sugeridos:
- `calm`
- `energetic`
- `cozy`
- `celebration`
- `formal`

Mapeamento:
- Chuva/tempo fechado -> `cozy`
- Aniversário ativo -> `celebration`
- Cliente visitando -> `formal`
- Sexta pós 17h -> `energetic`

Esse mood altera: paleta, velocidade de motion, intensidade de grain, SFX.

---

## 7) Integrações de conteúdo (primeiras APIs)

Priorize em ordem:
1. Weather (Open-Meteo / similar)
2. News (feed curado por categoria)
3. Agenda interna (Google Calendar/API interna)
4. Menu almoço (fonte interna)
5. MusicDock/SomaFM metadados

> Dica: crie um `src/services/contentAdapters/` para normalizar formatos diferentes em um mesmo schema interno.

---

## 8) Qualidade e operação em TV

- Limitar re-render com memoização de componentes pesados.
- Pré-carregar mídia antes da cena ir ao ar.
- Fallback quando API cair (cache local + “última atualização”).
- Healthcheck de player (watchdog simples para reiniciar sessão se travar).

---

## 9) Checklist de “go live”

- [ ] 60 min de execução contínua sem memory leak perceptível.
- [ ] Todas as cenas têm fallback de dados.
- [ ] Fontes e logos em alta nitidez no 1080p.
- [ ] Transições sem stutter visível.
- [ ] Modo noturno validado.
- [ ] Conteúdo sensível revisado (nomes/fotos/clientes).

---

## 10) Próxima ação prática (agora)

1. Inicializar projeto React+TS.
2. Instalar stack da Sprint 1.
3. Implementar `SceneDirector` + `WelcomeStage`.
4. Subir logos em `src/assets/logos`.
5. Rodar na TV teste e ajustar timing/easing.

Se quiser, na próxima etapa eu te entrego um **starter kit de código** com:
- `SceneDirector` pronto,
- contrato de `Stage`,
- 2 transições (`MaskWipe` + `FilmCut`),
- `WelcomeStage` já com motion cinematográfico.

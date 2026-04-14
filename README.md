# t.news — T.Group Living Wall (v2.0)

Aplicação React para rodar em TV 1080p como canal audiovisual contínuo do T.Group.

## Entregue nesta versão

- `SceneDirector` com rotação automática de cenas, schedule por horário e mood global.
- Integração de conteúdo **real + fallback**:
  - Clima via Open-Meteo,
  - Notícias via HN/Algolia,
  - Agenda/Menu/Música via painel admin com persistência em `localStorage`.
- Painel admin em `/?admin=1` para editar conteúdo sem deploy.
- Hardening inicial para operação 24/7:
  - timeout + retry + cache em memória para APIs,
  - fallback para dados mock,
  - heartbeat watchdog,
  - `ErrorBoundary` para falhas fatais.

## Como rodar

```bash
npm install
npm run dev
```

Acesse:
- Player: `http://localhost:5173/`
- Admin: `http://localhost:5173/?admin=1`

## Build

```bash
npm run build
npm run preview
```

## Onde subir seus arquivos (logos/fotos/lottie/sfx)

- `src/assets/logos/`
- `src/assets/photos/team/`
- `src/assets/photos/events/`
- `src/assets/photos/clients/`
- `src/assets/lottie/icons/`
- `src/assets/lottie/transitions/`
- `src/assets/sfx/transitions/`
- `src/assets/sfx/ambient/`
- `src/assets/video/backgrounds/`

## Arquitetura principal

```txt
src/signage/
  director/      # orquestração de cena, schedule, mood, event bus
  transitions/   # MaskWipe, FilmCut, MorphDissolve
  fx/            # Grain, Vignette, ParallaxLayer
  stages/        # cenas do player
  shared/        # relógio, marca e ticker persistentes
src/services/
  api/           # chamadas externas + retry/cache
  admin/         # persistência local do painel de conteúdo
  contentAdapters/
src/components/
  AdminPanel.tsx
  ErrorBoundary.tsx
  Watchdog.tsx
```

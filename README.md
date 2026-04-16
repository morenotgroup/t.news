# T.News — Canal Interno T.Group

Plataforma de sinalização digital modular para TVs internas.  
Deploy via GitHub + Vercel em <2 minutos.

---

## 📁 Estrutura do projeto

```
tnews/
├── index.html              → Shell principal (não editar)
├── styles/
│   ├── base.css            → Variáveis, tipografia, reset
│   ├── layout.css          → Header, footer, main wrapper
│   ├── scenes.css          → Estilos das 6 cenas
│   └── player.css          → Painel de música
├── js/
│   ├── app.js              → Controlador principal
│   ├── config.js           → Configurações (timing, cores, textos)
│   ├── api.js              → APIs: clima, notícias, rádio
│   ├── scenes.js           → Renderizadores HTML das cenas
│   └── player.js           → Player de música
├── data/
│   └── content.json        → ⭐ EDITAR MENSALMENTE
└── assets/
    ├── fonts/              → Gonzaga + Sisma (não alterar)
    ├── logos/
    │   ├── tgroup/         → white.png, offwhite.png, orange.png
    │   └── brands/         → tyouth.png, tdreams.png, tbrands.png, tvenues.png
    └── people/             → ⭐ Adicionar mensalmente
        ├── bday_NOME.png
        └── welcome_NOME.png
```

---

## 🔄 Atualização mensal

### 1. Adicione as artes em `assets/people/`
- Aniversários: `bday_nome.png`
- Boas-vindas: `welcome_nome.png`

### 2. Edite `data/content.json`
```json
{
  "meta": { "mes": "Maio", "ano": 2026 },
  "newcomers": [ ... ],
  "birthdays": [ ... ],
  "menu": { ... },
  "events": [ ... ]
}
```

### 3. Publique
```bash
git add .
git commit -m "Conteúdo: Maio 2026"
git push
```
Vercel deploya em ~30 segundos automaticamente.

---

## 🚀 Deploy no Vercel (primeira vez)

1. [vercel.com](https://vercel.com) → New Project → Import from GitHub
2. Selecione o repositório
3. Configurações:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./`  
   - **Build Command:** *(deixar vazio)*
   - **Output Directory:** `./`
4. **Deploy** → pronto!

### Abrindo na TV
- Abra a URL do Vercel no Chrome da TV
- Pressione **F11** para tela cheia
- Para atualizar o conteúdo automaticamente: instale a extensão **"Auto Refresh Plus"** no Chrome e configure para recarregar a cada 60 minutos

---

## ⚙️ Ajustes finos (`js/config.js`)

| Variável | Padrão | Descrição |
|---|---|---|
| `SCENE_DUR` | 22000 | Duração de cada cena (ms) |
| `NC_ITEM_DUR` | 5500 | Tempo de cada colaborador na tela (ms) |
| `BD_ITEM_DUR` | 5500 | Tempo de cada aniversariante (ms) |
| `NC_ITEMS_VISIT` | 4 | Quantas pessoas aparecem por passagem da cena |
| `BD_ITEMS_VISIT` | 4 | Quantos aniversariantes por passagem |
| `NEWS_REFRESH` | 600000 | Intervalo de atualização de notícias (ms) |

---

## 🎵 Música

Clique em **♩ Música** no header para abrir o painel.  
As estações são carregadas dinamicamente via [RadioBrowser API](https://www.radio-browser.info/) (pop atual brasileiro) com fallback para estações curadas.

> Apple Music: requer autenticação de desenvolvedor (MusicKit JS), não disponível em sites estáticos sem backend. A integração via web radio é a melhor alternativa gratuita.

---

## 📰 Notícias

As notícias são atualizadas automaticamente via RSS:
- G1 Entretenimento
- Folha Ilustrada  
- UOL Entretenimento

O fallback em `data/content.json` → `news_fallback` é usado quando não há conexão.

---

## 🖼️ Logos e imagens

Para **trocar logos** das marcas:
- Substitua os arquivos em `assets/logos/brands/` (PNG preferencialmente com fundo transparente)
- Use `mix-blend-mode: screen` funciona para logos claros sobre fundo escuro

Para **adicionar logos com fundo transparente** (ideal):
- Exporte em PNG-24 com canal alpha
- Não é necessário nenhum tratamento CSS adicional

---

*T.News v3.0 · Canal Interno T.Group · 2026*

# T.News — Canal Interno T.Group

Plataforma de sinalização digital para TVs internas. Site estático, deploy via Vercel.

---

## 📁 Estrutura

```
tnews/
├── index.html              → App (não editar)
├── data.js                 → ⭐ EDITAR MENSALMENTE
└── assets/
    ├── fonts/              → Gonzaga + Sisma (não alterar)
    ├── logos/              → Logos das empresas
    │   ├── tgroup_white.png
    │   ├── tgroup_offwhite.png
    │   ├── tgroup_orange.png
    │   ├── tgroup_black.png
    │   └── logos_subbrands.png   ← logo composto das 4 marcas
    └── people/             → ⭐ Adicionar mensalmente
        ├── bday_NOME.png
        └── welcome_NOME.png
```

---

## 🔄 Atualização mensal (5 minutos)

### 1. Adicionar artes em `assets/people/`
- Aniversário: `bday_nome.png`
- Boas-vindas: `welcome_nome.png`

### 2. Editar `data.js`
Abra o arquivo e atualize:
- `mes` / `ano`
- `newcomers` — novos colaboradores (adicione `photo` apontando para o arquivo)
- `birthdays` — aniversariantes (adicione `photo` ou deixe `null`)
- `menu` — cardápio da semana
- `events` — agenda do mês

### 3. Publicar
```bash
git add .
git commit -m "Conteúdo: Maio 2026"
git push
```
Vercel faz deploy automático em ~30 segundos.

---

## 🚀 Deploy no Vercel (primeira vez)

1. Acesse vercel.com → New Project → importe do GitHub
2. Configurações:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./`
   - **Build Command:** *(deixar vazio)*
   - **Output Directory:** `./`
3. Deploy → pronto!

### TV Setup
Abra a URL no Chrome da TV → F11 para tela cheia.
Para auto-reload a cada hora (manter atualizado), configure no Chrome:
- Extensão "Auto Refresh Plus" com intervalo de 60 minutos.

---

## 🪜 Onde ficam os logos das marcas

Para trocar os logos das empresas no rodapé da tela Welcome:
- Substitua `assets/logos/logos_subbrands.png` pela nova versão

Para trocar o logo principal no header:
- Substitua `assets/logos/tgroup_white.png`
- O logo deve ser em PNG com fundo transparente (ou escuro — usamos `mix-blend-mode: screen`)

---

## 📰 Notícias automáticas

As notícias na tela T.News são buscadas automaticamente via RSS (G1 Entretenimento + Folha Ilustrada) ao carregar a página, sem necessidade de API key.

As notícias em `data.js` funcionam como fallback quando não há conexão.

---

## 🎵 Música

Clique em **♩ Música** no canto superior direito para selecionar a estação do dia.
Usa streams do SomaFM — gratuito, sem anúncios.

---

*T.News · Canal Interno T.Group · 2026*

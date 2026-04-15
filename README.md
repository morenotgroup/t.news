# T.News — Canal Interno T.Group

Plataforma de sinalização digital para as TVs internas do T.Group.

---

## 📁 Estrutura de arquivos

```
tnews/
├── index.html              → Aplicação principal (não editar)
├── data.js                 → ⭐ EDITAR MENSALMENTE
└── assets/
    ├── fonts/              → Fontes (não alterar)
    │   ├── gonzaga-roman.ttf
    │   ├── gonzaga-italic.ttf
    │   ├── sisma-bold.otf
    │   └── sisma-medium.otf
    ├── logos/              → Logos das empresas
    │   ├── tgroup_white.png
    │   ├── tgroup_orange.png
    │   ├── tgroup_offwhite.png
    │   ├── tgroup_black.png
    │   ├── logos_subbrands.png
    │   └── TVENUES5.png
    └── people/             → ⭐ Adicionar mensalmente
        ├── bday_NOME.png       → Arte de aniversário
        └── welcome_NOME.png    → Arte de boas-vindas
```

---

## 🗓 Atualização mensal

### 1. Adicione as artes em `assets/people/`
- Aniversários: `bday_nome.png` (ex: `bday_rafaela.png`)
- Boas-vindas: `welcome_nome.png` (ex: `welcome_joao.png`)

### 2. Edite `data.js`
Abra o arquivo e atualize:
- `mes` e `ano` no topo
- Array `newcomers` — novos colaboradores
- Array `birthdays` — aniversariantes do mês
- Objeto `menu` — cardápio da semana
- Array `news` — notícias T.News
- Array `events` — agenda do mês

### 3. Faça deploy via GitHub + Vercel
```bash
git add .
git commit -m "Update: conteúdo de [MÊS/ANO]"
git push
```
O Vercel faz o deploy automaticamente após o push.

---

## 🚀 Deploy no Vercel (primeira vez)

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **"Add New Project"**
3. Selecione o repositório `tnews` (ou o nome que você der)
4. Configure:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./` (deixar padrão)
   - **Build Command:** *(deixar vazio)*
   - **Output Directory:** `./` (ponto barra)
5. Clique **Deploy**

> O Vercel vai detectar que é um site estático e servir o `index.html` diretamente.

### URL de produção
Após o deploy você terá uma URL como:
`https://tnews-tgroup.vercel.app`

Abra essa URL no Chrome do computador da TV e pressione **F11** para tela cheia.

---

## 🔁 Workflow mensal

```
1. Receber artes (bday + welcome) do time de design
2. Nomear corretamente e colocar em assets/people/
3. Editar data.js com os dados do mês
4. git add . && git commit -m "Abril 2026" && git push
5. Vercel deploya em ~30 segundos
6. TV atualiza ao recarregar a página (F5)
```

---

## 🎵 Música
A Central de Música usa streams do [SomaFM](https://somafm.com) — gratuito, sem anúncios.
Clique no botão **♩ Música** no canto superior direito para selecionar a estação do dia.

---

## 🌤 Clima
O widget de clima usa [Open-Meteo](https://open-meteo.com) — gratuito, sem necessidade de API key.
Atualiza automaticamente ao carregar a página.

---

*T.News · Canal Interno T.Group · 2026*

# Assets do kit

Tudo o que o site público da Carlesso Pilates reaproveita do design system do sistema
(`FabioCarlesso/carlessopilatesfe`, pasta `assets/` e `public/`).

## `brand/` — marca (SVG)

| Arquivo | Uso |
|---|---|
| `symbol.svg` | Símbolo oficial (4 círculos em losango), cor `#374f6c`, para fundos claros |
| `symbol-light.svg` | Mesmo símbolo em `#f0ede8`, para fundos escuros (`#141f2d`, `#374f6c`) |
| `pattern-tile.svg` | Tile da padronagem (120 px, opacidade 0,08). Repetir como `background-image` |
| `lockup-horizontal.svg` | Símbolo + `CARLESSO`, **sem sublinha** (frase oficial pendente) |
| `lockup-vertical.svg` | Idem, empilhado |
| `favicon-symbol.svg` | Favicon com o símbolo solo, como pede o manual da marca |
| `favicon.svg` | Favicon atual do sistema (texto "CP"), copiado para comparação |

**Geometria do símbolo** (fonte: `reference/design-system/common.jsx`, componente `SymbolFancy`):
`viewBox 0 0 120 120`, quatro círculos de raio 26 em `(60,32)`, `(88,60)`, `(60,88)` e `(32,60)`,
traço ~2,2 com pontas arredondadas.

**Aviso sobre os lockups:** o `CARLESSO` é texto SVG na fonte Italiana. Carregado como `<img>`, o navegador
não busca a fonte e usa a serifa de reserva. Para ficar idêntico à marca, use o SVG **inline** numa página com a
fonte carregada, ou converta o texto em contornos num editor de vetores (Inkscape, Figma).

Wordmark oficial: maiúsculas, fonte display, `letter-spacing: 0.05em`.

## `tokens/`

- `tokens.css` — cópia **sem alterações** do `assets/tokens.css` do sistema (fonte da verdade do design system).
  Contém também classes de componentes e de *app shell* do sistema administrativo; o site usa só uma fração.
  Ao trazer para o projeto novo, mantenha os `:root` e `[data-theme]`, e remova o que não usar.
  Se mudar um token lá, mude aqui (e vice-versa).

## `tools/`

- `lint-tokens.mjs` — script do sistema que barra `var(--token)` inexistente. **Precisa de ajuste** antes de usar:
  `ARQUIVO_TOKENS` (aponta para `src/styles/_tokens.scss`) e `EXTENSOES` (acrescentar `.astro`).

## `reference/` (na raiz do kit)

- `home-preview/home-preview.html` — prévia estática da Home. Abre direto no navegador (carrega as fontes do Google Fonts).
- `design-system/` — protótipos do sistema (`Marca.html`, `Fundacao.html`, `Componentes.html`) e os arquivos que eles carregam.
  **Para abrir**, sirva a pasta por HTTP (`python3 -m http.server` dentro dela); abrir por `file://` costuma falhar ao carregar os `.jsx`.
  Precisam de internet (React e Babel vêm do unpkg).

## O que ficou de fora de propósito

- `public/landing/*.webp` — prints do sistema com dados fictícios; não servem ao site público.
- `Carlesso Admin.html` e `screens.jsx` — telas administrativas.
- **Fotos reais do estúdio e da equipe** — não existem no repositório. Precisam ser providenciadas.
- **Fontes** — carregadas do Google Fonts na prévia. No projeto novo, recomenda-se auto-hospedar
  (ex.: `@fontsource/italiana`, `@fontsource/cormorant-garamond`, `@fontsource/montserrat`).
  A fonte oficial *Dream Avenue* não está no repositório; a Italiana é a substituta declarada no `tokens.css`.

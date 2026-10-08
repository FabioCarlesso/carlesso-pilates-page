# Design system no site

O site reaproveita o Carlesso Design System do sistema administrativo
(`FabioCarlesso/carlessopilatesfe`, pasta `assets/`). Este arquivo diz o que veio de lá, o que é só do site
e as regras que valem aqui.

## Tokens — três camadas

| Arquivo | Conteúdo | Regra |
|---|---|---|
| `src/styles/tokens.css` | O `:root` do design system, **sem alterações** | Não editar valores. Se um token mudar no sistema, copiar o `:root` de novo. Origem: `reference/design-system/tokens.css` |
| `src/styles/tokens-site.css` | Tokens só do site: escala tipográfica fluida, contêiner, ritmo de seção, alvos de toque e **tons de seção** (`--tom-*`, `--focus-ring`) | Nunca redefinir um token de `tokens.css` |
| `src/styles/global.css` | Reset, base e utilitários (`.container`, `.eyebrow`, `.titulo-secao`, `.sr-only`) | Só `var()` de tokens existentes |

Do arquivo do sistema **não** vieram: o `@import` do Google Fonts (as fontes são auto-hospedadas), a densidade,
o tema escuro, os componentes e o *app shell*. O `.citation` de lá usa os caracteres `[` `]`; o site segue o
`BracketFrame` do manual, com bordas (`src/components/Citacao.astro`).

`npm run lint:tokens` (`tools/lint-tokens.mjs`) barra qualquer `var(--x)` que não esteja declarado nessas camadas
ou na pasta do próprio componente. Roda no CI.

### Nomenclatura

Mesmas famílias do sistema: `--c-*`, `--bg-*`, `--text-*`, `--border-*`, `--sp-*`, `--r-*`, `--fs-*`, `--lh-*`,
`--ls-*`, `--font-*`, `--shadow-*`. Do site: `--tom-*` (cores que dependem do fundo da seção), `--container-*`,
`--tap-min`, `--btn-h-lg`, `--focus-ring`. Nomes de outros design systems (`--surface`, `--space-md`, `--c-primary`)
não existem.

## Tons de seção

Toda faixa é um `<Secao tom="…">`. O tom define o fundo e, via `[data-tom]`, as cores que dependem dele.
Componentes usam `--tom-*` e não sabem em que fundo estão.

| Tom | Fundo | Texto | Texto corrido | Eyebrow | Anel de foco |
|---|---|---|---|---|---|
| `claro` (padrão) | `#f0ede8` | `#141f2d` | `#455157` (7,0:1) | `#455157` | `#355978` (6,3:1) |
| `papel` | `#faf8f5` | `#141f2d` | `#455157` (7,7:1) | `#455157` | `#355978` |
| `escuro` | `#141f2d` | `#f0ede8` | `#e6e1d8` | `#a8bcca` (8,5:1) | `#f0ede8` (14,2:1) |
| `marca` | `#374f6c` | `#f0ede8` | `#e6e1d8` (6,5:1) | `#c3d0d9` (5,3:1) | `#a8bcca` (4,3:1) |

O botão primário (`#374f6c`, rótulo `#f0ede8`, 7,2:1) tem cor fixa: não muda com o tom.

## Regras de acessibilidade

- `--text-muted` (`#8a96a0`, 2,6:1) e `--c-azul` (`#708da3`, 3,0:1) **nunca** em texto de conteúdo.
- Anel de foco: `outline` sólido de 2px com `--focus-ring`. O `--shadow-focus` do sistema (1,31:1) não é usado.
- Alvos de toque ≥ 44px (`--tap-min`); nenhum texto abaixo de 12px (`--fs-label`).
- Um `<h1>` por página; cada seção com `<h2>`. Landmarks `header`/`nav`/`main`/`footer` e link "Pular para o conteúdo"
  já estão no layout (`src/layouts/Base.astro`).
- Animações respeitam `prefers-reduced-motion`.
- Não usar `background:` abreviado onde há `background-image` herdado (armadilha das issues #199/#200 do sistema):
  preferir `background-color`.

## Fontes

Auto-hospedadas com `@fontsource`, só o subconjunto latino (`src/styles/fonts.css`):

| Uso | Fonte | Pesos |
|---|---|---|
| Títulos | Italiana (substituta da *Dream Avenue*, licença web pendente) | 400 |
| Texto e interface | Montserrat | 400, 500, 600 |
| Citações | Cormorant Garamond itálico | 400 |

Precisa de outro peso? Importe o arquivo `latin-<peso>.css` correspondente em `fonts.css`.

## Marca

| Arquivo | Uso |
|---|---|
| `src/components/Simbolo.astro` | Símbolo inline, cor herdada (`currentColor`) |
| `src/components/Lockup.astro` | Símbolo + `CARLESSO` + sublinha, inline para usar a fonte carregada |
| `public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Favicons com o símbolo solo, como pede o manual |
| `public/brand/symbol.svg` / `symbol-light.svg` | Símbolo para fundos claros / escuros (`#141f2d`, `#374f6c`) |
| `public/brand/pattern-tile.svg` | Tile da padronagem (120px, opacidade 0,08). Manual: esparsa 160px, normal 120px, densa 80px; opacidade 0,06–0,12 |
| `public/brand/lockup-horizontal.svg` / `lockup-vertical.svg` | Sem sublinha. O wordmark é **texto** SVG: em `<img>` cai para a serifa de reserva. Para OG ou uso externo, converter em contornos |
| `reference/brand-legado/favicon-cp-sistema.svg` | Favicon "CP" do sistema, guardado só para comparação |

Geometria do símbolo (`SymbolFancy` em `reference/design-system/common.jsx`): `viewBox 0 0 120 120`, quatro círculos
de raio 26 em `(60,32)`, `(88,60)`, `(60,88)` e `(32,60)`, traço ~2,2 com pontas arredondadas.
Wordmark: maiúsculas, fonte display, `letter-spacing: 0.05em`.

A sublinha usada no site vem de `site.sublinha` (`src/config/site.ts`) e é **provisória** — ver `docs/context.md`.

## Referências

- `reference/home-preview/home-preview.html` — prévia estática da Home. Abre direto no navegador.
- `reference/design-system/` — protótipos do sistema (`Marca.html`, `Fundacao.html`, `Componentes.html`).
  Sirva a pasta por HTTP (`python3 -m http.server` dentro dela); precisam de internet (React e Babel vêm do unpkg).
- Nada em `reference/` entra no build.

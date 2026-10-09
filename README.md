# Carlesso Pilates — site público

Site de divulgação e vendas da Carlesso Pilates (Foz do Iguaçu/PR). Astro, saída estática, hospedado no Cloudflare Pages.

## Rodar

Requer Node ≥ 22.12 (`.node-version`).

```bash
npm install
npm run dev          # http://localhost:4321
npm run verify       # lint de tokens + astro check + build (o mesmo que o CI)
```

| Script | O que faz |
|---|---|
| `dev` | Servidor de desenvolvimento |
| `build` / `preview` | Gera e serve o `dist/` |
| `check` | Tipos e diagnósticos dos `.astro` |
| `lint:tokens` | Barra `var(--token)` inexistente (`tools/lint-tokens.mjs`) |

O GA4 e o aviso de cookies só aparecem com `PUBLIC_GA4_ID` definido (ex.: `PUBLIC_GA4_ID=G-XXXX npm run build`);
em produção a variável fica no Cloudflare Pages (`docs/deploy.md`).

## Estrutura

```
src/
├── config/site.ts     # dados do estúdio, WhatsApp, navegação — fonte única
├── config/analytics.ts # ID do GA4 (variável PUBLIC_GA4_ID)
├── lib/schema.ts      # JSON-LD gerado de site.ts
├── content/           # equipe, planos, FAQ e depoimentos (YAML) — schema em content.config.ts
├── styles/            # tokens.css (design system), tokens-site.css, fonts.css, global.css
├── components/        # Secao, Card, Botao, Citacao, Lockup, Simbolo, Topo, Rodape, WhatsAppFlutuante, Consentimento
├── layouts/Base.astro # <head>, SEO, landmarks, topo e rodapé
└── pages/             # index, privacidade, 404
public/                # favicons, _headers, robots.txt, brand/
tools/lint-tokens.mjs
reference/             # protótipos do design system e prévia da Home (fora do build)
docs/                  # ver docs/README.md
```

## Documentação

Comece por [`docs/README.md`](docs/README.md).

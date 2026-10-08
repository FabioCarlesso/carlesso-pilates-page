# Deploy — Cloudflare Pages

## Configuração do projeto (uma vez)

No painel da Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, repositório
`FabioCarlesso/carlesso-pilates-page`.

| Campo | Valor |
|---|---|
| Production branch | `main` |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node | lido de `.node-version` (22); se o build reclamar, definir a variável `NODE_VERSION=22` |

Cada PR ganha uma URL de preview (`<hash>.<projeto>.pages.dev`). Produção fica em `<projeto>.pages.dev`
até a troca de domínio.

## Arquivos que o Cloudflare lê

- `public/_headers` — cabeçalhos de segurança, cache longo para `/_astro/*` (arquivos com hash) e
  `X-Robots-Tag: noindex` em todo `*.pages.dev`, para só o domínio oficial ser indexado.
  Quando o GA4 entrar, acrescentar uma Content-Security-Policy que libere só os domínios do Google necessários.
- `public/robots.txt` — libera tudo e aponta o `sitemap-index.xml` (gerado no build por `@astrojs/sitemap`).
- `dist/404.html` — servido automaticamente para rotas inexistentes.

## Domínio (go-live, F3)

Pré-requisito: acesso ao Registro.br (titular de `carlessopilates.com.br`) e saber onde está o DNS hoje.

1. Reduzir o TTL dos registros atuais alguns dias antes.
2. Conferir registros de e-mail (MX, SPF, DKIM) para não perdê-los na troca.
3. Em **Custom domains** do projeto Pages, adicionar `carlessopilates.com.br` e `www.carlessopilates.com.br`;
   redirecionar `www` para o domínio raiz (301).
4. Validar o site novo no domínio antes de desligar o construtor antigo.
5. No Search Console, enviar o sitemap e conferir as URLs antigas (redirecionar o que estiver indexado para `/`).

`site.url` (`src/config/site.ts`) define a URL canônica e o sitemap — já aponta para o domínio oficial.

## Verificação local

```bash
npm run verify   # lint de tokens + astro check + build
npm run preview  # serve o dist/ em http://localhost:4321
```

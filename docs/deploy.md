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
| Variável `PUBLIC_GA4_ID` | ID de medição do GA4 (`G-…`), **só no ambiente Production**. Sem ela não há banner nem GA4 |

Cada PR ganha uma URL de preview (`<hash>.<projeto>.pages.dev`). Produção fica em `<projeto>.pages.dev`
até a troca de domínio.

## Arquivos que o Cloudflare lê

- `public/_headers` — cabeçalhos de segurança, cache longo para `/_astro/*` (arquivos com hash) e
  `X-Robots-Tag: noindex` em todo `*.pages.dev`, para só o domínio oficial ser indexado.
  A Content-Security-Policy libera só o Google Tag Manager e o Google Analytics, sem código inline; ao incluir
  qualquer outro serviço de terceiros, acrescentar o domínio dele ali.
- `public/robots.txt` — libera tudo e aponta o `sitemap-index.xml` (gerado no build por `@astrojs/sitemap`).
- `dist/404.html` — servido automaticamente para rotas inexistentes.

## Google Analytics 4 (uma vez)

1. Criar a propriedade GA4 e um fluxo de dados Web para `https://carlessopilates.com.br`; copiar o ID `G-…`.
2. Deixar a propriedade como a política de privacidade diz (`src/pages/privacidade.astro`):
   - **Admin → Data collection**: Google Signals desligado;
   - **Admin → Data retention**: 14 meses.
3. **Admin → Custom definitions**: criar a dimensão personalizada de evento `posicao` (para ver o
   `click_whatsapp` por posição nos relatórios). O `click_whatsapp` só pode ser marcado como evento-chave depois
   do primeiro envio.
4. Só então, no Cloudflare Pages, em **Settings → Variables and Secrets**, criar `PUBLIC_GA4_ID` só em
   **Production** e refazer o deploy (o valor entra no HTML no build). Nessa ordem, a política nunca afirma uma
   configuração que ainda não existe.
5. Conferir no **DebugView** / Tempo real: aceitar o aviso, clicar num botão de WhatsApp. Com o evento
   recebido, marcar `click_whatsapp` como evento-chave (**Admin → Events**).

## Domínio (go-live, F3)

Pré-requisito: acesso ao Registro.br (titular de `carlessopilates.com.br`) e saber onde está o DNS hoje.

1. GA4 ativo antes da troca (seção acima, na ordem: configurar a propriedade e só depois definir `PUBLIC_GA4_ID`).
   Sem ele, a `/privacidade` descreve um aviso de cookies e um GA4 que não existem, e a medição não começa no dia 1.
2. Reduzir o TTL dos registros atuais alguns dias antes.
3. Conferir registros de e-mail (MX, SPF, DKIM) para não perdê-los na troca.
4. Em **Custom domains** do projeto Pages, adicionar `carlessopilates.com.br` e `www.carlessopilates.com.br`;
   redirecionar `www` para o domínio raiz (301).
5. Validar o site novo no domínio antes de desligar o construtor antigo.
6. No Search Console, enviar o sitemap e conferir as URLs antigas (redirecionar o que estiver indexado para `/`).

`site.url` (`src/config/site.ts`) define a URL canônica e o sitemap — já aponta para o domínio oficial.

## Verificação local

```bash
npm run verify   # lint de tokens + astro check + build
npm run preview  # serve o dist/ em http://localhost:4321
```

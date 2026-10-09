# Decisões técnicas

Registro das decisões do projeto e do porquê. Cada entrada tem data e status. A análise completa está em
`docs/ANALISE-PROJETO.md` e a revisão em `docs/REVISAO-PLANEJAMENTO.md`.

## Decididas

### D1 — Projeto separado do sistema administrativo (08/10/2026)

O site não compartilha origem com o sistema: o sistema guarda o JWT em `localStorage` e o site terá scripts de
terceiros (GA4). Reaproveita-se só o design system. Ver `ANALISE-PROJETO.md`, seção 6.

### D2 — Astro, saída estática (08/10/2026)

Site de conteúdo, SEO local, quase nenhum JavaScript. Astro gera HTML estático, importa os tokens CSS direto e
publica em qualquer hospedagem estática. Node ≥ 22.12 (exigência do Astro; `.node-version` fixa a 22).

### D4 — Cloudflare Pages (08/10/2026)

Hospedagem inicial no Cloudflare Pages: plano gratuito permite uso comercial (o Hobby da Vercel não), preview por PR
e cabeçalhos via `public/_headers`. Como a saída é estática, trocar de provedor depois é barato.
Configuração em `docs/deploy.md`.

### D6 — GA4 com aviso de consentimento (08/10/2026)

GA4 com evento `click_whatsapp` por posição. Nenhum script do Google carrega antes do consentimento.
Os botões de WhatsApp já marcam a posição em `data-whatsapp` (topo, hero, aulas, profissionais, fechamento, flutuante,
rodape, 404).
Implementado em 09/10/2026 (`src/components/Consentimento.astro`, `src/pages/privacidade.astro`):
- banner com "Aceitar" e "Recusar" de mesmo peso visual, sem caixa pré-marcada; no celular fica acima do botão
  flutuante de WhatsApp;
- escolha no `localStorage` (`carlesso:consentimento-analytics`), revogável por "Preferências de cookies" no rodapé;
  ao recusar depois de aceitar, o envio para e os cookies `_ga*` são apagados;
- o `gtag.js` só é pedido depois do "Aceitar"; consentimento de anúncios negado e Google Signals desligado;
- evento `click_whatsapp` com o parâmetro `posicao` (valor de `data-whatsapp`);
- ID em `PUBLIC_GA4_ID`, definido só na produção do Cloudflare Pages: sem ele (dev e previews) não há banner nem
  GA4, e o preview não suja os dados (`src/config/analytics.ts`, `docs/deploy.md`);
- política de privacidade em `/privacidade`, citando GA4, a finalidade, os cookies e os direitos da LGPD. O texto
  afirma retenção de 14 meses e sinais de anúncios desligados: a propriedade do GA4 precisa estar configurada assim.

A Content-Security-Policy (`public/_headers`) só libera o Google Tag Manager e o Google Analytics. Para ela não
precisar de `'unsafe-inline'`, o `astro.config.mjs` manda scripts e CSS sempre para arquivos
(`assetsInlineLimit: 0`, `inlineStylesheets: 'never'`).

### Fonte única de dados (08/10/2026)

Telefone, endereço, redes, mensagens de WhatsApp e URL ficam em `src/config/site.ts`; o JSON-LD é gerado dele
(`src/lib/schema.ts`). Nenhum componente escreve esses dados à mão. Campo ainda não informado fica `undefined`
e o bloco correspondente não aparece.

### Link de WhatsApp (08/10/2026)

`https://wa.me/<número>?text=…`, montado por `linkWhatsApp(contexto)`. Toda mensagem começa com
"Olá! Vim pelo site." para a recepção contar os contatos vindos do site.

### Conteúdo em content collections (08/10/2026)

Equipe, planos, FAQ e depoimentos ficam em `src/content/*.yml`, com schema em `src/content.config.ts`
(D5 da análise: conteúdo no repositório, sem CMS). Cada item tem `ordem`, porque o Astro não preserva a ordem do
arquivo. Campo opcional vazio esconde o bloco: plano sem `valor` mostra "Consulte valores e horários pelo
WhatsApp", pergunta sem `resposta` não aparece, coleção de depoimentos vazia esconde a seção. Depoimento sem
`autorizadoEm` (data da autorização por escrito) não passa no build.

### Home sem foto e sem mapa incorporado (08/10/2026)

Enquanto não houver fotos, o hero mostra a padronagem da marca (escondida no celular) e a equipe, um monograma
com as iniciais. A localização é um link "Ver no Google Maps" (`linkMapa` em `site.ts`), sem `<iframe>`: nada do
Google carrega na visita (`REVISAO-PLANEJAMENTO.md`, 4.5).

### Menu no celular (08/10/2026)

Sem menu hambúrguer: abaixo de 768px o menu ocupa uma linha própria sob o logotipo e quebra em linha quando não
cabe (zero JS, como pede a seção 13 da análise). O botão "Agendar aula" do topo some no celular; o flutuante assume.

## Em aberto

- [ ] Frase oficial de posicionamento e sublinha do logotipo (`site.sublinha` usa "Pilates Clássico" provisoriamente)
- [ ] Dream Avenue (licença web) ou Italiana definitiva
- [ ] Nome do subdomínio do sistema e destino da landing de `/`
- [ ] Quem controla o domínio no Registro.br e o DNS; quando fazer a troca
- [ ] Regras de publicidade do COFFITO/CREFITO-8 (preços, depoimentos, registro da responsável técnica — o campo
  `crefito` da equipe já aparece quando preenchido) e como comprovar o "1º Studio de Pilates Clássico"
- [ ] Valores e frequências dos pacotes (`src/content/planos.yml`)
- [ ] Fotos (hero, estúdio, equipe), texto sobre a Contrologia e resposta "preciso ter experiência?" (`faq.yml`)
- [ ] Revisão do texto de `/privacidade` pela Claudia (e CNPJ do estúdio, se ela quiser que apareça)
- [ ] Fase 2: lead novo no backend ou só e-mail/WhatsApp?

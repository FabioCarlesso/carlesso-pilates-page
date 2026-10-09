# Revisão do planejamento — o que ajustar antes de começar a construção

> Revisão de `docs/ANALISE-PROJETO.md` e do kit (`assets/`, `reference/`). Data: 08/10/2026.
> **Atualização (08/10/2026):** decididos Astro, Cloudflare Pages e GA4 com consentimento (registro em
> `docs/context.md`). Os itens 2 a 6 do backlog (seção 7) estão feitos; os caminhos `assets/…` citados abaixo
> foram reorganizados (ver `docs/README.md`). **09/10/2026:** itens 7 e 9 feitos.
>
> Mesma convenção da análise: **[fato]** foi conferido nos arquivos do kit; **[recomendação]** é opinião, para discutir;
> **[verificar]** é algo que precisa ser confirmado fora daqui antes de virar decisão.

---

## 1. Resumo

A análise está boa: diagnóstico do site atual, separação site × sistema (D1), sitemap e SEO local estão corretos
e podem ser seguidos. Os ajustes abaixo mudam **a ordem** e **o escopo do lançamento**, e corrigem problemas
concretos encontrados no kit antes que sejam copiados para o código.

As cinco mudanças mais importantes:

1. **Lançar um MVP sem esperar todo o conteúdo.** Hoje F2 depende de F0 inteira (fotos, valores, textos). Proposta:
   F1 em paralelo com F0 e um lançamento só com a Home, `/privacidade` e o conteúdo que já existe (seção 4.1).
2. **Revisar a hospedagem.** O plano Hobby da Vercel é só para uso não comercial; um site que vende aulas precisa
   do plano Pro ou de outro provedor (seção 4.6).
3. **Conferir as regras de publicidade do COFFITO/CREFITO** antes de publicar preços, depoimentos e o "1º studio" (seção 4.7).
4. **Não copiar o `tokens.css` como está.** Ele carrega o Google Fonts por `@import`, traz o *app shell* do sistema,
   usa tamanhos fixos em px e tem um anel de foco abaixo do contraste mínimo (seções 3 e 4.3).
5. **Corrigir a acessibilidade da prévia ao portar**: anel de foco invisível nas seções escuras, sem `<main>`,
   salto de H1 para H3 (seção 4.4).

---

## 2. O que manter como está

- D1 (projeto separado), D3 (domínio × subdomínio) e o cuidado com o JWT em `localStorage` do sistema.
- WhatsApp como ação principal, com mensagem pré-preenchida por contexto.
- Sitemap enxuto (seção 7 da análise) e JSON-LD (seção 10).
- Regra de nunca inventar valores, fotos ou depoimentos — os espaços reservados da prévia já seguem isso.
- Fase 2 (formulário) fora da v1.

---

## 3. Problemas encontrados no kit

| # | Onde | Problema [fato] | O que fazer |
|---|---|---|---|
| 1 | `assets/tokens/tokens.css:3` | `@import` do Google Fonts no topo. Contradiz a recomendação de auto-hospedar as fontes e bloqueia a renderização | Remover o `@import` ao trazer para `src/styles/` |
| 2 | `assets/tokens/tokens.css` (`--shadow-focus`) | Anel de foco `rgba(55,79,108,0.18)` sobre `#f0ede8` dá **1,31:1** — abaixo de 3:1 (WCAG 1.4.11) e contra a própria regra 5.4 da análise ("anel de foco visível e sólido") | No site, usar `outline` sólido com cor por fundo (seção 4.4) |
| 3 | `assets/tokens/tokens.css` (`.citation`) | A citação usa os caracteres `[` `]` na fonte display. O manual (`BracketFrame` em `reference/design-system/common.jsx:163`) e a análise (5.3) usam **bordas** de 14–16 px. A prévia segue o manual | O componente do site segue o `BracketFrame`; ignorar `.citation` |
| 4 | `assets/tokens/tokens.css` (`--fs-*`) | Escala em px fixos pensada para o sistema: `--fs-body` = 14px, `--fs-display-xl` = 96px. Em celular, o corpo fica pequeno e o display não cabe. A prévia já ignora a escala e usa `clamp()` | Criar uma camada de tokens do site com escala fluida (seção 4.3) |
| 5 | `assets/tokens/tokens.css` | Mais da metade do arquivo é do sistema (`.app-shell`, `.sidebar`, `.table`, `.pagination`, `[data-density]`, `[data-theme="dark"]`) | Trazer só o `:root`; o site não precisa de tema escuro na v1 |
| 6 | Sublinha da marca | Há **cinco** frases em uso: "Pilates e Fisioterapia" e "Centro de Contrologia" (`Marca.html:73,81`), "Centro de Contrologia e Movimento" (`common.jsx:295`), "Studio de Pilates Clássico" (site atual) e "Pilates Clássico" (topo e rodapé da prévia) | Manter como decisão de F0, mas registrar que a prévia já escolheu uma provisoriamente |
| 7 | `reference/home-preview/home-preview.html:17` | Foco em `#355978`: **1,14:1** sobre a faixa azul-horizonte (`#374f6c`) e **2,26:1** sobre o rodapé (`#141f2d`) — o foco some nas seções escuras | Ver seção 4.4 |
| 8 | Prévia | Sem `<main>`; os cards de diferenciais são `<h3>` logo após o `<h1>` (sem `<h2>`); a seção de depoimentos e o FAQ não têm `id` | Ver seção 4.4 |
| 9 | Prévia | Rótulos de 10–11px (sublinha, eyebrows, legendas de foto). Têm contraste, mas ficam no limite da leitura no celular | Piso de 12px no site |
| 10 | Prévia, rodapé | E-mail como texto (sem `mailto:`), telefone não aparece em lugar nenhum. O JSON-LD tem `telephone` e o Google Meu Negócio também terá: o NAP do site precisa mostrar o número | Exibir telefone com `tel:` e e-mail com `mailto:` |
| 11 | Prévia | O botão flutuante de WhatsApp recomendado na análise (seção 11) não está na prévia | Incluir no componente de layout (só no mobile) |
| 12 | `assets/tools/lint-tokens.mjs` | Além de `ARQUIVO_TOKENS` e `EXTENSOES`, o tratamento de comentários não serve para `.astro` (seção 4.10) | Ajustar como descrito na seção 4.10 |

Contrastes calculados (WCAG 2.x) para referência — os demais pares usados na prévia passam:

| Par | Razão | Uso permitido |
|---|---|---|
| `#8a96a0` (`--text-muted`) sobre `#f0ede8` | 2,59 | Nenhum texto de conteúdo (já registrado na análise) |
| `#708da3` (`--c-azul`) sobre `#f0ede8` | 2,98 | **Nenhum texto**, só decoração. Sobre branco dá 3,48: só texto ≥ 24px |
| `#455157` (`--text-secondary`) sobre `#f0ede8` | 7,00 | Texto corrido |
| `#f0ede8` sobre `#374f6c` (botão primário) | 7,20 | Rótulo de botão |
| `#a8bcca` sobre `#374f6c` | 4,29 | Anel de foco nas seções azuis |

---

## 4. Melhorias no planejamento

### 4.1 Caminho crítico e MVP de lançamento [recomendação]

O roadmap atual é sequencial: F0 (conteúdo, "depende da Claudia") bloqueia F2. Conteúdo é o item mais lento e o
que mais atrasa sites assim. Proposta:

- **F1 começa já**, em paralelo com F0. Nada em F1 depende de conteúdo.
- **MVP = Home + `/privacidade` + 404**, com o que já existe: textos do site atual, endereço, equipe, FAQ com 3 respostas.
  - Sem valores: o card de plano diz "Consulte valores e horários pelo WhatsApp" (já é melhor que o site atual, que não diz nada).
  - Sem depoimentos: a seção não aparece (nunca exibir espaço vazio em produção).
  - Fotos: as do site atual em baixa resolução **só** se ficarem aceitáveis; senão, um layout sem foto no hero
    (padronagem da marca + tipografia), que a prévia já sugere.
- **Depois do MVP**, uma página por vez: `/aulas` quando houver valores, `/pilates-classico` quando houver o texto,
  `/profissionais` quando a oferta estiver definida.

Isso troca "site completo em X semanas" por "site melhor que o atual no ar cedo, e melhorando".

Para isso funcionar, cada bloco de conteúdo precisa saber se esconder quando o dado está ausente
(ex.: `planos.valor` vazio → mostra o texto de consulta). Esse é um requisito dos componentes, não um detalhe.

### 4.2 Fonte única de dados [recomendação]

Telefone, endereço, e-mail e redes aparecem em pelo menos seis lugares (topo, hero, cards, rodapé, JSON-LD, FAQ).
Na prévia estão repetidos à mão. No projeto:

- `src/config/site.ts` com nome, telefone, endereço, coordenadas, horário, redes, URL canônica e **as mensagens de WhatsApp por contexto**.
- Uma função `linkWhatsApp(contexto)` que monta a URL — nenhum `api.whatsapp.com` escrito à mão nos componentes.
- O JSON-LD é **gerado** desse arquivo, não escrito à parte. Assim o NAP fica igual em tudo, que é o que o SEO local exige.
- Conteúdo que a Claudia vai revisar (equipe, planos, FAQ, depoimentos) em *content collections* do Astro, com schema:
  um depoimento sem o campo `autorizadoEm` não passa no build.

### 4.3 Tokens do site [recomendação]

```
src/styles/
├── tokens.css        # só o :root do design system, sem @import (cópia do sistema)
├── tokens-site.css   # tokens só do site: escala tipográfica fluida, largura do contêiner, ritmo de seção, foco
└── global.css        # reset, base, @font-face (via @fontsource)
```

- **`tokens.css`**: cabeçalho com a origem (`carlessopilatesfe@<commit>`) para saber de onde veio.
  Sincronizar à mão é aceitável — o arquivo muda pouco —, mas a origem precisa estar escrita.
- **`tokens-site.css`**: novos nomes seguindo a nomenclatura existente, sem inventar famílias novas. Exemplos:
  `--fs-hero: clamp(46px, 6.2vw, 88px)`, `--fs-section: clamp(36px, 4.4vw, 56px)`, `--fs-lead: 17px`,
  `--sp-section: clamp(64px, 8vw, 112px)`, `--focus-ring` (seção 4.4). Os valores saem da prévia, que já foi desenhada com eles.
- **Corpo de texto em 16px** no site (a prévia já usa). Os 14px do sistema são para interface densa.
- **Sem tema escuro na v1.** Isso também elimina a armadilha do rótulo sobre fundo fixo (regra 5.4 da análise).

### 4.4 Acessibilidade — correções ao portar a prévia

- **Foco**: `outline: 2px solid var(--focus-ring); outline-offset: 3px`, com `--focus-ring` redefinido por seção:
  `#355978` nas claras, `#a8bcca` na faixa azul-horizonte, `#f0ede8` nas seções `#141f2d`. Um componente `Section`
  com variante (`claro` / `escuro` / `marca`) resolve isso num lugar só.
- **Landmarks**: `<header>`, `<nav>`, `<main>`, `<footer>`; link "Pular para o conteúdo".
- **Títulos**: H1 único; cada seção com H2 (os diferenciais podem ganhar um H2 visualmente oculto, ou virar lista sem título).
- **Menu no celular**: na prévia, os cinco links quebram em linha e o topo fica alto em 320px. Decidir entre manter
  (zero JS) ou um menu em `<details>` — a decisão é de layout, mas precisa ser tomada antes do componente de topo.
- **`prefers-reduced-motion`**: desligar `scroll-behavior: smooth` e a rotação do "+" do FAQ.
- **Links externos** (WhatsApp, Instagram): indicar que abrem outro app/aba quando abrirem.

### 4.5 Privacidade e medição mais simples [recomendação]

A análise propõe GA4 + aviso de cookies + carregar scripts após consentimento. Funciona, mas tem custo:
o banner atrapalha a primeira impressão no celular e, com consentimento, parte das visitas nem é medida.

Alternativa para a v1: **analytics sem cookies** (Vercel Web Analytics, Plausible ou Umami). Sem cookie de
rastreamento, não há banner. O que precisamos medir é pouco: visitas por página e clique no WhatsApp por posição.
GA4 fica para quando houver campanha paga que precise dele. A política de privacidade continua obrigatória.
[verificar] se o plano escolhido de cada ferramenta inclui eventos personalizados.

Dois pontos relacionados:

- **Mapa**: um `<iframe>` do Google Maps carrega cookies e scripts do Google em toda visita. Usar uma imagem estática
  do mapa com link "Abrir no Google Maps" (ou carregar o iframe só no clique).
- **Atribuição no WhatsApp**: a análise mede o clique, mas não sabe se virou conversa. Começar a mensagem com
  "Olá! Vim pelo site." deixa a recepção contar quantos contatos vieram do site — custa zero e é o indicador que
  mais importa para a Claudia.

### 4.6 Hospedagem [verificar]

D4 propõe a Vercel "já em uso". O plano gratuito (Hobby) da Vercel é restrito a uso pessoal e **não comercial**;
um site que vende aulas é uso comercial. Opções:

| Opção | Custo | Observação |
|---|---|---|
| Vercel Pro | pago, por usuário/mês | Mesmo fluxo do sistema (preview por PR) |
| Cloudflare Pages | gratuito, uso comercial permitido | Preview por PR; DNS na Cloudflare facilita a troca de domínio |
| Netlify | tem plano gratuito | Preview por PR |

Como o site é estático, trocar de provedor depois é barato — mas a escolha afeta onde fica o DNS (seção 4.8).
Vale também conferir em qual plano o **sistema** está hoje.

### 4.7 Conformidade da publicidade [verificar]

A responsável técnica é fisioterapeuta, e o site divulga serviços conduzidos por fisioterapeutas. Antes de publicar:

- Conferir com o **CREFITO-8** (Paraná) as regras de publicidade do Código de Ética da Fisioterapia
  (Resolução COFFITO nº 424/2013) sobre **divulgação de preços**, **depoimentos de pacientes** e **promessa de resultado**.
  Isso pode mudar as seções de pacotes e de depoimentos.
- Verificar se o anúncio precisa do **nome e do número de registro no CREFITO** da responsável técnica (comum em
  publicidade de serviços de saúde). Se sim, entra no rodapé e na seção de equipe.
- **"1º Studio de Pilates Clássico de Foz do Iguaçu"** é uma afirmação de fato. Ter como comprová-la, ou suavizar a frase.
- **Fotos com alunos**: autorização de uso de imagem por escrito (LGPD), como já se exige para depoimentos.

### 4.8 Domínio, DNS e e-mail

- `.com.br` é registrado no **Registro.br**: confirmar quem é o titular (CPF/CNPJ) e quem tem o login.
  O DNS pode estar delegado à HostGator. Esse acesso é pré-requisito do go-live — levantar já em F0, não em F4.
- Decidir `www` × domínio raiz e redirecionar o outro (301).
- [recomendação] E-mail no domínio (`contato@carlessopilates.com.br`) passa mais confiança que Gmail.
  Não é bloqueante, mas, se for feito, entra no mesmo plano de DNS (registros MX, SPF, DKIM).

### 4.9 Itens técnicos que faltam no plano

- Página **404** com o mesmo layout e um CTA.
- **Favicons**: além do SVG, `apple-touch-icon` PNG 180×180 e `favicon.ico` 32×32 (o SVG não cobre iOS nem navegadores antigos).
- `<link rel="canonical">`, `lang="pt-BR"`, `og:locale` = `pt_BR`.
- **Lockups**: o wordmark é texto SVG. Para o `<img>` do topo e para a imagem Open Graph, converter em contornos
  (ou usar o lockup inline com a fonte carregada, como o `assets/README.md` já avisa).
- **Google Meu Negócio** sai de F3 para F0: não depende do site, é o maior canal de busca local e as fotos servem aos dois.
- **Search Console** já em F0, no domínio atual, para ter a linha de base de buscas e as URLs indexadas antes da troca.

### 4.10 Ajustes concretos no `lint-tokens.mjs`

1. `ARQUIVO_TOKENS` → aceitar **uma lista** de arquivos globais (`tokens.css` e `tokens-site.css`).
2. `EXTENSOES` → `['.css', '.astro', '.ts', '.mdx']` (sem `.scss` e `.html`, que o site não usa).
3. **Comentários em `.astro`**: o modo atual de CSS/TS trata `'` como início de string; no texto do template, um
   apóstrofo engole o resto do arquivo (o próprio script documenta esse risco para `.html`). Para `.astro`, remover
   `<!-- -->` como no HTML **e** blocos `/* */` por regex, sem rastrear strings.
4. Atualizar a mensagem de erro (cita `src/styles/_tokens.scss` e o sistema).
5. Ligar como `npm run lint:tokens` e no CI.

---

## 5. Lista de fotos para a sessão [recomendação]

A sessão de fotos é o item mais demorado de F0. Uma lista fechada evita uma segunda sessão.

| Foto | Proporção | Onde entra | Observação |
|---|---|---|---|
| Hero: aula em andamento no aparelho | 4:5 (vertical) | Home | A mais importante do site |
| Salão de aparelhos, plano aberto | 3:2 ou 16:9 | Estúdio, Open Graph | Luz natural, sem bagunça |
| Detalhe do aparelho (Reformer, mola, alça) | 1:1 | Estúdio | |
| Recepção / entrada | 1:1 | Estúdio | Ajuda quem vai pela primeira vez |
| Fachada e acesso à Sala 02 | 3:2 | FAQ "onde fica", Google Meu Negócio | |
| Retrato da Claudia | 4:5 | Equipe, `/profissionais` | Mesmo fundo e luz da Camila |
| Retrato da Camila | 4:5 | Equipe | |
| Dueto: duas alunas e instrutora | 3:2 | `/aulas` | Autorização de imagem |
| Claudia ensinando profissionais | 3:2 | `/profissionais` | Se houver turma |

Entregar em alta resolução (o build gera AVIF/WebP e os tamanhos).

---

## 6. Roadmap revisado

| Fase | Entregas | Pronto quando | Depende de |
|---|---|---|---|
| **F0a — Bloqueios** | Hospedagem escolhida (4.6); acesso ao Registro.br/DNS; Search Console e Google Meu Negócio; consulta ao CREFITO (4.7) | Decisões registradas em `docs/context.md` | Fábio, Claudia |
| **F1 — Base técnica** (em paralelo com F0b) | Astro, tokens do site, fontes, `site.ts`, layout, `Section`, lint de tokens, CI, preview por PR | PR de teste publica um preview | F0a (só a hospedagem) |
| **F0b — Conteúdo** | Sublinha, fotos (seção 5), valores, texto do método, oferta para profissionais | Itens entregues | Claudia |
| **F2 — MVP** | Home com o conteúdo existente, `/privacidade`, 404, JSON-LD, sitemap, OG, analytics | Lighthouse ≥ 95 no mobile; Claudia aprovou o preview | F1 |
| **F3 — Go-live** | DNS, domínio, redirecionamentos, sistema no subdomínio | Site novo no domínio; site antigo desligado após validação | F2, F0a |
| **F4 — Páginas** | `/aulas`, `/pilates-classico`, `/profissionais`, depoimentos — cada uma quando o conteúdo chegar | Uma PR por página | F0b |
| **F5 — Formulário** (opcional) | Como na análise | Como na análise | — |

---

## 7. Backlog revisado (ordem sugerida para começar)

1. ~~Escolher hospedagem~~ ✓ (Cloudflare Pages) e confirmar acesso ao domínio (Registro.br/DNS)
2. ~~Criar projeto Astro com `tokens.css` (sem `@import`), `tokens-site.css` e fontes auto-hospedadas~~ ✓
3. ~~`src/config/site.ts` + `linkWhatsApp()` + geração do JSON-LD~~ ✓
4. ~~Adaptar `lint-tokens` (seção 4.10) e criar CI (lint de tokens, `astro check`, build)~~ ✓
5. ~~Componentes base: `Layout` (topo, rodapé, WhatsApp flutuante, pular para conteúdo), `Section` (claro/escuro/marca), `Button`, `Citacao` (bordas `[ ]`)~~ ✓ — `Card` entra com a Home
6. ~~Home (MVP) a partir da prévia, com as correções da seção 4.4 e blocos que se escondem sem conteúdo~~ ✓ — conteúdo em `src/content/` (ver `docs/context.md`)
7. ~~`/privacidade` (a 404 já existe) — publicar junto com o GA4~~ ✓
8. SEO técnico: imagem Open Graph 1200×630 e títulos das novas páginas (canonical, sitemap, `robots.txt`, JSON-LD e favicons PNG já existem)
9. ~~GA4 com aviso de consentimento + evento `click_whatsapp` por posição~~ ✓ — falta criar a propriedade e definir `PUBLIC_GA4_ID` (`docs/deploy.md`)
10. Lighthouse CI com as metas
11. Go-live: plano de DNS, redirecionamentos e, no sistema, a landing de `/` e o `robots.txt`
12. Páginas `/aulas`, `/pilates-classico`, `/profissionais` (conforme conteúdo)
13. (Fase 2) Formulário de interessados

Itens da análise que continuam valendo sem mudança: 1 (posicionamento), 14 e 15 (DNS e ajustes no sistema), 16 (Fase 2).

---

## 8. Decisões que bloqueiam o início do código

Só três decisões precisam estar fechadas para começar F1; o resto pode seguir em paralelo:

- [x] **Stack**: Astro
- [x] **Hospedagem**: Cloudflare Pages
- [x] **Analytics**: GA4 com aviso de consentimento

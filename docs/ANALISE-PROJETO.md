# Carlesso Pilates — Site de divulgação e vendas: análise do projeto

> Documento de partida para o repositório do novo site público da Carlesso Pilates.
> Data da análise: 08/10/2026. Status: **proposta para validação** (nada aqui foi decidido com a Claudia ainda).
>
> Convenção usada no texto: **[fato]** vem de uma fonte consultada (site atual, repositório do sistema);
> **[recomendação]** é opinião de projeto, para discutir; **[pendente]** é algo que ninguém ainda informou.

---

## 1. Resumo executivo

- **Objetivo.** Substituir o site atual (uma página só, num construtor de sites) por um site de divulgação e vendas
  de aulas de Pilates que leve o visitante a **agendar uma aula pelo WhatsApp**.
- **Decisão-chave [recomendação].** Fazer o site **em um projeto separado** do sistema administrativo
  (`carlessopilatesfe`), com domínio próprio, reaproveitando só o design system (tokens, fontes, símbolo).
- **Stack [recomendação].** Astro (site estático), `tokens.css` do design system, hospedagem na Vercel.
- **O que já existe.** Design system completo e documentado no repositório do sistema; texto, endereço e redes
  do site atual; e uma prévia navegável da Home (`reference/home-preview/home-preview.html`).
- **O que falta.** Fotos reais, valores dos pacotes, textos sobre o método, depoimentos autorizados e algumas
  decisões de posicionamento (seção 15).
- **Fase 2 (depois do site no ar).** Formulário de interesse ligado ao sistema. **Atenção:** a lista de espera
  do sistema exige um paciente cadastrado, então um visitante novo não consegue entrar nela sem backend novo (seção 12).

---

## 2. Contexto do negócio

| Item | Informação | Fonte |
|---|---|---|
| Nome | Carlesso Pilates | site atual |
| Posicionamento atual | "1º Studio de Pilates Clássico — Foz do Iguaçu/PR" | site atual |
| Formato das aulas | Presenciais, **duas pessoas por horário (dueto)** ou **individual (Vip class)** | site atual |
| Segundo público | Profissionais: mentorias, workshops e treinamentos | site atual |
| Equipe | Claudia Carlesso (fisioterapeuta, responsável técnica) e Camila Fornazero (fisioterapeuta e instrutora) | site atual |
| Endereço | R. Minas Gerais, 552 — Sala 02 — Vila Maracanã, Foz do Iguaçu/PR, CEP 85852-030 | site atual |
| Contato | WhatsApp `5545999191006` · contato.carlesso@gmail.com | site atual |
| Redes | instagram.com/carlessopilates · facebook.com/claudiacarlessopilates | site atual |
| Planos no sistema | Mensal, trimestral e anual, com frequência semanal | repositório do sistema (`docs/funcionalidades.md`) |

**Públicos do site [recomendação]:**
1. *Aluno em potencial* em Foz do Iguaçu — quer saber o que é o Pilates Clássico, quanto custa, onde fica e como agendar.
2. *Profissional de Pilates* — quer saber das mentorias, workshops e treinamentos.

**Ação principal do site [recomendação]:** clique no WhatsApp com mensagem pré-preenchida. Tudo o mais serve a isso.

---

## 3. Diagnóstico do site atual (carlessopilates.com.br)

> Base: leitura do HTML/texto da página. **Não avaliei o visual renderizado nem medi desempenho.**
> Confirmem visualmente os pontos marcados com (*).

**O que existe [fato]:** página única com as seções Bem-vindo, Sobre, Nosso espaço, Pacotes e Equipe; menu âncora;
botão "Agende sua aula" apontando para o WhatsApp; rodapé com endereço, e-mail, mapa do site e redes sociais.
Feito num construtor de sites (as imagens vêm de `images.builderservices.io`, hospedagem HostGator Brasil).

| # | Problema | Impacto |
|---|---|---|
| 1 | (*) A seção **Pacotes** só tem o botão do WhatsApp: no conteúdo extraído não há planos, valores nem frequência | Quem decide pelo preço sai sem resposta |
| 2 | O texto é bonito e filosófico, mas não responde "o que é Pilates Clássico?", "quanto custa?", "como é a primeira aula?" | Baixa conversão |
| 3 | `<title>` genérico: **"Principal - Carlesso Pilates"** | Ruim para busca local |
| 4 | Um card de equipe com o título "Carlesso Pilates" e sem conteúdo | Aparência de página inacabada |
| 5 | Alunos e profissionais misturados na mesma página | Mensagem confusa para os dois públicos |
| 6 | Diferenciais enterrados: 1º studio clássico da cidade, dueto/Vip, fisioterapeutas na equipe | Argumentos fortes sem destaque |
| 7 | Sem FAQ, depoimentos, mapa incorporado ou dados estruturados | Menos confiança e menos presença no Google |
| 8 | Só duas chamadas para o WhatsApp | Poucas oportunidades de clique |
| 9 | Plataforma de construtor: pouco controle de SEO, desempenho e identidade visual | Limita a evolução |

**O que funciona e deve ser mantido:** tom acolhedor, a frase "Mova-se e deixe a magia do método acontecer",
a citação sobre o desafio do Pilates, o convite "Sinta-se livre para buscar o 'seu jeito' dentro da Contrologia",
a bio da equipe e o fato de o WhatsApp já ser o canal de agendamento.

---

## 4. O que existe no repositório `FabioCarlesso/carlessopilatesfe`

[fato] Interface administrativa do estúdio. Angular 22.1 (standalone), TypeScript 6, SCSS com design tokens,
Karma/Jasmine, Docker + Nginx e deploy na Vercel. A API (Spring Boot) roda na Railway e é acessada pelo proxy `/api/*`
(`vercel.json` com *rewrite*). O "About" do GitHub ainda diz "Angular 19"; o README e o `package.json` dizem 22.

### 4.1 Pasta `assets/` (design system em protótipos HTML)

| Arquivo | O que é | Vai para o site novo? |
|---|---|---|
| `tokens.css` | **Fonte dos tokens** (cores, tipografia, espaçamento, raios, sombras, componentes) | **Sim** — copiado no kit |
| `Marca.html` | Símbolo, lockups, padronagens, citação `[ ]`, voz da marca | Referência |
| `Fundacao.html` | Cores, tipografia e voz | Referência |
| `Componentes.html` | Botões, inputs, tabelas, badges | Referência (o site usa poucos) |
| `common.jsx` | **Define o símbolo oficial** (`SymbolFancy`), `Lockup`, `Wordmark`, `PatternBackground`, `BracketFrame` | **Sim** — origem dos SVGs do kit |
| `design-canvas.jsx`, `browser-window.jsx`, `tweaks-panel.jsx` | Auxiliares para abrir os `.html` acima | Só para visualizar as referências |
| `Carlesso Admin.html`, `screens.jsx` | Telas administrativas | **Não** |

### 4.2 Pasta `public/`

- `favicon.svg` — quadrado escuro com o texto "CP". Atenção: o manual da marca (`Marca.html`) diz que o **símbolo solo**
  é para favicon, splash e empty states; o favicon atual não segue isso. O kit traz `favicon-symbol.svg`.
- `landing/*.webp` — 4 prints do sistema com dados fictícios. **Não servem** ao site público (são telas do software).
- `robots.txt` — libera só `/` e bloqueia as áreas autenticadas.

### 4.3 A landing da rota `/` do sistema

[fato] A rota `/` já é uma landing pública, mas **apresenta o produto (o software)**, com CTA "Acessar o sistema" para `/login`.
Ela foi feita para equipe/gestão, não para vender aulas. Por isso o site público **não pode** simplesmente reaproveitar `/`.

### 4.4 Convenções do repositório que vale espelhar

- Regra de documentação: cada assunto tem um arquivo dono em `docs/` (funcionalidades, rotas, arquitetura, design system, CI, deploy, decisões).
- `npm run lint:tokens` (`scripts/lint-tokens.mjs`): barra `var(--token)` inexistente, porque erro de token **não quebra build nem teste** — a propriedade só some da tela.
  O script está no kit (`tools/lint-tokens.mjs`) e precisa de ajuste de caminho e extensões (`.astro`).
- CI com jobs de lint, teste e build; Node `^22.22.3 || ^24.15.0 || >=26.0.0`.
- Nomenclatura dos tokens: `--c-*`, `--bg-*`, `--text-*`, `--border-*`, `--sp-*`, `--r-*`, `--fs-*`, `--lh-*`, `--ls-*`, `--font-*`, `--shadow-*`.
  Nomes de outros design systems (`--surface`, `--space-md`, `--c-primary`) **não existem**.

---

## 5. Identidade visual

### 5.1 Paleta (de `tokens.css`)

| Papel | Token | Hex |
|---|---|---|
| Fundo (respiro) | `--c-cloud-dancer` / `-2` / `-3` | `#f0ede8` / `#f6f4f0` / `#faf8f5` |
| Azuis de corpo | `--c-azul` / `-2` / `-3` / `-soft` | `#708da3` / `#8aa4b8` / `#a8bcca` / `#c3d0d9` |
| Transição | `--c-noite-inverno` | `#355978` |
| **Assinatura (cor do logotipo)** | `--c-horizonte` | `#374f6c` |
| Contraste / texto / fundo escuro | `--c-tempestade` | `#141f2d` |
| Neutros | `--c-grafite` · `--c-bruma` · `--c-linha` · `--c-linha-suave` | `#455157` · `#8a96a0` · `#d8d3cb` · `#e6e1d8` |
| Funcionais | success · warning · danger · info | `#5a7a5e` · `#b08842` · `#8c3a3a` · `#355978` |

### 5.2 Tipografia

| Uso | Fonte | Observação |
|---|---|---|
| Títulos (display) | **Italiana** | **Substituta** declarada no `tokens.css` para a fonte oficial *Dream Avenue* (Didone). Em produção, trocar por `@font-face` da Dream Avenue — [pendente] confirmar licença web |
| Interface e texto corrido | **Montserrat** (300–700) | Conforme o manual |
| Auxiliar, caps espaçadas, citações | **Cormorant Garamond** (itálico) | |

[recomendação] Auto-hospedar as fontes (pacotes `@fontsource/italiana`, `@fontsource/cormorant-garamond`, `@fontsource/montserrat`)
em vez de carregar do Google Fonts: melhora desempenho e remove uma dependência de terceiros.

### 5.3 Marca

- **Símbolo** [fato, `common.jsx`]: quatro círculos entrelaçados em **losango** (topo, direita, base, esquerda).
  `viewBox 120`, círculos de raio 26 em `(60,32)`, `(88,60)`, `(60,88)`, `(32,60)`, traço ~2,2, pontas arredondadas.
  Significado no manual: "centralização e fundação". Uso solo: favicon, splash e empty states.
- **Wordmark**: `CARLESSO` em **maiúsculas**, fonte display, `letter-spacing: 0.05em`.
- **Lockups**: horizontal (símbolo + wordmark + sublinha) e vertical. O manual usa as sublinhas *"Pilates e Fisioterapia"* (horizontal)
  e *"Centro de Contrologia"* (vertical). O site atual usa *"Studio de Pilates Clássico"* — **[pendente]** escolher a frase oficial.
- **Padronagem**: o símbolo repetido em tile de 120 px, em opacidade baixa (0,06–0,12 no manual). Esparsa, normal e densa.
- **Citação com moldura `[ ]`**: feita com **bordas** (colchetes quadrados de 14–16 px, linha de 1,5 px), fonte Cormorant itálica.
  Uso editorial; nunca em tabelas ou formulários.
- **Voz** (do `Marca.html`, escrita para o sistema, adaptar ao site): direta e sóbria — "Bom dia, Claudia", não "Olá!";
  "Aula realizada", não "Aula concluída com sucesso". Frase de marca no manual: *"Onde a ciência encontra a arte de mover-se."*
  (candidata a tagline do site).

### 5.4 Regras de acessibilidade já aprendidas no repositório (valem aqui)

- `--text-muted` (`#8a96a0`) rende ~2,6:1 sobre o fundo claro: serve só para texto acessório, **nunca para conteúdo**. Use `--text-secondary` (`#455157`).
- Rótulo sobre fundo que **não muda de cor** (botão primário `#374f6c`) deve usar cor fixa clara (`#f0ede8`), nunca um token que o tema escuro redefine.
- Anel de foco visível e sólido; alvos de toque ≥ 44 px; texto ≥ 4,5:1 (3:1 a partir de 24 px).
- Não usar `background:` abreviado onde há `background-image` herdado (armadilha registrada nas issues #199/#200 do sistema).

---

## 6. Decisões de arquitetura (propostas)

### D1 — Projeto separado do sistema administrativo

| Motivo | Detalhe |
|---|---|
| SEO | O site precisa de HTML pré-renderizado. O sistema é uma SPA sem SSR (as tags estão estáticas no `index.html`). |
| **Segurança** | [fato] O sistema guarda o JWT em `localStorage` (`accessToken`). Scripts de terceiros do site (analytics, pixel) **não podem** rodar na mesma origem. Em origens distintas, o `localStorage` não é compartilhado. |
| Risco/LGPD | O sistema guarda prontuário de saúde. Quanto menos ele se mistura com marketing, menor a superfície. |
| Ritmo de mudança | O site muda por conteúdo e campanha; o sistema, por regra de negócio. |

### D2 — Stack do site

| Opção | Prós | Contras |
|---|---|---|
| **Astro** (recomendada) | Estático, rápido, ótimo para SEO; importa `tokens.css` direto; componentes simples; deploy trivial | Fora da sua stack principal (Angular), curva pequena |
| Angular com prerender | Mesma stack do sistema | Pesado para um site de conteúdo; SEO exige configuração |
| Next.js estático | Ecossistema grande | Mais complexo que o necessário |
| Manter o construtor | Zero código | Não resolve os problemas da seção 3 |

### D3 — Domínio e subdomínios

- `carlessopilates.com.br` → **site público** (novo).
- `app.carlessopilates.com.br` (nome sugerido) → **sistema administrativo**, hoje em `carlessopilatesfe.vercel.app`.
- Impactos a tratar **no repositório do sistema**:
  1. A landing de `/` deve sair ou redirecionar para `/login`.
  2. `public/robots.txt` hoje faz `Allow: /$`. Com a landing removida, o subdomínio do app deve ficar inteiro como `Disallow: /`.
  3. O front chama a API pelo proxy `/api/*` (`vercel.json` → Railway); mudar o domínio em princípio não exige CORS — **[verificar]** se o backend restringe origem ou `Host`.
- DNS: quem controla hoje o domínio (HostGator ou outro)? **[pendente]**

### D4 — Hospedagem

Vercel (já em uso): *preview deploy* por PR, HTTPS automático, sem servidor.

### D5 — Conteúdo sem CMS na fase 1

Textos em arquivos do repositório (Markdown/JSON). Reavaliar CMS só se a Claudia quiser editar sozinha.

### D6 — Medição e consentimento

GA4 + eventos de clique no WhatsApp; aviso de cookies; página de privacidade. Carregar scripts só após consentimento.

---

## 7. Arquitetura da informação (sitemap v1)

[recomendação] Home completa (como na prévia) + poucas páginas que ganham tráfego de busca por conta própria.

| Rota | Objetivo | Conteúdo principal | CTA | Palavra-chave de busca |
|---|---|---|---|---|
| `/` | Apresentar e converter | Seções da seção 8 | WhatsApp "agendar aula" | pilates em Foz do Iguaçu |
| `/pilates-classico` | Explicar o método | O que é a Contrologia, para quem, como é a 1ª aula, benefícios | WhatsApp | pilates clássico Foz do Iguaçu |
| `/aulas` | Vender | Dueto, Vip class, planos e valores, regras | WhatsApp por plano | aulas de pilates dueto / individual |
| `/profissionais` | Segundo público | Mentorias, workshops, treinamentos, bio da Claudia | WhatsApp "formação" | mentoria / curso de pilates |
| `/privacidade` | Obrigação | Política de privacidade e cookies | — | — |

Equipe, estúdio e FAQ ficam como seções da Home (e podem virar páginas depois, se houver conteúdo).

---

## 8. Home — especificação (espelha `reference/home-preview/home-preview.html`)

| # | Seção | Conteúdo | Origem do texto | Pendências |
|---|---|---|---|---|
| 1 | Topo | Lockup, menu (Método, Aulas, Estúdio, Equipe, Para profissionais), botão "Agendar aula" | site atual | Sublinha oficial da marca |
| 2 | Hero | Eyebrow "1º Studio de Pilates Clássico · Foz do Iguaçu/PR"; H1 "Mova-se e deixe a magia do método acontecer."; subtítulo; 2 CTAs; foto | site atual | **Foto** |
| 3 | Diferenciais (3 cards) | Pilates Clássico · Dueto ou Vip class · Fisioterapeutas na equipe | derivado do site atual | Confirmar destaque dos fisioterapeutas |
| 4 | Método | Citação entre `[ ]` + texto de convite | site atual | **Texto sobre Contrologia** |
| 5 | Aulas e pacotes | Cards Dueto e Vip class | site atual + sistema | **Valores e frequências** |
| 6 | Estúdio | Galeria (3 fotos), endereço, mapa | site atual | **Fotos**, **mapa** |
| 7 | Equipe | Claudia e Camila (foto, papel, bio) | site atual | **Fotos** |
| 8 | Para profissionais | Faixa azul-horizonte com CTA | site atual | Escopo exato das ofertas |
| 9 | Depoimentos | 3 espaços | — | **Depoimentos, com autorização** |
| 10 | FAQ | 4 perguntas (3 respondidas com dados conhecidos) | derivado | Resposta sobre experiência prévia |
| 11 | Fechamento | "Venha praticar conosco." + CTA | site atual | — |
| 12 | Rodapé | Lockup, endereço, contato, redes | site atual | — |

Os pontos em **negrito** estão marcados na prévia com fundo âmbar ou borda tracejada. Nada foi inventado: valores, fotos e depoimentos são espaços reservados.

---

## 9. Conteúdo — pendências e responsáveis

| Item | Quem informa | Observação |
|---|---|---|
| Frase de posicionamento (Clássico × "Pilates e Fisioterapia" × "Centro de Contrologia") | Claudia + Fábio | Define H1, título das páginas e sublinha do logotipo |
| Valores, frequências e regras dos pacotes | Claudia | Confirmar mensal/trimestral/anual |
| Fotos: estúdio, aparelhos, equipe | Claudia | Hoje o repositório **não tem nenhuma foto**; o site atual tem, em baixa resolução |
| Texto "O que é a Contrologia / para quem" | Claudia | |
| Depoimentos de alunos | Claudia | Só com autorização por escrito; nunca inventar |
| Horário de funcionamento | Claudia | Entra nos dados estruturados |
| Resposta "preciso ter experiência?" | Claudia | |
| Oferta de formação para profissionais (formato, duração, valores) | Claudia | |
| Licença da fonte Dream Avenue | Fábio | Ou assumir Italiana definitivamente |
| Quem controla o DNS do domínio | Fábio | |

---

## 10. SEO local

- **Título e descrição por página** (exemplos para a Home): *"Carlesso Pilates — Pilates Clássico em Foz do Iguaçu"* · descrição de ~150 caracteres citando dueto, Vip class e fisioterapeutas.
- **H1 único por página**; hierarquia H2/H3 coerente.
- **Dados estruturados** (JSON-LD) na Home, validar no Rich Results Test:

```json
{
  "@context": "https://schema.org",
  "@type": "HealthClub",
  "name": "Carlesso Pilates",
  "description": "1º Studio de Pilates Clássico de Foz do Iguaçu/PR. Aulas em dueto e Vip class.",
  "url": "https://carlessopilates.com.br",
  "telephone": "+55-45-99919-1006",
  "email": "contato.carlesso@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "R. Minas Gerais, 552 - Sala 02 - Vila Maracanã",
    "addressLocality": "Foz do Iguaçu",
    "addressRegion": "PR",
    "postalCode": "85852-030",
    "addressCountry": "BR"
  },
  "sameAs": [
    "https://www.instagram.com/carlessopilates/",
    "https://www.facebook.com/claudiacarlessopilates/"
  ]
}
```

  Faltam `openingHours`, `geo` e `image` [pendente]. O tipo (`HealthClub` ou `SportsActivityLocation`) deve ser validado.
- **Google Meu Negócio**: perfil reivindicado, endereço, fotos e link do site idênticos ao do site (NAP consistente).
- `sitemap.xml` e `robots.txt` gerados no build; imagem Open Graph nova (1200×630).
- **Migração**: o site atual tem `sitemap.xml`; conferir no Search Console quais URLs estão indexadas e redirecionar qualquer caminho antigo para `/`.

---

## 11. Conversão e medição

**Padrão de link do WhatsApp** (número do site atual):
`https://api.whatsapp.com/send?phone=5545999191006&text=<mensagem codificada>`

| Contexto | Mensagem sugerida |
|---|---|
| Geral (topo, hero, fechamento) | Gostaria de agendar uma aula. |
| Dueto | Gostaria de agendar uma aula em dueto. |
| Vip class | Gostaria de agendar uma Vip class. |
| Profissionais | Gostaria de saber mais sobre mentorias e treinamentos para profissionais. |

- Evento GA4 `click_whatsapp` com parâmetro de **posição** (topo, hero, plano, rodapé), para saber qual seção converte.
- Botão flutuante de WhatsApp no mobile [recomendação].
- UTM nos links do Instagram e do Google Meu Negócio.

---

## 12. Fase 2 — formulário de interesse ligado ao sistema

[fato] A lista de espera do sistema (`POST /api/lista-espera`) exige `pacienteId`, e só pacientes **ativos** entram (a API recusa inativo com `422`).
Um visitante novo **não é paciente**, então não pode usar esse endpoint.

Caminhos possíveis [recomendação]:
1. **Entidade nova "interessado/lead"** no backend, com endpoint público (`POST` sem autenticação) e tela de triagem no sistema.
2. Formulário que só envia e-mail/WhatsApp para a recepção (sem tocar no sistema).

Se for o caminho 1: CAPTCHA, *rate limit*, consentimento explícito (LGPD), **nenhum campo de saúde** no formulário público,
CORS restrito ao domínio do site, e nenhuma credencial no front.

---

## 13. Qualidade, acessibilidade e desempenho

Metas sugeridas (a confirmar):
- Lighthouse ≥ 95 em Desempenho, Acessibilidade, SEO e Boas práticas, no mobile.
- Imagens em WebP/AVIF com `width`/`height` e `srcset`; só a imagem do hero sem `loading="lazy"`.
- Zero bibliotecas JS desnecessárias; JS só para FAQ (ou nem isso — `<details>`), consentimento e eventos.
- Contraste, foco visível, alvo de toque e landmarks conforme a seção 5.4.
- Lint de tokens (`tools/lint-tokens.mjs` adaptado) no CI.
- Responsivo de 320 px a 1440 px: menus quebram em linha, nada de rolagem horizontal.

---

## 14. Estrutura sugerida do repositório

```
carlesso-pilates-site/
├── README.md                  # só como instalar e rodar
├── CLAUDE.md                  # contexto para agentes (espelhar o do sistema)
├── docs/
│   ├── README.md              # índice e "dono de cada assunto"
│   ├── ANALISE-PROJETO.md     # este documento (histórico)
│   ├── design-system.md       # tokens, marca, regras de acessibilidade
│   ├── conteudo.md            # textos aprovados e pendências
│   ├── seo.md                 # títulos, JSON-LD, redirecionamentos
│   ├── deploy.md              # Vercel, DNS, domínio
│   └── context.md             # decisões técnicas e o porquê
├── public/                    # favicon, robots, og-image, fotos otimizadas
├── src/
│   ├── styles/tokens.css      # cópia de assets/tokens/tokens.css
│   ├── components/
│   ├── pages/
│   └── content/
├── tools/lint-tokens.mjs
├── reference/                 # protótipos do design system (não entra no build)
└── .github/workflows/ci.yml   # lint, build, Lighthouse CI
```

Convenções a espelhar do sistema: cada assunto com um arquivo dono em `docs/`; token inexistente barrado no lint; Node alinhado ao do sistema.

---

## 15. Decisões em aberto

- [ ] Frase oficial de posicionamento e sublinha do logotipo
- [ ] Astro como stack (ou outra)
- [ ] Nome do subdomínio do sistema e destino da landing de `/`
- [ ] Quem controla o DNS e quando fazer a troca
- [ ] Dream Avenue (licença web) ou Italiana definitiva
- [ ] Sessão de fotos: quando e com quem
- [ ] Valores e frequências dos pacotes
- [ ] Haverá página própria para profissionais já na v1?
- [ ] Fase 2: lead novo no backend ou só e-mail/WhatsApp?

---

## 16. Roadmap

| Fase | Entregas | Pronto quando | Tamanho |
|---|---|---|---|
| F0 — Decisões e conteúdo | Itens da seção 15 e da seção 9 | Textos, fotos e valores em mãos | M (depende da Claudia) |
| F1 — Base técnica | Repositório, Astro, tokens, fontes, layout, lint de tokens, CI, deploy de *preview* | PR de teste publica um preview | P |
| F2 — Home e páginas | Home completa + `/pilates-classico`, `/aulas`, `/profissionais`, `/privacidade` | Revisão da Claudia aprovada no preview | M |
| F3 — SEO e medição | Títulos, JSON-LD, sitemap, OG, GA4, consentimento, Google Meu Negócio alinhado | Rich Results Test sem erro; eventos chegando | P |
| F4 — Go-live | DNS, domínio, sistema para o subdomínio, `robots.txt` do app, site antigo mantido até validar | Site novo em `carlessopilates.com.br` e sistema no subdomínio | P–M |
| F5 — Formulário (opcional) | Endpoint público e triagem no sistema | Lead cai no sistema com consentimento | G |

---

## 17. Riscos e pontos de atenção

| Risco | Mitigação |
|---|---|
| Sem fotos reais o site fica genérico | Fazer a sessão de fotos antes de F2 |
| Troca de DNS derruba o site ou o e-mail | Reduzir TTL antes; manter o site antigo até validar; checar registros de e-mail |
| Fonte Dream Avenue sem licença | Decidir cedo; Italiana é a opção segura |
| Depoimentos sem autorização | Só publicar com autorização por escrito |
| Scripts de terceiros na mesma origem do sistema | Manter **site e app em origens distintas** (D1) |
| Texto da marca divergente (Clássico × Fisioterapia × Contrologia) | Fechar o posicionamento na F0 |
| Landing de produto em `/` continuar indexada | Remover/redirecionar e ajustar `robots.txt` do app |

---

## 18. Backlog inicial sugerido (títulos de issue)

1. Definir posicionamento e sublinha do logotipo
2. Criar repositório e projeto Astro com tokens do design system
3. Auto-hospedar fontes (Italiana, Cormorant Garamond, Montserrat)
4. Componentes base: topo, botão, card, faixa de seção, citação `[ ]`, rodapé
5. Implementar a Home a partir da prévia de referência
6. Página `/pilates-classico`
7. Página `/aulas` com planos e valores
8. Página `/profissionais`
9. Página `/privacidade` e aviso de cookies
10. Dados estruturados, sitemap, `robots.txt` e imagem Open Graph
11. GA4 com evento `click_whatsapp` por posição
12. Adaptar `lint-tokens` ao projeto e ligar no CI
13. Lighthouse CI com metas
14. Plano de DNS e troca do domínio
15. No sistema: remover/redirecionar a landing de `/` e ajustar `robots.txt`
16. (Fase 2) Desenho do endpoint público de interessados

---

## Apêndice A — Texto atual do site (para migração)

> Texto do site de hoje, como fonte de verdade para a migração. Revisar antes de publicar.

**Bem-vindo a Carlesso Pilates** — botão "Agende sua aula".

**Carlesso Pilates (Sobre)**
"Pilates te desafia em todos os momentos. Seja no equilíbrio, na força, mobilidade."
Se permitir vivenciar as transformações de dentro para fora. Não somente corpo, mas sentir e viver a sua verdade.
Enquanto couber ao nosso trabalho iremos dar ao máximo a nossa entrega para propagar esse lindo sistema de exercícios e conexões.
Apreciar a jornada, os processos que o método irá lhe mostrar e saborear cada conquista!
Sinta-se livre para buscar o "SEU JEITO" dentro da Contrologia.

**Nosso espaço**
Será um prazer recebê-lo no estúdio! Trabalhamos com duas pessoas por horário ou se preferir no sistema individualizado.
Ofertamos mentorias, workshops e treinamentos para profissionais. Venha praticar conosco!

**Pacotes** — (no conteúdo extraído, apenas o botão "Agende sua aula").

**Equipe**
- *Claudia Carlesso* — Fisioterapeuta e responsável técnica do estúdio Carlesso Pilates, certificada no conceituado programa de formação de Pilates - Strength Pilates Certification Program. Há mais de 10 anos atuando com método Pilates, ofertando mentorias, workshops e treinamentos para profissionais.
- *Camila Fornazero* — Fisioterapeuta e instrutora de Pilates. Bailarina desde os 5 anos de idade. Praticante de vários esportes como natação, basquete e musculação. Atualmente estudando e aperfeiçoando seu conhecimento no método Pilates.

**Rodapé** — 1º Studio de Pilates Clássico - Foz do Iguaçu/PR. Aulas presenciais para duetos e Vip class. Venha praticar conosco!

**Meta description atual:** "1º Studio de Pilates Clássico - Foz do Iguaçu/PR" seguida da citação sobre o desafio do Pilates e do convite "Mova-se e deixe a magia do método acontecer!".

## Apêndice B — Fontes consultadas

- Site atual: https://carlessopilates.com.br
- Repositório do sistema: https://github.com/FabioCarlesso/carlessopilatesfe (clonado em 08/10/2026; último commit lido: "Merge pull request #245 … feat/244-landing-page")
- Arquivos lidos: `assets/tokens.css`, `assets/Marca.html`, `assets/common.jsx`, `assets/README.md`, `docs/design-system.md`, `docs/funcionalidades.md`, `docs/rotas.md`, `docs/deploy.md`, `CLAUDE.md`, `vercel.json`, `public/robots.txt`, `public/favicon.svg`, `scripts/lint-tokens.mjs`

## Apêndice C — Conteúdo do kit

Ver `README.md` na raiz do kit e `assets/README.md`.

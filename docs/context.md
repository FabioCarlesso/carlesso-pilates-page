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
Os botões de WhatsApp já marcam a posição em `data-whatsapp` (topo, hero, fechamento, flutuante, rodape, 404).
Implementação: item 9 do backlog (`REVISAO-PLANEJAMENTO.md`, seção 7). Ao implementar:
- banner com "Aceitar" e "Recusar" de mesmo peso visual, sem caixa pré-marcada;
- escolha guardada no navegador e revogável por link no rodapé;
- política de privacidade (`/privacidade`) publicada junto, citando GA4 e a finalidade;
- o banner não pode cobrir o botão flutuante de WhatsApp no celular.

### Fonte única de dados (08/10/2026)

Telefone, endereço, redes, mensagens de WhatsApp e URL ficam em `src/config/site.ts`; o JSON-LD é gerado dele
(`src/lib/schema.ts`). Nenhum componente escreve esses dados à mão. Campo ainda não informado fica `undefined`
e o bloco correspondente não aparece.

### Link de WhatsApp (08/10/2026)

`https://wa.me/<número>?text=…`, montado por `linkWhatsApp(contexto)`. Toda mensagem começa com
"Olá! Vim pelo site." para a recepção contar os contatos vindos do site.

## Em aberto

- [ ] Frase oficial de posicionamento e sublinha do logotipo (`site.sublinha` usa "Pilates Clássico" provisoriamente)
- [ ] Dream Avenue (licença web) ou Italiana definitiva
- [ ] Nome do subdomínio do sistema e destino da landing de `/`
- [ ] Quem controla o domínio no Registro.br e o DNS; quando fazer a troca
- [ ] Regras de publicidade do COFFITO/CREFITO-8 (preços, depoimentos, registro da responsável técnica)
- [ ] Valores e frequências dos pacotes
- [ ] Fase 2: lead novo no backend ou só e-mail/WhatsApp?

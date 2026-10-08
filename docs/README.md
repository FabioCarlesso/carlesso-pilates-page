# Documentação

Cada assunto tem um arquivo dono. Ao mudar algo, atualize o arquivo do assunto.

| Arquivo | Assunto |
|---|---|
| [`context.md`](context.md) | Decisões técnicas, o porquê e o que está em aberto |
| [`design-system.md`](design-system.md) | Tokens, tons de seção, fontes, marca, regras de acessibilidade |
| [`deploy.md`](deploy.md) | Cloudflare Pages, cabeçalhos, domínio e DNS |
| [`REVISAO-PLANEJAMENTO.md`](REVISAO-PLANEJAMENTO.md) | Roadmap e backlog em vigor |
| [`ANALISE-PROJETO.md`](ANALISE-PROJETO.md) | Análise inicial (histórico): diagnóstico do site atual, conteúdo, SEO, Fase 2 |

A análise inicial cita caminhos do kit de partida (`assets/…`), que foram reorganizados:
`assets/tokens/tokens.css` → `src/styles/tokens.css` (só o `:root`), `assets/brand/` → `public/` e `public/brand/`,
`assets/tools/lint-tokens.mjs` → `tools/lint-tokens.mjs`, `assets/README.md` → `design-system.md`.

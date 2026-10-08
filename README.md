# Kit de partida — site de divulgação e vendas da Carlesso Pilates

Material para iniciar o repositório do site público. **Comece por `docs/ANALISE-PROJETO.md`** e depois leia
`docs/REVISAO-PLANEJAMENTO.md`, que ajusta a ordem das fases e corrige pontos do kit antes da construção.

```
.
├── README.md
├── docs/
│   ├── ANALISE-PROJETO.md        # análise completa, decisões, roadmap e backlog
│   └── REVISAO-PLANEJAMENTO.md   # revisão do plano: MVP, correções do kit, roadmap e backlog revisados
├── assets/
│   ├── README.md                 # o que cada arquivo é e como usar
│   ├── brand/                    # símbolo, lockups, padronagem, favicons (SVG)
│   ├── tokens/tokens.css         # tokens do design system (cópia fiel)
│   └── tools/lint-tokens.mjs     # lint de tokens do sistema (precisa de ajuste)
└── reference/
    ├── home-preview/home-preview.html   # prévia estática da Home
    └── design-system/                   # protótipos do sistema (Marca, Fundação, Componentes)
```

## Como usar no repositório novo

1. Crie o projeto (a análise recomenda Astro) e copie `assets/` e `docs/` para dentro dele.
2. Leve `assets/tokens/tokens.css` para `src/styles/` e `assets/brand/*.svg` para `public/` (ou `src/assets/`).
3. Mantenha `reference/` fora do build (ele é só consulta).
4. Abra `reference/home-preview/home-preview.html` no navegador para ver o visual de referência da Home.

## Estado dos materiais

- **Pendentes de fornecer:** fotos reais, valores dos pacotes, textos do método, depoimentos autorizados (ver seção 9 da análise).
- **Pendente de decidir:** frase oficial de posicionamento (os lockups estão sem sublinha de propósito).
- **Origem:** repositório `FabioCarlesso/carlessopilatesfe` (clonado em 08/10/2026) e site `carlessopilates.com.br`.

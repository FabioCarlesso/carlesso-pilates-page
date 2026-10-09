/**
 * GA4 (docs/context.md, D6). Fica fora de site.ts porque `import.meta.env` só
 * existe dentro do Astro, e site.ts também é lido pelo astro.config.mjs.
 *
 * `PUBLIC_GA4_ID` é definido só no ambiente de produção do Cloudflare Pages
 * (docs/deploy.md). Sem ele — dev local e previews — não há banner nem GA4.
 */
export const ga4Id: string | undefined = import.meta.env.PUBLIC_GA4_ID || undefined;

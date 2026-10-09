// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { site } from './src/config/site.ts';

export default defineConfig({
  site: site.url,
  // Saída estática servida pelo Cloudflare Pages (docs/deploy.md).
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    // Scripts e CSS sempre em arquivo: a Content-Security-Policy (public/_headers) não libera código inline.
    build: { assetsInlineLimit: 0 }
  },
  build: { inlineStylesheets: 'never' }
});

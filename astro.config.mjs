// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { site } from './src/config/site.ts';

export default defineConfig({
  site: site.url,
  // Saída estática servida pelo Cloudflare Pages (docs/deploy.md).
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()]
});

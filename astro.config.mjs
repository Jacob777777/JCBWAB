import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import rehypeAdSlots from './src/plugins/rehype-ad-slots.mjs';
import rehypeExternalLinks from './src/plugins/rehype-external-links.mjs';

// 涓婄窔寰岃珛鎶?site 鏀规垚浣犵殑姝ｅ紡缍插潃
export default defineConfig({
  site: 'https://nian-gao.idv.tw',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { hosts: ['nian-gao.idv.tw'] }],
      [rehypeAdSlots, { every: 3 }],
    ],
  },
  vite: { plugins: [tailwindcss()] },
});



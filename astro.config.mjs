import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import rehypeAdSlots from './src/plugins/rehype-ad-slots.mjs';
import rehypeExternalLinks from './src/plugins/rehype-external-links.mjs';

// 上線後請把 site 改成你的正式網址
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { hosts: ['example.com'] }],
      [rehypeAdSlots, { every: 3 }],
    ],
  },
  vite: { plugins: [tailwindcss()] },
});


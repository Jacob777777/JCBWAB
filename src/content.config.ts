import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 把 Markdown 丟進 src/content/blog/ 即可自動生成文章頁。
// 所有欄位都有預設值，缺漏不會報錯。
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().default('未命名文章'),
    description: z.string().optional(),
    pubDate: z.coerce.date().default(() => new Date()),
    category: z.string().default('未分類'),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };


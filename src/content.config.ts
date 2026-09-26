import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '*/index.mdoc', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    coverImage: z.string().optional(),
    description: z.string().optional(),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '*/index.mdoc', base: 'src/content/docs' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['architecture', 'guides', 'api']).default('guides'),
    order: z.number().default(0),
  }),
});

const cheatsheets = defineCollection({
  loader: glob({ pattern: '*/index.mdoc', base: 'src/content/cheatsheets' }),
  schema: z.object({
    title: z.string(),
    language: z.string().optional(),
    summary: z.string().optional(),
  }),
});

export const collections = { blog, docs, cheatsheets };

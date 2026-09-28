import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sectionEnum = z.enum([
  'math-finance',
  'ai-frontier',
  'reading-cognition',
  'build-in-public',
]);

const series = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/series' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    section: sectionEnum,
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    prerequisite: z.string().default('无先修要求'),
    series: z.string(),
    seriesPart: z.number().default(1),
    tags: z.array(z.string()).default([]),
    githubDemo: z.string().url().optional(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { series, articles };

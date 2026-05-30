import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    category: z.enum(['tech', 'martial-arts']),
    excerpt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const workCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/dev/case-studies' }),
  schema: z.object({
    title: z.string(),
    projectContext: z.string(),
    coverImage: z.string().optional(),
    problem: z.string().optional(),
    solution: z.string().optional(),
    outcome: z.string().optional(),
    technologies: z.array(z.string()),
    externalUrl: z.string().url().optional(),
    externalLabel: z.string().default('View Project'),
    hasDetailPage: z.boolean().default(true),
    isPublic: z.boolean().default(true),
    order: z.number().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  work: workCollection,
};

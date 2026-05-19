import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    category: z.enum(['tech', 'martial-arts']),
    excerpt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const workCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    projectContext: z.string(),
    coverImage: z.string().optional(),
    problem: z.string(),
    solution: z.string(),
    outcome: z.string(),
    technologies: z.array(z.string()),
    isPublic: z.boolean().default(true),
    order: z.number().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  work: workCollection,
};

import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const exercises = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/exercises' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
      image: image().optional(),
      tags: z.array(z.string()).optional(),
      authors: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
    }),
})

const doubts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/doubts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
      image: image().optional(),
      tags: z.array(z.string()).optional(),
      authors: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
    }),
})

const anecdotes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/anecdotes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
      image: image().optional(),
      tags: z.array(z.string()).optional(),
      authors: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
    }),
})

/*const doctrines = defineCollection({
  loader: glob({ pattern: '**!/!*.{md,mdx}', base: './src/content/doctrines' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      image: image(),
      link: z.string().url(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
    }),
})*/
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
      image: image(),
      link: z.string().url(),
      startDate: z.coerce.date().optional(),
    }),
})
export const collections = { exercises, doubts, anecdotes, projects }

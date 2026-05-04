import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    era: z.enum(['Sundowning', 'This Place', 'Take Me Back to Eden', 'Even in Arcadia', 'Inter-cycle', 'Méta']).optional(),
    confidence: z.number().min(0).max(1).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };

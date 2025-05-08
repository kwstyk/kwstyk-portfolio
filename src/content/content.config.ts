import { z, defineCollection } from 'astro:content';

export const collections = {
  proofs: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      category: z.string(), 
      difficulty: z.enum(['easy','medium','hard','expert']),
      repro: z.array(
        z.enum(['docker','terraform','vagrant','manual'])
      ),
      stack: z.array(z.string()),
      updated: z.string(),
      tags: z.array(z.string()).optional(),
      ci_status: z.string().url().optional(),
      description: z.string().optional(),
      icon: z.string().optional(),
      badge: z.string().optional(),
    }),
  }),

  structure: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      difficulty: z.enum(['easy', 'medium', 'hard', 'expert']),
      repro: z.array(z.enum(['docker', 'terraform', 'vagrant', 'manual'])),
      updated: z.string(),
      tags: z.array(z.string()).optional(),
      badge: z.string().optional(),
      icon: z.string().optional(),
      color: z.string().optional(),
    }),
  }),

  descriptions: defineCollection({
    type: 'content',
    schema: z.object({
      title:       z.string(),
      description: z.string(),
      updated:     z.string().optional(),
      // 追加項目は適宜
    }),
  }),
};

import { z, defineCollection } from 'astro:content';

export const collections = {
  proofs: defineCollection({
    schema: z.object({
      title: z.string(),
      difficulty: z.enum(['easy','medium','hard','expert']),
      repro: z.array(
        z.enum(['docker','terraform','vagrant','manual'])
      ),
      stack: z.array(z.string()),
      updated: z.string(),
      tags: z.array(z.string()).optional(),
      ci_status: z.string().url().optional(),
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

      // ← 以下を追加して badge/icon/color を許容
      badge: z.string().optional(),
      icon: z.string().optional(),
      color: z.string().optional(),
    }),
  }),
};

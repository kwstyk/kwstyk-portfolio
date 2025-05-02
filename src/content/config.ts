import { defineCollection, z } from "astro:content";

export const collections = {
  proofs: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      difficulty: z.enum(["easy", "medium", "hard", "expert"]),
      repro: z.union([z.string(), z.array(z.string())]),
      stack: z.array(z.string()),
      updated: z.string(),
      tags: z.array(z.string()).optional(),
      ci_status: z.string().optional(),
    }),
  }),
};

import { defineCollection, z } from "astro:content";

export const collections = {
  proofs: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      difficulty: z.enum(["easy", "medium", "hard", "expert"]),
      repro: z.array(z.enum(["docker", "terraform", "vagrant", "manual"])),
      stack: z.array(z.string()),
      updated: z.string(),          // ISO 日付に縛りたければ z.date()
      tags: z.array(z.string()).optional(),
      ci_status: z.string().url().optional(),
    }),
  }),
};

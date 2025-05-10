// src/utils/schema/proof.ts
import { z } from 'zod';

export const proofSchema = z.object({
  // slug は front-matter からは不要なので省略 or optional に
  // slug: z.string().optional(),

  difficulty: z.enum(['easy','medium','hard','expert']),
  repro:      z.array(z.enum(['docker','terraform','vagrant','manual'])),
  stack:      z.array(z.string()),
  updated:    z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
    message: 'must be ISO date (YYYY-MM-DD)',
  }),
  tags:       z.array(z.string()).optional(),
  ci_status:  z.string().url().optional(),
  stories:    z.array(z.string()).optional(),
  why_md:     z.string().optional(),
});

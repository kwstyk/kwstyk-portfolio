import { z } from 'zod'

export const proofSchema = z.object({
  title:       z.string(),
  difficulty:  z.enum(['easy','medium','hard','expert']),
  repro:       z.array(z.enum(['docker','terraform','vagrant','manual'])),
  stack:       z.array(z.string()),
  updated:     z.string(),
  tags:        z.array(z.string()),
  ci_status:   z.string().optional()
})

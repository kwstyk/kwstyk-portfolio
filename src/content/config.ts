// src/content/content.config.ts
import { z, defineCollection} from 'astro:content';

export const collections = {
  // proofs コレクションの定義
  proofs: defineCollection({
    type: 'content',
    schema: z.object({
      title:      z.string(),
      category:   z.string(),
      difficulty: z.enum(['easy','medium','hard','expert']),
      repro:      z.array(z.enum(['docker','terraform','vagrant','manual'])),
      stack:      z.array(z.string()),
      updated:    z.string(),
      tags:       z.array(z.string()).optional(),
      ci_status:  z.string().url().optional(),
      description:z.string().optional(),
      icon:       z.string().optional(),
      badge:      z.string().optional(),
    }),
  }),

  // structure コレクションの定義
  structure: defineCollection({
    type: 'content',
    schema: z.object({
      title:       z.string(),
      description: z.string(),
      difficulty:  z.enum(['easy','medium','hard','expert']),
      repro:       z.array(z.enum(['docker','terraform','vagrant','manual'])),
      updated:     z.string(),
      tags:        z.array(z.string()).optional(),
      badge:       z.string().optional(),
      icon:        z.string().optional(),
      color:       z.string().optional(),
    }),
  }),

  // descriptions コレクションの定義（カテゴリ紹介用）
  descriptions: defineCollection({
    type: 'content',
    schema: z.object({
      title:       z.string(),
      description: z.string(),
      updated:     z.string().optional(),
      // 必要に応じてフィールドを追加
    }),
  }),

    /* -------- Intro markdown -------- */
  structureIntro: defineCollection({
    type: 'content',
    schema: z.object({
      title:       z.string(),
      description: z.string(),
      updated:     z.string().optional(),
    }),
  }),
  
} as Record<string, ReturnType<typeof defineCollection>>;



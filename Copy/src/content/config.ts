// src/content/config.ts
import { z, defineCollection} from 'astro:content';

export const collections = {
  // proofs コレクションの定義
  proofs: defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title:      z.string(),
      description:z.string().optional(),
      category:   z.string(),
      difficulty: z.enum(['easy','medium','hard','expert']),
      repro:      z.array(z.enum(['docker','terraform','vagrant','manual'])),
      stack:      z.array(z.string()),
      updated:    z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      /* 追加 ↓↓↓ */
      progress:   z.number().int().min(0).max(100).optional(),
      stories:    z.array(z.string()).optional(),
      why_md:     z.string().optional(),
      /* 既存 */
      tags:       z.array(z.string()).optional(),
      ci_status:  z.string().url().optional(),
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

// stories コレクションの定義
stories: defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    date:        z.string(),            // または z.date() でもOK
    description: z.string().optional(),
    updated:     z.string().optional(), // 任意フィールド
    tags:        z.array(z.string()).optional(),
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
  
} as Record<string, ReturnType<typeof defineCollection>>;



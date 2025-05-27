// scripts/validate-frontmatter.cjs
const fs = require('fs').promises;
const glob = require('fast-glob');
const matter = require('gray-matter');
const { z } = require('zod');

// → ここに proofSchema を定義 (TypeScript版と同じスキーマ)
const proofSchema = z.object({
  difficulty: z.enum(['easy','medium','hard','expert']),
  repro:      z.array(z.enum(['docker','terraform','vagrant','manual'])),
  stack:      z.array(z.string()),
  updated:    z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: 'must be ISO date' }),
  tags:       z.array(z.string()).optional(),
  ci_status:  z.string().optional(),
  stories:    z.array(z.string()).optional(),
  why_md:     z.string().optional(),
});

(async () => {
  const files = await glob('src/content/proofs/**/*.md');
  let ok = true;
  for (const file of files) {
    const raw = await fs.readFile(file, 'utf-8');
    const { data } = matter(raw);
    try {
      proofSchema.parse(data);
    } catch (err) {
      console.error(`❌ ${file} の front-matter エラー:`, err.errors);
      ok = false;
    }
  }
  if (!ok) process.exit(1);
  console.log('✅ 全 front-matter が正しく検証されました');
})();

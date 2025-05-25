// scripts/mdx2md.ts
// 目的：Proof用 .mdx ファイルを Frontmatter含む .md に変換（構造保全・JSX除去）

import fs from 'fs/promises';
import glob from 'fast-glob';
import matter from 'gray-matter';

/**
 * .mdx → .md に変換するメイン関数
 * - Frontmatterを維持したまま content を変換
 * - JSX構文は除去される（Markdownとして出力）
 */
async function convertAllMdxToMd(): Promise<void> {
  const files = await glob('src/content/proofs/**/*.mdx');

  for (const file of files) {
    try {
      // ▼ ファイル読み込み
      const raw = await fs.readFile(file, 'utf-8');

      // ▼ Frontmatterと本文を分離
      const { data, content } = matter(raw);

      // ▼ 再構築されたMarkdown文字列
      const markdown = matter.stringify(content, data);

      // ▼ 拡張子を .md に置換して保存
      const outPath = file.replace(/\.mdx$/, '.md');
      await fs.writeFile(outPath, markdown);

      console.log(`✅ Converted: ${file} → ${outPath}`);

    } catch (err) {
      console.error(`❌ Error converting ${file}:`, (err as Error).message);
    }
  }
}

// 実行
convertAllMdxToMd().catch((err) => {
  console.error('💥 Unexpected Error:', (err as Error).message);
  process.exit(1);
});

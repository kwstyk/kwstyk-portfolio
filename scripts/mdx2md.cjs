#!/usr/bin/env node
// scripts/mdx2md.js
// 目的：content コレクション内の .mdx ファイルを .md に変換（Frontmatter そのまま）

const fs = require('fs').promises;
const glob = require('fast-glob');
const matter = require('gray-matter');

async function convertAllMdxToMd() {
  // ▼ 対象ファイル（Proof コレクション下の .mdx）
  const files = await glob('src/content/proofs/**/*.mdx');

  for (const file of files) {
    try {
      // ▼ ファイル読み込み
      const raw = await fs.readFile(file, 'utf-8');

      // ▼ gray-matter で Frontmatter + 本文を分離
      const { data, content } = matter(raw);

      // ▼ 再構成して .md 文字列に
      const mdString = matter.stringify(content, data);

      // ▼ 出力ファイル名を .md に置換
      const outPath = file.replace(/\.mdx$/, '.md');

      // ▼ ファイル書き出し
      await fs.writeFile(outPath, mdString);
      console.log(`✅ Converted: ${file} → ${outPath}`);

    } catch (err) {
      console.error(`❌ Failed to convert ${file}:`, err.message);
    }
  }
}

// 実行本体
convertAllMdxToMd().catch((err) => {
  console.error('💥 Unexpected Error:', err);
  process.exit(1);
});

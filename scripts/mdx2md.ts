// scripts/mdx2md.ts
import fs from 'fs/promises'
import glob from 'fast-glob';
import matter from 'gray-matter';

async function convert() {
  const files = await glob('src/content/proofs/**/*.mdx');
  for (const file of files) {
    const src = await fs.readFile(file, 'utf-8');
    const { data, content } = matter(src);
    const md = matter.stringify(content, data);
    const outPath = file.replace(/\.mdx$/, '.md');
    await fs.writeFile(outPath, md);
    console.log(`Converted: ${file} → ${outPath}`);
  }
}

convert();

// astro.config.mjs — Astro プロジェクトのグローバル設定
import { defineConfig } from 'astro/config';
import path from 'path';

/* ────────────── Astro Integrations ────────────── */
import tailwind from '@astrojs/tailwind';   // TailwindCSS
import react from '@astrojs/react';         // React Island
import mdx from '@astrojs/mdx';             // MDX (.md は除外)
import vercel from '@astrojs/vercel';       // Vercel 向けデプロイ

/* ────────────── remark / rehype plugins ────────────── */
import remarkDirective from 'remark-directive';               // :::directive
import remarkDirectiveRehype from 'remark-directive-rehype'; // mdast→hast変換（最後に必須）
import remarkGfm from 'remark-gfm';                           // GitHub Flavored Markdown

// ⬇ 自作 directive 解釈プラグイン群
import remarkAlert from './src/plugins/remark-alert.js';
import remarkCopyBlock from './src/plugins/remark-copyblock.js';
import remarkDirectory from './src/plugins/remark-directory.js';
import remarkKwCallout from './src/plugins/remark-kwstyk-callout.js';
import remarkInclude from './src/plugins/remark-include.js';
import remarkMermaidJs from 'remark-mermaidjs'; // Mermaid 図

// ⬇ rehype（HTML変換後に操作する）プラグイン
import rehypeRaw from 'rehype-raw';                         // HTMLタグ安全に処理
import rehypeExtLinks from 'rehype-external-links';         // target="_blank" など
import rehypeCopyButton from './src/plugins/rehype-copy-button.js'; // コピーボタン注入

/* ▼ Markdown 処理ルール（順序厳守） */
const remarkList = [
  remarkDirective,           // 最初に directive 構文を AST に取り込む
  remarkAlert,
  remarkCopyBlock,
  remarkDirectory,
  remarkKwCallout,           // ↑ 自作 directive 解釈群
  remarkGfm,
  remarkInclude,
  [remarkMermaidJs, { launchOptions: { headless: true } }],
  remarkDirectiveRehype,     // 最後に mdast → hast
];

const rehypeList = [
  rehypeRaw,
  rehypeExtLinks,
  rehypeCopyButton,
];

export default defineConfig(({ command }) => ({
  /* ────────────── TypeScript / Markdown ────────────── */
  typescript: false,

  markdown: {
    // シンタックスハイライト：Shiki (mermaidは除外)
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    remarkPlugins: remarkList,
    rehypePlugins: rehypeList,
  },

  /* ────────────── Astro integrations ────────────── */
  integrations: [
    tailwind({ config: './tailwind.config.cjs' }),
    react(),
    mdx({
      extension: ['.mdx'], // .md は除外 → content コレクションで扱う
      remarkPlugins: remarkList,
      rehypePlugins: rehypeList,
    }),
    command === 'build' && vercel(), // 本番ビルド時のみ有効化
  ],

  /* ────────────── Content Collection (.md用) ────────────── */
  content: {
    entryExtensions: ['.md', '.mdx'], // 明示的に .md を含める
    markdown: {
      syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
      remarkPlugins: remarkList,
      rehypePlugins: rehypeList,
    },
  },

  /* ────────────── Vite / エイリアス設定 ────────────── */
  vite: {
    esbuild: {
      tsconfigSearch: false,
      tsconfigRaw: '{}',
    },
    resolve: {
      alias: {
        '@': path.resolve('.', 'src'),
        '@vercel/og/jsx-runtime': '@vercel/og', // VercelのOG画像用パッチ
      },
    },
  },
}));

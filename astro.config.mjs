// astro.config.mjs
import { defineConfig } from 'astro/config';
import path    from 'path';

/* ── Astro integrations ───────────────────────── */
import tailwind from '@astrojs/tailwind';
import react    from '@astrojs/react';
import mdx      from '@astrojs/mdx';     // ← .md は扱わせない
import vercel   from '@astrojs/vercel';

/* ── remark / rehype plugins ───────────────────── */
import remarkDirective       from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import remarkGfm             from 'remark-gfm';

import remarkAlert      from './src/plugins/remark-alert.js';
import remarkCopyBlock  from './src/plugins/remark-copyblock.js';
import remarkDirectory  from './src/plugins/remark-directory.js';
import remarkKwCallout  from './src/plugins/remark-kwstyk-callout.js';
import remarkInclude    from './src/plugins/remark-include.js';
import remarkMermaidJs  from 'remark-mermaidjs';

import rehypeRaw        from 'rehype-raw';
import rehypeExtLinks   from 'rehype-external-links';
import rehypeCopyButton from './src/plugins/rehype-copy-button.js';

/* ── ① remarkPlugins の順序を厳守 ────────────────
 *  - remarkDirective          （directive 構文を mdast に）
 *  - すべての “directive を読むカスタムプラグイン”
 *  - remarkGfm 等ふつうの remark プラグイン
 *  - remarkDirectiveRehype    （必ず最後！ mdast → hast）
 */
const remarkList = [
  remarkDirective,
  /* ↓ directive を解釈する自作プラグイン群 */
  remarkAlert,
  remarkCopyBlock,
  remarkDirectory,
  remarkKwCallout,
  /* ↓ その他 Markdown 拡張 */
  remarkGfm,
  remarkInclude,
  [remarkMermaidJs, { launchOptions: { headless: true } }],
  /* ★最後に置く */
  remarkDirectiveRehype,
];

const rehypeList = [
  rehypeRaw,          // HTML を安全にパース
  rehypeExtLinks,     // target="_blank" 等
  rehypeCopyButton,   // コピーボタン挿入
];

export default defineConfig(({ command }) => ({
  /* ───────────────────────────────────────────── */
  typescript: false,

  /* ページ直書き (.astro) に適用する Markdown 設定 */
  markdown: {
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    remarkPlugins: remarkList,
    rehypePlugins: rehypeList,
  },

  /* ── integrations ──────────────────────────── */
  integrations: [
    tailwind({ config: './tailwind.config.cjs' }),
    react(),
    mdx({
      /* ★ .md は扱わせず、.mdx 専用にする */
      extension: ['.mdx'],
      remarkPlugins: remarkList,
      rehypePlugins: rehypeList,
    }),
    command === 'build' && vercel(),
  ],

  /* ── Content Collections (.md をここで処理) ─── */
  content: {
    entryExtensions: ['.md', '.mdx'],   // ← .md を確実に含める
    markdown: {
      syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
      remarkPlugins: remarkList,
      rehypePlugins: rehypeList,
    },
  },

  /* ── Vite alias 等 ─────────────────────────── */
  vite: {
    esbuild: { tsconfigSearch: false, tsconfigRaw: '{}' },
    resolve: {
      alias: {
        '@': path.resolve('.', 'src'),
        '@vercel/og/jsx-runtime': '@vercel/og',
      },
    },
  },
}));

// astro.config.mjs
import { defineConfig } from 'astro/config';
import path     from 'path';

// ─ Integrations ─
import tailwind from '@astrojs/tailwind';
import react    from '@astrojs/react';
import mdx      from '@astrojs/mdx';
import vercel   from '@astrojs/vercel';

// ─ remark / rehype ─
import remarkDirective      from 'remark-directive';
import remarkGfm            from 'remark-gfm';
import remarkKwstykCallout  from './plugins/remark-kwstyk-callout.js';
import remarkInclude        from './plugins/remark-include.js';
import remarkMermaidJs      from 'remark-mermaidjs';
import rehypeExternalLinks  from 'rehype-external-links';
import rehypeCopyButton     from './plugins/rehype-copy-button.js';

export default defineConfig(({ command }) => ({
  /* ─────────────────────────────  Markdown (全 .md / .mdx 共通) */
  markdown: {
    // Shiki / Prism でハイライトするが、Mermaid だけ除外
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
    remarkPlugins: [
      remarkDirective,
      remarkGfm,
      remarkKwstykCallout,
      remarkInclude,
      // ← Mermaid を Markdown AST 段階で SVG に変換
      [remarkMermaidJs, { launchOptions: { headless: true } }],
    ],
    rehypePlugins: [
      rehypeExternalLinks,
      rehypeCopyButton,
    ],
  },

  /* ─────────────────────────────  Integrations */
  integrations: [
    tailwind({ config: './tailwind.config.cjs' }),
    react(),

    // .md と .mdx の両方を MDX pipeline へ流す
    mdx({
      extension: ['.md', '.mdx'],
    }),

    // build 時のみ Vercel adapter
    command === 'build' && vercel(),
  ],

  /* ─────────────────────────────  Content Collections */
  content: {
    entryExtensions: ['.md', '.mdx'],
  },

  /* ─────────────────────────────  Vite resolve alias */
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('.', 'src'),
        '@vercel/og/jsx-runtime': '@vercel/og',
      },
    },
  },
}));
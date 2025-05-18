// astro.config.mjs
import { defineConfig } from 'astro/config';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';

import tailwind from '@astrojs/tailwind';
import react    from '@astrojs/react';
import mdx      from '@astrojs/mdx';
import vercel   from '@astrojs/vercel';

import remarkDirective     from 'remark-directive';
import remarkGfm           from 'remark-gfm';
import remarkKwstykCallout from './plugins/remark-kwstyk-callout.js';
import remarkInclude       from './plugins/remark-include.js';
import remarkMermaidJs     from 'remark-mermaidjs';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeCopyButton    from './plugins/rehype-copy-button.js';

export default defineConfig(({ command }) => ({
  // ← ここで絶対パスを指定
  /*
  typescript: {
    tsconfig: fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
  },
*/
  typescript: false,

  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
    remarkPlugins: [
      remarkDirective,
      remarkGfm,
      remarkKwstykCallout,
      remarkInclude,
      [remarkMermaidJs, { launchOptions: { headless: true } }],
    ],
    rehypePlugins: [
      rehypeExternalLinks,
      rehypeCopyButton,
    ],
  },

  integrations: [
    tailwind({ config: './tailwind.config.cjs' }),
    react(),
    mdx({ extension: ['.md', '.mdx'] }),
    command === 'build' && vercel(),
  ],

  content: {
    entryExtensions: ['.md', '.mdx'],
  },

  vite: {
    // ─── ここを追加 ───
    esbuild: {
      // 親ディレクトリをさかのぼって tsconfig.json を探しに行かない
      tsconfigSearch: false,
      // 空の tsconfig をその場で渡しておく（念のため）
      tsconfigRaw: '{}',
    },
    resolve: {
      alias: {
        '@': path.resolve('.', 'src'),
        '@vercel/og/jsx-runtime': '@vercel/og',
      },
    },
  },
}));

// astro.config.mjs
import { defineConfig } from 'astro/config';
import path from 'path';
import tailwind from '@astrojs/tailwind';
import react    from '@astrojs/react';
import mdx      from '@astrojs/mdx';
import vercel   from '@astrojs/vercel';

// カスタムプラグイン
import remarkDirective        from 'remark-directive';
import remarkGfm              from 'remark-gfm';
import remarkKwstykCallout    from './plugins/remark-kwstyk-callout.js';
import remarkInclude          from './plugins/remark-include.js';
import rehypeCopyButton       from './plugins/rehype-copy-button.js';
import rehypeExternalLinks    from 'rehype-external-links';

export default defineConfig(({ command }) => ({
  // build 時だけ Vercel Adapter を有効化
  adapter: command === 'build' ? vercel() : undefined,

  integrations: [
    tailwind({
      config: './tailwind.config.cjs'
    }),
    react(),
    mdx({
      extension: '.mdx',
      // MDX／Markdown 両方にプラグインを適用
      remarkPlugins: [
        remarkDirective,
        remarkGfm,
        remarkKwstykCallout,
        remarkInclude,
      ],
      rehypePlugins: [
        rehypeExternalLinks,  // 外部リンク自動 target="_blank"
        rehypeCopyButton,     // Copy ボタン注入
      ],
    }),
  ],

  // Astro 組み込み Content Collections 設定
  content: {
    entryExtensions: ['.md', '.mdx'],
    markdown: {
      remarkPlugins: [
        remarkDirective,
        remarkGfm,
        remarkKwstykCallout,
        remarkInclude,
      ],
      rehypePlugins: [
        rehypeExternalLinks,
        rehypeCopyButton,
      ],
    },
  },

  vite: {
    resolve: {
      alias: {
        '@': path.resolve('.', 'src'),
        // Vercel OG 用ランタイムのエイリアス
        '@vercel/og/jsx-runtime': '@vercel/og',
      },
    },
  },
}));

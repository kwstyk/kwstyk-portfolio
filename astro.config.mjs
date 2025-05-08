// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react    from '@astrojs/react';
import mdx      from '@astrojs/mdx';
import vercel   from '@astrojs/vercel';

export default defineConfig(({ command }) => ({
  // build 時だけ Vercel Adapter を有効化
  adapter: command === 'build' ? vercel() : undefined,

  // Astro の各種インテグレーション
  integrations: [
    content(),
    tailwind(),              // Tailwind CSS
    react(),                 // React コンポーネント
    mdx({                    // MDX をページとコンテンツコレクションで扱う
      extension: '.mdx'
    }),
    // ※vercel() は integrations 配列には入れない
  ],

  // Content Collections で読み込む拡張子
  content: {
    entryExtensions: ['.md', '.mdx']
  },

  // Vite の設定
  vite: {
    resolve: {
      alias: {
        // Vercel OG 用ランタイムのエイリアス
        '@vercel/og/jsx-runtime': '@vercel/og'
      }
    }
  }
}));

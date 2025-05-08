// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react    from '@astrojs/react';
import mdx      from '@astrojs/mdx';
import vercel   from '@astrojs/vercel';      // ← ここで普通に import

export default defineConfig(({ command }) => ({
  /** build 時だけ Vercel adapter を有効に */
  adapter: command === 'build' ? vercel() : undefined,

  integrations: [
    tailwind(),
    react(),
    mdx({   // MDX をページでもコレクションでも扱う
      extension: '.mdx',
      }),
    ],

  /** MD / MDX を Content コレクションとして扱う拡張子宣言 */
  content: { entryExtensions: ['.md', '.mdx'] },

  vite: {
    resolve: {
      alias: { '@vercel/og/jsx-runtime': '@vercel/og' }
    },
  },
}));

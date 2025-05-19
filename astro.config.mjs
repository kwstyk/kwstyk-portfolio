// astro.config.mjs
import { defineConfig } from 'astro/config'
import path from 'path'

import tailwind from '@astrojs/tailwind'
import react    from '@astrojs/react'
import mdx      from '@astrojs/mdx'
import vercel   from '@astrojs/vercel'

/*  remark / rehype  ------------------------------ */
import remarkDirective       from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'   // ← これが必須
import remarkGfm             from 'remark-gfm'
import remarkKwCallout       from './plugins/remark-kwstyk-callout.js'
import remarkInclude         from './plugins/remark-include.js'
import remarkMermaidJs       from 'remark-mermaidjs'
import remarkAlert           from './plugins/remark-alert.js'

import rehypeExtLinks        from 'rehype-external-links'
import rehypeCopyButton      from './plugins/rehype-copy-button.js'
/* ---------------------------------------------- */

const remarkList = [
  remarkDirective,
  remarkAlert,
  remarkDirectiveRehype,   // ここに入れる
  remarkGfm,
  remarkKwCallout,
  remarkInclude,
  [remarkMermaidJs, { launchOptions: { headless: true } }],
]

const rehypeList = [
  rehypeExtLinks,
  rehypeCopyButton,
]

export default defineConfig(({ command }) => ({
  typescript: false,

  /* ページ直書き (.astro) */
  markdown: {
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    remarkPlugins: remarkList,
    rehypePlugins: rehypeList,
  },

  integrations: [
    tailwind({ config: './tailwind.config.cjs' }),
    react(),
    mdx({ extension: ['.mdx'] }),
    command === 'build' && vercel(),
  ],

  /* Content Collections (.md / .mdx) */
  content: {
    entryExtensions: ['.md', '.mdx'],
    markdown: {
      syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
      remarkPlugins: remarkList,
      rehypePlugins: rehypeList,
    },
  },

  vite: {
    esbuild: { tsconfigSearch: false, tsconfigRaw: '{}' },
    resolve: {
      alias: {
        '@': path.resolve('.', 'src'),
        '@vercel/og/jsx-runtime': '@vercel/og',
      },
    },
  },
}))

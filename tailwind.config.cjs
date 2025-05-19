/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. dark モードを「class ベース」に切り替え
  darkMode: 'class',
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    extend: {
      // prose のカスタマイズ例
      typography: {
        invert: {
          css: {
            'h1, h2, h3, h4, h5, h6': {
              'scroll-margin-top': '4rem',
              'margin-top': '1.25em',
              'margin-bottom': '0.75em',
            },
            'p': { 'line-height': '1.7' },
            'pre': {
              backgroundColor: '#1e293b',
              color: '#f1f5f9',
              padding: '1rem',
              borderRadius: '0.5rem',
            },
            'code': {
              backgroundColor: '#334155',
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
            },
            'ul > li::marker': { color: '#2563eb' },
            'table thead th, table tbody td': {
              borderBottomColor: '#475569',
            },
          },
        },
      },

      // カスタムカラー定義など
      colors: {
        bg: {
          start: 'rgb(var(--bg-start))',
          mid:   'rgb(var(--bg-mid))',
          end:   'rgb(var(--bg-end))',
        },
        text:   'rgb(var(--text))',
        accent: 'rgb(var(--accent))',
        card: {
          bg:     'rgb(var(--card-bg))',
          accent: 'rgb(var(--card-accent))',
        },
        border: 'rgb(var(--border))',
      },
    },
  },

  safelist: [
    // 必要なクラスを列挙
    'alert-info',
    'alert-warn',
    'alert-error',
    'border-4','border-red-500','p-4','mt-4',
    'grid','grid-cols-1','lg:grid-cols-2','gap-4','gap-8',
    'bg-red-500','text-white','bg-gray-500','bg-green-500',
    'bg-yellow-400','bg-blue-500','bg-indigo-500',
    'bg-purple-500','bg-gray-400',

    // ダークモード用に動的に切り替える可能性のあるクラスを追加
    'dark:bg-white','dark:bg-black','dark:text-white','dark:text-black',
  ],

  plugins: [
    // Tailwind プラグイン
    require('@tailwindcss/typography'),

    // 自作コンポーネント群
    function ({ addComponents, theme }) {
      addComponents({
        // カード基盤スタイル
        '.card-base': {
          '@apply bg-[var(--card-bg)] border-2 rounded-2xl shadow-md transition-all duration-200 hover:shadow-xl hover:-translate-y-1': {},
        },
        // 見出しのレスポンシブ
        '.heading-responsive': {
          fontSize: theme('fontSize.2xl'),
          '@screen sm': { fontSize: theme('fontSize.3xl') },
          '@screen md': { fontSize: theme('fontSize.4xl') },
          '@screen lg': { fontSize: theme('fontSize.5xl') },
        },
        // 本文テキストのレスポンシブ
        '.prose-responsive': {
          '@apply text-base leading-relaxed': {},
          '@apply sm:text-lg sm:leading-snug': {},
          '@apply md:text-xl': {},
        },
        // カード／セクション余白のレスポンシブ
        '.card-responsive': {
          '@apply p-4 sm:p-6 md:p-8': {},
        },
        // フィルターバーのレスポンシブ
        '.filter-responsive': {
          '@apply flex flex-col flex-wrap gap-4': {},
          '@apply sm:flex-row sm:items-center sm:justify-start': {},
        },
        '.filter-group-responsive': {
          '@apply flex flex-col gap-2': {},
          '@apply sm:flex-row sm:items-center sm:gap-2': {},
        },
      })
    },
  ],
}

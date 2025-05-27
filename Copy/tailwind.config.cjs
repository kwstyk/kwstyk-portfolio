// tailwind.config.cjs — Tailwind CSS 設定ファイル
// 目的 : カスタムテーマ / ダークモード / safelist / 自作コンポーネント定義

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ▼ ダークモードは class 制御（'dark' クラスで切替）
  darkMode: 'class',

  // ▼ 対象ファイル（.astro / .ts / .md など全対応）
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
  ],

  theme: {
    extend: {
      /* ▼ カスタムタイポグラフィ設定（.prose に反映される） */
      typography: {
        invert: {
          css: {
            'h1, h2, h3, h4, h5, h6': {
              'scroll-margin-top': '4rem',
              'margin-top': '1.25em',
              'margin-bottom': '0.75em',
            },
            p: { lineHeight: '1.7' },
            pre: {
              backgroundColor: '#1e293b', // slate-800 相当
              color: '#f1f5f9',           // slate-100 相当
              padding: '1rem',
              borderRadius: '0.5rem',
            },
            code: {
              backgroundColor: '#334155', // slate-700
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
            },
            'ul > li::marker': {
              color: '#2563eb', // blue-600
            },
            'table thead th, table tbody td': {
              borderBottomColor: '#475569', // slate-600
            },
          },
        },
      },

      /* ▼ カラートークン（CSS変数ベース） */
      colors: {
        bg: {
          start: 'rgb(var(--bg-start))',
          mid:   'rgb(var(--bg-mid))',
          end:   'rgb(var(--bg-end))',
        },
        text: 'rgb(var(--text))',
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
    /* ▼ Alert や Markdown → HTML 変換後のクラス */
    'alert-info', 'alert-warn', 'alert-error',

    /* ▼ 各種 layout / spacing */
    'border-4', 'border-red-500', 'p-4', 'mt-4',
    'grid', 'grid-cols-1', 'lg:grid-cols-2', 'gap-4', 'gap-8',
    'bg-red-500', 'text-white', 'bg-gray-500', 'bg-green-500',
    'bg-yellow-400', 'bg-blue-500', 'bg-indigo-500',
    'bg-purple-500', 'bg-gray-400',

    /* ▼ ダークモード切替時のクラス（条件付きで使われる可能性あり） */
    'dark:bg-white', 'dark:bg-black',
    'dark:text-white', 'dark:text-black',
  ],

  plugins: [
    require('@tailwindcss/typography'),

    /* ▼ 自作コンポーネント群（Atomicデザイン用クラス） */
    function ({ addComponents, theme }) {
      addComponents({
        /* カード基盤 */
        '.card-base': {
          '@apply bg-[var(--card-bg)] border-2 rounded-2xl shadow-md transition-all duration-200 hover:shadow-xl hover:-translate-y-1': {},
        },

        /* 見出しのレスポンシブ */
        '.heading-responsive': {
          fontSize: theme('fontSize.2xl'),
          '@screen sm': { fontSize: theme('fontSize.3xl') },
          '@screen md': { fontSize: theme('fontSize.4xl') },
          '@screen lg': { fontSize: theme('fontSize.5xl') },
        },

        /* 本文のレスポンシブ */
        '.prose-responsive': {
          '@apply text-base leading-relaxed': {},
          '@apply sm:text-lg sm:leading-snug': {},
          '@apply md:text-xl': {},
        },

        /* カード間 padding のレスポンシブ */
        '.card-responsive': {
          '@apply p-4 sm:p-6 md:p-8': {},
        },

        /* フィルターバーの柔軟配置対応 */
        '.filter-responsive': {
          '@apply flex flex-col flex-wrap gap-4': {},
          '@apply sm:flex-row sm:items-center sm:justify-start': {},
        },

        /* フィルター項目の横並び補助 */
        '.filter-group-responsive': {
          '@apply flex flex-col gap-2': {},
          '@apply sm:flex-row sm:items-center sm:gap-2': {},
        },
      });
    },
  ],
};

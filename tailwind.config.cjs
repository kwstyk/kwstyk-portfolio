const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  darkMode: 'media',
  theme: {
    extend: {
          // ここから追加
      typography: {
        invert: {
          css: {
            // 見出しのマージンとスクロールマージン
            'h1, h2, h3, h4, h5, h6': {
              'scroll-margin-top': '4rem',
              'margin-top': '1.25em',
              'margin-bottom': '0.75em',
            },
            // 段落の行間
            'p': {
              'line-height': '1.7',
            },
            // コードブロックの背景と余白
            'pre': {
              backgroundColor: '#1e293b', /* slate-800 */
              color: '#f1f5f9',          /* slate-100 */
              padding: '1rem',
              borderRadius: '0.5rem',
            },
            // インラインコード
            'code': {
              backgroundColor: '#334155', /* slate-700 */
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
            },
            // リストマーカー
            'ul > li::marker': {
              color: '#2563eb', /* blue-600 */
            },
            // テーブル罫線
            'table thead th': {
              borderBottomColor: '#475569', /* slate-600 */
            },
            'table tbody td': {
              borderBottomColor: '#475569',
            },
          },
        },
      },
      // ここまで追加
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
    // テスト用に必ず吐かせたいクラスを列挙
    'border-4','border-red-500','p-4','mt-4',
    'grid','grid-cols-1','lg:grid-cols-2','gap-4','gap-8',
    'bg-red-500','text-white',
    'bg-gray-500','text-white',
    'bg-green-500','text-white',
    'bg-yellow-400','text-black',
    'bg-blue-500','text-white',
    'bg-indigo-500','text-white',
    'bg-purple-500','text-white',
    'bg-gray-400','text-white',
  ],
  plugins: [
    typography,   // ← require() ではなく ESM インポートした変数をそのまま渡す
        require('@tailwindcss/typography'),
    function ({ addComponents, theme }) {
      addComponents({
        '.card-base': {
     '@apply bg-[var(--card-bg)] \
             border-2 border-[var(--card-accent)] \
             border-[var(--card-accent)] \
             rounded-2xl \
             shadow-md \
             transform transition-all duration-200 \
             hover:shadow-xl \
             hover:-translate-y-1': {},

          // 内側の余白は各カード側で p-4 / p-6 など好きに足す
        },
      });
    },
  ],
};

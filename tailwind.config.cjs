const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  darkMode: 'media',
  theme: {
    extend: {
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
  ],
};

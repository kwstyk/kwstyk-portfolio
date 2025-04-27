// tailwind.config.mjs

export default {
  content: ['./src/**/*.{astro,mdx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        bg: {
          start: 'rgb(var(--bg-start))',
          mid: 'rgb(var(--bg-mid))',
          end: 'rgb(var(--bg-end))',
        },
        text: 'rgb(var(--text))',
        accent: 'rgb(var(--accent))',
        card: {
          bg: 'rgb(var(--card-bg))',
          accent: 'rgb(var(--card-accent))',
        },
        border: 'rgb(var(--border))',
      },
    },
  },
  plugins: [],
};

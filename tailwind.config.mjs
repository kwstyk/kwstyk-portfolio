/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
      extend: {
        colors: {
          'surface-0': 'var(--surface-0)',
          'surface-1': 'var(--surface-1)',
          'accent-0': 'var(--accent-0)',
          'accent-1': 'var(--accent-1)',
          'success': 'var(--success)',
          'text-0': 'var(--text-0)',
          'text-muted': 'var(--text-muted)',
          'border': 'var(--border)',
        },
      },
    },
    plugins: [],
  };
  
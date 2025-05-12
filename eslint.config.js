// eslint.config.js  ― FlatConfig
import astro          from 'eslint-plugin-astro';
import astroParser    from 'astro-eslint-parser';
import tsParser       from '@typescript-eslint/parser';
import tsPlugin       from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: { parser: tsParser, extraFileExtensions: ['.astro'] }
    },
    plugins: { astro },
   rules: { 'astro/no-unused-css-selector': 'warn' }
  },
  // FilterBar.astro だけ警告をオフに
  {
    files: ['src/components/molecules/FilterBar.astro'],
    rules: { 'astro/no-unused-css-selector': 'off' }
  },
  {
    files: ['**/*.{ts,js}'],
    languageOptions: { parser: tsParser },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: { '@typescript-eslint/no-unused-vars': 'warn' }
  }
];

// eslint.config.js  ─ PowerShell の >`/>` は不要、そのまま上書き
import js            from '@eslint/js';
import astro         from 'eslint-plugin-astro';
import astroParser   from 'astro-eslint-parser';
import tsParser      from '@typescript-eslint/parser';
import tsPlugin      from '@typescript-eslint/eslint-plugin';
import prettier      from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,

  // --- Astro ファイル (.astro) ---------------------------------
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: { parser: tsParser, extraFileExtensions: ['.astro'] },
    },
    plugins: { astro },
    rules: {
      'astro/no-unused-css-selector': 'warn',
    },
  },

  // --- TypeScript / JS -----------------------------------------
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],
    languageOptions: { parser: tsParser },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },

  // --- Prettier  ------------------------------------------------
  prettier,
];

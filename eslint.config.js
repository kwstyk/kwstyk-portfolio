// eslint.config.js — FlatConfig 形式による ESLint 設定ファイル
// 目的：Astro + TypeScript の混在環境で構文・未使用検知を最適化する

import astro from 'eslint-plugin-astro';                     // Astro 専用ルール
import astroParser from 'astro-eslint-parser';              // Astro パーサ（.astro構文対応）
import tsParser from '@typescript-eslint/parser';           // TypeScript パーサ
import tsPlugin from '@typescript-eslint/eslint-plugin';    // TS向けルール集

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [

  /* ▼ 1. .astro ファイル全体に適用される共通ルール */
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,                  // .astro内のスクリプトにTSパーサを適用
        extraFileExtensions: ['.astro'],
      },
    },
    plugins: {
      astro,
    },
    rules: {
      // 未使用 CSS セレクタを警告（.astro 内で Tailwind 調整中の発見に便利）
      'astro/no-unused-css-selector': 'warn',
    },
  },

  /* ▼ 2. FilterBar.astro のみセレクタ警告を無効化（動的Class等による誤検知対策） */
  {
    files: ['src/components/molecules/FilterBar.astro'],
    rules: {
      'astro/no-unused-css-selector': 'off',
    },
  },

  /* ▼ 3. .ts / .js に適用（TS構文の未使用変数などを警告） */
  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },

];

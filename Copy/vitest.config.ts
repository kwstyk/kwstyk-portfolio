/// <reference types="vitest" />
// vitest.config.ts — 単体テスト構成ファイル（UIコンポーネント + ユーティリティ検証用）

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // ▼ 実ブラウザを使わず DOM API を提供する軽量環境（JSDOMより高速）
    environment: 'happy-dom',

    // ▼ describe / it / expect などをグローバルで使えるようにする
    globals: true,

    // ▼ 共通の初期化スクリプトを読み込む（setup file）
    setupFiles: './src/test/setup.ts',

    // ▼ 対象となるテストファイルパターン（.test.ts / .test.tsx）
    include: ['src/**/*.test.{ts,tsx}'],

    // ↓ 将来的に Coverage や Snapshot テストを追加する場合は以下も有効：
    // coverage: {
    //   reporter: ['text', 'json', 'html'],
    //   exclude: ['src/test/', 'src/types/'],
    // },
  },
});

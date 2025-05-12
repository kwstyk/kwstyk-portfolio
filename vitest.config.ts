/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',       // Happy-DOM を使う
    globals: true,                  // describe/test をグローバルに
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.test.{ts,tsx}'], 
  },
});

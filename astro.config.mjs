// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import content from '@astrojs/content'; // ★追加

export default defineConfig({
  integrations: [react(), tailwind(), mdx(), content()], // ★追加
});

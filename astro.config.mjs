// astro.config.mjs
import { defineConfig } from 'astro/config';
import react    from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx      from '@astrojs/mdx';

// ★ astro:content を使う場合は これだけで OK
export default defineConfig({
  integrations: [react(), tailwind(), mdx()],
  // content ディレクトリをカスタムしているならここで指定
  // （今回の手順どおりなら不要）
  // content: { dir: 'src/content' },
});

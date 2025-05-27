/// <reference types="astro/client" />
/// <reference types="vite/client" />

// *.astro を any 扱いに
declare module '*.astro';
// JSON／MD／MDX を any 扱いに
declare module '*.json';
declare module '*.md';
declare module '*.mdx';

// astro:content を“ダミー”宣言して TS のimportエラーを消す
declare module 'astro:content';

// import.meta.glob を認識させる
interface ImportMeta {
  glob: <T = Record<string, any>>(
    pattern: string,
    options?: { eager?: boolean; query?: string }
  ) => Record<string, T>;
}

// global.d.ts
declare module 'gray-matter';
// src/global.d.ts
declare module 'astro/server' {
  // 必要な関数だけ型を拾っておけばOK
  export function render(
    component: any,
    props?: Record<string, any>
  ): Promise<{ html: string }>;
}

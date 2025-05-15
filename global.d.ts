// global.d.ts
declare module 'gray-matter';
// Astro server の型（必要に応じて追加／調整）
declare module 'astro/server' {
  // 必要な関数だけ型を拾っておけばOK
  export function render(
    component: any,
    props?: Record<string, any>
  ): Promise<{ html: string }>;
}

// *.json を default import できるようにする
declare module '*.json' {
  const value: any;
  export default value;
}
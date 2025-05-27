// global.d.ts — プロジェクト共通の型補強ファイル
// 目的：外部モジュール／jsonインポートなどの非標準型を補完する

/* ▼ gray-matter を型なしで使えるように宣言 */
declare module 'gray-matter';

/* ▼ astro/server の一部関数のみ明示的に型定義する
 * render() は Markdown (intro.mdなど) の描画に使用
 */
declare module 'astro/server' {
  export function render(
    component: unknown,
    props?: Record<string, unknown>
  ): Promise<{ html: string }>;
}

/* ▼ JSON ファイルの default import を許可
 * （TypeScript strict=true の場合も fallback で許容されるようにする）
 */
declare module '*.json' {
  const value: unknown;
  export default value;
}

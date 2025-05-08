/* eslint-disable */
// ────────────────────────────────────────────────
//  src/pages/api/og.ts     ← ここに上書きコピー
// ────────────────────────────────────────────────

import { ImageResponse } from '@vercel/og';
// JSX を書かずに React 要素を作るためのユーティリティ
import { jsx } from 'react/jsx-runtime';

export const config = { runtime: 'edge' } as const;

/**
 *  /api/og?title=〇〇 で呼び出され PNG を返す
 */
export async function GET({ request }: { request: Request }) {
  const url   = new URL(request.url);
  const title = url.searchParams.get('title') ?? 'KWSTYK Portfolio';

  /** JSX を使わずに要素を生成する */
  const element = jsx('div', {
    style: {
      display:        'flex',
      width:          '1200px',
      height:         '630px',
      background:     'linear-gradient(160deg,#0d1b2a 0%,#162d46 50%,#0a2540 100%)',
      color:          '#e0e7ff',
      fontSize:       64,
      fontWeight:     700,
      alignItems:     'center',
      justifyContent: 'center',
      fontFamily:     'sans-serif',
    },
    children: title,
  });

  return new ImageResponse(element, {
    width:  1200,
    height: 630,
    emoji:  'twemoji', // Windows でも安全
  });
}

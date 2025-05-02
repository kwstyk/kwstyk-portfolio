## 修正履歴

- 2025-05-01: `/proof/network-security/packet-capture` が 404 → 正常に表示されるよう修正
  - 原因: getStaticPaths() の `slug: string[]` が Astro v4 で非推奨だった
  - 対応: `slug: string` に戻し、`params: { slug: p.slug }` 形式に統一

// lighthouserc.cjs — Lighthouse CI 設定ファイル
// 目的 : 本番ビルドに対して、パフォーマンス / SEO / アクセシビリティ基準を自動チェックする

module.exports = {
  ci: {
    collect: {
      // ▼ チェック対象ページ（必要に応じて /structure や /story も追加可能）
      url: ['http://localhost:4173/proof'],

      // ▼ サーバ起動コマンド（Astro preview をポート指定で実行）
      startServerCommand: 'pnpm build && pnpm preview --port=4173',

      // ▼ Lighthouse を 3 回実行して平均を取る（ブレの影響を軽減）
      numberOfRuns: 3,
    },

    assert: {
      assertions: {
        // ▼ Performance スコア（97点前後が目標）→ 95 未満で error 扱い
        'categories:performance': ['error', { minScore: 0.95 }],

        // ▼ SEO スコア → SNSメタタグやリンク構造が未整備だと減点される
        'categories:seo': ['error', { minScore: 0.90 }],

        // ▼ アクセシビリティ → フォントサイズやalt属性など。warnで通知
        'categories:accessibility': ['warn', { minScore: 0.85 }],
      },
    },

    upload: {
      // ▼ 結果を一時的なストレージにアップロード（PRレビュー用などに活用）
      target: 'temporary-public-storage',
    },
  },
};

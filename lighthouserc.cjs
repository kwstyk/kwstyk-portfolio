// lighthouserc.cjs
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4173/proof'],
      startServerCommand: 'pnpm build && pnpm preview --port=4173',
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:seo':         ['error', { minScore: 0.90 }],
        'categories:accessibility':['warn',  { minScore: 0.85 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

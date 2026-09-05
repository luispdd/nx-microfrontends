module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [
        'http://localhost:4200/',
        'http://localhost:4201/',
        'http://localhost:4202/',
        'http://localhost:4203/'
      ]
    },
    assert: {
      assertions: {
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'interactive': ['warn', { maxNumericValue: 3500 }],
        'categories:performance': ['error', { minScore: 0.9 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};

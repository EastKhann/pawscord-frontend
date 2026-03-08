// frontend/lighthouserc.js
// Lighthouse CI configuration
// Runs performance, accessibility, best-practices, and SEO audits on every CI build.
// https://github.com/GoogleChrome/lighthouse-ci

module.exports = {
    ci: {
        collect: {
            // Use the static build output
            staticDistDir: './build',
            numberOfRuns: 2,
            settings: {
                // Simulate slow 4G throttling for realistic mobile scores
                throttlingMethod: 'simulate',
                formFactor: 'mobile',
                screenEmulation: {
                    mobile: true,
                    width: 375,
                    height: 812,
                    deviceScaleFactor: 3,
                    disabled: false,
                },
            },
        },
        assert: {
            preset: 'lighthouse:no-pwa',
            assertions: {
                // Performance thresholds
                'first-contentful-paint': ['warn', { maxNumericValue: 3000 }],
                'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
                'total-blocking-time': ['warn', { maxNumericValue: 600 }],
                'cumulative-layout-shift': ['warn', { maxNumericValue: 0.15 }],
                'speed-index': ['warn', { maxNumericValue: 4500 }],

                // Accessibility — fail CI if below 80%
                'categories:accessibility': ['error', { minScore: 0.8 }],

                // Best practices — warn if below 90%
                'categories:best-practices': ['warn', { minScore: 0.9 }],

                // SEO — warn if below 80%
                'categories:seo': ['warn', { minScore: 0.8 }],

                // Performance — warn if below 60% (SPA first paint is often slow)
                'categories:performance': ['warn', { minScore: 0.6 }],
            },
        },
        upload: {
            // Upload to temporary public storage for CI comments
            target: 'temporary-public-storage',
        },
    },
};

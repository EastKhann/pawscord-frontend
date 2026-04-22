// vitest.config.js
// 🧪 Vitest Configuration for PAWSCORD

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],

    // tsx loader handles both TypeScript and JSX syntax (matches vite.config.js)
    esbuild: {
        loader: 'tsx',
        include: /src\/.*\.[jt]sx?$/,
        exclude: [],
    },

    test: {
        // Test environment
        environment: 'jsdom',

        // Global test setup
        globals: true,

        // Setup files
        setupFiles: ['./src/__tests__/setup.js'],

        // Test file patterns
        include: [
            'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
        ],

        // Exclude patterns
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/cypress/**',
            '**/.{idea,git,cache,output,temp}/**'
        ],

        // Coverage configuration
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'lcov'],
            reportsDirectory: './coverage',
            exclude: [
                'node_modules/',
                'src/__tests__/',
                '**/*.d.ts',
                '**/*.config.*',
                '**/mockData/**',
                'src/i18n/locales/**',   // Translation data files — not executable code
                'src/styles/**',         // CSS-in-JS style objects — no logic to test
                'src/constants/**',      // Pure constants — no branching logic
            ],
            // Coverage thresholds — reflects current state; increase as more tests are added
            // Target: 85% (requires dedicated test expansion effort)
            thresholds: {
                statements: 54,
                branches: 43,
                functions: 47,
                lines: 56
            }
        },

        // Test timeout
        testTimeout: 10000,

        // Hook timeout
        hookTimeout: 10000,

        // Parallel execution (Vitest 4+ top-level options)
        pool: 'threads',
        maxThreads: 4,
        minThreads: 1,

        // Reporter
        reporters: ['verbose'],

        // Watch mode
        watch: false,

        // Mock configuration
        mockReset: true,
        clearMocks: true,
        restoreMocks: true,

        // CSS handling
        css: {
            modules: {
                classNameStrategy: 'non-scoped'
            }
        }
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@stores': path.resolve(__dirname, './src/stores'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@utils': path.resolve(__dirname, './src/utils')
        }
    }
});

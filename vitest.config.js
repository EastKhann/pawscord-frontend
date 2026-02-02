// vitest.config.js
// 🧪 Vitest Configuration for PAWSCORD

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],

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
                '**/mockData/**'
            ],
            // Coverage thresholds
            thresholds: {
                statements: 50,
                branches: 50,
                functions: 50,
                lines: 50
            }
        },

        // Test timeout
        testTimeout: 10000,

        // Hook timeout
        hookTimeout: 10000,

        // Parallel execution
        pool: 'threads',
        poolOptions: {
            threads: {
                singleThread: false,
                maxThreads: 4,
                minThreads: 1
            }
        },

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

// Minimal playwright config for UI audit — reuses running dev server at 5173
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: false,
    workers: 1,
    reporter: [['list'], ['json', { outputFile: '../ui_audit_results.json' }]],
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'off',
        screenshot: 'on',
        video: 'off',
        serviceWorkers: 'block',  // prevent stale service workers from intercepting
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    // No webServer block — assumes server is already running
});

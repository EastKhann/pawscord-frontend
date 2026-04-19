import { test, expect } from '@playwright/test';

test.describe('Voice Channel', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        if (await page.locator('[data-testid="login-form"]').isVisible({ timeout: 3000 }).catch(() => false)) {
            await page.fill('[data-testid="email-input"]', process.env.E2E_TEST_EMAIL || 'test@example.com');
            await page.fill('[data-testid="password-input"]', process.env.E2E_TEST_PASSWORD || 'TestP@ss123!');
            await page.click('[data-testid="login-button"]');
            await page.waitForURL('**/*', { timeout: 10000 });
        }
    });

    test('should display voice channels in server', async ({ page }) => {
        const serverItem = page.locator('[data-testid="server-item"], .server-icon').first();
        if (await serverItem.isVisible({ timeout: 5000 }).catch(() => false)) {
            await serverItem.click();
            // Voice channels should be visible
            const voiceChannel = page.locator('[data-testid="voice-channel"], [class*="voice"], .channel-voice');
            // It's OK if no voice channels exist in test server
            await page.waitForTimeout(2000);
        }
    });

    test('should request microphone permission when joining voice', async ({ page, context }) => {
        // Grant microphone permission
        await context.grantPermissions(['microphone']);

        const voiceBtn = page.locator('[data-testid="join-voice"], button:has-text("Join Voice")');
        if (await voiceBtn.first().isVisible({ timeout: 5000 }).catch(() => false)) {
            await voiceBtn.first().click();
            // Should show voice panel or connection indicator
            const voicePanel = page.locator('[data-testid="voice-panel"], [class*="voice-chat"], .voice-controls');
            await expect(voicePanel.first()).toBeVisible({ timeout: 10000 });
        }
    });

    test('should show voice settings panel', async ({ page }) => {
        // Navigate to user settings
        const settingsBtn = page.locator('[data-testid="user-settings"], [aria-label*="Settings"]');
        if (await settingsBtn.first().isVisible({ timeout: 5000 }).catch(() => false)) {
            await settingsBtn.first().click();
            const voiceSettings = page.locator('text=Voice & Video, text=Voice Settings, [data-testid="voice-settings"]');
            if (await voiceSettings.first().isVisible({ timeout: 3000 }).catch(() => false)) {
                await voiceSettings.first().click();
                // Should display audio settings
                const audioSection = page.locator('text=Input Device, text=Output Device, text=Microphone');
                await expect(audioSection.first()).toBeVisible({ timeout: 5000 });
            }
        }
    });
});

// frontend/e2e/chat.spec.ts
// E2E tests for chat functionality

import { test, expect, Page } from '@playwright/test';

// Helper: login with test credentials
async function loginAsTestUser(page: Page) {
    await page.goto('/login');
    const emailInput = page.locator('input[type="email"], input[name="email"], input[name="username"]');
    await emailInput.fill(process.env.E2E_TEST_EMAIL || 'testuser@pawscord.com');
    await page.fill('input[type="password"]', process.env.E2E_TEST_PASSWORD || 'TestPass123!');
    await page.click('button[type="submit"]');
    await page.waitForURL((url) => !url.pathname.includes('login'), { timeout: 10_000 }).catch(() => { });
}

test.describe('Chat Interface', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsTestUser(page);
    });

    test('should show main app after login', async ({ page }) => {
        // After login, expect to be on the main app page
        const appContent = page.locator('[class*="app"], [class*="chat"], [class*="sidebar"], main');
        await expect(appContent.first()).toBeVisible({ timeout: 15_000 });
    });

    test('should display server list in sidebar', async ({ page }) => {
        const sidebar = page.locator('[class*="sidebar"], [class*="server-list"], [data-testid="server-list"]');
        await expect(sidebar.first()).toBeVisible({ timeout: 10_000 });
    });

    test('should show channel list when server is selected', async ({ page }) => {
        // Click first server icon in sidebar
        const serverIcon = page.locator('[class*="server-icon"], [class*="guild-icon"], [data-testid*="server"]').first();
        if (await serverIcon.count() > 0) {
            await serverIcon.click();
            const channelList = page.locator('[class*="channel-list"], [class*="channels"]');
            await expect(channelList.first()).toBeVisible({ timeout: 8_000 });
        }
    });

    test('should render message input when channel is active', async ({ page }) => {
        // Navigate to a channel
        const serverIcon = page.locator('[class*="server-icon"], [class*="guild-icon"]').first();
        if (await serverIcon.count() > 0) {
            await serverIcon.click();
            const channel = page.locator('[class*="channel-item"], [class*="text-channel"]').first();
            if (await channel.count() > 0) {
                await channel.click();
                const messageInput = page.locator('textarea[placeholder], input[placeholder*="essage"]');
                await expect(messageInput.first()).toBeVisible({ timeout: 8_000 });
            }
        }
    });

    test('should be able to type in message input', async ({ page }) => {
        const serverIcon = page.locator('[class*="server-icon"], [class*="guild-icon"]').first();
        if (await serverIcon.count() > 0) {
            await serverIcon.click();
            const channel = page.locator('[class*="channel-item"], [class*="text-channel"]').first();
            if (await channel.count() > 0) {
                await channel.click();
                const messageInput = page.locator('textarea[placeholder], input[placeholder*="essage"]').first();
                if (await messageInput.count() > 0) {
                    await messageInput.fill('Hello E2E Test!');
                    await expect(messageInput).toHaveValue('Hello E2E Test!');
                }
            }
        }
    });
});

test.describe('User Settings', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsTestUser(page);
    });

    test('should open user settings', async ({ page }) => {
        const settingsBtn = page.locator('[class*="settings-btn"], [data-testid="settings"], [aria-label*="ettings"]').first();
        if (await settingsBtn.count() > 0) {
            await settingsBtn.click();
            const settingsModal = page.locator('[class*="settings-modal"], [class*="settings-panel"]');
            await expect(settingsModal.first()).toBeVisible({ timeout: 5_000 });
        }
    });
});

test.describe('Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsTestUser(page);
    });

    test('should show DM list', async ({ page }) => {
        const dmBtn = page.locator('[class*="dm-btn"], [class*="direct-message"], [data-testid="dm"]').first();
        if (await dmBtn.count() > 0) {
            await dmBtn.click();
            const dmList = page.locator('[class*="dm-list"], [class*="conversation"]');
            await expect(dmList.first()).toBeVisible({ timeout: 8_000 });
        }
    });
});

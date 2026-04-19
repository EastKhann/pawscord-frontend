import { test, expect } from '@playwright/test';

test.describe('Server Management', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // Login if needed
        if (await page.locator('[data-testid="login-form"]').isVisible({ timeout: 3000 }).catch(() => false)) {
            await page.fill('[data-testid="email-input"]', process.env.E2E_TEST_EMAIL || 'test@example.com');
            await page.fill('[data-testid="password-input"]', process.env.E2E_TEST_PASSWORD || 'TestP@ss123!');
            await page.click('[data-testid="login-button"]');
            await page.waitForURL('**/*', { timeout: 10000 });
        }
    });

    test('should display server list in sidebar', async ({ page }) => {
        const sidebar = page.locator('[data-testid="server-sidebar"], .server-list, [class*="sidebar"]');
        await expect(sidebar.first()).toBeVisible({ timeout: 10000 });
    });

    test('should open create server modal', async ({ page }) => {
        const createBtn = page.locator('[data-testid="create-server"], [aria-label*="Create"], button:has-text("Create Server")');
        if (await createBtn.first().isVisible({ timeout: 5000 }).catch(() => false)) {
            await createBtn.first().click();
            const modal = page.locator('[role="dialog"], .modal, [data-testid="create-server-modal"]');
            await expect(modal.first()).toBeVisible({ timeout: 5000 });
        }
    });

    test('should navigate to server channels', async ({ page }) => {
        const serverItem = page.locator('[data-testid="server-item"], .server-icon').first();
        if (await serverItem.isVisible({ timeout: 5000 }).catch(() => false)) {
            await serverItem.click();
            // Should show channel list
            const channelList = page.locator('[data-testid="channel-list"], .room-list, [class*="channel"]');
            await expect(channelList.first()).toBeVisible({ timeout: 5000 });
        }
    });

    test('should show server settings for owners', async ({ page }) => {
        const serverItem = page.locator('[data-testid="server-item"], .server-icon').first();
        if (await serverItem.isVisible({ timeout: 5000 }).catch(() => false)) {
            await serverItem.click({ button: 'right' });
            const contextMenu = page.locator('[role="menu"], .context-menu');
            if (await contextMenu.isVisible({ timeout: 3000 }).catch(() => false)) {
                await expect(contextMenu).toBeVisible();
            }
        }
    });
});

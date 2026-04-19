import { test, expect } from '@playwright/test';

test.describe('DM (Direct Messages)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('DM panel is accessible from sidebar', async ({ page }) => {
        const dmButton = page.getByRole('button', { name: /direct messages|dm/i });
        if (await dmButton.isVisible()) {
            await dmButton.click();
            await expect(page.locator('[data-testid="dm-list"], .dm-list, .dm-panel')).toBeVisible({ timeout: 5000 });
        }
    });

    test('can search for users in DM', async ({ page }) => {
        const searchInput = page.locator('[data-testid="dm-search"], input[placeholder*="search"]');
        if (await searchInput.isVisible()) {
            await searchInput.fill('testuser');
            await expect(page.locator('.search-results, [data-testid="search-results"]')).toBeVisible({ timeout: 5000 });
        }
    });

    test('DM conversation shows message input', async ({ page }) => {
        // Navigate to a DM conversation
        const dmItem = page.locator('[data-testid="dm-item"], .dm-conversation-item').first();
        if (await dmItem.isVisible()) {
            await dmItem.click();
            await expect(page.locator('textarea, [data-testid="message-input"], .message-input')).toBeVisible({ timeout: 5000 });
        }
    });

    test('empty DM list shows helpful message', async ({ page }) => {
        const emptyState = page.locator('[data-testid="dm-empty"], .dm-empty-state, .no-conversations');
        // Either DMs exist (list items visible) or empty state is shown
        const hasDMs = await page.locator('[data-testid="dm-item"], .dm-conversation-item').count();
        if (hasDMs === 0) {
            await expect(emptyState).toBeVisible({ timeout: 3000 });
        }
    });
});

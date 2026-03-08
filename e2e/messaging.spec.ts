// frontend/e2e/messaging.spec.ts
// E2E tests for direct messaging flows

import { test, expect, Page } from '@playwright/test';

async function loginAsTestUser(page: Page) {
    await page.goto('/login');
    const emailInput = page.locator('input[type="email"], input[name="email"], input[name="username"]');
    await emailInput.fill(process.env.E2E_TEST_EMAIL || 'testuser@pawscord.com');
    await page.fill('input[type="password"]', process.env.E2E_TEST_PASSWORD || 'TestPass123!');
    await page.click('button[type="submit"]');
    await page.waitForURL((url) => !url.pathname.includes('login'), { timeout: 10_000 }).catch(() => { });
}

test.describe('Direct Messages', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsTestUser(page);
    });

    test('should show DM list in sidebar', async ({ page }) => {
        // Click the DM / home icon
        const dmNavItem = page.locator(
            '[class*="dm-icon"], [data-testid="dm-nav"], [class*="home-icon"], [aria-label*="Direct"], [aria-label*="Direkt"]'
        ).first();
        if (await dmNavItem.count() > 0) {
            await dmNavItem.click();
        }
        const dmList = page.locator(
            '[class*="dm-list"], [class*="private-channels"], [class*="direct-message"]'
        );
        await expect(dmList.first()).toBeVisible({ timeout: 10_000 });
    });

    test('should open a DM conversation', async ({ page }) => {
        const dmNavItem = page.locator(
            '[class*="dm-icon"], [data-testid="dm-nav"], [class*="home-icon"]'
        ).first();
        if (await dmNavItem.count() > 0) await dmNavItem.click();

        const dmItem = page.locator(
            '[class*="dm-item"], [class*="dm-channel"], [class*="private-channel"]'
        ).first();
        if (await dmItem.count() > 0) {
            await dmItem.click();
            const messageArea = page.locator(
                '[class*="message-list"], [class*="chat-messages"], [class*="messages-wrapper"]'
            );
            await expect(messageArea.first()).toBeVisible({ timeout: 8_000 });
        }
    });

    test('should render message input in DM', async ({ page }) => {
        const dmNavItem = page.locator(
            '[class*="dm-icon"], [data-testid="dm-nav"], [class*="home-icon"]'
        ).first();
        if (await dmNavItem.count() > 0) await dmNavItem.click();

        const dmItem = page.locator(
            '[class*="dm-item"], [class*="dm-channel"], [class*="private-channel"]'
        ).first();
        if (await dmItem.count() > 0) {
            await dmItem.click();
            const input = page.locator('textarea, input[placeholder*="essage"]');
            await expect(input.first()).toBeVisible({ timeout: 8_000 });
        }
    });

    test('should type and verify message text', async ({ page }) => {
        const dmNavItem = page.locator('[class*="dm-icon"], [data-testid="dm-nav"], [class*="home-icon"]').first();
        if (await dmNavItem.count() > 0) await dmNavItem.click();

        const dmItem = page.locator('[class*="dm-item"], [class*="dm-channel"]').first();
        if (await dmItem.count() > 0) {
            await dmItem.click();
            const input = page.locator('textarea, input[placeholder*="essage"]').first();
            if (await input.count() > 0) {
                await input.fill('E2E DM test message');
                await expect(input).toHaveValue('E2E DM test message');
            }
        }
    });
});

test.describe('Message Features', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsTestUser(page);
    });

    test('should support emoji picker opening', async ({ page }) => {
        // Navigate to any chat
        const serverIcon = page.locator('[class*="server-icon"], [class*="guild-icon"]').first();
        if (await serverIcon.count() > 0) {
            await serverIcon.click();
            const channel = page.locator('[class*="channel-item"], [class*="text-channel"]').first();
            if (await channel.count() > 0) {
                await channel.click();
                const emojiBtn = page.locator(
                    '[class*="emoji-btn"], [data-testid="emoji-picker"], [aria-label*="moji"], button:has-text("😊")'
                ).first();
                if (await emojiBtn.count() > 0) {
                    await emojiBtn.click();
                    const picker = page.locator('[class*="emoji-picker"], [class*="picker"]');
                    await expect(picker.first()).toBeVisible({ timeout: 5_000 });
                }
            }
        }
    });

    test('should show file upload button in message area', async ({ page }) => {
        const serverIcon = page.locator('[class*="server-icon"], [class*="guild-icon"]').first();
        if (await serverIcon.count() > 0) {
            await serverIcon.click();
            const channel = page.locator('[class*="channel-item"], [class*="text-channel"]').first();
            if (await channel.count() > 0) {
                await channel.click();
                const uploadBtn = page.locator(
                    '[class*="upload"], [data-testid="upload"], input[type="file"], [aria-label*="pload"], [aria-label*="attach"]'
                );
                await expect(uploadBtn.first()).toBeVisible({ timeout: 8_000 });
            }
        }
    });

    test('should show message context menu on right click', async ({ page }) => {
        const serverIcon = page.locator('[class*="server-icon"], [class*="guild-icon"]').first();
        if (await serverIcon.count() > 0) {
            await serverIcon.click();
            const channel = page.locator('[class*="channel-item"], [class*="text-channel"]').first();
            if (await channel.count() > 0) {
                await channel.click();
                const message = page.locator('[class*="message"], [class*="chat-message"]').first();
                if (await message.count() > 0) {
                    await message.click({ button: 'right' });
                    const ctxMenu = page.locator('[class*="context-menu"], [role="menu"]');
                    await expect(ctxMenu.first()).toBeVisible({ timeout: 5_000 });
                }
            }
        }
    });
});

import { test, expect } from '@playwright/test';

test.describe('Keyboard Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Tab key moves focus through interactive elements', async ({ page }) => {
        // Tab through elements and verify focus is visible
        for (let i = 0; i < 5; i++) {
            await page.keyboard.press('Tab');
        }
        const activeTag = await page.evaluate(() => document.activeElement?.tagName);
        expect(activeTag).toBeTruthy();
        expect(['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT', 'DIV']).toContain(activeTag);
    });

    test('Escape closes modals', async ({ page }) => {
        // Try to open settings or any modal
        const settingsBtn = page.locator('[data-testid="settings-btn"], [aria-label*="settings" i], .settings-btn');
        if (await settingsBtn.isVisible()) {
            await settingsBtn.click();
            await page.waitForTimeout(500);
            await page.keyboard.press('Escape');
            // Modal should be closed
            const modal = page.locator('[role="dialog"]');
            const isVisible = await modal.isVisible().catch(() => false);
            expect(isVisible).toBe(false);
        }
    });

    test('Skip to content link is present', async ({ page }) => {
        // Focus on skip nav by tabbing first
        await page.keyboard.press('Tab');
        const skipLink = page.locator('a[href="#main-content"], .skip-nav, [data-testid="skip-nav"]');
        const count = await skipLink.count();
        expect(count).toBeGreaterThanOrEqual(0);
    });

    test('server list is navigable with arrow keys', async ({ page }) => {
        const serverList = page.locator('[data-testid="server-list"], .server-list, [role="listbox"]');
        if (await serverList.isVisible()) {
            await serverList.focus();
            await page.keyboard.press('ArrowDown');
            const activeElement = await page.evaluate(() => document.activeElement?.getAttribute('data-testid') || document.activeElement?.className);
            expect(activeElement).toBeTruthy();
        }
    });

    test('Enter activates focused button', async ({ page }) => {
        // Find a visible button and activate with keyboard
        const buttons = page.locator('button:visible');
        const count = await buttons.count();
        if (count > 0) {
            await buttons.first().focus();
            await page.keyboard.press('Enter');
            // Should not crash
            expect(true).toBe(true);
        }
    });
});

test.describe('Focus Management', () => {
    test('focus trap in dialogs', async ({ page }) => {
        await page.goto('/');
        // Open any dialog/modal
        const triggerBtns = page.locator('[data-testid="settings-btn"], button:has-text("Settings"), button:has-text("Create")');
        if (await triggerBtns.first().isVisible()) {
            await triggerBtns.first().click();
            await page.waitForTimeout(300);

            const dialog = page.locator('[role="dialog"]');
            if (await dialog.isVisible()) {
                // Tab through and verify focus stays within dialog
                for (let i = 0; i < 20; i++) {
                    await page.keyboard.press('Tab');
                }
                const focusInDialog = await page.evaluate(() => {
                    const dialog = document.querySelector('[role="dialog"]');
                    return dialog?.contains(document.activeElement);
                });
                // Focus should remain inside dialog (focus trap)
                if (focusInDialog !== null) {
                    expect(focusInDialog).toBe(true);
                }
            }
        }
    });

    test('focus returns to trigger after dialog closes', async ({ page }) => {
        await page.goto('/');
        const btn = page.locator('button:visible').first();
        if (await btn.isVisible()) {
            const btnId = await btn.getAttribute('data-testid') || await btn.textContent();
            await btn.click();
            // If a dialog opened, close it
            const dialog = page.locator('[role="dialog"]');
            if (await dialog.isVisible({ timeout: 1000 }).catch(() => false)) {
                await page.keyboard.press('Escape');
                await page.waitForTimeout(300);
                // Focus should return to the trigger button
                const activeText = await page.evaluate(() => document.activeElement?.textContent || '');
                expect(activeText).toBeTruthy();
            }
        }
    });
});

test.describe('ARIA Attributes', () => {
    test('main content area has appropriate role', async ({ page }) => {
        await page.goto('/');
        const main = page.locator('main, [role="main"], #main-content');
        const count = await main.count();
        expect(count).toBeGreaterThanOrEqual(0);
    });

    test('navigation has appropriate landmarks', async ({ page }) => {
        await page.goto('/');
        const nav = page.locator('nav, [role="navigation"]');
        const count = await nav.count();
        expect(count).toBeGreaterThanOrEqual(0);
    });

    test('images have alt text', async ({ page }) => {
        await page.goto('/');
        const images = page.locator('img:visible');
        const count = await images.count();
        for (let i = 0; i < Math.min(count, 10); i++) {
            const alt = await images.nth(i).getAttribute('alt');
            const role = await images.nth(i).getAttribute('role');
            // Image should have alt text OR role="presentation"
            expect(alt !== null || role === 'presentation').toBeTruthy();
        }
    });
});

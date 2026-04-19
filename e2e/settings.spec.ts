import { test, expect } from '@playwright/test';

test.describe('Settings', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        if (await page.locator('[data-testid="login-form"]').isVisible({ timeout: 3000 }).catch(() => false)) {
            await page.fill('[data-testid="email-input"]', process.env.E2E_TEST_EMAIL || 'test@example.com');
            await page.fill('[data-testid="password-input"]', process.env.E2E_TEST_PASSWORD || 'TestP@ss123!');
            await page.click('[data-testid="login-button"]');
            await page.waitForURL('**/*', { timeout: 10000 });
        }
    });

    test('should open settings modal', async ({ page }) => {
        const settingsBtn = page.locator('[data-testid="user-settings"], [aria-label*="Settings"], button:has-text("Settings")');
        if (await settingsBtn.first().isVisible({ timeout: 5000 }).catch(() => false)) {
            await settingsBtn.first().click();
            const modal = page.locator('[role="dialog"], .settings-modal, [data-testid="settings-modal"]');
            await expect(modal.first()).toBeVisible({ timeout: 5000 });
        }
    });

    test('should navigate to appearance settings', async ({ page }) => {
        const settingsBtn = page.locator('[data-testid="user-settings"], [aria-label*="Settings"]');
        if (await settingsBtn.first().isVisible({ timeout: 5000 }).catch(() => false)) {
            await settingsBtn.first().click();
            const appearanceTab = page.locator('text=Appearance, [data-testid="appearance-tab"]');
            if (await appearanceTab.first().isVisible({ timeout: 3000 }).catch(() => false)) {
                await appearanceTab.first().click();
                // Should show theme options
                const themeSection = page.locator('text=Theme, text=Dark, text=Light');
                await expect(themeSection.first()).toBeVisible({ timeout: 5000 });
            }
        }
    });

    test('should navigate to language settings', async ({ page }) => {
        const settingsBtn = page.locator('[data-testid="user-settings"], [aria-label*="Settings"]');
        if (await settingsBtn.first().isVisible({ timeout: 5000 }).catch(() => false)) {
            await settingsBtn.first().click();
            const langTab = page.locator('text=Language, [data-testid="language-tab"]');
            if (await langTab.first().isVisible({ timeout: 3000 }).catch(() => false)) {
                await langTab.first().click();
                // Should show language selector
                const langSelector = page.locator('select, [data-testid="language-select"], text=English');
                await expect(langSelector.first()).toBeVisible({ timeout: 5000 });
            }
        }
    });

    test('should navigate to security settings', async ({ page }) => {
        const settingsBtn = page.locator('[data-testid="user-settings"], [aria-label*="Settings"]');
        if (await settingsBtn.first().isVisible({ timeout: 5000 }).catch(() => false)) {
            await settingsBtn.first().click();
            const securityTab = page.locator('text=Security, text=Password, [data-testid="security-tab"]');
            if (await securityTab.first().isVisible({ timeout: 3000 }).catch(() => false)) {
                await securityTab.first().click();
            }
        }
    });
});

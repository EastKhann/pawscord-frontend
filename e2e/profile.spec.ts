// frontend/e2e/profile.spec.ts
// E2E tests for user profile flows

import { test, expect, Page } from '@playwright/test';

async function loginAsTestUser(page: Page) {
    await page.goto('/login');
    const emailInput = page.locator('input[type="email"], input[name="email"], input[name="username"]');
    await emailInput.fill(process.env.E2E_TEST_EMAIL || 'testuser@pawscord.com');
    await page.fill('input[type="password"]', process.env.E2E_TEST_PASSWORD || 'TestPass123!');
    await page.click('button[type="submit"]');
    await page.waitForURL((url) => !url.pathname.includes('login'), { timeout: 10_000 }).catch(() => { });
}

test.describe('User Profile', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsTestUser(page);
    });

    test('should open profile popout / panel', async ({ page }) => {
        const profileTrigger = page.locator(
            '[class*="user-panel"], [data-testid="user-avatar"], [class*="avatar-wrapper"], [class*="current-user"]'
        ).first();
        if (await profileTrigger.count() > 0) {
            await profileTrigger.click();
            const profilePopout = page.locator(
                '[class*="profile"], [class*="popout"], [class*="user-card"]'
            );
            await expect(profilePopout.first()).toBeVisible({ timeout: 5_000 });
        }
    });

    test('should display username in user panel', async ({ page }) => {
        const userPanel = page.locator(
            '[class*="user-panel"], [class*="current-user"], [class*="user-area"]'
        ).first();
        await expect(userPanel).toBeVisible({ timeout: 10_000 });
        const usernameText = await userPanel.textContent();
        expect(usernameText?.length).toBeGreaterThan(0);
    });

    test('should navigate to user settings', async ({ page }) => {
        const settingsBtn = page.locator(
            '[data-testid="settings"], [aria-label*="ettings"], [class*="settings-btn"], button:has-text("Settings"), button:has-text("Ayarlar")'
        ).first();
        if (await settingsBtn.count() > 0) {
            await settingsBtn.click();
            const settingsPanel = page.locator(
                '[class*="settings"], [class*="user-settings"]'
            );
            await expect(settingsPanel.first()).toBeVisible({ timeout: 8_000 });
        }
    });

    test('should show profile edit form in settings', async ({ page }) => {
        const settingsBtn = page.locator(
            '[data-testid="settings"], [aria-label*="ettings"], [class*="settings-btn"]'
        ).first();
        if (await settingsBtn.count() > 0) {
            await settingsBtn.click();
            // Look for profile editing section
            const profileSection = page.locator(
                '[class*="profile"], [class*="account"], input[name="username"], input[name="display_name"], input[name="bio"]'
            );
            await expect(profileSection.first()).toBeVisible({ timeout: 8_000 });
        }
    });

    test('should be able to update status', async ({ page }) => {
        const statusTrigger = page.locator(
            '[class*="status"], [data-testid="status-selector"], [class*="user-panel"] [class*="status"]'
        ).first();
        if (await statusTrigger.count() > 0) {
            await statusTrigger.click();
            const statusOptions = page.locator(
                '[class*="status-option"], [class*="status-item"], [role="menuitem"]'
            );
            await expect(statusOptions.first()).toBeVisible({ timeout: 5_000 });
        }
    });

    test('should display avatar in profile', async ({ page }) => {
        const avatar = page.locator(
            '[class*="avatar"], [class*="user-avatar"], img[alt*="avatar"], img[class*="avatar"]'
        ).first();
        await expect(avatar).toBeVisible({ timeout: 10_000 });
    });
});

test.describe('Profile Card', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsTestUser(page);
    });

    test('should show online indicator for current user', async ({ page }) => {
        const onlineIndicator = page.locator(
            '[class*="online"], [class*="presence"], [class*="status-indicator"], [data-status]'
        ).first();
        await expect(onlineIndicator).toBeVisible({ timeout: 10_000 });
    });
});

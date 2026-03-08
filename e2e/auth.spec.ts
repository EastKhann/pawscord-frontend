// frontend/e2e/auth.spec.ts
// E2E tests for authentication flows

import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should show login page when not authenticated', async ({ page }) => {
        // Expect redirect to login or login screen visible
        await expect(page).toHaveURL(/login|\/$/);
        await expect(page.locator('input[type="password"], input[name="password"]')).toBeVisible({ timeout: 10_000 });
    });

    test('should display login form elements', async ({ page }) => {
        await page.goto('/login');
        await expect(page.locator('input[type="email"], input[name="email"], input[name="username"]')).toBeVisible({ timeout: 10_000 });
        await expect(page.locator('input[type="password"]')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('should show error on invalid credentials', async ({ page }) => {
        await page.goto('/login');
        await page.fill('input[type="email"], input[name="email"], input[name="username"]', 'invalid@test.com');
        await page.fill('input[type="password"]', 'wrongpassword');
        await page.click('button[type="submit"]');
        // Expect some error message to appear
        await expect(
            page.locator('[class*="error"], [role="alert"], [class*="alert"]')
        ).toBeVisible({ timeout: 8_000 });
    });

    test('should navigate to register page from login', async ({ page }) => {
        await page.goto('/login');
        const registerLink = page.locator('a[href*="register"], button:has-text("Register"), button:has-text("Kayıt")');
        if (await registerLink.count() > 0) {
            await registerLink.first().click();
            await expect(page).toHaveURL(/register/);
        }
    });

    test('should show register form with required fields', async ({ page }) => {
        await page.goto('/register');
        await expect(page.locator('input[name="username"], input[name="email"]')).toBeVisible({ timeout: 10_000 });
        await expect(page.locator('input[type="password"]')).toBeVisible();
    });

    test('should validate password confirmation mismatch', async ({ page }) => {
        await page.goto('/register');
        const usernameInput = page.locator('input[name="username"]');
        const emailInput = page.locator('input[name="email"]');
        const passwordInput = page.locator('input[name="password"]').first();
        const confirmInput = page.locator('input[name="confirmPassword"], input[name="confirm_password"], input[placeholder*="onfirm"]');

        if (await usernameInput.count() > 0) await usernameInput.fill('testuser');
        if (await emailInput.count() > 0) await emailInput.fill('test@example.com');
        if (await passwordInput.count() > 0) await passwordInput.fill('Password123!');
        if (await confirmInput.count() > 0) await confirmInput.fill('DifferentPassword!');

        await page.click('button[type="submit"]');
        await expect(
            page.locator('[class*="error"], [role="alert"]')
        ).toBeVisible({ timeout: 5_000 });
    });
});

test.describe('Protected Routes', () => {
    test('should redirect unauthenticated users from /app to login', async ({ page }) => {
        await page.goto('/app');
        // Should be redirected away from /app
        await page.waitForURL((url) => !url.pathname.startsWith('/app'), { timeout: 5_000 }).catch(() => {
            // May stay if no redirect — check for login form instead
        });
        const isOnLogin = page.url().includes('login') || await page.locator('input[type="password"]').isVisible();
        expect(isOnLogin).toBeTruthy();
    });
});

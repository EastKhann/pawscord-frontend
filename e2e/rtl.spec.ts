// frontend/e2e/rtl.spec.ts
// RTL (Right-to-Left) layout tests for Arabic locale
import { test, expect } from '@playwright/test';

test.describe('RTL Layout Support', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // Set language to Arabic
        await page.evaluate(() => {
            localStorage.setItem('pawscord_language', 'ar');
        });
        await page.reload();
    });

    test('should set dir=rtl on html element for Arabic', async ({ page }) => {
        const dir = await page.getAttribute('html', 'dir');
        expect(dir).toBe('rtl');
    });

    test('should set lang=ar on html element', async ({ page }) => {
        const lang = await page.getAttribute('html', 'lang');
        expect(lang).toBe('ar');
    });

    test('should render text in RTL direction', async ({ page }) => {
        // Check that the body has RTL-appropriate styling
        const direction = await page.evaluate(() => {
            return window.getComputedStyle(document.body).direction;
        });
        expect(direction).toBe('rtl');
    });

    test('should switch back to LTR when changing to English', async ({ page }) => {
        await page.evaluate(() => {
            localStorage.setItem('pawscord_language', 'en');
        });
        await page.reload();
        const dir = await page.getAttribute('html', 'dir');
        expect(dir).toBe('ltr');
    });
});

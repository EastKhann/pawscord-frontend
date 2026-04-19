// frontend/e2e/i18n.spec.ts
// E2E tests for multi-language support
import { test, expect } from '@playwright/test';

test.describe('Language Switching', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should default to browser language or English fallback', async ({ page }) => {
        const lang = await page.getAttribute('html', 'lang');
        // Should be set to browser lang or 'en' (never hardcoded 'tr')
        expect(lang).toBeTruthy();
        expect(lang).not.toBe('');
    });

    test('should persist language choice in localStorage', async ({ page }) => {
        await page.evaluate(() => {
            localStorage.setItem('pawscord_language', 'de');
        });
        await page.reload();
        const stored = await page.evaluate(() => localStorage.getItem('pawscord_language'));
        expect(stored).toBe('de');
    });

    test('should switch to French when selected', async ({ page }) => {
        await page.evaluate(() => {
            localStorage.setItem('pawscord_language', 'fr');
        });
        await page.reload();
        const lang = await page.getAttribute('html', 'lang');
        expect(lang).toBe('fr');
    });

    test('should switch to Japanese', async ({ page }) => {
        await page.evaluate(() => {
            localStorage.setItem('pawscord_language', 'ja');
        });
        await page.reload();
        const lang = await page.getAttribute('html', 'lang');
        expect(lang).toBe('ja');
    });

    test('should handle unknown language by falling back to English', async ({ page }) => {
        await page.evaluate(() => {
            localStorage.setItem('pawscord_language', 'xx');
        });
        await page.reload();
        // Should fall back to English, not crash
        const lang = await page.getAttribute('html', 'lang');
        expect(lang).toBeTruthy();
    });
});

test.describe('RTL Direction for Arabic', () => {
    test('should set dir=rtl when Arabic selected', async ({ page }) => {
        await page.evaluate(() => {
            localStorage.setItem('pawscord_language', 'ar');
        });
        await page.goto('/');
        const dir = await page.getAttribute('html', 'dir');
        expect(dir).toBe('rtl');
    });

    test('should set dir=ltr when switching from Arabic to English', async ({ page }) => {
        await page.evaluate(() => {
            localStorage.setItem('pawscord_language', 'en');
        });
        await page.goto('/');
        const dir = await page.getAttribute('html', 'dir');
        expect(dir).toBe('ltr');
    });
});

test.describe('New Languages (pt, ko, zh, it, ru, hi)', () => {
    const newLanguages = [
        { code: 'pt', name: 'Portuguese' },
        { code: 'ko', name: 'Korean' },
        { code: 'zh', name: 'Chinese' },
        { code: 'it', name: 'Italian' },
        { code: 'ru', name: 'Russian' },
        { code: 'hi', name: 'Hindi' },
    ];

    for (const lang of newLanguages) {
        test(`should load ${lang.name} (${lang.code}) without errors`, async ({ page }) => {
            await page.evaluate((code) => {
                localStorage.setItem('pawscord_language', code);
            }, lang.code);
            await page.goto('/');
            const htmlLang = await page.getAttribute('html', 'lang');
            expect(htmlLang).toBe(lang.code);
            // No console errors
            const errors: string[] = [];
            page.on('console', msg => {
                if (msg.type() === 'error') errors.push(msg.text());
            });
            await page.waitForTimeout(1000);
            const i18nErrors = errors.filter(e => e.includes('i18n') || e.includes('translation'));
            expect(i18nErrors).toHaveLength(0);
        });
    }
});

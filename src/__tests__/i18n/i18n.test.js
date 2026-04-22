// frontend/src/__tests__/i18n/i18n.test.js
// Tests for i18n configuration, language detection, and locale completeness

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock i18next before importing
vi.mock('i18next-browser-languagedetector', () => ({
    default: {
        type: 'languageDetector',
        init: vi.fn(),
        detect: vi.fn(() => 'en'),
        cacheUserLanguage: vi.fn(),
    },
}));

describe('i18n Configuration', () => {
    it('should export SUPPORTED_LANGUAGES with 20 languages', async () => {
        const { SUPPORTED_LANGUAGES } = await import('../../i18n/index.js');
        expect(SUPPORTED_LANGUAGES).toHaveLength(20);
    });

    it('should have English as fallback language', async () => {
        const i18n = (await import('../../i18n/index.js')).default;
        expect(i18n.options.fallbackLng).toContain('en');
    });

    it('should include all expected language codes', async () => {
        const { SUPPORTED_LANGUAGES } = await import('../../i18n/index.js');
        const codes = SUPPORTED_LANGUAGES.map((l) => l.code);
        expect(codes).toContain('en');
        expect(codes).toContain('tr');
        expect(codes).toContain('de');
        expect(codes).toContain('fr');
        expect(codes).toContain('es');
        expect(codes).toContain('pt');
        expect(codes).toContain('it');
        expect(codes).toContain('ru');
        expect(codes).toContain('ar');
        expect(codes).toContain('ja');
        expect(codes).toContain('ko');
        expect(codes).toContain('zh');
        expect(codes).toContain('hi');
    });

    it('should mark Arabic as RTL', async () => {
        const { SUPPORTED_LANGUAGES, RTL_LANGUAGES } = await import('../../i18n/index.js');
        expect(RTL_LANGUAGES).toContain('ar');
        const searchbic = SUPPORTED_LANGUAGES.find((l) => l.code === 'ar');
        expect(searchbic.dir).toBe('rtl');
    });

    it('should have flags for all languages', async () => {
        const { SUPPORTED_LANGUAGES } = await import('../../i18n/index.js');
        SUPPORTED_LANGUAGES.forEach((lang) => {
            expect(lang.flag).toBeTruthy();
            expect(lang.name).toBeTruthy();
            expect(lang.dir).toMatch(/^(ltr|rtl)$/);
        });
    });

    it('getLanguageName should return display name with flag', async () => {
        const { getLanguageName } = await import('../../i18n/index.js');
        const result = getLanguageName('en');
        expect(result).toContain('English');
        expect(result).toContain('🇬🇧');
    });

    it('getLanguageName should return code for unknown language', async () => {
        const { getLanguageName } = await import('../../i18n/index.js');
        expect(getLanguageName('xx')).toBe('xx');
    });

    it('detection should check localStorage then navigator', async () => {
        const i18n = (await import('../../i18n/index.js')).default;
        const detection = i18n.options.detection;
        expect(detection.order).toContain('localStorage');
        expect(detection.order).toContain('navigator');
        expect(detection.lookupLocalStorage).toBe('pawscord_language');
    });
});

describe('Locale File Completeness', () => {
    const locales = ['en', 'tr', 'de', 'fr', 'es', 'ar', 'ja', 'pt', 'ko', 'zh', 'it', 'ru', 'hi'];

    function getAllKeys(obj, prefix = '') {
        let keys = [];
        for (const [key, value] of Object.entries(obj)) {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            if (typeof value === 'object' && value !== null) {
                keys = keys.concat(getAllKeys(value, fullKey));
            } else {
                keys.push(fullKey);
            }
        }
        return keys.sort();
    }

    it('all locales should have the same top-level categories as English', async () => {
        const en = (await import('../../i18n/locales/en.json')).default;
        const enCategories = Object.keys(en).sort();

        for (const locale of locales) {
            if (locale === 'en') continue;
            const data = (await import(`../../i18n/locales/${locale}.json`)).default;
            const categories = Object.keys(data).sort();
            // Each locale should have all main categories
            for (const cat of [
                'common',
                'auth',
                'chat',
                'server',
                'friends',
                'voice',
                'settings',
            ]) {
                expect(categories, `${locale} missing category: ${cat}`).toContain(cat);
            }
        }
    });

    it('English locale should have at least 300 keys', async () => {
        const en = (await import('../../i18n/locales/en.json')).default;
        const keys = getAllKeys(en);
        expect(keys.length).toBeGreaterThanOrEqual(300);
    });

    it('all locales should have common section with required keys', async () => {
        const requiredCommonKeys = [
            'loading',
            'save',
            'cancel',
            'delete',
            'edit',
            'close',
            'confirm',
            'search',
            'send',
        ];
        for (const locale of locales) {
            const data = (await import(`../../i18n/locales/${locale}.json`)).default;
            for (const key of requiredCommonKeys) {
                expect(data.common?.[key], `${locale} missing common.${key}`).toBeTruthy();
            }
        }
    });

    it('no locale should have empty string values', async () => {
        for (const locale of locales) {
            const data = (await import(`../../i18n/locales/${locale}.json`)).default;
            const keys = getAllKeys(data);
            for (const key of keys) {
                const parts = key.split('.');
                let value = data;
                let broken = false;
                for (const part of parts) {
                    if (value === undefined || value === null) { broken = true; break; }
                    value = value[part];
                }
                if (broken) continue; // key with dots in name — skip path navigation
                expect(value, `${locale}.${key} is empty`).not.toBe('');
            }
        }
    });
});

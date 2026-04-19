// frontend/src/__tests__/components/LanguageSelector.test.jsx
import { describe, it, expect, vi } from 'vitest';

// Test the exported constants and pure functions from i18n without full component rendering
describe('LanguageSelector Data Layer', () => {
    it('SUPPORTED_LANGUAGES should have all 13 languages', async () => {
        const { SUPPORTED_LANGUAGES } = await import('../../i18n/index.js');
        expect(SUPPORTED_LANGUAGES).toHaveLength(13);
        const codes = SUPPORTED_LANGUAGES.map((l) => l.code);
        expect(codes).toEqual(
            expect.arrayContaining([
                'en',
                'tr',
                'de',
                'fr',
                'es',
                'pt',
                'it',
                'ru',
                'ar',
                'ja',
                'ko',
                'zh',
                'hi',
            ])
        );
    });

    it('each language should have code, name, flag, dir', async () => {
        const { SUPPORTED_LANGUAGES } = await import('../../i18n/index.js');
        SUPPORTED_LANGUAGES.forEach((lang) => {
            expect(lang).toHaveProperty('code');
            expect(lang).toHaveProperty('name');
            expect(lang).toHaveProperty('flag');
            expect(lang).toHaveProperty('dir');
        });
    });

    it('Arabic should be RTL', async () => {
        const { SUPPORTED_LANGUAGES } = await import('../../i18n/index.js');
        const ar = SUPPORTED_LANGUAGES.find((l) => l.code === 'ar');
        expect(ar.dir).toBe('rtl');
    });

    it('LTR languages should have dir=ltr', async () => {
        const { SUPPORTED_LANGUAGES } = await import('../../i18n/index.js');
        const ltrCodes = ['en', 'tr', 'de', 'fr', 'es', 'pt', 'it', 'ru', 'ja', 'ko', 'zh', 'hi'];
        ltrCodes.forEach((code) => {
            const lang = SUPPORTED_LANGUAGES.find((l) => l.code === code);
            expect(lang.dir, `${code} should be ltr`).toBe('ltr');
        });
    });
});

describe('getLanguageName utility', () => {
    it('returns formatted name for known language', async () => {
        const { getLanguageName } = await import('../../i18n/index.js');
        const name = getLanguageName('tr');
        expect(name).toContain('Turkish');
    });

    it('returns code for unknown language', async () => {
        const { getLanguageName } = await import('../../i18n/index.js');
        expect(getLanguageName('zz')).toBe('zz');
    });

    it('returns name for all 13 languages', async () => {
        const { getLanguageName, SUPPORTED_LANGUAGES } = await import('../../i18n/index.js');
        SUPPORTED_LANGUAGES.forEach((lang) => {
            const name = getLanguageName(lang.code);
            expect(name).not.toBe(lang.code); // Should return display name, not just code
        });
    });
});

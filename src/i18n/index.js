// frontend/src/i18n/index.js
// 🌍 Internationalization (i18n) Configuration
// 20 languages supported — default is auto-detected from browser
//
// ⚡ BUNDLE OPTIMIZATION (Apr 2026):
// Only EN + TR are eager-loaded (~300 KB). Other 18 languages are loaded
// on demand via dynamic import when the user switches language.
// Saves ~1.4 MB from initial bundle.

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Eager-loaded core languages (most users land on one of these)
import en from './locales/en.json';
import tr from './locales/tr.json';

// Lazy loaders for the remaining 18 languages — Vite turns these into
// separate code-split chunks (one per locale) and they are fetched only when
// `i18n.changeLanguage(code)` is called.
const lazyLocales = {
    de: () => import('./locales/de.json'),
    fr: () => import('./locales/fr.json'),
    es: () => import('./locales/es.json'),
    ar: () => import('./locales/ar.json'),
    ja: () => import('./locales/ja.json'),
    pt: () => import('./locales/pt.json'),
    ko: () => import('./locales/ko.json'),
    zh: () => import('./locales/zh.json'),
    it: () => import('./locales/it.json'),
    ru: () => import('./locales/ru.json'),
    hi: () => import('./locales/hi.json'),
    pl: () => import('./locales/pl.json'),
    nl: () => import('./locales/nl.json'),
    sv: () => import('./locales/sv.json'),
    uk: () => import('./locales/uk.json'),
    vi: () => import('./locales/vi.json'),
    he: () => import('./locales/he.json'),
    fa: () => import('./locales/fa.json'),
};

// RTL languages
export const RTL_LANGUAGES = ['ar', 'he', 'fa'];

// All supported languages with metadata
export const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷', dir: 'ltr' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
    { code: 'pt', name: 'Português', flag: '🇧🇷', dir: 'ltr' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    { code: 'ja', name: '日本語', flag: '🇯🇵', dir: 'ltr' },
    { code: 'ko', name: '한국어', flag: '🇰🇷', dir: 'ltr' },
    { code: 'zh', name: '中文', flag: '🇨🇳', dir: 'ltr' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱', dir: 'ltr' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪', dir: 'ltr' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦', dir: 'ltr' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr' },
    { code: 'he', name: 'עברית', flag: '🇮🇱', dir: 'rtl' },
    { code: 'fa', name: 'فارسی', flag: '🇮🇷', dir: 'rtl' },
];

const ALL_LANG_CODES = SUPPORTED_LANGUAGES.map((l) => l.code);

// Track which lazy locales have already been loaded so we never fetch twice.
const loadedLocales = new Set(['en', 'tr']);

/**
 * Ensure the resource bundle for a given language is registered with i18next.
 * No-op for already-loaded languages and unknown codes.
 * @param {string} code - ISO 639-1 language code
 */
export async function ensureLocaleLoaded(code) {
    if (!code || loadedLocales.has(code)) return;
    const loader = lazyLocales[code];
    if (!loader) return;
    try {
        const mod = await loader();
        const data = mod && (mod.default || mod);
        if (data) {
            i18n.addResourceBundle(code, 'translation', data, true, true);
            loadedLocales.add(code);
        }
    } catch (err) {
        console.warn(`[i18n] Failed to load locale "${code}":`, err);
    }
}

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            tr: { translation: tr },
        },
        // Tell i18next about all supported languages, even though most are
        // not yet loaded. partialBundledLanguages allows runtime addResourceBundle.
        partialBundledLanguages: true,
        supportedLngs: ALL_LANG_CODES,
        fallbackLng: ['en', 'tr'],
        debug: false,

        interpolation: {
            escapeValue: false, // React already escapes
        },

        detection: {
            // Browser language first, then cached preference
            order: ['localStorage', 'navigator', 'htmlTag'],
            lookupLocalStorage: 'pawscord_language',
            caches: ['localStorage'],
        },
    })
    .then(() => {
        // After init, if the resolved language isn't EN/TR, lazy-load it.
        const resolved = i18n.resolvedLanguage || i18n.language;
        if (resolved && !loadedLocales.has(resolved)) {
            ensureLocaleLoaded(resolved).then(() => {
                // Trigger a re-render once translations are available.
                i18n.changeLanguage(resolved);
            });
        }
    });

// Patch changeLanguage so callers automatically pull the locale chunk first.
const __origChangeLanguage = i18n.changeLanguage.bind(i18n);
i18n.changeLanguage = async (lng, ...rest) => {
    if (lng) await ensureLocaleLoaded(lng);
    return __origChangeLanguage(lng, ...rest);
};

// Apply RTL direction and lang attribute when language changes
i18n.on('languageChanged', (lng) => {
    const dir = RTL_LANGUAGES.includes(lng) ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lng);
});

/**
 * Get the display name for a language code
 * @param {string} code - ISO 639-1 language code
 * @returns {string} Display name with flag
 */
export const getLanguageName = (code) => {
    const lang = SUPPORTED_LANGUAGES.find((l) => l.code === code);
    return lang ? `${lang.flag} ${lang.name}` : code;
};

export default i18n;

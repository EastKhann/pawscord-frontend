// frontend/src/i18n/index.js
// 🌍 Internationalization (i18n) Configuration
// Supported languages: Turkish (default), English, German, French, Spanish, Arabic, Japanese

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import tr from './locales/tr.json';
import en from './locales/en.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import ar from './locales/ar.json';
import ja from './locales/ja.json';

// RTL languages
export const RTL_LANGUAGES = ['ar'];

// All supported languages with metadata
export const SUPPORTED_LANGUAGES = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
    { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    { code: 'ja', name: '日本語', flag: '🇯🇵', dir: 'ltr' },
];

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            tr: { translation: tr },
            en: { translation: en },
            de: { translation: de },
            fr: { translation: fr },
            es: { translation: es },
            ar: { translation: ar },
            ja: { translation: ja },
        },
        supportedLngs: ['tr', 'en', 'de', 'fr', 'es', 'ar', 'ja'],
        fallbackLng: 'tr',
        debug: false,

        interpolation: {
            escapeValue: false, // React already escapes
        },

        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            lookupLocalStorage: 'pawscord_language',
            caches: ['localStorage'],
        },
    });

// Apply RTL direction when language changes
i18n.on('languageChanged', (lng) => {
    const dir = RTL_LANGUAGES.includes(lng) ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lng);
});

export default i18n;

// frontend/src/contexts/LanguageContext.js
// 🌐 INTERNATIONALIZATION CONTEXT (Enhanced with i18next)

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import i18n from '../i18n';
import api from '../api';

const LanguageContext = createContext();

// Default translations (Turkish fallback)
const defaultTranslations = {
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'common.loading': 'Yükleniyor...',
    'common.error': 'Hata',
    'common.success': 'Başarılı',
};

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('tr');
    const [translations, setTranslations] = useState(defaultTranslations);
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [direction, setDirection] = useState('ltr');

    // Load available languages
    useEffect(() => {
        const loadLanguages = async () => {
            try {
                const response = await api.get('/i18n/languages/');
                setLanguages(response.data.languages);
            } catch (error) {
                console.error('Failed to load languages:', error);
            }
        };
        loadLanguages();
    }, []);

    // Load user's language preference
    useEffect(() => {
        const loadUserLanguage = async () => {
            try {
                const stored = localStorage.getItem('language');
                if (stored) {
                    setCurrentLanguage(stored);
                    await loadTranslations(stored);
                } else {
                    // Try to get from API if logged in
                    try {
                        const response = await api.get('/i18n/user/');
                        setCurrentLanguage(response.data.code);
                        await loadTranslations(response.data.code);
                    } catch {
                        // Not logged in, use browser language or default
                        const browserLang = navigator.language.split('-')[0];
                        const supported = ['tr', 'en', 'de', 'fr', 'es', 'ru', 'ar', 'ja', 'ko', 'zh'];
                        const lang = supported.includes(browserLang) ? browserLang : 'tr';
                        setCurrentLanguage(lang);
                        await loadTranslations(lang);
                    }
                }
            } catch (error) {
                console.error('Failed to load user language:', error);
            }
            setLoading(false);
        };
        loadUserLanguage();
    }, []);

    // Load translations for a language
    const loadTranslations = async (langCode) => {
        try {
            const response = await api.get(`/i18n/translations/${langCode}/`);
            setTranslations(response.data.translations);
            setDirection(response.data.language?.direction || 'ltr');

            // Update document direction for RTL languages
            document.documentElement.dir = response.data.language?.direction || 'ltr';
            document.documentElement.lang = langCode;
        } catch (error) {
            console.error('Failed to load translations:', error);
            // Fallback to default
            setTranslations(defaultTranslations);
        }
    };

    // Change language
    const changeLanguage = useCallback(async (langCode) => {
        setCurrentLanguage(langCode);
        localStorage.setItem('language', langCode);
        localStorage.setItem('pawscord_language', langCode);
        i18n.changeLanguage(langCode); // Sync i18next
        await loadTranslations(langCode);

        // Save to server if logged in
        try {
            await api.post('/i18n/user/set/', { language: langCode });
        } catch {
            // Not logged in, that's fine
        }
    }, []);

    // Translation function with interpolation + i18next fallback
    const t = useCallback((key, params = {}) => {
        let text = translations[key];

        // Fallback to i18next bundled translations if API translation missing
        if (!text || text === key) {
            const i18nKey = key.replace(/^([^.]+)\./, '$1.');
            const i18nResult = i18n.t(i18nKey, params);
            if (i18nResult !== i18nKey) {
                return i18nResult;
            }
        }

        if (!text) return key;

        // Handle interpolation {param}
        Object.entries(params).forEach(([param, value]) => {
            text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), value);
        });

        return text;
    }, [translations]);

    // Get language info
    const getLanguageInfo = useCallback((code) => {
        return languages.find(l => l.code === code);
    }, [languages]);

    const value = {
        currentLanguage,
        languages,
        translations,
        loading,
        direction,
        t,
        changeLanguage,
        getLanguageInfo
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

// Hook for using language context
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Hook for just the translate function
export const useTranslation = () => {
    const { t } = useLanguage();
    return t;
};

export default LanguageContext;

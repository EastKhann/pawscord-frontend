// frontend/src/contexts/LanguageContext.js
// 🌐 INTERNATIONALIZATION CONTEXT (Enhanced with i18next)

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import i18n, { SUPPORTED_LANGUAGES } from '../i18n';
import api from '../api';
import logger from '../utils/logger';

interface LanguageInfo {
    code: string;
    name: string;
    native_name: string;
    flag: string;
    direction: string;
}

interface LanguageContextValue {
    currentLanguage: string;
    languages: LanguageInfo[];
    translations: Record<string, string>;
    loading: boolean;
    direction: string;
    t: (key: string, params?: Record<string, string>) => string;
    changeLanguage: (langCode: string) => Promise<void>;
    getLanguageInfo: (code: string) => LanguageInfo | undefined;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

// Default translations (English fallback)
const defaultTranslations: Record<string, string> = {
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    // Use i18next's detected language (browser-first) as initial
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');
    const [translations, setTranslations] = useState<Record<string, string>>(defaultTranslations);
    const [languages, setLanguages] = useState<LanguageInfo[]>(
        SUPPORTED_LANGUAGES.map((l) => ({
            code: l.code,
            name: l.name,
            native_name: l.name,
            flag: l.flag,
            direction: l.dir,
        }))
    );
    const [loading, setLoading] = useState(true);
    const [direction, setDirection] = useState('ltr');

    // Load available languages (merge API + local)
    useEffect(() => {
        const loadLanguages = async () => {
            try {
                const response = await api.get('/i18n/languages/');
                if (response.data.languages?.length) {
                    setLanguages(response.data.languages);
                }
            } catch {
                // API unavailable — use local SUPPORTED_LANGUAGES (already set)
            }
        };
        loadLanguages();
    }, []);

    // Load user's language preference (i18next already detected browser lang)
    useEffect(() => {
        const loadUserLanguage = async () => {
            try {
                const stored = localStorage.getItem('pawscord_language');
                if (stored) {
                    setCurrentLanguage(stored);
                    i18n.changeLanguage(stored);
                    await loadTranslations(stored);
                } else {
                    // i18next already detected browser language
                    const detectedLang = i18n.language?.split('-')[0] || 'en';
                    setCurrentLanguage(detectedLang);
                    await loadTranslations(detectedLang);
                }
            } catch {
                // Fallback handled by i18next
            }
            setLoading(false);
        };
        loadUserLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Load translations for a language
    const loadTranslations = async (langCode: string) => {
        try {
            const response = await api.get(`/i18n/translations/${langCode}/`);
            setTranslations(response.data.translations);
            setDirection(response.data.language?.direction || 'ltr');

            // Update document direction for RTL languages
            document.documentElement.dir = response.data.language?.direction || 'ltr';
            document.documentElement.lang = langCode;
        } catch (error) {
            logger.error('Failed to load translations:', error);
            // Fallback to default
            setTranslations(defaultTranslations);
        }
    };

    // Change language
    const changeLanguage = useCallback(async (langCode: string) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Translation function with interpolation + i18next fallback
    const t = useCallback(
        (key: string, params: Record<string, string> = {}) => {
            let text: string | undefined = translations[key];

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
                text = text!.replace(new RegExp(`\\{${param}\\}`, 'g'), value);
            });

            return text;
        },
        [translations]
    );

    // Get language info
    const getLanguageInfo = useCallback(
        (code: string) => {
            return languages.find((l) => l.code === code);
        },
        [languages]
    );

    const value: LanguageContextValue = {
        currentLanguage,
        languages,
        translations,
        loading,
        direction,
        t,
        changeLanguage,
        getLanguageInfo,
    };

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
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

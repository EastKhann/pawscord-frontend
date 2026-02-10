// frontend/src/utils/i18n.js

/**
 * 🌍 Internationalization Manager
 * Multi-language support with dynamic loading and formatting
 */

class I18nManager {
    constructor(options = {}) {
        this.defaultLocale = options.defaultLocale || 'en';
        this.currentLocale = options.currentLocale || this.defaultLocale;
        this.fallbackLocale = options.fallbackLocale || 'en';
        this.storageKey = options.storageKey || 'app-locale';

        this.translations = new Map();
        this.loadedLocales = new Set();
        this.listeners = new Map();

        this.init();
    }

    /**
     * Initialize
     */
    init() {
        // Load saved locale
        const savedLocale = this.loadLocale();
        if (savedLocale) {
            this.currentLocale = savedLocale;
        }

        // Detect browser locale
        if (!savedLocale) {
            const browserLocale = navigator.language.split('-')[0];
            this.currentLocale = browserLocale || this.defaultLocale;
        }

        if (import.meta.env.MODE === 'development') {
        }
    }

    /**
     * Register translations
     */
    register(locale, translations) {
        if (!this.translations.has(locale)) {
            this.translations.set(locale, {});
        }

        const existing = this.translations.get(locale);
        this.translations.set(locale, this.deepMerge(existing, translations));
        this.loadedLocales.add(locale);

        if (import.meta.env.MODE === 'development') {
        }
    }

    /**
     * Load translations from URL
     */
    async loadTranslations(locale, url) {
        try {
            const response = await fetch(url);
            const translations = await response.json();

            this.register(locale, translations);
            return translations;
        } catch (error) {
            console.error(`Failed to load translations for ${locale}:`, error);
            return null;
        }
    }

    /**
     * Set locale
     */
    async setLocale(locale, options = {}) {
        const { load = true, save = true } = options;

        // Load translations if not loaded
        if (load && !this.loadedLocales.has(locale)) {
            const url = options.url || `/locales/${locale}.json`;
            await this.loadTranslations(locale, url);
        }

        const previousLocale = this.currentLocale;
        this.currentLocale = locale;

        // Save to storage
        if (save) {
            this.saveLocale(locale);
        }

        // Update document lang
        document.documentElement.lang = locale;

        // Emit event
        this.emit('localeChange', {
            previous: previousLocale,
            current: locale
        });

        if (import.meta.env.MODE === 'development') {
        }
    }

    /**
     * Translate
     */
    t(key, params = {}, locale = this.currentLocale) {
        const translation = this.getTranslation(key, locale);

        if (!translation) {
            if (import.meta.env.MODE === 'development') {
                console.warn(`Translation missing: ${key} (${locale})`);
            }
            return key;
        }

        return this.interpolate(translation, params);
    }

    /**
     * Get translation
     */
    getTranslation(key, locale) {
        const translations = this.translations.get(locale);

        if (!translations) {
            // Try fallback locale
            return this.getTranslation(key, this.fallbackLocale);
        }

        // Support nested keys: "user.profile.name"
        const keys = key.split('.');
        let value = translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Try fallback locale
                if (locale !== this.fallbackLocale) {
                    return this.getTranslation(key, this.fallbackLocale);
                }
                return null;
            }
        }

        return value;
    }

    /**
     * Interpolate parameters
     */
    interpolate(str, params) {
        return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return params[key] !== undefined ? params[key] : match;
        });
    }

    /**
     * Pluralize
     */
    plural(key, count, params = {}) {
        const pluralKey = count === 1 ? `${key}.one` : `${key}.other`;
        return this.t(pluralKey, { count, ...params });
    }

    /**
     * Format number
     */
    formatNumber(number, options = {}) {
        return new Intl.NumberFormat(this.currentLocale, options).format(number);
    }

    /**
     * Format currency
     */
    formatCurrency(amount, currency = 'USD', options = {}) {
        return new Intl.NumberFormat(this.currentLocale, {
            style: 'currency',
            currency,
            ...options
        }).format(amount);
    }

    /**
     * Format date
     */
    formatDate(date, options = {}) {
        return new Intl.DateTimeFormat(this.currentLocale, options).format(
            typeof date === 'string' ? new Date(date) : date
        );
    }

    /**
     * Format relative time
     */
    formatRelativeTime(date, options = {}) {
        const rtf = new Intl.RelativeTimeFormat(this.currentLocale, options);
        const now = Date.now();
        const target = typeof date === 'string' ? new Date(date).getTime() : date;
        const diffInSeconds = Math.floor((target - now) / 1000);

        const units = [
            { unit: 'year', seconds: 31536000 },
            { unit: 'month', seconds: 2592000 },
            { unit: 'week', seconds: 604800 },
            { unit: 'day', seconds: 86400 },
            { unit: 'hour', seconds: 3600 },
            { unit: 'minute', seconds: 60 },
            { unit: 'second', seconds: 1 }
        ];

        for (const { unit, seconds } of units) {
            if (Math.abs(diffInSeconds) >= seconds) {
                const value = Math.floor(diffInSeconds / seconds);
                return rtf.format(value, unit);
            }
        }

        return rtf.format(0, 'second');
    }

    /**
     * Get current locale
     */
    getCurrentLocale() {
        return this.currentLocale;
    }

    /**
     * Get available locales
     */
    getAvailableLocales() {
        return Array.from(this.loadedLocales);
    }

    /**
     * Deep merge objects
     */
    deepMerge(target, source) {
        const output = { ...target };

        for (const key in source) {
            if (source[key] instanceof Object && key in target) {
                output[key] = this.deepMerge(target[key], source[key]);
            } else {
                output[key] = source[key];
            }
        }

        return output;
    }

    /**
     * Save locale to storage
     */
    saveLocale(locale) {
        try {
            localStorage.setItem(this.storageKey, locale);
        } catch (error) {
            console.error('Failed to save locale:', error);
        }
    }

    /**
     * Load locale from storage
     */
    loadLocale() {
        try {
            return localStorage.getItem(this.storageKey);
        } catch (error) {
            console.error('Failed to load locale:', error);
            return null;
        }
    }

    /**
     * Event emitter
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    off(event, callback) {
        if (!this.listeners.has(event)) return;

        const callbacks = this.listeners.get(event);
        const index = callbacks.indexOf(callback);

        if (index > -1) {
            callbacks.splice(index, 1);
        }
    }

    emit(event, data) {
        if (!this.listeners.has(event)) return;

        this.listeners.get(event).forEach(callback => {
            callback(data);
        });
    }
}

// Global instance
export const i18n = new I18nManager();

// Example translations
i18n.register('en', {
    common: {
        welcome: 'Welcome',
        loading: 'Loading...',
        error: 'An error occurred',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit'
    },
    messages: {
        one: '{{count}} message',
        other: '{{count}} messages'
    }
});

i18n.register('tr', {
    common: {
        welcome: 'Hoş geldiniz',
        loading: 'Yükleniyor...',
        error: 'Bir hata oluştu',
        save: 'Kaydet',
        cancel: 'İptal',
        delete: 'Sil',
        edit: 'Düzenle'
    },
    messages: {
        one: '{{count}} mesaj',
        other: '{{count}} mesaj'
    }
});

/**
 * React Hook - Translation
 */
export const useTranslation = () => {
    const [locale, setLocaleState] = React.useState(i18n.getCurrentLocale());

    React.useEffect(() => {
        const handleLocaleChange = (data) => {
            setLocaleState(data.current);
        };

        i18n.on('localeChange', handleLocaleChange);

        return () => {
            i18n.off('localeChange', handleLocaleChange);
        };
    }, []);

    const t = React.useCallback((key, params) => {
        return i18n.t(key, params);
    }, [locale]);

    const setLocale = React.useCallback((newLocale, options) => {
        return i18n.setLocale(newLocale, options);
    }, []);

    return {
        t,
        locale,
        setLocale,
        formatNumber: i18n.formatNumber.bind(i18n),
        formatCurrency: i18n.formatCurrency.bind(i18n),
        formatDate: i18n.formatDate.bind(i18n),
        formatRelativeTime: i18n.formatRelativeTime.bind(i18n)
    };
};

export default I18nManager;



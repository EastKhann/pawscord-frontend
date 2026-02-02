import { useEffect, useCallback } from 'react';

// reCAPTCHA v3 Site Key (.env'den alınıyor)
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LfhUU0sAAAAALQKKgbT5xKopHIlv2isjdzEKIo4';

// Load reCAPTCHA script
export const loadRecaptcha = () => {
    return new Promise((resolve, reject) => {
        if (window.grecaptcha) {
            resolve(window.grecaptcha);
            return;
        }

        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            window.grecaptcha.ready(() => {
                resolve(window.grecaptcha);
            });
        };

        script.onerror = () => {
            reject(new Error('Failed to load reCAPTCHA'));
        };

        document.head.appendChild(script);
    });
};

// Execute reCAPTCHA and get token
export const executeRecaptcha = async (action = 'submit') => {
    try {
        await loadRecaptcha();

        const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
        return token;
    } catch (error) {
        console.error('reCAPTCHA error:', error);
        return null;
    }
};

// React Hook for reCAPTCHA
export const useRecaptcha = () => {
    useEffect(() => {
        loadRecaptcha().catch(err => {
            console.warn('reCAPTCHA load failed:', err);
        });
    }, []);

    const getToken = useCallback(async (action) => {
        return await executeRecaptcha(action);
    }, []);

    return { getToken };
};

// Verify token on backend
export const verifyRecaptchaToken = async (token, apiBaseUrl) => {
    try {
        const response = await fetch(`${apiBaseUrl}/auth/recaptcha/verify/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });

        const data = await response.json();
        return data.success && data.score >= 0.5; // Minimum score threshold
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return false;
    }
};

export default {
    loadRecaptcha,
    executeRecaptcha,
    useRecaptcha,
    verifyRecaptchaToken,
    RECAPTCHA_SITE_KEY
};



// frontend/src/hooks/usePWA.js
// React hook for PWA install prompt and service-worker updates

import { useState, useEffect, useCallback } from 'react';
import { isPWA, isNative, checkForUpdate } from '../utils/pwaHelpers';

/**
 * usePWA — surfaces installability and update state to React components.
 *
 * @returns {{
 *   installable: boolean,
 *   install: () => Promise<boolean>,
 *   updateAvailable: boolean,
 *   update: () => void,
 *   isStandalone: boolean,
 *   isNativeApp: boolean,
 * }}
 */
export const usePWA = () => {
    const [installable, setInstallable] = useState(false);
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const isStandalone = isPWA();
    const isNativeApp = isNative();

    // Listen for beforeinstallprompt
    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Also listen for successful install
        const installedHandler = () => {
            setInstallable(false);
            setDeferredPrompt(null);
        };
        window.addEventListener('appinstalled', installedHandler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            window.removeEventListener('appinstalled', installedHandler);
        };
    }, []);

    // Listen for SW update events
    useEffect(() => {
        if (!('serviceWorker' in navigator)) return;

        let registration;

        const checkReg = async () => {
            registration = await navigator.serviceWorker.getRegistration();
            if (!registration) return;

            // If a waiting worker already exists
            if (registration.waiting) {
                setUpdateAvailable(true);
            }

            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (!newWorker) return;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        setUpdateAvailable(true);
                    }
                });
            });
        };

        checkReg();
    }, []);

    const install = useCallback(async () => {
        if (!deferredPrompt) return false;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        setDeferredPrompt(null);
        setInstallable(false);
        return outcome === 'accepted';
    }, [deferredPrompt]);

    const update = useCallback(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistration().then((reg) => {
                if (reg?.waiting) {
                    reg.waiting.postMessage({ type: 'SKIP_WAITING' });
                    window.location.reload();
                } else {
                    checkForUpdate();
                }
            });
        }
    }, []);

    return {
        installable,
        install,
        updateAvailable,
        update,
        isStandalone,
        isNativeApp,
    };
};

export default usePWA;

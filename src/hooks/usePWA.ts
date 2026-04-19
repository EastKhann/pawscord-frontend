// frontend/src/hooks/usePWA.ts
// React hook for PWA install prompt and service-worker updates

import { useState, useEffect, useCallback } from 'react';
import { isPWA, isNative, checkForUpdate } from '../utils/pwaHelpers';

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAState {
    installable: boolean;
    install: () => Promise<boolean>;
    updateAvailable: boolean;
    update: () => void;
    isStandalone: boolean;
    isNativeApp: boolean;
}

export const usePWA = (): PWAState => {
    const [installable, setInstallable] = useState(false);
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const isStandalone = isPWA();
    const isNativeApp = isNative();

    // Listen for beforeinstallprompt
    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setInstallable(true);
        };

        const installedHandler = () => {
            setInstallable(false);
            setDeferredPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handler);
        window.addEventListener('appinstalled', installedHandler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            window.removeEventListener('appinstalled', installedHandler);
        };
    }, []);

    // Listen for SW update events
    useEffect(() => {
        if (!('serviceWorker' in navigator)) return;

        let registration: ServiceWorkerRegistration | undefined;
        let updateFoundHandler: (() => void) | undefined;

        const checkReg = async () => {
            registration = await navigator.serviceWorker.getRegistration();
            if (!registration) return;

            if (registration.waiting) {
                setUpdateAvailable(true);
            }

            updateFoundHandler = () => {
                const newWorker = registration!.installing;
                if (!newWorker) return;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        setUpdateAvailable(true);
                    }
                });
            };

            registration.addEventListener('updatefound', updateFoundHandler);
        };

        checkReg();

        return () => {
            if (registration && updateFoundHandler) {
                registration.removeEventListener('updatefound', updateFoundHandler);
            }
        };
    }, []);

    const install = useCallback(async (): Promise<boolean> => {
        if (!deferredPrompt) return false;
        await deferredPrompt.prompt();
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

    return { installable, install, updateAvailable, update, isStandalone, isNativeApp };
};

export default usePWA;

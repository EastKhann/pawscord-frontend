// frontend/src/utils/pwaHelpers.js
// PWA detection and install utilities

/**
 * Check if running as installed PWA (standalone display mode)
 */
export const isPWA = () => {
    if (typeof window === 'undefined') return false;
    return (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true // iOS Safari
    );
};

/**
 * Check if running inside Capacitor native shell
 */
export const isNative = () => {
    if (typeof window === 'undefined') return false;
    return (
        typeof window.Capacitor !== 'undefined' &&
        !!window.Capacitor.isNativePlatform
    );
};

/**
 * Check if the deferred install prompt is available
 */
export const canInstall = () => {
    return !!window.deferredPrompt;
};

/**
 * Trigger the deferred PWA install prompt
 * @returns {Promise<boolean>} true if user accepted
 */
export const requestInstall = async () => {
    if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        const result = await window.deferredPrompt.userChoice;
        window.deferredPrompt = null;
        return result.outcome === 'accepted';
    }
    return false;
};

/**
 * Ask the service worker registration to check for updates
 * @returns {Promise<boolean>} true if a registration was found and update was triggered
 */
export const checkForUpdate = async () => {
    if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg) {
            reg.update();
            return true;
        }
    }
    return false;
};

/**
 * Get the current display mode string
 */
export const getDisplayMode = () => {
    if (typeof window === 'undefined') return 'browser';
    const modes = ['standalone', 'fullscreen', 'minimal-ui', 'browser'];
    for (const mode of modes) {
        if (window.matchMedia(`(display-mode: ${mode})`).matches) return mode;
    }
    return 'browser';
};

/**
 * Listen for beforeinstallprompt and stash the event on window.deferredPrompt
 * Returns a cleanup function.
 */
export const listenForInstallPrompt = () => {
    const handler = (e) => {
        e.preventDefault();
        window.deferredPrompt = e;
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
};

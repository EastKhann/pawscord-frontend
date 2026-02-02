// frontend/src/utils/urlHandlers.js
// 🔗 Deep Link & URL Handlers for APK
import toast from './toast';

/**
 * Handle deep links in APK
 */
export const initializeDeepLinkHandler = (navigate) => {
    // Check if running in Capacitor
    if (!window.Capacitor?.isNativePlatform()) {
        return;
    }

    // Listen for app URL open
    window.Capacitor.Plugins.App.addListener('appUrlOpen', (data) => {
        handleDeepLink(data.url, navigate);
    });

    console.log('✅ Deep link handler initialized');
};

/**
 * Parse and handle deep link
 */
export const handleDeepLink = (url, navigate) => {
    try {
        console.log('Deep link received:', url);

        // Example: pawscord://chat/123
        const urlObj = new URL(url);
        const path = urlObj.pathname;
        const params = new URLSearchParams(urlObj.search);

        // Route to appropriate screen
        if (path.startsWith('/chat/')) {
            const conversationId = path.split('/chat/')[1];
            navigate(`/chat/${conversationId}`);
        } else if (path.startsWith('/server/')) {
            const serverId = path.split('/server/')[1];
            navigate(`/server/${serverId}`);
        } else if (path.startsWith('/profile/')) {
            const userId = path.split('/profile/')[1];
            navigate(`/profile/${userId}`);
        } else if (path === '/notifications') {
            navigate('/notifications');
        } else {
            navigate(path || '/');
        }

        console.log('✅ Deep link handled:', path);
    } catch (error) {
        console.error('❌ Deep link error:', error);
    }
};

/**
 * Share content from app
 */
export const shareContent = async (title, text, url) => {
    try {
        // Web Share API
        if (navigator.share) {
            await navigator.share({
                title,
                text,
                url
            });
            return true;
        }

        // Fallback: Copy to clipboard
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(url || text);
            toast.success('✅ Link copied to clipboard!');
            return true;
        }

        return false;
    } catch (error) {
        console.error('Share error:', error);
        return false;
    }
};

/**
 * Open external URL
 */
export const openExternalUrl = async (url) => {
    try {
        // Check if in Capacitor
        if (window.Capacitor?.isNativePlatform()) {
            const { Browser } = await import('@capacitor/browser');
            await Browser.open({ url });
        } else {
            window.open(url, '_blank');
        }
        return true;
    } catch (error) {
        console.error('Open URL error:', error);
        return false;
    }
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
            return true;
        }

        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
    } catch (error) {
        console.error('Copy error:', error);
        return false;
    }
};

/**
 * Get app URL for sharing
 */
export const getAppUrl = (path = '') => {
    // Dynamic base URL detection
    const isElectron = window.navigator?.userAgent?.toLowerCase().includes('electron');
    const isPawscordDomain = window.location.hostname.includes('pawscord.com');
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    let baseUrl;
    if (isElectron || isPawscordDomain) {
        baseUrl = 'https://www.pawscord.com';
    } else if (isLocalhost) {
        baseUrl = `${window.location.protocol}//${window.location.host}`;
    } else {
        baseUrl = window.location.origin;
    }

    return `${baseUrl}${path.startsWith('/') ? path : '/' + path}`;
};

/**
 * Get deep link URL
 */
export const getDeepLinkUrl = (path = '') => {
    return `pawscord://${path.startsWith('/') ? path.substring(1) : path}`;
};

/**
 * Check if running as installed PWA
 */
export const isInstalledPWA = () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://');
};

/**
 * Prompt PWA installation
 */
export const promptPWAInstall = () => {
    if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        window.deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA installed');
            }
            window.deferredPrompt = null;
        });
    }
};

// Listen for PWA install prompt
if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        window.deferredPrompt = e;
        console.log('PWA install prompt available');
    });
}

export default {
    initializeDeepLinkHandler,
    handleDeepLink,
    shareContent,
    openExternalUrl,
    copyToClipboard,
    getAppUrl,
    getDeepLinkUrl,
    isInstalledPWA,
    promptPWAInstall
};



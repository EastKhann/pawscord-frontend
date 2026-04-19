/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-useless-escape */
// frontend/src/utils/pwaHelper.js
// 🚀 PWA HELPER UTILITIES
// Service Worker registration, updates, offline support
import toast from './toast';
import i18n from '../i18n';
import logger from '../utils/logger';

/**
 * 🎯 Service Worker Registration
 * Web build'de eski SW/cache kalıntılarını temizle
 * ⚠️ Electron'da file:// protokolü Service Worker desteklemez
 */
export const registerServiceWorker = async () => {
    // Electron'da Service Worker devre dışı (file:// protokolü desteklenmiyor)
    const isElectron =
        typeof window !== 'undefined' &&
        (window.process?.versions?.electron ||
            window.navigator?.userAgent?.toLowerCase().includes('electron') ||
            window.location?.protocol === 'file:');

    if (isElectron) {
        logger.info('⚠️ [PWA] Service Worker disabled in Electron (file:// protocol)');
        return null;
    }

    if ('serviceWorker' in navigator) {
        try {
            // Web'de PWA geçici olarak devre dışı: eski SW ve cache kalıntılarını temizle.
            try {
                const cacheNames = await caches.keys();
                for (const name of cacheNames) {
                    if (
                        name.includes('static-assets-v2') ||
                        name.includes('static-assets-v3') ||
                        name.includes('workbox') ||
                        name.includes('pawscord-v')
                    ) {
                        logger.info('🗑️ Service worker cache siliniyor:', name);
                        await caches.delete(name);
                    }
                }
            } catch (cacheError) {
                logger.warn('⚠️ Static asset cache cleanup failed:', cacheError);
            }

            // Aktif/eski fark etmeksizin tüm service worker kayıtlarını kaldır.
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (const reg of registrations) {
                const scriptURL =
                    reg.active?.scriptURL ||
                    reg.waiting?.scriptURL ||
                    reg.installing?.scriptURL ||
                    reg.scope;
                logger.info('🗑️ Service Worker unregister ediliyor:', scriptURL);
                await reg.unregister();
            }

            return null;
        } catch (error) {
            logger.error('❌ Service Worker error:', error);
            return null;
        }
    }

    return null;
};

/**
 * 🔔 Update Notification
 * Yeni versiyon hazır olduğunda kullanıcıya bildir
 * NOT: Toast notificationi devre dışı - sadece UI'da güncelleme butonu gösteriliyor
 */
const showUpdateNotification = () => {
    // Toast notification gösterme - sadece updateAvailable state kullan
    logger.info('ℹ️ Yeni versiyon mevcut - UI güncelleme butonu aktif');
};

/**
 * 📱 Install Prompt Handler
 * "Add to Home Screen" prompt'unu yönet
 */
let deferredPrompt = null;

export const setupInstallPrompt = () => {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // Install butonunu göster
        const installButton = document.getElementById('install-pwa-button');
        if (installButton) {
            installButton.style.display = 'block';
        }

        logger.info('📱 PWA install prompt ready');
    });

    // Install successful olduğunda
    window.addEventListener('appinstalled', () => {
        logger.info('✅ PWA installed successfully');
        deferredPrompt = null;

        // Analytics event
        if (window.gtag) {
            window.gtag('event', 'pwa_installed', {
                event_category: 'PWA',
                event_label: 'App Installed',
            });
        }
    });
};

/**
 * 🎯 Trigger Install Prompt
 * User butona tıkladığında prompt göster
 */
export const triggerInstallPrompt = async () => {
    if (!deferredPrompt) {
        toast.error(i18n.t('pwa.alreadyInstalled'));
        return false;
    }

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    logger.info(`User response to install prompt: ${outcome}`);

    deferredPrompt = null;
    return outcome === 'accepted';
};

/**
 * 🌐 Online/Offline Status Monitor
 * Network durumunu izle
 */
export const setupNetworkMonitor = (onOnline, onOffline) => {
    const handleOnline = () => {
        logger.info('✅ Network: Online');
        if (onOnline) onOnline();

        // Banner göster
        showNetworkBanner('🟢 Online', 'success');
    };

    const handleOffline = () => {
        logger.info('❌ Network: Offline');
        if (onOffline) onOffline();

        // Banner göster
        showNetworkBanner('🔴 Offline - Bağlantı koptu', 'error');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial status
    if (!navigator.onLine) {
        handleOffline();
    }

    // Cleanup
    return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
    };
};

/**
 * 📊 Network Banner
 * Network durumu for banner göster
 */
const showNetworkBanner = (message, type = 'info') => {
    const existingBanner = document.getElementById('network-banner');
    if (existingBanner) {
        existingBanner.remove();
    }

    const banner = document.createElement('div');
    banner.id = 'network-banner';
    banner.textContent = message;
    banner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 12px;
        text-align: center;
        color: white;
        font-weight: 600;
        z-index: 9999;
        animation: slideDown 0.3s ease;
        background: ${type === 'success' ? '#23a559' : '#f23f42'};
    `;

    document.body.appendChild(banner);

    // Auto remove after 3s
    if (type === 'success') {
        setTimeout(() => {
            banner.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => banner.remove(), 300);
        }, 3000);
    }
};

/**
 * 💾 Cache Management
 * Cache temizleme ve yönetimi
 */
export const clearAllCaches = async () => {
    if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((name) => caches.delete(name)));
        logger.info('🗑️ All caches cleared');
        return true;
    }
    return false;
};

/**
 * 📊 Cache Stats
 * Cache istatistiklerini al
 */
export const getCacheStats = async () => {
    if (!('caches' in window)) return null;

    const cacheNames = await caches.keys();
    const stats = [];

    for (const name of cacheNames) {
        const cache = await caches.open(name);
        const keys = await cache.keys();

        let totalSize = 0;
        for (const request of keys) {
            const response = await cache.match(request);
            if (response) {
                const blob = await response.blob();
                totalSize += blob.size;
            }
        }

        stats.push({
            name,
            items: keys.length,
            size: totalSize,
        });
    }

    return stats;
};

/**
 * 🔔 Push Notification Permission
 * Push notification izni iste
 */
export const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
        logger.warn('Bu tarayıcı notificationleri desteklemiyor');
        return false;
    }

    if (Notification.permission === 'granted') {
        return true;
    }

    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }

    return false;
};

/**
 * 📱 Push Subscription
 * Push notificationi for subscribe ol
 */
export const subscribeToPush = async (registration, vapidPublicKey) => {
    try {
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });

        logger.info('✅ Push subscription successful');
        return subscription;
    } catch (error) {
        logger.error('❌ Push subscription failed:', error);
        return null;
    }
};

/**
 * 🔧 VAPID Key Converter
 */
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

/**
 * 🎯 PWA Installation Check
 * PWA yüklü mü kontrol et
 */
export const isPWAInstalled = () => {
    // Standalone modda çalışıyor mu?
    return (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true
    ); // iOS Safari
};

/**
 * 📱 Device Type Detection
 */
export const getDeviceType = () => {
    const ua = navigator.userAgent;

    if (/(tablet|ipad|playbook|deletek)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }

    if (
        /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Deletek-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        return 'mobile';
    }

    return 'desktop';
};

/**
 * 🎨 CSS Animation Definitions
 */
const addAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }
        
        @keyframes slideUp {
            from { transform: translateY(0); }
            to { transform: translateY(-100%); }
        }
    `;
    document.head.appendChild(style);
};

// Auto-add animations
addAnimations();

// 🎁 Export all
export default {
    registerServiceWorker,
    setupInstallPrompt,
    triggerInstallPrompt,
    setupNetworkMonitor,
    clearAllCaches,
    getCacheStats,
    requestNotificationPermission,
    subscribeToPush,
    isPWAInstalled,
    getDeviceType,
};

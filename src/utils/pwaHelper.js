// frontend/src/utils/pwaHelper.js
// 🚀 PWA HELPER UTILITIES
// Service Worker registration, updates, offline support
import toast from './toast';

/**
 * 🎯 Service Worker Registration
 * SW'yi register et ve update'leri yönet
 * ⚠️ Electron'da file:// protokolü Service Worker desteklemez
 */
export const registerServiceWorker = async () => {
    // Electron'da Service Worker devre dışı (file:// protokolü desteklenmiyor)
    const isElectron = typeof window !== 'undefined' && (
        window.process?.versions?.electron ||
        window.navigator?.userAgent?.toLowerCase().includes('electron') ||
        window.location?.protocol === 'file:'
    );

    if (isElectron) {
        console.info('⚠️ [PWA] Service Worker disabled in Electron (file:// protocol)');
        return null;
    }

    if ('serviceWorker' in navigator) {
        try {
            // 🔥 Eski service-worker.js'yi unregister et (workbox sw.js kullanılıyor)
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (const reg of registrations) {
                if (reg.active && reg.active.scriptURL.includes('service-worker.js')) {
                    console.info('🗑️ Eski service-worker.js unregister ediliyor...');
                    await reg.unregister();
                    // Eski cache'leri temizle
                    const cacheNames = await caches.keys();
                    for (const name of cacheNames) {
                        if (name.includes('pawscord-v')) {
                            console.info('🗑️ Eski cache siliniyor:', name);
                            await caches.delete(name);
                        }
                    }
                }
            }

            // ✅ Workbox sw.js zaten registerSW.js tarafından register ediliyor
            // Burada sadece update kontrolü yapıyoruz
            const registration = await navigator.serviceWorker.getRegistration('/');
            if (registration) {
                console.info('✅ Service Worker active:', registration.scope);

                // Update checker
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.info('🔄 New Service Worker installing...');

                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // Yeni versiyon hazır — otomatik aktive et
                            newWorker.postMessage({ type: 'SKIP_WAITING' });
                            console.info('🔄 Yeni SW aktive ediliyor, sayfa yenilenecek...');
                            window.location.reload();
                        }
                    });
                });

                // Periyodik update kontrolü (her 30 dakikada)
                setInterval(() => {
                    registration.update();
                }, 30 * 60 * 1000);
            }

            return registration;
        } catch (error) {
            console.error('❌ Service Worker error:', error);
            return null;
        }
    }
};

/**
 * 🔔 Update Notification
 * Yeni versiyon hazır olduğunda kullanıcıya bildir
 * NOT: Toast bildirimi devre dışı - sadece UI'da güncelleme butonu gösteriliyor
 */
const showUpdateNotification = () => {
    // Toast bildirim gösterme - sadece updateAvailable state kullan
    console.info('ℹ️ Yeni versiyon mevcut - UI güncelleme butonu aktif');
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

        console.info('📱 PWA install prompt ready');
    });

    // Install başarılı olduğunda
    window.addEventListener('appinstalled', () => {
        console.info('✅ PWA installed successfully');
        deferredPrompt = null;

        // Analytics event
        if (window.gtag) {
            window.gtag('event', 'pwa_installed', {
                event_category: 'PWA',
                event_label: 'App Installed'
            });
        }
    });
};

/**
 * 🎯 Trigger Install Prompt
 * Kullanıcı butona tıkladığında prompt göster
 */
export const triggerInstallPrompt = async () => {
    if (!deferredPrompt) {
        toast.error('❌ PWA zaten yüklü veya tarayıcınız desteklemiyor.');
        return false;
    }

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.info(`User response to install prompt: ${outcome}`);

    deferredPrompt = null;
    return outcome === 'accepted';
};

/**
 * 🌐 Online/Offline Status Monitor
 * Network durumunu izle
 */
export const setupNetworkMonitor = (onOnline, onOffline) => {
    const handleOnline = () => {
        console.info('✅ Network: Online');
        if (onOnline) onOnline();

        // Banner göster
        showNetworkBanner('🟢 Çevrimiçi', 'success');
    };

    const handleOffline = () => {
        console.info('❌ Network: Offline');
        if (onOffline) onOffline();

        // Banner göster
        showNetworkBanner('🔴 Çevrimdışı - Bağlantı koptu', 'error');
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
 * Network durumu için banner göster
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
        background: ${type === 'success' ? '#43b581' : '#ed4245'};
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
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        console.info('🗑️ All caches cleared');
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
            size: totalSize
        });
    }

    return stats;
};

/**
 * 🔔 Push Notification Permission
 * Push bildirim izni iste
 */
export const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
        console.warn('Bu tarayıcı bildirimleri desteklemiyor');
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
 * Push bildirimi için subscribe ol
 */
export const subscribeToPush = async (registration, vapidPublicKey) => {
    try {
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
        });

        console.info('✅ Push subscription successful');
        return subscription;
    } catch (error) {
        console.error('❌ Push subscription failed:', error);
        return null;
    }
};

/**
 * 🔧 VAPID Key Converter
 */
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

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
    return window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true; // iOS Safari
};

/**
 * 📱 Device Type Detection
 */
export const getDeviceType = () => {
    const ua = navigator.userAgent;

    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }

    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
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
    getDeviceType
};



// ⚡ SERVICE WORKER UTILITIES
// Enhanced service worker for better offline support

/**
 * Register service worker with advanced features
 */
export async function registerEnhancedServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none', // Always check for updates
        });


        // Check for updates every 5 minutes
        setInterval(() => {
            registration.update();
        }, 5 * 60 * 1000);

        // Listen for updates
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;

            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New version available
                    showUpdateNotification();
                }
            });
        });

        return registration;
    } catch (error) {
        console.error('Service Worker registration failed:', error);
        return null;
    }
}

/**
 * Show update notification to user
 * NOT: Toast bildirimi devre dışı - sadece UI'da güncelleme butonu gösteriliyor
 */
function showUpdateNotification() {
    // Toast bildirim gösterme - sadece updateAvailable state kullan
}

/**
 * Unregister service worker
 */
export async function unregisterServiceWorker() {
    if (!('serviceWorker' in navigator)) return;

    try {
        const registration = await navigator.serviceWorker.ready;
        await registration.unregister();
    } catch (error) {
        console.error('Service Worker unregistration failed:', error);
    }
}

/**
 * Clear all caches
 */
export async function clearAllCaches() {
    if (!('caches' in window)) return;

    try {
        const cacheNames = await caches.keys();
        await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
        );
    } catch (error) {
        console.error('Failed to clear caches:', error);
    }
}

/**
 * Get cache size
 */
export async function getCacheSize() {
    if (!('caches' in window)) return 0;

    try {
        const cacheNames = await caches.keys();
        let totalSize = 0;

        for (const cacheName of cacheNames) {
            const cache = await caches.open(cacheName);
            const requests = await cache.keys();

            for (const request of requests) {
                const response = await cache.match(request);
                if (response) {
                    const blob = await response.blob();
                    totalSize += blob.size;
                }
            }
        }

        return totalSize;
    } catch (error) {
        console.error('Failed to get cache size:', error);
        return 0;
    }
}

/**
 * Precache critical assets
 */
export async function precacheCriticalAssets(assets = []) {
    if (!('caches' in window)) return;

    const cacheName = 'critical-assets-v1';

    try {
        const cache = await caches.open(cacheName);
        await cache.addAll(assets);
    } catch (error) {
        console.error('Failed to precache assets:', error);
    }
}

/**
 * Check if online
 */
export function isOnline() {
    return navigator.onLine;
}

/**
 * Setup offline detection
 */
export function setupOfflineDetection(onOnline, onOffline) {
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
        window.removeEventListener('online', onOnline);
        window.removeEventListener('offline', onOffline);
    };
}

/**
 * Background sync for offline actions
 */
export async function registerBackgroundSync(tag) {
    if (!('serviceWorker' in navigator) || !('sync' in ServiceWorkerRegistration.prototype)) {
        return false;
    }

    try {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register(tag);
        return true;
    } catch (error) {
        console.error('Background sync failed:', error);
        return false;
    }
}

/**
 * Request persistent storage
 */
export async function requestPersistentStorage() {
    if (!navigator.storage || !navigator.storage.persist) {
        return false;
    }

    try {
        const isPersisted = await navigator.storage.persisted();

        if (!isPersisted) {
            const granted = await navigator.storage.persist();
            return granted;
        }

        return true;
    } catch (error) {
        console.error('Failed to request persistent storage:', error);
        return false;
    }
}

/**
 * Get storage estimate
 */
export async function getStorageEstimate() {
    if (!navigator.storage || !navigator.storage.estimate) {
        return null;
    }

    try {
        const estimate = await navigator.storage.estimate();
        return {
            usage: estimate.usage,
            quota: estimate.quota,
            usagePercent: (estimate.usage / estimate.quota) * 100,
        };
    } catch (error) {
        console.error('Failed to get storage estimate:', error);
        return null;
    }
}

export default {
    registerEnhancedServiceWorker,
    unregisterServiceWorker,
    clearAllCaches,
    getCacheSize,
    precacheCriticalAssets,
    isOnline,
    setupOfflineDetection,
    registerBackgroundSync,
    requestPersistentStorage,
    getStorageEstimate,
};

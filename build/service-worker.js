// frontend/public/service-worker.js
/**
 * ⚠️ DEPRECATED: Bu eski service worker.
 * Sadece kendini temizler ve unregister eder.
 * ❌ client.navigate() KALDIRILDI — sonsuz reload döngüsü yapıyordu!
 */

// Install → hemen aktive ol
self.addEventListener('install', () => {
    console.log('🔥 [OLD-SW] Self-destructing service-worker.js installing...');
    self.skipWaiting();
});

// Activate → tüm cache'leri sil, kendini unregister et (RELOAD YOK!)
self.addEventListener('activate', event => {
    console.log('🔥 [OLD-SW] Nuking all caches and unregistering...');
    event.waitUntil(
        caches.keys()
            .then(names => Promise.all(names.map(name => {
                console.log('🗑️ Cache silindi:', name);
                return caches.delete(name);
            })))
            .then(() => self.clients.claim())
            .then(() => self.registration.unregister())
            .then(() => {
                console.log('✅ [OLD-SW] Unregistered successfully. No reload.');
            })
    );
});

// ❌ Fetch handler KALDIRILDI — deprecated SW artık request intercept etmiyor
// Tüm caching VitePWA Workbox tarafından yönetiliyor

// ✅ Deprecated SW — sadece kendini temizler, başka bir şey yapmaz

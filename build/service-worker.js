// frontend/public/service-worker.js
/**
 * 🔧 Service Worker - PWA Cache Stratejisi (OPTIMIZED)
 * Aggressive caching for performance
 */

const CACHE_NAME = 'pawscord-v1.1.133-perf-webp';
const CRITICAL_CACHE = [
    '/',
    '/index.html',
    '/offline.html',
    '/logo192.webp',
    '/logo512.webp',
    '/logo.webp'
];

// Install event - cache critical files ONLY
self.addEventListener('install', event => {
    console.log('🔧 SW installing (v1.1.133)');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Critical cache opened');
                return cache.addAll(CRITICAL_CACHE);
            })
            .then(() => self.skipWaiting()) // Activate immediately
    );
});

// Activate event - clean old caches aggressively
self.addEventListener('activate', event => {
    console.log('✅ SW activating...');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - OPTIMIZED Strategy
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // API requests: Network First (fresh data)
    if (request.url.includes('/api/') || request.url.includes('/ws/')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    // Only cache GET requests with successful responses
                    if (response && response.status === 200 && request.method === 'GET') {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => caches.match(request).then(cached => cached || new Response('{"error":"Offline"}', {
                    headers: { 'Content-Type': 'application/json' }
                })))
        );
        return;
    }

    // JS/CSS chunks: Cache First with Network Fallback (AGGRESSIVE)
    if (url.pathname.includes('/static/')) {
        event.respondWith(
            caches.match(request)
                .then(cached => {
                    if (cached) {
                        // Serve from cache immediately, update in background
                        fetch(request).then(response => {
                            if (response && response.status === 200) {
                                caches.open(CACHE_NAME).then(cache => {
                                    cache.put(request, response);
                                });
                            }
                        }).catch(() => { }); // Silent fail
                        return cached;
                    }

                    // Not in cache, fetch and cache
                    return fetch(request).then(response => {
                        if (response && response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(request, responseClone);
                            });
                        }
                        return response;
                    });
                })
        );
        return;
    }

    // HTML pages: Network First
    event.respondWith(
        fetch(request)
            .catch(() => caches.match(request).then(cached => cached || caches.match('/offline.html')))
    );
});

// Background Sync için (offline mesaj gönderimi)
self.addEventListener('sync', event => {
    if (event.tag === 'sync-messages') {
        console.log('🔄 Background sync başladı');
        event.waitUntil(syncMessages());
    }
});

async function syncMessages() {
    // IndexedDB'den offline mesajları al ve gönder
    try {
        const db = await openDatabase();
        const messages = await getPendingMessages(db);

        for (const message of messages) {
            await fetch('/api/messages/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(message)
            });

            await removePendingMessage(db, message.id);
        }

        console.log('✅ Offline mesajlar gönderildi');
    } catch (error) {
        console.error('❌ Sync hatası:', error);
    }
}

// Push notification handler
self.addEventListener('push', event => {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/logo192.png',
        badge: '/logo192.png',
        vibrate: [200, 100, 200],
        data: data.data
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();

    event.waitUntil(
        clients.openWindow(event.notification.data.url || '/')
    );
});

// Helper functions
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('PawscordOfflineDB', 1);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function getPendingMessages(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['pendingActions'], 'readonly');
        const store = transaction.objectStore('pendingActions');
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function removePendingMessage(db, id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['pendingActions'], 'readwrite');
        const store = transaction.objectStore('pendingActions');
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

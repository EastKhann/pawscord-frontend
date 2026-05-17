// public/firebase-messaging-sw.js
// Firebase Cloud Messaging Service Worker

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAVp0szJG8_oGU5BMPwSrX44AOsQkJb0E",
    authDomain: "pawscord-app.firebaseapp.com",
    projectId: "pawscord-app",
    storageBucket: "pawscord-app.firebasestorage.app",
    messagingSenderId: "563643916260",
    appId: "1:563643916260:web:d605097a5fbb9904daf1f1",
    measurementId: "G-HYYVH6MFWX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);

    const notificationTitle = payload.notification?.title || 'New Message';
    const notificationOptions = {
        body: payload.notification?.body || 'You have a new notification',
        icon: payload.notification?.icon || '/logo192.png',
        badge: '/badge-72x72.png',
        data: payload.data,
        vibrate: [200, 100, 200],
        tag: payload.data?.tag || 'notification',
        requireInteraction: false
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click (iOS + Android deep link routing)
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const data = event.notification.data || {};

    // Sanitize ID-like values (alphanumeric/dash/underscore only — prevent path injection)
    const safeId = (v) => (typeof v === 'string' && /^[\w-]{1,64}$/.test(v) ? v : null);
    // Validate URL: only relative paths starting with '/', no protocol, no '//' (protocol-relative)
    const safeUrl = (v) => (typeof v === 'string' && /^\/[^/]/.test(v) && v.length < 256 ? v : null);

    let hashRoute = '/';
    const roomId = safeId(data.roomId);
    const convId = safeId(data.conversationId);
    const url = safeUrl(data.url);
    if (roomId) hashRoute = `/room/${roomId}`;
    else if (convId) hashRoute = `/dm/${convId}`;
    else if (url) hashRoute = url;

    const targetUrl = self.registration.scope.replace(/\/$/, '') + '/#' + hashRoute;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // If app already open, focus and navigate
            for (const client of clientList) {
                if ('focus' in client) {
                    // Store pending route so the app can pick it up on focus
                    client.postMessage({ type: 'NOTIFICATION_NAVIGATE', route: hashRoute });
                    return client.focus();
                }
            }

            // App not open — store pending route in cache for app to read on load
            // (localStorage not available in SW, use Cache API as bridge)
            return caches.open('pawscord-sw-bridge').then((cache) => {
                const pendingRoute = new Response(JSON.stringify({ route: hashRoute, ts: Date.now() }));
                return cache.put('/sw-pending-route', pendingRoute);
            }).then(() => {
                if (clients.openWindow) return clients.openWindow(targetUrl);
            });
        })
    );
});

// Handle push event
self.addEventListener('push', (event) => {
    console.log('Push event received:', event);

    if (!event.data) {
        return;
    }

    let data;
    try {
        data = event.data.json();
    } catch (error) {
        data = {
            title: 'New Notification',
            body: event.data.text()
        };
    }

    const title = data.title || 'PAWSCORD';
    const options = {
        body: data.body || 'You have a new notification',
        icon: data.icon || '/logo192.png',
        badge: '/badge-72x72.png',
        data: data,
        vibrate: [200, 100, 200],
        tag: data.tag || 'notification'
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

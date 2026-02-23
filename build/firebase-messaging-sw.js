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

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event);

    event.notification.close();

    const urlToOpen = event.notification.data?.url || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // Check if app is already open
            for (const client of clientList) {
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }

            // Open new window
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
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

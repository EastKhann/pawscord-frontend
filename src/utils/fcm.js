// frontend/src/utils/fcm.js
// 🔔 Firebase Cloud Messaging (FCM) Push Notifications Setup

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "pawscord.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "pawscord",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "pawscord.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
};

// VAPID key for web push
const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY || "YOUR_VAPID_KEY";

let firebaseApp;
let messaging;

// Initialize Firebase
export const initializeFCM = () => {
    try {
        if (!firebaseApp) {
            firebaseApp = initializeApp(firebaseConfig);
        }

        if ('serviceWorker' in navigator && 'PushManager' in window) {
            messaging = getMessaging(firebaseApp);
            console.log('✅ FCM initialized successfully');
            return true;
        } else {
            console.warn('⚠️ Push notifications not supported in this browser');
            return false;
        }
    } catch (error) {
        console.error('❌ FCM initialization failed:', error);
        return false;
    }
};

// Request notification permission and get FCM token
export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
            console.log('✅ Notification permission granted');

            // Get FCM token
            const token = await getToken(messaging, { vapidKey: VAPID_KEY });

            if (token) {
                console.log('🔑 FCM Token:', token);

                // Send token to backend
                await registerTokenWithBackend(token);

                return token;
            } else {
                console.warn('⚠️ No FCM token available');
                return null;
            }
        } else {
            console.warn('⚠️ Notification permission denied');
            return null;
        }
    } catch (error) {
        console.error('❌ Error getting notification permission:', error);
        return null;
    }
};

// Register FCM token with backend
const registerTokenWithBackend = async (token) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fcm/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({ fcm_token: token }),
        });

        if (response.ok) {
            console.log('✅ FCM token registered with backend');
            localStorage.setItem('fcm_token', token);
        } else {
            console.error('❌ Failed to register FCM token with backend');
        }
    } catch (error) {
        console.error('❌ Error registering FCM token:', error);
    }
};

// Listen for foreground messages
export const onMessageListener = (callback) => {
    if (!messaging) {
        console.warn('⚠️ FCM not initialized');
        return;
    }

    onMessage(messaging, (payload) => {
        console.log('📩 Foreground message received:', payload);

        // Show browser notification
        if (Notification.permission === 'granted') {
            const { title, body, icon } = payload.notification || {};

            new Notification(title || 'New Message', {
                body: body || 'You have a new notification',
                icon: icon || '/logo192.png',
                badge: '/logo192.png',
                tag: payload.data?.messageId || 'notification',
                requireInteraction: false,
            });
        }

        // Call custom callback
        if (callback) {
            callback(payload);
        }
    });
};

// Unregister FCM token (on logout)
export const unregisterFCMToken = async () => {
    try {
        const token = localStorage.getItem('fcm_token');

        if (token) {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fcm/unregister/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify({ fcm_token: token }),
            });

            if (response.ok) {
                console.log('✅ FCM token unregistered');
                localStorage.removeItem('fcm_token');
            }
        }
    } catch (error) {
        console.error('❌ Error unregistering FCM token:', error);
    }
};

// Check if notifications are supported
export const areNotificationsSupported = () => {
    return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
};

// Get current notification permission
export const getNotificationPermission = () => {
    if (!('Notification' in window)) return 'unsupported';
    return Notification.permission;
};

export default {
    initializeFCM,
    requestNotificationPermission,
    onMessageListener,
    unregisterFCMToken,
    areNotificationsSupported,
    getNotificationPermission,
};



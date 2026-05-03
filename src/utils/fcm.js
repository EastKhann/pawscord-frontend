// frontend/src/utils/fcm.js
// 🔔 Firebase Cloud Messaging (FCM) Push Notifications Setup

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import logger from '../utils/logger';

// Firebase configuration - env variables REQUIRED, no unsafe fallbacks
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'pawscord.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'pawscord',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'pawscord.appspot.com',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// VAPID key for web push
const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

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
            return true;
        } else {
            logger.warn('⚠️ Push notifications not supported in this browser');
            return false;
        }
    } catch (error) {
        logger.error('❌ FCM initialization failed:', error);
        return false;
    }
};

// Request notification permission and get FCM token
export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
            // Get FCM token
            const token = await getToken(messaging, { vapidKey: VAPID_KEY });

            if (token) {
                // Send token to backend
                await registerTokenWithBackend(token);

                return token;
            } else {
                logger.warn('⚠️ No FCM token available');
                return null;
            }
        } else {
            logger.warn('⚠️ Notification permission denied');
            return null;
        }
    } catch (error) {
        logger.error('❌ Error getting notification permission:', error);
        return null;
    }
};

// Register FCM token with backend
const registerTokenWithBackend = async (token) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/notifications/fcm/register/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ fcm_token: token }),
            }
        );

        if (response.ok) {
            localStorage.setItem('fcm_token', token);
        } else {
            logger.error('❌ Failed to register FCM token with backend');
        }
    } catch (error) {
        logger.error('❌ Error registering FCM token:', error);
    }
};

// Listen for foreground messages
export const onMessageListener = (callback) => {
    if (!messaging) {
        logger.warn('⚠️ FCM not initialized');
        return;
    }

    onMessage(messaging, (payload) => {
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
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/notifications/fcm/unregister/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getToken()}`,
                    },
                    body: JSON.stringify({ fcm_token: token }),
                }
            );

            if (response.ok) {
                localStorage.removeItem('fcm_token');
            }
        }
    } catch (error) {
        logger.error('❌ Error unregistering FCM token:', error);
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

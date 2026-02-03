// frontend/src/utils/pushNotifications.js

/**
 * 🔔 Push Notifications Manager
 * APK için FCM entegrasyonu
 */

class PushNotificationManager {
    constructor() {
        this.isSupported = 'PushManager' in window;
        this.permission = 'default';
        this.deviceToken = null;
        this.listeners = new Map();
    }

    /**
     * Initialize push notifications
     */
    async init(apiBaseUrl, fetchWithAuth) {
        this.apiBaseUrl = apiBaseUrl;
        this.fetchWithAuth = fetchWithAuth;

        // Check if running in Capacitor (APK)
        const isCapacitor = window.Capacitor?.isNativePlatform();

        if (isCapacitor) {
            await this.initCapacitor();
        } else {
            await this.initWeb();
        }
    }

    /**
     * Capacitor (APK) initialization
     */
    async initCapacitor() {
        try {
            const { PushNotifications } = await import('@capacitor/push-notifications');

            // Request permission
            const permResult = await PushNotifications.requestPermissions();

            if (permResult.receive === 'granted') {
                this.permission = 'granted';

                // Register with FCM
                await PushNotifications.register();

                // Listen for registration
                await PushNotifications.addListener('registration', async (token) => {
                    if (import.meta.env.DEV) console.log('🔔 [Push] Token obtained (hidden for security)');
                    this.deviceToken = token.value;
                    await this.registerDevice(token.value);
                });

                // Listen for registration errors
                await PushNotifications.addListener('registrationError', (error) => {
                    console.error('🔔 [Push] Registration error:', error);
                });

                // Listen for push notifications
                await PushNotifications.addListener('pushNotificationReceived', (notification) => {
                    console.log('🔔 [Push] Notification received:', notification);
                    this.handleNotification(notification);
                });

                // Listen for notification actions
                await PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
                    console.log('🔔 [Push] Action performed:', action);
                    this.handleNotificationAction(action);
                });

                console.log('✅ [Push] Capacitor notifications initialized');
            }
        } catch (error) {
            console.error('❌ [Push] Capacitor init failed:', error);
        }
    }

    /**
     * Web push notifications initialization
     */
    async initWeb() {
        if (!this.isSupported) {
            console.warn('⚠️ [Push] Web push not supported');
            return;
        }

        // Request permission
        const permission = await Notification.requestPermission();
        this.permission = permission;

        if (permission === 'granted') {
            console.log('✅ [Push] Web notifications enabled');
        }
    }

    /**
     * Register device token with backend
     */
    async registerDevice(token) {
        try {
            const response = await this.fetchWithAuth(`${this.apiBaseUrl}/devices/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    registration_id: token,
                    type: 'android', // or 'ios', 'web'
                    active: true
                })
            });

            if (response.ok) {
                console.log('✅ [Push] Device registered');
            }
        } catch (error) {
            console.error('❌ [Push] Device registration failed:', error);
        }
    }

    /**
     * Handle incoming notification
     */
    handleNotification(notification) {
        const { title, body, data } = notification;

        // Trigger listeners
        this.listeners.forEach((callback) => {
            callback({ type: 'notification', title, body, data });
        });

        // Show visual notification (if app is in background)
        if (document.hidden && this.permission === 'granted') {
            new Notification(title, {
                body,
                icon: '/logo192.png',
                badge: '/badge.png',
                tag: data?.messageId || 'default',
                data
            });
        }
    }

    /**
     * Handle notification action (user clicked)
     */
    handleNotificationAction(action) {
        const { notification, actionId } = action;

        this.listeners.forEach((callback) => {
            callback({
                type: 'action',
                actionId,
                notification
            });
        });

        // Navigate to relevant page
        if (notification.data?.roomId) {
            window.location.href = `/#/room/${notification.data.roomId}`;
        } else if (notification.data?.conversationId) {
            window.location.href = `/#/dm/${notification.data.conversationId}`;
        }
    }

    /**
     * Subscribe to notification events
     */
    on(eventType, callback) {
        const id = Math.random().toString(36).substr(2, 9);
        this.listeners.set(id, callback);
        return () => this.listeners.delete(id);
    }

    /**
     * Send notification (for testing)
     */
    async sendTestNotification() {
        try {
            await this.fetchWithAuth(`${this.apiBaseUrl}/push/test/`, {
                method: 'POST'
            });
            console.log('✅ [Push] Test notification sent');
        } catch (error) {
            console.error('❌ [Push] Test failed:', error);
        }
    }

    /**
     * Unregister device
     */
    async unregister() {
        if (this.deviceToken) {
            try {
                await this.fetchWithAuth(`${this.apiBaseUrl}/devices/${this.deviceToken}/`, {
                    method: 'DELETE'
                });
                console.log('✅ [Push] Device unregistered');
            } catch (error) {
                console.error('❌ [Push] Unregister failed:', error);
            }
        }
    }
}

export const pushNotificationManager = new PushNotificationManager();

export default pushNotificationManager;



// frontend/src/utils/notifications.js
/**
 * Desktop Push Notifications System
 * Browser Notification API wrapper
 */

class NotificationManager {
    constructor() {
        this.permission = Notification.permission;
        this.enabled = false;
    }

    /**
     * Request notification permission from user
     */
    async requestPermission() {
        if (!('Notification' in window)) {
            console.warn('This browser does not support notifications');
            return false;
        }

        if (this.permission === 'granted') {
            this.enabled = true;
            return true;
        }

        if (this.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            this.permission = permission;
            this.enabled = permission === 'granted';
            return this.enabled;
        }

        return false;
    }

    /**
     * Show a notification
     */
    show(title, options = {}) {
        if (!this.enabled || this.permission !== 'granted') {
            console.warn('Notifications not enabled');
            return null;
        }

        const notification = new Notification(title, {
            icon: options.icon || '/logo192.png',
            badge: '/logo192.png',
            body: options.body || '',
            tag: options.tag || `notif-${Date.now()}`,
            requireInteraction: options.requireInteraction || false,
            silent: options.silent || false,
            data: options.data || {},
            ...options
        });

        // Auto-close after 5 seconds if not requireInteraction
        if (!options.requireInteraction) {
            setTimeout(() => notification.close(), 5000);
        }

        // Handle click
        notification.onclick = () => {
            window.focus();
            if (options.onClick) {
                options.onClick(notification.data);
            }
            notification.close();
        };

        return notification;
    }

    /**
     * Show new message notification
     */
    showMessage(username, content, avatar, roomName, messageId) {
        return this.show(`${username} • ${roomName}`, {
            body: content,
            icon: avatar,
            tag: `message-${messageId}`,
            data: { type: 'message', messageId, username, roomName },
            requireInteraction: false
        });
    }

    /**
     * Show mention notification
     */
    showMention(username, content, avatar, roomName, messageId) {
        return this.show(`@Mention - ${username}`, {
            body: content,
            icon: avatar,
            tag: `mention-${messageId}`,
            data: { type: 'mention', messageId, username, roomName },
            requireInteraction: true,
            silent: false
        });
    }

    /**
     * Show DM notification
     */
    showDM(username, content, avatar, messageId) {
        return this.show(`💬 ${username}`, {
            body: content,
            icon: avatar,
            tag: `dm-${username}`,
            data: { type: 'dm', messageId, username },
            requireInteraction: true
        });
    }

    /**
     * Show voice call notification
     */
    showVoiceCall(username, avatar, roomName) {
        return this.show(`📞 Voice Call`, {
            body: `${username} is calling in ${roomName}`,
            icon: avatar,
            tag: `call-${roomName}`,
            data: { type: 'call', username, roomName },
            requireInteraction: true,
            silent: false
        });
    }

    /**
     * Show event reminder
     */
    showEventReminder(eventTitle, startsIn) {
        return this.show(`📅 Event Reminder`, {
            body: `"${eventTitle}" starts in ${startsIn}`,
            tag: `event-${eventTitle}`,
            data: { type: 'event', eventTitle },
            requireInteraction: true
        });
    }

    /**
     * Check if notifications are supported
     */
    static isSupported() {
        return 'Notification' in window;
    }

    /**
     * Check if permission is granted
     */
    static isGranted() {
        return Notification.permission === 'granted';
    }
}

// Singleton instance
const notificationManager = new NotificationManager();

export default notificationManager;




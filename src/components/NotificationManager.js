// frontend/src/components/NotificationManager.js

/**
 * 🔔 Desktop Notification Manager
 * Web Notification API + Service Worker entegrasyonu
 */

import { useState, useEffect, useCallback } from 'react';

class NotificationManager {
    constructor() {
        this.permission = 'default';
        this.isSupported = 'Notification' in window;
        this.settings = this.loadSettings();
    }

    /**
     * Load settings from localStorage
     */
    loadSettings() {
        try {
            const saved = localStorage.getItem('notification-settings');
            return saved ? JSON.parse(saved) : {
                enabled: true,
                sound: true,
                desktop: true,
                mentionOnly: false,
                dmOnly: false,
                muteUntil: null
            };
        } catch (error) {
            console.error('Failed to load notification settings:', error);
            return {
                enabled: true,
                sound: true,
                desktop: true,
                mentionOnly: false,
                dmOnly: false,
                muteUntil: null
            };
        }
    }

    /**
     * Save settings to localStorage
     */
    saveSettings(settings) {
        this.settings = { ...this.settings, ...settings };
        localStorage.setItem('notification-settings', JSON.stringify(this.settings));
    }

    /**
     * Request permission
     */
    async requestPermission() {
        if (!this.isSupported) {
            console.warn('Notifications not supported');
            return false;
        }

        try {
            const permission = await Notification.requestPermission();
            this.permission = permission;
            return permission === 'granted';
        } catch (error) {
            console.error('Failed to request notification permission:', error);
            return false;
        }
    }

    /**
     * Check if notifications are enabled
     */
    isEnabled() {
        // Check if muted
        if (this.settings.muteUntil) {
            const now = Date.now();
            if (now < this.settings.muteUntil) {
                return false; // Still muted
            } else {
                // Unmute
                this.saveSettings({ muteUntil: null });
            }
        }

        return this.settings.enabled &&
            this.permission === 'granted' &&
            this.isSupported;
    }

    /**
     * Show notification
     */
    async show(options = {}) {
        const {
            title = 'PAWSCORD',
            body = '',
            icon = '/logo192.png',
            tag = null,
            data = {},
            onClick = null,
            isDM = false,
            isMention = false
        } = options;

        // Check settings
        if (!this.isEnabled()) return;

        // Filter by settings
        if (this.settings.dmOnly && !isDM) return;
        if (this.settings.mentionOnly && !isMention) return;

        try {
            // Show desktop notification
            if (this.settings.desktop) {
                const notification = new Notification(title, {
                    body,
                    icon,
                    tag,
                    data,
                    badge: '/logo192.png',
                    requireInteraction: false,
                    silent: !this.settings.sound
                });

                // Handle click
                if (onClick) {
                    notification.onclick = (event) => {
                        event.preventDefault();
                        window.focus();
                        onClick(event);
                        notification.close();
                    };
                }

                // Auto close after 5 seconds
                setTimeout(() => notification.close(), 5000);
            }

            // Play sound
            if (this.settings.sound && !this.settings.dmOnly) {
                this.playSound();
            }

        } catch (error) {
            console.error('Failed to show notification:', error);
        }
    }

    /**
     * Play notification sound
     */
    playSound() {
        try {
            const audio = new Audio('/sounds/notification.mp3');
            audio.volume = 0.3;
        } catch (error) {
            console.error('Failed to play sound:', error);
        }
    }

    /**
     * Show new message notification
     */
    showMessage({ username, content, avatar, channelName, isDM = false, isMention = false, onClick }) {
        const title = isDM ? `💬 ${username}` : `#${channelName}`;
        const body = `${username}: ${content.substring(0, 100)}${content.length > 100 ? '...' : ''}`;

        this.show({
            title,
            body,
            icon: avatar || '/logo192.png',
            tag: `message-${Date.now()}`,
            data: { type: 'message', username, channelName },
            isDM,
            isMention,
            onClick
        });
    }

    /**
     * Show friend request notification
     */
    showFriendRequest({ username, avatar, onClick }) {
        this.show({
            title: '👥 Yeni Arkadaşlık İsteği',
            body: `${username} sana arkadaşlık isteği gönderdi`,
            icon: avatar || '/logo192.png',
            tag: 'friend-request',
            onClick
        });
    }

    /**
     * Show mention notification
     */
    showMention({ username, content, channelName, onClick }) {
        this.show({
            title: `@mention #${channelName}`,
            body: `${username} seni etiketledi: ${content.substring(0, 80)}`,
            tag: `mention-${Date.now()}`,
            isMention: true,
            onClick
        });
    }

    /**
     * Show call notification
     */
    showCall({ username, isVideo = false, onClick }) {
        this.show({
            title: `📞 Gelen ${isVideo ? 'Görüntülü ' : ''}Arama`,
            body: `${username} seni arıyor...`,
            tag: 'call',
            requireInteraction: true,
            onClick
        });
    }

    /**
     * Mute notifications for duration
     */
    mute(duration) {
        const muteUntil = Date.now() + duration;
        this.saveSettings({ muteUntil });
    }

    /**
     * Unmute notifications
     */
    unmute() {
        this.saveSettings({ muteUntil: null });
    }

    /**
     * Get unread badge count
     */
    getUnreadCount() {
        try {
            const count = parseInt(localStorage.getItem('unread-count') || '0');
            return count;
        } catch {
            return 0;
        }
    }

    /**
     * Update unread badge count
     */
    updateUnreadCount(count) {
        localStorage.setItem('unread-count', count.toString());

        // Update title
        if (count > 0) {
            document.title = `(${count}) PAWSCORD`;
        } else {
            document.title = 'PAWSCORD';
        }

        // Update favicon badge (if supported)
        this.updateFaviconBadge(count);
    }

    /**
     * Update favicon badge (canvas drawing)
     */
    updateFaviconBadge(count) {
        try {
            const favicon = document.querySelector("link[rel='icon']");
            if (!favicon) return;

            if (count === 0) {
                favicon.href = '/favicon.ico';
                return;
            }

            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');

            // Draw badge
            ctx.fillStyle = '#f04747';
            ctx.beginPath();
            ctx.arc(24, 8, 8, 0, 2 * Math.PI);
            ctx.fill();

            // Draw count
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(count > 9 ? '9+' : count.toString(), 24, 8);

            favicon.href = canvas.toDataURL('image/png');
        } catch (error) {
            console.error('Failed to update favicon badge:', error);
        }
    }
}

// Global instance
export const notificationManager = new NotificationManager();

/**
 * React Hook - Notification Manager
 */
export const useNotifications = () => {
    const [permission, setPermission] = useState(notificationManager.permission);
    const [settings, setSettings] = useState(notificationManager.settings);
    const [unreadCount, setUnreadCount] = useState(notificationManager.getUnreadCount());

    useEffect(() => {
        // Check permission on mount
        if ('Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = useCallback(async () => {
        const granted = await notificationManager.requestPermission();
        setPermission(notificationManager.permission);
        return granted;
    }, []);

    const updateSettings = useCallback((newSettings) => {
        notificationManager.saveSettings(newSettings);
        setSettings(notificationManager.settings);
    }, []);

    const incrementUnread = useCallback(() => {
        const newCount = unreadCount + 1;
        setUnreadCount(newCount);
        notificationManager.updateUnreadCount(newCount);
    }, [unreadCount]);

    const clearUnread = useCallback(() => {
        setUnreadCount(0);
        notificationManager.updateUnreadCount(0);
    }, []);

    const mute = useCallback((duration = 60 * 60 * 1000) => { // Default 1 hour
        notificationManager.mute(duration);
        setSettings(notificationManager.settings);
    }, []);

    const unmute = useCallback(() => {
        notificationManager.unmute();
        setSettings(notificationManager.settings);
    }, []);

    return {
        permission,
        settings,
        unreadCount,
        isSupported: notificationManager.isSupported,
        isEnabled: notificationManager.isEnabled(),
        requestPermission,
        updateSettings,
        showMessage: notificationManager.showMessage.bind(notificationManager),
        showFriendRequest: notificationManager.showFriendRequest.bind(notificationManager),
        showMention: notificationManager.showMention.bind(notificationManager),
        showCall: notificationManager.showCall.bind(notificationManager),
        incrementUnread,
        clearUnread,
        mute,
        unmute
    };
};

/**
 * React Component - Notification Settings Panel
 */
export const NotificationSettings = ({ settings, onUpdate }) => {
    return (
        <div style={styles.container}>
            <h3 style={styles.title}>🔔 Bildirim Ayarları</h3>

            <label style={styles.label}>
                <input
                    type="checkbox"
                    checked={settings.enabled}
                    onChange={(e) => onUpdate({ ...settings, enabled: e.target.checked })}
                />
                <span>Bildirimleri Etkinleştir</span>
            </label>

            <label style={styles.label}>
                <input
                    type="checkbox"
                    checked={settings.sound}
                    onChange={(e) => onUpdate({ ...settings, sound: e.target.checked })}
                />
                <span>Bildirim Sesi</span>
            </label>

            <label style={styles.label}>
                <input
                    type="checkbox"
                    checked={settings.desktop}
                    onChange={(e) => onUpdate({ ...settings, desktop: e.target.checked })}
                />
                <span>Masaüstü Bildirimleri</span>
            </label>

            <label style={styles.label}>
                <input
                    type="checkbox"
                    checked={settings.mentionOnly}
                    onChange={(e) => onUpdate({ ...settings, mentionOnly: e.target.checked })}
                />
                <span>Sadece Etiketlemeler</span>
            </label>

            <label style={styles.label}>
                <input
                    type="checkbox"
                    checked={settings.dmOnly}
                    onChange={(e) => onUpdate({ ...settings, dmOnly: e.target.checked })}
                />
                <span>Sadece DM'ler</span>
            </label>

            <div style={styles.muteButtons}>
                <button onClick={() => onUpdate({ ...settings, muteUntil: Date.now() + 15 * 60 * 1000 })} style={styles.muteButton}>
                    15 Dakika Sustur
                </button>
                <button onClick={() => onUpdate({ ...settings, muteUntil: Date.now() + 60 * 60 * 1000 })} style={styles.muteButton}>
                    1 Saat Sustur
                </button>
                <button onClick={() => onUpdate({ ...settings, muteUntil: Date.now() + 8 * 60 * 60 * 1000 })} style={styles.muteButton}>
                    8 Saat Sustur
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        color: '#fff'
    },
    title: {
        marginBottom: '16px',
        fontSize: '18px',
        fontWeight: 'bold'
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    muteButtons: {
        display: 'flex',
        gap: '8px',
        marginTop: '16px',
        flexWrap: 'wrap'
    },
    muteButton: {
        padding: '8px 12px',
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px'
    }
};

export default React.memo(NotificationManager);



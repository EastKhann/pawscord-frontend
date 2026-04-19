// frontend/src/hooks/usePushNotifications.ts
// 🔔 Push Notifications Hook

import { useEffect, useRef, useCallback } from 'react';

const NOTIF_STORAGE_KEY = 'pawscord_notif_asked';
const NOTIF_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

interface ShowNotificationOptions {
    title?: string;
    body?: string;
    icon?: string;
    tag?: string;
    data?: Record<string, unknown>;
}

interface NotifyMessageOptions {
    senderUsername?: string;
    roomName?: string;
    content?: string;
    roomSlug?: string;
    dmId?: string | number;
}

interface PushNotificationsReturn {
    showNotification: (opts?: ShowNotificationOptions) => void;
    notifyMessage: (opts?: NotifyMessageOptions) => void;
}

export default function usePushNotifications(
    isAuthenticated: boolean,
    username: string
): PushNotificationsReturn {
    const permissionRef = useRef<NotificationPermission>(
        typeof Notification !== 'undefined' ? Notification.permission : 'default'
    );

    // Request permission once per ~30 days
    useEffect(() => {
        if (!isAuthenticated) return;
        if (typeof Notification === 'undefined') return;
        if (Notification.permission === 'granted' || Notification.permission === 'denied') return;

        const lastAsked = parseInt(localStorage.getItem(NOTIF_STORAGE_KEY) || '0', 10);
        if (Date.now() - lastAsked < NOTIF_COOLDOWN_MS) return;

        const timer = setTimeout(() => {
            Notification.requestPermission()
                .then((permission) => {
                    permissionRef.current = permission;
                    localStorage.setItem(NOTIF_STORAGE_KEY, Date.now().toString());
                })
                .catch(() => {});
        }, 5000);

        return () => clearTimeout(timer);
    }, [isAuthenticated]);

    const showNotification = useCallback(
        ({ title, body, icon = '/logo192.webp', tag, data }: ShowNotificationOptions = {}) => {
            if (typeof Notification === 'undefined') return;
            if (Notification.permission !== 'granted') return;
            if (document.visibilityState === 'visible' && document.hasFocus()) return;

            try {
                const notif = new Notification(title || 'PawsCord', {
                    body: body || '',
                    icon,
                    badge: '/logo192.webp',
                    tag: tag || 'pawscord-message',
                    data,
                    silent: false,
                });

                notif.onclick = () => {
                    window.focus();
                    notif.close();
                    if ((data as { url?: string })?.url) {
                        window.location.pathname = (data as { url: string }).url;
                    }
                };

                setTimeout(() => notif.close(), 8000);
            } catch {
                // Firefox private mode throws on Notification constructor
            }
        },
        []
    );

    const notifyMessage = useCallback(
        ({ senderUsername, roomName, content, roomSlug, dmId }: NotifyMessageOptions = {}) => {
            if (senderUsername === username) return;
            const title = roomName ? `#${roomName}` : `@${senderUsername}`;
            const body = `${senderUsername}: ${(content || '').slice(0, 100)}`;
            const url = roomSlug ? `/chat/${roomSlug}` : dmId ? `/dm/${dmId}` : '/';
            showNotification({ title, body, tag: roomSlug || `dm-${dmId}`, data: { url } });
        },
        [username, showNotification]
    );

    return { showNotification, notifyMessage };
}

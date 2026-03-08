// frontend/src/hooks/usePushNotifications.js
/**
 * 🔔 Push Notifications Hook
 * - Requests browser Notification permission on first login
 * - Shows native desktop notifications for new messages when tab is not focused
 * - Respects user's notification permission status
 */
import { useEffect, useRef, useCallback } from 'react';

const NOTIF_STORAGE_KEY = 'pawscord_notif_asked';
const NOTIF_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * @param {boolean} isAuthenticated - Whether the user is logged in
 * @param {string} username - Current username (to filter own messages)
 */
export default function usePushNotifications(isAuthenticated, username) {
    const permissionRef = useRef(typeof Notification !== 'undefined' ? Notification.permission : 'default');

    // Step 1: Request permission once per ~30 days
    useEffect(() => {
        if (!isAuthenticated) return;
        if (typeof Notification === 'undefined') return;
        if (Notification.permission === 'granted' || Notification.permission === 'denied') return;

        const lastAsked = parseInt(localStorage.getItem(NOTIF_STORAGE_KEY) || '0', 10);
        if (Date.now() - lastAsked < NOTIF_COOLDOWN_MS) return;

        // Delay slightly so it doesn't fire immediately on page load
        const timer = setTimeout(() => {
            Notification.requestPermission().then(permission => {
                permissionRef.current = permission;
                localStorage.setItem(NOTIF_STORAGE_KEY, Date.now().toString());
            }).catch(() => { });
        }, 5000);

        return () => clearTimeout(timer);
    }, [isAuthenticated]);

    /**
     * Show a native browser notification (only when tab is hidden/blurred)
     * @param {Object} opts - { title, body, icon, tag, data }
     */
    const showNotification = useCallback(({ title, body, icon = '/logo192.webp', tag, data } = {}) => {
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

            // Click: focus the tab
            notif.onclick = () => {
                window.focus();
                notif.close();
                if (data?.url) {
                    window.location.pathname = data.url;
                }
            };

            // Auto-close after 8s
            setTimeout(() => notif.close(), 8000);
        } catch (e) {
            // In some browsers (e.g. Firefox private mode), Notification constructor throws
        }
    }, []);

    /**
     * Convenience: show a chat message notification
     * Automatically skips if the sender is `username` (own messages)
     */
    const notifyMessage = useCallback(({ senderUsername, roomName, content, roomSlug, dmId } = {}) => {
        if (senderUsername === username) return; // Don't notify own messages
        const title = roomName ? `#${roomName}` : `@${senderUsername}`;
        const body = `${senderUsername}: ${(content || '').slice(0, 100)}`;
        const url = roomSlug ? `/chat/${roomSlug}` : dmId ? `/dm/${dmId}` : '/';
        showNotification({ title, body, tag: roomSlug || `dm-${dmId}`, data: { url } });
    }, [username, showNotification]);

    return { showNotification, notifyMessage };
}

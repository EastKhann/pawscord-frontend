// frontend/src/hooks/useNotifications.js
import { useEffect, useCallback, useState } from 'react';
import notificationManager from '../utils/notifications';
import logger from '../utils/logger';

/** Typed facade over the JS-authored NotificationManager singleton. */
interface NotificationManagerLike {
    enabled: boolean;
    isSupported?: () => boolean;
    isGranted?: () => boolean;
    requestPermission: () => Promise<boolean>;
    show?: (title: string, options?: Record<string, unknown>) => Notification | null;
    showMention?: (username: string, content: string, avatar: string, room: string, id: string) => void;
    showDM?: (username: string, content: string, avatar: string, id: string) => void;
    showMessage?: (username: string, content: string, avatar: string, room: string, id: string) => void;
    showVoiceCall?: (username: string, avatar: string, room: string) => void;
}

const nm = notificationManager as unknown as NotificationManagerLike;

const useNotifications = (
    ws: WebSocket | null | undefined,
    currentUser: string | null | undefined,
    currentRoom: string | null | undefined,
    isWindowFocused: boolean
) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(nm.enabled ?? false);

    // Request permission on mount
    useEffect(() => {
        if (nm.isSupported?.() && !nm.isGranted?.()) {
            // Auto-request after 10 seconds
            const timeout = setTimeout(async () => {
                const granted = await nm.requestPermission();
                setNotificationsEnabled(granted);
            }, 10000);

            return () => clearTimeout(timeout);
        }
    }, []);

    // Listen for incoming messages
    useEffect(() => {
        if (!ws || !notificationsEnabled) return;

        const handleMessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data as string);

                // Don't show notifications if window is focused
                if (isWindowFocused) return;

                // New message notification
                if (data.type === 'chat_message') {
                    const { id, username, content, avatar, room } = data;

                    // Don't notify for own messages
                    if (username === currentUser) return;

                    // Check if it's a mention
                    const isMention = content.includes(`@${currentUser}`);

                    // Check if it's a DM
                    const isDM = room && room.startsWith('dm-');

                    if (isMention) {
                        nm.showMention?.(username, content, avatar, room, id);
                    } else if (isDM) {
                        nm.showDM?.(username, content, avatar, id);
                    } else if (room === currentRoom) {
                        // Only notify for current room messages (optional)
                        nm.showMessage?.(username, content, avatar, room, id);
                    }
                }

                // Voice call notification
                if (data.type === 'voice_call') {
                    const { username, avatar, room } = data;
                    nm.showVoiceCall?.(username, avatar, room);
                }
            } catch (error) {
                logger.error('Notification error:', error);
            }
        };

        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage);
        };
    }, [ws, notificationsEnabled, currentUser, currentRoom, isWindowFocused]);

    // Manual enable/disable
    const enableNotifications = useCallback(async () => {
        const granted = await nm.requestPermission();
        setNotificationsEnabled(granted);
        return granted as boolean;
    }, []);

    const testNotification = useCallback(() => {
        nm.show?.('PAWSCORD', {
            body: 'Desktop notifications enabled! 🔔',
            icon: '/logo192.png',
        });
    }, []);

    return {
        notificationsEnabled,
        enableNotifications,
        testNotification,
        isSupported: nm.isSupported?.() ?? false,
    };
};

export default useNotifications;

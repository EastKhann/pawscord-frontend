// frontend/src/hooks/useNotifications.js
import { useEffect, useCallback, useState } from 'react';
import notificationManager from '../utils/notifications';

const useNotifications = (ws, currentUser, currentRoom, isWindowFocused) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(
        notificationManager.enabled
    );

    // Request permission on mount
    useEffect(() => {
        if (notificationManager.isSupported() && !notificationManager.isGranted()) {
            // Auto-request after 10 seconds
            const timeout = setTimeout(async () => {
                const granted = await notificationManager.requestPermission();
                setNotificationsEnabled(granted);
            }, 10000);

            return () => clearTimeout(timeout);
        }
    }, []);

    // Listen for incoming messages
    useEffect(() => {
        if (!ws || !notificationsEnabled) return;

        const handleMessage = (event) => {
            try {
                const data = JSON.parse(event.data);

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
                        notificationManager.showMention(
                            username,
                            content,
                            avatar,
                            room,
                            id
                        );
                    } else if (isDM) {
                        notificationManager.showDM(
                            username,
                            content,
                            avatar,
                            id
                        );
                    } else if (room === currentRoom) {
                        // Only notify for current room messages (optional)
                        notificationManager.showMessage(
                            username,
                            content,
                            avatar,
                            room,
                            id
                        );
                    }
                }

                // Voice call notification
                if (data.type === 'voice_call') {
                    const { username, avatar, room } = data;
                    notificationManager.showVoiceCall(username, avatar, room);
                }
            } catch (error) {
                console.error('Notification error:', error);
            }
        };

        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage);
        };
    }, [ws, notificationsEnabled, currentUser, currentRoom, isWindowFocused]);

    // Manual enable/disable
    const enableNotifications = useCallback(async () => {
        const granted = await notificationManager.requestPermission();
        setNotificationsEnabled(granted);
        return granted;
    }, []);

    const testNotification = useCallback(() => {
        notificationManager.show('PAWSCORD', {
            body: 'Desktop notifications enabled! 🔔',
            icon: '/logo192.png'
        });
    }, []);

    return {
        notificationsEnabled,
        enableNotifications,
        testNotification,
        isSupported: notificationManager.isSupported()
    };
};

export default useNotifications;




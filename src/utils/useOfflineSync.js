/**
 * useOfflineSync.js — Online/offline sync hook (Faz 6)
 *
 * Listens for online/offline events and flushes pending messages
 * when the browser comes back online.
 */
import { useEffect, useRef, useCallback } from 'react';
import {
    flushPendingMessages,
    enqueuePendingMessage,
    getPendingMessages,
} from './offlineDB';

/**
 * @param {object} opts
 * @param {Function} opts.sendMessageFn  — async (msg) => boolean
 * @param {Function} [opts.onSyncComplete] — (sentCount) => void
 * @param {Function} [opts.onOffline] — () => void
 * @param {Function} [opts.onOnline] — () => void
 */
export function useOfflineSync({
    sendMessageFn,
    onSyncComplete,
    onOffline,
    onOnline,
} = {}) {
    const sendRef = useRef(sendMessageFn);
    sendRef.current = sendMessageFn;

    const isOnline = useRef(navigator.onLine);

    const flush = useCallback(async () => {
        if (!sendRef.current) return;
        const count = await flushPendingMessages(sendRef.current);
        if (count > 0) {
            onSyncComplete?.(count);
        }
    }, [onSyncComplete]);

    useEffect(() => {
        const handleOnline = () => {
            isOnline.current = true;
            onOnline?.();
            flush();
        };

        const handleOffline = () => {
            isOnline.current = false;
            onOffline?.();
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [flush, onOnline, onOffline]);

    /**
     * Send a message — either directly (online) or queue it (offline).
     */
    const sendOrQueue = useCallback(
        async (msg) => {
            if (navigator.onLine && sendRef.current) {
                try {
                    const ok = await sendRef.current(msg);
                    if (ok) return true;
                } catch {
                    // Fall through to queue
                }
            }
            // Offline or send failed → queue
            await enqueuePendingMessage(msg);
            return false;
        },
        [],
    );

    return { sendOrQueue, flush, isOnline: () => isOnline.current, getPendingMessages };
}

export default useOfflineSync;

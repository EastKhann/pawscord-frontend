// frontend/src/hooks/useNetworkStatus.js
// Lightweight online/offline hook (re-exports from useCustomHooks for convenience)
// The full implementation lives in useCustomHooks.ts

import { useState, useEffect, useRef } from 'react';

/**
 * useNetworkStatus — tracks navigator.onLine and exposes wasOffline flag.
 *
 * @returns {{ isOnline: boolean, wasOffline: boolean }}
 */
export const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(
        typeof navigator !== 'undefined' ? navigator.onLine : true
    );
    const wasOfflineRef = useRef(false);
    const [wasOffline, setWasOffline] = useState(false);

    useEffect(() => {
        const goOnline = () => {
            setIsOnline(true);
            if (wasOfflineRef.current) {
                setWasOffline(true);
                // Auto-clear the flag after 5 s
                setTimeout(() => setWasOffline(false), 5000);
            }
        };

        const goOffline = () => {
            setIsOnline(false);
            wasOfflineRef.current = true;
        };

        window.addEventListener('online', goOnline);
        window.addEventListener('offline', goOffline);

        return () => {
            window.removeEventListener('online', goOnline);
            window.removeEventListener('offline', goOffline);
        };
    }, []);

    return { isOnline, wasOffline };
};

export default useNetworkStatus;

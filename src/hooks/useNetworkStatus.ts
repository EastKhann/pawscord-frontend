// frontend/src/hooks/useNetworkStatus.ts
// Lightweight online/offline hook

import { useState, useEffect, useRef } from 'react';

interface NetworkStatus {
    isOnline: boolean;
    wasOffline: boolean;
}

/**
 * useNetworkStatus — tracks navigator.onLine and exposes wasOffline flag.
 */
export const useNetworkStatus = (): NetworkStatus => {
    const [isOnline, setIsOnline] = useState<boolean>(
        typeof navigator !== 'undefined' ? navigator.onLine : true
    );
    const wasOfflineRef = useRef(false);
    const [wasOffline, setWasOffline] = useState(false);

    useEffect(() => {
        let wasOfflineTimer: ReturnType<typeof setTimeout> | null = null;

        const goOnline = () => {
            setIsOnline(true);
            if (wasOfflineRef.current) {
                setWasOffline(true);
                wasOfflineTimer = setTimeout(() => setWasOffline(false), 5000);
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
            if (wasOfflineTimer) clearTimeout(wasOfflineTimer);
        };
    }, []);

    return { isOnline, wasOffline };
};

export default useNetworkStatus;

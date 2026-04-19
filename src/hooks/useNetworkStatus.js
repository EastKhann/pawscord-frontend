// frontend/src/hooks/useNetworkStatus.js
// Tracks online/offline status using @capacitor/network on native, navigator.onLine on web.
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';

/**
 * Returns { isOnline: boolean } — reacts to network changes on both web and native.
 */
export function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState(
        typeof navigator !== 'undefined' ? navigator.onLine : true
    );

    useEffect(() => {
        let removeListener = null;

        if (Capacitor.isNativePlatform()) {
            // Native: use @capacitor/network for reliable status
            import('@capacitor/network').then(({ Network }) => {
                // Get initial status
                Network.getStatus().then(({ connected }) => setIsOnline(connected));

                // Subscribe to changes
                Network.addListener('networkStatusChange', ({ connected }) => {
                    setIsOnline(connected);
                }).then((handle) => {
                    removeListener = () => handle.remove();
                });
            });
        } else {
            // Web: browser events
            const goOnline = () => setIsOnline(true);
            const goOffline = () => setIsOnline(false);
            window.addEventListener('online', goOnline);
            window.addEventListener('offline', goOffline);
            removeListener = () => {
                window.removeEventListener('online', goOnline);
                window.removeEventListener('offline', goOffline);
            };
        }

        return () => {
            removeListener?.();
        };
    }, []);

    return { isOnline };
}

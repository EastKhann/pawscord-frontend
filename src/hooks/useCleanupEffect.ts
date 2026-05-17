// frontend/src/hooks/useCleanupEffect.js
// 🧹 Automatic cleanup for common patterns

import React, { useEffect, useRef } from 'react';

interface ListenerEntry {
    element: EventTarget;
    event: string;
    handler: EventListenerOrEventListenerObject;
}

/**
 * useCleanupEffect - Automatically cleanup timers, intervals, and listeners
 */
export const useCleanupEffect = () => {
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
    const intervals = useRef<ReturnType<typeof setInterval>[]>([]);
    const listeners = useRef<ListenerEntry[]>([]);
    const webSockets = useRef<WebSocket[]>([]);

    // Cleanup all on unmount
    useEffect(() => {
        return () => {
            // Clear all timers
            timers.current.forEach((timer) => clearTimeout(timer));

            // Clear all intervals
            intervals.current.forEach((interval) => clearInterval(interval));

            // Remove all event listeners
            listeners.current.forEach(({ element, event, handler }) => {
                element.removeEventListener(event, handler);
            });

            // Close all WebSockets
            webSockets.current.forEach((ws) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.close();
                }
            });
        };
    }, []);

    return {
        // Safe setTimeout
        setTimeout: (callback: () => void, delay: number) => {
            const timer = setTimeout(callback, delay);
            timers.current.push(timer);
            return timer;
        },

        // Safe setInterval
        setInterval: (callback: () => void, delay: number) => {
            const interval = setInterval(callback, delay);
            intervals.current.push(interval);
            return interval;
        },

        // Safe addEventListener
        addEventListener: (
            element: EventTarget,
            event: string,
            handler: EventListenerOrEventListenerObject,
            options?: AddEventListenerOptions
        ) => {
            element.addEventListener(event, handler, options);
            listeners.current.push({ element, event, handler });
        },

        // Safe WebSocket
        registerWebSocket: (ws: WebSocket) => {
            webSockets.current.push(ws);
            return ws;
        },

        // Manual cleanup
        clearTimer: (timer: ReturnType<typeof setTimeout>) => {
            clearTimeout(timer);
            timers.current = timers.current.filter((t) => t !== timer);
        },

        clearInterval: (interval: ReturnType<typeof setInterval>) => {
            clearInterval(interval);
            intervals.current = intervals.current.filter((i) => i !== interval);
        },
    };
};

/**
 * useDebounce - Debounce a value
 */
export const useDebounce = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
    const { setTimeout, clearTimer } = useCleanupEffect();

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimer(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, delay]);

    return debouncedValue;
};

/**
 * useThrottle - Throttle a function
 */
export const useThrottle = <T extends (...args: unknown[]) => unknown>(
    callback: T,
    delay: number
): T => {
    const lastRun = useRef(Date.now());

    return React.useCallback(
        (...args: unknown[]) => {
            const now = Date.now();

            if (now - lastRun.current >= delay) {
                callback(...args);
                lastRun.current = now;
            }
        },
        [callback, delay]
    ) as T;
};

// frontend/src/hooks/useCleanupEffect.js
// 🧹 Automatic cleanup for common patterns

import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useCleanupEffect - Automatically cleanup timers, intervals, and listeners
 */
export const useCleanupEffect = () => {
    const timers = useRef([]);
    const intervals = useRef([]);
    const listeners = useRef([]);
    const webSockets = useRef([]);

    // Cleanup all on unmount
    useEffect(() => {
        return () => {
            // Clear all timers
            timers.current.forEach(timer => clearTimeout(timer));

            // Clear all intervals
            intervals.current.forEach(interval => clearInterval(interval));

            // Remove all event listeners
            listeners.current.forEach(({ element, event, handler }) => {
                element.removeEventListener(event, handler);
            });

            // Close all WebSockets
            webSockets.current.forEach(ws => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.close();
                }
            });
        };
    }, []);

    return {
        // Safe setTimeout
        setTimeout: (callback, delay) => {
            const timer = setTimeout(callback, delay);
            timers.current.push(timer);
            return timer;
        },

        // Safe setInterval
        setInterval: (callback, delay) => {
            const interval = setInterval(callback, delay);
            intervals.current.push(interval);
            return interval;
        },

        // Safe addEventListener
        addEventListener: (element, event, handler, options) => {
            element.addEventListener(event, handler, options);
            listeners.current.push({ element, event, handler });
        },

        // Safe WebSocket
        registerWebSocket: (ws) => {
            webSockets.current.push(ws);
            return ws;
        },

        // Manual cleanup
        clearTimer: (timer) => {
            clearTimeout(timer);
            timers.current = timers.current.filter(t => t !== timer);
        },

        clearInterval: (interval) => {
            clearInterval(interval);
            intervals.current = intervals.current.filter(i => i !== interval);
        }
    };
};

/**
 * useDebounce - Debounce a value
 */
export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);
    const { setTimeout, clearTimer } = useCleanupEffect();

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimer(timer);
    }, [value, delay]);

    return debouncedValue;
};

/**
 * useThrottle - Throttle a function
 */
export const useThrottle = (callback, delay) => {
    const lastRun = useRef(Date.now());

    return React.useCallback((...args) => {
        const now = Date.now();

        if (now - lastRun.current >= delay) {
            callback(...args);
            lastRun.current = now;
        }
    }, [callback, delay]);
};




/**
 * 🎣 Custom Thuformance Hooks
 *
 * React hooks for performance optimization
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import logger from '../utils/logger';

/**
 * Debounce hook - rapid fire events için
 */
export function useDebounce<T>(value: T, delay = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

/**
 * Throttle hook - rate limiting için
 */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
    callback: T,
    delay = 1000
): T {
    const lastRun = useRef(Date.now());

    return useCallback(
        (...args: unknown[]) => {
            const now = Date.now();

            if (now - lastRun.current >= delay) {
                callback(...args);
                lastRun.current = now;
            }
        },
        [callback, delay]
    ) as T;
}

/**
 * Intersection Observer hook - lazy loading için
 */
export function useIntersectionObserver(options: IntersectionObserverInit = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [ref, setRef] = useState<Element | null>(null);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                rootMargin: '50px',
                ...options,
            }
        );

        observer.observe(ref);

        return () => {
            observer.disconnect();
        };
    }, [ref, options]);

    return [setRef, isIntersecting] as const;
}

/**
 * Idle callback hook - background tasks için
 */
export function useIdleCallback(callback: () => void) {
    useEffect(() => {
        if (!window.requestIdleCallback) {
            // Fallback for Safari
            const timeout = setTimeout(callback, 1);
            return () => clearTimeout(timeout);
        }

        const handle = window.requestIdleCallback(callback, { timeout: 2000 });

        return () => {
            window.cancelIdleCallback(handle);
        };
    }, [callback]);
}

/**
 * Media query hook - responsive design için
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
}

/**
 * Local storage hook - persistent state için
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (v: T | ((prev: T) => T)) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            logger.error('useLocalStorage error:', error);
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value: T | ((prev: T) => T)) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                logger.error('useLocalStorage setValue error:', error);
            }
        },
        [key, storedValue]
    );

    return [storedValue, setValue];
}

/**
 * Previous value hook - değişim tracking için
 */
export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T | undefined>(undefined);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

/**
 * Mount status hook - memory leak prevention için
 */
export function useIsMounted(): () => boolean {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    return useCallback(() => isMounted.current, []);
}

/**
 * Async effect hook - cleanup için
 */
export function useAsyncEffect(
    effect: (isCancelled: () => boolean) => Promise<void>,
    deps: React.DependencyList
) {
    useEffect(() => {
        let cancelled = false;

        const runEffect = async () => {
            await effect(() => cancelled);
        };

        runEffect();

        return () => {
            cancelled = true;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

/**
 * Window size hook - responsive için
 */
export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

/**
 * Online status hook - network monitoring için
 */
export function useOnlineStatus(): boolean {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
}

interface BatteryStatus {
    level: number;
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
}

/** Minimal interface for the Battery Status API (not in standard TS lib). */
interface BatteryManager extends BatteryStatus {
    addEventListener(type: string, listener: () => void): void;
    removeEventListener(type: string, listener: () => void): void;
}

interface NavigatorWithBattery extends Navigator {
    getBattery(): Promise<BatteryManager>;
}

/**
 * Battery status hook - power-aware apps için
 */
export function useBatteryStatus(): BatteryStatus | null {
    const [battery, setBattery] = useState<BatteryStatus | null>(null);

    useEffect(() => {
        const nav = navigator as NavigatorWithBattery;
        if (typeof nav.getBattery !== 'function') {
            return;
        }

        nav.getBattery().then((batteryManager: BatteryManager) => {
            const updateBattery = () => {
                setBattery({
                    level: batteryManager.level,
                    charging: batteryManager.charging,
                    chargingTime: batteryManager.chargingTime,
                    dischargingTime: batteryManager.dischargingTime,
                });
            };

            updateBattery();

            batteryManager.addEventListener('levelchange', updateBattery);
            batteryManager.addEventListener('chargingchange', updateBattery);

            return () => {
                batteryManager.removeEventListener('levelchange', updateBattery);
                batteryManager.removeEventListener('chargingchange', updateBattery);
            };
        });
    }, []);

    return battery;
}

/**
 * Render count hook - performance debugging için
 */
export function useRenderCount(_componentName = 'Component'): number {
    const renderCount = useRef(0);

    useEffect(() => {
        renderCount.current += 1;
    });

    return renderCount.current;
}

/**
 * Update effect hook - ilk render'da çalışmaz
 */
export function useUpdateEffect(effect: () => void | (() => void), deps: React.DependencyList) {
    const isFirstMount = useRef(true);

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }

        return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

/**
 * Timeout hook - declarative setTimeout
 */
export function useTimeout(callback: () => void, delay: number | null) {
    const savedCallback = useRef<(() => void) | null>(null);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) {
            return;
        }

        const id = setTimeout(() => savedCallback.current?.(), delay);

        return () => clearTimeout(id);
    }, [delay]);
}

/**
 * Interval hook - declarative setInterval
 */
export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<(() => void) | null>(null);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) {
            return;
        }

        const id = setInterval(() => savedCallback.current?.(), delay);

        return () => clearInterval(id);
    }, [delay]);
}

export default {
    useDebounce,
    useThrottle,
    useIntersectionObserver,
    useIdleCallback,
    useMediaQuery,
    useLocalStorage,
    usePrevious,
    useIsMounted,
    useAsyncEffect,
    useWindowSize,
    useOnlineStatus,
    useBatteryStatus,
    useRenderCount,
    useUpdateEffect,
    useTimeout,
    useInterval,
};

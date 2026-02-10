/**
 * 🎣 Custom Performance Hooks
 * 
 * React hooks for performance optimization
 */

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

/**
 * Debounce hook - rapid fire events için
 * @param {any} value - Debounce edilecek değer
 * @param {number} delay - Gecikme (ms)
 */
export function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

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
 * @param {Function} callback - Throttle edilecek fonksiyon
 * @param {number} delay - Minimum gecikme (ms)
 */
export function useThrottle(callback, delay = 1000) {
    const lastRun = useRef(Date.now());

    return useCallback(
        (...args) => {
            const now = Date.now();

            if (now - lastRun.current >= delay) {
                callback(...args);
                lastRun.current = now;
            }
        },
        [callback, delay]
    );
}

/**
 * Intersection Observer hook - lazy loading için
 * @param {Object} options - Observer options
 */
export function useIntersectionObserver(options = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [ref, setRef] = useState(null);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                rootMargin: '50px',
                ...options
            }
        );

        observer.observe(ref);

        return () => {
            observer.disconnect();
        };
    }, [ref, options]);

    return [setRef, isIntersecting];
}

/**
 * Idle callback hook - background tasks için
 * @param {Function} callback - Idle zamanında çalışacak
 */
export function useIdleCallback(callback) {
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
 * @param {string} query - Media query string
 */
export function useMediaQuery(query) {
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
 * @param {string} key - Storage key
 * @param {any} initialValue - Default value
 */
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('useLocalStorage error:', error);
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.error('useLocalStorage setValue error:', error);
            }
        },
        [key, storedValue]
    );

    return [storedValue, setValue];
}

/**
 * Previous value hook - değişim tracking için
 * @param {any} value - Track edilecek değer
 */
export function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

/**
 * Mount status hook - memory leak prevention için
 */
export function useIsMounted() {
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
 * @param {Function} effect - Async effect function
 * @param {Array} deps - Dependencies
 */
export function useAsyncEffect(effect, deps) {
    useEffect(() => {
        let cancelled = false;

        const runEffect = async () => {
            await effect(() => cancelled);
        };

        runEffect();

        return () => {
            cancelled = true;
        };
    }, deps);
}

/**
 * Window size hook - responsive için
 */
export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
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
export function useOnlineStatus() {
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

/**
 * Battery status hook - power-aware apps için
 */
export function useBatteryStatus() {
    const [battery, setBattery] = useState(null);

    useEffect(() => {
        if (!navigator.getBattery) {
            return;
        }

        navigator.getBattery().then((batteryManager) => {
            const updateBattery = () => {
                setBattery({
                    level: batteryManager.level,
                    charging: batteryManager.charging,
                    chargingTime: batteryManager.chargingTime,
                    dischargingTime: batteryManager.dischargingTime
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
 * @param {string} componentName - Component adı
 */
export function useRenderCount(componentName = 'Component') {
    const renderCount = useRef(0);

    useEffect(() => {
        renderCount.current += 1;
    });

    return renderCount.current;
}

/**
 * Update effect hook - ilk render'da çalışmaz
 * @param {Function} effect - Effect function
 * @param {Array} deps - Dependencies
 */
export function useUpdateEffect(effect, deps) {
    const isFirstMount = useRef(true);

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }

        return effect();
    }, deps);
}

/**
 * Timeout hook - declarative setTimeout
 * @param {Function} callback - Callback function
 * @param {number} delay - Delay in ms
 */
export function useTimeout(callback, delay) {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) {
            return;
        }

        const id = setTimeout(() => savedCallback.current(), delay);

        return () => clearTimeout(id);
    }, [delay]);
}

/**
 * Interval hook - declarative setInterval
 * @param {Function} callback - Callback function
 * @param {number} delay - Delay in ms
 */
export function useInterval(callback, delay) {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) {
            return;
        }

        const id = setInterval(() => savedCallback.current(), delay);

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
    useInterval
};



// frontend/src/hooks/useCustomHooks.js

/**
 * 🎣 Custom React Hooks Collection
 * Thuformance ve UX için optimize edilmiş hooklar
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import logger from '../utils/logger';

/**
 * 1. useIntersectionObserver - Viewport tracking
 */
export const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
    const { threshold = 0.1, rootMargin = '0px', root = null } = options;

    const [isIntersecting, setIsIntersecting] = useState(false);
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
    const targetRef = useRef<Element | null>(null);

    useEffect(() => {
        const target = targetRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            ([e]) => {
                setIsIntersecting(e.isIntersecting);
                setEntry(e);
            },
            { threshold, rootMargin, root }
        );

        observer.observe(target);

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin, root]);

    return [targetRef, isIntersecting, entry] as const;
};

/**
 * 2. useNetworkStatus - Online/Offline detection
 */
export const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [effectiveType, setEffectiveType] = useState<string | null>(null);
    const [downlink, setDownlink] = useState<number | null>(null);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Network Information API (if available)
        if ('connection' in navigator) {
            interface NetworkInformationNavigator extends Navigator {
                connection?: { effectiveType: string; downlink: number; addEventListener: (type: string, cb: () => void) => void; removeEventListener: (type: string, cb: () => void) => void };
                mozConnection?: NetworkInformationNavigator['connection'];
                webkitConnection?: NetworkInformationNavigator['connection'];
            }
            const nav = navigator as NetworkInformationNavigator;
            const connection = nav.connection ?? nav.mozConnection ?? nav.webkitConnection;

            const updateConnectionInfo = () => {
                setEffectiveType(connection.effectiveType);
                setDownlink(connection.downlink);
            };

            connection.addEventListener('change', updateConnectionInfo);
            updateConnectionInfo();

            return () => {
                window.removeEventListener('online', handleOnline);
                window.removeEventListener('offline', handleOffline);
                connection.removeEventListener('change', updateConnectionInfo);
            };
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return { isOnline, effectiveType, downlink };
};

/**
 * 3. useDebounce - Debounced value
 */
export const useDebounce = <T>(value: T, delay = 300): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
};

/**
 * 4. useThrottle - Throttled value
 */
export const useThrottle = <T>(value: T, delay = 300): T => {
    const [throttledValue, setThrottledValue] = useState<T>(value);
    const lastRan = useRef(Date.now());

    useEffect(() => {
        const handler = setTimeout(
            () => {
                if (Date.now() - lastRan.current >= delay) {
                    setThrottledValue(value);
                    lastRan.current = Date.now();
                }
            },
            delay - (Date.now() - lastRan.current)
        );

        return () => clearTimeout(handler);
    }, [value, delay]);

    return throttledValue;
};

/**
 * 5. useLocalStorage - Type-safe localStorage
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            logger.error(`Error loading localStorage key "${key}":`, error);
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
                logger.error(`Error setting localStorage key "${key}":`, error);
            }
        },
        [key, storedValue]
    );

    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            logger.error(`Error removing localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue] as const;
};

/**
 * 6. useWindowSize - Window dimensions
 */
export const useWindowSize = () => {
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
};

/**
 * 7. useMediaQuery - Responsive media queries
 */
export const useMediaQuery = (query: string): boolean => {
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
};

/**
 * 8. useHover - Hover state
 */
export const useHover = () => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const node = hoverRef.current;
        if (!node) return;

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        node.addEventListener('mouseenter', handleMouseEnter);
        node.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            node.removeEventListener('mouseenter', handleMouseEnter);
            node.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return [hoverRef, isHovered] as const;
};

/**
 * 9. useClickOutside - Click outside detection
 */
export const useClickOutside = (callback: () => void) => {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [callback]);

    return ref;
};

/**
 * 10. usePrevious - Previous value
 */
export const usePrevious = <T>(value: T): T | undefined => {
    const ref = useRef<T | undefined>(undefined);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

/**
 * 11. useInterval - Declarative interval
 */
export const useInterval = (callback: () => void, delay: number | null) => {
    const savedCallback = useRef<(() => void) | null>(null);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) return;

        const tick = () => {
            if (savedCallback.current) savedCallback.current();
        };
        const id = setInterval(tick, delay);

        return () => clearInterval(id);
    }, [delay]);
};

/**
 * 12. useTimeout - Declarative timeout
 */
export const useTimeout = (callback: () => void, delay: number | null) => {
    const savedCallback = useRef<(() => void) | null>(null);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) return;

        const id = setTimeout(() => {
            if (savedCallback.current) savedCallback.current();
        }, delay);
        return () => clearTimeout(id);
    }, [delay]);
};

/**
 * 13. useKeyPress - Keyboard key detection
 */
export const useKeyPress = (targetKey: string): boolean => {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
        const downHandler = ({ key }: KeyboardEvent) => {
            if (key === targetKey) {
                setKeyPressed(true);
            }
        };

        const upHandler = ({ key }: KeyboardEvent) => {
            if (key === targetKey) {
                setKeyPressed(false);
            }
        };

        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, [targetKey]);

    return keyPressed;
};

/**
 * 14. useClipboard - Clipboard operations
 */
export const useClipboard = () => {
    const [copiedText, setCopiedText] = useState<string | null>(null);

    const copy = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            setTimeout(() => setCopiedText(null), 2000);
            return true;
        } catch (error) {
            logger.error('Failed to copy:', error);
            return false;
        }
    }, []);

    return { copiedText, copy };
};

/**
 * 15. useToggle - Boolean toggle
 */
export const useToggle = (initialValue = false): [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => {
        setValue((v) => !v);
    }, []);

    return [value, toggle, setValue];
};

/**
 * 16. useAsyncState - Async state management
 */
export const useAsyncState = <T = unknown>(asyncFunction: (...args: unknown[]) => Promise<T>) => {
    const [state, setState] = useState<{
        loading: boolean;
        data: T | null;
        error: unknown;
    }>({
        loading: false,
        data: null,
        error: null,
    });

    const execute = useCallback(
        async (...args: unknown[]) => {
            setState({ loading: true, data: null, error: null });

            try {
                const data = await asyncFunction(...args);
                setState({ loading: false, data, error: null });
                return data;
            } catch (error) {
                setState({ loading: false, data: null, error });
                throw error;
            }
        },
        [asyncFunction]
    );

    return { ...state, execute };
};

/**
 * 17. useUpdateEffect - useEffect but skip first render
 */
export const useUpdateEffect = (effect: () => void | (() => void), deps: React.DependencyList) => {
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};

/**
 * 18. useMountedState - Check if component is mounted
 */
export const useMountedState = (): (() => boolean) => {
    const mountedRef = useRef(false);
    const isMounted = useCallback(() => mountedRef.current, []);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    return isMounted;
};

export default {
    useIntersectionObserver,
    useNetworkStatus,
    useDebounce,
    useThrottle,
    useLocalStorage,
    useWindowSize,
    useMediaQuery,
    useHover,
    useClickOutside,
    usePrevious,
    useInterval,
    useTimeout,
    useKeyPress,
    useClipboard,
    useToggle,
    useAsyncState,
    useUpdateEffect,
    useMountedState,
};

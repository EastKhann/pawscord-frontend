// frontend/src/hooks/useCustomHooks.js

/**
 * 🎣 Custom React Hooks Collection
 * Performance ve UX için optimize edilmiş hooklar
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

/**
 * 1. useIntersectionObserver - Viewport tracking
 */
export const useIntersectionObserver = (options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '0px',
        root = null
    } = options;

    const [isIntersecting, setIsIntersecting] = useState(false);
    const [entry, setEntry] = useState(null);
    const targetRef = useRef(null);

    useEffect(() => {
        const target = targetRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
                setEntry(entry);
            },
            { threshold, rootMargin, root }
        );

        observer.observe(target);

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin, root]);

    return [targetRef, isIntersecting, entry];
};

/**
 * 2. useNetworkStatus - Online/Offline detection
 */
export const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [effectiveType, setEffectiveType] = useState(null);
    const [downlink, setDownlink] = useState(null);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Network Information API (if available)
        if ('connection' in navigator) {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

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
export const useDebounce = (value, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

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
export const useThrottle = (value, delay = 300) => {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastRan = useRef(Date.now());

    useEffect(() => {
        const handler = setTimeout(() => {
            if (Date.now() - lastRan.current >= delay) {
                setThrottledValue(value);
                lastRan.current = Date.now();
            }
        }, delay - (Date.now() - lastRan.current));

        return () => clearTimeout(handler);
    }, [value, delay]);

    return throttledValue;
};

/**
 * 5. useLocalStorage - Type-safe localStorage
 */
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error loading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue];
};

/**
 * 6. useWindowSize - Window dimensions
 */
export const useWindowSize = () => {
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
};

/**
 * 7. useMediaQuery - Responsive media queries
 */
export const useMediaQuery = (query) => {
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
    const hoverRef = useRef(null);

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

    return [hoverRef, isHovered];
};

/**
 * 9. useClickOutside - Click outside detection
 */
export const useClickOutside = (callback) => {
    const ref = useRef(null);

    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
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
export const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

/**
 * 11. useInterval - Declarative interval
 */
export const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) return;

        const tick = () => savedCallback.current();
        const id = setInterval(tick, delay);

        return () => clearInterval(id);
    }, [delay]);
};

/**
 * 12. useTimeout - Declarative timeout
 */
export const useTimeout = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) return;

        const id = setTimeout(() => savedCallback.current(), delay);
        return () => clearTimeout(id);
    }, [delay]);
};

/**
 * 13. useKeyPress - Keyboard key detection
 */
export const useKeyPress = (targetKey) => {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
        const downHandler = ({ key }) => {
            if (key === targetKey) {
                setKeyPressed(true);
            }
        };

        const upHandler = ({ key }) => {
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
    const [copiedText, setCopiedText] = useState(null);

    const copy = useCallback(async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            setTimeout(() => setCopiedText(null), 2000);
            return true;
        } catch (error) {
            console.error('Failed to copy:', error);
            return false;
        }
    }, []);

    return { copiedText, copy };
};

/**
 * 15. useToggle - Boolean toggle
 */
export const useToggle = (initialValue = false) => {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => {
        setValue(v => !v);
    }, []);

    return [value, toggle, setValue];
};

/**
 * 16. useAsyncState - Async state management
 */
export const useAsyncState = (asyncFunction) => {
    const [state, setState] = useState({
        loading: false,
        data: null,
        error: null
    });

    const execute = useCallback(async (...args) => {
        setState({ loading: true, data: null, error: null });

        try {
            const data = await asyncFunction(...args);
            setState({ loading: false, data, error: null });
            return data;
        } catch (error) {
            setState({ loading: false, data: null, error });
            throw error;
        }
    }, [asyncFunction]);

    return { ...state, execute };
};

/**
 * 17. useUpdateEffect - useEffect but skip first render
 */
export const useUpdateEffect = (effect, deps) => {
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        return effect();
    }, deps);
};

/**
 * 18. useMountedState - Check if component is mounted
 */
export const useMountedState = () => {
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
    useMountedState
};



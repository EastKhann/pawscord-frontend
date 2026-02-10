// frontend/src/utils/performanceOptimization.js
// ⚡ PERFORMANS OPTİMİZASYONU UTİLİTY'LERİ

import { useEffect, useRef, useCallback, useMemo } from 'react';

/**
 * 🎯 Debounce Hook
 * Kullanım: Arama input'larında, resize event'lerinde
 * 
 * @param {Function} callback - Çalıştırılacak fonksiyon
 * @param {number} delay - Gecikme süresi (ms)
 * @returns {Function} - Debounced fonksiyon
 * 
 * @example
 * const debouncedSearch = useDebounce((query) => {
 *   fetchSearchResults(query);
 * }, 300);
 */
export const useDebounce = (callback, delay) => {
    const timeoutRef = useRef(null);

    return useCallback((...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
};

/**
 * ⏱️ Throttle Hook
 * Kullanım: Scroll event'lerinde, resize'da
 * 
 * @param {Function} callback - Çalıştırılacak fonksiyon
 * @param {number} limit - Minimum interval (ms)
 * @returns {Function} - Throttled fonksiyon
 * 
 * @example
 * const throttledScroll = useThrottle((e) => {
 *   handleScroll(e);
 * }, 100);
 */
export const useThrottle = (callback, limit) => {
    const lastRun = useRef(Date.now());

    return useCallback((...args) => {
        const now = Date.now();
        if (now - lastRun.current >= limit) {
            callback(...args);
            lastRun.current = now;
        }
    }, [callback, limit]);
};

/**
 * 👀 Intersection Observer Hook
 * Kullanım: Lazy loading, infinite scroll
 * 
 * @param {Object} options - Observer options
 * @returns {[ref, isIntersecting]} - [Ref, görünürlük durumu]
 * 
 * @example
 * const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
 * return <div ref={ref}>{isVisible && <HeavyComponent />}</div>;
 */
export const useIntersectionObserver = (options = {}) => {
    const ref = useRef(null);
    const [isIntersecting, setIsIntersecting] = useRef(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting.current = entry.isIntersecting;
        }, {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px'
        });

        observer.observe(ref.current);

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [options.threshold, options.rootMargin]);

    return [ref, isIntersecting.current];
};

/**
 * 📦 Array Chunk Utility
 * Büyük array'leri parçalara ayırır (pagination için)
 * 
 * @param {Array} array - Parçalanacak array
 * @param {number} size - Chunk boyutu
 * @returns {Array[]} - Parçalanmış array
 * 
 * @example
 * const pages = chunkArray(messages, 50); // Her sayfada 50 mesaj
 */
export const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
};

/**
 * 🧹 Event Listener Cleanup Utility
 * Event listener'ları otomatik temizler
 * 
 * @param {string} eventName - Event adı
 * @param {Function} handler - Event handler
 * @param {Element} element - Target element (varsayılan: window)
 * 
 * @example
 * useEventListener('resize', handleResize);
 * useEventListener('click', handleClick, buttonRef.current);
 */
export const useEventListener = (eventName, handler, element = window) => {
    const savedHandler = useRef();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = (event) => savedHandler.current(event);
        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
};

/**
 * 💾 LocalStorage Hook with JSON support
 * LocalStorage'ı otomatik JSON parse/stringify ile kullanır
 * 
 * @param {string} key - Storage key
 * @param {any} initialValue - Başlangıç değeri
 * @returns {[value, setValue, removeValue]} - [Değer, setter, remover]
 * 
 * @example
 * const [user, setUser, removeUser] = useLocalStorage('user', null);
 */
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useRef(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue.current) : value;
            storedValue.current = valueToStore;
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key]);

    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            storedValue.current = initialValue;
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    return [storedValue.current, setValue, removeValue];
};

/**
 * 🎬 Animation Frame Hook
 * requestAnimationFrame ile smooth animasyonlar
 * 
 * @param {Function} callback - Her frame'de çalışacak fonksiyon
 * @param {boolean} isActive - Aktif mi?
 * 
 * @example
 * useAnimationFrame((deltaTime) => {
 *   setPosition(prev => prev + deltaTime * speed);
 * }, isPlaying);
 */
export const useAnimationFrame = (callback, isActive = true) => {
    const requestRef = useRef();
    const previousTimeRef = useRef();

    const animate = useCallback((time) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }, [callback]);

    useEffect(() => {
        if (isActive) {
            requestRef.current = requestAnimationFrame(animate);
        }
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [isActive, animate]);
};

/**
 * 📊 Performance Measurement Utility
 * Component render süresini ölçer
 * 
 * @param {string} componentName - Component adı
 * 
 * @example
 * function MyComponent() {
 *   useMeasurePerformance('MyComponent');
 *   // ...
 * }
 */
export const useMeasurePerformance = (componentName) => {
    const renderCount = useRef(0);
    const totalTime = useRef(0);

    useEffect(() => {
        const startTime = performance.now();
        renderCount.current += 1;

        return () => {
            const endTime = performance.now();
            const renderTime = endTime - startTime;
            totalTime.current += renderTime;

            if (renderCount.current % 10 === 0) {
            }
        };
    });
};

/**
 * 🔄 Previous Value Hook
 * Component'in önceki değerini tutar
 * 
 * @param {any} value - Takip edilecek değer
 * @returns {any} - Önceki değer
 * 
 * @example
 * const prevCount = usePrevious(count);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

/**
 * 🎮 Window Size Hook
 * Pencere boyutunu takip eder (throttled)
 * 
 * @returns {{ width, height }} - Pencere boyutu
 * 
 * @example
 * const { width, height } = useWindowSize();
 * const isMobile = width < 768;
 */
export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useRef({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        let timeoutId = null;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWindowSize.current = {
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            }, 150);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    return windowSize.current;
};

/**
 * 🔔 Idle Detection Hook
 * Kullanıcı aktivitesini izler (away detection)
 * 
 * @param {number} timeout - Idle timeout (ms)
 * @returns {boolean} - Kullanıcı idle mi?
 * 
 * @example
 * const isIdle = useIdleDetection(5 * 60 * 1000); // 5 dakika
    const timeoutIdRef = useRef(null);

    const resetTimer = useCallback(() => {
        setIsIdle.current = false;
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
            setIsIdle.current = true;
        }, timeout);
    }, [timeout]);

    useEffect(() => {
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

        events.forEach(event => {
            document.addEventListener(event, resetTimer, true);
        });

        resetTimer();

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, resetTimer, true);
            });
            clearTimeout(timeoutIdRef.current);
        };
    }, [resetTimer]);

    return isIdle.current;
};

/**
 * 📈 Memory Usage Monitor (Debug Only)
 * Memory kullanımını loglayar
 * 
 * @example
 * useMemoryMonitor(); // Development'ta memory leak tespiti için
 */
export const useMemoryMonitor = () => {
    useEffect(() => {
        if (import.meta.env.MODE !== 'development') return;

        const interval = setInterval(() => {
            if (performance.memory) {
                const used = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
                const total = (performance.memory.totalJSHeapSize / 1048576).toFixed(2);
                const limit = (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2);

            }
        }, 10000); // Her 10 saniyede bir

        return () => clearInterval(interval);
    }, []);
};

/**
 * 🎨 CSS-in-JS Optimization Utility
 * Style objelerini memoize eder
 * 
 * @param {Function} styleFactory - Style üreten fonksiyon
 * @param {Array} deps - Dependencies
 * @returns {Object} - Memoized styles
 * 
 * @example
 * const styles = useMemoizedStyles(() => ({
 *   container: { backgroundColor: theme.bg }
 * }), [theme]);
 */
export const useMemoizedStyles = (styleFactory, deps) => {
    return useMemo(styleFactory, deps);
};

/**
 * 🔍 Deep Comparison Hook
 * Objeleri deep compare eder (React.memo için)
 * 
 * @param {Object} obj - Karşılaştırılacak obje
 * @returns {Object} - Deep comparison sonrası obje
 * 
 * @example
 * const memoizedUser = useDeepCompare(user);
 */
export const useDeepCompare = (obj) => {
    const ref = useRef();
    const signatureRef = useRef();

    const objSignature = JSON.stringify(obj);

    if (objSignature !== signatureRef.current) {
        ref.current = obj;
        signatureRef.current = objSignature;
    }

    return ref.current;
};

// 🎁 Export tüm utility'leri
export default {
    useDebounce,
    useThrottle,
    useIntersectionObserver,
    chunkArray,
    useEventListener,
    useLocalStorage,
    useAnimationFrame,
    useMeasurePerformance,
    usePrevious,
    useWindowSize,
    useIdleDetection,
    useMemoryMonitor,
    useMemoizedStyles,
    useDeepCompare
};



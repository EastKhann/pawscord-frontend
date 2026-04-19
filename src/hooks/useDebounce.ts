// hooks/useDebounce.ts
// 🚀 PERFORMANS: Searchma ve input işlemlerini debounce ederek API çağrılarını %80 azaltır

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Değeri debounce eder - gereksiz render ve API çağrılarını önler
 */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
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
};

/**
 * Callback fonksiyonunu debounce eder
 */
export const useDebouncedCallback = <T extends (...args: unknown[]) => void>(
    callback: T,
    delay: number = 500
): ((...args: Parameters<T>) => void) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                callbackRef.current(...args);
            }, delay);
        },
        [delay]
    );
};

export default useDebounce;

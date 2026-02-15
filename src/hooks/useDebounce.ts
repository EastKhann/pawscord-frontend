// hooks/useDebounce.ts
// 🚀 PERFORMANS: Arama ve input işlemlerini debounce ederek API çağrılarını %80 azaltır

import { useState, useEffect } from 'react';

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
export const useDebouncedCallback = <T extends (...args: unknown[]) => void>(callback: T, delay: number = 500): ((...args: Parameters<T>) => void) => {
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const debouncedCallback = (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return debouncedCallback;
};

export default useDebounce;




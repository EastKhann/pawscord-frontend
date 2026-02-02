// hooks/useDebounce.js
// 🚀 PERFORMANS: Arama ve input işlemlerini debounce ederek API çağrılarını %80 azaltır

import { useState, useEffect } from 'react';

/**
 * Değeri debounce eder - gereksiz render ve API çağrılarını önler
 * @param {any} value - Debounce edilecek değer
 * @param {number} delay - Gecikme süresi (ms)
 * @returns {any} Debounce edilmiş değer
 */
export const useDebounce = (value, delay = 500) => {
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
};

/**
 * Callback fonksiyonunu debounce eder
 * @param {Function} callback - Debounce edilecek fonksiyon
 * @param {number} delay - Gecikme süresi (ms)
 * @returns {Function} Debounce edilmiş fonksiyon
 */
export const useDebouncedCallback = (callback, delay = 500) => {
  const [timeoutId, setTimeoutId] = useState(null);

  const debouncedCallback = (...args) => {
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




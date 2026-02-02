// hooks/useRateLimit.js
// 🛡️ Rate Limiting Hook - Spam Prevention

import { useRef } from 'react';

/**
 * Rate limiting hook
 * @param {number} maxRequests - Maximum requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {function} checkLimit - Function to check if request is allowed
 */
export const useRateLimit = (maxRequests = 5, windowMs = 1000) => {
  const requests = useRef([]);

  const checkLimit = () => {
    const now = Date.now();

    // Zaman penceresi dışındaki istekleri temizle
    requests.current = requests.current.filter(
      time => now - time < windowMs
    );

    // Limit aşıldı mı kontrol et
    if (requests.current.length >= maxRequests) {
      console.warn(`⚠️ Rate limit aşıldı! ${maxRequests} istek/${windowMs}ms`);
      return false;
    }

    // İsteği kaydet
    requests.current.push(now);
    return true;
  };

  const getRemainingRequests = () => {
    const now = Date.now();
    requests.current = requests.current.filter(
      time => now - time < windowMs
    );
    return Math.max(0, maxRequests - requests.current.length);
  };

  const reset = () => {
    requests.current = [];
  };

  return {
    checkLimit,
    getRemainingRequests,
    reset,
    isLimited: () => requests.current.length >= maxRequests
  };
};

export default useRateLimit;




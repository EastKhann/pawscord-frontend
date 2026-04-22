// hooks/useRateLimit.ts
// 🛡️ Rate Limiting Hook - Spam Prevention

import { useRef } from 'react';
import logger from '../utils/logger';

export interface RateLimitResult {
    checkLimit: () => boolean;
    getRemainingRequests: () => number;
    reset: () => void;
    isLimited: () => boolean;
}

/**
 * Rate limiting hook
 */
export const useRateLimit = (maxRequests: number = 5, windowMs: number = 1000): RateLimitResult => {
    const requests = useRef<number[]>([]);

    const checkLimit = (): boolean => {
        const now = Date.now();

        // Zaman penceresi dışındaki istekleri temizle
        requests.current = requests.current.filter((time) => now - time < windowMs);

        // Limit aşıldı mı kontrol et
        if (requests.current.length >= maxRequests) {
            logger.warn(`⚠️ Rate limit exceeded! ${maxRequests} requests/${windowMs}ms`);
            return false;
        }

        // İsteği kaydet
        requests.current.push(now);
        return true;
    };

    const getRemainingRequests = (): number => {
        const now = Date.now();
        requests.current = requests.current.filter((time) => now - time < windowMs);
        return Math.max(0, maxRequests - requests.current.length);
    };

    const reset = (): void => {
        requests.current = [];
    };

    return {
        checkLimit,
        getRemainingRequests,
        reset,
        isLimited: () => requests.current.length >= maxRequests,
    };
};

export default useRateLimit;

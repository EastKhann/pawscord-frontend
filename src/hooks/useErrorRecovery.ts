/**
 * useErrorRecovery
 *
 * Auto-retry hook for failed API / async operations with:
 *  - Configurable exponential back-off (default: 1 s × 2^attempt, max 30 s)
 *  - Maximum retry ceiling (default: 3)
 *  - Jitter to avoid thundering-herd on reconnect
 *  - Abort-on-unmount via AbortController
 *  - Manual reset / retry surface
 *
 * Usage:
 *   const { data, error, isLoading, retry } = useErrorRecovery(
 *     (signal) => api.get('/api/messages/', { signal }),
 *     { maxRetries: 3, baseDelay: 1000 }
 *   );
 */

import { useCallback, useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ErrorRecoveryOptions {
    /** Maximum number of automatic retry attempts (default: 3). */
    maxRetries?: number;
    /** Base delay in milliseconds — doubled each attempt (default: 1000). */
    baseDelay?: number;
    /** Upper bound for back-off delay in milliseconds (default: 30 000). */
    maxDelay?: number;
    /** Add random jitter ±25% to delay to spread out concurrent retries (default: true). */
    jitter?: boolean;
    /** Whether to start the fetch automatically on mount (default: true). */
    immediate?: boolean;
    /** Extra condition — if false the request is skipped (default: () => true). */
    enabled?: () => boolean;
}

export interface ErrorRecoveryState<T> {
    data: T | null;
    error: Error | null;
    isLoading: boolean;
    attempt: number;
    /** Trigger an immediate manual retry (resets attempt counter). */
    retry: () => void;
    /** Reset state back to initial without triggering a fetch. */
    reset: () => void;
}

// ─── Implementation ───────────────────────────────────────────────────────────

function computeDelay(
    attempt: number,
    baseDelay: number,
    maxDelay: number,
    jitter: boolean
): number {
    const exponential = Math.min(baseDelay * 2 ** attempt, maxDelay);
    if (!jitter) return exponential;
    // ±25 % jitter
    const spread = exponential * 0.25;
    return exponential - spread + Math.random() * spread * 2;
}

export function useErrorRecovery<T>(
    fetchFn: (signal: AbortSignal) => Promise<T>,
    options: ErrorRecoveryOptions = {}
): ErrorRecoveryState<T> {
    const {
        maxRetries = 3,
        baseDelay = 1000,
        maxDelay = 30_000,
        jitter = true,
        immediate = true,
        enabled = () => true,
    } = options;

    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [attempt, setAttempt] = useState(0);

    // Stable ref so the effect can read the latest fetchFn without re-subscribing
    const fetchFnRef = useRef(fetchFn);
    fetchFnRef.current = fetchFn;

    // Incremented to force the effect to re-run on manual retry
    const [retryKey, setRetryKey] = useState(0);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;
        return () => { isMountedRef.current = false; };
    }, []);

    useEffect(() => {
        if (!enabled()) return;

        const abortController = new AbortController();
        let timeoutId: ReturnType<typeof setTimeout>;

        const run = async (currentAttempt: number) => {
            if (!isMountedRef.current) return;

            setIsLoading(true);
            setAttempt(currentAttempt);

            try {
                const result = await fetchFnRef.current(abortController.signal);
                if (!isMountedRef.current) return;
                setData(result);
                setError(null);
                setIsLoading(false);
            } catch (err: unknown) {
                if (!isMountedRef.current) return;

                // Don't retry aborted requests
                if (err instanceof DOMException && err.name === 'AbortError') {
                    setIsLoading(false);
                    return;
                }

                const errObj = err instanceof Error ? err : new Error(String(err));

                if (currentAttempt < maxRetries) {
                    const delay = computeDelay(currentAttempt, baseDelay, maxDelay, jitter);
                    console.warn(
                        `[useErrorRecovery] Attempt ${currentAttempt + 1}/${maxRetries + 1} failed — ` +
                        `retrying in ${Math.round(delay)}ms. Error: ${errObj.message}`
                    );
                    timeoutId = setTimeout(() => run(currentAttempt + 1), delay);
                } else {
                    setError(errObj);
                    setIsLoading(false);
                }
            }
        };

        if (immediate) {
            run(0);
        }

        return () => {
            abortController.abort();
            clearTimeout(timeoutId);
        };
        // retryKey triggers re-run on manual retry
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [retryKey, immediate, maxRetries, baseDelay, maxDelay, jitter]);

    const retry = useCallback(() => {
        setError(null);
        setData(null);
        setAttempt(0);
        setRetryKey((k) => k + 1);
    }, []);

    const reset = useCallback(() => {
        setError(null);
        setData(null);
        setAttempt(0);
        setIsLoading(false);
    }, []);

    return { data, error, isLoading, attempt, retry, reset };
}

// ─── Convenience wrappers ─────────────────────────────────────────────────────

/**
 * useRetryableQuery — thin alias with a more descriptive name for data-fetching
 * scenarios where you just want the retry behaviour and a single result.
 */
export { useErrorRecovery as useRetryableQuery };

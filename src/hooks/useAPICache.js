// frontend/src/hooks/useAPICache.js
// ⚡ SMART API CACHING HOOK
// SWR-like caching with stale-while-revalidate pattern

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// Global cache storage
const globalCache = new Map();
const pendingRequests = new Map();
const subscribers = new Map();

// Cache configuration
const DEFAULT_CONFIG = {
    // How long data stays fresh (5 minutes)
    staleTime: 5 * 60 * 1000,
    // How long to keep in cache (30 minutes)
    cacheTime: 30 * 60 * 1000,
    // Retry on error
    retryCount: 3,
    retryDelay: 1000,
    // Revalidate on focus
    revalidateOnFocus: true,
    // Revalidate on reconnect
    revalidateOnReconnect: true,
    // Dedup interval (prevent duplicate requests)
    dedupingInterval: 2000,
};

/**
 * 🚀 useAPICache - Smart caching hook for API calls
 * 
 * Features:
 * - Automatic caching with stale-while-revalidate
 * - Request deduplication
 * - Automatic revalidation on focus/reconnect
 * - Error retry with exponential backoff
 * - Optimistic updates
 * - Manual cache invalidation
 * 
 * @param {string} key - Unique cache key
 * @param {Function} fetcher - Async function to fetch data
 * @param {Object} options - Configuration options
 * @returns {Object} { data, error, loading, isValidating, mutate, refresh }
 */
export function useAPICache(key, fetcher, options = {}) {
    const config = useMemo(() => ({ ...DEFAULT_CONFIG, ...options }), [options]);

    const [state, setState] = useState(() => {
        const cached = globalCache.get(key);
        return {
            data: cached?.data ?? options.initialData ?? null,
            error: null,
            loading: !cached?.data && !options.initialData,
            isValidating: false,
        };
    });

    const mountedRef = useRef(true);
    const fetcherRef = useRef(fetcher);
    fetcherRef.current = fetcher;

    // Subscribe to cache updates
    useEffect(() => {
        if (!subscribers.has(key)) {
            subscribers.set(key, new Set());
        }
        const subs = subscribers.get(key);
        const callback = (newState) => {
            if (mountedRef.current) {
                setState(prev => ({ ...prev, ...newState }));
            }
        };
        subs.add(callback);

        return () => {
            subs.delete(callback);
            if (subs.size === 0) {
                subscribers.delete(key);
            }
        };
    }, [key]);

    // Broadcast state updates to all subscribers
    const broadcast = useCallback((newState) => {
        const subs = subscribers.get(key);
        if (subs) {
            subs.forEach(cb => cb(newState));
        }
    }, [key]);

    // Core fetch function with retry logic
    const fetchData = useCallback(async (isRevalidation = false) => {
        // Check if request is already pending (deduplication)
        const pending = pendingRequests.get(key);
        if (pending && Date.now() - pending.timestamp < config.dedupingInterval) {
            return pending.promise;
        }

        // Check if cache is still fresh
        const cached = globalCache.get(key);
        if (cached && !isRevalidation) {
            const isFresh = Date.now() - cached.timestamp < config.staleTime;
            if (isFresh) {
                broadcast({ data: cached.data, loading: false, error: null });
                return cached.data;
            }
            // Stale - return cached but revalidate in background
            if (cached.data) {
                broadcast({ data: cached.data, loading: false, isValidating: true });
            }
        }

        if (!isRevalidation) {
            broadcast({ loading: true });
        }
        broadcast({ isValidating: true });

        let lastError;
        for (let attempt = 0; attempt < config.retryCount; attempt++) {
            try {
                const fetchPromise = fetcherRef.current();
                pendingRequests.set(key, { promise: fetchPromise, timestamp: Date.now() });

                const data = await fetchPromise;

                // Update cache
                globalCache.set(key, {
                    data,
                    timestamp: Date.now(),
                    expiry: Date.now() + config.cacheTime,
                });

                pendingRequests.delete(key);
                broadcast({ data, loading: false, error: null, isValidating: false });

                // Schedule cache cleanup
                setTimeout(() => {
                    const cached = globalCache.get(key);
                    if (cached && Date.now() > cached.expiry) {
                        globalCache.delete(key);
                    }
                }, config.cacheTime);

                return data;
            } catch (err) {
                lastError = err;
                if (attempt < config.retryCount - 1) {
                    await new Promise(r => setTimeout(r, config.retryDelay * Math.pow(2, attempt)));
                }
            }
        }

        pendingRequests.delete(key);
        broadcast({ error: lastError, loading: false, isValidating: false });
        throw lastError;
    }, [key, config, broadcast]);

    // Initial fetch
    useEffect(() => {
        mountedRef.current = true;
        if (key && fetcher) {
            fetchData();
        }
        return () => {
            mountedRef.current = false;
        };
    }, [key, fetchData]);

    // Revalidate on focus
    useEffect(() => {
        if (!config.revalidateOnFocus) return;

        const handleFocus = () => {
            const cached = globalCache.get(key);
            if (cached && Date.now() - cached.timestamp > config.staleTime) {
                fetchData(true);
            }
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [key, config.revalidateOnFocus, config.staleTime, fetchData]);

    // Revalidate on reconnect
    useEffect(() => {
        if (!config.revalidateOnReconnect) return;

        const handleOnline = () => {
            fetchData(true);
        };

        window.addEventListener('online', handleOnline);
        return () => window.removeEventListener('online', handleOnline);
    }, [config.revalidateOnReconnect, fetchData]);

    // Manual mutate function (optimistic updates)
    const mutate = useCallback((newData, shouldRevalidate = true) => {
        if (typeof newData === 'function') {
            const cached = globalCache.get(key);
            newData = newData(cached?.data);
        }

        globalCache.set(key, {
            data: newData,
            timestamp: Date.now(),
            expiry: Date.now() + config.cacheTime,
        });

        broadcast({ data: newData });

        if (shouldRevalidate) {
            // Revalidate in background
            fetchData(true).catch(() => { });
        }
    }, [key, config.cacheTime, broadcast, fetchData]);

    // Manual refresh function
    const refresh = useCallback(() => fetchData(true), [fetchData]);

    return {
        data: state.data,
        error: state.error,
        loading: state.loading,
        isValidating: state.isValidating,
        mutate,
        refresh,
    };
}

/**
 * 🗑️ Cache invalidation helpers
 */
export const cacheUtils = {
    // Invalidate specific key
    invalidate: (key) => {
        globalCache.delete(key);
        pendingRequests.delete(key);
    },

    // Invalidate keys matching pattern
    invalidatePattern: (pattern) => {
        const regex = new RegExp(pattern);
        for (const key of globalCache.keys()) {
            if (regex.test(key)) {
                globalCache.delete(key);
                pendingRequests.delete(key);
            }
        }
    },

    // Clear all cache
    clearAll: () => {
        globalCache.clear();
        pendingRequests.clear();
    },

    // Get cache stats
    getStats: () => ({
        size: globalCache.size,
        keys: Array.from(globalCache.keys()),
    }),

    // Prefetch data
    prefetch: async (key, fetcher) => {
        try {
            const data = await fetcher();
            globalCache.set(key, {
                data,
                timestamp: Date.now(),
                expiry: Date.now() + DEFAULT_CONFIG.cacheTime,
            });
            return data;
        } catch (err) {
            console.error('Prefetch error:', err);
            return null;
        }
    },
};

/**
 * 🔗 Hook for paginated/infinite data
 */
export function useInfiniteAPICache(key, fetcher, options = {}) {
    const [pages, setPages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const pageRef = useRef(1);

    const { data, error, loading, refresh } = useAPICache(
        key,
        () => fetcher(1),
        options
    );

    useEffect(() => {
        if (data) {
            setPages([data]);
            pageRef.current = 1;
        }
    }, [data]);

    const loadMore = useCallback(async () => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);
        try {
            const nextPage = pageRef.current + 1;
            const newData = await fetcher(nextPage);

            if (!newData || (Array.isArray(newData) && newData.length === 0)) {
                setHasMore(false);
            } else {
                setPages(prev => [...prev, newData]);
                pageRef.current = nextPage;
            }
        } catch (err) {
            console.error('Load more error:', err);
        } finally {
            setLoadingMore(false);
        }
    }, [fetcher, hasMore, loadingMore]);

    const reset = useCallback(() => {
        setPages([]);
        setHasMore(true);
        pageRef.current = 1;
        refresh();
    }, [refresh]);

    return {
        pages,
        error,
        loading,
        loadingMore,
        hasMore,
        loadMore,
        reset,
    };
}

/**
 * 🎯 Hook for mutations with optimistic updates
 */
export function useMutation(mutationFn, options = {}) {
    const [state, setState] = useState({
        data: null,
        error: null,
        loading: false,
    });

    const mutate = useCallback(async (variables) => {
        setState({ data: null, error: null, loading: true });

        // Optimistic update
        if (options.onMutate) {
            options.onMutate(variables);
        }

        try {
            const data = await mutationFn(variables);
            setState({ data, error: null, loading: false });

            // Invalidate related queries
            if (options.invalidateKeys) {
                options.invalidateKeys.forEach(key => cacheUtils.invalidate(key));
            }

            if (options.onSuccess) {
                options.onSuccess(data, variables);
            }

            return data;
        } catch (err) {
            setState({ data: null, error: err, loading: false });

            // Rollback on error
            if (options.onError) {
                options.onError(err, variables);
            }

            throw err;
        }
    }, [mutationFn, options]);

    return {
        ...state,
        mutate,
        reset: () => setState({ data: null, error: null, loading: false }),
    };
}

export default useAPICache;

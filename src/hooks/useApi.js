// frontend/src/hooks/useApi.js
// 🎣 Custom Hook for API calls with loading, error states, and caching

import { useState, useCallback, useRef, useEffect } from 'react';
import { api, ApiError } from '../services/ApiService';

/**
 * useApi - Main hook for API calls
 * @param {Function|string} endpoint - API function or endpoint string
 * @param {Object} options - Hook options
 * @returns {Object} - { data, loading, error, execute, reset, mutate }
 */
export function useApi(endpoint, options = {}) {
    const {
        immediate = false,
        initialData = null,
        onSuccess,
        onError,
        transform,
        cache = true
    } = options;

    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);
    const mountedRef = useRef(true);
    const abortControllerRef = useRef(null);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
            abortControllerRef.current?.abort();
        };
    }, []);

    const execute = useCallback(async (...args) => {
        // Abort previous request
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        setLoading(true);
        setError(null);

        try {
            let result;

            if (typeof endpoint === 'function') {
                result = await endpoint(...args);
            } else if (typeof endpoint === 'string') {
                const method = options.method || 'GET';
                const body = args[0];
                result = await api.request(endpoint, {
                    method,
                    body,
                    cache,
                    signal: abortControllerRef.current.signal
                });
            }

            if (!mountedRef.current) return;

            const transformedData = transform ? transform(result.data) : result.data;
            setData(transformedData);
            onSuccess?.(transformedData);
            return transformedData;

        } catch (err) {
            if (!mountedRef.current) return;
            if (err.name === 'AbortError') return;

            const apiError = err instanceof ApiError
                ? err
                : new ApiError(err.message, 0, 'UNKNOWN');

            setError(apiError);
            onError?.(apiError);
            throw apiError;

        } finally {
            if (mountedRef.current) {
                setLoading(false);
            }
        }
    }, [endpoint, options.method, cache, transform, onSuccess, onError]);

    // Immediate execution
    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [immediate]); // eslint-disable-line

    const reset = useCallback(() => {
        setData(initialData);
        setError(null);
        setLoading(false);
    }, [initialData]);

    const mutate = useCallback((newData) => {
        setData(prev => typeof newData === 'function' ? newData(prev) : newData);
    }, []);

    return { data, loading, error, execute, reset, mutate };
}

/**
 * useLazyApi - API hook that doesn't execute immediately
 */
export function useLazyApi(endpoint, options = {}) {
    return useApi(endpoint, { ...options, immediate: false });
}

/**
 * useQuery - For GET requests with automatic fetching
 */
export function useQuery(endpoint, options = {}) {
    const { params, deps = [], enabled = true, ...rest } = options;

    const hook = useApi(
        () => api.get(endpoint, { params }),
        { immediate: false, ...rest }
    );

    useEffect(() => {
        if (enabled) {
            hook.execute();
        }
    }, [enabled, ...deps]); // eslint-disable-line

    return hook;
}

/**
 * useMutation - For POST/PUT/PATCH/DELETE requests
 */
export function useMutation(endpoint, options = {}) {
    const { method = 'POST', ...rest } = options;

    return useApi(
        async (body) => {
            switch (method.toUpperCase()) {
                case 'POST':
                    return api.post(endpoint, body);
                case 'PUT':
                    return api.put(endpoint, body);
                case 'PATCH':
                    return api.patch(endpoint, body);
                case 'DELETE':
                    return api.delete(endpoint);
                default:
                    return api.post(endpoint, body);
            }
        },
        { immediate: false, ...rest }
    );
}

/**
 * useInfiniteQuery - For paginated data
 */
export function useInfiniteQuery(endpoint, options = {}) {
    const { pageSize = 20, transform, ...rest } = options;

    const [pages, setPages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const pageRef = useRef(1);

    const fetchPage = useCallback(async (page = 1) => {
        setLoading(true);
        setError(null);

        try {
            const result = await api.get(endpoint, {
                params: { page, page_size: pageSize },
                cache: false
            });

            const newData = transform ? transform(result.data) : result.data;
            const items = Array.isArray(newData) ? newData : newData.results || [];

            if (page === 1) {
                setPages([items]);
            } else {
                setPages(prev => [...prev, items]);
            }

            setHasMore(items.length === pageSize);
            pageRef.current = page;
            return items;

        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [endpoint, pageSize, transform]);

    const fetchNextPage = useCallback(() => {
        if (!loading && hasMore) {
            return fetchPage(pageRef.current + 1);
        }
    }, [loading, hasMore, fetchPage]);

    const refresh = useCallback(() => {
        pageRef.current = 1;
        return fetchPage(1);
    }, [fetchPage]);

    const data = pages.flat();

    return {
        data,
        pages,
        loading,
        error,
        hasMore,
        fetchNextPage,
        refresh,
        currentPage: pageRef.current
    };
}

/**
 * Prefetch data for later use
 */
export async function prefetchQuery(endpoint, params) {
    try {
        await api.get(endpoint, { params });
    } catch (e) {
        console.warn('Prefetch failed:', e);
    }
}

export default useApi;

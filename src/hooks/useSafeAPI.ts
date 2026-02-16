// frontend/src/hooks/useSafeAPI.js
// 🛡️ Safe API calls with automatic error handling

import { useCallback } from 'react';
import useAsyncError from './useAsyncError';
import logger from '../utils/logger';

/**
 * useSafeAPI - Wrapper for safe API calls
 * Automatically handles errors, loading states, and retries
 */
export const useSafeAPI = () => {
    const { execute, loading, error, data, reset } = useAsyncError();

    const safeFetch = useCallback(async (url, options = {}) => {
        try {
            const result = await execute(async () => {
                logger.log('🌐 API Call:', url);

                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    ...options
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                logger.log('✅ API Response:', url, data);
                return data;
            });

            return result;
        } catch (err) {
            logger.error('❌ API Error:', url, err);
            throw err;
        }
    }, [execute]);

    const safePost = useCallback(async (url, body, options = {}) => {
        return safeFetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            ...options
        });
    }, [safeFetch]);

    const safePut = useCallback(async (url, body, options = {}) => {
        return safeFetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            ...options
        });
    }, [safeFetch]);

    const safeDelete = useCallback(async (url, options = {}) => {
        return safeFetch(url, {
            method: 'DELETE',
            ...options
        });
    }, [safeFetch]);

    return {
        // HTTP methods
        get: safeFetch,
        post: safePost,
        put: safePut,
        delete: safeDelete,

        // State
        loading,
        error,
        data,
        reset,

        // Utils
        isLoading: loading,
        hasError: !!error,
        isSuccess: !loading && !error && data !== null
    };
};

export default useSafeAPI;




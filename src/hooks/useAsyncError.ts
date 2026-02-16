// frontend/src/hooks/useAsyncError.ts
// Async operations error handling hook

import { useState, useCallback } from 'react';
import logger from '../utils/logger';

interface UseAsyncErrorResult<T = unknown> {
    execute: (asyncFunction: (...args: unknown[]) => Promise<T>, ...args: unknown[]) => Promise<T>;
    loading: boolean;
    error: string | null;
    data: T | null;
    reset: () => void;
}

const useAsyncError = <T = unknown>(): UseAsyncErrorResult<T> => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const execute = useCallback(async (asyncFunction, ...args) => {
        setLoading(true);
        setError(null);

        try {
            const result = await asyncFunction(...args);
            setData(result);
            return result;
        } catch (err) {
            const errorMessage = err.message || 'Bir hata oluştu';
            setError(errorMessage);
            logger.error('useAsyncError caught:', err);
            throw err; // Re-throw if caller wants to handle
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setLoading(false);
        setError(null);
        setData(null);
    }, []);

    return {
        execute,
        loading,
        error,
        data,
        reset
    };
};

export default useAsyncError;




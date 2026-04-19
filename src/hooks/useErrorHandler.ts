// frontend/src/hooks/useErrorHandler.ts
// 🪝 React hook for unified error handling — reports + toasts in one call

import { useCallback } from 'react';
import ErrorReporter from '../utils/errorReporter';

interface ErrorContext {
    component?: string;
    [key: string]: unknown;
}

/**
 * Returns a memoized error handler that:
 * 1. Reports the error to ErrorReporter (central log)
 * 2. Shows a toast notification to the user
 *
 * Usage:
 *   const handleError = useErrorHandler();
 *   try { ... } catch (err) { handleError(err, { component: 'ChatArea' }); }
 */
export const useErrorHandler = () => {
    return useCallback((error: Error | unknown, context: ErrorContext = {}) => {
        // 1. Central reporting
        ErrorReporter.report(error, context);

        // 2. User-visible toast (lazy-import to avoid hard dep)
        const message = (error as Error)?.message || 'An error occurred';
        try {
            // Try react-hot-toast first (most common in this project)
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const toast = require('react-hot-toast').default ?? require('react-hot-toast');
            if (typeof toast?.error === 'function') {
                toast.error(message);
            } else if (typeof toast === 'function') {
                toast(message);
            }
        } catch {
            // Fallback: custom toast util
            try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const { showToast } = require('../utils/toast');
                showToast?.(message, 'error');
            } catch {
                // Last resort: console only (already logged above)
            }
        }
    }, []);
};

export default useErrorHandler;

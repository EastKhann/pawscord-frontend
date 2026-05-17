// frontend/src/hooks/useErrorHandler.ts
// 🪝 React hook for unified error handling — reports + toasts in one call

import { useCallback } from 'react';
import ErrorReporter from '../utils/errorReporter';
import toast from '../utils/toast';

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
    return useCallback((error: unknown, context: ErrorContext = {}) => {
        // 1. Central reporting
        ErrorReporter.report(error instanceof Error ? error : new Error(String(error)), context);

        // 2. User-visible toast
        const message = error instanceof Error ? error.message : String(error) || 'An error occurred';
        toast.error(message);
    }, []);
};

export default useErrorHandler;

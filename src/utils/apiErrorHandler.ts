// frontend/src/utils/apiErrorHandler.ts
// 🌐 Centralized API error classification and handling

type ApiErrorSeverity = 'info' | 'warning' | 'error' | 'critical';

interface ClassifiedError {
    message: string;
    severity: ApiErrorSeverity;
    retryable: boolean;
    statusCode: number | null;
}

/**
 * Classifies an API error into a user-friendly message with retry guidance.
 * Used by useFetchWithAuth and ApiService for consistent error UX.
 */
export function classifyApiError(error: unknown): ClassifiedError {
    // Network / fetch errors
    if (
        error instanceof TypeError &&
        (error.message.includes('fetch') || error.message.includes('network'))
    ) {
        return {
            message: 'Network connection lost. Please check your internet.',
            severity: 'warning',
            retryable: true,
            statusCode: null,
        };
    }

    // AbortError (request cancelled / timeout)
    if (error instanceof DOMException && error.name === 'AbortError') {
        return {
            message: 'Request timed out. Please try again.',
            severity: 'info',
            retryable: true,
            statusCode: null,
        };
    }

    // HTTP status-based classification
    const status =
        ((error as Record<string, unknown>)?.status as number | undefined) ??
        ((error as Record<string, unknown>)?.statusCode as number | undefined);

    if (typeof status === 'number') {
        switch (true) {
            case status === 401:
                return {
                    message: 'Session expired. Please log in again.',
                    severity: 'warning',
                    retryable: false,
                    statusCode: 401,
                };
            case status === 403:
                return {
                    message: "You don't have permission for this action.",
                    severity: 'warning',
                    retryable: false,
                    statusCode: 403,
                };
            case status === 404:
                return {
                    message: 'The requested resource was not found.',
                    severity: 'info',
                    retryable: false,
                    statusCode: 404,
                };
            case status === 409:
                return {
                    message: 'Conflict — this action was already performed.',
                    severity: 'info',
                    retryable: false,
                    statusCode: 409,
                };
            case status === 429:
                return {
                    message: 'Too many requests. Please slow down.',
                    severity: 'warning',
                    retryable: true,
                    statusCode: 429,
                };
            case status >= 500:
                return {
                    message: 'Server error. Our team has been notified.',
                    severity: 'error',
                    retryable: true,
                    statusCode: status,
                };
            default:
                return {
                    message: `Request failed (${status}).`,
                    severity: 'warning',
                    retryable: status >= 500,
                    statusCode: status,
                };
        }
    }

    // Fallback
    const msg = (error as Error)?.message || 'An unexpected error occurred.';
    return { message: msg, severity: 'error', retryable: false, statusCode: null };
}

/**
 * Returns true if the error is safe to retry (network, timeout, 5xx).
 */
export function isRetryableError(error: unknown): boolean {
    return classifyApiError(error).retryable;
}

export type { ClassifiedError, ApiErrorSeverity };

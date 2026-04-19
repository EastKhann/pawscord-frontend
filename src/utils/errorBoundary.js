// frontend/src/utils/errorBoundary.js

/**
 * 🛡️ Error Boundary & Error Handling
 * Comprehensive error handling system
 */

import React from 'react';

import PropTypes from 'prop-types';
import logger from '../utils/logger';

// -- extracted inline style constants --
const _st1 = {
    padding: '20px',
    margin: '20px',
    border: '2px solid #f44336',
    borderRadius: '8px',
    backgroundColor: '#ffebee',
};
const _st2 = { color: '#c62828', margin: '0 0 10px 0' };
const _st3 = { color: '#666', margin: '0 0 15px 0' };
const _st4 = { marginBottom: '15px' };
const _st5 = { cursor: 'pointer', color: '#666' };
const _st6 = {
    fontSize: '12px',
    overflow: 'auto',
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginTop: '10px',
};
const _st7 = {
    padding: '10px 20px',
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
};

/**
 * Error Logger
 */
class ErrorLogger {
    constructor(options = {}) {
        this.endpoint = options.endpoint || '/api/errors';
        this.maxErrors = options.maxErrors || 50;
        this.errors = [];
        this.enabled = options.enabled !== false;
    }

    /**
     * Log error
     */
    log(error, errorInfo = {}) {
        const errorData = {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            ...errorInfo,
        };

        this.errors.push(errorData);

        // Limit stored errors
        if (this.errors.length > this.maxErrors) {
            this.errors.shift();
        }

        if (import.meta.env.MODE === 'development') {
            logger.error('🛡️ [ErrorBoundary]', errorData);
        }

        // Send to server
        if (this.enabled && import.meta.env.MODE === 'production') {
            this.sendToServer(errorData);
        }

        return errorData;
    }

    /**
     * Send error to server
     */
    async sendToServer(errorData) {
        try {
            await fetch(this.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(errorData),
            });
        } catch (err) {
            logger.error('Failed to send error to server:', err);
        }
    }

    /**
     * Get all errors
     */
    getErrors() {
        return this.errors;
    }

    /**
     * Clear errors
     */
    clear() {
        this.errors = [];
    }
}

// Global error logger
export const errorLogger = new ErrorLogger();

/**
 * React Error Boundary Component
 */
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            errorCount: 0,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        const errorData = errorLogger.log(error, {
            componentStack: errorInfo.componentStack,
            component: this.props.name || 'Unknown',
        });

        this.setState({
            error,
            errorInfo,
            errorCount: this.state.errorCount + 1,
        });

        // Call custom error handler
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });

        if (this.props.onReset) {
            this.props.onReset();
        }
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback({
                    error: this.state.error,
                    errorInfo: this.state.errorInfo,
                    reset: this.handleReset,
                });
            }

            // Default fallback UI
            return (
                <div aria-label="use error handler" style={_st1}>
                    <h2 style={_st2}>⚠️ Bir Error Oluştu</h2>
                    <p style={_st3}>Sorry, something went wrong.</p>
                    {import.meta.env.MODE === 'development' && (
                        <details style={_st4}>
                            <summary style={_st5}>Error Details</summary>
                            <pre style={_st6}>
                                {this.state.error && this.state.error.toString()}
                                {'\n\n'}
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </pre>
                        </details>
                    )}
                    <button onClick={this.handleReset} style={_st7}>
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

/**
 * React Hook - Error Handler
 */
export const useErrorHandler = () => {
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    const handleError = React.useCallback((error) => {
        errorLogger.log(error);
        setError(error);
    }, []);

    const resetError = React.useCallback(() => {
        setError(null);
    }, []);

    return { error, handleError, resetError };
};

/**
 * Global error handlers
 */
export const setupGlobalErrorHandlers = () => {
    // Unhandled errors
    window.addEventListener('error', (event) => {
        errorLogger.log(event.error || new Error(event.message), {
            type: 'uncaught',
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
        });
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        errorLogger.log(new Error(event.reason), {
            type: 'unhandledRejection',
            promise: event.promise,
        });
    });

    // Console errors (optional)
    const originalConsoleError = console.error;
    console.error = (...args) => {
        if (args[0] instanceof Error) {
            errorLogger.log(args[0], { type: 'console' });
        }
        originalConsoleError.apply(console, args);
    };
};

/**
 * Try-catch wrapper
 */
export const tryCatch = async (fn, fallback = null) => {
    try {
        return await fn();
    } catch (error) {
        errorLogger.log(error);
        return fallback;
    }
};

/**
 * Retry wrapper
 */
export const retry = async (fn, options = {}) => {
    const { maxAttempts = 3, delay = 1000, backoff = 2, onRetry } = options;

    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            if (attempt < maxAttempts) {
                const waitTime = delay * Math.pow(backoff, attempt - 1);

                if (onRetry) {
                    onRetry(attempt, maxAttempts, waitTime);
                }

                await new Promise((resolve) => setTimeout(resolve, waitTime));
            }
        }
    }

    errorLogger.log(lastError, {
        type: 'retry-failed',
        attempts: maxAttempts,
    });

    throw lastError;
};

/**
 * Circuit breaker pattern
 */
export class CircuitBreaker {
    constructor(fn, options = {}) {
        this.fn = fn;
        this.failureThreshold = options.failureThreshold || 5;
        this.timeout = options.timeout || 60000;
        this.resetTimeout = options.resetTimeout || 30000;

        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.failures = 0;
        this.nextAttempt = Date.now();
    }

    async execute(...args) {
        if (this.state === 'OPEN') {
            if (Date.now() < this.nextAttempt) {
                throw new Error('Circuit breaker is OPEN');
            }
            this.state = 'HALF_OPEN';
        }

        try {
            const result = await Promise.race([
                this.fn(...args),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout')), this.timeout)
                ),
            ]);

            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }

    onSuccess() {
        this.failures = 0;
        this.state = 'CLOSED';
    }

    onFailure() {
        this.failures++;

        if (this.failures >= this.failureThreshold) {
            this.state = 'OPEN';
            this.nextAttempt = Date.now() + this.resetTimeout;

            errorLogger.log(new Error('Circuit breaker opened'), {
                failures: this.failures,
                threshold: this.failureThreshold,
            });
        }
    }
}

ErrorBoundary.propTypes = {};

export default ErrorBoundary;

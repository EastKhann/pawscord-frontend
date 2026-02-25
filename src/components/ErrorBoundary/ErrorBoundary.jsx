/**
 * 🛡️ Error Boundary Component
 * Catch React errors and show fallback UI
 */

import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            errorCount: 0
        };
    }

    componentDidMount() {
        // Clear chunk-reload flag so future deploys can trigger another auto-reload
        sessionStorage.removeItem('chunk_reload_attempted');
    }

    static getDerivedStateFromError(error) {
        // Vite/Webpack chunk load failure → auto-reload once instead of showing error UI
        const isChunkError =
            error?.name === 'ChunkLoadError' ||
            error?.message?.includes('dynamically imported module') ||
            error?.message?.includes('Loading chunk') ||
            error?.message?.includes('Failed to fetch');

        if (isChunkError) {
            const KEY = 'chunk_reload_attempted';
            if (!sessionStorage.getItem(KEY)) {
                sessionStorage.setItem(KEY, '1');
                window.location.reload();
                return { hasError: false }; // prevent render during reload
            }
            // Already reloaded once — fall through to error UI
        }

        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log to error reporting service (e.g., Sentry)
        console.error('Error Boundary caught error:', error, errorInfo);

        this.setState({
            error,
            errorInfo,
            errorCount: this.state.errorCount + 1
        });

        // Send to error tracking service
        if (window.gtag) {
            window.gtag('event', 'exception', {
                description: error.toString(),
                fatal: false
            });
        }

        // Report to backend
        this.reportError(error, errorInfo);
    }

    reportError = async (error, errorInfo) => {
        try {
            const apiBase = (typeof window !== 'undefined' && window.__PAWSCORD_API_BASE__)
                || import.meta.env?.VITE_API_BASE_URL
                || 'https://api.pawscord.com/api';
            const token = localStorage.getItem('access_token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            await fetch(`${apiBase}/errors/report/`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    error: error.toString(),
                    stack: errorInfo.componentStack,
                    url: window.location.href,
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (err) {
            // Silently fail — error reporting should never cause more errors
        }
    };

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    render() {
        if (this.state.hasError) {
            // Too many errors - show critical error
            if (this.state.errorCount > 3) {
                return (
                    <div className="error-boundary critical">
                        <div className="error-content">
                            <h1>⚠️ Critical Error</h1>
                            <p>Multiple errors detected. Please refresh the page.</p>
                            <button onClick={() => window.location.reload()} className="btn-reload">
                                Refresh Page
                            </button>
                        </div>
                    </div>
                );
            }

            return (
                <div className="error-boundary">
                    <div className="error-content">
                        <div className="error-icon">😕</div>
                        <h1>Oops! Something went wrong</h1>
                        <p className="error-message">
                            {this.props.fallbackMessage || "We're sorry for the inconvenience. The error has been reported."}
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="error-details">
                                <summary>Error Details (Development Only)</summary>
                                <div className="error-stack">
                                    <p><strong>Error:</strong> {this.state.error.toString()}</p>
                                    <pre>{this.state.errorInfo?.componentStack}</pre>
                                </div>
                            </details>
                        )}

                        <div className="error-actions">
                            <button onClick={this.handleReset} className="btn-retry">
                                Try Again
                            </button>
                            <button onClick={() => window.location.href = '/'} className="btn-home">
                                Go Home
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

/**
 * Functional Error Boundary Hook (for smaller components)
 */
export const useErrorHandler = () => {
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    return setError;
};

export default ErrorBoundary;

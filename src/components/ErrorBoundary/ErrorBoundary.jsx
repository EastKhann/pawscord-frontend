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

    static getDerivedStateFromError(error) {
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
            await fetch('/api/errors/report/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    error: error.toString(),
                    stack: errorInfo.componentStack,
                    url: window.location.href,
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (err) {
            console.error('Failed to report error:', err);
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

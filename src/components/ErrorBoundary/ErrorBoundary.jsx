import { getToken } from '../../utils/tokenStorage';
/**
 * 🛡️ Error Boundary Component
 * Catch React errors and show fallback UI
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import './ErrorBoundary.css';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
import * as Sentry from '@sentry/react';

class ErrorBoundary extends React.Component {
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
        // Vite/Webpack chunk load failure → delegate to unified chunk reload handler
        const isChunkError =
            error?.name === 'ChunkLoadError' ||
            error?.message?.includes('dynamically imported module') ||
            error?.message?.includes('Loading chunk') ||
            error?.message?.includes('Failed to fetch');

        if (isChunkError) {
            // 🔧 FIX: Use the SAME counter as lazyWithRetry (no separate key)
            // This prevents ErrorBoundary from adding extra reloads on top of lazyWithRetry's limit
            const CHUNK_RELOAD_COUNT_KEY = 'pawscord_chunk_reload_count';
            const reloadCount = parseInt(sessionStorage.getItem(CHUNK_RELOAD_COUNT_KEY) || '0', 10);
            if (reloadCount < 1) {
                // Import would create a circular dep — inline the cache-busting reload
                const now = Date.now();
                sessionStorage.setItem('pawscord_chunk_reload', now.toString());
                sessionStorage.setItem(CHUNK_RELOAD_COUNT_KEY, (reloadCount + 1).toString());
                const url = new URL(window.location.href);
                url.searchParams.set('_cr', now.toString());
                window.location.replace(url.toString());
                return { hasError: false }; // prevent render during reload
            }
            // Already reloaded — fall through to error UI
        }

        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log to error reporting service (e.g., Sentry)
        logger.error('Error Boundary caught error:', error, errorInfo);

        this.setState({
            error,
            errorInfo,
            errorCount: this.state.errorCount + 1,
        });

        // Capture in Sentry with component stack context
        Sentry.captureException(error, {
            contexts: {
                react: { componentStack: errorInfo.componentStack },
            },
        });

        // Send to error tracking service
        if (window.gtag) {
            window.gtag('event', 'exception', {
                description: error.toString(),
                fatal: false,
            });
        }

        // Report to backend
        this.reportError(error, errorInfo);
    }

    reportError = async (error, errorInfo) => {
        try {
            const apiBase =
                (typeof window !== 'undefined' && window.__PAWSCORD_API_BASE__) ||
                import.meta.env?.VITE_API_BASE_URL ||
                'https://api.pawscord.com/api';
            const token = getToken();
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
                    timestamp: new Date().toISOString(),
                }),
            });
        } catch (err) {
            // Swithntly fail — error reporting should never cause more errors
        }
    };

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render() {
        if (this.state.hasError) {
            // Too many errors - show critical error
            const { t } = this.props;

            if (this.state.errorCount > 3) {
                return (
                    <div
                        aria-label="use error handler"
                        className="error-boundary critical"
                        role="alert"
                        aria-live="assertive"
                    >
                        <div className="error-content">
                            <h1>⚠️ {t('errors.criticalError')}</h1>
                            <p>{t('errors.multipleErrors')}</p>
                            <button onClick={() => window.location.reload()} className="btn-reload">
                                {t('errors.refreshPage')}
                            </button>
                        </div>
                    </div>
                );
            }

            return (
                <div className="error-boundary" role="alert" aria-live="assertive">
                    <div className="error-content">
                        <div className="error-icon">😕</div>
                        <h1>{t('errors.somethingWrong')}</h1>
                        <p className="error-message">
                            {this.props.fallbackMessage || t('errors.errorReported')}
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="error-details">
                                <summary>{t('error_details_development_only')}</summary>
                                <div className="error-stack">
                                    <p>
                                        <strong>{t('error')}</strong> {this.state.error.toString()}
                                    </p>
                                    <pre>{this.state.errorInfo?.componentStack}</pre>
                                </div>
                            </details>
                        )}

                        <div className="error-actions">
                            <button onClick={this.handleReset} className="btn-retry">
                                {t('errors.tryAgain')}
                            </button>
                            <button
                                onClick={() => (window.location.href = '/')}
                                className="btn-home"
                            >
                                {t('errors.goHome')}
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

ErrorBoundary.propTypes = {};

export default withTranslation()(ErrorBoundary);

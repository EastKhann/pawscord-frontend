/**
 * RouteErrorBoundary — per-route error boundary with retry.
 *
 * Catches runtime errors within a single route so that a crash in one
 * feature area (e.g. /crypto-analysis) doesn't nuke the entire app.
 * Shows a user-friendly error card with a "Try Again" (Retry) button.
 *
 * Usage:
 *   <Route path="/crypto" element={
 *     <RouteErrorBoundary>
 *       <React.Suspense fallback={<LoadingSkeleton />}
 *         <CryptoPage />
 *       </React.Suspense>
 *     </RouteErrorBoundary>
 *   } />
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import './RouteErrorBoundary.css';

import PropTypes from 'prop-types';
import logger from '../../utils/logger';

class RouteErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log to Sentry / console in production
        logger.error('[RouteErrorBoundary]', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            // If a custom fallback is provided, use it
            if (this.props.fallback) {
                return typeof this.props.fallback === 'function'
                    ? this.props.fallback({ error: this.state.error, retry: this.handleRetry })
                    : this.props.fallback;
            }

            const { t } = this.props;

            return (
                <div role="alert" aria-live="assertive" className="route-error-container">
                    <h2 className="route-error-heading">{t('errors.errorOccurred')}</h2>
                    <p className="route-error-message">{t('errors.unexpectedError')}</p>
                    <div className="route-error-actions">
                        <button
                            onClick={this.handleRetry}
                            aria-label={t('errors.tryAgain')}
                            className="route-error-retry"
                        >
                            {t('errors.tryAgain')}
                        </button>
                        <button
                            onClick={() => (window.location.hash = '#/')}
                            aria-label={t('errors.goHome')}
                            className="route-error-home"
                        >
                            {t('errors.goHome')}
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

RouteErrorBoundary.propTypes = {};

export default withTranslation()(RouteErrorBoundary);

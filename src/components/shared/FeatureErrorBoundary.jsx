import { getToken } from '../../utils/tokenStorage';
/**
 * 🛡️ Feature Error Boundary - Granular error isolation
 * Wraps individual features so one crash doesn't take down the entire app.
 * Usage:
 *   <FeatureErrorBoundary name="VoiceChat" fallback={<p>Voice chat unavailable</p>}
 *     <VoiceChatPanel />
 *   </FeatureErrorBoundary>
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';

import PropTypes from 'prop-types';
import logger from '../../utils/logger';

class FeatureErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            retryCount: 0,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        const featureName = this.props.name || 'Unknown Feature';
        logger.error(`[${featureName}] Error:`, error, errorInfo);

        // Report to backend silently
        try {
            const apiBase =
                (typeof window !== 'undefined' && window.__PAWSCORD_API_BASE__) ||
                'https://api.pawscord.com/api';
            const token = getToken();
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            fetch(`${apiBase}/errors/report/`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    error: error.toString(),
                    feature: featureName,
                    stack: errorInfo.componentStack?.substring(0, 1000),
                    url: window.location.href,
                    timestamp: new Date().toISOString(),
                }),
            }).catch(() => {}); // silent
        } catch (e) {
            /* silent */
        }
    }

    handleRetry = () => {
        this.setState((prev) => ({
            hasError: false,
            error: null,
            retryCount: prev.retryCount + 1,
        }));
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback from props
            if (this.props.fallback) {
                return typeof this.props.fallback === 'function'
                    ? this.props.fallback({ error: this.state.error, retry: this.handleRetry })
                    : this.props.fallback;
            }

            // Max retries reached
            const { t } = this.props;

            if (this.state.retryCount >= 3) {
                return (
                    <div style={styles.container}>
                        <div style={styles.icon}>⚠️</div>
                        <p style={styles.text}>
                            {t('errors.featureUnavailable', {
                                name:
                                    this.props.name ||
                                    t('errors.featureUnavailable_default', 'This feature'),
                            })}
                        </p>
                        <button
                            aria-label="button"
                            onClick={() => window.location.reload()}
                            style={styles.button}
                        >
                            {t('errors.refreshPage')}
                        </button>
                    </div>
                );
            }

            // Default fallback with retry button
            return (
                <div style={styles.container}>
                    <div style={styles.icon}>😕</div>
                    <p style={styles.text}>
                        {t('errors.loadError', {
                            name: this.props.name || t('errors.loadError_default', 'This section'),
                        })}
                    </p>
                    <button
                        aria-label="this handle Retry"
                        onClick={this.handleRetry}
                        style={styles.button}
                    >
                        {t('errors.tryAgain')}
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        minHeight: '100px',
        background: '#111214',
        borderRadius: '8px',
        margin: '8px',
    },
    icon: {
        fontSize: '32px',
        marginBottom: '8px',
    },
    text: {
        color: '#b5bac1',
        fontSize: '14px',
        textAlign: 'center',
        margin: '0 0 12px 0',
    },
    button: {
        background: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 16px',
        fontSize: '13px',
        cursor: 'pointer',
    },
};

FeatureErrorBoundary.propTypes = {};

export default withTranslation()(FeatureErrorBoundary);

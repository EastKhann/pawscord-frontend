// frontend/src/components/ErrorBoundary/EnhancedErrorBoundary.js
// 🛡️ ENHANCED ERROR BOUNDARY with Recovery & Reporting

import { Component, createContext, useContext } from 'react';
import {
    FaExclamationTriangle,
    FaRedo,
    FaHome,
    FaBug,
    FaChevronDown,
    FaChevronUp,
} from 'react-icons/fa';

import PropTypes from 'prop-types';
import { useTranslation, withTranslation } from 'react-i18next';
import logger from '../../utils/logger';

// Error Context for child components
const ErrorContext = createContext(null);

export const useError = () => useContext(ErrorContext);

/**
 * 🛡️ EnhancedErrorBoundary
 *
 * Features:
 * - Automatic error recovery attempts
 * - Error reporting to backend
 * - User-friendly error UI
 * - Stack trace visibility toggle
 * - Reset functionality
 * - Fallback component support
 */
class EnhancedErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            showDetails: false,
            recoveryAttempts: 0,
            isReporting: false,
            reportSent: false,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });

        // Log to console in development
        if (import.meta.env.MODE === 'development') {
            logger.error('🔴 ErrorBoundary caught:', error);
            logger.error('📍 Component Stack:', errorInfo?.componentStack);
        }

        // Auto-report to backend (production only)
        if (import.meta.env.MODE === 'production' && this.props.reportErrors !== false) {
            this.reportError(error, errorInfo);
        }

        // Call onError callback if provided
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }

        // Attempt auto-recovery if configured
        if (
            this.props.autoRecovery &&
            this.state.recoveryAttempts < (this.props.maxRecoveryAttempts || 3)
        ) {
            setTimeout(() => {
                this.handleRecovery();
            }, this.props.recoveryDelay || 2000);
        }
    }

    reportError = async (error, errorInfo) => {
        if (this.state.isReporting) return;

        this.setState({ isReporting: true });

        try {
            const errorReport = {
                message: error?.message || 'Unknown error',
                stack: error?.stack,
                componentStack: errorInfo?.componentStack,
                url: window.location.href,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString(),
                recoveryAttempts: this.state.recoveryAttempts,
                context: this.props.context || 'unknown',
            };

            // Send to error reporting endpoint
            if (this.props.reportEndpoint) {
                await fetch(this.props.reportEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(errorReport),
                });
            }

            // Also log to analytics if available
            if (window.gtag) {
                window.gtag('event', 'exception', {
                    description: error?.message,
                    fatal: true,
                });
            }

            this.setState({ reportSent: true });
        } catch (reportError) {
            logger.error('Failed to report error:', reportError);
        } finally {
            this.setState({ isReporting: false });
        }
    };

    handleRecovery = () => {
        this.setState((prev) => ({
            hasError: false,
            error: null,
            errorInfo: null,
            showDetails: false,
            recoveryAttempts: prev.recoveryAttempts + 1,
        }));
    };

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
            showDetails: false,
            recoveryAttempts: 0,
            reportSent: false,
        });

        // Call onReset callback if provided
        if (this.props.onReset) {
            this.props.onReset();
        }
    };

    toggleDetails = () => {
        this.setState((prev) => ({ showDetails: !prev.showDetails }));
    };

    render() {
        const {
            hasError,
            error,
            errorInfo,
            showDetails,
            recoveryAttempts,
            isReporting,
            reportSent,
        } = this.state;
        const {
            children,
            fallback,
            FallbackComponent,
            level = 'page', // 'page', 'section', 'component'
            showHomeButton = true,
            showReportButton = true,
        } = this.props;

        if (hasError) {
            // Custom fallback component
            if (FallbackComponent) {
                return (
                    <FallbackComponent
                        error={error}
                        errorInfo={errorInfo}
                        resetError={this.handleReset}
                        recoveryAttempts={recoveryAttempts}
                    />
                );
            }

            // Custom fallback element
            if (fallback) {
                return fallback;
            }

            // Default error UI based on level
            const t = this.props.t || ((k) => k);
            return (
                <div
                    style={styles[level]?.container || styles.page.container}
                    role="alert"
                    aria-live="assertive"
                >
                    <div style={styles.content}>
                        <div style={styles.iconWrapper}>
                            <FaExclamationTriangle
                                size={level === 'component' ? 24 : 48}
                                color="#f23f42"
                            />
                        </div>

                        <h2 style={styles.title}>
                            {level === 'component'
                                ? 'Bir hata oluştu'
                                : t('ui.uzgunuz_bir_seyler_yanlis_gitti')}
                        </h2>

                        <p style={styles.message}>
                            {error?.message || t('ui.beklenmeyen_bir_hata_olustu_please_tekra')}
                        </p>

                        {recoveryAttempts > 0 && (
                            <p style={styles.recoveryInfo}>
                                Otomatik kurtarma denemeleri: {recoveryAttempts}
                            </p>
                        )}

                        <div style={styles.actions}>
                            <button
                                onClick={this.handleReset}
                                style={styles.primaryButton}
                                aria-label="Try again"
                            >
                                <FaRedo size={14} />
                                <span>{t('tekrar_dene')}</span>
                            </button>

                            {showHomeButton && level === 'page' && (
                                <button
                                    onClick={() => (window.location.href = '/')}
                                    style={styles.secondaryButton}
                                    aria-label="Ana pageya git"
                                >
                                    <FaHome size={14} />
                                    <span>{t('ana_sayfa')}</span>
                                </button>
                            )}

                            {showReportButton && !reportSent && (
                                <button
                                    onClick={() => this.reportError(error, errorInfo)}
                                    style={styles.ghostButton}
                                    disabled={isReporting}
                                    aria-label={t('ui.erroryi_bildir')}
                                >
                                    <FaBug size={14} />
                                    <span>
                                        {isReporting ? 'Raporlanıyor...' : t('ui.erroryi_report')}
                                    </span>
                                </button>
                            )}

                            {reportSent && (
                                <span style={styles.reportedBadge}>{t('✓_error_bildirildi')}</span>
                            )}
                        </div>

                        {import.meta.env.MODE === 'development' && (
                            <div style={styles.devInfo}>
                                <button
                                    onClick={this.toggleDetails}
                                    style={styles.detailsToggle}
                                    aria-expanded={showDetails}
                                >
                                    {showDetails ? <FaChevronUp /> : <FaChevronDown />}
                                    <span>{t('teknik_detaylar')}</span>
                                </button>

                                {showDetails && (
                                    <div style={styles.details}>
                                        <div style={styles.detailSection}>
                                            <strong>{t('error')}</strong>
                                            <pre style={styles.stackTrace}>{error?.stack}</pre>
                                        </div>
                                        {errorInfo?.componentStack && (
                                            <div style={styles.detailSection}>
                                                <strong>{t('component_stack')}</strong>
                                                <pre style={styles.stackTrace}>
                                                    {errorInfo.componentStack}
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // Wrap children with error context
        return (
            <ErrorContext.Provider value={{ reportError: this.reportError }}>
                {children}
            </ErrorContext.Provider>
        );
    }
}

// Styles
const styles = {
    page: {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#17191c',
            padding: '20px',
        },
    },
    section: {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            backgroundColor: '#111214',
            borderRadius: '8px',
            margin: '20px 0',
        },
    },
    component: {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: 'rgba(240, 71, 71, 0.1)',
            borderRadius: '4px',
            border: '1px solid rgba(240, 71, 71, 0.3)',
        },
    },
    content: {
        textAlign: 'center',
        maxWidth: '500px',
        color: '#dbdee1',
    },
    iconWrapper: {
        marginBottom: '20px',
    },
    title: {
        margin: '0 0 12px 0',
        fontSize: '24px',
        fontWeight: '600',
        color: '#fff',
    },
    message: {
        margin: '0 0 20px 0',
        fontSize: '14px',
        color: '#b5bac1',
        lineHeight: '1.5',
    },
    recoveryInfo: {
        margin: '0 0 16px 0',
        fontSize: '12px',
        color: '#949ba4',
    },
    actions: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '20px',
    },
    primaryButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    secondaryButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        backgroundColor: '#4e5058',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
    },
    ghostButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        backgroundColor: 'transparent',
        color: '#b5bac1',
        border: '1px solid #4e5058',
        borderRadius: '4px',
        fontSize: '14px',
        cursor: 'pointer',
    },
    reportedBadge: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 16px',
        color: '#23a559',
        fontSize: '14px',
    },
    devInfo: {
        marginTop: '20px',
        textAlign: 'left',
    },
    detailsToggle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        backgroundColor: 'transparent',
        color: '#949ba4',
        border: '1px solid #182135',
        borderRadius: '4px',
        fontSize: '12px',
        cursor: 'pointer',
        width: '100%',
        justifyContent: 'center',
    },
    details: {
        marginTop: '12px',
        backgroundColor: '#0d0e10',
        borderRadius: '4px',
        padding: '12px',
        maxHeight: '300px',
        overflowY: 'auto',
    },
    detailSection: {
        marginBottom: '12px',
    },
    stackTrace: {
        margin: '8px 0 0 0',
        padding: '8px',
        backgroundColor: '#18191c',
        borderRadius: '4px',
        fontSize: '11px',
        color: '#f23f42',
        overflow: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
    },
};

// HOC for wrapping components
export const withErrorBoundary = (Component, errorBoundaryProps = {}) => {
    const WrappedComponent = (props) => {
        const { t } = useTranslation();
        return (
            <EnhancedErrorBoundary {...errorBoundaryProps}>
                <Component {...props} />
            </EnhancedErrorBoundary>
        );
    };
    WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || 'Component'})`;
    return WrappedComponent;
};

export default withTranslation()(EnhancedErrorBoundary);

// frontend/src/components/common/GlobalErrorBoundary.js
// 🛡️ ENTERPRISE-GRADE ERROR BOUNDARY
// Catches all React errors and provides graceful recovery

import React, { Component } from 'react';
import { FaExclamationTriangle, FaRedo, FaHome, FaBug } from 'react-icons/fa';

/**
 * Error severity levels
 */
const ERROR_SEVERITY = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical'
};

/**
 * GlobalErrorBoundary - Catches and handles React errors
 */
class GlobalErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            errorId: null,
            severity: ERROR_SEVERITY.MEDIUM,
            recoveryAttempts: 0
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        const errorId = `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const severity = this.calculateSeverity(error);

        this.setState({
            errorInfo,
            errorId,
            severity
        });

        // Log error to console
        console.error('🚨 [ErrorBoundary] Caught error:', {
            errorId,
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            severity
        });

        // Report to error tracking service
        this.reportError(error, errorInfo, errorId, severity);
    }

    calculateSeverity(error) {
        const message = error.message?.toLowerCase() || '';

        if (message.includes('chunk') || message.includes('network')) {
            return ERROR_SEVERITY.LOW;
        }
        if (message.includes('render') || message.includes('undefined')) {
            return ERROR_SEVERITY.MEDIUM;
        }
        if (message.includes('security') || message.includes('auth')) {
            return ERROR_SEVERITY.HIGH;
        }

        return ERROR_SEVERITY.MEDIUM;
    }

    async reportError(error, errorInfo, errorId, severity) {
        try {
            const token = localStorage.getItem('access_token');
            const payload = {
                error_id: errorId,
                message: error.message,
                stack: error.stack,
                component_stack: errorInfo.componentStack,
                severity,
                url: window.location.href,
                user_agent: navigator.userAgent,
                timestamp: new Date().toISOString(),
                app_version: import.meta.env.VITE_APP_VERSION || '1.0.0'
            };

            // Only report in production
            if (import.meta.env.MODE === 'production') {
                await fetch('/api/error-reports/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { 'Authorization': `Bearer ${token}` })
                    },
                    body: JSON.stringify(payload)
                });
            }
        } catch (e) {
            console.warn('Failed to report error:', e);
        }
    }

    handleRetry = () => {
        this.setState(prev => ({
            hasError: false,
            error: null,
            errorInfo: null,
            recoveryAttempts: prev.recoveryAttempts + 1
        }));
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    handleReload = () => {
        window.location.reload();
    };

    copyErrorDetails = () => {
        const { error, errorInfo, errorId } = this.state;
        const details = `
Error ID: ${errorId}
Message: ${error?.message}
Stack: ${error?.stack}
Component Stack: ${errorInfo?.componentStack}
URL: ${window.location.href}
Time: ${new Date().toISOString()}
        `.trim();

        navigator.clipboard.writeText(details);
        alert('Hata detayları kopyalandı!');
    };

    render() {
        if (this.state.hasError) {
            const { error, errorId, severity, recoveryAttempts } = this.state;
            const isRecoverable = severity !== ERROR_SEVERITY.CRITICAL && recoveryAttempts < 3;

            return (
                <div style={styles.container}>
                    <div style={styles.content}>
                        {/* Error Icon */}
                        <div style={styles.iconContainer}>
                            <FaExclamationTriangle
                                size={64}
                                color={severity === ERROR_SEVERITY.CRITICAL ? '#f04747' : '#faa61a'}
                            />
                        </div>

                        {/* Error Title */}
                        <h1 style={styles.title}>
                            {severity === ERROR_SEVERITY.CRITICAL
                                ? 'Kritik Hata Oluştu'
                                : 'Bir Şeyler Ters Gitti'}
                        </h1>

                        {/* Error Message */}
                        <p style={styles.message}>
                            {severity === ERROR_SEVERITY.LOW
                                ? 'Geçici bir bağlantı sorunu oluştu. Lütfen tekrar deneyin.'
                                : 'Uygulama beklenmeyen bir hatayla karşılaştı.'}
                        </p>

                        {/* Error ID */}
                        <div style={styles.errorId}>
                            <FaBug size={14} style={{ marginRight: '8px' }} />
                            Hata Kodu: <code style={styles.code}>{errorId}</code>
                        </div>

                        {/* Action Buttons */}
                        <div style={styles.actions}>
                            {isRecoverable && (
                                <button
                                    style={styles.primaryButton}
                                    onClick={this.handleRetry}
                                >
                                    <FaRedo size={16} />
                                    <span>Tekrar Dene</span>
                                </button>
                            )}

                            <button
                                style={styles.secondaryButton}
                                onClick={this.handleGoHome}
                            >
                                <FaHome size={16} />
                                <span>Ana Sayfa</span>
                            </button>

                            <button
                                style={styles.secondaryButton}
                                onClick={this.handleReload}
                            >
                                <FaRedo size={16} />
                                <span>Sayfayı Yenile</span>
                            </button>
                        </div>

                        {/* Developer Info (only in dev mode) */}
                        {import.meta.env.MODE === 'development' && (
                            <details style={styles.details}>
                                <summary style={styles.summary}>Geliştirici Bilgileri</summary>
                                <pre style={styles.pre}>
                                    {error?.message}
                                    {'\n\n'}
                                    {error?.stack}
                                </pre>
                                <button
                                    style={styles.copyButton}
                                    onClick={this.copyErrorDetails}
                                >
                                    Hata Detaylarını Kopyala
                                </button>
                            </details>
                        )}

                        {/* Recovery Attempts Warning */}
                        {recoveryAttempts >= 2 && (
                            <p style={styles.warning}>
                                ⚠️ Birden fazla kurtarma denemesi yapıldı.
                                Sorun devam ederse sayfayı yenileyin.
                            </p>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e1f22',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    content: {
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#2b2d31',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    },
    iconContainer: {
        marginBottom: '24px'
    },
    title: {
        color: '#ffffff',
        fontSize: '24px',
        fontWeight: '600',
        margin: '0 0 12px 0'
    },
    message: {
        color: '#b5bac1',
        fontSize: '16px',
        margin: '0 0 24px 0',
        lineHeight: '1.5'
    },
    errorId: {
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#1e1f22',
        padding: '8px 16px',
        borderRadius: '8px',
        color: '#b5bac1',
        fontSize: '14px',
        marginBottom: '24px'
    },
    code: {
        color: '#5865f2',
        backgroundColor: 'transparent',
        fontFamily: 'monospace'
    },
    actions: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    primaryButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    secondaryButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        backgroundColor: '#4e5058',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    details: {
        marginTop: '24px',
        textAlign: 'left'
    },
    summary: {
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '14px',
        marginBottom: '12px'
    },
    pre: {
        backgroundColor: '#1e1f22',
        padding: '16px',
        borderRadius: '8px',
        overflow: 'auto',
        maxHeight: '200px',
        fontSize: '12px',
        color: '#f04747',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
    },
    copyButton: {
        marginTop: '12px',
        padding: '8px 16px',
        backgroundColor: 'transparent',
        color: '#5865f2',
        border: '1px solid #5865f2',
        borderRadius: '4px',
        fontSize: '12px',
        cursor: 'pointer'
    },
    warning: {
        marginTop: '16px',
        color: '#faa61a',
        fontSize: '13px'
    }
};

export default GlobalErrorBoundary;

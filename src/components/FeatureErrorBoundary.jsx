/**
 * 🛡️ Feature Error Boundary - Granular error isolation
 * Wraps individual features so one crash doesn't take down the entire app.
 * Usage:
 *   <FeatureErrorBoundary name="VoiceChat" fallback={<p>Voice chat unavailable</p>}>
 *     <VoiceChatPanel />
 *   </FeatureErrorBoundary>
 */

import React from 'react';

class FeatureErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            retryCount: 0
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        const featureName = this.props.name || 'Unknown Feature';
        console.error(`[${featureName}] Error:`, error, errorInfo);

        // Report to backend silently
        try {
            const apiBase = (typeof window !== 'undefined' && window.__PAWSCORD_API_BASE__)
                || 'https://api.pawscord.com/api';
            const token = localStorage.getItem('access_token');
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
                    timestamp: new Date().toISOString()
                })
            }).catch(() => {}); // silent
        } catch (e) { /* silent */ }
    }

    handleRetry = () => {
        this.setState(prev => ({
            hasError: false,
            error: null,
            retryCount: prev.retryCount + 1
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
            if (this.state.retryCount >= 3) {
                return (
                    <div style={styles.container}>
                        <div style={styles.icon}>⚠️</div>
                        <p style={styles.text}>{this.props.name || 'Bu özellik'} şu anda kullanılamıyor.</p>
                        <button onClick={() => window.location.reload()} style={styles.button}>
                            Sayfayı Yenile
                        </button>
                    </div>
                );
            }

            // Default fallback with retry button
            return (
                <div style={styles.container}>
                    <div style={styles.icon}>😕</div>
                    <p style={styles.text}>
                        {this.props.name || 'Bu bölüm'} yüklenirken bir hata oluştu.
                    </p>
                    <button onClick={this.handleRetry} style={styles.button}>
                        Tekrar Dene
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
        background: '#2b2d31',
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

export default FeatureErrorBoundary;

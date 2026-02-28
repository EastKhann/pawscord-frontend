/**
 * RouteErrorBoundary — per-route error boundary with retry.
 *
 * Catches runtime errors within a single route so that a crash in one
 * feature area (e.g. /crypto-analysis) doesn't nuke the entire app.
 * Shows a user-friendly error card with a "Tekrar Dene" (Retry) button.
 *
 * Usage:
 *   <Route path="/crypto" element={
 *     <RouteErrorBoundary>
 *       <React.Suspense fallback={<LoadingSkeleton />}>
 *         <CryptoPage />
 *       </React.Suspense>
 *     </RouteErrorBoundary>
 *   } />
 */

import React from 'react';

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
        console.error('[RouteErrorBoundary]', error, errorInfo);
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

            return (
                <div
                    role="alert"
                    aria-live="assertive"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '40vh',
                        padding: '2rem',
                        color: '#dcddde',
                        textAlign: 'center',
                    }}
                >
                    <h2 style={{ color: '#ed4245', marginBottom: '0.5rem', fontSize: '1.4rem' }}>
                        Bir Hata Oluştu
                    </h2>
                    <p style={{ color: '#96989d', maxWidth: 420, marginBottom: '1.5rem', lineHeight: 1.5 }}>
                        Bu sayfa beklenmeyen bir hatayla karşılaştı.
                        Tekrar deneyebilir veya ana sayfaya dönebilirsiniz.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button
                            onClick={this.handleRetry}
                            aria-label="Sayfayı tekrar dene"
                            style={{
                                padding: '0.6rem 1.5rem',
                                borderRadius: 4,
                                border: 'none',
                                background: '#5865f2',
                                color: '#fff',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                            }}
                        >
                            Tekrar Dene
                        </button>
                        <button
                            onClick={() => (window.location.hash = '#/')}
                            aria-label="Ana sayfaya dön"
                            style={{
                                padding: '0.6rem 1.5rem',
                                borderRadius: 4,
                                border: '1px solid #4e5058',
                                background: 'transparent',
                                color: '#dcddde',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                            }}
                        >
                            Ana Sayfa
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default RouteErrorBoundary;

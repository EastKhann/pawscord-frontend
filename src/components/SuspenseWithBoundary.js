// components/SuspenseWithBoundary.js
// Wraps children in both ErrorBoundary + Suspense for resilient lazy loading

import React, { Suspense } from 'react';
import { handleChunkErrorInBoundary, isChunkLoadError } from '../utils/lazyWithRetry';

class SectionErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error(`🔴 [${this.props.section || 'Section'}] Error:`, error, errorInfo);
        // Deploy sonrası stale chunk durumunda otomatik cache-busting reload dene.
        handleChunkErrorInBoundary(error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', padding: '40px 20px', color: '#b5bac1',
                    height: '100%', textAlign: 'center'
                }}>
                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚠️</div>
                    <p style={{ fontSize: '14px', margin: '0 0 12px' }}>
                        {this.props.section || 'Bu bölüm'} yüklenirken hata oluştu.
                    </p>
                    <button
                        onClick={() => {
                            if (isChunkLoadError(this.state.error)) {
                                window.location.reload();
                                return;
                            }
                            this.setState({ hasError: false, error: null });
                        }}
                        style={{
                            background: '#5865f2', color: 'white', border: 'none',
                            borderRadius: '4px', padding: '8px 16px', cursor: 'pointer',
                            fontSize: '13px', fontWeight: 600
                        }}
                    >
                        {isChunkLoadError(this.state.error) ? 'Sayfayı Yenile' : 'Tekrar Dene'}
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

const SuspenseWithBoundary = ({ children, fallback, section }) => (
    <SectionErrorBoundary section={section}>
        <Suspense fallback={fallback || null}>
            {children}
        </Suspense>
    </SectionErrorBoundary>
);

export default SuspenseWithBoundary;
export { SectionErrorBoundary };

// components/SuspenseWithBoundary.js
// Wraps children in both ErrorBoundary + Suspense for resilient lazy loading

import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { handleChunkErrorInBoundary, isChunkLoadError } from '../../utils/lazyWithRetry';
import logger from '../../utils/logger';
import i18n from '../../i18n';

const getSectionErrorMessage = (error) => {
    const rawMessage = error?.message || error?.toString() || 'Unknown error';
    return rawMessage.length > 180 ? `${rawMessage.slice(0, 177)}...` : rawMessage;
};

const persistSectionError = (section, error, errorInfo) => {
    try {
        const payload = {
            section: section || 'Section',
            message: error?.message || error?.toString() || 'Unknown error',
            stack: error?.stack || null,
            componentStack: errorInfo?.componentStack || null,
            url: typeof window !== 'undefined' ? window.location.href : '',
            timestamp: new Date().toISOString(),
        };

        if (typeof window !== 'undefined') {
            window.__pawscordLastSectionError = payload;
            sessionStorage.setItem('pawscord_last_section_error', JSON.stringify(payload));
        }
    } catch {
        // Ignore storage failures in degraded browser contexts.
    }
};

const S = {
    bg: {
        background: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 600,
    },
    mar2: { fontSize: '14px', margin: '0 0 12px' },
    mar: { fontSize: '32px', marginBottom: '12px' },
    flex: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        color: '#b5bac1',
        height: '100%',
        textAlign: 'center',
    },
    err: {
        margin: '0 0 12px',
        maxWidth: '420px',
        fontSize: '12px',
        lineHeight: 1.5,
        color: '#ffb4b4',
        fontFamily: 'Consolas, Monaco, monospace',
        wordBreak: 'break-word',
    },
};

class SectionErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        logger.error(`🔴 [${this.props.section || 'Section'}] Error:`, error, errorInfo);
        persistSectionError(this.props.section, error, errorInfo);
        // Deploy sonrası stale chunk durumunda otomatik cache-busting reload dene.
        handleChunkErrorInBoundary(error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={S.flex}>
                    <div style={S.mar}>⚠️</div>
                    <p style={S.mar2}>{(this.props.section || 'This section') + ' could not be loaded.'}</p>
                    {!isChunkLoadError(this.state.error) && this.state.error && (
                        <p style={S.err}>{getSectionErrorMessage(this.state.error)}</p>
                    )}
                    <button
                        aria-label={i18n.t('errors.tryAgain', { defaultValue: 'Try again' })}
                        onClick={() => {
                            if (isChunkLoadError(this.state.error)) {
                                window.location.reload();
                                return;
                            }
                            this.setState({ hasError: false, error: null });
                        }}
                        style={S.bg}
                    >
                        {isChunkLoadError(this.state.error) ? 'Reload Page' : 'Try Again'}
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

const SuspenseWithBoundary = ({ children, fallback, section }) => (
    <SectionErrorBoundary section={section}>
        <Suspense fallback={fallback || null}>{children}</Suspense>
    </SectionErrorBoundary>
);

SuspenseWithBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.node,
    section: PropTypes.string,
};
export default SuspenseWithBoundary;
export { SectionErrorBoundary };

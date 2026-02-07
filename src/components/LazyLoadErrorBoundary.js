// frontend/src/components/LazyLoadErrorBoundary.js
import React from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

/**
 * 🛡️ Lazy Load Error Boundary
 * Lazy load componentler yüklenirken hata olursa gösterir
 */
class LazyLoadErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            isRetrying: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('❌ [LazyLoadError] Component yükleme hatası:', error, errorInfo);

        // Chunk yükleme hatası mı kontrol et
        const isChunkError = error.name === 'ChunkLoadError' ||
            error.message?.includes('Loading chunk') ||
            error.message?.includes('Failed to fetch');

        if (isChunkError) {
            console.warn('📦 Chunk yükleme hatası - sayfa yenilenebilir');
        }
    }

    handleRetry = () => {
        this.setState({ isRetrying: true });

        // Component'i yeniden yüklemeye çalış
        setTimeout(() => {
            this.setState({
                hasError: false,
                error: null,
                isRetrying: false
            });
        }, 500);
    };

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            const isChunkError = this.state.error?.name === 'ChunkLoadError' ||
                this.state.error?.message?.includes('Loading chunk');

            return (
                <div style={styles.container}>
                    <div style={styles.errorBox}>
                        <FaExclamationTriangle style={styles.icon} />
                        <h3 style={styles.title}>
                            {isChunkError ? 'Yükleme Hatası' : 'Bir Sorun Oluştu'}
                        </h3>
                        <p style={styles.message}>
                            {isChunkError
                                ? 'Component yüklenirken bir hata oluştu. Bu genellikle internet bağlantısı veya güncelleme nedeniyle olur.'
                                : 'Bu bileşen yüklenirken beklenmeyen bir hata oluştu.'}
                        </p>

                        <div style={styles.buttonGroup}>
                            <button
                                onClick={this.handleRetry}
                                disabled={this.state.isRetrying}
                                style={styles.primaryButton}
                            >
                                <FaRedo style={{ marginRight: '8px' }} />
                                {this.state.isRetrying ? 'Yeniden Deneniyor...' : 'Tekrar Dene'}
                            </button>

                            {isChunkError && (
                                <button
                                    onClick={this.handleReload}
                                    style={styles.secondaryButton}
                                >
                                    Sayfayı Yenile
                                </button>
                            )}
                        </div>

                        {import.meta.env.MODE === 'development' && this.state.error && (
                            <details style={styles.details}>
                                <summary style={styles.summary}>Hata Detayları</summary>
                                <pre style={styles.pre}>
                                    {this.state.error.toString()}
                                </pre>
                            </details>
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        minHeight: '200px'
    },
    errorBox: {
        background: '#2f3136',
        borderRadius: '8px',
        padding: '32px',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        border: '2px solid #ed4245'
    },
    icon: {
        fontSize: '48px',
        color: '#faa61a',
        marginBottom: '16px'
    },
    title: {
        color: '#fff',
        fontSize: '20px',
        marginBottom: '12px',
        fontWeight: 'bold'
    },
    message: {
        color: '#b9bbbe',
        fontSize: '14px',
        lineHeight: '1.5',
        marginBottom: '24px'
    },
    buttonGroup: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    primaryButton: {
        background: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.2s'
    },
    secondaryButton: {
        background: 'transparent',
        color: '#b9bbbe',
        border: '2px solid #4f545c',
        borderRadius: '4px',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    details: {
        marginTop: '20px',
        textAlign: 'left',
        background: '#202225',
        borderRadius: '4px',
        padding: '12px'
    },
    summary: {
        color: '#fff',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 'bold'
    },
    pre: {
        color: '#ed4245',
        fontSize: '11px',
        marginTop: '8px',
        overflow: 'auto',
        maxHeight: '100px'
    }
};

export default LazyLoadErrorBoundary;



// components/ErrorBoundary.js
// 🛡️ Error Boundary - Crash Prevention

import React from 'react';
import { isChunkLoadError, handleChunkErrorInBoundary } from '../utils/lazyWithRetry';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 🔄 Chunk load hatası → otomatik sayfa yenile (yeni deploy algılandı)
    if (isChunkLoadError(error)) {
      console.warn('🔄 Chunk yükleme hatası algılandı, sayfa yenileniyor...');
      handleChunkErrorInBoundary(error);
      return; // reload yapılacak, devam etmeye gerek yok
    }

    console.error('🔴 App Crashed:', error);
    console.error('Error Info:', errorInfo);

    this.setState({
      error,
      errorInfo
    });

    // 🔥 Error logging - Backend'e gönder (API domain üzerinden)
    try {
      const apiBase = (typeof window !== 'undefined' && window.__PAWSCORD_API_BASE__)
        || 'https://api.pawscord.com/api';
      fetch(`${apiBase}/errors/report/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: error?.toString(),
          stack: error?.stack,
          componentStack: errorInfo?.componentStack,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
      }).catch(() => { }); // Sessiz hata
    } catch (e) {
      console.warn('Could not report error:', e);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <div style={styles.content}>
            <div style={styles.icon}>💥</div>
            <h1 style={styles.title}>Oops! Bir şeyler ters gitti</h1>
            <p style={styles.message}>
              Üzgünüz, uygulama beklenmedik bir hatayla karşılaştı.
            </p>

            <div style={styles.actions}>
              <button onClick={this.handleReset} style={styles.button}>
                🔄 Yeniden Başlat
              </button>
              <button
                onClick={() => window.location.href = '/'}
                style={{ ...styles.button, ...styles.buttonSecondary }}
              >
                🏠 Ana Sayfaya Dön
              </button>
            </div>

            {import.meta.env.MODE === 'development' && this.state.error && (
              <details style={styles.details}>
                <summary style={styles.summary}>Hata Detayları (Dev Mode)</summary>
                <pre style={styles.errorText}>
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
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
    minHeight: '100vh',
    backgroundColor: '#0d0e10',
    color: '#FFFFFF',
    padding: '20px',
    fontFamily: "'Inter', sans-serif"
  },
  content: {
    textAlign: 'center',
    maxWidth: '600px',
    padding: '40px',
    background: 'linear-gradient(135deg, #111214 0%, #0d0e10 100%)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
  },
  icon: {
    fontSize: '80px',
    marginBottom: '20px',
    animation: 'shake 0.5s ease-in-out'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#FFFFFF'
  },
  message: {
    fontSize: '16px',
    color: '#b5bac1',
    marginBottom: '32px',
    lineHeight: '1.6'
  },
  actions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#5865F2',
    color: '#FFFFFF',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#4752C4'
    }
  },
  buttonSecondary: {
    backgroundColor: '#4E5058',
    ':hover': {
      backgroundColor: '#6A6F78'
    }
  },
  details: {
    marginTop: '32px',
    textAlign: 'left',
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
    padding: '16px'
  },
  summary: {
    cursor: 'pointer',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#f0b232'
  },
  errorText: {
    fontSize: '12px',
    color: '#f23f42',
    overflow: 'auto',
    maxHeight: '300px',
    padding: '12px',
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '4px'
  }
};

export default ErrorBoundary;




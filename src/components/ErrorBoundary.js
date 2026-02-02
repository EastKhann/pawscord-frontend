// components/ErrorBoundary.js
// 🛡️ Error Boundary - Crash Prevention

import React from 'react';

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
    console.error('🔴 App Crashed:', error);
    console.error('Error Info:', errorInfo);

    this.setState({
      error,
      errorInfo
    });

    // 🔥 Error logging - Backend'e gönder
    try {
      fetch('/api/errors/report/', {
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
    backgroundColor: '#1E1F22',
    color: '#FFFFFF',
    padding: '20px',
    fontFamily: "'Inter', sans-serif"
  },
  content: {
    textAlign: 'center',
    maxWidth: '600px',
    padding: '40px',
    background: 'linear-gradient(135deg, #2B2D31 0%, #1E1F22 100%)',
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
    color: '#B9BBBE',
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
    color: '#FAA61A'
  },
  errorText: {
    fontSize: '12px',
    color: '#ED4245',
    overflow: 'auto',
    maxHeight: '300px',
    padding: '12px',
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '4px'
  }
};

export default ErrorBoundary;




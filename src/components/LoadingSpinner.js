// frontend/src/components/LoadingSpinner.js

/**
 * 🌀 Modern Loading Spinner Component
 * Discord/Pawscord tarzı yükleme animasyonu
 */
const LoadingSpinner = ({ size = 'medium', text = 'Yükleniyor...', fullscreen = false }) => {
    const sizes = {
        small: { spinner: 24, text: '12px' },
        medium: { spinner: 40, text: '14px' },
        large: { spinner: 60, text: '16px' }
    };

    const config = sizes[size] || sizes.medium;

    const containerStyle = fullscreen ? styles.fullscreenContainer : styles.inlineContainer;

    return (
        <div style={containerStyle}>
            <div style={{ ...styles.spinnerWrapper, width: config.spinner, height: config.spinner }}>
                {/* Outer ring */}
                <div style={styles.spinnerOuter}></div>
                {/* Inner ring */}
                <div style={styles.spinnerInner}></div>
            </div>
            {text && (
                <div style={{ ...styles.loadingText, fontSize: config.text }}>
                    {text}
                </div>
            )}
        </div>
    );
};

const styles = {
    fullscreenContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#36393f',
        zIndex: 9999,
        gap: '16px'
    },
    inlineContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '20px',
        minHeight: '100px'
    },
    spinnerWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    spinnerOuter: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        border: '3px solid rgba(88, 101, 242, 0.2)',
        borderTop: '3px solid #5865f2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    spinnerInner: {
        position: 'absolute',
        width: '70%',
        height: '70%',
        border: '3px solid rgba(88, 101, 242, 0.1)',
        borderBottom: '3px solid #7289da',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite reverse'
    },
    loadingText: {
        color: '#b5bac1',
        fontWeight: 500,
        textAlign: 'center',
        animation: 'pulse 1.5s ease-in-out infinite'
    }
};

// Inject animations
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
        }
    `;
    if (!document.head.querySelector('[data-loading-spinner-styles]')) {
        styleSheet.setAttribute('data-loading-spinner-styles', 'true');
        document.head.appendChild(styleSheet);
    }
}

export default LoadingSpinner;



import React from 'react';
import { FaTimes, FaMagic, FaRobot } from 'react-icons/fa';
import useModalA11y from './hooks/useModalA11y';

const SummaryModal = ({ isLoading, summaryText, onClose }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'AI Sohbet Özeti' });

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerTitle}>
                        <FaMagic style={{ color: '#eb459e' }} />
                        <span>AI Sohbet Özeti</span>
                    </div>
                    <button onClick={onClose} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                {/* İçerik */}
                <div style={styles.content}>
                    {isLoading ? (
                        <div style={styles.loadingState}>
                            <div className="ai-pulse">
                                <FaRobot size={40} color="#5865f2" />
                            </div>
                            <p style={{ marginTop: 15, color: '#dbdee1' }}>
                                Sohbet okunuyor ve analiz ediliyor...
                            </p>
                            <span style={{ fontSize: '0.8em', color: '#949ba4' }}>
                                (Bu işlem sohbet yoğunluğuna göre 5-10 sn sürebilir)
                            </span>
                        </div>
                    ) : (
                        <div style={styles.summaryText}>
                            {summaryText ? (
                                summaryText.split('\n').map((line, i) => (
                                    <p key={i} style={{ margin: '0 0 8px 0' }}>
                                        {line}
                                    </p>
                                ))
                            ) : (
                                <p style={{ color: '#da373c' }}>Özet çıkarılamadı veya hata oluştu.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arka planı hafif karart
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(2px)'
    },
    modal: {
        width: '90%',
        maxWidth: '500px',
        backgroundColor: '#2b2d31', // Discord koyu gri
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
        border: '1px solid #1e1f22',
        overflow: 'hidden',
        animation: 'popIn 0.3s ease-out'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        backgroundColor: '#1e1f22',
        borderBottom: '1px solid #111214'
    },
    headerTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '1.1em',
        fontWeight: 'bold',
        color: '#fff'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '1.2em',
        padding: '5px',
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        padding: '25px',
        minHeight: '150px',
        maxHeight: '60vh',
        overflowY: 'auto',
        color: '#dcddde',
        lineHeight: '1.5',
        fontSize: '0.95em'
    },
    loadingState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100%',
        padding: '20px 0'
    },
    summaryText: {
        whiteSpace: 'pre-wrap'
    }
};

// Animasyon stili (Header'a eklemek için)
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes popIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
    .ai-pulse {
        animation: aiPulse 1.5s infinite ease-in-out;
    }
    @keyframes aiPulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(styleSheet);

export default React.memo(SummaryModal);


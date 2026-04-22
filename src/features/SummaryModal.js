import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaMagic, FaRobot } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import useModalA11y from '../hooks/useModalA11y';

// -- extracted inline style constants --
const _st1 = { color: '#5865f2', marginRight: '8px' };
const _st2 = { margin: '12px 0', color: '#dbdee1' };
const _st3 = { color: '#949ba4', fontSize: '0.85em' };
const _st4 = { margin: '8px 0', color: '#dbdee1' };
const _st5 = { margin: 0, color: '#f04747' };

const SummaryModal = ({ isLoading, summaryText, onClose }) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: t('summary.title', 'AI Chat Summary') });

    return (
        <div aria-label={t('aria.summaryModal', 'AI Summary')} style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerTitle}>
                        <FaMagic style={_st1} />
                        <span>{t('summary.title')}</span>
                    </div>
                    <button onClick={onClose} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {isLoading ? (
                        <div style={styles.loadingState}>
                            <div className="ai-pulse">
                                <FaRobot size={40} color="#5865f2" />
                            </div>
                            <p style={_st2}>{t('summary.analyzing')}</p>
                            <span style={_st3}>{t('summary.mayTakeTime')}</span>
                        </div>
                    ) : (
                        <div style={styles.summaryText}>
                            {summaryText ? (
                                summaryText.split('\n').map((line, i) => (
                                    <p key={`item-${i}`} style={_st4}>
                                        {line}
                                    </p>
                                ))
                            ) : (
                                <p style={_st5}>{t('summary.error')}</p>
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
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arka plani hafif karart
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(2px)',
    },
    modal: {
        width: '90%',
        maxWidth: '500px',
        backgroundColor: '#111214', // Discord koyu gri
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
        border: '1px solid #0b0e1b',
        overflow: 'hidden',
        animation: 'popIn 0.3s ease-out',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        backgroundColor: '#0d0e10',
        borderBottom: '1px solid #0e1222',
    },
    headerTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '1.1em',
        fontWeight: 'bold',
        color: '#fff',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '1.2em',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
    },
    content: {
        padding: '25px',
        minHeight: '150px',
        maxHeight: '60vh',
        overflowY: 'auto',
        color: '#dbdee1',
        lineHeight: '1.5',
        fontSize: '0.95em',
    },
    loadingState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100%',
        padding: '20px 0',
    },
    summaryText: {
        whiteSpace: 'pre-wrap',
    },
};

// Animasyon stili (Header'a eklemek i�in)
const styleSheet = document.createElement('style');
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

SummaryModal.propTypes = {
    isLoading: PropTypes.bool,
    summaryText: PropTypes.string,
    onClose: PropTypes.func,
};
export default React.memo(SummaryModal);

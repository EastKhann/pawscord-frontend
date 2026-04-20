/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
// components/ConfirmModal.js
// 🎯 Modern Confirmation Dialog - alert() ve confirm() yerine kullanılır

import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { FaExclamationTriangle, FaTimes, FaTrash, FaCheck } from 'react-icons/fa';
import useModalA11y from '../../hooks/useModalA11y';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

// -- dynamic style helpers (pass 2) --

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Emin misiniz?',
    message = 'Are you sure you want to perform this action?',
    confirmText = 'Evet',
    cancelText,
    type = 'warning', // 'warning', 'danger', 'info'
    requireTextConfirmation = false,
    confirmationText = '',
    inputPlaceholder,
    dangerDetails = null, // Tehlikeli işlem detailları (array)
}) => {
    const [inputValue, setInputValue] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const { t } = useTranslation();
    const resolvedCancelText = cancelText ?? t('common.no');
    const resolvedPlaceholder = inputPlaceholder ?? t('ui.type_here_to_confirm');
    const safeClose = useCallback(() => {
        if (!isProcessing) onClose();
    }, [isProcessing, onClose]);
    const { overlayProps, dialogProps } = useModalA11y({
        onClose: safeClose,
        isOpen,
        label: 'Onmonth',
    });

    useEffect(() => {
        if (isOpen) {
            setInputValue('');
            setIsProcessing(false);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        if (requireTextConfirmation && inputValue !== confirmationText) {
            return; // Text eşleşmezse işlem yapma
        }

        setIsProcessing(true);
        try {
            await onConfirm();
            onClose();
        } catch (error) {
            logger.error('Confirm action failed:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const typeConfig = {
        warning: {
            icon: <FaExclamationTriangle />,
            color: '#f39c12',
            gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
        },
        danger: {
            icon: <FaTrash />,
            color: '#e74c3c',
            gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
        },
        info: {
            icon: <FaCheck />,
            color: '#3498db',
            gradient: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
        },
    };

    const config = typeConfig[type] || typeConfig.warning;

    const canConfirm = !requireTextConfirmation || inputValue === confirmationText;

    const modalContent = (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                {/* Header */}
                <div>
                    <div style={styles.headerIcon}>{config.icon}</div>
                    <h2 style={styles.title}>{title}</h2>
                    <button
                        onClick={onClose}
                        disabled={isProcessing}
                        style={styles.closeButton}
                        title={t('common.close')}
                        aria-label={t('common.close')}
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Body */}
                <div style={styles.body}>
                    <p style={styles.message}>{message}</p>

                    {/* Danger Details */}
                    {dangerDetails && dangerDetails.length > 0 && (
                        <div style={styles.dangerBox}>
                            <div style={styles.dangerHeader}>⚠️ Bu işlem:</div>
                            <ul style={styles.dangerList}>
                                {dangerDetails.map((detail, idx) => (
                                    <li key={`item-${idx}`} style={styles.dangerItem}>
                                        • {detail}
                                    </li>
                                ))}
                            </ul>
                            <div style={styles.dangerFooter}>GERİ ALINAMAZ!</div>
                        </div>
                    )}

                    {/* Text Confirmation Input */}
                    {requireTextConfirmation && (
                        <div style={styles.inputContainer}>
                            <label style={styles.inputLabel}>
                                Devam etmek için <strong>"{confirmationText}"</strong> yazın:
                            </label>
                            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={resolvedPlaceholder}
                                style={{
                                    ...styles.input,
                                    borderColor:
                                        inputValue && inputValue !== confirmationText
                                            ? '#e74c3c'
                                            : '#4e5058',
                                }}
                                disabled={isProcessing}
                                autoFocus
                            />
                            {inputValue && inputValue !== confirmationText && (
                                <div style={styles.inputError}>Metin eşleşmiyor</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <button
                        aria-label="on Close"
                        onClick={onClose}
                        disabled={isProcessing}
                        style={styles.cancelButton}
                    >
                        {resolvedCancelText}
                    </button>
                    <button
                        aria-label="handle Confirm"
                        onClick={handleConfirm}
                        disabled={!canConfirm || isProcessing}
                        style={{
                            ...styles.confirmButton,
                            background: canConfirm ? config.gradient : '#4e5058',
                            cursor: canConfirm && !isProcessing ? 'pointer' : 'not-allowed',
                            opacity: canConfirm && !isProcessing ? 1 : 0.6,
                        }}
                    >
                        {isProcessing ? (
                            <>
                                <span style={styles.spinner}></span> Processing...
                            </>
                        ) : (
                            confirmText
                        )}
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out',
    },
    modal: {
        backgroundColor: '#111214',
        borderRadius: '12px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        animation: 'slideUp 0.3s ease-out',
        overflow: 'hidden',
    },
    header: {
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        position: 'relative',
    },
    headerIcon: {
        fontSize: '24px',
        color: 'white',
        animation: 'pulse 2s ease-in-out infinite',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
    },
    closeButton: {
        background: 'rgba(255, 255, 255, 0.1)',
        border: 'none',
        borderRadius: '6px',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontSize: '16px',
    },
    body: {
        padding: '24px',
    },
    message: {
        margin: 0,
        fontSize: '15px',
        lineHeight: '1.6',
        color: '#dbdee1',
        marginBottom: '16px',
    },
    dangerBox: {
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        border: '2px solid rgba(231, 76, 60, 0.3)',
        borderRadius: '8px',
        padding: '16px',
        marginTop: '16px',
    },
    dangerHeader: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#e74c3c',
        marginBottom: '8px',
    },
    dangerList: {
        margin: '8px 0',
        padding: '0 0 0 12px',
        listStyle: 'none',
        color: '#dbdee1',
    },
    dangerItem: {
        fontSize: '13px',
        lineHeight: '1.8',
        color: '#dbdee1',
    },
    dangerFooter: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#e74c3c',
        marginTop: '12px',
        textAlign: 'center',
        padding: '8px',
        backgroundColor: 'rgba(231, 76, 60, 0.2)',
        borderRadius: '6px',
    },
    inputContainer: {
        marginTop: '20px',
    },
    inputLabel: {
        display: 'block',
        fontSize: '14px',
        color: '#dbdee1',
        marginBottom: '8px',
    },
    input: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#0d0e10',
        border: '2px solid #4e5058',
        borderRadius: '6px',
        color: '#dbdee1',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box',
    },
    inputError: {
        fontSize: '12px',
        color: '#e74c3c',
        marginTop: '6px',
    },
    footer: {
        padding: '16px 24px',
        backgroundColor: '#111214',
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end',
    },
    cancelButton: {
        padding: '10px 24px',
        backgroundColor: 'transparent',
        border: '2px solid #4e5058',
        borderRadius: '6px',
        color: '#dbdee1',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    confirmButton: {
        padding: '10px 24px',
        border: 'none',
        borderRadius: '6px',
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    spinner: {
        width: '14px',
        height: '14px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderTopColor: 'white',
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite',
        display: 'inline-block',
    },
};

// CSS Animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

ConfirmModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    type: PropTypes.oneOf(['warning', 'danger', 'info']),
    requireTextConfirmation: PropTypes.bool,
    confirmationText: PropTypes.string,
    inputPlaceholder: PropTypes.string,
    dangerDetails: PropTypes.array,
};
export default ConfirmModal;

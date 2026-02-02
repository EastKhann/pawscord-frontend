// frontend/src/components/AccountDeletionModal.js
// 🗑️ Account Deletion Confirmation Modal - Full Implementation

import React, { useState, useCallback } from 'react';
import { FaExclamationTriangle, FaTimes, FaTrash, FaLock, FaSpinner } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * Account Deletion Modal
 * Two-step confirmation with password verification
 */
const AccountDeletionModal = ({ isOpen, onClose, onConfirmDelete, username, fetchWithAuth, apiBaseUrl }) => {
    const [step, setStep] = useState(1); // 1: Warning, 2: Password confirmation
    const [password, setPassword] = useState('');
    const [confirmText, setConfirmText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');

    const CONFIRM_PHRASE = `DELETE ${username}`;

    const handleClose = useCallback(() => {
        setStep(1);
        setPassword('');
        setConfirmText('');
        setError('');
        setIsDeleting(false);
        onClose();
    }, [onClose]);

    const handleProceedToConfirm = () => {
        setStep(2);
        setError('');
    };

    const handleDelete = async () => {
        if (confirmText !== CONFIRM_PHRASE) {
            setError(`Lütfen tam olarak "${CONFIRM_PHRASE}" yazın`);
            return;
        }

        if (!password) {
            setError('Şifrenizi girmeniz gerekiyor');
            return;
        }

        setIsDeleting(true);
        setError('');

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/user/delete-account/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, confirm_text: confirmText })
            });

            if (response.ok) {
                toast.success('Hesabınız başarıyla silindi. Hoşça kalın! 👋');
                if (onConfirmDelete) {
                    onConfirmDelete();
                }
                // Logout and redirect
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = '/';
            } else {
                const data = await response.json();
                setError(data.error || 'Hesap silinemedi. Şifrenizi kontrol edin.');
            }
        } catch (err) {
            console.error('Account deletion error:', err);
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsDeleting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={handleClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerIcon}>
                        <FaExclamationTriangle size={24} color="#f04747" />
                    </div>
                    <h2 style={styles.title}>Hesabı Sil</h2>
                    <button style={styles.closeButton} onClick={handleClose}>
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* Step 1: Warning */}
                {step === 1 && (
                    <div style={styles.content}>
                        <div style={styles.warningBox}>
                            <FaExclamationTriangle size={48} color="#f04747" />
                            <h3 style={styles.warningTitle}>Bu işlem geri alınamaz!</h3>
                            <p style={styles.warningText}>
                                Hesabınızı sildiğinizde aşağıdakiler kalıcı olarak silinecektir:
                            </p>
                        </div>

                        <ul style={styles.deleteList}>
                            <li>✗ Tüm mesajlarınız</li>
                            <li>✗ Profil bilgileriniz ve avatarınız</li>
                            <li>✗ Sunucu sahiplikleriniz (sunucular silinecek)</li>
                            <li>✗ Arkadaş listeniz</li>
                            <li>✗ Premium aboneliğiniz</li>
                            <li>✗ XP, seviye ve rozetleriniz</li>
                            <li>✗ Bağlı hesaplarınız (Spotify, Steam, vb.)</li>
                        </ul>

                        <div style={styles.infoBox}>
                            <p>
                                <strong>Not:</strong> Üye olduğunuz sunuculardaki mesajlarınız görünür kalacak 
                                ancak kullanıcı adınız "Silinmiş Kullanıcı" olarak gösterilecektir.
                            </p>
                        </div>

                        <div style={styles.buttonGroup}>
                            <button style={styles.cancelButton} onClick={handleClose}>
                                Vazgeç
                            </button>
                            <button style={styles.dangerButton} onClick={handleProceedToConfirm}>
                                Devam Et
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Password Confirmation */}
                {step === 2 && (
                    <div style={styles.content}>
                        <div style={styles.confirmBox}>
                            <FaLock size={32} color="#faa61a" />
                            <h3 style={styles.confirmTitle}>Kimliğinizi Doğrulayın</h3>
                            <p style={styles.confirmText}>
                                Hesabınızı silmek için şifrenizi girin ve onay metnini yazın.
                            </p>
                        </div>

                        {error && (
                            <div style={styles.errorBox}>
                                {error}
                            </div>
                        )}

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Şifreniz</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Şifrenizi girin"
                                style={styles.input}
                                disabled={isDeleting}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                Onaylamak için <code style={styles.code}>{CONFIRM_PHRASE}</code> yazın
                            </label>
                            <input
                                type="text"
                                value={confirmText}
                                onChange={e => setConfirmText(e.target.value)}
                                placeholder={CONFIRM_PHRASE}
                                style={{
                                    ...styles.input,
                                    borderColor: confirmText === CONFIRM_PHRASE ? '#43b581' : '#40444b'
                                }}
                                disabled={isDeleting}
                            />
                        </div>

                        <div style={styles.buttonGroup}>
                            <button 
                                style={styles.cancelButton} 
                                onClick={() => setStep(1)}
                                disabled={isDeleting}
                            >
                                Geri
                            </button>
                            <button 
                                style={{
                                    ...styles.deleteButton,
                                    opacity: (confirmText !== CONFIRM_PHRASE || !password || isDeleting) ? 0.5 : 1,
                                    cursor: (confirmText !== CONFIRM_PHRASE || !password || isDeleting) ? 'not-allowed' : 'pointer'
                                }}
                                onClick={handleDelete}
                                disabled={confirmText !== CONFIRM_PHRASE || !password || isDeleting}
                            >
                                {isDeleting ? (
                                    <>
                                        <FaSpinner className="spin" style={{ marginRight: 8 }} />
                                        Siliniyor...
                                    </>
                                ) : (
                                    <>
                                        <FaTrash style={{ marginRight: 8 }} />
                                        Hesabımı Kalıcı Olarak Sil
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        animation: 'fadeIn 0.2s ease'
    },
    modal: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        width: '480px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        animation: 'slideUp 0.3s ease'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid #2f3136',
        gap: '12px'
    },
    headerIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        flex: 1,
        margin: 0,
        fontSize: '18px',
        fontWeight: '600',
        color: '#fff'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '4px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s'
    },
    content: {
        padding: '20px'
    },
    warningBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: 'rgba(240, 71, 71, 0.1)',
        borderRadius: '8px',
        marginBottom: '16px'
    },
    warningTitle: {
        color: '#f04747',
        margin: '12px 0 8px',
        fontSize: '18px'
    },
    warningText: {
        color: '#b9bbbe',
        margin: 0,
        fontSize: '14px'
    },
    deleteList: {
        listStyle: 'none',
        padding: 0,
        margin: '16px 0',
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        padding: '16px 20px'
    },
    infoBox: {
        backgroundColor: 'rgba(250, 166, 26, 0.1)',
        border: '1px solid rgba(250, 166, 26, 0.3)',
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '20px'
    },
    confirmBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '16px',
        marginBottom: '16px'
    },
    confirmTitle: {
        color: '#fff',
        margin: '12px 0 8px',
        fontSize: '16px'
    },
    confirmText: {
        color: '#b9bbbe',
        margin: 0,
        fontSize: '14px'
    },
    errorBox: {
        backgroundColor: 'rgba(240, 71, 71, 0.2)',
        border: '1px solid #f04747',
        borderRadius: '4px',
        padding: '10px 14px',
        marginBottom: '16px',
        color: '#f04747',
        fontSize: '14px'
    },
    inputGroup: {
        marginBottom: '16px'
    },
    label: {
        display: 'block',
        color: '#b9bbbe',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: '8px'
    },
    code: {
        backgroundColor: '#2f3136',
        padding: '2px 6px',
        borderRadius: '3px',
        color: '#f04747',
        fontFamily: 'monospace'
    },
    input: {
        width: '100%',
        padding: '10px 12px',
        backgroundColor: '#202225',
        border: '1px solid #40444b',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.15s',
        boxSizing: 'border-box'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '20px'
    },
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.15s'
    },
    dangerButton: {
        padding: '10px 20px',
        backgroundColor: '#f04747',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.15s'
    },
    deleteButton: {
        padding: '10px 20px',
        backgroundColor: '#f04747',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s'
    }
};

// CSS Animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    .spin {
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(styleSheet);

export default AccountDeletionModal;

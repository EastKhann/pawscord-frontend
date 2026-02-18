import React, { useCallback } from 'react';
import { FaKey } from 'react-icons/fa';
import styles from '../styles';
import useModalA11y from '../../../hooks/useModalA11y';

const PasswordResetModal = ({
    handleUserAction,
    newPassword,
    passwordResetModal,
    setNewPassword,
    setPasswordResetModal
}) => {
    const onClose = useCallback(() => { setPasswordResetModal(null); setNewPassword(''); }, [setPasswordResetModal, setNewPassword]);
    const { modalRef, overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Password Reset' });
    return (
        <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 10
        }} {...overlayProps}>
            <div style={{
                backgroundColor: '#1a1a1e', borderRadius: '12px',
                padding: '24px', width: '420px', border: '1px solid #2a2a2e'
            }} {...dialogProps}>
                <h3 style={{ color: '#f59e0b', marginTop: 0 }}>
                    🔑 Şifre Değiştir — {passwordResetModal.username}
                </h3>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Yeni Şifre</label>
                    <input
                        type="text"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Yeni şifre girin (min 6 karakter)"
                        style={{
                            width: '100%', padding: '10px 14px',
                            backgroundColor: '#111113', border: '1px solid #2a2a2e',
                            borderRadius: '8px', color: '#fff', fontSize: '14px',
                            outline: 'none', boxSizing: 'border-box'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        style={{ ...styles.actionBtn('#f59e0b'), opacity: newPassword.length < 6 ? 0.5 : 1 }}
                        disabled={newPassword.length < 6}
                        onClick={async () => {
                            await handleUserAction('reset_password', passwordResetModal.id, { new_password: newPassword });
                            setPasswordResetModal(null);
                            setNewPassword('');
                        }}
                    >
                        <FaKey /> Şifreyi Değiştir
                    </button>
                    <button style={styles.actionBtn('#6b7280')} onClick={() => { setPasswordResetModal(null); setNewPassword(''); }}>
                        İptal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasswordResetModal;

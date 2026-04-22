/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaKey } from 'react-icons/fa';
import styles from '../styles';
import useModalA11y from '../../../hooks/useModalA11y';
import { useTranslation } from 'react-i18next';
import css from '../tabs/AdminTabs.module.css';

const S = {
    bg: {
        width: '100%',
        padding: '10px 14px',
        backgroundColor: '#111113',
        border: '1px solid #2a2a2e',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '14px',
        outline: 'none',
        boxSizing: 'border-box',
    },
    txt2: { color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' },
    txt: { color: '#f59e0b', marginTop: 0 },
    flex: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
};

const PasswordResetModal = ({
    handleUserAction,
    newPassword,
    passwordResetModal,
    setNewPassword,
    setPasswordResetModal,
}) => {
    const { t } = useTranslation();

    const onClose = useCallback(() => {
        setPasswordResetModal(null);
        setNewPassword('');
    }, [setPasswordResetModal, setNewPassword]);
    const { modalRef, overlayProps, dialogProps } = useModalA11y({
        onClose,
        label: 'Password Reset',
    });
    return (
        <div style={S.flex} {...overlayProps}>
            <div className={css.modalCard420} {...dialogProps}>
                <h3 style={S.txt}>🔒 Change Password — {passwordResetModal.username}</h3>
                <div className="mb-16">
                    <label style={S.txt2}>{t('yeni_password')}</label>
                    <input
                        type="text"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder={t('yeni_şifre_girin_min_6_karakter')}
                        style={S.bg}
                        aria-label={t('security.newPassword', 'New Password')}
                    />
                </div>
                <div className="flex-gap-8">
                    <button
                        style={{
                            ...styles.actionBtn('#f59e0b'),
                            opacity: newPassword.length < 6 ? 0.5 : 1,
                        }}
                        disabled={newPassword.length < 6}
                        onClick={async () => {
                            await handleUserAction('reset_password', passwordResetModal.id, {
                                new_password: newPassword,
                            });
                            setPasswordResetModal(null);
                            setNewPassword('');
                        }}
                    >
                        <FaKey /> {t('adminModal.changePassword', 'Change Password')}
                    </button>
                    <button
                        style={styles.actionBtn('#6b7280')}
                        onClick={() => {
                            setPasswordResetModal(null);
                            setNewPassword('');
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

PasswordResetModal.propTypes = {
    handleUserAction: PropTypes.func,
    newPassword: PropTypes.string,
    passwordResetModal: PropTypes.object,
    setNewPassword: PropTypes.func,
    setPasswordResetModal: PropTypes.func,
};
export default PasswordResetModal;

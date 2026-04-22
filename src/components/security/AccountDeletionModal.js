/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaExclamationTriangle, FaTimes, FaTrash, FaLock, FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from '../AccountDeletionModal/accountDeletionStyles';
import useAccountDeletion from '../AccountDeletionModal/useAccountDeletion';
import useModalA11y from '../../hooks/useModalA11y';

const AccountDeletionModal = ({
    isOpen,
    onClose,
    onConfirmDelete,
    username,
    fetchWithAuth,
    apiBaseUrl,
}) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({
        isOpen,
        onClose,
        label: t('accountDeletion.title'),
    });
    const {
        step,
        setStep,
        password,
        setPassword,
        confirmText,
        setConfirmText,
        isDeleting,
        error,
        CONFIRM_PHRASE,
        handleClose,
        handleProceedToConfirm,
        handleDelete,
        isDeleteDisabled,
    } = useAccountDeletion({ onClose, onConfirmDelete, username, fetchWithAuth, apiBaseUrl });

    const DELETE_ITEMS = [
        t('accountDeletion.allMessages'),
        t('accountDeletion.profileInfo'),
        t('accountDeletion.serverOwnership'),
        t('accountDeletion.friendList'),
        t('accountDeletion.premiumSub'),
        t('accountDeletion.xpAndBadges'),
        t('accountDeletion.connectedAccounts'),
    ];

    if (!isOpen) return null;

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.header}>
                    <div style={styles.headerIcon}>
                        <FaExclamationTriangle size={24} color="#f23f42" />
                    </div>
                    <h2 style={styles.title}>{t('accountDeletion.title')}</h2>
                    <button
                        aria-label={t('common.close', 'Close')}
                        style={styles.closeButton}
                        onClick={handleClose}
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                {step === 1 && (
                    <div style={styles.content}>
                        <div style={styles.warningBox}>
                            <FaExclamationTriangle size={48} color="#f23f42" />
                            <h3 style={styles.warningTitle}>{t('accountDeletion.irreversible')}</h3>
                            <p style={styles.warningText}>{t('accountDeletion.warningText')}</p>
                        </div>
                        <ul style={styles.deleteList}>
                            {DELETE_ITEMS.map((item, i) => (
                                <li key={`item-${i}`}>{item}</li>
                            ))}
                        </ul>
                        <div style={styles.infoBox}>
                            <p>{t('accountDeletion.infoNote')}</p>
                        </div>
                        <div style={styles.buttonGroup}>
                            <button
                                aria-label={t('common.cancel', 'Cancel')}
                                style={styles.cancelButton}
                                onClick={handleClose}
                            >
                                {t('accountDeletion.cancel')}
                            </button>
                            <button
                                aria-label={t('accountDeletion.proceed', 'Proceed to confirm')}
                                style={styles.dangerButton}
                                onClick={handleProceedToConfirm}
                            >
                                {t('accountDeletion.proceed')}
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div style={styles.content}>
                        <div style={styles.confirmBox}>
                            <FaLock size={32} color="#f0b232" />
                            <h3 style={styles.confirmTitle}>
                                {t('accountDeletion.verifyIdentity')}
                            </h3>
                            <p style={styles.confirmText}>{t('accountDeletion.verifyText')}</p>
                        </div>
                        {error && <div style={styles.errorBox}>{error}</div>}
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>{t('accountDeletion.passwordLabel')}</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('accountDeletion.passwordPlaceholder')}
                                style={styles.input}
                                disabled={isDeleting}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                {t('accountDeletion.confirmLabel', { phrase: CONFIRM_PHRASE })}
                            </label>
                            <input
                                type="text"
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                placeholder={CONFIRM_PHRASE}
                                style={{
                                    ...styles.input,
                                    borderColor:
                                        confirmText === CONFIRM_PHRASE ? '#23a559' : '#1e2024',
                                }}
                                disabled={isDeleting}
                            />
                        </div>
                        <div style={styles.buttonGroup}>
                            <button
                                aria-label={t('common.back', 'Back')}
                            >
                                {t('accountDeletion.back')}
                            </button>
                            <button
                                aria-label={t('accountDeletion.deleteAccount', 'Delete account')}
                                style={{
                                    ...styles.deleteButton,
                                    opacity: isDeleteDisabled ? 0.5 : 1,
                                    cursor: isDeleteDisabled ? 'not-allowed' : 'pointer',
                                }}
                                onClick={handleDelete}
                                disabled={isDeleteDisabled}
                            >
                                {isDeleting ? (
                                    <>
                                        <FaSpinner className="spin mr-8" />
                                        {t('accountDeletion.deleting')}
                                    </>
                                ) : (
                                    <>
                                        <FaTrash className="mr-8" />
                                        {t('accountDeletion.deleteForever')}
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

AccountDeletionModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirmDelete: PropTypes.func,
    username: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default AccountDeletionModal;

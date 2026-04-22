import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './LogoutModal.css';
import useModalA11y from '../../hooks/useModalA11y';

const LogoutModal = ({ isOpen, onClose, onConfirm, username }) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({ isOpen, onClose, label: 'Logout' });
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setIsLoggingOut(true);
        // Kısa bir animasyon for bekle
        await new Promise((resolve) => setTimeout(resolve, 500));
        onConfirm();
    };

    return (
        <div className="logout-modal-overlay" {...overlayProps}>
            <div className="logout-modal" {...dialogProps}>
                {!isLoggingOut ? (
                    <>
                        {/* Header */}
                        <div className="logout-modal-header">
                            <div className="logout-icon-container">
                                <span className="logout-icon">👋</span>
                            </div>
                            <h2 className="logout-title">{t('logout.title', 'Signing Out')}</h2>
                            <p className="logout-subtitle">
                                <span className="username-highlight">{username || 'User'}</span>,
                                {t('logout.confirm', 'Are you sure you want to sign out of your account?')}
                            </p>
                        </div>

                        {/* Info */}
                        <div className="logout-info">
                            <div className="info-item">
                                <span className="info-icon">🔒</span>
                                <span>{t('logout.secureSignout', 'Your session will be securely terminated')}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">💬</span>
                                <span>{t('logout.dataKept', 'Your messages and settings will be preserved')}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">🔔</span>
                                <span>{t('logout.noNotifs', 'You will no longer receive notifications')}</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="logout-buttons">
                            <button
                                aria-label={t('common.close', 'Close')}
                                className="logout-btn-cancel"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                aria-label={t('logoutModal.confirm', 'Confirm logout')}
                                className="logout-btn-confirm"
                                onClick={handleConfirm}
                            >
                                <span className="btn-icon">🚪</span>
                                Logout Yap
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="logout-loading">
                        <div className="logout-spinner"></div>
                        <p className="logout-loading-text">{t('logout.goodbye', 'Goodbye, {{username}}! 👋', { username })}</p>
                        <p className="logout-loading-subtext">{t('logout.closing', 'Closing your session...')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

LogoutModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    username: PropTypes.string,
};
export default LogoutModal;

import { useState } from 'react';
import PropTypes from 'prop-types';
import './LogoutModal.css';
import useModalA11y from '../../hooks/useModalA11y';

const LogoutModal = ({ isOpen, onClose, onConfirm, username }) => {
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
                            <h2 className="logout-title">Logout Yapılıyor</h2>
                            <p className="logout-subtitle">
                                <span className="username-highlight">{username || 'User'}</span>,
                                hesabınızdan kış yapmak istediğinize emin misiniz?
                            </p>
                        </div>

                        {/* Info */}
                        <div className="logout-info">
                            <div className="info-item">
                                <span className="info-icon">🔒</span>
                                <span>Oturumunuz güvenli şekilde sonlandırılacak</span>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">💬</span>
                                <span>Mesajlarınız ve settingsınız korunacak</span>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">🔔</span>
                                <span>Bildirimleri artık almayacaksınız</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="logout-buttons">
                            <button
                                aria-label="on Close"
                                className="logout-btn-cancel"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                aria-label="handle Confirm"
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
                        <p className="logout-loading-text">Güle güle, {username}! 👋</p>
                        <p className="logout-loading-subtext">Oturumunuz closeılıyor...</p>
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

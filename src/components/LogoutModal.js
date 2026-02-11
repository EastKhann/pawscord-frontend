import { useState } from 'react';
import './LogoutModal.css';

const LogoutModal = ({ isOpen, onClose, onConfirm, username }) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setIsLoggingOut(true);
        // Kısa bir animasyon için bekle
        await new Promise(resolve => setTimeout(resolve, 500));
        onConfirm();
    };

    return (
        <div className="logout-modal-overlay" onClick={onClose}>
            <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
                {!isLoggingOut ? (
                    <>
                        {/* Header */}
                        <div className="logout-modal-header">
                            <div className="logout-icon-container">
                                <span className="logout-icon">👋</span>
                            </div>
                            <h2 className="logout-title">Çıkış Yapılıyor</h2>
                            <p className="logout-subtitle">
                                <span className="username-highlight">{username || 'Kullanıcı'}</span>, hesabınızdan çıkış yapmak istediğinize emin misiniz?
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
                                <span>Mesajlarınız ve ayarlarınız korunacak</span>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">🔔</span>
                                <span>Bildirimler artık almayacaksınız</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="logout-buttons">
                            <button className="logout-btn-cancel" onClick={onClose}>
                                Vazgeç
                            </button>
                            <button className="logout-btn-confirm" onClick={handleConfirm}>
                                <span className="btn-icon">🚪</span>
                                Çıkış Yap
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="logout-loading">
                        <div className="logout-spinner"></div>
                        <p className="logout-loading-text">Güle güle, {username}! 👋</p>
                        <p className="logout-loading-subtext">Oturumunuz kapatılıyor...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LogoutModal;

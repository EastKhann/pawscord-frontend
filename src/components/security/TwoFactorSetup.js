/* eslint-disable jsx-a11y/no-autofocus */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import toast from '../../utils/toast';
import QRCode from 'qrcode';
import useModalA11y from '../../hooks/useModalA11y';
import logger from '../../utils/logger';
import './TwoFactorSetup.css';

const TwoFactorSetup = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen: true,
        label: 'Two-Factor Authentication Setup',
    });
    const { t } = useTranslation();
    const [step, setStep] = useState(1); // 1: QR, 2: Verify, 3: Backup Codes
    const [qrCode, setQrCode] = useState('');
    const [secret, setSecret] = useState('');
    const [backupCodes, setBackupCodes] = useState([]);
    const [verifyCode, setVerifyCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Step 1: Generate QR Code
    useEffect(() => {
        if (step === 1) {
            generateQRCode();
        }
    }, [step]);

    const generateQRCode = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/auth/2fa/enable/`, {
                method: 'POST',
            });

            if (res.ok) {
                const data = await res.json();
                setSecret(data.secret);

                // Generate QR code
                const qrDataUrl = await QRCode.toDataURL(data.otpauth_url);
                setQrCode(qrDataUrl);
            } else {
                const errorData = await res.json();
                setError(errorData.error || t('ui.qr_kod_olusturulamadi'));
            }
        } catch (err) {
            logger.error('QR Code generation error:', err);
            setError('Bağlantı hatası');
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify TOTP code
    const handleVerify = async () => {
        if (verifyCode.length !== 6) {
            setError('6 haneli kod giriniz');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/auth/2fa/verify-setup/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: verifyCode,
                    secret: secret,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setBackupCodes(data.backup_codes);
                setStep(3);
            } else {
                const errorData = await res.json();
                setError(errorData.error || t('common.invalidCode'));
            }
        } catch (err) {
            logger.error('Verification error:', err);
            setError('Doğrulama hatası');
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Download backup codes
    const downloadBackupCodes = () => {
        const text = backupCodes.join('\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pawscord-backup-codes.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleComplete = () => {
        toast.success(t('auth.2faEnabled'));
        onClose();
        window.location.reload(); // Refresh to update UI
    };

    return (
        <div className="twofa-modal-overlay" {...overlayProps}>
            <div className="twofa-modal-content" {...dialogProps}>
                <button aria-label="Close" className="twofa-close-btn" onClick={onClose}>
                    ×
                </button>

                <h2>🔐 Two-Factor Authentication</h2>

                {/* Step 1: QR Code */}
                {step === 1 && (
                    <div className="twofa-step">
                        <h3>Adım 1: QR Kodu Tara</h3>
                        <p>Google Authenticator veya Authy ile bu QR kodu tara:</p>

                        {loading ? (
                            <div className="twofa-loading">QR kodu oluşturuluyor...</div>
                        ) : qrCode ? (
                            <>
                                <img src={qrCode} alt="QR Code" className="twofa-qr-code" />
                                <div className="twofa-secret">
                                    <p>
                                        <strong>Manuel Kod:</strong>
                                    </p>
                                    <code>{secret}</code>
                                    <button
                                        aria-label="Action button"
                                        onClick={() => {
                                            navigator.clipboard.writeText(secret);
                                            toast.success(t('security.codeCopied'));
                                        }}
                                        className="twofa-copy-btn"
                                    >
                                        📋 Kopyala
                                    </button>
                                </div>
                                <button
                                    aria-label="Action button"
                                    onClick={() => setStep(2)}
                                    className="twofa-next-btn"
                                >
                                    İleri →
                                </button>
                            </>
                        ) : (
                            <div className="twofa-error">{error}</div>
                        )}
                    </div>
                )}

                {/* Step 2: Verify Code */}
                {step === 2 && (
                    <div className="twofa-step">
                        <h3>Adım 2: Doğrulama Kodu</h3>
                        <p>Doğrulayıcı uygulamanızdan 6 haneli kodu girin:</p>
                        <input
                            type="text"
                            maxLength="6"
                            value={verifyCode}
                            onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                            placeholder="000000"
                            className="twofa-code-input"
                            autoFocus
                            aria-label="Verify Code"
                        />

                        {error && <div className="twofa-error">{error}</div>}

                        <div className="twofa-buttons">
                            <button
                                aria-label="Action button"
                                onClick={() => setStep(1)}
                                className="twofa-back-btn"
                            >
                                Geri
                            </button>
                            <button
                                aria-label="handle Verify"
                                onClick={handleVerify}
                                disabled={loading || verifyCode.length !== 6}
                                className="twofa-verify-btn"
                            >
                                {loading ? 'Doğrulanıyor...' : t('auth.verify')}
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Backup Codes */}
                {step === 3 && (
                    <div className="twofa-step">
                        <h3>Adım 3: Yedek Kodlar</h3>
                        <p className="twofa-warning">
                            ⚠️ Bu kodları güvenli bir yerde saklayın! Telefonunuza erişiminizi
                            kaybederseniz kullanın.
                        </p>

                        <div className="twofa-backup-codes">
                            {backupCodes.map((code, index) => (
                                <div key={`item-${index}`} className="twofa-backup-code">
                                    {code}
                                </div>
                            ))}
                        </div>

                        <div className="twofa-buttons">
                            <button
                                aria-label="download Backup Codes"
                                onClick={downloadBackupCodes}
                                className="twofa-download-btn"
                            >
                                💾 İndir
                            </button>
                            <button
                                aria-label="handle Complete"
                                onClick={handleComplete}
                                className="twofa-complete-btn"
                            >
                                ✅ Tamam
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

TwoFactorSetup.propTypes = {
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default TwoFactorSetup;

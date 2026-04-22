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
            setError(t('twoFactor.connectionError', 'Connection error'));
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
            setError(t('twoFactor.verifyError', 'Verification error'));
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
                <button aria-label={t('common.close', 'Close')} className="twofa-close-btn" onClick={onClose}>
                    ×
                </button>

                <h2>🔐 Two-Factor Authentication</h2>

                {/* Step 1: QR Code */}
                {step === 1 && (
                    <div className="twofa-step">
                        <h3>{t('twoFactor.step1Title', 'Step 1: Scan QR Code')}</h3>
                        <p>Google Authenticator veya Authy ile bu QR kodu tara:</p>

                        {loading ? (
                            <div className="twofa-loading">{t('twoFactor.qrLoading', 'Generating QR code...')}</div>
                        ) : qrCode ? (
                            <>
                                <img src={qrCode} alt={t('alt.qrCode', 'QR Code')} className="twofa-qr-code" />
                                <div className="twofa-secret">
                                    <p>
                                        <strong>Manuel Kod:</strong>
                                    </p>
                                    <code>{secret}</code>
                                    <button
                                        aria-label={t('twoFactor.copySecret', 'Copy secret key')}
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
                                    aria-label={t('twoFactor.next', 'Next')}
                                    onClick={() => setStep(2)}
                                    className="twofa-next-btn"
                                >
                                    {t('twoFactor.next', 'Next →')}
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
                        <h3>{t('twoFactor.step2Title', 'Step 2: Verification Code')}</h3>
                        <p>{t('twoFactor.enterCode', 'Enter the 6-digit code from your authenticator app:')}</p>
                        <input
                            type="text"
                            maxLength="6"
                            value={verifyCode}
                            onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                            placeholder={t('twoFactor.code', '000000')}
                            className="twofa-code-input"
                            autoFocus
                            aria-label={t('twoFactor.verifyCode', 'Verification code')}
                        />

                        {error && <div className="twofa-error">{error}</div>}

                        <div className="twofa-buttons">
                            <button
                                aria-label={t('common.back', 'Go back')}
                                onClick={() => setStep(1)}
                                className="twofa-back-btn"
                            >
                                Geri
                            </button>
                            <button
                                aria-label={t('auth.verify', 'Verify')}
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
                        <h3>{t('twoFactor.step3Title', 'Step 3: Backup Codes')}</h3>
                        <p className="twofa-warning">
                            {t('twoFactor.backupWarning', '⚠️ Store these codes in a safe place! Use them if you lose access to your phone.')}
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
                                aria-label={t('twoFactor.download', 'Download backup codes')}
                                onClick={downloadBackupCodes}
                                className="twofa-download-btn"
                            >
                                {t('twoFactor.download', '💾 Download')}
                            </button>
                            <button
                                aria-label={t('twoFactor.complete', 'Complete setup')}
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

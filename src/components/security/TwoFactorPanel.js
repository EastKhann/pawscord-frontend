import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/TwoFactorPanel.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaShieldAlt, FaKey, FaCopy, FaCheck, FaQrcode, FaTrash } from 'react-icons/fa';
import toast from '../../utils/toast';
import './TwoFactorPanel.css';
import confirmDialog from '../../utils/confirmDialog';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
import { API_BASE_URL } from '../../utils/apiEndpoints';

const TwoFactorPanel = ({ onClose }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState('check'); // check, setup, verify, backup, complete
    const [qrCode, setQrCode] = useState('');
    const [secret, setSecret] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const [backupCodes, setBackupCodes] = useState([]);
    const [copied, setCopied] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkTwoFactorStatus();
    }, []);

    const checkTwoFactorStatus = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/2fa/status/`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            const data = await response.json();
            setIsEnabled(data.enabled);
            setStep(data.enabled ? 'complete' : 'check');
        } catch (error) {
            logger.error('2FA status check error:', error);
        }
    };

    const startSetup = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/2fa/enable/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setQrCode(data.qr_code);
                setSecret(data.secret);
                setStep('setup');
                toast.success(t('ui.2fa_kurulum_baslatildi'));
            } else {
                toast.error(t('ui.2fa_kurulumu_baslatilamadi'));
            }
        } catch (error) {
            toast.error(t('twoFactor.connectionError'));
        } finally {
            setLoading(false);
        }
    };

    const verifySetup = async () => {
        if (!verifyCode || verifyCode.length !== 6) {
            toast.error(t('twoFactor.enter6DigitCode'));
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/2fa/verify-setup/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: verifyCode }),
            });

            if (response.ok) {
                const data = await response.json();
                setBackupCodes(data.backup_codes);
                setStep('backup');
                toast.success(t('twoFactor.enabledSuccess'));
            } else {
                toast.error(t('ui.gecersiz_kod'));
            }
        } catch (error) {
            toast.error(t('twoFactor.validationError'));
        } finally {
            setLoading(false);
        }
    };

    const disable2FA = async () => {
        if (!(await confirmDialog(t('twoFactor.confirmDisable')))) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/2fa/disable/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.ok) {
                setIsEnabled(false);
                setStep('check');
                toast.success(t('ui.2fa_devre_disi_birakildi'));
            } else {
                toast.error(t('twoFactor.operationFailed'));
            }
        } catch (error) {
            toast.error(t('twoFactor.connectionError'));
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success(t('ui.kopyalandi'));
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadBackupCodes = () => {
        const text = backupCodes.join('\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pawscord-2fa-backup-codes.txt';
        a.click();
        toast.success(t('twoFactor.backupCodesDownloaded'));
    };

    return (
        <div
            className="two-factor-panel-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="two-factor-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="two-factor-header">
                    <FaShieldAlt className="header-icon" />
                    <h2>{t('twoFactor.title')}</h2>
                    <button aria-label="Close" className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="two-factor-content">
                    {step === 'check' && (
                        <div className="step-check">
                            <div className="info-box">
                                <FaShieldAlt size={48} color="#5865f2" />
                                <h3>{t('twoFactor.protectAccount')}</h3>
                                <p>{t('twoFactor.description')}</p>
                                <ul className="benefits-list">
                                    <li>✅ {t('twoFactor.benefit1')}</li>
                                    <li>✅ {t('twoFactor.benefit2')}</li>
                                    <li>✅ {t('twoFactor.benefit3')}</li>
                                </ul>
                            </div>
                            <button
                                aria-label="start Setup"
                                className="primary-btn"
                                onClick={startSetup}
                                disabled={loading}
                            >
                                {loading ? t('ui.startiliyor') : t('twoFactor.startSetup')}
                            </button>
                        </div>
                    )}

                    {step === 'setup' && (
                        <div className="step-setup">
                            <div className="qr-section">
                                <h3>
                                    <FaQrcode /> {t('twoFactor.scanQR')}
                                </h3>
                                <p>{t('twoFactor.scanQRDesc')}</p>
                                <div className="qr-code-container">
                                    <img src={qrCode} alt="2FA QR Code" />
                                </div>
                                <div className="secret-code">
                                    <p>{t('twoFactor.orEnterManually')}</p>
                                    <div className="code-box">
                                        <code>{secret}</code>
                                        <button
                                            aria-label="Copy"
                                            onClick={() => copyToClipboard(secret)}
                                        >
                                            {copied ? <FaCheck /> : <FaCopy />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="verify-section">
                                <h3>
                                    <FaKey /> {t('twoFactor.verificationCode')}
                                </h3>
                                <p>{t('twoFactor.enter6DigitFromApp')}</p>
                                <input
                                    type="text"
                                    className="verify-input"
                                    placeholder="000000"
                                    maxLength="6"
                                    value={verifyCode}
                                    onChange={(e) =>
                                        setVerifyCode(e.target.value.replace(/\D/g, ''))
                                    }
                                    onKeyDown={(e) => e.key === 'Enter' && verifySetup()}
                                />
                                <button
                                    aria-label="verify Setup"
                                    className="primary-btn"
                                    onClick={verifySetup}
                                    disabled={loading || verifyCode.length !== 6}
                                >
                                    {loading
                                        ? t('twoFactor.verifying')
                                        : t('ui.dogrula_ve_active_et')}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'backup' && (
                        <div className="step-backup">
                            <div className="warning-box">
                                <h3>⚠️ {t('twoFactor.backupCodesTitle')}</h3>
                                <p>{t('twoFactor.backupCodesDesc')}</p>
                            </div>
                            <div className="backup-codes">
                                {backupCodes.map((code, index) => (
                                    <div key={`item-${index}`} className="backup-code-item">
                                        <code>{code}</code>
                                    </div>
                                ))}
                            </div>
                            <div className="backup-actions">
                                <button
                                    aria-label="download Backup Codes"
                                    className="secondary-btn"
                                    onClick={downloadBackupCodes}
                                >
                                    {t('twoFactor.download')}
                                </button>
                                <button
                                    aria-label="Action button"
                                    className="primary-btn"
                                    onClick={() => {
                                        setStep('complete');
                                        setIsEnabled(true);
                                    }}
                                >
                                    {t('twoFactor.saveAndContinue')}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'complete' && isEnabled && (
                        <div className="step-complete">
                            <div className="success-box">
                                <FaCheck size={48} color="#23a559" />
                                <h3>{t('twoFactor.active')}</h3>
                                <p>{t('twoFactor.activeDesc')}</p>
                            </div>
                            <div className="info-list">
                                <div className="info-item">
                                    <strong>{t('twoFactor.authenticatorApps')}:</strong>
                                    <span>
                                        Google Authenticator, Authy, Microsoft Authenticator
                                    </span>
                                </div>
                                <div className="info-item">
                                    <strong>{t('twoFactor.backupCodesLabel')}:</strong>
                                    <span>{t('twoFactor.keepBackupCodesSafe')}</span>
                                </div>
                            </div>
                            <button
                                aria-label="disable2 F A"
                                className="danger-btn"
                                onClick={disable2FA}
                                disabled={loading}
                            >
                                <FaTrash />{' '}
                                {loading ? t('ui.devre_disi_birakiliyor') : t('twoFactor.disable')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

TwoFactorPanel.propTypes = {
    onClose: PropTypes.func,
};
export default TwoFactorPanel;

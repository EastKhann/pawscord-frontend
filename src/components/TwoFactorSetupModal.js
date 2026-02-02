// frontend/src/components/TwoFactorSetupModal.js
import React, { useState } from 'react';
import { FaShieldAlt, FaTimes, FaQrcode, FaKey, FaDownload, FaCopy, FaCheckCircle } from 'react-icons/fa';
import QRCode from 'qrcode.react';

const TwoFactorSetupModal = ({ onClose, fetchWithAuth, apiBaseUrl, currentUser }) => {
    const [step, setStep] = useState(1); // 1: Intro, 2: QR Code, 3: Verify, 4: Backup Codes
    const [secret, setSecret] = useState(null);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [backupCodes, setBackupCodes] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    // Step 1 → Step 2: Generate QR Code
    const handleEnable2FA = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/auth/2fa/enable/`, {
                method: 'POST'
            });

            if (response.ok) {
                const data = await response.json();
                setSecret(data.secret);
                setQrCodeUrl(data.provisioning_uri);
                // Backend'de backup codes yok, boş array
                setBackupCodes([]);
                setStep(2);
            } else {
                const errorData = await response.json();
                setError(errorData.error || '2FA kurulumu başarısız oldu');
            }
        } catch (error) {
            setError('Bağlantı hatası oluştu');
        } finally {
            setLoading(false);
        }
    };

    // Step 2 → Step 3: Verify Code
    const handleVerify = async () => {
        if (verificationCode.length !== 6) {
            setError('6 haneli kod gerekli');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/auth/2fa/verify-setup/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: verificationCode })
            });

            if (response.ok) {
                setStep(4);
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Doğrulama kodu yanlış');
            }
        } catch (error) {
            setError('Bağlantı hatası oluştu');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadBackupCodes = () => {
        const text = backupCodes.join('\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pawscord-2fa-backup-codes-${currentUser}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleCopySecret = () => {
        navigator.clipboard.writeText(secret);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleFinish = () => {
        // Reload page to update 2FA status
        window.location.reload();
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaShieldAlt style={styles.headerIcon} />
                        <h2 style={styles.title}>İki Faktörlü Doğrulama</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {/* Step 1: Introduction */}
                    {step === 1 && (
                        <div style={styles.stepContent}>
                            <div style={styles.infoBox}>
                                <h3 style={styles.infoTitle}>🔐 2FA Nedir?</h3>
                                <p style={styles.infoText}>
                                    İki faktörlü doğrulama, hesabınıza ekstra bir güvenlik katmanı ekler.
                                    Şifrenizin yanı sıra, telefonunuzdaki uygulamadan alacağınız 6 haneli
                                    bir kod da gerekir.
                                </p>
                            </div>

                            <div style={styles.stepsList}>
                                <h3 style={styles.stepsTitle}>Kurulum Adımları:</h3>
                                <ol style={styles.steps}>
                                    <li>Google Authenticator veya benzeri uygulama indirin</li>
                                    <li>QR kodunu tarayın</li>
                                    <li>6 haneli doğrulama kodunu girin</li>
                                    <li>Yedek kodları güvenli bir yere kaydedin</li>
                                </ol>
                            </div>

                            <div style={styles.warningBox}>
                                <p style={styles.warningText}>
                                    ⚠️ <strong>Önemli:</strong> Yedek kodları mutlaka kaydedin!
                                    Telefonunuzu kaybederseniz, bu kodlarla hesabınıza erişebilirsiniz.
                                </p>
                            </div>

                            <button
                                onClick={handleEnable2FA}
                                style={styles.primaryButton}
                                disabled={loading}
                            >
                                {loading ? 'Hazırlanıyor...' : '2FA\'yı Etkinleştir'}
                            </button>
                        </div>
                    )}

                    {/* Step 2: QR Code */}
                    {step === 2 && (
                        <div style={styles.stepContent}>
                            <h3 style={styles.stepTitle}>📱 Adım 1: QR Kodu Tarayın</h3>

                            <div style={styles.qrContainer}>
                                {qrCodeUrl && (
                                    <QRCode
                                        value={qrCodeUrl}
                                        size={200}
                                        level="H"
                                        includeMargin={true}
                                    />
                                )}
                            </div>

                            <div style={styles.manualEntry}>
                                <p style={styles.manualText}>
                                    QR kodu tarayamıyorsanız, manuel girin:
                                </p>
                                <div style={styles.secretBox}>
                                    <code style={styles.secretCode}>{secret}</code>
                                    <button
                                        onClick={handleCopySecret}
                                        style={styles.copyButton}
                                        title="Kopyala"
                                    >
                                        {copied ? <FaCheckCircle /> : <FaCopy />}
                                    </button>
                                </div>
                            </div>

                            <div style={styles.appList}>
                                <p style={styles.appListTitle}>Uyumlu Uygulamalar:</p>
                                <ul style={styles.apps}>
                                    <li>Google Authenticator (iOS, Android)</li>
                                    <li>Microsoft Authenticator</li>
                                    <li>Authy</li>
                                    <li>1Password</li>
                                </ul>
                            </div>

                            <button
                                onClick={() => setStep(3)}
                                style={styles.primaryButton}
                            >
                                Devam
                            </button>
                        </div>
                    )}

                    {/* Step 3: Verify Code */}
                    {step === 3 && (
                        <div style={styles.stepContent}>
                            <h3 style={styles.stepTitle}>🔑 Adım 2: Doğrulama Kodu</h3>

                            <p style={styles.instructionText}>
                                Authenticator uygulamanızdaki 6 haneli kodu girin:
                            </p>

                            <input
                                type="text"
                                maxLength={6}
                                placeholder="000000"
                                value={verificationCode}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    setVerificationCode(value);
                                }}
                                style={styles.codeInput}
                                autoFocus
                            />

                            {error && (
                                <div style={styles.errorBox}>
                                    ❌ {error}
                                </div>
                            )}

                            <button
                                onClick={handleVerify}
                                style={styles.primaryButton}
                                disabled={loading || verificationCode.length !== 6}
                            >
                                {loading ? 'Doğrulanıyor...' : 'Doğrula'}
                            </button>

                            <button
                                onClick={() => setStep(2)}
                                style={styles.secondaryButton}
                            >
                                ← Geri
                            </button>
                        </div>
                    )}

                    {/* Step 4: Backup Codes */}
                    {step === 4 && (
                        <div style={styles.stepContent}>
                            <div style={styles.successHeader}>
                                <FaCheckCircle style={styles.successIcon} />
                                <h3 style={styles.successTitle}>✅ 2FA Etkinleştirildi!</h3>
                            </div>

                            <div style={styles.backupCodesBox}>
                                <h4 style={styles.backupTitle}>
                                    <FaKey /> Yedek Kodlarınız
                                </h4>
                                <p style={styles.backupWarning}>
                                    ⚠️ Bu kodları güvenli bir yere kaydedin! Her kod sadece bir kere kullanılabilir.
                                </p>

                                <div style={styles.codesList}>
                                    {backupCodes.map((code, index) => (
                                        <div key={index} style={styles.backupCode}>
                                            <span style={styles.codeNumber}>{index + 1}.</span>
                                            <code style={styles.codeText}>{code}</code>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={handleDownloadBackupCodes}
                                    style={styles.downloadButton}
                                >
                                    <FaDownload /> Kodları İndir (.txt)
                                </button>
                            </div>

                            <button
                                onClick={handleFinish}
                                style={styles.primaryButton}
                            >
                                Tamam
                            </button>
                        </div>
                    )}
                </div>
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
        backdropFilter: 'blur(5px)'
    },
    modal: {
        backgroundColor: '#2b2d31',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
    },
    header: {
        padding: '20px',
        borderBottom: '1px solid #1e1f22',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    headerIcon: {
        fontSize: '24px',
        color: '#5865f2'
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#fff'
    },
    closeButton: {
        background: '#da373c',
        border: 'none',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px'
    },
    content: {
        flex: 1,
        overflow: 'auto',
        padding: '20px'
    },
    stepContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    infoBox: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '16px',
        borderLeft: '4px solid #5865f2'
    },
    infoTitle: {
        color: '#fff',
        fontSize: '16px',
        margin: '0 0 10px 0'
    },
    infoText: {
        color: '#b9bbbe',
        fontSize: '14px',
        margin: 0,
        lineHeight: '1.5'
    },
    stepsList: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '16px'
    },
    stepsTitle: {
        color: '#fff',
        fontSize: '16px',
        margin: '0 0 10px 0'
    },
    steps: {
        color: '#b9bbbe',
        fontSize: '14px',
        margin: 0,
        paddingLeft: '20px',
        lineHeight: '2'
    },
    warningBox: {
        backgroundColor: '#f0b132',
        borderRadius: '8px',
        padding: '12px'
    },
    warningText: {
        color: '#1e1f22',
        fontSize: '14px',
        margin: 0
    },
    primaryButton: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '12px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    secondaryButton: {
        backgroundColor: '#4e5058',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '12px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    stepTitle: {
        color: '#fff',
        fontSize: '18px',
        margin: 0,
        textAlign: 'center'
    },
    qrContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px'
    },
    manualEntry: {
        textAlign: 'center'
    },
    manualText: {
        color: '#b9bbbe',
        fontSize: '14px',
        marginBottom: '10px'
    },
    secretBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#1e1f22',
        padding: '10px',
        borderRadius: '6px',
        justifyContent: 'center'
    },
    secretCode: {
        color: '#5865f2',
        fontSize: '16px',
        fontFamily: 'monospace',
        letterSpacing: '2px'
    },
    copyButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '5px'
    },
    appList: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '16px'
    },
    appListTitle: {
        color: '#fff',
        fontSize: '14px',
        margin: '0 0 10px 0'
    },
    apps: {
        color: '#b9bbbe',
        fontSize: '14px',
        margin: 0,
        paddingLeft: '20px'
    },
    instructionText: {
        color: '#b9bbbe',
        fontSize: '14px',
        textAlign: 'center'
    },
    codeInput: {
        backgroundColor: '#1e1f22',
        border: '2px solid #5865f2',
        borderRadius: '6px',
        padding: '16px',
        color: '#fff',
        fontSize: '32px',
        textAlign: 'center',
        letterSpacing: '8px',
        fontFamily: 'monospace',
        width: '100%',
        boxSizing: 'border-box'
    },
    errorBox: {
        backgroundColor: '#da373c',
        color: '#fff',
        padding: '12px',
        borderRadius: '6px',
        textAlign: 'center'
    },
    successHeader: {
        textAlign: 'center'
    },
    successIcon: {
        fontSize: '64px',
        color: '#23a559',
        marginBottom: '10px'
    },
    successTitle: {
        color: '#fff',
        fontSize: '20px',
        margin: 0
    },
    backupCodesBox: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '16px'
    },
    backupTitle: {
        color: '#fff',
        fontSize: '16px',
        margin: '0 0 10px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    backupWarning: {
        color: '#f0b132',
        fontSize: '14px',
        marginBottom: '16px'
    },
    codesList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
        marginBottom: '16px'
    },
    backupCode: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#2b2d31',
        padding: '8px',
        borderRadius: '4px'
    },
    codeNumber: {
        color: '#747f8d',
        fontSize: '12px',
        minWidth: '20px'
    },
    codeText: {
        color: '#5865f2',
        fontSize: '14px',
        fontFamily: 'monospace'
    },
    downloadButton: {
        backgroundColor: '#23a559',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 16px',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'center',
        width: '100%'
    }
};

export default TwoFactorSetupModal;




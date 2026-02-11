import { useState, useEffect } from 'react';
import toast from '../utils/toast';
import QRCode from 'qrcode';
import './TwoFactorSetup.css';

const TwoFactorSetup = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
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
            const res = await fetchWithAuth(`${apiBaseUrl}/auth/2fa/setup/`, {
                method: 'POST'
            });

            if (res.ok) {
                const data = await res.json();
                setSecret(data.secret);

                // Generate QR code
                const qrDataUrl = await QRCode.toDataURL(data.otpauth_url);
                setQrCode(qrDataUrl);
            } else {
                const errorData = await res.json();
                setError(errorData.error || 'QR kod oluşturulamadı');
            }
        } catch (err) {
            console.error('QR Code generation error:', err);
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
            const res = await fetchWithAuth(`${apiBaseUrl}/auth/2fa/verify/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: verifyCode,
                    secret: secret
                })
            });

            if (res.ok) {
                const data = await res.json();
                setBackupCodes(data.backup_codes);
                setStep(3);
            } else {
                const errorData = await res.json();
                setError(errorData.error || 'Geçersiz kod');
            }
        } catch (err) {
            console.error('Verification error:', err);
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
        toast.success('✅ 2FA başarıyla etkinleştirildi!');
        onClose();
        window.location.reload(); // Refresh to update UI
    };

    return (
        <div className="twofa-modal-overlay" onClick={onClose}>
            <div className="twofa-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="twofa-close-btn" onClick={onClose}>×</button>

                <h2>🔐 İki Faktörlü Kimlik Doğrulama</h2>

                {/* Step 1: QR Code */}
                {step === 1 && (
                    <div className="twofa-step">
                        <h3>Adım 1: QR Kodu Tara</h3>
                        <p>Google Authenticator veya Authy uygulamasıyla bu QR kodu tarayın:</p>

                        {loading ? (
                            <div className="twofa-loading">QR kod oluşturuluyor...</div>
                        ) : qrCode ? (
                            <>
                                <img src={qrCode} alt="QR Code" className="twofa-qr-code" />
                                <div className="twofa-secret">
                                    <p><strong>Manuel Kod:</strong></p>
                                    <code>{secret}</code>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(secret);
                                            toast.success('✅ Kod kopyalandı!');
                                        }}
                                        className="twofa-copy-btn"
                                    >
                                        📋 Kopyala
                                    </button>
                                </div>
                                <button
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
                        <p>Authenticator uygulamasındaki 6 haneli kodu girin:</p>

                        <input
                            type="text"
                            maxLength="6"
                            value={verifyCode}
                            onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                            placeholder="000000"
                            className="twofa-code-input"
                            autoFocus
                        />

                        {error && <div className="twofa-error">{error}</div>}

                        <div className="twofa-buttons">
                            <button
                                onClick={() => setStep(1)}
                                className="twofa-back-btn"
                            >
                                ← Geri
                            </button>
                            <button
                                onClick={handleVerify}
                                disabled={loading || verifyCode.length !== 6}
                                className="twofa-verify-btn"
                            >
                                {loading ? 'Doğrulanıyor...' : 'Doğrula'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Backup Codes */}
                {step === 3 && (
                    <div className="twofa-step">
                        <h3>Adım 3: Yedek Kodlar</h3>
                        <p className="twofa-warning">
                            ⚠️ Bu kodları güvenli bir yerde saklayın! Telefonunuza erişemediğinizde bu kodları kullanabilirsiniz.
                        </p>

                        <div className="twofa-backup-codes">
                            {backupCodes.map((code, index) => (
                                <div key={index} className="twofa-backup-code">
                                    {code}
                                </div>
                            ))}
                        </div>

                        <div className="twofa-buttons">
                            <button
                                onClick={downloadBackupCodes}
                                className="twofa-download-btn"
                            >
                                💾 İndir
                            </button>
                            <button
                                onClick={handleComplete}
                                className="twofa-complete-btn"
                            >
                                ✅ Tamamla
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TwoFactorSetup;



// frontend/src/components/TwoFactorPanel.js
import { useState, useEffect } from 'react';
import { FaShieldAlt, FaKey, FaCopy, FaCheck, FaQrcode, FaTrash } from 'react-icons/fa';
import toast from '../utils/toast';
import './TwoFactorPanel.css';
import confirmDialog from '../utils/confirmDialog';

const TwoFactorPanel = ({ onClose }) => {
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
            const response = await fetch('/api/auth/2fa/status/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            const data = await response.json();
            setIsEnabled(data.enabled);
            setStep(data.enabled ? 'complete' : 'check');
        } catch (error) {
            console.error('2FA status check error:', error);
        }
    };

    const startSetup = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/auth/2fa/enable/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setQrCode(data.qr_code);
                setSecret(data.secret);
                setStep('setup');
                toast.success('✅ 2FA kurulum başlatıldı');
            } else {
                toast.error('❌ 2FA kurulumu başlatılamadı');
            }
        } catch (error) {
            toast.error('❌ Bağlantı hatası');
        } finally {
            setLoading(false);
        }
    };

    const verifySetup = async () => {
        if (!verifyCode || verifyCode.length !== 6) {
            toast.error('❌ 6 haneli kod girin');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/auth/2fa/verify/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: verifyCode })
            });

            if (response.ok) {
                const data = await response.json();
                setBackupCodes(data.backup_codes);
                setStep('backup');
                toast.success('✅ 2FA başarıyla aktif!');
            } else {
                toast.error('❌ Geçersiz kod');
            }
        } catch (error) {
            toast.error('❌ Doğrulama hatası');
        } finally {
            setLoading(false);
        }
    };

    const disable2FA = async () => {
        if (!await confirmDialog('2FA\'yı devre dışı bırakmak istediğinizden emin misiniz?')) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/auth/2fa/disable/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            if (response.ok) {
                setIsEnabled(false);
                setStep('check');
                toast.success('✅ 2FA devre dışı bırakıldı');
            } else {
                toast.error('❌ İşlem başarısız');
            }
        } catch (error) {
            toast.error('❌ Bağlantı hatası');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success('✅ Kopyalandı');
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
        toast.success('✅ Yedek kodlar indirildi');
    };

    return (
        <div className="two-factor-panel-overlay" onClick={onClose}>
            <div className="two-factor-panel" onClick={(e) => e.stopPropagation()}>
                <div className="two-factor-header">
                    <FaShieldAlt className="header-icon" />
                    <h2>İki Faktörlü Doğrulama (2FA)</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="two-factor-content">
                    {step === 'check' && (
                        <div className="step-check">
                            <div className="info-box">
                                <FaShieldAlt size={48} color="#7289da" />
                                <h3>Hesabınızı Koruyun</h3>
                                <p>
                                    İki faktörlü doğrulama ile hesabınıza ekstra güvenlik katmanı ekleyin.
                                    Giriş yaparken telefon uygulamanızdan 6 haneli kod girmeniz gerekecek.
                                </p>
                                <ul className="benefits-list">
                                    <li>✅ Hesap güvenliğini %99.9 artırır</li>
                                    <li>✅ Yetkisiz erişimi engeller</li>
                                    <li>✅ Google Authenticator, Authy destekler</li>
                                </ul>
                            </div>
                            <button 
                                className="primary-btn" 
                                onClick={startSetup}
                                disabled={loading}
                            >
                                {loading ? 'Başlatılıyor...' : '2FA Kurulumunu Başlat'}
                            </button>
                        </div>
                    )}

                    {step === 'setup' && (
                        <div className="step-setup">
                            <div className="qr-section">
                                <h3><FaQrcode /> QR Kodu Tara</h3>
                                <p>Authenticator uygulamanızla bu QR kodu tarayın:</p>
                                <div className="qr-code-container">
                                    <img src={qrCode} alt="2FA QR Code" />
                                </div>
                                <div className="secret-code">
                                    <p>Veya manuel kod girin:</p>
                                    <div className="code-box">
                                        <code>{secret}</code>
                                        <button onClick={() => copyToClipboard(secret)}>
                                            {copied ? <FaCheck /> : <FaCopy />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="verify-section">
                                <h3><FaKey /> Doğrulama Kodu</h3>
                                <p>Uygulamanızdan 6 haneli kodu girin:</p>
                                <input
                                    type="text"
                                    className="verify-input"
                                    placeholder="000000"
                                    maxLength="6"
                                    value={verifyCode}
                                    onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                                    onKeyPress={(e) => e.key === 'Enter' && verifySetup()}
                                />
                                <button 
                                    className="primary-btn" 
                                    onClick={verifySetup}
                                    disabled={loading || verifyCode.length !== 6}
                                >
                                    {loading ? 'Doğrulanıyor...' : 'Doğrula ve Aktif Et'}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'backup' && (
                        <div className="step-backup">
                            <div className="warning-box">
                                <h3>⚠️ Yedek Kodlarınız</h3>
                                <p>
                                    Bu kodları güvenli bir yerde saklayın! Telefonunuzu kaybederseniz
                                    hesabınıza bu kodlarla giriş yapabilirsiniz.
                                </p>
                            </div>
                            <div className="backup-codes">
                                {backupCodes.map((code, index) => (
                                    <div key={index} className="backup-code-item">
                                        <code>{code}</code>
                                    </div>
                                ))}
                            </div>
                            <div className="backup-actions">
                                <button className="secondary-btn" onClick={downloadBackupCodes}>
                                    📥 İndir
                                </button>
                                <button 
                                    className="primary-btn" 
                                    onClick={() => {
                                        setStep('complete');
                                        setIsEnabled(true);
                                    }}
                                >
                                    Kaydet ve Devam Et
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'complete' && isEnabled && (
                        <div className="step-complete">
                            <div className="success-box">
                                <FaCheck size={48} color="#43b581" />
                                <h3>2FA Aktif!</h3>
                                <p>Hesabınız artık iki faktörlü doğrulama ile korunuyor.</p>
                            </div>
                            <div className="info-list">
                                <div className="info-item">
                                    <strong>Authenticator Uygulamaları:</strong>
                                    <span>Google Authenticator, Authy, Microsoft Authenticator</span>
                                </div>
                                <div className="info-item">
                                    <strong>Yedek Kodlar:</strong>
                                    <span>Kaydettiğiniz yedek kodları güvenli tutun</span>
                                </div>
                            </div>
                            <button className="danger-btn" onClick={disable2FA} disabled={loading}>
                                <FaTrash /> {loading ? 'Devre Dışı Bırakılıyor...' : '2FA\'yı Devre Dışı Bırak'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TwoFactorPanel;

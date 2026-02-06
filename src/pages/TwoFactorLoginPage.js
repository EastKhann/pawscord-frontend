// frontend/src/pages/TwoFactorLoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaShieldAlt, FaArrowLeft, FaKey } from 'react-icons/fa';
import { API_BASE_URL } from '../utils/constants';
import { useAuth } from '../AuthContext';

const TwoFactorLoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [code, setCode] = useState('');
    const [useBackupCode, setUseBackupCode] = useState(false);
    const [backupCode, setBackupCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Get temp_token from URL query params
    const tempToken = searchParams.get('temp_token');

    useEffect(() => {
        if (!tempToken) {
            // Redirect to login if no temp_token
            console.warn('🔐 [2FA] No temp_token found, redirecting to login');
            navigate('/login');
        }
    }, [tempToken, navigate]);

    if (!tempToken) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const codeToSend = useBackupCode ? backupCode : code;

        if (!codeToSend) {
            setError('Kod gerekli');
            setLoading(false);
            return;
        }

        try {
            console.log('🔐 [2FA] Verifying code with temp_token...');
            const response = await fetch(`${API_BASE_URL}/security/2fa/verify-login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    temp_token: tempToken,
                    code: codeToSend
                })
            });

            const data = await response.json();

            if (response.ok && data.verified) {
                console.log('✅ [2FA] Verification successful, logging in...');
                // Use AuthContext login — sets tokens, user state, schedules refresh
                login(data.access, data.refresh);
                navigate('/');
            } else {
                console.error('❌ [2FA] Verification failed:', data);
                setError(data.error || 'Geçersiz kod');
            }
        } catch (error) {
            console.error('❌ [2FA] Network error:', error);
            setError('Bağlantı hatası oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <button onClick={() => navigate('/login')} style={styles.backButton}>
                    <FaArrowLeft /> Geri
                </button>

                <FaShieldAlt style={styles.icon} />
                <h2 style={styles.title}>İki Faktörlü Doğrulama</h2>
                <p style={styles.subtitle}>
                    {useBackupCode ? 'Yedek kodunuzu girin' : 'Authenticator uygulamanızdaki 6 haneli kodu girin'}
                </p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {!useBackupCode ? (
                        <>
                            <input
                                type="text"
                                maxLength={6}
                                placeholder="000000"
                                value={code}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    setCode(value);
                                }}
                                style={styles.codeInput}
                                autoFocus
                                disabled={loading}
                            />

                            <button
                                type="button"
                                onClick={() => setUseBackupCode(true)}
                                style={styles.backupLink}
                            >
                                <FaKey /> Yedek kod kullan
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Yedek kod"
                                value={backupCode}
                                onChange={(e) => setBackupCode(e.target.value)}
                                style={styles.backupInput}
                                autoFocus
                                disabled={loading}
                            />

                            <button
                                type="button"
                                onClick={() => setUseBackupCode(false)}
                                style={styles.backupLink}
                            >
                                ← Authenticator kodu kullan
                            </button>
                        </>
                    )}

                    {error && (
                        <div style={styles.error}>
                            ❌ {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        style={styles.submitButton}
                        disabled={loading || (!useBackupCode && code.length !== 6) || (useBackupCode && !backupCode)}
                    >
                        {loading ? 'Doğrulanıyor...' : 'Giriş Yap'}
                    </button>
                </form>

                <div style={styles.info}>
                    <p style={styles.infoTitle}>💡 İpuçları:</p>
                    <ul style={styles.infoList}>
                        <li>Kod sürekli değişir (30 saniyede bir)</li>
                        <li>Telefonunuzu kaybettiyseniz yedek kod kullanın</li>
                        <li>Her yedek kod sadece bir kere kullanılabilir</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e1f22',
        padding: '20px'
    },
    card: {
        backgroundColor: '#2b2d31',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        position: 'relative'
    },
    backButton: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'color 0.2s'
    },
    icon: {
        fontSize: '64px',
        color: '#5865f2',
        display: 'block',
        margin: '0 auto 20px'
    },
    title: {
        color: '#fff',
        fontSize: '28px',
        textAlign: 'center',
        margin: '0 0 10px 0'
    },
    subtitle: {
        color: '#b9bbbe',
        fontSize: '16px',
        textAlign: 'center',
        marginBottom: '30px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
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
        outline: 'none'
    },
    backupInput: {
        backgroundColor: '#1e1f22',
        border: '1px solid #1e1f22',
        borderRadius: '6px',
        padding: '12px',
        color: '#fff',
        fontSize: '16px',
        textAlign: 'center',
        fontFamily: 'monospace',
        outline: 'none'
    },
    backupLink: {
        background: 'none',
        border: 'none',
        color: '#5865f2',
        cursor: 'pointer',
        fontSize: '14px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px'
    },
    error: {
        backgroundColor: '#da373c',
        color: '#fff',
        padding: '12px',
        borderRadius: '6px',
        fontSize: '14px',
        textAlign: 'center'
    },
    submitButton: {
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
    info: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '15px',
        marginTop: '20px'
    },
    infoTitle: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '0 0 10px 0'
    },
    infoList: {
        color: '#b9bbbe',
        fontSize: '14px',
        margin: 0,
        paddingLeft: '20px'
    }
};

export default TwoFactorLoginPage;




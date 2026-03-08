// frontend/src/pages/ForgotPasswordPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useRecaptcha } from '../utils/recaptcha';

const ForgotPasswordPage = ({ apiBaseUrl }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, sent
    const [error, setError] = useState('');
    const { getToken: getRecaptchaToken } = useRecaptcha();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setStatus('loading');

        try {
            // 🤖 reCAPTCHA token al
            const recaptchaToken = await getRecaptchaToken('password_reset');

            const response = await fetch(`${apiBaseUrl}/auth/request-password-reset/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, recaptcha_token: recaptchaToken })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('sent');
            } else {
                setError(data.error || 'Bir hata oluştu');
                setStatus('idle');
            }
        } catch (error) {
            setError('Bağlantı hatası oluştu');
            setStatus('idle');
        }
    };

    if (status === 'sent') {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <FaCheckCircle style={{ ...styles.icon, color: '#23a559' }} />
                    <h2 style={styles.title}>Email Gönderildi!</h2>
                    <p style={styles.text}>
                        Eğer <strong>{email}</strong> adresine kayıtlı bir hesap varsa,
                        şifre sıfırlama linki gönderildi.
                    </p>
                    <p style={styles.infoText}>
                        📧 Email'inizi kontrol edin (Spam klasörünü de kontrol etmeyi unutmayın)
                    </p>
                    <p style={styles.infoText}>
                        ⏱️ Link 1 saat geçerlidir
                    </p>
                    <button onClick={() => navigate('/login')} style={styles.button}>
                        Giriş Sayfasına Dön
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <button onClick={() => navigate('/login')} style={styles.backButton}>
                    <FaArrowLeft /> Geri
                </button>

                <FaEnvelope style={styles.icon} />
                <h2 style={styles.title}>Şifremi Unuttum</h2>
                <p style={styles.text}>
                    Email adresinizi girin, size şifre sıfırlama linki gönderelim.
                </p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Email adresiniz"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                        disabled={status === 'loading'}
                    />

                    {error && (
                        <div style={styles.error}>
                            ❌ {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        style={styles.submitButton}
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Gönderiliyor...' : 'Sıfırlama Linki Gönder'}
                    </button>
                </form>

                <div style={styles.info}>
                    <p style={styles.infoTitle}>💡 Bilgi:</p>
                    <ul style={styles.infoList}>
                        <li>Email hesabınıza erişiminiz olmalı</li>
                        <li>Link 1 saat geçerlidir</li>
                        <li>Güvenlik nedeniyle email'in kayıtlı olup olmadığını söylemiyoruz</li>
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
        background: 'radial-gradient(ellipse at 15% 20%, rgba(88,101,242,0.16) 0%, transparent 50%), radial-gradient(ellipse at 85% 80%, rgba(124,58,237,0.10) 0%, transparent 48%), #0d0e10',
        padding: '20px'
    },
    card: {
        background: 'rgba(30, 31, 35, 0.88)',
        backdropFilter: 'blur(48px) saturate(180%)',
        WebkitBackdropFilter: 'blur(48px) saturate(180%)',
        borderRadius: '22px',
        padding: '44px 40px',
        maxWidth: '500px',
        width: '100%',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 0 0 1px rgba(88,101,242,0.08), 0 32px 80px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.06)',
        position: 'relative',
        animation: 'authCardIn 0.5s cubic-bezier(0.22,1,0.36,1)'
    },
    backButton: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '10px',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        padding: '6px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s'
    },
    icon: {
        fontSize: '64px',
        color: '#5865f2',
        display: 'block',
        margin: '0 auto 20px',
        filter: 'drop-shadow(0 4px 20px rgba(88,101,242,0.55))'
    },
    title: {
        background: 'linear-gradient(135deg, #ffffff 30%, #9ba5ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontSize: '28px',
        fontWeight: '800',
        textAlign: 'center',
        margin: '0 0 10px 0'
    },
    text: {
        color: '#b5bac1',
        fontSize: '16px',
        textAlign: 'center',
        marginBottom: '30px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    input: {
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '10px',
        padding: '12px',
        color: '#fff',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.2s'
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
        background: 'linear-gradient(135deg, #5865f2 0%, #4549c4 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '13px',
        padding: '13px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'opacity 0.2s, transform 0.15s',
        boxShadow: '0 4px 0 #3b45c7, 0 8px 24px rgba(88,101,242,0.40)'
    },
    button: {
        background: 'linear-gradient(135deg, #5865f2 0%, #4549c4 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '13px',
        padding: '13px 32px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '20px',
        display: 'block',
        width: '100%',
        boxShadow: '0 4px 0 #3b45c7, 0 8px 24px rgba(88,101,242,0.40)'
    },
    info: {
        background: 'rgba(88,101,242,0.07)',
        border: '1px solid rgba(88,101,242,0.20)',
        borderRadius: '12px',
        padding: '15px',
        marginTop: '20px'
    },
    infoTitle: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '0 0 10px 0'
    },
    infoText: {
        color: '#b5bac1',
        fontSize: '14px',
        textAlign: 'center',
        margin: '10px 0'
    },
    infoList: {
        color: '#b5bac1',
        fontSize: '14px',
        margin: 0,
        paddingLeft: '20px'
    }
};

export default ForgotPasswordPage;




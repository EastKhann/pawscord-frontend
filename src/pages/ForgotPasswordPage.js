// frontend/src/pages/ForgotPasswordPage.js
import React, { useState } from 'react';
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
                    <FaCheckCircle style={{...styles.icon, color: '#23a559'}} />
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
    text: {
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
    input: {
        backgroundColor: '#1e1f22',
        border: '1px solid #1e1f22',
        borderRadius: '6px',
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
    button: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '12px 32px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '20px',
        display: 'block',
        width: '100%'
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
    infoText: {
        color: '#b9bbbe',
        fontSize: '14px',
        textAlign: 'center',
        margin: '10px 0'
    },
    infoList: {
        color: '#b9bbbe',
        fontSize: '14px',
        margin: 0,
        paddingLeft: '20px'
    }
};

export default ForgotPasswordPage;




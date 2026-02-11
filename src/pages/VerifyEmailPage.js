// frontend/src/pages/VerifyEmailPage.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const VerifyEmailPage = ({ apiBaseUrl }) => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading'); // loading, success, error
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        verifyEmail();
    }, [token]);

    const verifyEmail = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/auth/verify-email/${token}/`);
            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setUsername(data.username);
                setMessage('Email adresiniz başarıyla doğrulandı!');

                // 3 saniye sonra login'e yönlendir
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setStatus('error');
                setMessage(data.error || 'Doğrulama başarısız oldu');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Bağlantı hatası oluştu');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {status === 'loading' && (
                    <div style={styles.content}>
                        <FaSpinner style={styles.iconLoading} />
                        <h2 style={styles.title}>Email Doğrulanıyor...</h2>
                        <p style={styles.text}>Lütfen bekleyin...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div style={styles.content}>
                        <FaCheckCircle style={{...styles.icon, color: '#23a559'}} />
                        <h2 style={styles.title}>✅ Başarılı!</h2>
                        <p style={styles.text}>{message}</p>
                        <p style={styles.username}>Hoş geldin, {username}!</p>
                        <p style={styles.redirect}>3 saniye içinde giriş sayfasına yönlendirileceksiniz...</p>
                        <button onClick={() => navigate('/login')} style={styles.button}>
                            Hemen Giriş Yap
                        </button>
                    </div>
                )}

                {status === 'error' && (
                    <div style={styles.content}>
                        <FaTimesCircle style={{...styles.icon, color: '#da373c'}} />
                        <h2 style={styles.title}>❌ Hata</h2>
                        <p style={styles.text}>{message}</p>
                        <div style={styles.errorReasons}>
                            <p style={styles.reasonTitle}>Olası sebepler:</p>
                            <ul style={styles.reasonList}>
                                <li>Link süresi dolmuş olabilir (24 saat)</li>
                                <li>Link daha önce kullanılmış olabilir</li>
                                <li>Geçersiz bir link olabilir</li>
                            </ul>
                        </div>
                        <button onClick={() => navigate('/login')} style={styles.button}>
                            Giriş Sayfasına Dön
                        </button>
                    </div>
                )}
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
        textAlign: 'center'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
    },
    icon: {
        fontSize: '64px',
        marginBottom: '10px'
    },
    iconLoading: {
        fontSize: '64px',
        color: '#5865f2',
        animation: 'spin 1s linear infinite',
        marginBottom: '10px'
    },
    title: {
        color: '#fff',
        fontSize: '28px',
        margin: 0
    },
    text: {
        color: '#b9bbbe',
        fontSize: '16px',
        margin: 0
    },
    username: {
        color: '#5865f2',
        fontSize: '20px',
        fontWeight: 'bold',
        margin: 0
    },
    redirect: {
        color: '#747f8d',
        fontSize: '14px',
        fontStyle: 'italic'
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
        marginTop: '10px',
        transition: 'background-color 0.2s'
    },
    errorReasons: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '10px',
        textAlign: 'left'
    },
    reasonTitle: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '10px'
    },
    reasonList: {
        color: '#b9bbbe',
        fontSize: '14px',
        margin: 0,
        paddingLeft: '20px'
    }
};

export default VerifyEmailPage;




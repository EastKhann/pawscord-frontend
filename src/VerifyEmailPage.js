// frontend/src/VerifyEmailPage.js (YENİ VE ŞIK HALİ)

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa'; // İkonları ekledik
import { API_BASE_URL } from './utils/constants';

// --- URL AYARLARI (Centralized from constants.js) ---
const VERIFY_EMAIL_URL = `${API_BASE_URL}/auth/verify-email/`;
// ------------------------------------

const VerifyEmailPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading'); // loading, success, error
    const [message, setMessage] = useState('Hesabınız doğrulanıyor, lütfen bekleyin...');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Geçersiz veya eksik doğrulama kodu.');
            return;
        }

        const verify = async () => {
            try {
                const response = await fetch(`${VERIFY_EMAIL_URL}${token}/`);
                const data = await response.json();

                if (response.ok) {
                    setStatus('success');
                    // Backend'den gelen mesajı ezebiliriz veya kullanabiliriz.
                    // Burada senin istediğin özel mesajı yazıyoruz:
                    setMessage('Üyeliğiniz başarıyla aktif edildi!');
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Doğrulama başarısız oldu.');
                }
            } catch (error) {
                setStatus('error');
                setMessage('Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.');
            }
        };

        // Biraz gecikme ekleyelim ki kullanıcı "Yükleniyor" ekranını görüp ne olduğunu anlasın (opsiyonel estetik)
        setTimeout(() => {
            verify();
        }, 1000);

    }, [token]);

    return (
        <div style={styles.container}>
            <div style={styles.card}>

                {/* 1. YÜKLENİYOR DURUMU */}
                {status === 'loading' && (
                    <div style={styles.content}>
                        <FaSpinner className="spin-animation" size={50} color="#5865f2" style={{ marginBottom: 20 }} />
                        <h2 style={styles.title}>Doğrulanıyor...</h2>
                        <p style={styles.text}>{message}</p>
                    </div>
                )}

                {/* 2. BAŞARILI DURUMU */}
                {status === 'success' && (
                    <div style={styles.content}>
                        <FaCheckCircle size={60} color="#43b581" style={{ marginBottom: 20 }} />
                        <h2 style={{ ...styles.title, color: '#43b581' }}>Tebrikler! 🎉</h2>
                        <p style={styles.text}>{message}</p>
                        <p style={styles.subText}>Artık Pawscord'a tam erişim sağlayabilirsin.</p>

                        <button
                            onClick={() => navigate('/')}
                            style={styles.primaryButton}
                        >
                            GİRİŞ YAP
                        </button>
                    </div>
                )}

                {/* 3. HATA DURUMU */}
                {status === 'error' && (
                    <div style={styles.content}>
                        <FaTimesCircle size={60} color="#f04747" style={{ marginBottom: 20 }} />
                        <h2 style={{ ...styles.title, color: '#f04747' }}>Hata Oluştu</h2>
                        <p style={styles.text}>{message}</p>

                        <button
                            onClick={() => navigate('/')}
                            style={styles.secondaryButton}
                        >
                            Ana Sayfaya Dön
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100dvh',
        backgroundColor: '#1e1f22', // Pawscord koyu tema
        fontFamily: "'Poppins', sans-serif",
        padding: '20px'
    },
    card: {
        backgroundColor: '#2b2d31',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        border: '1px solid #1f2023'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        margin: '0 0 10px 0',
        color: '#fff',
        fontSize: '1.8em'
    },
    text: {
        color: '#dbdee1',
        fontSize: '1.1em',
        margin: '0 0 20px 0',
        lineHeight: '1.5'
    },
    subText: {
        color: '#949ba4',
        fontSize: '0.9em',
        marginBottom: '30px'
    },
    primaryButton: {
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        padding: '12px 30px',
        borderRadius: '5px',
        fontSize: '1em',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        width: '100%'
    },
    secondaryButton: {
        backgroundColor: '#4f545c',
        color: 'white',
        border: 'none',
        padding: '12px 30px',
        borderRadius: '5px',
        fontSize: '1em',
        fontWeight: 'bold',
        cursor: 'pointer',
        width: '100%'
    }
};

// Dönen animasyon için stil ekleme
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .spin-animation { animation: spin 1s linear infinite; }
  @keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(styleSheet);

export default React.memo(VerifyEmailPage);


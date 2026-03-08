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
                        <FaCheckCircle size={60} color="#23a559" style={{ marginBottom: 20 }} />
                        <h2 style={{ ...styles.title, color: '#23a559' }}>Tebrikler! 🎉</h2>
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
                        <FaTimesCircle size={60} color="#f23f42" style={{ marginBottom: 20 }} />
                        <h2 style={{ ...styles.title, color: '#f23f42' }}>Hata Oluştu</h2>
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
        background: 'radial-gradient(ellipse at 15% 20%, rgba(88,101,242,0.16) 0%, transparent 50%), radial-gradient(ellipse at 85% 80%, rgba(124,58,237,0.10) 0%, transparent 48%), #0d0e10',
        fontFamily: "'Poppins', sans-serif",
        padding: '20px'
    },
    card: {
        background: 'rgba(30, 31, 35, 0.88)',
        backdropFilter: 'blur(48px) saturate(180%)',
        WebkitBackdropFilter: 'blur(48px) saturate(180%)',
        borderRadius: '22px',
        padding: '44px 40px',
        maxWidth: '420px',
        width: '100%',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 0 0 1px rgba(88,101,242,0.08), 0 32px 80px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.06)',
        animation: 'authCardIn 0.5s cubic-bezier(0.22,1,0.36,1)'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        margin: '0 0 10px 0',
        color: '#fff',
        fontSize: '1.8em',
        fontWeight: 700
    },
    text: {
        color: '#b5bac1',
        fontSize: '1.05em',
        margin: '0 0 20px 0',
        lineHeight: '1.6'
    },
    subText: {
        color: '#80848e',
        fontSize: '0.9em',
        marginBottom: '30px'
    },
    primaryButton: {
        background: 'linear-gradient(135deg, #5865f2 0%, #4549c4 100%)',
        color: 'white',
        border: 'none',
        padding: '13px 30px',
        borderRadius: '13px',
        fontSize: '1em',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'opacity 0.2s, transform 0.15s',
        width: '100%',
        boxShadow: '0 4px 0 #3b45c7, 0 8px 24px rgba(88,101,242,0.40)'
    },
    secondaryButton: {
        background: 'rgba(255,255,255,0.07)',
        color: '#b5bac1',
        border: '1px solid rgba(255,255,255,0.10)',
        padding: '13px 30px',
        borderRadius: '13px',
        fontSize: '1em',
        fontWeight: 'bold',
        cursor: 'pointer',
        width: '100%',
        transition: 'background 0.2s'
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


// frontend/src/SpotifyCallback.js

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const SpotifyCallback = ({ apiBaseUrl }) => {
    const [status, setStatus] = useState('loading'); // loading, success, error
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');
        const error = queryParams.get('error');

        if (error) {
            setStatus('error');
            return;
        }

        if (code) {
            const token = localStorage.getItem('access_token');

            fetch(`${apiBaseUrl}/spotify/callback/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ code })
            })
                .then(res => {
                    if (res.ok) {
                        setStatus('success');
                        // 🔥 DÜZELTME: Sert yenileme yerine yumuşak geçiş yapıyoruz
                        setTimeout(() => {
                            navigate('/', { replace: true });
                        }, 1500);
                    } else {
                        setStatus('error');
                    }
                })
                .catch(err => {
                    console.error(err);
                    setStatus('error');
                });
        }
    }, [location, apiBaseUrl, navigate]);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {status === 'loading' && (
                    <>
                        <FaSpinner className="spin" size={50} color="#1db954" style={{ marginBottom: 20 }} />
                        <h2>Spotify Bağlanıyor...</h2>
                        <p>Token alınıyor, lütfen bekleyin.</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <FaCheckCircle size={60} color="#1db954" style={{ marginBottom: 20 }} />
                        <h2 style={{ color: '#1db954' }}>Başarılı!</h2>
                        <p>Hesabın bağlandı. Sohbet ekranına dönülüyor...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <FaTimesCircle size={60} color="#f04747" style={{ marginBottom: 20 }} />
                        <h2 style={{ color: '#f04747' }}>Hata Oluştu</h2>
                        <p>Bağlantı kurulamadı.</p>
                        <button onClick={() => navigate('/')} style={styles.button}>Geri Dön</button>
                    </>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh',
        backgroundColor: '#191414', color: 'white', fontFamily: 'Poppins, sans-serif'
    },
    card: {
        backgroundColor: '#282828', padding: '40px', borderRadius: '16px', textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)', maxWidth: '400px', width: '90%'
    },
    button: {
        marginTop: '20px', padding: '10px 20px', borderRadius: '20px', border: 'none',
        backgroundColor: '#1db954', color: 'white', fontWeight: 'bold', cursor: 'pointer'
    }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(styleSheet);

export default React.memo(SpotifyCallback);


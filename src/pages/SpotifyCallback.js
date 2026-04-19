import { getToken } from '../utils/tokenStorage';
// frontend/src/SpotifyCallback.js

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import logger from '../utils/logger';

// -- extracted inline style constants --
const _st1 = { marginBottom: '16px' };
const _st2 = { color: '#1db954', marginBottom: '8px' };
const _st3 = { color: '#f23f42', marginBottom: '8px' };

const SpotifyCallback = ({ apiBaseUrl }) => {
    const [status, setStatus] = useState('loading'); // loading, success, error
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');
        const error = queryParams.get('error');

        if (error) {
            setStatus('error');
            return;
        }

        if (code) {
            const token = getToken();

            fetch(`${apiBaseUrl}/spotify/callback/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ code }),
            })
                .then((res) => {
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
                .catch((err) => {
                    logger.error(err);
                    setStatus('error');
                });
        }
    }, [location, apiBaseUrl, navigate]);

    return (
        <div aria-label="spotify callback" style={styles.container}>
            <div style={styles.card}>
                {status === 'loading' && (
                    <>
                        <FaSpinner className="spin" size={50} color="#1db954" style={_st1} />
                        <h2>{t('spotify.connecting', 'Spotify Bağlanıyor...')}</h2>
                        <p>{t('spotify.gettingToken', 'Getting token, please wait.')}</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <FaCheckCircle size={60} color="#1db954" style={_st1} />
                        <h2 style={_st2}>{t('spotify.successful', 'Successful!')}</h2>
                        <p>
                            {t('spotify.accountConnected', 'Hesap bağlandı. Sohbete dönülüyor...')}
                        </p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <FaTimesCircle size={60} color="#f23f42" style={_st1} />
                        <h2 style={_st3}>{t('spotify.errorOccurred', 'An Error Occurred')}</h2>
                        <p>{t('spotify.connectionFailed', 'Connection failed.')}</p>
                        <button onClick={() => navigate('/')} style={styles.button}>
                            {t('spotify.goBack', 'Go Back')}
                        </button>
                    </>
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
        background:
            'radial-gradient(ellipse at 15% 20%, rgba(29,185,84,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 80%, rgba(88,101,242,0.08) 0%, transparent 48%), #0d0e10',
        color: 'white',
        fontFamily: 'Poppins, sans-serif',
    },
    card: {
        background: 'rgba(30, 31, 35, 0.88)',
        backdropFilter: 'blur(48px) saturate(180%)',
        WebkitBackdropFilter: 'blur(48px) saturate(180%)',
        padding: '44px 40px',
        borderRadius: '22px',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow:
            '0 0 0 1px rgba(29,185,84,0.08), 0 32px 80px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.06)',
        maxWidth: '400px',
        width: '90%',
        animation: 'authCardIn 0.5s cubic-bezier(0.22,1,0.36,1)',
    },
    button: {
        marginTop: '20px',
        padding: '12px 28px',
        borderRadius: '13px',
        border: 'none',
        background: 'linear-gradient(135deg, #1db954, #17a346)',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '15px',
        boxShadow: '0 4px 16px rgba(29,185,84,0.30)',
    },
};

const styleSheet = document.createElement('style');
styleSheet.innerText = `
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(styleSheet);

SpotifyCallback.propTypes = {
    apiBaseUrl: PropTypes.string,
};
export default React.memo(SpotifyCallback);

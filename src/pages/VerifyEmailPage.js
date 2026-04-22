// frontend/src/pages/VerifyEmailPage.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// -- dynamic style helpers (pass 2) --
const _st1081 = { fontSize: '64px', marginBottom: '10px', color: '#23a559' };
const _st1082 = { fontSize: '64px', marginBottom: '10px', color: '#f23f42' };

const VerifyEmailPage = ({ apiBaseUrl }) => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
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
                setMessage(t('auth.emailVerified'));

                // 3 saniye sonra login'e yönlendir
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setStatus('error');
                setMessage(data.error || t('auth.verifyFailed'));
            }
        } catch (error) {
            setStatus('error');
            setMessage(t('common.connectionError','A connection error occurred'));
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {status === 'loading' && (
                    <div style={styles.content}>
                        <FaSpinner style={styles.iconLoading} />
                        <h2 style={styles.title}>{t('auth.verifyingEmail')}</h2>
                        <p style={styles.text}>{t('auth.pleaseWait')}</p>
                    </div>
                )}

                {status === 'success' && (
                    <div style={styles.content}>
                        <FaCheckCircle style={_st1081} />
                        <h2 style={styles.title}>✅ {t('auth.verifySuccess')}</h2>
                        <p style={styles.text}>{message}</p>
                        <p style={styles.username}>{t('auth.welcomeUser', { username })}</p>
                        <p style={styles.redirect}>{t('auth.redirectingLogin')}</p>
                        <button
                            onClick={() => navigate('/login')}
                            style={styles.button}
                            aria-label={t('auth.loginNow')}
                        >
                            {t('auth.loginNow')}
                        </button>
                    </div>
                )}

                {status === 'error' && (
                    <div style={styles.content}>
                        <FaTimesCircle style={_st1082} />
                        <h2 style={styles.title}>❌ {t('auth.verifyError')}</h2>
                        <p style={styles.text}>{message}</p>
                        <div style={styles.errorReasons}>
                            <p style={styles.reasonTitle}>{t('auth.possibleReasons')}:</p>
                            <ul style={styles.reasonList}>
                                <li>{t('auth.linkExpired')}</li>
                                <li>{t('auth.linkAlreadyUsed')}</li>
                                <li>{t('auth.invalidLink')}</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => navigate('/login')}
                            style={styles.button}
                            aria-label={t('auth.backToLogin')}
                        >
                            {t('auth.backToLogin')}
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
        backgroundColor: '#0d0e10',
        padding: '20px',
    },
    card: {
        backgroundColor: '#111214',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
    },
    icon: {
        fontSize: '64px',
        marginBottom: '10px',
    },
    iconLoading: {
        fontSize: '64px',
        color: '#5865f2',
        animation: 'spin 1s linear infinite',
        marginBottom: '10px',
    },
    title: {
        color: '#fff',
        fontSize: '28px',
        margin: 0,
    },
    text: {
        color: '#b5bac1',
        fontSize: '16px',
        margin: 0,
    },
    username: {
        color: '#5865f2',
        fontSize: '20px',
        fontWeight: 'bold',
        margin: 0,
    },
    redirect: {
        color: '#80848e',
        fontSize: '14px',
        fontStyle: 'italic',
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
        transition: 'background-color 0.2s',
    },
    errorReasons: {
        backgroundColor: '#0d0e10',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '10px',
        textAlign: 'left',
    },
    reasonTitle: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    reasonList: {
        color: '#b5bac1',
        fontSize: '14px',
        margin: 0,
        paddingLeft: '20px',
    },
};

VerifyEmailPage.propTypes = {
    apiBaseUrl: PropTypes.string.isRequired,
};
export default VerifyEmailPage;

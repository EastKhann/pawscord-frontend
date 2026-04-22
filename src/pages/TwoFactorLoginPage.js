/* eslint-disable jsx-a11y/no-autofocus */
// frontend/src/pages/TwoFactorLoginPage.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaShieldAlt, FaArrowLeft, FaKey } from 'react-icons/fa';
import { API_BASE_URL } from '../utils/constants';
import { useAuth } from '../AuthContext';
import logger from '../utils/logger';

const TwoFactorLoginPage = () => {
    const { t } = useTranslation();
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
            logger.warn('🔐 [2FA] No temp_token found, redirecting to login');
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
            const response = await fetch(`${API_BASE_URL}/security/2fa/verify-login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    temp_token: tempToken,
                    code: codeToSend,
                }),
            });

            const data = await response.json();

            if (response.ok && data.verified) {
                // Use AuthContext login — sets tokens, user state, schedules refresh
                login(data.access, data.refresh);
                navigate('/');
            } else {
                logger.error('❌ [2FA] Verification failed:', data);
                setError(data.error || t('common.invalidCode'));
            }
        } catch (error) {
            logger.error('❌ [2FA] Network error:', error);
            setError(t('common.connectionError', 'A connection error occurred'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <button
                    onClick={() => navigate('/login')}
                    style={styles.backButton}
                    aria-label={t('common.back')}
                >
                    <FaArrowLeft /> {t('common.back')}
                </button>

                <FaShieldAlt style={styles.icon} />
                <h2 style={styles.title}>{t('auth.twoFactorAuth')}</h2>
                <p style={styles.subtitle}>
                    {useBackupCode ? t('auth.enterBackupCode') : t('auth.twoFactorDesc')}
                </p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {!useBackupCode ? (
                        <>
                            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                            <input
                                type="text"
                                maxLength={6}
                                placeholder={t('twoFactor.code', '000000')}
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
                                aria-label={t('auth.useBackupCode')}
                            >
                                <FaKey /> {t('auth.useBackupCode')}
                            </button>
                        </>
                    ) : (
                        <>
                            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                            <input
                                type="text"
                                placeholder={t('auth.backupCodePlaceholder')}
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
                                aria-label={t('auth.useTOTP')}
                            >
                                ← {t('auth.useTOTP')}
                            </button>
                        </>
                    )}

                    {error && (
                        <div style={styles.error} role="alert">
                            ❌ {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        style={styles.submitButton}
                        disabled={
                            loading ||
                            (!useBackupCode && code.length !== 6) ||
                            (useBackupCode && !backupCode)
                        }
                        aria-label={t('auth.verifyCode')}
                    >
                        {loading ? t('auth.verifying') : t('auth.verifyCode')}
                    </button>
                </form>

                <div style={styles.info}>
                    <p style={styles.infoTitle}>💡 {t('common.info')}:</p>
                    <ul style={styles.infoList}>
                        <li>{t('auth.codeRotates', 'Code changes every 30 seconds')}</li>
                        <li>
                            {t(
                                'auth.useBackupIfLostPhone',
                                'Use backup code if you lost your phone'
                            )}
                        </li>
                        <li>
                            {t(
                                'auth.backupCodeSingleUse',
                                'Each backup code can only be used once'
                            )}
                        </li>
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
        background:
            'radial-gradient(ellipse at 15% 20%, rgba(88,101,242,0.16) 0%, transparent 50%), radial-gradient(ellipse at 85% 80%, rgba(124,58,237,0.10) 0%, transparent 48%), #0d0e10',
        padding: '20px',
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
        boxShadow:
            '0 0 0 1px rgba(88,101,242,0.08), 0 32px 80px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.06)',
        position: 'relative',
        animation: 'authCardIn 0.5s cubic-bezier(0.22,1,0.36,1)',
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
        transition: 'all 0.2s',
    },
    icon: {
        fontSize: '64px',
        color: '#5865f2',
        display: 'block',
        margin: '0 auto 20px',
        filter: 'drop-shadow(0 4px 20px rgba(88,101,242,0.55))',
    },
    title: {
        background: 'linear-gradient(135deg, #ffffff 30%, #9ba5ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontSize: '28px',
        fontWeight: '800',
        textAlign: 'center',
        margin: '0 0 10px 0',
    },
    subtitle: {
        color: '#b5bac1',
        fontSize: '16px',
        textAlign: 'center',
        marginBottom: '30px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    codeInput: {
        background: 'rgba(255,255,255,0.05)',
        border: '2px solid rgba(88,101,242,0.6)',
        borderRadius: '12px',
        padding: '16px',
        color: '#fff',
        fontSize: '32px',
        textAlign: 'center',
        letterSpacing: '8px',
        fontFamily: 'monospace',
        outline: 'none',
        boxShadow: '0 0 0 4px rgba(88,101,242,0.12), 0 4px 20px rgba(88,101,242,0.18)',
    },
    backupInput: {
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '10px',
        padding: '12px',
        color: '#fff',
        fontSize: '16px',
        textAlign: 'center',
        fontFamily: 'monospace',
        outline: 'none',
    },
    backupLink: {
        background: 'rgba(88,101,242,0.08)',
        border: '1px solid rgba(88,101,242,0.18)',
        borderRadius: '10px',
        color: '#8b95ff',
        cursor: 'pointer',
        fontSize: '14px',
        padding: '8px 14px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        transition: 'all 0.2s',
    },
    error: {
        backgroundColor: '#da373c',
        color: '#fff',
        padding: '12px',
        borderRadius: '6px',
        fontSize: '14px',
        textAlign: 'center',
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
        boxShadow: '0 4px 0 #3b45c7, 0 8px 24px rgba(88,101,242,0.40)',
    },
    info: {
        background: 'rgba(88,101,242,0.07)',
        border: '1px solid rgba(88,101,242,0.20)',
        borderRadius: '12px',
        padding: '15px',
        marginTop: '20px',
    },
    infoTitle: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '0 0 10px 0',
    },
    infoList: {
        color: '#b5bac1',
        fontSize: '14px',
        margin: 0,
        paddingLeft: '20px',
    },
};

TwoFactorLoginPage.propTypes = {};
export default TwoFactorLoginPage;

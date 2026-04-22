import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import api from '../api';
import './AuthCallback.css';

import { useTranslation } from 'react-i18next';
import logger from '../utils/logger';
/**
 * 🔐 Auth Callback Page
 * Handles OAuth callback - supports both direct token and code exchange
 */

// HashRouter puts search params inside the hash fragment, so useSearchParams
// may not see them in every browser.  Parse them ourselves as a fallback.
function getCallbackParams() {
    // 1) Try the real search string (BrowserRouter / direct navigation)
    let sp = new URLSearchParams(window.location.search);
    if (sp.get('access_token') || sp.get('code') || sp.get('error')) return sp;

    // 2) HashRouter: hash looks like  #/auth/callback?access_token=...
    const hash = window.location.hash; // e.g. "#/auth/callback?access_token=xxx"
    const qIdx = hash.indexOf('?');
    if (qIdx !== -1) {
        sp = new URLSearchParams(hash.substring(qIdx));
        if (sp.get('access_token') || sp.get('code') || sp.get('error')) return sp;
    }

    return sp; // empty
}

const AuthCallback = ({ apiBaseUrl }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [status, setStatus] = useState('processing');
    const [error, setError] = useState(null);
    const exchangeAttempted = useRef(false);
    const timerRefs = useRef([]);

    useEffect(() => {
        const handleCallback = async () => {
            // Prevent double execution (React StrictMode / re-renders)
            if (exchangeAttempted.current) {
                return;
            }
            exchangeAttempted.current = true;

            const searchParams = getCallbackParams();
            const code = searchParams.get('code');
            const accessToken = searchParams.get('access_token');
            const refreshToken = searchParams.get('refresh_token');
            const errorParam = searchParams.get('error');
            const needsPassword = searchParams.get('needs_password') === 'true';

            if (import.meta.env.DEV)
                logger.log('🔐 [AuthCallback] Params:', {
                    hasToken: !!accessToken,
                    hasCode: !!code,
                    hasError: !!errorParam,
                    hash: window.location.hash?.substring(0, 60),
                });

            // Check for error
            if (errorParam) {
                logger.error('🔐 [AuthCallback] Error param:', errorParam);
                setStatus('error');
                setError(t('auth.googleFailed','Google login failed. Please try again.'));
                timerRefs.current.push(
                    setTimeout(() => {
                        try {
                            navigate('/', { replace: true });
                        } catch (_) {
                            window.location.hash = '#/';
                        }
                    }, 2000)
                );
                return;
            }

            // 🔐 DIRECT TOKEN MODE: Access token in URL, refresh in httpOnly cookie
            if (accessToken) {
                try {
                    // Store access token
                    localStorage.setItem('access_token', accessToken);

                    // Update auth context (refresh token is in httpOnly cookie)
                    if (login) {
                        await login(accessToken);
                    }

                    setStatus('success');

                    // Navigate immediately — no delay
                    const target = needsPassword
                        ? '/settings?section=security&action=set-password'
                        : '/';
                    try {
                        navigate(target, { replace: true });
                    } catch (_) {
                        /* fallback below */
                    }

                    // Hard fallback: if navigate() didn't work, force redirect after 800ms
                    timerRefs.current.push(
                        setTimeout(() => {
                            window.location.hash = `#${target}`;
                        }, 800)
                    );
                } catch (err) {
                    logger.error('🔐 [AuthCallback] Direct token error:', err);
                    setStatus('error');
                    setError(t('auth.tokenError','Token processing error.'));
                    timerRefs.current.push(
                        setTimeout(() => {
                            try {
                                navigate('/', { replace: true });
                            } catch (_) {
                                window.location.hash = '#/';
                            }
                        }, 2000)
                    );
                }
                return;
            }

            // 🔐 CODE EXCHANGE MODE: Exchange code for tokens
            if (!code) {
                logger.error(
                    '🔐 [AuthCallback] No code or tokens found. Hash:',
                    window.location.hash
                );
                setStatus('error');
                setError(t('auth.authNotFound','Authorization information not found.'));
                timerRefs.current.push(
                    setTimeout(() => {
                        try {
                            navigate('/', { replace: true });
                        } catch (_) {
                            window.location.hash = '#/';
                        }
                    }, 2000)
                );
                return;
            }

            try {
                setStatus('exchanging');

                const exchangeUrl = `${apiBaseUrl}/auth/exchange-code/`;

                // Exchange auth code for tokens (secure exchange)
                const response = await api.post(exchangeUrl, {
                    code: code,
                });

                if (response.data.success) {
                    const { access_token, user_id, needs_password } = response.data;

                    // Store only access token — refresh token is in httpOnly cookie from backend
                    localStorage.setItem('access_token', access_token);

                    // Update auth context (refresh token comes from httpOnly cookie)
                    if (login) {
                        await login(access_token);
                    }

                    setStatus('success');

                    // Navigate immediately
                    const target = needs_password
                        ? '/settings?section=security&action=set-password'
                        : '/';
                    try {
                        navigate(target, { replace: true });
                    } catch (_) {
                        /* fallback below */
                    }
                    timerRefs.current.push(
                        setTimeout(() => {
                            window.location.hash = `#${target}`;
                        }, 800)
                    );
                } else {
                    throw new Error(response.data.error || 'Token exchange failed');
                }
            } catch (err) {
                logger.error('Auth callback error:', err);
                setStatus('error');
                setError(err.response?.data?.error || 'Login failed.');
                timerRefs.current.push(
                    setTimeout(() => {
                        try {
                            navigate('/', { replace: true });
                        } catch (_) {
                            window.location.hash = '#/';
                        }
                    }, 2000)
                );
            }
        };

        handleCallback();

        return () => {
            timerRefs.current.forEach((id) => clearTimeout(id));
            timerRefs.current = [];
        };
    }, [navigate, login, apiBaseUrl]);

    return (
        <div aria-label={t('aria.authCallback', 'Authentication')} className="auth-callback-container">
            <div className="auth-callback-card">
                {status === 'processing' && (
                    <>
                        <div className="auth-spinner"></div>
                        <h2>{t('auth.processing', 'Processing...')}</h2>
                        <p>{t('auth.verifyingGoogle', 'Verifying your Google account')}</p>
                    </>
                )}

                {status === 'exchanging' && (
                    <>
                        <div className="auth-spinner"></div>
                        <h2>{t('auth.loggingIn', 'Signing in...')}</h2>
                        <p>{t('auth.secureConnection', 'Establishing secure connection')}</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="auth-success-icon">✓</div>
                        <h2>{t('auth.loginSuccess', 'Sign In Successful!')}</h2>
                        <p>{t('auth.redirecting', 'Redirecting...')}</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="auth-error-icon">✕</div>
                        <h2>{t('common.error')}</h2>
                        <p>{error}</p>
                        <p className="auth-redirect-text">{t('auth.redirectingHome', 'Redirecting to home page...')}</p>
                    </>
                )}
            </div>
        </div>
    );
};

AuthCallback.propTypes = {
    apiBaseUrl: PropTypes.string,
};
export default AuthCallback;

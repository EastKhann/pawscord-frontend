import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import api from './api';
import './AuthCallback.css';

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

            console.log('🔐 [AuthCallback] Params:', {
                hasToken: !!accessToken, hasCode: !!code, hasError: !!errorParam,
                hash: window.location.hash?.substring(0, 60)
            });


            // Check for error
            if (errorParam) {
                console.error('🔐 [AuthCallback] Error param:', errorParam);
                setStatus('error');
                setError('Google giriş başarısız oldu. Lütfen tekrar deneyin.');
                timerRefs.current.push(setTimeout(() => {
                    try { navigate('/', { replace: true }); } catch (_) { window.location.hash = '#/'; }
                }, 2000));
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
                    const target = needsPassword ? '/settings?section=security&action=set-password' : '/';
                    try { navigate(target, { replace: true }); } catch (_) { /* fallback below */ }

                    // Hard fallback: if navigate() didn't work, force redirect after 800ms
                    timerRefs.current.push(setTimeout(() => {
                        window.location.hash = `#${target}`;
                    }, 800));
                } catch (err) {
                    console.error('🔐 [AuthCallback] Direct token error:', err);
                    setStatus('error');
                    setError('Token işleme hatası.');
                    timerRefs.current.push(setTimeout(() => {
                        try { navigate('/', { replace: true }); } catch (_) { window.location.hash = '#/'; }
                    }, 2000));
                }
                return;
            }

            // 🔐 CODE EXCHANGE MODE: Exchange code for tokens
            if (!code) {
                console.error('🔐 [AuthCallback] No code or tokens found. Hash:', window.location.hash);
                setStatus('error');
                setError('Yetkilendirme bilgisi bulunamadı.');
                timerRefs.current.push(setTimeout(() => {
                    try { navigate('/', { replace: true }); } catch (_) { window.location.hash = '#/'; }
                }, 2000));
                return;
            }

            try {
                setStatus('exchanging');

                const exchangeUrl = `${apiBaseUrl}/auth/exchange-code/`;

                // Exchange auth code for tokens (secure exchange)
                const response = await api.post(exchangeUrl, {
                    code: code
                });


                if (response.data.success) {
                    const { access_token, refresh_token, user_id, needs_password } = response.data;

                    // Store tokens securely
                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('refreshToken', refresh_token);

                    // Update auth context
                    if (login) {
                        await login(access_token, refresh_token);
                    }

                    setStatus('success');

                    // Navigate immediately
                    const target = needs_password ? '/settings?section=security&action=set-password' : '/';
                    try { navigate(target, { replace: true }); } catch (_) { /* fallback below */ }
                    timerRefs.current.push(setTimeout(() => { window.location.hash = `#${target}`; }, 800));
                } else {
                    throw new Error(response.data.error || 'Token exchange failed');
                }
            } catch (err) {
                console.error('Auth callback error:', err);
                setStatus('error');
                setError(err.response?.data?.error || 'Giriş işlemi başarısız oldu.');
                timerRefs.current.push(setTimeout(() => {
                    try { navigate('/', { replace: true }); } catch (_) { window.location.hash = '#/'; }
                }, 2000));
            }
        };

        handleCallback();

        return () => {
            timerRefs.current.forEach(id => clearTimeout(id));
            timerRefs.current = [];
        };
    }, [navigate, login, apiBaseUrl]);

    return (
        <div className="auth-callback-container">
            <div className="auth-callback-card">
                {status === 'processing' && (
                    <>
                        <div className="auth-spinner"></div>
                        <h2>İşleniyor...</h2>
                        <p>Google hesabınız doğrulanıyor</p>
                    </>
                )}

                {status === 'exchanging' && (
                    <>
                        <div className="auth-spinner"></div>
                        <h2>Giriş Yapılıyor...</h2>
                        <p>Güvenli bağlantı kuruluyor</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="auth-success-icon">✓</div>
                        <h2>Giriş Başarılı!</h2>
                        <p>Yönlendiriliyorsunuz...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="auth-error-icon">✕</div>
                        <h2>Hata</h2>
                        <p>{error}</p>
                        <p className="auth-redirect-text">Ana sayfaya yönlendiriliyorsunuz...</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthCallback;

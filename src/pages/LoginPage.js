/* eslint-disable no-undef */
// frontend/src/LoginPage.js

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaUser, FaLock, FaEnvelope, FaPaw, FaEye, FaEyeSlash, FaDownload } from 'react-icons/fa';
import { Capacitor } from '@capacitor/core';
import DownloadModal from '../components/shared/DownloadModal';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import toast from '../utils/toast';
import { useRecaptcha } from '../utils/recaptcha';
import { jwtDecode } from 'jwt-decode'; // 🔥 FIX: Import jwtDecode for user extraction
import { API_BASE_URL, isElectron, GOOGLE_WEB_CLIENT_ID } from '../utils/constants';
import logger from '../utils/logger';

// LoginPage.css is imported in main.jsx (main bundle) to prevent FOUC

const LoginPage = ({ onLogin, onRegister, error, setAuthError }) => {
    const { t } = useTranslation();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const { getToken: getRecaptchaToken } = useRecaptcha();
    const isNativeApp = Capacitor.isNativePlatform();

    // ✅ 0. GOOGLE AUTH INITIALIZE (Mobile for gerekli)
    useEffect(() => {
        if (Capacitor.isNativePlatform()) {
            try {
                GoogleAuth.initialize({
                    clientId: GOOGLE_WEB_CLIENT_ID,
                    scopes: ['profile', 'email'],
                    grantOfflineAccess: true,
                });
            } catch (error) {
                logger.error('❌ [Google] Initialization failed:', error);
            }
        }
    }, []);

    // 🔗 ELECTRON OAUTH ERROR / CANCELLED LISTENERS ONLY
    // The actual deep-link → token → login flow is handled in AuthContext so it
    // works whether or not LoginPage is currently mounted. Here we only watch
    // for explicit error/cancel events to surface them in the form UI.
    useEffect(() => {
        if (!isElectron || !window.electron) return;

        const handleAuthError = (error) => {
            logger.error('❌ [Electron] Google auth error:', error);
            setAuthError(t('auth.googleFailed'));
            setIsGoogleLoading(false);
        };

        try {
            window.electron.onGoogleAuthError?.(handleAuthError);
            window.electron.onGoogleAuthCancelled?.(() => setIsGoogleLoading(false));
        } catch (e) {
            logger.warn('[Login/Electron] Failed to register error listeners:', e);
        }
    }, [setAuthError, t]);

    // ✅ 2. WEB SİTESİ URL DİNLEYİCİSİ (OAuth Callback for)
    useEffect(() => {
        if (!isElectron) {
            const params = new URLSearchParams(window.location.search);
            const accessToken = params.get('access');
            const refreshToken = params.get('refresh');
            const error = params.get('error');

            // Check for error first
            if (error) {
                logger.error('❌ [Web] OAuth error from URL:', error);
                setAuthError(decodeURIComponent(error));
                // Clean URL
                window.history.replaceState({}, document.title, '/');
                return;
            }

            // Check for tokens (successful OAuth)
            if (accessToken && refreshToken) {
                try {
                    // 🔥 FIX: Decode token and save username IMMEDIATELY
                    const decoded = jwtDecode(accessToken);

                    // Clear old user data first (CRITICAL!)
                    localStorage.removeItem('chat_username');

                    // Set new token and username atomically
                    localStorage.setItem('access_token', accessToken);
                    localStorage.removeItem('refresh_token');
                    localStorage.setItem('chat_username', decoded.username);

                    // Clean URL and reload
                    window.history.replaceState({}, document.title, '/');
                    window.location.reload();
                } catch (storageError) {
                    logger.error('❌ [Web] LocalStorage error:', storageError);
                    setAuthError(t('auth.storageError'));
                }
            }
        }
        // Intentionally run once on mount to handle OAuth redirect params
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 🔄 Electron OAuth polling fallback — polls backend every 2s for tokens
    const startOAuthPolling = (sessionId, oauthBaseUrl) => {
        const maxAttempts = 90; // 3 minutes max
        let attempts = 0;
        const interval = setInterval(async () => {
            attempts++;
            if (attempts > maxAttempts) {
                clearInterval(interval);
                setIsGoogleLoading(false);
                return;
            }
            try {
                const res = await fetch(`${oauthBaseUrl}/auth/poll-oauth/?session=${sessionId}`);
                if (res.status === 200) {
                    clearInterval(interval);
                    const data = await res.json();
                    if (data.access && data.refresh) {
                        const decoded = jwtDecode(data.access);
                        localStorage.removeItem('chat_username');
                        localStorage.setItem('access_token', data.access);
                        localStorage.removeItem('refresh_token');
                        localStorage.setItem('chat_username', decoded.username);
                        window.electron?.focusWindow?.();
                        setTimeout(() => window.location.reload(), 300);
                    }
                }
                // 202 = still pending, keep polling
            } catch (_) {
                // network error — keep polling
            }
        }, 2000);
    };

    // ✅ 3. AKILLI GOOGLE GİRİŞ BUTONU
    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true);
        try {
            if (Capacitor.isNativePlatform()) {
                // MOBILE: Capacitor Google Auth kullan
                const googleUser = await GoogleAuth.signIn();

                // 🔥 FIX: idToken null olabilir (forceCodeForRefreshToken=true iken)
                const idToken = googleUser?.authentication?.idToken;
                if (!idToken) {
                    logger.error(
                        '❌ [Google] idToken null! googleUser:',
                        JSON.stringify(googleUser)
                    );
                    setAuthError(t('auth.googleTokenError'));
                    return;
                }

                // Token'ı Backend'e Send (POST /auth/google/native/)
                const url = `${API_BASE_URL}/auth/google/native/`;

                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({ token: idToken }),
                });

                // Content-Type kontrolü
                const contentType = response.headers.get('content-type');

                if (!contentType || !contentType.includes('application/json')) {
                    const textResponse = await response.text();
                    logger.error(
                        '❌ [Google] Backend returned HTML:',
                        textResponse.substring(0, 500)
                    );
                    setAuthError(t('auth.backendError'));
                    return;
                }

                const data = await response.json();

                if (response.ok) {
                    if (data.access && data.refresh) {
                        // 🔥 FIX: username'i de save (diğer login flow'ları gibi)
                        localStorage.removeItem('chat_username');
                        localStorage.setItem('access_token', data.access);
                        localStorage.removeItem('refresh_token');
                        if (data.username) {
                            localStorage.setItem('chat_username', data.username);
                        } else {
                            try {
                                const decoded = jwtDecode(data.access);
                                localStorage.setItem('chat_username', decoded.username);
                            } catch (e) {
                                /* token decode failed, will be set on reload */
                            }
                        }
                        window.location.reload();
                    } else {
                        logger.error('❌ [Google] Tokens eksik:', data);
                        setAuthError(t('auth.tokenMissing'));
                    }
                } else {
                    logger.error('❌ [Google] Login failed:', data);
                    setAuthError(data.error || t('auth.googleFailed'));
                }
            } else {
                // WEB & ELECTRON: Redirect to Google
                const source = isElectron ? 'electron' : 'web';
                // 🔥 FIX: Electron for api.pawscord.com kullan (www subdomain /api route'u yok)
                const oauthBaseUrl = isElectron ? 'https://api.pawscord.com/api' : API_BASE_URL;

                // 🔄 ELECTRON: Generate session_id for polling fallback (deep-link unreliable in dev)
                let redirectUrl = `${oauthBaseUrl}/auth/google/start/?source=${source}`;
                if (isElectron) {
                    const sessionId = crypto.randomUUID
                        ? crypto.randomUUID()
                        : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                            (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
                    redirectUrl += `&session_id=${sessionId}`;
                    startOAuthPolling(sessionId, oauthBaseUrl);
                }

                // 🔥 ELECTRON İÇİN: contextBridge API ile tarayıcıda aç
                if (isElectron && window.electron?.startGoogleLogin) {
                    window.electron.startGoogleLogin(redirectUrl);
                } else {
                    // WEB for: Normal redirect
                    window.location.href = redirectUrl;
                }
            }
        } catch (error) {
            logger.error('❌ [Google] Unexpected error:', error);
            setAuthError(t('auth.googleError') + ': ' + error.message);
        } finally {
            setIsGoogleLoading(false);
        }
    };

    // ✅ 4. NORMAL FORM GİRİŞİ (reCAPTCHA korumalı)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAuthError('');

        try {
            // 🤖 reCAPTCHA v3 token al
            const recaptchaToken = await getRecaptchaToken(isLoginMode ? 'login' : 'register');

            if (isLoginMode) {
                await onLogin(formData.username, formData.password, recaptchaToken);
            } else {
                const success = await onRegister(
                    formData.username,
                    formData.email,
                    formData.password,
                    recaptchaToken
                );
                if (success) {
                    toast.success(t('auth.registrationSuccess'), 4000);
                    setIsLoginMode(true);
                }
            }
        } catch (error) {
            logger.error('❌ [Login] Beklenmeyen hata:', error);
            setAuthError(t('auth.loginError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="background-animate"></div>

            {showDownloadModal && (
                <DownloadModal onClose={() => setShowDownloadModal(false)} />
            )}

            {!isNativeApp && (
                <button
                    onClick={() => setShowDownloadModal(true)}
                    style={{
                        position: 'fixed',
                        top: '16px',
                        right: '16px',
                        background: 'linear-gradient(135deg, #5865f2, #7c3aed)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 600,
                        zIndex: 100,
                        boxShadow: '0 4px 12px rgba(88,101,242,0.4)',
                    }}
                    aria-label={t('common.download', 'İndir')}
                >
                    <FaDownload size={13} />
                    {t('common.download', 'İndir')}
                </button>
            )}

            <div className="login-card">
                <div className="logo-header">
                    <div className="logo-circle">
                        <FaPaw size={40} color="white" />
                    </div>
                    <h1>Pawscord</h1>
                    <p>{isLoginMode ? t('login.welcomeBack') : t('login.joinUs')}</p>
                </div>

                {error && (
                    <div className="error-message" role="alert" aria-live="assertive">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} data-testid="auth-form">
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            placeholder={t('login.username')}
                            aria-label={t('login.username')}
                            autoComplete="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            data-testid="auth-username"
                        />
                    </div>

                    {!isLoginMode && (
                        <div className="input-group slide-down">
                            <FaEnvelope className="input-icon" />
                            <input
                                type="email"
                                placeholder={t('login.emailAddress')}
                                aria-label={t('login.emailAddress')}
                                autoComplete="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                required
                                data-testid="auth-email"
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder={t('login.password')}
                            aria-label={t('login.password')}
                            autoComplete={isLoginMode ? 'current-password' : 'new-password'}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            data-testid="auth-password"
                        />
                        <button
                            type="button"
                            className="password-toggle-btn"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={
                                showPassword
                                    ? t('login.hidePassword', 'Hide password')
                                    : t('login.showPassword', 'Show password')
                            }
                            tabIndex={0}
                            data-testid="auth-password-toggle"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isLoading}
                        data-testid={isLoginMode ? 'login-submit-btn' : 'signup-submit-btn'}
                    >
                        {isLoading ? (
                            <div className="spinner-white"></div>
                        ) : isLoginMode ? (
                            t('login.login')
                        ) : (
                            t('login.signUp')
                        )}
                    </button>
                </form>

                {/* 🔐 ROADMAP: Passwordmi Unuttum Linki */}
                {isLoginMode && (
                    <div className="login-forgot-wrap">
                        <a href="#/forgot-password" className="login-forgot-link">
                            <FaLock size={11} style={{ marginRight: 5, opacity: 0.8 }} />
                            {t('login.forgotPassword')}
                        </a>
                    </div>
                )}

                <div className="divider">
                    <span>{t('login.or')}</span>
                </div>

                <div className="google-btn-wrapper">
                    {/* Özel Google Butonu */}
                    <button
                        className="google-custom-btn"
                        onClick={handleGoogleLogin}
                        aria-label={t('auth.signInWithGoogle')}
                        disabled={isGoogleLoading}
                    >
                        {isGoogleLoading ? (
                            <span className="google-btn-spinner" aria-label={t('common.loading', 'Loading')} />
                        ) : (
                            // Inline Google "G" SVG — 3rd-party CDN'e (Wikipedia) bağımlılık
                                                       // kaldırıldı: cache miss / outage / izleme riskini
                                                       // ortadan kaldırır, login sayfası tek istek azalır.
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                className="google-btn-logo"
                                viewBox="0 0 48 48"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                            </svg>
                        )}
                        <span>
                            {isGoogleLoading ? t('common.loading') : t('login.loginWithGoogle')}
                        </span>
                    </button>
                </div>

                <div className="toggle-mode">
                    {isLoginMode ? t('login.noAccount') : t('login.alreadyMember')}
                    <span
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            setIsLoginMode(!isLoginMode);
                            setAuthError('');
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setIsLoginMode(!isLoginMode);
                                setAuthError('');
                            }
                        }}
                    >
                        {isLoginMode ? t('login.signUp') : t('login.login')}
                    </span>
                </div>

                {/* Google ToS: badge gizliyse bu metin görünür olmak zorunda */}
                <div className="recaptcha-notice">
                    {t(
                        'login.recaptchaNotice',
                        'Bu site reCAPTCHA ile korunmaktadır;'
                    )}{' '}
                    <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t('login.recaptchaPrivacy', 'Gizlilik Politikası')}
                    </a>{' '}
                    {t('login.and', 've')}{' '}
                    <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t('login.recaptchaTerms', 'Hizmet Şartları')}
                    </a>{' '}
                    {t('login.recaptchaApply', 'geçerlidir.')}
                </div>
            </div>
        </div>
    );
};

LoginPage.propTypes = {
    onLogin: PropTypes.func,
    onRegister: PropTypes.func,
    error: PropTypes.string,
    setAuthError: PropTypes.func,
};
export default LoginPage;

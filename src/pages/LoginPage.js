/* eslint-disable no-undef */
// frontend/src/LoginPage.js

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaUser, FaLock, FaEnvelope, FaPaw, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Capacitor } from '@capacitor/core';
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
    const { getToken: getRecaptchaToken } = useRecaptcha();

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

    // ✅ 1. ELECTRON DEEP LINK DİNLEYİCİSİ (EXE'ye Dönüş)
    useEffect(() => {
        if (isElectron && window.require) {
            const { ipcRenderer } = window.require('electron');

            // NEW: Handle auth success event from Electron main process
            const handleAuthSuccess = (event, data) => {
                try {
                    const { access, refresh } = data;

                    if (access && refresh) {
                        const decoded = jwtDecode(access);

                        localStorage.removeItem('chat_username');
                        localStorage.setItem('access_token', access);
                        localStorage.removeItem('refresh_token');
                        localStorage.setItem('chat_username', decoded.username);

                        setTimeout(() => window.location.reload(), 500);
                    }
                } catch (e) {
                    logger.error('❌ [Electron] OAuth token error:', e);
                    setAuthError(t('auth.tokenError'));
                }
            };

            const handleDeepLink = (event, url) => {
                try {
                    const urlObj = new URL(url);
                    const params = new URLSearchParams(urlObj.search);
                    const accessToken = params.get('access');
                    const refreshToken = params.get('refresh');

                    if (accessToken && refreshToken) {
                        // 🔥 FIX: Decode token and save username for Electron too
                        const decoded = jwtDecode(accessToken);

                        // Clear old user data first
                        localStorage.removeItem('chat_username');

                        localStorage.setItem('access_token', accessToken);
                        localStorage.removeItem('refresh_token');
                        localStorage.setItem('chat_username', decoded.username);

                        // Bring the Electron window to front and reload
                        if (window.require) {
                            const { ipcRenderer } = window.require('electron');
                            ipcRenderer.send('focus-window');
                        }
                        setTimeout(() => window.location.reload(), 300);
                    }
                } catch (e) {
                    logger.error('Deep link error:', e);
                    try {
                        if (url.includes('access=') && url.includes('refresh=')) {
                            const parts = url.split('access=');
                            if (parts.length > 1) {
                                const access = parts[1].split('&')[0];
                                const refreshParts = url.split('refresh=');
                                if (refreshParts.length > 1) {
                                    const _refresh = refreshParts[1]; // stored for potential future use

                                    // 🔥 FIX: Decode and save username here too
                                    const decoded = jwtDecode(access);
                                    localStorage.removeItem('chat_username');
                                    localStorage.setItem('access_token', access);
                                    localStorage.removeItem('refresh_token');
                                    localStorage.setItem('chat_username', decoded.username);
                                    window.location.reload();
                                } else {
                                    setAuthError(t('auth.inputError'));
                                }
                            } else {
                                setAuthError(t('auth.inputError'));
                            }
                        } else {
                            setAuthError(t('auth.inputError'));
                        }
                    } catch (parseError) {
                        logger.error('Manual parsing error:', parseError);
                        setAuthError(t('auth.loginFailed'));
                    }
                }
            };

            // Register all listners
            ipcRenderer.on('google-auth-success', handleAuthSuccess);
            ipcRenderer.on('google-auth-error', handleAuthError);
            ipcRenderer.on('deep-link-auth', handleDeepLink);
            ipcRenderer.on('oauth-tokens', handleOAuthTokens);

            return () => {
                ipcRenderer.removeListener('google-auth-success', handleAuthSuccess);
                ipcRenderer.removeListener('google-auth-error', handleAuthError);
                ipcRenderer.removeListener('deep-link-auth', handleDeepLink);
                ipcRenderer.removeListener('oauth-tokens', handleOAuthTokens);
            };
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
                const redirectUrl = `${oauthBaseUrl}/auth/google/start/?source=${source}`;

                // 🔥 ELECTRON İÇİN: Popup window open (IPC kullan)
                if (isElectron && window.require) {
                    const { ipcRenderer } = window.require('electron');
                    ipcRenderer.send('start-google-login', redirectUrl);
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

                <form onSubmit={handleSubmit}>
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
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button type="submit" className="submit-btn" disabled={isLoading}>
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
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                                alt="G"
                                className="google-btn-logo"
                            />
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

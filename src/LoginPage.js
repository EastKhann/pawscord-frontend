// frontend/src/LoginPage.js

import { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEnvelope, FaPaw } from 'react-icons/fa';
import { Capacitor } from '@capacitor/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import toast from './utils/toast';
import { useRecaptcha } from './utils/recaptcha';
import { jwtDecode } from 'jwt-decode'; // 🔥 FIX: Import jwtDecode for user extraction
import { API_URL_BASE_STRING, API_BASE_URL, isElectron, isNative, GOOGLE_WEB_CLIENT_ID } from './utils/constants';

// --- ORTAM AYARLARI (Centralized from constants.js) ---
const API_URL = API_BASE_URL;

const LoginPage = ({ onLogin, onRegister, error, setAuthError }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { getToken: getRecaptchaToken } = useRecaptcha();

    // ✅ 0. GOOGLE AUTH INITIALIZE (Mobile için gerekli)
    useEffect(() => {
        if (Capacitor.isNativePlatform()) {
            try {
                GoogleAuth.initialize({
                    clientId: GOOGLE_WEB_CLIENT_ID,
                    scopes: ['profile', 'email'],
                    grantOfflineAccess: true,
                });
            } catch (error) {
                console.error('❌ [Google] Initialization failed:', error);
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
                        localStorage.setItem('refresh_token', refresh);
                        localStorage.setItem('chat_username', decoded.username);

                        setTimeout(() => window.location.reload(), 500);
                    }
                } catch (e) {
                    console.error("❌ [Electron] Token error:", e);
                    setAuthError('Token işleme hatası.');
                }
            };

            // NEW: Handle auth error
            const handleAuthError = (event, data) => {
                console.error("❌ [Electron] Auth error:", data);
                setAuthError(data.error || 'Google girişi başarısız.');
            };

            // 🔥 NEW: Handle oauth-tokens from deep link (main process'den gelen)
            const handleOAuthTokens = (event, data) => {
                try {
                    const { access, refresh } = data;

                    if (access && refresh) {
                        const decoded = jwtDecode(access);

                        localStorage.removeItem('chat_username');
                        localStorage.setItem('access_token', access);
                        localStorage.setItem('refresh_token', refresh);
                        localStorage.setItem('chat_username', decoded.username);

                        setTimeout(() => window.location.reload(), 500);
                    }
                } catch (e) {
                    console.error("❌ [Electron] OAuth token error:", e);
                    setAuthError('Token işleme hatası.');
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
                        localStorage.setItem('refresh_token', refreshToken);
                        localStorage.setItem('chat_username', decoded.username);
                        window.location.reload();
                    }
                } catch (e) {
                    console.error("Deep link hatası:", e);
                    try {
                        if (url.includes("access=") && url.includes("refresh=")) {
                            const parts = url.split("access=");
                            if (parts.length > 1) {
                                const access = parts[1].split("&")[0];
                                const refreshParts = url.split("refresh=");
                                if (refreshParts.length > 1) {
                                    const refresh = refreshParts[1];

                                    // 🔥 FIX: Decode and save username here too
                                    const decoded = jwtDecode(access);
                                    localStorage.removeItem('chat_username');
                                    localStorage.setItem('access_token', access);
                                    localStorage.setItem('refresh_token', refresh);
                                    localStorage.setItem('chat_username', decoded.username);
                                    window.location.reload();
                                } else {
                                    setAuthError("Giriş verisi okunamadı.");
                                }
                            } else {
                                setAuthError("Giriş verisi okunamadı.");
                            }
                        } else {
                            setAuthError("Giriş verisi okunamadı.");
                        }
                    } catch (parseError) {
                        console.error("Manual parsing error:", parseError);
                        setAuthError("Giriş işlemi başarısız.");
                    }
                }
            };

            // Register all listeners
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
    }, [setAuthError]);

    // ✅ 2. WEB SİTESİ URL DİNLEYİCİSİ (OAuth Callback için)
    useEffect(() => {
        if (!isElectron) {
            const params = new URLSearchParams(window.location.search);
            const accessToken = params.get('access');
            const refreshToken = params.get('refresh');
            const error = params.get('error');

            // Check for error first
            if (error) {
                console.error("❌ [Web] OAuth error from URL:", error);
                setAuthError(decodeURIComponent(error));
                // Clean URL
                window.history.replaceState({}, document.title, "/");
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
                    localStorage.setItem('refresh_token', refreshToken);
                    localStorage.setItem('chat_username', decoded.username);

                    // Clean URL and reload
                    window.history.replaceState({}, document.title, "/");
                    window.location.reload();
                } catch (storageError) {
                    console.error("❌ [Web] LocalStorage error:", storageError);
                    setAuthError("Tarayıcı depolama hatası. Lütfen gizli modda değilseniz kontrol edin.");
                }
            }
        }
    }, []);

    // ✅ 3. AKILLI GOOGLE GİRİŞ BUTONU
    const handleGoogleLogin = async () => {
        try {

            if (Capacitor.isNativePlatform()) {
                // MOBILE: Capacitor Google Auth kullan
                const googleUser = await GoogleAuth.signIn();

                // 🔥 FIX: idToken null olabilir (forceCodeForRefreshToken=true iken)
                const idToken = googleUser?.authentication?.idToken;
                if (!idToken) {
                    console.error('❌ [Google] idToken null! googleUser:', JSON.stringify(googleUser));
                    setAuthError('Google token alınamadı. Lütfen tekrar deneyin.');
                    return;
                }

                // Token'ı Backend'e Gönder (POST /auth/google/native/)
                const url = `${API_BASE_URL}/auth/google/native/`;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ token: idToken })
                });


                // Content-Type kontrolü
                const contentType = response.headers.get('content-type');

                if (!contentType || !contentType.includes('application/json')) {
                    const textResponse = await response.text();
                    console.error('❌ [Google] Backend HTML döndü:', textResponse.substring(0, 500));
                    setAuthError('Backend hatası: JSON yerine HTML yanıtı alındı. Sunucu ayarlarını kontrol edin.');
                    return;
                }

                const data = await response.json();

                if (response.ok) {
                    if (data.access && data.refresh) {
                        // 🔥 FIX: username'i de kaydet (diğer login flow'ları gibi)
                        localStorage.removeItem('chat_username');
                        localStorage.setItem('access_token', data.access);
                        localStorage.setItem('refresh_token', data.refresh);
                        if (data.username) {
                            localStorage.setItem('chat_username', data.username);
                        } else {
                            try {
                                const decoded = jwtDecode(data.access);
                                localStorage.setItem('chat_username', decoded.username);
                            } catch (e) { /* token decode failed, will be set on reload */ }
                        }
                        window.location.reload();
                    } else {
                        console.error('❌ [Google] Tokens eksik:', data);
                        setAuthError('Token bilgileri eksik.');
                    }
                } else {
                    console.error('❌ [Google] Login failed:', data);
                    setAuthError(data.error || 'Google girişi başarısız.');
                }
            } else {
                // WEB & ELECTRON: Redirect to Google
                const source = isElectron ? 'electron' : 'web';
                // 🔥 FIX: Electron için api.pawscord.com kullan (www subdomain /api route'u yok)
                const oauthBaseUrl = isElectron ? 'https://api.pawscord.com/api' : API_BASE_URL;
                const redirectUrl = `${oauthBaseUrl}/auth/google/start/?source=${source}`;

                // 🔥 ELECTRON İÇİN: Popup window aç (IPC kullan)
                if (isElectron && window.require) {
                    const { ipcRenderer } = window.require('electron');
                    ipcRenderer.send('start-google-login', redirectUrl);
                } else {
                    // WEB için: Normal redirect
                    window.location.href = redirectUrl;
                }
            }

        } catch (error) {
            console.error('❌ [Google] Unexpected error:', error);
            setAuthError('Google girişi sırasında bir hata oluştu: ' + error.message);
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
                const success = await onRegister(formData.username, formData.email, formData.password, recaptchaToken);
                if (success) {
                    toast.success("Kayıt başarılı! Lütfen e-postanı kontrol et.", 4000);
                    setIsLoginMode(true);
                }
            }
        } catch (error) {
            console.error('❌ [Login] Beklenmeyen hata:', error);
            setAuthError('Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.');
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
                    <p>{isLoginMode ? "Tekrar hoşgeldin!" : "Aramıza katıl!"}</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            placeholder="Kullanıcı Adı"
                            value={formData.username}
                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>

                    {!isLoginMode && (
                        <div className="input-group slide-down">
                            <FaEnvelope className="input-icon" />
                            <input
                                type="email"
                                placeholder="E-posta Adresi"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Şifre"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? <div className="spinner"></div> : (isLoginMode ? "Giriş Yap" : "Kayıt Ol")}
                    </button>
                </form>

                {/* 🔐 ROADMAP: Şifremi Unuttum Linki */}
                {isLoginMode && (
                    <div style={{
                        marginTop: '10px',
                        textAlign: 'center'
                    }}>
                        <a
                            href="#/forgot-password"
                            style={{
                                color: '#5865f2',
                                textDecoration: 'none',
                                fontSize: '14px',
                                transition: 'opacity 0.2s'
                            }}
                            onMouseEnter={e => e.target.style.opacity = '0.8'}
                            onMouseLeave={e => e.target.style.opacity = '1'}
                        >
                            Şifremi Unuttum?
                        </a>
                    </div>
                )}

                <div className="divider"><span>veya</span></div>

                <div className="google-btn-wrapper">
                    {/* Özel Google Butonu */}
                    <button
                        onClick={handleGoogleLogin}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '100%', padding: '11px', borderRadius: '20px',
                            border: '1px solid #dadce0', backgroundColor: '#ffffff',
                            color: '#3c4043', fontWeight: '500', cursor: 'pointer',
                            fontSize: '14px', gap: '10px', fontFamily: '"Google Sans", arial, sans-serif',
                            transition: 'background-color .2s, box-shadow .2s',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f7f8f8'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)'; }}
                        onMouseDown={e => e.currentTarget.style.backgroundColor = '#eff2f5'}
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                            alt="G"
                            style={{ width: '18px', height: '18px' }}
                        />
                        <span>Google ile Giriş Yap</span>
                    </button>
                </div>

                <div className="toggle-mode">
                    {isLoginMode ? "Hesabın yok mu? " : "Zaten üye misin? "}
                    <span role="button" tabIndex={0} onClick={() => { setIsLoginMode(!isLoginMode); setAuthError(''); }} onKeyDown={e => { if (e.key === 'Enter') { setIsLoginMode(!isLoginMode); setAuthError(''); } }} style={{ cursor: 'pointer' }}>
                        {isLoginMode ? "Kayıt Ol" : "Giriş Yap"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;


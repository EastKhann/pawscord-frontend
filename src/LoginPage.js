// frontend/src/LoginPage.js

import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEnvelope, FaPaw } from 'react-icons/fa';
import { Capacitor } from '@capacitor/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import toast from './utils/toast';
import { useRecaptcha } from './utils/recaptcha';
import { jwtDecode } from 'jwt-decode'; // 🔥 FIX: Import jwtDecode for user extraction
import { API_URL_BASE_STRING, API_BASE_URL, isElectron, isNative } from './utils/constants';

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
            console.log('📱 [Google] Initializing Google Auth for mobile...');
            try {
                GoogleAuth.initialize({
                    clientId: '774757987258-poa0elqqapnab8eud3tol3h2pilcqe71.apps.googleusercontent.com',
                    scopes: ['profile', 'email'],
                    grantOfflineAccess: true,
                });
                console.log('✅ [Google] Initialized successfully');
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
                console.log("✅ [Electron] Google auth success received");
                try {
                    const { access, refresh } = data;

                    if (access && refresh) {
                        const decoded = jwtDecode(access);
                        console.log("👤 [Electron] User:", decoded.username);

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
                console.log("🔗 [Electron] OAuth tokens received from main process");
                try {
                    const { access, refresh } = data;

                    if (access && refresh) {
                        const decoded = jwtDecode(access);
                        console.log("👤 [Electron] User from deep link:", decoded.username);

                        localStorage.removeItem('chat_username');
                        localStorage.setItem('access_token', access);
                        localStorage.setItem('refresh_token', refresh);
                        localStorage.setItem('chat_username', decoded.username);

                        console.log("✅ [Electron] Tokens saved, reloading...");
                        setTimeout(() => window.location.reload(), 500);
                    }
                } catch (e) {
                    console.error("❌ [Electron] OAuth token error:", e);
                    setAuthError('Token işleme hatası.');
                }
            };

            const handleDeepLink = (event, url) => {
                console.log("🚀 [DeepLink] URL Yakalandı:", url);
                try {
                    const urlObj = new URL(url);
                    const params = new URLSearchParams(urlObj.search);
                    const accessToken = params.get('access');
                    const refreshToken = params.get('refresh');

                    if (accessToken && refreshToken) {
                        console.log("✅ [DeepLink] Giriş Başarılı!");

                        // 🔥 FIX: Decode token and save username for Electron too
                        const decoded = jwtDecode(accessToken);
                        console.log("👤 [Electron] Decoded user from token:", decoded.username);

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
                console.log("🌍 [Web] Tokenlar URL'den alındı (OAuth success)");
                try {
                    // 🔥 FIX: Decode token and save username IMMEDIATELY
                    const decoded = jwtDecode(accessToken);
                    console.log("👤 [Web] Decoded user from token:", decoded.username);

                    // Clear old user data first (CRITICAL!)
                    localStorage.removeItem('chat_username');

                    // Set new token and username atomically
                    localStorage.setItem('access_token', accessToken);
                    localStorage.setItem('refresh_token', refreshToken);
                    localStorage.setItem('chat_username', decoded.username);
                    console.log("✅ [Web] Tokens and username saved to localStorage");

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
            console.log('🔵 [Google] Login başlatılıyor...', {
                isNative: Capacitor.isNativePlatform(),
                isElectron,
                apiUrl: API_BASE_URL
            });

            if (Capacitor.isNativePlatform()) {
                // MOBILE: Capacitor Google Auth kullan
                console.log('📱 [Google] Mobile auth flow');
                const googleUser = await GoogleAuth.signIn();
                console.log('✅ [Google] User signed in:', googleUser.email);
                console.log('🔑 [Google] ID Token:', googleUser.authentication.idToken);

                // Token'ı Backend'e Gönder (POST /auth/google/native/)
                const url = `${API_BASE_URL}/auth/google/native/`;
                console.log('📡 [Google] Sending to:', url);

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ token: googleUser.authentication.idToken })
                });

                console.log('🔍 [Google] Response status:', response.status);
                console.log('🔍 [Google] Response headers:', response.headers);

                // Content-Type kontrolü
                const contentType = response.headers.get('content-type');
                console.log('🔍 [Google] Content-Type:', contentType);

                if (!contentType || !contentType.includes('application/json')) {
                    const textResponse = await response.text();
                    console.error('❌ [Google] Backend HTML döndü:', textResponse.substring(0, 500));
                    setAuthError('Backend hatası: JSON yerine HTML yanıtı alındı. Sunucu ayarlarını kontrol edin.');
                    return;
                }

                const data = await response.json();
                console.log('📦 [Google] Backend response data:', data);

                if (response.ok) {
                    console.log('✅ [Google] Login successful');
                    if (data.access && data.refresh) {
                        localStorage.setItem('access_token', data.access);
                        localStorage.setItem('refresh_token', data.refresh);
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
                console.log('🌐 [Google] Web/Electron redirect flow');
                const source = isElectron ? 'electron' : 'web';
                // 🔥 FIX: Electron için api.pawscord.com kullan (www subdomain /api route'u yok)
                const oauthBaseUrl = isElectron ? 'https://api.pawscord.com/api' : API_BASE_URL;
                const redirectUrl = `${oauthBaseUrl}/auth/google/start/?source=${source}`;
                console.log('🔀 [Google] Redirecting to:', redirectUrl);

                // 🔥 ELECTRON İÇİN: Popup window aç (IPC kullan)
                if (isElectron && window.require) {
                    const { ipcRenderer } = window.require('electron');
                    console.log('✅ [Google] Opening in Electron popup:', redirectUrl);
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
            console.log('🔵 [Login] Giriş denemesi:', { username: formData.username, mode: isLoginMode ? 'login' : 'register' });
            console.log('🔵 [Login] API URL:', API_BASE_URL);

            // 🤖 reCAPTCHA v3 token al
            const recaptchaToken = await getRecaptchaToken(isLoginMode ? 'login' : 'register');
            console.log('✅ [reCAPTCHA] Token alındı:', recaptchaToken ? 'OK' : 'FAIL');

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
                    <span onClick={() => { setIsLoginMode(!isLoginMode); setAuthError(''); }}>
                        {isLoginMode ? "Kayıt Ol" : "Giriş Yap"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;


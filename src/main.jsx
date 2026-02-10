// frontend/src/index.js

import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import VerifyEmailPage from './VerifyEmailPage';
import InvitePage from './InvitePage';

import lazyWithRetry from './utils/lazyWithRetry';

// ⚡ OPTIMIZATION: Lazy load English learning pages (with retry)
const EnglishHub = lazyWithRetry(() => import('./EnglishHub'));
const GrammarQuizPage = lazyWithRetry(() => import('./GrammarQuizPage'));
const EnglishLearningPage = lazyWithRetry(() => import('./EnglishLearningPage'));
import EnglishVoicePractice from './EnglishVoicePractice';
import PronunciationPage from './PronunciationPage';
const CryptoDashboard = lazyWithRetry(() => import('./CryptoDashboard'));
const CryptoSignals = lazyWithRetry(() => import('./CryptoSignals'));
import SpotifyCallback from './SpotifyCallback';
import reportWebVitals from './reportWebVitals';
import { GlobalWebSocketProvider } from './GlobalWebSocketContext';
import SignalNotification from './components/SignalNotification';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PageWrapper from './components/PageWrapper';
import { AuthProvider, useAuth } from './AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

// 🔐 Whitelist Guard — sadece is_whitelisted kullanıcılar erişebilir
const WhitelistGuard = ({ children }) => {
    const { token, isAuthenticated } = useAuth();
    const [allowed, setAllowed] = useState(null); // null = loading
    const checkedRef = useRef(false);

    useEffect(() => {
        if (!isAuthenticated || !token) {
            setAllowed(false);
            checkedRef.current = false;
            return;
        }
        // Zaten kontrol edildiyse token değişince tekrar kontrol etme
        if (checkedRef.current) return;

        (async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/users/me/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setAllowed(!!data.is_whitelisted);
                    checkedRef.current = true;
                } else if (res.status === 401) {
                    // Token expired — don't set allowed=false yet, wait for refresh
                    console.warn('⚠️ [WhitelistGuard] 401 - waiting for token refresh');
                } else {
                    setAllowed(false);
                }
            } catch {
                setAllowed(false);
            }
        })();
    }, [isAuthenticated, token]);

    if (allowed === null) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#1e1f22', color: '#f0b232', fontSize: 18 }}>⏳ Kontrol ediliyor...</div>;
    if (!allowed) return <Navigate to="/" replace />;
    return children;
};

import { preloadCriticalChunks, prefetchNextChunks } from './utils/codeSplitting.config';

// 🔐 Auth & Security Pages
import AuthCallback from './AuthCallback';  // 🔐 Direct import for OAuth callback reliability
const ForgotPasswordPage = lazyWithRetry(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazyWithRetry(() => import('./pages/ResetPasswordPage'));
const TwoFactorLoginPage = lazyWithRetry(() => import('./pages/TwoFactorLoginPage'));
const VerifyEmailPageNew = lazyWithRetry(() => import('./pages/VerifyEmailPage'));

// 📄 Legal Pages
const PrivacyPolicyPage = lazyWithRetry(() => import('./pages/PrivacyPolicyPage'));

// 🛒 Store Page
const StorePage = lazyWithRetry(() => import('./pages/StorePage'));

// 📈 GROWTH: Landing Page & Growth Components (Lazy Load)
const LandingPage = lazyWithRetry(() => import('./components/LandingPage'));
const ReferralProgram = lazyWithRetry(() => import('./components/ReferralProgram'));
const GrowthDashboard = lazyWithRetry(() => import('./components/GrowthDashboard'));

// 🎨 DEMO: Toast Notification Demo (Lazy Load)
const ToastDemo = lazyWithRetry(() => import('./components/ToastDemo'));

// --- URL AYARLARI (constants.js'den import) ---
import { API_URL_BASE_STRING, API_BASE_URL, GOOGLE_WEB_CLIENT_ID } from './utils/constants';
import { initSentry } from './utils/sentry';
import './i18n'; // 🌍 i18n initialization
const GOOGLE_CLIENT_ID = GOOGLE_WEB_CLIENT_ID;

// 🐛 Initialize Sentry error tracking (production only)
initSentry();

const RootApp = () => {
    useEffect(() => {
        // 🚀 Critical chunk'ları hemen preload et (eski: 3s bekliyordu)
        const preloadTimer = setTimeout(() => {
            try {
                preloadCriticalChunks();
            } catch (e) {
                console.warn('preloadCriticalChunks error', e);
            }
        }, 500); // 500ms — React mount olduktan hemen sonra

        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => {
                try {
                    prefetchNextChunks();
                } catch (e) {
                    console.warn('prefetchNextChunks error', e);
                }
            }, { timeout: 1500 }); // 1.5s timeout (eski: 2s)
        } else {
            const fallbackTimer = setTimeout(() => {
                try {
                    prefetchNextChunks();
                } catch (e) {
                    console.warn('prefetchNextChunks error', e);
                }
            }, 2000); // 2s (eski: 4s)
            return () => clearTimeout(fallbackTimer);
        }

        return () => clearTimeout(preloadTimer);
    }, []);

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <AuthProvider>
                <GlobalWebSocketProvider>
                    <ErrorBoundary>
                        <HashRouter>
                            <SignalNotification />
                            <Routes>
                                {/* Email Verification */}
                                <Route path="/verify/:token" element={
                                    <PageWrapper><VerifyEmailPage /></PageWrapper>
                                } />

                                {/* 🔐 Auth & Security Routes */}
                                <Route path="/verify-email/:token" element={
                                    <PageWrapper>
                                        <React.Suspense fallback={<div>Yükleniyor...</div>}>
                                            <VerifyEmailPageNew apiBaseUrl={API_BASE_URL} />
                                        </React.Suspense>
                                    </PageWrapper>
                                } />
                                <Route path="/forgot-password" element={
                                    <PageWrapper>
                                        <React.Suspense fallback={<div>Yükleniyor...</div>}>
                                            <ForgotPasswordPage apiBaseUrl={API_BASE_URL} />
                                        </React.Suspense>
                                    </PageWrapper>
                                } />
                                <Route path="/reset-password/:token" element={
                                    <PageWrapper>
                                        <React.Suspense fallback={<div>Yükleniyor...</div>}>
                                            <ResetPasswordPage apiBaseUrl={API_BASE_URL} />
                                        </React.Suspense>
                                    </PageWrapper>
                                } />
                                <Route path="/2fa-login" element={
                                    <PageWrapper>
                                        <React.Suspense fallback={<div>Yükleniyor...</div>}>
                                            <TwoFactorLoginPage apiBaseUrl={API_BASE_URL} />
                                        </React.Suspense>
                                    </PageWrapper>
                                } />

                                {/* 🔐 OAuth Secure Callback - Direct import for reliability */}
                                <Route path="/auth/callback" element={
                                    <PageWrapper>
                                        <AuthCallback apiBaseUrl={API_URL_BASE_STRING} />
                                    </PageWrapper>
                                } />

                                {/* � LEGAL: Privacy Policy & Terms */}
                                <Route path="/privacy-policy" element={
                                    <React.Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>Loading...</div>}>
                                        <PrivacyPolicyPage />
                                    </React.Suspense>
                                } />
                                <Route path="/terms-of-service" element={
                                    <React.Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>Loading...</div>}>
                                        <PrivacyPolicyPage />
                                    </React.Suspense>
                                } />

                                {/* 🛒 Store */}
                                <Route path="/store" element={
                                    <React.Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>Loading...</div>}>
                                        <StorePage />
                                    </React.Suspense>
                                } />

                                {/* 📈 GROWTH: Landing Page & Growth System */}
                                <Route path="/launch" element={
                                    <PageWrapper>
                                        <React.Suspense fallback={<div>Yükleniyor...</div>}>
                                            <LandingPage apiBaseUrl={API_BASE_URL} />
                                        </React.Suspense>
                                    </PageWrapper>
                                } />
                                <Route path="/referral" element={
                                    <PageWrapper>
                                        <React.Suspense fallback={<div>Yükleniyor...</div>}>
                                            <ReferralProgram apiBaseUrl={API_BASE_URL} />
                                        </React.Suspense>
                                    </PageWrapper>
                                } />
                                <Route path="/growth-dashboard" element={
                                    <PageWrapper>
                                        <React.Suspense fallback={<div>Yükleniyor...</div>}>
                                            <GrowthDashboard apiBaseUrl={API_BASE_URL} />
                                        </React.Suspense>
                                    </PageWrapper>
                                } />

                                {/* 🎨 DEMO: Toast Notification Demo */}
                                <Route path="/toast-demo" element={
                                    <PageWrapper>
                                        <React.Suspense fallback={<div>Yükleniyor...</div>}>
                                            <ToastDemo />
                                        </React.Suspense>
                                    </PageWrapper>
                                } />

                                {/* 🔗 Server Invite */}
                                <Route path="/invite/:code" element={
                                    <PageWrapper><InvitePage /></PageWrapper>
                                } />

                                {/* Spotify Callback */}
                                <Route path="/spotify-callback" element={
                                    <PageWrapper>
                                        <SpotifyCallback apiBaseUrl={API_BASE_URL} />
                                    </PageWrapper>
                                } />

                                {/* İngilizce Modülleri */}
                                <Route path="/eng-learn" element={
                                    <PageWrapper>
                                        <React.Suspense fallback={<div>Yükleniyor...</div>}>
                                            <EnglishHub />
                                        </React.Suspense>
                                    </PageWrapper>
                                } />
                                <Route path="/eng-learn/vocab" element={
                                    <PageWrapper>
                                        <React.Suspense fallback={<div>Yükleniyor...</div>}>
                                            <EnglishLearningPage />
                                        </React.Suspense>
                                    </PageWrapper>
                                } />
                                <Route path="/eng-learn/grammar" element={
                                    <PageWrapper>
                                        <React.Suspense fallback={<div>Yükleniyor...</div>}>
                                            <GrammarQuizPage />
                                        </React.Suspense>
                                    </PageWrapper>
                                } />
                                <Route path="/eng-learn/voice" element={
                                    <PageWrapper>
                                        <EnglishVoicePractice apiBaseUrl={API_BASE_URL} />
                                    </PageWrapper>
                                } />
                                <Route path="/eng-learn/pronunciation" element={
                                    <PageWrapper>
                                        <PronunciationPage apiBaseUrl={API_BASE_URL} />
                                    </PageWrapper>
                                } />

                                {/* Kripto Sinyaller (Sadece Whitelist) */}
                                <Route path="/crypto-analysis" element={
                                    <PageWrapper>
                                        <React.Suspense fallback={<div>Yükleniyor...</div>}>
                                            <WhitelistGuard>
                                                <CryptoSignals />
                                            </WhitelistGuard>
                                        </React.Suspense>
                                    </PageWrapper>
                                } />

                                {/* Eski Crypto Dashboard (yedek) */}
                                <Route path="/crypto-dashboard-old" element={
                                    <PageWrapper>
                                        <React.Suspense fallback={<div>Yükleniyor...</div>}>
                                            <CryptoDashboard />
                                        </React.Suspense>
                                    </PageWrapper>
                                } />

                                {/* Ana Uygulama (Catch-All) */}
                                <Route path="/*" element={<App />} />
                            </Routes>
                        </HashRouter>
                    </ErrorBoundary>
                </GlobalWebSocketProvider>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
};

// 🔄 Global chunk load error handler (max 2 reload, sonsuz döngü koruması)
window.addEventListener('unhandledrejection', (event) => {
    const msg = event?.reason?.message || '';
    if (
        msg.includes('Failed to fetch dynamically imported module') ||
        msg.includes('Loading chunk') ||
        msg.includes('ChunkLoadError')
    ) {
        const RELOAD_KEY = 'pawscord_chunk_reload';
        const RELOAD_COUNT_KEY = 'pawscord_chunk_reload_count';
        const lastReload = sessionStorage.getItem(RELOAD_KEY);
        const reloadCount = parseInt(sessionStorage.getItem(RELOAD_COUNT_KEY) || '0', 10);
        const now = Date.now();

        // 🛡️ Maksimum 2 reload — sonra dur (sonsuz döngü koruması)
        if (reloadCount >= 2) {
            console.error('❌ Chunk reload limiti aşıldı (2/2). Sonsuz döngü engellendi.');
            console.error('💡 Lütfen Ctrl+Shift+R ile sayfayı tamamen yenileyin.');
            return;
        }

        if (!lastReload || (now - parseInt(lastReload, 10)) > 10000) {
            console.warn(`🔄 Chunk hatası yakalandı, sayfa yenileniyor... (${reloadCount + 1}/2)`);
            sessionStorage.setItem(RELOAD_KEY, now.toString());
            sessionStorage.setItem(RELOAD_COUNT_KEY, (reloadCount + 1).toString());
            event.preventDefault();
            window.location.reload();
        }
    }
});

// ✅ Başarılı yükleme sonrası reload sayacını sıfırla
window.addEventListener('load', () => {
    // Sayfa başarıyla yüklendiyse 5 saniye sonra sayacı sıfırla
    setTimeout(() => {
        sessionStorage.removeItem('pawscord_chunk_reload_count');
    }, 5000);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootApp />);

reportWebVitals();

// frontend/src/index.js

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import VerifyEmailPage from './VerifyEmailPage';
import InvitePage from './InvitePage';

// ⚡ OPTIMIZATION: Lazy load English learning pages
const EnglishHub = React.lazy(() => import('./EnglishHub'));
const GrammarQuizPage = React.lazy(() => import('./GrammarQuizPage'));
const EnglishLearningPage = React.lazy(() => import('./EnglishLearningPage'));
import EnglishVoicePractice from './EnglishVoicePractice';
import PronunciationPage from './PronunciationPage';
const CryptoDashboard = React.lazy(() => import('./CryptoDashboard'));
const CryptoSignals = React.lazy(() => import('./CryptoSignals'));
import SpotifyCallback from './SpotifyCallback';
import reportWebVitals from './reportWebVitals';
import { GlobalWebSocketProvider } from './GlobalWebSocketContext';
import SignalNotification from './components/SignalNotification';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PageWrapper from './components/PageWrapper';
import { AuthProvider } from './AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

import { preloadCriticalChunks, prefetchNextChunks } from './utils/codeSplitting.config';

// 🔐 Auth & Security Pages
import AuthCallback from './AuthCallback';  // 🔐 Direct import for OAuth callback reliability
const ForgotPasswordPage = React.lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('./pages/ResetPasswordPage'));
const TwoFactorLoginPage = React.lazy(() => import('./pages/TwoFactorLoginPage'));
const VerifyEmailPageNew = React.lazy(() => import('./pages/VerifyEmailPage'));

// 📄 Legal Pages
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));

// 📈 GROWTH: Landing Page & Growth Components (Lazy Load)
const LandingPage = React.lazy(() => import('./components/LandingPage'));
const ReferralProgram = React.lazy(() => import('./components/ReferralProgram'));
const GrowthDashboard = React.lazy(() => import('./components/GrowthDashboard'));

// 🎨 DEMO: Toast Notification Demo (Lazy Load)
const ToastDemo = React.lazy(() => import('./components/ToastDemo'));

// --- URL AYARLARI ---
const IS_PRODUCTION = window.location.hostname === 'pawscord.com' || window.location.hostname === 'www.pawscord.com';
const MY_LOCAL_IP = "192.168.68.53";
const DJANGO_PORT = "8888";

// 🔥 FIX: Production'da API api.pawscord.com'da, www.pawscord.com değil!
const API_URL_BASE_STRING = (IS_PRODUCTION)
    ? "https://api.pawscord.com"
    : `http://${MY_LOCAL_IP}:${DJANGO_PORT}`;

const API_BASE_URL = `${API_URL_BASE_STRING}/api`;
const GOOGLE_CLIENT_ID = "774757987258-poa0elqqapnab8eud3tol3h2pilcqe71.apps.googleusercontent.com";

const RootApp = () => {
    useEffect(() => {
        const preloadTimer = setTimeout(() => {
            try {
                preloadCriticalChunks();
            } catch (e) {
                console.warn('preloadCriticalChunks error', e);
            }
        }, 3000);

        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => {
                try {
                    prefetchNextChunks();
                } catch (e) {
                    console.warn('prefetchNextChunks error', e);
                }
            }, { timeout: 2000 });
        } else {
            const fallbackTimer = setTimeout(() => {
                try {
                    prefetchNextChunks();
                } catch (e) {
                    console.warn('prefetchNextChunks error', e);
                }
            }, 4000);
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

                                {/* �📈 GROWTH: Landing Page & Growth System */}
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

                                {/* Kripto Sinyaller (Yeni) */}
                                <Route path="/crypto-analysis" element={
                                    <PageWrapper>
                                        <React.Suspense fallback={<div>Yükleniyor...</div>}>
                                            <CryptoSignals />
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootApp />);

reportWebVitals();

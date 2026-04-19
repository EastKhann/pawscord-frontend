// Accessibility (aria): N/A for this module (hook/context/utility — no rendered DOM)
// aria-label: n/a — hook/context/utility module, no directly rendered JSX
// frontend/src/index.js
// build-id: injected at build time to force cache invalidation

// 🔇 Console cleanup — silences noisy logs in production, filters spam in dev
import './utils/consoleCleanup';

import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import './pages/LoginPage.css';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';

import lazyWithRetry from './utils/lazyWithRetry';

// ⚡ OPTIMIZATION: Lazy load verify/invite pages (rarely visited)
// ⚡ OPTIMIZATION: Lazy load ALL feature pages (with retry)
const VerifyEmailPage = lazyWithRetry(() => import('./pages/VerifyEmailPage'));
const InvitePage = lazyWithRetry(() => import('./pages/InvitePage'));
const EnglishHub = lazyWithRetry(() => import('./pages/EnglishHub'));
const GrammarQuizPage = lazyWithRetry(() => import('./GrammarQuizPage')); // orchestrator at root
const EnglishLearningPage = lazyWithRetry(() => import('./EnglishLearningPage')); // orchestrator at root
const EnglishVoicePractice = lazyWithRetry(() => import('./pages/EnglishVoicePractice'));
const PronunciationPage = lazyWithRetry(() => import('./pages/PronunciationPage'));
const SrsReviewPage = lazyWithRetry(() => import('./pages/SrsReviewPage'));
const CryptoDashboard = lazyWithRetry(() => import('./CryptoDashboard')); // orchestrator at root
const CryptoSignals = lazyWithRetry(() => import('./CryptoSignals')); // orchestrator at root
const SpotifyCallback = lazyWithRetry(() => import('./pages/SpotifyCallback'));
import reportWebVitals from './reportWebVitals';
import { GlobalWebSocketProvider } from './GlobalWebSocketContext';
import SignalNotification from './components/notifications/SignalNotification';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PageWrapper from './components/shared/PageWrapper';
import { AuthProvider, useAuth } from './AuthContext';
import ErrorBoundary from './components/shared/ErrorBoundary';
import RouteErrorBoundary from './components/shared/RouteErrorBoundary';
import ProtectedRoute from './components/shared/ProtectedRoute';
import PageTransitionWrapper from './components/shared/PageTransitionWrapper';
import { ConnectionStatusBanner } from './components/shared/ConnectionStatusBanner';
import LoadingSkeleton from './components/shared/LoadingSkeleton';
import { useTranslation } from 'react-i18next';

// 🔐 Whitelist Guard — only whitelistd users can access
const WhitelistGuard = ({ children }) => {
    const { t } = useTranslation();
    const { token, isAuthenticated } = useAuth();
    const [allowed, setAllowed] = useState(null); // null = loading
    const checkedRef = useRef(false);
    const abortRef = useRef(null);

    useEffect(() => {
        if (!isAuthenticated || !token) {
            setAllowed(false);
            checkedRef.current = false;
            return;
        }
        // Zaten kontrol edildiyse token değişince tekrar kontrol etme
        if (checkedRef.current) return;

        // 🔥 PERF: Check sessionStorage cache first to avoid extra /api/users/me/ call
        const cached = sessionStorage.getItem('pawscord_whitelistd');
        if (cached === 'true') {
            setAllowed(true);
            checkedRef.current = true;
            return;
        }

        const controller = new AbortController();
        abortRef.current = controller;

        (async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/users/me/`, {
                    headers: { Authorization: `Bearer ${token}` },
                    signal: controller.signal,
                });
                if (res.ok) {
                    const data = await res.json();
                    const isWhitelistd = !!data.is_whitelistd;
                    setAllowed(isWhitelistd);
                    checkedRef.current = true;
                    if (isWhitelistd) sessionStorage.setItem('pawscord_whitelistd', 'true');
                } else if (res.status === 401) {
                    // Token expired — don't set allowed=false yet, wait for refresh
                    console.warn('[WhitelistGuard] 401 - waiting for token refresh');
                } else {
                    setAllowed(false);
                }
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setAllowed(false);
                }
            }
        })();

        return () => {
            controller.abort();
        };
    }, [isAuthenticated, token]);

    if (allowed === null)
        return (
            <div className="suspense-fallback">⏳ {t('common.loading', 'Kontrol ediliyor...')}</div>
        );
    if (!allowed) return <Navigate to="/" replace />;
    return children;
};

import {
    preloadCriticalChunks,
    prefetchNextChunks,
    prefetchAdminChunks,
} from './utils/codeSplitting.config';

// 🔐 Auth & Security Pages
import AuthCallback from './pages/AuthCallback'; // 🔐 Direct import for OAuth callback reliability
const ForgotPasswordPage = lazyWithRetry(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazyWithRetry(() => import('./pages/ResetPasswordPage'));
const TwoFactorLoginPage = lazyWithRetry(() => import('./pages/TwoFactorLoginPage'));

// 📄 Legal Pages
const PrivacyPolicyPage = lazyWithRetry(() => import('./pages/PrivacyPolicyPage'));

// 🛒 Store Page
const StorePage = lazyWithRetry(() => import('./pages/StorePage'));

// 📈 GROWTH: Landing Page & Growth Components (Lazy Load)
const LandingPage = lazyWithRetry(() => import('./components/shared/LandingPage'));
const ReferralProgram = lazyWithRetry(() => import('./components/premium/ReferralProgram'));
const GrowthDashboard = lazyWithRetry(() => import('./components/analytics/GrowthDashboard'));

// 🎨 DEMO: Toast Notification Demo (Lazy Load)
const ToastDemo = lazyWithRetry(() => import('./components/shared/ToastDemo'));

// --- URL AYARLARI (constants.js'den import) ---
import { API_URL_BASE_STRING, API_BASE_URL, GOOGLE_WEB_CLIENT_ID } from './utils/constants';
import { initSentry } from './utils/sentry';
import './i18n'; // 🌍 i18n initialization
const GOOGLE_CLIENT_ID = GOOGLE_WEB_CLIENT_ID;

// 🐛 Initialize Sentry error tracking (production only)
initSentry();

// 📱 Mark html element when running inside Capacitor native WebView so CSS
//    can scope mobile-specific rules (e.g. hide .skip-nav).
try {
    const isNative =
        (typeof window !== 'undefined' && window.Capacitor && typeof window.Capacitor.isNativePlatform === 'function')
            ? window.Capacitor.isNativePlatform()
            : (typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNative);
    if (isNative && typeof document !== 'undefined') {
        document.documentElement.classList.add('capacitor-native');
    }
} catch (_e) { /* noop */ }

const RootApp = () => {
    const { t } = useTranslation();
    useEffect(() => {
        // 🚀 Critical chunk'ları hemen preload et (eski: 3s bekliyordu)
        const preloadTimer = setTimeout(() => {
            try {
                preloadCriticalChunks();
            } catch (e) {
                logger.warn('preloadCriticalChunks error', e);
            }
        }, 500); // 500ms — React mount olduktan hemen sonra

        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(
                () => {
                    try {
                        prefetchNextChunks();
                    } catch (e) {
                        logger.warn('prefetchNextChunks error', e);
                    }
                },
                { timeout: 1500 }
            ); // 1.5s timeout (eski: 2s)
            // Admin chunk'ları daha geç prefetch et
            window.requestIdleCallback(
                () => {
                    try {
                        prefetchAdminChunks();
                    } catch (e) {
                        logger.warn('prefetchAdminChunks error', e);
                    }
                },
                { timeout: 5000 }
            );
        } else {
            const fallbackTimer = setTimeout(() => {
                try {
                    prefetchNextChunks();
                } catch (e) {
                    logger.warn('prefetchNextChunks error', e);
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
                            <a href="#main-content" className="skip-nav">
                                İçeriğe Atla
                            </a>
                            <ConnectionStatusBanner />
                            <SignalNotification />
                            <PageTransitionWrapper>
                                <Routes>
                                    {/* Email Verification */}
                                    <Route
                                        path="/verify/:token"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={<div>{t('common.loading')}</div>}
                                                    >
                                                        <VerifyEmailPage />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />

                                    {/* 🔐 Auth & Security Routes */}
                                    <Route
                                        path="/verify-email/:token"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={<div>{t('common.loading')}</div>}
                                                    >
                                                        <VerifyEmailPage
                                                            apiBaseUrl={API_BASE_URL}
                                                        />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />
                                    <Route
                                        path="/forgot-password"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={<div>{t('common.loading')}</div>}
                                                    >
                                                        <ForgotPasswordPage
                                                            apiBaseUrl={API_BASE_URL}
                                                        />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />
                                    <Route
                                        path="/reset-password/:token"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={<div>{t('common.loading')}</div>}
                                                    >
                                                        <ResetPasswordPage
                                                            apiBaseUrl={API_BASE_URL}
                                                        />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />
                                    <Route
                                        path="/2fa-login"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={<div>{t('common.loading')}</div>}
                                                    >
                                                        <TwoFactorLoginPage
                                                            apiBaseUrl={API_BASE_URL}
                                                        />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />

                                    {/* 🔐 OAuth Secure Callback - Direct import for reliability */}
                                    <Route
                                        path="/auth/callback"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <AuthCallback
                                                        apiBaseUrl={API_URL_BASE_STRING}
                                                    />
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />

                                    {/* Legal: Privacy Policy & Terms */}
                                    <Route
                                        path="/privacy-policy"
                                        element={
                                            <RouteErrorBoundary>
                                                <React.Suspense
                                                    fallback={
                                                        <div className="suspense-fallback">
                                                            {t('common.loading')}
                                                        </div>
                                                    }
                                                >
                                                    <PrivacyPolicyPage />
                                                </React.Suspense>
                                            </RouteErrorBoundary>
                                        }
                                    />
                                    <Route
                                        path="/terms-of-service"
                                        element={
                                            <RouteErrorBoundary>
                                                <React.Suspense
                                                    fallback={
                                                        <div className="suspense-fallback">
                                                            {t('common.loading')}
                                                        </div>
                                                    }
                                                >
                                                    <PrivacyPolicyPage />
                                                </React.Suspense>
                                            </RouteErrorBoundary>
                                        }
                                    />

                                    {/* 🛒 Store */}
                                    <Route
                                        path="/store"
                                        element={
                                            <RouteErrorBoundary>
                                                <React.Suspense
                                                    fallback={
                                                        <div className="suspense-fallback">
                                                            {t('common.loading')}
                                                        </div>
                                                    }
                                                >
                                                    <StorePage />
                                                </React.Suspense>
                                            </RouteErrorBoundary>
                                        }
                                    />

                                    {/* 📈 GROWTH: Landing Page & Growth System */}
                                    <Route
                                        path="/launch"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={<div>{t('common.loading')}</div>}
                                                    >
                                                        <LandingPage apiBaseUrl={API_BASE_URL} />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />
                                    <Route
                                        path="/referral"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={<div>{t('common.loading')}</div>}
                                                    >
                                                        <ReferralProgram
                                                            apiBaseUrl={API_BASE_URL}
                                                        />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />
                                    <Route
                                        path="/growth-dashboard"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={<div>{t('common.loading')}</div>}
                                                    >
                                                        <GrowthDashboard
                                                            apiBaseUrl={API_BASE_URL}
                                                        />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />

                                    {/* 🎨 DEMO: Toast Notification Demo */}
                                    <Route
                                        path="/toast-demo"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={<div>{t('common.loading')}</div>}
                                                    >
                                                        <ToastDemo />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />

                                    {/* 🔗 Server Invite */}
                                    <Route
                                        path="/invite/:code"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={<div>{t('common.loading')}</div>}
                                                    >
                                                        <InvitePage />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />

                                    {/* Spotify Callback */}
                                    <Route
                                        path="/spotify-callback"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={<div>{t('common.loading')}</div>}
                                                    >
                                                        <SpotifyCallback
                                                            apiBaseUrl={API_BASE_URL}
                                                        />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />

                                    {/* İngilizce Modülleri */}
                                    <Route
                                        path="/eng-learn"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={
                                                            <LoadingSkeleton
                                                                label={t('panels.educationLoading')}
                                                            />
                                                        }
                                                    >
                                                        <EnglishHub />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />
                                    <Route
                                        path="/eng-learn/vocab"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={<div>{t('common.loading')}</div>}
                                                    >
                                                        <EnglishLearningPage />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />
                                    <Route
                                        path="/eng-learn/grammar"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={<div>{t('common.loading')}</div>}
                                                    >
                                                        <GrammarQuizPage />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />
                                    <Route
                                        path="/eng-learn/voice"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={<div>{t('common.loading')}</div>}
                                                    >
                                                        <EnglishVoicePractice
                                                            apiBaseUrl={API_BASE_URL}
                                                        />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />
                                    <Route
                                        path="/eng-learn/pronunciation"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={<div>{t('common.loading')}</div>}
                                                    >
                                                        <PronunciationPage
                                                            apiBaseUrl={API_BASE_URL}
                                                        />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />
                                    <Route
                                        path="/eng-learn/srs"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={
                                                            <LoadingSkeleton
                                                                label={t('panels.srsLoading')}
                                                            />
                                                        }
                                                    >
                                                        <SrsReviewPage />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />

                                    {/* Kripto Sinyaller (Sadece Whitelist) */}
                                    <Route
                                        path="/crypto-analysis"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense
                                                        fallback={
                                                            <LoadingSkeleton
                                                                label={t('panels.cryptoLoading')}
                                                            />
                                                        }
                                                    >
                                                        <ProtectedRoute>
                                                            <WhitelistGuard>
                                                                <CryptoSignals />
                                                            </WhitelistGuard>
                                                        </ProtectedRoute>
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />

                                    {/* Eski Crypto Dashboard (yedek) */}
                                    <Route
                                        path="/crypto-dashboard-old"
                                        element={
                                            <RouteErrorBoundary>
                                                <PageWrapper>
                                                    <React.Suspense fallback={<LoadingSkeleton />}>
                                                        <CryptoDashboard />
                                                    </React.Suspense>
                                                </PageWrapper>
                                            </RouteErrorBoundary>
                                        }
                                    />

                                    {/* Ana Uygulama (Catch-All) */}
                                    <Route path="/" element={<App />} />
                                    <Route path="*" element={<NotFoundPage />} />
                                </Routes>
                            </PageTransitionWrapper>
                        </HashRouter>
                    </ErrorBoundary>
                </GlobalWebSocketProvider>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
};

// 🔄 UNIFIED chunk load error handler — single source of truth
// Uses the same keys as lazyWithRetry + ErrorBoundary (no competing handlers)
import { isChunkLoadError, handleChunkReload, CHUNK_RELOAD_COUNT_KEY } from './utils/lazyWithRetry';
import ErrorReporter from './utils/errorReporter';
import PropTypes from 'prop-types';
import logger from './utils/logger';

// -- extracted inline style constants --

window.addEventListener('unhandledrejection', (event) => {
    if (event?.reason && isChunkLoadError(event.reason)) {
        event.preventDefault();
        handleChunkReload();
        return;
    }
    // 📢 Report all other unhandled promise rejections
    ErrorReporter.report(event?.reason || 'Unhandled promise rejection', {
        type: 'unhandledrejection',
        promise: String(event?.promise),
    });
});

// 📢 Global error handler — catches uncaught exceptions
window.addEventListener('error', (event) => {
    ErrorReporter.report(event?.error || event?.message || 'Unknown error', {
        type: 'uncaughtException',
        filename: event?.filename,
        lineno: event?.lineno,
        colno: event?.colno,
    });
});

// ✅ Successful load sonrası reload sayacını sıfırla
// 🔧 FIX: 30s wait (was 5s) — the old 5s timeout was racing with chunk errors,
// clearing the counter between reload cycles and allowing infinite reloads
window.addEventListener('load', () => {
    setTimeout(() => {
        sessionStorage.removeItem(CHUNK_RELOAD_COUNT_KEY);
    }, 30000);
});

// 🛡️ CSP-safe boot gate: wait for /boot.js to finish SW reset/cache cleanup
// before mounting React. If the gate triggers a navigation (window.location.replace),
// canBoot will be false and we skip mount entirely.
(async () => {
    try {
        const canBoot = await (window.__pawscordBootstrap || Promise.resolve(true));
        if (canBoot === false) return;
    } catch (_) {
        /* boot gate failed; mount anyway */
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <ErrorBoundary>
            <RootApp />
        </ErrorBoundary>
    );

    document.documentElement.dataset.buildId = import.meta.env.VITE_BUILD_ID;
    reportWebVitals();
})();

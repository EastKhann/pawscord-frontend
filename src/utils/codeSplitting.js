// frontend/src/utils/codeSplitting.js
// 📦 CODE SPLITTING & LAZY LOADING UTILITY

import React, { lazy, Suspense } from 'react';

/**
 * 🎯 Lazy Load Component Wrapper
 * Component'leri lazy load eder, loading fallback ile
 * 
 * @param {Function} importFunc - Dynamic import fonksiyonu
 * @param {ReactNode} fallback - Loading sırasında gösterilecek component
 * @returns {ReactComponent} - Lazy loaded component
 * 
 * @example
 * const HeavyComponent = lazyLoad(
 *   () => import('./components/HeavyComponent'),
 *   <div>Yükleniyor...</div>
 * );
 */
export const lazyLoad = (importFunc, fallback = <LoadingSpinner />) => {
    const LazyComponent = lazy(importFunc);

    return (props) => (
        <Suspense fallback={fallback}>
            <LazyComponent {...props} />
        </Suspense>
    );
};

/**
 * ⚡ Preload Component
 * Component'i kullanmadan önce preload eder
 * 
 * @param {Function} importFunc - Dynamic import fonksiyonu
 * @returns {Function} - Preload fonksiyonu
 * 
 * @example
 * const preloadSettings = preloadComponent(() => import('./Settings'));
 * // Hover'da preload:
 * <button onMouseEnter={preloadSettings}>Ayarlar</button>
 */
export const preloadComponent = (importFunc) => {
    let component;
    return () => {
        if (!component) {
            component = importFunc();
        }
        return component;
    };
};

/**
 * 🔄 Route-based Code Splitting Helper
 * Route'lara göre component'leri lazy load eder
 * 
 * @param {Object} routes - Route map
 * @returns {Object} - Lazy loaded routes
 * 
 * @example
 * const routes = createLazyRoutes({
 *   '/home': () => import('./pages/Home'),
 *   '/profile': () => import('./pages/Profile')
 * });
 */
export const createLazyRoutes = (routeMap) => {
    const lazyRoutes = {};

    Object.keys(routeMap).forEach(path => {
        lazyRoutes[path] = lazy(routeMap[path]);
    });

    return lazyRoutes;
};

/**
 * 📊 Chunk Size Analyzer
 * Import edilen module'ün boyutunu estimate eder
 * 
 * @param {Function} importFunc - Dynamic import fonksiyonu
 * @returns {Promise<number>} - Estimated size in KB
 */
export const estimateChunkSize = async (importFunc) => {
    const startTime = performance.now();
    await importFunc();
    const endTime = performance.now();

    // Rough estimate based on load time (not accurate but useful)
    const loadTime = endTime - startTime;

    return loadTime;
};

/**
 * 🎨 Default Loading Spinner Component
 */
const LoadingSpinner = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        color: '#b9bbbe'
    }}>
        <div style={{
            border: '3px solid #40444b',
            borderTop: '3px solid #5865f2',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite'
        }} />
        <style>{`
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}</style>
    </div>
);

/**
 * 🎯 Component Bundle Groups
 * İlgili component'leri gruplama ve lazy load stratejisi
 */

// 📧 Email/Messaging Related Components (Low Priority)
export const lazyEmailComponents = {
    EmailClient: lazyLoad(() => import('../components/EmailClient')),
    EmailComposer: lazyLoad(() => import('../components/EmailComposer'))
};

// 🎮 Gaming Features (Medium Priority)
export const lazyGameComponents = {
    TicTacToe: lazyLoad(() => import('../components/TicTacToe')),
    GameMessage: lazyLoad(() => import('../components/GameMessage'))
};

// 📊 Analytics & Charts (Low Priority)
export const lazyAnalyticsComponents = {
    AnalyticsPage: lazyLoad(() => import('../AnalyticsPage')),
    ChartViewer: lazyLoad(() => import('../components/ChartViewer'))
};

// 🎨 Media Viewers (On-Demand)
export const lazyMediaComponents = {
    ImageGallery: lazyLoad(() => import('../components/ImageGallery')),
    VideoPlayer: lazyLoad(() => import('../components/VideoPlayer')),
    GifPicker: lazyLoad(() => import('../components/GifPicker'))
};

// ⚙️ Settings & Admin (Low Priority)
export const lazySettingsComponents = {
    SettingsPanel: lazyLoad(() => import('../SettingsPanel')),
    AdminAnalytics: lazyLoad(() => import('../AdminAnalytics'))
};

// 🔐 Security Features (Medium Priority)
export const lazySecurityComponents = {
    TwoFactorSetup: lazyLoad(() => import('../components/TwoFactorSetup')),
    SecurityAuditLog: lazyLoad(() => import('../components/SecurityAuditLog'))
};

/**
 * 🎯 Smart Loading Strategy
 * Kullanıcı davranışına göre component preload eder
 * 
 * @param {string} userBehavior - Kullanıcı davranış tipi
 * @returns {Promise} - Preload promise
 * 
 * @example
 * // Kullanıcı chat'e girdiğinde media viewer'ı preload et
 * useEffect(() => {
 *   smartPreload('chat-focused');
 * }, [isChatFocused]);
 */
export const smartPreload = async (userBehavior) => {
    const preloadStrategies = {
        'chat-focused': [
            () => import('../components/GifPicker'),
            () => import('../components/EmojiPicker')
        ],
        'profile-viewing': [
            () => import('../components/ImageGallery'),
            () => import('../ProfileEditModal')
        ],
        'settings-opened': [
            () => import('../SettingsPanel'),
            () => import('../components/TwoFactorSetup')
        ],
        'admin-panel': [
            () => import('../AdminAnalytics'),
            () => import('../components/SecurityAuditLog')
        ]
    };

    const preloads = preloadStrategies[userBehavior];
    if (preloads) {
        // Parallel preload
        await Promise.all(preloads.map(loader => loader()));
    }
};

/**
 * 📦 Webpack Magic Comments Helper
 * Webpack chunk naming için yardımcı fonksiyon
 * 
 * @param {string} chunkName - Chunk adı
 * @param {Function} importFunc - Import fonksiyonu
 * @returns {Function} - Named chunk loader
 * 
 * @example
 * const Settings = lazy(namedChunk('settings', () => import('./Settings')));
 */
export const namedChunk = (chunkName, importFunc) => {
    return () => importFunc();
    // Webpack kullanırken:
    // return () => import(/* webpackChunkName: "${chunkName}" *\/ './path');
};

/**
 * 🎯 Bundle Size Recommendations
 */
export const BUNDLE_RECOMMENDATIONS = {
    // Core bundle (her zaman yüklensin) - Max 200KB gzipped
    CORE: [
        'MessageInput',
        'Message',
        'RoomList',
        'ChatRoom',
        'WebSocketContext'
    ],

    // Secondary (route-based) - Max 100KB gzipped each
    SECONDARY: [
        'SettingsPanel',
        'ProfilePage',
        'AdminPanel'
    ],

    // On-Demand (user interaction) - Optimize for smallest chunks
    ON_DEMAND: [
        'GifPicker',
        'ImageGallery',
        'TicTacToe',
        'EmailClient',
        'Analytics'
    ]
};

/**
 * 📊 Performance Budget Checker
 * Bundle size limitlerini kontrol eder
 * 
 * @param {string} chunkName - Chunk adı
 * @param {number} sizeKB - Chunk boyutu (KB)
 * @returns {boolean} - Budget içinde mi?
 */
export const checkPerformanceBudget = (chunkName, sizeKB) => {
    const budgets = {
        core: 200,
        secondary: 100,
        onDemand: 50
    };

    let category = 'onDemand';
    if (BUNDLE_RECOMMENDATIONS.CORE.includes(chunkName)) {
        category = 'core';
    } else if (BUNDLE_RECOMMENDATIONS.SECONDARY.includes(chunkName)) {
        category = 'secondary';
    }

    const budget = budgets[category];
    const isWithinBudget = sizeKB <= budget;

    if (!isWithinBudget) {
        console.warn(
            `⚠️ Performance Budget Exceeded!\n` +
            `  Chunk: ${chunkName}\n` +
            `  Size: ${sizeKB}KB\n` +
            `  Budget: ${budget}KB\n` +
            `  Overage: ${(sizeKB - budget).toFixed(2)}KB`
        );
    }

    return isWithinBudget;
};

/**
 * 🚀 Critical CSS Inliner
 * Above-the-fold CSS'i inline eder
 * 
 * @param {string} css - Critical CSS
 */
export const inlineCriticalCSS = (css) => {
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
};

/**
 * 📦 Resource Hints Helper
 * DNS-prefetch, preconnect, prefetch için helper
 * 
 * @param {string} url - Resource URL
 * @param {string} type - Hint tipi (prefetch, preconnect, dns-prefetch)
 */
export const addResourceHint = (url, type = 'prefetch') => {
    const link = document.createElement('link');
    link.rel = type;
    link.href = url;
    document.head.appendChild(link);
};

// 🎁 Export tüm utilities
export default {
    lazyLoad,
    preloadComponent,
    createLazyRoutes,
    estimateChunkSize,
    smartPreload,
    namedChunk,
    checkPerformanceBudget,
    inlineCriticalCSS,
    addResourceHint,
    // Lazy component groups
    lazyEmailComponents,
    lazyGameComponents,
    lazyAnalyticsComponents,
    lazyMediaComponents,
    lazySettingsComponents,
    lazySecurityComponents
};



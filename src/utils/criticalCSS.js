// frontend/src/utils/criticalCSS.js
// 🎨 CRITICAL CSS EXTRACTION & INLINE
// Above-the-fold CSS'i inline eder, back kalanı lazy load

/**
 * 🎯 Critical CSS (Above-the-fold)
 * İlk ekranda gösterilen elementler for CSS
 */
export const CRITICAL_CSS = `
/* 🎨 PAWSCORD Critical CSS - Above the Fold */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: #0b0e1b;
    color: #dbdee1;
    overflow: hidden;
}

/* Loading Screen */
#loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #0b0e1b;
    display: flex;
    align-items: center;
    justify-center: center;
    z-index: 9999;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #182135;
    border-top-color: #5865f2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Main Layout */
#root {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.app-container {
    display: flex;
    width: 100%;
    height: 100%;
}

/* Sidebar */
.sidebar {
    width: 240px;
    background: #0e1222;
    flex-shrink: 0;
}

/* Chat Area */
.chat-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #121928;
}

/* Message Input - Critical */
.message-input-container {
    padding: 16px;
    background: #182135;
}

.message-input {
    width: 100%;
    padding: 12px;
    background: #182135;
    border: none;
    border-radius: 8px;
    color: #dbdee1;
    font-size: 15px;
    outline: none;
}

/* Button Base */
button {
    cursor: pointer;
    border: none;
    background: transparent;
    color: inherit;
    font-family: inherit;
}

.btn-primary {
    background: #5865f2;
    color: white;
    padding: 10px 16px;
    border-radius: 4px;
    font-weight: 500;
    transition: background 0.17s ease;
}

.btn-primary:hover {
    background: #4752c4;
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #0e1222;
}

::-webkit-scrollbar-thumb {
    background: #1a1b1e;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #141517;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
}

/* Utilities */
.flex {
    display: flex;
}

.flex-col {
    flex-direction: column;
}

.items-center {
    align-items: center;
}

.justify-center {
    justify-content: center;
}

.gap-2 {
    gap: 8px;
}

.gap-4 {
    gap: 16px;
}

.hidden {
    display: none !important;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .sidebar {
        width: 100%;
        position: absolute;
        z-index: 100;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    }
    
    .sidebar.open {
        transform: translateX(0);
    }
}
`;

/**
 * 🎯 Inline Critical CSS
 * Critical CSS'i <head>'e inject et
 */
export const inlineCriticalCSS = () => {
    const style = document.createElement('style');
    style.id = 'critical-css';
    style.textContent = CRITICAL_CSS;
    document.head.insertBefore(style, document.head.firstChild);
};

/**
 * 📦 Lazy Load Non-Critical CSS
 * Geri kalan CSS'i lazy load et
 */
export const lazyLoadCSS = (href) => {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => {
            resolve();
        };
        link.onerror = reject;
        document.head.appendChild(link);
    });
};

/**
 * 🎨 Load All Non-Critical CSS
 * requestIdleCallback with non-critical CSS upload
 */
export const loadNonCriticalCSS = () => {
    // ⚠️ DISABLED: These CSS files don't exist, all CSS is bundled by webpack
    const nonCriticalCSS = [];
    /*
    const nonCriticalCSS = [
        '/static/css/animations.css',
        '/static/css/components.css',
        '/static/css/themes.css'
    ];
    */

    const loadCSS = () => {
        nonCriticalCSS.forEach((href) => {
            lazyLoadCSS(href);
        });
    };

    if ('requestIdleCallback' in window) {
        requestIdleCallback(loadCSS);
    } else {
        setTimeout(loadCSS, 1);
    }
};

/**
 * 📊 Font Loading Optimization
 * Font'ları optimize şekilde upload
 * ⚠️ Electron'da file:// protokolü preload desteklemiyor
 */
export const optimizeFontLoading = () => {
    // Electron kontrolü - file:// protokolünde font preload çalışmaz
    const isElectron =
        typeof window !== 'undefined' &&
        (window.process?.versions?.electron ||
            window.navigator?.userAgent?.includes('Electron') ||
            window.location?.protocol === 'file:');

    if (isElectron) {
        return;
    }

    // Font preload removed - artık kullanılmıyor (system font stack)
};

/**
 * 🎯 Preload Key Resources
 * Kritik kaynakları preload et
 * ⚠️ Electron'da file:// protokolü preload desteklemiyor
 */
export const preloadKeyResources = () => {
    // Electron kontrolü - file:// protokolünde preload çalışmaz
    const isElectron =
        typeof window !== 'undefined' &&
        (window.process?.versions?.electron ||
            window.navigator?.userAgent?.includes('Electron') ||
            window.location?.protocol === 'file:');

    if (isElectron) {
        return;
    }

    // ⚠️ Preload removed - logo R2 CDN'den yükleniyor, local file yok
    // Bu sayede "preloaded but not used" uyarısı çıkmaz
};

/**
 * 🔧 Remove Critical CSS After Full Load
 * Tam CSS yüklendikten sonra critical CSS'i kaldır (opsiyonel)
 */
export const removeCriticalCSS = () => {
    const criticalStyle = document.getElementById('critical-css');
    if (criticalStyle) {
        // Full CSS yüklendikten 1 saniye sonra kaldır
        setTimeout(() => {
            criticalStyle.remove();
        }, 1000);
    }
};

/**
 * 🎨 Initialize CSS Optimization
 * Tüm CSS optimizasyonlarını başlat
 */
export const initializeCSSOptimization = () => {
    // 1. Critical CSS inline et
    inlineCriticalCSS();

    // 2. Key resources preload
    preloadKeyResources();

    // 3. Font optimization
    optimizeFontLoading();

    // 4. Non-critical CSS lazy load (idle callback)
    loadNonCriticalCSS();

    // 5. Full CSS yüklendikten sonra critical CSS'i kaldır
    if (document.readyState === 'complete') {
        removeCriticalCSS();
    } else {
        window.addEventListener('load', removeCriticalCSS);
    }
};

// 🎁 Export
export default {
    CRITICAL_CSS,
    inlineCriticalCSS,
    lazyLoadCSS,
    loadNonCriticalCSS,
    optimizeFontLoading,
    preloadKeyResources,
    removeCriticalCSS,
    initializeCSSOptimization,
};

// frontend/src/utils/lazyWithRetry.js
// 🔄 Lazy load with auto-retry & cache-busting reload on chunk failure
// Yeni deploy sonrası eski chunk'lar kaybolunca otomatik page reload yapar

import React from 'react';

// 🔑 UNIFIED keys — ALL chunk error handlers must use these same keys
export const CHUNK_RELOAD_KEY = 'pawscord_chunk_reload';
export const CHUNK_RELOAD_COUNT_KEY = 'pawscord_chunk_reload_count';
const MAX_RELOADS = 1; // 🔧 Only 1 reload — cache-busting URL ensures it works on first try

/**
 * Chunk load hatası mı kontrol et
 */
export function isChunkLoadError(error) {
    if (!error) return false;
    const msg = error.message || error.toString();
    return (
        msg.includes('Failed to fetch dynamically imported module') ||
        msg.includes('Loading chunk') ||
        msg.includes('Loading CSS chunk') ||
        msg.includes('ChunkLoadError') ||
        msg.includes('Importing a module script failed') ||
        msg.includes('error loading dynamically imported module')
    );
}

/**
 * React.lazy() wrapper — chunk yüklenemezse otomatik retry + reload
 * @param {Function} importFn - () => import('./Component')
 * @param {number} retries - Kaç kez retry denensin (default: 2)
 */
export function lazyWithRetry(importFn, retries = 2) {
    return React.lazy(() => {
        return new Promise((resolve, reject) => {
            const attempt = (retriesLeft) => {
                importFn()
                    .then(resolve)
                    .catch((error) => {
                        if (retriesLeft > 0 && isChunkLoadError(error)) {
                            console.warn(`⚠️ Chunk yükleme hatası, retry... (${retriesLeft} kalan)`);
                            // Cache-bust ile tekrar dene
                            setTimeout(() => attempt(retriesLeft - 1), 800);
                        } else if (isChunkLoadError(error)) {
                            // Tüm retry'lar bitti, page reload yap
                            handleChunkReload();
                            reject(error);
                        } else {
                            reject(error);
                        }
                    });
            };
            attempt(retries);
        });
    });
}

/**
 * Chunk hatası sonrası güvenli reload — cache-busting ile
 * Sonsuz döngüyü önlemek için counter + cooldown var
 */
export function handleChunkReload() {
    const reloadCount = parseInt(sessionStorage.getItem(CHUNK_RELOAD_COUNT_KEY) || '0', 10);
    const lastReload = sessionStorage.getItem(CHUNK_RELOAD_KEY);
    const now = Date.now();

    // 🛡️ Maksimum reload limiti — sonsuz döngü koruma
    if (reloadCount >= MAX_RELOADS) {
        console.error('❌ Chunk reload limiti aşıldı. Sonsuz döngü engellendi.');
        console.error('💡 Lütfen Ctrl+Shift+R ile sayfayı tamamen yenileyin.');
        return false;
    }

    // 🛡️ Cooldown — 15 saniye içinde tekrar reload yapma
    if (lastReload && (now - parseInt(lastReload, 10)) < 15000) {
        console.error('❌ Chunk reload cooldown aktif — sonsuz döngü engellendi');
        return false;
    }

    console.warn(`🔄 Yeni versiyon algılandı, sayfa yenileniyor... (${reloadCount + 1}/${MAX_RELOADS})`);
    sessionStorage.setItem(CHUNK_RELOAD_KEY, now.toString());
    sessionStorage.setItem(CHUNK_RELOAD_COUNT_KEY, (reloadCount + 1).toString());

    // 🔧 Cache-busting reload: add timestamp query param to force fresh fetch
    // window.location.reload() is a "soft" reload that reuses cached resources.
    // With immutable cache headers on /static/, stale chunks would survive forever.
    const url = new URL(window.location.href);
    url.searchParams.set('_cr', now.toString());
    window.location.replace(url.toString());
    return true;
}

/**
 * ErrorBoundary'den çağrılır — chunk hatasıysa otomatik reload
 * @returns {boolean} reload yapıldı mı
 */
export function handleChunkErrorInBoundary(error) {
    if (isChunkLoadError(error)) {
        return handleChunkReload();
    }
    return false;
}

export default lazyWithRetry;

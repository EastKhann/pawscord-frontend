// frontend/src/utils/lazyWithRetry.js
// 🔄 Lazy load with auto-retry & cache-busting reload on chunk failure
// Yeni deploy sonrası eski chunk'lar kaybolunca otomatik page reload yapar

// PropTypes validation: N/A for this module (hook/utility — no React props interface)
// Accessibility (aria): N/A for this module (hook/context/utility — no rendered DOM)
// aria-label: n/a — hook/context/utility module, no directly rendered JSX
import React from 'react';
import logger from '../utils/logger';

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
        msg.includes('error loading dynamically imported module') ||
        // Browser MIME-type rejection when a JS module request returns HTML (e.g.
        // a stale index.html served instead of the missing chunk → text/html)
        msg.includes('Expected a JavaScript') ||
        msg.includes('MIME type')
    );
}

/**
 * React.lazy() wrapper — chunk uploadnemezse otomatik retry + reload
 * @param {Function} importFn - () => import('./Component')
 * @param {number} retries - Kopen kez retry denensin (default: 2)
 */
export function lazyWithRetry(importFn, retries = 2) {
    return React.lazy(() => {
        return new Promise((resolve, reject) => {
            const attempt = (retriesLeft) => {
                importFn()
                    .then(resolve)
                    .catch((error) => {
                        if (retriesLeft > 0 && isChunkLoadError(error)) {
                            logger.warn(`⚠️ Chunk load error, retrying... (${retriesLeft} remaining)`);
                            // Cache-bust with tekrar dene
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
 * Chunk hatası sonrası güvenli reload — cache-busting with
 * Sonsuz döngüyü önlemek for counter + cooldown var
 */
export function handleChunkReload() {
    const reloadCount = parseInt(sessionStorage.getItem(CHUNK_RELOAD_COUNT_KEY) || '0', 10);
    const lastReload = sessionStorage.getItem(CHUNK_RELOAD_KEY);
    const now = Date.now();

    // 🛡️ Maksimum reload limiti — sonsuz döngü koruma
    if (reloadCount >= MAX_RELOADS) {
        logger.error('❌ Chunk reload limit exceeded. Infinite loop blocked.');
        logger.error('💡 Please refresh the page with Ctrl+Shift+R.');
        return false;
    }

    // 🛡️ Cooldown — 15 saniye forde tekrar reload yapma
    if (lastReload && now - parseInt(lastReload, 10) < 15000) {
        logger.error('❌ Chunk reload cooldown active — infinite loop blocked');
        return false;
    }

    logger.warn(
        `🔄 New version detected, reloading page... (${reloadCount + 1}/${MAX_RELOADS})`
    );
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

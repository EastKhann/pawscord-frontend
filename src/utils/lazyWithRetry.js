// frontend/src/utils/lazyWithRetry.js
// 🔄 Lazy load with auto-retry & reload on chunk failure
// Yeni deploy sonrası eski chunk'lar kaybolunca otomatik page reload yapar

import React from 'react';

const RELOAD_KEY = 'pawscord_chunk_reload';
const RELOAD_COUNT_KEY = 'pawscord_chunk_reload_count';
const RELOAD_COOLDOWN = 10000; // 10 saniye içinde tekrar reload yapma
const MAX_RELOADS = 2; // Maksimum reload sayısı

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
 * @param {number} retries - Kaç kez retry denensin (default: 1)
 */
export function lazyWithRetry(importFn, retries = 1) {
    return React.lazy(() => {
        return new Promise((resolve, reject) => {
            const attempt = (retriesLeft) => {
                importFn()
                    .then(resolve)
                    .catch((error) => {
                        if (retriesLeft > 0 && isChunkLoadError(error)) {
                            console.warn(`⚠️ Chunk yükleme hatası, retry... (${retriesLeft} kalan)`);
                            // Cache-bust ile tekrar dene
                            setTimeout(() => attempt(retriesLeft - 1), 500);
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
 * Chunk hatası sonrası güvenli reload
 * Sonsuz döngüyü önlemek için cooldown var
 */
function handleChunkReload() {
    const lastReload = sessionStorage.getItem(RELOAD_KEY);
    const reloadCount = parseInt(sessionStorage.getItem(RELOAD_COUNT_KEY) || '0', 10);
    const now = Date.now();

    // 🛡️ Maksimum reload limiti — sonsuz döngü koruma
    if (reloadCount >= MAX_RELOADS) {
        console.error('❌ Chunk reload limiti aşıldı. Sonsuz döngü engellendi.');
        console.error('💡 Lütfen Ctrl+Shift+R ile sayfayı tamamen yenileyin.');
        return;
    }

    if (lastReload && (now - parseInt(lastReload, 10)) < RELOAD_COOLDOWN) {
        console.error('❌ Chunk reload cooldown aktif — sonsuz döngü engellendi');
        return;
    }

    console.warn(`🔄 Yeni versiyon algılandı, sayfa yenileniyor... (${reloadCount + 1}/${MAX_RELOADS})`);
    sessionStorage.setItem(RELOAD_KEY, now.toString());
    sessionStorage.setItem(RELOAD_COUNT_KEY, (reloadCount + 1).toString());
    window.location.reload();
}

/**
 * ErrorBoundary'den çağrılır — chunk hatasıysa otomatik reload
 * @returns {boolean} reload yapıldı mı
 */
export function handleChunkErrorInBoundary(error) {
    if (isChunkLoadError(error)) {
        handleChunkReload();
        return true;
    }
    return false;
}

export default lazyWithRetry;

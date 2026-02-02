/**
 * 🔧 Service Worker Registration Helper
 * PWA support and offline capabilities
 */

export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('✅ Service Worker registered:', registration.scope);

                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New service worker available
                                console.log('ℹ️ Yeni service worker hazır - UI güncelleme butonu aktif');
                                newWorker.postMessage({ type: 'SKIP_WAITING' });
                                // Otomatik reload kaldırıldı - kullanıcı istediğinde güncellesin
                            }
                        });
                    });
                })
                .catch(error => {
                    console.error('❌ Service Worker registration failed:', error);
                });
        });
    }
}

// Call this in index.js after root.render()
if (import.meta.env.MODE === 'production') {
    registerServiceWorker();
}



import logger from './utils/logger';
// frontend/src/serviceWorker.js
/**
 * 🔧 Service Worker Registration
 * PWA desteği ve offline caching
 */

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register(config) {
    if (import.meta.env.MODE === 'production' && 'serviceWorker' in navigator) {
        const publicUrl = new URL(import.meta.env.BASE_URL || '/', window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            return;
        }

        window.addEventListener('load', () => {
            const swUrl = `${import.meta.env.BASE_URL || ''}/service-worker.js`;

            if (isLocalhost) {
                checkValidServiceWorker(swUrl, config);
                navigator.serviceWorker.ready.then(() => {
                    logger.info('🔧 Service Worker running in localhost mode');
                });
            } else {
                registerValidSW(swUrl, config);
            }
        });
    }
}

function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
            logger.info('✅ Service Worker registered');

            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker == null) {
                    return;
                }

                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            logger.info('🔄 New content available, refresh needed');

                            if (config && config.onUpdate) {
                                config.onUpdate(registration);
                            }
                        } else {
                            logger.info("✨ Content cached for offline use'lendi");

                            if (config && config.onSuccess) {
                                config.onSuccess(registration);
                            }
                        }
                    }
                };
            };
        })
        .catch((error) => {
            logger.error('❌ Service Worker registration error:', error);
        });
}

function checkValidServiceWorker(swUrl, config) {
    fetch(swUrl, {
        headers: { 'Service-Worker': 'script' },
    })
        .then((response) => {
            const contentType = response.headers.get('content-type');
            if (
                response.status === 404 ||
                (contentType != null && contentType.indexOf('javascript') === -1)
            ) {
                navigator.serviceWorker.ready.then((registration) => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                registerValidSW(swUrl, config);
            }
        })
        .catch(() => {
            logger.info('📵 No internet, running in offline mode');
        });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister();
                logger.info('🗑️ Service Worker removed');
            })
            .catch((error) => {
                logger.error(error.message);
            });
    }
}

// frontend/src/utils/serviceWorkerManager.js

/**
 * 📦 Service Worker Manager
 * PWA service worker registration and lifecycle management
 */

class ServiceWorkerManager {
    constructor(options = {}) {
        this.swPath = options.swPath || '/service-worker.js';
        this.scope = options.scope || '/';
        this.updateInterval = options.updateInterval || 60 * 60 * 1000; // 1 hour
        this.registration = null;
        this.updateCheckInterval = null;
        this.listeners = new Map();
    }

    /**
     * Register service worker
     */
    async register() {
        if (!('serviceWorker' in navigator)) {
            console.warn('Service Worker not supported');
            return null;
        }

        try {
            this.registration = await navigator.serviceWorker.register(this.swPath, {
                scope: this.scope
            });


            this.setupListeners();
            this.checkForUpdates();

            return this.registration;
        } catch (error) {
            console.error('Service Worker registration failed:', error);
            return null;
        }
    }

    /**
     * Setup event listeners
     */
    setupListeners() {
        if (!this.registration) return;

        // Update found
        this.registration.addEventListener('updatefound', () => {
            const newWorker = this.registration.installing;


            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New service worker installed, ready to activate
                    this.emit('updateAvailable', newWorker);

                    if (import.meta.env.MODE === 'development') {
                    }
                }
            });
        });

        // Controller changed (new SW activated)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            this.emit('controllerChange');
        });

        // Message from SW
        navigator.serviceWorker.addEventListener('message', (event) => {
            this.emit('message', event.data);
        });
    }

    /**
     * Check for updates periodically
     */
    checkForUpdates() {
        this.updateCheckInterval = setInterval(async () => {
            if (this.registration) {
                await this.registration.update();
            }
        }, this.updateInterval);
    }

    /**
     * Update service worker
     */
    async update() {
        if (!this.registration) return;

        try {
            await this.registration.update();
        } catch (error) {
            console.error('Service Worker update failed:', error);
        }
    }

    /**
     * Skip waiting and activate new SW
     */
    async skipWaiting() {
        if (!this.registration || !this.registration.waiting) return;

        this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });

        // 🔥 FIX: Otomatik sayfa yenilemesi KALDIRILDI
        // Kullanıcı zaten sayfayı kullanıyorsa mesajlar kaybolur!
        // Yenileme sadece kullanıcı manuel yapınca olsun
    }

    /**
     * Unregister service worker
     */
    async unregister() {
        if (!this.registration) return;

        try {
            const success = await this.registration.unregister();

            if (success) {
                this.registration = null;

                if (this.updateCheckInterval) {
                    clearInterval(this.updateCheckInterval);
                    this.updateCheckInterval = null;
                }
            }

            return success;
        } catch (error) {
            console.error('Service Worker unregister failed:', error);
            return false;
        }
    }

    /**
     * Send message to service worker
     */
    async postMessage(message) {
        if (!this.registration || !this.registration.active) {
            console.warn('No active Service Worker');
            return;
        }

        this.registration.active.postMessage(message);
    }

    /**
     * Get cache size
     */
    async getCacheSize() {
        if (!('caches' in window)) return 0;

        const cacheNames = await caches.keys();
        let totalSize = 0;

        for (const name of cacheNames) {
            const cache = await caches.open(name);
            const requests = await cache.keys();

            for (const request of requests) {
                const response = await cache.match(request);
                if (response) {
                    const blob = await response.blob();
                    totalSize += blob.size;
                }
            }
        }

        return totalSize;
    }

    /**
     * Clear all caches
     */
    async clearCaches() {
        if (!('caches' in window)) return;

        const cacheNames = await caches.keys();

        await Promise.all(
            cacheNames.map(name => caches.delete(name))
        );

    }

    /**
     * Event emitter
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    off(event, callback) {
        if (!this.listeners.has(event)) return;

        const callbacks = this.listeners.get(event);
        const index = callbacks.indexOf(callback);

        if (index > -1) {
            callbacks.splice(index, 1);
        }
    }

    emit(event, data) {
        if (!this.listeners.has(event)) return;

        this.listeners.get(event).forEach(callback => {
            callback(data);
        });
    }

    /**
     * Get registration state
     */
    getState() {
        if (!this.registration) return 'unregistered';

        if (this.registration.installing) return 'installing';
        if (this.registration.waiting) return 'waiting';
        if (this.registration.active) return 'active';

        return 'unknown';
    }
}

// Global instance
export const serviceWorkerManager = new ServiceWorkerManager();

/**
 * React Hook - Service Worker
 */
export const useServiceWorker = (options = {}) => {
    const [registration, setRegistration] = React.useState(null);
    const [updateAvailable, setUpdateAvailable] = React.useState(false);
    const [state, setState] = React.useState('unregistered');

    React.useEffect(() => {
        const handleUpdateAvailable = () => {
            setUpdateAvailable(true);
        };

        const handleControllerChange = () => {
            setState(serviceWorkerManager.getState());
        };

        serviceWorkerManager.on('updateAvailable', handleUpdateAvailable);
        serviceWorkerManager.on('controllerChange', handleControllerChange);

        // Register on mount
        if (options.autoRegister !== false) {
            serviceWorkerManager.register().then(reg => {
                setRegistration(reg);
                setState(serviceWorkerManager.getState());
            });
        }

        return () => {
            serviceWorkerManager.off('updateAvailable', handleUpdateAvailable);
            serviceWorkerManager.off('controllerChange', handleControllerChange);
        };
    }, [options.autoRegister]);

    const update = React.useCallback(() => {
        serviceWorkerManager.skipWaiting();
    }, []);

    const unregister = React.useCallback(async () => {
        const success = await serviceWorkerManager.unregister();
        if (success) {
            setRegistration(null);
            setState('unregistered');
        }
        return success;
    }, []);

    return {
        registration,
        updateAvailable,
        state,
        update,
        unregister
    };
};

/**
 * React Hook - SW Update Prompt
 */
export const useServiceWorkerUpdate = () => {
    const [showPrompt, setShowPrompt] = React.useState(false);

    React.useEffect(() => {
        const handleUpdateAvailable = () => {
            setShowPrompt(true);
        };

        serviceWorkerManager.on('updateAvailable', handleUpdateAvailable);

        return () => {
            serviceWorkerManager.off('updateAvailable', handleUpdateAvailable);
        };
    }, []);

    const applyUpdate = React.useCallback(() => {
        setShowPrompt(false);
        serviceWorkerManager.skipWaiting();
    }, []);

    const dismissUpdate = React.useCallback(() => {
        setShowPrompt(false);
    }, []);

    return {
        showPrompt,
        applyUpdate,
        dismissUpdate
    };
};

export default ServiceWorkerManager;



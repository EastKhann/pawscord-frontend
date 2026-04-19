import logger from '../utils/logger';
// frontend/src/utils/componentPreloader.js

/**
 * 🚀 Component Preloader
 * Kritik componentleri idle time'da önceden uploadr
 * User deneyimini iyleştirir
 */

class ComponentPreloader {
    constructor() {
        this.preloaded = new Set();
        this.loading = new Set();
        this.isIdle = false;

        // Idle detection
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            this.setupIdleCallback();
        }
    }

    /**
     * Idle callback setup
     */
    setupIdleCallback() {
        window.requestIdleCallback(
            () => {
                this.isIdle = true;
            },
            { timeout: 2000 }
        );
    }

    /**
     * Component'i preload et
     * @param {Function} importFn - Dynamic import fonksiyonu
     * @param {string} name - Component adı
     * @param {number} priority - Priority (0-10, 10 en yüksek)
     * @returns {Promise}
     */
    async preload(importFn, name, priority = 5) {
        // Zaten uploadnmiş
        if (this.preloaded.has(name)) {
            return;
        }

        // Şu anda yükleniyor
        if (this.loading.has(name)) {
            return;
        }

        // High öncelikli componentler hemen uploadnsin
        if (priority >= 8) {
            return this.loadNow(importFn, name);
        }

        // Low öncelikli componentler idle time'da uploadnsin
        if (this.isIdle) {
            return this.loadNow(importFn, name);
        }

        // Idle olmadıysa bekle
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            window.requestIdleCallback(
                () => {
                    this.loadNow(importFn, name);
                },
                { timeout: 5000 }
            );
        } else {
            // requestIdleCallback yoksa setTimeout kullan
            setTimeout(() => {
                this.loadNow(importFn, name);
            }, 2000);
        }
    }

    /**
     * Hemen upload
     */
    async loadNow(importFn, name) {
        this.loading.add(name);

        try {
            const startTime = performance.now();
            await importFn();
            const endTime = performance.now();

            this.preloaded.add(name);
            this.loading.delete(name);
        } catch (error) {
            logger.error(`❌ [Preload] ${name} failed:`, error);
            this.loading.delete(name);
        }
    }

    /**
     * Birden fazla component'i batch preload et
     */
    async preloadBatch(components) {
        // Önceliğe göre sırala
        const sorted = components.sort((a, b) => (b.priority || 0) - (a.priority || 0));

        for (const { importFn, name, priority } of sorted) {
            await this.preload(importFn, name, priority);
            // Her load searchsında kısa bir bekleme
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    }

    /**
     * Status bilgisi
     */
    getStatus() {
        return {
            preloaded: Array.from(this.preloaded),
            loading: Array.from(this.loading),
            total: this.preloaded.size + this.loading.size,
        };
    }

    /**
     * Reset
     */
    reset() {
        this.preloaded.clear();
        this.loading.clear();
    }
}

// Global instance
export const componentPreloader = new ComponentPreloader();

/**
 * Kritik componentleri preload et
 */
export const preloadCriticalComponents = () => {
    const components = [
        // High öncelik (8-10) - Sık kullanılan
        {
            name: 'ChatUserList',
            importFn: () => import('../ChatUserList'),
            priority: 10,
        },
        {
            name: 'UserProfilePanel',
            importFn: () => import('../UserProfilePanel'),
            priority: 9,
        },
        {
            name: 'VoiceChatPanel',
            importFn: () => import('../VoiceChatPanel'),
            priority: 9,
        },

        // Orta öncelik (5-7) - Search sıra kullanılan
        {
            name: 'CodeSnippetModal',
            importFn: () => import('../components/chat/CodeSnippetModal'),
            priority: 6,
        },
        {
            name: 'ImageModal',
            importFn: () => import('../ImageModal'),
            priority: 6,
        },
        {
            name: 'UserProfileModal',
            importFn: () => import('../UserProfileModal'),
            priority: 7,
        },

        // Low öncelik (0-4) - Nadiren kullanılan
        {
            name: 'PollCreateModal',
            importFn: () => import('../components/chat/PollCreateModal'),
            priority: 3,
        },
        {
            name: 'ThemeStoreModal',
            importFn: () => import('../components/premium/ThemeStoreModal'),
            priority: 2,
        },
        {
            name: 'CryptoStoreModal',
            importFn: () => import('../components/premium/CryptoStoreModal'),
            priority: 1,
        },
    ];

    componentPreloader.preloadBatch(components);
};

/**
 * Route-based preloading
 */
export const preloadRouteComponents = (route) => {
    const routeMap = {
        '/friends': [{ name: 'FriendsTab', importFn: () => import('../FriendsTab'), priority: 10 }],
        '/analytics': [
            {
                name: 'AnalyticsDashboard',
                importFn: () => import('../AnalyticsDashboard'),
                priority: 10,
            },
        ],
        '/crypto': [
            { name: 'CryptoDashboard', importFn: () => import('../CryptoDashboard'), priority: 10 },
        ],
    };

    const components = routeMap[route];
    if (components) {
        componentPreloader.preloadBatch(components);
    }
};

/**
 * Hover preloading
 */
export const preloadOnHover = (importFn, name) => {
    return {
        onMouseEnter: () => {
            componentPreloader.preload(importFn, name, 8);
        },
    };
};

/**
 * Viewport-based preloading (element görünür olduğunda)
 */
export const preloadOnVisible = (importFn, name, element) => {
    if (!element || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    componentPreloader.preload(importFn, name, 7);
                    observer.disconnect();
                }
            });
        },
        { rootMargin: '50px' }
    );

    observer.observe(element);
};

/**
 * User intent preloading (mousemove with tahmin)
 */
export const setupIntentPreloading = () => {
    if (typeof window === 'undefined') return;

    let lastMousePos = { x: 0, y: 0 };
    let hoverElements = new Map();

    // Element'leri register et
    const registerElement = (element, importFn, name) => {
        hoverElements.set(element, { importFn, name });
    };

    // Mouse movement tracking
    window.addEventListener('mousemove', (e) => {
        const movementSpeed = Math.sqrt(
            Math.pow(e.clientX - lastMousePos.x, 2) + Math.pow(e.clientY - lastMousePos.y, 2)
        );

        lastMousePos = { x: e.clientX, y: e.clientY };

        // Yavaş hareket = kullanıcı muhtemelen tıklayacak
        if (movementSpeed < 5) {
            const target = document.elementFromPoint(e.clientX, e.clientY);
            if (target && hoverElements.has(target)) {
                const { importFn, name } = hoverElements.get(target);
                componentPreloader.preload(importFn, name, 9);
            }
        }
    });

    return { registerElement };
};

export default ComponentPreloader;

import { getApiBase } from '../utils/apiEndpoints';
// frontend/src/utils/resourceHints.js

/**
 * 🔗 Resource Hints Manager
 * Preload, Prefetch, Preconnect, DNS-Prefetch
 */

class ResourceHintsManager {
    constructor() {
        this.hints = new Map();
        this.observer = null;
        this.initNavigationPredictor();
    }

    /**
     * Preconnect - Establish early connection
     */
    preconnect(url, crossorigin = false) {
        if (this.hints.has(`preconnect-${url}`)) return;

        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        if (crossorigin) link.crossOrigin = 'anonymous';

        document.head.appendChild(link);
        this.hints.set(`preconnect-${url}`, link);

        if (import.meta.env.MODE === 'development') {
            console.log(`🔗 [ResourceHints] Preconnect: ${url}`);
        }
    }

    /**
     * DNS Prefetch - Resolve DNS early
     */
    dnsPrefetch(url) {
        if (this.hints.has(`dns-prefetch-${url}`)) return;

        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = url;

        document.head.appendChild(link);
        this.hints.set(`dns-prefetch-${url}`, link);

        if (import.meta.env.MODE === 'development') {
            console.log(`🌐 [ResourceHints] DNS Prefetch: ${url}`);
        }
    }

    /**
     * Preload - High priority resource
     */
    preload(url, as, options = {}) {
        if (this.hints.has(`preload-${url}`)) return;

        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = as; // script, style, image, font, fetch, document

        if (options.type) link.type = options.type;
        if (options.crossorigin) link.crossOrigin = options.crossorigin;
        if (options.media) link.media = options.media;

        document.head.appendChild(link);
        this.hints.set(`preload-${url}`, link);

        if (import.meta.env.MODE === 'development') {
            console.log(`⚡ [ResourceHints] Preload (${as}): ${url}`);
        }
    }

    /**
     * Prefetch - Low priority resource for next page
     */
    prefetch(url, options = {}) {
        if (this.hints.has(`prefetch-${url}`)) return;

        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;

        if (options.as) link.as = options.as;
        if (options.crossorigin) link.crossOrigin = options.crossorigin;

        document.head.appendChild(link);
        this.hints.set(`prefetch-${url}`, link);

        if (import.meta.env.MODE === 'development') {
            console.log(`📥 [ResourceHints] Prefetch: ${url}`);
        }
    }

    /**
     * Prerender - Render next page in background
     */
    prerender(url) {
        if (this.hints.has(`prerender-${url}`)) return;

        // Modern browsers use prefetch instead
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        link.as = 'document';

        document.head.appendChild(link);
        this.hints.set(`prerender-${url}`, link);

        if (import.meta.env.MODE === 'development') {
            console.log(`🎨 [ResourceHints] Prerender: ${url}`);
        }
    }

    /**
     * Modulepreload - ES module preload
     */
    modulepreload(url, options = {}) {
        if (this.hints.has(`modulepreload-${url}`)) return;

        const link = document.createElement('link');
        link.rel = 'modulepreload';
        link.href = url;

        if (options.crossorigin) link.crossOrigin = options.crossorigin;

        document.head.appendChild(link);
        this.hints.set(`modulepreload-${url}`, link);

        if (import.meta.env.MODE === 'development') {
            console.log(`📦 [ResourceHints] Module Preload: ${url}`);
        }
    }

    /**
     * Initialize navigation predictor
     */
    initNavigationPredictor() {
        if (!('IntersectionObserver' in window)) return;

        // Observe links
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const href = entry.target.getAttribute('href');
                    if (href && href.startsWith('/')) {
                        // Prefetch route chunk
                        this.prefetchRoute(href);
                    }
                }
            });
        }, { rootMargin: '50px' });

        // Observe all internal links
        this.observeLinks();
    }

    /**
     * Observe links for prefetching
     */
    observeLinks() {
        const links = document.querySelectorAll('a[href^="/"]');
        links.forEach(link => {
            this.observer?.observe(link);
        });
    }

    /**
     * Prefetch route chunk
     */
    prefetchRoute(route) {
        // This would prefetch the code chunk for a route
        // Implementation depends on your routing setup
        if (import.meta.env.MODE === 'development') {
            console.log(`🛣️ [ResourceHints] Prefetch route: ${route}`);
        }
    }

    /**
     * Prefetch on hover
     */
    prefetchOnHover(element, url) {
        let timeoutId;

        const handleMouseEnter = () => {
            timeoutId = setTimeout(() => {
                this.prefetch(url);
            }, 100); // 100ms delay
        };

        const handleMouseLeave = () => {
            if (timeoutId) clearTimeout(timeoutId);
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }

    /**
     * Smart prefetch based on connection speed
     */
    smartPrefetch(url, options = {}) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

        if (!connection) {
            this.prefetch(url, options);
            return;
        }

        // Don't prefetch on slow connections
        if (connection.saveData) {
            if (import.meta.env.MODE === 'development') {
                console.log('⚠️ [ResourceHints] Skipping prefetch (data saver mode)');
            }
            return;
        }

        const effectiveType = connection.effectiveType;

        // Only prefetch on good connections
        if (effectiveType === '4g' || effectiveType === 'wifi') {
            this.prefetch(url, options);
        } else {
            if (import.meta.env.MODE === 'development') {
                console.log(`⚠️ [ResourceHints] Skipping prefetch (${effectiveType} connection)`);
            }
        }
    }

    /**
     * Preload critical resources
     */
    preloadCritical() {
        // Fonts
        this.preload('/fonts/Inter-Regular.woff2', 'font', {
            type: 'font/woff2',
            crossorigin: 'anonymous'
        });

        this.preload('/fonts/Inter-Bold.woff2', 'font', {
            type: 'font/woff2',
            crossorigin: 'anonymous'
        });

        // Critical images
        this.preload('/logo192.png', 'image');

        // Critical API endpoints
        this.preconnect(import.meta.env.VITE_API_URL || getApiBase().replace('/api', ''));

        // CDNs
        this.preconnect('https://fonts.googleapis.com');
        this.preconnect('https://fonts.gstatic.com', true);
    }

    /**
     * Remove hint
     */
    remove(key) {
        const element = this.hints.get(key);
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
            this.hints.delete(key);
        }
    }

    /**
     * Clear all hints
     */
    clearAll() {
        this.hints.forEach((element, key) => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        this.hints.clear();
    }

    /**
     * Get stats
     */
    getStats() {
        const stats = {
            preconnect: 0,
            dnsPrefetch: 0,
            preload: 0,
            prefetch: 0,
            modulepreload: 0
        };

        this.hints.forEach((_, key) => {
            const type = key.split('-')[0];
            if (stats.hasOwnProperty(type)) {
                stats[type]++;
            }
        });

        return stats;
    }
}

// Global instance
export const resourceHints = new ResourceHintsManager();

/**
 * React Hook
 */
export const useResourceHint = (type, url, options = {}) => {
    React.useEffect(() => {
        switch (type) {
            case 'preconnect':
                resourceHints.preconnect(url, options.crossorigin);
                break;
            case 'dns-prefetch':
                resourceHints.dnsPrefetch(url);
                break;
            case 'preload':
                resourceHints.preload(url, options.as, options);
                break;
            case 'prefetch':
                resourceHints.prefetch(url, options);
                break;
            case 'modulepreload':
                resourceHints.modulepreload(url, options);
                break;
            default:
                console.warn(`Unknown resource hint type: ${type}`);
        }
    }, [type, url, options]);
};

/**
 * Prefetch on hover hook
 */
export const usePrefetchOnHover = (url) => {
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (!ref.current) return;
        return resourceHints.prefetchOnHover(ref.current, url);
    }, [url]);

    return ref;
};

export default ResourceHintsManager;



// frontend/src/utils/networkQualityDetector.js

/**
 * 🌐 Network Quality Detector
 * Adaptive features based on connection quality
 */

class NetworkQualityDetector {
    constructor(options = {}) {
        this.onQualityChange = options.onQualityChange || (() => { });
        this.checkInterval = options.checkInterval || 30000; // 30 seconds

        this.quality = 'unknown';
        this.isOnline = navigator.onLine;
        this.connection = null;
        this.intervalId = null;
        this.metrics = {
            rtt: 0,
            downlink: 0,
            effectiveType: 'unknown',
            saveData: false
        };

        this.init();
    }

    /**
     * Initialize
     */
    init() {
        // Network Information API
        this.connection = navigator.connection ||
            navigator.mozConnection ||
            navigator.webkitConnection;

        if (this.connection) {
            this.updateFromConnection();
            this.connection.addEventListener('change', () => {
                this.updateFromConnection();
            });
        }

        // Online/offline events
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.detectQuality();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.quality = 'offline';
            this.onQualityChange(this.quality, this.metrics);
        });

        // Initial detection
        this.detectQuality();

        // Periodic checks
        this.startPeriodicChecks();
    }

    /**
     * Update from connection API
     */
    updateFromConnection() {
        if (!this.connection) return;

        this.metrics = {
            rtt: this.connection.rtt || 0,
            downlink: this.connection.downlink || 0,
            effectiveType: this.connection.effectiveType || 'unknown',
            saveData: this.connection.saveData || false
        };

        this.detectQuality();
    }

    /**
     * Detect quality
     */
    detectQuality() {
        if (!this.isOnline) {
            this.quality = 'offline';
        } else if (this.metrics.saveData) {
            this.quality = 'low';
        } else if (this.connection) {
            // Use Network Information API
            const effectiveType = this.metrics.effectiveType;

            switch (effectiveType) {
                case '4g':
                    this.quality = 'high';
                    break;
                case '3g':
                    this.quality = 'medium';
                    break;
                case '2g':
                case 'slow-2g':
                    this.quality = 'low';
                    break;
                default:
                    this.quality = 'medium';
            }
        } else {
            // Fallback: use performance timing
            this.quality = this.detectFromTiming();
        }

        if (import.meta.env.MODE === 'development') {
            console.log(`🌐 [NetworkQuality] Detected: ${this.quality}`, this.metrics);
        }

        this.onQualityChange(this.quality, this.metrics);
    }

    /**
     * Detect from performance timing
     */
    detectFromTiming() {
        if (!window.performance || !performance.timing) {
            return 'medium';
        }

        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;

        if (loadTime < 1000) return 'high';
        if (loadTime < 3000) return 'medium';
        return 'low';
    }

    /**
     * Measure actual speed
     */
    async measureSpeed() {
        const startTime = Date.now();
        const imageUrl = '/test-image.jpg?t=' + startTime;
        const imageSize = 100 * 1024; // 100KB

        try {
            await fetch(imageUrl, { cache: 'no-store' });
            const duration = (Date.now() - startTime) / 1000; // seconds
            const speedMbps = (imageSize * 8) / (duration * 1024 * 1024);

            if (speedMbps > 5) return 'high';
            if (speedMbps > 1) return 'medium';
            return 'low';
        } catch (error) {
            return 'low';
        }
    }

    /**
     * Start periodic quality checks
     */
    startPeriodicChecks() {
        this.intervalId = setInterval(() => {
            this.detectQuality();
        }, this.checkInterval);
    }

    /**
     * Stop periodic checks
     */
    stopPeriodicChecks() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    /**
     * Get current quality
     */
    getQuality() {
        return this.quality;
    }

    /**
     * Get metrics
     */
    getMetrics() {
        return { ...this.metrics };
    }

    /**
     * Is online
     */
    isConnectionOnline() {
        return this.isOnline;
    }

    /**
     * Is high quality
     */
    isHighQuality() {
        return this.quality === 'high';
    }

    /**
     * Is low quality
     */
    isLowQuality() {
        return this.quality === 'low' || this.quality === 'offline';
    }

    /**
     * Should reduce data
     */
    shouldReduceData() {
        return this.metrics.saveData || this.isLowQuality();
    }

    /**
     * Get adaptive config
     */
    getAdaptiveConfig() {
        const configs = {
            offline: {
                enableImages: false,
                enableVideos: false,
                enableAnimations: false,
                enableAutoplay: false,
                imageQuality: 'none',
                videoQuality: 'none',
                prefetch: false,
                lazyLoad: true
            },
            low: {
                enableImages: true,
                enableVideos: false,
                enableAnimations: false,
                enableAutoplay: false,
                imageQuality: 'low',
                videoQuality: '360p',
                prefetch: false,
                lazyLoad: true
            },
            medium: {
                enableImages: true,
                enableVideos: true,
                enableAnimations: true,
                enableAutoplay: false,
                imageQuality: 'medium',
                videoQuality: '720p',
                prefetch: true,
                lazyLoad: true
            },
            high: {
                enableImages: true,
                enableVideos: true,
                enableAnimations: true,
                enableAutoplay: true,
                imageQuality: 'high',
                videoQuality: '1080p',
                prefetch: true,
                lazyLoad: false
            },
            unknown: {
                enableImages: true,
                enableVideos: true,
                enableAnimations: true,
                enableAutoplay: false,
                imageQuality: 'medium',
                videoQuality: '720p',
                prefetch: false,
                lazyLoad: true
            }
        };

        return configs[this.quality] || configs.unknown;
    }

    /**
     * Destroy
     */
    destroy() {
        this.stopPeriodicChecks();

        if (this.connection) {
            this.connection.removeEventListener('change', this.updateFromConnection);
        }
    }
}

// Global instance
export const networkQuality = new NetworkQualityDetector({
    checkInterval: 30000,
    onQualityChange: (quality, metrics) => {
        if (import.meta.env.MODE === 'development') {
            console.log(`🌐 [NetworkQuality] Changed to: ${quality}`, metrics);
        }
    }
});

/**
 * React Hook
 */
export const useNetworkQuality = () => {
    const [quality, setQuality] = React.useState(networkQuality.getQuality());
    const [metrics, setMetrics] = React.useState(networkQuality.getMetrics());
    const [isOnline, setIsOnline] = React.useState(navigator.onLine);

    React.useEffect(() => {
        const detector = new NetworkQualityDetector({
            onQualityChange: (newQuality, newMetrics) => {
                setQuality(newQuality);
                setMetrics(newMetrics);
            }
        });

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            detector.destroy();
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const config = networkQuality.getAdaptiveConfig();

    return {
        quality,
        metrics,
        isOnline,
        isHighQuality: quality === 'high',
        isLowQuality: quality === 'low' || quality === 'offline',
        shouldReduceData: networkQuality.shouldReduceData(),
        config
    };
};

/**
 * Adaptive Image Component Helper
 */
export const getAdaptiveImageUrl = (baseUrl, quality) => {
    const qualities = {
        low: '_low',
        medium: '_medium',
        high: ''
    };

    const suffix = qualities[quality] || qualities.medium;
    return baseUrl.replace(/(\.[^.]+)$/, `${suffix}$1`);
};

/**
 * Adaptive Video Quality Helper
 */
export const getAdaptiveVideoQuality = (quality) => {
    const qualities = {
        low: '360p',
        medium: '720p',
        high: '1080p'
    };

    return qualities[quality] || '720p';
};

export default NetworkQualityDetector;



// frontend/src/utils/deviceDetection.js

/**
 * 📱 Device Detection Utility
 * Browser, OS, device type detection
 */

class DeviceDetector {
    constructor() {
        this.userAgent = navigator.userAgent;
        this.vendor = navigator.vendor;
        this.platform = navigator.platform;
    }

    /**
     * Device type detection
     */
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.userAgent);
    }

    isTablet() {
        return /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(this.userAgent);
    }

    isDesktop() {
        return !this.isMobile() && !this.isTablet();
    }

    /**
     * OS detection
     */
    getOS() {
        if (/Windows NT/i.test(this.userAgent)) return 'Windows';
        if (/Mac OS X/i.test(this.userAgent)) return 'MacOS';
        if (/Linux/i.test(this.userAgent)) return 'Linux';
        if (/Android/i.test(this.userAgent)) return 'Android';
        if (/iOS|iPhone|iPad|iPod/i.test(this.userAgent)) return 'iOS';
        return 'Unknown';
    }

    /**
     * Browser detection
     */
    getBrowser() {
        if (/Edge\//i.test(this.userAgent)) return 'Edge';
        if (/Chrome/i.test(this.userAgent) && /Google Inc/i.test(this.vendor)) return 'Chrome';
        if (/Safari/i.test(this.userAgent) && /Apple/i.test(this.vendor)) return 'Safari';
        if (/Firefox/i.test(this.userAgent)) return 'Firefox';
        if (/MSIE|Trident/i.test(this.userAgent)) return 'IE';
        if (/Opera|OPR/i.test(this.userAgent)) return 'Opera';
        return 'Unknown';
    }

    /**
     * Browser version
     */
    getBrowserVersion() {
        const match = this.userAgent.match(/(chrome|safari|firefox|opera|edge|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        return match[2] || 'Unknown';
    }

    /**
     * Touch support
     */
    hasTouch() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    /**
     * Screen info
     */
    getScreenInfo() {
        return {
            width: window.screen.width,
            height: window.screen.height,
            availWidth: window.screen.availWidth,
            availHeight: window.screen.availHeight,
            colorDepth: window.screen.colorDepth,
            pixelRatio: window.devicePixelRatio || 1,
            orientation: window.screen.orientation?.type || 'unknown'
        };
    }

    /**
     * Viewport size
     */
    getViewportSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    /**
     * Connection info
     */
    getConnectionInfo() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

        if (!connection) {
            return { supported: false };
        }

        return {
            supported: true,
            effectiveType: connection.effectiveType,
            downlink: connection.downlink,
            rtt: connection.rtt,
            saveData: connection.saveData
        };
    }

    /**
     * Battery status
     */
    async getBatteryInfo() {
        if (!('getBattery' in navigator)) {
            return { supported: false };
        }

        try {
            const battery = await navigator.getBattery();
            return {
                supported: true,
                charging: battery.charging,
                level: battery.level,
                chargingTime: battery.chargingTime,
                dischargingTime: battery.dischargingTime
            };
        } catch (error) {
            return { supported: false, error: error.message };
        }
    }

    /**
     * Memory info
     */
    getMemoryInfo() {
        if (!performance.memory) {
            return { supported: false };
        }

        return {
            supported: true,
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            usedJSHeapSize: performance.memory.usedJSHeapSize,
            usedPercentage: (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100
        };
    }

    /**
     * Hardware concurrency
     */
    getCPUCores() {
        return navigator.hardwareConcurrency || 'Unknown';
    }

    /**
     * Complete device info
     */
    getDeviceInfo() {
        return {
            type: this.isMobile() ? 'mobile' : (this.isTablet() ? 'tablet' : 'desktop'),
            os: this.getOS(),
            browser: this.getBrowser(),
            browserVersion: this.getBrowserVersion(),
            hasTouch: this.hasTouch(),
            screen: this.getScreenInfo(),
            viewport: this.getViewportSize(),
            connection: this.getConnectionInfo(),
            memory: this.getMemoryInfo(),
            cpuCores: this.getCPUCores(),
            userAgent: this.userAgent
        };
    }

    /**
     * Is low-end device
     */
    isLowEndDevice() {
        const memory = this.getMemoryInfo();
        const cores = this.getCPUCores();
        const connection = this.getConnectionInfo();

        // Düşük bellek
        if (memory.supported && memory.jsHeapSizeLimit < 1000000000) { // < 1GB
            return true;
        }

        // Az CPU core
        if (cores !== 'Unknown' && cores < 4) {
            return true;
        }

        // Yavaş bağlantı
        if (connection.supported && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
            return true;
        }

        return false;
    }

    /**
     * Performance tier (low, medium, high)
     */
    getPerformanceTier() {
        const cores = this.getCPUCores();
        const memory = this.getMemoryInfo();
        const pixelRatio = window.devicePixelRatio || 1;

        let score = 0;

        // CPU cores
        if (cores >= 8) score += 3;
        else if (cores >= 4) score += 2;
        else score += 1;

        // Memory
        if (memory.supported) {
            const memoryGB = memory.jsHeapSizeLimit / 1024 / 1024 / 1024;
            if (memoryGB >= 4) score += 3;
            else if (memoryGB >= 2) score += 2;
            else score += 1;
        }

        // Screen
        if (pixelRatio >= 2) score += 1;

        // Tier
        if (score >= 6) return 'high';
        if (score >= 4) return 'medium';
        return 'low';
    }
}

// Global instance
export const deviceDetector = new DeviceDetector();

/**
 * Helper functions
 */
export const isMobile = () => deviceDetector.isMobile();
export const isTablet = () => deviceDetector.isTablet();
export const isDesktop = () => deviceDetector.isDesktop();
export const getOS = () => deviceDetector.getOS();
export const getBrowser = () => deviceDetector.getBrowser();
export const hasTouch = () => deviceDetector.hasTouch();
export const isLowEndDevice = () => deviceDetector.isLowEndDevice();
export const getPerformanceTier = () => deviceDetector.getPerformanceTier();

/**
 * React Hook
 */
export const useDeviceDetection = () => {
    const [deviceInfo, setDeviceInfo] = React.useState(null);

    React.useEffect(() => {
        const info = deviceDetector.getDeviceInfo();
        setDeviceInfo(info);

        // Battery info async
        deviceDetector.getBatteryInfo().then(battery => {
            setDeviceInfo(prev => ({ ...prev, battery }));
        });
    }, []);

    return deviceInfo;
};

export default DeviceDetector;



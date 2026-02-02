// frontend/src/utils/featureFlags.js

/**
 * 🚩 Feature Flags Manager
 * A/B testing, gradual rollouts, and feature toggles
 */

class FeatureFlagsManager {
    constructor(options = {}) {
        this.flags = new Map();
        this.userId = options.userId || this.generateUserId();
        this.environment = options.environment || import.meta.env.MODE || 'development';
        this.storageKey = options.storageKey || 'feature-flags';
        this.remoteEndpoint = options.remoteEndpoint || '/api/feature-flags';
        this.refreshInterval = options.refreshInterval || 5 * 60 * 1000; // 5 minutes

        this.listeners = new Map();
        this.refreshTimer = null;

        this.init();
    }

    /**
     * Initialize
     */
    async init() {
        // Load cached flags
        this.loadFromCache();

        // Fetch remote flags
        await this.fetchRemoteFlags();

        // Auto refresh
        if (this.refreshInterval > 0) {
            this.startAutoRefresh();
        }

        if (import.meta.env.MODE === 'development') {
            console.log('🚩 [FeatureFlags] Initialized');
        }
    }

    /**
     * Generate user ID
     */
    generateUserId() {
        let userId = localStorage.getItem('user-id');

        if (!userId) {
            userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('user-id', userId);
        }

        return userId;
    }

    /**
     * Register flag
     */
    register(key, options = {}) {
        const {
            defaultValue = false,
            description = '',
            rolloutPercentage = 100,
            environments = ['development', 'production'],
            userIds = [],
            variations = null
        } = options;

        this.flags.set(key, {
            key,
            defaultValue,
            description,
            rolloutPercentage,
            environments,
            userIds,
            variations,
            enabled: this.calculateEnabled(key, options)
        });

        if (import.meta.env.MODE === 'development') {
            console.log(`✅ [FeatureFlags] Registered: ${key} = ${this.flags.get(key).enabled}`);
        }
    }

    /**
     * Calculate if flag is enabled
     */
    calculateEnabled(key, options) {
        const { defaultValue, rolloutPercentage, environments, userIds, variations } = options;

        // Check environment
        if (!environments.includes(this.environment)) {
            return defaultValue;
        }

        // Check specific user IDs
        if (userIds.length > 0 && !userIds.includes(this.userId)) {
            return defaultValue;
        }

        // Check rollout percentage (consistent hashing)
        const hash = this.hashString(`${key}-${this.userId}`);
        const percentage = (hash % 100) + 1;

        if (percentage > rolloutPercentage) {
            return defaultValue;
        }

        // Variations (A/B testing)
        if (variations) {
            const variationIndex = hash % variations.length;
            return variations[variationIndex];
        }

        return true;
    }

    /**
     * Hash string to number
     */
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    /**
     * Check if flag is enabled
     */
    isEnabled(key, defaultValue = false) {
        if (!this.flags.has(key)) {
            return defaultValue;
        }

        return this.flags.get(key).enabled;
    }

    /**
     * Get flag value
     */
    getValue(key, defaultValue = null) {
        if (!this.flags.has(key)) {
            return defaultValue;
        }

        const flag = this.flags.get(key);
        return flag.enabled || defaultValue;
    }

    /**
     * Get variation (for A/B testing)
     */
    getVariation(key) {
        if (!this.flags.has(key)) {
            return null;
        }

        return this.flags.get(key).enabled;
    }

    /**
     * Override flag (for testing)
     */
    override(key, value) {
        if (!this.flags.has(key)) {
            console.warn(`Flag not found: ${key}`);
            return;
        }

        const flag = this.flags.get(key);
        flag.enabled = value;
        flag.overridden = true;

        this.emit('flagChange', { key, value });

        if (import.meta.env.MODE === 'development') {
            console.log(`🚩 [FeatureFlags] Override: ${key} = ${value}`);
        }
    }

    /**
     * Clear override
     */
    clearOverride(key) {
        if (!this.flags.has(key)) {
            return;
        }

        const flag = this.flags.get(key);
        flag.enabled = this.calculateEnabled(key, flag);
        flag.overridden = false;

        this.emit('flagChange', { key, value: flag.enabled });
    }

    /**
     * Fetch remote flags
     */
    async fetchRemoteFlags() {
        try {
            const response = await fetch(`${this.remoteEndpoint}?userId=${this.userId}`);
            const remoteFlags = await response.json();

            Object.keys(remoteFlags).forEach(key => {
                if (this.flags.has(key)) {
                    const flag = this.flags.get(key);
                    flag.enabled = remoteFlags[key];
                    flag.fromRemote = true;
                } else {
                    this.register(key, { defaultValue: remoteFlags[key] });
                }
            });

            this.saveToCache();

            if (import.meta.env.MODE === 'development') {
                console.log('🚩 [FeatureFlags] Fetched remote flags');
            }
        } catch (error) {
            console.error('Failed to fetch feature flags:', error);
        }
    }

    /**
     * Save to cache
     */
    saveToCache() {
        try {
            const flagsObj = {};
            this.flags.forEach((flag, key) => {
                flagsObj[key] = flag.enabled;
            });

            localStorage.setItem(this.storageKey, JSON.stringify(flagsObj));
        } catch (error) {
            console.error('Failed to save flags to cache:', error);
        }
    }

    /**
     * Load from cache
     */
    loadFromCache() {
        try {
            const cached = localStorage.getItem(this.storageKey);

            if (cached) {
                const flagsObj = JSON.parse(cached);

                Object.keys(flagsObj).forEach(key => {
                    if (!this.flags.has(key)) {
                        this.register(key, { defaultValue: flagsObj[key] });
                    }
                });
            }
        } catch (error) {
            console.error('Failed to load flags from cache:', error);
        }
    }

    /**
     * Start auto refresh
     */
    startAutoRefresh() {
        this.refreshTimer = setInterval(() => {
            this.fetchRemoteFlags();
        }, this.refreshInterval);
    }

    /**
     * Stop auto refresh
     */
    stopAutoRefresh() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
    }

    /**
     * Get all flags
     */
    getAllFlags() {
        const flags = {};
        this.flags.forEach((flag, key) => {
            flags[key] = flag.enabled;
        });
        return flags;
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
}

// Global instance
export const featureFlags = new FeatureFlagsManager();

// Example flags
featureFlags.register('new-ui', {
    description: 'Enable new UI design',
    rolloutPercentage: 50,
    defaultValue: false
});

featureFlags.register('dark-mode', {
    description: 'Enable dark mode',
    rolloutPercentage: 100,
    defaultValue: true
});

featureFlags.register('ai-chat', {
    description: 'Enable AI chatbot',
    rolloutPercentage: 25,
    defaultValue: false
});

/**
 * React Hook - Feature Flag
 */
export const useFeatureFlag = (key, defaultValue = false) => {
    const [enabled, setEnabled] = React.useState(() => {
        return featureFlags.isEnabled(key, defaultValue);
    });

    React.useEffect(() => {
        const handleFlagChange = (data) => {
            if (data.key === key) {
                setEnabled(data.value);
            }
        };

        featureFlags.on('flagChange', handleFlagChange);

        return () => {
            featureFlags.off('flagChange', handleFlagChange);
        };
    }, [key]);

    return enabled;
};

/**
 * React Component - Feature Gate
 */
export const FeatureGate = ({ flag, fallback = null, children }) => {
    const enabled = useFeatureFlag(flag);

    if (!enabled) {
        return fallback;
    }

    return children;
};

export default FeatureFlagsManager;



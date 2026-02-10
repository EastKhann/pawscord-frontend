// frontend/src/utils/statePersistence.js

/**
 * 💾 State Persistence Manager
 * LocalStorage, SessionStorage, IndexedDB with encryption
 */

class StatePersistenceManager {
    constructor(options = {}) {
        this.prefix = options.prefix || 'app_';
        this.storage = options.storage || 'localStorage';
        this.encrypt = options.encrypt || false;
        this.ttl = options.ttl || null; // Time to live in ms
        this.version = options.version || '1.0';

        this.db = null;
        this.initIndexedDB();
    }

    /**
     * Initialize IndexedDB
     */
    async initIndexedDB() {
        if (!('indexedDB' in window)) return;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(`${this.prefix}database`, 1);

            request.onerror = () => reject(request.error);

            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                if (!db.objectStoreNames.contains('state')) {
                    db.createObjectStore('state', { keyPath: 'key' });
                }
            };
        });
    }

    /**
     * Set item
     */
    set(key, value, options = {}) {
        const {
            ttl = this.ttl,
            storage = this.storage,
            encrypt = this.encrypt
        } = options;

        const data = {
            value,
            timestamp: Date.now(),
            ttl,
            version: this.version
        };

        const serialized = JSON.stringify(encrypt ? this.encryptData(data) : data);
        const fullKey = this.prefix + key;

        try {
            if (storage === 'localStorage') {
                localStorage.setItem(fullKey, serialized);
            } else if (storage === 'sessionStorage') {
                sessionStorage.setItem(fullKey, serialized);
            }

            if (import.meta.env.MODE === 'development') {
            }

            return true;
        } catch (error) {
            console.error('Storage quota exceeded:', error);
            this.cleanup(storage);
            return false;
        }
    }

    /**
     * Get item
     */
    get(key, options = {}) {
        const {
            storage = this.storage,
            encrypt = this.encrypt,
            defaultValue = null
        } = options;

        const fullKey = this.prefix + key;

        try {
            let serialized;

            if (storage === 'localStorage') {
                serialized = localStorage.getItem(fullKey);
            } else if (storage === 'sessionStorage') {
                serialized = sessionStorage.getItem(fullKey);
            }

            if (!serialized) return defaultValue;

            const data = JSON.parse(serialized);
            const decrypted = encrypt ? this.decryptData(data) : data;

            // Check TTL
            if (decrypted.ttl && Date.now() - decrypted.timestamp > decrypted.ttl) {
                this.remove(key, { storage });
                return defaultValue;
            }

            // Check version
            if (decrypted.version !== this.version) {
                this.remove(key, { storage });
                return defaultValue;
            }

            return decrypted.value;
        } catch (error) {
            console.error('Failed to get item:', error);
            return defaultValue;
        }
    }

    /**
     * Remove item
     */
    remove(key, options = {}) {
        const { storage = this.storage } = options;
        const fullKey = this.prefix + key;

        if (storage === 'localStorage') {
            localStorage.removeItem(fullKey);
        } else if (storage === 'sessionStorage') {
            sessionStorage.removeItem(fullKey);
        }
    }

    /**
     * Clear all
     */
    clear(options = {}) {
        const { storage = this.storage } = options;

        if (storage === 'localStorage') {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
        } else if (storage === 'sessionStorage') {
            Object.keys(sessionStorage).forEach(key => {
                if (key.startsWith(this.prefix)) {
                    sessionStorage.removeItem(key);
                }
            });
        }
    }

    /**
     * Get all keys
     */
    keys(options = {}) {
        const { storage = this.storage } = options;
        const keys = [];

        if (storage === 'localStorage') {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith(this.prefix)) {
                    keys.push(key.replace(this.prefix, ''));
                }
            }
        } else if (storage === 'sessionStorage') {
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                if (key.startsWith(this.prefix)) {
                    keys.push(key.replace(this.prefix, ''));
                }
            }
        }

        return keys;
    }

    /**
     * Get storage size
     */
    getSize(options = {}) {
        const { storage = this.storage } = options;
        let size = 0;

        const storageObj = storage === 'localStorage' ? localStorage : sessionStorage;

        for (let key in storageObj) {
            if (storageObj.hasOwnProperty(key) && key.startsWith(this.prefix)) {
                size += storageObj[key].length + key.length;
            }
        }

        return size;
    }

    /**
     * Cleanup expired items
     */
    cleanup(storage = this.storage) {
        const keys = this.keys({ storage });

        keys.forEach(key => {
            const value = this.get(key, { storage });
            if (value === null) {
                // Already removed by TTL check
            }
        });
    }

    /**
     * IndexedDB set
     */
    async setDB(key, value, options = {}) {
        if (!this.db) await this.initIndexedDB();
        if (!this.db) throw new Error('IndexedDB not available');

        const { ttl = this.ttl } = options;

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['state'], 'readwrite');
            const store = transaction.objectStore('state');

            const data = {
                key,
                value,
                timestamp: Date.now(),
                ttl,
                version: this.version
            };

            const request = store.put(data);
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * IndexedDB get
     */
    async getDB(key, defaultValue = null) {
        if (!this.db) await this.initIndexedDB();
        if (!this.db) return defaultValue;

        return new Promise((resolve) => {
            const transaction = this.db.transaction(['state'], 'readonly');
            const store = transaction.objectStore('state');

            const request = store.get(key);

            request.onsuccess = () => {
                const data = request.result;

                if (!data) {
                    resolve(defaultValue);
                    return;
                }

                // Check TTL
                if (data.ttl && Date.now() - data.timestamp > data.ttl) {
                    this.removeDB(key);
                    resolve(defaultValue);
                    return;
                }

                // Check version
                if (data.version !== this.version) {
                    this.removeDB(key);
                    resolve(defaultValue);
                    return;
                }

                resolve(data.value);
            };

            request.onerror = () => resolve(defaultValue);
        });
    }

    /**
     * IndexedDB remove
     */
    async removeDB(key) {
        if (!this.db) return;

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['state'], 'readwrite');
            const store = transaction.objectStore('state');

            const request = store.delete(key);
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get obfuscation secret (device-unique, not hardcoded)
     */
    _getSecret() {
        // Use a combination of origin + user agent hash for device-unique key
        const raw = (window.location.origin || 'pawscord') + navigator.userAgent.slice(0, 32);
        let hash = 0;
        for (let i = 0; i < raw.length; i++) {
            hash = ((hash << 5) - hash) + raw.charCodeAt(i);
            hash |= 0;
        }
        return 'pws_' + Math.abs(hash).toString(36) + '_state';
    }

    /**
     * Simple encryption (XOR - obfuscation, not cryptographic security)
     */
    encryptData(data) {
        const secret = this._getSecret();
        const str = JSON.stringify(data);
        let encrypted = '';

        for (let i = 0; i < str.length; i++) {
            encrypted += String.fromCharCode(
                str.charCodeAt(i) ^ secret.charCodeAt(i % secret.length)
            );
        }

        return btoa(encrypted);
    }

    /**
     * Simple decryption
     */
    decryptData(encrypted) {
        const secret = this._getSecret();
        const decoded = atob(encrypted);
        let decrypted = '';

        for (let i = 0; i < decoded.length; i++) {
            decrypted += String.fromCharCode(
                decoded.charCodeAt(i) ^ secret.charCodeAt(i % secret.length)
            );
        }

        return JSON.parse(decrypted);
    }

    /**
     * Subscribe to changes (cross-tab)
     */
    subscribe(key, callback) {
        const fullKey = this.prefix + key;

        const handler = (e) => {
            if (e.key === fullKey && e.newValue !== e.oldValue) {
                try {
                    const newValue = e.newValue ? JSON.parse(e.newValue).value : null;
                    callback(newValue);
                } catch (error) {
                    console.error('Failed to parse storage event:', error);
                }
            }
        };

        window.addEventListener('storage', handler);

        return () => {
            window.removeEventListener('storage', handler);
        };
    }
}

// Global instance
export const statePersistence = new StatePersistenceManager({
    prefix: 'pawscord_',
    storage: 'localStorage',
    encrypt: false,
    ttl: 7 * 24 * 60 * 60 * 1000 // 7 days
});

/**
 * React Hook
 */
export const usePersistedState = (key, initialValue, options = {}) => {
    const [state, setState] = React.useState(() => {
        return statePersistence.get(key, { ...options, defaultValue: initialValue });
    });

    React.useEffect(() => {
        statePersistence.set(key, state, options);
    }, [key, state, options]);

    // Subscribe to cross-tab changes
    React.useEffect(() => {
        return statePersistence.subscribe(key, (newValue) => {
            setState(newValue);
        });
    }, [key]);

    return [state, setState];
};

/**
 * React Hook for IndexedDB
 */
export const usePersistedStateDB = (key, initialValue, options = {}) => {
    const [state, setState] = React.useState(initialValue);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        statePersistence.getDB(key, initialValue).then(value => {
            setState(value);
            setLoading(false);
        });
    }, [key, initialValue]);

    React.useEffect(() => {
        if (!loading) {
            statePersistence.setDB(key, state, options);
        }
    }, [key, state, loading, options]);

    return [state, setState, loading];
};

export default StatePersistenceManager;



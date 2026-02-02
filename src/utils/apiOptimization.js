// ⚡ API REQUEST OPTIMIZATION
// Enhanced fetch with caching, deduplication, and retry logic

class APICache {
    constructor(maxAge = 60000) { // Default 1 minute
        this.cache = new Map();
        this.maxAge = maxAge;
    }

    get(key) {
        const entry = this.cache.get(key);
        if (!entry) return null;

        // Check if expired
        if (Date.now() - entry.timestamp > this.maxAge) {
            this.cache.delete(key);
            return null;
        }

        return entry.data;
    }

    set(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
        });
    }

    clear() {
        this.cache.clear();
    }

    delete(key) {
        this.cache.delete(key);
    }

    has(key) {
        const entry = this.cache.get(key);
        if (!entry) return false;

        if (Date.now() - entry.timestamp > this.maxAge) {
            this.cache.delete(key);
            return false;
        }

        return true;
    }
}

class OptimizedAPI {
    constructor(baseURL = '', options = {}) {
        this.baseURL = baseURL;
        this.options = {
            cacheEnabled: true,
            cacheDuration: 60000, // 1 minute
            retryAttempts: 3,
            retryDelay: 1000,
            timeout: 30000,
            deduplication: true,
            ...options,
        };

        this.cache = new APICache(this.options.cacheDuration);
        this.pendingRequests = new Map();
    }

    async request(url, options = {}) {
        const fullURL = url.startsWith('http') ? url : `${this.baseURL}${url}`;
        const method = options.method || 'GET';
        const cacheKey = `${method}:${fullURL}:${JSON.stringify(options.body || '')}`;

        // Check cache for GET requests
        if (method === 'GET' && this.options.cacheEnabled) {
            const cached = this.cache.get(cacheKey);
            if (cached) {
                return Promise.resolve(cached);
            }
        }

        // Deduplicate identical in-flight requests
        if (this.options.deduplication && this.pendingRequests.has(cacheKey)) {
            return this.pendingRequests.get(cacheKey);
        }

        // Create request promise
        const requestPromise = this.executeRequest(fullURL, options, cacheKey);

        // Store pending request
        if (this.options.deduplication) {
            this.pendingRequests.set(cacheKey, requestPromise);
            requestPromise.finally(() => {
                this.pendingRequests.delete(cacheKey);
            });
        }

        return requestPromise;
    }

    async executeRequest(url, options, cacheKey, attempt = 1) {
        try {
            // Add timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.options.timeout);

            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            // Cache successful GET requests
            if (options.method === 'GET' && this.options.cacheEnabled) {
                this.cache.set(cacheKey, data);
            }

            return data;
        } catch (error) {
            // Retry logic
            if (attempt < this.options.retryAttempts && !error.name === 'AbortError') {
                console.warn(`⚠️ Request failed, retrying (${attempt}/${this.options.retryAttempts})...`);

                // Exponential backoff
                await new Promise(resolve =>
                    setTimeout(resolve, this.options.retryDelay * Math.pow(2, attempt - 1))
                );

                return this.executeRequest(url, options, cacheKey, attempt + 1);
            }

            throw error;
        }
    }

    get(url, options = {}) {
        return this.request(url, { ...options, method: 'GET' });
    }

    post(url, data, options = {}) {
        return this.request(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    put(url, data, options = {}) {
        return this.request(url, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    delete(url, options = {}) {
        return this.request(url, { ...options, method: 'DELETE' });
    }

    patch(url, data, options = {}) {
        return this.request(url, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    clearCache() {
        this.cache.clear();
    }

    invalidateCache(pattern) {
        // Invalidate cache entries matching pattern
        if (typeof pattern === 'string') {
            this.cache.delete(pattern);
        } else if (pattern instanceof RegExp) {
            for (const key of this.cache.cache.keys()) {
                if (pattern.test(key)) {
                    this.cache.delete(key);
                }
            }
        }
    }
}

// Global API instance
export const api = new OptimizedAPI('/api', {
    cacheEnabled: true,
    cacheDuration: 60000,
    retryAttempts: 3,
    deduplication: true,
});

// React hook for API calls with loading state
export function useOptimizedAPI() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const request = React.useCallback(async (fn) => {
        setLoading(true);
        setError(null);

        try {
            const result = await fn();
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { request, loading, error };
}

export default OptimizedAPI;

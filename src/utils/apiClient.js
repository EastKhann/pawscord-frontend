// frontend/src/utils/apiClient.js
import { API_BASE_URL } from '../config/api.config';

/**
 * 🌐 API Client Manager
 * Advanced API client with request deduplication, caching, and retry logic
 */

class APIClient {
    constructor(options = {}) {
        this.baseURL = options.baseURL || '';
        this.timeout = options.timeout || 30000;
        this.retryAttempts = options.retryAttempts || 3;
        this.retryDelay = options.retryDelay || 1000;
        this.headers = options.headers || {};

        this.cache = new Map();
        this.pendingRequests = new Map();
        this.interceptors = {
            request: [],
            response: [],
            error: []
        };

        this.cacheConfig = {
            maxAge: options.cacheMaxAge || 5 * 60 * 1000, // 5 minutes
            maxSize: options.cacheMaxSize || 100
        };
    }

    /**
     * Add request interceptor
     */
    addRequestInterceptor(interceptor) {
        this.interceptors.request.push(interceptor);
    }

    /**
     * Add response interceptor
     */
    addResponseInterceptor(interceptor) {
        this.interceptors.response.push(interceptor);
    }

    /**
     * Add error interceptor
     */
    addErrorInterceptor(interceptor) {
        this.interceptors.error.push(interceptor);
    }

    /**
     * Make request
     */
    async request(url, options = {}) {
        const {
            method = 'GET',
            headers = {},
            body,
            params,
            cache = true,
            deduplicate = true,
            retry = true,
            timeout = this.timeout,
            ...fetchOptions
        } = options;

        // Build URL
        const fullURL = this.buildURL(url, params);

        // Check cache
        if (cache && method === 'GET') {
            const cached = this.getFromCache(fullURL);
            if (cached) {
                if (import.meta.env.MODE === 'development') {
                    console.log('🎯 [API] Cache hit:', fullURL);
                }
                return cached;
            }
        }

        // Check for pending request (deduplication)
        if (deduplicate && method === 'GET') {
            const pending = this.pendingRequests.get(fullURL);
            if (pending) {
                if (import.meta.env.MODE === 'development') {
                    console.log('⏳ [API] Deduplicating:', fullURL);
                }
                return pending;
            }
        }

        // Apply request interceptors
        let requestConfig = {
            url: fullURL,
            method,
            headers: { ...this.headers, ...headers },
            body,
            ...fetchOptions
        };

        for (const interceptor of this.interceptors.request) {
            requestConfig = await interceptor(requestConfig);
        }

        // Make request with timeout and retry
        const promise = retry
            ? this.requestWithRetry(requestConfig, timeout)
            : this.executeRequest(requestConfig, timeout);

        // Store pending request
        if (deduplicate && method === 'GET') {
            this.pendingRequests.set(fullURL, promise);
        }

        try {
            let response = await promise;

            // Apply response interceptors
            for (const interceptor of this.interceptors.response) {
                response = await interceptor(response);
            }

            // Cache response
            if (cache && method === 'GET') {
                this.setCache(fullURL, response);
            }

            return response;
        } catch (error) {
            // Apply error interceptors
            let handledError = error;
            for (const interceptor of this.interceptors.error) {
                handledError = await interceptor(handledError);
            }

            throw handledError;
        } finally {
            // Remove pending request
            if (deduplicate && method === 'GET') {
                this.pendingRequests.delete(fullURL);
            }
        }
    }

    /**
     * Execute request with timeout
     */
    async executeRequest(config, timeout) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(config.url, {
                method: config.method,
                headers: config.headers,
                body: config.body ? JSON.stringify(config.body) : undefined,
                signal: controller.signal,
                ...config
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }

            throw error;
        }
    }

    /**
     * Request with retry
     */
    async requestWithRetry(config, timeout, attempt = 1) {
        try {
            return await this.executeRequest(config, timeout);
        } catch (error) {
            if (attempt >= this.retryAttempts) {
                throw error;
            }

            const delay = this.retryDelay * Math.pow(2, attempt - 1);

            if (import.meta.env.MODE === 'development') {
                console.log(`🔄 [API] Retrying ${config.url} (${attempt}/${this.retryAttempts}) in ${delay}ms`);
            }

            await new Promise(resolve => setTimeout(resolve, delay));
            return this.requestWithRetry(config, timeout, attempt + 1);
        }
    }

    /**
     * Build URL with params
     */
    buildURL(url, params) {
        const fullURL = url.startsWith('http') ? url : `${this.baseURL}${url}`;

        if (!params) return fullURL;

        const urlObj = new URL(fullURL);
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== null) {
                urlObj.searchParams.set(key, params[key]);
            }
        });

        return urlObj.toString();
    }

    /**
     * Get from cache
     */
    getFromCache(key) {
        const cached = this.cache.get(key);

        if (!cached) return null;

        if (Date.now() - cached.timestamp > this.cacheConfig.maxAge) {
            this.cache.delete(key);
            return null;
        }

        return cached.data;
    }

    /**
     * Set cache
     */
    setCache(key, data) {
        // Limit cache size
        if (this.cache.size >= this.cacheConfig.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }

        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    /**
     * Clear cache
     */
    clearCache(pattern) {
        if (!pattern) {
            this.cache.clear();
            return;
        }

        const regex = new RegExp(pattern);
        for (const [key] of this.cache) {
            if (regex.test(key)) {
                this.cache.delete(key);
            }
        }
    }

    /**
     * GET request
     */
    get(url, options = {}) {
        return this.request(url, { ...options, method: 'GET' });
    }

    /**
     * POST request
     */
    post(url, body, options = {}) {
        return this.request(url, { ...options, method: 'POST', body });
    }

    /**
     * PUT request
     */
    put(url, body, options = {}) {
        return this.request(url, { ...options, method: 'PUT', body });
    }

    /**
     * PATCH request
     */
    patch(url, body, options = {}) {
        return this.request(url, { ...options, method: 'PATCH', body });
    }

    /**
     * DELETE request
     */
    delete(url, options = {}) {
        return this.request(url, { ...options, method: 'DELETE' });
    }

    /**
     * Batch requests
     */
    async batch(requests, options = {}) {
        const { parallel = 3 } = options;
        const results = [];

        for (let i = 0; i < requests.length; i += parallel) {
            const batch = requests.slice(i, i + parallel);
            const promises = batch.map(req =>
                this.request(req.url, req.options).catch(err => ({ error: err }))
            );

            const batchResults = await Promise.all(promises);
            results.push(...batchResults);
        }

        return results;
    }
}

// Global instance - uses centralized config
export const apiClient = new APIClient({
    baseURL: API_BASE_URL,
    timeout: 30000,
    retryAttempts: 3,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add auth interceptor
apiClient.addRequestInterceptor(async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add error interceptor
apiClient.addErrorInterceptor(async (error) => {
    if (error.message.includes('401')) {
        // Handle unauthorized
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return error;
});

/**
 * React Hook - API Request
 */
export const useAPI = (url, options = {}) => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const { autoFetch = true, ...requestOptions } = options;

    const fetch = React.useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await apiClient.get(url, requestOptions);
            setData(result);
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [url, requestOptions]);

    React.useEffect(() => {
        if (autoFetch && url) {
            fetch();
        }
    }, [autoFetch, url, fetch]);

    const refetch = React.useCallback(() => {
        return fetch();
    }, [fetch]);

    return { data, loading, error, refetch };
};

/**
 * React Hook - API Mutation
 */
export const useMutation = (url, options = {}) => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const mutate = React.useCallback(async (body) => {
        setLoading(true);
        setError(null);

        try {
            const result = await apiClient.post(url, body, options);
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    return { mutate, loading, error };
};

export default APIClient;



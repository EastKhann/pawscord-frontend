// frontend/src/services/ApiService.ts
// Enterprise-grade API Service
// Centralized API layer with retry, caching, rate limiting, and error handling

import { API_URL_BASE_STRING } from '../utils/constants';
import toast from '../utils/toast';

/**
 * API Error class with detailed error information
 */
export class ApiError extends Error {
    status: number;
    code: string;
    data: unknown;
    timestamp: string;

    constructor(message: string, status: number, code: string, data: unknown = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.code = code;
        this.data = data;
        this.timestamp = new Date().toISOString();
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            code: this.code,
            data: this.data,
            timestamp: this.timestamp
        };
    }
}

/**
 * Request Queue for rate limiting
 */
class RequestQueue {
    queue: Array<{ fn: () => Promise<unknown>; resolve: (value: unknown) => void; reject: (reason?: unknown) => void }>;
    running: number;
    maxConcurrent: number;
    rateLimit: number;
    requestTimes: number[];

    constructor(maxConcurrent = 6, rateLimit = 100) {
        this.queue = [];
        this.running = 0;
        this.maxConcurrent = maxConcurrent;
        this.rateLimit = rateLimit; // requests per minute
        this.requestTimes = [];
    }

    async add(fn) {
        return new Promise((resolve, reject) => {
            this.queue.push({ fn, resolve, reject });
            this.process();
        });
    }

    async process() {
        if (this.running >= this.maxConcurrent || this.queue.length === 0) return;

        // Rate limiting check
        const now = Date.now();
        this.requestTimes = this.requestTimes.filter(t => now - t < 60000);
        if (this.requestTimes.length >= this.rateLimit) {
            setTimeout(() => this.process(), 1000);
            return;
        }

        const { fn, resolve, reject } = this.queue.shift();
        this.running++;
        this.requestTimes.push(now);

        try {
            const result = await fn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.running--;
            this.process();
        }
    }
}

/**
 * Smart Cache with TTL and size limits
 */
class SmartCache {
    constructor(options = {}) {
        this.cache = new Map();
        this.maxSize = options.maxSize || 200;
        this.defaultTTL = options.defaultTTL || 5 * 60 * 1000; // 5 minutes
        this.hits = 0;
        this.misses = 0;
    }

    generateKey(url, params) {
        const sortedParams = params ? JSON.stringify(Object.keys(params).sort().reduce((obj, key) => {
            obj[key] = params[key];
            return obj;
        }, {})) : '';
        return `${url}:${sortedParams}`;
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) {
            this.misses++;
            return null;
        }

        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            this.misses++;
            return null;
        }

        this.hits++;
        return item.data;
    }

    set(key, data, ttl = this.defaultTTL) {
        // Evict oldest if at capacity
        if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }

        this.cache.set(key, {
            data,
            expiry: Date.now() + ttl,
            timestamp: Date.now()
        });
    }

    invalidate(pattern) {
        if (typeof pattern === 'string') {
            for (const key of this.cache.keys()) {
                if (key.includes(pattern)) {
                    this.cache.delete(key);
                }
            }
        } else if (pattern instanceof RegExp) {
            for (const key of this.cache.keys()) {
                if (pattern.test(key)) {
                    this.cache.delete(key);
                }
            }
        }
    }

    clear() {
        this.cache.clear();
    }

    getStats() {
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
            hits: this.hits,
            misses: this.misses,
            hitRate: this.hits + this.misses > 0
                ? ((this.hits / (this.hits + this.misses)) * 100).toFixed(2) + '%'
                : '0%'
        };
    }
}

/**
 * Main API Service Class
 */
class ApiService {
    constructor() {
        this.baseURL = API_URL_BASE_STRING;
        this.cache = new SmartCache();
        this.queue = new RequestQueue();
        this.pendingRequests = new Map();
        this.interceptors = {
            request: [],
            response: [],
            error: []
        };

        // Default configuration
        this.config = {
            timeout: 30000,
            retryAttempts: 3,
            retryDelay: 1000,
            retryMultiplier: 2,
            cacheTTL: {
                short: 30 * 1000,      // 30 seconds
                medium: 5 * 60 * 1000,  // 5 minutes
                long: 30 * 60 * 1000    // 30 minutes
            }
        };

        // Setup default interceptors
        this.setupDefaultInterceptors();
    }

    setupDefaultInterceptors() {
        // Auth interceptor
        this.addRequestInterceptor((config) => {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers = {
                    ...config.headers,
                    'Authorization': `Bearer ${token}`
                };
            }
            return config;
        });

        // Error interceptor for auth errors
        this.addErrorInterceptor(async (error) => {
            if (error.status === 401) {
                // Try to refresh token
                const refreshed = await this.refreshToken();
                if (refreshed) {
                    // Retry original request
                    return this.request(error.originalConfig);
                }
            }
            throw error;
        });
    }

    addRequestInterceptor(fn) {
        this.interceptors.request.push(fn);
    }

    addResponseInterceptor(fn) {
        this.interceptors.response.push(fn);
    }

    addErrorInterceptor(fn) {
        this.interceptors.error.push(fn);
    }

    /**
     * Build full URL with query parameters
     */
    buildURL(endpoint, params) {
        const url = new URL(endpoint, this.baseURL);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, value);
                }
            });
        }
        return url.toString();
    }

    /**
     * Main request method
     */
    async request(endpoint, options = {}) {
        const {
            method = 'GET',
            headers = {},
            body,
            params,
            cache: useCache = method === 'GET',
            cacheTTL = this.config.cacheTTL.medium,
            retry = true,
            deduplicate = true,
            timeout = this.config.timeout,
            showError = true,
            ...fetchOptions
        } = options;

        const url = this.buildURL(endpoint, params);
        const cacheKey = this.cache.generateKey(url, params);

        // Check cache for GET requests
        if (useCache && method === 'GET') {
            const cached = this.cache.get(cacheKey);
            if (cached) {
                return { data: cached, fromCache: true };
            }
        }

        // Deduplicate identical GET requests
        if (deduplicate && method === 'GET') {
            const pending = this.pendingRequests.get(cacheKey);
            if (pending) {
                return pending;
            }
        }

        // Apply request interceptors
        let config = {
            url,
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: body ? JSON.stringify(body) : undefined,
            ...fetchOptions
        };

        for (const interceptor of this.interceptors.request) {
            config = await interceptor(config);
        }

        // Create request promise
        const requestPromise = this.executeRequest(config, {
            retry,
            timeout,
            showError,
            cacheKey,
            cacheTTL,
            useCache,
            method
        });

        // Track pending request for deduplication
        if (deduplicate && method === 'GET') {
            this.pendingRequests.set(cacheKey, requestPromise);
            requestPromise.finally(() => {
                this.pendingRequests.delete(cacheKey);
            });
        }

        return requestPromise;
    }

    /**
     * Execute request with retry logic
     */
    async executeRequest(config, options) {
        const { retry, timeout, showError, cacheKey, cacheTTL, useCache, method } = options;
        let lastError;

        for (let attempt = 0; attempt <= (retry ? this.config.retryAttempts : 0); attempt++) {
            try {
                // Add to queue for rate limiting
                const response = await this.queue.add(() =>
                    this.fetchWithTimeout(config.url, {
                        method: config.method,
                        headers: config.headers,
                        body: config.body
                    }, timeout)
                );

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new ApiError(
                        errorData.message || errorData.error || `HTTP Error ${response.status}`,
                        response.status,
                        errorData.code || 'HTTP_ERROR',
                        errorData
                    );
                }

                let data;
                const contentType = response.headers.get('content-type');
                if (contentType?.includes('application/json')) {
                    data = await response.json();
                } else {
                    data = await response.text();
                }

                // Apply response interceptors
                for (const interceptor of this.interceptors.response) {
                    data = await interceptor(data, response);
                }

                // Cache successful GET responses
                if (useCache && method === 'GET') {
                    this.cache.set(cacheKey, data, cacheTTL);
                }

                return { data, fromCache: false };

            } catch (error) {
                lastError = error;

                // Don't retry certain errors
                if (error.status === 401 || error.status === 403 || error.status === 404) {
                    break;
                }

                // Wait before retry with exponential backoff
                if (attempt < this.config.retryAttempts) {
                    const delay = this.config.retryDelay * Math.pow(this.config.retryMultiplier, attempt);
                    await this.sleep(delay);
                }
            }
        }

        // Apply error interceptors
        for (const interceptor of this.interceptors.error) {
            try {
                const result = await interceptor({ ...lastError, originalConfig: config });
                if (result) return result;
            } catch (e) {
                lastError = e;
            }
        }

        // Show error toast if enabled
        if (showError) {
            toast.error(lastError.message || 'Bir hata oluştu');
        }

        throw lastError;
    }

    /**
     * Fetch with timeout
     */
    async fetchWithTimeout(url, options, timeout) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            return response;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    /**
     * Refresh access token (uses httpOnly cookie)
     */
    async refreshToken() {
        try {
            const response = await fetch(`${this.baseURL}/api/auth/token/refresh/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({})
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access);
                return true;
            }
        } catch (e) {
            console.error('Token refresh failed:', e);
        }

        // Clear access token on failure
        localStorage.removeItem('access_token');
        return false;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // =====================
    // CONVENIENCE METHODS
    // =====================

    async get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }

    async post(endpoint, body, options = {}) {
        const result = await this.request(endpoint, { ...options, method: 'POST', body });
        // Invalidate related cache
        this.cache.invalidate(endpoint.split('/')[0]);
        return result;
    }

    async put(endpoint, body, options = {}) {
        const result = await this.request(endpoint, { ...options, method: 'PUT', body });
        this.cache.invalidate(endpoint.split('/')[0]);
        return result;
    }

    async patch(endpoint, body, options = {}) {
        const result = await this.request(endpoint, { ...options, method: 'PATCH', body });
        this.cache.invalidate(endpoint.split('/')[0]);
        return result;
    }

    async delete(endpoint, options = {}) {
        const result = await this.request(endpoint, { ...options, method: 'DELETE' });
        this.cache.invalidate(endpoint.split('/')[0]);
        return result;
    }

    // =====================
    // SPECIALIZED ENDPOINTS
    // =====================

    // User APIs
    users = {
        getProfile: (userId) => this.get(`/api/users/${userId}/`),
        updateProfile: (userId, data) => this.patch(`/api/users/${userId}/`, data),
        getSettings: () => this.get('/api/users/settings/'),
        updateSettings: (data) => this.patch('/api/users/settings/', data),
        getFriends: () => this.get('/api/friends/', { cacheTTL: this.config.cacheTTL.short }),
        sendFriendRequest: (userId) => this.post('/api/friends/send/', { user_id: userId }),
        getBlocked: () => this.get('/api/blocked-users/'),
        blockUser: (userId) => this.post('/api/blocked-users/', { user_id: userId }),
        unblockUser: (userId) => this.delete(`/api/blocked-users/${userId}/`)
    };

    // Server APIs
    servers = {
        list: () => this.get('/api/servers/', { cacheTTL: this.config.cacheTTL.short }),
        get: (serverId) => this.get(`/api/servers/${serverId}/`),
        create: (data) => this.post('/api/servers/', data),
        update: (serverId, data) => this.patch(`/api/servers/${serverId}/`, data),
        delete: (serverId) => this.delete(`/api/servers/${serverId}/`),
        getMembers: (serverId) => this.get(`/api/servers/${serverId}/members/`),
        getRoles: (serverId) => this.get(`/api/servers/${serverId}/roles/`),
        getBoostStats: (serverId) => this.get(`/api/servers/${serverId}/boost-stats/`)
    };

    // Room/Channel APIs
    rooms = {
        list: (serverId) => this.get(`/api/servers/${serverId}/rooms/`),
        get: (roomId) => this.get(`/api/rooms/${roomId}/`),
        create: (serverId, data) => this.post(`/api/servers/${serverId}/rooms/`, data),
        update: (roomId, data) => this.patch(`/api/rooms/${roomId}/`, data),
        delete: (roomId) => this.delete(`/api/rooms/${roomId}/`),
        getMessages: (roomId, params) => this.get(`/api/rooms/${roomId}/messages/`, {
            params,
            cacheTTL: this.config.cacheTTL.short
        })
    };

    // Message APIs
    messages = {
        send: (roomId, data) => this.post(`/api/rooms/${roomId}/messages/`, data),
        edit: (messageId, content) => this.patch(`/api/messages/${messageId}/`, { content }),
        delete: (messageId) => this.delete(`/api/messages/${messageId}/`),
        pin: (messageId) => this.post(`/api/messages/${messageId}/pin/`),
        unpin: (messageId) => this.post(`/api/messages/${messageId}/unpin/`),
        react: (messageId, emoji) => this.post(`/api/messages/${messageId}/react/`, { emoji }),
        search: (params) => this.get('/api/messages/search/', { params })
    };

    // Auth APIs
    auth = {
        login: (credentials) => this.post('/api/auth/login/', credentials, { showError: false }),
        register: (data) => this.post('/api/auth/register/', data),
        logout: () => this.post('/api/auth/logout/'),
        refreshToken: () => this.refreshToken(),
        verifyEmail: (token) => this.post('/api/auth/verify-email/', { token }),
        resetPassword: (email) => this.post('/api/auth/reset-password/', { email }),
        enable2FA: () => this.post('/api/auth/2fa/enable/'),
        verify2FA: (code) => this.post('/api/auth/2fa/verify/', { code })
    };

    // Moderation APIs
    moderation = {
        ban: (serverId, userId, reason) => this.post(`/api/servers/${serverId}/bans/`, { user_id: userId, reason }),
        unban: (serverId, banId) => this.delete(`/api/servers/${serverId}/bans/${banId}/`),
        kick: (serverId, userId, reason) => this.post(`/api/servers/${serverId}/kicks/`, { user_id: userId, reason }),
        warn: (serverId, userId, reason) => this.post(`/api/servers/${serverId}/warnings/`, { user_id: userId, reason }),
        getAuditLogs: (serverId, params) => this.get(`/api/servers/${serverId}/audit-logs/`, { params })
    };

    // Premium/Payment APIs
    premium = {
        getPlans: () => this.get('/api/premium/plans/', { cacheTTL: this.config.cacheTTL.long }),
        subscribe: (planId, paymentMethod) => this.post('/api/premium/subscribe/', { plan_id: planId, payment_method: paymentMethod }),
        cancelSubscription: () => this.post('/api/premium/cancel/'),
        getStatus: () => this.get('/api/premium/status/')
    };

    // Analytics APIs
    analytics = {
        getServerStats: (serverId) => this.get(`/api/servers/${serverId}/analytics/`),
        getUserActivity: () => this.get('/api/users/analytics/'),
        trackEvent: (event, data) => this.post('/api/analytics/events/', { event, data }, { showError: false })
    };

    // Utility methods
    getCacheStats() {
        return this.cache.getStats();
    }

    clearCache() {
        this.cache.clear();
    }

    invalidateCache(pattern) {
        this.cache.invalidate(pattern);
    }
}

// Export singleton instance
export const api = new ApiService();
export default api;

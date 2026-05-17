// frontend/src/services/ApiService.ts
// Enterprise-grade API Service
// Centralized API layer with retry, caching, rate limiting, and error handling

import { API_URL_BASE_STRING } from '../utils/constants';
import toast from '../utils/toast';
import logger from '../utils/logger';

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
            timestamp: this.timestamp,
        };
    }
}

interface QueueItem {
    fn: () => Promise<unknown>;
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
}

/**
 * Request Queue for rate limiting
 */
class RequestQueue {
    queue: QueueItem[];
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

    async add(fn: () => Promise<unknown>): Promise<unknown> {
        return new Promise((resolve, reject) => {
            this.queue.push({ fn, resolve, reject });
            this.process();
        });
    }

    async process() {
        if (this.running >= this.maxConcurrent || this.queue.length === 0) return;

        // Rate limiting check
        const now = Date.now();
        this.requestTimes = this.requestTimes.filter((t) => now - t < 60000);
        if (this.requestTimes.length >= this.rateLimit) {
            setTimeout(() => this.process(), 1000);
            return;
        }

        const { fn, resolve, reject } = this.queue.shift()!;
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

interface CacheItem {
    data: unknown;
    expiry: number;
    timestamp: number;
}

interface SmartCacheOptions {
    maxSize?: number;
    defaultTTL?: number;
}

/**
 * Smart Cache with TTL and size limits
 */
class SmartCache {
    cache: Map<string, CacheItem>;
    maxSize: number;
    defaultTTL: number;
    hits: number;
    misses: number;

    constructor(options: SmartCacheOptions = {}) {
        this.cache = new Map();
        this.maxSize = options.maxSize ?? 200;
        this.defaultTTL = options.defaultTTL ?? 5 * 60 * 1000; // 5 minutes
        this.hits = 0;
        this.misses = 0;
    }

    generateKey(url: string, params?: Record<string, unknown> | null): string {
        const sortedParams = params
            ? JSON.stringify(
                  Object.keys(params)
                      .sort()
                      .reduce<Record<string, unknown>>((obj, key) => {
                          obj[key] = params[key];
                          return obj;
                      }, {})
              )
            : '';
        return `${url}:${sortedParams}`;
    }

    get(key: string): unknown {
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

    set(key: string, data: unknown, ttl = this.defaultTTL) {
        // Evict oldest if at capacity
        if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value;
            if (oldestKey) this.cache.delete(oldestKey);
        }

        this.cache.set(key, {
            data,
            expiry: Date.now() + ttl,
            timestamp: Date.now(),
        });
    }

    invalidate(pattern: string | RegExp) {
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
            hitRate:
                this.hits + this.misses > 0
                    ? ((this.hits / (this.hits + this.misses)) * 100).toFixed(2) + '%'
                    : '0%',
        };
    }
}

interface RequestConfig {
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: string;
    [key: string]: unknown;
}

interface RequestOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: unknown;
    params?: Record<string, unknown> | null;
    cache?: boolean;
    cacheTTL?: number;
    retry?: boolean;
    deduplicate?: boolean;
    timeout?: number;
    showError?: boolean;
    [key: string]: unknown;
}

interface ExecuteOptions {
    retry: boolean;
    timeout: number;
    showError: boolean;
    cacheKey: string;
    cacheTTL: number;
    useCache: boolean;
    method: string;
}

interface ApiCacheTTL {
    short: number;
    medium: number;
    long: number;
}

interface ApiServiceConfig {
    timeout: number;
    retryAttempts: number;
    retryDelay: number;
    retryMultiplier: number;
    cacheTTL: ApiCacheTTL;
}

type Interceptor<T> = (arg: T) => T | Promise<T>;

/**
 * Main API Service Class
 */
class ApiService {
    baseURL: string;
    cache: SmartCache;
    queue: RequestQueue;
    pendingRequests: Map<string, Promise<{ data: unknown; fromCache: boolean }>>;
    interceptors: {
        request: Interceptor<RequestConfig>[];
        response: Array<(data: unknown, response: Response) => unknown | Promise<unknown>>;
        error: Array<(error: unknown) => unknown | Promise<unknown>>;
    };
    config: ApiServiceConfig;

    constructor() {
        this.baseURL = API_URL_BASE_STRING;
        this.cache = new SmartCache();
        this.queue = new RequestQueue();
        this.pendingRequests = new Map();
        this.interceptors = {
            request: [],
            response: [],
            error: [],
        };

        // Default configuration
        this.config = {
            timeout: 30000,
            retryAttempts: 3,
            retryDelay: 1000,
            retryMultiplier: 2,
            cacheTTL: {
                short: 30 * 1000, // 30 seconds
                medium: 5 * 60 * 1000, // 5 minutes
                long: 30 * 60 * 1000, // 30 minutes
            },
        };

        // Setup default interceptors
        this.setupDefaultInterceptors();
    }

    setupDefaultInterceptors() {
        // Auth interceptor
        this.addRequestInterceptor((config: RequestConfig) => {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                };
            }
            return config;
        });

        // Error interceptor for auth errors
        this.addErrorInterceptor(async (error: unknown) => {
            const apiError = error as ApiError & { originalConfig?: RequestConfig };
            if (apiError.status === 401) {
                // Try to refresh token
                const refreshed = await this.refreshToken();
                if (refreshed && apiError.originalConfig) {
                    // Retry original request
                    return this.request(apiError.originalConfig.url, apiError.originalConfig);
                }
            }
            throw error;
        });
    }

    addRequestInterceptor(fn: Interceptor<RequestConfig>) {
        this.interceptors.request.push(fn);
    }

    addResponseInterceptor(fn: (data: unknown, response: Response) => unknown | Promise<unknown>) {
        this.interceptors.response.push(fn);
    }

    addErrorInterceptor(fn: (error: unknown) => unknown | Promise<unknown>) {
        this.interceptors.error.push(fn);
    }

    /**
     * Build full URL with query parameters
     */
    buildURL(endpoint: string, params?: Record<string, unknown> | null): string {
        const url = new URL(endpoint, this.baseURL);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, String(value));
                }
            });
        }
        return url.toString();
    }

    /**
     * Main request method
     */
    async request(endpoint: string, options: RequestOptions = {}): Promise<{ data: unknown; fromCache: boolean }> {
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
        let config: RequestConfig = {
            url,
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
            ...fetchOptions,
        };

        for (const interceptor of this.interceptors.request) {
            config = await interceptor(config);
        }

        // Create request promise
        const requestPromise = this.executeRequest(config, {
            retry: retry as boolean,
            timeout: timeout as number,
            showError: showError as boolean,
            cacheKey,
            cacheTTL: cacheTTL as number,
            useCache: useCache as boolean,
            method,
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
    async executeRequest(config: RequestConfig, options: ExecuteOptions): Promise<{ data: unknown; fromCache: boolean }> {
        const { retry, timeout, showError, cacheKey, cacheTTL, useCache, method } = options;
        let lastError: unknown;

        for (let attempt = 0; attempt <= (retry ? this.config.retryAttempts : 0); attempt++) {
            try {
                // Add to queue for rate limiting
                const response = await this.queue.add(() =>
                    this.fetchWithTimeout(
                        config.url,
                        {
                            method: config.method,
                            headers: config.headers,
                            body: config.body,
                        },
                        timeout
                    )
                ) as Response;

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({})) as Record<string, unknown>;
                    throw new ApiError(
                        (errorData.message as string) || (errorData.error as string) || `HTTP Error ${response.status}`,
                        response.status,
                        (errorData.code as string) || 'HTTP_ERROR',
                        errorData
                    );
                }

                let data: unknown;
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
                const apiErr = error as ApiError;
                if (apiErr.status === 401 || apiErr.status === 403 || apiErr.status === 404) {
                    break;
                }

                // Wait before retry with exponential backoff
                if (attempt < this.config.retryAttempts) {
                    const delay =
                        this.config.retryDelay * Math.pow(this.config.retryMultiplier, attempt);
                    await this.sleep(delay);
                }
            }
        }

        // Apply error interceptors
        for (const interceptor of this.interceptors.error) {
            try {
                const result = await interceptor({ ...(lastError as object), originalConfig: config });
                if (result) return result as { data: unknown; fromCache: boolean };
            } catch (e) {
                lastError = e;
            }
        }

        // Show error toast if enabled
        if (showError) {
            const errMsg = lastError instanceof Error ? lastError.message : 'An error occurred';
            toast.error(errMsg);
        }

        throw lastError;
    }

    /**
     * Fetch with timeout
     */
    async fetchWithTimeout(url: string, options: RequestInit, timeout: number): Promise<Response> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
            });
            return response;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    /**
     * Refresh access token (uses httpOnly cookie)
     */
    async refreshToken(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseURL}/api/auth/token/refresh/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({}),
            });

            if (response.ok) {
                const data = await response.json() as { access: string };
                localStorage.setItem('access_token', data.access);
                return true;
            }
        } catch (e) {
            logger.error('Token refresh failed:', e);
        }

        // Clear access token on failure
        localStorage.removeItem('access_token');
        return false;
    }

    sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // =====================
    // CONVENIENCE METHODS
    // =====================

    async get(endpoint: string, options: RequestOptions = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }

    async post(endpoint: string, body?: unknown, options: RequestOptions = {}) {
        const result = await this.request(endpoint, { ...options, method: 'POST', body });
        // Invalidate related cache
        this.cache.invalidate(endpoint.split('/')[0]);
        return result;
    }

    async put(endpoint: string, body?: unknown, options: RequestOptions = {}) {
        const result = await this.request(endpoint, { ...options, method: 'PUT', body });
        this.cache.invalidate(endpoint.split('/')[0]);
        return result;
    }

    async patch(endpoint: string, body?: unknown, options: RequestOptions = {}) {
        const result = await this.request(endpoint, { ...options, method: 'PATCH', body });
        this.cache.invalidate(endpoint.split('/')[0]);
        return result;
    }

    async delete(endpoint: string, options: RequestOptions = {}) {
        const result = await this.request(endpoint, { ...options, method: 'DELETE' });
        this.cache.invalidate(endpoint.split('/')[0]);
        return result;
    }

    // =====================
    // SPECIALIZED ENDPOINTS
    // =====================

    // User APIs
    users = {
        getProfile: (userId: string | number) => this.get(`/api/users/${userId}/`),
        updateProfile: (userId: string | number, data: unknown) => this.patch(`/api/users/${userId}/`, data),
        getSettings: () => this.get('/api/users/settings/'),
        updateSettings: (data: unknown) => this.patch('/api/users/settings/', data),
        getFriends: () => this.get('/api/friends/list/', { cacheTTL: this.config.cacheTTL.short }),
        sendFriendRequest: (userId: string | number) => this.post('/api/friends/send/', { user_id: userId }),
        getBlocked: () => this.get('/api/blocks/list/'),
        blockUser: (userId: string | number) => this.post('/api/blocks/block/', { user_id: userId }),
        unblockUser: (userId: string | number) => this.post('/api/blocks/unblock/', { user_id: userId }),
    };

    // Server APIs
    servers = {
        list: () => this.get('/api/servers/', { cacheTTL: this.config.cacheTTL.short }),
        get: (serverId: string | number) => this.get(`/api/servers/${serverId}/`),
        create: (data: unknown) => this.post('/api/servers/', data),
        update: (serverId: string | number, data: unknown) => this.patch(`/api/servers/${serverId}/`, data),
        delete: (serverId: string | number) => this.delete(`/api/servers/${serverId}/`),
        getMembers: (serverId: string | number) => this.get(`/api/servers/${serverId}/members/`),
        getRoles: (serverId: string | number) => this.get(`/api/servers/${serverId}/roles/`),
        getBoostStats: (serverId: string | number) => this.get(`/api/servers/${serverId}/boost-stats/`),
    };

    // Room/Channel APIs
    rooms = {
        list: (serverId: string | number) => this.get(`/api/servers/${serverId}/rooms/`),
        get: (roomId: string | number) => this.get(`/api/rooms/${roomId}/`),
        create: (serverId: string | number, data: unknown) => this.post(`/api/servers/${serverId}/rooms/`, data),
        update: (roomId: string | number, data: unknown) => this.patch(`/api/rooms/${roomId}/`, data),
        delete: (roomId: string | number) => this.delete(`/api/rooms/${roomId}/`),
        getMessages: (roomId: string | number, params?: Record<string, unknown> | null) =>
            this.get(`/api/rooms/${roomId}/messages/`, {
                params,
                cacheTTL: this.config.cacheTTL.short,
            }),
    };

    // Message APIs
    messages = {
        send: (roomId: string | number, data: unknown) => this.post(`/api/rooms/${roomId}/messages/`, data),
        edit: (messageId: string | number, content: string) => this.patch(`/api/messages/${messageId}/edit/`, { content }),
        delete: (messageId: string | number) => this.delete(`/api/messages/${messageId}/delete/`),

        pin: (messageId: string | number) => this.post(`/api/messages/${messageId}/pin/`),
        unpin: (messageId: string | number) => this.post(`/api/messages/${messageId}/unpin/`),
        react: (messageId: string | number, emoji: string) => this.post(`/api/messages/${messageId}/react/`, { emoji }),
        search: (params: Record<string, unknown>) => this.get('/api/messages/search/', { params }),
    };

    // Auth APIs
    auth = {
        login: (credentials: unknown) => this.post('/api/auth/login/', credentials, { showError: false }),
        register: (data: unknown) => this.post('/api/auth/register/', data),
        logout: () => this.post('/api/auth/logout/'),
        refreshToken: () => this.refreshToken(),
        verifyEmail: (token: string) => this.post(`/api/auth/verify-email/${token}/`),
        resetPassword: (email: string) => this.post('/api/auth/request-password-reset/', { email }),
        enable2FA: () => this.post('/api/auth/2fa/enable/'),
        verify2FA: (code: string) => this.post('/api/auth/2fa/verify-login/', { code }),
    };

    // Moderation APIs
    moderation = {
        ban: (serverId: string | number, userId: string | number, reason?: string) =>
            this.post(`/api/servers/${serverId}/bans/`, { user_id: userId, reason }),
        unban: (serverId: string | number, banId: string | number) => this.delete(`/api/servers/${serverId}/bans/${banId}/`),
        kick: (serverId: string | number, userId: string | number, reason?: string) =>
            this.post(`/api/servers/${serverId}/kicks/`, { user_id: userId, reason }),
        warn: (serverId: string | number, userId: string | number, reason?: string) =>
            this.post(`/api/servers/${serverId}/warnings/`, { user_id: userId, reason }),
        getAuditLogs: (serverId: string | number, params?: Record<string, unknown>) =>
            this.get(`/api/servers/${serverId}/audit-logs/`, { params }),
    };

    // Premium/Payment APIs
    premium = {
        getPlans: () => this.get('/api/premium/plans/', { cacheTTL: this.config.cacheTTL.long }),
        subscribe: (planId: string | number, paymentMethod: string) =>
            this.post('/api/premium/subscribe/', {
                plan_id: planId,
                payment_method: paymentMethod,
            }),
        cancelSubscription: () => this.post('/api/premium/cancel/'),
        getStatus: () => this.get('/api/premium/status/'),
    };

    // Analytics APIs
    analytics = {
        getServerStats: (serverId: string | number) => this.get(`/api/servers/${serverId}/analytics/`),
        getUserActivity: () => this.get('/api/users/analytics/'),
        trackEvent: (event: string, data: unknown) =>
            this.post('/api/analytics/track/', { event, data }, { showError: false }),
    };

    // Utility methods
    getCacheStats() {
        return this.cache.getStats();
    }

    clearCache() {
        this.cache.clear();
    }

    invalidateCache(pattern: string | RegExp) {
        this.cache.invalidate(pattern);
    }
}

// Export singleton instance
export const api = new ApiService();
export default api;

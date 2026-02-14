var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
import { p as purify } from "./purify.es-BRhsgAzF.js";
import { v as API_URL_BASE_STRING, t as toast, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
const _ApiError = class _ApiError extends Error {
  constructor(message, status, code, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.data = data;
    this.timestamp = (/* @__PURE__ */ new Date()).toISOString();
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
};
__name(_ApiError, "ApiError");
let ApiError = _ApiError;
const _RequestQueue = class _RequestQueue {
  constructor(maxConcurrent = 6, rateLimit = 100) {
    this.queue = [];
    this.running = 0;
    this.maxConcurrent = maxConcurrent;
    this.rateLimit = rateLimit;
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
    const now = Date.now();
    this.requestTimes = this.requestTimes.filter((t) => now - t < 6e4);
    if (this.requestTimes.length >= this.rateLimit) {
      setTimeout(() => this.process(), 1e3);
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
};
__name(_RequestQueue, "RequestQueue");
let RequestQueue = _RequestQueue;
const _SmartCache = class _SmartCache {
  constructor(options = {}) {
    this.cache = /* @__PURE__ */ new Map();
    this.maxSize = options.maxSize || 200;
    this.defaultTTL = options.defaultTTL || 5 * 60 * 1e3;
    this.hits = 0;
    this.misses = 0;
  }
  generateKey(url, params) {
    const sortedParams = params ? JSON.stringify(Object.keys(params).sort().reduce((obj, key) => {
      obj[key] = params[key];
      return obj;
    }, {})) : "";
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
    if (typeof pattern === "string") {
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
      hitRate: this.hits + this.misses > 0 ? (this.hits / (this.hits + this.misses) * 100).toFixed(2) + "%" : "0%"
    };
  }
};
__name(_SmartCache, "SmartCache");
let SmartCache = _SmartCache;
const _ApiService = class _ApiService {
  constructor() {
    // =====================
    // SPECIALIZED ENDPOINTS
    // =====================
    // User APIs
    __publicField(this, "users", {
      getProfile: /* @__PURE__ */ __name((userId) => this.get(`/api/users/${userId}/`), "getProfile"),
      updateProfile: /* @__PURE__ */ __name((userId, data) => this.patch(`/api/users/${userId}/`, data), "updateProfile"),
      getSettings: /* @__PURE__ */ __name(() => this.get("/api/users/settings/"), "getSettings"),
      updateSettings: /* @__PURE__ */ __name((data) => this.patch("/api/users/settings/", data), "updateSettings"),
      getFriends: /* @__PURE__ */ __name(() => this.get("/api/friends/", { cacheTTL: this.config.cacheTTL.short }), "getFriends"),
      sendFriendRequest: /* @__PURE__ */ __name((userId) => this.post("/api/friends/send/", { user_id: userId }), "sendFriendRequest"),
      getBlocked: /* @__PURE__ */ __name(() => this.get("/api/blocked-users/"), "getBlocked"),
      blockUser: /* @__PURE__ */ __name((userId) => this.post("/api/blocked-users/", { user_id: userId }), "blockUser"),
      unblockUser: /* @__PURE__ */ __name((userId) => this.delete(`/api/blocked-users/${userId}/`), "unblockUser")
    });
    // Server APIs
    __publicField(this, "servers", {
      list: /* @__PURE__ */ __name(() => this.get("/api/servers/", { cacheTTL: this.config.cacheTTL.short }), "list"),
      get: /* @__PURE__ */ __name((serverId) => this.get(`/api/servers/${serverId}/`), "get"),
      create: /* @__PURE__ */ __name((data) => this.post("/api/servers/", data), "create"),
      update: /* @__PURE__ */ __name((serverId, data) => this.patch(`/api/servers/${serverId}/`, data), "update"),
      delete: /* @__PURE__ */ __name((serverId) => this.delete(`/api/servers/${serverId}/`), "delete"),
      getMembers: /* @__PURE__ */ __name((serverId) => this.get(`/api/servers/${serverId}/members/`), "getMembers"),
      getRoles: /* @__PURE__ */ __name((serverId) => this.get(`/api/servers/${serverId}/roles/`), "getRoles"),
      getBoostStats: /* @__PURE__ */ __name((serverId) => this.get(`/api/servers/${serverId}/boost-stats/`), "getBoostStats")
    });
    // Room/Channel APIs
    __publicField(this, "rooms", {
      list: /* @__PURE__ */ __name((serverId) => this.get(`/api/servers/${serverId}/rooms/`), "list"),
      get: /* @__PURE__ */ __name((roomId) => this.get(`/api/rooms/${roomId}/`), "get"),
      create: /* @__PURE__ */ __name((serverId, data) => this.post(`/api/servers/${serverId}/rooms/`, data), "create"),
      update: /* @__PURE__ */ __name((roomId, data) => this.patch(`/api/rooms/${roomId}/`, data), "update"),
      delete: /* @__PURE__ */ __name((roomId) => this.delete(`/api/rooms/${roomId}/`), "delete"),
      getMessages: /* @__PURE__ */ __name((roomId, params) => this.get(`/api/rooms/${roomId}/messages/`, {
        params,
        cacheTTL: this.config.cacheTTL.short
      }), "getMessages")
    });
    // Message APIs
    __publicField(this, "messages", {
      send: /* @__PURE__ */ __name((roomId, data) => this.post(`/api/rooms/${roomId}/messages/`, data), "send"),
      edit: /* @__PURE__ */ __name((messageId, content) => this.patch(`/api/messages/${messageId}/`, { content }), "edit"),
      delete: /* @__PURE__ */ __name((messageId) => this.delete(`/api/messages/${messageId}/`), "delete"),
      pin: /* @__PURE__ */ __name((messageId) => this.post(`/api/messages/${messageId}/pin/`), "pin"),
      unpin: /* @__PURE__ */ __name((messageId) => this.post(`/api/messages/${messageId}/unpin/`), "unpin"),
      react: /* @__PURE__ */ __name((messageId, emoji) => this.post(`/api/messages/${messageId}/react/`, { emoji }), "react"),
      search: /* @__PURE__ */ __name((params) => this.get("/api/messages/search/", { params }), "search")
    });
    // Auth APIs
    __publicField(this, "auth", {
      login: /* @__PURE__ */ __name((credentials) => this.post("/api/auth/login/", credentials, { showError: false }), "login"),
      register: /* @__PURE__ */ __name((data) => this.post("/api/auth/register/", data), "register"),
      logout: /* @__PURE__ */ __name(() => this.post("/api/auth/logout/"), "logout"),
      refreshToken: /* @__PURE__ */ __name(() => this.refreshToken(), "refreshToken"),
      verifyEmail: /* @__PURE__ */ __name((token) => this.post("/api/auth/verify-email/", { token }), "verifyEmail"),
      resetPassword: /* @__PURE__ */ __name((email) => this.post("/api/auth/reset-password/", { email }), "resetPassword"),
      enable2FA: /* @__PURE__ */ __name(() => this.post("/api/auth/2fa/enable/"), "enable2FA"),
      verify2FA: /* @__PURE__ */ __name((code) => this.post("/api/auth/2fa/verify/", { code }), "verify2FA")
    });
    // Moderation APIs
    __publicField(this, "moderation", {
      ban: /* @__PURE__ */ __name((serverId, userId, reason) => this.post(`/api/servers/${serverId}/bans/`, { user_id: userId, reason }), "ban"),
      unban: /* @__PURE__ */ __name((serverId, banId) => this.delete(`/api/servers/${serverId}/bans/${banId}/`), "unban"),
      kick: /* @__PURE__ */ __name((serverId, userId, reason) => this.post(`/api/servers/${serverId}/kicks/`, { user_id: userId, reason }), "kick"),
      warn: /* @__PURE__ */ __name((serverId, userId, reason) => this.post(`/api/servers/${serverId}/warnings/`, { user_id: userId, reason }), "warn"),
      getAuditLogs: /* @__PURE__ */ __name((serverId, params) => this.get(`/api/servers/${serverId}/audit-logs/`, { params }), "getAuditLogs")
    });
    // Premium/Payment APIs
    __publicField(this, "premium", {
      getPlans: /* @__PURE__ */ __name(() => this.get("/api/premium/plans/", { cacheTTL: this.config.cacheTTL.long }), "getPlans"),
      subscribe: /* @__PURE__ */ __name((planId, paymentMethod) => this.post("/api/premium/subscribe/", { plan_id: planId, payment_method: paymentMethod }), "subscribe"),
      cancelSubscription: /* @__PURE__ */ __name(() => this.post("/api/premium/cancel/"), "cancelSubscription"),
      getStatus: /* @__PURE__ */ __name(() => this.get("/api/premium/status/"), "getStatus")
    });
    // Analytics APIs
    __publicField(this, "analytics", {
      getServerStats: /* @__PURE__ */ __name((serverId) => this.get(`/api/servers/${serverId}/analytics/`), "getServerStats"),
      getUserActivity: /* @__PURE__ */ __name(() => this.get("/api/users/analytics/"), "getUserActivity"),
      trackEvent: /* @__PURE__ */ __name((event, data) => this.post("/api/analytics/events/", { event, data }, { showError: false }), "trackEvent")
    });
    this.baseURL = API_URL_BASE_STRING;
    this.cache = new SmartCache();
    this.queue = new RequestQueue();
    this.pendingRequests = /* @__PURE__ */ new Map();
    this.interceptors = {
      request: [],
      response: [],
      error: []
    };
    this.config = {
      timeout: 3e4,
      retryAttempts: 3,
      retryDelay: 1e3,
      retryMultiplier: 2,
      cacheTTL: {
        short: 30 * 1e3,
        // 30 seconds
        medium: 5 * 60 * 1e3,
        // 5 minutes
        long: 30 * 60 * 1e3
        // 30 minutes
      }
    };
    this.setupDefaultInterceptors();
  }
  setupDefaultInterceptors() {
    this.addRequestInterceptor((config) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers = {
          ...config.headers,
          "Authorization": `Bearer ${token}`
        };
      }
      return config;
    });
    this.addErrorInterceptor(async (error) => {
      if (error.status === 401) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
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
        if (value !== void 0 && value !== null) {
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
      method = "GET",
      headers = {},
      body,
      params,
      cache: useCache = method === "GET",
      cacheTTL = this.config.cacheTTL.medium,
      retry = true,
      deduplicate = true,
      timeout = this.config.timeout,
      showError = true,
      ...fetchOptions
    } = options;
    const url = this.buildURL(endpoint, params);
    const cacheKey = this.cache.generateKey(url, params);
    if (useCache && method === "GET") {
      const cached = this.cache.get(cacheKey);
      if (cached) {
        return { data: cached, fromCache: true };
      }
    }
    if (deduplicate && method === "GET") {
      const pending = this.pendingRequests.get(cacheKey);
      if (pending) {
        return pending;
      }
    }
    let config = {
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: body ? JSON.stringify(body) : void 0,
      ...fetchOptions
    };
    for (const interceptor of this.interceptors.request) {
      config = await interceptor(config);
    }
    const requestPromise = this.executeRequest(config, {
      retry,
      timeout,
      showError,
      cacheKey,
      cacheTTL,
      useCache,
      method
    });
    if (deduplicate && method === "GET") {
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
        const response = await this.queue.add(
          () => this.fetchWithTimeout(config.url, {
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
            errorData.code || "HTTP_ERROR",
            errorData
          );
        }
        let data;
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }
        for (const interceptor of this.interceptors.response) {
          data = await interceptor(data, response);
        }
        if (useCache && method === "GET") {
          this.cache.set(cacheKey, data, cacheTTL);
        }
        return { data, fromCache: false };
      } catch (error) {
        lastError = error;
        if (error.status === 401 || error.status === 403 || error.status === 404) {
          break;
        }
        if (attempt < this.config.retryAttempts) {
          const delay = this.config.retryDelay * Math.pow(this.config.retryMultiplier, attempt);
          await this.sleep(delay);
        }
      }
    }
    for (const interceptor of this.interceptors.error) {
      try {
        const result = await interceptor({ ...lastError, originalConfig: config });
        if (result) return result;
      } catch (e) {
        lastError = e;
      }
    }
    if (showError) {
      toast.error(lastError.message || "Bir hata oluştu");
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
   * Refresh access token
   */
  async refreshToken() {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return false;
    try {
      const response = await fetch(`${this.baseURL}/api/auth/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access);
        return true;
      }
    } catch (e) {
      console.error("Token refresh failed:", e);
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return false;
  }
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  // =====================
  // CONVENIENCE METHODS
  // =====================
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  }
  async post(endpoint, body, options = {}) {
    const result = await this.request(endpoint, { ...options, method: "POST", body });
    this.cache.invalidate(endpoint.split("/")[0]);
    return result;
  }
  async put(endpoint, body, options = {}) {
    const result = await this.request(endpoint, { ...options, method: "PUT", body });
    this.cache.invalidate(endpoint.split("/")[0]);
    return result;
  }
  async patch(endpoint, body, options = {}) {
    const result = await this.request(endpoint, { ...options, method: "PATCH", body });
    this.cache.invalidate(endpoint.split("/")[0]);
    return result;
  }
  async delete(endpoint, options = {}) {
    const result = await this.request(endpoint, { ...options, method: "DELETE" });
    this.cache.invalidate(endpoint.split("/")[0]);
    return result;
  }
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
};
__name(_ApiService, "ApiService");
let ApiService = _ApiService;
const api = new ApiService();
const HighlightsPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const [config, setConfig] = reactExports.useState({
    enabled: false,
    keywords: [],
    dm_notifications: true,
    highlight_color: "#fbbf24"
  });
  const [highlights, setHighlights] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [newKeyword, setNewKeyword] = reactExports.useState("");
  reactExports.useEffect(() => {
    fetchConfig();
    fetchHighlights();
  }, [serverId]);
  const fetchConfig = /* @__PURE__ */ __name(async () => {
    try {
      const data = await api.get(`/highlights/server/${serverId}/config/`);
      setConfig(data);
    } catch (error) {
      console.error("Fetch config error:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchConfig");
  const fetchHighlights = /* @__PURE__ */ __name(async () => {
    try {
      const data = await api.get(`/highlights/server/${serverId}/messages/`);
      setHighlights(data);
    } catch (error) {
      console.error("Fetch highlights error:", error);
    }
  }, "fetchHighlights");
  const saveConfig = /* @__PURE__ */ __name(async () => {
    try {
      await api.post(`/highlights/server/${serverId}/config/`, config);
      y.success("✅ Highlight ayarları kaydedildi");
    } catch (error) {
      console.error("Save config error:", error);
      y.error("❌ Kaydetme hatası");
    }
  }, "saveConfig");
  const addKeyword = /* @__PURE__ */ __name(() => {
    if (!newKeyword.trim()) return;
    if (config.keywords.includes(newKeyword.toLowerCase())) {
      y.warning("⚠️ Bu kelime zaten ekli");
      return;
    }
    setConfig({ ...config, keywords: [...config.keywords, newKeyword.toLowerCase()] });
    setNewKeyword("");
  }, "addKeyword");
  const removeKeyword = /* @__PURE__ */ __name((keyword) => {
    setConfig({ ...config, keywords: config.keywords.filter((k) => k !== keyword) });
  }, "removeKeyword");
  const clearHighlights = /* @__PURE__ */ __name(async () => {
    if (!await confirmDialog("Tüm highlight geçmişini temizlemek istediğinize emin misiniz?")) return;
    try {
      const response = await fetch(`${apiBaseUrl}/highlights/server/${serverId}/clear/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        y.success("✅ Geçmiş temizlendi");
        setHighlights([]);
      }
    } catch (error) {
      y.error("❌ Temizleme hatası");
    }
  }, "clearHighlights");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "highlights-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "highlights-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "highlights-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "✨ Highlight Sistemi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "highlights-content", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "⚙️ Ayarlar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config.enabled, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, enabled: e.target.checked }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-slider" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "keywords-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "🔑 Anahtar Kelimeler" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "keyword-input", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: newKeyword,
                onChange: /* @__PURE__ */ __name((e) => setNewKeyword(e.target.value), "onChange"),
                onKeyPress: /* @__PURE__ */ __name((e) => e.key === "Enter" && addKeyword(), "onKeyPress"),
                placeholder: "Kelime ekle..."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: addKeyword, children: "➕" })
          ] }),
          config.keywords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "keywords-list", children: config.keywords.map((keyword, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "keyword-tag", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: keyword }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => removeKeyword(keyword), "onClick"), children: "×" })
          ] }, idx)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-options", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config.dm_notifications, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, dm_notifications: e.target.checked }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "DM bildirimleri gönder" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Highlight Rengi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: config.highlight_color, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, highlight_color: e.target.value }), "onChange") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "save-btn", onClick: saveConfig, children: "💾 Kaydet" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "highlights-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            "📝 Highlight Geçmişi (",
            highlights.length,
            ")"
          ] }),
          highlights.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "clear-btn", onClick: clearHighlights, children: "🗑️ Temizle" })
        ] }),
        highlights.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "empty-icon", children: "✨" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz highlight yok" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "highlights-list", children: highlights.map((hl) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "highlight-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "highlight-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "highlight-author", children: [
              hl.author_avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: hl.author_avatar, alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "default-avatar", children: "👤" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "author-info", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "author-name", children: hl.author_name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "channel-name", children: [
                  "# ",
                  hl.channel_name
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "highlight-time", children: new Date(hl.created_at).toLocaleString("tr-TR") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "highlight-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { dangerouslySetInnerHTML: {
            __html: purify.sanitize(hl.content.replace(
              new RegExp(`(${config.keywords.join("|")})`, "gi"),
              `<mark style="background: ${config.highlight_color}; color: #000; padding: 2px 4px; border-radius: 4px;">$1</mark>`
            ))
          } }) })
        ] }, hl.id)) })
      ] })
    ] }) })
  ] }) });
}, "HighlightsPanel");
export {
  HighlightsPanel as default
};

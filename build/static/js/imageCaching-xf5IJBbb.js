var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React } from "./react-core-BiY6fgAJ.js";
const CACHE_NAME = "pawscord-image-cache";
const CACHE_VERSION = "v1";
const MAX_CACHE_SIZE = 50 * 1024 * 1024;
const MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1e3;
const inMemoryAvatarCache = /* @__PURE__ */ new Map();
const avatarLoadingPromises = /* @__PURE__ */ new Map();
const _ImageCache = class _ImageCache {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
    this.loadFromLocalStorage();
  }
  /**
   * Load cache from localStorage
   */
  loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem(`${CACHE_NAME}-${CACHE_VERSION}`);
      if (stored) {
        const data = JSON.parse(stored);
        Object.entries(data).forEach(([key, value]) => {
          if (this.isValidCacheEntry(value)) {
            this.cache.set(key, value);
          }
        });
      }
    } catch (error) {
      console.warn("[ImageCache] Failed to load from localStorage:", error);
      this.clearCache();
    }
  }
  /**
   * Save cache to localStorage
   */
  saveToLocalStorage() {
    try {
      const data = Object.fromEntries(this.cache);
      localStorage.setItem(`${CACHE_NAME}-${CACHE_VERSION}`, JSON.stringify(data));
    } catch (error) {
      console.warn("[ImageCache] localStorage full, clearing old entries");
      this.pruneCache();
    }
  }
  /**
   * Check if cache entry is still valid
   */
  isValidCacheEntry(entry) {
    if (!entry || !entry.timestamp) return false;
    const age = Date.now() - entry.timestamp;
    return age < MAX_CACHE_AGE;
  }
  /**
   * Get cached image
   */
  async get(url) {
    const cached = this.cache.get(url);
    if (cached && this.isValidCacheEntry(cached)) {
      cached.lastAccessed = Date.now();
      this.saveToLocalStorage();
      return cached.data;
    }
    if (cached) {
      this.cache.delete(url);
    }
    return null;
  }
  /**
   * Set cache entry
   */
  async set(url, data) {
    const currentSize = this.getCacheSize();
    const dataSize = new Blob([data]).size;
    if (currentSize + dataSize > MAX_CACHE_SIZE) {
      this.pruneCache();
    }
    this.cache.set(url, {
      data,
      timestamp: Date.now(),
      lastAccessed: Date.now(),
      size: dataSize
    });
    this.saveToLocalStorage();
  }
  /**
   * Get total cache size
   */
  getCacheSize() {
    let total = 0;
    this.cache.forEach((entry) => {
      total += entry.size || 0;
    });
    return total;
  }
  /**
   * Prune cache (remove oldest entries)
   */
  pruneCache() {
    const entries = Array.from(this.cache.entries());
    entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
    const removeCount = Math.ceil(entries.length * 0.3);
    for (let i = 0; i < removeCount; i++) {
      this.cache.delete(entries[i][0]);
    }
    this.saveToLocalStorage();
  }
  /**
   * Clear entire cache
   */
  clearCache() {
    this.cache.clear();
    try {
      localStorage.removeItem(`${CACHE_NAME}-${CACHE_VERSION}`);
    } catch (error) {
      console.warn("[ImageCache] Failed to clear localStorage:", error);
    }
  }
  /**
   * Prefetch images
   */
  async prefetch(urls) {
    const promises = urls.map(async (url) => {
      if (this.cache.has(url)) return;
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const dataUrl = await this.blobToDataUrl(blob);
        await this.set(url, dataUrl);
      } catch (error) {
        console.warn("[ImageCache] Failed to prefetch:", url, error);
      }
    });
    await Promise.allSettled(promises);
  }
  /**
   * Convert blob to data URL
   */
  blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  /**
   * Get cache statistics
   */
  getStats() {
    return {
      entries: this.cache.size,
      size: this.getCacheSize(),
      maxSize: MAX_CACHE_SIZE,
      usage: (this.getCacheSize() / MAX_CACHE_SIZE * 100).toFixed(2) + "%",
      oldestEntry: Math.min(...Array.from(this.cache.values()).map((e) => e.timestamp)),
      newestEntry: Math.max(...Array.from(this.cache.values()).map((e) => e.timestamp))
    };
  }
};
__name(_ImageCache, "ImageCache");
let ImageCache = _ImageCache;
const imageCache = new ImageCache();
const useCachedImage = /* @__PURE__ */ __name((url) => {
  const [cachedUrl, setCachedUrl] = React.useState(() => {
    if (url && inMemoryAvatarCache.has(url)) {
      return inMemoryAvatarCache.get(url);
    }
    return null;
  });
  const [loading, setLoading] = React.useState(!cachedUrl);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    let cancelled = false;
    const loadImage = /* @__PURE__ */ __name(async () => {
      if (!url) {
        setLoading(false);
        return;
      }
      if (inMemoryAvatarCache.has(url)) {
        setCachedUrl(inMemoryAvatarCache.get(url));
        setLoading(false);
        return;
      }
      if (avatarLoadingPromises.has(url)) {
        try {
          const result = await avatarLoadingPromises.get(url);
          if (!cancelled) {
            setCachedUrl(result);
            setLoading(false);
          }
        } catch (err) {
          if (!cancelled) {
            setError(err);
            setCachedUrl(url);
            setLoading(false);
          }
        }
        return;
      }
      const loadPromise = (async () => {
        try {
          setLoading(true);
          const cached = await imageCache.get(url);
          if (cached) {
            inMemoryAvatarCache.set(url, cached);
            return cached;
          }
          const response = await fetch(url);
          if (!response.ok) throw new Error("Image fetch failed");
          const blob = await response.blob();
          const dataUrl = await imageCache.blobToDataUrl(blob);
          await imageCache.set(url, dataUrl);
          inMemoryAvatarCache.set(url, dataUrl);
          return dataUrl;
        } finally {
          avatarLoadingPromises.delete(url);
        }
      })();
      avatarLoadingPromises.set(url, loadPromise);
      try {
        const result = await loadPromise;
        if (!cancelled) {
          setCachedUrl(result);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setCachedUrl(url);
          setLoading(false);
        }
      }
    }, "loadImage");
    loadImage();
    return () => {
      cancelled = true;
    };
  }, [url]);
  return { url: cachedUrl, loading, error };
}, "useCachedImage");
const prefetchRouteImages = /* @__PURE__ */ __name(async (route) => {
  const routeImages = {
    profile: [
      "/avatars/cat_1.png"
      // Add common profile images
    ],
    home: [
      "/static/logo.png"
      // Add home images
    ]
    // Add more routes
  };
  const urls = routeImages[route] || [];
  await imageCache.prefetch(urls);
}, "prefetchRouteImages");
const clearImageCache = /* @__PURE__ */ __name(() => {
  imageCache.clearCache();
  inMemoryAvatarCache.clear();
  avatarLoadingPromises.clear();
}, "clearImageCache");
const getImageCacheStats = /* @__PURE__ */ __name(() => {
  return {
    ...imageCache.getStats(),
    inMemoryCount: inMemoryAvatarCache.size,
    pendingLoads: avatarLoadingPromises.size
  };
}, "getImageCacheStats");
const prefetchUserAvatars = /* @__PURE__ */ __name(async (users) => {
  if (!users || !Array.isArray(users)) return;
  const avatarUrls = users.map((u) => u.avatar_url || u.avatar).filter((url) => url && typeof url === "string" && url.startsWith("http")).filter((url) => !inMemoryAvatarCache.has(url));
  if (avatarUrls.length === 0) return;
  const batchSize = 5;
  for (let i = 0; i < avatarUrls.length; i += batchSize) {
    const batch = avatarUrls.slice(i, i + batchSize);
    await Promise.allSettled(batch.map(async (url) => {
      if (inMemoryAvatarCache.has(url)) return;
      try {
        const cached = await imageCache.get(url);
        if (cached) {
          inMemoryAvatarCache.set(url, cached);
          return;
        }
        const cacheBuster = `?_=${Date.now()}`;
        const fetchUrl = url.includes("?") ? `${url}&_=${Date.now()}` : `${url}${cacheBuster}`;
        const response = await fetch(fetchUrl, {
          mode: "cors",
          cache: "no-cache"
        });
        if (!response.ok) return;
        const blob = await response.blob();
        const dataUrl = await imageCache.blobToDataUrl(blob);
        await imageCache.set(url, dataUrl);
        inMemoryAvatarCache.set(url, dataUrl);
      } catch (err) {
      }
    }));
  }
}, "prefetchUserAvatars");
const getAvatarFromCache = /* @__PURE__ */ __name((url) => {
  if (!url) return null;
  return inMemoryAvatarCache.get(url) || null;
}, "getAvatarFromCache");
export {
  clearImageCache,
  imageCache as default,
  getAvatarFromCache,
  getImageCacheStats,
  prefetchRouteImages,
  prefetchUserAvatars,
  useCachedImage
};

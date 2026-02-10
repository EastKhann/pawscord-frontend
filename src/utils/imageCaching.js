// frontend/src/utils/imageCaching.js
// 🖼️ Advanced Image Caching Strategy with localStorage

import React from 'react';

const CACHE_NAME = 'pawscord-image-cache';
const CACHE_VERSION = 'v1';
const MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

// 🔥 IN-MEMORY AVATAR CACHE - Ultra-fast, no repeated fetches
const inMemoryAvatarCache = new Map();
const avatarLoadingPromises = new Map(); // Prevent duplicate fetches

class ImageCache {
  constructor() {
    this.cache = new Map();
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
      console.warn('[ImageCache] Failed to load from localStorage:', error);
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
      console.warn('[ImageCache] localStorage full, clearing old entries');
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
      // Update last accessed time
      cached.lastAccessed = Date.now();
      this.saveToLocalStorage();
      return cached.data;
    }

    // Cache miss, remove if exists
    if (cached) {
      this.cache.delete(url);
    }

    return null;
  }

  /**
   * Set cache entry
   */
  async set(url, data) {
    // Check cache size
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
    this.cache.forEach(entry => {
      total += entry.size || 0;
    });
    return total;
  }

  /**
   * Prune cache (remove oldest entries)
   */
  pruneCache() {
    const entries = Array.from(this.cache.entries());

    // Sort by last accessed (oldest first)
    entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);

    // Remove oldest 30%
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
      console.warn('[ImageCache] Failed to clear localStorage:', error);
    }
  }

  /**
   * Prefetch images
   */
  async prefetch(urls) {
    const promises = urls.map(async url => {
      if (this.cache.has(url)) return;

      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const dataUrl = await this.blobToDataUrl(blob);
        await this.set(url, dataUrl);
      } catch (error) {
        console.warn('[ImageCache] Failed to prefetch:', url, error);
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
      usage: (this.getCacheSize() / MAX_CACHE_SIZE * 100).toFixed(2) + '%',
      oldestEntry: Math.min(...Array.from(this.cache.values()).map(e => e.timestamp)),
      newestEntry: Math.max(...Array.from(this.cache.values()).map(e => e.timestamp))
    };
  }
}

// Singleton instance
const imageCache = new ImageCache();

/**
 * 🔥 OPTIMIZED: React hook for cached images with in-memory deduplication
 * Aynı URL için sadece 1 kere fetch yapar, diğerleri bunu bekler
 */
export const useCachedImage = (url) => {
  const [cachedUrl, setCachedUrl] = React.useState(() => {
    // 🚀 İlk render'da memory cache'i kontrol et
    if (url && inMemoryAvatarCache.has(url)) {
      return inMemoryAvatarCache.get(url);
    }
    return null;
  });
  const [loading, setLoading] = React.useState(!cachedUrl);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;

    const loadImage = async () => {
      if (!url) {
        setLoading(false);
        return;
      }

      // 🚀 1. Memory cache'te var mı?
      if (inMemoryAvatarCache.has(url)) {
        setCachedUrl(inMemoryAvatarCache.get(url));
        setLoading(false);
        return;
      }

      // 🚀 2. Zaten yükleniyor mu? Promise'i bekle
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

      // 🚀 3. Yeni fetch başlat ve promise'i kaydet
      const loadPromise = (async () => {
        try {
          setLoading(true);

          // localStorage cache'i kontrol et
          const cached = await imageCache.get(url);
          if (cached) {
            inMemoryAvatarCache.set(url, cached);
            return cached;
          }

          // Fetch and cache
          const response = await fetch(url);
          if (!response.ok) throw new Error('Image fetch failed');

          const blob = await response.blob();
          const dataUrl = await imageCache.blobToDataUrl(blob);

          // Her iki cache'e de kaydet
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
          setCachedUrl(url); // Fallback to original URL
          setLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { url: cachedUrl, loading, error };
};

/**
 * Prefetch images for a route
 */
export const prefetchRouteImages = async (route) => {
  const routeImages = {
    profile: [
      '/avatars/cat_1.png',
      // Add common profile images
    ],
    home: [
      '/static/logo.png',
      // Add home images
    ],
    // Add more routes
  };

  const urls = routeImages[route] || [];
  await imageCache.prefetch(urls);
};

/**
 * Clear image cache (for settings)
 */
export const clearImageCache = () => {
  imageCache.clearCache();
  inMemoryAvatarCache.clear();
  avatarLoadingPromises.clear();
};

/**
 * Get cache stats (for debugging)
 */
export const getImageCacheStats = () => {
  return {
    ...imageCache.getStats(),
    inMemoryCount: inMemoryAvatarCache.size,
    pendingLoads: avatarLoadingPromises.size
  };
};

/**
 * 🔥 DM/Friends avatar prefetching - Arkadaş listesi yüklenince çağır
 * Bu fonksiyon tüm arkadaşların avatarlarını arka planda yükler
 */
export const prefetchUserAvatars = async (users) => {
  if (!users || !Array.isArray(users)) return;

  const avatarUrls = users
    .map(u => u.avatar_url || u.avatar)
    .filter(url => url && typeof url === 'string' && url.startsWith('http'))
    .filter(url => !inMemoryAvatarCache.has(url)); // Zaten cache'te olanları atla

  if (avatarUrls.length === 0) return;


  // Paralel yükle ama max 5 concurrent
  const batchSize = 5;
  for (let i = 0; i < avatarUrls.length; i += batchSize) {
    const batch = avatarUrls.slice(i, i + batchSize);
    await Promise.allSettled(batch.map(async (url) => {
      if (inMemoryAvatarCache.has(url)) return;

      try {
        // localStorage'da var mı?
        const cached = await imageCache.get(url);
        if (cached) {
          inMemoryAvatarCache.set(url, cached);
          return;
        }

        // Fetch with cache-busting to avoid stale CORS errors
        const cacheBuster = `?_=${Date.now()}`;
        const fetchUrl = url.includes('?') ? `${url}&_=${Date.now()}` : `${url}${cacheBuster}`;
        const response = await fetch(fetchUrl, {
          mode: 'cors',
          cache: 'no-cache'
        });
        if (!response.ok) return;

        const blob = await response.blob();
        const dataUrl = await imageCache.blobToDataUrl(blob);

        await imageCache.set(url, dataUrl);
        inMemoryAvatarCache.set(url, dataUrl);
      } catch (err) {
        // Silent fail for prefetch
      }
    }));
  }

};

/**
 * 🔥 Tek bir avatar'ı sync olarak al (zaten cache'te varsa)
 */
export const getAvatarFromCache = (url) => {
  if (!url) return null;
  return inMemoryAvatarCache.get(url) || null;
};

export default imageCache;



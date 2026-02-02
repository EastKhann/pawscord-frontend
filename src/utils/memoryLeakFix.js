// frontend/src/utils/memoryLeakFix.js

// 🔥 Memory Leak Prevention Utilities

export class MemoryManager {
    constructor() {
        this.eventListeners = new Map();
        this.intervals = new Set();
        this.timeouts = new Set();
        this.subscriptions = new Set();
    }

    // Track event listeners for cleanup
    addEventListener(element, event, handler, options) {
        if (!element) return;

        element.addEventListener(event, handler, options);

        const key = `${element}-${event}`;
        if (!this.eventListeners.has(key)) {
            this.eventListeners.set(key, []);
        }
        this.eventListeners.get(key).push({ handler, options });
    }

    // Track intervals
    setInterval(callback, delay) {
        const id = setInterval(callback, delay);
        this.intervals.add(id);
        return id;
    }

    // Track timeouts
    setTimeout(callback, delay) {
        const id = setTimeout(() => {
            callback();
            this.timeouts.delete(id);
        }, delay);
        this.timeouts.add(id);
        return id;
    }

    // Track subscriptions (for stores, etc.)
    addSubscription(unsubscribe) {
        this.subscriptions.add(unsubscribe);
    }

    // Cleanup all tracked resources
    cleanup() {
        // Clear event listeners
        this.eventListeners.forEach((listeners, key) => {
            const [element, event] = key.split('-');
            listeners.forEach(({ handler, options }) => {
                if (element && element.removeEventListener) {
                    element.removeEventListener(event, handler, options);
                }
            });
        });
        this.eventListeners.clear();

        // Clear intervals
        this.intervals.forEach(id => clearInterval(id));
        this.intervals.clear();

        // Clear timeouts
        this.timeouts.forEach(id => clearTimeout(id));
        this.timeouts.clear();

        // Unsubscribe from stores
        this.subscriptions.forEach(unsubscribe => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        });
        this.subscriptions.clear();
    }
}

// React Hook for memory management
export const useMemoryManager = () => {
    const managerRef = React.useRef(null);

    if (!managerRef.current) {
        managerRef.current = new MemoryManager();
    }

    React.useEffect(() => {
        return () => {
            if (managerRef.current) {
                managerRef.current.cleanup();
            }
        };
    }, []);

    return managerRef.current;
};

// Image cache manager to prevent memory leaks from images
export class ImageCacheManager {
    constructor(maxSize = 100) {
        this.cache = new Map();
        this.maxSize = maxSize;
        this.accessOrder = [];
    }

    get(url) {
        if (this.cache.has(url)) {
            // Move to end (most recently used)
            this.accessOrder = this.accessOrder.filter(u => u !== url);
            this.accessOrder.push(url);
            return this.cache.get(url);
        }
        return null;
    }

    set(url, data) {
        // Remove oldest if at capacity
        if (this.cache.size >= this.maxSize && !this.cache.has(url)) {
            const oldest = this.accessOrder.shift();
            if (oldest) {
                const oldData = this.cache.get(oldest);
                if (oldData && oldData.objectURL) {
                    URL.revokeObjectURL(oldData.objectURL);
                }
                this.cache.delete(oldest);
            }
        }

        this.cache.set(url, data);
        this.accessOrder.push(url);
    }

    clear() {
        // Revoke all object URLs
        this.cache.forEach((data, url) => {
            if (data && data.objectURL) {
                URL.revokeObjectURL(data.objectURL);
            }
        });
        this.cache.clear();
        this.accessOrder = [];
    }
}

// Debounce utility to prevent excessive re-renders
export const createDebounce = () => {
    let timeoutId = null;

    return (callback, delay) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(callback, delay);
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    };
};

// Message list virtual scrolling helper
export class VirtualScrollManager {
    constructor(containerHeight, itemHeight) {
        this.containerHeight = containerHeight;
        this.itemHeight = itemHeight;
        this.scrollTop = 0;
    }

    getVisibleRange(totalItems) {
        const startIndex = Math.max(0, Math.floor(this.scrollTop / this.itemHeight) - 5);
        const visibleCount = Math.ceil(this.containerHeight / this.itemHeight) + 10;
        const endIndex = Math.min(totalItems, startIndex + visibleCount);

        return { startIndex, endIndex };
    }

    updateScroll(scrollTop) {
        this.scrollTop = scrollTop;
    }
}

// Cleanup DOM elements properly
export const cleanupElement = (element) => {
    if (!element) return;

    // Remove all child nodes
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    // Remove all event listeners (by cloning and replacing)
    const newElement = element.cloneNode(false);
    element.parentNode?.replaceChild(newElement, element);
};

// Monitor memory usage (dev mode only)
export const monitorMemory = () => {
    if (import.meta.env.MODE !== 'development') return;

    if (performance.memory) {
        const used = Math.round(performance.memory.usedJSHeapSize / 1048576);
        const total = Math.round(performance.memory.totalJSHeapSize / 1048576);
        const limit = Math.round(performance.memory.jsHeapSizeLimit / 1048576);

        console.log(`💾 Memory: ${used}MB / ${total}MB (Limit: ${limit}MB)`);

        if (used / limit > 0.9) {
            console.warn('⚠️ Memory usage is high! Consider cleanup.');
        }
    }
};

// Auto memory monitoring
let memoryMonitorInterval = null;

export const startMemoryMonitoring = (intervalMs = 60000) => {
    if (import.meta.env.MODE !== 'development') return;

    stopMemoryMonitoring();
    memoryMonitorInterval = setInterval(monitorMemory, intervalMs);
};

export const stopMemoryMonitoring = () => {
    if (memoryMonitorInterval) {
        clearInterval(memoryMonitorInterval);
        memoryMonitorInterval = null;
    }
};

export default {
    MemoryManager,
    useMemoryManager,
    ImageCacheManager,
    createDebounce,
    VirtualScrollManager,
    cleanupElement,
    monitorMemory,
    startMemoryMonitoring,
    stopMemoryMonitoring
};




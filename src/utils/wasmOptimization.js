// ⚡ WEBASSEMBLY OPTIMIZATION UTILITIES
// For heavy computations that can benefit from WASM

/**
 * Load and initialize WASM module
 * @param {string} wasmPath - Path to WASM file
 * @returns {Promise<WebAssembly.Instance>}
 */
export async function loadWasmModule(wasmPath) {
    if (!WebAssembly) {
        throw new Error('WebAssembly is not supported in this browser');
    }

    try {
        const response = await fetch(wasmPath);
        const buffer = await response.arrayBuffer();
        const module = await WebAssembly.compile(buffer);
        const instance = await WebAssembly.instantiate(module);
        return instance;
    } catch (error) {
        console.error('Failed to load WASM module:', error);
        throw error;
    }
}

/**
 * Hash computation using WASM (faster than JS)
 * Fallback to JS if WASM not available
 */
export class WasmHasher {
    constructor() {
        this.wasmInstance = null;
        this.initialized = false;
    }

    async init() {
        try {
            // Load WASM module if available
            // this.wasmInstance = await loadWasmModule('/wasm/hasher.wasm');
            this.initialized = true;
        } catch (error) {
            console.warn('WASM not available, using JS fallback');
            this.initialized = true;
        }
    }

    hash(data) {
        if (!this.initialized) {
            throw new Error('Hasher not initialized. Call init() first.');
        }

        if (this.wasmInstance) {
            // Use WASM for fast hashing
            return this.wasmInstance.exports.hash(data);
        } else {
            // Fallback to JS
            return this.jsHash(data);
        }
    }

    jsHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }
}

// Singleton instance
export const wasmHasher = new WasmHasher();

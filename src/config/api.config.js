// frontend/src/config/api.config.js
/**
 * 🌐 Centralized API Configuration
 * Tüm API URL'leri tek bir yerden yönetilir
 */

// Environment detection
const isElectron = typeof window !== 'undefined' && typeof window.require === 'function';
const isNative = typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.();
const isProduction = import.meta.env.PROD || import.meta.env.MODE === 'production';
const isPawscordDomain = typeof window !== 'undefined' && window.location?.hostname?.includes('pawscord.com');

// Django port for local development
const DJANGO_PORT = 8888;

/**
 * Get API Base URL (without /api suffix)
 * Returns: https://api.pawscord.com or http://localhost:8888
 */
const getApiHost = () => {
    // 1. Environment variable override (highest priority)
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '');
    }
    if (import.meta.env.VITE_API_BASE_URL) {
        return import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, '');
    }

    // 2. Production environments (Native, Electron prod, pawscord.com domain)
    if (isNative || (isElectron && isProduction) || isPawscordDomain) {
        return 'https://api.pawscord.com';
    }

    // 3. Local development
    if (typeof window !== 'undefined') {
        const hostname = window.location?.hostname;
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return `http://${hostname}:${DJANGO_PORT}`;
        }
        // LAN development (192.168.x.x)
        return `${window.location.protocol}//${hostname}:${DJANGO_PORT}`;
    }

    // 4. Fallback
    return 'https://api.pawscord.com';
};

/**
 * Get full API URL (with /api suffix)
 * Returns: https://api.pawscord.com/api or http://localhost:8888/api
 */
const getApiBaseUrl = () => {
    return `${getApiHost()}/api`;
};

/**
 * Get WebSocket protocol
 */
const getWsProtocol = () => {
    const host = getApiHost();
    return host.startsWith('https') ? 'wss' : 'ws';
};

/**
 * Get API host without protocol
 * Returns: api.pawscord.com or localhost:8888
 */
const getApiHostname = () => {
    return getApiHost().replace(/^https?:\/\//, '');
};

/**
 * Get frontend base URL
 * Returns: https://www.pawscord.com or http://localhost:5173
 */
const getFrontendUrl = () => {
    if (isPawscordDomain || isNative || (isElectron && isProduction)) {
        return 'https://www.pawscord.com';
    }
    if (typeof window !== 'undefined') {
        return `${window.location.protocol}//${window.location.host}`;
    }
    return 'https://www.pawscord.com';
};

/**
 * Get media base URL (for avatars, uploads etc.)
 */
const getMediaUrl = () => {
    if (isNative || isElectron) {
        return 'https://www.pawscord.com';
    }
    return getApiHost();
};

// Export configuration object
export const API_CONFIG = {
    // Core URLs
    API_HOST: getApiHost(),           // https://api.pawscord.com
    API_BASE_URL: getApiBaseUrl(),    // https://api.pawscord.com/api
    MEDIA_URL: getMediaUrl(),         // https://www.pawscord.com
    FRONTEND_URL: getFrontendUrl(),   // https://www.pawscord.com

    // WebSocket
    WS_PROTOCOL: getWsProtocol(),     // wss or ws
    API_HOSTNAME: getApiHostname(),   // api.pawscord.com

    // Environment flags
    IS_ELECTRON: isElectron,
    IS_NATIVE: isNative,
    IS_PRODUCTION: isProduction,
    IS_PAWSCORD_DOMAIN: isPawscordDomain,

    // Port
    DJANGO_PORT,
};

// Named exports for convenience
export const API_HOST = API_CONFIG.API_HOST;
export const API_BASE_URL = API_CONFIG.API_BASE_URL;
// For components that add /api/ themselves (legacy support)
export const API_ROOT = API_CONFIG.API_HOST;
export const MEDIA_URL = API_CONFIG.MEDIA_URL;
export const FRONTEND_URL = API_CONFIG.FRONTEND_URL;
export const WS_PROTOCOL = API_CONFIG.WS_PROTOCOL;
export const API_HOSTNAME = API_CONFIG.API_HOSTNAME;

// Debug log in development
if (import.meta.env.DEV) {
    console.log('🔧 [API Config]', API_CONFIG);
}

export default API_CONFIG;

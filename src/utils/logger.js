// frontend/src/utils/logger.js
// 🔧 Centralized Logger - Production'da otomatik disable

const isDevelopment = import.meta.env.MODE === 'development';

const logger = {
    log: (...args) => {
        if (isDevelopment) {
        }
    },

    warn: (...args) => {
        if (isDevelopment) {
            console.warn(...args);
        }
    },

    error: (...args) => {
        // Error'lar her zaman loglanır (production'da da)
        console.error(...args);
    },

    debug: (...args) => {
        if (isDevelopment) {
            console.debug(...args);
        }
    },

    // Kategorili loglama
    voice: (...args) => {
        if (isDevelopment) {
        }
    },

    webrtc: (...args) => {
        if (isDevelopment) {
        }
    },

    signal: (...args) => {
        if (isDevelopment) {
        }
    },

    audio: (...args) => {
        if (isDevelopment) {
        }
    }
};

export default logger;




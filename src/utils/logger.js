// frontend/src/utils/logger.js
// 🔧 Centralized Logger - Production'da otomatik disable

const isDevelopment = import.meta.env.MODE === 'development';

const logger = {
    log: (...args) => {
        if (isDevelopment) {
            console.log(...args);
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
            console.log('🎤 [Voice]', ...args);
        }
    },

    webrtc: (...args) => {
        if (isDevelopment) {
            console.log('📡 [WebRTC]', ...args);
        }
    },

    signal: (...args) => {
        if (isDevelopment) {
            console.log('📤 [Signal]', ...args);
        }
    },

    audio: (...args) => {
        if (isDevelopment) {
            console.log('🔊 [Audio]', ...args);
        }
    }
};

export default logger;




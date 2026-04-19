import logger from '../utils/logger';
// ⚡ OPTIMIZATION: Remove console logs in production
// This file is for development reference only

export const logger = {
    log: (...args) => {
        if (import.meta.env.MODE === 'development') {
        }
    },
    warn: (...args) => {
        if (import.meta.env.MODE === 'development') {
            logger.warn(...args);
        }
    },
    error: (...args) => {
        // Always log errors
        logger.error(...args);
    },
    debug: (...args) => {
        if (import.meta.env.MODE === 'development' && import.meta.env.VITE_DEBUG === 'true') {
            logger.debug(...args);
        }
    },
};

// Usage:
// import { logger } from './removeConsoleLogs';
// logger.log('This will only appear in development');

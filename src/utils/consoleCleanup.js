import logger from '../utils/logger';
// frontend/src/utils/consoleCleanup.js

// 🔥 Console Log Cleanup Utility

const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug,
};

let isProduction = import.meta.env.MODE === 'production';
let logLevel = import.meta.env.VITE_LOG_LEVEL || 'warn'; // 'none', 'error', 'warn', 'info', 'debug'

const LOG_LEVELS = {
    none: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
};

const currentLogLevel = LOG_LEVELS[logLevel] || LOG_LEVELS.warn;

// Filter patterns to reduce console noise
const FILTER_PATTERNS = [
    /^\[WS\]/, // WebSocket logs
    /^🔗/, // Connection logs
    /^✅/, // Success logs
    /^🎨/, // Render logs
    /^📊/, // Analytics logs
    /^🔍/, // Debug logs
    /Download the React DevTools/,
    /React will try to recreate/,
];

const shouldLog = (level, args) => {
    // In production, only log errors
    if (isProduction && level > LOG_LEVELS.error) {
        return false;
    }

    // Check log level
    if (level > currentLogLevel) {
        return false;
    }

    // Check if message matches filter patterns (only in development)
    if (!isProduction && args.length > 0) {
        const message = String(args[0]);

        // Allow certain important patterns
        if (message.includes('❌') || message.includes('⚠️') || message.includes('🐛')) {
            return true;
        }

        // Filter out noise
        for (const pattern of FILTER_PATTERNS) {
            if (pattern.test(message)) {
                return false;
            }
        }
    }

    return true;
};

// Enhanced console methods
console.log = (...args) => {
    if (shouldLog(LOG_LEVELS.info, args)) {
        originalConsole.log(...args);
    }
};

console.info = (...args) => {
    if (shouldLog(LOG_LEVELS.info, args)) {
        originalConsole.info(...args);
    }
};

console.debug = (...args) => {
    if (shouldLog(LOG_LEVELS.debug, args)) {
        originalConsole.debug(...args);
    }
};

console.warn = (...args) => {
    if (shouldLog(LOG_LEVELS.warn, args)) {
        originalConsole.warn(...args);
    }
};

console.error = (...args) => {
    if (shouldLog(LOG_LEVELS.error, args)) {
        originalConsole.error(...args);
    }
};

// Utility to temporarily enable/disable all logs
export const setLogLevel = (level) => {
    if (LOG_LEVELS[level] !== undefined) {
        logLevel = level;
        logger.info(`📝 Log level set to: ${level}`);
    }
};

// Restore original console (for debugging)
export const restoreConsole = () => {
    console.log = originalConsole.log;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
    console.info = originalConsole.info;
    console.debug = originalConsole.debug;
};

// Group similar logs to reduce spam
let logGroups = new Map();
let logGroupTimer = null;

export const groupedLog = (group, message, ...args) => {
    if (!logGroups.has(group)) {
        logGroups.set(group, []);
    }

    logGroups.get(group).push({ message, args, timestamp: Date.now() });

    // Clear and log groups every 5 seconds
    if (!logGroupTimer) {
        logGroupTimer = setTimeout(() => {
            logGroups.forEach((logs, group) => {
                if (logs.length > 1) {
                    logger.info(`📦 [${group}] ${logs.length} logs:`, logs);
                } else if (logs.length === 1) {
                    logger.info(`[${group}]`, logs[0].message, ...logs[0].args);
                }
            });
            logGroups.clear();
            logGroupTimer = null;
        }, 5000);
    }
};

// Rate limit console logs
const rateLimitedLogs = new Map();

export const rateLimitedLog = (key, message, intervalMs = 1000) => {
    const now = Date.now();
    const lastLog = rateLimitedLogs.get(key);

    if (!lastLog || now - lastLog > intervalMs) {
        logger.info(message);
        rateLimitedLogs.set(key, now);
    }
};

// Clean up rate limit map periodically
setInterval(() => {
    const now = Date.now();
    rateLimitedLogs.forEach((timestamp, key) => {
        if (now - timestamp > 60000) {
            // Remove entries older than 1 minute
            rateLimitedLogs.delete(key);
        }
    });
}, 60000);

export default {
    setLogLevel,
    restoreConsole,
    groupedLog,
    rateLimitedLog,
};

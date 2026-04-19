// frontend/src/utils/logger.ts
// 🔧 Centralized Logger — silences debug/log in production, always emits warn/error.

type LogFn = (...args: unknown[]) => void;

interface Logger {
    log: LogFn;
    warn: LogFn;
    error: LogFn;
    debug: LogFn;
    info: LogFn;
    voice: LogFn;
    webrtc: LogFn;
    signal: LogFn;
    audio: LogFn;
}

const isDevelopment = import.meta.env.MODE === 'development';
const noop: LogFn = () => {};

const logger: Logger = {
    log: isDevelopment ? console.log.bind(console) : noop,
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    debug: isDevelopment ? console.debug.bind(console) : noop,
    info: isDevelopment ? console.info.bind(console) : noop,

    // Category loggers (dev only)
    voice: isDevelopment ? (...args: unknown[]) => console.debug('[Voice]', ...args) : noop,
    webrtc: isDevelopment ? (...args: unknown[]) => console.debug('[WebRTC]', ...args) : noop,
    signal: isDevelopment ? (...args: unknown[]) => console.debug('[Signal]', ...args) : noop,
    audio: isDevelopment ? (...args: unknown[]) => console.debug('[Audio]', ...args) : noop,
};

export default logger;

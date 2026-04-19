// frontend/src/utils/index.js
// Barrel exports for utility modules.
// Organised by domain for convenient imports:
//   import { sanitizeInput, getCDNUrl, debounce } from '@/utils';

// ─── Security & Sanitization ───
export { sanitizeInput, sanitizeUrl, stripHtml, sanitizeObject } from './inputSanitizer';
export { addSecurityHeaders, validateContentType, secureFetch } from './securityHeaders';
export { default as securityManager } from './securityManager';

// ─── API & Networking ───
export { default as apiClient } from './apiClient';
export { default as apiEndpoints } from './apiEndpoints';
export { default as ErrorReporter } from './errorReporter';
export { default as logger } from './logger';

// ─── CDN & Media ───
export {
    getCDNUrl,
    getMediaUrl,
    getAvatarUrl,
    getFileUrl,
    getOptimizedImageUrl,
    getThumbnailUrl,
    preloadImage,
    R2_CDN_URL,
    R2_ASSETS_URL,
    R2_AVATARS_URL,
    R2_UPLOADS_URL,
    LOGO_URL,
    LOGO_WEBP_URL,
} from './cdn';

// ─── Performance ───
export { debounce, throttle, shallowEqual, deepEqual, chunkArray } from './performanceHooks';
export { default as rateLimiter } from './rateLimiter';
export { default as memoryManager } from './memoryManager';

// ─── Accessibility ───
export { announceToScreenReader, trapFocus, getAriaLabel } from './a11yHelpers';
export { default as accessibilityHelpers } from './accessibilityHelpers';

// ─── Animation ───
export { smoothScrollTo, rafThrottle, fadeIn, fadeOut, Easing } from './animationHelpers';

// ─── Code Splitting & Lazy Loading ───
export { default as lazyWithRetry } from './lazyWithRetry';
export * from './lazyWithPreload';

// ─── Notifications & Toast ───
export { default as toast } from './toast';
export { default as notificationManager } from './notificationManager';

// ─── PWA ───
export { isPWA, isNative, canInstall, requestInstall, getDisplayMode } from './pwaHelpers';

// ─── Feature Flags ───
export { default as featureFlags } from './featureFlags';

// ─── CSRF ───
export { default as csrfToken } from './csrfToken';

// ─── Constants (re-export from constants/) ───
export * from './constants';

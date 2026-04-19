// frontend/src/services/index.js
// Barrel exports for all service modules.
// Usage: import { api, wsService, ApiError } from '@/services';

// ─── Core API Service ───
export { default as api, ApiError } from './ApiService';

// ─── WebSocket Service ───
export { default as wsService, WS_STATES, MESSAGE_TYPES } from './WebSocketService';

// ─── Domain-specific API modules ───
// These are grouped under services/api/ and re-exported via their own index.
export * as chatApi from './api/chat';
export * as adminApi from './api/admin';
export * as socialApi from './api/social';
export * as mediaApi from './api/media';
export * as securityApi from './api/security';
export * as moderationApi from './api/moderation';
export * as analyticsApi from './api/analytics';
export * as aiApi from './api/ai';

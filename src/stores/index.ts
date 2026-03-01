// frontend/src/stores/index.ts
// Central export for all Zustand stores

export { useChatStore } from './useChatStore';
export { useUIStore } from './useUIStore';
export { useUserStore } from './useUserStore';
export { useVoiceStore } from './useVoiceStore';
export { useServerStore } from './useServerStore';

// Re-export store types for convenience
export type { ChatStore, ServerStore, UIStore, UserStore, VoiceStore } from '../types/store';

// Re-export all selectors for convenient single-import
export * from './selectors';

// Cross-store subscription helpers and resetAllStores
export {
    onAuthChange,
    onThemeChange,
    onVoiceRoomChange,
    onServerChange,
    onConnectionChange,
    resetAllStores,
} from './storeSubscriptions';

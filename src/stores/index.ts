// frontend/src/stores/index.ts
// Central export for all Zustand stores

export { useChatStore } from './useChatStore';
export { useUIStore } from './useUIStore';
export { useUserStore } from './useUserStore';
export { useVoiceStore } from './useVoiceStore';
export { useServerStore } from './useServerStore';

// Re-export store types for convenience
export type { ChatStore, ServerStore, UIStore, UserStore, VoiceStore } from '../types/store';

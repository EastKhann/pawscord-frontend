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

// ---------- Cross-store coordination actions ----------

/**
 * Switch to a room within the current server.
 * Updates active chat and closes mobile sidebar in one call.
 */
export const switchRoom = (roomId: string) => {
    useChatStore.getState().setActiveChat('room', roomId);
    useUIStore.getState().setMobileSidebarOpen(false);
};

/**
 * Select a server and navigate to a specific room inside it.
 * Orchestrates server selection, chat activation, and mobile sidebar.
 */
export const selectServerAndRoom = (server: any, roomId?: string) => {
    useServerStore.getState().selectServer(server);
    if (roomId) {
        useChatStore.getState().setActiveChat('room', roomId);
    }
    useUIStore.getState().setMobileSidebarOpen(false);
};

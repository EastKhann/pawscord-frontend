// frontend/src/stores/storeSubscriptions.ts
// Cross-store subscription helpers for reactive inter-store communication.
//
// Usage:
//   import { onAuthChange, onThemeChange } from '@/stores/storeSubscriptions';
//   // In a top-level component or effect:
//   const unsub = onAuthChange((isAuthenticated) => {
//       if (!isAuthenticated) useChatStore.getState().reset();
//   });
//   // Cleanup:
//   unsub();

import { useUserStore } from './useUserStore';
import { useChatStore } from './useChatStore';
import { useUIStore } from './useUIStore';
import { useVoiceStore } from './useVoiceStore';
import { useServerStore } from './useServerStore';

/**
 * Helper: subscribe to a derived slice of a store.
 * Only fires the callback when the selected value changes (shallow compare).
 */
function subscribeToSlice<TStore, TSlice>(
    store: { subscribe: (listener: (state: TStore) => void) => () => void; getState: () => TStore },
    selector: (state: TStore) => TSlice,
    callback: (slice: TSlice) => void,
): () => void {
    let prev = selector(store.getState());
    return store.subscribe((state) => {
        const next = selector(state);
        if (next !== prev) {
            prev = next;
            callback(next);
        }
    });
}

/**
 * Subscribe to authentication state changes.
 * Fires callback whenever `isAuthenticated` toggles.
 * @param {(isAuthenticated: boolean) => void} callback
 * @returns {() => void} Unsubscribe function
 */
export const onAuthChange = (callback: (isAuthenticated: boolean) => void) =>
    subscribeToSlice(useUserStore, (s) => s.isAuthenticated, callback);

/**
 * Subscribe to theme changes.
 * Fires callback whenever the UI theme changes (dark/light).
 * @param {(theme: string) => void} callback
 * @returns {() => void} Unsubscribe function
 */
export const onThemeChange = (callback: (theme: string) => void) =>
    subscribeToSlice(useUIStore, (s) => s.theme, callback);

/**
 * Subscribe to voice room join/leave events.
 * Fires callback whenever the user enters or leaves a voice room.
 * @param {(isInVoice: boolean) => void} callback
 * @returns {() => void} Unsubscribe function
 */
export const onVoiceRoomChange = (callback: (isInVoice: boolean) => void) =>
    subscribeToSlice(useVoiceStore, (s) => s.isInVoiceChat, callback);

/**
 * Subscribe to server selection changes.
 * Fires callback whenever the user selects a different server.
 * @param {(server: any) => void} callback
 * @returns {() => void} Unsubscribe function
 */
export const onServerChange = (callback: (server: any) => void) =>
    subscribeToSlice(useServerStore, (s) => s.selectedServer, callback);

/**
 * Subscribe to WebSocket connection state changes.
 * Fires callback when connection status changes (connected/disconnected).
 * @param {(state: string) => void} callback
 * @returns {() => void} Unsubscribe function
 */
export const onConnectionChange = (callback: (state: string) => void) =>
    subscribeToSlice(useChatStore, (s: any) => s.connectionState as string, callback);

/**
 * Reset all stores — useful for full logout cleanup.
 * Calls reset() on every store to return to initial state.
 */
export const resetAllStores = () => {
    (useUserStore.getState() as any).reset();
    (useChatStore.getState() as any).reset();
    (useUIStore.getState() as any).resetTransient();
    (useVoiceStore.getState() as any).reset();
    (useServerStore.getState() as any).reset();
};

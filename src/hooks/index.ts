// frontend/src/hooks/index.js
// Barrel exports for all custom React hooks.
// Usage: import { useDebounce, useResponsive, useTheme } from '@/hooks';

// ─── Core Hooks ───
export { useDebounce, useDebouncedCallback } from './useDebounce';
export { default as useResponsive } from './useResponsive';
export { useTheme } from './useTheme';
export { useNetworkStatus } from './useNetworkStatus';
export { default as useModalA11y } from './useModalA11y';
export { useErrorHandler } from './useErrorHandler';

// ─── API & Data Hooks ───
export {
    default as useAPICache,
    useInfiniteAPICache,
    useMutation as useCacheMutation,
    cacheUtils,
} from './useAPICache';
export { default as useSafeAPI } from './useSafeAPI';

// ─── UI & Interaction Hooks ───
export { useDraftMessages, getAllDrafts, clearAllDrafts } from './useDraftMessages';
export { default as useDragDrop } from './useDragDrop';
export { useKeyboardShortcuts, getShortcutKey, SHORTCUTS } from './useKeyboardShortcuts';
export { default as useGlobalKeyboardShortcuts } from './useGlobalKeyboardShortcuts';

// ─── Performance Hooks ───
export { useCleanupEffect } from './useCleanupEffect';
export { useAppInitialization } from './useAppInitialization';
export { default as useNotifications } from './useNotifications';

// ─── Async & State Hooks ───
export { default as useAsyncError } from './useAsyncError';
export { useErrorRecovery } from './useErrorRecovery';
export { useRateLimit } from './useRateLimit';

// ─── Media & Device Hooks ───
export { default as useVoiceActivity } from './useVoiceActivity';
export { default as useVoicePermissions } from './useVoicePermissions';
export { default as useVoiceRecording } from './useVoiceRecording';
export { default as useGamePresence } from './useGamePresence';

// ─── Layout & Responsive Hooks ───
export { default as useWindowWidth } from './useWindowWidth';
export { default as usePWA } from './usePWA';
export { default as usePullToRefresh } from './usePullToRefresh';

// ─── Custom Hook Collections ───
export {
    useIntersectionObserver,
    useLocalStorage,
    useWindowSize,
    useMediaQuery,
    useHover,
    useClickOutside,
    usePrevious,
    useInterval,
    useTimeout,
    useKeyPress,
    useClipboard,
    useToggle,
    useAsyncState,
    useUpdateEffect,
    useMountedState,
} from './useCustomHooks';

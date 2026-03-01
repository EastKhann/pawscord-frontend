// frontend/src/stores/selectors.js
// Aggregated selectors from all Zustand stores for convenient imports.
// Usage: import { selectTotalUnreadCount, selectCurrentServer } from '@/stores/selectors';

// ─── Chat Store Selectors ───
export {
    selectTotalUnreadCount,
    selectIsConnected,
    selectActiveMessages,
    selectActiveChatType,
    selectActiveChatId,
    useMessages,
    useActiveChat,
    useUnreadCounts,
    useTypingUsers,
    useOnlineUsers,
    useVoiceUsers,
    usePermissions,
    useConnectionState,
    useUnreadCount,
} from './useChatStore';

// ─── Server Store Selectors ───
export {
    selectServers,
    selectCurrentServer,
    selectChannels,
    selectMembers,
    selectRoles,
    selectTextChannels,
    selectVoiceChannels,
    selectServerCount,
    useCurrentServer,
    useServers,
    useChannels,
    useMembers,
} from './useServerStore';

// ─── User Store Selectors ───
export {
    selectCurrentUser,
    selectIsAuthenticated,
    selectProfile,
    selectUserStatus,
    selectFriends,
    selectBlockedUsers,
    selectFriendCount,
    useCurrentUser,
    useIsAuthenticated,
    useProfile,
    useFriends,
} from './useUserStore';

// ─── UI Store Selectors ───
export {
    selectTheme,
    selectAccentColor,
    selectIsModalOpen,
    selectConnectionStatus,
    selectIsLoading,
    selectSidebarCollapsed,
    selectToastNotifications,
    useTheme,
    useAccentColor,
    useSidebarCollapsed,
    useIsModalOpen,
} from './useUIStore';

// ─── Voice Store Selectors ───
export {
    selectIsInVoice,
    selectCurrentVoiceRoom,
    selectIsMuted,
    selectIsDeafened,
    selectVoiceQuality,
    selectVoiceLatency,
    selectVoiceUsers,
    selectVoiceUserCount,
    useIsInVoice,
    useIsMuted,
    useVoiceQuality,
} from './useVoiceStore';

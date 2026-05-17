// frontend/src/stores/selectors.ts
// Re-exports all store-specific selectors for convenience.
// Imported by stores/index.ts via `export * from './selectors'`.

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
    useVoiceUsers as useChatVoiceUsers,
    usePermissions,
    useConnectionState,
    useUnreadCount,
    useMessageCount,
    useLastMessage,
    useHasUnread,
    useOnlineUserCount,
} from './useChatStore';

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
    useTextChannels,
    useVoiceChannels,
} from './useServerStore';

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

// frontend/src/types/store.ts
// Zustand store state & action type definitions

import type { Server, Room, UserProfile, Message, FriendInfo } from './api';

// ─── Chat Store ───
export interface ChatPermissions {
    is_owner: boolean;
    can_manage_channels: boolean;
    can_delete_messages: boolean;
    can_manage_roles: boolean;
    can_ban_members: boolean;
}

export interface ActiveChat {
    type: string;
    id: string | number;
    targetUser: string | null;
}

export interface ChatState {
    messages: Message[];
    encryptionKeys: Record<string, string>;
    activeChat: ActiveChat;
    unreadCounts: Record<string, number>;
    typingUsers: string[];
    onlineUsers: string[];
    voiceUsers: Record<number, unknown>;
    currentPermissions: ChatPermissions;
    selectedMessages: Set<number>;
}

export interface ChatActions {
    setActiveChat: (typeOrObj: string | Partial<ActiveChat>, id?: string | number, targetUser?: string | null) => void;
    addMessage: (message: Message) => void;
    updateMessage: (id: number, updates: Partial<Message>) => void;
    setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
    prependMessages: (oldMessages: Message[]) => void;
    incrementUnread: (key: string) => void;
    setOnlineUsers: (users: string[]) => void;
    setTypingUser: (username: string, isTyping: boolean) => void;
    setVoiceUsers: (usersMap: Record<number, unknown>) => void;
    setVoiceUsersState: (usersMap: Record<number, unknown>) => void;
    setSelectedMessages: (val: Set<number> | ((prev: Set<number>) => Set<number>)) => void;
    setEncryptionKey: (chatId: string, key: string) => void;
    setPermissions: (perms: ChatPermissions | null) => void;
}

export type ChatStore = ChatState & ChatActions;

// ─── Server Store ───
export interface ServerMember {
    id: number;
    user?: {
        id: number;
        username: string;
        avatar: string | null;
    };
    role?: string;
    joined_at?: string;
}

export interface ServerRole {
    id: number;
    name: string;
    color: string;
    position: number;
    permissions: Record<string, boolean>;
}

export interface PersistedServer {
    id: number;
    name: string;
    icon: string | null;
    slug?: string;
}

export interface ServerState {
    servers: Server[];
    selectedServer: Server | null;
    channels: Room[];
    members: ServerMember[];
    roles: ServerRole[];
    serverSettings: Record<string, unknown>;
    joinedServerIds: Set<number>;
}

export interface ServerActions {
    setServers: (servers: Server[]) => void;
    addServer: (server: Server) => void;
    removeServer: (serverId: number) => void;
    updateServer: (serverId: number, updates: Partial<Server>) => void;
    selectServer: (server: Server | null) => void;
    setChannels: (channels: Room[]) => void;
    addChannel: (channel: Room) => void;
    removeChannel: (channelId: number) => void;
    updateChannel: (channelId: number, updates: Partial<Room>) => void;
    setMembers: (members: ServerMember[]) => void;
    addMember: (member: ServerMember) => void;
    removeMember: (userId: number) => void;
    updateMember: (userId: number, updates: Partial<ServerMember>) => void;
    setRoles: (roles: ServerRole[]) => void;
    setServerSettings: (settings: Record<string, unknown>) => void;
    getChannelById: (channelId: number) => Room | undefined;
    getMemberByUserId: (userId: number) => ServerMember | undefined;
    getTextChannels: () => Room[];
    getVoiceChannels: () => Room[];
    getCategoryChannels: () => Room[];
    reset: () => void;
}

export type ServerStore = ServerState & ServerActions;

// ─── UI Store ───
export interface ModalState {
    [key: string]: boolean;
}

export interface PanelState {
    userList: boolean;
    memberList: boolean;
    serverList: boolean;
    channelList: boolean;
}

export interface ContextMenu {
    x: number;
    y: number;
    type: string;
    data: unknown;
}

export interface UIState {
    modals: ModalState;
    modalData: Record<string, unknown>;
    panels: PanelState;
    theme: 'dark' | 'light';
    accentColor: string;
    sidebarCollapsed: boolean;
    mobileSidebarOpen: boolean;
    contextMenu: ContextMenu | null;
    animationState: string;
    isConnected: boolean;
    updateStatusText: string;
    downloadProgress: number;
    isDownloading: boolean;
    searchQuery: string;
    dropTarget: unknown;
}

export interface UIActions {
    openModal: (modalName: string, data?: unknown) => void;
    closeModal: (modalName: string) => void;
    toggleModal: (modalName: string) => void;
    closeAllModals: () => void;
    getModalData: (modalName: string) => unknown;
    togglePanel: (panelName: string) => void;
    setTheme: (theme: 'dark' | 'light') => void;
    setAccentColor: (color: string) => void;
    toggleSidebar: () => void;
    setMobileSidebarOpen: (isOpen: boolean) => void;
    setContextMenu: (menu: ContextMenu | null) => void;
    clearContextMenu: () => void;
    setAnimationState: (val: string | ((prev: string) => string)) => void;
    setIsConnected: (val: boolean | ((prev: boolean) => boolean)) => void;
    setUpdateStatusText: (val: string | ((prev: string) => string)) => void;
    setDownloadProgress: (val: number | ((prev: number) => number)) => void;
    setIsDownloading: (val: boolean | ((prev: boolean) => boolean)) => void;
    setSearchQuery: (val: string | ((prev: string) => string)) => void;
    setDropTarget: (val: unknown) => void;
}

export type UIStore = UIState & UIActions;

// ─── User Store ───
export interface UserPreferences {
    notificationsEnabled: boolean;
    soundEnabled: boolean;
    desktopNotifications: boolean;
    compactMode: boolean;
}

export interface UserProfileLocal {
    username: string;
    email: string;
    avatar: string | null;
    status: 'online' | 'idle' | 'dnd' | 'invisible';
    statusMessage: string;
    friendCode: string;
}

export interface UserState {
    currentUser: UserProfile | null;
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    profile: UserProfileLocal;
    friends: FriendInfo[];
    incomingRequests: FriendInfo[];
    outgoingRequests: FriendInfo[];
    blockedUsers: number[];
    preferences: UserPreferences;
}

export interface UserActions {
    setUser: (user: UserProfile | null) => void;
    setTokens: (access: string, refresh: string) => void;
    clearAuth: () => void;
    setProfile: (profileData: Partial<UserProfileLocal>) => void;
    setStatus: (status: 'online' | 'idle' | 'dnd' | 'invisible') => void;
    setStatusMessage: (message: string) => void;
    setFriends: (friends: FriendInfo[]) => void;
    addFriend: (friend: FriendInfo) => void;
    removeFriend: (userId: number) => void;
    setIncomingRequests: (requests: FriendInfo[]) => void;
    setOutgoingRequests: (requests: FriendInfo[]) => void;
    blockUser: (userId: number) => void;
    unblockUser: (userId: number) => void;
    updatePreferences: (prefs: Partial<UserPreferences>) => void;
}

export type UserStore = UserState & UserActions;

// ─── Voice Store ───
export interface VoiceUserData {
    id: number;
    username: string;
    avatar: string | null;
    isMuted: boolean;
    isDeafened: boolean;
    isSpeaking: boolean;
    volume: number;
}

export type NoiseSuppressionLevel = 'off' | 'low' | 'medium' | 'high';
export type ConnectionQuality = 'excellent' | 'good' | 'fair' | 'poor';

export interface VoiceState {
    isInVoiceChat: boolean;
    currentVoiceRoom: number | null;
    currentServerId: number | null;
    isMuted: boolean;
    isDeafened: boolean;
    isCameraOn: boolean;
    isScreenSharing: boolean;
    voiceUsers: Record<number, VoiceUserData>;
    speakingUsers: Set<number>;
    inputDevice: string;
    outputDevice: string;
    inputVolume: number;
    outputVolume: number;
    noiseSuppression: NoiseSuppressionLevel;
    echoCancellation: boolean;
    autoGainControl: boolean;
    pushToTalk: boolean;
    pushToTalkKey: string;
    connectionQuality: ConnectionQuality;
    latency: number;
    packetLoss: number;
}

export interface VoiceActions {
    joinVoiceRoom: (roomId: number, serverId: number) => void;
    leaveVoiceRoom: () => void;
    toggleMute: () => void;
    toggleDeafen: () => void;
    toggleCamera: () => void;
    toggleScreenShare: () => void;
    addVoiceUser: (userId: number, userData: VoiceUserData) => void;
    removeVoiceUser: (userId: number) => void;
    setVoiceUsers: (users: Record<number, VoiceUserData>) => void;
    setSpeaking: (userId: number, isSpeaking: boolean) => void;
    setInputDevice: (deviceId: string) => void;
    setOutputDevice: (deviceId: string) => void;
    setInputVolume: (volume: number) => void;
    setOutputVolume: (volume: number) => void;
    setNoiseSuppression: (level: NoiseSuppressionLevel) => void;
    setEchoCancellation: (enabled: boolean) => void;
    setAutoGainControl: (enabled: boolean) => void;
    setPushToTalk: (enabled: boolean) => void;
    setPushToTalkKey: (key: string) => void;
    setConnectionQuality: (quality: ConnectionQuality) => void;
    setLatency: (latency: number) => void;
    setPacketLoss: (loss: number) => void;
}

export type VoiceStore = VoiceState & VoiceActions;

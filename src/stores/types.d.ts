// ==========================================
// Zustand Store Type Definitions
// ==========================================

// User Store
export interface UserState {
    user: {
        id: string | number;
        username: string;
        email: string;
        avatar_url?: string;
        discriminator?: string;
        is_premium?: boolean;
        is_staff?: boolean;
        status?: 'online' | 'idle' | 'dnd' | 'invisible' | 'offline';
        custom_status?: string;
        bio?: string;
    } | null;
    isAuthenticated: boolean;
    token: string | null;
    setUser: (user: UserState['user']) => void;
    setToken: (token: string | null) => void;
    updateProfile: (data: Partial<NonNullable<UserState['user']>>) => void;
    logout: () => void;
}

// Server Store
export interface Server {
    id: string | number;
    name: string;
    icon_url?: string;
    owner_id: string | number;
    member_count: number;
    channels: Channel[];
    roles: Role[];
    categories: Category[];
    is_premium?: boolean;
}

export interface Channel {
    id: string | number;
    name: string;
    type: 'text' | 'voice' | 'announcement' | 'forum' | 'stage';
    category_id?: string | number;
    position: number;
    topic?: string;
    is_nsfw?: boolean;
    slowmode_seconds?: number;
}

export interface Role {
    id: string | number;
    name: string;
    color: string;
    position: number;
    permissions: number;
    is_mentionable?: boolean;
    is_hoisted?: boolean;
}

export interface Category {
    id: string | number;
    name: string;
    position: number;
}

export interface ServerState {
    servers: Server[];
    currentServer: Server | null;
    currentChannel: Channel | null;
    setServers: (servers: Server[]) => void;
    setCurrentServer: (server: Server | null) => void;
    setCurrentChannel: (channel: Channel | null) => void;
    addServer: (server: Server) => void;
    removeServer: (serverId: string | number) => void;
    updateServer: (serverId: string | number, data: Partial<Server>) => void;
}

// Message Store
export interface Message {
    id: string | number;
    content: string;
    author: {
        id: string | number;
        username: string;
        avatar_url?: string;
    };
    channel_id: string | number;
    created_at: string;
    edited_at?: string;
    attachments?: Attachment[];
    reactions?: Reaction[];
    reply_to?: Message;
    is_pinned?: boolean;
    embeds?: Embed[];
}

export interface Attachment {
    id: string;
    filename: string;
    url: string;
    size: number;
    content_type: string;
    width?: number;
    height?: number;
}

export interface Reaction {
    emoji: string;
    count: number;
    me: boolean;
}

export interface Embed {
    type: 'link' | 'image' | 'video' | 'rich';
    title?: string;
    description?: string;
    url?: string;
    thumbnail?: string;
    color?: string;
}

export interface MessageState {
    messages: Record<string, Message[]>;
    isLoading: boolean;
    hasMore: Record<string, boolean>;
    addMessage: (channelId: string, message: Message) => void;
    setMessages: (channelId: string, messages: Message[]) => void;
    deleteMessage: (channelId: string, messageId: string | number) => void;
    editMessage: (channelId: string, messageId: string | number, content: string) => void;
    addReaction: (channelId: string, messageId: string | number, emoji: string) => void;
}

// UI Store
export interface UIState {
    sidebarOpen: boolean;
    memberListOpen: boolean;
    settingsOpen: boolean;
    activeModal: string | null;
    theme: 'dark' | 'light' | 'amoled';
    fontSize: number;
    compactMode: boolean;
    toggleSidebar: () => void;
    toggleMemberList: () => void;
    openSettings: () => void;
    closeSettings: () => void;
    setModal: (modal: string | null) => void;
    setTheme: (theme: UIState['theme']) => void;
}

// Notification Store
export interface Notification {
    id: string;
    type: 'message' | 'mention' | 'friend_request' | 'server_invite' | 'system';
    title: string;
    message: string;
    read: boolean;
    created_at: string;
    link?: string;
}

export interface NotificationState {
    notifications: Notification[];
    unreadCount: number;
    addNotification: (notification: Omit<Notification, 'id' | 'created_at'>) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    removeNotification: (id: string) => void;
    clearAll: () => void;
}

// frontend/src/types/api.ts
// API Response Types — matches Django serializer output

// ─── User & Profile ───
export interface User {
    id: number;
    username: string;
    email: string;
    date_joined: string;
    is_active: boolean;
}

export interface UserProfile {
    id: number;
    user: User;
    xp: number;
    level: number;
    role: 'admin' | 'member';
    status: 'online' | 'idle' | 'dnd' | 'invisible';
    last_seen: string;
    avatar: string | null;
    status_message: string;
    friend_code: string | null;
    current_activity: Record<string, unknown> | null;
    phone_number: string | null;
    phone_verified: boolean;
    social_links: Record<string, string>;
}

// ─── Server & Channels ───
export interface Server {
    id: number;
    name: string;
    owner: number | UserProfile;
    icon: string | null;
    description: string;
    is_public: boolean;
    metadata: Record<string, unknown>;
    created_at: string;
    member_count?: number;
}

export interface ChannelCategory {
    id: number;
    server: number;
    name: string;
    order: number;
}

export interface Room {
    id: number;
    name: string;
    slug: string;
    server: number;
    room_type: 'text' | 'voice' | 'announcement' | 'forum' | 'stage';
    category: number | null;
    topic: string;
    is_private: boolean;
    slow_mode_seconds: number;
    position: number;
    created_at: string;
}

// ─── Messages ───
export interface Message {
    id: number;
    content: string;
    user: MessageUser;
    room: number | null;
    conversation: number | null;
    timestamp: string;
    edited_at: string | null;
    is_pinned: boolean;
    is_deleted: boolean;
    message_type: 'text' | 'system' | 'join' | 'leave' | 'image' | 'file' | 'voice';
    reply_to: number | null;
    reactions: Reaction[];
    attachments: Attachment[];
    embeds: Embed[];
    forwarded_from: number | null;
    thread_count?: number;
}

export interface MessageUser {
    id: number;
    username: string;
    avatar: string | null;
    level: number;
    role: string;
    status: string;
}

export interface Reaction {
    id: number;
    emoji: string;
    count: number;
    users: number[];
    me: boolean;
}

export interface Attachment {
    id: number;
    file: string;
    filename: string;
    file_type: string;
    file_size: number;
    width?: number;
    height?: number;
}

export interface Embed {
    type: 'link' | 'image' | 'video' | 'rich';
    url: string;
    title?: string;
    description?: string;
    thumbnail?: string;
    color?: string;
}

// ─── Friendship ───
export interface Friendship {
    id: number;
    sender: UserProfile;
    receiver: UserProfile;
    status: 'pending' | 'accepted' | 'rejected' | 'blocked';
    created_at: string;
}

export interface FriendInfo {
    id: number;
    username: string;
    avatar: string | null;
    status: string;
    status_message: string;
    level: number;
    last_seen: string;
}

// ─── DM / Conversation ───
export interface Conversation {
    id: number;
    participants: UserProfile[];
    created_at: string;
    last_message?: Message;
    unread_count: number;
    is_group: boolean;
    name?: string;
}

// ─── Invite ───
export interface Invite {
    id: number;
    code: string;
    server: number;
    creator: number;
    max_uses: number | null;
    uses: number;
    expires_at: string | null;
    created_at: string;
}

// ─── Voice ───
export interface VoiceState {
    user_id: number;
    channel_id: number;
    server_id: number;
    self_mute: boolean;
    self_deaf: boolean;
    is_streaming: boolean;
    is_video: boolean;
}

// ─── Notification ───
export interface Notification {
    id: number;
    user: number;
    type: 'mention' | 'reply' | 'friend_request' | 'server_invite' | 'system';
    title: string;
    message: string;
    is_read: boolean;
    data: Record<string, unknown>;
    created_at: string;
}

// ─── API Responses ───
export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface ApiError {
    error: string;
    detail?: string;
    code?: string;
}

export interface AuthTokens {
    access: string;
    refresh: string;
    user?: User;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    password2: string;
}

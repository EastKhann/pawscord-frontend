// ==========================================
// API Response Type Definitions
// ==========================================

// Common API response wrapper
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    status?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    count: number;
    next: string | null;
    previous: string | null;
    page: number;
    total_pages: number;
}

// Auth
export interface LoginRequest {
    username: string;
    password: string;
    totp_code?: string;
}

export interface LoginResponse {
    access: string;
    refresh: string;
    user: {
        id: number;
        username: string;
        email: string;
        avatar_url: string;
        is_premium: boolean;
    };
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    captcha_token?: string;
}

// Server
export interface CreateServerRequest {
    name: string;
    icon?: File;
    template?: string;
}

export interface ServerInvite {
    code: string;
    server_id: number;
    inviter: { id: number; username: string };
    max_uses: number;
    uses: number;
    expires_at: string | null;
    created_at: string;
}

// Messages
export interface SendMessageRequest {
    content: string;
    reply_to?: number;
    attachments?: File[];
    nonce?: string;
}

export interface MessageSearchParams {
    q: string;
    channel_id?: number;
    author_id?: number;
    has?: 'file' | 'image' | 'video' | 'link' | 'embed';
    before?: string;
    after?: string;
    limit?: number;
    offset?: number;
}

// WebSocket Events
export interface WSMessage {
    type: string;
    data: unknown;
}

export interface WSChatMessage extends WSMessage {
    type: 'chat_message';
    data: {
        id: number;
        content: string;
        author: { id: number; username: string; avatar_url: string };
        channel_id: number;
        created_at: string;
        nonce?: string;
    };
}

export interface WSTypingEvent extends WSMessage {
    type: 'typing_start' | 'typing_stop';
    data: {
        user_id: number;
        username: string;
        channel_id: number;
    };
}

export interface WSPresenceUpdate extends WSMessage {
    type: 'presence_update';
    data: {
        user_id: number;
        status: 'online' | 'idle' | 'dnd' | 'invisible' | 'offline';
        custom_status?: string;
        activities?: Array<{ name: string; type: string }>;
    };
}

export interface WSVoiceStateUpdate extends WSMessage {
    type: 'voice_state_update';
    data: {
        user_id: number;
        channel_id: number | null;
        is_muted: boolean;
        is_deafened: boolean;
        is_streaming: boolean;
    };
}

// File Upload
export interface UploadProgress {
    loaded: number;
    total: number;
    percentage: number;
}

export interface UploadResult {
    url: string;
    filename: string;
    size: number;
    content_type: string;
    thumbnail_url?: string;
}

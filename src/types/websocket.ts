// frontend/src/types/websocket.ts
// WebSocket message types — matches Django Channels consumers

// ─── Base Message ───
export interface WSBaseMessage {
    type: string;
    [key: string]: unknown;
}

// ─── Inbound (client → server) ───
export interface WSSendMessage {
    type: 'chat_message';
    message: string;
    room_id: number;
    reply_to?: number;
    attachments?: string[];
}

export interface WSTypingStart {
    type: 'typing_start';
    room_id: number;
}

export interface WSTypingStop {
    type: 'typing_stop';
    room_id: number;
}

export interface WSJoinRoom {
    type: 'join_room';
    room_id: number;
}

export interface WSLeaveRoom {
    type: 'leave_room';
    room_id: number;
}

export interface WSVoiceSignal {
    type: 'voice_signal';
    target_user_id: number;
    signal: RTCSessionDescriptionInit | RTCIceCandidateInit;
}

export interface WSVoiceJoin {
    type: 'voice_join';
    channel_id: number;
    self_mute?: boolean;
    self_deaf?: boolean;
}

export interface WSVoiceLeave {
    type: 'voice_leave';
    channel_id: number;
}

export interface WSStatusUpdate {
    type: 'status_update';
    status: 'online' | 'idle' | 'dnd' | 'invisible';
}

export interface WSMessageEdit {
    type: 'edit_message';
    message_id: number;
    content: string;
}

export interface WSMessageDelete {
    type: 'delete_message';
    message_id: number;
}

export interface WSReactionAdd {
    type: 'reaction_add';
    message_id: number;
    emoji: string;
}

export interface WSReactionRemove {
    type: 'reaction_remove';
    message_id: number;
    emoji: string;
}

// ─── Outbound (server → client) ───
export interface WSNewMessage {
    type: 'new_message';
    message: {
        id: number;
        content: string;
        user: {
            id: number;
            username: string;
            avatar: string | null;
        };
        timestamp: string;
        room_id: number;
        reply_to: number | null;
        attachments: Array<{
            id: number;
            file: string;
            filename: string;
            file_type: string;
        }>;
    };
}

export interface WSMessageEdited {
    type: 'message_edited';
    message_id: number;
    content: string;
    edited_at: string;
}

export interface WSMessageDeleted {
    type: 'message_deleted';
    message_id: number;
}

export interface WSTypingIndicator {
    type: 'typing';
    user_id: number;
    username: string;
    room_id: number;
    is_typing: boolean;
}

export interface WSPresenceUpdate {
    type: 'presence_update';
    user_id: number;
    status: 'online' | 'idle' | 'dnd' | 'invisible' | 'offline';
}

export interface WSUserJoined {
    type: 'user_joined';
    user_id: number;
    username: string;
    room_id: number;
}

export interface WSUserLeft {
    type: 'user_left';
    user_id: number;
    room_id: number;
}

export interface WSVoiceStateUpdate {
    type: 'voice_state_update';
    user_id: number;
    channel_id: number;
    self_mute: boolean;
    self_deaf: boolean;
    is_streaming: boolean;
}

export interface WSVoiceOffer {
    type: 'voice_offer';
    from_user_id: number;
    signal: RTCSessionDescriptionInit;
}

export interface WSVoiceAnswer {
    type: 'voice_answer';
    from_user_id: number;
    signal: RTCSessionDescriptionInit;
}

export interface WSVoiceIceCandidate {
    type: 'voice_ice_candidate';
    from_user_id: number;
    candidate: RTCIceCandidateInit;
}

export interface WSReactionUpdate {
    type: 'reaction_update';
    message_id: number;
    emoji: string;
    count: number;
    user_id: number;
    action: 'add' | 'remove';
}

export interface WSNotification {
    type: 'notification';
    notification: {
        id: number;
        type: string;
        title: string;
        message: string;
        data: Record<string, unknown>;
    };
}

export interface WSServerUpdate {
    type: 'server_update';
    server_id: number;
    data: Record<string, unknown>;
}

export interface WSChannelUpdate {
    type: 'channel_update';
    channel_id: number;
    data: Record<string, unknown>;
}

export interface WSMemberUpdate {
    type: 'member_update';
    server_id: number;
    user_id: number;
    data: Record<string, unknown>;
}

export interface WSError {
    type: 'error';
    code: string;
    message: string;
}

// ─── Union Types ───
export type WSInboundMessage =
    | WSSendMessage
    | WSTypingStart
    | WSTypingStop
    | WSJoinRoom
    | WSLeaveRoom
    | WSVoiceSignal
    | WSVoiceJoin
    | WSVoiceLeave
    | WSStatusUpdate
    | WSMessageEdit
    | WSMessageDelete
    | WSReactionAdd
    | WSReactionRemove;

export type WSOutboundMessage =
    | WSNewMessage
    | WSMessageEdited
    | WSMessageDeleted
    | WSTypingIndicator
    | WSPresenceUpdate
    | WSUserJoined
    | WSUserLeft
    | WSVoiceStateUpdate
    | WSVoiceOffer
    | WSVoiceAnswer
    | WSVoiceIceCandidate
    | WSReactionUpdate
    | WSNotification
    | WSServerUpdate
    | WSChannelUpdate
    | WSMemberUpdate
    | WSError;

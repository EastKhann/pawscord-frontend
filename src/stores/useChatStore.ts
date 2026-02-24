// frontend/src/stores/useChatStore.ts
// 10/10 Edition: Selectors, typing timestamps, persistent unread, batch ops

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ChatStore } from '../types/store';

// Simple ID generator
const getTemporaryId = () => (Date.now() + Math.floor(Math.random() * 1000)).toString();

// --- PERSISTENT UNREAD: Restore from localStorage ---
const UNREAD_STORAGE_KEY = 'pawscord_unread';
function loadPersistedUnread(): Record<string, number> {
    try {
        const raw = localStorage.getItem(UNREAD_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
}
function persistUnread(counts: Record<string, number>) {
    try { localStorage.setItem(UNREAD_STORAGE_KEY, JSON.stringify(counts)); } catch { /* quota */ }
}

// --- TYPING TIMESTAMP: auto-expire stale typing entries ---
const TYPING_TIMEOUT_MS = 8000;

interface TypingEntry {
    username: string;
    timestamp: number;
}

export const useChatStore = create<ChatStore>()(devtools((set, get) => ({
    // --- STATE ---
    messages: [],
    encryptionKeys: {},
    activeChat: { type: 'welcome', id: 'welcome', targetUser: null },
    unreadCounts: loadPersistedUnread(),
    typingUsers: [] as string[],
    _typingEntries: [] as TypingEntry[],
    onlineUsers: [],
    voiceUsers: {},
    currentPermissions: {
        is_owner: false,
        can_manage_channels: false,
        can_delete_messages: false,
        can_manage_roles: false,
        can_ban_members: false
    },
    connectionState: 'disconnected' as string,

    // --- ACTIONS ---

    // Connection state for UI indicator
    setConnectionState: (state: string) => set({ connectionState: state }),

    // Chat switching — supports both object and positional formats
    setActiveChat: (typeOrObj: any, id?: any, targetUser: any = null) => {
        let type: string, chatId: any, chatTargetUser: any;

        if (typeOrObj && typeof typeOrObj === 'object') {
            type = typeOrObj.type;
            chatId = typeOrObj.id || typeOrObj.slug;
            chatTargetUser = typeOrObj.targetUser || null;
        } else {
            type = typeOrObj;
            chatId = id;
            chatTargetUser = targetUser;
        }

        set({ activeChat: { type, id: chatId, targetUser: chatTargetUser } });

        // Reset unread for this chat (+ persist)
        const key = type === 'room' ? `room-${chatId}` : `dm-${chatId}`;
        set((state: any) => {
            const newCounts = { ...state.unreadCounts };
            delete newCounts[key];
            persistUnread(newCounts);
            return { unreadCounts: newCounts };
        });
    },

    // --- MESSAGE OPERATIONS ---

    // Add single message with dedup (temp_id + id)
    addMessage: (message: any) => set((state: any) => {
        if (!message || typeof message !== 'object' || !message.id) {
            console.warn('[Store] Invalid message rejected:', message);
            return state;
        }
        // Replace optimistic message by temp_id
        if (message.temp_id) {
            const exists = state.messages.some((m: any) => m.temp_id === message.temp_id);
            if (exists) {
                return {
                    messages: state.messages.map((m: any) => m.temp_id === message.temp_id ? message : m)
                };
            }
        }
        // Dedup by id
        if (state.messages.some((m: any) => m.id === message.id)) return state;
        return { messages: [...state.messages, message] };
    }),

    // Batch add messages (e.g. for loading history). Deduplicates against existing.
    addMessagesBatch: (newMsgs: any[]) => set((state: any) => {
        if (!Array.isArray(newMsgs) || newMsgs.length === 0) return state;
        const existingIds = new Set(state.messages.map((m: any) => m.id));
        const toAdd = newMsgs.filter((m: any) => m && m.id && !existingIds.has(m.id));
        if (toAdd.length === 0) return state;
        return { messages: [...state.messages, ...toAdd] };
    }),

    updateMessage: (id: any, updates: any) => set((state: any) => ({
        messages: state.messages.map((m: any) => m.id === id ? { ...m, ...updates } : m)
    })),

    removeMessage: (id: any) => set((state: any) => ({
        messages: state.messages.filter((m: any) => m.id !== id)
    })),

    // Bulk set with validation
    setMessages: (newMessages: any) => set((state: any) => {
        const resolved = typeof newMessages === 'function' ? newMessages(state.messages) : newMessages;
        const validMessages = Array.isArray(resolved)
            ? resolved.filter((m: any) => m && typeof m === 'object' && m.id)
            : [];
        return { messages: validMessages };
    }),

    prependMessages: (oldMessages: any[]) => set((state: any) => {
        // Dedup against existing
        const existingIds = new Set(state.messages.map((m: any) => m.id));
        const toAdd = oldMessages.filter((m: any) => m && m.id && !existingIds.has(m.id));
        return { messages: [...toAdd, ...state.messages] };
    }),

    // --- UNREAD (persistent) ---
    incrementUnread: (key: string) => set((state: any) => {
        const newCounts = {
            ...state.unreadCounts,
            [key]: (state.unreadCounts[key] || 0) + 1
        };
        persistUnread(newCounts);
        return { unreadCounts: newCounts };
    }),

    // --- USER STATE ---
    updateUserStatus: (userId: any, status: any) => set((state: any) => ({
        onlineUsers: state.onlineUsers.map((u: any) =>
            (u.id || u.user_id) === userId ? { ...u, status } : u
        )
    })),

    setOnlineUsers: (users: any) => set({ onlineUsers: users }),

    // --- TYPING (with timestamps — auto-expire stale entries) ---
    setTypingUser: (username: string, isTyping: boolean) => set((state: any) => {
        let entries: TypingEntry[] = [...(state._typingEntries || [])];
        const now = Date.now();

        // Prune stale entries first
        entries = entries.filter((e: TypingEntry) => now - e.timestamp < TYPING_TIMEOUT_MS);

        if (isTyping) {
            const existing = entries.findIndex((e: TypingEntry) => e.username === username);
            if (existing >= 0) {
                entries[existing] = { username, timestamp: now };
            } else {
                entries.push({ username, timestamp: now });
            }
        } else {
            entries = entries.filter((e: TypingEntry) => e.username !== username);
        }

        return {
            _typingEntries: entries,
            typingUsers: entries.map((e: TypingEntry) => e.username)
        };
    }),

    // --- VOICE ---
    setVoiceUsers: (usersMap: any) => set({ voiceUsers: usersMap }),
    setVoiceUsersState: (usersMap: any) => set({ voiceUsers: usersMap }),

    // --- SELECTION (use array for serializability) ---
    selectedMessages: new Set(),
    setSelectedMessages: (val: any) => set({ selectedMessages: typeof val === 'function' ? val(get().selectedMessages) : val }),

    // --- ENCRYPTION ---
    setEncryptionKey: (chatId: string, key: any) => set((state: any) => ({
        encryptionKeys: {
            ...state.encryptionKeys,
            [chatId]: key
        }
    })),

    // --- PERMISSIONS ---
    setPermissions: (perms: any) => set({
        currentPermissions: perms || {
            is_owner: false,
            can_manage_channels: false,
            can_delete_messages: false,
            can_manage_roles: false,
            can_ban_members: false
        }
    }),
}), { name: 'pawscord-chat-store' }));

// --- SELECTORS (prevent unnecessary re-renders) ---
export const useMessages = () => useChatStore((s) => s.messages);
export const useActiveChat = () => useChatStore((s) => s.activeChat);
export const useUnreadCounts = () => useChatStore((s) => s.unreadCounts);
export const useTypingUsers = () => useChatStore((s) => s.typingUsers);
export const useOnlineUsers = () => useChatStore((s) => s.onlineUsers);
export const useVoiceUsers = () => useChatStore((s) => s.voiceUsers);
export const usePermissions = () => useChatStore((s) => s.currentPermissions);
export const useConnectionState = () => useChatStore((s) => (s as any).connectionState);
export const useUnreadCount = (key: string) => useChatStore((s) => s.unreadCounts[key] || 0);


// frontend/src/__tests__/stores/chatStore.test.js
// Comprehensive Chat Store Tests — state, actions, dedup, unread, typing, selectors
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useChatStore } from '../../stores/useChatStore';

// Mock localStorage for unread persistence
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: vi.fn((key) => store[key] ?? null),
        setItem: vi.fn((key, value) => { store[key] = value; }),
        removeItem: vi.fn((key) => { delete store[key]; }),
        clear: vi.fn(() => { store = {}; }),
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const resetStore = () => {
    useChatStore.setState({
        messages: [],
        encryptionKeys: {},
        activeChat: { type: 'welcome', id: 'welcome', targetUser: null },
        unreadCounts: {},
        typingUsers: [],
        _typingEntries: [],
        onlineUsers: [],
        voiceUsers: {},
        connectionState: 'disconnected',
        selectedMessages: new Set(),
        currentPermissions: {
            is_owner: false,
            can_manage_channels: false,
            can_delete_messages: false,
            can_manage_roles: false,
            can_ban_members: false,
        },
    });
};

describe('useChatStore – Comprehensive', () => {
    beforeEach(() => {
        resetStore();
        localStorageMock.clear();
    });

    // ═══════════════════════════════════════════════════════════
    // INITIAL STATE
    // ═══════════════════════════════════════════════════════════
    describe('Initial State', () => {
        it('should initialise with empty messages', () => {
            expect(useChatStore.getState().messages).toEqual([]);
        });

        it('should initialise activeChat as welcome', () => {
            const { activeChat } = useChatStore.getState();
            expect(activeChat).toEqual({ type: 'welcome', id: 'welcome', targetUser: null });
        });

        it('should initialise unreadCounts as empty object', () => {
            expect(useChatStore.getState().unreadCounts).toEqual({});
        });

        it('should initialise typingUsers as empty array', () => {
            expect(useChatStore.getState().typingUsers).toEqual([]);
        });

        it('should initialise permissions with all false', () => {
            const p = useChatStore.getState().currentPermissions;
            expect(p.is_owner).toBe(false);
            expect(p.can_manage_channels).toBe(false);
            expect(p.can_delete_messages).toBe(false);
            expect(p.can_manage_roles).toBe(false);
            expect(p.can_ban_members).toBe(false);
        });

        it('should initialise connectionState as disconnected', () => {
            expect(useChatStore.getState().connectionState).toBe('disconnected');
        });
    });

    // ═══════════════════════════════════════════════════════════
    // setActiveChat
    // ═══════════════════════════════════════════════════════════
    describe('setActiveChat', () => {
        it('should accept positional arguments (type, id, targetUser)', () => {
            useChatStore.getState().setActiveChat('room', 'general', null);
            expect(useChatStore.getState().activeChat).toEqual({
                type: 'room', id: 'general', targetUser: null,
            });
        });

        it('should accept object argument with slug fallback', () => {
            useChatStore.getState().setActiveChat({ type: 'room', slug: 'lounge' });
            expect(useChatStore.getState().activeChat.id).toBe('lounge');
        });

        it('should accept object argument with id', () => {
            useChatStore.getState().setActiveChat({ type: 'dm', id: 42, targetUser: 'bob' });
            const ac = useChatStore.getState().activeChat;
            expect(ac.type).toBe('dm');
            expect(ac.id).toBe(42);
            expect(ac.targetUser).toBe('bob');
        });

        it('should default targetUser to null when not provided', () => {
            useChatStore.getState().setActiveChat('room', 'general');
            expect(useChatStore.getState().activeChat.targetUser).toBeNull();
        });

        it('should clear room unread count on switch', () => {
            useChatStore.setState({ unreadCounts: { 'room-dev': 7, 'dm-5': 3 } });
            useChatStore.getState().setActiveChat('room', 'dev');
            expect(useChatStore.getState().unreadCounts['room-dev']).toBeUndefined();
            expect(useChatStore.getState().unreadCounts['dm-5']).toBe(3);
        });

        it('should clear DM unread count on switch', () => {
            useChatStore.setState({ unreadCounts: { 'dm-10': 4 } });
            useChatStore.getState().setActiveChat('dm', 10, 'alice');
            expect(useChatStore.getState().unreadCounts['dm-10']).toBeUndefined();
        });
    });

    // ═══════════════════════════════════════════════════════════
    // addMessage — validation, dedup, temp_id
    // ═══════════════════════════════════════════════════════════
    describe('addMessage', () => {
        it('should add a valid message', () => {
            useChatStore.getState().addMessage({ id: 1, content: 'hi' });
            expect(useChatStore.getState().messages).toHaveLength(1);
        });

        it('should reject null / undefined / non-object', () => {
            useChatStore.getState().addMessage(null);
            useChatStore.getState().addMessage(undefined);
            useChatStore.getState().addMessage('string');
            expect(useChatStore.getState().messages).toHaveLength(0);
        });

        it('should reject message without id', () => {
            useChatStore.getState().addMessage({ content: 'no id' });
            expect(useChatStore.getState().messages).toHaveLength(0);
        });

        it('should deduplicate by id', () => {
            useChatStore.getState().addMessage({ id: 1, content: 'first' });
            useChatStore.getState().addMessage({ id: 1, content: 'dupe' });
            expect(useChatStore.getState().messages).toHaveLength(1);
            expect(useChatStore.getState().messages[0].content).toBe('first');
        });

        it('should replace optimistic message by temp_id', () => {
            useChatStore.getState().addMessage({ id: 'temp', temp_id: 't1', content: 'sending…' });
            useChatStore.getState().addMessage({ id: 99, temp_id: 't1', content: 'sent' });
            const msgs = useChatStore.getState().messages;
            expect(msgs).toHaveLength(1);
            expect(msgs[0].id).toBe(99);
            expect(msgs[0].content).toBe('sent');
        });

        it('should add multiple distinct messages', () => {
            useChatStore.getState().addMessage({ id: 1, content: 'a' });
            useChatStore.getState().addMessage({ id: 2, content: 'b' });
            useChatStore.getState().addMessage({ id: 3, content: 'c' });
            expect(useChatStore.getState().messages).toHaveLength(3);
        });
    });

    // ═══════════════════════════════════════════════════════════
    // addMessagesBatch
    // ═══════════════════════════════════════════════════════════
    describe('addMessagesBatch', () => {
        it('should batch-add messages with dedup', () => {
            useChatStore.getState().addMessage({ id: 1, content: 'existing' });
            useChatStore.getState().addMessagesBatch([
                { id: 1, content: 'dup' },
                { id: 2, content: 'new1' },
                { id: 3, content: 'new2' },
            ]);
            expect(useChatStore.getState().messages).toHaveLength(3);
        });

        it('should ignore empty array', () => {
            useChatStore.getState().addMessagesBatch([]);
            expect(useChatStore.getState().messages).toHaveLength(0);
        });

        it('should filter out invalid messages in batch', () => {
            useChatStore.getState().addMessagesBatch([
                { id: 1, content: 'ok' },
                null,
                { content: 'no id' },
            ]);
            expect(useChatStore.getState().messages).toHaveLength(1);
        });
    });

    // ═══════════════════════════════════════════════════════════
    // updateMessage / removeMessage
    // ═══════════════════════════════════════════════════════════
    describe('updateMessage', () => {
        it('should merge partial updates into matching message', () => {
            useChatStore.setState({ messages: [{ id: 1, content: 'old', pinned: false }] });
            useChatStore.getState().updateMessage(1, { content: 'new' });
            const msg = useChatStore.getState().messages[0];
            expect(msg.content).toBe('new');
            expect(msg.pinned).toBe(false); // preserved
        });

        it('should not affect non-matching messages', () => {
            useChatStore.setState({ messages: [{ id: 1, content: 'A' }, { id: 2, content: 'B' }] });
            useChatStore.getState().updateMessage(1, { content: 'X' });
            expect(useChatStore.getState().messages[1].content).toBe('B');
        });
    });

    describe('removeMessage', () => {
        it('should remove message by id', () => {
            useChatStore.setState({ messages: [{ id: 1 }, { id: 2 }, { id: 3 }] });
            useChatStore.getState().removeMessage(2);
            expect(useChatStore.getState().messages.map(m => m.id)).toEqual([1, 3]);
        });

        it('should be no-op if id not found', () => {
            useChatStore.setState({ messages: [{ id: 1 }] });
            useChatStore.getState().removeMessage(999);
            expect(useChatStore.getState().messages).toHaveLength(1);
        });
    });

    // ═══════════════════════════════════════════════════════════
    // setMessages / prependMessages
    // ═══════════════════════════════════════════════════════════
    describe('setMessages', () => {
        it('should replace messages with array', () => {
            useChatStore.setState({ messages: [{ id: 1 }] });
            useChatStore.getState().setMessages([{ id: 2, content: 'replaced' }]);
            expect(useChatStore.getState().messages).toHaveLength(1);
            expect(useChatStore.getState().messages[0].id).toBe(2);
        });

        it('should accept function updater', () => {
            useChatStore.setState({ messages: [{ id: 1, content: 'a' }] });
            useChatStore.getState().setMessages(prev => [...prev, { id: 2, content: 'b' }]);
            expect(useChatStore.getState().messages).toHaveLength(2);
        });

        it('should filter out invalid entries', () => {
            useChatStore.getState().setMessages([{ id: 1 }, null, { content: 'no id' }, { id: 3 }]);
            expect(useChatStore.getState().messages).toHaveLength(2);
        });

        it('should handle non-array gracefully', () => {
            useChatStore.getState().setMessages('not an array');
            expect(useChatStore.getState().messages).toEqual([]);
        });
    });

    describe('prependMessages', () => {
        it('should prepend older messages to front', () => {
            useChatStore.setState({ messages: [{ id: 10 }] });
            useChatStore.getState().prependMessages([{ id: 1 }, { id: 2 }]);
            const ids = useChatStore.getState().messages.map(m => m.id);
            expect(ids).toEqual([1, 2, 10]);
        });

        it('should deduplicate against existing', () => {
            useChatStore.setState({ messages: [{ id: 5 }] });
            useChatStore.getState().prependMessages([{ id: 5 }, { id: 3 }]);
            expect(useChatStore.getState().messages).toHaveLength(2);
            expect(useChatStore.getState().messages[0].id).toBe(3);
        });
    });

    // ═══════════════════════════════════════════════════════════
    // Unread Counts (persistent)
    // ═══════════════════════════════════════════════════════════
    describe('incrementUnread', () => {
        it('should create counter starting at 1', () => {
            useChatStore.getState().incrementUnread('room-general');
            expect(useChatStore.getState().unreadCounts['room-general']).toBe(1);
        });

        it('should increment existing counter', () => {
            useChatStore.setState({ unreadCounts: { 'room-general': 3 } });
            useChatStore.getState().incrementUnread('room-general');
            expect(useChatStore.getState().unreadCounts['room-general']).toBe(4);
        });

        it('should persist to localStorage', () => {
            useChatStore.getState().incrementUnread('dm-5');
            expect(localStorageMock.setItem).toHaveBeenCalled();
        });
    });

    // ═══════════════════════════════════════════════════════════
    // Typing Users (with timestamps)
    // ═══════════════════════════════════════════════════════════
    describe('setTypingUser', () => {
        it('should add typing user', () => {
            useChatStore.getState().setTypingUser('alice', true);
            expect(useChatStore.getState().typingUsers).toContain('alice');
        });

        it('should remove typing user', () => {
            useChatStore.getState().setTypingUser('alice', true);
            useChatStore.getState().setTypingUser('alice', false);
            expect(useChatStore.getState().typingUsers).not.toContain('alice');
        });

        it('should not duplicate on repeated typing=true', () => {
            useChatStore.getState().setTypingUser('bob', true);
            useChatStore.getState().setTypingUser('bob', true);
            const count = useChatStore.getState().typingUsers.filter(u => u === 'bob').length;
            expect(count).toBe(1);
        });

        it('should handle multiple users typing', () => {
            useChatStore.getState().setTypingUser('alice', true);
            useChatStore.getState().setTypingUser('bob', true);
            useChatStore.getState().setTypingUser('charlie', true);
            expect(useChatStore.getState().typingUsers).toHaveLength(3);
        });

        it('should maintain other users when one stops', () => {
            useChatStore.getState().setTypingUser('alice', true);
            useChatStore.getState().setTypingUser('bob', true);
            useChatStore.getState().setTypingUser('alice', false);
            expect(useChatStore.getState().typingUsers).toEqual(['bob']);
        });
    });

    // ═══════════════════════════════════════════════════════════
    // Connection State
    // ═══════════════════════════════════════════════════════════
    describe('setConnectionState', () => {
        it('should update connectionState', () => {
            useChatStore.getState().setConnectionState('connected');
            expect(useChatStore.getState().connectionState).toBe('connected');
        });

        it('should cycle through states', () => {
            useChatStore.getState().setConnectionState('connecting');
            expect(useChatStore.getState().connectionState).toBe('connecting');
            useChatStore.getState().setConnectionState('connected');
            expect(useChatStore.getState().connectionState).toBe('connected');
            useChatStore.getState().setConnectionState('disconnected');
            expect(useChatStore.getState().connectionState).toBe('disconnected');
        });
    });

    // ═══════════════════════════════════════════════════════════
    // Miscellaneous setters
    // ═══════════════════════════════════════════════════════════
    describe('Misc setters', () => {
        it('setOnlineUsers replaces list', () => {
            useChatStore.getState().setOnlineUsers([{ id: 1 }, { id: 2 }]);
            expect(useChatStore.getState().onlineUsers).toHaveLength(2);
        });

        it('setVoiceUsers sets map', () => {
            useChatStore.getState().setVoiceUsers({ r1: ['u1'] });
            expect(useChatStore.getState().voiceUsers).toEqual({ r1: ['u1'] });
        });

        it('setEncryptionKey stores key per chatId', () => {
            useChatStore.getState().setEncryptionKey('room-1', 'key123');
            useChatStore.getState().setEncryptionKey('room-2', 'key456');
            expect(useChatStore.getState().encryptionKeys).toEqual({ 'room-1': 'key123', 'room-2': 'key456' });
        });

        it('setPermissions sets provided permissions', () => {
            useChatStore.getState().setPermissions({ is_owner: true, can_manage_channels: true, can_delete_messages: false, can_manage_roles: false, can_ban_members: true });
            expect(useChatStore.getState().currentPermissions.is_owner).toBe(true);
        });

        it('setPermissions resets to defaults on null', () => {
            useChatStore.getState().setPermissions({ is_owner: true });
            useChatStore.getState().setPermissions(null);
            expect(useChatStore.getState().currentPermissions.is_owner).toBe(false);
        });

        it('updateUserStatus updates user status in onlineUsers', () => {
            useChatStore.setState({ onlineUsers: [{ id: 1, status: 'online' }, { id: 2, status: 'idle' }] });
            useChatStore.getState().updateUserStatus(1, 'dnd');
            const user = useChatStore.getState().onlineUsers.find(u => u.id === 1);
            expect(user.status).toBe('dnd');
        });
    });
});

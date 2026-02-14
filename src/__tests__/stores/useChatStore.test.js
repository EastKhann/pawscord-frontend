// frontend/src/__tests__/stores/useChatStore.test.js
// 🧪 Chat Store Unit Tests — Tests real Zustand store logic
import { describe, it, expect, beforeEach } from 'vitest';
import { useChatStore } from '../../stores/useChatStore';

describe('useChatStore', () => {
    beforeEach(() => {
        // Reset store to initial state
        useChatStore.setState({
            messages: [],
            encryptionKeys: {},
            activeChat: { type: 'welcome', id: 'welcome', targetUser: null },
            unreadCounts: {},
            typingUsers: [],
            onlineUsers: [],
            voiceUsers: {},
            currentPermissions: {
                is_owner: false,
                can_manage_channels: false,
                can_delete_messages: false,
                can_manage_roles: false,
                can_ban_members: false
            },
        });
    });

    // ─── INITIAL STATE ───
    describe('Initial State', () => {
        it('should have empty messages array', () => {
            expect(useChatStore.getState().messages).toEqual([]);
        });

        it('should have welcome activeChat', () => {
            const { activeChat } = useChatStore.getState();
            expect(activeChat.type).toBe('welcome');
            expect(activeChat.id).toBe('welcome');
            expect(activeChat.targetUser).toBeNull();
        });

        it('should have empty unreadCounts, typingUsers, onlineUsers', () => {
            const state = useChatStore.getState();
            expect(state.unreadCounts).toEqual({});
            expect(state.typingUsers).toEqual([]);
            expect(state.onlineUsers).toEqual([]);
        });

        it('should have default permissions (all false)', () => {
            const { currentPermissions } = useChatStore.getState();
            expect(currentPermissions.is_owner).toBe(false);
            expect(currentPermissions.can_manage_channels).toBe(false);
            expect(currentPermissions.can_delete_messages).toBe(false);
            expect(currentPermissions.can_manage_roles).toBe(false);
            expect(currentPermissions.can_ban_members).toBe(false);
        });
    });

    // ─── SET ACTIVE CHAT ───
    describe('setActiveChat', () => {
        it('should set activeChat with positional args', () => {
            useChatStore.getState().setActiveChat('room', 'general', null);
            const { activeChat } = useChatStore.getState();
            expect(activeChat.type).toBe('room');
            expect(activeChat.id).toBe('general');
            expect(activeChat.targetUser).toBeNull();
        });

        it('should set activeChat for DM with targetUser', () => {
            useChatStore.getState().setActiveChat('dm', 5, 'testuser');
            const { activeChat } = useChatStore.getState();
            expect(activeChat.type).toBe('dm');
            expect(activeChat.id).toBe(5);
            expect(activeChat.targetUser).toBe('testuser');
        });

        it('should set activeChat with object arg', () => {
            useChatStore.getState().setActiveChat({ type: 'room', slug: 'general' });
            const { activeChat } = useChatStore.getState();
            expect(activeChat.type).toBe('room');
            expect(activeChat.id).toBe('general');
        });

        it('should default targetUser to null', () => {
            useChatStore.getState().setActiveChat('room', 'general');
            expect(useChatStore.getState().activeChat.targetUser).toBeNull();
        });

        it('should clear unread count for room key on switch', () => {
            useChatStore.setState({ unreadCounts: { 'room-general': 5, 'dm-3': 2 } });
            useChatStore.getState().setActiveChat('room', 'general');
            expect(useChatStore.getState().unreadCounts['room-general']).toBeUndefined();
            expect(useChatStore.getState().unreadCounts['dm-3']).toBe(2);
        });

        it('should clear unread count for dm key on switch', () => {
            useChatStore.setState({ unreadCounts: { 'room-general': 5, 'dm-3': 2 } });
            useChatStore.getState().setActiveChat('dm', 3, 'user');
            expect(useChatStore.getState().unreadCounts['dm-3']).toBeUndefined();
            expect(useChatStore.getState().unreadCounts['room-general']).toBe(5);
        });
    });

    // ─── ADD MESSAGE ───
    describe('addMessage', () => {
        it('should append a valid message', () => {
            useChatStore.getState().addMessage({ id: 1, content: 'Hello' });
            expect(useChatStore.getState().messages).toHaveLength(1);
            expect(useChatStore.getState().messages[0].content).toBe('Hello');
        });

        it('should reject message without id', () => {
            useChatStore.getState().addMessage({ content: 'No ID' });
            expect(useChatStore.getState().messages).toHaveLength(0);
        });

        it('should reject null message', () => {
            useChatStore.getState().addMessage(null);
            expect(useChatStore.getState().messages).toHaveLength(0);
        });

        it('should reject undefined message', () => {
            useChatStore.getState().addMessage(undefined);
            expect(useChatStore.getState().messages).toHaveLength(0);
        });

        it('should deduplicate by id', () => {
            useChatStore.getState().addMessage({ id: 1, content: 'First' });
            useChatStore.getState().addMessage({ id: 1, content: 'Duplicate' });
            expect(useChatStore.getState().messages).toHaveLength(1);
            expect(useChatStore.getState().messages[0].content).toBe('First');
        });

        it('should update existing message matching temp_id', () => {
            useChatStore.getState().addMessage({ id: 'temp', temp_id: 'abc123', content: 'Sending...' });
            useChatStore.getState().addMessage({ id: 100, temp_id: 'abc123', content: 'Sent!' });
            expect(useChatStore.getState().messages).toHaveLength(1);
            expect(useChatStore.getState().messages[0].id).toBe(100);
            expect(useChatStore.getState().messages[0].content).toBe('Sent!');
        });
    });

    // ─── UPDATE MESSAGE ───
    describe('updateMessage', () => {
        it('should merge partial updates into matching message', () => {
            useChatStore.setState({ messages: [{ id: 1, content: 'Old', reactions: [] }] });
            useChatStore.getState().updateMessage(1, { content: 'Updated' });
            expect(useChatStore.getState().messages[0].content).toBe('Updated');
            expect(useChatStore.getState().messages[0].reactions).toEqual([]);
        });

        it('should not modify non-matching messages', () => {
            useChatStore.setState({ messages: [{ id: 1, content: 'A' }, { id: 2, content: 'B' }] });
            useChatStore.getState().updateMessage(1, { content: 'Updated' });
            expect(useChatStore.getState().messages[1].content).toBe('B');
        });
    });

    // ─── SET MESSAGES ───
    describe('setMessages', () => {
        it('should replace all messages with array', () => {
            useChatStore.setState({ messages: [{ id: 1, content: 'Old' }] });
            useChatStore.getState().setMessages([{ id: 2, content: 'New' }]);
            expect(useChatStore.getState().messages).toHaveLength(1);
            expect(useChatStore.getState().messages[0].id).toBe(2);
        });

        it('should accept function updater', () => {
            useChatStore.setState({ messages: [{ id: 1, content: 'A' }] });
            useChatStore.getState().setMessages((prev) => [...prev, { id: 2, content: 'B' }]);
            expect(useChatStore.getState().messages).toHaveLength(2);
        });

        it('should filter out invalid entries (no id)', () => {
            useChatStore.getState().setMessages([
                { id: 1, content: 'Valid' },
                { content: 'No ID' },
                null,
                { id: 3, content: 'Also valid' }
            ]);
            expect(useChatStore.getState().messages).toHaveLength(2);
        });
    });

    // ─── PREPEND MESSAGES ───
    describe('prependMessages', () => {
        it('should prepend old messages to beginning', () => {
            useChatStore.setState({ messages: [{ id: 10, content: 'Current' }] });
            useChatStore.getState().prependMessages([{ id: 1, content: 'Old' }]);
            const msgs = useChatStore.getState().messages;
            expect(msgs).toHaveLength(2);
            expect(msgs[0].id).toBe(1);
            expect(msgs[1].id).toBe(10);
        });
    });

    // ─── UNREAD COUNTS ───
    describe('incrementUnread', () => {
        it('should increment counter for new key', () => {
            useChatStore.getState().incrementUnread('room-general');
            expect(useChatStore.getState().unreadCounts['room-general']).toBe(1);
        });

        it('should increment existing counter', () => {
            useChatStore.setState({ unreadCounts: { 'room-general': 3 } });
            useChatStore.getState().incrementUnread('room-general');
            expect(useChatStore.getState().unreadCounts['room-general']).toBe(4);
        });
    });

    // ─── TYPING USERS ───
    describe('setTypingUser', () => {
        it('should add username when typing=true', () => {
            useChatStore.getState().setTypingUser('alice', true);
            expect(useChatStore.getState().typingUsers).toContain('alice');
        });

        it('should remove username when typing=false', () => {
            useChatStore.setState({ typingUsers: ['alice', 'bob'] });
            useChatStore.getState().setTypingUser('alice', false);
            expect(useChatStore.getState().typingUsers).not.toContain('alice');
            expect(useChatStore.getState().typingUsers).toContain('bob');
        });

        it('should not add duplicate username', () => {
            useChatStore.getState().setTypingUser('alice', true);
            useChatStore.getState().setTypingUser('alice', true);
            expect(useChatStore.getState().typingUsers.filter(u => u === 'alice')).toHaveLength(1);
        });
    });

    // ─── OTHER SETTERS ───
    describe('Other setters', () => {
        it('setOnlineUsers replaces online list', () => {
            useChatStore.getState().setOnlineUsers(['alice', 'bob']);
            expect(useChatStore.getState().onlineUsers).toEqual(['alice', 'bob']);
        });

        it('setVoiceUsers replaces voice map', () => {
            useChatStore.getState().setVoiceUsers({ room1: ['alice'] });
            expect(useChatStore.getState().voiceUsers).toEqual({ room1: ['alice'] });
        });

        it('setEncryptionKey stores key per chatId', () => {
            useChatStore.getState().setEncryptionKey('room-1', 'mykey123');
            expect(useChatStore.getState().encryptionKeys['room-1']).toBe('mykey123');
        });

        it('setPermissions sets provided permissions', () => {
            useChatStore.getState().setPermissions({ is_owner: true, can_manage_channels: true, can_delete_messages: false, can_manage_roles: false, can_ban_members: true });
            const perms = useChatStore.getState().currentPermissions;
            expect(perms.is_owner).toBe(true);
            expect(perms.can_ban_members).toBe(true);
        });

        it('setPermissions resets to defaults on null', () => {
            useChatStore.getState().setPermissions({ is_owner: true });
            useChatStore.getState().setPermissions(null);
            expect(useChatStore.getState().currentPermissions.is_owner).toBe(false);
        });
    });
});

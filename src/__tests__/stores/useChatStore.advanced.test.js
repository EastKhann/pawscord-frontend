// frontend/src/__tests__/stores/useChatStore.advanced.test.js
// Advanced Chat Store Tests — batch ops, selectors, connection, encryption, edge cases
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useChatStore, useMessages, useActiveChat, useUnreadCounts, useTypingUsers, useConnectionState } from '../../stores/useChatStore';

describe('useChatStore — Advanced', () => {
    beforeEach(() => {
        useChatStore.setState({
            messages: [],
            encryptionKeys: {},
            activeChat: { type: 'welcome', id: 'welcome', targetUser: null },
            unreadCounts: {},
            typingUsers: [],
            _typingEntries: [],
            onlineUsers: [],
            voiceUsers: {},
            selectedMessages: new Set(),
            connectionState: 'disconnected',
            currentPermissions: {
                is_owner: false,
                can_manage_channels: false,
                can_delete_messages: false,
                can_manage_roles: false,
                can_ban_members: false,
            },
        });
    });

    // ─── BATCH OPERATIONS ───
    describe('addMessagesBatch', () => {
        it('should add multiple messages at once', () => {
            const batch = [
                { id: 1, content: 'Hello' },
                { id: 2, content: 'World' },
                { id: 3, content: '!' },
            ];
            useChatStore.getState().addMessagesBatch(batch);
            expect(useChatStore.getState().messages).toHaveLength(3);
        });

        it('should deduplicate against existing messages', () => {
            useChatStore.setState({ messages: [{ id: 1, content: 'Existing' }] });
            useChatStore.getState().addMessagesBatch([
                { id: 1, content: 'Duplicate' },
                { id: 2, content: 'New' },
            ]);
            expect(useChatStore.getState().messages).toHaveLength(2);
            expect(useChatStore.getState().messages[0].content).toBe('Existing');
        });

        it('should handle empty array gracefully', () => {
            useChatStore.setState({ messages: [{ id: 1, content: 'A' }] });
            useChatStore.getState().addMessagesBatch([]);
            expect(useChatStore.getState().messages).toHaveLength(1);
        });

        it('should filter out invalid messages in batch', () => {
            useChatStore.getState().addMessagesBatch([
                { id: 1, content: 'Valid' },
                null,
                { content: 'No ID' },
                { id: 3, content: 'Also valid' },
            ]);
            expect(useChatStore.getState().messages).toHaveLength(2);
        });

        it('should not mutate state when all messages are duplicates', () => {
            const initial = [{ id: 1, content: 'A' }, { id: 2, content: 'B' }];
            useChatStore.setState({ messages: initial });
            useChatStore.getState().addMessagesBatch([{ id: 1 }, { id: 2 }]);
            expect(useChatStore.getState().messages).toHaveLength(2);
        });
    });

    // ─── PREPEND MESSAGES ───
    describe('prependMessages — advanced', () => {
        it('should prepend maintaining order', () => {
            useChatStore.setState({ messages: [{ id: 10, content: 'Recent' }] });
            useChatStore.getState().prependMessages([
                { id: 1, content: 'Old 1' },
                { id: 2, content: 'Old 2' },
            ]);
            const msgs = useChatStore.getState().messages;
            expect(msgs).toHaveLength(3);
            expect(msgs[0].id).toBe(1);
            expect(msgs[1].id).toBe(2);
            expect(msgs[2].id).toBe(10);
        });

        it('should deduplicate prepended messages', () => {
            useChatStore.setState({ messages: [{ id: 5, content: 'Existing' }] });
            useChatStore.getState().prependMessages([
                { id: 5, content: 'Duplicate' },
                { id: 3, content: 'New old' },
            ]);
            expect(useChatStore.getState().messages).toHaveLength(2);
            expect(useChatStore.getState().messages[0].id).toBe(3);
        });
    });

    // ─── REMOVE MESSAGE ───
    describe('removeMessage', () => {
        it('should remove a message by id', () => {
            useChatStore.setState({
                messages: [
                    { id: 1, content: 'A' },
                    { id: 2, content: 'B' },
                    { id: 3, content: 'C' },
                ],
            });
            useChatStore.getState().removeMessage(2);
            const msgs = useChatStore.getState().messages;
            expect(msgs).toHaveLength(2);
            expect(msgs.find(m => m.id === 2)).toBeUndefined();
        });

        it('should not change state for non-existent id', () => {
            useChatStore.setState({ messages: [{ id: 1, content: 'A' }] });
            useChatStore.getState().removeMessage(999);
            expect(useChatStore.getState().messages).toHaveLength(1);
        });
    });

    // ─── CONNECTION STATE ───
    describe('setConnectionState', () => {
        it('should update connection state to connected', () => {
            useChatStore.getState().setConnectionState('connected');
            expect(useChatStore.getState().connectionState).toBe('connected');
        });

        it('should update connection state to reconnecting', () => {
            useChatStore.getState().setConnectionState('reconnecting');
            expect(useChatStore.getState().connectionState).toBe('reconnecting');
        });

        it('should transition through multiple states', () => {
            const store = useChatStore.getState();
            store.setConnectionState('connecting');
            expect(useChatStore.getState().connectionState).toBe('connecting');
            store.setConnectionState('connected');
            expect(useChatStore.getState().connectionState).toBe('connected');
            store.setConnectionState('disconnected');
            expect(useChatStore.getState().connectionState).toBe('disconnected');
        });
    });

    // ─── ENCRYPTION KEYS ───
    describe('setEncryptionKey — advanced', () => {
        it('should store multiple encryption keys', () => {
            const store = useChatStore.getState();
            store.setEncryptionKey('room-1', 'key-aaa');
            store.setEncryptionKey('room-2', 'key-bbb');
            store.setEncryptionKey('dm-5', 'key-ccc');
            const keys = useChatStore.getState().encryptionKeys;
            expect(keys['room-1']).toBe('key-aaa');
            expect(keys['room-2']).toBe('key-bbb');
            expect(keys['dm-5']).toBe('key-ccc');
        });

        it('should overwrite existing key for same chatId', () => {
            useChatStore.getState().setEncryptionKey('room-1', 'old-key');
            useChatStore.getState().setEncryptionKey('room-1', 'new-key');
            expect(useChatStore.getState().encryptionKeys['room-1']).toBe('new-key');
        });
    });

    // ─── SELECTED MESSAGES ───
    describe('setSelectedMessages', () => {
        it('should set selected messages directly', () => {
            const selected = new Set([1, 2, 3]);
            useChatStore.getState().setSelectedMessages(selected);
            expect(useChatStore.getState().selectedMessages).toEqual(selected);
        });

        it('should accept function updater', () => {
            useChatStore.setState({ selectedMessages: new Set([1]) });
            useChatStore.getState().setSelectedMessages(prev => {
                const next = new Set(prev);
                next.add(2);
                return next;
            });
            expect(useChatStore.getState().selectedMessages.has(2)).toBe(true);
        });
    });

    // ─── USER STATUS UPDATES ───
    describe('updateUserStatus', () => {
        it('should update status for matching user by id', () => {
            useChatStore.setState({
                onlineUsers: [
                    { id: 1, username: 'alice', status: 'online' },
                    { id: 2, username: 'bob', status: 'online' },
                ],
            });
            useChatStore.getState().updateUserStatus(1, 'idle');
            const users = useChatStore.getState().onlineUsers;
            expect(users.find(u => u.id === 1).status).toBe('idle');
            expect(users.find(u => u.id === 2).status).toBe('online');
        });

        it('should handle user_id field', () => {
            useChatStore.setState({
                onlineUsers: [{ user_id: 10, username: 'charlie', status: 'online' }],
            });
            useChatStore.getState().updateUserStatus(10, 'dnd');
            expect(useChatStore.getState().onlineUsers[0].status).toBe('dnd');
        });
    });

    // ─── TYPING WITH TIMESTAMPS ───
    describe('setTypingUser — timestamp expiry', () => {
        it('should update timestamp for existing typing user', () => {
            useChatStore.getState().setTypingUser('alice', true);
            const entries1 = useChatStore.getState()._typingEntries;
            expect(entries1).toHaveLength(1);

            // Re-set same user
            useChatStore.getState().setTypingUser('alice', true);
            const entries2 = useChatStore.getState()._typingEntries;
            expect(entries2).toHaveLength(1);
        });

        it('should track multiple typing users', () => {
            useChatStore.getState().setTypingUser('alice', true);
            useChatStore.getState().setTypingUser('bob', true);
            useChatStore.getState().setTypingUser('charlie', true);
            expect(useChatStore.getState().typingUsers).toHaveLength(3);
            expect(useChatStore.getState().typingUsers).toContain('alice');
            expect(useChatStore.getState().typingUsers).toContain('bob');
            expect(useChatStore.getState().typingUsers).toContain('charlie');
        });

        it('should remove specific user from typing', () => {
            useChatStore.getState().setTypingUser('alice', true);
            useChatStore.getState().setTypingUser('bob', true);
            useChatStore.getState().setTypingUser('alice', false);
            expect(useChatStore.getState().typingUsers).toEqual(['bob']);
        });
    });

    // ─── UNREAD COUNTS — ADVANCED ───
    describe('Unread counts — advanced', () => {
        it('should track multiple room unreads independently', () => {
            const store = useChatStore.getState();
            store.incrementUnread('room-general');
            store.incrementUnread('room-general');
            store.incrementUnread('room-random');
            expect(useChatStore.getState().unreadCounts['room-general']).toBe(2);
            expect(useChatStore.getState().unreadCounts['room-random']).toBe(1);
        });

        it('should clear specific unread on setActiveChat', () => {
            useChatStore.setState({ unreadCounts: { 'room-a': 5, 'room-b': 3, 'dm-1': 7 } });
            useChatStore.getState().setActiveChat('room', 'a');
            const counts = useChatStore.getState().unreadCounts;
            expect(counts['room-a']).toBeUndefined();
            expect(counts['room-b']).toBe(3);
            expect(counts['dm-1']).toBe(7);
        });
    });

    // ─── PERMISSIONS — EDGE CASES ───
    describe('setPermissions — edge cases', () => {
        it('should set partial permissions object', () => {
            useChatStore.getState().setPermissions({
                is_owner: true,
                can_manage_channels: false,
                can_delete_messages: true,
                can_manage_roles: false,
                can_ban_members: false,
            });
            const perms = useChatStore.getState().currentPermissions;
            expect(perms.is_owner).toBe(true);
            expect(perms.can_delete_messages).toBe(true);
            expect(perms.can_manage_roles).toBe(false);
        });
    });

    // ─── SET MESSAGES — ADVANCED ───
    describe('setMessages — advanced', () => {
        it('should accept function that filters messages', () => {
            useChatStore.setState({
                messages: [
                    { id: 1, content: 'keep', pinned: true },
                    { id: 2, content: 'remove', pinned: false },
                ],
            });
            useChatStore.getState().setMessages(prev => prev.filter(m => m.pinned));
            expect(useChatStore.getState().messages).toHaveLength(1);
            expect(useChatStore.getState().messages[0].id).toBe(1);
        });

        it('should handle non-array input gracefully', () => {
            useChatStore.getState().setMessages('invalid');
            expect(useChatStore.getState().messages).toEqual([]);
        });

        it('should handle null input gracefully', () => {
            useChatStore.getState().setMessages(null);
            expect(useChatStore.getState().messages).toEqual([]);
        });
    });
});

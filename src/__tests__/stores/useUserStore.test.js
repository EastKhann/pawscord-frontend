// frontend/src/__tests__/stores/useUserStore.test.js
// User Store Unit Tests
import { describe, it, expect, beforeEach } from 'vitest';
import { useUserStore } from '../../stores/useUserStore';

describe('useUserStore', () => {
    beforeEach(() => {
        // Reset to initial state
        useUserStore.setState({
            currentUser: null,
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            profile: {
                username: '',
                email: '',
                avatar: null,
                status: 'online',
                statusMessage: '',
                friendCode: '',
            },
            friends: [],
            incomingRequests: [],
            outgoingRequests: [],
            blockedUsers: [],
            preferences: {
                notificationsEnabled: true,
                soundEnabled: true,
                desktopNotifications: true,
                compactMode: false,
            },
        });
    });

    // ─── INITIAL STATE ───
    describe('Initial State', () => {
        it('should not be authenticated initially', () => {
            expect(useUserStore.getState().isAuthenticated).toBe(false);
        });

        it('should have null currentUser', () => {
            expect(useUserStore.getState().currentUser).toBeNull();
        });

        it('should have null tokens', () => {
            expect(useUserStore.getState().accessToken).toBeNull();
            expect(useUserStore.getState().refreshToken).toBeNull();
        });

        it('should have empty friends list', () => {
            expect(useUserStore.getState().friends).toEqual([]);
        });

        it('should have default preferences', () => {
            const prefs = useUserStore.getState().preferences;
            expect(prefs.notificationsEnabled).toBe(true);
            expect(prefs.soundEnabled).toBe(true);
            expect(prefs.compactMode).toBe(false);
        });
    });

    // ─── SET USER ───
    describe('setUser', () => {
        it('should set current user and authenticate', () => {
            useUserStore.getState().setUser({ id: 1, username: 'testuser' });
            expect(useUserStore.getState().currentUser).toEqual({ id: 1, username: 'testuser' });
            expect(useUserStore.getState().isAuthenticated).toBe(true);
        });

        it('should set isAuthenticated false when user is null', () => {
            useUserStore.getState().setUser({ id: 1, username: 'test' });
            useUserStore.getState().setUser(null);
            expect(useUserStore.getState().isAuthenticated).toBe(false);
        });
    });

    // ─── TOKENS ───
    describe('setTokens', () => {
        it('should set access and refresh tokens', () => {
            useUserStore.getState().setTokens('access123', 'refresh456');
            expect(useUserStore.getState().accessToken).toBe('access123');
            expect(useUserStore.getState().refreshToken).toBe('refresh456');
        });
    });

    // ─── CLEAR AUTH ───
    describe('clearAuth', () => {
        it('should clear all auth state', () => {
            useUserStore.getState().setUser({ id: 1, username: 'test' });
            useUserStore.getState().setTokens('a', 'r');
            useUserStore.getState().clearAuth();

            const state = useUserStore.getState();
            expect(state.currentUser).toBeNull();
            expect(state.isAuthenticated).toBe(false);
            expect(state.accessToken).toBeNull();
            expect(state.refreshToken).toBeNull();
        });

        it('should reset profile to defaults', () => {
            useUserStore.getState().setProfile({ username: 'test', email: 'test@t.com' });
            useUserStore.getState().clearAuth();

            const profile = useUserStore.getState().profile;
            expect(profile.username).toBe('');
            expect(profile.email).toBe('');
            expect(profile.status).toBe('online');
        });
    });

    // ─── PROFILE ───
    describe('setProfile', () => {
        it('should merge profile data', () => {
            useUserStore.getState().setProfile({ username: 'alice', email: 'alice@test.com' });
            const profile = useUserStore.getState().profile;
            expect(profile.username).toBe('alice');
            expect(profile.email).toBe('alice@test.com');
            // Other fields should be preserved
            expect(profile.status).toBe('online');
        });
    });

    describe('setStatus', () => {
        it('should update user status', () => {
            useUserStore.getState().setStatus('idle');
            expect(useUserStore.getState().profile.status).toBe('idle');
        });
    });

    describe('setStatusMessage', () => {
        it('should update status message', () => {
            useUserStore.getState().setStatusMessage('AFK');
            expect(useUserStore.getState().profile.statusMessage).toBe('AFK');
        });
    });

    // ─── FRIENDS ───
    describe('Friends management', () => {
        it('setFriends should replace list', () => {
            const friends = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
            useUserStore.getState().setFriends(friends);
            expect(useUserStore.getState().friends).toHaveLength(2);
        });

        it('addFriend should append to list', () => {
            useUserStore.getState().setFriends([{ id: 1, name: 'Alice' }]);
            useUserStore.getState().addFriend({ id: 2, name: 'Bob' });
            expect(useUserStore.getState().friends).toHaveLength(2);
        });

        it('removeFriend should filter by id', () => {
            useUserStore.getState().setFriends([
                { id: 1, name: 'Alice' },
                { id: 2, name: 'Bob' },
            ]);
            useUserStore.getState().removeFriend(1);
            expect(useUserStore.getState().friends).toHaveLength(1);
            expect(useUserStore.getState().friends[0].id).toBe(2);
        });

        it('setIncomingRequests should update', () => {
            useUserStore.getState().setIncomingRequests([{ id: 10 }]);
            expect(useUserStore.getState().incomingRequests).toHaveLength(1);
        });

        it('setOutgoingRequests should update', () => {
            useUserStore.getState().setOutgoingRequests([{ id: 20 }]);
            expect(useUserStore.getState().outgoingRequests).toHaveLength(1);
        });
    });

    // ─── BLOCK/UNBLOCK ───
    describe('Block management', () => {
        it('blockUser should add userId', () => {
            useUserStore.getState().blockUser(42);
            expect(useUserStore.getState().blockedUsers).toContain(42);
        });

        it('unblockUser should remove userId', () => {
            useUserStore.setState({ blockedUsers: [1, 2, 3] });
            useUserStore.getState().unblockUser(2);
            expect(useUserStore.getState().blockedUsers).toEqual([1, 3]);
        });
    });

    // ─── PREFERENCES ───
    describe('updatePreferences', () => {
        it('should merge partial preferences', () => {
            useUserStore.getState().updatePreferences({ compactMode: true });
            const prefs = useUserStore.getState().preferences;
            expect(prefs.compactMode).toBe(true);
            expect(prefs.soundEnabled).toBe(true); // preserved
        });

        it('should update multiple prefs at once', () => {
            useUserStore.getState().updatePreferences({
                soundEnabled: false,
                desktopNotifications: false,
            });
            const prefs = useUserStore.getState().preferences;
            expect(prefs.soundEnabled).toBe(false);
            expect(prefs.desktopNotifications).toBe(false);
        });
    });
});

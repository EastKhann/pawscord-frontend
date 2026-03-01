// frontend/src/stores/useUserStore.ts
// User and authentication state management

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import type { UserStore } from '../types/store';

export const useUserStore = create<UserStore>()(
    devtools(persist(
        (set, get) => ({
            // --- USER STATE ---
            currentUser: null,
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,

            // --- PROFILE ---
            profile: {
                username: '',
                email: '',
                avatar: null,
                status: 'online',
                statusMessage: '',
                friendCode: '',
            },

            // --- FRIENDS ---
            friends: [],
            incomingRequests: [],
            outgoingRequests: [],
            blockedUsers: [],

            // --- PREFERENCES ---
            preferences: {
                notificationsEnabled: true,
                soundEnabled: true,
                desktopNotifications: true,
                compactMode: false,
            },

            // --- ACTIONS ---
            /** Set the current user and mark as authenticated. */
            setUser: (user) => set({
                currentUser: user,
                isAuthenticated: !!user,
            }),

            /** Set access and refresh tokens. */
            setTokens: (access, refresh) => set({
                accessToken: access,
                refreshToken: refresh,
            }),

            /** Clear all auth state (logout). */
            clearAuth: () => set({
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
            }),

            /** Update user profile fields. */
            setProfile: (profileData) => set((state) => ({
                profile: { ...state.profile, ...profileData }
            })),

            /** Set the user's online status. */
            setStatus: (status) => set((state) => ({
                profile: { ...state.profile, status }
            })),

            /** Set the user's custom status message. */
            setStatusMessage: (message) => set((state) => ({
                profile: { ...state.profile, statusMessage: message }
            })),

            // Friends
            /** Replace the friends list. */
            setFriends: (friends) => set({ friends }),
            /** Add a friend to the list. */
            addFriend: (friend) => set((state) => ({
                friends: [...state.friends, friend]
            })),
            /** Remove a friend by user ID. */
            removeFriend: (userId) => set((state) => ({
                friends: state.friends.filter(f => f.id !== userId)
            })),

            setIncomingRequests: (requests) => set({ incomingRequests: requests }),
            setOutgoingRequests: (requests) => set({ outgoingRequests: requests }),

            // Block
            blockUser: (userId) => set((state) => ({
                blockedUsers: [...state.blockedUsers, userId]
            })),
            unblockUser: (userId) => set((state) => ({
                blockedUsers: state.blockedUsers.filter(id => id !== userId)
            })),

            // Preferences
            /** Update user preferences (merge). */
            updatePreferences: (prefs) => set((state) => ({
                preferences: { ...state.preferences, ...prefs }
            })),

            // --- RESET (for testing / logout) ---
            /** Reset all user state to initial values. */
            reset: () => set({
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
            }),
        }),
        {
            name: 'pawscord-user-store',
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                preferences: state.preferences,
            }),
        }
    ), { name: 'pawscord-user-store' })
);

// --- SELECTORS (prevent unnecessary re-renders) ---
/** Select the current user object. */
export const selectCurrentUser = (state: UserStore) => state.currentUser;
/** Select whether the user is authenticated. */
export const selectIsAuthenticated = (state: UserStore) => state.isAuthenticated;
/** Select the user's profile data. */
export const selectProfile = (state: UserStore) => state.profile;
/** Select the user's online status. */
export const selectUserStatus = (state: UserStore) => state.profile.status;
/** Select the friends list. */
export const selectFriends = (state: UserStore) => state.friends;
/** Select the blocked users list. */
export const selectBlockedUsers = (state: UserStore) => state.blockedUsers;
/** Select friend count. */
export const selectFriendCount = (state: UserStore) => state.friends.length;

// Hook selectors
export const useCurrentUser = () => useUserStore((s) => s.currentUser);
export const useIsAuthenticated = () => useUserStore((s) => s.isAuthenticated);
export const useProfile = () => useUserStore((s) => s.profile, shallow);
export const useFriends = () => useUserStore((s) => s.friends);

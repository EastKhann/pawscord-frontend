// frontend/src/stores/useUserStore.ts
// User and authentication state management

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserStore } from '../types/store';

export const useUserStore = create<UserStore>()(
    persist(
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
            setUser: (user) => set({
                currentUser: user,
                isAuthenticated: !!user,
            }),

            setTokens: (access, refresh) => set({
                accessToken: access,
                refreshToken: refresh,
            }),

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

            setProfile: (profileData) => set((state) => ({
                profile: { ...state.profile, ...profileData }
            })),

            setStatus: (status) => set((state) => ({
                profile: { ...state.profile, status }
            })),

            setStatusMessage: (message) => set((state) => ({
                profile: { ...state.profile, statusMessage: message }
            })),

            // Friends
            setFriends: (friends) => set({ friends }),
            addFriend: (friend) => set((state) => ({
                friends: [...state.friends, friend]
            })),
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
            updatePreferences: (prefs) => set((state) => ({
                preferences: { ...state.preferences, ...prefs }
            })),
        }),
        {
            name: 'pawscord-user-store',
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                preferences: state.preferences,
            }),
        }
    )
);

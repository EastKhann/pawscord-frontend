// frontend/src/stores/useServerStore.ts
// 🏰 Server state management
// Manages server list, selected server, channels, members, roles
// Gradually migrate server-related useState from App.js here.

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import type { ServerStore } from '../types/store';

export const useServerStore = create<ServerStore>()(
    devtools(
        persist(
            (set, get) => ({
                // --- SERVER STATE ---
                servers: [], // All user's servers
                selectedServer: null, // Currently selected server object
                channels: [], // Channels of selected server
                members: [], // Members of selected server
                roles: [], // Roles of selected server
                serverSettings: {}, // Settings of selected server
                joinedServerIds: [] as number[], // For quick lookup

                // --- SERVER ACTIONS ---
                /** Replace the entire server list. */
                setServers: (servers) => set({ servers }),

                /** Add a new server to the list and joinedServerIds. */
                addServer: (server) =>
                    set((state) => ({
                        servers: [...state.servers, server],
                        joinedServerIds: state.joinedServerIds.includes(server.id)
                            ? state.joinedServerIds
                            : [...state.joinedServerIds, server.id],
                    })),

                /** Remove a server by ID, clearing selection if it was selected. */
                removeServer: (serverId) =>
                    set((state) => ({
                        servers: state.servers.filter((s) => s.id !== serverId),
                        selectedServer:
                            state.selectedServer?.id === serverId ? null : state.selectedServer,
                        joinedServerIds: state.joinedServerIds.filter((id) => id !== serverId),
                    })),

                /** Update a server's properties by ID. */
                updateServer: (serverId, updates) =>
                    set((state) => ({
                        servers: state.servers.map((s) =>
                            s.id === serverId ? { ...s, ...updates } : s
                        ),
                        selectedServer:
                            state.selectedServer?.id === serverId
                                ? { ...state.selectedServer, ...updates }
                                : state.selectedServer,
                    })),

                /** Select a server and reset transient channel/member data. */
                selectServer: (server) =>
                    set({
                        selectedServer: server,
                        channels: [], // Will be loaded by fetch
                        members: [], // Will be loaded by fetch
                        roles: [], // Will be loaded by fetch
                    }),

                // --- CHANNEL ACTIONS ---
                /** Replace the channel list for the selected server. */
                setChannels: (channels) => set({ channels }),

                /** Add a channel to the current server. */
                addChannel: (channel) =>
                    set((state) => ({
                        channels: [...state.channels, channel],
                    })),

                /** Remove a channel by ID. */
                removeChannel: (channelId) =>
                    set((state) => ({
                        channels: state.channels.filter((c) => c.id !== channelId),
                    })),

                /** Update a channel's properties by ID. */
                updateChannel: (channelId, updates) =>
                    set((state) => ({
                        channels: state.channels.map((c) =>
                            c.id === channelId ? { ...c, ...updates } : c
                        ),
                    })),

                // --- MEMBER ACTIONS ---
                /** Replace the members list. */
                setMembers: (members) => set({ members }),

                /** Add a member to the current server. */
                addMember: (member) =>
                    set((state) => ({
                        members: [...state.members, member],
                    })),

                /** Remove a member by user ID. */
                removeMember: (userId) =>
                    set((state) => ({
                        members: state.members.filter(
                            (m) => m.user?.id !== userId && m.id !== userId
                        ),
                    })),

                /** Update a member's data by user ID. */
                updateMember: (userId, updates) =>
                    set((state) => ({
                        members: state.members.map((m) =>
                            m.user?.id === userId || m.id === userId ? { ...m, ...updates } : m
                        ),
                    })),

                // --- ROLE ACTIONS ---
                /** Replace the roles list. */
                setRoles: (roles) => set({ roles }),

                // --- SETTINGS ---
                /** Set the server settings object. */
                setServerSettings: (settings) => set({ serverSettings: settings }),

                // --- COMPUTED ---
                getChannelById: (channelId) => get().channels.find((c) => c.id === channelId),
                getMemberByUserId: (userId) => get().members.find((m) => m.user?.id === userId),
                getTextChannels: () => get().channels.filter((c) => c.type === 'text' || !c.type),
                getVoiceChannels: () => get().channels.filter((c) => c.type === 'voice'),
                getCategoryChannels: () => get().channels.filter((c) => c.type === 'category'),

                // --- RESET ---
                reset: () =>
                    set({
                        servers: [],
                        selectedServer: null,
                        channels: [],
                        members: [],
                        roles: [],
                        serverSettings: {},
                        joinedServerIds: [],
                    }),
            }),
            {
                name: 'pawscord-server-store',
                partialize: (state) => ({
                    // Only persist the server list, not transient data
                    servers: state.servers?.map((s) => ({
                        id: s.id,
                        name: s.name,
                        icon: s.icon,
                        slug: s.slug,
                    })),
                }),
            }
        ),
        { name: 'pawscord-server-store' }
    )
);

// --- SELECTORS (prevent unnecessary re-renders) ---
/** Select the list of all servers. */
export const selectServers = (state: ServerStore) => state.servers;
/** Select the currently selected server. */
export const selectCurrentServer = (state: ServerStore) => state.selectedServer;
/** Select channels of the selected server. */
export const selectChannels = (state: ServerStore) => state.channels;
/** Select members of the selected server. */
export const selectMembers = (state: ServerStore) => state.members;
/** Select roles of the selected server. */
export const selectRoles = (state: ServerStore) => state.roles;
/** Select text channels only. */
export const selectTextChannels = (state: ServerStore) =>
    state.channels.filter((c: any) => c.type === 'text' || !c.type);
/** Select voice channels only. */
export const selectVoiceChannels = (state: ServerStore) =>
    state.channels.filter((c: any) => c.type === 'voice');
/** Select the server count. */
export const selectServerCount = (state: ServerStore) => state.servers.length;

// Hook selectors (shallow prevents re-renders when object/array ref changes but content is same)
export const useCurrentServer = () => useServerStore((s) => s.selectedServer, shallow);
export const useServers = () => useServerStore((s) => s.servers, shallow);
export const useChannels = () => useServerStore((s) => s.channels, shallow);
export const useMembers = () => useServerStore((s) => s.members, shallow);
export const useTextChannels = () => useServerStore(selectTextChannels, shallow);
export const useVoiceChannels = () => useServerStore(selectVoiceChannels, shallow);

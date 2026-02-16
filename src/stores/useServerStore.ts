// frontend/src/stores/useServerStore.ts
// 🏰 Server state management
// Manages server list, selected server, channels, members, roles
// Gradually migrate server-related useState from App.js here.

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { ServerStore } from '../types/store';

export const useServerStore = create<ServerStore>()(
    devtools(persist(
        (set, get) => ({
            // --- SERVER STATE ---
            servers: [],                    // All user's servers
            selectedServer: null,           // Currently selected server object
            channels: [],                   // Channels of selected server
            members: [],                    // Members of selected server
            roles: [],                      // Roles of selected server
            serverSettings: {},             // Settings of selected server
            joinedServerIds: new Set(),     // For quick lookup

            // --- SERVER ACTIONS ---
            setServers: (servers) => set({ servers }),

            addServer: (server) => set((state) => ({
                servers: [...state.servers, server],
                joinedServerIds: new Set([...state.joinedServerIds, server.id])
            })),

            removeServer: (serverId) => set((state) => ({
                servers: state.servers.filter(s => s.id !== serverId),
                selectedServer: state.selectedServer?.id === serverId ? null : state.selectedServer,
                joinedServerIds: new Set([...state.joinedServerIds].filter(id => id !== serverId))
            })),

            updateServer: (serverId, updates) => set((state) => ({
                servers: state.servers.map(s =>
                    s.id === serverId ? { ...s, ...updates } : s
                ),
                selectedServer: state.selectedServer?.id === serverId
                    ? { ...state.selectedServer, ...updates }
                    : state.selectedServer
            })),

            selectServer: (server) => set({
                selectedServer: server,
                channels: [],   // Will be loaded by fetch
                members: [],    // Will be loaded by fetch
                roles: [],      // Will be loaded by fetch
            }),

            // --- CHANNEL ACTIONS ---
            setChannels: (channels) => set({ channels }),

            addChannel: (channel) => set((state) => ({
                channels: [...state.channels, channel]
            })),

            removeChannel: (channelId) => set((state) => ({
                channels: state.channels.filter(c => c.id !== channelId)
            })),

            updateChannel: (channelId, updates) => set((state) => ({
                channels: state.channels.map(c =>
                    c.id === channelId ? { ...c, ...updates } : c
                )
            })),

            // --- MEMBER ACTIONS ---
            setMembers: (members) => set({ members }),

            addMember: (member) => set((state) => ({
                members: [...state.members, member]
            })),

            removeMember: (userId) => set((state) => ({
                members: state.members.filter(m => m.user?.id !== userId && m.id !== userId)
            })),

            updateMember: (userId, updates) => set((state) => ({
                members: state.members.map(m =>
                    (m.user?.id === userId || m.id === userId) ? { ...m, ...updates } : m
                )
            })),

            // --- ROLE ACTIONS ---
            setRoles: (roles) => set({ roles }),

            // --- SETTINGS ---
            setServerSettings: (settings) => set({ serverSettings: settings }),

            // --- COMPUTED ---
            getChannelById: (channelId) => get().channels.find(c => c.id === channelId),
            getMemberByUserId: (userId) => get().members.find(m => m.user?.id === userId),
            getTextChannels: () => get().channels.filter(c => c.type === 'text' || !c.type),
            getVoiceChannels: () => get().channels.filter(c => c.type === 'voice'),
            getCategoryChannels: () => get().channels.filter(c => c.type === 'category'),

            // --- RESET ---
            reset: () => set({
                servers: [],
                selectedServer: null,
                channels: [],
                members: [],
                roles: [],
                serverSettings: {},
                joinedServerIds: new Set(),
            }),
        }),
        {
            name: 'pawscord-server-store',
            partialize: (state) => ({
                // Only persist the server list, not transient data
                servers: state.servers?.map(s => ({
                    id: s.id, name: s.name, icon: s.icon, slug: s.slug
                })),
            }),
        }
    ), { name: 'pawscord-server-store' })
);

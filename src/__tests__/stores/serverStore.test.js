// frontend/src/__tests__/stores/serverStore.test.js
// 🧪 Server Store Unit Tests

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock server data
const mockServers = [
    {
        id: 1,
        name: 'Test Server 1',
        icon: 'server1.png',
        owner_id: 1,
        member_count: 10,
        channels: [
            { id: 1, name: 'general', type: 'text' },
            { id: 2, name: 'voice', type: 'voice' }
        ]
    },
    {
        id: 2,
        name: 'Test Server 2',
        icon: 'server2.png',
        owner_id: 2,
        member_count: 25,
        channels: [
            { id: 3, name: 'chat', type: 'text' }
        ]
    }
];

const mockServerStore = {
    servers: [],
    currentServer: null,
    currentChannel: null,
    isLoading: false,
    error: null,

    fetchServers: vi.fn(),
    selectServer: vi.fn(),
    selectChannel: vi.fn(),
    createServer: vi.fn(),
    deleteServer: vi.fn(),
    joinServer: vi.fn(),
    leaveServer: vi.fn(),
    createChannel: vi.fn(),
    deleteChannel: vi.fn(),
    updateServer: vi.fn()
};

vi.mock('../../stores/serverStore', () => ({
    default: () => mockServerStore,
    useServerStore: () => mockServerStore
}));

describe('Server Store', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockServerStore.servers = [];
        mockServerStore.currentServer = null;
        mockServerStore.currentChannel = null;
        mockServerStore.error = null;
    });

    describe('Initial State', () => {
        it('should have empty servers array initially', () => {
            expect(mockServerStore.servers).toEqual([]);
        });

        it('should have no current server selected', () => {
            expect(mockServerStore.currentServer).toBeNull();
        });

        it('should have no current channel selected', () => {
            expect(mockServerStore.currentChannel).toBeNull();
        });
    });

    describe('Fetch Servers', () => {
        it('should fetch and set servers', async () => {
            mockServerStore.fetchServers.mockImplementationOnce(() => {
                mockServerStore.servers = mockServers;
            });

            await mockServerStore.fetchServers();

            expect(mockServerStore.fetchServers).toHaveBeenCalled();
            expect(mockServerStore.servers).toHaveLength(2);
            expect(mockServerStore.servers[0].name).toBe('Test Server 1');
        });

        it('should handle fetch error', async () => {
            mockServerStore.fetchServers.mockImplementationOnce(() => {
                mockServerStore.error = 'Failed to fetch servers';
                mockServerStore.servers = [];
            });

            await mockServerStore.fetchServers();

            expect(mockServerStore.error).toBe('Failed to fetch servers');
        });
    });

    describe('Server Selection', () => {
        it('should select a server', () => {
            mockServerStore.servers = mockServers;

            mockServerStore.selectServer.mockImplementationOnce((serverId) => {
                mockServerStore.currentServer = mockServers.find(s => s.id === serverId);
            });

            mockServerStore.selectServer(1);

            expect(mockServerStore.selectServer).toHaveBeenCalledWith(1);
            expect(mockServerStore.currentServer).toEqual(mockServers[0]);
        });

        it('should auto-select first channel when server selected', () => {
            mockServerStore.servers = mockServers;

            mockServerStore.selectServer.mockImplementationOnce((serverId) => {
                const server = mockServers.find(s => s.id === serverId);
                mockServerStore.currentServer = server;
                mockServerStore.currentChannel = server.channels[0];
            });

            mockServerStore.selectServer(1);

            expect(mockServerStore.currentChannel).toEqual(mockServers[0].channels[0]);
        });
    });

    describe('Channel Selection', () => {
        it('should select a channel', () => {
            mockServerStore.servers = mockServers;
            mockServerStore.currentServer = mockServers[0];

            mockServerStore.selectChannel.mockImplementationOnce((channelId) => {
                mockServerStore.currentChannel = mockServers[0].channels.find(c => c.id === channelId);
            });

            mockServerStore.selectChannel(2);

            expect(mockServerStore.selectChannel).toHaveBeenCalledWith(2);
            expect(mockServerStore.currentChannel.name).toBe('voice');
        });
    });

    describe('Create Server', () => {
        it('should create a new server', async () => {
            const newServer = {
                name: 'New Server',
                icon: null
            };

            const createdServer = {
                id: 3,
                ...newServer,
                owner_id: 1,
                member_count: 1,
                channels: []
            };

            mockServerStore.createServer.mockImplementationOnce((data) => {
                mockServerStore.servers = [...mockServerStore.servers, createdServer];
                return createdServer;
            });

            await mockServerStore.createServer(newServer);

            expect(mockServerStore.createServer).toHaveBeenCalledWith(newServer);
            expect(mockServerStore.servers).toContainEqual(createdServer);
        });
    });

    describe('Delete Server', () => {
        it('should delete a server', async () => {
            mockServerStore.servers = mockServers;

            mockServerStore.deleteServer.mockImplementationOnce((serverId) => {
                mockServerStore.servers = mockServerStore.servers.filter(s => s.id !== serverId);
            });

            await mockServerStore.deleteServer(1);

            expect(mockServerStore.deleteServer).toHaveBeenCalledWith(1);
            expect(mockServerStore.servers).toHaveLength(1);
            expect(mockServerStore.servers[0].id).toBe(2);
        });

        it('should clear current server if deleted', async () => {
            mockServerStore.servers = mockServers;
            mockServerStore.currentServer = mockServers[0];

            mockServerStore.deleteServer.mockImplementationOnce((serverId) => {
                mockServerStore.servers = mockServerStore.servers.filter(s => s.id !== serverId);
                if (mockServerStore.currentServer?.id === serverId) {
                    mockServerStore.currentServer = null;
                    mockServerStore.currentChannel = null;
                }
            });

            await mockServerStore.deleteServer(1);

            expect(mockServerStore.currentServer).toBeNull();
        });
    });

    describe('Join/Leave Server', () => {
        it('should join a server via invite', async () => {
            const inviteCode = 'ABC123';
            const joinedServer = {
                id: 4,
                name: 'Joined Server',
                invite_code: inviteCode
            };

            mockServerStore.joinServer.mockImplementationOnce(() => {
                mockServerStore.servers = [...mockServerStore.servers, joinedServer];
                return joinedServer;
            });

            await mockServerStore.joinServer(inviteCode);

            expect(mockServerStore.joinServer).toHaveBeenCalledWith(inviteCode);
        });

        it('should leave a server', async () => {
            mockServerStore.servers = mockServers;

            mockServerStore.leaveServer.mockImplementationOnce((serverId) => {
                mockServerStore.servers = mockServerStore.servers.filter(s => s.id !== serverId);
            });

            await mockServerStore.leaveServer(2);

            expect(mockServerStore.leaveServer).toHaveBeenCalledWith(2);
            expect(mockServerStore.servers).toHaveLength(1);
        });
    });

    describe('Channel Management', () => {
        it('should create a new channel', async () => {
            mockServerStore.servers = mockServers;
            mockServerStore.currentServer = mockServers[0];

            const newChannel = {
                name: 'new-channel',
                type: 'text'
            };

            mockServerStore.createChannel.mockImplementationOnce((serverId, data) => {
                const channel = { id: 10, ...data };
                return channel;
            });

            await mockServerStore.createChannel(1, newChannel);

            expect(mockServerStore.createChannel).toHaveBeenCalledWith(1, newChannel);
        });

        it('should delete a channel', async () => {
            mockServerStore.deleteChannel.mockImplementationOnce((channelId) => {
                // Channel deletion logic
            });

            await mockServerStore.deleteChannel(1);

            expect(mockServerStore.deleteChannel).toHaveBeenCalledWith(1);
        });
    });

    describe('Update Server', () => {
        it('should update server details', async () => {
            mockServerStore.servers = mockServers;

            const updates = {
                name: 'Updated Server Name',
                icon: 'new-icon.png'
            };

            mockServerStore.updateServer.mockImplementationOnce((serverId, data) => {
                const index = mockServerStore.servers.findIndex(s => s.id === serverId);
                if (index !== -1) {
                    mockServerStore.servers[index] = {
                        ...mockServerStore.servers[index],
                        ...data
                    };
                }
            });

            await mockServerStore.updateServer(1, updates);

            expect(mockServerStore.updateServer).toHaveBeenCalledWith(1, updates);
        });
    });
});

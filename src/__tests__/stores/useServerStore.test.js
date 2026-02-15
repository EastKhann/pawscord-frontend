// frontend/src/__tests__/stores/useServerStore.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { useServerStore } from '../../stores/useServerStore';

describe('useServerStore', () => {
    beforeEach(() => {
        useServerStore.setState({
            servers: [],
            selectedServer: null,
            channels: [],
            members: [],
            roles: [],
            serverSettings: {},
            joinedServerIds: new Set(),
        });
    });

    describe('setServers', () => {
        it('should set server list', () => {
            const servers = [
                { id: 1, name: 'Server 1' },
                { id: 2, name: 'Server 2' },
            ];
            useServerStore.getState().setServers(servers);
            expect(useServerStore.getState().servers).toHaveLength(2);
        });
    });

    describe('addServer', () => {
        it('should add a server', () => {
            useServerStore.getState().addServer({ id: 1, name: 'New Server' });
            expect(useServerStore.getState().servers).toHaveLength(1);
            expect(useServerStore.getState().servers[0].name).toBe('New Server');
        });

        it('should track joined IDs', () => {
            useServerStore.getState().addServer({ id: 42, name: 'Tracked' });
            expect(useServerStore.getState().joinedServerIds.has(42)).toBe(true);
        });
    });

    describe('removeServer', () => {
        it('should remove a server by id', () => {
            useServerStore.setState({
                servers: [
                    { id: 1, name: 'Keep' },
                    { id: 2, name: 'Remove' },
                ],
            });
            useServerStore.getState().removeServer(2);
            expect(useServerStore.getState().servers).toHaveLength(1);
            expect(useServerStore.getState().servers[0].name).toBe('Keep');
        });

        it('should clear selected server if removed', () => {
            useServerStore.setState({
                servers: [{ id: 1, name: 'Selected' }],
                selectedServer: { id: 1, name: 'Selected' },
            });
            useServerStore.getState().removeServer(1);
            expect(useServerStore.getState().selectedServer).toBeNull();
        });
    });

    describe('updateServer', () => {
        it('should update server properties', () => {
            useServerStore.setState({
                servers: [{ id: 1, name: 'Old Name', description: 'old' }],
            });
            useServerStore.getState().updateServer(1, { name: 'New Name' });
            expect(useServerStore.getState().servers[0].name).toBe('New Name');
        });

        it('should update selected server if matching', () => {
            useServerStore.setState({
                servers: [{ id: 1, name: 'Old' }],
                selectedServer: { id: 1, name: 'Old' },
            });
            useServerStore.getState().updateServer(1, { name: 'Updated' });
            expect(useServerStore.getState().selectedServer.name).toBe('Updated');
        });
    });

    describe('selectServer', () => {
        it('should set selected server and clear channels/members', () => {
            useServerStore.setState({
                channels: [{ id: 1 }],
                members: [{ id: 1 }],
                roles: [{ id: 1 }],
            });
            useServerStore.getState().selectServer({ id: 5, name: 'Selected' });
            const state = useServerStore.getState();
            expect(state.selectedServer.id).toBe(5);
            expect(state.channels).toEqual([]);
            expect(state.members).toEqual([]);
            expect(state.roles).toEqual([]);
        });
    });
});

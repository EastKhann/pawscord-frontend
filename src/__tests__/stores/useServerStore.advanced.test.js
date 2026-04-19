// frontend/src/__tests__/stores/useServerStore.advanced.test.js
// Advanced Server Store Tests — channels, members, roles, computed getters, reset
import { describe, it, expect, beforeEach } from 'vitest';
import { useServerStore } from '../../stores/useServerStore';

describe('useServerStore — Advanced', () => {
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

    // ─── CHANNEL MANAGEMENT ───
    describe('Channel management', () => {
        it('setChannels should replace all channels', () => {
            const channels = [
                { id: 1, name: 'general', type: 'text' },
                { id: 2, name: 'voice-1', type: 'voice' },
            ];
            useServerStore.getState().setChannels(channels);
            expect(useServerStore.getState().channels).toHaveLength(2);
        });

        it('addChannel should append to channel list', () => {
            useServerStore.getState().setChannels([{ id: 1, name: 'general', type: 'text' }]);
            useServerStore.getState().addChannel({ id: 2, name: 'random', type: 'text' });
            expect(useServerStore.getState().channels).toHaveLength(2);
        });

        it('removeChannel should filter by id', () => {
            useServerStore.setState({
                channels: [
                    { id: 1, name: 'general' },
                    { id: 2, name: 'random' },
                    { id: 3, name: 'voice-1' },
                ],
            });
            useServerStore.getState().removeChannel(2);
            expect(useServerStore.getState().channels).toHaveLength(2);
            expect(useServerStore.getState().channels.find((c) => c.id === 2)).toBeUndefined();
        });

        it('updateChannel should merge updates for matching channel', () => {
            useServerStore.setState({
                channels: [
                    { id: 1, name: 'general', topic: 'Old topic' },
                    { id: 2, name: 'random', topic: '' },
                ],
            });
            useServerStore.getState().updateChannel(1, { topic: 'New topic' });
            expect(useServerStore.getState().channels[0].topic).toBe('New topic');
            expect(useServerStore.getState().channels[0].name).toBe('general');
        });

        it('updateChannel should not affect non-matching channels', () => {
            useServerStore.setState({
                channels: [
                    { id: 1, name: 'general' },
                    { id: 2, name: 'random' },
                ],
            });
            useServerStore.getState().updateChannel(1, { name: 'updated' });
            expect(useServerStore.getState().channels[1].name).toBe('random');
        });
    });

    // ─── MEMBER MANAGEMENT ───
    describe('Member management', () => {
        it('setMembers should replace member list', () => {
            const members = [
                { id: 1, user: { id: 10, username: 'alice' } },
                { id: 2, user: { id: 20, username: 'bob' } },
            ];
            useServerStore.getState().setMembers(members);
            expect(useServerStore.getState().members).toHaveLength(2);
        });

        it('addMember should append new member', () => {
            useServerStore.setState({
                members: [{ id: 1, user: { id: 10, username: 'alice' } }],
            });
            useServerStore.getState().addMember({ id: 2, user: { id: 20, username: 'bob' } });
            expect(useServerStore.getState().members).toHaveLength(2);
        });

        it('removeMember should filter by user.id', () => {
            useServerStore.setState({
                members: [
                    { id: 1, user: { id: 10, username: 'alice' } },
                    { id: 2, user: { id: 20, username: 'bob' } },
                ],
            });
            useServerStore.getState().removeMember(10);
            expect(useServerStore.getState().members).toHaveLength(1);
            expect(useServerStore.getState().members[0].user.username).toBe('bob');
        });

        it('removeMember should also match by member.id', () => {
            useServerStore.setState({
                members: [{ id: 5, username: 'noUserNested' }],
            });
            useServerStore.getState().removeMember(5);
            expect(useServerStore.getState().members).toHaveLength(0);
        });

        it('updateMember should merge updates by user.id', () => {
            useServerStore.setState({
                members: [{ id: 1, user: { id: 10, username: 'alice' }, nickname: null }],
            });
            useServerStore.getState().updateMember(10, { nickname: 'Ali' });
            expect(useServerStore.getState().members[0].nickname).toBe('Ali');
        });
    });

    // ─── ROLES ───
    describe('Roles management', () => {
        it('setRoles should replace roles list', () => {
            const roles = [
                { id: 1, name: 'Admin', color: '#ff0000' },
                { id: 2, name: 'Moderator', color: '#00ff00' },
            ];
            useServerStore.getState().setRoles(roles);
            expect(useServerStore.getState().roles).toHaveLength(2);
            expect(useServerStore.getState().roles[0].name).toBe('Admin');
        });

        it('setRoles with empty array should clear roles', () => {
            useServerStore.setState({ roles: [{ id: 1, name: 'Admin' }] });
            useServerStore.getState().setRoles([]);
            expect(useServerStore.getState().roles).toHaveLength(0);
        });
    });

    // ─── SERVER SETTINGS ───
    describe('Server settings', () => {
        it('setServerSettings should store settings object', () => {
            const settings = { verification_level: 'high', explicit_content_filter: true };
            useServerStore.getState().setServerSettings(settings);
            expect(useServerStore.getState().serverSettings).toEqual(settings);
        });

        it('should overwrite previous settings', () => {
            useServerStore.getState().setServerSettings({ a: 1 });
            useServerStore.getState().setServerSettings({ b: 2 });
            expect(useServerStore.getState().serverSettings).toEqual({ b: 2 });
        });
    });

    // ─── COMPUTED GETTERS ───
    describe('Computed getters', () => {
        beforeEach(() => {
            useServerStore.setState({
                channels: [
                    { id: 1, name: 'general', type: 'text' },
                    { id: 2, name: 'random', type: 'text' },
                    { id: 3, name: 'voice-1', type: 'voice' },
                    { id: 4, name: 'voice-2', type: 'voice' },
                    { id: 5, name: 'Info', type: 'category' },
                    { id: 6, name: 'no-type' },
                ],
                members: [
                    { id: 1, user: { id: 10, username: 'alice' } },
                    { id: 2, user: { id: 20, username: 'bob' } },
                ],
            });
        });

        it('getTextChannels should return text channels and channels without type', () => {
            const textChannels = useServerStore.getState().getTextChannels();
            expect(textChannels.length).toBeGreaterThanOrEqual(2);
            expect(textChannels.every((c) => c.type === 'text' || !c.type)).toBe(true);
        });

        it('getVoiceChannels should return voice channels only', () => {
            const voiceChannels = useServerStore.getState().getVoiceChannels();
            expect(voiceChannels).toHaveLength(2);
            expect(voiceChannels.every((c) => c.type === 'voice')).toBe(true);
        });

        it('getCategoryChannels should return category channels only', () => {
            const categories = useServerStore.getState().getCategoryChannels();
            expect(categories).toHaveLength(1);
            expect(categories[0].name).toBe('Info');
        });

        it('getChannelById should return matching channel', () => {
            const channel = useServerStore.getState().getChannelById(3);
            expect(channel).toBeDefined();
            expect(channel.name).toBe('voice-1');
        });

        it('getChannelById should return undefined for non-existent id', () => {
            const channel = useServerStore.getState().getChannelById(999);
            expect(channel).toBeUndefined();
        });

        it('getMemberByUserId should return matching member', () => {
            const member = useServerStore.getState().getMemberByUserId(10);
            expect(member).toBeDefined();
            expect(member.user.username).toBe('alice');
        });

        it('getMemberByUserId should return undefined for non-existent user', () => {
            const member = useServerStore.getState().getMemberByUserId(999);
            expect(member).toBeUndefined();
        });
    });

    // ─── RESET ───
    describe('reset', () => {
        it('should reset all state to initial values', () => {
            // Populate state
            useServerStore.getState().setServers([{ id: 1, name: 'S1' }]);
            useServerStore.getState().selectServer({ id: 1, name: 'S1' });
            useServerStore.getState().setChannels([{ id: 1, name: 'ch' }]);
            useServerStore.getState().setMembers([{ id: 1 }]);
            useServerStore.getState().setRoles([{ id: 1 }]);

            // Reset
            useServerStore.getState().reset();

            const state = useServerStore.getState();
            expect(state.servers).toEqual([]);
            expect(state.selectedServer).toBeNull();
            expect(state.channels).toEqual([]);
            expect(state.members).toEqual([]);
            expect(state.roles).toEqual([]);
            expect(state.serverSettings).toEqual({});
        });
    });

    // ─── JOINED SERVER IDS ───
    describe('joinedServerIds tracking', () => {
        it('should track added servers in joinedServerIds', () => {
            useServerStore.getState().addServer({ id: 1, name: 'A' });
            useServerStore.getState().addServer({ id: 2, name: 'B' });
            const ids = useServerStore.getState().joinedServerIds;
            expect(ids.has(1)).toBe(true);
            expect(ids.has(2)).toBe(true);
        });

        it('should remove from joinedServerIds when server removed', () => {
            useServerStore.getState().addServer({ id: 1, name: 'A' });
            useServerStore.getState().addServer({ id: 2, name: 'B' });
            useServerStore.getState().removeServer(1);
            const ids = useServerStore.getState().joinedServerIds;
            expect(ids.has(1)).toBe(false);
            expect(ids.has(2)).toBe(true);
        });
    });

    // ─── UPDATE SERVER — EDGE CASES ───
    describe('updateServer — edge cases', () => {
        it('should not update selectedServer if it does not match', () => {
            useServerStore.setState({
                servers: [
                    { id: 1, name: 'S1' },
                    { id: 2, name: 'S2' },
                ],
                selectedServer: { id: 2, name: 'S2' },
            });
            useServerStore.getState().updateServer(1, { name: 'Updated S1' });
            expect(useServerStore.getState().selectedServer.name).toBe('S2');
        });

        it('should update selectedServer when it matches', () => {
            useServerStore.setState({
                servers: [{ id: 1, name: 'S1' }],
                selectedServer: { id: 1, name: 'S1' },
            });
            useServerStore.getState().updateServer(1, { name: 'New Name', icon: 'new.png' });
            expect(useServerStore.getState().selectedServer.name).toBe('New Name');
            expect(useServerStore.getState().selectedServer.icon).toBe('new.png');
        });
    });
});

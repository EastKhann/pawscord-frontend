// frontend/src/__tests__/stores/serverStore.advanced2.test.js
// Extended server store tests — member management, role updates, computed getters, edge cases

import { describe, it, expect, beforeEach } from 'vitest';
import { useServerStore } from '../../stores/useServerStore';

const resetStore = () =>
    useServerStore.setState({
        servers: [],
        selectedServer: null,
        channels: [],
        members: [],
        roles: [],
        serverSettings: {},
        joinedServerIds: [],
    });

describe('useServerStore — Extended', () => {
    beforeEach(resetStore);

    // ── SERVER CRUD (additional) ──
    describe('Server CRUD extras', () => {
        it('addServer appends multiple servers in sequence', () => {
            const { addServer } = useServerStore.getState();
            addServer({ id: 1, name: 'A' });
            addServer({ id: 2, name: 'B' });
            addServer({ id: 3, name: 'C' });
            expect(useServerStore.getState().servers).toHaveLength(3);
        });

        it('removeServer does nothing for non-existent id', () => {
            useServerStore.setState({ servers: [{ id: 1, name: 'X' }] });
            useServerStore.getState().removeServer(999);
            expect(useServerStore.getState().servers).toHaveLength(1);
        });

        it('updateServer does not affect non-matching servers', () => {
            useServerStore.setState({
                servers: [
                    { id: 1, name: 'A' },
                    { id: 2, name: 'B' },
                ],
            });
            useServerStore.getState().updateServer(1, { name: 'Updated' });
            expect(useServerStore.getState().servers[1].name).toBe('B');
        });

        it('updateServer does not mutate selectedServer when ids differ', () => {
            useServerStore.setState({
                servers: [{ id: 1, name: 'X' }],
                selectedServer: { id: 2, name: 'Other' },
            });
            useServerStore.getState().updateServer(1, { name: 'Changed' });
            expect(useServerStore.getState().selectedServer.name).toBe('Other');
        });
    });

    // ── MEMBER MANAGEMENT ──
    describe('Member management', () => {
        it('setMembers replaces members list', () => {
            const members = [
                { id: 1, user: { id: 10, username: 'alice' } },
                { id: 2, user: { id: 11, username: 'bob' } },
            ];
            useServerStore.getState().setMembers(members);
            expect(useServerStore.getState().members).toHaveLength(2);
        });

        it('addMember appends to members', () => {
            useServerStore.getState().setMembers([{ id: 1, user: { id: 10 } }]);
            useServerStore.getState().addMember({ id: 2, user: { id: 11 } });
            expect(useServerStore.getState().members).toHaveLength(2);
        });

        it('removeMember by user.id', () => {
            useServerStore.setState({
                members: [
                    { id: 1, user: { id: 10 } },
                    { id: 2, user: { id: 11 } },
                ],
            });
            useServerStore.getState().removeMember(10);
            expect(useServerStore.getState().members).toHaveLength(1);
            expect(useServerStore.getState().members[0].user.id).toBe(11);
        });

        it('removeMember by member id (fallback)', () => {
            useServerStore.setState({
                members: [{ id: 5, user: null }],
            });
            useServerStore.getState().removeMember(5);
            expect(useServerStore.getState().members).toHaveLength(0);
        });

        it('updateMember merges updates for matching member by user.id', () => {
            useServerStore.setState({
                members: [{ id: 1, user: { id: 10, username: 'old' }, role: 'member' }],
            });
            useServerStore.getState().updateMember(10, { role: 'admin' });
            expect(useServerStore.getState().members[0].role).toBe('admin');
        });
    });

    // ── ROLE UPDATES ──
    describe('Role updates', () => {
        it('setRoles replaces roles', () => {
            useServerStore.getState().setRoles([
                { id: 1, name: 'Admin' },
                { id: 2, name: 'Member' },
            ]);
            expect(useServerStore.getState().roles).toHaveLength(2);
        });

        it('setRoles with empty array clears roles', () => {
            useServerStore.setState({ roles: [{ id: 1, name: 'X' }] });
            useServerStore.getState().setRoles([]);
            expect(useServerStore.getState().roles).toHaveLength(0);
        });
    });

    // ── COMPUTED GETTERS ──
    describe('Computed getters', () => {
        it('getChannelById returns matching channel', () => {
            useServerStore.setState({
                channels: [
                    { id: 1, name: 'general' },
                    { id: 2, name: 'random' },
                ],
            });
            expect(useServerStore.getState().getChannelById(2).name).toBe('random');
        });

        it('getChannelById returns undefined for non-existent id', () => {
            useServerStore.setState({ channels: [{ id: 1, name: 'x' }] });
            expect(useServerStore.getState().getChannelById(999)).toBeUndefined();
        });

        it('getMemberByUserId returns matching member', () => {
            useServerStore.setState({
                members: [{ id: 1, user: { id: 42, username: 'alice' } }],
            });
            expect(useServerStore.getState().getMemberByUserId(42).user.username).toBe('alice');
        });

        it('getTextChannels returns text and typeless channels', () => {
            useServerStore.setState({
                channels: [
                    { id: 1, name: 'a', type: 'text' },
                    { id: 2, name: 'b', type: 'voice' },
                    { id: 3, name: 'c' }, // no type -> treated as text
                ],
            });
            expect(useServerStore.getState().getTextChannels()).toHaveLength(2);
        });

        it('getVoiceChannels returns only voice channels', () => {
            useServerStore.setState({
                channels: [
                    { id: 1, type: 'text' },
                    { id: 2, type: 'voice' },
                    { id: 3, type: 'voice' },
                ],
            });
            expect(useServerStore.getState().getVoiceChannels()).toHaveLength(2);
        });

        it('getCategoryChannels returns only category channels', () => {
            useServerStore.setState({
                channels: [
                    { id: 1, type: 'text' },
                    { id: 2, type: 'category' },
                ],
            });
            expect(useServerStore.getState().getCategoryChannels()).toHaveLength(1);
        });
    });

    // ── SETTINGS & RESET ──
    describe('Settings & reset', () => {
        it('setServerSettings stores settings object', () => {
            useServerStore.getState().setServerSettings({ moderation: true, nsfw: false });
            expect(useServerStore.getState().serverSettings.moderation).toBe(true);
        });

        it('reset clears all state', () => {
            useServerStore.setState({
                servers: [{ id: 1, name: 'X' }],
                selectedServer: { id: 1 },
                channels: [{ id: 1 }],
                members: [{ id: 1 }],
                roles: [{ id: 1 }],
                serverSettings: { a: 1 },
            });
            useServerStore.getState().reset();
            const s = useServerStore.getState();
            expect(s.servers).toHaveLength(0);
            expect(s.selectedServer).toBeNull();
            expect(s.channels).toHaveLength(0);
            expect(s.members).toHaveLength(0);
            expect(s.roles).toHaveLength(0);
        });
    });
});

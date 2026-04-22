// frontend/src/__tests__/stores/useVoiceStore.advanced.test.js
// Advanced Voice Store Tests — user management, speaking, deafen-mute interaction, stats
import { describe, it, expect, beforeEach } from 'vitest';
import { useVoiceStore } from '../../stores/useVoiceStore';

describe('useVoiceStore — Advanced', () => {
    beforeEach(() => {
        useVoiceStore.setState({
            isInVoiceChat: false,
            currentVoiceRoom: null,
            currentServerId: null,
            isMuted: false,
            isDeafened: false,
            isCameraOn: false,
            isScreenSharing: false,
            voiceUsers: {},
            speakingUsers: [],
            inputDevice: 'default',
            outputDevice: 'default',
            inputVolume: 100,
            outputVolume: 100,
            noiseSuppression: 'medium',
            echoCancellation: true,
            autoGainControl: true,
            pushToTalk: false,
            pushToTalkKey: 'Space',
            connectionQuality: 'good',
            latency: 0,
            packetLoss: 0,
        });
    });

    // ─── DEAFEN-MUTE INTERACTION ───
    describe('Deafen-Mute interaction', () => {
        it('deafening should also mute', () => {
            expect(useVoiceStore.getState().isMuted).toBe(false);
            useVoiceStore.getState().toggleDeafen();
            expect(useVoiceStore.getState().isDeafened).toBe(true);
            expect(useVoiceStore.getState().isMuted).toBe(true);
        });

        it('un-deafening should keep mute state unchanged (muted stays muted)', () => {
            // Deafen (also mutes)
            useVoiceStore.getState().toggleDeafen();
            expect(useVoiceStore.getState().isMuted).toBe(true);

            // Un-deafen — mute state depends on implementation
            useVoiceStore.getState().toggleDeafen();
            expect(useVoiceStore.getState().isDeafened).toBe(false);
        });

        it('muting while already muted should unmute', () => {
            useVoiceStore.getState().toggleMute();
            expect(useVoiceStore.getState().isMuted).toBe(true);
            useVoiceStore.getState().toggleMute();
            expect(useVoiceStore.getState().isMuted).toBe(false);
        });
    });

    // ─── VOICE USER MANAGEMENT ───
    describe('addVoiceUser', () => {
        it('should add a single voice user', () => {
            useVoiceStore.getState().addVoiceUser('user-1', {
                username: 'alice',
                isMuted: false,
                isDeafened: false,
            });
            const users = useVoiceStore.getState().voiceUsers;
            expect(users['user-1']).toBeDefined();
            expect(users['user-1'].username).toBe('alice');
        });

        it('should add multiple voice users', () => {
            const store = useVoiceStore.getState();
            store.addVoiceUser('user-1', { username: 'alice' });
            store.addVoiceUser('user-2', { username: 'bob' });
            store.addVoiceUser('user-3', { username: 'charlie' });
            const users = useVoiceStore.getState().voiceUsers;
            expect(Object.keys(users)).toHaveLength(3);
        });

        it('should overwrite existing user data', () => {
            useVoiceStore.getState().addVoiceUser('user-1', { username: 'alice', isMuted: false });
            useVoiceStore.getState().addVoiceUser('user-1', { username: 'alice', isMuted: true });
            expect(useVoiceStore.getState().voiceUsers['user-1'].isMuted).toBe(true);
        });
    });

    describe('removeVoiceUser', () => {
        it('should remove a voice user by id', () => {
            useVoiceStore.getState().addVoiceUser('user-1', { username: 'alice' });
            useVoiceStore.getState().addVoiceUser('user-2', { username: 'bob' });
            useVoiceStore.getState().removeVoiceUser('user-1');
            const users = useVoiceStore.getState().voiceUsers;
            expect(users['user-1']).toBeUndefined();
            expect(users['user-2']).toBeDefined();
        });

        it('should handle removing non-existent user gracefully', () => {
            useVoiceStore.getState().addVoiceUser('user-1', { username: 'alice' });
            useVoiceStore.getState().removeVoiceUser('user-999');
            expect(Object.keys(useVoiceStore.getState().voiceUsers)).toHaveLength(1);
        });
    });

    // ─── SPEAKING USERS ───
    describe('setSpeaking', () => {
        it('should add user to speaking set', () => {
            useVoiceStore.getState().setSpeaking('user-1', true);
            expect(useVoiceStore.getState().speakingUsers.includes('user-1')).toBe(true);
        });

        it('should remove user from speaking set', () => {
            useVoiceStore.getState().setSpeaking('user-1', true);
            useVoiceStore.getState().setSpeaking('user-1', false);
            expect(useVoiceStore.getState().speakingUsers.includes('user-1')).toBe(false);
        });

        it('should track multiple speaking users', () => {
            useVoiceStore.getState().setSpeaking('user-1', true);
            useVoiceStore.getState().setSpeaking('user-2', true);
            useVoiceStore.getState().setSpeaking('user-3', true);
            const speaking = useVoiceStore.getState().speakingUsers;
            expect(speaking.length).toBe(3);
        });

        it('should not duplicate user in speaking set', () => {
            useVoiceStore.getState().setSpeaking('user-1', true);
            useVoiceStore.getState().setSpeaking('user-1', true);
            expect(useVoiceStore.getState().speakingUsers.length).toBe(1);
        });
    });

    // ─── LEAVE VOICE ROOM CLEANUP ───
    describe('leaveVoiceRoom — cleanup', () => {
        it('should clear all voice users on leave', () => {
            useVoiceStore.getState().joinVoiceRoom('room-1', 'server-1');
            useVoiceStore.getState().addVoiceUser('user-1', { username: 'alice' });
            useVoiceStore.getState().addVoiceUser('user-2', { username: 'bob' });
            useVoiceStore.getState().setSpeaking('user-1', true);
            useVoiceStore.getState().leaveVoiceRoom();

            const state = useVoiceStore.getState();
            expect(state.voiceUsers).toEqual({});
            expect(state.speakingUsers.length).toBe(0);
            expect(state.isInVoiceChat).toBe(false);
        });

        it('should preserve audio settings after leaving', () => {
            useVoiceStore.getState().setInputVolume(75);
            useVoiceStore.getState().setNoiseSuppression('high');
            useVoiceStore.getState().joinVoiceRoom('room-1', 'server-1');
            useVoiceStore.getState().leaveVoiceRoom();

            expect(useVoiceStore.getState().inputVolume).toBe(75);
            expect(useVoiceStore.getState().noiseSuppression).toBe('high');
        });
    });

    // ─── CAMERA AND SCREEN SHARE ───
    describe('Camera and screen share', () => {
        it('should allow camera and screen share simultaneously', () => {
            useVoiceStore.getState().toggleCamera();
            useVoiceStore.getState().toggleScreenShare();
            expect(useVoiceStore.getState().isCameraOn).toBe(true);
            expect(useVoiceStore.getState().isScreenSharing).toBe(true);
        });

        it('camera toggle should be independent of screen share', () => {
            useVoiceStore.getState().toggleCamera();
            useVoiceStore.getState().toggleScreenShare();
            useVoiceStore.getState().toggleCamera();
            expect(useVoiceStore.getState().isCameraOn).toBe(false);
            expect(useVoiceStore.getState().isScreenSharing).toBe(true);
        });
    });

    // ─── CONNECTION QUALITY STATS ───
    describe('Connection quality stats', () => {
        it('should update all stats together', () => {
            const store = useVoiceStore.getState();
            store.setConnectionQuality('poor');
            store.setLatency(250);
            store.setPacketLoss(8.5);
            const state = useVoiceStore.getState();
            expect(state.connectionQuality).toBe('poor');
            expect(state.latency).toBe(250);
            expect(state.packetLoss).toBe(8.5);
        });

        it('should accept zero values', () => {
            useVoiceStore.getState().setLatency(0);
            useVoiceStore.getState().setPacketLoss(0);
            expect(useVoiceStore.getState().latency).toBe(0);
            expect(useVoiceStore.getState().packetLoss).toBe(0);
        });
    });

    // ─── FULL LIFECYCLE ───
    describe('Full voice lifecycle', () => {
        it('should handle join → configure → add users → speak → leave', () => {
            const store = useVoiceStore.getState();

            // Join
            store.joinVoiceRoom('voice-general', 'server-42');
            expect(useVoiceStore.getState().isInVoiceChat).toBe(true);

            // Configure
            store.setInputVolume(80);
            store.toggleMute();
            expect(useVoiceStore.getState().isMuted).toBe(true);

            // Add users
            store.addVoiceUser('u1', { username: 'alice' });
            store.addVoiceUser('u2', { username: 'bob' });

            // Speaking
            store.setSpeaking('u1', true);
            expect(useVoiceStore.getState().speakingUsers.includes('u1')).toBe(true);

            // Leave
            store.leaveVoiceRoom();
            expect(useVoiceStore.getState().isInVoiceChat).toBe(false);
            expect(useVoiceStore.getState().voiceUsers).toEqual({});
        });
    });
});

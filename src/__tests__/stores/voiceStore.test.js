// frontend/src/__tests__/stores/voiceStore.test.js
// Comprehensive Voice Store Tests — join/leave, toggles, users, settings, stats
import { describe, it, expect, beforeEach } from 'vitest';
import { useVoiceStore } from '../../stores/useVoiceStore';

const resetStore = () => {
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
};

describe('useVoiceStore – Comprehensive', () => {
    beforeEach(resetStore);

    // ═══════════════════════════════════════════════════════════
    // INITIAL STATE
    // ═══════════════════════════════════════════════════════════
    describe('Initial State', () => {
        it('should not be in voice chat', () => {
            expect(useVoiceStore.getState().isInVoiceChat).toBe(false);
        });

        it('should have null voice room and server', () => {
            expect(useVoiceStore.getState().currentVoiceRoom).toBeNull();
            expect(useVoiceStore.getState().currentServerId).toBeNull();
        });

        it('should have all toggles off', () => {
            const s = useVoiceStore.getState();
            expect(s.isMuted).toBe(false);
            expect(s.isDeafened).toBe(false);
            expect(s.isCameraOn).toBe(false);
            expect(s.isScreenSharing).toBe(false);
        });

        it('should have default input/output devices', () => {
            expect(useVoiceStore.getState().inputDevice).toBe('default');
            expect(useVoiceStore.getState().outputDevice).toBe('default');
        });

        it('should have 100% volumes', () => {
            expect(useVoiceStore.getState().inputVolume).toBe(100);
            expect(useVoiceStore.getState().outputVolume).toBe(100);
        });

        it('should have medium noise suppression', () => {
            expect(useVoiceStore.getState().noiseSuppression).toBe('medium');
        });

        it('should have echo cancellation and AGC on', () => {
            expect(useVoiceStore.getState().echoCancellation).toBe(true);
            expect(useVoiceStore.getState().autoGainControl).toBe(true);
        });

        it('should have push-to-talk off with Space key', () => {
            expect(useVoiceStore.getState().pushToTalk).toBe(false);
            expect(useVoiceStore.getState().pushToTalkKey).toBe('Space');
        });

        it('should have good connection quality, 0 latency, 0 packet loss', () => {
            expect(useVoiceStore.getState().connectionQuality).toBe('good');
            expect(useVoiceStore.getState().latency).toBe(0);
            expect(useVoiceStore.getState().packetLoss).toBe(0);
        });

        it('should have empty voiceUsers and speakingUsers', () => {
            expect(useVoiceStore.getState().voiceUsers).toEqual({});
            expect(useVoiceStore.getState().speakingUsers).toEqual([]);
        });
    });

    // ═══════════════════════════════════════════════════════════
    // JOIN / LEAVE VOICE
    // ═══════════════════════════════════════════════════════════
    describe('joinVoiceRoom', () => {
        it('should set isInVoiceChat true and store room/server', () => {
            useVoiceStore.getState().joinVoiceRoom('room-abc', 'server-1');
            const s = useVoiceStore.getState();
            expect(s.isInVoiceChat).toBe(true);
            expect(s.currentVoiceRoom).toBe('room-abc');
            expect(s.currentServerId).toBe('server-1');
        });

        it('should allow switching rooms', () => {
            useVoiceStore.getState().joinVoiceRoom('room-1', 'srv-1');
            useVoiceStore.getState().joinVoiceRoom('room-2', 'srv-2');
            expect(useVoiceStore.getState().currentVoiceRoom).toBe('room-2');
            expect(useVoiceStore.getState().currentServerId).toBe('srv-2');
        });
    });

    describe('leaveVoiceRoom', () => {
        it('should reset all voice-related state', () => {
            useVoiceStore.getState().joinVoiceRoom('room-1', 'srv-1');
            useVoiceStore.getState().addVoiceUser('u1', { name: 'Alice' });
            useVoiceStore.getState().setSpeaking('u1', true);
            useVoiceStore.getState().leaveVoiceRoom();
            const s = useVoiceStore.getState();
            expect(s.isInVoiceChat).toBe(false);
            expect(s.currentVoiceRoom).toBeNull();
            expect(s.currentServerId).toBeNull();
            expect(s.voiceUsers).toEqual({});
            expect(s.speakingUsers.length).toBe(0);
        });

        it('should not reset audio settings on leave', () => {
            useVoiceStore.getState().setInputVolume(50);
            useVoiceStore.getState().joinVoiceRoom('r', 's');
            useVoiceStore.getState().leaveVoiceRoom();
            expect(useVoiceStore.getState().inputVolume).toBe(50);
        });
    });

    // ═══════════════════════════════════════════════════════════
    // AUDIO CONTROLS (toggles)
    // ═══════════════════════════════════════════════════════════
    describe('toggleMute', () => {
        it('should toggle muted state', () => {
            useVoiceStore.getState().toggleMute();
            expect(useVoiceStore.getState().isMuted).toBe(true);
            useVoiceStore.getState().toggleMute();
            expect(useVoiceStore.getState().isMuted).toBe(false);
        });
    });

    describe('toggleDeafen', () => {
        it('should toggle deafened state', () => {
            useVoiceStore.getState().toggleDeafen();
            expect(useVoiceStore.getState().isDeafened).toBe(true);
        });

        it('should also mute when deafening', () => {
            useVoiceStore.getState().toggleDeafen();
            expect(useVoiceStore.getState().isMuted).toBe(true);
        });

        it('should keep muted state when un-deafening (muted was already true)', () => {
            // Already muted, then deafen
            useVoiceStore.getState().toggleMute(); // muted = true
            useVoiceStore.getState().toggleDeafen(); // deafened = true, muted stays true
            expect(useVoiceStore.getState().isMuted).toBe(true);
            // Un-deafen should keep muted as-is
            useVoiceStore.getState().toggleDeafen();
            expect(useVoiceStore.getState().isDeafened).toBe(false);
        });

        it('deafen → un-deafen cycle', () => {
            useVoiceStore.getState().toggleDeafen(); // deaf + muted
            expect(useVoiceStore.getState().isDeafened).toBe(true);
            useVoiceStore.getState().toggleDeafen(); // un-deaf
            expect(useVoiceStore.getState().isDeafened).toBe(false);
        });
    });

    describe('toggleCamera', () => {
        it('should toggle camera on/off', () => {
            useVoiceStore.getState().toggleCamera();
            expect(useVoiceStore.getState().isCameraOn).toBe(true);
            useVoiceStore.getState().toggleCamera();
            expect(useVoiceStore.getState().isCameraOn).toBe(false);
        });
    });

    describe('toggleScreenShare', () => {
        it('should toggle screen sharing', () => {
            useVoiceStore.getState().toggleScreenShare();
            expect(useVoiceStore.getState().isScreenSharing).toBe(true);
            useVoiceStore.getState().toggleScreenShare();
            expect(useVoiceStore.getState().isScreenSharing).toBe(false);
        });
    });

    // ═══════════════════════════════════════════════════════════
    // VOICE USER MANAGEMENT
    // ═══════════════════════════════════════════════════════════
    describe('Voice User Management', () => {
        it('addVoiceUser should add user to map', () => {
            useVoiceStore.getState().addVoiceUser('u1', { name: 'Alice', muted: false });
            expect(useVoiceStore.getState().voiceUsers['u1']).toEqual({
                name: 'Alice',
                muted: false,
            });
        });

        it('addVoiceUser should overwrite existing entry', () => {
            useVoiceStore.getState().addVoiceUser('u1', { name: 'Alice', muted: false });
            useVoiceStore.getState().addVoiceUser('u1', { name: 'Alice', muted: true });
            expect(useVoiceStore.getState().voiceUsers['u1'].muted).toBe(true);
        });

        it('removeVoiceUser should delete user from map', () => {
            useVoiceStore.getState().addVoiceUser('u1', { name: 'Alice' });
            useVoiceStore.getState().addVoiceUser('u2', { name: 'Bob' });
            useVoiceStore.getState().removeVoiceUser('u1');
            expect(useVoiceStore.getState().voiceUsers['u1']).toBeUndefined();
            expect(useVoiceStore.getState().voiceUsers['u2']).toBeDefined();
        });

        it('removeVoiceUser for non-existent user is safe', () => {
            useVoiceStore.getState().removeVoiceUser('ghost');
            expect(Object.keys(useVoiceStore.getState().voiceUsers)).toHaveLength(0);
        });

        it('setVoiceUsers should replace entire map', () => {
            useVoiceStore.getState().addVoiceUser('u1', { name: 'Old' });
            useVoiceStore.getState().setVoiceUsers({ u2: { name: 'New' } });
            expect(useVoiceStore.getState().voiceUsers['u1']).toBeUndefined();
            expect(useVoiceStore.getState().voiceUsers['u2']).toEqual({ name: 'New' });
        });
    });

    // ═══════════════════════════════════════════════════════════
    // SPEAKING USERS
    // ═══════════════════════════════════════════════════════════
    describe('Speaking Users', () => {
        it('setSpeaking(true) should add user to set', () => {
            useVoiceStore.getState().setSpeaking('u1', true);
            expect(useVoiceStore.getState().speakingUsers.includes('u1')).toBe(true);
        });

        it('setSpeaking(false) should remove user from set', () => {
            useVoiceStore.getState().setSpeaking('u1', true);
            useVoiceStore.getState().setSpeaking('u1', false);
            expect(useVoiceStore.getState().speakingUsers.includes('u1')).toBe(false);
        });

        it('multiple users can speak simultaneously', () => {
            useVoiceStore.getState().setSpeaking('u1', true);
            useVoiceStore.getState().setSpeaking('u2', true);
            useVoiceStore.getState().setSpeaking('u3', true);
            expect(useVoiceStore.getState().speakingUsers.length).toBe(3);
        });

        it('setSpeaking(true) on already-speaking user is idempotent', () => {
            useVoiceStore.getState().setSpeaking('u1', true);
            useVoiceStore.getState().setSpeaking('u1', true);
            expect(useVoiceStore.getState().speakingUsers.length).toBe(1);
        });
    });

    // ═══════════════════════════════════════════════════════════
    // DEVICE & AUDIO SETTINGS
    // ═══════════════════════════════════════════════════════════
    describe('Device Settings', () => {
        it('setInputDevice', () => {
            useVoiceStore.getState().setInputDevice('mic-usb-1');
            expect(useVoiceStore.getState().inputDevice).toBe('mic-usb-1');
        });

        it('setOutputDevice', () => {
            useVoiceStore.getState().setOutputDevice('speakers-bt');
            expect(useVoiceStore.getState().outputDevice).toBe('speakers-bt');
        });

        it('setInputVolume with boundary values', () => {
            useVoiceStore.getState().setInputVolume(0);
            expect(useVoiceStore.getState().inputVolume).toBe(0);
            useVoiceStore.getState().setInputVolume(200);
            expect(useVoiceStore.getState().inputVolume).toBe(200);
        });

        it('setOutputVolume', () => {
            useVoiceStore.getState().setOutputVolume(25);
            expect(useVoiceStore.getState().outputVolume).toBe(25);
        });
    });

    describe('Advanced Audio Settings', () => {
        it('setNoiseSuppression cycles through levels', () => {
            useVoiceStore.getState().setNoiseSuppression('high');
            expect(useVoiceStore.getState().noiseSuppression).toBe('high');
            useVoiceStore.getState().setNoiseSuppression('low');
            expect(useVoiceStore.getState().noiseSuppression).toBe('low');
            useVoiceStore.getState().setNoiseSuppression('off');
            expect(useVoiceStore.getState().noiseSuppression).toBe('off');
        });

        it('setEchoCancellation', () => {
            useVoiceStore.getState().setEchoCancellation(false);
            expect(useVoiceStore.getState().echoCancellation).toBe(false);
        });

        it('setAutoGainControl', () => {
            useVoiceStore.getState().setAutoGainControl(false);
            expect(useVoiceStore.getState().autoGainControl).toBe(false);
        });

        it('setPushToTalk', () => {
            useVoiceStore.getState().setPushToTalk(true);
            expect(useVoiceStore.getState().pushToTalk).toBe(true);
        });

        it('setPushToTalkKey', () => {
            useVoiceStore.getState().setPushToTalkKey('KeyV');
            expect(useVoiceStore.getState().pushToTalkKey).toBe('KeyV');
        });
    });

    // ═══════════════════════════════════════════════════════════
    // CONNECTION STATS
    // ═══════════════════════════════════════════════════════════
    describe('Connection Stats', () => {
        it('setConnectionQuality', () => {
            useVoiceStore.getState().setConnectionQuality('poor');
            expect(useVoiceStore.getState().connectionQuality).toBe('poor');
        });

        it('setLatency', () => {
            useVoiceStore.getState().setLatency(250);
            expect(useVoiceStore.getState().latency).toBe(250);
        });

        it('setPacketLoss', () => {
            useVoiceStore.getState().setPacketLoss(3.5);
            expect(useVoiceStore.getState().packetLoss).toBe(3.5);
        });

        it('stats update independently', () => {
            useVoiceStore.getState().setConnectionQuality('excellent');
            useVoiceStore.getState().setLatency(15);
            useVoiceStore.getState().setPacketLoss(0.1);
            const s = useVoiceStore.getState();
            expect(s.connectionQuality).toBe('excellent');
            expect(s.latency).toBe(15);
            expect(s.packetLoss).toBe(0.1);
        });
    });

    // ═══════════════════════════════════════════════════════════
    // INTEGRATION: full session flow
    // ═══════════════════════════════════════════════════════════
    describe('Full Session Flow', () => {
        it('join → configure → add users → mute → leave → clean state', () => {
            const store = useVoiceStore.getState();
            // Join
            store.joinVoiceRoom('room-42', 'srv-7');
            expect(useVoiceStore.getState().isInVoiceChat).toBe(true);
            // Configure
            useVoiceStore.getState().setInputVolume(80);
            useVoiceStore.getState().setNoiseSuppression('high');
            // Add users
            useVoiceStore.getState().addVoiceUser('u1', { name: 'A' });
            useVoiceStore.getState().addVoiceUser('u2', { name: 'B' });
            expect(Object.keys(useVoiceStore.getState().voiceUsers)).toHaveLength(2);
            // Mute
            useVoiceStore.getState().toggleMute();
            expect(useVoiceStore.getState().isMuted).toBe(true);
            // Leave
            useVoiceStore.getState().leaveVoiceRoom();
            expect(useVoiceStore.getState().isInVoiceChat).toBe(false);
            expect(useVoiceStore.getState().voiceUsers).toEqual({});
            // Settings persisted
            expect(useVoiceStore.getState().inputVolume).toBe(80);
            expect(useVoiceStore.getState().noiseSuppression).toBe('high');
        });
    });
});

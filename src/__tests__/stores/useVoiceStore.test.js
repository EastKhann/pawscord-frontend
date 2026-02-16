// frontend/src/__tests__/stores/useVoiceStore.test.js
// Voice Store Unit Tests
import { describe, it, expect, beforeEach } from 'vitest';
import { useVoiceStore } from '../../stores/useVoiceStore';

describe('useVoiceStore', () => {
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
            speakingUsers: new Set(),
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

    // ─── INITIAL STATE ───
    describe('Initial State', () => {
        it('should not be in voice chat', () => {
            expect(useVoiceStore.getState().isInVoiceChat).toBe(false);
        });

        it('should have no current voice room', () => {
            expect(useVoiceStore.getState().currentVoiceRoom).toBeNull();
        });

        it('should not be muted or deafened', () => {
            expect(useVoiceStore.getState().isMuted).toBe(false);
            expect(useVoiceStore.getState().isDeafened).toBe(false);
        });

        it('should have default audio settings', () => {
            const state = useVoiceStore.getState();
            expect(state.inputVolume).toBe(100);
            expect(state.outputVolume).toBe(100);
            expect(state.noiseSuppression).toBe('medium');
            expect(state.echoCancellation).toBe(true);
        });

        it('should have good connection quality', () => {
            expect(useVoiceStore.getState().connectionQuality).toBe('good');
        });
    });

    // ─── JOIN/LEAVE VOICE ───
    describe('joinVoiceRoom', () => {
        it('should join voice room', () => {
            useVoiceStore.getState().joinVoiceRoom('room-1', 'server-1');
            const state = useVoiceStore.getState();
            expect(state.isInVoiceChat).toBe(true);
            expect(state.currentVoiceRoom).toBe('room-1');
            expect(state.currentServerId).toBe('server-1');
        });
    });

    describe('leaveVoiceRoom', () => {
        it('should leave voice room and clear state', () => {
            useVoiceStore.getState().joinVoiceRoom('room-1', 'server-1');
            useVoiceStore.getState().leaveVoiceRoom();
            const state = useVoiceStore.getState();
            expect(state.isInVoiceChat).toBe(false);
            expect(state.currentVoiceRoom).toBeNull();
            expect(state.currentServerId).toBeNull();
        });
    });

    // ─── AUDIO CONTROLS ───
    describe('Audio controls', () => {
        it('toggleMute should toggle muted state', () => {
            useVoiceStore.getState().toggleMute();
            expect(useVoiceStore.getState().isMuted).toBe(true);
            useVoiceStore.getState().toggleMute();
            expect(useVoiceStore.getState().isMuted).toBe(false);
        });

        it('toggleDeafen should toggle deafened state', () => {
            useVoiceStore.getState().toggleDeafen();
            expect(useVoiceStore.getState().isDeafened).toBe(true);
        });

        it('toggleCamera should toggle camera state', () => {
            useVoiceStore.getState().toggleCamera();
            expect(useVoiceStore.getState().isCameraOn).toBe(true);
        });

        it('toggleScreenShare should toggle screen sharing', () => {
            useVoiceStore.getState().toggleScreenShare();
            expect(useVoiceStore.getState().isScreenSharing).toBe(true);
        });
    });

    // ─── DEVICE SETTINGS ───
    describe('Device settings', () => {
        it('setInputDevice should update', () => {
            useVoiceStore.getState().setInputDevice('mic-2');
            expect(useVoiceStore.getState().inputDevice).toBe('mic-2');
        });

        it('setOutputDevice should update', () => {
            useVoiceStore.getState().setOutputDevice('speaker-2');
            expect(useVoiceStore.getState().outputDevice).toBe('speaker-2');
        });

        it('setInputVolume should update', () => {
            useVoiceStore.getState().setInputVolume(75);
            expect(useVoiceStore.getState().inputVolume).toBe(75);
        });

        it('setOutputVolume should update', () => {
            useVoiceStore.getState().setOutputVolume(50);
            expect(useVoiceStore.getState().outputVolume).toBe(50);
        });
    });

    // ─── ADVANCED SETTINGS ───
    describe('Advanced settings', () => {
        it('setNoiseSuppression should update level', () => {
            useVoiceStore.getState().setNoiseSuppression('high');
            expect(useVoiceStore.getState().noiseSuppression).toBe('high');
        });

        it('setEchoCancellation should toggle', () => {
            useVoiceStore.getState().setEchoCancellation(false);
            expect(useVoiceStore.getState().echoCancellation).toBe(false);
        });

        it('setAutoGainControl should toggle', () => {
            useVoiceStore.getState().setAutoGainControl(false);
            expect(useVoiceStore.getState().autoGainControl).toBe(false);
        });

        it('setPushToTalk should toggle', () => {
            useVoiceStore.getState().setPushToTalk(true);
            expect(useVoiceStore.getState().pushToTalk).toBe(true);
        });

        it('setPushToTalkKey should update', () => {
            useVoiceStore.getState().setPushToTalkKey('KeyV');
            expect(useVoiceStore.getState().pushToTalkKey).toBe('KeyV');
        });
    });

    // ─── VOICE USERS ───
    describe('Voice users', () => {
        it('setVoiceUsers should update user map', () => {
            useVoiceStore.getState().setVoiceUsers({ 'room-1': ['alice', 'bob'] });
            expect(useVoiceStore.getState().voiceUsers['room-1']).toEqual(['alice', 'bob']);
        });
    });

    // ─── STATS ───
    describe('Connection stats', () => {
        it('setConnectionQuality should update', () => {
            useVoiceStore.getState().setConnectionQuality('poor');
            expect(useVoiceStore.getState().connectionQuality).toBe('poor');
        });

        it('setLatency should update', () => {
            useVoiceStore.getState().setLatency(150);
            expect(useVoiceStore.getState().latency).toBe(150);
        });

        it('setPacketLoss should update', () => {
            useVoiceStore.getState().setPacketLoss(5.2);
            expect(useVoiceStore.getState().packetLoss).toBe(5.2);
        });
    });
});

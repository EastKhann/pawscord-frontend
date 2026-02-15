// frontend/src/stores/useVoiceStore.ts
// Voice chat state management

import { create } from 'zustand';
import type { VoiceStore } from '../types/store';

export const useVoiceStore = create<VoiceStore>((set, get) => ({
    // --- VOICE STATE ---
    isInVoiceChat: false,
    currentVoiceRoom: null,
    currentServerId: null,

    // --- LOCAL AUDIO STATE ---
    isMuted: false,
    isDeafened: false,
    isCameraOn: false,
    isScreenSharing: false,

    // --- CONNECTED USERS ---
    voiceUsers: {},
    speakingUsers: new Set(),

    // --- SETTINGS ---
    inputDevice: 'default',
    outputDevice: 'default',
    inputVolume: 100,
    outputVolume: 100,
    noiseSuppression: 'medium',
    echoCancellation: true,
    autoGainControl: true,
    pushToTalk: false,
    pushToTalkKey: 'Space',

    // --- STATS ---
    connectionQuality: 'good',
    latency: 0,
    packetLoss: 0,

    // --- ACTIONS ---
    joinVoiceRoom: (roomId, serverId) => set({
        isInVoiceChat: true,
        currentVoiceRoom: roomId,
        currentServerId: serverId,
    }),

    leaveVoiceRoom: () => set({
        isInVoiceChat: false,
        currentVoiceRoom: null,
        currentServerId: null,
        voiceUsers: {},
        speakingUsers: new Set(),
    }),

    toggleMute: () => set((state) => ({
        isMuted: !state.isMuted
    })),

    toggleDeafen: () => set((state) => ({
        isDeafened: !state.isDeafened,
        isMuted: !state.isDeafened ? true : state.isMuted, // Deafen also mutes
    })),

    toggleCamera: () => set((state) => ({
        isCameraOn: !state.isCameraOn
    })),

    toggleScreenShare: () => set((state) => ({
        isScreenSharing: !state.isScreenSharing
    })),

    // User management
    addVoiceUser: (userId, userData) => set((state) => ({
        voiceUsers: { ...state.voiceUsers, [userId]: userData }
    })),

    removeVoiceUser: (userId) => set((state) => {
        const newUsers = { ...state.voiceUsers };
        delete newUsers[userId];
        return { voiceUsers: newUsers };
    }),

    setVoiceUsers: (users) => set({ voiceUsers: users }),

    setSpeaking: (userId, isSpeaking) => set((state) => {
        const newSpeaking = new Set(state.speakingUsers);
        if (isSpeaking) {
            newSpeaking.add(userId);
        } else {
            newSpeaking.delete(userId);
        }
        return { speakingUsers: newSpeaking };
    }),

    // Settings
    setInputDevice: (deviceId) => set({ inputDevice: deviceId }),
    setOutputDevice: (deviceId) => set({ outputDevice: deviceId }),
    setInputVolume: (volume) => set({ inputVolume: volume }),
    setOutputVolume: (volume) => set({ outputVolume: volume }),
    setNoiseSuppression: (level) => set({ noiseSuppression: level }),
    setEchoCancellation: (enabled) => set({ echoCancellation: enabled }),
    setAutoGainControl: (enabled) => set({ autoGainControl: enabled }),
    setPushToTalk: (enabled) => set({ pushToTalk: enabled }),
    setPushToTalkKey: (key) => set({ pushToTalkKey: key }),

    // Stats
    setConnectionQuality: (quality) => set({ connectionQuality: quality }),
    setLatency: (latency) => set({ latency }),
    setPacketLoss: (loss) => set({ packetLoss: loss }),
}));

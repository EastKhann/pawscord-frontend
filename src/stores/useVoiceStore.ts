// frontend/src/stores/useVoiceStore.ts
// Voice chat state management

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { VoiceStore } from '../types/store';

export const useVoiceStore = create<VoiceStore>()(
    devtools(
        persist(
            (set, get) => ({
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
                speakingUsers: [] as string[],

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
                /** Join a voice room by room and server ID. */
                joinVoiceRoom: (roomId, serverId) =>
                    set({
                        isInVoiceChat: true,
                        currentVoiceRoom: roomId,
                        currentServerId: serverId,
                    }),

                /** Leave the current voice room, clearing all voice state. */
                leaveVoiceRoom: () =>
                    set({
                        isInVoiceChat: false,
                        currentVoiceRoom: null,
                        currentServerId: null,
                        voiceUsers: {},
                        speakingUsers: [] as string[],
                    }),

                /** Toggle microphone mute. */
                toggleMute: () =>
                    set((state) => ({
                        isMuted: !state.isMuted,
                    })),

                /** Toggle deafen (also mutes when deafened). */
                toggleDeafen: () =>
                    set((state) => ({
                        isDeafened: !state.isDeafened,
                        isMuted: !state.isDeafened ? true : state.isMuted, // Deafen also mutes
                    })),

                /** Toggle camera on/off. */
                toggleCamera: () =>
                    set((state) => ({
                        isCameraOn: !state.isCameraOn,
                    })),

                /** Toggle screen sharing on/off. */
                toggleScreenShare: () =>
                    set((state) => ({
                        isScreenSharing: !state.isScreenSharing,
                    })),

                // User management
                /** Add a user to the voice channel. */
                addVoiceUser: (userId, userData) =>
                    set((state) => ({
                        voiceUsers: { ...state.voiceUsers, [userId]: userData },
                    })),

                /** Remove a user from the voice channel. */
                removeVoiceUser: (userId) =>
                    set((state) => {
                        const newUsers = { ...state.voiceUsers };
                        delete newUsers[userId];
                        return { voiceUsers: newUsers };
                    }),

                /** Replace all voice users. */
                setVoiceUsers: (users) => set({ voiceUsers: users }),

                /** Set a user's speaking state. */
                setSpeaking: (userId, isSpeaking) =>
                    set((state) => {
                        if (isSpeaking) {
                            return {
                                speakingUsers: state.speakingUsers.includes(userId)
                                    ? state.speakingUsers
                                    : [...state.speakingUsers, userId],
                            };
                        } else {
                            return {
                                speakingUsers: state.speakingUsers.filter((id) => id !== userId),
                            };
                        }
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
                /** Set voice connection quality indicator. */
                setConnectionQuality: (quality) => set({ connectionQuality: quality }),
                /** Set current voice latency in ms. */
                setLatency: (latency) => set({ latency }),
                /** Set packet loss percentage. */
                setPacketLoss: (loss) => set({ packetLoss: loss }),

                // --- RESET (for testing / logout) ---
                /** Reset all voice state to defaults. */
                reset: () =>
                    set({
                        isInVoiceChat: false,
                        currentVoiceRoom: null,
                        currentServerId: null,
                        isMuted: false,
                        isDeafened: false,
                        isCameraOn: false,
                        isScreenSharing: false,
                        voiceUsers: {},
                        speakingUsers: [] as string[],
                        connectionQuality: 'good',
                        latency: 0,
                        packetLoss: 0,
                    }),
            }),
            {
                name: 'pawscord-voice-store',
                partialize: (state) => ({
                    // Only persist audio preferences, not transient voice session state
                    inputDevice: state.inputDevice,
                    outputDevice: state.outputDevice,
                    inputVolume: state.inputVolume,
                    outputVolume: state.outputVolume,
                    noiseSuppression: state.noiseSuppression,
                    echoCancellation: state.echoCancellation,
                    autoGainControl: state.autoGainControl,
                    pushToTalk: state.pushToTalk,
                    pushToTalkKey: state.pushToTalkKey,
                }),
            }
        ),
        { name: 'pawscord-voice-store' }
    )
);

// --- SELECTORS (prevent unnecessary re-renders) ---
/** Select whether the user is in a voice chat. */
export const selectIsInVoice = (state: VoiceStore) => state.isInVoiceChat;
/** Select the current voice room ID. */
export const selectCurrentVoiceRoom = (state: VoiceStore) => state.currentVoiceRoom;
/** Select the mute state. */
export const selectIsMuted = (state: VoiceStore) => state.isMuted;
/** Select the deafen state. */
export const selectIsDeafened = (state: VoiceStore) => state.isDeafened;
/** Select voice connection quality. */
export const selectVoiceQuality = (state: VoiceStore) => state.connectionQuality;
/** Select voice latency. */
export const selectVoiceLatency = (state: VoiceStore) => state.latency;
/** Select all voice users in the current room. */
export const selectVoiceUsers = (state: VoiceStore) => state.voiceUsers;
/** Select the count of voice users. */
export const selectVoiceUserCount = (state: VoiceStore) => Object.keys(state.voiceUsers).length;

// Hook selectors
export const useIsInVoice = () => useVoiceStore((s) => s.isInVoiceChat);
export const useIsMuted = () => useVoiceStore((s) => s.isMuted);
export const useVoiceQuality = () => useVoiceStore((s) => s.connectionQuality);

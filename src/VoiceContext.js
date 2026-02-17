import { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import toast from './utils/toast';
import { spatialAudio } from './SpatialAudioEngine';
import { createVoiceEffect } from './VoiceContext/voiceEffects';
import { useVoiceSettings } from './VoiceContext/useVoiceSettings';
import { useRecording } from './VoiceContext/useRecording';
import { useStatsMonitoring } from './VoiceContext/useStatsMonitoring';
import { useAudioVisualizer } from './VoiceContext/useAudioVisualizer';
import { useMediaControls } from './VoiceContext/useMediaControls';
import { useWebRTC } from './VoiceContext/useWebRTC';
import { useSignalHandler } from './VoiceContext/useSignalHandler';
import { useIceServers } from './VoiceContext/useIceServers';
import { useVAD } from './VoiceContext/useVAD';
import { usePTT } from './VoiceContext/usePTT';
import { useNoiseControl } from './VoiceContext/useNoiseControl';
import { useVoiceConnection } from './VoiceContext/useVoiceConnection';

const VoiceContext = createContext(null);


export const VoiceProvider = ({ children }) => {
    const { user, token } = useAuth();
    const username = user?.username;

    // State'ler
    const [isInVoice, setIsInVoice] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isDeafened, setIsDeafened] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [isTalking, setIsTalking] = useState(false);

    // 🎵 Voice Effects State
    const [activeVoiceEffect, setActiveVoiceEffect] = useState(null);
    const [voiceEffectIntensity, setVoiceEffectIntensity] = useState(50);

    // Medya Akışları
    const [localAudioStream, setLocalAudioStream] = useState(null);
    const [localCameraStream, setLocalCameraStream] = useState(null);
    const [localScreenStream, setLocalScreenStream] = useState(null);
    const [remoteStreams, setRemoteStreams] = useState({});
    const [connectedUsers, setConnectedUsers] = useState([]); // 🆕 Bağlı kullanıcılar
    const [lastReaction, setLastReaction] = useState(null);
    const [cinemaState, setCinemaState] = useState({
        isActive: false,
        url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
        playing: false,
        time: 0,
        lastSyncAction: null,
        timestamp: 0
    });
    const [gameState, setGameState] = useState({
        gameType: 'rps',
        moves: {},
        result: null,
        players: [],
        currentTurn: null
    });

    // Voice Panel UI State (used by App.js)
    const [useNewVoicePanel] = useState(true);
    const [showVoiceIsland, setShowVoiceIsland] = useState(false);
    const [isVoicePanelMinimized, setIsVoicePanelMinimized] = useState(false);
    const [focusedStream, setFocusedStream] = useState(null);
    const [islandState, setIslandState] = useState('collapsed');

    // Voice Settings (localStorage-backed state)
    const {
        noiseGateThreshold, isNoiseGateEnabled,
        isVisualizerEnabled,
        remoteVolumes, setRemoteVolumes, mutedUsers, setMutedUsers,
        isSpatialAudioEnabled, setIsSpatialAudioEnabled,
        vadSensitivity, isNoiseSuppressionEnabled, setIsNoiseSuppressionEnabled,
        noiseSuppressionLevel, screenShareQuality, screenShareFPS,
        includeSystemAudio, isPTTMode, setIsPTTMode,
        pttKey, isPTTActive, setIsPTTActive,
        setRemoteVolume,
        updateVadSensitivity, updateNoiseSuppressionLevel,
        updateScreenQuality, updateScreenFPS, toggleSystemAudio,
        toggleNoiseGate, updateNoiseGateThreshold, toggleVisualizer,
        updatePTTKey,
    } = useVoiceSettings();

    // 🔧 ICE/TURN Servers Hook
    const { iceServers } = useIceServers({ token });
    const [isReconnecting, setIsReconnecting] = useState(false);

    // Ref'ler
    const voiceWsRef = useRef(null);
    const peerConnectionsRef = useRef({});
    const audioContextRef = useRef(null);
    const globalAudioContextRef = useRef(null); // 🔥 PERFORMANS: Global AudioContext (RAM optimization)
    const localStreamRef = useRef(null);
    const localCameraStreamRef = useRef(null); // 🔥 Camera stream ref
    const localScreenStreamRef = useRef(null); // 🔥 Screen stream ref
    const joinVoiceRoomRef = useRef(null); // 🔥 Ref for joinVoiceRoom (used in handleSignalMessage before definition)
    const leaveVoiceRoomRef = useRef(null); // 🔥 Ref for leaveVoiceRoom (used in useSignalHandler)

    // 🎵 Voice Effect Refs
    const voiceEffectNodesRef = useRef(null);
    const processedStreamRef = useRef(null);

    // 🎙️ Recording Hook
    const {
        isRecording, recordingDuration,
        startRecording, stopRecording, downloadRecording,
    } = useRecording({ isInVoice, localAudioStream, remoteStreams, currentRoom });

    // 📊 Stats Monitoring Hook
    const { connectionStats, startStatsMonitoring, stopStatsMonitoring } = useStatsMonitoring();

    // 📊 Audio Visualizer Hook
    const { audioVisualizerData, startVisualizer, stopVisualizer } = useAudioVisualizer({
        isVisualizerEnabled, localAudioStream, remoteStreams, isInVoice, globalAudioContextRef
    });

    useEffect(() => {
        localStreamRef.current = localAudioStream;
    }, [localAudioStream]);

    // 🔥 Sync camera stream to ref
    useEffect(() => {
        localCameraStreamRef.current = localCameraStream;
    }, [localCameraStream]);

    // 🔥 Sync screen stream to ref
    useEffect(() => {
        localScreenStreamRef.current = localScreenStream;
    }, [localScreenStream]);

    // 🔥 Voice Activity Detection Hook
    useVAD({ localAudioStream, isInVoice, isMuted, vadSensitivity, setIsTalking, globalAudioContextRef });

    const initializeAudio = useCallback(() => {
        if (!audioContextRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContextRef.current = new AudioContext();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    }, []);

    // 🔥 YENİ: Spatial Audio Toggle
    const toggleSpatialAudio = useCallback(async () => {
        const newState = !isSpatialAudioEnabled;

        if (newState) {
            // Spatial audio'yu aç
            try {
                await spatialAudio.initialize();

                // Mevcut kullanıcıları spatial audio'ya ekle
                Object.keys(remoteStreams).forEach((streamKey, index) => {
                    const stream = remoteStreams[streamKey];
                    const username = streamKey.replace('_camera', '').replace('_screen', '');

                    // Sadece audio stream'leri ekle (kamera/ekran değil)
                    if (!streamKey.includes('_camera') && !streamKey.includes('_screen')) {
                        // Dairesel dizilim ile pozisyon ver
                        const angle = (index / Object.keys(remoteStreams).length) * 2 * Math.PI;
                        const position = {
                            x: Math.cos(angle) * 3,
                            y: 0,
                            z: Math.sin(angle) * 3
                        };

                        spatialAudio.addUser(username, stream, position);
                    }
                });

            } catch (err) {
                console.error('Failed to enable spatial audio:', err);
                toast.warning('Spatial Audio başlatılamadı. Tarayıcınız desteklemiyor olabilir.');
                return;
            }
        } else {
            // Spatial audio'yu kapat
            spatialAudio.destroy();
        }

        setIsSpatialAudioEnabled(newState);
        localStorage.setItem('pawscord_spatial_audio', newState.toString());
    }, [isSpatialAudioEnabled, remoteStreams]);

    // 🔥 Noise Control Hook
    const { toggleNoiseSuppression } = useNoiseControl({
        isNoiseSuppressionEnabled, setIsNoiseSuppressionEnabled,
        localAudioStream, setLocalAudioStream, localStreamRef
    });

    // 🔥 Push-to-Talk Hook
    const { togglePTTMode } = usePTT({
        isPTTMode, setIsPTTMode, isInVoice, pttKey,
        isPTTActive, setIsPTTActive, localStreamRef, setIsMuted
    });

    // 🔥 YENİ: Spatial audio state değişince remote stream'leri güncelle
    useEffect(() => {
        if (!isSpatialAudioEnabled) return;

        // Yeni stream eklenince spatial audio'ya da ekle
        Object.keys(remoteStreams).forEach((streamKey, index) => {
            const stream = remoteStreams[streamKey];
            const username = streamKey.replace('_camera', '').replace('_screen', '');

            // Sadece audio stream'leri
            if (!streamKey.includes('_camera') && !streamKey.includes('_screen')) {
                // Eğer zaten eklenmemişse ekle
                if (!spatialAudio.spatialNodes[username]) {
                    const angle = (index / Object.keys(remoteStreams).length) * 2 * Math.PI;
                    const position = {
                        x: Math.cos(angle) * 3,
                        y: 0,
                        z: Math.sin(angle) * 3
                    };

                    spatialAudio.addUser(username, stream, position);
                }
            }
        });
    }, [remoteStreams, isSpatialAudioEnabled]);

    // 🔥 WebRTC Hook - peer connection, signaling, bandwidth management
    const {
        sendSignal,
        adjustBandwidth,
        handleRemoteStream,
        createPeerConnection,
        iceCandidateBufferRef,
        addLocalStreamsToPeer,
    } = useWebRTC({
        username,
        voiceWsRef,
        peerConnectionsRef,
        localStreamRef,
        localCameraStreamRef,
        localScreenStreamRef,
        setRemoteStreams,
        setIsReconnecting,
        initializeAudio,
    });

    // 🔥 Signal Handler Hook - handles all WebSocket signal messages
    const { handleSignalMessage } = useSignalHandler({
        username,
        isMuted,
        isVideoEnabled,
        isScreenSharing,
        isTalking,
        createPeerConnection,
        sendSignal,
        iceCandidateBufferRef,
        addLocalStreamsToPeer,
        peerConnectionsRef,
        localStreamRef,
        localCameraStreamRef,
        localScreenStreamRef,
        joinVoiceRoomRef,
        setRemoteStreams,
        setConnectedUsers,
        setLastReaction,
        setGameState,
        setCinemaState,
        setIsReconnecting,
        leaveVoiceRoomRef,
    });


    // 🔥 Voice Connection Hook (joinVoiceRoom + leaveVoiceRoom)
    const { joinVoiceRoom, leaveVoiceRoom } = useVoiceConnection({
        username, token,
        isInVoice, setIsInVoice,
        currentRoom, setCurrentRoom,
        isMuted, setIsMuted,
        isVideoEnabled, isScreenSharing,
        setIsDeafened, setIsConnecting,
        setLocalAudioStream,
        localCameraStream, setLocalCameraStream, setIsVideoEnabled,
        localScreenStream, setLocalScreenStream, setIsScreenSharing,
        localStreamRef, localCameraStreamRef, localScreenStreamRef,
        voiceWsRef, peerConnectionsRef,
        audioContextRef, globalAudioContextRef,
        iceCandidateBufferRef,
        joinVoiceRoomRef, leaveVoiceRoomRef,
        isNoiseSuppressionEnabled, isPTTMode,
        iceServers, initializeAudio,
        handleSignalMessage,
        setRemoteStreams, setConnectedUsers,
        setIsReconnecting,
        stopRecording,
    });

    // --- TOGGLE FUNCTIONS (extracted to useMediaControls hook) ---
    const { toggleMute, toggleDeafened, toggleVideo, toggleCamera, toggleScreenShare } = useMediaControls({
        sendSignal,
        voiceWsRef,
        peerConnectionsRef,
        localStreamRef,
        localCameraStreamRef,
        localScreenStreamRef,
        setIsMuted,
        setIsDeafened,
        setIsVideoEnabled,
        setIsScreenSharing,
        setLocalCameraStream,
        setLocalScreenStream,
        screenShareQuality,
        screenShareFPS,
        includeSystemAudio
    });

    // 🎵 VOICE EFFECTS IMPLEMENTATION
    const applyVoiceEffect = useCallback(async (effectType, intensity = 50) => {
        if (!localAudioStream || !isInVoice) {
            console.warn('[VoiceEffect] No stream or not in voice');
            return;
        }

        try {
            // Clear previous effect
            if (voiceEffectNodesRef.current) {
                voiceEffectNodesRef.current.forEach(node => {
                    try { node.disconnect(); } catch (_) { /* AudioNode already disconnected */ }
                });
                voiceEffectNodesRef.current = null;
            }

            // If effectType is null, remove effect
            if (!effectType) {
                setActiveVoiceEffect(null);
                return;
            }

            const audioContext = globalAudioContextRef.current || new AudioContext();
            if (!globalAudioContextRef.current) globalAudioContextRef.current = audioContext;

            const { nodes, outputStream } = createVoiceEffect(effectType, intensity, audioContext, localAudioStream);

            voiceEffectNodesRef.current = nodes;
            processedStreamRef.current = outputStream;
            setActiveVoiceEffect(effectType);
            setVoiceEffectIntensity(intensity);


        } catch (error) {
            console.error('[VoiceEffect] Error:', error);
            toast.error('Ses efekti uygulanamadı');
        }
    }, [localAudioStream, isInVoice]);

    // 💬 SEND REACTION
    const sendReaction = useCallback((emoji) => {
        if (!voiceWsRef.current || voiceWsRef.current.readyState !== WebSocket.OPEN) {
            console.warn('[Reaction] WebSocket not connected');
            return;
        }

        voiceWsRef.current.send(JSON.stringify({
            type: 'voice_reaction',
            emoji: emoji
        }));

    }, []);

    // 🎮 SEND GAME SIGNAL
    const sendGameSignal = useCallback((gameType, action, move = null, target = null) => {
        if (!voiceWsRef.current || voiceWsRef.current.readyState !== WebSocket.OPEN) {
            console.warn('[Game] WebSocket not connected');
            return;
        }

        voiceWsRef.current.send(JSON.stringify({
            type: 'game_signal',
            game_type: gameType,
            action: action,
            move: move,
            target: target
        }));

    }, []);

    // 🎬 SEND CINEMA SYNC
    const sendCinemaSync = useCallback((action, time = 0, url = null) => {
        if (!voiceWsRef.current || voiceWsRef.current.readyState !== WebSocket.OPEN) {
            console.warn('[Cinema] WebSocket not connected');
            return;
        }

        voiceWsRef.current.send(JSON.stringify({
            type: 'cinema_sync',
            action: action,
            time: time,
            url: url
        }));

    }, []);








    // Cleanup on unmount or leave
    useEffect(() => {
        return () => {
            stopRecording();
            stopStatsMonitoring();
        };
    }, [stopRecording, stopStatsMonitoring]);

    return (
        <VoiceContext.Provider value={{
            isInVoice,
            isConnecting,
            currentRoom,
            isMuted,
            isDeafened,
            isVideoEnabled,
            isScreenSharing,
            isTalking,
            isSpatialAudioEnabled,
            vadSensitivity,
            isNoiseSuppressionEnabled,
            screenShareQuality,
            screenShareFPS,
            isRecording,
            recordingDuration,
            isPTTMode,
            isPTTActive,
            pttKey,
            includeSystemAudio,
            localStream: localAudioStream,
            localAudioStream,
            localCameraStream,
            localScreenStream,
            remoteStreams,
            connectedUsers, // 🆕
            remoteVolumes,
            mutedUsers,
            joinVoiceRoom,
            leaveVoiceRoom,
            joinChannel: joinVoiceRoom,
            leaveChannel: leaveVoiceRoom,
            setRemoteVolume,
            setIsMuted,
            setIsDeafened,
            setIsVideoEnabled,
            setIsScreenSharing,
            toggleMute,
            toggleDeafened,
            toggleVideo,
            toggleCamera, // 🆕 Alias
            toggleScreenShare,
            toggleSpatialAudio, // 🔥 YENİ: Spatial audio toggle
            updateVadSensitivity,
            toggleNoiseSuppression,
            updateScreenQuality,
            updateScreenFPS,
            toggleSystemAudio,
            togglePTTMode,
            updatePTTKey,
            startRecording,
            stopRecording,
            downloadRecording, // 🔥 YENİ: Manuel download
            sendSignal,
            isPttActive: isPTTActive,
            // 💬 Reaction System
            sendReaction,
            lastReaction,
            // 🎵 Voice Effects
            applyVoiceEffect,
            activeVoiceEffect,
            activeEffect: activeVoiceEffect, // Alias used by App.js
            voiceEffectIntensity,
            setVoiceEffectIntensity,
            // 🎬 Cinema Mode
            cinemaState,
            setCinemaState,
            sendCinemaSync,
            // 🎮 Games
            gameState,
            setGameState,
            sendGameSignal,
            // 📊 WebRTC Stats
            connectionStats,
            startStatsMonitoring,
            stopStatsMonitoring,
            // 🔧 Advanced Settings
            noiseSuppressionLevel,
            updateNoiseSuppressionLevel, // 🔥 Gelişmiş gürültü engelleme seviyesi
            iceServers,
            isReconnecting,
            adjustBandwidth,
            // 🎚️ YENİ: Noise Gate
            noiseGateThreshold,
            isNoiseGateEnabled,
            toggleNoiseGate,
            updateNoiseGateThreshold,
            // 📊 YENİ: Audio Visualizer
            audioVisualizerData,
            isVisualizerEnabled,
            toggleVisualizer,
            startVisualizer,
            stopVisualizer,
            // 🖥️ Voice Panel UI
            useNewVoicePanel,
            showVoiceIsland, setShowVoiceIsland,
            isVoicePanelMinimized, setIsVoicePanelMinimized,
            focusedStream, setFocusedStream,
            islandState, setIslandState,
        }}>
            {children}
        </VoiceContext.Provider>
    );
};

export const useVoice = () => useContext(VoiceContext);



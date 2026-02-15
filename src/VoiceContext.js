import { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import toast from './utils/toast';
import { spatialAudio } from './SpatialAudioEngine';
import { API_URL_BASE_STRING, WS_PROTOCOL, API_HOST, isElectron } from './utils/constants';
import { authFetch } from './utils/authFetch';
import { DEFAULT_ICE_SERVERS, setRtcIceServers } from './VoiceContext/constants';
import { applyProfessionalAudioFilters } from './VoiceContext/audioProcessing';
import { createVoiceEffect } from './VoiceContext/voiceEffects';
import { useVoiceSettings } from './VoiceContext/useVoiceSettings';
import { useRecording } from './VoiceContext/useRecording';
import { useStatsMonitoring } from './VoiceContext/useStatsMonitoring';
import { useAudioVisualizer } from './VoiceContext/useAudioVisualizer';
import { useMediaControls } from './VoiceContext/useMediaControls';
import { useWebRTC } from './VoiceContext/useWebRTC';
import { useSignalHandler } from './VoiceContext/useSignalHandler';

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

    // 🔧 TURN / ICE sunucularını backend'den çek ve güncelle
    const [iceServers, setIceServers] = useState(DEFAULT_ICE_SERVERS);
    const [isReconnecting, setIsReconnecting] = useState(false);

    // 🔥 YENİ: WebSocket Auto-Reconnect State
    const [wsReconnectAttempt, setWsReconnectAttempt] = useState(0);
    const [wsReconnectDelay, setWsReconnectDelay] = useState(1000); // Başlangıç 1 saniye
    const wsReconnectTimeoutRef = useRef(null);
    const wsHealthCheckIntervalRef = useRef(null);
    const lastRoomRef = useRef(null); // Son bağlanılan oda

    const refreshIceServers = useCallback(async () => {
        // Skip if no token (not authenticated)
        if (!token) {
            setIceServers(DEFAULT_ICE_SERVERS);
            setRtcIceServers(DEFAULT_ICE_SERVERS);
            return;
        }

        // 🔥 TURN SERVER ENABLED - Production-ready
        // TURN server backend'den credentials alır (coturn HMAC-SHA1 ile)
        // Fallback olarak STUN-only kullanılır

        try {
            // 🔥 authFetch kullanarak otomatik token refresh
            const res = await authFetch(`${API_URL_BASE_STRING}/api/voice/turn-credentials/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                // 401 = token expired, 403 = permission denied
                if (res.status === 401 || res.status === 403) {
                    console.warn('🧊 [RTC] Auth failed, using STUN only');
                } else {
                    console.warn(`🧊 [RTC] TURN fetch failed (${res.status}), using STUN only`);
                }
                throw new Error(`TURN fetch failed ${res.status}`);
            }

            const data = await res.json();
            const newServers = [...DEFAULT_ICE_SERVERS, ...(data?.iceServers || [])];
            setIceServers(newServers);
            setRtcIceServers(newServers);
        } catch (err) {
            // Fallback to STUN-only (always works)
            console.warn('🧊 [RTC] Using STUN-only mode:', err.message);
            setIceServers(DEFAULT_ICE_SERVERS);
            setRtcIceServers(DEFAULT_ICE_SERVERS);
        }
    }, [token]);

    useEffect(() => {
        refreshIceServers();
    }, [refreshIceServers]);

    // Ref'ler
    const voiceWsRef = useRef(null);
    const peerConnectionsRef = useRef({});
    const audioContextRef = useRef(null);
    const globalAudioContextRef = useRef(null); // 🔥 PERFORMANS: Global AudioContext (RAM optimization)
    const localStreamRef = useRef(null);
    const localCameraStreamRef = useRef(null); // 🔥 Camera stream ref
    const localScreenStreamRef = useRef(null); // 🔥 Screen stream ref
    const isLeavingRef = useRef(false); // 🔥 Prevent recursive leave calls
    const isSwitchingRef = useRef(false); // 🔥 Prevent infinite switch loop
    const joinVoiceRoomRef = useRef(null); // 🔥 Ref for joinVoiceRoom (used in handleSignalMessage before definition)
    const leaveVoiceRoomRef = useRef(null); // 🔥 Ref for leaveVoiceRoom (used in useSignalHandler)
    const micHealthIntervalRef = useRef(null); // 🔥 Mic watchdog

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

    // 🔥 VOICE ACTIVITY DETECTION (VAD) - İyileştirilmiş
    useEffect(() => {
        if (!localAudioStream || !isInVoice || isMuted) {
            setIsTalking(false);
            return;
        }

        // 🔥 PERFORMANS: Global AudioContext kullan (RAM optimizasyonu)
        if (!globalAudioContextRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            globalAudioContextRef.current = new AudioContext();
        }

        const audioContext = globalAudioContextRef.current;
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;  // 🔥 Hassas analiz
        analyser.smoothingTimeConstant = 0.85;  // 🔥 İYİLEŞTİRME: 0.8'den 0.85'e - daha stabil
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const source = audioContext.createMediaStreamSource(localAudioStream);
        source.connect(analyser);

        let talkingTimeout = null;
        const THRESHOLD = vadSensitivity;
        const TALKING_DELAY = 150;

        // 🚀 OPTIMIZATION: setInterval (25ms = 40Hz) — requestAnimationFrame yerine
        // Background tab'larda RAF 1Hz'e düşüyor ve VAD çalışmıyor, setInterval tutarlı.
        const vadIntervalId = setInterval(() => {
            analyser.getByteFrequencyData(dataArray);

            // Konuşma frekansları (300Hz - 3kHz)
            const speechRange = dataArray.slice(10, 100);
            const average = speechRange.reduce((a, b) => a + b, 0) / speechRange.length;

            if (average > THRESHOLD) {
                setIsTalking(true);
                if (talkingTimeout) clearTimeout(talkingTimeout);
                talkingTimeout = setTimeout(() => setIsTalking(false), TALKING_DELAY);
            }
        }, 25); // 40Hz — yeterince hızlı, CPU-friendly

        return () => {
            clearInterval(vadIntervalId);
            if (talkingTimeout) clearTimeout(talkingTimeout);
            source.disconnect();
        };
    }, [localAudioStream, isInVoice, isMuted, vadSensitivity]); // 🔥 YENİ: vadSensitivity dependency

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

    // 🔥 YENİ: Noise Suppression Toggle (fallback ile)
    // 🔥 GELİŞMİŞ GÜRÜLTÜ ENGELLEMESİ - Noise Gate ile birlikte
    const toggleNoiseSuppression = useCallback(async () => {
        const newState = !isNoiseSuppressionEnabled;
        setIsNoiseSuppressionEnabled(newState);
        localStorage.setItem('pawscord_noise_suppression', newState.toString());

        // Mevcut audio track'e uygula
        if (localAudioStream) {
            const audioTrack = localAudioStream.getAudioTracks()[0];
            if (audioTrack && audioTrack.applyConstraints) {
                try {
                    await audioTrack.applyConstraints({
                        noiseSuppression: newState,
                        echoCancellation: true,
                        autoGainControl: true
                    });
                } catch (err) {
                    console.warn('[Noise] Failed to apply, trying fallback getUserMedia:', err);
                    try {
                        const fresh = await navigator.mediaDevices.getUserMedia({
                            audio: {
                                noiseSuppression: newState,
                                echoCancellation: true,
                                autoGainControl: true,
                                // 🔥 GELİŞMİŞ SES AYARLARI
                                googHighpassFilter: true,
                                googNoiseSuppression: newState,
                                googNoiseSuppression2: newState,
                                googEchoCancellation: true,
                                googAutoGainControl: true,
                                googTypingNoiseDetection: true, // Klavye sesi engelleme
                                sampleRate: { ideal: 48000 },
                                latency: { ideal: 0.01 }, // Daha düşük latency
                                channelCount: { ideal: 1 } // Mono = daha iyi gürültü engelleme
                            }
                        });
                        const track = fresh.getAudioTracks()[0];
                        const newStream = new MediaStream([track]);
                        setLocalAudioStream(newStream);
                        localStreamRef.current = newStream;
                    } catch (e2) {
                        console.error('[Noise] Fallback failed:', e2);
                    }
                }
            }
        }
    }, [isNoiseSuppressionEnabled, localAudioStream]);

    // 🔥 YENİ: PTT Mode Toggle
    const togglePTTMode = useCallback(() => {
        const newMode = !isPTTMode;
        setIsPTTMode(newMode);
        localStorage.setItem('pawscord_ptt_mode', newMode.toString());

        if (newMode) {
            // PTT mode'da mikrofon başlangıçta kapalı
            if (localStreamRef.current) {
                localStreamRef.current.getAudioTracks().forEach(track => {
                    track.enabled = false;
                });
            }
            setIsMuted(true);
        } else {
            // Normal mode'a dönünce mikrofonu aç
            if (localStreamRef.current) {
                localStreamRef.current.getAudioTracks().forEach(track => {
                    track.enabled = true;
                });
            }
            setIsMuted(false);
        }
    }, [isPTTMode]);

    // 🔥 YENİ: PTT Keyboard Listener
    useEffect(() => {
        if (!isPTTMode || !isInVoice) return;

        const handleKeyDown = (e) => {
            // Eğer input/textarea içindeyse PTT'yi tetikleme
            const target = e.target;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                return;
            }

            if (e.code === pttKey && !e.repeat) {
                setIsPTTActive(true);
                // Mikrofonu aç
                if (localStreamRef.current) {
                    localStreamRef.current.getAudioTracks().forEach(track => {
                        track.enabled = true;
                    });
                }
            }
        };

        const handleKeyUp = (e) => {
            if (e.code === pttKey) {
                setIsPTTActive(false);
                // Mikrofonu kapat
                if (localStreamRef.current) {
                    localStreamRef.current.getAudioTracks().forEach(track => {
                        track.enabled = false;
                    });
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isPTTMode, isInVoice, pttKey]);

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

    // --- SESLİ SOHBETTEN AYRILMA ---
    const leaveVoiceRoom = useCallback(() => {
        // 🔥 FIX: Prevent recursive calls
        if (isLeavingRef.current) {
            return;
        }
        isLeavingRef.current = true;

        // 🔥 CRITICAL: Send leave signal BEFORE closing WebSocket
        if (voiceWsRef.current && voiceWsRef.current.readyState === WebSocket.OPEN) {
            try {
                voiceWsRef.current.send(JSON.stringify({
                    type: 'user_leaving',
                    sender_username: username
                }));
            } catch (e) {
                console.warn("[Voice] Failed to send leave signal:", e);
            }
        }

        // 1. Streamleri Durdur
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => {
                track.stop();
            });
            setLocalAudioStream(null);
            localStreamRef.current = null;
        }

        // 1.1 Kamera stream'ini durdur
        if (localCameraStream) {
            localCameraStream.getTracks().forEach(track => {
                track.stop();
            });
            setLocalCameraStream(null);
            setIsVideoEnabled(false);
        }

        // 1.2 Ekran paylaşım stream'ini durdur
        if (localScreenStream) {
            localScreenStream.getTracks().forEach(track => {
                track.stop();
            });
            setLocalScreenStream(null);
            setIsScreenSharing(false);
        }

        // 2. Peer Connectionları Kapat
        Object.entries(peerConnectionsRef.current).forEach(([user, pc]) => {
            pc.close();
        });
        peerConnectionsRef.current = {};
        setRemoteStreams({});

        // 🔥 FIX: Clear ICE candidate buffer
        iceCandidateBufferRef.current = {};

        // 3. WebSocket Kapat (onclose tetiklenmeden)
        if (voiceWsRef.current) {
            voiceWsRef.current.onclose = null; // Remove handler to prevent recursive call
            voiceWsRef.current.close();
            voiceWsRef.current = null;
        }

        setIsInVoice(false);
        setCurrentRoom(null);
        setIsConnecting(false);
        setIsMuted(false);
        setIsDeafened(false);

        // 🔥 YENİ: Recording cleanup
        stopRecording();

        // 🔥 Watchdog temizliği
        if (micHealthIntervalRef.current) {
            clearInterval(micHealthIntervalRef.current);
            micHealthIntervalRef.current = null;
        }

        // 🔥 YENİ: WebSocket reconnect timeout temizliği
        if (wsReconnectTimeoutRef.current) {
            clearTimeout(wsReconnectTimeoutRef.current);
            wsReconnectTimeoutRef.current = null;
        }

        // 🔥 YENİ: WebSocket health check temizliği
        if (wsHealthCheckIntervalRef.current) {
            clearInterval(wsHealthCheckIntervalRef.current);
            wsHealthCheckIntervalRef.current = null;
        }

        // 🔥 YENİ: Reconnect state reset
        setWsReconnectAttempt(0);
        setWsReconnectDelay(1000);
        setIsReconnecting(false);

        // Reset flag after a short delay
        setTimeout(() => {
            isLeavingRef.current = false;
        }, 100);
    }, [username, localCameraStream, localScreenStream, stopRecording]);

    // --- SESLİ SOHBETE KATILMA ---
    const joinVoiceRoom = useCallback(async (roomSlug) => {
        // � Token yoksa bağlanma (auth gerekli)
        if (!token) {
            console.warn('[VoiceWS] No auth token, skipping voice join');
            return;
        }

        // �🔄 Eğer zaten bir kanalda ise ve farklı bir kanala geçmek isteniyorsa
        if (isInVoice && currentRoom && currentRoom !== roomSlug && !isSwitchingRef.current) {

            // 🔒 Switching flag set et (sonsuz döngü önleme)
            isSwitchingRef.current = true;

            // 🚀 OPTIMIZATION: Fire-and-forget WS close — bekleme yok!
            if (voiceWsRef.current) {
                const ws = voiceWsRef.current;
                // Leave sinyali gönder (diğer kullanıcılar anında haberdar olsun)
                try {
                    ws.send(JSON.stringify({ type: 'user_leaving', sender_username: username }));
                } catch (e) { /* WS zaten kapalı olabilir */ }
                ws.onclose = null; // Reconnect tetiklemesin
                ws.onerror = null;
                ws.onmessage = null;
                ws.close(1000, 'Switching channel');
                voiceWsRef.current = null;
            }

            // Peer connections'ı hemen kapat (sıfır bekleme)
            Object.values(peerConnectionsRef.current).forEach((pc) => pc.close());
            peerConnectionsRef.current = {};
            setRemoteStreams({});
            iceCandidateBufferRef.current = {};

            // 🚀 OPTIMIZATION: Mic stream'i KORUYORUZ — yeniden getUserMedia çağrısı yok!
            // localStreamRef.current hâlâ canlı, yeni kanala taşınacak

            isSwitchingRef.current = false; // Reset flag

            // Şimdi yeni kanala katılmayı devam ettir (aşağıdaki normal flow)
        }

        // 🛑 Eğer aynı kanalda isek, tekrar katılma
        if (isInVoice && currentRoom === roomSlug) {
            return;
        }

        // Switching sırasında skip
        if (isSwitchingRef.current) {
            return;
        }

        setIsConnecting(true);
        setCurrentRoom(roomSlug);

        try {
            // 🔥 TURN bilgisi zaten state’de; ikinci kez fetch etme
            if (iceServers && iceServers.length > 0) {
                setRtcIceServers(iceServers);
            }

            // 🚀 OPTIMIZATION: Mevcut mic stream varsa yeniden getUserMedia çağırma!
            let processedStream;
            const existingTrack = localStreamRef.current?.getAudioTracks()?.[0];
            if (existingTrack && existingTrack.readyState === 'live') {
                // ⚡ Channel switch — mevcut mic stream'i kullan (0ms!)
                processedStream = localStreamRef.current;
            } else {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        // 🔥 Echo Cancellation (Yankı Önleme) - AÇIK
                        echoCancellation: true,
                        // 🔥 Noise Suppression (Gürültü Engelleme) - HER ZAMAN AÇIK
                        noiseSuppression: true,
                        // 🔥 Auto Gain Control - AÇIK (ses seviyesi dengelemesi)
                        autoGainControl: true,
                        // 🔥 CIZIRTIYI ÖNLE: Sample rate ve buffer ayarları
                        sampleRate: { ideal: 48000 },  // WebRTC standart (exact yerine ideal)
                        sampleSize: { ideal: 16 },     // 16-bit audio
                        channelCount: { ideal: 1 },    // Mono (stereo cızırtı yapabilir)
                        // 🔥 Chrome-specific AGRESIF gürültü engelleme
                        googEchoCancellation: true,
                        googAutoGainControl: true,
                        googNoiseSuppression: true,    // 🔥 HER ZAMAN AÇIK
                        googHighpassFilter: true,      // 🔥 Düşük frekans cızırtıları engeller
                        googTypingNoiseDetection: true, // Klavye sesi engeller
                        googAudioMirroring: false,     // 🔥 Ses yansımasını engelle
                        // 🔥 CIZIRTIYI ÖNLE: Latency ayarı
                        latency: { ideal: 0.02 }       // 20ms (10ms çok düşük - cızırtı yapabilir)
                    },
                    video: false
                });

                processedStream = stream;
                if (isNoiseSuppressionEnabled) {
                    try {
                        processedStream = applyProfessionalAudioFilters(stream, globalAudioContextRef);
                    } catch (filterError) {
                        console.warn('⚠️ [Voice] Professional filters failed:', filterError);
                        processedStream = stream;
                    }
                }
            } // end else (new mic acquisition)

            setLocalAudioStream(processedStream);
            localStreamRef.current = processedStream;

            // 🔥 Muted ise track'i kapat, switch sonrası mute durumunu koru
            processedStream.getAudioTracks().forEach(track => {
                track.enabled = !isMuted;
            });

            initializeAudio();
            // 🔥 Mic watchdog başlat
            if (!micHealthIntervalRef.current) {
                micHealthIntervalRef.current = setInterval(async () => {
                    const current = localStreamRef.current;
                    const track = current?.getAudioTracks()?.[0];
                    if (!isInVoice || isLeavingRef.current) return;

                    // AudioContext suspend olmuşsa uyandır
                    if (audioContextRef.current?.state === 'suspended') {
                        await audioContextRef.current.resume().catch(() => { });
                    }

                    // Track yok, bitmiş ya da beklenmedik şekilde disabled ise yeniden al
                    if (!track || track.readyState === 'ended' || (!track.enabled && !isMuted && !isPTTMode)) {
                        try {
                            // 🔥 AGRESİF gürültü engelleme ile yeni stream al
                            const fresh = await navigator.mediaDevices.getUserMedia({
                                audio: {
                                    echoCancellation: true,
                                    noiseSuppression: true,  // 🔥 HER ZAMAN AÇIK
                                    autoGainControl: true,
                                    googEchoCancellation: true,
                                    googNoiseSuppression: true,  // 🔥 HER ZAMAN AÇIK
                                    googHighpassFilter: true,
                                    googTypingNoiseDetection: true,
                                    sampleRate: 48000,
                                    channelCount: 1
                                },
                                video: false
                            });

                            // 🔥 Direkt stream kullan - profesyonel filtreler ses kesebiliyor
                            setLocalAudioStream(fresh);
                            localStreamRef.current = fresh;

                            // Mevcut peer sender'larına track replace et
                            const newTrack = fresh.getAudioTracks()[0];
                            Object.values(peerConnectionsRef.current).forEach((pc) => {
                                pc.getSenders()
                                    .filter((s) => s.track?.kind === 'audio')
                                    .forEach((sender) => sender.replaceTrack(newTrack).catch(() => { }));
                            });

                        } catch (err) {
                            console.warn('[Mic Watchdog] Mic refresh failed:', err);
                        }
                    }
                }, 8000);
            }

            // 2. WebSocket Bağlantısı
            const wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/voice/${roomSlug}/?token=${token}`;
            const ws = new WebSocket(wsUrl);
            voiceWsRef.current = ws;

            ws.onopen = () => {
                setIsInVoice(true);
                setIsConnecting(false);

                // 🔥 YENİ: Kendinizi HEMEN listeye ekleyin (Optimistic Update)
                setConnectedUsers(prev => {
                    const meInList = prev.some(u => u.username === username);
                    if (meInList) return prev;

                    return [{
                        username: username,
                        isMuted: isMuted,
                        isCameraOn: isVideoEnabled,
                        isScreenSharing: isScreenSharing,
                        isTalking: false
                    }, ...prev];
                });
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    handleSignalMessage(data);
                } catch (e) {
                    console.error("[VoiceWS] Parse error:", e);
                }
            };

            ws.onerror = (error) => {
                console.error("🎤 [VoiceWS] Error:", error);
                setIsConnecting(false);

                // 🔥 YENİ: Error durumunda da reconnect hazırlığı
                if (!isLeavingRef.current && !isSwitchingRef.current) {
                    console.warn("[VoiceWS] Error occurred, reconnect will be attempted on close");
                }
            };

            ws.onclose = (event) => {

                // 🔥 GELIŞMIŞ AUTO-RECONNECT SISTEMI

                // 1️⃣ Bilinçli çıkış kontrolü
                if (isLeavingRef.current || isSwitchingRef.current) {
                    setIsReconnecting(false);
                    setWsReconnectAttempt(0);
                    setWsReconnectDelay(1000);
                    if (wsReconnectTimeoutRef.current) {
                        clearTimeout(wsReconnectTimeoutRef.current);
                        wsReconnectTimeoutRef.current = null;
                    }
                    return;
                }

                // 2️⃣ Normal kapanma (code 1000) kontrolü
                if (event.code === 1000) {
                    leaveVoiceRoom();
                    return;
                }

                // 2.5️⃣ Auth rejection (4001 = origin fail, 4003 = auth fail, 1006 = abnormal before accept)
                if (event.code === 4001 || event.code === 4003 || (!token && event.code === 1006)) {
                    console.warn(`[VoiceWS] Auth/origin rejection (code: ${event.code}), not retrying`);
                    leaveVoiceRoom();
                    return;
                }

                // 3️⃣ Beklenmedik kapanma - AUTO RECONNECT
                if (roomSlug && isInVoice) {
                    const maxRetries = 10; // Maksimum 10 deneme
                    const currentAttempt = wsReconnectAttempt + 1;

                    if (currentAttempt > maxRetries) {
                        console.error(`[VoiceWS] ❌ Max retry limit reached (${maxRetries}), giving up`);
                        toast.error(`Sesli sohbet bağlantısı ${maxRetries} denemeden sonra kurulamadı. Lütfen sayfayı yenileyin.`, 5000);
                        leaveVoiceRoom();
                        setWsReconnectAttempt(0);
                        setWsReconnectDelay(1000);
                        return;
                    }

                    // Exponential backoff: 1s, 2s, 4s, 8s, 16s, max 30s
                    const delay = Math.min(wsReconnectDelay, 30000);

                    console.warn(`[VoiceWS] 🔄 Unexpected disconnect (code: ${event.code})`);

                    setIsReconnecting(true);
                    setWsReconnectAttempt(currentAttempt);

                    // Clear any existing timeout
                    if (wsReconnectTimeoutRef.current) {
                        clearTimeout(wsReconnectTimeoutRef.current);
                    }

                    // Schedule reconnection
                    wsReconnectTimeoutRef.current = setTimeout(() => {
                        if (!isLeavingRef.current && !isSwitchingRef.current && roomSlug) {

                            // Exponential backoff: Double the delay for next time
                            setWsReconnectDelay(prev => Math.min(prev * 2, 30000));

                            // Reconnect
                            joinVoiceRoom(roomSlug).then(() => {
                                // Başarılı reconnection - Reset counters
                                setWsReconnectAttempt(0);
                                setWsReconnectDelay(1000);
                                setIsReconnecting(false);
                            }).catch(err => {
                                console.error("[VoiceWS] Reconnection failed:", err);
                                // Başarısız - bir sonraki deneme zaten schedule edilecek
                            });
                        } else {
                            setIsReconnecting(false);
                            setWsReconnectAttempt(0);
                            setWsReconnectDelay(1000);
                        }
                    }, delay);
                } else {
                    leaveVoiceRoom();
                }
            };

        } catch (err) {
            console.error("Voice Join Error:", err);
            setIsConnecting(false);
            isSwitchingRef.current = false;

            if (err.name === 'NotAllowedError') {
                toast.warning("Mikrofon izni reddedildi. Lütfen tarayıcı ayarlarından izin verin.", 5000);
            } else if (err.name === 'NotFoundError') {
                toast.warning("Mikrofon bulunamadı. Lütfen bir mikrofon bağlayın.");
            } else {
                toast.error("Sesli sohbete bağlanılamadı: " + err.message);
            }
        }
    }, [isInVoice, currentRoom, token, handleSignalMessage, initializeAudio, leaveVoiceRoom]);

    // 🔥 Keep joinVoiceRoomRef in sync (for use in handleSignalMessage before definition)
    useEffect(() => {
        joinVoiceRoomRef.current = joinVoiceRoom;
        leaveVoiceRoomRef.current = leaveVoiceRoom;
    }, [joinVoiceRoom, leaveVoiceRoom]);

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
            if (micHealthIntervalRef.current) {
                clearInterval(micHealthIntervalRef.current);
                micHealthIntervalRef.current = null;
            }
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



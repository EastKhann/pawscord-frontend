import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import logger from './utils/logger';
import toast from './utils/toast';
import { spatialAudio } from './SpatialAudioEngine'; // 🔥 YENİ: Spatial Audio import
import { API_URL_BASE_STRING, WS_PROTOCOL, API_HOST, isElectron } from './utils/constants';
import { authFetch } from './utils/authFetch'; // 🔥 Token auto-refresh

const VoiceContext = createContext(null);

// --- SENİN AYARLARIN ---
// frontend/src/VoiceContext.js

// 🔥 YENİ: ICE servers backend'den alınacak (TURN credentials güvenliği için)
// Sadece STUN servers burada tanımlı (public ve güvenli)
const DEFAULT_ICE_SERVERS = [
    // Google STUN (Reliable, public, free)
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
    // 🔥 YENİ: Ek STUN sunucuları (redundancy)
    { urls: "stun:stun.cloudflare.com:3478" },
    { urls: "stun:stun.services.mozilla.com:3478" },
    { urls: "stun:stun.stunprotocol.org:3478" },
    // 🔥 FALLBACK TURN: Sunucu TURN'a erişilemezse kullanılacak (OpenRelay - ücretsiz)
    {
        urls: "turn:openrelay.metered.ca:80",
        username: "openrelayproject",
        credential: "openrelayproject"
    },
    {
        urls: "turn:openrelay.metered.ca:443",
        username: "openrelayproject",
        credential: "openrelayproject"
    },
    {
        urls: "turn:openrelay.metered.ca:443?transport=tcp",
        username: "openrelayproject",
        credential: "openrelayproject"
    }
];
// ⚠️ TURN servers Backend'den alınacak (güvenlik) - Fallback olarak yukarıdakiler kullanılır
// 🔥 REDUNDANT TURN: Birden fazla TURN server destegi icin backend API'den liste geliyor

// WebRTC Configuration (başlangıçta sadece STUN ile)
let RTC_CONFIGURATION = {
    iceServers: DEFAULT_ICE_SERVERS,
    iceCandidatePoolSize: 10,
    iceTransportPolicy: 'all',
    bundlePolicy: 'max-bundle',
    rtcpMuxPolicy: 'require'
};
// Tek kaynaklı TURN yönetimi: join sırasında tekrar fetch etme, state’ten kullan
const setRtcIceServers = (servers) => {
    RTC_CONFIGURATION = { ...RTC_CONFIGURATION, iceServers: servers };
};

// 🔥 Platform detection now imported from constants.js
// isElectron, API_URL_BASE_STRING, WS_PROTOCOL, API_HOST - all from constants.js

console.log('[VoiceContext] 🎯 isElectron:', isElectron, 'API_URL:', API_URL_BASE_STRING, 'WS_PROTOCOL:', WS_PROTOCOL, 'API_HOST:', API_HOST);

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
    const [isRecording, setIsRecording] = useState(false); // 🔥 Kayıt durumu
    const [recordingDuration, setRecordingDuration] = useState(0);

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

    // 📊 WebRTC Stats
    const [connectionStats, setConnectionStats] = useState({});

    // 🎚️ YENİ: Noise Gate State
    const [noiseGateThreshold, setNoiseGateThreshold] = useState(() => {
        try {
            return parseInt(localStorage.getItem('pawscord_noise_gate')) || -50;
        } catch { return -50; }
    });
    const [isNoiseGateEnabled, setIsNoiseGateEnabled] = useState(() => {
        try {
            return localStorage.getItem('pawscord_noise_gate_enabled') !== 'false';
        } catch { return true; }
    });

    // 📊 YENİ: Audio Visualizer State
    const [audioVisualizerData, setAudioVisualizerData] = useState({
        local: new Uint8Array(128),
        remote: {}
    });
    const [isVisualizerEnabled, setIsVisualizerEnabled] = useState(() => {
        try {
            return localStorage.getItem('pawscord_visualizer') === 'true';
        } catch { return false; }
    });

    // Ses Seviyeleri & Mute
    const [remoteVolumes, setRemoteVolumes] = useState(() => {
        try { return JSON.parse(localStorage.getItem('pawscord_user_volumes')) || {}; } catch { return {}; }
    });
    const [mutedUsers, setMutedUsers] = useState(new Set());
    const [isSpatialAudioEnabled, setIsSpatialAudioEnabled] = useState(() => {
        // 🔥 YENİ: Spatial audio ayarını localStorage'dan yükle
        try {
            return localStorage.getItem('pawscord_spatial_audio') === 'true';
        } catch {
            return false; // Varsayılan kapalı (yeni kullanıcılar için)
        }
    });

    // 🔥 YENİ: VAD Sensitivity ve Noise Suppression ayarları
    const [vadSensitivity, setVadSensitivity] = useState(() => {
        try {
            return parseInt(localStorage.getItem('pawscord_vad_sensitivity')) || 45;
        } catch {
            return 45; // Varsayılan threshold
        }
    });

    const [isNoiseSuppressionEnabled, setIsNoiseSuppressionEnabled] = useState(() => {
        try {
            const saved = localStorage.getItem('pawscord_noise_suppression');
            // 🔥 FIX: Varsayılan AÇIK - gürültü engelleme aktif olsun
            return saved === null ? true : saved === 'true';
        } catch {
            return true; // 🔥 FIX: Varsayılan AÇIK
        }
    });

    // 🔥 YENİ: Gürültü Engelleme Seviyesi - Varsayılan 'medium' (ses kısılmasın)
    const [noiseSuppressionLevel, setNoiseSuppressionLevel] = useState(() => {
        try {
            const voiceSettings = JSON.parse(localStorage.getItem('voice_settings') || '{}');
            return voiceSettings.audio?.noiseSuppressionLevel || 'medium';  // 🔥 Varsayılan ORTA
        } catch {
            return 'medium';  // 🔥 Varsayılan ORTA
        }
    });

    // 🔥 YENİ: Screen Share Quality
    const [screenShareQuality, setScreenShareQuality] = useState(() => {
        try {
            return localStorage.getItem('pawscord_screen_quality') || '1080p';
        } catch {
            return '1080p';
        }
    });

    const [screenShareFPS, setScreenShareFPS] = useState(() => {
        try {
            return parseInt(localStorage.getItem('pawscord_screen_fps')) || 30;
        } catch {
            return 30;
        }
    });

    // 🔥 YENİ: System Audio (Ekran paylaşımında sistem sesi)
    const [includeSystemAudio, setIncludeSystemAudio] = useState(() => {
        try {
            return localStorage.getItem('pawscord_system_audio') !== 'false';
        } catch {
            return false;
        }
    });

    // 🔥 YENİ: Push-to-Talk
    const [isPTTMode, setIsPTTMode] = useState(() => {
        try {
            return localStorage.getItem('pawscord_ptt_mode') === 'true';
        } catch {
            return false;
        }
    });

    const [pttKey, setPTTKey] = useState(() => {
        try {
            return localStorage.getItem('pawscord_ptt_key') || 'Space';
        } catch {
            return 'Space';
        }
    });

    const [isPTTActive, setIsPTTActive] = useState(false);


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
            console.log('🧊 [RTC] No token, using STUN only');
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
            console.log('🧊 [RTC] ICE servers updated with TURN credentials:', newServers.length, 'servers');
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
    const recordingChunksRef = useRef([]); // 🔥 Kayıt buffer
    const mediaRecorderRef = useRef(null);
    const recordingIntervalRef = useRef(null);
    const isLeavingRef = useRef(false); // 🔥 Prevent recursive leave calls
    const isSwitchingRef = useRef(false); // 🔥 Prevent infinite switch loop
    const micHealthIntervalRef = useRef(null); // 🔥 Mic watchdog

    // 🎵 Voice Effect Refs
    const voiceEffectNodesRef = useRef(null);
    const processedStreamRef = useRef(null);
    const statsIntervalRef = useRef(null); // WebRTC stats polling

    // Ses Ayarlarını Kaydet
    useEffect(() => {
        localStorage.setItem('pawscord_user_volumes', JSON.stringify(remoteVolumes));
    }, [remoteVolumes]);

    const setRemoteVolume = useCallback((targetUsername, volume) => {
        setRemoteVolumes(prev => ({
            ...prev,
            [targetUsername]: Math.max(0, Math.min(100, volume))
        }));
    }, []);

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
            console.log('🎵 [Performance] Global AudioContext created (reused for all users)');
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
        const THRESHOLD = vadSensitivity;  // 🔥 YENİ: Dinamik threshold (kullanıcı ayarlayabilir)
        const TALKING_DELAY = 150;
        let animationId = null;

        const checkAudioLevel = () => {
            analyser.getByteFrequencyData(dataArray);

            // 🔥 Sadece konuşma frekanslarını (300Hz - 3kHz) kontrol et
            const speechRange = dataArray.slice(10, 100);
            const average = speechRange.reduce((a, b) => a + b, 0) / speechRange.length;

            if (average > THRESHOLD) {
                setIsTalking(true);
                if (talkingTimeout) clearTimeout(talkingTimeout);
                talkingTimeout = setTimeout(() => setIsTalking(false), TALKING_DELAY);
            }

            if (isInVoice && !isMuted) {
                animationId = requestAnimationFrame(checkAudioLevel);
            }
        };

        checkAudioLevel();

        return () => {
            if (talkingTimeout) clearTimeout(talkingTimeout);
            if (animationId) cancelAnimationFrame(animationId);
            source.disconnect();
            // 🔥 PERFORMANS: Global context'i kapatma, sadece disconnect et
            // audioContext.close(); // Kaldırıldı - global context korunuyor
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
                        console.log(`🎧 [Spatial] Added ${username} at angle ${(angle * 180 / Math.PI).toFixed(0)}°`);
                    }
                });

                console.log('🎧 [Spatial Audio] ENABLED - 3D audio active!');
            } catch (err) {
                console.error('Failed to enable spatial audio:', err);
                toast.warning('Spatial Audio başlatılamadı. Tarayıcınız desteklemiyor olabilir.');
                return;
            }
        } else {
            // Spatial audio'yu kapat
            spatialAudio.destroy();
            console.log('🎧 [Spatial Audio] DISABLED - Normal stereo audio');
        }

        setIsSpatialAudioEnabled(newState);
        localStorage.setItem('pawscord_spatial_audio', newState.toString());
    }, [isSpatialAudioEnabled, remoteStreams]);

    // 🔥 YENİ: VAD Sensitivity Güncelleme
    const updateVadSensitivity = useCallback((newSensitivity) => {
        const clamped = Math.max(20, Math.min(80, newSensitivity)); // 20-80 arası
        setVadSensitivity(clamped);
        localStorage.setItem('pawscord_vad_sensitivity', clamped.toString());
        console.log(`🎚️ [VAD] Sensitivity updated: ${clamped}`);
    }, []);

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
                    console.log(`🎛️ [Noise Suppression] ${newState ? 'ENABLED' : 'DISABLED'}`);
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
                        console.log('[Noise] Enhanced fallback stream acquired');
                    } catch (e2) {
                        console.error('[Noise] Fallback failed:', e2);
                    }
                }
            }
        }
    }, [isNoiseSuppressionEnabled, localAudioStream]);

    // 🔥 YENİ: Gürültü Engelleme Seviyesini Güncelle
    const updateNoiseSuppressionLevel = useCallback((level) => {
        const validLevels = ['low', 'medium', 'high', 'aggressive'];
        const newLevel = validLevels.includes(level) ? level : 'high';
        setNoiseSuppressionLevel(newLevel);

        // LocalStorage'a kaydet
        try {
            const voiceSettings = JSON.parse(localStorage.getItem('voice_settings') || '{}');
            voiceSettings.audio = { ...voiceSettings.audio, noiseSuppressionLevel: newLevel };
            localStorage.setItem('voice_settings', JSON.stringify(voiceSettings));
        } catch (e) {
            console.error('[Noise Level] Storage error:', e);
        }

        console.log(`🎛️ [Noise Level] Updated to: ${newLevel}`);
    }, []);

    // 🔥 YENİ: System Audio Toggle (Ekran paylaşımında)
    const toggleSystemAudio = useCallback((enabled) => {
        setIncludeSystemAudio(enabled);
        localStorage.setItem('pawscord_system_audio', enabled.toString());
        console.log(`🔊 [System Audio] ${enabled ? 'ENABLED' : 'DISABLED'}`);
    }, []);

    // 🔥 YENİ: PTT Mode Toggle
    const togglePTTMode = useCallback(() => {
        const newMode = !isPTTMode;
        setIsPTTMode(newMode);
        localStorage.setItem('pawscord_ptt_mode', newMode.toString());

        if (newMode) {
            console.log('🎙️ [PTT] Mode enabled, VAD disabled');
            // PTT mode'da mikrofon başlangıçta kapalı
            if (localStreamRef.current) {
                localStreamRef.current.getAudioTracks().forEach(track => {
                    track.enabled = false;
                });
            }
            setIsMuted(true);
        } else {
            console.log('🎙️ [PTT] Mode disabled, VAD enabled');
            // Normal mode'a dönünce mikrofonu aç
            if (localStreamRef.current) {
                localStreamRef.current.getAudioTracks().forEach(track => {
                    track.enabled = true;
                });
            }
            setIsMuted(false);
        }
    }, [isPTTMode]);

    // 🔥 YENİ: PTT Key Update
    const updatePTTKey = useCallback((key) => {
        setPTTKey(key);
        localStorage.setItem('pawscord_ptt_key', key);
        console.log(`⌨️ [PTT] Key updated to: ${key}`);
    }, []);

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
                console.log('🎙️ [PTT] Key pressed, mic ON');
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
                console.log('🎙️ [PTT] Key released, mic OFF');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isPTTMode, isInVoice, pttKey]);

    // 🔥 YENİ: Screen Quality Update
    const updateScreenQuality = useCallback((quality) => {
        setScreenShareQuality(quality);
        localStorage.setItem('pawscord_screen_quality', quality);
        console.log(`📺 [Screen Quality] Updated to: ${quality}`);
    }, []);

    // 🔥 YENİ: Screen FPS Update
    const updateScreenFPS = useCallback((fps) => {
        const fpsInt = parseInt(fps);
        setScreenShareFPS(fpsInt);
        localStorage.setItem('pawscord_screen_fps', fpsInt.toString());
        console.log(`🎬 [Screen FPS] Updated to: ${fpsInt}`);
    }, []);

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
                    console.log(`🎧 [Spatial] Auto-added ${username}`);
                }
            }
        });
    }, [remoteStreams, isSpatialAudioEnabled]);

    // 🎙️ NOISE SUPPRESSION - Gürültü Engelleme (ADVANCED)
    const applyNoiseSuppression = useCallback(async (stream) => {
        try {
            const audioTracks = stream.getAudioTracks();
            if (audioTracks.length === 0) return stream;

            const audioTrack = audioTracks[0];

            // 🔥 AGRESIF Noise Suppression Ayarları
            const advancedConstraints = {
                // Standard WebRTC
                echoCancellation: { exact: true },
                noiseSuppression: { exact: true },
                autoGainControl: { exact: true },

                // Google Chrome Advanced
                googEchoCancellation: { exact: true },
                googAutoGainControl: { exact: true },
                googNoiseSuppression: { exact: true },
                googHighpassFilter: { exact: true },  // 🔥 Düşük frekans filtresi
                googTypingNoiseDetection: { exact: true },  // 🔥 Klavye sesi
                googAudioMirroring: false,

                // Gain Control (Ses seviyesi dengesi)
                googAutoGainControl2: { exact: true },

                // Echo Cancellation Level
                echoCancellationType: 'system'  // System-level echo cancellation
            };

            // Mevcut constraints'i güncelle
            if (audioTrack.applyConstraints) {
                try {
                    await audioTrack.applyConstraints(advancedConstraints);
                    logger.audio('🎯 ADVANCED noise suppression enabled');
                } catch (err) {
                    // Bazı tarayıcılar advanced constraints'i desteklemeyebilir
                    // Fallback to basic
                    await audioTrack.applyConstraints({
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true
                    });
                    logger.audio('✅ Basic noise suppression enabled (fallback)');
                }
            }

            return stream;
        } catch (error) {
            logger.warn('Could not apply noise suppression:', error);
            return stream;
        }
    }, []);

    // 🎚️ PROFESYONEL SES FİLTRELEME - Noise Gate + Compressor + Adaptive Filter
    const applyProfessionalAudioFilters = useCallback((stream) => {
        try {
            // 🔥 GÜRÜLTÜ ENGELLEMİE SEVİYESİNE GÖRE AYARLAR
            const voiceSettings = JSON.parse(localStorage.getItem('voice_settings') || '{}');
            const level = voiceSettings.audio?.noiseSuppressionLevel || 'high';

            // Seviyeye göre parametreler - 🔥 AGRESİF GÜRÜLTÜ ENGELLEMİE
            const levelSettings = {
                low: {
                    gateThreshold: -70,      // dB eşiği
                    compressorThreshold: -15,
                    compressorRatio: 2,
                    highPassFreq: 50,        // 50Hz altı kes (fan, AC sesi)
                    lowPassFreq: 14000,      // 14kHz üstü kes
                    gateRelease: 0.3,
                    speechThreshold: 20      // Konuşma algılama eşiği
                },
                medium: {
                    gateThreshold: -60,
                    compressorThreshold: -20,
                    compressorRatio: 3,
                    highPassFreq: 80,        // 80Hz altı kes
                    lowPassFreq: 12000,
                    gateRelease: 0.25,
                    speechThreshold: 25
                },
                high: {
                    gateThreshold: -50,      // 🔥 Daha agresif
                    compressorThreshold: -25,
                    compressorRatio: 4,
                    highPassFreq: 100,       // 🔥 100Hz altı kes (daha agresif)
                    lowPassFreq: 10000,      // 🔥 10kHz üstü kes
                    gateRelease: 0.2,
                    speechThreshold: 30      // 🔥 Daha yüksek eşik
                },
                aggressive: {
                    gateThreshold: -45,      // 🔥 ÇOK agresif
                    compressorThreshold: -30,
                    compressorRatio: 6,
                    highPassFreq: 120,       // 🔥 120Hz altı kes
                    lowPassFreq: 8000,       // 🔥 8kHz üstü kes (tiz gürültüler)
                    gateRelease: 0.15,
                    speechThreshold: 35      // 🔥 Yüksek eşik
                }
            };

            const settings = levelSettings[level] || levelSettings.high;
            console.log(`🔊 [Audio] Noise suppression level: ${level}`, settings);

            // 🔥 PERFORMANS: Global AudioContext kullan (10 kullanıcı = 10 context yerine 1 context!)
            if (!globalAudioContextRef.current) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                // 🔥 CIZIRTIYI ÖNLE: Sample rate eşleştir + latency hint
                globalAudioContextRef.current = new AudioContext({
                    sampleRate: 48000,  // WebRTC standart sample rate
                    latencyHint: 'interactive'  // Düşük gecikme modu
                });
                console.log('🎵 [Performance] Global AudioContext created (48kHz, interactive mode)');
            }

            const audioContext = globalAudioContextRef.current;

            // 🔥 CIZIRTIYI ÖNLE: Suspended context'i resume et
            if (audioContext.state === 'suspended') {
                audioContext.resume().then(() => {
                    console.log('🎵 [Audio] AudioContext resumed from suspended state');
                });
            }

            // Source stream
            const source = audioContext.createMediaStreamSource(stream);

            // 1️⃣ NOISE GATE (Gürültü Kapısı) - SEVİYEYE GÖRE
            // Belli desibelin altındaki sesleri tamamen kes
            const noiseGateNode = audioContext.createGain();
            let isGateOpen = true; // 🔥 Başlangıçta açık
            const GATE_THRESHOLD = settings.gateThreshold; // dB (seviyeye göre)
            const GATE_ATTACK = 0.005;  // Daha hızlı açılma
            const GATE_RELEASE = settings.gateRelease;  // Seviyeye göre

            // 2️⃣ COMPRESSOR (Dinamik Sıkıştırma) - SEVİYEYE GÖRE
            // 🔥 CIZIRTIYI ÖNLE: Daha yumuşak sıkıştırma
            const compressor = audioContext.createDynamicsCompressor();
            compressor.threshold.value = settings.compressorThreshold;      // dB threshold (seviyeye göre)
            compressor.knee.value = 30;            // 🔥 40'tan 30'a - daha yumuşak geçiş
            compressor.ratio.value = Math.min(settings.compressorRatio, 4);  // 🔥 Max 4:1 ratio (cızırtı önler)
            compressor.attack.value = 0.003;       // 🔥 3ms - daha hızlı (click önler)
            compressor.release.value = 0.15;       // 🔥 150ms - daha kısa (pumping önler)

            // 3️⃣ HIGH-PASS FILTER (Düşük Frekans Kesici) - SEVİYEYE GÖRE
            // Fan, AC, trafik seslerini filtrele
            const highPassFilter = audioContext.createBiquadFilter();
            highPassFilter.type = 'highpass';
            highPassFilter.frequency.value = settings.highPassFreq;   // Seviyeye göre frekans
            highPassFilter.Q.value = 0.707;        // 🔥 Butterworth Q değeri (düz frekans yanıtı - cızırtı önler)

            // 4️⃣ LOW-PASS FILTER (Yüksek Frekans Kesici) - SEVİYEYE GÖRE
            // Elektronik gürültü, hiss seslerini filtrele
            const lowPassFilter = audioContext.createBiquadFilter();
            lowPassFilter.type = 'lowpass';
            lowPassFilter.frequency.value = settings.lowPassFreq;  // Seviyeye göre frekans
            lowPassFilter.Q.value = 0.707;         // 🔥 Butterworth Q değeri (düz frekans yanıtı)

            // 🔥 5️⃣ NOTCH FILTER - 50Hz/60Hz hum (elektrik gürültüsü) engelleme
            const notchFilter = audioContext.createBiquadFilter();
            notchFilter.type = 'notch';
            notchFilter.frequency.value = 50;      // 50Hz (TR elektrik şebekesi)
            notchFilter.Q.value = 10;              // Dar bant (sadece 50Hz civarı)

            // 6️⃣ DE-ESSER (Tıslama/Cızırtı azaltıcı) - 4-8kHz bandını yumuşat
            const deEsser = audioContext.createBiquadFilter();
            deEsser.type = 'peaking';
            deEsser.frequency.value = 6000;        // 6kHz (sibilant bölgesi)
            deEsser.Q.value = 1;                   // Geniş bant
            deEsser.gain.value = -3;               // 🔥 -3dB azaltma (cızırtı için)

            // 7️⃣ ADAPTIVE NOISE REDUCTION (Dinamik Gürültü Azaltma)
            // Sessiz anlarda gürültü profilini öğren ve çıkar
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 2048;
            analyser.smoothingTimeConstant = 0.85; // 🔥 Daha yumuşak geçiş

            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            let noiseProfile = new Float32Array(analyser.frequencyBinCount);
            let learningPhase = true;
            let silentFrames = 0;

            // Gürültü profili öğrenme
            const learnNoiseProfile = () => {
                analyser.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((a, b) => a + b) / dataArray.length;

                if (average < 20) { // Sessiz an
                    silentFrames++;
                    if (silentFrames > 10) { // 10 frame sessizlik
                        // Gürültü profilini güncelle
                        for (let i = 0; i < dataArray.length; i++) {
                            noiseProfile[i] = Math.max(noiseProfile[i], dataArray[i]);
                        }
                    }
                } else {
                    silentFrames = 0;
                }

                if (learningPhase && silentFrames > 50) {
                    learningPhase = false;
                    console.log('🎯 [Audio] Noise profile learned');
                }
            };

            // Noise Gate kontrolü (VAD tabanlı)
            const speechThreshold = settings.speechThreshold || 25; // 🔥 Seviyeye göre eşik
            const updateNoiseGate = () => {
                analyser.getByteFrequencyData(dataArray);

                // Konuşma frekansları (300Hz - 3kHz) - daha geniş aralık
                const speechRange = dataArray.slice(8, 120);  // 🔥 Daha geniş frekans aralığı
                const speechLevel = speechRange.reduce((a, b) => a + b) / speechRange.length;

                // Gürültü profili çıkarılmış sinyal
                const cleanSignal = speechLevel - (noiseProfile[50] || 0);

                // Noise Gate mantığı - SEVİYEYE GÖRE AGRESİF
                const currentTime = audioContext.currentTime;
                if (cleanSignal > speechThreshold) { // 🔥 Konuşma algılandı (seviyeye göre eşik)
                    if (!isGateOpen) {
                        noiseGateNode.gain.setTargetAtTime(1.0, currentTime, GATE_ATTACK);
                        isGateOpen = true;
                    }
                } else { // Sessizlik - 🔥 HIZLI KAPANIŞ
                    if (isGateOpen) {
                        noiseGateNode.gain.setTargetAtTime(0.0, currentTime, GATE_RELEASE);
                        isGateOpen = false;
                    }
                }

                // Gürültü profili öğrenmeye devam et
                if (learningPhase || Math.random() < 0.01) {
                    learnNoiseProfile();
                }

                // 🔥 FIX: requestAnimationFrame yerine setInterval kullan (daha stabil)
                // requestAnimationFrame(updateNoiseGate); // ESKİ - CPU yoğun
            };

            // 🔥 FIX: Noise gate güncelleme interval'ı (30ms = ~33Hz - daha hızlı tepki)
            const noiseGateInterval = setInterval(updateNoiseGate, 30);

            // 8️⃣ SİNYAL ZİNCİRİ (Signal Chain) - GÜNCELLENDİ
            // source → highpass → notch(50Hz) → lowpass → deEsser → compressor → noise gate → destination
            source.connect(highPassFilter);
            highPassFilter.connect(notchFilter);
            notchFilter.connect(lowPassFilter);
            lowPassFilter.connect(deEsser);
            deEsser.connect(compressor);
            compressor.connect(noiseGateNode);
            noiseGateNode.connect(analyser);

            // Yeni stream oluştur
            const destination = audioContext.createMediaStreamDestination();
            noiseGateNode.connect(destination);

            // 🔥 CLEANUP: Stream temizlendiğinde interval'ı durdur
            destination.stream.addEventListener('inactive', () => {
                clearInterval(noiseGateInterval);
                console.log('🎚️ [Audio] Filter chain cleaned up');
            });

            console.log('🎚️ [Audio] Professional filters applied: Notch(50Hz) + De-Esser + Compressor + Noise Gate');

            return destination.stream;
        } catch (error) {
            console.error('❌ [Audio] Could not apply professional filters:', error);
            return stream; // Fallback to original
        }
    }, []);

    const sendSignal = useCallback((signal) => {
        if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
            logger.signal(`Sending ${signal.type} to ${signal.receiver_username || 'BROADCAST'}`);
            voiceWsRef.current.send(JSON.stringify({ ...signal, sender_username: username }));
        } else {
            logger.warn("[Signal] WS not ready, cannot send:", signal.type);
        }
    }, [username]);

    // 🔥 YENİ: Bandwidth Adaptasyonu - Ping'e göre video kalitesi ayarla
    const adjustBandwidth = useCallback((peerConnection, quality) => {
        try {
            const senders = peerConnection.getSenders();
            const videoSender = senders.find(sender => sender.track?.kind === 'video');

            if (!videoSender) {
                console.log('[Bandwidth] No video sender found, skipping adjustment');
                return;
            }

            const parameters = videoSender.getParameters();
            if (!parameters.encodings || parameters.encodings.length === 0) {
                parameters.encodings = [{}];
            }

            // Kalite ayarları
            const qualitySettings = {
                low: { maxBitrate: 300000, maxFramerate: 15 },      // 300kbps, 15fps (Mobil)
                medium: { maxBitrate: 800000, maxFramerate: 24 },   // 800kbps, 24fps
                high: { maxBitrate: 2500000, maxFramerate: 30 }     // 2.5Mbps, 30fps (Desktop)
            };

            const settings = qualitySettings[quality] || qualitySettings.medium;

            parameters.encodings[0].maxBitrate = settings.maxBitrate;
            parameters.encodings[0].maxFramerate = settings.maxFramerate;

            videoSender.setParameters(parameters)
                .then(() => {
                    console.log(`✅ [Bandwidth] Video quality set to ${quality.toUpperCase()} (${settings.maxBitrate / 1000}kbps, ${settings.maxFramerate}fps)`);
                })
                .catch(err => {
                    console.warn('[Bandwidth] Failed to set parameters:', err);
                });
        } catch (err) {
            console.warn('[Bandwidth] Error adjusting bandwidth:', err);
        }
    }, []);

    const handleRemoteStream = useCallback((partnerUsername, event) => {
        const { track } = event;
        logger.webrtc(`Track Received from ${partnerUsername}:`, track.kind, track.id, 'label:', track.label, 'hint:', track.contentHint);

        // ✅ FIX: Kamera ve ekran paylaşımını ayır
        // Not: contentHint WebRTC üzerinden transfer edilmez, label'e bakmalıyız
        const trackLabel = (track.label || '').toLowerCase();
        const isScreenTrack =
            trackLabel.includes('screen') ||
            trackLabel.includes('window') ||
            trackLabel.includes('monitor') ||
            trackLabel.includes('display') ||
            trackLabel.includes('tab') ||
            track.contentHint === 'detail'; // Lokal track için geçerli

        const streamKey = track.kind === 'video' && isScreenTrack
            ? `${partnerUsername}_screen`
            : track.kind === 'video'
                ? `${partnerUsername}_camera`
                : partnerUsername; // Audio için base key

        console.log(`📹 [WebRTC] Detected ${isScreenTrack ? 'SCREEN' : 'CAMERA'} track from ${partnerUsername}, key: ${streamKey}`);

        setRemoteStreams(prev => {
            const currentStream = prev[streamKey];

            if (currentStream) {
                // Aynı track ID'si varsa ekleme
                if (!currentStream.getTracks().some(t => t.id === track.id)) {
                    currentStream.addTrack(track);
                    const refreshedStream = new MediaStream(currentStream.getTracks());
                    console.log(`[WebRTC] Added track to existing stream: ${streamKey}`);
                    return { ...prev, [streamKey]: refreshedStream };
                }
                return prev;
            }

            // Yeni stream oluştur
            const newStream = new MediaStream([track]);
            console.log(`[WebRTC] Created new stream: ${streamKey}`);
            return { ...prev, [streamKey]: newStream };
        });

        if (track.kind === 'audio') {
            console.log(`[WebRTC] Audio track received from ${partnerUsername}`);
            initializeAudio();

            // 🔥 FIX: Tek yönlü ses sorunu - Audio elementi oluştur ve çal
            // Browser autoplay policy'si bazen remote audio'yu engelleyebilir
            try {
                const audioEl = document.createElement('audio');
                audioEl.id = `remote-audio-${partnerUsername}`;
                audioEl.srcObject = new MediaStream([track]);
                audioEl.autoplay = true;
                audioEl.playsInline = true;

                // Mevcut elementi kaldır (varsa)
                const existingEl = document.getElementById(`remote-audio-${partnerUsername}`);
                if (existingEl) existingEl.remove();

                // DOM'a ekle (görünmez)
                audioEl.style.display = 'none';
                document.body.appendChild(audioEl);

                // Play promise - autoplay engellenirse user gesture bekle
                audioEl.play().then(() => {
                    console.log(`🔊 [Audio] Playing remote audio from ${partnerUsername}`);
                }).catch(err => {
                    console.warn(`[Audio] Autoplay blocked for ${partnerUsername}, waiting for interaction:`, err.message);
                    // User gesture sonrası tekrar dene
                    const resumeAudio = () => {
                        audioEl.play().catch(() => { });
                        document.removeEventListener('click', resumeAudio);
                    };
                    document.addEventListener('click', resumeAudio, { once: true });
                });

                console.log(`✅ [Audio] Created audio element for ${partnerUsername}`);
            } catch (err) {
                console.error(`[Audio] Failed to create audio element for ${partnerUsername}:`, err);
            }
        } else if (track.kind === 'video') {
            console.log(`[WebRTC] Video track (${isScreenTrack ? 'screen' : 'camera'}) received from ${partnerUsername}`);
        }
    }, [initializeAudio]);

    // 🔥 FIX: Buffer ICE candidates until remote description is set
    const iceCandidateBufferRef = useRef({}); // { [username]: ICECandidate[] }

    const createPeerConnection = useCallback((partnerUsername, isInitiator = false) => {
        if (peerConnectionsRef.current[partnerUsername]) {
            logger.warn(`PC already exists for ${partnerUsername}`);
            return peerConnectionsRef.current[partnerUsername];
        }

        logger.webrtc(`Creating PC for ${partnerUsername} (Initiator: ${isInitiator})`);

        const pc = new RTCPeerConnection(RTC_CONFIGURATION);
        peerConnectionsRef.current[partnerUsername] = pc;

        // 🔥 YENİ: Codec Preferences - Opus için optimizasyon
        try {
            const transceivers = pc.getTransceivers();
            transceivers.forEach(transceiver => {
                if (transceiver.sender && transceiver.sender.track?.kind === 'audio') {
                    const codecs = RTCRtpSender.getCapabilities('audio')?.codecs || [];
                    // Opus codec'i öncelikli yap
                    const opusCodecs = codecs.filter(c => c.mimeType.toLowerCase().includes('opus'));
                    const otherCodecs = codecs.filter(c => !c.mimeType.toLowerCase().includes('opus'));
                    const orderedCodecs = [...opusCodecs, ...otherCodecs];
                    if (transceiver.setCodecPreferences && orderedCodecs.length > 0) {
                        transceiver.setCodecPreferences(orderedCodecs);
                        console.log('🎵 [Codec] Opus prioritized for audio');
                    }
                }
            });
        } catch (e) {
            console.warn('[Codec] setCodecPreferences not supported:', e.message);
        }

        // 🔥 YENİ: Global window'a expose et (connection quality monitoring için)
        if (typeof window !== 'undefined') {
            window.__pawscord_peer_connections__ = peerConnectionsRef.current;
        }

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                logger.signal(`Sending candidate to ${partnerUsername}`);
                sendSignal({
                    type: 'candidate',
                    candidate: event.candidate,
                    receiver_username: partnerUsername
                });
            }
        };

        pc.ontrack = (event) => handleRemoteStream(partnerUsername, event);

        // 🔥 FIX: Sadece audio stream'i otomatik ekle (mic)
        // Camera/screen stream'leri user_joined event'inde eklenir
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => {
                logger.webrtc(`Adding local audio track to PC for ${partnerUsername}:`, track.kind);
                pc.addTrack(track, localStreamRef.current);
            });
        } else {
            logger.warn(`No local stream available when creating PC for ${partnerUsername}`);
        }

        pc.oniceconnectionstatechange = () => {
            console.log(`[WebRTC] ICE State (${partnerUsername}):`, pc.iceConnectionState);

            if (pc.iceConnectionState === 'failed') {
                console.warn(`[WebRTC] ICE failed with ${partnerUsername}, attempting restart...`);
                setIsReconnecting(true);
                refreshIceServers().finally(() => {
                    pc.restartIce();
                    setTimeout(() => setIsReconnecting(false), 1500);
                });

            } else if (pc.iceConnectionState === 'disconnected') {
                console.warn(`[WebRTC] ICE disconnected from ${partnerUsername}, waiting for reconnection...`);
                setIsReconnecting(true);

                // 🔥 İYİLEŞTİRME: 15 saniye timeout (mobil kullanıcılar için artırıldı)
                setTimeout(() => {
                    if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'failed') {
                        console.error(`[WebRTC] ICE reconnection timeout for ${partnerUsername}, cleaning up...`);
                        setRemoteStreams(prev => {
                            const newStreams = { ...prev };
                            delete newStreams[partnerUsername];
                            return newStreams;
                        });
                        if (peerConnectionsRef.current[partnerUsername]) {
                            peerConnectionsRef.current[partnerUsername].close();
                            delete peerConnectionsRef.current[partnerUsername];
                        }
                    }
                    setIsReconnecting(false);
                }, 15000); // 10000'den 15000'e artırıldı

            } else if (pc.iceConnectionState === 'closed') {
                console.log(`[WebRTC] ICE closed for ${partnerUsername}, cleaning up...`);
                setRemoteStreams(prev => {
                    const newStreams = { ...prev };
                    delete newStreams[partnerUsername];
                    return newStreams;
                });
                if (peerConnectionsRef.current[partnerUsername]) {
                    delete peerConnectionsRef.current[partnerUsername];
                }
                setIsReconnecting(false);
            } else if (pc.iceConnectionState === 'connected') {
                console.log(`✅ [WebRTC] ICE connected with ${partnerUsername}`);
                setIsReconnecting(false);

                // 🔥 YENİ: Bandwidth Adaptasyonu - Ping ve packet loss'a göre kalite ayarla
                setTimeout(async () => {
                    try {
                        const stats = await pc.getStats();

                        stats.forEach(report => {
                            if (report.type === 'candidate-pair' && report.state === 'succeeded') {
                                const rtt = report.currentRoundTripTime * 1000; // ms cinsine çevir

                                console.log(`📊 [Bandwidth] ${partnerUsername} RTT: ${rtt.toFixed(0)}ms`);

                                // Yüksek ping (300ms+) veya çok yüksek ping (500ms+)
                                if (rtt > 500) {
                                    console.warn(`⚠️ [Bandwidth] High latency detected (${rtt.toFixed(0)}ms), reducing video quality to LOW`);
                                    adjustBandwidth(pc, 'low');
                                } else if (rtt > 300) {
                                    console.warn(`⚠️ [Bandwidth] Medium latency detected (${rtt.toFixed(0)}ms), reducing video quality to MEDIUM`);
                                    adjustBandwidth(pc, 'medium');
                                } else {
                                    console.log(`✅ [Bandwidth] Good connection (${rtt.toFixed(0)}ms), using HIGH quality`);
                                    adjustBandwidth(pc, 'high');
                                }
                            }
                        });
                    } catch (err) {
                        console.warn('[Bandwidth] Failed to get stats:', err);
                    }
                }, 2000); // 2 saniye sonra kontrol et (bağlantı stabilize olsun)

            } else if (pc.iceConnectionState === 'checking') {
                console.log(`🔍 [WebRTC] ICE checking with ${partnerUsername}`);
            }
        };

        return pc;
    }, [sendSignal, handleRemoteStream]);

    const handleSignalMessage = useCallback(async (data) => {
        // 🧹 KICKED (Inactivity cleanup)
        if (data.type === 'kicked') {
            console.warn('🔴 [Voice] Kicked from channel:', data.reason, data.message);
            toast.warning(`Sesli Kanaldan Çıkarıldınız\n\nNeden: ${data.message}`, 5000);
            leaveVoiceRoom();
            return;
        }

        // 🔥 VIDEO ENDED - Karşı taraf kamerayı/ekranı kapattı
        if (data.type === 'video_ended') {
            const senderUsername = data.from || data.username;
            const streamType = data.streamType || 'camera';
            const streamKey = `${senderUsername}_${streamType}`;

            console.log(`📹 [Video] ${senderUsername} ended ${streamType} stream`);

            // Remote stream'i temizle (siyah ekran önleme)
            setRemoteStreams(prev => {
                const newStreams = { ...prev };
                if (newStreams[streamKey]) {
                    // Track'leri durdur
                    newStreams[streamKey].getTracks().forEach(t => t.stop());
                    delete newStreams[streamKey];
                    console.log(`📹 [Video] Cleaned up ${streamKey} stream`);
                }
                return newStreams;
            });
            return;
        }

        // 💬 VOICE REACTION RECEIVED
        if (data.type === 'voice_reaction') {
            const senderUsername = data.from || data.username;
            console.log(`💬 [Reaction] ${senderUsername} sent: ${data.emoji}`);
            setLastReaction({
                username: senderUsername,
                emoji: data.emoji,
                timestamp: Date.now()
            });
            // Auto-clear after 3 seconds
            setTimeout(() => {
                setLastReaction(prev => {
                    if (prev && prev.timestamp === Date.now()) return null;
                    return prev;
                });
            }, 3000);
            return;
        }

        // 🎮 GAME SIGNAL RECEIVED
        if (data.type === 'game_signal') {
            const senderUsername = data.from || data.username;
            console.log(`🎮 [Game] ${senderUsername}:`, data.action, data.move);

            setGameState(prev => {
                const newState = { ...prev };

                if (data.action === 'start') {
                    newState.gameType = data.game_type;
                    newState.players = [senderUsername, data.target].filter(Boolean);
                    newState.moves = {};
                    newState.result = null;
                    newState.currentTurn = senderUsername;
                } else if (data.action === 'move') {
                    newState.moves = {
                        ...prev.moves,
                        [senderUsername]: data.move
                    };

                    // RPS: Check if both players moved
                    if (data.game_type === 'rps' && Object.keys(newState.moves).length === 2) {
                        const [p1, p2] = Object.keys(newState.moves);
                        const m1 = newState.moves[p1];
                        const m2 = newState.moves[p2];

                        // RPS logic
                        const winMap = { rock: 'scissors', scissors: 'paper', paper: 'rock' };
                        if (m1 === m2) {
                            newState.result = { winner: null, type: 'draw' };
                        } else if (winMap[m1] === m2) {
                            newState.result = { winner: p1, loser: p2 };
                        } else {
                            newState.result = { winner: p2, loser: p1 };
                        }
                    }
                } else if (data.action === 'end') {
                    newState.result = data.result || { type: 'cancelled' };
                }

                return newState;
            });
            return;
        }

        // 🎬 CINEMA SYNC RECEIVED
        if (data.type === 'cinema_sync') {
            const senderUsername = data.from || data.username;
            console.log(`🎬 [Cinema] ${senderUsername}:`, data.action);

            setCinemaState(prev => ({
                ...prev,
                isActive: data.action !== 'stop',
                url: data.url || prev.url,
                playing: data.action === 'play',
                time: data.time || prev.time,
                lastSyncAction: data.action,
                timestamp: Date.now(),
                syncedBy: senderUsername
            }));
            return;
        }

        // �🔥 Mevcut kullanıcı listesini al
        if (data.type === 'current_users') {
            console.log('[Voice] Received current users from backend:', data.users);

            setConnectedUsers(prev => {
                const backendUsers = data.users || [];

                // Backend listesinde ben var mıyım kontrol et
                const meInBackendList = backendUsers.some(u => u.username === username);

                // Eğer backend'de yoksa, mevcut listemdeki kendi bilgimi koru
                const myInfo = prev.find(u => u.username === username);

                // Backend listesini al, eğer ben yoksa ekle
                let finalList = [...backendUsers];
                if (!meInBackendList && myInfo) {
                    console.log('[Voice] Backend list missing me, adding from local state');
                    finalList = [myInfo, ...backendUsers];
                } else if (!meInBackendList && username) {
                    // Hiç yoksa default bilgilerle ekle
                    console.log('[Voice] Backend list missing me, adding with defaults');
                    finalList = [{
                        username: username,
                        isMuted: isMuted,
                        isCameraOn: isVideoEnabled,
                        isScreenSharing: isScreenSharing,
                        isTalking: isTalking
                    }, ...backendUsers];
                }

                console.log('✅ [Voice] Final connected users:', finalList.map(u => u.username));
                return finalList;
            });
            return;
        }

        // 🔥 FIX: Backend sends 'from' for WebRTC signals, 'username' for user_joined
        const senderUsername = data.from || data.sender_username || data.username;
        const { type, sdp, candidate } = data;

        // DEBUG: Eğer sender bulunamadıysa, tüm datayı logla
        if (!senderUsername) {
            console.error('[Signal] No sender username found in message:', data);
            return;
        }

        if (senderUsername === username) {
            console.log(`[Signal] Ignoring ${type} from self (${senderUsername})`);
            return;
        }

        console.log(`[Signal] Received ${type} from ${senderUsername}`, data);

        let pc = peerConnectionsRef.current[senderUsername];

        if (!pc) {
            if (type === 'offer') {
                pc = createPeerConnection(senderUsername, false);
            } else if (type === 'user_joined') {
                // Yeni biri katıldı, ben teklif yapmalıyım (Initiator)
                logger.signal(`${senderUsername} joined, I will create offer`);

                // 🆕 Kullanıcıyı listeye ekle
                setConnectedUsers(prev => {
                    if (prev.find(u => u.username === senderUsername)) return prev;
                    return [...prev, {
                        username: senderUsername,
                        isMuted: false,
                        isCameraOn: false,
                        isScreenSharing: false
                    }];
                });

                pc = createPeerConnection(senderUsername, true);

                // 🔥 CRITICAL FIX: Mevcut stream'leri yeni kullanıcıya ekle!
                console.log(`[user_joined] Checking streams for ${senderUsername}:`, {
                    hasAudio: !!localStreamRef.current,
                    hasCamera: !!localCameraStreamRef.current,
                    hasScreen: !!localScreenStreamRef.current,
                    cameraEnabled: isVideoEnabled,
                    screenEnabled: isScreenSharing
                });

                // 🔥 YENİ: Audio stream'i ekle (sesli chat için zorunlu!)
                if (localStreamRef.current) {
                    // ✅ Track'lerin zaten eklenmiş olup olmadığını kontrol et
                    const existingSenders = pc.getSenders();
                    localStreamRef.current.getTracks().forEach(track => {
                        const trackAlreadyAdded = existingSenders.some(sender => sender.track === track);
                        if (!trackAlreadyAdded) {
                            logger.webrtc(`Adding audio track to new peer ${senderUsername}:`, track.kind);
                            pc.addTrack(track, localStreamRef.current);
                        } else {
                            logger.webrtc(`⏭️ Audio track already added to ${senderUsername}, skipping`);
                        }
                    });
                    console.log(`✅ [user_joined] Audio track added to ${senderUsername}`);
                }

                if (localCameraStreamRef.current) {
                    // ✅ Track'lerin zaten eklenmiş olup olmadığını kontrol et
                    const existingSenders = pc.getSenders();
                    localCameraStreamRef.current.getTracks().forEach(track => {
                        const trackAlreadyAdded = existingSenders.some(sender => sender.track === track);
                        if (!trackAlreadyAdded) {
                            logger.webrtc(`Adding camera track to new peer ${senderUsername}:`, track.kind);
                            pc.addTrack(track, localCameraStreamRef.current);
                        } else {
                            logger.webrtc(`⏭️ Camera track already added to ${senderUsername}, skipping`);
                        }
                    });
                    console.log(`✅ [user_joined] Camera track added to ${senderUsername}`);
                }

                if (localScreenStreamRef.current) {
                    // ✅ Track'lerin zaten eklenmiş olup olmadığını kontrol et
                    const existingSenders = pc.getSenders();
                    localScreenStreamRef.current.getTracks().forEach(track => {
                        const trackAlreadyAdded = existingSenders.some(sender => sender.track === track);
                        if (!trackAlreadyAdded) {
                            logger.webrtc(`Adding screen track to new peer ${senderUsername}:`, track.kind);
                            pc.addTrack(track, localScreenStreamRef.current);
                        } else {
                            logger.webrtc(`⏭️ Screen track already added to ${senderUsername}, skipping`);
                        }
                    });
                    console.log(`✅ [user_joined] Screen track added to ${senderUsername}`);
                }

                try {
                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);
                    sendSignal({
                        type: 'offer',
                        sdp: pc.localDescription,
                        target: senderUsername
                    });
                    logger.signal(`Sent offer to ${senderUsername}`);
                    console.log(`✅ [user_joined] Offer successfully sent to ${senderUsername}`);
                } catch (e) {
                    logger.error("Offer creation failed", e);
                    console.error(`❌ [user_joined] Failed to create/send offer to ${senderUsername}:`, e);
                }
                return;
            } else if (type === 'user_left') {
                // Kullanıcı ayrıldı, temizlik yap
                console.log(`[Signal] ${senderUsername} left the channel`);

                // 🆕 Kullanıcıyı listeden çıkar
                setConnectedUsers(prev => prev.filter(u => u.username !== senderUsername));

                // 🔥 FIX: Audio elementi temizle
                const audioEl = document.getElementById(`remote-audio-${senderUsername}`);
                if (audioEl) {
                    audioEl.pause();
                    audioEl.srcObject = null;
                    audioEl.remove();
                    console.log(`🔊 [Audio] Removed audio element for ${senderUsername}`);
                }

                setRemoteStreams(prev => {
                    const newStreams = { ...prev };
                    // Tüm stream türlerini temizle
                    delete newStreams[senderUsername];
                    delete newStreams[`${senderUsername}_camera`];
                    delete newStreams[`${senderUsername}_screen`];
                    return newStreams;
                });
                if (peerConnectionsRef.current[senderUsername]) {
                    peerConnectionsRef.current[senderUsername].close();
                    delete peerConnectionsRef.current[senderUsername];
                }
                return;
            } else if (type === 'stream_update') {
                // Stream durumu değişti (kamera açıldı/kapandı vb)
                console.log(`[Signal] ${senderUsername} stream update:`, data);

                // Kullanıcı listesini güncelle
                setConnectedUsers(prev => prev.map(u => {
                    if (u.username === senderUsername) {
                        return {
                            ...u,
                            isCameraOn: data.streamType === 'camera' ? data.enabled : u.isCameraOn,
                            isScreenSharing: data.streamType === 'screen' ? data.enabled : u.isScreenSharing
                        };
                    }
                    return u;
                }));

                // 🔥 CRITICAL FIX: Eğer stream aktifse ve peer connection yoksa, oluştur
                if (data.enabled && !peerConnectionsRef.current[senderUsername]) {
                    console.log(`[stream_update] Creating PC for ${senderUsername} due to ${data.streamType} stream`);
                    const newPC = createPeerConnection(senderUsername, true);

                    // 🔥 Kendi stream'lerimi ekle (audio dahil!)
                    if (localStreamRef.current) {
                        localStreamRef.current.getTracks().forEach(track => {
                            logger.webrtc(`Adding audio track to ${senderUsername}:`, track.kind);
                            newPC.addTrack(track, localStreamRef.current);
                        });
                    }
                    if (localCameraStreamRef.current) {
                        localCameraStreamRef.current.getTracks().forEach(track => {
                            logger.webrtc(`Adding camera track to ${senderUsername}:`, track.kind);
                            newPC.addTrack(track, localCameraStreamRef.current);
                        });
                    }
                    if (localScreenStreamRef.current) {
                        localScreenStreamRef.current.getTracks().forEach(track => {
                            logger.webrtc(`Adding screen track to ${senderUsername}:`, track.kind);
                            newPC.addTrack(track, localScreenStreamRef.current);
                        });
                    }

                    // Offer oluştur
                    try {
                        const offer = await newPC.createOffer();
                        await newPC.setLocalDescription(offer);
                        sendSignal({
                            type: 'offer',
                            sdp: newPC.localDescription,
                            target: senderUsername
                        });
                        logger.signal(`Sent offer to ${senderUsername} after stream_update`);
                    } catch (e) {
                        logger.error(`Failed to create offer for ${senderUsername}:`, e);
                    }
                }
                return;
            } else {
                console.warn(`[Signal] Ignored ${type} from ${senderUsername} (No PC)`);
                return;
            }
        }

        try {
            // 🔥 CRITICAL FIX: Check signalingState BEFORE processing answer/offer
            if (type === 'offer') {
                // Only accept offer if we're in 'stable' state
                if (pc.signalingState !== 'stable') {
                    console.warn(`[Signal] Ignoring offer from ${senderUsername}, already in state: ${pc.signalingState}`);
                    return;
                }

                await pc.setRemoteDescription(new RTCSessionDescription(sdp));
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                sendSignal({
                    type: 'answer',
                    sdp: pc.localDescription,
                    target: senderUsername
                });
                console.log(`[Signal] Sent answer to ${senderUsername}`);

                // 🔥 FIX: Process buffered ICE candidates after remote description is set
                if (iceCandidateBufferRef.current[senderUsername]) {
                    console.log(`[Signal] Processing ${iceCandidateBufferRef.current[senderUsername].length} buffered candidates for ${senderUsername}`);
                    for (const bufferedCandidate of iceCandidateBufferRef.current[senderUsername]) {
                        try {
                            await pc.addIceCandidate(bufferedCandidate);
                        } catch (e) {
                            console.warn(`[Signal] Failed to add buffered candidate:`, e);
                        }
                    }
                    delete iceCandidateBufferRef.current[senderUsername];
                }
            } else if (type === 'answer') {
                // 🔥 CRITICAL FIX: Only accept answer if we're in 'have-local-offer' state
                if (pc.signalingState !== 'have-local-offer') {
                    console.warn(`[WebRTC] Error handling answer from ${senderUsername}: InvalidStateError: Failed to execute 'setRemoteDescription' on 'RTCPeerConnection': Failed to set remote answer sdp: Called in wrong state: ${pc.signalingState}`);
                    return;
                }

                await pc.setRemoteDescription(new RTCSessionDescription(sdp));
                console.log(`[Signal] Set remote description from ${senderUsername}`);

                // 🔥 FIX: Process buffered ICE candidates after remote description is set
                if (iceCandidateBufferRef.current[senderUsername]) {
                    console.log(`[Signal] Processing ${iceCandidateBufferRef.current[senderUsername].length} buffered candidates for ${senderUsername}`);
                    for (const bufferedCandidate of iceCandidateBufferRef.current[senderUsername]) {
                        try {
                            await pc.addIceCandidate(bufferedCandidate);
                        } catch (e) {
                            console.warn(`[Signal] Failed to add buffered candidate:`, e);
                        }
                    }
                    delete iceCandidateBufferRef.current[senderUsername];
                }
            } else if (type === 'candidate') {
                if (pc.remoteDescription) {
                    await pc.addIceCandidate(new RTCIceCandidate(candidate));
                    console.log(`[Signal] Added ICE candidate from ${senderUsername}`);
                } else {
                    // 🔥 FIX: Buffer candidate until remote description is set
                    console.log(`[Signal] Buffering ICE candidate from ${senderUsername} (no remote description yet)`);
                    if (!iceCandidateBufferRef.current[senderUsername]) {
                        iceCandidateBufferRef.current[senderUsername] = [];
                    }
                    iceCandidateBufferRef.current[senderUsername].push(new RTCIceCandidate(candidate));
                }
            }
        } catch (e) {
            console.error(`[WebRTC] Error handling ${type} from ${senderUsername}:`, e);
        }
    }, [username, createPeerConnection, sendSignal]);

    // --- SESLİ SOHBETTEN AYRILMA ---
    const leaveVoiceRoom = useCallback(() => {
        // 🔥 FIX: Prevent recursive calls
        if (isLeavingRef.current) {
            console.log("[Voice] Already leaving, skipping...");
            return;
        }
        isLeavingRef.current = true;
        console.log("[Voice] Leaving voice room...");

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
                console.log(`[Voice] Stopped track: ${track.kind}`);
            });
            setLocalAudioStream(null);
            localStreamRef.current = null;
        }

        // 1.1 Kamera stream'ini durdur
        if (localCameraStream) {
            localCameraStream.getTracks().forEach(track => {
                track.stop();
                console.log(`[Voice] Stopped camera track: ${track.kind}`);
            });
            setLocalCameraStream(null);
            setIsVideoEnabled(false);
        }

        // 1.2 Ekran paylaşım stream'ini durdur
        if (localScreenStream) {
            localScreenStream.getTracks().forEach(track => {
                track.stop();
                console.log(`[Voice] Stopped screen track: ${track.kind}`);
            });
            setLocalScreenStream(null);
            setIsScreenSharing(false);
        }

        // 2. Peer Connectionları Kapat
        Object.entries(peerConnectionsRef.current).forEach(([user, pc]) => {
            console.log(`[Voice] Closing PC for ${user}`);
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
        if (isRecording) {
            console.log('[Voice] Stopping recording on leave');
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop();
            }
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current);
                recordingIntervalRef.current = null;
            }
            setIsRecording(false);
            setRecordingDuration(0);
        }

        // 🔥 Watchdog temizliği
        if (micHealthIntervalRef.current) {
            clearInterval(micHealthIntervalRef.current);
            micHealthIntervalRef.current = null;
        }

        // 🔥 YENİ: WebSocket reconnect timeout temizliği
        if (wsReconnectTimeoutRef.current) {
            clearTimeout(wsReconnectTimeoutRef.current);
            wsReconnectTimeoutRef.current = null;
            console.log('[Voice] Cleared pending WebSocket reconnect');
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
    }, [username, localCameraStream, localScreenStream, isRecording]);

    // --- SESLİ SOHBETE KATILMA ---
    const joinVoiceRoom = useCallback(async (roomSlug) => {
        // 🔄 Eğer zaten bir kanalda ise ve farklı bir kanala geçmek isteniyorsa
        if (isInVoice && currentRoom && currentRoom !== roomSlug && !isSwitchingRef.current) {
            console.log(`[Voice] Switching from ${currentRoom} to ${roomSlug}`);

            // 🔒 Switching flag set et (sonsuz döngü önleme)
            isSwitchingRef.current = true;

            // 🔥 DÜZELTME: WebSocket cleanup için Promise kullan
            const cleanupPromise = new Promise((resolve) => {
                if (voiceWsRef.current) {
                    const ws = voiceWsRef.current;

                    // WebSocket kapanınca resolve et
                    const originalOnClose = ws.onclose;
                    ws.onclose = (event) => {
                        if (originalOnClose) originalOnClose(event);
                        console.log('[Voice] Old WebSocket fully closed');
                        resolve();
                    };

                    // WebSocket'i kapat
                    ws.close(1000, 'Switching channel');
                    voiceWsRef.current = null;

                    // Max 2 saniye timeout
                    setTimeout(resolve, 2000);
                } else {
                    resolve();
                }
            });

            // WebSocket'in kapanmasını bekle
            await cleanupPromise;

            // Peer connections'ı kapat
            Object.values(peerConnectionsRef.current).forEach((pc) => {
                pc.close();
            });
            peerConnectionsRef.current = {};
            setRemoteStreams({});

            // Ekstra kısa bekleme (ağ stack temizliği için)
            await new Promise(resolve => setTimeout(resolve, 150));

            isSwitchingRef.current = false; // Reset flag
            console.log(`[Voice] Now joining ${roomSlug}`);

            // Şimdi yeni kanala katılmayı devam ettir (aşağıdaki normal flow)
        }

        // 🛑 Eğer aynı kanalda isek, tekrar katılma
        if (isInVoice && currentRoom === roomSlug) {
            console.log(`[Voice] Already in ${roomSlug}, skipping join`);
            return;
        }

        // Switching sırasında skip
        if (isSwitchingRef.current) {
            console.log("[Voice] Currently switching channels, skipping...");
            return;
        }

        console.log(`[Voice] Joining room: ${roomSlug}`);
        setIsConnecting(true);
        setCurrentRoom(roomSlug);

        try {
            // 🔥 TURN bilgisi zaten state’de; ikinci kez fetch etme
            if (iceServers && iceServers.length > 0) {
                setRtcIceServers(iceServers);
                console.log(`🔐 [TURN] Using cached ICE servers (${iceServers.length})`);
            }

            // 1. Mikrofon İzni Al - 🔥 AGRESİF GÜRÜLTÜ ENGELLEMİE
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
            console.log("[Voice] 🎤 Got microphone access with AGGRESSIVE noise suppression");

            // 🔥 Profesyonel gürültü filtrelerini uygula (opsiyonel - daha agresif filtreleme)
            let processedStream = stream;
            if (isNoiseSuppressionEnabled) {
                try {
                    processedStream = applyProfessionalAudioFilters(stream);
                    console.log('🎚️ [Voice] Professional audio filters APPLIED');
                } catch (filterError) {
                    console.warn('⚠️ [Voice] Could not apply professional filters, using raw stream:', filterError);
                    processedStream = stream;
                }
            }

            setLocalAudioStream(processedStream);
            localStreamRef.current = processedStream;

            console.log('🎤 [Voice] Stream ready with noise suppression');
            console.log('🎤 [Voice] Stream tracks:', processedStream.getAudioTracks().map(t => ({
                id: t.id,
                label: t.label,
                enabled: t.enabled,
                readyState: t.readyState,
                muted: t.muted
            })));

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

                            console.log('🔄 [Mic Watchdog] Audio track yenilendi (basit stream)');
                        } catch (err) {
                            console.warn('[Mic Watchdog] Mic refresh failed:', err);
                        }
                    }
                }, 8000);
            }

            // 2. WebSocket Bağlantısı
            const wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/voice/${roomSlug}/?token=${token}`;
            console.log(`[Voice] Connecting to ${wsUrl}`);
            const ws = new WebSocket(wsUrl);
            voiceWsRef.current = ws;

            ws.onopen = () => {
                console.log("🎤 [VoiceWS] Connected to room:", roomSlug);
                setIsInVoice(true);
                setIsConnecting(false);

                // 🔥 YENİ: Kendinizi HEMEN listeye ekleyin (Optimistic Update)
                setConnectedUsers(prev => {
                    const meInList = prev.some(u => u.username === username);
                    if (meInList) return prev;

                    console.log('✅ [Voice] Added self to connected users immediately');
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
                    console.log("[VoiceWS] Message received:", data.type || data);
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
                console.log("🎤 [VoiceWS] Disconnected, code:", event.code, "reason:", event.reason);

                // 🔥 GELIŞMIŞ AUTO-RECONNECT SISTEMI

                // 1️⃣ Bilinçli çıkış kontrolü
                if (isLeavingRef.current || isSwitchingRef.current) {
                    console.log("[VoiceWS] User intentionally left or switching, not reconnecting");
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
                    console.log("[VoiceWS] Normal closure (1000), cleaning up");
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
                    console.log(`[VoiceWS] 🔄 Reconnect attempt ${currentAttempt}/${maxRetries} in ${delay}ms...`);

                    setIsReconnecting(true);
                    setWsReconnectAttempt(currentAttempt);

                    // Clear any existing timeout
                    if (wsReconnectTimeoutRef.current) {
                        clearTimeout(wsReconnectTimeoutRef.current);
                    }

                    // Schedule reconnection
                    wsReconnectTimeoutRef.current = setTimeout(() => {
                        if (!isLeavingRef.current && !isSwitchingRef.current && roomSlug) {
                            console.log(`[VoiceWS] ⚡ Executing reconnect attempt ${currentAttempt} to ${roomSlug}`);

                            // Exponential backoff: Double the delay for next time
                            setWsReconnectDelay(prev => Math.min(prev * 2, 30000));

                            // Reconnect
                            joinVoiceRoom(roomSlug).then(() => {
                                // Başarılı reconnection - Reset counters
                                console.log("[VoiceWS] ✅ Reconnection successful! Resetting retry counters.");
                                setWsReconnectAttempt(0);
                                setWsReconnectDelay(1000);
                                setIsReconnecting(false);
                            }).catch(err => {
                                console.error("[VoiceWS] Reconnection failed:", err);
                                // Başarısız - bir sonraki deneme zaten schedule edilecek
                            });
                        } else {
                            console.log("[VoiceWS] Reconnect cancelled (user left or room changed)");
                            setIsReconnecting(false);
                            setWsReconnectAttempt(0);
                            setWsReconnectDelay(1000);
                        }
                    }, delay);
                } else {
                    console.log("[VoiceWS] Not in voice or no room, cleaning up");
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

    // --- TOGGLE FUNCTIONS ---
    const toggleMute = useCallback(() => {
        setIsMuted(prev => {
            const newMuted = !prev;
            if (localStreamRef.current) {
                localStreamRef.current.getAudioTracks().forEach(track => {
                    track.enabled = !newMuted;
                });
            }
            if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
                voiceWsRef.current.send(JSON.stringify({
                    type: 'mic_off_state',
                    is_mic_off: newMuted
                }));
            }
            console.log(`[Voice] Mute: ${newMuted}`);
            return newMuted;
        });
    }, []);

    const toggleDeafened = useCallback(() => {
        setIsDeafened(prev => {
            const newDeafened = !prev;
            if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
                voiceWsRef.current.send(JSON.stringify({
                    type: 'deaf_state',
                    is_deafened: newDeafened
                }));
            }
            console.log(`[Voice] Deafened: ${newDeafened}`);
            return newDeafened;
        });
    }, []);

    // 🔒 Lock ref - race condition önleme
    const cameraToggleLockRef = useRef(false);

    const toggleVideo = useCallback(async () => {
        // 🔒 Race condition önleme - işlem devam ediyorsa bekle
        if (cameraToggleLockRef.current) {
            console.log('[Camera] Toggle already in progress, skipping...');
            return;
        }

        cameraToggleLockRef.current = true;

        try {
            // 🔥 Ref'ten güncel değeri al (state gecikmesi sorunu çözümü)
            const currentStream = localCameraStreamRef.current;

            if (currentStream) {
                // 🎥 Kamerayı KAPAT
                console.log('[Camera] Stopping camera stream');

                // Önce state'i güncelle - UI hemen yanıt versin
                setIsVideoEnabled(false);
                setLocalCameraStream(null);
                localCameraStreamRef.current = null;

                // Track'leri durdur
                currentStream.getTracks().forEach(track => {
                    track.stop();
                    console.log(`[Camera] Stopped ${track.kind} track`);
                });

                // 🔥 Peer işlemlerini paralel yap - sıralı await UI'ı donduruyor
                const renegotiationPromises = [];

                for (const [username, pc] of Object.entries(peerConnectionsRef.current)) {
                    const senders = pc.getSenders();
                    let trackRemoved = false;

                    for (const sender of senders) {
                        // ✅ FIX: Kamera track'ini bul (ekran olmayan video track)
                        if (sender.track && sender.track.kind === 'video' &&
                            sender.track.contentHint !== 'detail') {
                            try {
                                pc.removeTrack(sender);
                                trackRemoved = true;
                                console.log(`[Camera] Removed video track from peer: ${username}`);
                            } catch (e) {
                                console.warn(`[Camera] Failed to remove track from ${username}:`, e);
                            }
                        }
                    }

                    // Renegotiation - promise olarak topla
                    if (trackRemoved) {
                        const renegPromise = (async () => {
                            try {
                                const offer = await pc.createOffer();
                                await pc.setLocalDescription(offer);
                                sendSignal({
                                    type: 'offer',
                                    sdp: pc.localDescription,
                                    target: username
                                });
                                console.log(`[Camera] Sent renegotiation offer to ${username} after removal`);
                            } catch (e) {
                                console.warn(`[Camera] Renegotiation failed with ${username}:`, e);
                            }
                        })();
                        renegotiationPromises.push(renegPromise);
                    }
                }

                // WS üzerinden bildir (bloklamadan)
                if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
                    voiceWsRef.current.send(JSON.stringify({
                        type: 'camera_state',
                        is_camera_on: false
                    }));
                    // 🔥 FIX: Karşı tarafa video_ended sinyali gönder (siyah ekran önleme)
                    voiceWsRef.current.send(JSON.stringify({
                        type: 'video_ended',
                        streamType: 'camera'
                    }));
                    console.log('[Camera] Sent video_ended signal');
                }

                // Renegotiation'ları arka planda tamamla
                Promise.all(renegotiationPromises).catch(e =>
                    console.warn('[Camera] Some renegotiations failed:', e)
                );

            } else {
                // 🎥 Kamerayı AÇ
                console.log('[Camera] Starting camera stream');

                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        frameRate: { ideal: 30 }
                    }
                });

                // 🔥 Lock hala aktif mi kontrol et (iptal edilmiş olabilir)
                if (!cameraToggleLockRef.current) {
                    console.log('[Camera] Toggle was cancelled, stopping new stream');
                    stream.getTracks().forEach(t => t.stop());
                    return;
                }

                console.log('[Camera] Got camera stream:', stream.id);

                // State'leri güncelle
                localCameraStreamRef.current = stream;
                setLocalCameraStream(stream);
                setIsVideoEnabled(true);

                // Tüm peer connection'lara video track'ini ekle
                const videoTrack = stream.getVideoTracks()[0];

                // 🔥 FIX: Track ended event - tarayıcı kamerayı kapattığında
                videoTrack.onended = () => {
                    console.log('[Camera] Track ended by browser/system');
                    setLocalCameraStream(null);
                    localCameraStreamRef.current = null;
                    setIsVideoEnabled(false);

                    if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
                        voiceWsRef.current.send(JSON.stringify({
                            type: 'video_ended',
                            streamType: 'camera'
                        }));
                    }
                };

                // Kamera için optimizasyon
                try {
                    videoTrack.contentHint = 'motion'; // Kamera için optimize et
                } catch (e) {
                    console.warn('[Camera] contentHint not supported:', e);
                }

                // 🔥 Peer işlemlerini paralel yap
                const addTrackPromises = [];

                for (const [username, pc] of Object.entries(peerConnectionsRef.current)) {
                    const addPromise = (async () => {
                        try {
                            pc.addTrack(videoTrack, stream);
                            console.log(`[Camera] Added video track to peer: ${username}`);

                            // ✅ FIX: Renegotiation gerekli - yeni offer oluştur
                            const offer = await pc.createOffer();
                            await pc.setLocalDescription(offer);

                            sendSignal({
                                type: 'offer',
                                sdp: pc.localDescription,
                                target: username
                            });

                            console.log(`[Camera] Sent renegotiation offer to ${username}`);
                        } catch (e) {
                            console.warn(`[Camera] Failed to add/renegotiate with ${username}:`, e);
                        }
                    })();
                    addTrackPromises.push(addPromise);
                }

                // WS üzerinden bildir (bloklamadan)
                if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
                    voiceWsRef.current.send(JSON.stringify({
                        type: 'camera_state',
                        is_camera_on: true
                    }));
                    console.log('[Camera] State sent to backend: is_camera_on=true');
                }

                // Track ekleme işlemlerini arka planda tamamla
                Promise.all(addTrackPromises).catch(e =>
                    console.warn('[Camera] Some track additions failed:', e)
                );
            }
        } catch (error) {
            console.error('[Camera] Error:', error);
            if (error.name === 'NotAllowedError') {
                toast.warning('Kamera izni reddedildi. Lütfen tarayıcı ayarlarından kamera iznini açın.', 5000);
            } else if (error.name === 'NotFoundError') {
                toast.warning('Kamera bulunamadı. Lütfen bir kamera bağlayın.');
            } else {
                toast.error('Kamera başlatılamadı: ' + error.message);
            }
            setIsVideoEnabled(false);
            localCameraStreamRef.current = null;
            setLocalCameraStream(null);
        } finally {
            // 🔓 Lock'u serbest bırak - kısa gecikme ile (debounce etkisi)
            setTimeout(() => {
                cameraToggleLockRef.current = false;
            }, 300);
        }
    }, [sendSignal]);

    // 🔥 ALIAS: toggleCamera = toggleVideo
    const toggleCamera = toggleVideo;

    // 🔒 Screen share lock ref
    const screenToggleLockRef = useRef(false);

    const toggleScreenShare = useCallback(async () => {
        // 🔒 Race condition önleme
        if (screenToggleLockRef.current) {
            console.log('[Screen] Toggle already in progress, skipping...');
            return;
        }

        screenToggleLockRef.current = true;

        try {
            const currentStream = localScreenStreamRef.current;

            if (currentStream) {
                // 🖥️ Ekran paylaşımını DURDUR
                console.log('[Screen] Stopping screen share');

                // Önce state'i güncelle
                setIsScreenSharing(false);
                setLocalScreenStream(null);
                localScreenStreamRef.current = null;

                currentStream.getTracks().forEach(track => {
                    track.stop();
                    console.log(`[Screen] Stopped ${track.kind} track`);
                });

                // 🔥 Peer işlemlerini paralel yap
                const renegotiationPromises = [];

                for (const [username, pc] of Object.entries(peerConnectionsRef.current)) {
                    const senders = pc.getSenders();
                    let trackRemoved = false;

                    for (const sender of senders) {
                        // ✅ FIX: Ekran track'ini bul (contentHint='detail')
                        if (sender.track && sender.track.contentHint === 'detail') {
                            try {
                                pc.removeTrack(sender);
                                trackRemoved = true;
                                console.log(`[Screen] Removed screen track from peer: ${username}`);
                            } catch (e) {
                                console.warn(`[Screen] Failed to remove track from ${username}:`, e);
                            }
                        }
                    }

                    // Renegotiation - promise olarak topla
                    if (trackRemoved) {
                        const renegPromise = (async () => {
                            try {
                                const offer = await pc.createOffer();
                                await pc.setLocalDescription(offer);
                                sendSignal({
                                    type: 'offer',
                                    sdp: pc.localDescription,
                                    target: username
                                });
                                console.log(`[Screen] Sent renegotiation offer to ${username} after removal`);
                            } catch (e) {
                                console.warn(`[Screen] Renegotiation failed with ${username}:`, e);
                            }
                        })();
                        renegotiationPromises.push(renegPromise);
                    }
                }

                // WS üzerinden bildir (bloklamadan)
                if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
                    voiceWsRef.current.send(JSON.stringify({
                        type: 'screen_share_state',
                        is_sharing: false
                    }));
                    // 🔥 FIX: Karşı tarafa video_ended sinyali gönder
                    voiceWsRef.current.send(JSON.stringify({
                        type: 'video_ended',
                        streamType: 'screen'
                    }));
                    console.log('[Screen] Sent video_ended signal');
                }

                // Arka planda tamamla
                Promise.all(renegotiationPromises).catch(e =>
                    console.warn('[Screen] Some renegotiations failed:', e)
                );

            } else {
                // 🖥️ Ekran paylaşımını BAŞLAT
                console.log('[Screen] Starting screen share');

                // 🔥 YENİ: Quality presets
                const qualityPresets = {
                    '720p': { width: 1280, height: 720 },
                    '1080p': { width: 1920, height: 1080 },
                    '4K': { width: 3840, height: 2160 }
                };

                const quality = qualityPresets[screenShareQuality] || qualityPresets['1080p'];

                console.log(`🎬 [Screen] Quality: ${screenShareQuality}, FPS: ${screenShareFPS}`);

                const stream = await navigator.mediaDevices.getDisplayMedia({
                    video: {
                        cursor: 'always',
                        displaySurface: 'monitor',
                        width: { ideal: quality.width },
                        height: { ideal: quality.height },
                        frameRate: { ideal: screenShareFPS }
                    },
                    audio: includeSystemAudio // 🔥 YENİ: System audio toggle
                });

                // 🔥 Lock hala aktif mi kontrol et
                if (!screenToggleLockRef.current) {
                    console.log('[Screen] Toggle was cancelled, stopping new stream');
                    stream.getTracks().forEach(t => t.stop());
                    return;
                }

                console.log('[Screen] Got screen stream:', stream.id);

                // Kullanıcı "Stop sharing" butonuna basınca stream durduğunda otomatik temizlik
                stream.getVideoTracks()[0].onended = () => {
                    console.log('[Screen] User stopped sharing via browser');
                    setLocalScreenStream(null);
                    localScreenStreamRef.current = null;
                    setIsScreenSharing(false);

                    if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
                        // Screen share state bildir
                        voiceWsRef.current.send(JSON.stringify({
                            type: 'screen_share_state',
                            is_sharing: false
                        }));
                        // 🔥 FIX: video_ended sinyali de gönder
                        voiceWsRef.current.send(JSON.stringify({
                            type: 'video_ended',
                            streamType: 'screen'
                        }));
                    }
                };

                localScreenStreamRef.current = stream;
                setLocalScreenStream(stream);
                setIsScreenSharing(true);

                // Tüm peer connection'lara ekran track'ini ekle VE renegotiation başlat
                const screenTrack = stream.getVideoTracks()[0];

                // ✅ Ekran paylaşımı için marker ve optimizasyon
                try {
                    screenTrack.contentHint = 'detail';
                } catch (e) {
                    console.warn('[Screen] contentHint not supported:', e);
                }

                // 🔥 Paralel peer işlemleri
                const addTrackPromises = [];

                for (const [username, pc] of Object.entries(peerConnectionsRef.current)) {
                    const addPromise = (async () => {
                        try {
                            // 🔥 FIX: Önce basit addTrack dene (daha güvenilir)
                            pc.addTrack(screenTrack, stream);
                            console.log(`[Screen] Added screen track to peer: ${username}`);

                            const offer = await pc.createOffer();
                            await pc.setLocalDescription(offer);

                            sendSignal({
                                type: 'offer',
                                sdp: pc.localDescription,
                                target: username
                            });

                            console.log(`[Screen] Sent renegotiation offer to ${username}`);
                        } catch (e) {
                            console.error(`[Screen] Failed to add track to ${username}:`, e.message);
                        }
                    })();
                    addTrackPromises.push(addPromise);
                }

                // WS üzerinden bildir
                if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
                    voiceWsRef.current.send(JSON.stringify({
                        type: 'screen_share_state',
                        is_sharing: true
                    }));
                }

                // Arka planda tamamla
                Promise.all(addTrackPromises).catch(e =>
                    console.warn('[Screen] Some track additions failed:', e)
                );
            }
        } catch (error) {
            console.error('[Screen] Error:', error);
            if (error.name === 'NotAllowedError') {
                // Kullanıcı iptal etti, sessizce geri dön
                console.log('[Screen] User cancelled screen share');
            } else if (error.name === 'NotFoundError') {
                toast.warning('Ekran paylaşımı desteklenmiyor.');
            } else {
                toast.error('Ekran paylaşımı başlatılamadı: ' + error.message);
            }
            setIsScreenSharing(false);
            localScreenStreamRef.current = null;
            setLocalScreenStream(null);
        } finally {
            // 🔓 Lock'u serbest bırak
            setTimeout(() => {
                screenToggleLockRef.current = false;
            }, 300);
        }
    }, [sendSignal, screenShareQuality, screenShareFPS, includeSystemAudio]);

    // 🔥 YENİ: Start Recording
    const startRecording = useCallback(() => {
        if (!isInVoice || isRecording) {
            console.warn('[Recording] Cannot start - not in voice or already recording');
            return;
        }

        try {
            // Combine local and remote streams for recording
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const destination = audioContext.createMediaStreamDestination();

            // Add local audio
            if (localAudioStream) {
                const localSource = audioContext.createMediaStreamSource(localAudioStream);
                localSource.connect(destination);
            }

            // Add all remote audio streams
            Object.entries(remoteStreams).forEach(([key, stream]) => {
                if (!key.includes('_camera') && !key.includes('_screen')) {
                    const audioTracks = stream.getAudioTracks();
                    if (audioTracks.length > 0) {
                        const remoteSource = audioContext.createMediaStreamSource(stream);
                        remoteSource.connect(destination);
                    }
                }
            });

            // Create MediaRecorder
            const mediaRecorder = new MediaRecorder(destination.stream, {
                mimeType: 'audio/webm;codecs=opus',
                audioBitsPerSecond: 128000
            });

            recordingChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordingChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordingChunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `pawscord-voice-${currentRoom}-${Date.now()}.webm`;
                a.click();
                URL.revokeObjectURL(url);
                console.log('✅ [Recording] Saved recording');
            };

            mediaRecorder.start(1000); // Collect data every second
            mediaRecorderRef.current = mediaRecorder;
            setIsRecording(true);
            setRecordingDuration(0);

            // Start duration counter
            recordingIntervalRef.current = setInterval(() => {
                setRecordingDuration(prev => prev + 1);
            }, 1000);

            console.log('🔴 [Recording] Started');
        } catch (error) {
            console.error('[Recording] Start error:', error);
            toast.error('Kayıt başlatılamadı: ' + error.message);
        }
    }, [isInVoice, isRecording, localAudioStream, remoteStreams, currentRoom]);

    // 🔥 YENİ: Stop Recording
    const stopRecording = useCallback(() => {
        if (!isRecording) {
            return;
        }

        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }

        if (recordingIntervalRef.current) {
            clearInterval(recordingIntervalRef.current);
            recordingIntervalRef.current = null;
        }

        mediaRecorderRef.current = null;
        setIsRecording(false);
        setRecordingDuration(0);
        console.log('⏹️ [Recording] Stopped');
    }, [isRecording]);

    // 🔥 YENİ: Download Recording Manually
    const downloadRecording = useCallback(() => {
        if (recordingChunksRef.current.length === 0) {
            toast.warning('Henüz kayıt yok!');
            return;
        }

        const blob = new Blob(recordingChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pawscord-voice-${currentRoom || 'recording'}-${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log('💾 [Recording] Downloaded manually');
    }, [currentRoom]);

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
                    try { node.disconnect(); } catch (e) { }
                });
                voiceEffectNodesRef.current = null;
            }

            // If effectType is null, remove effect
            if (!effectType) {
                setActiveVoiceEffect(null);
                console.log('🎵 [VoiceEffect] Cleared');
                return;
            }

            const audioContext = globalAudioContextRef.current || new AudioContext();
            if (!globalAudioContextRef.current) globalAudioContextRef.current = audioContext;

            const source = audioContext.createMediaStreamSource(localAudioStream);
            const destination = audioContext.createMediaStreamDestination();
            const nodes = [];

            // Normalize intensity to 0-1 range
            const normalizedIntensity = intensity / 100;

            switch (effectType) {
                case 'robot': {
                    // Robot voice: Ring modulator + waveshaper
                    const oscillator = audioContext.createOscillator();
                    const gainOsc = audioContext.createGain();
                    const waveshaper = audioContext.createWaveShaper();

                    oscillator.type = 'sawtooth';
                    oscillator.frequency.value = 50 + (normalizedIntensity * 100); // 50-150 Hz
                    gainOsc.gain.value = 0.3 + (normalizedIntensity * 0.4);

                    // Waveshaper curve for distortion
                    const curve = new Float32Array(256);
                    for (let i = 0; i < 256; i++) {
                        const x = (i / 128) - 1;
                        curve[i] = Math.tanh(x * (1 + normalizedIntensity * 3));
                    }
                    waveshaper.curve = curve;

                    oscillator.connect(gainOsc);
                    source.connect(waveshaper);
                    waveshaper.connect(destination);
                    oscillator.start();

                    nodes.push(oscillator, gainOsc, waveshaper);
                    break;
                }

                case 'echo': {
                    // Echo/Delay effect
                    const delay = audioContext.createDelay(1.0);
                    const feedback = audioContext.createGain();
                    const wetGain = audioContext.createGain();
                    const dryGain = audioContext.createGain();

                    delay.delayTime.value = 0.1 + (normalizedIntensity * 0.4); // 100-500ms
                    feedback.gain.value = 0.2 + (normalizedIntensity * 0.5); // 20-70% feedback
                    wetGain.gain.value = 0.3 + (normalizedIntensity * 0.4);
                    dryGain.gain.value = 1 - (normalizedIntensity * 0.3);

                    source.connect(dryGain);
                    source.connect(delay);
                    delay.connect(feedback);
                    feedback.connect(delay);
                    delay.connect(wetGain);
                    dryGain.connect(destination);
                    wetGain.connect(destination);

                    nodes.push(delay, feedback, wetGain, dryGain);
                    break;
                }

                case 'deep': {
                    // Deep voice: Pitch shift down (using playbackRate trick)
                    const biquadFilter = audioContext.createBiquadFilter();
                    const gainNode = audioContext.createGain();

                    biquadFilter.type = 'lowshelf';
                    biquadFilter.frequency.value = 500;
                    biquadFilter.gain.value = 10 + (normalizedIntensity * 15); // Boost low frequencies

                    gainNode.gain.value = 1.2;

                    source.connect(biquadFilter);
                    biquadFilter.connect(gainNode);
                    gainNode.connect(destination);

                    nodes.push(biquadFilter, gainNode);
                    break;
                }

                case 'high': {
                    // High/Chipmunk voice: Pitch shift up
                    const highFilter = audioContext.createBiquadFilter();
                    const gainNode = audioContext.createGain();

                    highFilter.type = 'highshelf';
                    highFilter.frequency.value = 1000;
                    highFilter.gain.value = 8 + (normalizedIntensity * 12);

                    gainNode.gain.value = 0.9;

                    source.connect(highFilter);
                    highFilter.connect(gainNode);
                    gainNode.connect(destination);

                    nodes.push(highFilter, gainNode);
                    break;
                }

                case 'radio': {
                    // Radio/Telephone effect: Bandpass filter
                    const lowpass = audioContext.createBiquadFilter();
                    const highpass = audioContext.createBiquadFilter();
                    const distortion = audioContext.createWaveShaper();

                    lowpass.type = 'lowpass';
                    lowpass.frequency.value = 3000 - (normalizedIntensity * 1000);

                    highpass.type = 'highpass';
                    highpass.frequency.value = 300 + (normalizedIntensity * 200);

                    // Slight distortion for radio crackle
                    const curve = new Float32Array(256);
                    for (let i = 0; i < 256; i++) {
                        const x = (i / 128) - 1;
                        curve[i] = Math.sign(x) * Math.pow(Math.abs(x), 0.8);
                    }
                    distortion.curve = curve;

                    source.connect(highpass);
                    highpass.connect(lowpass);
                    lowpass.connect(distortion);
                    distortion.connect(destination);

                    nodes.push(lowpass, highpass, distortion);
                    break;
                }

                case 'reverb': {
                    // Reverb/Hall effect
                    const convolver = audioContext.createConvolver();
                    const wetGain = audioContext.createGain();
                    const dryGain = audioContext.createGain();

                    // Create impulse response for reverb
                    const sampleRate = audioContext.sampleRate;
                    const length = sampleRate * (0.5 + normalizedIntensity * 2); // 0.5-2.5 seconds
                    const impulse = audioContext.createBuffer(2, length, sampleRate);

                    for (let channel = 0; channel < 2; channel++) {
                        const channelData = impulse.getChannelData(channel);
                        for (let i = 0; i < length; i++) {
                            channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
                        }
                    }
                    convolver.buffer = impulse;

                    wetGain.gain.value = 0.3 + (normalizedIntensity * 0.5);
                    dryGain.gain.value = 1 - (normalizedIntensity * 0.2);

                    source.connect(dryGain);
                    source.connect(convolver);
                    convolver.connect(wetGain);
                    dryGain.connect(destination);
                    wetGain.connect(destination);

                    nodes.push(convolver, wetGain, dryGain);
                    break;
                }

                default:
                    source.connect(destination);
            }

            voiceEffectNodesRef.current = nodes;
            processedStreamRef.current = destination.stream;
            setActiveVoiceEffect(effectType);
            setVoiceEffectIntensity(intensity);

            console.log(`🎵 [VoiceEffect] Applied: ${effectType} at ${intensity}%`);

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

        console.log(`💬 [Reaction] Sent: ${emoji}`);
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

        console.log(`🎮 [Game] Sent: ${gameType} - ${action}`, move);
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

        console.log(`🎬 [Cinema] Sent: ${action}`, { time, url });
    }, []);

    // 📊 WEBRTC STATS MONITORING
    const startStatsMonitoring = useCallback(() => {
        if (statsIntervalRef.current) return;

        statsIntervalRef.current = setInterval(async () => {
            const stats = {};

            for (const [username, pc] of Object.entries(peerConnectionsRef.current)) {
                try {
                    const report = await pc.getStats();
                    let audioStats = null;
                    let videoStats = null;

                    report.forEach((stat) => {
                        if (stat.type === 'inbound-rtp' && stat.kind === 'audio') {
                            audioStats = {
                                packetsReceived: stat.packetsReceived,
                                packetsLost: stat.packetsLost,
                                jitter: stat.jitter,
                                bytesReceived: stat.bytesReceived
                            };
                        }
                        if (stat.type === 'inbound-rtp' && stat.kind === 'video') {
                            videoStats = {
                                packetsReceived: stat.packetsReceived,
                                packetsLost: stat.packetsLost,
                                framesDecoded: stat.framesDecoded,
                                frameWidth: stat.frameWidth,
                                frameHeight: stat.frameHeight
                            };
                        }
                        if (stat.type === 'candidate-pair' && stat.state === 'succeeded') {
                            stats[username] = {
                                ...stats[username],
                                rtt: stat.currentRoundTripTime * 1000,
                                connectionType: stat.localCandidateId?.includes('relay') ? 'TURN' : 'STUN/Direct'
                            };
                        }
                    });

                    stats[username] = {
                        ...stats[username],
                        audio: audioStats,
                        video: videoStats,
                        connectionState: pc.connectionState,
                        iceConnectionState: pc.iceConnectionState
                    };
                } catch (e) {
                    console.warn(`[Stats] Failed to get stats for ${username}:`, e);
                }
            }

            setConnectionStats(stats);
        }, 2000); // Every 2 seconds

        console.log('📊 [Stats] Monitoring started');
    }, []);

    const stopStatsMonitoring = useCallback(() => {
        if (statsIntervalRef.current) {
            clearInterval(statsIntervalRef.current);
            statsIntervalRef.current = null;
            setConnectionStats({});
            console.log('📊 [Stats] Monitoring stopped');
        }
    }, []);

    // 🎚️ YENİ: Noise Gate Toggle
    const toggleNoiseGate = useCallback((enabled) => {
        setIsNoiseGateEnabled(enabled);
        localStorage.setItem('pawscord_noise_gate_enabled', enabled.toString());
        console.log(`🎚️ [Noise Gate] ${enabled ? 'ENABLED' : 'DISABLED'}`);
    }, []);

    // 🎚️ YENİ: Noise Gate Threshold Güncelleme
    const updateNoiseGateThreshold = useCallback((threshold) => {
        const clamped = Math.max(-80, Math.min(-20, threshold));
        setNoiseGateThreshold(clamped);
        localStorage.setItem('pawscord_noise_gate', clamped.toString());
        console.log(`🎚️ [Noise Gate] Threshold: ${clamped}dB`);
    }, []);

    // 📊 YENİ: Audio Visualizer Toggle
    const toggleVisualizer = useCallback((enabled) => {
        setIsVisualizerEnabled(enabled);
        localStorage.setItem('pawscord_visualizer', enabled.toString());
        console.log(`📊 [Visualizer] ${enabled ? 'ENABLED' : 'DISABLED'}`);
    }, []);

    // 📊 YENİ: Audio Visualizer Ref
    const visualizerIntervalRef = useRef(null);
    const visualizerAnalyserRef = useRef(null);

    // 📊 YENİ: Start Audio Visualizer
    const startVisualizer = useCallback(() => {
        if (!isVisualizerEnabled || !localAudioStream) return;
        if (visualizerIntervalRef.current) return; // Already running

        try {
            if (!globalAudioContextRef.current) {
                globalAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            const audioContext = globalAudioContextRef.current;

            // Local audio analyser
            const localAnalyser = audioContext.createAnalyser();
            localAnalyser.fftSize = 256;
            const localSource = audioContext.createMediaStreamSource(localAudioStream);
            localSource.connect(localAnalyser);
            visualizerAnalyserRef.current = { local: localAnalyser, localSource, remote: {} };

            // Remote audio analysers
            Object.entries(remoteStreams).forEach(([key, stream]) => {
                if (!key.includes('_camera') && !key.includes('_screen')) {
                    const remoteAnalyser = audioContext.createAnalyser();
                    remoteAnalyser.fftSize = 256;
                    const remoteSource = audioContext.createMediaStreamSource(stream);
                    remoteSource.connect(remoteAnalyser);
                    visualizerAnalyserRef.current.remote[key] = { analyser: remoteAnalyser, source: remoteSource };
                }
            });

            // Update interval (60fps = 16.67ms)
            visualizerIntervalRef.current = setInterval(() => {
                const localData = new Uint8Array(128);
                visualizerAnalyserRef.current.local.getByteFrequencyData(localData);

                const remoteData = {};
                Object.entries(visualizerAnalyserRef.current.remote).forEach(([key, { analyser }]) => {
                    const data = new Uint8Array(128);
                    analyser.getByteFrequencyData(data);
                    remoteData[key] = data;
                });

                setAudioVisualizerData({ local: localData, remote: remoteData });
            }, 33); // ~30fps for performance

            console.log('📊 [Visualizer] Started');
        } catch (err) {
            console.error('[Visualizer] Failed to start:', err);
        }
    }, [isVisualizerEnabled, localAudioStream, remoteStreams]);

    // 📊 YENİ: Stop Audio Visualizer
    const stopVisualizer = useCallback(() => {
        if (visualizerIntervalRef.current) {
            clearInterval(visualizerIntervalRef.current);
            visualizerIntervalRef.current = null;
        }
        if (visualizerAnalyserRef.current) {
            try {
                visualizerAnalyserRef.current.localSource?.disconnect();
                Object.values(visualizerAnalyserRef.current.remote).forEach(({ source }) => {
                    source?.disconnect();
                });
            } catch (e) { }
            visualizerAnalyserRef.current = null;
        }
        setAudioVisualizerData({ local: new Uint8Array(128), remote: {} });
        console.log('📊 [Visualizer] Stopped');
    }, []);

    // 📊 Auto-start/stop visualizer based on voice state
    useEffect(() => {
        if (isInVoice && isVisualizerEnabled) {
            startVisualizer();
        } else {
            stopVisualizer();
        }
        return () => stopVisualizer();
    }, [isInVoice, isVisualizerEnabled, startVisualizer, stopVisualizer]);

    // Cleanup recording on unmount or leave
    useEffect(() => {
        return () => {
            if (isRecording) {
                stopRecording();
            }
            if (micHealthIntervalRef.current) {
                clearInterval(micHealthIntervalRef.current);
                micHealthIntervalRef.current = null;
            }
            stopStatsMonitoring();
        };
    }, [isRecording, stopRecording, stopStatsMonitoring]);

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
            stopVisualizer
        }}>
            {children}
        </VoiceContext.Provider>
    );
};

export const useVoice = () => useContext(VoiceContext);



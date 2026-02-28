import { useCallback, useRef, useEffect } from 'react';
import { WS_PROTOCOL, API_HOST } from '../utils/constants';
import { setRtcIceServers } from './constants';
import { applyProfessionalAudioFilters } from './audioProcessing';
import toast from '../utils/toast';

/**
 * Voice connection hook — manages joinVoiceRoom, leaveVoiceRoom,
 * WebSocket reconnection, and mic watchdog.
 */
export function useVoiceConnection({
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
    iceServers, refreshIceServers, initializeAudio,
    handleSignalMessage,
    setRemoteStreams, setConnectedUsers,
    setIsReconnecting,
    stopRecording,
}) {
    // Internal reconnect state — using refs to avoid stale closures in ws.onclose
    const wsReconnectAttemptRef = useRef(0);
    const wsReconnectDelayRef = useRef(1000);

    // 🔥 FIX: Keep latest values in refs to avoid stale closures in WS handlers
    const handleSignalMessageRef = useRef(handleSignalMessage);
    useEffect(() => {
        handleSignalMessageRef.current = handleSignalMessage;
    }, [handleSignalMessage]);

    const isInVoiceRef = useRef(isInVoice);
    useEffect(() => { isInVoiceRef.current = isInVoice; }, [isInVoice]);

    // Internal refs
    const isLeavingRef = useRef(false);
    const isSwitchingRef = useRef(false);
    const micHealthIntervalRef = useRef(null);
    const wsReconnectTimeoutRef = useRef(null);
    const wsHealthCheckIntervalRef = useRef(null);

    // --- SESLİ SOHBETTEN AYRILMA ---
    const leaveVoiceRoom = useCallback(() => {
        if (isLeavingRef.current) return;
        isLeavingRef.current = true;

        // CRITICAL: Send leave signal BEFORE closing WebSocket
        if (voiceWsRef.current && voiceWsRef.current.readyState === WebSocket.OPEN) {
            try {
                voiceWsRef.current.send(JSON.stringify({
                    type: 'user_leaving',
                    sender_username: username
                }));
            } catch (e) {
                console.warn('[Voice] Failed to send leave signal:', e);
            }
        }

        // 1. Streamleri Durdur
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
            setLocalAudioStream(null);
            localStreamRef.current = null;
        }
        if (localCameraStream) {
            localCameraStream.getTracks().forEach(track => track.stop());
            setLocalCameraStream(null);
            setIsVideoEnabled(false);
        }
        if (localScreenStream) {
            localScreenStream.getTracks().forEach(track => track.stop());
            setLocalScreenStream(null);
            setIsScreenSharing(false);
        }

        // 2. Peer Connectionları Kapat
        Object.entries(peerConnectionsRef.current).forEach(([user, pc]) => pc.close());
        peerConnectionsRef.current = {};
        setRemoteStreams({});
        iceCandidateBufferRef.current = {};

        // 3. WebSocket Kapat
        if (voiceWsRef.current) {
            voiceWsRef.current.onclose = null;
            voiceWsRef.current.close();
            voiceWsRef.current = null;
        }

        setIsInVoice(false);
        setCurrentRoom(null);
        setIsConnecting(false);
        setIsMuted(false);
        setIsDeafened(false);
        stopRecording();

        if (micHealthIntervalRef.current) {
            clearInterval(micHealthIntervalRef.current);
            micHealthIntervalRef.current = null;
        }
        if (wsReconnectTimeoutRef.current) {
            clearTimeout(wsReconnectTimeoutRef.current);
            wsReconnectTimeoutRef.current = null;
        }
        if (wsHealthCheckIntervalRef.current) {
            clearInterval(wsHealthCheckIntervalRef.current);
            wsHealthCheckIntervalRef.current = null;
        }

        wsReconnectAttemptRef.current = 0;
        wsReconnectDelayRef.current = 1000;
        setIsReconnecting(false);

        setTimeout(() => { isLeavingRef.current = false; }, 100);
    }, [username, localCameraStream, localScreenStream, stopRecording]);

    // --- SESLİ SOHBETE KATILMA ---
    const joinVoiceRoom = useCallback(async (roomSlug) => {
        if (!token) {
            console.warn('[VoiceWS] No auth token, skipping voice join');
            return;
        }

        // 🔄 Channel switch: eski kanaldan hızlı çık
        if (isInVoice && currentRoom && currentRoom !== roomSlug && !isSwitchingRef.current) {
            isSwitchingRef.current = true;

            if (voiceWsRef.current) {
                const ws = voiceWsRef.current;
                try { ws.send(JSON.stringify({ type: 'user_leaving', sender_username: username })); } catch (e) { /* ignore */ }
                ws.onclose = null;
                ws.onerror = null;
                ws.onmessage = null;
                ws.close(1000, 'Switching channel');
                voiceWsRef.current = null;
            }

            Object.values(peerConnectionsRef.current).forEach((pc) => pc.close());
            peerConnectionsRef.current = {};
            setRemoteStreams({});
            iceCandidateBufferRef.current = {};
            isSwitchingRef.current = false;
        }

        if (isInVoice && currentRoom === roomSlug) return;
        if (isSwitchingRef.current) return;

        setIsConnecting(true);
        setCurrentRoom(roomSlug);

        try {
            // 🔥 PERF: Lazy-fetch TURN credentials on voice join (not on app mount)
            await refreshIceServers();

            if (iceServers && iceServers.length > 0) {
                setRtcIceServers(iceServers);
            }

            // 🔥 FIX: AudioContext'i hemen resume et (user gesture içinde — autoplay policy bypass)
            initializeAudio();

            let processedStream;
            let ws;
            const existingTrack = localStreamRef.current?.getAudioTracks()?.[0];

            if (existingTrack && existingTrack.readyState === 'live') {
                // ⚡ Channel switch — mevcut mic stream'i kullan (0ms!)
                processedStream = localStreamRef.current;

                const wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/voice/${roomSlug}/?token=${token}`;
                ws = new WebSocket(wsUrl);
                await new Promise((resolve, reject) => {
                    const timeout = setTimeout(() => reject(new Error('WS timeout')), 10000);
                    ws.onopen = () => { clearTimeout(timeout); resolve(); };
                    ws.onerror = (err) => { clearTimeout(timeout); reject(err); };
                });
            } else {
                // 🚀 PARALLEL: getUserMedia + WebSocket bağlantısını AYNI ANDA başlat
                const micPromise = navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true,
                        sampleRate: { ideal: 48000 },
                        sampleSize: { ideal: 16 },
                        channelCount: { ideal: 1 },
                        googEchoCancellation: true,
                        googAutoGainControl: true,
                        googNoiseSuppression: true,
                        googHighpassFilter: true,
                        googTypingNoiseDetection: true,
                        googAudioMirroring: false,
                        latency: { ideal: 0.02 }
                    },
                    video: false
                });

                const wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/voice/${roomSlug}/?token=${token}`;
                const newWs = new WebSocket(wsUrl);
                const wsOpenPromise = new Promise((resolve, reject) => {
                    const timeout = setTimeout(() => reject(new Error('WS timeout')), 10000);
                    newWs.onopen = () => { clearTimeout(timeout); resolve(newWs); };
                    newWs.onerror = (err) => { clearTimeout(timeout); reject(err); };
                });

                // 🔥 PARALLEL: Mic + WS aynı anda (toplam süre = max(mic, ws))
                const [stream, connectedWs] = await Promise.all([micPromise, wsOpenPromise]);
                ws = connectedWs;

                processedStream = stream;
                if (isNoiseSuppressionEnabled) {
                    try {
                        processedStream = applyProfessionalAudioFilters(stream, globalAudioContextRef);
                    } catch (filterError) {
                        console.warn('[Voice] Professional filters failed:', filterError);
                        processedStream = stream;
                    }
                }
            }

            // === HER İKİ PATH İÇİN ORTAK SETUP ===
            setLocalAudioStream(processedStream);
            localStreamRef.current = processedStream;

            processedStream.getAudioTracks().forEach(track => {
                track.enabled = !isMuted;
            });

            // 🔥 Mic watchdog (4s — eskiden 8s, daha hızlı dead mic detection)
            if (!micHealthIntervalRef.current) {
                micHealthIntervalRef.current = setInterval(async () => {
                    const current = localStreamRef.current;
                    const track = current?.getAudioTracks()?.[0];
                    if (!isInVoice || isLeavingRef.current) return;

                    if (audioContextRef.current?.state === 'suspended') {
                        await audioContextRef.current.resume().catch(() => { });
                    }

                    if (!track || track.readyState === 'ended' || (!track.enabled && !isMuted && !isPTTMode)) {
                        try {
                            const fresh = await navigator.mediaDevices.getUserMedia({
                                audio: {
                                    echoCancellation: true,
                                    noiseSuppression: true,
                                    autoGainControl: true,
                                    googEchoCancellation: true,
                                    googNoiseSuppression: true,
                                    googHighpassFilter: true,
                                    googTypingNoiseDetection: true,
                                    sampleRate: 48000,
                                    channelCount: 1
                                },
                                video: false
                            });

                            // 🔥 FIX: Mic watchdog'da da profesyonel filtreler uygula (eskiden düz stream gönderiyordu)
                            let processedFresh = fresh;
                            if (isNoiseSuppressionEnabled) {
                                try {
                                    processedFresh = applyProfessionalAudioFilters(fresh, globalAudioContextRef);
                                    logger.audio('[Mic Watchdog] Professional filters reapplied to fresh stream');
                                } catch (filterErr) {
                                    console.warn('[Mic Watchdog] Filter reapply failed, using raw:', filterErr);
                                }
                            }

                            setLocalAudioStream(processedFresh);
                            localStreamRef.current = processedFresh;

                            const newTrack = processedFresh.getAudioTracks()[0];
                            Object.values(peerConnectionsRef.current).forEach((pc) => {
                                pc.getSenders()
                                    .filter((s) => s.track?.kind === 'audio')
                                    .forEach((sender) => sender.replaceTrack(newTrack).catch(() => { }));
                            });
                        } catch (err) {
                            console.warn('[Mic Watchdog] Mic refresh failed:', err);
                        }
                    }
                }, 4000);
            }

            // === WebSocket Handler Setup ===
            voiceWsRef.current = ws;

            // WS zaten OPEN — hemen isInVoice set et (delay yok)
            setIsInVoice(true);
            setIsConnecting(false);

            // Optimistic update — kendimizi listeye ekle
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

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    // 🔥 FIX: Ref kullan → her zaman güncel handleSignalMessage (stale closure fix)
                    handleSignalMessageRef.current(data);
                } catch (e) {
                    console.error('[VoiceWS] Parse error:', e);
                }
            };

            ws.onerror = (error) => {
                console.error('[VoiceWS] Error:', error);
                setIsConnecting(false);
                if (!isLeavingRef.current && !isSwitchingRef.current) {
                    console.warn('[VoiceWS] Error occurred, reconnect will be attempted on close');
                }
            };

            ws.onclose = (event) => {
                // 🔥 AUTO-RECONNECT SİSTEMİ

                if (isLeavingRef.current || isSwitchingRef.current) {
                    setIsReconnecting(false);
                    wsReconnectAttemptRef.current = 0;
                    wsReconnectDelayRef.current = 1000;
                    if (wsReconnectTimeoutRef.current) {
                        clearTimeout(wsReconnectTimeoutRef.current);
                        wsReconnectTimeoutRef.current = null;
                    }
                    return;
                }

                if (event.code === 1000) {
                    if (isLeavingRef.current) { leaveVoiceRoom(); return; }
                    console.info('[VoiceWS] Normal close (1000) without intentional leave — attempting reconnect');
                }

                if (event.code === 4001 || event.code === 4003 || (!token && event.code === 1006)) {
                    console.warn(`[VoiceWS] Auth/origin rejection (code: ${event.code}), not retrying`);
                    leaveVoiceRoom();
                    return;
                }

                // 🔥 FIX: Use refs to avoid stale closure — isInVoice was captured
                // at joinVoiceRoom call time (often false), but we need the CURRENT value
                if (roomSlug && isInVoiceRef.current) {
                    const maxRetries = 10;
                    const currentAttempt = wsReconnectAttemptRef.current + 1;

                    if (currentAttempt > maxRetries) {
                        console.error(`[VoiceWS] Max retry limit reached (${maxRetries}), giving up`);
                        toast.error(`Sesli sohbet bağlantısı ${maxRetries} denemeden sonra kurulamadı.`, 5000);
                        leaveVoiceRoom();
                        wsReconnectAttemptRef.current = 0;
                        wsReconnectDelayRef.current = 1000;
                        return;
                    }

                    const delay = Math.min(wsReconnectDelayRef.current, 30000);
                    console.warn(`[VoiceWS] 🔄 Unexpected disconnect (code: ${event.code}), attempt ${currentAttempt}/${maxRetries}`);
                    setIsReconnecting(true);
                    wsReconnectAttemptRef.current = currentAttempt;

                    if (wsReconnectTimeoutRef.current) clearTimeout(wsReconnectTimeoutRef.current);

                    wsReconnectTimeoutRef.current = setTimeout(() => {
                        if (!isLeavingRef.current && !isSwitchingRef.current && roomSlug) {
                            wsReconnectDelayRef.current = Math.min(wsReconnectDelayRef.current * 2, 30000);
                            joinVoiceRoom(roomSlug).then(() => {
                                wsReconnectAttemptRef.current = 0;
                                wsReconnectDelayRef.current = 1000;
                                setIsReconnecting(false);
                            }).catch(err => {
                                console.error('[VoiceWS] Reconnection failed:', err);
                            });
                        } else {
                            setIsReconnecting(false);
                            wsReconnectAttemptRef.current = 0;
                            wsReconnectDelayRef.current = 1000;
                        }
                    }, delay);
                } else {
                    leaveVoiceRoom();
                }
            };

        } catch (err) {
            console.error('Voice Join Error:', err);
            setIsConnecting(false);
            isSwitchingRef.current = false;

            if (err.name === 'NotAllowedError') {
                toast.warning('Mikrofon izni reddedildi. Lütfen tarayıcı ayarlarından izin verin.', 5000);
            } else if (err.name === 'NotFoundError') {
                toast.warning('Mikrofon bulunamadı. Lütfen bir mikrofon bağlayın.');
            } else {
                toast.error('Sesli sohbete bağlanılamadı: ' + err.message);
            }
        }
    }, [isInVoice, currentRoom, token, initializeAudio, leaveVoiceRoom]);

    // Keep joinVoiceRoomRef in sync
    useEffect(() => {
        joinVoiceRoomRef.current = joinVoiceRoom;
        leaveVoiceRoomRef.current = leaveVoiceRoom;
    }, [joinVoiceRoom, leaveVoiceRoom]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (micHealthIntervalRef.current) {
                clearInterval(micHealthIntervalRef.current);
                micHealthIntervalRef.current = null;
            }
            if (wsReconnectTimeoutRef.current) {
                clearTimeout(wsReconnectTimeoutRef.current);
                wsReconnectTimeoutRef.current = null;
            }
            if (wsHealthCheckIntervalRef.current) {
                clearInterval(wsHealthCheckIntervalRef.current);
                wsHealthCheckIntervalRef.current = null;
            }
        };
    }, []);

    return { joinVoiceRoom, leaveVoiceRoom };
}

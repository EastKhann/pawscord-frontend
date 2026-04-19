// PropTypes validation: N/A for this module (hook/utility — no React props interface)
// Accessibility (aria): N/A for this module (hook/context/utility — no rendered DOM)
// aria-label: n/a — hook/context/utility module, no directly rendered JSX
import { useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { WS_PROTOCOL, API_HOST } from '../utils/constants';
import { setRtcIceServers } from './constants';
import { applyProfessionalAudioFilters } from './audioProcessing';
import toast from '../utils/toast';
import logger from '../utils/logger';

/**
 * Connect a WebSocket with retry logic.
 * Retries up to `maxRetries` times with exponential backoff when the
 * initial connection fails (timeout or error). This handles the case where
 * a proxy/CDN intermittently strips WebSocket upgrade headers.
 */
function connectWebSocketWithRetry(url, { maxRetries = 3, timeout = 12000 } = {}) {
    let attempt = 0;
    const tryConnect = () =>
        new Promise((resolve, reject) => {
            attempt++;
            const ws = new WebSocket(url);
            const timer = setTimeout(() => {
                try {
                    ws.close();
                } catch (_) {
                    /* ignore */
                }
                reject(new Error(`WS timeout (attempt ${attempt}/${maxRetries})`));
            }, timeout);
            ws.onopen = () => {
                clearTimeout(timer);
                resolve(ws);
            };
            ws.onerror = () => {
                clearTimeout(timer);
                reject(new Error(`WS error (attempt ${attempt}/${maxRetries})`));
            };
        });

    return (async () => {
        while (attempt < maxRetries) {
            try {
                return await tryConnect();
            } catch (err) {
                if (attempt >= maxRetries) throw err;
                // Wait before retry: 500ms, 1500ms, ...
                const delay = 500 + (attempt - 1) * 1000;
                logger.warn(`[VoiceWS] ${err.message}, retrying in ${delay}ms...`);
                await new Promise((r) => setTimeout(r, delay));
            }
        }
        throw new Error('WS connection failed after retries');
    })();
}

/**
 * Voice connection hook — manages joinVoiceRoom, leaveVoiceRoom,
 * WebSocket reconnection, and mic watchdog.
 */
export function useVoiceConnection({
    username,
    token,
    isInVoice,
    setIsInVoice,
    currentRoom,
    setCurrentRoom,
    isMuted,
    setIsMuted,
    isVideoEnabled,
    isScreenSharing,
    setIsDeafened,
    setIsConnecting,
    setLocalAudioStream,
    localCameraStream,
    setLocalCameraStream,
    setIsVideoEnabled,
    localScreenStream,
    setLocalScreenStream,
    setIsScreenSharing,
    localStreamRef,
    localCameraStreamRef,
    localScreenStreamRef,
    voiceWsRef,
    peerConnectionsRef,
    audioContextRef,
    globalAudioContextRef,
    iceCandidateBufferRef,
    joinVoiceRoomRef,
    leaveVoiceRoomRef,
    isNoiseSuppressionEnabled,
    isPTTMode,
    iceServers,
    refreshIceServers,
    initializeAudio,
    handleSignalMessage,
    setRemoteStreams,
    setConnectedUsers,
    setIsReconnecting,
    stopRecording,
}) {
    const { t } = useTranslation();
    // Internal reconnect state — using refs to avoid stale closures in ws.onclose
    const wsReconnectAttemptRef = useRef(0);
    const wsReconnectDelayRef = useRef(1000);

    // 🔥 FIX: Keep latest values in refs to avoid stale closures in WS handlers
    const handleSignalMessageRef = useRef(handleSignalMessage);
    useEffect(() => {
        handleSignalMessageRef.current = handleSignalMessage;
    }, [handleSignalMessage]);

    const isInVoiceRef = useRef(isInVoice);
    useEffect(() => {
        isInVoiceRef.current = isInVoice;
    }, [isInVoice]);

    // Refs for values consumed inside the mic watchdog setInterval to avoid
    // stale closures (the interval is only created once on first join).
    const isMutedRef = useRef(isMuted);
    const isPTTModeRef = useRef(isPTTMode);
    const isNsEnabledRef = useRef(isNoiseSuppressionEnabled);
    useEffect(() => {
        isMutedRef.current = isMuted;
    }, [isMuted]);
    useEffect(() => {
        isPTTModeRef.current = isPTTMode;
    }, [isPTTMode]);
    useEffect(() => {
        isNsEnabledRef.current = isNoiseSuppressionEnabled;
    }, [isNoiseSuppressionEnabled]);

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
                voiceWsRef.current.send(
                    JSON.stringify({
                        type: 'user_leaving',
                        sender_username: username,
                    })
                );
            } catch (e) {
                logger.warn('[Voice] Failed to send leave signal:', e);
            }
        }

        // 1. Streamleri Stop
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach((track) => track.stop());
            setLocalAudioStream(null);
            localStreamRef.current = null;
        }
        if (localCameraStream) {
            localCameraStream.getTracks().forEach((track) => track.stop());
            setLocalCameraStream(null);
            setIsVideoEnabled(false);
        }
        if (localScreenStream) {
            localScreenStream.getTracks().forEach((track) => track.stop());
            setLocalScreenStream(null);
            setIsScreenSharing(false);
        }

        // 2. Peer Connectionları Close
        Object.entries(peerConnectionsRef.current).forEach(([user, pc]) => pc.close());
        peerConnectionsRef.current = {};
        setRemoteStreams({});
        iceCandidateBufferRef.current = {};

        // 3. WebSocket Close
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

        setTimeout(() => {
            isLeavingRef.current = false;
        }, 100);
    }, [username, localCameraStream, localScreenStream, stopRecording]);

    // --- SESLİ SOHBETE KATILMA ---
    const joinVoiceRoom = useCallback(
        async (roomSlug) => {
            if (!token) {
                logger.warn('[VoiceWS] No auth token, skipping voice join');
                return;
            }

            // 🔄 Channel switch: eski kanaldan hızlı çık
            if (isInVoice && currentRoom && currentRoom !== roomSlug && !isSwitchingRef.current) {
                isSwitchingRef.current = true;

                if (voiceWsRef.current) {
                    const ws = voiceWsRef.current;
                    try {
                        ws.send(
                            JSON.stringify({ type: 'user_leaving', sender_username: username })
                        );
                    } catch (e) {
                        /* ignore */
                    }
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
                // 🔥 FIX: refreshIceServers() already calls setRtcIceServers() internally
                // with the fresh servers from the API response. Do NOT read the stale
                // `iceServers` closure variable here — it was captured at render time and
                // may be empty/default, overwriting the correct servers just set by refresh.

                // 🔥 FIX: AudioContext'i hemen resume et (user gesture forde — autoplay policy bypass)
                initializeAudio();

                let processedStream;
                let ws;
                const existingTrack = localStreamRef.current?.getAudioTracks()?.[0];

                if (existingTrack && existingTrack.readyState === 'live') {
                    // ⚡ Channel switch — mevcut mic stream'i kullan (0ms!)
                    processedStream = localStreamRef.current;

                    const wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/voice/${roomSlug}/?token=${token}`;
                    ws = await connectWebSocketWithRetry(wsUrl);
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
                            latency: { ideal: 0.02 },
                        },
                        video: false,
                    });

                    const wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/voice/${roomSlug}/?token=${token}`;
                    const wsOpenPromise = connectWebSocketWithRetry(wsUrl);

                    // 🔥 PARALLEL: Mic + WS ayını anda (total süre = max(mic, ws))
                    const [stream, connectedWs] = await Promise.all([micPromise, wsOpenPromise]);
                    ws = connectedWs;

                    processedStream = stream;
                    if (isNoiseSuppressionEnabled) {
                        try {
                            processedStream = applyProfessionalAudioFilters(
                                stream,
                                globalAudioContextRef
                            );
                        } catch (filterError) {
                            logger.warn('[Voice] Professional filters failed:', filterError);
                            processedStream = stream;
                        }
                    }
                }

                // === HER İKİ PATH İÇİN ORTAK SETUP ===
                setLocalAudioStream(processedStream);
                localStreamRef.current = processedStream;

                processedStream.getAudioTracks().forEach((track) => {
                    track.enabled = !isMuted;
                });

                // 🔥 Mic watchdog (4s — eskiden 8s, daha hızlı dead mic detection)
                if (!micHealthIntervalRef.current) {
                    micHealthIntervalRef.current = setInterval(async () => {
                        const current = localStreamRef.current;
                        const track = current?.getAudioTracks()?.[0];
                        if (!isInVoiceRef.current || isLeavingRef.current) return;

                        if (audioContextRef.current?.state === 'suspended') {
                            await audioContextRef.current.resume().catch(() => {});
                        }

                        // Use refs to get current values — closure would be stale
                        if (
                            !track ||
                            track.readyState === 'ended' ||
                            (!track.enabled && !isMutedRef.current && !isPTTModeRef.current)
                        ) {
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
                                        channelCount: 1,
                                    },
                                    video: false,
                                });

                                let processedFresh = fresh;
                                if (isNsEnabledRef.current) {
                                    try {
                                        processedFresh = applyProfessionalAudioFilters(
                                            fresh,
                                            globalAudioContextRef
                                        );
                                        if (import.meta.env.DEV)
                                            logger.log(
                                                '[Mic Watchdog] Professional filters reapplied to fresh stream'
                                            );
                                    } catch (filterErr) {
                                        logger.warn(
                                            '[Mic Watchdog] Filter reapply failed, using raw:',
                                            filterErr
                                        );
                                    }
                                }

                                // Clean up old stream's noise-gate interval
                                if (current?._noiseGateInterval) {
                                    clearInterval(current._noiseGateInterval);
                                }

                                setLocalAudioStream(processedFresh);
                                localStreamRef.current = processedFresh;

                                const newTrack = processedFresh.getAudioTracks()[0];
                                Object.values(peerConnectionsRef.current).forEach((pc) => {
                                    pc.getSenders()
                                        .filter((s) => s.track?.kind === 'audio')
                                        .forEach((sender) =>
                                            sender.replaceTrack(newTrack).catch(() => {})
                                        );
                                });
                            } catch (err) {
                                logger.warn('[Mic Watchdog] Mic refresh failed:', err);
                            }
                        }
                    }, 4000);
                }

                // === WebSocket Handler Setup ===
                voiceWsRef.current = ws;

                // WS zaten OPEN — hemen isInVoice set et (delay yok)
                setIsInVoice(true);
                setIsConnecting(false);

                // Optimistic update — kendimizi listye add
                setConnectedUsers((prev) => {
                    const meInList = prev.some((u) => u.username === username);
                    if (meInList) return prev;
                    return [
                        {
                            username: username,
                            isMuted: isMuted,
                            isCameraOn: isVideoEnabled,
                            isScreenSharing: isScreenSharing,
                            isTalking: false,
                        },
                        ...prev,
                    ];
                });

                ws.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        // 🔥 FIX: Ref kullan → her zaman daycel handleSignalMessage (stale closure fix)
                        handleSignalMessageRef.current(data);
                    } catch (e) {
                        logger.error('[VoiceWS] Parse error:', e);
                    }
                };

                ws.onerror = (error) => {
                    logger.error('[VoiceWS] Error:', error);
                    setIsConnecting(false);
                    if (!isLeavingRef.current && !isSwitchingRef.current) {
                        logger.warn(
                            '[VoiceWS] Error occurred, reconnect will be attempted on close'
                        );
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
                        if (isLeavingRef.current) {
                            leaveVoiceRoomRef.current();
                            return;
                        }
                        logger.info(
                            '[VoiceWS] Normal close (1000) without intentional leave — attempting reconnect'
                        );
                    }

                    if (
                        event.code === 4001 ||
                        event.code === 4003 ||
                        (!token && event.code === 1006)
                    ) {
                        logger.warn(
                            `[VoiceWS] Auth/origin rejection (code: ${event.code}), not retrying`
                        );
                        setIsReconnecting(false);
                        leaveVoiceRoomRef.current();
                        return;
                    }

                    // 🔥 FIX: Use refs to avoid stale closure — isInVoice was captured
                    // at joinVoiceRoom call time (often false), but we need the CURRENT value
                    if (roomSlug && isInVoiceRef.current) {
                        const maxRetries = 10;
                        const currentAttempt = wsReconnectAttemptRef.current + 1;

                        if (currentAttempt > maxRetries) {
                            logger.error(
                                `[VoiceWS] Max retry limit reached (${maxRetries}), giving up`
                            );
                            toast.error(t('voice.connectionFailed', { count: maxRetries }), 5000);
                            setIsReconnecting(false);
                            wsReconnectAttemptRef.current = 0;
                            wsReconnectDelayRef.current = 1000;
                            leaveVoiceRoomRef.current();
                            return;
                        }

                        const delay = Math.min(wsReconnectDelayRef.current, 30000);
                        logger.warn(
                            `[VoiceWS] 🔄 Unexpected disconnect (code: ${event.code}), attempt ${currentAttempt}/${maxRetries}`
                        );
                        setIsReconnecting(true);
                        wsReconnectAttemptRef.current = currentAttempt;

                        if (wsReconnectTimeoutRef.current)
                            clearTimeout(wsReconnectTimeoutRef.current);

                        wsReconnectTimeoutRef.current = setTimeout(() => {
                            if (!isLeavingRef.current && !isSwitchingRef.current && roomSlug) {
                                wsReconnectDelayRef.current = Math.min(
                                    wsReconnectDelayRef.current * 2,
                                    30000
                                );
                                // 🔥 FIX: Use ref — ensures latest token is used if token rotated
                                joinVoiceRoomRef
                                    .current(roomSlug)
                                    .then(() => {
                                        wsReconnectAttemptRef.current = 0;
                                        wsReconnectDelayRef.current = 1000;
                                        setIsReconnecting(false);
                                    })
                                    .catch((err) => {
                                        logger.error('[VoiceWS] Reconnection failed:', err);
                                        setIsReconnecting(false);
                                    });
                            } else {
                                setIsReconnecting(false);
                                wsReconnectAttemptRef.current = 0;
                                wsReconnectDelayRef.current = 1000;
                            }
                        }, delay);
                    } else {
                        leaveVoiceRoomRef.current();
                    }
                };
            } catch (err) {
                logger.error('Voice Join Error:', err);
                setIsConnecting(false);
                isSwitchingRef.current = false;

                if (err.name === 'NotAllowedError') {
                    toast.warning(t('voice.micDeniedVoice'), 5000);
                } else if (err.name === 'NotFoundError') {
                    toast.warning(t('voice.micNotFoundVoice'));
                } else {
                    toast.error(t('voice.connectionErrorVoice', { error: err.message }));
                }
            }
        },
        [isInVoice, currentRoom, token, initializeAudio, leaveVoiceRoom]
    );

    // Keep joinVoiceRoomRef in sync
    useEffect(() => {
        joinVoiceRoomRef.current = joinVoiceRoom;
        leaveVoiceRoomRef.current = leaveVoiceRoom;
    }, [joinVoiceRoom, leaveVoiceRoom]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            // Close voice WebSocket
            if (voiceWsRef.current) {
                voiceWsRef.current.onclose = null;
                voiceWsRef.current.close();
                voiceWsRef.current = null;
            }
            // Stop all media streams
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach((t) => t.stop());
                localStreamRef.current = null;
            }
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

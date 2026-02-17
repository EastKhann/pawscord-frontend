import { useCallback, useRef, useState, useEffect } from 'react';
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
    iceServers, initializeAudio,
    handleSignalMessage,
    setRemoteStreams, setConnectedUsers,
    setIsReconnecting,
    stopRecording,
}) {
    // Internal reconnect state
    const [wsReconnectAttempt, setWsReconnectAttempt] = useState(0);
    const [wsReconnectDelay, setWsReconnectDelay] = useState(1000);

    // Internal refs
    const isLeavingRef = useRef(false);
    const isSwitchingRef = useRef(false);
    const micHealthIntervalRef = useRef(null);
    const wsReconnectTimeoutRef = useRef(null);
    const wsHealthCheckIntervalRef = useRef(null);

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
        // Token yoksa bağlanma (auth gerekli)
        if (!token) {
            console.warn('[VoiceWS] No auth token, skipping voice join');
            return;
        }

        // 🔄 Eğer zaten bir kanalda ise ve farklı bir kanala geçmek isteniyorsa
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
            // 🔥 TURN bilgisi zaten state'de; ikinci kez fetch etme
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
                // Eğer kullanıcı intentional leave yapmadıysa (sunucu restart mümkün), reconnect dene
                if (event.code === 1000) {
                    if (isLeavingRef.current) {
                        leaveVoiceRoom();
                        return;
                    }
                    // Sunucu graceful shutdown — reconnect dene
                    console.log('[VoiceWS] Normal close (1000) without intentional leave — attempting reconnect');
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

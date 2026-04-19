import { useCallback, useRef } from 'react';
import logger from '../utils/logger';
import { RTC_CONFIGURATION } from './constants';

/**
 * 🔥 Opus SDP Bitrate Optimization
 * Default Opus bitrate ~32kbps — sesli sohbet for yetersiz.
 * SDP manipülasyonu with 96kbps'ye çıkarıyoruz + FEC + DTX aktif.
 */
function optimizeOpusSdp(sdp) {
    if (!sdp) return sdp;
    // Opus codec satırını find ve parametreleri add
    return sdp.replace(/a=fmtp:(\d+) (.+)/g, (match, payloadType, params) => {
        // Sadece Opus fmtp satırlarına uygula
        if (!params.includes('minptime')) return match; // Opus hep minptime içerir

        const newParams = [];
        // Mevcut parametreleri koru
        params.split(';').forEach((p) => {
            const key = p.trim().split('=')[0];
            // Bu parametreleri biz ayarlayacağız, eski değerleri atla
            if (
                ![
                    'maxaveragebitrate',
                    'stereo',
                    'sprop-stereo',
                    'useinbandfec',
                    'usedtx',
                    'maxplaybackrate',
                    'cbr',
                ].includes(key)
            ) {
                newParams.push(p.trim());
            }
        });

        // 🔥 Profesyonel Opus settingsı
        newParams.push('maxaveragebitrate=96000'); // 96kbps (daha yüksek kalite = daha net audio)
        newParams.push('stereo=0'); // Mono (sesli sohbet for yeterli, bandwidth tasarrufu)
        newParams.push('sprop-stereo=0');
        newParams.push('useinbandfec=1'); // 🔥 Forward Error Correction — paket kaybında audio korunur
        newParams.push('usedtx=1'); // 🔥 Discontinuous Transmission — sessizlikte bandwidth tasarrufu
        newParams.push('maxplaybackrate=48000'); // 48kHz playback
        newParams.push('cbr=0'); // VBR (Variable Bit Rate) — daha verimli

        return `a=fmtp:${payloadType} ${newParams.join(';')}`;
    });
}

/**
 * 🔥 Audio sender bitrate ayarla (SDP dışı yöntem — daha güvenilir)
 */
async function setAudioBitrate(pc, maxBitrate = 96000) {
    try {
        const senders = pc.getSenders();
        const audioSender = senders.find((s) => s.track?.kind === 'audio');
        if (!audioSender) return;

        const params = audioSender.getParameters();
        if (!params.encodings || params.encodings.length === 0) {
            params.encodings = [{}];
        }
        params.encodings[0].maxBitrate = maxBitrate;
        // 🔥 Network priority'yi yüksek yap (audio öncelikli)
        params.encodings[0].networkPriority = 'high';
        params.encodings[0].priority = 'high';
        await audioSender.setParameters(params);
        logger.audio(`[Opus] Audio bitrate set to ${maxBitrate / 1000}kbps`);
    } catch (e) {
        logger.warn('[Opus] setParameters failed:', e.message);
    }
}

// 🔥 Export for use in useSignalHandler
export { optimizeOpusSdp };

/**
 * WebRTC Peer Connection yönetimi
 * createPeerConnection, handleRemoteStream, adjustBandwidth, sendSignal
 */
export function useWebRTC({
    username,
    voiceWsRef,
    peerConnectionsRef,
    localStreamRef,
    localCameraStreamRef,
    localScreenStreamRef,
    setRemoteStreams,
    setIsReconnecting,
    initializeAudio,
}) {
    const iceCandidateBufferRef = useRef({});
    // 🔥 FIX: Track metadata map — sender signals which track IDs are "screen" vs "camera".
    // track.label and track.contentHint do NOT transfer over WebRTC, so we use out-of-band signaling.
    const trackMetadataRef = useRef({}); // { trackId: 'screen' | 'camera' }

    const sendSignal = useCallback(
        (signal) => {
            if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
                logger.signal(
                    `Sending ${signal.type} to ${signal.receiver_username || 'BROADCAST'}`
                );
                voiceWsRef.current.send(JSON.stringify({ ...signal, sender_username: username }));
            } else {
                logger.warn('[Signal] WS not ready, cannot send:', signal.type);
            }
        },
        [username, voiceWsRef]
    );

    const adjustBandwidth = useCallback((peerConnection, quality) => {
        try {
            const senders = peerConnection.getSenders();

            // 🔥 Video bandwidth ayarla
            const videoSender = senders.find((sender) => sender.track?.kind === 'video');
            if (videoSender) {
                const parameters = videoSender.getParameters();
                if (!parameters.encodings || parameters.encodings.length === 0) {
                    parameters.encodings = [{}];
                }

                const qualitySettings = {
                    low: { maxBitrate: 300000, maxFramerate: 15, audioBitrate: 48000 }, // 🔥 32k → 48k: düşük kalitede de audio net olsun
                    medium: { maxBitrate: 800000, maxFramerate: 24, audioBitrate: 64000 }, // 🔥 48k → 64k: orta kalite iyleştirildi
                    high: { maxBitrate: 2500000, maxFramerate: 30, audioBitrate: 96000 }, // 🔥 64k → 96k: SDP optimizasyonuyla tutarlı
                };

                const settings = qualitySettings[quality] || qualitySettings.medium;
                parameters.encodings[0].maxBitrate = settings.maxBitrate;
                parameters.encodings[0].maxFramerate = settings.maxFramerate;

                videoSender.setParameters(parameters).catch((err) => {
                    logger.warn('[Bandwidth] Failed to set video parameters:', err);
                });

                // 🔥 Ağ kalitesine göre audio bitrate de ayarla
                setAudioBitrate(peerConnection, settings.audioBitrate);
            }

            // 🔥 Video yoksa sadece audio bitrate ayarla (audio-only oda — daha yüksek bitrate)
            if (!videoSender) {
                const audioBitrateMap = { low: 48000, medium: 64000, high: 96000 };
                setAudioBitrate(peerConnection, audioBitrateMap[quality] || 96000);
            }
        } catch (err) {
            logger.warn('[Bandwidth] Error adjusting bandwidth:', err);
        }
    }, []);

    const handleRemoteStream = useCallback(
        (partnerUsername, event) => {
            const { track } = event;
            logger.webrtc(`Track Received from ${partnerUsername}:`, track.kind, track.id);

            // 🔥 FIX: Check track metadata signaled by sender (primary detection method).
            // track.label and track.contentHint do NOT survive WebRTC transport.
            const signaledType = trackMetadataRef.current[track.id];

            const trackLabel = (track.label || '').toLowerCase();
            const isScreenTrack =
                signaledType === 'screen' ||
                (!signaledType &&
                    (trackLabel.includes('screen') ||
                        trackLabel.includes('window') ||
                        trackLabel.includes('monitor') ||
                        trackLabel.includes('display') ||
                        trackLabel.includes('tab') ||
                        track.contentHint === 'detail'));

            const classifyAndStore = (isScreen) => {
                const streamKey =
                    track.kind === 'video' && isScreen
                        ? `${partnerUsername}_screen`
                        : track.kind === 'video'
                          ? `${partnerUsername}_camera`
                          : partnerUsername;

                setRemoteStreams((prev) => {
                    const currentStream = prev[streamKey];
                    if (currentStream) {
                        if (!currentStream.getTracks().some((t) => t.id === track.id)) {
                            currentStream.addTrack(track);
                            const refreshedStream = new MediaStream(currentStream.getTracks());
                            return { ...prev, [streamKey]: refreshedStream };
                        }
                        return prev;
                    }
                    return { ...prev, [streamKey]: new MediaStream([track]) };
                });
            };

            classifyAndStore(isScreenTrack);

            // 🔥 FIX: Race condition — track_metadata signal may arrive AFTER ontrack
            // because metadata travels via WebSocket while ontrack fires via DTLS/SRTP.
            // Re-check after a short delay to correct misclassified tracks.
            if (track.kind === 'video' && !signaledType) {
                setTimeout(() => {
                    const laterType = trackMetadataRef.current[track.id];
                    if (laterType && (laterType === 'screen') !== isScreenTrack) {
                        logger.webrtc(
                            `[TrackReclass] ${partnerUsername} track ${track.id} reclassified: ${isScreenTrack ? 'screen' : 'camera'} → ${laterType}`
                        );
                        // Reclassify: remove from wrong key, add to correct key
                        const wrongKey = isScreenTrack
                            ? `${partnerUsername}_screen`
                            : `${partnerUsername}_camera`;
                        const correctKey =
                            laterType === 'screen'
                                ? `${partnerUsername}_screen`
                                : `${partnerUsername}_camera`;

                        setRemoteStreams((prev) => {
                            const updated = { ...prev };
                            // Remove from wrong key
                            if (updated[wrongKey]) {
                                const remainingTracks = updated[wrongKey]
                                    .getTracks()
                                    .filter((t) => t.id !== track.id);
                                if (remainingTracks.length === 0) {
                                    delete updated[wrongKey];
                                } else {
                                    updated[wrongKey] = new MediaStream(remainingTracks);
                                }
                            }
                            // Add to correct key
                            if (updated[correctKey]) {
                                if (
                                    !updated[correctKey].getTracks().some((t) => t.id === track.id)
                                ) {
                                    updated[correctKey].addTrack(track);
                                    updated[correctKey] = new MediaStream(
                                        updated[correctKey].getTracks()
                                    );
                                }
                            } else {
                                updated[correctKey] = new MediaStream([track]);
                            }
                            return updated;
                        });
                    }
                }, 500); // 500ms — enough time for track_metadata to arrive via WS
            }

            if (track.kind === 'audio') {
                initializeAudio();
                try {
                    // 🔥 FIX: Remove existing audio element first to prevent duplicates
                    const existingEl = document.getElementById(`remote-audio-${partnerUsername}`);
                    if (existingEl) {
                        existingEl.pause();
                        existingEl.srcObject = null;
                        existingEl.remove();
                    }

                    const audioEl = document.createElement('audio');
                    audioEl.id = `remote-audio-${partnerUsername}`;
                    audioEl.srcObject = new MediaStream([track]);
                    audioEl.autoplay = true;
                    audioEl.playsInline = true;
                    // 🔥 FIX: MUTED — this element is only for autoplay priming & DOM reference.
                    // Actual audio playback is handled by VoiceAudioController (which has GainNode support).
                    // Having both unmuted caused DOUBLE audio = 2-3x volume jump!
                    audioEl.volume = 1.0;
                    audioEl.muted = true;

                    audioEl.style.display = 'none';
                    document.body.appendChild(audioEl);

                    // 🔥 FIX: More robust autoplay with multiple retry strategies
                    const playAudio = () => {
                        if (!audioEl.parentNode) return; // Element was removed
                        audioEl.play().catch((err) => {
                            logger.warn(
                                `[Audio] Autoplay blocked for ${partnerUsername}:`,
                                err.message
                            );
                            // Strategy 1: Retry on any user interaction
                            const resumeAudio = () => {
                                audioEl.play().catch(() => {});
                            };
                            document.addEventListener('click', resumeAudio, { once: true });
                            document.addEventListener('keydown', resumeAudio, { once: true });
                            document.addEventListener('touchstart', resumeAudio, { once: true });
                            // Strategy 2: Retry after short delay (browser may allow after initial block)
                            setTimeout(() => {
                                audioEl.play().catch(() => {});
                            }, 1000);
                        });
                    };
                    playAudio();

                    // 🔥 FIX: If track ends or is replaced, clean up
                    track.onended = () => {
                        const el = document.getElementById(`remote-audio-${partnerUsername}`);
                        if (el) {
                            el.pause();
                            el.srcObject = null;
                            el.remove();
                        }
                    };
                } catch (err) {
                    logger.error(
                        `[Audio] Failed to create audio element for ${partnerUsername}:`,
                        err
                    );
                }
            }
        },
        [initializeAudio, setRemoteStreams]
    );

    const createPeerConnection = useCallback(
        (partnerUsername, isInitiator = false) => {
            if (peerConnectionsRef.current[partnerUsername]) {
                logger.warn(`PC already exists for ${partnerUsername}`);
                return peerConnectionsRef.current[partnerUsername];
            }

            logger.webrtc(`Creating PC for ${partnerUsername} (Initiator: ${isInitiator})`);
            const pc = new RTCPeerConnection(RTC_CONFIGURATION);
            peerConnectionsRef.current[partnerUsername] = pc;

            if (typeof window !== 'undefined') {
                window.__pawscord_peer_connections__ = peerConnectionsRef.current;
            }

            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    sendSignal({
                        type: 'candidate',
                        candidate: event.candidate,
                        target: partnerUsername,
                    });
                }
            };

            pc.ontrack = (event) => handleRemoteStream(partnerUsername, event);

            // 🔥 FIX: Add local tracks FIRST
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach((track) => {
                    pc.addTrack(track, localStreamRef.current);
                });
            }

            // 🔥 Opus codec optimization AFTER tracks are added (getTransceivers() needs tracks)
            try {
                const transceivers = pc.getTransceivers();
                transceivers.forEach((transceiver) => {
                    if (transceiver.sender?.track?.kind === 'audio') {
                        const codecs = RTCRtpSender.getCapabilities('audio')?.codecs || [];
                        // 🔥 Opus codec'i en üste koy (öncelikli)
                        const opusCodecs = codecs.filter((c) =>
                            c.mimeType.toLowerCase().includes('opus')
                        );
                        const otherCodecs = codecs.filter(
                            (c) => !c.mimeType.toLowerCase().includes('opus')
                        );
                        if (
                            transceiver.setCodecPreferences &&
                            [...opusCodecs, ...otherCodecs].length > 0
                        ) {
                            transceiver.setCodecPreferences([...opusCodecs, ...otherCodecs]);
                        }
                    }
                    // 🔥 Audio transceiver direction: sendrecv (çift yönlü)
                    if (
                        transceiver.direction === 'sendonly' &&
                        transceiver.sender?.track?.kind === 'audio'
                    ) {
                        transceiver.direction = 'sendrecv';
                    }
                });
            } catch (e) {
                logger.warn('[Codec] setCodecPreferences not supported:', e.message);
            }

            // 🔥 Audio bitrate'i hemen ayarla (96kbps — SDP optimizasyonuyla tutarlı)
            setAudioBitrate(pc, 96000);

            pc.oniceconnectionstatechange = () => {
                if (pc.iceConnectionState === 'failed') {
                    setIsReconnecting(true);
                    pc.restartIce();
                    setTimeout(() => setIsReconnecting(false), 3000);
                } else if (pc.iceConnectionState === 'disconnected') {
                    setIsReconnecting(true);
                    // 🔥 FIX: Try ICE restart first (transient network blip recovery)
                    // before giving up and closing the PC after 15s.
                    pc.restartIce();
                    setTimeout(() => {
                        if (
                            pc.iceConnectionState === 'disconnected' ||
                            pc.iceConnectionState === 'failed'
                        ) {
                            setRemoteStreams((prev) => {
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
                    }, 15000);
                } else if (pc.iceConnectionState === 'closed') {
                    setRemoteStreams((prev) => {
                        const newStreams = { ...prev };
                        delete newStreams[partnerUsername];
                        return newStreams;
                    });
                    delete peerConnectionsRef.current[partnerUsername];
                    setIsReconnecting(false);
                } else if (pc.iceConnectionState === 'connected') {
                    setIsReconnecting(false);
                    // 🔥 Bağlantı kurulunca hemen audio bitrate optimize et
                    setAudioBitrate(pc, 96000);

                    // 🔥 2s sonra RTT ölç ve bandwidth ayarla
                    setTimeout(async () => {
                        try {
                            const stats = await pc.getStats();
                            let bestRtt = Infinity;
                            let packetLossRate = 0;
                            stats.forEach((report) => {
                                if (
                                    report.type === 'candidate-pair' &&
                                    report.state === 'succeeded'
                                ) {
                                    bestRtt = Math.min(
                                        bestRtt,
                                        (report.currentRoundTripTime || 0) * 1000
                                    );
                                }
                                // 🔥 Paket kaybı oranını hesapla
                                if (report.type === 'inbound-rtp' && report.kind === 'audio') {
                                    const total =
                                        (report.packetsReceived || 0) + (report.packetsLost || 0);
                                    if (total > 0)
                                        packetLossRate = (report.packetsLost || 0) / total;
                                }
                            });

                            // 🔥 RTT + Paket kaybına göre kalite ayarla
                            if (bestRtt > 500 || packetLossRate > 0.1) adjustBandwidth(pc, 'low');
                            else if (bestRtt > 200 || packetLossRate > 0.05)
                                adjustBandwidth(pc, 'medium');
                            else adjustBandwidth(pc, 'high');

                            logger.audio(
                                `[QoS] ${partnerUsername}: RTT=${bestRtt.toFixed(0)}ms, Loss=${(packetLossRate * 100).toFixed(1)}%`
                            );
                        } catch (err) {
                            logger.warn('[Bandwidth] Failed to get stats:', err);
                        }
                    }, 2000);
                }
            };

            return pc;
        },
        [
            sendSignal,
            handleRemoteStream,
            adjustBandwidth,
            peerConnectionsRef,
            localStreamRef,
            setRemoteStreams,
            setIsReconnecting,
        ]
    );

    const processBufferedCandidates = useCallback(async (pc, senderUsername) => {
        if (iceCandidateBufferRef.current[senderUsername]) {
            for (const bufferedCandidate of iceCandidateBufferRef.current[senderUsername]) {
                try {
                    await pc.addIceCandidate(bufferedCandidate);
                } catch (e) {
                    logger.warn(`[Signal] Failed to add buffered candidate:`, e);
                }
            }
            delete iceCandidateBufferRef.current[senderUsername];
        }
    }, []);

    const bufferIceCandidate = useCallback((senderUsername, candidate) => {
        if (!iceCandidateBufferRef.current[senderUsername]) {
            iceCandidateBufferRef.current[senderUsername] = [];
        }
        iceCandidateBufferRef.current[senderUsername].push(new RTCIceCandidate(candidate));
    }, []);

    const addLocalStreamsToPeer = useCallback(
        (pc, partnerUsername) => {
            const existingSenders = pc.getSenders();

            const addTracksFromStream = (stream, label) => {
                if (!stream) return;
                stream.getTracks().forEach((track) => {
                    const trackAlreadyAdded = existingSenders.some(
                        (sender) => sender.track === track
                    );
                    if (!trackAlreadyAdded) {
                        logger.webrtc(`Adding ${label} track to ${partnerUsername}:`, track.kind);
                        pc.addTrack(track, stream);
                    }
                });
            };

            addTracksFromStream(localStreamRef.current, 'audio');
            addTracksFromStream(localCameraStreamRef.current, 'camera');
            addTracksFromStream(localScreenStreamRef.current, 'screen');
        },
        [localStreamRef, localCameraStreamRef, localScreenStreamRef]
    );

    return {
        sendSignal,
        adjustBandwidth,
        handleRemoteStream,
        createPeerConnection,
        processBufferedCandidates,
        bufferIceCandidate,
        addLocalStreamsToPeer,
        iceCandidateBufferRef,
        trackMetadataRef,
    };
}

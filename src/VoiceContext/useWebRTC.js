import { useCallback, useRef } from 'react';
import logger from '../utils/logger';
import { RTC_CONFIGURATION } from './constants';

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

    const sendSignal = useCallback((signal) => {
        if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
            logger.signal(`Sending ${signal.type} to ${signal.receiver_username || 'BROADCAST'}`);
            voiceWsRef.current.send(JSON.stringify({ ...signal, sender_username: username }));
        } else {
            logger.warn("[Signal] WS not ready, cannot send:", signal.type);
        }
    }, [username, voiceWsRef]);

    const adjustBandwidth = useCallback((peerConnection, quality) => {
        try {
            const senders = peerConnection.getSenders();
            const videoSender = senders.find(sender => sender.track?.kind === 'video');
            if (!videoSender) return;

            const parameters = videoSender.getParameters();
            if (!parameters.encodings || parameters.encodings.length === 0) {
                parameters.encodings = [{}];
            }

            const qualitySettings = {
                low: { maxBitrate: 300000, maxFramerate: 15 },
                medium: { maxBitrate: 800000, maxFramerate: 24 },
                high: { maxBitrate: 2500000, maxFramerate: 30 }
            };

            const settings = qualitySettings[quality] || qualitySettings.medium;
            parameters.encodings[0].maxBitrate = settings.maxBitrate;
            parameters.encodings[0].maxFramerate = settings.maxFramerate;

            videoSender.setParameters(parameters).catch(err => {
                console.warn('[Bandwidth] Failed to set parameters:', err);
            });
        } catch (err) {
            console.warn('[Bandwidth] Error adjusting bandwidth:', err);
        }
    }, []);

    const handleRemoteStream = useCallback((partnerUsername, event) => {
        const { track } = event;
        logger.webrtc(`Track Received from ${partnerUsername}:`, track.kind, track.id);

        const trackLabel = (track.label || '').toLowerCase();
        const isScreenTrack =
            trackLabel.includes('screen') ||
            trackLabel.includes('window') ||
            trackLabel.includes('monitor') ||
            trackLabel.includes('display') ||
            trackLabel.includes('tab') ||
            track.contentHint === 'detail';

        const streamKey = track.kind === 'video' && isScreenTrack
            ? `${partnerUsername}_screen`
            : track.kind === 'video'
                ? `${partnerUsername}_camera`
                : partnerUsername;

        setRemoteStreams(prev => {
            const currentStream = prev[streamKey];
            if (currentStream) {
                if (!currentStream.getTracks().some(t => t.id === track.id)) {
                    currentStream.addTrack(track);
                    const refreshedStream = new MediaStream(currentStream.getTracks());
                    return { ...prev, [streamKey]: refreshedStream };
                }
                return prev;
            }
            return { ...prev, [streamKey]: new MediaStream([track]) };
        });

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
                // 🔥 FIX: volume 1.0 explicitly + not muted
                audioEl.volume = 1.0;
                audioEl.muted = false;

                audioEl.style.display = 'none';
                document.body.appendChild(audioEl);

                // 🔥 FIX: More robust autoplay with multiple retry strategies
                const playAudio = () => {
                    if (!audioEl.parentNode) return; // Element was removed
                    audioEl.play().catch(err => {
                        console.warn(`[Audio] Autoplay blocked for ${partnerUsername}:`, err.message);
                        // Strategy 1: Retry on any user interaction
                        const resumeAudio = () => {
                            audioEl.play().catch(() => { });
                        };
                        document.addEventListener('click', resumeAudio, { once: true });
                        document.addEventListener('keydown', resumeAudio, { once: true });
                        document.addEventListener('touchstart', resumeAudio, { once: true });
                        // Strategy 2: Retry after short delay (browser may allow after initial block)
                        setTimeout(() => {
                            audioEl.play().catch(() => { });
                        }, 1000);
                    });
                };
                playAudio();

                // 🔥 FIX: If track ends or is replaced, clean up
                track.onended = () => {
                    const el = document.getElementById(`remote-audio-${partnerUsername}`);
                    if (el) { el.pause(); el.srcObject = null; el.remove(); }
                };
            } catch (err) {
                console.error(`[Audio] Failed to create audio element for ${partnerUsername}:`, err);
            }
        }
    }, [initializeAudio, setRemoteStreams]);

    const createPeerConnection = useCallback((partnerUsername, isInitiator = false) => {
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
                    receiver_username: partnerUsername
                });
            }
        };

        pc.ontrack = (event) => handleRemoteStream(partnerUsername, event);

        // 🔥 FIX: Add local tracks FIRST
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => {
                pc.addTrack(track, localStreamRef.current);
            });
        }

        // 🔥 FIX: Opus codec optimization AFTER tracks are added (getTransceivers() needs tracks)
        try {
            const transceivers = pc.getTransceivers();
            transceivers.forEach(transceiver => {
                if (transceiver.sender?.track?.kind === 'audio') {
                    const codecs = RTCRtpSender.getCapabilities('audio')?.codecs || [];
                    const opusCodecs = codecs.filter(c => c.mimeType.toLowerCase().includes('opus'));
                    const otherCodecs = codecs.filter(c => !c.mimeType.toLowerCase().includes('opus'));
                    if (transceiver.setCodecPreferences && [...opusCodecs, ...otherCodecs].length > 0) {
                        transceiver.setCodecPreferences([...opusCodecs, ...otherCodecs]);
                    }
                }
            });
        } catch (e) {
            console.warn('[Codec] setCodecPreferences not supported:', e.message);
        }

        pc.oniceconnectionstatechange = () => {
            if (pc.iceConnectionState === 'failed') {
                setIsReconnecting(true);
                pc.restartIce();
                setTimeout(() => setIsReconnecting(false), 3000);
            } else if (pc.iceConnectionState === 'disconnected') {
                setIsReconnecting(true);
                setTimeout(() => {
                    if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'failed') {
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
                }, 15000);
            } else if (pc.iceConnectionState === 'closed') {
                setRemoteStreams(prev => {
                    const newStreams = { ...prev };
                    delete newStreams[partnerUsername];
                    return newStreams;
                });
                delete peerConnectionsRef.current[partnerUsername];
                setIsReconnecting(false);
            } else if (pc.iceConnectionState === 'connected') {
                setIsReconnecting(false);
                setTimeout(async () => {
                    try {
                        const stats = await pc.getStats();
                        stats.forEach(report => {
                            if (report.type === 'candidate-pair' && report.state === 'succeeded') {
                                const rtt = report.currentRoundTripTime * 1000;
                                if (rtt > 500) adjustBandwidth(pc, 'low');
                                else if (rtt > 300) adjustBandwidth(pc, 'medium');
                                else adjustBandwidth(pc, 'high');
                            }
                        });
                    } catch (err) {
                        console.warn('[Bandwidth] Failed to get stats:', err);
                    }
                }, 2000);
            }
        };

        return pc;
    }, [sendSignal, handleRemoteStream, adjustBandwidth, peerConnectionsRef, localStreamRef, setRemoteStreams, setIsReconnecting]);

    const processBufferedCandidates = useCallback(async (pc, senderUsername) => {
        if (iceCandidateBufferRef.current[senderUsername]) {
            for (const bufferedCandidate of iceCandidateBufferRef.current[senderUsername]) {
                try {
                    await pc.addIceCandidate(bufferedCandidate);
                } catch (e) {
                    console.warn(`[Signal] Failed to add buffered candidate:`, e);
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

    const addLocalStreamsToPeer = useCallback((pc, partnerUsername) => {
        const existingSenders = pc.getSenders();

        const addTracksFromStream = (stream, label) => {
            if (!stream) return;
            stream.getTracks().forEach(track => {
                const trackAlreadyAdded = existingSenders.some(sender => sender.track === track);
                if (!trackAlreadyAdded) {
                    logger.webrtc(`Adding ${label} track to ${partnerUsername}:`, track.kind);
                    pc.addTrack(track, stream);
                }
            });
        };

        addTracksFromStream(localStreamRef.current, 'audio');
        addTracksFromStream(localCameraStreamRef.current, 'camera');
        addTracksFromStream(localScreenStreamRef.current, 'screen');
    }, [localStreamRef, localCameraStreamRef, localScreenStreamRef]);

    return {
        sendSignal,
        adjustBandwidth,
        handleRemoteStream,
        createPeerConnection,
        processBufferedCandidates,
        bufferIceCandidate,
        addLocalStreamsToPeer,
        iceCandidateBufferRef,
    };
}

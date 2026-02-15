// frontend/src/VoiceContext/useMediaControls.js
// Extracted from VoiceContext.js — toggleVideo, toggleScreenShare, toggleMute, toggleDeafened
import { useCallback, useRef } from 'react';
import toast from '../utils/toast';

export const useMediaControls = ({
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
}) => {
    const cameraToggleLockRef = useRef(false);
    const screenToggleLockRef = useRef(false);

    // --- MUTE ---
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
            return newMuted;
        });
    }, [localStreamRef, voiceWsRef, setIsMuted]);

    // --- DEAFEN ---
    const toggleDeafened = useCallback(() => {
        setIsDeafened(prev => {
            const newDeafened = !prev;
            if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
                voiceWsRef.current.send(JSON.stringify({
                    type: 'deaf_state',
                    is_deafened: newDeafened
                }));
            }
            return newDeafened;
        });
    }, [voiceWsRef, setIsDeafened]);

    // --- CAMERA TOGGLE ---
    const toggleVideo = useCallback(async () => {
        if (cameraToggleLockRef.current) return;
        cameraToggleLockRef.current = true;

        try {
            const currentStream = localCameraStreamRef.current;

            if (currentStream) {
                // Kamerayı KAPAT
                setIsVideoEnabled(false);
                setLocalCameraStream(null);
                localCameraStreamRef.current = null;

                currentStream.getTracks().forEach(track => track.stop());

                const renegotiationPromises = [];
                for (const [username, pc] of Object.entries(peerConnectionsRef.current)) {
                    const senders = pc.getSenders();
                    let trackRemoved = false;

                    for (const sender of senders) {
                        if (sender.track && sender.track.kind === 'video' && sender.track.contentHint !== 'detail') {
                            try { pc.removeTrack(sender); trackRemoved = true; } catch (e) {
                                console.warn(`[Camera] Failed to remove track from ${username}:`, e);
                            }
                        }
                    }

                    if (trackRemoved) {
                        renegotiationPromises.push((async () => {
                            try {
                                const offer = await pc.createOffer();
                                await pc.setLocalDescription(offer);
                                sendSignal({ type: 'offer', sdp: pc.localDescription, target: username });
                            } catch (e) { console.warn(`[Camera] Renegotiation failed with ${username}:`, e); }
                        })());
                    }
                }

                if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
                    voiceWsRef.current.send(JSON.stringify({ type: 'camera_state', is_camera_on: false }));
                    voiceWsRef.current.send(JSON.stringify({ type: 'video_ended', streamType: 'camera' }));
                }

                Promise.all(renegotiationPromises).catch(e => console.warn('[Camera] Some renegotiations failed:', e));

            } else {
                // Kamerayı AÇ
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } }
                });

                if (!cameraToggleLockRef.current) {
                    stream.getTracks().forEach(t => t.stop());
                    return;
                }

                localCameraStreamRef.current = stream;
                setLocalCameraStream(stream);
                setIsVideoEnabled(true);

                const videoTrack = stream.getVideoTracks()[0];

                videoTrack.onended = () => {
                    setLocalCameraStream(null);
                    localCameraStreamRef.current = null;
                    setIsVideoEnabled(false);
                    if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
                        voiceWsRef.current.send(JSON.stringify({ type: 'video_ended', streamType: 'camera' }));
                    }
                };

                try { videoTrack.contentHint = 'motion'; } catch (e) { /* not supported */ }

                const addTrackPromises = [];
                for (const [username, pc] of Object.entries(peerConnectionsRef.current)) {
                    addTrackPromises.push((async () => {
                        try {
                            pc.addTrack(videoTrack, stream);
                            const offer = await pc.createOffer();
                            await pc.setLocalDescription(offer);
                            sendSignal({ type: 'offer', sdp: pc.localDescription, target: username });
                        } catch (e) { console.warn(`[Camera] Failed to add/renegotiate with ${username}:`, e); }
                    })());
                }

                if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
                    voiceWsRef.current.send(JSON.stringify({ type: 'camera_state', is_camera_on: true }));
                }

                Promise.all(addTrackPromises).catch(e => console.warn('[Camera] Some track additions failed:', e));
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
            setTimeout(() => { cameraToggleLockRef.current = false; }, 300);
        }
    }, [sendSignal, localCameraStreamRef, voiceWsRef, peerConnectionsRef, setIsVideoEnabled, setLocalCameraStream]);

    const toggleCamera = toggleVideo;

    // --- SCREEN SHARE TOGGLE ---
    const toggleScreenShare = useCallback(async () => {
        if (screenToggleLockRef.current) return;
        screenToggleLockRef.current = true;

        try {
            const currentStream = localScreenStreamRef.current;

            if (currentStream) {
                // Ekran paylaşımını DURDUR
                setIsScreenSharing(false);
                setLocalScreenStream(null);
                localScreenStreamRef.current = null;

                currentStream.getTracks().forEach(track => track.stop());

                const renegotiationPromises = [];
                for (const [username, pc] of Object.entries(peerConnectionsRef.current)) {
                    const senders = pc.getSenders();
                    let trackRemoved = false;

                    for (const sender of senders) {
                        if (sender.track && sender.track.contentHint === 'detail') {
                            try { pc.removeTrack(sender); trackRemoved = true; } catch (e) {
                                console.warn(`[Screen] Failed to remove track from ${username}:`, e);
                            }
                        }
                    }

                    if (trackRemoved) {
                        renegotiationPromises.push((async () => {
                            try {
                                const offer = await pc.createOffer();
                                await pc.setLocalDescription(offer);
                                sendSignal({ type: 'offer', sdp: pc.localDescription, target: username });
                            } catch (e) { console.warn(`[Screen] Renegotiation failed with ${username}:`, e); }
                        })());
                    }
                }

                if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
                    voiceWsRef.current.send(JSON.stringify({ type: 'screen_share_state', is_sharing: false }));
                    voiceWsRef.current.send(JSON.stringify({ type: 'video_ended', streamType: 'screen' }));
                }

                Promise.all(renegotiationPromises).catch(e => console.warn('[Screen] Some renegotiations failed:', e));

            } else {
                // Ekran paylaşımını BAŞLAT
                const qualityPresets = {
                    '720p': { width: 1280, height: 720 },
                    '1080p': { width: 1920, height: 1080 },
                    '4K': { width: 3840, height: 2160 }
                };
                const quality = qualityPresets[screenShareQuality] || qualityPresets['1080p'];

                const stream = await navigator.mediaDevices.getDisplayMedia({
                    video: {
                        cursor: 'always', displaySurface: 'monitor',
                        width: { ideal: quality.width }, height: { ideal: quality.height },
                        frameRate: { ideal: screenShareFPS }
                    },
                    audio: includeSystemAudio
                });

                if (!screenToggleLockRef.current) {
                    stream.getTracks().forEach(t => t.stop());
                    return;
                }

                stream.getVideoTracks()[0].onended = () => {
                    setLocalScreenStream(null);
                    localScreenStreamRef.current = null;
                    setIsScreenSharing(false);
                    if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
                        voiceWsRef.current.send(JSON.stringify({ type: 'screen_share_state', is_sharing: false }));
                        voiceWsRef.current.send(JSON.stringify({ type: 'video_ended', streamType: 'screen' }));
                    }
                };

                localScreenStreamRef.current = stream;
                setLocalScreenStream(stream);
                setIsScreenSharing(true);

                const screenTrack = stream.getVideoTracks()[0];
                try { screenTrack.contentHint = 'detail'; } catch (e) { /* not supported */ }

                const addTrackPromises = [];
                for (const [username, pc] of Object.entries(peerConnectionsRef.current)) {
                    addTrackPromises.push((async () => {
                        try {
                            pc.addTrack(screenTrack, stream);
                            const offer = await pc.createOffer();
                            await pc.setLocalDescription(offer);
                            sendSignal({ type: 'offer', sdp: pc.localDescription, target: username });
                        } catch (e) { console.error(`[Screen] Failed to add track to ${username}:`, e.message); }
                    })());
                }

                if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
                    voiceWsRef.current.send(JSON.stringify({ type: 'screen_share_state', is_sharing: true }));
                }

                Promise.all(addTrackPromises).catch(e => console.warn('[Screen] Some track additions failed:', e));
            }
        } catch (error) {
            console.error('[Screen] Error:', error);
            if (error.name === 'NotAllowedError') {
                // User cancelled - silently return
            } else if (error.name === 'NotFoundError') {
                toast.warning('Ekran paylaşımı desteklenmiyor.');
            } else {
                toast.error('Ekran paylaşımı başlatılamadı: ' + error.message);
            }
            setIsScreenSharing(false);
            localScreenStreamRef.current = null;
            setLocalScreenStream(null);
        } finally {
            setTimeout(() => { screenToggleLockRef.current = false; }, 300);
        }
    }, [sendSignal, screenShareQuality, screenShareFPS, includeSystemAudio,
        localScreenStreamRef, voiceWsRef, peerConnectionsRef, setIsScreenSharing, setLocalScreenStream]);

    return { toggleMute, toggleDeafened, toggleVideo, toggleCamera, toggleScreenShare };
};

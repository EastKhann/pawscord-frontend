import { useCallback } from 'react';
import logger from '../utils/logger';
import toast from '../utils/toast';

/**
 * WebRTC Signal Message Handler
 * handleSignalMessage: offer, answer, candidate, user_joined, user_left, stream_update,
 * kicked, video_ended, voice_reaction, game_signal, cinema_sync, current_users
 */
export function useSignalHandler({
    username,
    isMuted,
    isVideoEnabled,
    isScreenSharing,
    isTalking,
    // WebRTC hook outputs
    createPeerConnection,
    sendSignal,
    iceCandidateBufferRef,
    addLocalStreamsToPeer,
    // Refs
    peerConnectionsRef,
    localStreamRef,
    localCameraStreamRef,
    localScreenStreamRef,
    joinVoiceRoomRef,
    // State setters
    setRemoteStreams,
    setConnectedUsers,
    setLastReaction,
    setGameState,
    setCinemaState,
    setIsReconnecting,
    // Functions
    leaveVoiceRoomRef,
}) {
    const handleSignalMessage = useCallback(async (data) => {
        // 🧹 KICKED (Inactivity cleanup or mod action)
        if (data.type === 'kicked') {
            console.warn('🔴 [Voice] Kicked from channel:', data.reason, data.message);

            if (data.reason === 'moved' && data.target_channel) {
                toast.info(`🔀 ${data.message || 'Başka kanala taşındınız'}`, 3000);
                if (leaveVoiceRoomRef.current) leaveVoiceRoomRef.current();
                const targetChannel = data.target_channel;
                setTimeout(() => {
                    if (joinVoiceRoomRef.current) {
                        joinVoiceRoomRef.current(targetChannel);
                    }
                }, 800);
            } else {
                toast.warning(`Sesli Kanaldan Çıkarıldınız\n\nNeden: ${data.message}`, 5000);
                if (leaveVoiceRoomRef.current) leaveVoiceRoomRef.current();
            }
            return;
        }

        // 🔥 VIDEO ENDED
        if (data.type === 'video_ended') {
            const senderUsername = data.from || data.username;
            const streamType = data.streamType || 'camera';
            const streamKey = `${senderUsername}_${streamType}`;

            setRemoteStreams(prev => {
                const newStreams = { ...prev };
                if (newStreams[streamKey]) {
                    newStreams[streamKey].getTracks().forEach(t => t.stop());
                    delete newStreams[streamKey];
                }
                return newStreams;
            });
            return;
        }

        // 💬 VOICE REACTION
        if (data.type === 'voice_reaction') {
            const senderUsername = data.from || data.username;
            setLastReaction({
                username: senderUsername,
                emoji: data.emoji,
                timestamp: Date.now()
            });
            setTimeout(() => {
                setLastReaction(prev => {
                    if (prev && prev.timestamp === Date.now()) return null;
                    return prev;
                });
            }, 3000);
            return;
        }

        // 🎮 GAME SIGNAL
        if (data.type === 'game_signal') {
            const senderUsername = data.from || data.username;
            setGameState(prev => {
                const newState = { ...prev };
                if (data.action === 'start') {
                    newState.gameType = data.game_type;
                    newState.players = [senderUsername, data.target].filter(Boolean);
                    newState.moves = {};
                    newState.result = null;
                    newState.currentTurn = senderUsername;
                } else if (data.action === 'move') {
                    newState.moves = { ...prev.moves, [senderUsername]: data.move };
                    if (data.game_type === 'rps' && Object.keys(newState.moves).length === 2) {
                        const [p1, p2] = Object.keys(newState.moves);
                        const m1 = newState.moves[p1];
                        const m2 = newState.moves[p2];
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

        // 🎬 CINEMA SYNC
        if (data.type === 'cinema_sync') {
            const senderUsername = data.from || data.username;
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

        // 🔥 Current users list
        if (data.type === 'current_users') {
            setConnectedUsers(prev => {
                const backendUsers = data.users || [];
                const meInBackendList = backendUsers.some(u => u.username === username);
                const myInfo = prev.find(u => u.username === username);

                let finalList = [...backendUsers];
                if (!meInBackendList && myInfo) {
                    finalList = [myInfo, ...backendUsers];
                } else if (!meInBackendList && username) {
                    finalList = [{
                        username,
                        isMuted,
                        isCameraOn: isVideoEnabled,
                        isScreenSharing,
                        isTalking
                    }, ...backendUsers];
                }
                return finalList;
            });
            return;
        }

        // WebRTC Signaling
        const senderUsername = data.from || data.sender_username || data.username;
        const { type, sdp, candidate } = data;

        if (!senderUsername) {
            console.error('[Signal] No sender username found in message:', data);
            return;
        }
        if (senderUsername === username) return;

        let pc = peerConnectionsRef.current[senderUsername];

        if (!pc) {
            if (type === 'offer') {
                pc = createPeerConnection(senderUsername, false);
            } else if (type === 'user_joined') {
                logger.signal(`${senderUsername} joined, I will create offer`);

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
                addLocalStreamsToPeer(pc, senderUsername);

                try {
                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);
                    sendSignal({
                        type: 'offer',
                        sdp: pc.localDescription,
                        target: senderUsername
                    });
                    logger.signal(`Sent offer to ${senderUsername}`);
                } catch (e) {
                    logger.error("Offer creation failed", e);
                    console.error(`❌ [user_joined] Failed to create/send offer to ${senderUsername}:`, e);
                }
                return;
            } else if (type === 'user_left') {
                setConnectedUsers(prev => prev.filter(u => u.username !== senderUsername));

                const audioEl = document.getElementById(`remote-audio-${senderUsername}`);
                if (audioEl) {
                    audioEl.pause();
                    audioEl.srcObject = null;
                    audioEl.remove();
                }

                setRemoteStreams(prev => {
                    const newStreams = { ...prev };
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

                if (data.enabled && !peerConnectionsRef.current[senderUsername]) {
                    const newPC = createPeerConnection(senderUsername, true);
                    addLocalStreamsToPeer(newPC, senderUsername);

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
            if (type === 'offer') {
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

                // Process buffered ICE candidates
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
            } else if (type === 'answer') {
                if (pc.signalingState !== 'have-local-offer') {
                    console.warn(`[WebRTC] Error handling answer from ${senderUsername}: InvalidStateError: Failed to execute 'setRemoteDescription' on 'RTCPeerConnection': Failed to set remote answer sdp: Called in wrong state: ${pc.signalingState}`);
                    return;
                }

                await pc.setRemoteDescription(new RTCSessionDescription(sdp));

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
            } else if (type === 'candidate') {
                if (pc.remoteDescription) {
                    await pc.addIceCandidate(new RTCIceCandidate(candidate));
                } else {
                    if (!iceCandidateBufferRef.current[senderUsername]) {
                        iceCandidateBufferRef.current[senderUsername] = [];
                    }
                    iceCandidateBufferRef.current[senderUsername].push(new RTCIceCandidate(candidate));
                }
            }
        } catch (e) {
            console.error(`[WebRTC] Error handling ${type} from ${senderUsername}:`, e);
        }
    }, [username, createPeerConnection, sendSignal, addLocalStreamsToPeer,
        iceCandidateBufferRef, peerConnectionsRef, localStreamRef,
        localCameraStreamRef, localScreenStreamRef, joinVoiceRoomRef,
        leaveVoiceRoomRef, setRemoteStreams, setConnectedUsers,
        setLastReaction, setGameState, setCinemaState, setIsReconnecting,
        isMuted, isVideoEnabled, isScreenSharing, isTalking]);

    return { handleSignalMessage };
}

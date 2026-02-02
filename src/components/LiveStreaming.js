// frontend/src/components/LiveStreaming.js
// 📡 Live Streaming Component (Twitch-like)

import React, { useState, useEffect, useRef } from 'react';
import toast from '../utils/toast';
import './LiveStreaming.css';

const LiveStreaming = ({ roomId }) => {
    const [isStreaming, setIsStreaming] = useState(false);
    const [viewers, setViewers] = useState(0);
    const [chatMessages, setChatMessages] = useState([]);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const peerConnectionsRef = useRef({});

    // WebRTC configuration
    const rtcConfig = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
        ],
    };

    const startStreaming = async () => {
        try {
            // Get screen + audio stream
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: 'always',
                    displaySurface: 'monitor',
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                },
            });

            // Get microphone stream
            const audioStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

            // Combine streams
            const combinedStream = new MediaStream([
                ...screenStream.getVideoTracks(),
                ...audioStream.getAudioTracks(),
            ]);

            streamRef.current = combinedStream;
            videoRef.current.srcObject = combinedStream;

            // Notify server about stream start
            socket.emit('start_stream', {
                room_id: roomId,
                stream_title: 'Live Stream',
            });

            setIsStreaming(true);

            // Handle stream end
            screenStream.getVideoTracks()[0].onended = () => {
                stopStreaming();
            };
        } catch (error) {
            console.error('Failed to start streaming:', error);
            toast.error('❌ Could not start streaming. Check permissions.');
        }
    };

    const stopStreaming = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        // Close all peer connections
        Object.values(peerConnectionsRef.current).forEach(pc => pc.close());
        peerConnectionsRef.current = {};

        socket.emit('stop_stream', { room_id: roomId });
        setIsStreaming(false);
    };

    const createPeerConnection = async (viewerId) => {
        const pc = new RTCPeerConnection(rtcConfig);

        // Add stream tracks to peer connection
        streamRef.current.getTracks().forEach(track => {
            pc.addTrack(track, streamRef.current);
        });

        // Handle ICE candidates
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice_candidate', {
                    viewer_id: viewerId,
                    candidate: event.candidate,
                });
            }
        };

        peerConnectionsRef.current[viewerId] = pc;
        return pc;
    };

    useEffect(() => {
        // WebSocket event listeners
        socket.on('viewer_joined', async ({ viewer_id }) => {
            const pc = await createPeerConnection(viewer_id);
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            socket.emit('stream_offer', {
                viewer_id,
                offer,
            });

            setViewers(prev => prev + 1);
        });

        socket.on('viewer_left', ({ viewer_id }) => {
            if (peerConnectionsRef.current[viewer_id]) {
                peerConnectionsRef.current[viewer_id].close();
                delete peerConnectionsRef.current[viewer_id];
            }
            setViewers(prev => Math.max(0, prev - 1));
        });

        socket.on('stream_answer', async ({ viewer_id, answer }) => {
            const pc = peerConnectionsRef.current[viewer_id];
            if (pc) {
                await pc.setRemoteDescription(new RTCSessionDescription(answer));
            }
        });

        socket.on('ice_candidate', async ({ viewer_id, candidate }) => {
            const pc = peerConnectionsRef.current[viewer_id];
            if (pc) {
                await pc.addIceCandidate(new RTCIceCandidate(candidate));
            }
        });

        return () => {
            stopStreaming();
        };
    }, [roomId]);

    return (
        <div className="live-streaming">
            <div className="stream-header">
                <h2>📡 Live Streaming</h2>
                <div className="stream-stats">
                    {isStreaming && (
                        <>
                            <span className="live-badge">🔴 LIVE</span>
                            <span className="viewer-count">👁️ {viewers} viewers</span>
                        </>
                    )}
                </div>
            </div>

            <div className="stream-container">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="stream-video"
                />

                {!isStreaming ? (
                    <div className="stream-overlay">
                        <button onClick={startStreaming} className="btn-start-stream">
                            🎬 Start Streaming
                        </button>
                        <p>Share your screen with voice chat members</p>
                    </div>
                ) : (
                    <div className="stream-controls">
                        <button onClick={stopStreaming} className="btn-stop-stream">
                            ⏹️ Stop Stream
                        </button>
                    </div>
                )}
            </div>

            <StreamChat messages={chatMessages} />
        </div>
    );
};

const StreamChat = ({ messages }) => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('stream_chat', { message });
            setMessage('');
        }
    };

    return (
        <div className="stream-chat">
            <div className="chat-messages">
                {messages.map((msg, i) => (
                    <div key={i} className="chat-message">
                        <strong>{msg.username}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Send a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default LiveStreaming;



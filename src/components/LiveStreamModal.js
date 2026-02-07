// frontend/src/components/LiveStreamModal.js
import React, { useState, useRef, useEffect } from 'react';
import toast from '../utils/toast';
import { FaTimes, FaVideo, FaStop, FaMicrophone, FaMicrophoneSlash, FaDesktop, FaUsers, FaEye } from 'react-icons/fa';

const LiveStreamModal = ({ onClose, roomSlug, ws, token, isMobile }) => {
    const [isStreaming, setIsStreaming] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [streamType, setStreamType] = useState('camera'); // 'camera' or 'screen'
    const [viewers, setViewers] = useState(0);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');

    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const peerConnectionsRef = useRef({});

    // WebRTC Configuration
    const rtcConfig = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
        ]
    };

    useEffect(() => {
        if (!ws.current) return;

        const handleMessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === 'stream_viewer_count') {
                    setViewers(data.count);
                }
                else if (data.type === 'stream_chat') {
                    setChatMessages(prev => [...prev, {
                        id: Date.now(),
                        user: data.username,
                        message: data.message,
                        timestamp: new Date().toLocaleTimeString()
                    }]);
                }
                else if (data.type === 'stream_viewer_join') {
                    // Handle new viewer joining
                    createPeerConnection(data.viewerId);
                }
            } catch (e) {
                console.error('Stream WS error:', e);
            }
        };

        ws.current.addEventListener('message', handleMessage);
        return () => ws.current?.removeEventListener('message', handleMessage);
    }, [ws]);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Start streaming
    const startStream = async () => {
        try {
            let stream;

            if (streamType === 'camera') {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        frameRate: { ideal: 30 }
                    },
                    audio: true
                });
            } else {
                stream = await navigator.mediaDevices.getDisplayMedia({
                    video: {
                        width: { ideal: 1920 },
                        height: { ideal: 1080 },
                        frameRate: { ideal: 30 }
                    },
                    audio: true
                });
            }

            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            setIsStreaming(true);

            // Notify server about stream start
            if (ws.current?.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify({
                    type: 'stream_start',
                    room_slug: roomSlug,
                    stream_type: streamType
                }));
            }

        } catch (error) {
            console.error('Failed to start stream:', error);
            toast.error('❌ Failed to start stream. Please check permissions.');
        }
    };

    // Stop streaming
    const stopStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        // Close all peer connections
        Object.values(peerConnectionsRef.current).forEach(pc => pc.close());
        peerConnectionsRef.current = {};

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        setIsStreaming(false);

        // Notify server
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({
                type: 'stream_stop',
                room_slug: roomSlug
            }));
        }
    };

    // Toggle mute
    const toggleMute = () => {
        if (streamRef.current) {
            streamRef.current.getAudioTracks().forEach(track => {
                track.enabled = isMuted;
            });
            setIsMuted(!isMuted);
        }
    };

    // Send chat message
    const sendChatMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({
                type: 'stream_chat',
                room_slug: roomSlug,
                message: chatInput
            }));
        }

        setChatInput('');
    };

    // Create peer connection for viewer
    const createPeerConnection = async (viewerId) => {
        if (!streamRef.current) return;

        const pc = new RTCPeerConnection(rtcConfig);
        peerConnectionsRef.current[viewerId] = pc;

        // Add stream tracks to peer connection
        streamRef.current.getTracks().forEach(track => {
            pc.addTrack(track, streamRef.current);
        });

        // Handle ICE candidates
        pc.onicecandidate = (event) => {
            if (event.candidate && ws.current?.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify({
                    type: 'ice_candidate',
                    candidate: event.candidate,
                    viewer_id: viewerId
                }));
            }
        };

        // Create and send offer
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({
                type: 'stream_offer',
                sdp: pc.localDescription,
                viewer_id: viewerId
            }));
        }
    };

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '0' : '20px',
        },
        modal: {
            width: '100%',
            maxWidth: isMobile ? '100%' : '1400px',
            height: isMobile ? '100%' : 'auto',
            maxHeight: '90vh',
            background: 'linear-gradient(135deg, rgba(30, 31, 34, 0.98), rgba(35, 36, 40, 0.98))',
            borderRadius: isMobile ? '0' : '16px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(218, 55, 60, 0.3)',
            border: isMobile ? 'none' : '1px solid rgba(218, 55, 60, 0.4)',
        },
        header: {
            padding: isMobile ? '12px 16px' : '16px 24px',
            background: 'linear-gradient(135deg, rgba(218, 55, 60, 0.15), rgba(240, 71, 71, 0.15))',
            borderBottom: '1px solid rgba(218, 55, 60, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        title: {
            fontSize: isMobile ? '18px' : '22px',
            fontWeight: '700',
            color: 'rgba(255, 255, 255, 0.95)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        liveIndicator: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            background: 'rgba(218, 55, 60, 0.3)',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#da373c',
            border: '1px solid rgba(218, 55, 60, 0.5)',
        },
        liveD: {
            width: '8px',
            height: '8px',
            background: '#da373c',
            borderRadius: '50%',
            animation: 'pulse 1.5s ease-in-out infinite',
        },
        closeBtn: {
            background: 'rgba(218, 55, 60, 0.2)',
            border: '1px solid rgba(218, 55, 60, 0.4)',
            borderRadius: '8px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#da373c',
            fontSize: '18px',
        },
        content: {
            flex: 1,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            overflow: 'hidden',
        },
        streamSection: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            background: '#000',
            position: 'relative',
        },
        videoContainer: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
            position: 'relative',
        },
        video: {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
        },
        placeholder: {
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.5)',
        },
        viewerCount: {
            position: 'absolute',
            top: '16px',
            right: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            color: 'white',
        },
        controls: {
            padding: '16px',
            background: 'rgba(0, 0, 0, 0.8)',
            borderTop: '1px solid rgba(218, 55, 60, 0.2)',
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
        controlBtn: (active) => ({
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            minHeight: '44px',
            background: active ? 'rgba(218, 55, 60, 0.3)' : 'rgba(88, 101, 242, 0.2)',
            color: active ? '#da373c' : 'rgba(255, 255, 255, 0.9)',
            border: `1px solid ${active ? 'rgba(218, 55, 60, 0.5)' : 'rgba(88, 101, 242, 0.4)'}`,
        }),
        startBtn: {
            padding: '12px 32px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #da373c, #f04747)',
            color: 'white',
            transition: 'all 0.2s ease',
            minHeight: '48px',
        },
        chatSection: {
            width: isMobile ? '100%' : '350px',
            maxHeight: isMobile ? '300px' : 'auto',
            background: 'rgba(0, 0, 0, 0.3)',
            borderLeft: isMobile ? 'none' : '1px solid rgba(218, 55, 60, 0.2)',
            display: 'flex',
            flexDirection: 'column',
        },
        chatHeader: {
            padding: '16px',
            borderBottom: '1px solid rgba(218, 55, 60, 0.2)',
            fontSize: '16px',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.9)',
        },
        chatMessages: {
            flex: 1,
            overflowY: 'auto',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        },
        chatMessage: {
            padding: '8px 12px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '8px',
            fontSize: '14px',
        },
        chatUsername: {
            fontWeight: '600',
            color: '#5865f2',
            marginBottom: '4px',
        },
        chatText: {
            color: 'rgba(255, 255, 255, 0.8)',
        },
        chatInput: {
            padding: '12px',
            borderTop: '1px solid rgba(218, 55, 60, 0.2)',
            display: 'flex',
            gap: '8px',
        },
        input: {
            flex: 1,
            padding: '12px',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(218, 55, 60, 0.3)',
            borderRadius: '8px',
            color: 'rgba(255, 255, 255, 0.95)',
            fontSize: '14px',
            outline: 'none',
        },
        sendBtn: {
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #da373c, #f04747)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            minHeight: '44px',
        },
    };

    return (
        <>
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>

            <div style={styles.overlay} onClick={onClose}>
                <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div style={styles.header}>
                        <h2 style={styles.title}>
                            <FaVideo />
                            Live Stream
                            {isStreaming && (
                                <span style={styles.liveIndicator}>
                                    <span style={styles.liveDot} />
                                    LIVE
                                </span>
                            )}
                        </h2>
                        <button onClick={onClose} style={styles.closeBtn}>
                            <FaTimes />
                        </button>
                    </div>

                    {/* Content */}
                    <div style={styles.content}>
                        {/* Stream Section */}
                        <div style={styles.streamSection}>
                            <div style={styles.videoContainer}>
                                {isStreaming ? (
                                    <>
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            muted
                                            style={styles.video}
                                        />
                                        <div style={styles.viewerCount}>
                                            <FaEye />
                                            {viewers} viewers
                                        </div>
                                    </>
                                ) : (
                                    <div style={styles.placeholder}>
                                        <FaVideo size={64} />
                                        <p style={{ marginTop: '16px', fontSize: '18px' }}>
                                            Click "Start Stream" to begin
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Controls */}
                            <div style={styles.controls}>
                                {!isStreaming ? (
                                    <>
                                        <button
                                            onClick={() => setStreamType('camera')}
                                            style={styles.controlBtn(streamType === 'camera')}
                                        >
                                            <FaVideo />
                                            Camera
                                        </button>
                                        <button
                                            onClick={() => setStreamType('screen')}
                                            style={styles.controlBtn(streamType === 'screen')}
                                        >
                                            <FaDesktop />
                                            Screen
                                        </button>
                                        <button onClick={startStream} style={styles.startBtn}>
                                            <FaVideo />
                                            Start Stream
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={toggleMute}
                                            style={styles.controlBtn(isMuted)}
                                        >
                                            {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                                            {isMuted ? 'Unmute' : 'Mute'}
                                        </button>
                                        <button
                                            onClick={stopStream}
                                            style={{ ...styles.startBtn, background: 'linear-gradient(135deg, #da373c, #b83030)' }}
                                        >
                                            <FaStop />
                                            Stop Stream
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Chat Section */}
                        {isStreaming && (
                            <div style={styles.chatSection}>
                                <div style={styles.chatHeader}>
                                    <FaUsers /> Stream Chat
                                </div>

                                <div style={styles.chatMessages}>
                                    {chatMessages.map(msg => (
                                        <div key={msg.id} style={styles.chatMessage}>
                                            <div style={styles.chatUsername}>
                                                {msg.user}
                                            </div>
                                            <div style={styles.chatText}>
                                                {msg.message}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={sendChatMessage} style={styles.chatInput}>
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Send a message..."
                                        style={styles.input}
                                    />
                                    <button type="submit" style={styles.sendBtn}>
                                        Send
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LiveStreamModal;



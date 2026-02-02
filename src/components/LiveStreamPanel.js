// frontend/src/components/LiveStreamPanel.js
export default LiveStreamPanel;

};
    }
        cursor: 'pointer'
        borderRadius: '4px',
        padding: '8px 16px',
        border: 'none',
        color: '#ffffff',
        backgroundColor: '#5865f2',
    sendButton: {
    },
        outline: 'none'
        borderRadius: '4px',
        padding: '8px 12px',
        color: '#dcddde',
        border: 'none',
        backgroundColor: '#202225',
        flex: 1,
    input: {
    },
        gap: '8px'
        display: 'flex',
    chatInput: {
    },
        color: '#dcddde'
    chatText: {
    },
        marginRight: '4px'
        color: '#5865f2',
        fontWeight: 'bold',
    chatAuthor: {
    },
        fontSize: '14px'
        color: '#dcddde',
        marginBottom: '8px',
    chatMessage: {
    },
        marginBottom: '12px'
        overflowY: 'auto',
        flex: 1,
    chatMessages: {
    },
        fontWeight: 'bold'
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: '#5865f2',
        borderRadius: '50%',
        height: '32px',
        width: '32px',
    viewerAvatar: {
    },
        color: '#dcddde'
        padding: '8px 0',
        gap: '8px',
        alignItems: 'center',
        display: 'flex',
    viewer: {
    },
        overflowY: 'auto'
        flex: 1,
    viewersList: {
    },
        fontWeight: 'bold'
        marginBottom: '12px',
        color: '#ffffff',
        gap: '8px',
        alignItems: 'center',
        display: 'flex',
    sectionHeader: {
    },
        flexDirection: 'column'
        display: 'flex',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#36393f',
        flex: 1,
    chatSection: {
    },
        flexDirection: 'column'
        display: 'flex',
        maxHeight: '250px',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#36393f',
    viewersSection: {
    },
        gap: '16px'
        flexDirection: 'column',
        display: 'flex',
        width: '300px',
    sidebar: {
    },
        fontWeight: 'bold'
        cursor: 'pointer',
        borderRadius: '4px',
        padding: '10px 24px',
        border: 'none',
        color: '#ffffff',
        backgroundColor: '#ed4245',
    stopButton: {
    },
        fontWeight: 'bold'
        cursor: 'pointer',
        borderRadius: '4px',
        padding: '10px 24px',
        border: 'none',
        color: '#ffffff',
        backgroundColor: '#3ba55d',
    startButton: {
    },
        cursor: 'pointer'
        borderRadius: '4px',
        padding: '8px 12px',
        color: '#dcddde',
        border: 'none',
        backgroundColor: '#202225',
    qualitySelect: {
    },
        cursor: 'pointer'
        color: '#dcddde',
        gap: '8px',
        alignItems: 'center',
        display: 'flex',
    settingLabel: {
    },
        flex: 1
        gap: '16px',
        display: 'flex',
    settingsGroup: {
    },
        flexWrap: 'wrap'
        alignItems: 'center',
        gap: '16px',
        display: 'flex',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#36393f',
    controls: {
    },
        color: '#b9bbbe'
        textAlign: 'center',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '50%',
        position: 'absolute',
    noStream: {
    },
        objectFit: 'contain'
        height: '100%',
        width: '100%',
    video: {
    },
        overflow: 'hidden'
        position: 'relative',
        borderRadius: '8px',
        backgroundColor: '#000000',
        flex: 1,
    videoContainer: {
    },
        gap: '16px'
        flexDirection: 'column',
        display: 'flex',
        flex: 1,
    mainArea: {
    },
        overflow: 'hidden'
        padding: '16px',
        gap: '16px',
        display: 'flex',
        flex: 1,
    content: {
    },
        padding: '8px'
        cursor: 'pointer',
        color: '#b9bbbe',
        border: 'none',
        background: 'none',
    closeButton: {
    },
        animation: 'pulse 2s infinite'
        fontWeight: 'bold',
        fontSize: '12px',
        borderRadius: '12px',
        padding: '4px 12px',
        color: '#ffffff',
        backgroundColor: '#ed4245',
    liveBadge: {
    },
        color: '#ffffff'
        fontSize: '18px',
        margin: 0,
    title: {
    },
        gap: '12px'
        alignItems: 'center',
        display: 'flex',
    headerLeft: {
    },
        borderBottom: '1px solid #202225'
        padding: '16px 20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
    header: {
    },
        flexDirection: 'column'
        display: 'flex',
        height: '90vh',
        maxWidth: '1400px',
        width: '95%',
        borderRadius: '8px',
        backgroundColor: '#2f3136',
    panel: {
    },
        zIndex: 10000
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        position: 'fixed',
    overlay: {
const styles = {

};
    );
        </div>
            </div>
                </div>
                    </div>
                        </div>
                            </div>
                                </button>
                                    Gönder
                                <button onClick={sendChatMessage} style={styles.sendButton}>
                                />
                                    style={styles.input}
                                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    value={messageInput}
                                    placeholder="Mesaj yaz..."
                                    type="text"
                                <input
                            <div style={styles.chatInput}>
                            </div>
                                ))}
                                    </div>
                                        <span style={styles.chatText}>{msg.text}</span>
                                        <span style={styles.chatAuthor}>{msg.author}:</span>
                                    <div key={idx} style={styles.chatMessage}>
                                {chatMessages.map((msg, idx) => (
                            <div style={styles.chatMessages}>
                            </div>
                                <span>Sohbet</span>
                                <FaComments size={16} />
                            <div style={styles.sectionHeader}>
                        <div style={styles.chatSection}>
                        {/* Chat */}

                        </div>
                            </div>
                                ))}
                                    </div>
                                        <span>{viewer.name}</span>
                                        <div style={styles.viewerAvatar}>{viewer.name[0]}</div>
                                    <div key={viewer.id} style={styles.viewer}>
                                {viewers.map(viewer => (
                            <div style={styles.viewersList}>
                            </div>
                                <span>İzleyiciler ({viewers.length})</span>
                                <FaUsers size={16} />
                            <div style={styles.sectionHeader}>
                        <div style={styles.viewersSection}>
                        {/* Viewers */}
                    <div style={styles.sidebar}>
                    {/* Sidebar */}

                    </div>
                        </div>
                            )}
                                </button>
                                    Yayını Durdur
                                <button onClick={stopStream} style={styles.stopButton}>
                            ) : (
                                </>
                                    </button>
                                        Yayını Başlat
                                    <button onClick={startStream} style={styles.startButton}>

                                    </select>
                                        <option value="1080p">1080p Full HD</option>
                                        <option value="720p">720p HD</option>
                                        <option value="480p">480p</option>
                                    >
                                        style={styles.qualitySelect}
                                        })}
                                            quality: e.target.value
                                            ...streamSettings,
                                        onChange={(e) => setStreamSettings({
                                        value={streamSettings.quality}
                                    <select

                                    </div>
                                        </label>
                                            <span>Ekran Paylaşımı</span>
                                            <FaDesktop size={14} />
                                            />
                                                })}
                                                    screenShare: e.target.checked
                                                    ...streamSettings,
                                                onChange={(e) => setStreamSettings({
                                                checked={streamSettings.screenShare}
                                                type="checkbox"
                                            <input
                                        <label style={styles.settingLabel}>
                                        </label>
                                            <span>Mikrofon</span>
                                            <FaMicrophone size={14} />
                                            />
                                                })}
                                                    microphone: e.target.checked
                                                    ...streamSettings,
                                                onChange={(e) => setStreamSettings({
                                                checked={streamSettings.microphone}
                                                type="checkbox"
                                            <input
                                        <label style={styles.settingLabel}>
                                        </label>
                                            <span>Kamera</span>
                                            <FaVideo size={14} />
                                            />
                                                })}
                                                    camera: e.target.checked
                                                    ...streamSettings,
                                                onChange={(e) => setStreamSettings({
                                                checked={streamSettings.camera}
                                                type="checkbox"
                                            <input
                                        <label style={styles.settingLabel}>
                                    <div style={styles.settingsGroup}>
                                <>
                            {!isStreaming ? (
                        <div style={styles.controls}>
                        {/* Stream Controls */}

                        </div>
                            )}
                                </div>
                                    <p>Yayın başlatılmadı</p>
                                    <FaVideo size={48} color="#4e5058" />
                                <div style={styles.noStream}>
                            {!isStreaming && (
                            />
                                style={styles.video}
                                muted
                                autoPlay
                                ref={videoRef}
                            <video
                        <div style={styles.videoContainer}>
                        {/* Stream Preview */}
                    <div style={styles.mainArea}>
                <div style={styles.content}>

                </div>
                    </button>
                        <FaTimes size={20} />
                    }} style={styles.closeButton}>
                        onClose();
                        if (isStreaming) stopStream();
                    <button onClick={() => {
                    </div>
                        {isStreaming && <span style={styles.liveBadge}>🔴 CANLI</span>}
                        <h2 style={styles.title}>Canlı Yayın</h2>
                        <FaVideo size={20} color="#ed4245" />
                    <div style={styles.headerLeft}>
                <div style={styles.header}>
            <div style={styles.panel}>
        <div style={styles.overlay}>
    return (

    };
        setMessageInput('');

        }));
            message: messageInput
            channel_id: channelId,
            type: 'stream_chat_message',
        ws.send(JSON.stringify({

        if (!messageInput.trim()) return;
    const sendChatMessage = () => {

    };
        }
            await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        if (pc) {
        const pc = peerConnections.current[data.viewer_id];
    const handleICECandidate = async (data) => {

    };
        }
            await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
        if (pc) {
        const pc = peerConnections.current[data.viewer_id];
    const handleWebRTCAnswer = async (data) => {

    };
        }));
            answer: answer
            viewer_id: data.viewer_id,
            type: 'stream_webrtc_answer',
        ws.send(JSON.stringify({

        await pc.setLocalDescription(answer);
        const answer = await pc.createAnswer();
        await pc.setRemoteDescription(new RTCSessionDescription(data.offer));

        };
            }
                }));
                    candidate: event.candidate
                    viewer_id: data.viewer_id,
                    type: 'stream_ice_candidate',
                ws.send(JSON.stringify({
            if (event.candidate) {
        pc.onicecandidate = (event) => {
        // Handle ICE candidates

        });
            pc.addTrack(track, streamRef.current);
        streamRef.current.getTracks().forEach(track => {
        // Add stream tracks

        peerConnections.current[data.viewer_id] = pc;

        });
            ]
                { urls: 'stun:stun1.l.google.com:19302' }
                { urls: 'stun:stun.l.google.com:19302' },
            iceServers: [
        const pc = new RTCPeerConnection({
    const handleWebRTCOffer = async (data) => {

    };
        setViewers([]);
        setIsStreaming(false);

        }));
            channel_id: channelId
            type: 'stop_stream',
        ws.send(JSON.stringify({

        peerConnections.current = {};
        Object.values(peerConnections.current).forEach(pc => pc.close());
        // Close all peer connections

        }
            videoRef.current.srcObject = null;
        if (videoRef.current) {

        }
            streamRef.current = null;
            streamRef.current.getTracks().forEach(track => track.stop());
        if (streamRef.current) {
    const stopStream = () => {

    };
        }
            alert('Yayın başlatılamadı: ' + error.message);
            console.error('Stream start error:', error);
        } catch (error) {
            setIsStreaming(true);

            }));
                settings: streamSettings
                channel_id: channelId,
                type: 'start_stream',
            ws.send(JSON.stringify({
            // Notify server

            }
                videoRef.current.srcObject = streamRef.current;
            if (videoRef.current) {

            }
                streamRef.current = stream;
            } else {
                streamRef.current = screenStream;
                stream.getTracks().forEach(track => screenStream.addTrack(track));
                });
                    audio: true
                    video: true,
                const screenStream = await navigator.mediaDevices.getDisplayMedia({
            if (streamSettings.screenShare) {

            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            };
                audio: streamSettings.microphone
                } : false,
                    height: { ideal: streamSettings.quality === '1080p' ? 1080 : 720 }
                    width: { ideal: streamSettings.quality === '1080p' ? 1920 : 1280 },
                video: streamSettings.camera ? {
            const constraints = {
        try {
    const startStream = async () => {

    };
        }
                break;
                handleICECandidate(data);
            case 'stream_ice_candidate':
                break;
                handleWebRTCAnswer(data);
            case 'stream_webrtc_answer':
                break;
                handleWebRTCOffer(data);
            case 'stream_webrtc_offer':
                break;
                setChatMessages(prev => [...prev, data.message]);
            case 'stream_chat_message':
                break;
                setViewers(prev => prev.filter(v => v.id !== data.viewer_id));
            case 'stream_viewer_left':
                break;
                setViewers(prev => [...prev, data.viewer]);
            case 'stream_viewer_joined':
        switch (data.type) {

        const data = JSON.parse(event.data);
    const handleWebSocketMessage = (event) => {

    }, [ws]);
        }
            return () => ws.removeEventListener('message', handleWebSocketMessage);
            ws.addEventListener('message', handleWebSocketMessage);
        if (ws) {
    useEffect(() => {

    const peerConnections = useRef({});
    const streamRef = useRef(null);
    const videoRef = useRef(null);

    const [messageInput, setMessageInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    });
        screenShare: false
        microphone: true,
        camera: true,
        quality: '720p',
    const [streamSettings, setStreamSettings] = useState({
    const [viewers, setViewers] = useState([]);
    const [isStreaming, setIsStreaming] = useState(false);
const LiveStreamPanel = ({ onClose, currentUser, ws, channelId, fetchWithAuth, apiBaseUrl }) => {

import { FaVideo, FaTimes, FaMicrophone, FaDesktop, FaUsers, FaComments } from 'react-icons/fa';
import React, { useState, useEffect, useRef } from 'react';




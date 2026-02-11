// 🎬 Watch Party Enhanced - Gelişmiş izleme partisi özelliği
import { useState, useEffect, useRef, useCallback } from 'react';
import { FaPlay, FaPause, FaExpand, FaCompress, FaVolumeUp, FaVolumeMute, FaUsers, FaSync, FaCog, FaTimes, FaForward, FaBackward } from 'react-icons/fa';

const WatchPartyEnhanced = ({
    roomId,
    currentUser,
    websocket,
    onClose,
    initialVideoUrl = '',
    participants = []
}) => {
    const videoRef = useRef(null);
    const [videoUrl, setVideoUrl] = useState(initialVideoUrl);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isHost, setIsHost] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [quality, setQuality] = useState('auto');
    const [showSettings, setShowSettings] = useState(false);
    const [syncStatus, setSyncStatus] = useState('synced'); // 'synced', 'syncing', 'desynced'
    const [reactions, setReactions] = useState({});
    const chatRef = useRef(null);

    // 🎥 Video event handlers
    const handlePlay = useCallback(() => {
        if (!videoRef.current) return;
        videoRef.current.play();
        setIsPlaying(true);

        // Host ise tüm katılımcılara gönder
        if (isHost && websocket) {
            websocket.send(JSON.stringify({
                type: 'watch_party_control',
                action: 'play',
                roomId,
                currentTime: videoRef.current.currentTime,
                sender: currentUser
            }));
        }
    }, [isHost, websocket, roomId, currentUser]);

    const handlePause = useCallback(() => {
        if (!videoRef.current) return;
        videoRef.current.pause();
        setIsPlaying(false);

        if (isHost && websocket) {
            websocket.send(JSON.stringify({
                type: 'watch_party_control',
                action: 'pause',
                roomId,
                currentTime: videoRef.current.currentTime,
                sender: currentUser
            }));
        }
    }, [isHost, websocket, roomId, currentUser]);

    const handleSeek = useCallback((time) => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = time;
        setCurrentTime(time);

        if (isHost && websocket) {
            websocket.send(JSON.stringify({
                type: 'watch_party_control',
                action: 'seek',
                roomId,
                currentTime: time,
                sender: currentUser
            }));
        }
    }, [isHost, websocket, roomId, currentUser]);

    const handleSkip = useCallback((seconds) => {
        if (!videoRef.current) return;
        const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
        handleSeek(newTime);
    }, [currentTime, duration, handleSeek]);

    const handleVolumeChange = useCallback((newVolume) => {
        if (!videoRef.current) return;
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    }, []);

    const toggleMute = useCallback(() => {
        if (!videoRef.current) return;
        const newMuted = !isMuted;
        videoRef.current.muted = newMuted;
        setIsMuted(newMuted);
        if (newMuted) {
            setVolume(0);
        } else {
            setVolume(videoRef.current.volume || 0.5);
        }
    }, [isMuted]);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            videoRef.current?.requestFullscreen?.();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen?.();
            setIsFullscreen(false);
        }
    }, []);

    const handlePlaybackRateChange = useCallback((rate) => {
        if (!videoRef.current) return;
        videoRef.current.playbackRate = rate;
        setPlaybackRate(rate);

        if (isHost && websocket) {
            websocket.send(JSON.stringify({
                type: 'watch_party_control',
                action: 'playback_rate',
                roomId,
                playbackRate: rate,
                sender: currentUser
            }));
        }
    }, [isHost, websocket, roomId, currentUser]);

    // 💬 Chat functionality
    const sendChatMessage = useCallback(() => {
        if (!newMessage.trim() || !websocket) return;

        const message = {
            type: 'watch_party_chat',
            roomId,
            sender: currentUser,
            message: newMessage,
            timestamp: Date.now()
        };

        websocket.send(JSON.stringify(message));
        setChatMessages(prev => [...prev, { ...message, isOwn: true }]);
        setNewMessage('');

        // Auto scroll
        setTimeout(() => {
            if (chatRef.current) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }
        }, 100);
    }, [newMessage, websocket, roomId, currentUser]);

    // 🎭 Quick reactions
    const sendReaction = useCallback((emoji) => {
        if (!websocket) return;

        websocket.send(JSON.stringify({
            type: 'watch_party_reaction',
            roomId,
            sender: currentUser,
            emoji,
            timestamp: Date.now()
        }));

        // Show reaction locally
        setReactions(prev => ({
            ...prev,
            [currentUser]: { emoji, timestamp: Date.now() }
        }));

        // Clear after 3 seconds
        setTimeout(() => {
            setReactions(prev => {
                const newReactions = { ...prev };
                delete newReactions[currentUser];
                return newReactions;
            });
        }, 3000);
    }, [websocket, roomId, currentUser]);

    // 🔄 Sync functionality
    const requestSync = useCallback(() => {
        if (!websocket) return;
        setSyncStatus('syncing');

        websocket.send(JSON.stringify({
            type: 'watch_party_sync_request',
            roomId,
            sender: currentUser
        }));
    }, [websocket, roomId, currentUser]);

    // 📡 WebSocket message handler
    useEffect(() => {
        if (!websocket) return;

        const handleMessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === 'watch_party_control' && data.sender !== currentUser) {
                    switch (data.action) {
                        case 'play':
                            videoRef.current.currentTime = data.currentTime;
                            videoRef.current.play();
                            setIsPlaying(true);
                            break;
                        case 'pause':
                            videoRef.current.currentTime = data.currentTime;
                            videoRef.current.pause();
                            setIsPlaying(false);
                            break;
                        case 'seek':
                            videoRef.current.currentTime = data.currentTime;
                            setCurrentTime(data.currentTime);
                            break;
                        case 'playback_rate':
                            videoRef.current.playbackRate = data.playbackRate;
                            setPlaybackRate(data.playbackRate);
                            break;
                    }
                    setSyncStatus('synced');
                }

                if (data.type === 'watch_party_chat' && data.sender !== currentUser) {
                    setChatMessages(prev => [...prev, { ...data, isOwn: false }]);
                    if (chatRef.current) {
                        chatRef.current.scrollTop = chatRef.current.scrollHeight;
                    }
                }

                if (data.type === 'watch_party_reaction' && data.sender !== currentUser) {
                    setReactions(prev => ({
                        ...prev,
                        [data.sender]: { emoji: data.emoji, timestamp: data.timestamp }
                    }));

                    setTimeout(() => {
                        setReactions(prev => {
                            const newReactions = { ...prev };
                            delete newReactions[data.sender];
                            return newReactions;
                        });
                    }, 3000);
                }

                if (data.type === 'watch_party_sync_response' && data.sender !== currentUser) {
                    videoRef.current.currentTime = data.currentTime;
                    if (data.isPlaying) {
                        videoRef.current.play();
                        setIsPlaying(true);
                    } else {
                        videoRef.current.pause();
                        setIsPlaying(false);
                    }
                    setSyncStatus('synced');
                }
            } catch (error) {
                console.error('Watch Party WS error:', error);
            }
        };

        websocket.addEventListener('message', handleMessage);
        return () => websocket.removeEventListener('message', handleMessage);
    }, [websocket, currentUser]);

    // ⏱️ Video progress tracking
    useEffect(() => {
        if (!videoRef.current) return;

        const interval = setInterval(() => {
            if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
                setDuration(videoRef.current.duration || 0);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    // Format time helper
    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaUsers size={18} color="#5865f2" />
                    <span style={styles.title}>Watch Party</span>
                    <span style={styles.participantCount}>{participants.length} watching</span>
                </div>
                <button onClick={onClose} style={styles.closeButton}>
                    <FaTimes size={20} />
                </button>
            </div>

            <div style={styles.mainContent}>
                {/* Video Player */}
                <div style={styles.videoSection}>
                    <div style={styles.videoContainer}>
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            style={styles.video}
                            onLoadedMetadata={() => setDuration(videoRef.current.duration)}
                        />

                        {/* Reactions Overlay */}
                        <div style={styles.reactionsOverlay}>
                            {Object.entries(reactions).map(([user, { emoji }]) => (
                                <div key={user} style={styles.reaction}>
                                    <span style={styles.reactionEmoji}>{emoji}</span>
                                    <span style={styles.reactionUser}>{user}</span>
                                </div>
                            ))}
                        </div>

                        {/* Controls Overlay */}
                        <div style={styles.controlsOverlay}>
                            {/* Progress Bar */}
                            <div style={styles.progressBarContainer}>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 100}
                                    value={currentTime}
                                    onChange={(e) => handleSeek(parseFloat(e.target.value))}
                                    style={styles.progressBar}
                                    disabled={!isHost}
                                />
                                <div style={styles.timeDisplay}>
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Control Buttons */}
                            <div style={styles.controls}>
                                <div style={styles.controlsLeft}>
                                    {isHost && (
                                        <>
                                            <button onClick={() => handleSkip(-10)} style={styles.controlButton}>
                                                <FaBackward size={16} />
                                            </button>
                                            <button
                                                onClick={isPlaying ? handlePause : handlePlay}
                                                style={styles.controlButton}
                                            >
                                                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                                            </button>
                                            <button onClick={() => handleSkip(10)} style={styles.controlButton}>
                                                <FaForward size={16} />
                                            </button>
                                        </>
                                    )}

                                    <button onClick={toggleMute} style={styles.controlButton}>
                                        {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                                    </button>

                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={volume}
                                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                                        style={styles.volumeSlider}
                                    />
                                </div>

                                <div style={styles.controlsRight}>
                                    {!isHost && (
                                        <button onClick={requestSync} style={styles.syncButton}>
                                            <FaSync size={16} />
                                            <span>Sync</span>
                                        </button>
                                    )}

                                    <button onClick={() => setShowSettings(!showSettings)} style={styles.controlButton}>
                                        <FaCog size={18} />
                                    </button>

                                    <button onClick={toggleFullscreen} style={styles.controlButton}>
                                        {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Reactions */}
                    <div style={styles.quickReactions}>
                        {['😂', '❤️', '👍', '🔥', '😮', '😢'].map(emoji => (
                            <button
                                key={emoji}
                                onClick={() => sendReaction(emoji)}
                                style={styles.reactionButton}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Sidebar */}
                <div style={styles.chatSection}>
                    <div style={styles.chatHeader}>
                        <span>Live Chat</span>
                    </div>

                    <div ref={chatRef} style={styles.chatMessages}>
                        {chatMessages.map((msg, i) => (
                            <div key={i} style={msg.isOwn ? styles.ownMessage : styles.otherMessage}>
                                <span style={styles.messageSender}>{msg.sender}:</span>
                                <span style={styles.messageText}>{msg.message}</span>
                            </div>
                        ))}
                    </div>

                    <div style={styles.chatInput}>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                            placeholder="Type a message..."
                            style={styles.chatInputField}
                        />
                        <button onClick={sendChatMessage} style={styles.sendButton}>
                            Send
                        </button>
                    </div>
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div style={styles.settingsPanel}>
                    <h3 style={styles.settingsTitle}>Settings</h3>

                    <div style={styles.settingItem}>
                        <label>Playback Speed</label>
                        <select
                            value={playbackRate}
                            onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
                            style={styles.select}
                            disabled={!isHost}
                        >
                            <option value="0.5">0.5x</option>
                            <option value="0.75">0.75x</option>
                            <option value="1">1x</option>
                            <option value="1.25">1.25x</option>
                            <option value="1.5">1.5x</option>
                            <option value="2">2x</option>
                        </select>
                    </div>

                    <div style={styles.settingItem}>
                        <label>Quality</label>
                        <select
                            value={quality}
                            onChange={(e) => setQuality(e.target.value)}
                            style={styles.select}
                        >
                            <option value="auto">Auto</option>
                            <option value="1080p">1080p</option>
                            <option value="720p">720p</option>
                            <option value="480p">480p</option>
                            <option value="360p">360p</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

// 🎨 Styles
const styles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#1e1f22',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        backgroundColor: '#2b2d31',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#ffffff'
    },
    participantCount: {
        fontSize: '13px',
        color: '#b9bbbe',
        backgroundColor: 'rgba(88, 101, 242, 0.15)',
        padding: '4px 8px',
        borderRadius: '12px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '4px',
        transition: 'all 0.2s'
    },
    mainContent: {
        display: 'flex',
        flex: 1,
        overflow: 'hidden'
    },
    videoSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#000'
    },
    videoContainer: {
        position: 'relative',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    video: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    reactionsOverlay: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none'
    },
    reaction: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '8px 12px',
        borderRadius: '20px',
        animation: 'slideIn 0.3s ease-out'
    },
    reactionEmoji: {
        fontSize: '24px'
    },
    reactionUser: {
        color: '#fff',
        fontSize: '12px'
    },
    controlsOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
        padding: '20px',
        opacity: 1,
        transition: 'opacity 0.3s'
    },
    progressBarContainer: {
        marginBottom: '16px'
    },
    progressBar: {
        width: '100%',
        height: '4px',
        borderRadius: '2px',
        appearance: 'none',
        backgroundColor: 'rgba(255,255,255,0.2)',
        outline: 'none',
        cursor: 'pointer'
    },
    timeDisplay: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '8px',
        fontSize: '12px',
        color: '#fff'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    controlsLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    controlsRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    controlButton: {
        background: 'none',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '4px',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    syncButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(88, 101, 242, 0.8)',
        border: 'none',
        color: '#fff',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '500'
    },
    volumeSlider: {
        width: '80px',
        height: '4px'
    },
    quickReactions: {
        display: 'flex',
        gap: '8px',
        padding: '12px 20px',
        backgroundColor: '#2b2d31',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        justifyContent: 'center'
    },
    reactionButton: {
        background: 'rgba(255,255,255,0.05)',
        border: 'none',
        fontSize: '24px',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    chatSection: {
        width: '350px',
        backgroundColor: '#2b2d31',
        borderLeft: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column'
    },
    chatHeader: {
        padding: '16px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        fontWeight: 'bold',
        color: '#fff'
    },
    chatMessages: {
        flex: 1,
        overflowY: 'auto',
        padding: '12px'
    },
    ownMessage: {
        backgroundColor: 'rgba(88, 101, 242, 0.15)',
        padding: '8px 12px',
        borderRadius: '8px',
        marginBottom: '8px',
        wordWrap: 'break-word'
    },
    otherMessage: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: '8px 12px',
        borderRadius: '8px',
        marginBottom: '8px',
        wordWrap: 'break-word'
    },
    messageSender: {
        fontWeight: 'bold',
        color: '#5865f2',
        marginRight: '6px',
        fontSize: '13px'
    },
    messageText: {
        color: '#dcddde',
        fontSize: '13px'
    },
    chatInput: {
        display: 'flex',
        gap: '8px',
        padding: '12px',
        borderTop: '1px solid rgba(255,255,255,0.1)'
    },
    chatInputField: {
        flex: 1,
        backgroundColor: '#383a40',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 12px',
        color: '#fff',
        fontSize: '14px',
        outline: 'none'
    },
    sendButton: {
        backgroundColor: '#5865f2',
        border: 'none',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '14px'
    },
    settingsPanel: {
        position: 'absolute',
        bottom: '80px',
        right: '20px',
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        padding: '16px',
        minWidth: '200px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
    },
    settingsTitle: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '12px'
    },
    settingItem: {
        marginBottom: '12px'
    },
    select: {
        width: '100%',
        backgroundColor: '#383a40',
        border: 'none',
        color: '#fff',
        padding: '8px',
        borderRadius: '4px',
        fontSize: '13px',
        marginTop: '4px'
    }
};

export default WatchPartyEnhanced;



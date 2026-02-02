// frontend/src/EnhancedCinemaModal.js
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
const ReactPlayer = lazy(() => import('react-player'));
import { FaTimes, FaLink, FaPlay, FaPause, FaStepForward, FaStepBackward, FaListUl, FaHeart, FaFire, FaLaugh, FaSadTear, FaVolumeUp, FaExpand } from 'react-icons/fa';

const EnhancedCinemaModal = ({ onClose, ws, isMobile }) => {
    // Player state
    const [currentVideo, setCurrentVideo] = useState('https://www.youtube.com/watch?v=jfKfPfyJRdk');
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isReady, setIsReady] = useState(false);

    // Playlist state
    const [playlist, setPlaylist] = useState([
        { id: 1, url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk', title: 'lofi hip hop radio 📚' },
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [inputUrl, setInputUrl] = useState('');

    // Reactions
    const [reactions, setReactions] = useState({});
    const [recentReactions, setRecentReactions] = useState([]);

    const playerRef = useRef(null);
    const isRemoteUpdate = useRef(false);

    // Get current time safely
    const getCurrentTimeSafe = () => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
            try {
                return playerRef.current.getCurrentTime();
            } catch (e) {
                return 0;
            }
        }
        return 0;
    };

    // WebSocket message handler
    useEffect(() => {
        if (!ws.current) return;

        const handleMessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === 'media_sync') {
                    isRemoteUpdate.current = true;

                    switch (data.action) {
                        case 'change_url':
                            setCurrentVideo(data.payload.url);
                            setPlaying(false);
                            setIsReady(false);
                            break;
                        case 'play':
                            const currentTime = getCurrentTimeSafe();
                            if (Math.abs(currentTime - data.payload.time) > 2) {
                                playerRef.current?.seekTo(data.payload.time);
                            }
                            setPlaying(true);
                            break;
                        case 'pause':
                            setPlaying(false);
                            break;
                        case 'seek':
                            playerRef.current?.seekTo(data.payload.time);
                            break;
                        case 'playlist_update':
                            setPlaylist(data.payload.playlist);
                            break;
                        case 'reaction':
                            addReaction(data.payload.emoji, data.payload.username);
                            break;
                        default:
                            break;
                    }

                    setTimeout(() => { isRemoteUpdate.current = false; }, 1000);
                }
            } catch (e) {
                console.error('WS Error:', e);
            }
        };

        ws.current.addEventListener('message', handleMessage);
        return () => ws.current?.removeEventListener('message', handleMessage);
    }, [ws]);

    // Send WebSocket signal
    const sendSignal = (action, payload = {}) => {
        if (isRemoteUpdate.current) return;
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ type: 'media_sync', action, payload }));
        }
    };

    // Add video to playlist
    const handleAddToPlaylist = (e) => {
        e.preventDefault();
        if (!inputUrl.trim()) return;

        const newVideo = {
            id: Date.now(),
            url: inputUrl.trim(),
            title: `Video ${playlist.length + 1}`,
        };

        const newPlaylist = [...playlist, newVideo];
        setPlaylist(newPlaylist);
        sendSignal('playlist_update', { playlist: newPlaylist });
        setInputUrl('');
    };

    // Play video from playlist
    const playVideo = (index) => {
        if (index >= 0 && index < playlist.length) {
            setCurrentIndex(index);
            setCurrentVideo(playlist[index].url);
            setPlaying(true);
            setIsReady(false);
            sendSignal('change_url', { url: playlist[index].url });
        }
    };

    // Next video
    const nextVideo = () => {
        const nextIndex = (currentIndex + 1) % playlist.length;
        playVideo(nextIndex);
    };

    // Previous video
    const previousVideo = () => {
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        playVideo(prevIndex);
    };

    // Remove from playlist
    const removeFromPlaylist = (index) => {
        const newPlaylist = playlist.filter((_, i) => i !== index);
        setPlaylist(newPlaylist);
        sendSignal('playlist_update', { playlist: newPlaylist });

        if (index === currentIndex && newPlaylist.length > 0) {
            playVideo(0);
        }
    };

    // Add reaction
    const addReaction = (emoji, username = 'You') => {
        const reactionId = Date.now() + Math.random();
        const newReaction = { id: reactionId, emoji, username, x: Math.random() * 80 + 10 };

        setRecentReactions(prev => [...prev, newReaction]);
        setReactions(prev => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }));

        setTimeout(() => {
            setRecentReactions(prev => prev.filter(r => r.id !== reactionId));
        }, 3000);
    };

    // Send reaction
    const sendReaction = (emoji) => {
        addReaction(emoji);
        sendSignal('reaction', { emoji, username: 'User' });
    };

    // Format time
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: isMobile ? '0' : '20px',
        },
        modal: {
            width: '100%',
            maxWidth: isMobile ? '100%' : '1200px',
            height: isMobile ? '100%' : 'auto',
            maxHeight: '90vh',
            background: 'linear-gradient(135deg, rgba(30, 31, 34, 0.98), rgba(35, 36, 40, 0.98))',
            borderRadius: isMobile ? '0' : '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(88, 101, 242, 0.3)',
            border: isMobile ? 'none' : '1px solid rgba(88, 101, 242, 0.4)',
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            padding: isMobile ? '12px' : '16px 20px',
            background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.15), rgba(114, 137, 218, 0.15))',
            borderBottom: '1px solid rgba(88, 101, 242, 0.3)',
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
            transition: 'all 0.2s ease',
        },
        content: {
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flex: 1,
            overflow: 'hidden',
        },
        playerSection: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
        },
        playerWrapper: {
            position: 'relative',
            paddingTop: '56.25%',
            background: '#000',
            overflow: 'hidden',
        },
        reactionsOverlay: {
            position: 'absolute',
            bottom: '80px',
            left: 0,
            right: 0,
            pointerEvents: 'none',
            zIndex: 10,
        },
        reaction: (x) => ({
            position: 'absolute',
            left: `${x}%`,
            bottom: 0,
            fontSize: '40px',
            animation: 'floatUp 3s ease-out forwards',
            textShadow: '0 0 10px rgba(0, 0, 0, 0.8)',
        }),
        controls: {
            padding: isMobile ? '12px' : '16px 20px',
            background: 'rgba(0, 0, 0, 0.4)',
            borderTop: '1px solid rgba(88, 101, 242, 0.2)',
        },
        controlsTop: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px',
        },
        controlBtn: {
            background: 'rgba(88, 101, 242, 0.2)',
            border: '1px solid rgba(88, 101, 242, 0.4)',
            borderRadius: '8px',
            width: isMobile ? '40px' : '44px',
            height: isMobile ? '40px' : '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.2s ease',
            fontSize: isMobile ? '16px' : '18px',
        },
        progressBar: {
            width: '100%',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '3px',
            cursor: 'pointer',
            marginBottom: '12px',
            position: 'relative',
        },
        progressFill: (percent) => ({
            height: '100%',
            width: `${percent}%`,
            background: 'linear-gradient(90deg, #5865f2, #7289da)',
            borderRadius: '3px',
            transition: 'width 0.1s linear',
        }),
        timeDisplay: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: isMobile ? '12px' : '13px',
            marginLeft: '8px',
        },
        reactionBar: {
            display: 'flex',
            gap: '8px',
            marginTop: '12px',
            flexWrap: 'wrap',
        },
        reactionBtn: {
            background: 'rgba(88, 101, 242, 0.1)',
            border: '1px solid rgba(88, 101, 242, 0.3)',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '20px',
            transition: 'all 0.2s ease',
            minWidth: '44px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        sidebar: {
            width: isMobile ? '100%' : '320px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderLeft: isMobile ? 'none' : '1px solid rgba(88, 101, 242, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: isMobile ? '40vh' : 'auto',
        },
        sidebarHeader: {
            padding: '16px',
            borderBottom: '1px solid rgba(88, 101, 242, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        playlistContainer: {
            flex: 1,
            overflowY: 'auto',
            padding: '12px',
        },
        playlistItem: (isActive) => ({
            padding: '12px',
            background: isActive ? 'rgba(88, 101, 242, 0.3)' : 'rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            marginBottom: '8px',
            cursor: 'pointer',
            border: `1px solid ${isActive ? 'rgba(88, 101, 242, 0.6)' : 'rgba(88, 101, 242, 0.2)'}`,
            transition: 'all 0.2s ease',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '44px',
        }),
        addForm: {
            padding: '12px',
            borderTop: '1px solid rgba(88, 101, 242, 0.2)',
            display: 'flex',
            gap: '8px',
        },
        input: {
            flex: 1,
            padding: '12px',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(88, 101, 242, 0.3)',
            borderRadius: '8px',
            color: 'rgba(255, 255, 255, 0.95)',
            fontSize: '14px',
            outline: 'none',
        },
        addBtn: {
            padding: '0 20px',
            background: 'linear-gradient(135deg, #5865f2, #7289da)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px',
            minWidth: '44px',
            minHeight: '44px',
        },
    };

    return (
        <>
            <style>{`
                @keyframes floatUp {
                    0% { transform: translateY(0) scale(1); opacity: 1; }
                    100% { transform: translateY(-200px) scale(1.5); opacity: 0; }
                }
            `}</style>

            <div style={styles.overlay} onClick={onClose}>
                <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div style={styles.header}>
                        <h2 style={styles.title}>
                            <span>🍿</span>
                            Enhanced Cinema
                        </h2>
                        <button onClick={onClose} style={styles.closeBtn}>
                            <FaTimes />
                        </button>
                    </div>

                    {/* Main Content */}
                    <div style={styles.content}>
                        {/* Player Section */}
                        <div style={styles.playerSection}>
                            <div style={styles.playerWrapper}>
                                <Suspense fallback={<div style={{ color: '#fff', textAlign: 'center', paddingTop: '100px' }}>Loading player...</div>}>
                                    <ReactPlayer
                                        ref={playerRef}
                                        url={currentVideo}
                                        playing={playing}
                                        volume={volume}
                                        width="100%"
                                        height="100%"
                                        style={{ position: 'absolute', top: 0, left: 0 }}
                                        onReady={() => setIsReady(true)}
                                        onPlay={() => sendSignal('play', { time: getCurrentTimeSafe() })}
                                        onPause={() => sendSignal('pause')}
                                        onProgress={(state) => {
                                            setProgress(state.played * 100);
                                            setDuration(state.loadedSeconds);
                                        }}
                                        onEnded={nextVideo}
                                    />
                                </Suspense>

                                {/* Floating Reactions */}
                                <div style={styles.reactionsOverlay}>
                                    {recentReactions.map(r => (
                                        <div key={r.id} style={styles.reaction(r.x)}>
                                            {r.emoji}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Controls */}
                            <div style={styles.controls}>
                                {/* Progress Bar */}
                                <div
                                    style={styles.progressBar}
                                    onClick={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const percent = (e.clientX - rect.left) / rect.width;
                                        const time = percent * duration;
                                        playerRef.current?.seekTo(percent);
                                        sendSignal('seek', { time });
                                    }}
                                >
                                    <div style={styles.progressFill(progress)} />
                                </div>

                                {/* Playback Controls */}
                                <div style={styles.controlsTop}>
                                    <button onClick={previousVideo} style={styles.controlBtn}>
                                        <FaStepBackward />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setPlaying(!playing);
                                            sendSignal(playing ? 'pause' : 'play', { time: getCurrentTimeSafe() });
                                        }}
                                        style={{ ...styles.controlBtn, width: isMobile ? '50px' : '56px', height: isMobile ? '50px' : '56px' }}
                                    >
                                        {playing ? <FaPause /> : <FaPlay />}
                                    </button>
                                    <button onClick={nextVideo} style={styles.controlBtn}>
                                        <FaStepForward />
                                    </button>
                                    <button
                                        onClick={() => setShowPlaylist(!showPlaylist)}
                                        style={{ ...styles.controlBtn, marginLeft: 'auto' }}
                                    >
                                        <FaListUl />
                                    </button>
                                    <span style={styles.timeDisplay}>
                                        {formatTime(duration * progress / 100)} / {formatTime(duration)}
                                    </span>
                                </div>

                                {/* Reaction Bar */}
                                <div style={styles.reactionBar}>
                                    {['❤️', '🔥', '😂', '😢', '👍'].map(emoji => (
                                        <button
                                            key={emoji}
                                            onClick={() => sendReaction(emoji)}
                                            style={styles.reactionBtn}
                                        >
                                            {emoji}
                                            {reactions[emoji] && (
                                                <span style={{ fontSize: '12px', marginLeft: '4px' }}>
                                                    {reactions[emoji]}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Playlist Sidebar */}
                        {(showPlaylist || !isMobile) && (
                            <div style={styles.sidebar}>
                                <div style={styles.sidebarHeader}>
                                    <h3 style={{ margin: 0, fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)' }}>
                                        Playlist ({playlist.length})
                                    </h3>
                                </div>

                                <div style={styles.playlistContainer}>
                                    {playlist.map((video, index) => (
                                        <div
                                            key={video.id}
                                            style={styles.playlistItem(index === currentIndex)}
                                            onClick={() => playVideo(index)}
                                        >
                                            <div>
                                                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '4px' }}>
                                                    {video.title}
                                                </div>
                                                <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {video.url}
                                                </div>
                                            </div>
                                            {playlist.length > 1 && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFromPlaylist(index);
                                                    }}
                                                    style={{
                                                        background: 'rgba(218, 55, 60, 0.2)',
                                                        border: '1px solid rgba(218, 55, 60, 0.4)',
                                                        borderRadius: '6px',
                                                        padding: '6px 10px',
                                                        color: '#da373c',
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                    }}
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={handleAddToPlaylist} style={styles.addForm}>
                                    <input
                                        type="text"
                                        value={inputUrl}
                                        onChange={(e) => setInputUrl(e.target.value)}
                                        placeholder="Add video URL..."
                                        style={styles.input}
                                    />
                                    <button type="submit" style={styles.addBtn}>
                                        +
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

export default EnhancedCinemaModal;



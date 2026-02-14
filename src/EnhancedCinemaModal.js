// frontend/src/EnhancedCinemaModal.js
import { lazy, Suspense } from 'react';
const ReactPlayer = lazy(() => import('react-player'));
import { FaTimes, FaPlay, FaPause, FaStepForward, FaStepBackward, FaListUl } from 'react-icons/fa';
import { getStyles } from './EnhancedCinemaModal/enhancedCinemaStyles';
import useEnhancedCinema from './EnhancedCinemaModal/useEnhancedCinema';

const EnhancedCinemaModal = ({ onClose, ws, isMobile }) => {
    const {
        currentVideo,
        playing, setPlaying,
        volume,
        progress, setProgress,
        duration, setDuration,
        isReady, setIsReady,
        playlist,
        currentIndex,
        showPlaylist, setShowPlaylist,
        inputUrl, setInputUrl,
        reactions,
        recentReactions,
        playerRef,
        getCurrentTimeSafe,
        sendSignal,
        handleAddToPlaylist,
        playVideo,
        nextVideo,
        previousVideo,
        removeFromPlaylist,
        sendReaction,
        formatTime
    } = useEnhancedCinema(ws);

    const styles = getStyles(isMobile);

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
                    <div style={styles.header}>
                        <h2 style={styles.title}>
                            <span>🍿</span>
                            Enhanced Cinema
                        </h2>
                        <button onClick={onClose} style={styles.closeBtn}>
                            <FaTimes />
                        </button>
                    </div>

                    <div style={styles.content}>
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

                                <div style={styles.reactionsOverlay}>
                                    {recentReactions.map(r => (
                                        <div key={r.id} style={styles.reaction(r.x)}>
                                            {r.emoji}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={styles.controls}>
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

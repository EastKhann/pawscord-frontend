// frontend/src/components/WatchPartyEnhanced.js
import { FaPlay, FaPause, FaExpand, FaCompress, FaVolumeUp, FaVolumeMute, FaUsers, FaSync, FaCog, FaTimes, FaForward, FaBackward } from 'react-icons/fa';
import styles from './WatchPartyEnhanced/styles';
import useWatchParty from './WatchPartyEnhanced/hooks/useWatchParty';

const QUICK_EMOJIS = ['\uD83D\uDE02', '\u2764\uFE0F', '\uD83D\uDC4D', '\uD83D\uDD25', '\uD83D\uDE2E', '\uD83D\uDE22'];

const WatchPartyEnhanced = ({ roomId, currentUser, websocket, onClose, initialVideoUrl = '', participants = [] }) => {
    const {
        videoRef, chatRef, videoUrl, isPlaying, currentTime, duration,
        volume, isMuted, isFullscreen, playbackRate, isHost, chatMessages,
        newMessage, setNewMessage, quality, setQuality, showSettings, setShowSettings,
        reactions, formatTime,
        handlePlay, handlePause, handleSeek, handleSkip,
        handleVolumeChange, toggleMute, toggleFullscreen,
        handlePlaybackRateChange, sendChatMessage, sendReaction, requestSync
    } = useWatchParty({ roomId, currentUser, websocket, initialVideoUrl });

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaUsers size={18} color="#5865f2" />
                    <span style={styles.title}>Watch Party</span>
                    <span style={styles.participantCount}>{participants.length} watching</span>
                </div>
                <button onClick={onClose} style={styles.closeButton}><FaTimes size={20} /></button>
            </div>

            <div style={styles.mainContent}>
                <div style={styles.videoSection}>
                    <div style={styles.videoContainer}>
                        <video ref={videoRef} src={videoUrl} style={styles.video}
                            onLoadedMetadata={() => videoRef.current && (undefined, undefined)} />

                        <div style={styles.reactionsOverlay}>
                            {Object.entries(reactions).map(([user, { emoji }]) => (
                                <div key={user} style={styles.reaction}>
                                    <span style={styles.reactionEmoji}>{emoji}</span>
                                    <span style={styles.reactionUser}>{user}</span>
                                </div>
                            ))}
                        </div>

                        <div style={styles.controlsOverlay}>
                            <div style={styles.progressBarContainer}>
                                <input type="range" min="0" max={duration || 100} value={currentTime}
                                    onChange={e => handleSeek(parseFloat(e.target.value))}
                                    style={styles.progressBar} disabled={!isHost} />
                                <div style={styles.timeDisplay}>
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>
                            <div style={styles.controls}>
                                <div style={styles.controlsLeft}>
                                    {isHost && (<>
                                        <button onClick={() => handleSkip(-10)} style={styles.controlButton}><FaBackward size={16} /></button>
                                        <button onClick={isPlaying ? handlePause : handlePlay} style={styles.controlButton}>
                                            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                                        </button>
                                        <button onClick={() => handleSkip(10)} style={styles.controlButton}><FaForward size={16} /></button>
                                    </>)}
                                    <button onClick={toggleMute} style={styles.controlButton}>
                                        {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                                    </button>
                                    <input type="range" min="0" max="1" step="0.1" value={volume}
                                        onChange={e => handleVolumeChange(parseFloat(e.target.value))} style={styles.volumeSlider} />
                                </div>
                                <div style={styles.controlsRight}>
                                    {!isHost && (
                                        <button onClick={requestSync} style={styles.syncButton}><FaSync size={16} /><span>Sync</span></button>
                                    )}
                                    <button onClick={() => setShowSettings(!showSettings)} style={styles.controlButton}><FaCog size={18} /></button>
                                    <button onClick={toggleFullscreen} style={styles.controlButton}>
                                        {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.quickReactions}>
                        {QUICK_EMOJIS.map(emoji => (
                            <button key={emoji} onClick={() => sendReaction(emoji)} style={styles.reactionButton}>{emoji}</button>
                        ))}
                    </div>
                </div>

                <div style={styles.chatSection}>
                    <div style={styles.chatHeader}><span>Live Chat</span></div>
                    <div ref={chatRef} style={styles.chatMessages}>
                        {chatMessages.map((msg, i) => (
                            <div key={i} style={msg.isOwn ? styles.ownMessage : styles.otherMessage}>
                                <span style={styles.messageSender}>{msg.sender}:</span>
                                <span style={styles.messageText}>{msg.message}</span>
                            </div>
                        ))}
                    </div>
                    <div style={styles.chatInput}>
                        <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && sendChatMessage()}
                            placeholder="Type a message..." style={styles.chatInputField} />
                        <button onClick={sendChatMessage} style={styles.sendButton}>Send</button>
                    </div>
                </div>
            </div>

            {showSettings && (
                <div style={styles.settingsPanel}>
                    <h3 style={styles.settingsTitle}>Settings</h3>
                    <div style={styles.settingItem}>
                        <label>Playback Speed</label>
                        <select value={playbackRate} onChange={e => handlePlaybackRateChange(parseFloat(e.target.value))}
                            style={styles.select} disabled={!isHost}>
                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map(r => <option key={r} value={r}>{r}x</option>)}
                        </select>
                    </div>
                    <div style={styles.settingItem}>
                        <label>Quality</label>
                        <select value={quality} onChange={e => setQuality(e.target.value)} style={styles.select}>
                            {['auto', '1080p', '720p', '480p', '360p'].map(q => <option key={q} value={q}>{q === 'auto' ? 'Auto' : q}</option>)}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WatchPartyEnhanced;
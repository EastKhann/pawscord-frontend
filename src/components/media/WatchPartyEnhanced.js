/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/WatchPartyEnhanced.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    FaPlay,
    FaPause,
    FaExpand,
    FaCompress,
    FaVolumeUp,
    FaVolumeMute,
    FaUsers,
    FaSync,
    FaCog,
    FaTimes,
    FaForward,
    FaBackward,
} from 'react-icons/fa';
import styles from '../WatchPartyEnhanced/styles';
import useWatchParty from '../WatchPartyEnhanced/hooks/useWatchParty';

import { useTranslation } from 'react-i18next';
const QUICK_EMOJIS = ['😂', '❤️', '👍', '🔥', '😮', '😢'];

const WatchPartyEnhanced = ({
    roomId,
    currentUser,
    websocket,
    onClose,
    initialVideoUrl = '',
    participants = [],
}) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {
        videoRef,
        chatRef,
        videoUrl,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isFullscreen,
        playbackRate,
        isHost,
        chatMessages,
        newMessage,
        setNewMessage,
        quality,
        setQuality,
        showSettings,
        setShowSettings,
        reactions,
        formatTime,
        handlePlay,
        handlePause,
        handleSeek,
        handleSkip,
        handleVolumeChange,
        toggleMute,
        toggleFullscreen,
        handlePlaybackRateChange,
        sendChatMessage,
        sendReaction,
        requestSync,
    } = useWatchParty({ roomId, currentUser, websocket, initialVideoUrl });

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaUsers size={18} color="#5865f2" />
                    <span style={styles.title}>İzleme Partisi</span>
                    <span style={styles.participantCount}>{participants.length} watching</span>
                </div>
                <button aria-label="on Close" onClick={onClose} style={styles.closeButton}>
                    <FaTimes size={20} />
                </button>
            </div>

            <div style={styles.mainContent}>
                <div style={styles.videoSection}>
                    <div style={styles.videoContainer}>
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            style={styles.video}
                            onLoadedMetadata={() => videoRef.current && (undefined, undefined)}
                        >
                            <track kind="captions" />
                        </video>

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
                            <div style={styles.controls}>
                                <div style={styles.controlsLeft}>
                                    {isHost && (
                                        <>
                                            <button
                                                aria-label="Action button"
                                                onClick={() => handleSkip(-10)}
                                                style={styles.controlButton}
                                            >
                                                <FaBackward size={16} />
                                            </button>
                                            <button
                                                aria-label="is Playing handle Pause handle Play"
                                                onClick={isPlaying ? handlePause : handlePlay}
                                                style={styles.controlButton}
                                            >
                                                {isPlaying ? (
                                                    <FaPause size={20} />
                                                ) : (
                                                    <FaPlay size={20} />
                                                )}
                                            </button>
                                            <button
                                                aria-label="Action button"
                                                onClick={() => handleSkip(10)}
                                                style={styles.controlButton}
                                            >
                                                <FaForward size={16} />
                                            </button>
                                        </>
                                    )}
                                    <button
                                        aria-label="toggle Mute"
                                        onClick={toggleMute}
                                        style={styles.controlButton}
                                    >
                                        {isMuted ? (
                                            <FaVolumeMute size={18} />
                                        ) : (
                                            <FaVolumeUp size={18} />
                                        )}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={volume}
                                        onChange={(e) =>
                                            handleVolumeChange(parseFloat(e.target.value))
                                        }
                                        style={styles.volumeSlider}
                                    />
                                </div>
                                <div style={styles.controlsRight}>
                                    {!isHost && (
                                        <button
                                            aria-label="Senkronize Et"
                                            onClick={requestSync}
                                            style={styles.syncButton}
                                        >
                                            <FaSync size={16} />
                                            <span>Senkronize Et</span>
                                        </button>
                                    )}
                                    <button
                                        aria-label="Toggle visibility"
                                        onClick={() => setShowSettings(!showSettings)}
                                        style={styles.controlButton}
                                    >
                                        <FaCog size={18} />
                                    </button>
                                    <button
                                        aria-label="toggle Fullscreen"
                                        onClick={toggleFullscreen}
                                        style={styles.controlButton}
                                    >
                                        {isFullscreen ? (
                                            <FaCompress size={18} />
                                        ) : (
                                            <FaExpand size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.quickReactions}>
                        {QUICK_EMOJIS.map((emoji) => (
                            <button
                                aria-label="Action button"
                                key={emoji}
                                onClick={() => sendReaction(emoji)}
                                style={styles.reactionButton}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={styles.chatSection}>
                    <div style={styles.chatHeader}>
                        <span>Canlı Sohbet</span>
                    </div>
                    <div ref={chatRef} style={styles.chatMessages}>
                        {chatMessages.map((msg, i) => (
                            <div
                                key={`item-${i}`}
                                style={msg.isOwn ? styles.ownMessage : styles.otherMessage}
                            >
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
                            onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                            placeholder="Mesaj yazın..."
                            style={styles.chatInputField}
                        />
                        <button
                            aria-label="send Chat Message"
                            onClick={sendChatMessage}
                            style={styles.sendButton}
                        >
                            {t('common.send')}
                        </button>
                    </div>
                </div>
            </div>

            {showSettings && (
                <div style={styles.settingsPanel}>
                    <h3 style={styles.settingsTitle}>{t('common.settings')}</h3>
                    <div style={styles.settingItem}>
                        <label>Oynatma Hızı</label>
                        <select
                            value={playbackRate}
                            onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
                            style={styles.select}
                            disabled={!isHost}
                        >
                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((r) => (
                                <option key={r} value={r}>
                                    {r}x
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.settingItem}>
                        <label>Kalite</label>
                        <select
                            value={quality}
                            onChange={(e) => setQuality(e.target.value)}
                            style={styles.select}
                        >
                            {['auto', '1080p', '720p', '480p', '360p'].map((q) => (
                                <option key={q} value={q}>
                                    {q === 'auto' ? 'Auto' : q}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

WatchPartyEnhanced.propTypes = {
    roomId: PropTypes.string,
    currentUser: PropTypes.object,
    websocket: PropTypes.object,
    onClose: PropTypes.func,
    initialVideoUrl: PropTypes.string,
    participants: PropTypes.array,
};
export default WatchPartyEnhanced;

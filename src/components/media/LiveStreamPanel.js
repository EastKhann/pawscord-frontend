/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/LiveStreamPanel.js
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaVideo, FaTimes, FaMicrophone, FaDesktop, FaUsers, FaComments } from 'react-icons/fa';
import logger from '../../utils/logger';
import { useTranslation } from 'react-i18next';

const LiveStreamPanel = ({
    onClose,
    currentUser,
    ws,
    channelId,
    fetchWithAuth,
    apiBaseUrl,
    roomSlug,
}) => {
    const { t } = useTranslation();
    const [isStreaming, setIsStreaming] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [viewers, setViewers] = useState([]);
    const [streamSettings, setStreamSettings] = useState({
        quality: '720p',
        camera: true,
        microphone: true,
        screenShare: false,
    });
    const [chatMessages, setChatMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const peerConnections = useRef({});

    const startStream = async () => {
        try {
            const constraints = {
                video: streamSettings.camera
                    ? {
                        width: { ideal: streamSettings.quality === '1080p' ? 1920 : 1280 },
                        height: { ideal: streamSettings.quality === '1080p' ? 1080 : 720 },
                    }
                    : false,
                audio: streamSettings.microphone,
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            if (streamSettings.screenShare) {
                const screenStream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: true,
                });
                stream.getTracks().forEach((track) => screenStream.addTrack(track));
                streamRef.current = screenStream;
            } else {
                streamRef.current = stream;
            }

            if (videoRef.current) {
                videoRef.current.srcObject = streamRef.current;
            }

            setIsStreaming(true);
        } catch (error) {
            logger.error('Stream start error:', error);
        }
    };

    const stopStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        Object.values(peerConnections.current).forEach((pc) => pc.close());
        peerConnections.current = {};
        setIsStreaming(false);
        setViewers([]);
    };

    const sendChatMessage = () => {
        if (!messageInput.trim()) return;
        setChatMessages((prev) => [...prev, { author: currentUser || 'Sen', text: messageInput }]);
        setMessageInput('');
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.panel}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaVideo size={20} color="#f23f42" />
                        <h2 style={styles.title}>{t('liveStream.title', 'Live Stream')}</h2>
                        {isStreaming && <span style={styles.liveBadge}>🔴 CANLI</span>}
                    </div>
                    <button
                        aria-label={t('common.close', 'Close')}
                        onClick={() => {
                            if (isStreaming) stopStream();
                            onClose();
                        }}
                        style={styles.closeButton}
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <div style={styles.content}>
                    <div style={styles.mainArea}>
                        <div style={styles.videoContainer}>
                            <video ref={videoRef} autoPlay muted style={styles.video}>
                                <track kind="captions" />
                            </video>
                            {!isStreaming && (
                                <div style={styles.noStream}>
                                    <FaVideo size={48} color="#4e5058" />
                                    <p>{t('liveStream.notStarted', 'Stream not started')}</p>
                                </div>
                            )}
                        </div>

                        <div style={styles.controls}>
                            {!isStreaming ? (
                                <>
                                    <div style={styles.settingsGroup}>
                                        <label style={styles.settingLabel}>
                                            <input
                                                type="checkbox"
                                                checked={streamSettings.camera}
                                                onChange={(e) =>
                                                    setStreamSettings({
                                                        ...streamSettings,
                                                        camera: e.target.checked,
                                                    })
                                                }
                                            />
                                            <FaVideo size={14} /> <span>Kamera</span>
                                        </label>
                                        <label style={styles.settingLabel}>
                                            <input
                                                type="checkbox"
                                                checked={streamSettings.microphone}
                                                onChange={(e) =>
                                                    setStreamSettings({
                                                        ...streamSettings,
                                                        microphone: e.target.checked,
                                                    })
                                                }
                                            />
                                            <FaMicrophone size={14} /> <span>Mikrofon</span>
                                        </label>
                                        <label style={styles.settingLabel}>
                                            <input
                                                type="checkbox"
                                                checked={streamSettings.screenShare}
                                                onChange={(e) =>
                                                    setStreamSettings({
                                                        ...streamSettings,
                                                        screenShare: e.target.checked,
                                                    })
                                                }
                                            />
                                            <FaDesktop size={14} /> <span>{t('liveStream.shareScreen', 'Share My Screen')}</span>
                                        </label>
                                    </div>
                                    <select
                                        value={streamSettings.quality}
                                        onChange={(e) =>
                                            setStreamSettings({
                                                ...streamSettings,
                                                quality: e.target.value,
                                            })
                                        }
                                        style={styles.qualitySelect}
                                    >
                                        <option value="480p">480p</option>
                                        <option value="720p">720p HD</option>
                                        <option value="1080p">1080p Full HD</option>
                                    </select>
                                    <button
                                        aria-label={t('liveStream.startStream', 'Start stream')}
                                        onClick={startStream}
                                        style={styles.startButton}
                                    >
                                        {t('liveStream.start', 'Start Stream')}
                                    </button>
                                </>
                            ) : (
                                <button
                                    aria-label={t('liveStream.stopStream', 'Stop stream')}
                                    onClick={stopStream}
                                    style={styles.stopButton}
                                >
                                    {t('liveStream.stop', 'Stop Stream')}
                                </button>
                            )}
                        </div>
                    </div>

                    <div style={styles.sidebar}>
                        <div style={styles.viewersSection}>
                            <div style={styles.sectionHeader}>
                                <FaUsers size={16} /> <span>{t('liveStream.viewers', 'Viewers')} ({viewers.length})</span>
                            </div>
                            <div style={styles.viewersList}>
                                {viewers.map((viewer, idx) => (
                                    <div key={`item-${idx}`} style={styles.viewer}>
                                        <div style={styles.viewerAvatar}>
                                            {viewer.name?.[0] || '?'}
                                        </div>
                                        <span>{viewer.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={styles.chatSection}>
                            <div style={styles.sectionHeader}>
                                <FaComments size={16} /> <span>Sohbet</span>
                            </div>
                            <div style={styles.chatMessages}>
                                {chatMessages.map((msg, idx) => (
                                    <div key={`item-${idx}`} style={styles.chatMessage}>
                                        <span style={styles.chatAuthor}>{msg.author}:</span>
                                        <span style={styles.chatText}>{msg.text}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={styles.chatInput}>
                                <input
                                    type="text"
                                    placeholder={t('common.typeMessage', 'Type a message...')}
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                                    style={styles.input}
                                />
                                <button
                                    aria-label={t('liveStream.sendChat', 'Send chat message')}
                                    onClick={sendChatMessage}
                                    style={styles.sendButton}
                                >
                                    {t('common.send', 'Send')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
    },
    panel: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        width: '95%',
        maxWidth: '1400px',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: '1px solid #0b0e1b',
    },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    title: { margin: 0, fontSize: '18px', color: '#ffffff' },
    liveBadge: {
        backgroundColor: '#f23f42',
        color: '#ffffff',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        padding: '8px',
    },
    content: { display: 'flex', flex: 1, gap: '16px', padding: '16px', overflow: 'hidden' },
    mainArea: { flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' },
    videoContainer: {
        flex: 1,
        backgroundColor: '#000000',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
    },
    video: { width: '100%', height: '100%', objectFit: 'contain' },
    noStream: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: '#b5bac1',
    },
    controls: {
        backgroundColor: '#17191c',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
    },
    settingsGroup: { display: 'flex', gap: '16px', flex: 1 },
    settingLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#dbdee1',
        cursor: 'pointer',
    },
    qualitySelect: {
        backgroundColor: '#0d0e10',
        border: 'none',
        color: '#dbdee1',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    startButton: {
        backgroundColor: '#3ba55d',
        color: '#ffffff',
        border: 'none',
        padding: '10px 24px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    stopButton: {
        backgroundColor: '#f23f42',
        color: '#ffffff',
        border: 'none',
        padding: '10px 24px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    sidebar: { width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' },
    viewersSection: {
        backgroundColor: '#17191c',
        borderRadius: '8px',
        padding: '16px',
        maxHeight: '250px',
        display: 'flex',
        flexDirection: 'column',
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: '12px',
    },
    viewersList: { flex: 1, overflowY: 'auto' },
    viewer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 0',
        color: '#dbdee1',
    },
    viewerAvatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#5865f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    chatSection: {
        backgroundColor: '#17191c',
        borderRadius: '8px',
        padding: '16px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    chatMessages: { flex: 1, overflowY: 'auto', marginBottom: '12px' },
    chatMessage: { marginBottom: '8px', color: '#dbdee1', fontSize: '14px' },
    chatAuthor: { fontWeight: 'bold', color: '#5865f2', marginRight: '4px' },
    chatText: { color: '#dbdee1' },
    chatInput: { display: 'flex', gap: '8px' },
    input: {
        flex: 1,
        backgroundColor: '#0d0e10',
        border: 'none',
        color: '#dbdee1',
        padding: '8px 12px',
        borderRadius: '4px',
        outline: 'none',
    },
    sendButton: {
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

LiveStreamPanel.propTypes = {
    onClose: PropTypes.func,
    currentUser: PropTypes.object,
    ws: PropTypes.object,
    channelId: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    roomSlug: PropTypes.string,
};
export default LiveStreamPanel;

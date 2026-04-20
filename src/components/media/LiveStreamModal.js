import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    FaTimes,
    FaVideo,
    FaStop,
    FaMicrophone,
    FaMicrophoneSlash,
    FaDesktop,
    FaUsers,
    FaEye,
} from 'react-icons/fa';
import useLiveStream from '../LiveStreamModal/useLiveStream';
import { getStyles } from '../LiveStreamModal/liveStreamStyles';
import useModalA11y from '../../hooks/useModalA11y';

import { useTranslation } from 'react-i18next';

const LiveStreamModal = ({ onClose, roomSlug, ws, token, isMobile }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Live Stream' });
    const s = getStyles(isMobile);
    const stream = useLiveStream({ roomSlug, ws, onClose });

    return (
        <>
            <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
            <div style={s.overlay} {...overlayProps}>
                <div
                    style={s.modal}
                    {...dialogProps}
                    role="button"
                    tabIndex={0}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <div style={s.header}>
                        <h2 style={s.title}>
                            <FaVideo /> Live Stream
                            {stream.isStreaming && (
                                <span style={s.liveIndicator}>
                                    <span style={s.liveDot} />
                                    CANLI
                                </span>
                            )}
                        </h2>
                        <button aria-label="Close" onClick={onClose} style={s.closeBtn}>
                            <FaTimes />
                        </button>
                    </div>

                    <div style={s.content}>
                        <div style={s.streamSection}>
                            <div style={s.videoContainer}>
                                {stream.isStreaming ? (
                                    <>
                                        <video ref={stream.videoRef} autoPlay muted style={s.video}>
                                            <track kind="captions" />
                                        </video>
                                        <div style={s.viewerCount}>
                                            <FaEye /> {stream.viewers} izleyici
                                        </div>
                                    </>
                                ) : (
                                    <div style={s.placeholder}>
                                        <FaVideo size={64} />
                                        <p>Başlamak için "Yayını Başlat" butonuna tıklayın</p>
                                    </div>
                                )}
                            </div>

                            <div style={s.controls}>
                                {!stream.isStreaming ? (
                                    <>
                                        <button
                                            aria-label="Kamerayı seç"
                                            onClick={() => stream.setStreamType('camera')}
                                            style={s.controlBtn(stream.streamType === 'camera')}
                                        >
                                            <FaVideo /> Kamera
                                        </button>
                                        <button
                                            aria-label="Ekranı seç"
                                            onClick={() => stream.setStreamType('screen')}
                                            style={s.controlBtn(stream.streamType === 'screen')}
                                        >
                                            <FaDesktop /> Ekran
                                        </button>
                                        <button
                                            aria-label="Yayını başlat"
                                            onClick={stream.startStream}
                                            style={s.startBtn}
                                        >
                                            <FaVideo /> Yayını Başlat
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            aria-label="Sesi aç/kapat"
                                            onClick={stream.toggleMute}
                                            style={s.controlBtn(stream.isMuted)}
                                        >
                                            {stream.isMuted ? (
                                                <FaMicrophoneSlash />
                                            ) : (
                                                <FaMicrophone />
                                            )}
                                            {stream.isMuted ? 'Sesi Aç' : 'Sessize Al'}
                                        </button>
                                        <button
                                            aria-label="Yayını durdur"
                                            onClick={stream.stopStream}
                                        >
                                            <FaStop /> Yayını Durdur
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {stream.isStreaming && (
                            <div style={s.chatSection}>
                                <div style={s.chatHeader}>
                                    <FaUsers /> Yayın Sohbeti
                                </div>
                                <div style={s.chatMessages}>
                                    {stream.chatMessages.map((msg) => (
                                        <div key={msg.id} style={s.chatMessage}>
                                            <div style={s.chatUsername}>{msg.user}</div>
                                            <div style={s.chatText}>{msg.message}</div>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={stream.sendChatMessage} style={s.chatInputArea}>
                                    <input
                                        type="text"
                                        value={stream.chatInput}
                                        onChange={(e) => stream.setChatInput(e.target.value)}
                                        placeholder="Mesaj gönderin..."
                                        style={s.input}
                                    />
                                    <button aria-label="Submit" type="submit" style={s.sendBtn}>
                                        {t('common.send')}
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

LiveStreamModal.propTypes = {
    onClose: PropTypes.func,
    roomSlug: PropTypes.string,
    ws: PropTypes.object,
    token: PropTypes.string,
    isMobile: PropTypes.bool,
};
export default LiveStreamModal;

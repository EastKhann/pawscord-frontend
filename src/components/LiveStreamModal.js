import React from 'react';
import { FaTimes, FaVideo, FaStop, FaMicrophone, FaMicrophoneSlash, FaDesktop, FaUsers, FaEye } from 'react-icons/fa';
import useLiveStream from './LiveStreamModal/useLiveStream';
import { getStyles } from './LiveStreamModal/liveStreamStyles';

const LiveStreamModal = ({ onClose, roomSlug, ws, token, isMobile }) => {
    const s = getStyles(isMobile);
    const stream = useLiveStream({ roomSlug, ws, onClose });

    return (
        <>
            <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
            <div style={s.overlay} onClick={onClose}>
                <div style={s.modal} onClick={(e) => e.stopPropagation()}>
                    <div style={s.header}>
                        <h2 style={s.title}>
                            <FaVideo /> Live Stream
                            {stream.isStreaming && <span style={s.liveIndicator}><span style={s.liveDot} />LIVE</span>}
                        </h2>
                        <button onClick={onClose} style={s.closeBtn}><FaTimes /></button>
                    </div>

                    <div style={s.content}>
                        <div style={s.streamSection}>
                            <div style={s.videoContainer}>
                                {stream.isStreaming ? (
                                    <>
                                        <video ref={stream.videoRef} autoPlay muted style={s.video} />
                                        <div style={s.viewerCount}><FaEye /> {stream.viewers} viewers</div>
                                    </>
                                ) : (
                                    <div style={s.placeholder}>
                                        <FaVideo size={64} />
                                        <p style={{ marginTop: '16px', fontSize: '18px' }}>Click "Start Stream" to begin</p>
                                    </div>
                                )}
                            </div>

                            <div style={s.controls}>
                                {!stream.isStreaming ? (
                                    <>
                                        <button onClick={() => stream.setStreamType('camera')} style={s.controlBtn(stream.streamType === 'camera')}>
                                            <FaVideo /> Camera
                                        </button>
                                        <button onClick={() => stream.setStreamType('screen')} style={s.controlBtn(stream.streamType === 'screen')}>
                                            <FaDesktop /> Screen
                                        </button>
                                        <button onClick={stream.startStream} style={s.startBtn}><FaVideo /> Start Stream</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={stream.toggleMute} style={s.controlBtn(stream.isMuted)}>
                                            {stream.isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                                            {stream.isMuted ? 'Unmute' : 'Mute'}
                                        </button>
                                        <button onClick={stream.stopStream} style={{ ...s.startBtn, background: 'linear-gradient(135deg, #da373c, #b83030)' }}>
                                            <FaStop /> Stop Stream
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {stream.isStreaming && (
                            <div style={s.chatSection}>
                                <div style={s.chatHeader}><FaUsers /> Stream Chat</div>
                                <div style={s.chatMessages}>
                                    {stream.chatMessages.map(msg => (
                                        <div key={msg.id} style={s.chatMessage}>
                                            <div style={s.chatUsername}>{msg.user}</div>
                                            <div style={s.chatText}>{msg.message}</div>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={stream.sendChatMessage} style={s.chatInputArea}>
                                    <input type="text" value={stream.chatInput} onChange={(e) => stream.setChatInput(e.target.value)}
                                        placeholder="Send a message..." style={s.input} />
                                    <button type="submit" style={s.sendBtn}>Send</button>
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

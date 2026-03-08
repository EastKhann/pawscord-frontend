// frontend/src/components/ScreenShareModal.js

/**
 * 🖥️ Screen Share Modal
 * Share screen, application window, or browser tab
 */

import { useState, useEffect, useRef } from 'react';
import { FaDesktop, FaStop, FaCog, FaTimes, FaExpand, FaCompress } from 'react-icons/fa';
import useModalA11y from '../hooks/useModalA11y';

const ScreenShareModal = ({
    isOpen,
    onClose,
    onStopSharing,
    screenStream,
    isSharing,
    participants = []
}) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [quality, setQuality] = useState('1080p'); // 720p, 1080p
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const { overlayProps, dialogProps } = useModalA11y({ onClose, isOpen, label: 'Screen Share' });

    // Set video stream
    useEffect(() => {
        if (videoRef.current && screenStream) {
            videoRef.current.srcObject = screenStream;
        }
    }, [screenStream]);

    // Fullscreen handler
    const toggleFullscreen = async () => {
        if (!document.fullscreenElement) {
            try {
                await containerRef.current?.requestFullscreen();
                setIsFullscreen(true);
            } catch (error) {
                console.error('Fullscreen failed:', error);
            }
        } else {
            await document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div ref={containerRef} style={styles.container} {...dialogProps}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerInfo}>
                        <FaDesktop style={styles.headerIcon} />
                        <span style={styles.title}>Ekran Paylaşımı</span>
                        {isSharing && (
                            <span style={styles.badge}>
                                🔴 Paylaşılıyor ({participants.length} izleyici)
                            </span>
                        )}
                    </div>
                    <div style={styles.headerActions}>
                        <button
                            onClick={toggleFullscreen}
                            style={styles.headerButton}
                            title="Tam ekran"
                        >
                            {isFullscreen ? <FaCompress /> : <FaExpand />}
                        </button>
                        <button
                            onClick={onClose}
                            style={styles.closeButton}
                            title="Kapat"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Screen Preview */}
                <div style={styles.videoContainer}>
                    {screenStream ? (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            style={styles.video}
                        />
                    ) : (
                        <div style={styles.placeholder}>
                            <FaDesktop style={styles.placeholderIcon} />
                            <p style={styles.placeholderText}>Ekran paylaşımı başlatılmadı</p>
                        </div>
                    )}
                </div>

                {/* Quality Indicator */}
                {isSharing && (
                    <div style={styles.qualityBadge}>
                        {quality} • {screenStream?.getVideoTracks()[0]?.getSettings().frameRate || 30} FPS
                    </div>
                )}

                {/* Controls */}
                <div style={styles.controls}>
                    {isSharing ? (
                        <button
                            onClick={onStopSharing}
                            style={styles.stopButton}
                        >
                            <FaStop style={{ marginRight: '8px' }} />
                            Paylaşımı Durdur
                        </button>
                    ) : (
                        <div style={styles.info}>
                            <p style={styles.infoText}>
                                Ekran paylaşımı sona erdi
                            </p>
                        </div>
                    )}
                </div>

                {/* Participants */}
                {participants.length > 0 && (
                    <div style={styles.participants}>
                        <span style={styles.participantsTitle}>İzleyenler:</span>
                        <div style={styles.participantList}>
                            {participants.map((p, i) => (
                                <div key={i} style={styles.participant}>
                                    <div style={styles.participantAvatar}>
                                        {p.username?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <span style={styles.participantName}>{p.username}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
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
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        width: '90%',
        maxWidth: '1200px',
        height: '90%',
        backgroundColor: '#0d0e10',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: '#111214',
        borderBottom: '1px solid #0b0e1b'
    },
    headerInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    headerIcon: {
        color: '#5865f2',
        fontSize: '20px'
    },
    title: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff'
    },
    badge: {
        fontSize: '13px',
        color: '#f23f42',
        backgroundColor: 'rgba(240, 71, 71, 0.1)',
        padding: '4px 12px',
        borderRadius: '12px'
    },
    headerActions: {
        display: 'flex',
        gap: '8px'
    },
    headerButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#b5bac1',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '4px'
    },
    closeButton: {
        backgroundColor: '#f23f42',
        border: 'none',
        color: '#fff',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: '4px'
    },
    videoContainer: {
        flex: 1,
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    video: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    placeholder: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        color: '#b5bac1'
    },
    placeholderIcon: {
        fontSize: '64px',
        opacity: 0.5
    },
    placeholderText: {
        fontSize: '16px'
    },
    qualityBadge: {
        position: 'absolute',
        top: '80px',
        right: '24px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#fff',
        padding: '6px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold'
    },
    controls: {
        padding: '24px',
        backgroundColor: '#111214',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    stopButton: {
        backgroundColor: '#f23f42',
        color: '#fff',
        border: 'none',
        padding: '12px 32px',
        borderRadius: '4px',
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.2s'
    },
    info: {
        textAlign: 'center'
    },
    infoText: {
        color: '#b5bac1',
        fontSize: '14px'
    },
    participants: {
        position: 'absolute',
        bottom: '100px',
        left: '24px',
        backgroundColor: 'rgba(47, 49, 54, 0.9)',
        borderRadius: '8px',
        padding: '12px',
        maxWidth: '200px'
    },
    participantsTitle: {
        fontSize: '12px',
        color: '#b5bac1',
        fontWeight: 'bold',
        display: 'block',
        marginBottom: '8px'
    },
    participantList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    participant: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    participantAvatar: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: '#5865f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#fff'
    },
    participantName: {
        fontSize: '13px',
        color: '#dbdee1'
    }
};

export default ScreenShareModal;



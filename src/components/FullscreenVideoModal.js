// frontend/src/components/FullscreenVideoModal.js
import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaExpand, FaCompress, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const FullscreenVideoModal = ({ stream, username, onClose, isScreen = false }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(100);
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        };
    }, [stream]);

    const toggleFullscreen = async () => {
        if (!containerRef.current) return;

        try {
            if (!isFullscreen) {
                if (containerRef.current.requestFullscreen) {
                    await containerRef.current.requestFullscreen();
                } else if (containerRef.current.webkitRequestFullscreen) {
                    await containerRef.current.webkitRequestFullscreen();
                } else if (containerRef.current.mozRequestFullScreen) {
                    await containerRef.current.mozRequestFullScreen();
                }
                setIsFullscreen(true);
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    await document.mozCancelFullScreen();
                }
                setIsFullscreen(false);
            }
        } catch (err) {
            console.error('Fullscreen hatası:', err);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume / 100;
        }
    };

    // Fullscreen change listener
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement
            );
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
        };
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Escape' && !isFullscreen) {
                onClose();
            }
            if (e.key === 'f' || e.key === 'F') {
                toggleFullscreen();
            }
            if (e.key === 'm' || e.key === 'M') {
                toggleMute();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isFullscreen]);

    return (
        <div ref={containerRef} style={styles.overlay}>
            {/* Close Button */}
            <button onClick={onClose} style={styles.closeButton}>
                <FaTimes />
            </button>

            {/* Video Container */}
            <div style={styles.videoContainer}>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={styles.video}
                />

                {/* Username Label */}
                <div style={styles.usernameLabel}>
                    {isScreen ? `${username}'s Screen` : username}
                </div>
            </div>

            {/* Controls */}
            <div style={styles.controls}>
                {/* Volume Control */}
                <div style={styles.volumeControl}>
                    <button onClick={toggleMute} style={styles.controlButton}>
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        style={styles.volumeSlider}
                    />
                    <span style={styles.volumeText}>{volume}%</span>
                </div>

                {/* Fullscreen Button */}
                <button onClick={toggleFullscreen} style={styles.controlButton}>
                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>
            </div>

            {/* Keyboard Hints */}
            <div style={styles.hints}>
                <span>F: Tam Ekran</span>
                <span>M: Sessize Al</span>
                <span>ESC: Kapat</span>
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
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100000,
    },
    closeButton: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'rgba(0,0,0,0.6)',
        border: 'none',
        color: 'white',
        fontSize: '24px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 10,
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    videoContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    video: {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        aspectRatio: '16/9',
    },
    usernameLabel: {
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 'bold',
        zIndex: 10,
    },
    controls: {
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '12px 16px',
        borderRadius: '25px',
        zIndex: 10,
    },
    volumeControl: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    controlButton: {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '8px',
        transition: 'all 0.2s',
    },
    volumeSlider: {
        width: '100px',
        cursor: 'pointer',
    },
    volumeText: {
        color: 'white',
        fontSize: '14px',
        minWidth: '40px',
    },
    hints: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: '12px 16px',
        borderRadius: '8px',
        color: 'white',
        fontSize: '12px',
        zIndex: 10,
    },
};

// Add hover effects
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    button:hover {
        transform: scale(1.1);
        opacity: 0.8;
    }
`;
document.head.appendChild(styleSheet);

export default FullscreenVideoModal;




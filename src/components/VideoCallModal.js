// frontend/src/components/VideoCallModal.js

/**
 * 📹 1v1 Video Call Modal
 * Direct video call between two users
 */

import React, { useState, useEffect, useRef } from 'react';
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaPhone, FaExpand, FaCompress, FaCog, FaTimes } from 'react-icons/fa';

const VideoCallModal = ({
    isOpen,
    onClose,
    targetUser,
    currentUser,
    localStream,
    remoteStream,
    onToggleVideo,
    onToggleMute,
    isVideoEnabled,
    isMuted,
    callDuration = 0,
    callStatus = 'connecting' // connecting, active, ended
}) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState('');
    const [selectedMicrophone, setSelectedMicrophone] = useState('');
    const [devices, setDevices] = useState({ cameras: [], microphones: [] });
    const [videoQuality, setVideoQuality] = useState('720p'); // 480p, 720p, 1080p

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const containerRef = useRef(null);

    // Get available devices
    useEffect(() => {
        const getDevices = async () => {
            try {
                const deviceList = await navigator.mediaDevices.enumerateDevices();
                const cameras = deviceList.filter(d => d.kind === 'videoinput');
                const microphones = deviceList.filter(d => d.kind === 'audioinput');

                setDevices({ cameras, microphones });

                if (cameras.length > 0 && !selectedCamera) {
                    setSelectedCamera(cameras[0].deviceId);
                }
                if (microphones.length > 0 && !selectedMicrophone) {
                    setSelectedMicrophone(microphones[0].deviceId);
                }
            } catch (error) {
                console.error('Failed to enumerate devices:', error);
            }
        };

        if (isOpen) {
            getDevices();
        }
    }, [isOpen]);

    // Set video streams
    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

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

    // Format call duration
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div ref={containerRef} style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerInfo}>
                        <div style={styles.avatar}>
                            {targetUser?.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div style={styles.userInfo}>
                            <span style={styles.username}>{targetUser?.username || 'Unknown'}</span>
                            <span style={styles.status}>
                                {callStatus === 'connecting' && '🔄 Bağlanıyor...'}
                                {callStatus === 'active' && `⏱️ ${formatDuration(callDuration)}`}
                                {callStatus === 'ended' && '📞 Arama sona erdi'}
                            </span>
                        </div>
                    </div>
                    <div style={styles.headerActions}>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            style={styles.headerButton}
                            title="Ayarlar"
                        >
                            <FaCog />
                        </button>
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

                {/* Settings Panel */}
                {showSettings && (
                    <div style={styles.settingsPanel}>
                        <h4 style={styles.settingsTitle}>Video Ayarları</h4>

                        <div style={styles.settingGroup}>
                            <label style={styles.settingLabel}>Kamera</label>
                            <select
                                value={selectedCamera}
                                onChange={(e) => setSelectedCamera(e.target.value)}
                                style={styles.settingSelect}
                            >
                                {devices.cameras.map(cam => (
                                    <option key={cam.deviceId} value={cam.deviceId}>
                                        {cam.label || `Kamera ${devices.cameras.indexOf(cam) + 1}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.settingGroup}>
                            <label style={styles.settingLabel}>Mikrofon</label>
                            <select
                                value={selectedMicrophone}
                                onChange={(e) => setSelectedMicrophone(e.target.value)}
                                style={styles.settingSelect}
                            >
                                {devices.microphones.map(mic => (
                                    <option key={mic.deviceId} value={mic.deviceId}>
                                        {mic.label || `Mikrofon ${devices.microphones.indexOf(mic) + 1}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.settingGroup}>
                            <label style={styles.settingLabel}>Kalite</label>
                            <select
                                value={videoQuality}
                                onChange={(e) => setVideoQuality(e.target.value)}
                                style={styles.settingSelect}
                            >
                                <option value="480p">480p (Düşük)</option>
                                <option value="720p">720p (Orta)</option>
                                <option value="1080p">1080p (Yüksek)</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Video Grid */}
                <div style={styles.videoGrid}>
                    {/* Remote Video (Main) */}
                    <div style={styles.remoteVideoContainer}>
                        {remoteStream ? (
                            <video
                                ref={remoteVideoRef}
                                autoPlay
                                playsInline
                                style={styles.remoteVideo}
                            />
                        ) : (
                            <div style={styles.videoPlaceholder}>
                                <div style={styles.placeholderAvatar}>
                                    {targetUser?.username?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <p>Kamera açılmadı</p>
                            </div>
                        )}
                    </div>

                    {/* Local Video (Picture-in-Picture) */}
                    <div style={styles.localVideoContainer}>
                        {localStream && isVideoEnabled ? (
                            <video
                                ref={localVideoRef}
                                autoPlay
                                playsInline
                                muted
                                style={styles.localVideo}
                            />
                        ) : (
                            <div style={styles.localVideoPlaceholder}>
                                <div style={styles.placeholderAvatarSmall}>
                                    {currentUser?.[0]?.toUpperCase() || 'M'}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Controls */}
                <div style={styles.controls}>
                    <button
                        onClick={onToggleMute}
                        style={{
                            ...styles.controlButton,
                            ...(isMuted && styles.controlButtonActive)
                        }}
                        title={isMuted ? 'Mikrofonu aç' : 'Mikrofonu kapat'}
                    >
                        {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                    </button>

                    <button
                        onClick={onToggleVideo}
                        style={{
                            ...styles.controlButton,
                            ...(!isVideoEnabled && styles.controlButtonActive)
                        }}
                        title={isVideoEnabled ? 'Kamerayı kapat' : 'Kamerayı aç'}
                    >
                        {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
                    </button>

                    <button
                        onClick={onClose}
                        style={styles.hangupButton}
                        title="Aramayı sonlandır"
                    >
                        <FaPhone style={{ transform: 'rotate(135deg)' }} />
                    </button>
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
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1e1f22',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: '#2f3136',
        borderBottom: '1px solid #1e1f22'
    },
    headerInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#5865f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#fff'
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    username: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff'
    },
    status: {
        fontSize: '13px',
        color: '#b9bbbe'
    },
    headerActions: {
        display: 'flex',
        gap: '8px'
    },
    headerButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '4px',
        transition: 'background-color 0.2s'
    },
    closeButton: {
        backgroundColor: '#f04747',
        border: 'none',
        color: '#fff',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: '4px'
    },
    settingsPanel: {
        position: 'absolute',
        top: '70px',
        right: '24px',
        backgroundColor: '#2f3136',
        border: '1px solid #1e1f22',
        borderRadius: '8px',
        padding: '16px',
        width: '280px',
        zIndex: 100,
        boxShadow: '0 8px 16px rgba(0,0,0,0.4)'
    },
    settingsTitle: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '12px'
    },
    settingGroup: {
        marginBottom: '12px'
    },
    settingLabel: {
        display: 'block',
        fontSize: '12px',
        color: '#b9bbbe',
        marginBottom: '6px'
    },
    settingSelect: {
        width: '100%',
        backgroundColor: '#40444b',
        border: '1px solid #1e1f22',
        borderRadius: '4px',
        padding: '8px',
        color: '#dcddde',
        fontSize: '13px'
    },
    videoGrid: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#000'
    },
    remoteVideoContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    remoteVideo: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    videoPlaceholder: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        color: '#b9bbbe'
    },
    placeholderAvatar: {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        backgroundColor: '#5865f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#fff'
    },
    localVideoContainer: {
        position: 'absolute',
        bottom: '100px',
        right: '24px',
        width: '240px',
        height: '180px',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '2px solid #5865f2',
        backgroundColor: '#000',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
    },
    localVideo: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: 'scaleX(-1)' // Mirror effect
    },
    localVideoPlaceholder: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2f3136'
    },
    placeholderAvatarSmall: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#5865f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#fff'
    },
    controls: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        padding: '24px',
        backgroundColor: '#2f3136'
    },
    controlButton: {
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: '#40444b',
        color: '#fff',
        fontSize: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s'
    },
    controlButtonActive: {
        backgroundColor: '#f04747'
    },
    hangupButton: {
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: '#f04747',
        color: '#fff',
        fontSize: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s'
    }
};

export default VideoCallModal;



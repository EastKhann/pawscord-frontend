/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    FaVideo,
    FaVideoSlash,
    FaMicrophone,
    FaMicrophoneSlash,
    FaPhone,
    FaExpand,
    FaCompress,
    FaCog,
    FaTimes,
} from 'react-icons/fa';
import useVideoCall, { formatDuration } from '../VideoCallModal/useVideoCall';
import useModalA11y from '../../hooks/useModalA11y';
import { styles } from '../VideoCallModal/videoCallStyles';

import { useTranslation } from 'react-i18next';

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
    callStatus = 'connecting',
}) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const v = useVideoCall(isOpen, localStream, remoteStream);
    const { overlayProps, dialogProps } = useModalA11y({ onClose, isOpen, label: 'Video Call' });

    if (!isOpen) return null;

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div ref={v.containerRef} style={styles.container} {...dialogProps}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerInfo}>
                        <div style={styles.avatar}>
                            {targetUser?.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div style={styles.userInfo}>
                            <span style={styles.username}>{targetUser?.username || 'Unknown'}</span>
                            <span style={styles.status}>
                                {callStatus === 'connecting' && '🔄 Connecting...'}
                                {callStatus === 'active' && `⏱️ ${formatDuration(callDuration)}`}
                                {callStatus === 'ended' && '📞 Search sona erdi'}
                            </span>
                        </div>
                    </div>
                    <div style={styles.headerActions}>
                        <button
                            aria-label="Ayarlar"
                            onClick={() => v.setShowSettings(!v.showSettings)}
                            style={styles.headerButton}
                            title="Ayarlar"
                        >
                            <FaCog />
                        </button>
                        <button
                            onClick={v.toggleFullscreen}
                            style={styles.headerButton}
                            title="Tam ekran"
                            aria-label="Tam ekran"
                        >
                            {v.isFullscreen ? <FaCompress /> : <FaExpand />}
                        </button>
                        <button
                            onClick={onClose}
                            style={styles.closeButton}
                            title={t('common.close')}
                            aria-label={t('common.close')}
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Settings Panel */}
                {v.showSettings && (
                    <div style={styles.settingsPanel}>
                        <h4 style={styles.settingsTitle}>Video Ayarları</h4>
                        <div style={styles.settingGroup}>
                            <label style={styles.settingLabel}>Kamera</label>
                            <select
                                value={v.selectedCamera}
                                onChange={(e) => v.setSelectedCamera(e.target.value)}
                                style={styles.settingSelect}
                            >
                                {v.devices.cameras.map((cam, i) => (
                                    <option key={cam.deviceId} value={cam.deviceId}>
                                        {cam.label || `Kamera ${i + 1}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={styles.settingGroup}>
                            <label style={styles.settingLabel}>Mikrofon</label>
                            <select
                                value={v.selectedMicrophone}
                                onChange={(e) => v.setSelectedMicrophone(e.target.value)}
                                style={styles.settingSelect}
                            >
                                {v.devices.microphones.map((mic, i) => (
                                    <option key={mic.deviceId} value={mic.deviceId}>
                                        {mic.label || `Mikrofon ${i + 1}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={styles.settingGroup}>
                            <label style={styles.settingLabel}>Kalite</label>
                            <select
                                value={v.videoQuality}
                                onChange={(e) => v.setVideoQuality(e.target.value)}
                                style={styles.settingSelect}
                            >
                                <option value="480p">480p (Low)</option>
                                <option value="720p">720p (Orta)</option>
                                <option value="1080p">1080p (High)</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Video Grid */}
                <div style={styles.videoGrid}>
                    <div style={styles.remoteVideoContainer}>
                        {remoteStream ? (
                            <video
                                ref={v.remoteVideoRef}
                                autoPlay
                                playsInline
                                style={styles.remoteVideo}
                            >
                                <track kind="captions" />
                            </video>
                        ) : (
                            <div style={styles.videoPlaceholder}>
                                <div style={styles.placeholderAvatar}>
                                    {targetUser?.username?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <p>Kamera openılmadı</p>
                            </div>
                        )}
                    </div>
                    <div style={styles.localVideoContainer}>
                        {localStream && isVideoEnabled ? (
                            <video
                                ref={v.localVideoRef}
                                autoPlay
                                playsInline
                                muted
                                style={styles.localVideo}
                            >
                                <track kind="captions" />
                            </video>
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
                        title={isMuted ? 'Mikrofonu open' : 'Mikrofonu close'}
                        aria-label={isMuted ? 'Mikrofonu open' : 'Mikrofonu close'}
                    >
                        {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                    </button>
                    <button
                        onClick={onToggleVideo}
                        title={isVideoEnabled ? t('ui.kamerayi_close') : 'Turn on camera'}
                        aria-label={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
                    >
                        {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
                    </button>
                    <button
                        onClick={onClose}
                        style={styles.hangupButton}
                        title={t('ui.searchyi_sonlandir')}
                        aria-label="End search"
                    >
                        <FaPhone />
                    </button>
                </div>
            </div>
        </div>
    );
};

VideoCallModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    targetUser: PropTypes.func,
    currentUser: PropTypes.object,
    localStream: PropTypes.object,
    remoteStream: PropTypes.object,
    onToggleVideo: PropTypes.func,
    onToggleMute: PropTypes.func,
    isVideoEnabled: PropTypes.bool,
    isMuted: PropTypes.bool,
    callDuration: PropTypes.number,
    callStatus: PropTypes.string,
};
export default VideoCallModal;

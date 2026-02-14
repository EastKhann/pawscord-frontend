import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaPhone, FaExpand, FaCompress, FaCog, FaTimes } from 'react-icons/fa';
import useVideoCall, { formatDuration } from './VideoCallModal/useVideoCall';
import { styles } from './VideoCallModal/videoCallStyles';

const VideoCallModal = ({ isOpen, onClose, targetUser, currentUser, localStream, remoteStream, onToggleVideo, onToggleMute, isVideoEnabled, isMuted, callDuration = 0, callStatus = 'connecting' }) => {
  const v = useVideoCall(isOpen, localStream, remoteStream);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div ref={v.containerRef} style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerInfo}>
            <div style={styles.avatar}>{targetUser?.username?.[0]?.toUpperCase() || 'U'}</div>
            <div style={styles.userInfo}>
              <span style={styles.username}>{targetUser?.username || 'Unknown'}</span>
              <span style={styles.status}>
                {callStatus === 'connecting' && '\uD83D\uDD04 Ba\u011flan\u0131yor...'}
                {callStatus === 'active' && `\u23F1\uFE0F ${formatDuration(callDuration)}`}
                {callStatus === 'ended' && '\uD83D\uDCDE Arama sona erdi'}
              </span>
            </div>
          </div>
          <div style={styles.headerActions}>
            <button onClick={() => v.setShowSettings(!v.showSettings)} style={styles.headerButton} title="Ayarlar"><FaCog /></button>
            <button onClick={v.toggleFullscreen} style={styles.headerButton} title="Tam ekran">{v.isFullscreen ? <FaCompress /> : <FaExpand />}</button>
            <button onClick={onClose} style={styles.closeButton} title="Kapat"><FaTimes /></button>
          </div>
        </div>

        {/* Settings Panel */}
        {v.showSettings && (
          <div style={styles.settingsPanel}>
            <h4 style={styles.settingsTitle}>Video Ayarlar\u0131</h4>
            <div style={styles.settingGroup}>
              <label style={styles.settingLabel}>Kamera</label>
              <select value={v.selectedCamera} onChange={(e) => v.setSelectedCamera(e.target.value)} style={styles.settingSelect}>
                {v.devices.cameras.map((cam, i) => <option key={cam.deviceId} value={cam.deviceId}>{cam.label || `Kamera ${i + 1}`}</option>)}
              </select>
            </div>
            <div style={styles.settingGroup}>
              <label style={styles.settingLabel}>Mikrofon</label>
              <select value={v.selectedMicrophone} onChange={(e) => v.setSelectedMicrophone(e.target.value)} style={styles.settingSelect}>
                {v.devices.microphones.map((mic, i) => <option key={mic.deviceId} value={mic.deviceId}>{mic.label || `Mikrofon ${i + 1}`}</option>)}
              </select>
            </div>
            <div style={styles.settingGroup}>
              <label style={styles.settingLabel}>Kalite</label>
              <select value={v.videoQuality} onChange={(e) => v.setVideoQuality(e.target.value)} style={styles.settingSelect}>
                <option value="480p">480p (D\u00fc\u015f\u00fck)</option>
                <option value="720p">720p (Orta)</option>
                <option value="1080p">1080p (Y\u00fcksek)</option>
              </select>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div style={styles.videoGrid}>
          <div style={styles.remoteVideoContainer}>
            {remoteStream ? <video ref={v.remoteVideoRef} autoPlay playsInline style={styles.remoteVideo} /> : (
              <div style={styles.videoPlaceholder}>
                <div style={styles.placeholderAvatar}>{targetUser?.username?.[0]?.toUpperCase() || 'U'}</div>
                <p>Kamera a\u00e7\u0131lmad\u0131</p>
              </div>
            )}
          </div>
          <div style={styles.localVideoContainer}>
            {localStream && isVideoEnabled ? <video ref={v.localVideoRef} autoPlay playsInline muted style={styles.localVideo} /> : (
              <div style={styles.localVideoPlaceholder}>
                <div style={styles.placeholderAvatarSmall}>{currentUser?.[0]?.toUpperCase() || 'M'}</div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          <button onClick={onToggleMute} style={{ ...styles.controlButton, ...(isMuted && styles.controlButtonActive) }} title={isMuted ? 'Mikrofonu a\u00e7' : 'Mikrofonu kapat'}>
            {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
          <button onClick={onToggleVideo} style={{ ...styles.controlButton, ...(!isVideoEnabled && styles.controlButtonActive) }} title={isVideoEnabled ? 'Kameray\u0131 kapat' : 'Kameray\u0131 a\u00e7'}>
            {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
          </button>
          <button onClick={onClose} style={styles.hangupButton} title="Aramay\u0131 sonland\u0131r">
            <FaPhone style={{ transform: 'rotate(135deg)' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;

import { useState, useEffect, useRef } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import './ClipsSystem.css';
import confirmDialog from '../../utils/confirmDialog';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
import { API_BASE_URL } from '../../utils/apiEndpoints';
const ClipsSystem = ({ serverId, onClose }) => {
  const { t } = useTranslation();
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('my-clips');
  const [recording, setRecording] = useState(false);
  const [clipName, setClipName] = useState('');
  const [selectedClip, setSelectedClip] = useState(null);
  const [playingClip, setPlayingClip] = useState(null);
  const clipTimerRef = useRef(null);
  const playTimerRef = useRef(null);

  // 🧹 Cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(clipTimerRef.current);
      clearTimeout(playTimerRef.current);
    };
  }, []);

  useEffect(() => {
    // TODO: Backend not yet implemented — clips API endpoints don't exist
    setLoading(false);
  }, [activeTab, serverId]);

  const fetchMyClips = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/clips/my-clips/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setClips(data.clips || []);
      }
    } catch (error) {
      logger.error('Error fetching clips:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServerClips = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/clips/${serverId}/list/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setClips(data.clips || []);
      }
    } catch (error) {
      logger.error('Error fetching server clips:', error);
    } finally {
      setLoading(false);
    }
  };

  const startClip = async () => {
    if (!clipName.trim()) {
      logger.error('❌ Please enter a clip name');
      return;
    }

    try {
      setRecording(true);
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/clips/${serverId}/start/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: clipName, duration: 30 })
      });

      if (response.ok) {
        const data = await response.json();
        clipTimerRef.current = setTimeout(() => {
          stopClip(data.clip_id);
        }, 30000); // Auto-stop after 30 seconds
      } else {
        logger.error('❌ Failed to start clip');
        setRecording(false);
      }
    } catch (error) {
      logger.error('Error starting clip:', error);
      setRecording(false);
    }
  };

  const stopClip = async (clipId) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/clips/${clipId}/stop/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setRecording(false);
        setClipName('');
        if (activeTab === 'my-clips') fetchMyClips();
        else fetchServerClips();
      }
    } catch (error) {
      logger.error('Error stopping clip:', error);
    }
  };

  const deleteClip = async (clipId) => {
    if (!await confirmDialog(t('clips.deleteConfirm', 'Are you sure you want to delete this clip?'))) return;

    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/clips/${clipId}/delete/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setClips(clips.filter(c => c.id !== clipId));
      }
    } catch (error) {
      logger.error('Error deleting clip:', error);
    }
  };

  const shareClip = async (clipId) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/clips/${clipId}/share/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ server_id: serverId })
      });

      if (response.ok) {
      }
    } catch (error) {
      logger.error('Error sharing clip:', error);
    }
  };

  const playClip = (clip) => {
    setPlayingClip(clip.id);
    // Simulate playback
    playTimerRef.current = setTimeout(() => setPlayingClip(null), 3000);
  };

  return (
    <div className="clips-system-overlay" role="button" tabIndex={0} onClick={onClose} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}>
      <div className="clips-system-modal" role="button" tabIndex={0} onClick={e => e.stopPropagation()} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}>
        <div className="clips-system-header">
          <h2>🎬 Clips</h2>
          <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="clips-tabs">
          <button
          aria-label={t('clips.myClips', 'My clips')}
            className={`tab-btn ${activeTab === 'my-clips' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-clips')}
            📁 My Clips
          </button>
          <button
          aria-label={t('clips.serverClips', 'Server clips')}
            className={`tab-btn ${activeTab === 'server-clips' ? 'active' : ''}`}
            onClick={() => setActiveTab('server-clips')}
            🎭 Server Clips
          </button>
        </div>

        <div className="clips-system-content">
          {/* Recording Controls */}
          <div className="recording-controls">
            <div className="clip-name-input-wrapper">
              <input
                type="text"
                placeholder={t('media.clipName', 'Clip name...')}
                value={clipName}
                onChange={(e) => setClipName(e.target.value)}
                className="clip-name-input"
                disabled={recording}
              />
            </div>
            <button
          aria-label={t('clips.startRecording', 'Start recording')}
              className={`record-btn ${recording ? 'recording' : ''}`}
              onClick={recording ? null : startClip}
              disabled={recording || !clipName.trim()}>
              {recording ? '⏺️ Recording...' : '⏺️ Clip Last 30s'}
            </button>
          </div>

          {/* Clips Grid */}
          {loading ? (
            <div className="loading-spinner">{t('clips.loading','Loading clips...')}</div>
          ) : clips.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎬</div>
              <h3>{t('clips.noClips','No Clips Yet')}</h3>
              <p>{t('clips.recordFirst','Record your first clip during voice chat')}</p>
            </div>
          ) : (
            <div className="clips-grid">
              {clips.map(clip => (
                <div key={clip.id} className="clip-card">
                  <div className="clip-thumbnail">
                    <div className="clip-duration">{clip.duration || '0:30'}</div>
                    <button
          aria-label={t('clips.playClip', 'Play clip')}
                      className={`play-clip-btn ${playingClip === clip.id ? 'playing' : ''}`}
                      onClick={() => playClip(clip)}>
                      {playingClip === clip.id ? '⏸️' : '▶️'}
                    </button>
                  </div>

                  <div className="clip-info">
                    <h4 className="clip-title">{clip.name}</h4>
                    <div className="clip-meta">
                      <span className="clip-author">👤 {clip.author?.username || 'Unknown'}</span>
                      <span className="clip-date">{new Date(clip.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="clip-stats">
                      <span className="clip-views">👁️ {clip.views || 0} views</span>
                    </div>
                  </div>

                  <div className="clip-actions">
                    {activeTab === 'my-clips' && (
                      <button
          aria-label={t('clips.shareClip', 'Share clip')}
                        className="share-clip-btn"
                        onClick={() => shareClip(clip.id)}
                        title={t('common.shareToServer', 'Share to server')}
                      >
                        📤
                      </button>
                    )}
                    <button
          aria-label={t('clips.downloadClip', 'Download clip')}
                      className="download-clip-btn"
                      onClick={() => window.open(clip.url, '_blank', 'noopener,noreferrer')}
                      title={t('common.download', 'Download')}
                    >
                      💾
                    </button>
                    {activeTab === 'my-clips' && (
                      <button
          aria-label={t('clips.deleteClip', 'Delete clip')}
                        className="delete-clip-btn"
                        onClick={() => deleteClip(clip.id)}
                        title={t("common.delete")}
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
  )
}
        </div >
      </div >
    </div >
  );
};

ClipsSystem.propTypes = {
  serverId: PropTypes.string,
  onClose: PropTypes.func,
};
export default ClipsSystem;

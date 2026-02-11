import { useState, useEffect } from 'react';
import './ClipsSystem.css';
import confirmDialog from '../utils/confirmDialog';

const ClipsSystem = ({ serverId, onClose }) => {
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('my-clips');
  const [recording, setRecording] = useState(false);
  const [clipName, setClipName] = useState('');
  const [selectedClip, setSelectedClip] = useState(null);
  const [playingClip, setPlayingClip] = useState(null);

  useEffect(() => {
    if (activeTab === 'my-clips') {
      fetchMyClips();
    } else {
      fetchServerClips();
    }
  }, [activeTab, serverId]);

  const fetchMyClips = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/clips/my-clips/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setClips(data.clips || []);
      }
    } catch (error) {
      console.error('Error fetching clips:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServerClips = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/clips/${serverId}/list/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setClips(data.clips || []);
      }
    } catch (error) {
      console.error('Error fetching server clips:', error);
    } finally {
      setLoading(false);
    }
  };

  const startClip = async () => {
    if (!clipName.trim()) {
      console.error('❌ Please enter a clip name');
      return;
    }

    try {
      setRecording(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/clips/${serverId}/start/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: clipName, duration: 30 })
      });

      if (response.ok) {
        const data = await response.json();
        setTimeout(() => {
          stopClip(data.clip_id);
        }, 30000); // Auto-stop after 30 seconds
      } else {
        console.error('❌ Failed to start clip');
        setRecording(false);
      }
    } catch (error) {
      console.error('Error starting clip:', error);
      setRecording(false);
    }
  };

  const stopClip = async (clipId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/clips/${clipId}/stop/`, {
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
      console.error('Error stopping clip:', error);
    }
  };

  const deleteClip = async (clipId) => {
    if (!await confirmDialog('Delete this clip?')) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/clips/${clipId}/delete/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setClips(clips.filter(c => c.id !== clipId));
      }
    } catch (error) {
      console.error('Error deleting clip:', error);
    }
  };

  const shareClip = async (clipId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/clips/${clipId}/share/`, {
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
      console.error('Error sharing clip:', error);
    }
  };

  const playClip = (clip) => {
    setPlayingClip(clip.id);
    // Simulate playback
    setTimeout(() => setPlayingClip(null), 3000);
  };

  return (
    <div className="clips-system-overlay" onClick={onClose}>
      <div className="clips-system-modal" onClick={e => e.stopPropagation()}>
        <div className="clips-system-header">
          <h2>🎬 Clips</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="clips-tabs">
          <button
            className={`tab-btn ${activeTab === 'my-clips' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-clips')}
          >
            📁 My Clips
          </button>
          <button
            className={`tab-btn ${activeTab === 'server-clips' ? 'active' : ''}`}
            onClick={() => setActiveTab('server-clips')}
          >
            🎭 Server Clips
          </button>
        </div>

        <div className="clips-system-content">
          {/* Recording Controls */}
          <div className="recording-controls">
            <div className="clip-name-input-wrapper">
              <input
                type="text"
                placeholder="Clip name..."
                value={clipName}
                onChange={(e) => setClipName(e.target.value)}
                className="clip-name-input"
                disabled={recording}
              />
            </div>
            <button
              className={`record-btn ${recording ? 'recording' : ''}`}
              onClick={recording ? null : startClip}
              disabled={recording || !clipName.trim()}
            >
              {recording ? '⏺️ Recording...' : '⏺️ Clip Last 30s'}
            </button>
          </div>

          {/* Clips Grid */}
          {loading ? (
            <div className="loading-spinner">Loading clips...</div>
          ) : clips.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎬</div>
              <h3>No Clips Yet</h3>
              <p>Record your first clip from voice chat</p>
            </div>
          ) : (
            <div className="clips-grid">
              {clips.map(clip => (
                <div key={clip.id} className="clip-card">
                  <div className="clip-thumbnail">
                    <div className="clip-duration">{clip.duration || '0:30'}</div>
                    <button
                      className={`play-clip-btn ${playingClip === clip.id ? 'playing' : ''}`}
                      onClick={() => playClip(clip)}
                    >
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
                        className="share-clip-btn"
                        onClick={() => shareClip(clip.id)}
                        title="Share to Server"
                      >
                        📤
                      </button>
                    )}
                    <button
                      className="download-clip-btn"
                      onClick={() => window.open(clip.url, '_blank')}
                      title="Download"
                    >
                      💾
                    </button>
                    {activeTab === 'my-clips' && (
                      <button
                        className="delete-clip-btn"
                        onClick={() => deleteClip(clip.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClipsSystem;

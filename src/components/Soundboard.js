import { useState, useEffect, useRef, useCallback, memo } from 'react';
import './Soundboard.css';
import confirmDialog from '../utils/confirmDialog';

const Soundboard = ({ serverId, onClose }) => {
  const [sounds, setSounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [soundName, setSoundName] = useState('');
  const [soundFile, setSoundFile] = useState(null);
  const [volume, setVolume] = useState(0.7);
  const [searchQuery, setSearchQuery] = useState('');
  const audioRef = useRef(null);

  const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
  const handleSearchChange = useCallback((e) => setSearchQuery(e.target.value), []);
  const handleVolumeChange = useCallback((e) => setVolume(parseFloat(e.target.value)), []);
  const handleShowUpload = useCallback(() => setShowUploadModal(true), []);
  const handleHideUpload = useCallback(() => setShowUploadModal(false), []);
  const handleSoundNameChange = useCallback((e) => setSoundName(e.target.value), []);
  const handleFileAreaClick = useCallback(() => document.getElementById('sound-file').click(), []);

  useEffect(() => {
    fetchSounds();
  }, [serverId]);

  const fetchSounds = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/soundboard/${serverId}/list/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setSounds(data.sounds || []);
      }
    } catch (error) {
      console.error('Error fetching sounds:', error);
    } finally {
      setLoading(false);
    }
  };

  const playSound = async (soundId, soundUrl) => {
    try {
      // Play locally
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = soundUrl;
        audioRef.current.volume = volume;
        audioRef.current.play();
      }

      // Send to server to broadcast
      const token = localStorage.getItem('access_token');
      await fetch(`/api/soundboard/${serverId}/${soundId}/play/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ volume })
      });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const uploadSound = async () => {
    if (!soundName.trim() || !soundFile) {
      console.error('❌ Please provide sound name and file');
      return;
    }

    const formData = new FormData();
    formData.append('name', soundName);
    formData.append('sound', soundFile);

    try {
      setUploading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/soundboard/${serverId}/upload/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        setShowUploadModal(false);
        setSoundName('');
        setSoundFile(null);
        fetchSounds();
      } else {
        const data = await response.json();
        console.error('❌', data.error || 'Failed to upload sound');
      }
    } catch (error) {
      console.error('Error uploading sound:', error);
    } finally {
      setUploading(false);
    }
  };

  const deleteSound = async (soundId) => {
    if (!await confirmDialog('Delete this sound?')) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/soundboard/${serverId}/${soundId}/delete/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setSounds(sounds.filter(s => s.id !== soundId));
      } else {
        console.error('❌ Failed to delete sound');
      }
    } catch (error) {
      console.error('Error deleting sound:', error);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      console.error('❌ Please select an audio file');
      return;
    }

    // Max 1MB
    if (file.size > 1024 * 1024) {
      console.error('❌ File size must be less than 1MB');
      return;
    }

    setSoundFile(file);
  };

  const filteredSounds = sounds.filter(sound =>
    sound.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="soundboard-overlay" onClick={onClose}>
      <div className="soundboard-modal" onClick={handleStopPropagation}>
        <div className="soundboard-header">
          <h2>🔊 Soundboard</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="soundboard-content">
          {/* Controls */}
          <div className="soundboard-controls">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search sounds..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>

            <div className="volume-control">
              <span className="volume-icon">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
              <span className="volume-value">{Math.round(volume * 100)}%</span>
            </div>

            <button className="upload-sound-btn" onClick={handleShowUpload}>
              ➕ Upload
            </button>
          </div>

          {/* Sounds Grid */}
          {loading ? (
            <div className="loading-spinner">Loading sounds...</div>
          ) : filteredSounds.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔊</div>
              <h3>{searchQuery ? 'No Sounds Found' : 'No Sounds Yet'}</h3>
              <p>{searchQuery ? 'Try a different search term' : 'Upload your first sound effect'}</p>
            </div>
          ) : (
            <div className="sounds-grid">
              {filteredSounds.map(sound => (
                <div key={sound.id} className="sound-card">
                  <button
                    className="sound-play-btn"
                    onClick={() => playSound(sound.id, sound.url)}
                  >
                    ▶️
                  </button>
                  <div className="sound-info">
                    <div className="sound-name">{sound.name}</div>
                    <div className="sound-meta">
                      <span className="sound-duration">{sound.duration || '0:00'}</span>
                      <span className="sound-plays">🔥 {sound.play_count || 0}</span>
                    </div>
                  </div>
                  <button
                    className="delete-sound-btn"
                    onClick={() => deleteSound(sound.id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hidden audio element for playback */}
        <audio ref={audioRef} />

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="upload-modal-overlay" onClick={handleHideUpload}>
            <div className="upload-modal" onClick={handleStopPropagation}>
              <h3>➕ Upload Sound</h3>

              <div className="form-group">
                <label>Sound Name</label>
                <input
                  type="text"
                  value={soundName}
                  onChange={handleSoundNameChange}
                  placeholder="Airhorn"
                  maxLength={32}
                  className="sound-name-input"
                />
              </div>

              <div className="form-group">
                <label>Audio File</label>
                <div className="file-upload-area" onClick={handleFileAreaClick}>
                  {soundFile ? (
                    <div className="file-selected">
                      <div className="file-icon">🎵</div>
                      <p>{soundFile.name}</p>
                      <p className="file-size">{(soundFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  ) : (
                    <>
                      <div className="upload-icon">📤</div>
                      <p>Click to select audio file</p>
                      <p className="upload-hint">MP3, WAV, OGG • Max 1MB • 5 seconds recommended</p>
                    </>
                  )}
                </div>
                <input
                  id="sound-file"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </div>

              <div className="modal-actions">
                <button className="cancel-btn" onClick={handleHideUpload}>
                  Cancel
                </button>
                <button
                  className="upload-btn"
                  onClick={uploadSound}
                  disabled={uploading || !soundName || !soundFile}
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Soundboard);

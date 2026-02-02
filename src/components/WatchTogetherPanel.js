import React, { useState, useEffect } from 'react';
import './WatchTogetherPanel.css';
import { FaYoutube, FaTwitch, FaPlay, FaPause, FaUsers, FaLink } from 'react-icons/fa';

function WatchTogetherPanel({ apiBaseUrl, fetchWithAuth, currentRoomId }) {
  const [videoUrl, setVideoUrl] = useState('');
  const [partyActive, setPartyActive] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (currentRoomId) {
      checkActiveParty();
    }
  }, [currentRoomId]);

  const checkActiveParty = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/adv/watch-party/${currentRoomId}/status/`);
      if (response.ok) {
        const data = await response.json();
        if (data.active) {
          setPartyActive(true);
          setCurrentVideo(data.video);
          setParticipants(data.participants || []);
          setIsPlaying(data.is_playing);
          setCurrentTime(data.current_time);
        }
      }
    } catch (err) {
      console.error('Error checking party status:', err);
    }
  };

  const startWatchParty = async () => {
    if (!videoUrl.trim()) {
      setMessage('❌ Please enter a video URL');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/adv/watch-together/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          room_id: currentRoomId,
          video_url: videoUrl
        })
      });

      if (response.ok) {
        const data = await response.json();
        setPartyActive(true);
        setCurrentVideo(data.video);
        setMessage('✅ Watch party started!');
        setVideoUrl('');
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to start watch party'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const stopWatchParty = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/adv/watch-together/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'stop',
          room_id: currentRoomId
        })
      });

      if (response.ok) {
        setPartyActive(false);
        setCurrentVideo(null);
        setMessage('✅ Watch party ended');
      }
    } catch (err) {
      setMessage('❌ Failed to stop watch party');
    }
  };

  const syncPlayback = async (action, time = null) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/adv/watch-together/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: action,
          room_id: currentRoomId,
          current_time: time
        })
      });

      if (response.ok) {
        if (action === 'play') setIsPlaying(true);
        if (action === 'pause') setIsPlaying(false);
      }
    } catch (err) {
      setMessage('❌ Failed to sync playback');
    }
  };

  const getVideoType = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('twitch.tv')) return 'twitch';
    if (url.includes('vimeo.com')) return 'vimeo';
    return 'other';
  };

  const getVideoIcon = (type) => {
    switch (type) {
      case 'youtube':
        return <FaYoutube style={{ color: '#ff0000' }} />;
      case 'twitch':
        return <FaTwitch style={{ color: '#9146ff' }} />;
      default:
        return <FaPlay />;
    }
  };

  return (
    <div className="watch-together-panel">
      <div className="watch-header">
        <h2><FaYoutube /> Watch Together</h2>
        <p>🎬 Share videos with your friends in real-time</p>
      </div>

      {message && <div className="watch-message">{message}</div>}

      {!partyActive ? (
        <div className="start-party-section">
          <div className="url-input-section">
            <h3><FaLink /> Start a Watch Party</h3>
            <p>Paste a YouTube, Twitch, or Vimeo URL to watch together</p>
            <div className="url-input-group">
              <input
                type="text"
                placeholder="https://youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="url-input"
              />
              <button
                className="start-party-btn"
                onClick={startWatchParty}
                disabled={loading}
              >
                <FaPlay /> {loading ? 'Starting...' : 'Start Party'}
              </button>
            </div>
          </div>

          <div className="platform-suggestions">
            <h4>Supported Platforms</h4>
            <div className="platforms-grid">
              <div className="platform-card youtube">
                <FaYoutube />
                <span>YouTube</span>
              </div>
              <div className="platform-card twitch">
                <FaTwitch />
                <span>Twitch</span>
              </div>
              <div className="platform-card">
                <FaPlay />
                <span>Vimeo</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="active-party">
          <div className="video-section">
            <div className="video-header">
              <div className="video-info">
                {getVideoIcon(getVideoType(currentVideo?.url))}
                <div className="video-details">
                  <h3>{currentVideo?.title || 'Watch Party'}</h3>
                  <span className="video-url">{currentVideo?.url}</span>
                </div>
              </div>
              <button className="end-party-btn" onClick={stopWatchParty}>
                End Party
              </button>
            </div>

            <div className="video-player">
              <div className="player-placeholder">
                <FaPlay className="player-icon" />
                <p>Video player will be embedded here</p>
                <span className="player-note">
                  In production, this would show the actual video player with synchronized playback
                </span>
              </div>
            </div>

            <div className="playback-controls">
              <button
                className="control-btn"
                onClick={() => syncPlayback(isPlaying ? 'pause' : 'play', currentTime)}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <div className="time-display">
                {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          <div className="participants-section">
            <h4><FaUsers /> Watching ({participants.length})</h4>
            <div className="participants-list">
              {participants.map((participant, i) => (
                <div key={i} className="participant-item">
                  <div className="participant-avatar">
                    {participant.avatar ? (
                      <img src={participant.avatar} alt={participant.username} />
                    ) : (
                      <FaUsers />
                    )}
                  </div>
                  <span className="participant-name">{participant.username}</span>
                  {participant.is_host && (
                    <span className="host-badge">HOST</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="features-section">
        <h4>✨ Watch Together Features</h4>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🎬</div>
            <div className="feature-text">
              <strong>Synchronized Playback</strong>
              <span>Everyone watches at the same time</span>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💬</div>
            <div className="feature-text">
              <strong>Live Chat</strong>
              <span>React and comment in real-time</span>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">👥</div>
            <div className="feature-text">
              <strong>Unlimited Viewers</strong>
              <span>Invite anyone to join</span>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎮</div>
            <div className="feature-text">
              <strong>Multiple Platforms</strong>
              <span>YouTube, Twitch, Vimeo & more</span>
            </div>
          </div>
        </div>
      </div>

      <div className="info-box">
        <h4>ℹ️ How to Use</h4>
        <ol>
          <li>Paste a video URL from supported platforms</li>
          <li>Click "Start Party" to begin watching together</li>
          <li>Share the room with friends to invite them</li>
          <li>Use playback controls - everyone syncs automatically</li>
          <li>Chat and react while watching!</li>
        </ol>
      </div>
    </div>
  );
}

export default WatchTogetherPanel;

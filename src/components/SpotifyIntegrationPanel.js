import React, { useState, useEffect } from 'react';
import './SpotifyIntegrationPanel.css';
import { FaSpotify, FaPlay, FaPause, FaMusic, FaUnlink, FaCheck, FaTimes } from 'react-icons/fa';

function SpotifyIntegrationPanel({ apiBaseUrl, fetchWithAuth }) {
  const [connected, setConnected] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [showActivity, setShowActivity] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkSpotifyConnection();
    if (connected) {
      fetchCurrentTrack();
      const interval = setInterval(fetchCurrentTrack, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [connected]);

  const checkSpotifyConnection = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/auth/spotify/status/`);
      if (response.ok) {
        const data = await response.json();
        setConnected(data.connected);
        setShowActivity(data.show_activity);
      }
    } catch (err) {
      console.error('Error checking Spotify connection:', err);
    }
  };

  const connectSpotify = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/auth/spotify/start/`);
      if (response.ok) {
        const data = await response.json();
        // Backend returns 'url', not 'auth_url'
        window.location.href = data.url || data.auth_url;
      }
    } catch (err) {
      setError('Failed to connect: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const disconnectSpotify = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/auth/spotify/disconnect/`, {
        method: 'POST'
      });
      if (response.ok) {
        setConnected(false);
        setCurrentTrack(null);
        setError('');
      }
    } catch (err) {
      setError('Failed to disconnect: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentTrack = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/spotify/current-track/`);
      if (response.ok) {
        const data = await response.json();
        setCurrentTrack(data.track);
      }
    } catch (err) {
      console.error('Error fetching current track:', err);
    }
  };

  const toggleActivityStatus = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/spotify/toggle-activity/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ show_activity: !showActivity })
      });
      if (response.ok) {
        setShowActivity(!showActivity);
      }
    } catch (err) {
      setError('Failed to toggle activity: ' + err.message);
    }
  };

  return (
    <div className="spotify-panel">
      <div className="spotify-header">
        <h2><FaSpotify className="spotify-icon" /> Spotify Integration</h2>
      </div>

      {error && <div className="spotify-error">{error}</div>}

      {!connected ? (
        <div className="spotify-connect">
          <div className="spotify-logo-container">
            <FaSpotify className="spotify-logo" />
          </div>
          <h3>Connect Your Spotify</h3>
          <p>Share what you're listening to with your friends!</p>
          <button
            className="connect-btn"
            onClick={connectSpotify}
            disabled={loading}
          >
            <FaSpotify /> Connect Spotify
          </button>
          <div className="spotify-features">
            <div className="feature-item">
              <FaCheck className="check-icon" />
              <span>Show currently playing track</span>
            </div>
            <div className="feature-item">
              <FaCheck className="check-icon" />
              <span>Display in your status</span>
            </div>
            <div className="feature-item">
              <FaCheck className="check-icon" />
              <span>Privacy controls</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="spotify-connected">
          <div className="connection-status">
            <FaCheck className="status-icon" />
            <span>Connected to Spotify</span>
            <button
              className="disconnect-btn"
              onClick={disconnectSpotify}
              disabled={loading}
            >
              <FaUnlink /> Disconnect
            </button>
          </div>

          <div className="activity-toggle">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={showActivity}
                onChange={toggleActivityStatus}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-text">Show listening activity</span>
            </label>
          </div>

          {currentTrack ? (
            <div className="current-track">
              <div className="track-header">
                <FaMusic className="music-icon" />
                <h3>Now Playing</h3>
              </div>
              <div className="track-info">
                {currentTrack.album_art && (
                  <img
                    src={currentTrack.album_art}
                    alt="Album art"
                    className="album-art"
                  />
                )}
                <div className="track-details">
                  <div className="track-name">{currentTrack.name}</div>
                  <div className="track-artist">{currentTrack.artist}</div>
                  <div className="track-album">{currentTrack.album}</div>
                </div>
                <div className="track-status">
                  {currentTrack.is_playing ? (
                    <FaPlay className="playing-icon" />
                  ) : (
                    <FaPause className="paused-icon" />
                  )}
                </div>
              </div>
              <div className="track-progress">
                <div
                  className="progress-bar"
                  style={{ width: `${currentTrack.progress_percent || 0}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="no-track">
              <FaMusic className="no-track-icon" />
              <p>Not playing anything right now</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SpotifyIntegrationPanel;

import React, { useState, useEffect } from 'react';
import './GoLiveSettings.css';

const GoLiveSettings = ({ serverId, onClose }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isLive, setIsLive] = useState(false);

  // Stream settings
  const [streamTitle, setStreamTitle] = useState('');
  const [streamCategory, setStreamCategory] = useState('gaming');
  const [streamQuality, setStreamQuality] = useState('1080p');
  const [streamFps, setStreamFps] = useState(60);
  const [audioBitrate, setAudioBitrate] = useState(128);
  const [enableChat, setEnableChat] = useState(true);
  const [enableReactions, setEnableReactions] = useState(true);
  const [streamPrivacy, setStreamPrivacy] = useState('server');
  const [allowRecording, setAllowRecording] = useState(true);
  const [showViewerCount, setShowViewerCount] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, [serverId]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/stream/${serverId}/settings/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        
        // Load saved settings
        if (data.settings) {
          setStreamTitle(data.settings.title || '');
          setStreamCategory(data.settings.category || 'gaming');
          setStreamQuality(data.settings.quality || '1080p');
          setStreamFps(data.settings.fps || 60);
          setAudioBitrate(data.settings.audio_bitrate || 128);
          setEnableChat(data.settings.enable_chat !== false);
          setEnableReactions(data.settings.enable_reactions !== false);
          setStreamPrivacy(data.settings.privacy || 'server');
          setAllowRecording(data.settings.allow_recording !== false);
          setShowViewerCount(data.settings.show_viewer_count !== false);
          setEnableNotifications(data.settings.enable_notifications !== false);
        }
        
        setIsLive(data.is_live || false);
      }
    } catch (error) {
      console.error('Error fetching stream settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/stream/${serverId}/settings/update/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: streamTitle,
          category: streamCategory,
          quality: streamQuality,
          fps: streamFps,
          audio_bitrate: audioBitrate,
          enable_chat: enableChat,
          enable_reactions: enableReactions,
          privacy: streamPrivacy,
          allow_recording: allowRecording,
          show_viewer_count: showViewerCount,
          enable_notifications: enableNotifications
        })
      });

      if (response.ok) {
        console.log('✅ Settings saved');
      } else {
        console.error('❌ Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const startStream = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/stream/${serverId}/start/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: streamTitle,
          quality: streamQuality,
          fps: streamFps
        })
      });

      if (response.ok) {
        console.log('✅ Stream started');
        setIsLive(true);
      } else {
        console.error('❌ Failed to start stream');
      }
    } catch (error) {
      console.error('Error starting stream:', error);
    }
  };

  const stopStream = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/stream/${serverId}/stop/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        console.log('✅ Stream stopped');
        setIsLive(false);
      }
    } catch (error) {
      console.error('Error stopping stream:', error);
    }
  };

  if (loading) {
    return (
      <div className="go-live-overlay">
        <div className="go-live-modal">
          <div className="loading-spinner">Loading stream settings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="go-live-overlay" onClick={onClose}>
      <div className="go-live-modal" onClick={e => e.stopPropagation()}>
        <div className="go-live-header">
          <h2>📡 Go Live</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="go-live-content">
          {/* Live Status */}
          <div className={`live-status ${isLive ? 'active' : ''}`}>
            <div className="status-indicator">
              {isLive ? '🔴 LIVE' : '⚫ OFFLINE'}
            </div>
            {isLive && (
              <div className="viewer-stats">
                <span className="viewer-count">👁️ {settings?.viewer_count || 0} viewers</span>
                <span className="stream-duration">⏱️ {settings?.stream_duration || '0:00'}</span>
              </div>
            )}
          </div>

          {/* Stream Settings */}
          <div className="settings-section">
            <h3>📝 Stream Information</h3>
            
            <div className="form-group">
              <label>Stream Title</label>
              <input
                type="text"
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
                placeholder="My awesome stream"
                maxLength={100}
                className="stream-input"
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                value={streamCategory}
                onChange={(e) => setStreamCategory(e.target.value)}
                className="stream-select"
              >
                <option value="gaming">🎮 Gaming</option>
                <option value="music">🎵 Music</option>
                <option value="art">🎨 Art & Design</option>
                <option value="education">📚 Education</option>
                <option value="talk">💬 Just Chatting</option>
                <option value="other">🌟 Other</option>
              </select>
            </div>
          </div>

          {/* Video Settings */}
          <div className="settings-section">
            <h3>🎥 Video Quality</h3>
            
            <div className="quality-grid">
              <div className="form-group">
                <label>Resolution</label>
                <select
                  value={streamQuality}
                  onChange={(e) => setStreamQuality(e.target.value)}
                  className="stream-select"
                >
                  <option value="4k">4K (3840x2160)</option>
                  <option value="1440p">1440p (2560x1440)</option>
                  <option value="1080p">1080p (1920x1080)</option>
                  <option value="720p">720p (1280x720)</option>
                  <option value="480p">480p (854x480)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Frame Rate</label>
                <select
                  value={streamFps}
                  onChange={(e) => setStreamFps(parseInt(e.target.value))}
                  className="stream-select"
                >
                  <option value={60}>60 FPS</option>
                  <option value={30}>30 FPS</option>
                  <option value={24}>24 FPS</option>
                </select>
              </div>

              <div className="form-group">
                <label>Audio Bitrate</label>
                <select
                  value={audioBitrate}
                  onChange={(e) => setAudioBitrate(parseInt(e.target.value))}
                  className="stream-select"
                >
                  <option value={320}>320 kbps (High)</option>
                  <option value={192}>192 kbps (Medium)</option>
                  <option value={128}>128 kbps (Standard)</option>
                  <option value={96}>96 kbps (Low)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy & Features */}
          <div className="settings-section">
            <h3>🔒 Privacy & Features</h3>
            
            <div className="toggles-grid">
              <div className="toggle-item">
                <label>
                  <input
                    type="checkbox"
                    checked={enableChat}
                    onChange={(e) => setEnableChat(e.target.checked)}
                  />
                  <span className="toggle-label">💬 Enable Chat</span>
                </label>
              </div>

              <div className="toggle-item">
                <label>
                  <input
                    type="checkbox"
                    checked={enableReactions}
                    onChange={(e) => setEnableReactions(e.target.checked)}
                  />
                  <span className="toggle-label">❤️ Enable Reactions</span>
                </label>
              </div>

              <div className="toggle-item">
                <label>
                  <input
                    type="checkbox"
                    checked={allowRecording}
                    onChange={(e) => setAllowRecording(e.target.checked)}
                  />
                  <span className="toggle-label">📹 Allow Recording</span>
                </label>
              </div>

              <div className="toggle-item">
                <label>
                  <input
                    type="checkbox"
                    checked={showViewerCount}
                    onChange={(e) => setShowViewerCount(e.target.checked)}
                  />
                  <span className="toggle-label">👁️ Show Viewer Count</span>
                </label>
              </div>

              <div className="toggle-item">
                <label>
                  <input
                    type="checkbox"
                    checked={enableNotifications}
                    onChange={(e) => setEnableNotifications(e.target.checked)}
                  />
                  <span className="toggle-label">🔔 Notify Followers</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Privacy</label>
              <select
                value={streamPrivacy}
                onChange={(e) => setStreamPrivacy(e.target.value)}
                className="stream-select"
              >
                <option value="public">🌍 Public - Anyone can watch</option>
                <option value="server">🏠 Server - Server members only</option>
                <option value="friends">👥 Friends - Friends only</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="go-live-actions">
            <button className="save-settings-btn" onClick={saveSettings} disabled={saving}>
              {saving ? '💾 Saving...' : '💾 Save Settings'}
            </button>
            
            {isLive ? (
              <button className="stop-stream-btn" onClick={stopStream}>
                ⏹️ Stop Stream
              </button>
            ) : (
              <button
                className="start-stream-btn"
                onClick={startStream}
                disabled={!streamTitle.trim()}
              >
                🔴 Go Live
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoLiveSettings;

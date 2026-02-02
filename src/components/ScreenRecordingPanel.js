import React, { useState, useEffect } from 'react';
import './ScreenRecordingPanel.css';
import { FaVideo, FaStop, FaDownload, FaClock, FaDesktop, FaMicrophone } from 'react-icons/fa';

function ScreenRecordingPanel({ apiBaseUrl, fetchWithAuth }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState([]);
  const [includeAudio, setIncludeAudio] = useState(true);
  const [quality, setQuality] = useState('1080p');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/adv/screen-recordings/`);
      if (response.ok) {
        const data = await response.json();
        setRecordings(data.recordings || []);
      }
    } catch (err) {
      console.error('Error loading recordings:', err);
    }
  };

  const startRecording = async () => {
    setLoading(true);
    setMessage('🎬 Starting screen recording...');

    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/adv/screen-recording/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          quality: quality,
          include_audio: includeAudio
        })
      });

      if (response.ok) {
        const data = await response.json();
        setIsRecording(true);
        setRecordingTime(0);
        setMessage('✅ Recording started!');
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to start recording'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const stopRecording = async () => {
    setLoading(true);
    setMessage('⏹️ Stopping recording...');

    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/adv/screen-recording/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'stop'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setIsRecording(false);
        setMessage(`✅ Recording saved! Duration: ${formatTime(recordingTime)}`);
        setRecordingTime(0);
        loadRecordings();
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to stop recording'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  };

  return (
    <div className="screen-recording-panel">
      <div className="recording-header">
        <h2><FaVideo /> Screen Recording</h2>
        <p>🎬 Discord Nitro-style screen capture</p>
      </div>

      {message && <div className="recording-message">{message}</div>}

      <div className="recording-control">
        {!isRecording ? (
          <div className="start-section">
            <div className="settings-grid">
              <div className="setting-group">
                <label>Quality</label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="quality-select"
                >
                  <option value="720p">720p (HD)</option>
                  <option value="1080p">1080p (Full HD)</option>
                  <option value="1440p">1440p (2K)</option>
                  <option value="2160p">2160p (4K)</option>
                </select>
              </div>
              <div className="setting-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={includeAudio}
                    onChange={(e) => setIncludeAudio(e.target.checked)}
                  />
                  <FaMicrophone />
                  <span>Include Audio</span>
                </label>
              </div>
            </div>
            <button
              className="start-btn"
              onClick={startRecording}
              disabled={loading}
            >
              <FaVideo /> {loading ? 'Starting...' : 'Start Recording'}
            </button>
          </div>
        ) : (
          <div className="recording-active">
            <div className="recording-indicator">
              <div className="recording-dot"></div>
              <span>RECORDING</span>
            </div>
            <div className="recording-timer">
              <FaClock />
              <span className="timer-display">{formatTime(recordingTime)}</span>
            </div>
            <button
              className="stop-btn"
              onClick={stopRecording}
              disabled={loading}
            >
              <FaStop /> {loading ? 'Stopping...' : 'Stop Recording'}
            </button>
          </div>
        )}
      </div>

      <div className="recordings-section">
        <h3>📹 Your Recordings</h3>
        {recordings.length === 0 ? (
          <div className="no-recordings">
            <FaDesktop className="empty-icon" />
            <p>No recordings yet. Start your first screen recording!</p>
          </div>
        ) : (
          <div className="recordings-list">
            {recordings.map((recording, index) => (
              <div key={index} className="recording-item">
                <div className="recording-thumb">
                  <FaVideo className="thumb-icon" />
                </div>
                <div className="recording-info">
                  <div className="recording-title">
                    {recording.title || `Recording ${index + 1}`}
                  </div>
                  <div className="recording-meta">
                    <span className="meta-item">
                      <FaClock /> {recording.duration || '00:00:00'}
                    </span>
                    <span className="meta-item">
                      {formatFileSize(recording.size || 0)}
                    </span>
                    <span className="meta-item">
                      {recording.quality || '1080p'}
                    </span>
                    <span className="meta-item">
                      {new Date(recording.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="recording-actions">
                  <a
                    href={recording.download_url}
                    download
                    className="download-btn"
                    title="Download"
                  >
                    <FaDownload />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="recording-info-box">
        <h4>ℹ️ Screen Recording Features</h4>
        <ul>
          <li><strong>High Quality:</strong> Record up to 4K resolution</li>
          <li><strong>Audio Support:</strong> Include system audio and microphone</li>
          <li><strong>No Time Limit:</strong> Record as long as you need (Premium)</li>
          <li><strong>Instant Upload:</strong> Recordings are automatically saved</li>
          <li><strong>Share Anywhere:</strong> Download and share your recordings</li>
        </ul>
      </div>

      <div className="premium-notice">
        <h4>⭐ Premium Feature</h4>
        <p>
          Screen recording is a premium feature. Upgrade to PAWSCORD Premium to unlock:
        </p>
        <ul>
          <li>Unlimited recording time</li>
          <li>4K resolution support</li>
          <li>Advanced editing tools</li>
          <li>Cloud storage for recordings</li>
        </ul>
      </div>
    </div>
  );
}

export default ScreenRecordingPanel;

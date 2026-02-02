import React, { useState, useEffect } from 'react';
import './CatAvatarsSyncPanel.css';
import { FaCat, FaSyncAlt, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';

function CatAvatarsSyncPanel({ apiBaseUrl, fetchWithAuth }) {
  const [syncStatus, setSyncStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadSyncStatus();
  }, []);

  const loadSyncStatus = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/admin/cat-avatars/status/`);
      if (response.ok) {
        const data = await response.json();
        setSyncStatus(data);
      }
    } catch (err) {
      console.error('Error loading sync status:', err);
    }
  };

  const syncAvatars = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/admin/sync-cat-avatars/`, {
        method: 'POST'
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
        setMessage(`✅ Sync complete! ${data.synced || 0} avatars synced`);
        loadSyncStatus();
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Sync failed'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="status-icon success" />;
      case 'in_progress':
        return <FaClock className="status-icon pending" />;
      case 'failed':
        return <FaExclamationTriangle className="status-icon error" />;
      default:
        return null;
    }
  };

  return (
    <div className="cat-avatars-sync-panel">
      <div className="sync-header">
        <h2><FaCat /> Cat Avatars Sync</h2>
      </div>

      {message && <div className="sync-message">{message}</div>}

      {syncStatus && (
        <div className="sync-status">
          <div className="status-card">
            {getStatusIcon(syncStatus.status)}
            <div className="status-info">
              <h3>Last Sync Status</h3>
              <div className="status-text">{syncStatus.status}</div>
              <div className="status-time">
                {syncStatus.last_sync ? new Date(syncStatus.last_sync).toLocaleString() : 'Never'}
              </div>
            </div>
          </div>
          
          <div className="sync-stats-grid">
            <div className="stat-box">
              <div className="stat-label">Total Avatars</div>
              <div className="stat-value">{syncStatus.total_avatars || 0}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Active</div>
              <div className="stat-value active">{syncStatus.active_avatars || 0}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Pending</div>
              <div className="stat-value pending">{syncStatus.pending || 0}</div>
            </div>
          </div>
        </div>
      )}

      <div className="sync-action">
        <button
          className="sync-btn"
          onClick={syncAvatars}
          disabled={loading}
        >
          <FaSyncAlt className={loading ? 'spinning' : ''} />
          {loading ? 'Syncing...' : 'Sync Cat Avatars'}
        </button>
        <p className="sync-description">
          This will download and sync all cat avatar images from the configured source.
          Existing avatars will be updated if changed.
        </p>
      </div>

      {stats && (
        <div className="sync-results">
          <h3>📊 Sync Results</h3>
          <div className="results-grid">
            <div className="result-item">
              <span className="result-label">Synced:</span>
              <span className="result-value success">{stats.synced || 0}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Updated:</span>
              <span className="result-value info">{stats.updated || 0}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Failed:</span>
              <span className="result-value error">{stats.failed || 0}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Duration:</span>
              <span className="result-value">{stats.duration || '0s'}</span>
            </div>
          </div>
          {stats.errors && stats.errors.length > 0 && (
            <div className="error-list">
              <h4>⚠️ Errors:</h4>
              <ul>
                {stats.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="info-box">
        <h4>ℹ️ Avatar Sync Information</h4>
        <ul>
          <li>Cat avatars are fetched from the configured CDN or local storage</li>
          <li>Sync happens automatically every 24 hours</li>
          <li>Manual sync can be triggered anytime using the button above</li>
          <li>Avatars are cached for better performance</li>
          <li>Failed syncs will be retried automatically</li>
        </ul>
      </div>
    </div>
  );
}

export default CatAvatarsSyncPanel;

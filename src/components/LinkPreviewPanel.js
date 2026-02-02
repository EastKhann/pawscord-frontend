import React, { useState } from 'react';
import './LinkPreviewPanel.css';
import { FaLink, FaSync, FaChartLine, FaExternalLinkAlt } from 'react-icons/fa';

function LinkPreviewPanel({ apiBaseUrl, fetchWithAuth }) {
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadPreview = async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetchWithAuth(
        `${apiBaseUrl}/api/link_preview/cache/get/?url=${encodeURIComponent(url)}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setPreview(data.preview);
        setError('');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to load preview');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshPreview = async () => {
    if (!url.trim()) return;

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/link_preview/cache/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (response.ok) {
        const data = await response.json();
        setPreview(data.preview);
        setError('');
      }
    } catch (err) {
      setError('Failed to refresh: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    if (!url.trim()) return;

    try {
      const response = await fetchWithAuth(
        `${apiBaseUrl}/api/links/stats/?url=${encodeURIComponent(url)}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const recordClick = async (linkUrl) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/api/links/click/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: linkUrl })
      });
      loadStats();
    } catch (err) {
      console.error('Failed to record click:', err);
    }
  };

  return (
    <div className="link-preview-panel">
      <div className="link-header">
        <h2><FaLink /> Link Preview & Analytics</h2>
      </div>

      {error && <div className="link-error">{error}</div>}

      <div className="url-input-section">
        <div className="url-input-group">
          <input
            type="url"
            placeholder="Enter URL to preview..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && loadPreview()}
            className="url-input"
          />
          <button className="preview-btn" onClick={loadPreview} disabled={loading}>
            {loading ? '...' : <><FaLink /> Preview</>}
          </button>
          {preview && (
            <button className="refresh-btn" onClick={refreshPreview} disabled={loading}>
              <FaSync />
            </button>
          )}
          {url && (
            <button className="stats-btn" onClick={loadStats}>
              <FaChartLine />
            </button>
          )}
        </div>
      </div>

      {preview && (
        <div className="preview-card">
          <div className="preview-content">
            {preview.image && (
              <div className="preview-image">
                <img src={preview.image} alt={preview.title} />
              </div>
            )}
            <div className="preview-text">
              <h3 className="preview-title">{preview.title || 'No Title'}</h3>
              {preview.description && (
                <p className="preview-description">{preview.description}</p>
              )}
              <div className="preview-meta">
                <span className="preview-domain">
                  {new URL(url).hostname}
                </span>
                {preview.site_name && (
                  <span className="preview-site">{preview.site_name}</span>
                )}
                {preview.type && (
                  <span className="preview-type">{preview.type}</span>
                )}
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="preview-link"
                onClick={() => recordClick(url)}
              >
                <FaExternalLinkAlt /> Visit Link
              </a>
            </div>
          </div>
        </div>
      )}

      {stats && (
        <div className="stats-card">
          <h3><FaChartLine /> Click Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{stats.total_clicks || 0}</div>
              <div className="stat-label">Total Clicks</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.unique_users || 0}</div>
              <div className="stat-label">Unique Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.last_clicked || 'Never'}</div>
              <div className="stat-label">Last Clicked</div>
            </div>
          </div>
          {stats.recent_clicks && stats.recent_clicks.length > 0 && (
            <div className="recent-clicks">
              <h4>Recent Clicks:</h4>
              <ul>
                {stats.recent_clicks.map((click, idx) => (
                  <li key={idx}>
                    <span>{click.username}</span>
                    <span>{new Date(click.clicked_at).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="link-info">
        <h4>💡 Link Preview Features</h4>
        <ul>
          <li>Automatically generates rich previews for URLs</li>
          <li>Caches previews for faster loading</li>
          <li>Tracks click statistics and analytics</li>
          <li>Refresh button updates cached preview data</li>
        </ul>
      </div>
    </div>
  );
}

export default LinkPreviewPanel;

import React, { useState, useEffect } from 'react';
import './DownloadPagesPanel.css';
import { FaDownload, FaWindows, FaApple, FaLinux, FaAndroid } from 'react-icons/fa';

function DownloadPagesPanel({ apiBaseUrl, fetchWithAuth }) {
  const [downloads, setDownloads] = useState({});
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = async () => {
    setLoading(true);
    try {
      const latestResponse = await fetchWithAuth(`${apiBaseUrl}/download/latest/`);
      const androidResponse = await fetchWithAuth(`${apiBaseUrl}/download/android/`);
      
      if (latestResponse.ok && androidResponse.ok) {
        const latest = await latestResponse.json();
        const android = await androidResponse.json();
        
        setDownloads({
          windows: latest.windows,
          mac: latest.mac,
          linux: latest.linux,
          android: android
        });
        
        setStats(latest.stats || {});
      }
    } catch (err) {
      console.error('Error loading downloads:', err);
    } finally {
      setLoading(false);
    }
  };

  const platforms = [
    { id: 'windows', name: 'Windows', icon: <FaWindows />, color: '#00A4EF' },
    { id: 'mac', name: 'macOS', icon: <FaApple />, color: '#A3AAAE' },
    { id: 'linux', name: 'Linux', icon: <FaLinux />, color: '#FCC624' },
    { id: 'android', name: 'Android', icon: <FaAndroid />, color: '#3DDC84' }
  ];

  return (
    <div className="download-pages-panel">
      <div className="download-header">
        <h2><FaDownload /> Download PAWSCORD</h2>
      </div>

      {loading ? (
        <div className="loading">Loading downloads...</div>
      ) : (
        <div className="platforms-grid">
          {platforms.map(platform => {
            const downloadInfo = downloads[platform.id];
            return (
              <div key={platform.id} className="platform-card" style={{ borderTopColor: platform.color }}>
                <div className="platform-icon" style={{ color: platform.color }}>
                  {platform.icon}
                </div>
                <h3>{platform.name}</h3>
                {downloadInfo ? (
                  <>
                    <div className="version">v{downloadInfo.version}</div>
                    <div className="release-date">
                      Released: {new Date(downloadInfo.release_date).toLocaleDateString()}
                    </div>
                    <a
                      href={downloadInfo.download_url}
                      className="download-btn"
                      style={{ background: platform.color }}
                      download
                    >
                      <FaDownload /> Download
                    </a>
                    {downloadInfo.size && (
                      <div className="file-size">{downloadInfo.size}</div>
                    )}
                  </>
                ) : (
                  <div className="coming-soon">Coming Soon</div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {stats && Object.keys(stats).length > 0 && (
        <div className="download-stats">
          <h3>📊 Download Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.total_downloads || 0}</div>
              <div className="stat-label">Total Downloads</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.this_month || 0}</div>
              <div className="stat-label">This Month</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.today || 0}</div>
              <div className="stat-label">Today</div>
            </div>
          </div>
        </div>
      )}

      <div className="system-requirements">
        <h3>💻 System Requirements</h3>
        <div className="requirements-grid">
          <div className="req-card">
            <h4>Windows</h4>
            <ul>
              <li>Windows 10/11 (64-bit)</li>
              <li>4 GB RAM minimum</li>
              <li>500 MB disk space</li>
            </ul>
          </div>
          <div className="req-card">
            <h4>macOS</h4>
            <ul>
              <li>macOS 11 Big Sur or later</li>
              <li>4 GB RAM minimum</li>
              <li>500 MB disk space</li>
            </ul>
          </div>
          <div className="req-card">
            <h4>Linux</h4>
            <ul>
              <li>Ubuntu 20.04+ or equivalent</li>
              <li>4 GB RAM minimum</li>
              <li>500 MB disk space</li>
            </ul>
          </div>
          <div className="req-card">
            <h4>Android</h4>
            <ul>
              <li>Android 8.0 Oreo or later</li>
              <li>2 GB RAM minimum</li>
              <li>200 MB storage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadPagesPanel;

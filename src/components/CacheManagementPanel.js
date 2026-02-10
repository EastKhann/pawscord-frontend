import React, { useState, useEffect } from 'react';
import './CacheManagementPanel.css';
import { FaRocket, FaDatabase, FaTrash, FaChartBar, FaServer, FaUsers, FaComments } from 'react-icons/fa';
import confirmDialog from '../utils/confirmDialog';

function CacheManagementPanel({ apiBaseUrl, fetchWithAuth }) {
  const [stats, setStats] = useState(null);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadStats();
    loadHealth();
  }, []);

  const loadStats = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/cache/stats/`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const loadHealth = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/cache/health/`);
      if (response.ok) {
        const data = await response.json();
        setHealth(data);
      }
    } catch (err) {
      console.error('Error loading health:', err);
    }
  };

  const clearAllCache = async () => {
    if (!await confirmDialog('Clear all cache? This may slow down the app temporarily.')) return;
    
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/cache/clear-all/`, {
        method: 'POST'
      });
      if (response.ok) {
        setMessage('✅ All cache cleared successfully!');
        loadStats();
        loadHealth();
      }
    } catch (err) {
      setMessage('❌ Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearUserCache = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/cache/user/clear/`, {
        method: 'POST'
      });
      if (response.ok) {
        setMessage('✅ User cache cleared!');
        loadStats();
      }
    } catch (err) {
      setMessage('❌ Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const optimizeDatabase = async () => {
    if (!await confirmDialog('Optimize database? This may take a few seconds.')) return;
    
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/cache/database/optimize/`, {
        method: 'POST'
      });
      if (response.ok) {
        const data = await response.json();
        setMessage(`✅ Database optimized! ${data.freed_space || 'Some space'} freed.`);
        loadHealth();
      }
    } catch (err) {
      setMessage('❌ Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const getHealthColor = (status) => {
    if (status === 'healthy') return '#43b581';
    if (status === 'warning') return '#faa61a';
    return '#f04747';
  };

  return (
    <div className="cache-management-panel">
      <div className="cache-header">
        <h2><FaRocket /> Cache Management</h2>
      </div>

      {message && <div className="cache-message">{message}</div>}

      {health && (
        <div className="health-section">
          <h3><FaChartBar /> System Health</h3>
          <div className="health-grid">
            <div className="health-card">
              <div className="health-status" style={{ background: getHealthColor(health.status) }}>
                {health.status?.toUpperCase() || 'UNKNOWN'}
              </div>
              <div className="health-label">Overall Status</div>
            </div>
            <div className="health-card">
              <div className="health-value">{health.hit_rate || '0%'}</div>
              <div className="health-label">Cache Hit Rate</div>
            </div>
            <div className="health-card">
              <div className="health-value">{formatBytes(health.memory_usage)}</div>
              <div className="health-label">Memory Usage</div>
            </div>
            <div className="health-card">
              <div className="health-value">{health.response_time || '0ms'}</div>
              <div className="health-label">Avg Response Time</div>
            </div>
          </div>
        </div>
      )}

      {stats && (
        <div className="stats-section">
          <h3><FaDatabase /> Cache Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <FaUsers className="stat-icon users" />
              <div className="stat-value">{stats.user_cache_count || 0}</div>
              <div className="stat-label">Users Cached</div>
              <div className="stat-size">{formatBytes(stats.user_cache_size)}</div>
            </div>
            <div className="stat-card">
              <FaServer className="stat-icon servers" />
              <div className="stat-value">{stats.server_cache_count || 0}</div>
              <div className="stat-label">Servers Cached</div>
              <div className="stat-size">{formatBytes(stats.server_cache_size)}</div>
            </div>
            <div className="stat-card">
              <FaComments className="stat-icon messages" />
              <div className="stat-value">{stats.message_cache_count || 0}</div>
              <div className="stat-label">Messages Cached</div>
              <div className="stat-size">{formatBytes(stats.message_cache_size)}</div>
            </div>
            <div className="stat-card">
              <FaDatabase className="stat-icon total" />
              <div className="stat-value">{stats.total_cache_count || 0}</div>
              <div className="stat-label">Total Items</div>
              <div className="stat-size">{formatBytes(stats.total_cache_size)}</div>
            </div>
          </div>
        </div>
      )}

      <div className="actions-section">
        <h3><FaTrash /> Cache Actions</h3>
        <div className="action-buttons">
          <button 
            className="action-btn user"
            onClick={clearUserCache}
            disabled={loading}
          >
            <FaUsers /> Clear User Cache
          </button>
          <button 
            className="action-btn database"
            onClick={optimizeDatabase}
            disabled={loading}
          >
            <FaDatabase /> Optimize Database
          </button>
          <button 
            className="action-btn danger"
            onClick={clearAllCache}
            disabled={loading}
          >
            <FaTrash /> Clear All Cache
          </button>
        </div>
      </div>

      <div className="cache-info">
        <h4>💡 About Cache Management</h4>
        <ul>
          <li><strong>User Cache:</strong> Clears profile data, settings, and preferences</li>
          <li><strong>Optimize Database:</strong> Runs VACUUM and analyzes query performance</li>
          <li><strong>Clear All:</strong> Removes all cached data (may slow down app temporarily)</li>
        </ul>
      </div>
    </div>
  );
}

export default CacheManagementPanel;

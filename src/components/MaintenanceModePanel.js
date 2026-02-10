import React, { useState, useEffect } from 'react';
import './MaintenanceModePanel.css';
import { FaTools, FaPowerOff, FaClock, FaBroadcastTower } from 'react-icons/fa';
import confirmDialog from '../utils/confirmDialog';

function MaintenanceModePanel({ apiBaseUrl, fetchWithAuth }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [message, setMessage] = useState('');
  const [estimatedDuration, setEstimatedDuration] = useState('');
  const [allowAdmins, setAllowAdmins] = useState(true);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/maintenance/status/`);
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
        setIsEnabled(data.is_active || false);
        setMessage(data.message || '');
        setEstimatedDuration(data.estimated_duration || '');
        setAllowAdmins(data.allow_admins !== false);
      }
    } catch (err) {
      console.error('Error loading status:', err);
    }
  };

  const toggleMaintenance = async () => {
    if (isEnabled && !await confirmDialog('Disable maintenance mode? Users will regain access.')) {
      return;
    }
    
    if (!isEnabled && !await confirmDialog('Enable maintenance mode? Regular users will be locked out!')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/maintenance/set/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enabled: !isEnabled,
          message: message || 'We are currently performing maintenance. Please check back soon.',
          estimated_duration: estimatedDuration || null,
          allow_admins: allowAdmins
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAlertMessage(data.enabled ? '🔒 Maintenance mode ENABLED' : '✅ Maintenance mode DISABLED');
        loadStatus();
      } else {
        const data = await response.json();
        setAlertMessage(`❌ Error: ${data.error || 'Failed to toggle maintenance mode'}`);
      }
    } catch (err) {
      setAlertMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="maintenance-mode-panel">
      <div className="maintenance-header">
        <h2><FaTools /> Maintenance Mode</h2>
      </div>

      {alertMessage && <div className="maintenance-alert">{alertMessage}</div>}

      <div className="status-card">
        <div className={`status-indicator ${isEnabled ? 'active' : 'inactive'}`}>
          <div className="indicator-icon">
            {isEnabled ? <FaBroadcastTower /> : <FaPowerOff />}
          </div>
          <div className="indicator-text">
            <div className="indicator-label">Current Status</div>
            <div className="indicator-value">
              {isEnabled ? 'MAINTENANCE MODE ACTIVE' : 'SYSTEM OPERATIONAL'}
            </div>
            {status && status.activated_at && isEnabled && (
              <div className="indicator-meta">
                Active since {new Date(status.activated_at).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3><FaTools /> Maintenance Settings</h3>
        <div className="settings-form">
          <div className="form-group">
            <label>User Message:</label>
            <textarea
              placeholder="Message to display to users during maintenance..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-textarea"
              rows={4}
              maxLength={500}
            />
            <div className="char-count">{message.length}/500</div>
          </div>

          <div className="form-group">
            <label>Estimated Duration:</label>
            <div className="duration-input">
              <FaClock className="duration-icon" />
              <input
                type="text"
                placeholder="e.g., 2 hours, 30 minutes, etc."
                value={estimatedDuration}
                onChange={(e) => setEstimatedDuration(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={allowAdmins}
                onChange={(e) => setAllowAdmins(e.target.checked)}
              />
              <span>Allow Admins to Access During Maintenance</span>
            </label>
          </div>

          <button
            className={`toggle-btn ${isEnabled ? 'disable' : 'enable'}`}
            onClick={toggleMaintenance}
            disabled={loading}
          >
            {loading ? 'Processing...' : (
              <>
                {isEnabled ? <FaPowerOff /> : <FaBroadcastTower />}
                {isEnabled ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
              </>
            )}
          </button>
        </div>
      </div>

      <div className="info-section">
        <h4>ℹ️ About Maintenance Mode</h4>
        <ul>
          <li><strong>Regular Users:</strong> Blocked from accessing the app with custom message</li>
          <li><strong>Admins:</strong> Can still access if "Allow Admins" is enabled</li>
          <li><strong>Use Cases:</strong> Database migrations, server updates, critical bug fixes</li>
          <li><strong>Best Practice:</strong> Always provide an estimated duration to users</li>
        </ul>
      </div>

      {status && status.maintenance_history && status.maintenance_history.length > 0 && (
        <div className="history-section">
          <h3><FaClock /> Recent Maintenance Events</h3>
          <div className="history-list">
            {status.maintenance_history.map((event, idx) => (
              <div key={idx} className="history-item">
                <div className="history-date">{new Date(event.started_at).toLocaleString()}</div>
                <div className="history-duration">Duration: {event.duration}</div>
                {event.reason && <div className="history-reason">{event.reason}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MaintenanceModePanel;

import React, { useState, useEffect } from 'react';
import './AdvancedModerationPanel.css';
import confirmDialog from './utils/confirmDialog';

/**
 * AdvancedModerationPanel Component
 * Advanced moderation tools for server management
 * @component
 */
const AdvancedModerationPanel = ({ serverId, onClose }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [timeoutDuration, setTimeoutDuration] = useState(60);
  const [timeoutReason, setTimeoutReason] = useState('');
  const [massActionType, setMassActionType] = useState('');
  const [massActionCriteria, setMassActionCriteria] = useState('');
  const [warnings, setWarnings] = useState([]);
  const [raidProtection, setRaidProtection] = useState(false);
  const [raidSettings, setRaidSettings] = useState({
    threshold: 10,
    timeWindow: 60,
    action: 'kick'
  });
  const [moderationLogs, setModerationLogs] = useState([]);
  const [automodRules, setAutomodRules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchModerationData();
  }, [serverId]);

  /**
   * Fetch moderation data
   */
  const fetchModerationData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchWarnings(),
        fetchRaidSettings(),
        fetchModerationLogs(),
        fetchAutomodRules()
      ]);
    } catch (err) {
      console.error('Failed to fetch moderation data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch warning history
   */
  const fetchWarnings = async () => {
    try {
      const response = await fetch(`/api/moderation/warnings/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setWarnings(data.warnings || []);
      }
    } catch (err) {
      console.error('Failed to fetch warnings:', err);
    }
  };

  /**
   * Fetch raid protection settings
   */
  const fetchRaidSettings = async () => {
    try {
      const response = await fetch(`/api/moderation/raid-protection/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRaidProtection(data.enabled || false);
        if (data.settings) {
          setRaidSettings(data.settings);
        }
      }
    } catch (err) {
      console.error('Failed to fetch raid settings:', err);
    }
  };

  /**
   * Fetch moderation logs
   */
  const fetchModerationLogs = async () => {
    try {
      const response = await fetch(`/api/moderation/logs/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setModerationLogs(data.logs || []);
      }
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    }
  };

  /**
   * Fetch automod rules
   */
  const fetchAutomodRules = async () => {
    try {
      const response = await fetch(`/api/moderation/automod/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAutomodRules(data.rules || []);
      }
    } catch (err) {
      console.error('Failed to fetch automod rules:', err);
    }
  };

  /**
   * Timeout user
   */
  const timeoutUser = async () => {
    if (!selectedUser) {
      showToast('Please select a user', 'error');
      return;
    }

    try {
      const response = await fetch('/api/moderation/timeout/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          server_id: serverId,
          user_id: selectedUser.id,
          duration: timeoutDuration,
          reason: timeoutReason
        })
      });

      if (response.ok) {
        showToast(`${selectedUser.username} timed out for ${timeoutDuration} minutes`, 'success');
        setSelectedUser(null);
        setTimeoutDuration(60);
        setTimeoutReason('');
        fetchModerationLogs();
      } else {
        throw new Error('Timeout failed');
      }
    } catch (err) {
      console.error('Failed to timeout user:', err);
      showToast('Failed to timeout user', 'error');
    }
  };

  /**
   * Execute mass action
   */
  const executeMassAction = async () => {
    if (!massActionType || !massActionCriteria) {
      showToast('Please select action type and criteria', 'error');
      return;
    }

    if (!await confirmDialog(`Execute mass ${massActionType}? This cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch('/api/moderation/mass-action/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          server_id: serverId,
          action: massActionType,
          criteria: massActionCriteria
        })
      });

      if (response.ok) {
        const data = await response.json();
        showToast(`Mass action completed: ${data.affected_count} users affected`, 'success');
        setMassActionType('');
        setMassActionCriteria('');
        fetchModerationLogs();
      } else {
        throw new Error('Mass action failed');
      }
    } catch (err) {
      console.error('Failed to execute mass action:', err);
      showToast('Failed to execute mass action', 'error');
    }
  };

  /**
   * Toggle raid protection
   */
  const toggleRaidProtection = async () => {
    try {
      const response = await fetch('/api/moderation/raid-protection/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          server_id: serverId,
          enabled: !raidProtection,
          settings: raidSettings
        })
      });

      if (response.ok) {
        setRaidProtection(!raidProtection);
        showToast(`Raid protection ${!raidProtection ? 'enabled' : 'disabled'}`, 'success');
      } else {
        throw new Error('Failed to toggle raid protection');
      }
    } catch (err) {
      console.error('Failed to toggle raid protection:', err);
      showToast('Failed to update raid protection', 'error');
    }
  };

  /**
   * Update raid settings
   */
  const updateRaidSettings = async () => {
    try {
      const response = await fetch('/api/moderation/raid-protection/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          server_id: serverId,
          enabled: raidProtection,
          settings: raidSettings
        })
      });

      if (response.ok) {
        showToast('Raid settings updated', 'success');
      }
    } catch (err) {
      console.error('Failed to update raid settings:', err);
      showToast('Failed to update settings', 'error');
    }
  };

  /**
   * Issue warning to user
   */
  const issueWarning = async (userId, reason) => {
    try {
      const response = await fetch('/api/moderation/warning/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          server_id: serverId,
          user_id: userId,
          reason: reason
        })
      });

      if (response.ok) {
        showToast('Warning issued', 'success');
        fetchWarnings();
        fetchModerationLogs();
      }
    } catch (err) {
      console.error('Failed to issue warning:', err);
      showToast('Failed to issue warning', 'error');
    }
  };

  /**
   * Clear user warnings
   */
  const clearWarnings = async (userId) => {
    if (!await confirmDialog('Clear all warnings for this user?')) return;

    try {
      const response = await fetch(`/api/moderation/warning/${userId}/clear/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ server_id: serverId })
      });

      if (response.ok) {
        showToast('Warnings cleared', 'success');
        fetchWarnings();
      }
    } catch (err) {
      console.error('Failed to clear warnings:', err);
      showToast('Failed to clear warnings', 'error');
    }
  };

  /**
   * Show toast notification
   */
  const showToast = (message, type) => {
  };

  /**
   * Format duration in minutes to readable format
   */
  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="advanced-moderation-panel">
      <div className="panel-header">
        <h2>
          <i className="fas fa-shield-alt"></i>
          Advanced Moderation
        </h2>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="panel-content">
        {/* User Timeout Section */}
        <div className="mod-section">
          <h3>
            <i className="fas fa-user-clock"></i>
            User Timeout
          </h3>
          <div className="timeout-controls">
            <div className="form-group">
              <label>Select User</label>
              <input
                type="text"
                className="user-search"
                placeholder="Search user..."
                onChange={(e) => {
                  // In real app, this would search users
                  setSelectedUser({ id: 1, username: e.target.value });
                }}
              />
              {selectedUser && (
                <div className="selected-user">
                  <i className="fas fa-user"></i>
                  {selectedUser.username}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Duration (minutes)</label>
              <div className="duration-presets">
                {[5, 15, 30, 60, 120, 1440].map(mins => (
                  <button
                    key={mins}
                    className={`preset-btn ${timeoutDuration === mins ? 'active' : ''}`}
                    onClick={() => setTimeoutDuration(mins)}
                  >
                    {formatDuration(mins)}
                  </button>
                ))}
              </div>
              <input
                type="number"
                className="duration-input"
                value={timeoutDuration}
                onChange={(e) => setTimeoutDuration(parseInt(e.target.value))}
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Reason (Optional)</label>
              <textarea
                className="reason-input"
                placeholder="Reason for timeout..."
                value={timeoutReason}
                onChange={(e) => setTimeoutReason(e.target.value)}
              />
            </div>

            <button className="btn-timeout" onClick={timeoutUser}>
              <i className="fas fa-clock"></i>
              Apply Timeout
            </button>
          </div>
        </div>

        {/* Mass Moderation Section */}
        <div className="mod-section">
          <h3>
            <i className="fas fa-users-cog"></i>
            Mass Moderation
          </h3>
          <div className="mass-action-controls">
            <div className="form-group">
              <label>Action Type</label>
              <select
                className="action-select"
                value={massActionType}
                onChange={(e) => setMassActionType(e.target.value)}
              >
                <option value="">Select action...</option>
                <option value="kick">Kick Users</option>
                <option value="ban">Ban Users</option>
                <option value="remove_role">Remove Role</option>
                <option value="add_role">Add Role</option>
              </select>
            </div>

            <div className="form-group">
              <label>Criteria</label>
              <select
                className="criteria-select"
                value={massActionCriteria}
                onChange={(e) => setMassActionCriteria(e.target.value)}
              >
                <option value="">Select criteria...</option>
                <option value="no_avatar">No Avatar</option>
                <option value="new_members">New Members (7 days)</option>
                <option value="inactive">Inactive (30+ days)</option>
                <option value="no_roles">No Roles</option>
              </select>
            </div>

            <button 
              className="btn-mass-action"
              onClick={executeMassAction}
              disabled={!massActionType || !massActionCriteria}
            >
              <i className="fas fa-bolt"></i>
              Execute Mass Action
            </button>

            <div className="warning-box">
              <i className="fas fa-exclamation-triangle"></i>
              <span>Mass actions affect multiple users. Use with caution!</span>
            </div>
          </div>
        </div>

        {/* Raid Protection Section */}
        <div className="mod-section">
          <h3>
            <i className="fas fa-shield-virus"></i>
            Raid Protection
          </h3>
          <div className="raid-protection-controls">
            <div className="toggle-container">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={raidProtection}
                  onChange={toggleRaidProtection}
                />
                <span className="slider"></span>
              </label>
              <span className="toggle-label">
                Raid Protection {raidProtection ? 'Enabled' : 'Disabled'}
              </span>
            </div>

            {raidProtection && (
              <div className="raid-settings">
                <div className="form-group">
                  <label>Join Threshold</label>
                  <input
                    type="number"
                    className="settings-input"
                    value={raidSettings.threshold}
                    onChange={(e) => setRaidSettings({
                      ...raidSettings,
                      threshold: parseInt(e.target.value)
                    })}
                    min="5"
                  />
                  <span className="input-hint">users joining within time window</span>
                </div>

                <div className="form-group">
                  <label>Time Window (seconds)</label>
                  <input
                    type="number"
                    className="settings-input"
                    value={raidSettings.timeWindow}
                    onChange={(e) => setRaidSettings({
                      ...raidSettings,
                      timeWindow: parseInt(e.target.value)
                    })}
                    min="10"
                  />
                </div>

                <div className="form-group">
                  <label>Action on Detection</label>
                  <select
                    className="settings-select"
                    value={raidSettings.action}
                    onChange={(e) => setRaidSettings({
                      ...raidSettings,
                      action: e.target.value
                    })}
                  >
                    <option value="kick">Kick</option>
                    <option value="ban">Ban</option>
                    <option value="timeout">Timeout</option>
                  </select>
                </div>

                <button className="btn-save-settings" onClick={updateRaidSettings}>
                  <i className="fas fa-save"></i>
                  Save Settings
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Warning History Section */}
        <div className="mod-section">
          <h3>
            <i className="fas fa-exclamation-circle"></i>
            Warning History
          </h3>
          <div className="warnings-list">
            {warnings.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-check-circle"></i>
                <p>No warnings issued</p>
              </div>
            ) : (
              warnings.map((warning) => (
                <div key={warning.id} className="warning-item">
                  <div className="warning-header">
                    <div className="warning-user">
                      <i className="fas fa-user"></i>
                      {warning.user?.username}
                    </div>
                    <div className="warning-count">
                      {warning.count} warning{warning.count > 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="warning-details">
                    <div className="warning-reason">{warning.latest_reason}</div>
                    <div className="warning-time">
                      {new Date(warning.latest_date).toLocaleString()}
                    </div>
                  </div>
                  <button 
                    className="btn-clear-warnings"
                    onClick={() => clearWarnings(warning.user?.id)}
                  >
                    Clear
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Moderation Logs Section */}
        <div className="mod-section">
          <h3>
            <i className="fas fa-clipboard-list"></i>
            Moderation Logs
          </h3>
          <div className="logs-list">
            {moderationLogs.slice(0, 20).map((log) => (
              <div key={log.id} className="log-item">
                <div className="log-icon">
                  <i className={`fas fa-${getLogIcon(log.action)}`}></i>
                </div>
                <div className="log-content">
                  <div className="log-action">{log.action}</div>
                  <div className="log-details">
                    {log.moderator?.username} → {log.target?.username}
                    {log.reason && ` - ${log.reason}`}
                  </div>
                  <div className="log-time">
                    {new Date(log.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Get icon for log action
 */
const getLogIcon = (action) => {
  const icons = {
    'timeout': 'clock',
    'kick': 'door-open',
    'ban': 'ban',
    'warn': 'exclamation-triangle',
    'unban': 'check',
    'role_add': 'plus',
    'role_remove': 'minus'
  };
  return icons[action] || 'info-circle';
};

export default AdvancedModerationPanel;

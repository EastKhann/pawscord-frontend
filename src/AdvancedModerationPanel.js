import './AdvancedModerationPanel.css';
import useAdvancedModeration, { getLogIcon } from './AdvancedModerationPanel/useAdvancedModeration';

const AdvancedModerationPanel = ({ serverId, onClose }) => {
  const m = useAdvancedModeration(serverId);

  return (
    <div className="advanced-moderation-panel">
      <div className="panel-header">
        <h2><i className="fas fa-shield-alt"></i> Advanced Moderation</h2>
        <button className="close-btn" onClick={onClose}><i className="fas fa-times"></i></button>
      </div>

      <div className="panel-content">
        {/* User Timeout */}
        <div className="mod-section">
          <h3><i className="fas fa-user-clock"></i> User Timeout</h3>
          <div className="timeout-controls">
            <div className="form-group">
              <label>Select User</label>
              <input type="text" className="user-search" placeholder="Search user..."
                onChange={(e) => m.setSelectedUser({ id: 1, username: e.target.value })} />
              {m.selectedUser && (
                <div className="selected-user"><i className="fas fa-user"></i> {m.selectedUser.username}</div>
              )}
            </div>
            <div className="form-group">
              <label>Duration (minutes)</label>
              <div className="duration-presets">
                {[5, 15, 30, 60, 120, 1440].map(mins => (
                  <button key={mins} className={`preset-btn ${m.timeoutDuration === mins ? 'active' : ''}`}
                    onClick={() => m.setTimeoutDuration(mins)}>{m.formatDuration(mins)}</button>
                ))}
              </div>
              <input type="number" className="duration-input" value={m.timeoutDuration}
                onChange={(e) => m.setTimeoutDuration(parseInt(e.target.value))} min="1" />
            </div>
            <div className="form-group">
              <label>Reason (Optional)</label>
              <textarea className="reason-input" placeholder="Reason for timeout..."
                value={m.timeoutReason} onChange={(e) => m.setTimeoutReason(e.target.value)} />
            </div>
            <button className="btn-timeout" onClick={m.timeoutUser}>
              <i className="fas fa-clock"></i> Apply Timeout
            </button>
          </div>
        </div>

        {/* Mass Moderation */}
        <div className="mod-section">
          <h3><i className="fas fa-users-cog"></i> Mass Moderation</h3>
          <div className="mass-action-controls">
            <div className="form-group">
              <label>Action Type</label>
              <select className="action-select" value={m.massActionType}
                onChange={(e) => m.setMassActionType(e.target.value)}>
                <option value="">Select action...</option>
                <option value="kick">Kick Users</option>
                <option value="ban">Ban Users</option>
                <option value="remove_role">Remove Role</option>
                <option value="add_role">Add Role</option>
              </select>
            </div>
            <div className="form-group">
              <label>Criteria</label>
              <select className="criteria-select" value={m.massActionCriteria}
                onChange={(e) => m.setMassActionCriteria(e.target.value)}>
                <option value="">Select criteria...</option>
                <option value="no_avatar">No Avatar</option>
                <option value="new_members">New Members (7 days)</option>
                <option value="inactive">Inactive (30+ days)</option>
                <option value="no_roles">No Roles</option>
              </select>
            </div>
            <button className="btn-mass-action" onClick={m.executeMassAction}
              disabled={!m.massActionType || !m.massActionCriteria}>
              <i className="fas fa-bolt"></i> Execute Mass Action
            </button>
            <div className="warning-box">
              <i className="fas fa-exclamation-triangle"></i>
              <span>Mass actions affect multiple users. Use with caution!</span>
            </div>
          </div>
        </div>

        {/* Raid Protection */}
        <div className="mod-section">
          <h3><i className="fas fa-shield-virus"></i> Raid Protection</h3>
          <div className="raid-protection-controls">
            <div className="toggle-container">
              <label className="toggle-switch">
                <input type="checkbox" checked={m.raidProtection} onChange={m.toggleRaidProtection} />
                <span className="slider"></span>
              </label>
              <span className="toggle-label">Raid Protection {m.raidProtection ? 'Enabled' : 'Disabled'}</span>
            </div>
            {m.raidProtection && (
              <div className="raid-settings">
                <div className="form-group">
                  <label>Join Threshold</label>
                  <input type="number" className="settings-input" value={m.raidSettings.threshold}
                    onChange={(e) => m.setRaidSettings({ ...m.raidSettings, threshold: parseInt(e.target.value) })} min="5" />
                  <span className="input-hint">users joining within time window</span>
                </div>
                <div className="form-group">
                  <label>Time Window (seconds)</label>
                  <input type="number" className="settings-input" value={m.raidSettings.timeWindow}
                    onChange={(e) => m.setRaidSettings({ ...m.raidSettings, timeWindow: parseInt(e.target.value) })} min="10" />
                </div>
                <div className="form-group">
                  <label>Action on Detection</label>
                  <select className="settings-select" value={m.raidSettings.action}
                    onChange={(e) => m.setRaidSettings({ ...m.raidSettings, action: e.target.value })}>
                    <option value="kick">Kick</option>
                    <option value="ban">Ban</option>
                    <option value="timeout">Timeout</option>
                  </select>
                </div>
                <button className="btn-save-settings" onClick={m.updateRaidSettings}>
                  <i className="fas fa-save"></i> Save Settings
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Warning History */}
        <div className="mod-section">
          <h3><i className="fas fa-exclamation-circle"></i> Warning History</h3>
          <div className="warnings-list">
            {m.warnings.length === 0 ? (
              <div className="empty-state"><i className="fas fa-check-circle"></i><p>No warnings issued</p></div>
            ) : (
              m.warnings.map((warning) => (
                <div key={warning.id} className="warning-item">
                  <div className="warning-header">
                    <div className="warning-user"><i className="fas fa-user"></i> {warning.user?.username}</div>
                    <div className="warning-count">{warning.count} warning{warning.count > 1 ? 's' : ''}</div>
                  </div>
                  <div className="warning-details">
                    <div className="warning-reason">{warning.latest_reason}</div>
                    <div className="warning-time">{new Date(warning.latest_date).toLocaleString()}</div>
                  </div>
                  <button className="btn-clear-warnings" onClick={() => m.clearWarnings(warning.user?.id)}>Clear</button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Moderation Logs */}
        <div className="mod-section">
          <h3><i className="fas fa-clipboard-list"></i> Moderation Logs</h3>
          <div className="logs-list">
            {m.moderationLogs.slice(0, 20).map((log) => (
              <div key={log.id} className="log-item">
                <div className="log-icon"><i className={`fas fa-${getLogIcon(log.action)}`}></i></div>
                <div className="log-content">
                  <div className="log-action">{log.action}</div>
                  <div className="log-details">
                    {log.moderator?.username} {'\u2192'} {log.target?.username}
                    {log.reason && ` - ${log.reason}`}
                  </div>
                  <div className="log-time">{new Date(log.timestamp).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedModerationPanel;

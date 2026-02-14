import {
  FaPoll, FaTimes, FaCog, FaSave, FaUndo, FaVoteYea,
  FaChartBar, FaPlus, FaTrash, FaClock, FaCheckCircle,
  FaLock, FaUsers
} from 'react-icons/fa';
import './PollSettingsPanel.css';
import usePollSettings, { formatTimeRemaining } from './PollSettingsPanel/usePollSettings';
import SettingsTab from './PollSettingsPanel/SettingsTab';

const PollSettingsPanel = ({ serverId, onClose, fetchWithAuth, apiBaseUrl }) => {
  const { settings, loading, activeTab, setActiveTab, hasChanges, pollTemplates, activePolls, handleSettingChange, saveSettings, resetSettings } = usePollSettings({ serverId, fetchWithAuth, apiBaseUrl });

  if (loading) return (
    <div className="poll-settings-overlay" onClick={onClose}>
      <div className="poll-settings-panel" onClick={e => e.stopPropagation()}>
        <div className="loading">Loading poll settings...</div>
      </div>
    </div>
  );

  return (
    <div className="poll-settings-overlay" onClick={onClose}>
      <div className="poll-settings-panel" onClick={e => e.stopPropagation()}>
        <div className="panel-header">
          <div className="header-info"><h2><FaPoll /> Poll Settings</h2><span className="subtitle">Configure voting and poll options</span></div>
          <div className="header-actions">
            {hasChanges && (<><button className="reset-btn" onClick={resetSettings}><FaUndo /> Reset</button><button className="save-btn" onClick={saveSettings}><FaSave /> Save Changes</button></>)}
            <button className="close-btn" onClick={onClose}><FaTimes /></button>
          </div>
        </div>

        <div className="tabs">
          <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}><FaCog /> General Settings</button>
          <button className={activeTab === 'templates' ? 'active' : ''} onClick={() => setActiveTab('templates')}><FaVoteYea /> Templates</button>
          <button className={activeTab === 'active' ? 'active' : ''} onClick={() => setActiveTab('active')}><FaChartBar /> Active Polls</button>
        </div>

        <div className="panel-content">
          {activeTab === 'settings' && settings && <SettingsTab settings={settings} handleSettingChange={handleSettingChange} />}

          {activeTab === 'templates' && (
            <div className="templates-content">
              <div className="templates-header"><h3>Poll Templates</h3><button className="add-template-btn"><FaPlus /> New Template</button></div>
              <div className="templates-grid">
                {pollTemplates.map(template => (
                  <div key={template.id} className="template-card">
                    <div className="template-header"><h4>{template.name}</h4><button className="delete-template"><FaTrash /></button></div>
                    <div className="template-info">
                      <span className="template-duration"><FaClock /> {template.duration}h</span>
                      <span className="template-multi">{template.multi_vote ? <FaCheckCircle /> : <FaLock />}{template.multi_vote ? 'Multi-vote' : 'Single vote'}</span>
                    </div>
                    <div className="template-options">{template.options.map((opt, i) => <span key={i} className="option-chip">{opt}</span>)}</div>
                    <button className="use-template-btn">Use Template</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'active' && (
            <div className="active-polls-content">
              <h3><FaChartBar /> Active & Recent Polls</h3>
              {activePolls.length > 0 ? (
                <div className="polls-list">
                  {activePolls.map(poll => (
                    <div key={poll.id} className={`poll-item ${poll.status}`}>
                      <div className="poll-status">{poll.status === 'active' ? <span className="status-badge active"><span className="pulse"></span>Active</span> : <span className="status-badge ended">Ended</span>}</div>
                      <div className="poll-info"><h4>{poll.question}</h4><div className="poll-meta"><span><FaUsers /> {poll.votes} votes</span><span><FaClock /> {formatTimeRemaining(poll.end_time)}</span></div></div>
                      <div className="poll-actions"><button className="view-btn">View</button>{poll.status === 'active' && <button className="end-btn">End Early</button>}</div>
                    </div>
                  ))}
                </div>
              ) : <div className="empty-state">No active polls</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollSettingsPanel;

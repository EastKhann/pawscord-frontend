import { useState, useEffect } from 'react';
import {
    FaPoll, FaTimes, FaCog, FaUsers, FaEye, FaEyeSlash,
    FaClock, FaCheckCircle, FaSave, FaUndo, FaVoteYea,
    FaHistory, FaChartBar, FaLock, FaUnlock, FaPlus, FaTrash
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import './PollSettingsPanel.css';

const PollSettingsPanel = ({ serverId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('settings');
    const [hasChanges, setHasChanges] = useState(false);
    const [pollTemplates, setPollTemplates] = useState([]);
    const [activePolls, setActivePolls] = useState([]);

    const defaultSettings = {
        allow_multiple_votes: true,
        anonymous_voting: false,
        show_results_before_end: true,
        default_duration_hours: 24,
        max_options: 10,
        min_options: 2,
        require_role_to_create: false,
        creator_role_id: null,
        allow_add_options: true,
        notify_on_end: true,
        pin_active_polls: false,
        max_active_polls: 5,
        cooldown_minutes: 30
    };

    useEffect(() => {
        loadSettings();
    }, [serverId]);

    const loadSettings = async () => {
        setLoading(true);
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            if (fetchWithAuth && serverId) {
                const response = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/poll-settings/`);
                if (response.ok) {
                    const data = await response.json();
                    setSettings(data.settings || defaultSettings);
                    setPollTemplates(data.templates || []);
                    setActivePolls(data.active_polls || []);
                } else {
                    setSettings(defaultSettings);
                    setPollTemplates([]);
                    setActivePolls([]);
                }
            } else {
                setSettings(defaultSettings);
                setPollTemplates([]);
                setActivePolls([]);
            }
        } catch (error) {
            console.error('Error loading poll settings:', error);
            setSettings(defaultSettings);
            setPollTemplates([]);
            setActivePolls([]);
        }
        setLoading(false);
    };

    const handleSettingChange = (key, value) => {
        setSettings({ ...settings, [key]: value });
        setHasChanges(true);
    };

    const saveSettings = async () => {
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            if (fetchWithAuth && serverId) {
                const response = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/poll-settings/`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(settings)
                });
                if (response.ok) {
                    setHasChanges(false);
                }
            }
        } catch (error) {
            console.error('Error saving poll settings:', error);
        }
    };

    const resetSettings = () => {
        setSettings(defaultSettings);
        setHasChanges(false);
    };

    const formatTimeRemaining = (endTime) => {
        const end = new Date(endTime);
        const now = new Date();
        const diff = end - now;
        if (diff <= 0) return 'Ended';
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${mins}m remaining`;
    };

    if (loading) {
        return (
            <div className="poll-settings-overlay" onClick={onClose}>
                <div className="poll-settings-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading">Loading poll settings...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="poll-settings-overlay" onClick={onClose}>
            <div className="poll-settings-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaPoll />
                            Poll Settings
                        </h2>
                        <span className="subtitle">Configure voting and poll options</span>
                    </div>
                    <div className="header-actions">
                        {hasChanges && (
                            <>
                                <button className="reset-btn" onClick={resetSettings}>
                                    <FaUndo /> Reset
                                </button>
                                <button className="save-btn" onClick={saveSettings}>
                                    <FaSave /> Save Changes
                                </button>
                            </>
                        )}
                        <button className="close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div className="tabs">
                    <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
                        <FaCog /> General Settings
                    </button>
                    <button className={activeTab === 'templates' ? 'active' : ''} onClick={() => setActiveTab('templates')}>
                        <FaVoteYea /> Templates
                    </button>
                    <button className={activeTab === 'active' ? 'active' : ''} onClick={() => setActiveTab('active')}>
                        <FaChartBar /> Active Polls
                    </button>
                </div>

                <div className="panel-content">
                    {/* Settings Tab */}
                    {activeTab === 'settings' && settings && (
                        <div className="settings-content">
                            <div className="settings-section">
                                <h3><FaVoteYea /> Voting Options</h3>
                                <div className="settings-grid">
                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <label>Allow Multiple Votes</label>
                                            <span className="setting-desc">Users can select multiple options</span>
                                        </div>
                                        <label className="toggle">
                                            <input
                                                type="checkbox"
                                                checked={settings.allow_multiple_votes}
                                                onChange={(e) => handleSettingChange('allow_multiple_votes', e.target.checked)}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <label>
                                                <FaEyeSlash /> Anonymous Voting
                                            </label>
                                            <span className="setting-desc">Hide who voted for what</span>
                                        </div>
                                        <label className="toggle">
                                            <input
                                                type="checkbox"
                                                checked={settings.anonymous_voting}
                                                onChange={(e) => handleSettingChange('anonymous_voting', e.target.checked)}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <label>
                                                <FaEye /> Show Results Before End
                                            </label>
                                            <span className="setting-desc">Display vote counts while poll is active</span>
                                        </div>
                                        <label className="toggle">
                                            <input
                                                type="checkbox"
                                                checked={settings.show_results_before_end}
                                                onChange={(e) => handleSettingChange('show_results_before_end', e.target.checked)}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <label>Allow Adding Options</label>
                                            <span className="setting-desc">Users can suggest new options</span>
                                        </div>
                                        <label className="toggle">
                                            <input
                                                type="checkbox"
                                                checked={settings.allow_add_options}
                                                onChange={(e) => handleSettingChange('allow_add_options', e.target.checked)}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-section">
                                <h3><FaClock /> Duration & Limits</h3>
                                <div className="settings-grid">
                                    <div className="setting-item number">
                                        <div className="setting-info">
                                            <label>Default Duration (hours)</label>
                                            <span className="setting-desc">Default poll length</span>
                                        </div>
                                        <input
                                            type="number"
                                            value={settings.default_duration_hours}
                                            onChange={(e) => handleSettingChange('default_duration_hours', parseInt(e.target.value))}
                                            min={1}
                                            max={168}
                                        />
                                    </div>

                                    <div className="setting-item number">
                                        <div className="setting-info">
                                            <label>Max Options</label>
                                            <span className="setting-desc">Maximum choices per poll</span>
                                        </div>
                                        <input
                                            type="number"
                                            value={settings.max_options}
                                            onChange={(e) => handleSettingChange('max_options', parseInt(e.target.value))}
                                            min={2}
                                            max={25}
                                        />
                                    </div>

                                    <div className="setting-item number">
                                        <div className="setting-info">
                                            <label>Max Active Polls</label>
                                            <span className="setting-desc">Concurrent polls allowed</span>
                                        </div>
                                        <input
                                            type="number"
                                            value={settings.max_active_polls}
                                            onChange={(e) => handleSettingChange('max_active_polls', parseInt(e.target.value))}
                                            min={1}
                                            max={20}
                                        />
                                    </div>

                                    <div className="setting-item number">
                                        <div className="setting-info">
                                            <label>Cooldown (minutes)</label>
                                            <span className="setting-desc">Time between creating polls</span>
                                        </div>
                                        <input
                                            type="number"
                                            value={settings.cooldown_minutes}
                                            onChange={(e) => handleSettingChange('cooldown_minutes', parseInt(e.target.value))}
                                            min={0}
                                            max={1440}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="settings-section">
                                <h3><FaLock /> Permissions</h3>
                                <div className="settings-grid">
                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <label>Require Role to Create</label>
                                            <span className="setting-desc">Only specific roles can create polls</span>
                                        </div>
                                        <label className="toggle">
                                            <input
                                                type="checkbox"
                                                checked={settings.require_role_to_create}
                                                onChange={(e) => handleSettingChange('require_role_to_create', e.target.checked)}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <label>Pin Active Polls</label>
                                            <span className="setting-desc">Auto-pin polls to channels</span>
                                        </div>
                                        <label className="toggle">
                                            <input
                                                type="checkbox"
                                                checked={settings.pin_active_polls}
                                                onChange={(e) => handleSettingChange('pin_active_polls', e.target.checked)}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <label>Notify on End</label>
                                            <span className="setting-desc">Send notification when poll ends</span>
                                        </div>
                                        <label className="toggle">
                                            <input
                                                type="checkbox"
                                                checked={settings.notify_on_end}
                                                onChange={(e) => handleSettingChange('notify_on_end', e.target.checked)}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Templates Tab */}
                    {activeTab === 'templates' && (
                        <div className="templates-content">
                            <div className="templates-header">
                                <h3>Poll Templates</h3>
                                <button className="add-template-btn">
                                    <FaPlus /> New Template
                                </button>
                            </div>
                            <div className="templates-grid">
                                {pollTemplates.map(template => (
                                    <div key={template.id} className="template-card">
                                        <div className="template-header">
                                            <h4>{template.name}</h4>
                                            <button className="delete-template">
                                                <FaTrash />
                                            </button>
                                        </div>
                                        <div className="template-info">
                                            <span className="template-duration">
                                                <FaClock /> {template.duration}h
                                            </span>
                                            <span className="template-multi">
                                                {template.multi_vote ? <FaCheckCircle /> : <FaLock />}
                                                {template.multi_vote ? 'Multi-vote' : 'Single vote'}
                                            </span>
                                        </div>
                                        <div className="template-options">
                                            {template.options.map((opt, i) => (
                                                <span key={i} className="option-chip">{opt}</span>
                                            ))}
                                        </div>
                                        <button className="use-template-btn">Use Template</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Active Polls Tab */}
                    {activeTab === 'active' && (
                        <div className="active-polls-content">
                            <h3><FaChartBar /> Active & Recent Polls</h3>
                            {activePolls.length > 0 ? (
                                <div className="polls-list">
                                    {activePolls.map(poll => (
                                        <div key={poll.id} className={`poll-item ${poll.status}`}>
                                            <div className="poll-status">
                                                {poll.status === 'active' ? (
                                                    <span className="status-badge active">
                                                        <span className="pulse"></span>
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="status-badge ended">Ended</span>
                                                )}
                                            </div>
                                            <div className="poll-info">
                                                <h4>{poll.question}</h4>
                                                <div className="poll-meta">
                                                    <span><FaUsers /> {poll.votes} votes</span>
                                                    <span><FaClock /> {formatTimeRemaining(poll.end_time)}</span>
                                                </div>
                                            </div>
                                            <div className="poll-actions">
                                                <button className="view-btn">View</button>
                                                {poll.status === 'active' && (
                                                    <button className="end-btn">End Early</button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">No active polls</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PollSettingsPanel;

import { FaUsers, FaTimes, FaCog, FaShieldAlt, FaGavel, FaUserCheck, FaToggleOn, FaToggleOff, FaSave } from 'react-icons/fa';
import useCommunitySettings, { VERIFICATION_LEVELS, CONTENT_FILTERS } from './CommunitySettingsPanel/useCommunitySettings';
import GeneralSettings from './CommunitySettingsPanel/GeneralSettings';
import RulesSettings from './CommunitySettingsPanel/RulesSettings';
import ScreeningSettings from './CommunitySettingsPanel/ScreeningSettings';
import SafetySettings from './CommunitySettingsPanel/SafetySettings';
import './CommunitySettingsPanel.css';

const TABS = [
  { key: 'general', label: 'Genel', Icon: FaCog },
  { key: 'rules', label: 'Kurallar', Icon: FaGavel },
  { key: 'screening', label: '\u00DCye Tarama', Icon: FaUserCheck },
  { key: 'safety', label: 'G\u00FCvenlik', Icon: FaShieldAlt }
];

const CommunitySettingsPanel = ({ apiBaseUrl, serverId, onClose }) => {
  const state = useCommunitySettings(apiBaseUrl, serverId);

  if (state.loading) {
    return (
      <div className="community-settings-overlay" onClick={onClose}>
        <div className="community-settings-panel" onClick={e => e.stopPropagation()}>
          <div className="loading">Y{'\u00FC'}kleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="community-settings-overlay" onClick={onClose}>
      <div className="community-settings-panel" onClick={e => e.stopPropagation()}>
        <div className="panel-header">
          <h2><FaUsers /> Topluluk Ayarlar{'\u0131'}</h2>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="community-toggle">
          <div className="toggle-info">
            <span className="toggle-label">Topluluk Sunucusu</span>
            <span className="toggle-description">Topluluk {'\u00F6'}zelliklerini aktifle{'\u015F'}tir (ke{'\u015F'}fet, kar{'\u015F\u0131'}lama ekran{'\u0131'} vb.)</span>
          </div>
          <button className={`toggle-btn ${state.settings.is_community ? 'active' : ''}`} onClick={() => state.setSettings(prev => ({ ...prev, is_community: !prev.is_community }))}>
            {state.settings.is_community ? <FaToggleOn /> : <FaToggleOff />}
          </button>
        </div>

        <div className="tabs">
          {TABS.map(({ key, label, Icon }) => (
            <button key={key} className={`tab ${state.activeTab === key ? 'active' : ''}`} onClick={() => state.setActiveTab(key)}>
              <Icon /> {label}
            </button>
          ))}
        </div>

        <div className="panel-content">
          {state.activeTab === 'general' && <GeneralSettings settings={state.settings} setSettings={state.setSettings} channels={state.channels} />}
          {state.activeTab === 'rules' && <RulesSettings rules={state.rules} onAdd={state.addRule} onUpdate={state.updateRule} onRemove={state.removeRule} />}
          {state.activeTab === 'screening' && <ScreeningSettings questions={state.screeningQuestions} onAdd={state.addQuestion} onUpdate={state.updateQuestion} onRemove={state.removeQuestion} />}
          {state.activeTab === 'safety' && <SafetySettings settings={state.settings} setSettings={state.setSettings} verificationLevels={VERIFICATION_LEVELS} contentFilters={CONTENT_FILTERS} />}
        </div>

        <div className="panel-footer">
          <button className="cancel-btn" onClick={onClose}>{'\u0130'}ptal</button>
          <button className="save-btn" onClick={state.saveSettings} disabled={state.saving}>
            <FaSave /> {state.saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunitySettingsPanel;

import { FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';

const SafetySettings = ({ settings, setSettings, verificationLevels, contentFilters }) => (
  <div className="settings-tab">
    <div className="form-group">
      <label><FaShieldAlt /> Do{'\u011F'}rulama Seviyesi</label>
      <div className="level-options">
        {verificationLevels.map(level => (
          <label key={level.value} className={`level-option ${settings.verification_level === level.value ? 'selected' : ''}`}>
            <input type="radio" name="verification" value={level.value} checked={settings.verification_level === level.value} onChange={(e) => setSettings(prev => ({ ...prev, verification_level: e.target.value }))} />
            <div className="level-info">
              <span className="level-label">{level.label}</span>
              <span className="level-desc">{level.description}</span>
            </div>
          </label>
        ))}
      </div>
    </div>

    <div className="form-group">
      <label><FaExclamationTriangle /> {'\u0130\u00E7'}erik Filtresi</label>
      <div className="level-options">
        {contentFilters.map(filter => (
          <label key={filter.value} className={`level-option ${settings.explicit_content_filter === filter.value ? 'selected' : ''}`}>
            <input type="radio" name="content-filter" value={filter.value} checked={settings.explicit_content_filter === filter.value} onChange={(e) => setSettings(prev => ({ ...prev, explicit_content_filter: e.target.value }))} />
            <div className="level-info">
              <span className="level-label">{filter.label}</span>
              <span className="level-desc">{filter.description}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  </div>
);

export default SafetySettings;

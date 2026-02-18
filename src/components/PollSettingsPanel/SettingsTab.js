import { useCallback, memo } from 'react';
import { FaVoteYea, FaEyeSlash, FaEye, FaClock, FaLock } from 'react-icons/fa';

const ToggleSetting = memo(({ label, desc, icon, checked, onChange }) => (
  <div className="setting-item">
    <div className="setting-info">
      <label>{icon}{icon && ' '}{label}</label>
      <span className="setting-desc">{desc}</span>
    </div>
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="toggle-slider"></span>
    </label>
  </div>
));

const NumberSetting = memo(({ label, desc, value, onChange, min, max }) => (
  <div className="setting-item number">
    <div className="setting-info">
      <label>{label}</label>
      <span className="setting-desc">{desc}</span>
    </div>
    <input type="number" value={value} onChange={e => onChange(parseInt(e.target.value))} min={min} max={max} />
  </div>
));

const SettingsTab = memo(({ settings, handleSettingChange }) => {
  const onAllowMultipleVotes = useCallback(v => handleSettingChange('allow_multiple_votes', v), [handleSettingChange]);
  const onAnonymousVoting = useCallback(v => handleSettingChange('anonymous_voting', v), [handleSettingChange]);
  const onShowResultsBeforeEnd = useCallback(v => handleSettingChange('show_results_before_end', v), [handleSettingChange]);
  const onAllowAddOptions = useCallback(v => handleSettingChange('allow_add_options', v), [handleSettingChange]);
  const onDefaultDuration = useCallback(v => handleSettingChange('default_duration_hours', v), [handleSettingChange]);
  const onMaxOptions = useCallback(v => handleSettingChange('max_options', v), [handleSettingChange]);
  const onMaxActivePolls = useCallback(v => handleSettingChange('max_active_polls', v), [handleSettingChange]);
  const onCooldownMinutes = useCallback(v => handleSettingChange('cooldown_minutes', v), [handleSettingChange]);
  const onRequireRoleToCreate = useCallback(v => handleSettingChange('require_role_to_create', v), [handleSettingChange]);
  const onPinActivePolls = useCallback(v => handleSettingChange('pin_active_polls', v), [handleSettingChange]);
  const onNotifyOnEnd = useCallback(v => handleSettingChange('notify_on_end', v), [handleSettingChange]);

  return (
    <div className="settings-content">
      <div className="settings-section">
        <h3><FaVoteYea /> Voting Options</h3>
        <div className="settings-grid">
          <ToggleSetting label="Allow Multiple Votes" desc="Users can select multiple options" checked={settings.allow_multiple_votes} onChange={onAllowMultipleVotes} />
          <ToggleSetting label="Anonymous Voting" desc="Hide who voted for what" icon={<FaEyeSlash />} checked={settings.anonymous_voting} onChange={onAnonymousVoting} />
          <ToggleSetting label="Show Results Before End" desc="Display vote counts while poll is active" icon={<FaEye />} checked={settings.show_results_before_end} onChange={onShowResultsBeforeEnd} />
          <ToggleSetting label="Allow Adding Options" desc="Users can suggest new options" checked={settings.allow_add_options} onChange={onAllowAddOptions} />
        </div>
      </div>

      <div className="settings-section">
        <h3><FaClock /> Duration & Limits</h3>
        <div className="settings-grid">
          <NumberSetting label="Default Duration (hours)" desc="Default poll length" value={settings.default_duration_hours} onChange={onDefaultDuration} min={1} max={168} />
          <NumberSetting label="Max Options" desc="Maximum choices per poll" value={settings.max_options} onChange={onMaxOptions} min={2} max={25} />
          <NumberSetting label="Max Active Polls" desc="Concurrent polls allowed" value={settings.max_active_polls} onChange={onMaxActivePolls} min={1} max={20} />
          <NumberSetting label="Cooldown (minutes)" desc="Time between creating polls" value={settings.cooldown_minutes} onChange={onCooldownMinutes} min={0} max={1440} />
        </div>
      </div>

      <div className="settings-section">
        <h3><FaLock /> Permissions</h3>
        <div className="settings-grid">
          <ToggleSetting label="Require Role to Create" desc="Only specific roles can create polls" checked={settings.require_role_to_create} onChange={onRequireRoleToCreate} />
          <ToggleSetting label="Pin Active Polls" desc="Auto-pin polls to channels" checked={settings.pin_active_polls} onChange={onPinActivePolls} />
          <ToggleSetting label="Notify on End" desc="Send notification when poll ends" checked={settings.notify_on_end} onChange={onNotifyOnEnd} />
        </div>
      </div>
    </div>
  );
});

export default SettingsTab;

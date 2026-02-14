import useLevelingSystem from './LevelingSystemPanel/useLevelingSystem';
import LevelRolesSection from './LevelingSystemPanel/LevelRolesSection';
import LeaderboardSection from './LevelingSystemPanel/LeaderboardSection';
import './LevelingSystemPanel.css';

const LevelingSystemPanel = ({ serverId, onClose }) => {
  const { config, updateConfig, levelRoles, newRole, setNewRole, roles, channels, leaderboard, loading, saveConfig, addLevelRole, removeLevelRole, resetUserXP } = useLevelingSystem(serverId);

  if (loading) {
    return (
      <div className="leveling-overlay">
        <div className="leveling-panel"><div className="loading-state"><div className="spinner" /><p>Seviye sistemi y{'ü'}kleniyor...</p></div></div>
      </div>
    );
  }

  return (
    <div className="leveling-overlay" onClick={onClose}>
      <div className="leveling-panel" onClick={e => e.stopPropagation()}>
        <div className="leveling-header">
          <h2>{'⭐'} Seviye Sistemi</h2>
          <button className="close-btn" onClick={onClose}>{'×'}</button>
        </div>

        <div className="leveling-content">
          <div className="config-section">
            <div className="section-header">
              <h3>{'⚙️'} Genel Ayarlar</h3>
              <label className="toggle-switch">
                <input type="checkbox" checked={config.enabled} onChange={e => updateConfig('enabled', e.target.checked)} />
                <span className="slider"></span>
                <span className="toggle-label">{config.enabled ? 'Aktif' : 'Pasif'}</span>
              </label>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Mesaj Ba{'şı'}na XP</label>
                <input type="number" min="1" max="100" value={config.xp_per_message} onChange={e => updateConfig('xp_per_message', parseInt(e.target.value))} disabled={!config.enabled} />
              </div>
              <div className="form-group">
                <label>XP Cooldown (saniye)</label>
                <input type="number" min="0" max="300" value={config.xp_cooldown} onChange={e => updateConfig('xp_cooldown', parseInt(e.target.value))} disabled={!config.enabled} />
              </div>
              <div className="form-group full-width">
                <label>Duyuru Kanal{'ı'}</label>
                <select value={config.announce_channel_id} onChange={e => updateConfig('announce_channel_id', e.target.value)} disabled={!config.enabled}>
                  <option value="">Se{'ç'}iniz (opsiyonel)</option>
                  {channels.map(ch => <option key={ch.id} value={ch.id}>#{ch.name}</option>)}
                </select>
              </div>
              <div className="form-group full-width">
                <label>Seviye Atlama Mesaj{'ı'}</label>
                <textarea value={config.level_up_message} onChange={e => updateConfig('level_up_message', e.target.value)} disabled={!config.enabled} rows="2" />
                <span className="hint">Kullan{'ı'}labilir: {'{user}'}, {'{level}'}</span>
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" checked={config.stack_roles} onChange={e => updateConfig('stack_roles', e.target.checked)} disabled={!config.enabled} />
                  <span>Rolleri biriktir ({'ö'}nceki seviye rollerini kald{'ı'}rma)</span>
                </label>
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" checked={config.reset_on_leave} onChange={e => updateConfig('reset_on_leave', e.target.checked)} disabled={!config.enabled} />
                  <span>Sunucudan ayr{'ı'}l{'ı'}nca XP'yi s{'ı'}f{'ı'}rla</span>
                </label>
              </div>
            </div>
            <button className="save-btn" onClick={saveConfig}>{'💾'} Ayarlar{'ı'} Kaydet</button>
          </div>

          <LevelRolesSection levelRoles={levelRoles} newRole={newRole} setNewRole={setNewRole} roles={roles} addLevelRole={addLevelRole} removeLevelRole={removeLevelRole} />
          <LeaderboardSection leaderboard={leaderboard} resetUserXP={resetUserXP} />
        </div>
      </div>
    </div>
  );
};

export default LevelingSystemPanel;

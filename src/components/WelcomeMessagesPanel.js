import useWelcomeMessages from './WelcomeMessagesPanel/useWelcomeMessages';
import MessageSection from './WelcomeMessagesPanel/MessageSection';
import './WelcomeMessagesPanel.css';

const STAT_ITEMS = [
  { icon: '\uD83D\uDC4B', key: 'total_welcomes', label: 'Toplam Kar\u015F\u0131lama' },
  { icon: '\uD83D\uDE22', key: 'total_goodbyes', label: 'Toplam Veda' },
  { icon: '\uD83D\uDCC5', key: 'welcomes_today', label: 'Bug\u00FCn Kat\u0131lan' },
];

const WelcomeMessagesPanel = ({ serverId, onClose }) => {
  const { welcomeConfig, updateConfig, insertVariable, channels, roles, stats, loading, saveConfig, testWelcomeMessage } = useWelcomeMessages(serverId);

  if (loading) {
    return (
      <div className="welcome-messages-overlay">
        <div className="welcome-messages-panel">
          <div className="loading-state"><div className="spinner" /><p>Kar{'\u015F\u0131'}lama mesajlar{'\u0131'} y{'\u00FC'}kleniyor...</p></div>
        </div>
      </div>
    );
  }

  return (
    <div className="welcome-messages-overlay" onClick={onClose}>
      <div className="welcome-messages-panel" onClick={e => e.stopPropagation()}>
        <div className="welcome-header">
          <h2>{'\uD83D\uDC4B'} Kar{'\u015F\u0131'}lama & Veda Mesajlar{'\u0131'}</h2>
          <button className="close-btn" onClick={onClose}>{'\u00D7'}</button>
        </div>

        {stats && (
          <div className="stats-overview">
            {STAT_ITEMS.map(s => (
              <div key={s.key} className="stat-card">
                <span className="stat-icon">{s.icon}</span>
                <span className="stat-value">{stats[s.key] || 0}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="config-content">
          <MessageSection
            title="Ho\u015F Geldin Mesajlar\u0131" icon="\uD83D\uDC4B"
            config={welcomeConfig} enabledKey="welcome_enabled" channelKey="welcome_channel_id"
            messageKey="welcome_message" embedKey="welcome_embed" embedColorKey="welcome_embed_color"
            embedTitleKey="welcome_embed_title" embedDescKey="welcome_embed_description"
            dmKey="welcome_dm" dmMessageKey="welcome_dm_message"
            channels={channels} updateConfig={updateConfig} insertVariable={insertVariable}
            onTest={testWelcomeMessage}
          />

          <MessageSection
            title="Veda Mesajlar\u0131" icon="\uD83D\uDE22"
            config={welcomeConfig} enabledKey="goodbye_enabled" channelKey="goodbye_channel_id"
            messageKey="goodbye_message" embedKey="goodbye_embed" embedColorKey="goodbye_embed_color"
            channels={channels} updateConfig={updateConfig} insertVariable={insertVariable}
          />

          <div className="config-section">
            <div className="section-header">
              <h3>{'\u2B50'} Otomatik Rol</h3>
              <label className="toggle-switch">
                <input type="checkbox" checked={welcomeConfig.auto_role_enabled} onChange={e => updateConfig('auto_role_enabled', e.target.checked)} />
                <span className="slider"></span>
                <span className="toggle-label">{welcomeConfig.auto_role_enabled ? '\u2713 Aktif' : '\u2717 Pasif'}</span>
              </label>
            </div>
            <div className="form-group">
              <label>Otomatik verilecek roller</label>
              <div className="roles-selector">
                {roles.map(role => (
                  <label key={role.id} className="role-checkbox">
                    <input
                      type="checkbox"
                      checked={welcomeConfig.auto_role_ids.includes(role.id)}
                      onChange={e => {
                        const newRoles = e.target.checked ? [...welcomeConfig.auto_role_ids, role.id] : welcomeConfig.auto_role_ids.filter(id => id !== role.id);
                        updateConfig('auto_role_ids', newRoles);
                      }}
                      disabled={!welcomeConfig.auto_role_enabled}
                    />
                    <span>{role.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button className="save-btn" onClick={saveConfig}>{'\uD83D\uDCBE'} Ayarlar{'\u0131'} Kaydet</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessagesPanel;

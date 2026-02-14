const TicketConfig = ({ config, setConfig, categories, roles, channels, updateConfig }) => (
  <div className="ticket-config-section">
    <h3>{'\u2699\ufe0f'} Sistem Ayarlar\u0131</h3>

    <div className="config-grid">
      <div className="config-item">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={config.enabled}
            onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
          />
          <span className="toggle-switch"></span>
          <span className="toggle-text">Ticket Sistemi Aktif</span>
        </label>
      </div>

      <div className="config-item">
        <label>Ticket Kategorisi</label>
        <select
          value={config.category_id}
          onChange={(e) => setConfig({ ...config, category_id: e.target.value })}
        >
          <option value="">Kategori Se\u00e7in</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="config-item">
        <label>Destek Rol\u00fc</label>
        <select
          value={config.support_role_id}
          onChange={(e) => setConfig({ ...config, support_role_id: e.target.value })}
        >
          <option value="">Rol Se\u00e7in</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>
      </div>

      <div className="config-item">
        <label>Kullan\u0131c\u0131 Ba\u015f\u0131na Max Ticket</label>
        <input
          type="number"
          min="1"
          max="10"
          value={config.max_tickets_per_user}
          onChange={(e) => setConfig({ ...config, max_tickets_per_user: parseInt(e.target.value) })}
        />
      </div>

      <div className="config-item">
        <label>Otomatik Kapanma (Saat)</label>
        <input
          type="number"
          min="1"
          max="168"
          value={config.auto_close_after}
          onChange={(e) => setConfig({ ...config, auto_close_after: parseInt(e.target.value) })}
        />
      </div>

      <div className="config-item">
        <label>Transcript Kanal\u0131</label>
        <select
          value={config.transcript_channel_id}
          onChange={(e) => setConfig({ ...config, transcript_channel_id: e.target.value })}
        >
          <option value="">Kanal Se\u00e7in (Opsiyonel)</option>
          {channels.map((channel) => (
            <option key={channel.id} value={channel.id}># {channel.name}</option>
          ))}
        </select>
      </div>

      <div className="config-item full-width">
        <label>Ho\u015f Geldin Mesaj\u0131</label>
        <textarea
          value={config.welcome_message}
          onChange={(e) => setConfig({ ...config, welcome_message: e.target.value })}
          rows="3"
        />
      </div>
    </div>

    <button className="save-config-btn" onClick={updateConfig}>
      {'\ud83d\udcbe'} Ayarlar\u0131 Kaydet
    </button>
  </div>
);

export default TicketConfig;

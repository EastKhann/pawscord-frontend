import './CustomCommandsPanel.css';
import useCustomCommands from './CustomCommandsPanel/useCustomCommands';
import CommandForm from './CustomCommandsPanel/CommandForm';

const CustomCommandsPanel = ({ serverId, onClose }) => {
  const { commands, creating, setCreating, newCommand, setNewCommand, loading, stats, createCommand, deleteCommand, toggleCommand, exportCommands, importCommands } = useCustomCommands(serverId);

  if (loading) return (
    <div className="custom-commands-overlay">
      <div className="custom-commands-panel">
        <div className="loading-state"><div className="spinner"></div><p>Komutlar yükleniyor...</p></div>
      </div>
    </div>
  );

  return (
    <div className="custom-commands-overlay" onClick={onClose}>
      <div className="custom-commands-panel" onClick={e => e.stopPropagation()}>
        <div className="commands-header">
          <h2>⚡ Özel Komutlar</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="commands-content">
          {stats && (
            <div className="stats-overview">
              <div className="stat-card"><span className="stat-value">{stats.total_commands || 0}</span><span className="stat-label">Toplam Komut</span></div>
              <div className="stat-card"><span className="stat-value">{stats.enabled_commands || 0}</span><span className="stat-label">Aktif</span></div>
              <div className="stat-card"><span className="stat-value">{stats.total_uses || 0}</span><span className="stat-label">Kullanım</span></div>
            </div>
          )}

          <div className="action-buttons">
            <button className="create-btn" onClick={() => setCreating(true)}>➕ Yeni Komut</button>
            <button className="export-btn" onClick={exportCommands}>📤 Dışa Aktar</button>
            <label className="import-btn">
              📥 İçe Aktar
              <input type="file" accept=".json" onChange={e => e.target.files[0] && importCommands(e.target.files[0])} style={{ display: 'none' }} />
            </label>
          </div>

          {creating && <CommandForm newCommand={newCommand} setNewCommand={setNewCommand} createCommand={createCommand} onCancel={() => setCreating(false)} />}

          <div className="commands-list">
            {commands.length > 0 ? commands.map(cmd => (
              <div key={cmd.id} className={`command-card ${!cmd.enabled ? 'disabled' : ''}`}>
                <div className="command-header">
                  <div className="command-info"><h4>{cmd.name}</h4>{cmd.description && <p>{cmd.description}</p>}</div>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={cmd.enabled} onChange={e => toggleCommand(cmd.id, e.target.checked)} />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="command-response"><strong>Yanıt:</strong> {cmd.response}</div>
                <div className="command-meta">
                  <span className="meta-item">🎯 {cmd.trigger_type}</span>
                  <span className="meta-item">👥 {cmd.permissions}</span>
                  {cmd.cooldown > 0 && <span className="meta-item">⏱️ {cmd.cooldown}s</span>}
                  <span className="meta-item">📊 {cmd.use_count || 0} kullanım</span>
                </div>
                <div className="command-actions">
                  <button className="edit-btn" onClick={() => {}}>✏️</button>
                  <button className="delete-btn" onClick={() => deleteCommand(cmd.id)}>🗑️</button>
                </div>
              </div>
            )) : !creating && (
              <div className="empty-state">
                <div className="empty-icon">⚡</div>
                <h3>Henüz özel komut yok</h3>
                <p>Sunucunuz için özel komutlar oluşturun</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCommandsPanel;

const CommandForm = ({ newCommand, setNewCommand, createCommand, onCancel }) => (
  <div className="command-form">
    <h3>Yeni Komut Olu\u015Ftur</h3>
    <div className="form-grid">
      <div className="form-group">
        <label>Komut Ad\u0131 *</label>
        <input type="text" placeholder="!komut" value={newCommand.name} onChange={e => setNewCommand({ ...newCommand, name: e.target.value })} />
      </div>
      <div className="form-group">
        <label>A\u00E7\u0131klama</label>
        <input type="text" placeholder="Komut a\u00E7\u0131klamas\u0131" value={newCommand.description} onChange={e => setNewCommand({ ...newCommand, description: e.target.value })} />
      </div>
      <div className="form-group full-width">
        <label>Yan\u0131t *</label>
        <textarea placeholder="Komut yan\u0131t\u0131 (de\u011Fi\u015Fkenler: {user}, {server}, {channel})" value={newCommand.response} onChange={e => setNewCommand({ ...newCommand, response: e.target.value })} rows={3} />
      </div>
      <div className="form-group">
        <label>Tetikleme Tipi</label>
        <select value={newCommand.trigger_type} onChange={e => setNewCommand({ ...newCommand, trigger_type: e.target.value })}>
          <option value="exact">Tam E\u015Fle\u015Fme</option>
          <option value="contains">\u0130\u00E7erir</option>
          <option value="starts_with">\u0130le Ba\u015Flar</option>
          <option value="regex">Regex</option>
        </select>
      </div>
      <div className="form-group">
        <label>\u0130zinler</label>
        <select value={newCommand.permissions} onChange={e => setNewCommand({ ...newCommand, permissions: e.target.value })}>
          <option value="everyone">Herkes</option>
          <option value="mods">Moderat\u00F6rler</option>
          <option value="admins">Adminler</option>
        </select>
      </div>
      <div className="form-group">
        <label>Cooldown (saniye)</label>
        <input type="number" min="0" max="300" value={newCommand.cooldown} onChange={e => setNewCommand({ ...newCommand, cooldown: parseInt(e.target.value) })} />
      </div>
      <div className="form-group">
        <label className="checkbox-label">
          <input type="checkbox" checked={newCommand.delete_trigger} onChange={e => setNewCommand({ ...newCommand, delete_trigger: e.target.checked })} />
          Tetikleyici mesaj\u0131 sil
        </label>
      </div>
      <div className="form-group">
        <label className="checkbox-label">
          <input type="checkbox" checked={newCommand.embed} onChange={e => setNewCommand({ ...newCommand, embed: e.target.checked })} />
          Embed olarak g\u00F6nder
        </label>
      </div>
      {newCommand.embed && (
        <div className="form-group">
          <label>Embed Rengi</label>
          <input type="color" value={newCommand.embed_color} onChange={e => setNewCommand({ ...newCommand, embed_color: e.target.value })} />
        </div>
      )}
    </div>
    <div className="form-actions">
      <button className="cancel-btn" onClick={onCancel}>\u0130ptal</button>
      <button className="submit-btn" onClick={createCommand}>Olu\u015Ftur</button>
    </div>
  </div>
);

export default CommandForm;

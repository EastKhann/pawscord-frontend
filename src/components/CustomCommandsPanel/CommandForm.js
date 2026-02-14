const CommandForm = ({ newCommand, setNewCommand, createCommand, onCancel }) => (
  <div className="command-form">
    <h3>Yeni Komut Oluştur</h3>
    <div className="form-grid">
      <div className="form-group">
        <label>Komut Adı *</label>
        <input type="text" placeholder="!komut" value={newCommand.name} onChange={e => setNewCommand({ ...newCommand, name: e.target.value })} />
      </div>
      <div className="form-group">
        <label>Açıklama</label>
        <input type="text" placeholder="Komut açıklaması" value={newCommand.description} onChange={e => setNewCommand({ ...newCommand, description: e.target.value })} />
      </div>
      <div className="form-group full-width">
        <label>Yanıt *</label>
        <textarea placeholder="Komut yanıtı (değişkenler: {user}, {server}, {channel})" value={newCommand.response} onChange={e => setNewCommand({ ...newCommand, response: e.target.value })} rows={3} />
      </div>
      <div className="form-group">
        <label>Tetikleme Tipi</label>
        <select value={newCommand.trigger_type} onChange={e => setNewCommand({ ...newCommand, trigger_type: e.target.value })}>
          <option value="exact">Tam Eşleşme</option>
          <option value="contains">İçerir</option>
          <option value="starts_with">İle Başlar</option>
          <option value="regex">Regex</option>
        </select>
      </div>
      <div className="form-group">
        <label>İzinler</label>
        <select value={newCommand.permissions} onChange={e => setNewCommand({ ...newCommand, permissions: e.target.value })}>
          <option value="everyone">Herkes</option>
          <option value="mods">Moderatörler</option>
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
          Tetikleyici mesajı sil
        </label>
      </div>
      <div className="form-group">
        <label className="checkbox-label">
          <input type="checkbox" checked={newCommand.embed} onChange={e => setNewCommand({ ...newCommand, embed: e.target.checked })} />
          Embed olarak gönder
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
      <button className="cancel-btn" onClick={onCancel}>İptal</button>
      <button className="submit-btn" onClick={createCommand}>Oluştur</button>
    </div>
  </div>
);

export default CommandForm;

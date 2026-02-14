const CreateBotView = ({ newBot, setNewBot, handleCreateBot, onCancel }) => (
  <div className="create-bot-form">
    <h3>{'\uD83E\uDD16'} Yeni Bot Olu{'\u015F'}tur</h3>

    <div className="form-group">
      <label>Bot Ad{'\u0131'} *</label>
      <input
        type="text"
        placeholder={'\u00D6'}rnekBot"
        value={newBot.name}
        onChange={e => setNewBot({ ...newBot, name: e.target.value })}
        maxLength={32}
      />
    </div>

    <div className="form-group">
      <label>A{'\u00E7\u0131'}klama</label>
      <textarea
        placeholder="Botunuz ne yapar?"
        value={newBot.description}
        onChange={e => setNewBot({ ...newBot, description: e.target.value })}
        rows={4}
        maxLength={200}
      />
    </div>

    <div className="form-group">
      <label>Avatar URL (opsiyonel)</label>
      <input
        type="url"
        placeholder="https://example.com/avatar.png"
        value={newBot.avatar_url}
        onChange={e => setNewBot({ ...newBot, avatar_url: e.target.value })}
      />
    </div>

    <div className="form-actions">
      <button className="submit-btn" onClick={handleCreateBot}>
        {'\u2728'} Bot Olu{'\u015F'}tur
      </button>
      <button className="cancel-btn" onClick={onCancel}>
        {'\u0130'}ptal
      </button>
    </div>
  </div>
);

export default CreateBotView;

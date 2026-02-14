const CreateBotView = ({ newBot, setNewBot, handleCreateBot, onCancel }) => (
  <div className="create-bot-form">
    <h3>{'🤖'} Yeni Bot Olu{'ş'}tur</h3>

    <div className="form-group">
      <label>Bot Ad{'ı'} *</label>
      <input
        type="text"
        placeholder={'Ö'}rnekBot"
        value={newBot.name}
        onChange={e => setNewBot({ ...newBot, name: e.target.value })}
        maxLength={32}
      />
    </div>

    <div className="form-group">
      <label>A{'çı'}klama</label>
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
        {'✨'} Bot Olu{'ş'}tur
      </button>
      <button className="cancel-btn" onClick={onCancel}>
        {'İ'}ptal
      </button>
    </div>
  </div>
);

export default CreateBotView;

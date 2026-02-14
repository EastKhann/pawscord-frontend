import { DURATION_OPTIONS } from './usePolls';

const CreatePollModal = ({ newPoll, setNewPoll, channels, onCreate, onClose, addOption, removeOption, updateOption }) => (
  <div className="create-modal-overlay" onClick={onClose}>
    <div className="create-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h3>Yeni Anket Olu{'ş'}tur</h3>
        <button className="close-btn" onClick={onClose}>{'×'}</button>
      </div>

      <div className="modal-body">
        <div className="form-group">
          <label>Soru *</label>
          <input type="text" placeholder="En sevdiğiniz programlama dili hangisi?" value={newPoll.question} onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Kanal *</label>
            <select value={newPoll.channel_id} onChange={(e) => setNewPoll({ ...newPoll, channel_id: e.target.value })}>
              <option value="">Kanal Se{'ç'}in</option>
              {channels.map(ch => <option key={ch.id} value={ch.id}># {ch.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>S{'ü'}re</label>
            <select value={newPoll.duration} onChange={(e) => setNewPoll({ ...newPoll, duration: parseInt(e.target.value) })}>
              {DURATION_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Se{'ç'}enekler * (En az 2, en fazla 10)</label>
          <div className="options-list">
            {newPoll.options.map((option, index) => (
              <div key={index} className="option-input-row">
                <input type="text" placeholder={`Seçenek ${index + 1}`} value={option} onChange={(e) => updateOption(index, e.target.value)} />
                {newPoll.options.length > 2 && <button className="remove-option-btn" onClick={() => removeOption(index)}>{'×'}</button>}
              </div>
            ))}
          </div>
          <button className="add-option-btn" onClick={addOption}>+ Se{'ç'}enek Ekle</button>
        </div>

        <div className="poll-settings">
          <h4>Anket Ayarlar{'ı'}</h4>
          <div className="setting-item">
            <label className="checkbox-label">
              <input type="checkbox" checked={newPoll.allow_multiple_choices} onChange={(e) => setNewPoll({ ...newPoll, allow_multiple_choices: e.target.checked })} />
              <span>{'Ç'}oklu se{'ç'}ime izin ver</span>
            </label>
            <p className="setting-hint">Kullan{'ı'}c{'ı'}lar birden fazla se{'ç'}enek se{'ç'}ebilir</p>
          </div>
          <div className="setting-item">
            <label className="checkbox-label">
              <input type="checkbox" checked={newPoll.anonymous} onChange={(e) => setNewPoll({ ...newPoll, anonymous: e.target.checked })} />
              <span>Anonim oylama</span>
            </label>
            <p className="setting-hint">Kimler oy verdi g{'ö'}sterilmez</p>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button className="cancel-btn" onClick={onClose}>{'İ'}ptal</button>
        <button className="submit-btn" onClick={onCreate}>{'📊'} Anket Olu{'ş'}tur</button>
      </div>
    </div>
  </div>
);

export default CreatePollModal;

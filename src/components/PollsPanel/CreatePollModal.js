import { DURATION_OPTIONS } from './usePolls';

const CreatePollModal = ({ newPoll, setNewPoll, channels, onCreate, onClose, addOption, removeOption, updateOption }) => (
  <div className="create-modal-overlay" onClick={onClose}>
    <div className="create-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h3>Yeni Anket Olu{'\u015F'}tur</h3>
        <button className="close-btn" onClick={onClose}>{'\u00D7'}</button>
      </div>

      <div className="modal-body">
        <div className="form-group">
          <label>Soru *</label>
          <input type="text" placeholder="En sevdi\u011Finiz programlama dili hangisi?" value={newPoll.question} onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Kanal *</label>
            <select value={newPoll.channel_id} onChange={(e) => setNewPoll({ ...newPoll, channel_id: e.target.value })}>
              <option value="">Kanal Se{'\u00E7'}in</option>
              {channels.map(ch => <option key={ch.id} value={ch.id}># {ch.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>S{'\u00FC'}re</label>
            <select value={newPoll.duration} onChange={(e) => setNewPoll({ ...newPoll, duration: parseInt(e.target.value) })}>
              {DURATION_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Se{'\u00E7'}enekler * (En az 2, en fazla 10)</label>
          <div className="options-list">
            {newPoll.options.map((option, index) => (
              <div key={index} className="option-input-row">
                <input type="text" placeholder={`Se\u00E7enek ${index + 1}`} value={option} onChange={(e) => updateOption(index, e.target.value)} />
                {newPoll.options.length > 2 && <button className="remove-option-btn" onClick={() => removeOption(index)}>{'\u00D7'}</button>}
              </div>
            ))}
          </div>
          <button className="add-option-btn" onClick={addOption}>+ Se{'\u00E7'}enek Ekle</button>
        </div>

        <div className="poll-settings">
          <h4>Anket Ayarlar{'\u0131'}</h4>
          <div className="setting-item">
            <label className="checkbox-label">
              <input type="checkbox" checked={newPoll.allow_multiple_choices} onChange={(e) => setNewPoll({ ...newPoll, allow_multiple_choices: e.target.checked })} />
              <span>{'\u00C7'}oklu se{'\u00E7'}ime izin ver</span>
            </label>
            <p className="setting-hint">Kullan{'\u0131'}c{'\u0131'}lar birden fazla se{'\u00E7'}enek se{'\u00E7'}ebilir</p>
          </div>
          <div className="setting-item">
            <label className="checkbox-label">
              <input type="checkbox" checked={newPoll.anonymous} onChange={(e) => setNewPoll({ ...newPoll, anonymous: e.target.checked })} />
              <span>Anonim oylama</span>
            </label>
            <p className="setting-hint">Kimler oy verdi g{'\u00F6'}sterilmez</p>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button className="cancel-btn" onClick={onClose}>{'\u0130'}ptal</button>
        <button className="submit-btn" onClick={onCreate}>{'\uD83D\uDCCA'} Anket Olu{'\u015F'}tur</button>
      </div>
    </div>
  </div>
);

export default CreatePollModal;

/* eslint-disable jsx-a11y/label-has-associated-control */
import { DURATION_OPTIONS } from './usePolls';
import PropTypes from 'prop-types';
import useModalA11y from '../../hooks/useModalA11y';
import { useTranslation } from 'react-i18next';

const CreatePollModal = ({ newPoll, setNewPoll, channels, onCreate, onClose, addOption, removeOption, updateOption }) => {
  const { t } = useTranslation();

  const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Poll Create' });
  return (<div className="create-modal-overlay" {...overlayProps}>
    <div className="create-modal" {...dialogProps}>
      <div className="modal-header">
        <h3>Yeni Anket Oluştur</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="modal-body">
        <div className="form-group">
          <label>{t('soru')}</label>
          <input type="text" placeholder={t('en_sevdiğiniz_programlama_dili_hangisi')} value={newPoll.question} onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t('channel')}</label>
            <select value={newPoll.channel_id} onChange={(e) => setNewPoll({ ...newPoll, channel_id: e.target.value })}
              <option value="">Kanal Seçin</option>
              {channels.map(ch => <option key={ch.id} value={ch.id}>{ch.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Süre</label>
            <select value={newPoll.duration} onChange={(e) => setNewPoll({ ...newPoll, duration: parseInt(e.target.value) })}
              {DURATION_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Options * (En az 2, en fazla 10)</label>
          <div className="options-list">
            {newPoll.options.map((option, index) => (
              <div key={`item-${index}`} className="option-input-row">
                <input type="text" placeholder={`Selectenek ${index + 1}`} value={option} onChange={(e) => updateOption(index, e.target.value)} />
                {newPoll.options.length > 2 && <button className="remove-option-btn" onClick={() => removeOption(index)}>×</button>}
              </div>
            ))}
          </div>
          <button className="add-option-btn" onClick={addOption}>+ Seçenek Ekle</button>
        </div>

        <div className="poll-settings">
          <h4>Anket Ayarları</h4>
          <div className="setting-item">
            <label className="checkbox-label">
              <input type="checkbox" checked={newPoll.allow_multiple_choices} onChange={(e) => setNewPoll({ ...newPoll, allow_multiple_choices: e.target.checked })} />
              <span>Çoklu seçime izin ver</span>
            </label>
            <p className="setting-hint">Kullanıcılar birden fazla seçenek seçebilir</p>
          </div>
          <div className="setting-item">
            <label className="checkbox-label">
              <input type="checkbox" checked={newPoll.anonymous} onChange={(e) => setNewPoll({ ...newPoll, anonymous: e.target.checked })} />
              <span>{t('anonim_oylama')}</span>
            </label>
            <p className="setting-hint">Kimler oy verdi gösterilmez</p>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button className="cancel-btn" onClick={onClose}>İptal</button>
        <button className="submit-btn" onClick={onCreate}>📊 Create Poll</button>
      </div>
    </div >
  </div >
  );
}

CreatePollModal.propTypes = {
  newPoll: PropTypes.object,
  setNewPoll: PropTypes.func,
  channels: PropTypes.array,
  onCreate: PropTypes.func,
  onClose: PropTypes.func,
  addOption: PropTypes.func,
  removeOption: PropTypes.func,
  updateOption: PropTypes.func,
};
export default CreatePollModal;

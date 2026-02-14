import { FaTimes, FaQuestionCircle } from 'react-icons/fa';

const ScreeningSettings = ({ questions, onAdd, onUpdate, onRemove }) => (
  <div className="settings-tab">
    <div className="tab-header">
      <h4>{'Ü'}ye Tarama Sorular{'ı'}</h4>
      <button className="add-btn" onClick={onAdd}>+ Soru Ekle</button>
    </div>

    <p className="tab-description">
      Yeni {'ü'}yeler sunucuya kat{'ı'}lmadan {'ö'}nce bu sorular{'ı'} yan{'ı'}tlamal{'ı'}d{'ı'}r.
    </p>

    {questions.length === 0 ? (
      <div className="empty-rules">
        <FaQuestionCircle />
        <p>Hen{'ü'}z soru eklenmemi{'ş'}</p>
      </div>
    ) : (
      <div className="questions-list">
        {questions.map((q, idx) => (
          <div key={q.id} className="question-item">
            <span className="question-number">{idx + 1}</span>
            <div className="question-content">
              <input type="text" placeholder="Soruyu yazın..." value={q.question} onChange={(e) => onUpdate(q.id, 'question', e.target.value)} />
              <label className="required-toggle">
                <input type="checkbox" checked={q.required} onChange={(e) => onUpdate(q.id, 'required', e.target.checked)} />
                <span>Zorunlu</span>
              </label>
            </div>
            <button className="remove-btn" onClick={() => onRemove(q.id)}><FaTimes /></button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default ScreeningSettings;

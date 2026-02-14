import { FaTimes, FaQuestionCircle } from 'react-icons/fa';

const ScreeningSettings = ({ questions, onAdd, onUpdate, onRemove }) => (
  <div className="settings-tab">
    <div className="tab-header">
      <h4>{'\u00DC'}ye Tarama Sorular{'\u0131'}</h4>
      <button className="add-btn" onClick={onAdd}>+ Soru Ekle</button>
    </div>

    <p className="tab-description">
      Yeni {'\u00FC'}yeler sunucuya kat{'\u0131'}lmadan {'\u00F6'}nce bu sorular{'\u0131'} yan{'\u0131'}tlamal{'\u0131'}d{'\u0131'}r.
    </p>

    {questions.length === 0 ? (
      <div className="empty-rules">
        <FaQuestionCircle />
        <p>Hen{'\u00FC'}z soru eklenmemi{'\u015F'}</p>
      </div>
    ) : (
      <div className="questions-list">
        {questions.map((q, idx) => (
          <div key={q.id} className="question-item">
            <span className="question-number">{idx + 1}</span>
            <div className="question-content">
              <input type="text" placeholder="Soruyu yaz\u0131n..." value={q.question} onChange={(e) => onUpdate(q.id, 'question', e.target.value)} />
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

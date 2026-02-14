import { FaTimes, FaClipboardList } from 'react-icons/fa';

const RulesSettings = ({ rules, onAdd, onUpdate, onRemove }) => (
  <div className="settings-tab">
    <div className="tab-header">
      <h4>Sunucu Kurallar{'ı'}</h4>
      <button className="add-btn" onClick={onAdd}>+ Kural Ekle</button>
    </div>

    {rules.length === 0 ? (
      <div className="empty-rules">
        <FaClipboardList />
        <p>Hen{'ü'}z kural eklenmemi{'ş'}</p>
      </div>
    ) : (
      <div className="rules-list">
        {rules.map((rule, idx) => (
          <div key={rule.id} className="rule-item">
            <span className="rule-number">{idx + 1}</span>
            <div className="rule-content">
              <input type="text" placeholder="Kural başlığı..." value={rule.title} onChange={(e) => onUpdate(rule.id, 'title', e.target.value)} />
              <textarea placeholder="Kural açıklaması..." value={rule.description} onChange={(e) => onUpdate(rule.id, 'description', e.target.value)} rows="2" />
            </div>
            <button className="remove-btn" onClick={() => onRemove(rule.id)}><FaTimes /></button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default RulesSettings;

import { FaTimes, FaClipboardList } from 'react-icons/fa';

const RulesSettings = ({ rules, onAdd, onUpdate, onRemove }) => (
  <div className="settings-tab">
    <div className="tab-header">
      <h4>Sunucu Kurallar{'\u0131'}</h4>
      <button className="add-btn" onClick={onAdd}>+ Kural Ekle</button>
    </div>

    {rules.length === 0 ? (
      <div className="empty-rules">
        <FaClipboardList />
        <p>Hen{'\u00FC'}z kural eklenmemi{'\u015F'}</p>
      </div>
    ) : (
      <div className="rules-list">
        {rules.map((rule, idx) => (
          <div key={rule.id} className="rule-item">
            <span className="rule-number">{idx + 1}</span>
            <div className="rule-content">
              <input type="text" placeholder="Kural ba\u015Fl\u0131\u011F\u0131..." value={rule.title} onChange={(e) => onUpdate(rule.id, 'title', e.target.value)} />
              <textarea placeholder="Kural a\u00E7\u0131klamas\u0131..." value={rule.description} onChange={(e) => onUpdate(rule.id, 'description', e.target.value)} rows="2" />
            </div>
            <button className="remove-btn" onClick={() => onRemove(rule.id)}><FaTimes /></button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default RulesSettings;

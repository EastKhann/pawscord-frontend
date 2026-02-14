import usePrivacySettings, { SECTIONS } from './PrivacySettingsPanel/usePrivacySettings';
import './PrivacySettingsPanel.css';

const ToggleItem = ({ label, desc, checked, onChange }) => (
  <div className="setting-item">
    <div className="setting-info"><div className="setting-label">{label}</div><div className="setting-desc">{desc}</div></div>
    <label className="toggle-switch"><input type="checkbox" checked={checked} onChange={onChange} /><span className="slider" /></label>
  </div>
);

const PrivacySettingsPanel = ({ onClose }) => {
  const p = usePrivacySettings();

  if (p.loading) {
    return <div className="privacy-settings-overlay"><div className="privacy-settings-panel"><div className="loading-state"><div className="spinner" /><p>Gizlilik ayarlar\u0131 y\u00fckleniyor...</p></div></div></div>;
  }

  return (
    <div className="privacy-settings-overlay" onClick={onClose}>
      <div className="privacy-settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="privacy-settings-header">
          <h2>{'\uD83D\uDD12'} Gizlilik ve G\u00fcvenlik Ayarlar\u0131</h2>
          <button className="close-btn" onClick={onClose}>\u00d7</button>
        </div>

        <div className="privacy-settings-content">
          {SECTIONS.map((section, si) => (
            <div key={si} className="settings-section">
              <h3>{section.title}</h3>
              <div className="settings-group">
                {section.toggles.map(t => (
                  <ToggleItem key={t.key} label={t.label} desc={t.desc} checked={p.settings[t.key]} onChange={() => p.toggleSetting(t.key)} />
                ))}
              </div>
              {section.hasExport && <button className="export-data-btn" onClick={p.requestDataExport}>{'\uD83D\uDCE5'} Verilerimi D\u0131\u015fa Aktar</button>}
            </div>
          ))}

          {/* Message Filtering - special section */}
          <div className="settings-section">
            <h3>{'\uD83D\uDEE1\uFE0F'} Mesaj Filtreleme</h3>
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info"><div className="setting-label">A\u00e7\u0131k i\u00e7erik filtresi</div><div className="setting-desc">Mesajlardaki m\u00fcstehcen i\u00e7eri\u011fi otomatik tara</div></div>
                <select className="explicit-filter-select" value={p.settings.explicit_content_filter} onChange={(e) => p.updateExplicitFilter(e.target.value)}>
                  <option value="none">Kapal\u0131</option><option value="friends">Arkada\u015flar hari\u00e7</option><option value="all">Herkesten tara</option>
                </select>
              </div>
              <ToggleItem label="Engellenmi\u015f kelime filtresi" desc="Belirledi\u011finiz kelimeleri i\u00e7eren mesajlar\u0131 gizleyin" checked={p.settings.blocked_words_filter_enabled} onChange={() => p.toggleSetting('blocked_words_filter_enabled')} />
            </div>
            {p.settings.blocked_words_filter_enabled && (
              <div className="blocked-words-section">
                <h4>Engellenmi\u015f Kelimeler</h4>
                <div className="add-word-form">
                  <input type="text" placeholder="Engellenecek kelime..." value={p.newWord} onChange={(e) => p.setNewWord(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && p.addBlockedWord()} />
                  <button className="add-word-btn" onClick={p.addBlockedWord}>{'\u2795'} Ekle</button>
                </div>
                {p.blockedWords.length > 0 ? (
                  <div className="blocked-words-list">
                    {p.blockedWords.map((word, i) => <div key={i} className="blocked-word-item"><span>{word}</span><button className="remove-word-btn" onClick={() => p.removeBlockedWord(word)}>{'\u2715'}</button></div>)}
                  </div>
                ) : <p className="empty-state">Hen\u00fcz engellenmi\u015f kelime yok</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingsPanel;

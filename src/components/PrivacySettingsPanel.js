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
    return <div className="privacy-settings-overlay"><div className="privacy-settings-panel"><div className="loading-state"><div className="spinner" /><p>Gizlilik ayarları yükleniyor...</p></div></div></div>;
  }

  return (
    <div className="privacy-settings-overlay" onClick={onClose}>
      <div className="privacy-settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="privacy-settings-header">
          <h2>{'🔒'} Gizlilik ve Güvenlik Ayarları</h2>
          <button className="close-btn" onClick={onClose}>×</button>
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
              {section.hasExport && <button className="export-data-btn" onClick={p.requestDataExport}>{'📥'} Verilerimi Dışa Aktar</button>}
            </div>
          ))}

          {/* Message Filtering - special section */}
          <div className="settings-section">
            <h3>{'🛡️'} Mesaj Filtreleme</h3>
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info"><div className="setting-label">Açık içerik filtresi</div><div className="setting-desc">Mesajlardaki müstehcen içeriği otomatik tara</div></div>
                <select className="explicit-filter-select" value={p.settings.explicit_content_filter} onChange={(e) => p.updateExplicitFilter(e.target.value)}>
                  <option value="none">Kapalı</option><option value="friends">Arkadaşlar hariç</option><option value="all">Herkesten tara</option>
                </select>
              </div>
              <ToggleItem label="Engellenmiş kelime filtresi" desc="Belirlediğiniz kelimeleri içeren mesajları gizleyin" checked={p.settings.blocked_words_filter_enabled} onChange={() => p.toggleSetting('blocked_words_filter_enabled')} />
            </div>
            {p.settings.blocked_words_filter_enabled && (
              <div className="blocked-words-section">
                <h4>Engellenmiş Kelimeler</h4>
                <div className="add-word-form">
                  <input type="text" placeholder="Engellenecek kelime..." value={p.newWord} onChange={(e) => p.setNewWord(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && p.addBlockedWord()} />
                  <button className="add-word-btn" onClick={p.addBlockedWord}>{'➕'} Ekle</button>
                </div>
                {p.blockedWords.length > 0 ? (
                  <div className="blocked-words-list">
                    {p.blockedWords.map((word, i) => <div key={i} className="blocked-word-item"><span>{word}</span><button className="remove-word-btn" onClick={() => p.removeBlockedWord(word)}>{'✕'}</button></div>)}
                  </div>
                ) : <p className="empty-state">Henüz engellenmiş kelime yok</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingsPanel;

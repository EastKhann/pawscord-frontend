const SettingsView = ({ settings, setSettings }) => (
  <div className="settings-view">
    <div className="setting-group">
      <label>Kayıt Kalitesi</label>
      <select value={settings.quality} onChange={(e) => setSettings({ ...settings, quality: e.target.value })}>
        <option value="low">Düşük (64 kbps)</option>
        <option value="medium">Orta (128 kbps)</option>
        <option value="high">Yüksek (256 kbps)</option>
        <option value="lossless">Kayıpsız (FLAC)</option>
      </select>
    </div>

    <div className="setting-group">
      <label>Format</label>
      <select value={settings.format} onChange={(e) => setSettings({ ...settings, format: e.target.value })}>
        <option value="mp3">MP3</option>
        <option value="webm">WebM</option>
        <option value="wav">WAV</option>
        <option value="ogg">OGG</option>
      </select>
    </div>

    {[
      { key: 'auto_transcribe', label: 'Otomatik Transkript', desc: 'Kaydı metne dönüştür' },
      { key: 'save_to_cloud', label: 'Buluta Kaydet', desc: 'Kayıtları sunucuya yükle' },
      { key: 'noise_suppression', label: 'Gürültü Bastırma', desc: 'Arka plan gürültüsünü azalt' },
    ].map(toggle => (
      <div key={toggle.key} className="setting-group toggle">
        <div className="toggle-info">
          <label>{toggle.label}</label>
          <span>{toggle.desc}</span>
        </div>
        <button
          className={`toggle-btn ${settings[toggle.key] ? 'active' : ''}`}
          onClick={() => setSettings({ ...settings, [toggle.key]: !settings[toggle.key] })}
        >
          <span className="toggle-slider" />
        </button>
      </div>
    ))}
  </div>
);

export default SettingsView;

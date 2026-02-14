const SettingsView = ({ settings, setSettings }) => (
  <div className="settings-view">
    <div className="setting-group">
      <label>Kay\u0131t Kalitesi</label>
      <select value={settings.quality} onChange={(e) => setSettings({ ...settings, quality: e.target.value })}>
        <option value="low">D\u00fc\u015f\u00fck (64 kbps)</option>
        <option value="medium">Orta (128 kbps)</option>
        <option value="high">Y\u00fcksek (256 kbps)</option>
        <option value="lossless">Kay\u0131ps\u0131z (FLAC)</option>
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
      { key: 'auto_transcribe', label: 'Otomatik Transkript', desc: 'Kayd\u0131 metne d\u00f6n\u00fc\u015ft\u00fcr' },
      { key: 'save_to_cloud', label: 'Buluta Kaydet', desc: 'Kay\u0131tlar\u0131 sunucuya y\u00fckle' },
      { key: 'noise_suppression', label: 'G\u00fcr\u00fclt\u00fc Bast\u0131rma', desc: 'Arka plan g\u00fcr\u00fclt\u00fcs\u00fcn\u00fc azalt' },
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

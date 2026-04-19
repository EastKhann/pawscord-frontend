/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const SettingsView = ({ settings, setSettings }) => {
  const { t } = useTranslation();
  return (
  <div className="settings-view">
    <div className="setting-group">
      <label>{t('kayıt_kalitesi')}</label>
      <select value={settings.quality} onChange={(e) => setSettings({ ...settings, quality: e.target.value })}
        <option value="low">{t('low_64_kbps')}</option>
        <option value="medium">{t('orta_128_kbps')}</option>
        <option value="high">{t('high_256_kbps')}</option>
        <option value="lossless">{t('kayıpsız_flac')}</option>
      </select>
    </div>

    <div className="setting-group">
      <label>{t('format')}</label>
      <select value={settings.format} onChange={(e) => setSettings({ ...settings, format: e.target.value })}
        <option value="mp3">{t('mp3')}</option>
        <option value="webm">{t('webm')}</option>
        <option value="wav">{t('wav')}</option>
        <option value="ogg">{t('ogg')}</option>
      </select>
    </div >

{
  [
    { key: 'auto_transcribe', label: 'Auto Transkript', desc: t('ui.kaydi_metne_donustur') },
    { key: 'save_to_cloud', label: 'Buluta Kaydet', desc: t('ui.kayitlari_sunucuya_upload') },
    { key: 'noise_suppression', label: t('settings.tabs.voice.noiseSuppression'), desc: 'Arka plan gürültüsünü azalt' },
    ].map(toggle => (
      <div key={toggle.key} className="setting-group toggle">
        <div className="toggle-info">
          <label>{toggle.label}</label>
          <span>{toggle.desc}</span>
        </div>
        <button
          className={`toggle-btn ${settings[toggle.key] ? 'active' : ''}`}
          onClick={() => setSettings({ ...settings, [toggle.key]: !settings[toggle.key] })}>
          <span className="toggle-slider" />
        </button>
      </div>
    ))
}
  </div >
    );
}

SettingsView.propTypes = {
  settings: PropTypes.object,
  setSettings: PropTypes.func,
};
export default SettingsView;

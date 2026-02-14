import { FaCog, FaSync } from 'react-icons/fa';

const AdvancedTab = ({ settings, updateSetting, resetSettings }) => (
    <div className="tab-content">
        <div className="settings-card">
            <div className="card-header">
                <FaCog className="card-icon" />
                <h3>🔧 Ses Kalitesi</h3>
            </div>
            <div className="advanced-options">
                <div className="option-row">
                    <label>Bit Hızı (Bitrate)</label>
                    <select value={settings.audio_bitrate}
                        onChange={(e) => updateSetting('audio_bitrate', parseInt(e.target.value))}>
                        <option value="32000">32 kbps (Düşük)</option>
                        <option value="64000">64 kbps (Normal)</option>
                        <option value="96000">96 kbps (Yüksek)</option>
                        <option value="128000">128 kbps (En İyi)</option>
                    </select>
                </div>
                <div className="option-row">
                    <label>Örnekleme Hızı</label>
                    <select value={settings.sample_rate}
                        onChange={(e) => updateSetting('sample_rate', parseInt(e.target.value))}>
                        <option value="24000">24 kHz</option>
                        <option value="48000">48 kHz (Önerilen)</option>
                    </select>
                </div>
                <div className="toggle-row">
                    <div>
                        <span>Stereo Ses</span>
                        <span className="option-desc">Müzik paylaşımı için</span>
                    </div>
                    <label className="toggle-switch">
                        <input type="checkbox" checked={settings.stereo_audio}
                            onChange={(e) => updateSetting('stereo_audio', e.target.checked)} />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
        </div>

        <div className="settings-card danger-card">
            <div className="card-header">
                <FaSync className="card-icon" />
                <h3>🔄 Ayarları Sıfırla</h3>
            </div>
            <p className="card-description">Tüm ses ayarlarını varsayılan değerlerine döndürür</p>
            <button className="reset-btn" onClick={resetSettings}><FaSync /> Varsayılana Dön</button>
        </div>
    </div>
);

export default AdvancedTab;

import { FaHeadphones, FaVolumeUp, FaMusic } from 'react-icons/fa';

const OutputTab = ({ settings, updateSetting, devices }) => (
    <div className="tab-content">
        <div className="settings-card">
            <div className="card-header">
                <FaHeadphones className="card-icon" />
                <h3>Çıkış Cihazı</h3>
            </div>
            <select value={settings.output_device} onChange={(e) => updateSetting('output_device', e.target.value)} className="device-select">
                <option value="default">🔊 Varsayılan Hoparlör</option>
                {devices.output.map(device => (
                    <option key={device.deviceId} value={device.deviceId}>{device.label || 'Bilinmeyen Hoparlör'}</option>
                ))}
            </select>
        </div>

        <div className="settings-card">
            <div className="card-header">
                <FaVolumeUp className="card-icon" />
                <h3>Çıkış Seviyesi</h3>
                <span className="value-badge">{settings.output_volume}%</span>
            </div>
            <input type="range" min="0" max="200" value={settings.output_volume}
                onChange={(e) => updateSetting('output_volume', parseInt(e.target.value))} className="premium-slider" />
        </div>

        <div className="settings-card">
            <div className="card-header">
                <FaMusic className="card-icon" />
                <h3>Uygulama Sesi Azaltma</h3>
                <span className="value-badge">{settings.attenuation}%</span>
            </div>
            <p className="card-description">Biri konuşurken diğer uygulama seslerini azalt</p>
            <input type="range" min="0" max="100" value={settings.attenuation}
                onChange={(e) => updateSetting('attenuation', parseInt(e.target.value))} className="premium-slider" />
            <div className="toggle-row">
                <span>Konuşurken Aktif</span>
                <label className="toggle-switch">
                    <input type="checkbox" checked={settings.attenuation_while_speaking}
                        onChange={(e) => updateSetting('attenuation_while_speaking', e.target.checked)} />
                    <span className="slider"></span>
                </label>
            </div>
        </div>
    </div>
);

export default OutputTab;

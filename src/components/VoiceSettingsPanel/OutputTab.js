/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaHeadphones, FaVolumeUp, FaMusic } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const OutputTab = ({ settings, updateSetting, devices }) => {
    const { t } = useTranslation();
    return (
        <div className="tab-content">
            <div className="settings-card">
                <div className="card-header">
                    <FaHeadphones className="card-icon" />
                    <h3>{t('logout_cihazı')}</h3>
                </div>
                <select
                    value={settings.output_device}
                    onChange={(e) => updateSetting('output_device', e.target.value)}
                    className="device-select"
                >
                    <option value="default">{t('🔊_default_hoparlör')}</option>
                    {devices.output.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                            {device.label || t('ui.bilinmeyen_hoparlor')}
                        </option>
                    ))}
                </select>
            </div>

            <div className="settings-card">
                <div className="card-header">
                    <FaVolumeUp className="card-icon" />
                    <h3>{t('logout_levelsi')}</h3>
                    <span className="value-badge">{settings.output_volume}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={settings.output_volume}
                    onChange={(e) => updateSetting('output_volume', parseInt(e.target.value))}
                    className="premium-slider"
                />
            </div>

            <div className="settings-card">
                <div className="card-header">
                    <FaMusic className="card-icon" />
                    <h3>{t('uygulama_sesi_azaltma')}</h3>
                    <span className="value-badge">{settings.attenuation}%</span>
                </div>
                <p className="card-description">
                    {t('biri_konuşurken_diğer_uygulama_seslerini_azalt')}
                </p>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.attenuation}
                    onChange={(e) => updateSetting('attenuation', parseInt(e.target.value))}
                    className="premium-slider"
                />
                <div className="toggle-row">
                    <span>{t('konuşurken_active')}</span>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.attenuation_while_speaking}
                            onChange={(e) =>
                                updateSetting('attenuation_while_speaking', e.target.checked)
                            }
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

OutputTab.propTypes = {
    settings: PropTypes.object,
    updateSetting: PropTypes.func,
    devices: PropTypes.array,
};
export default OutputTab;

/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaCog, FaSync } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const AdvancedTab = ({ settings, updateSetting, resetSettings }) => {
    const { t } = useTranslation();
    return (
        <div className="tab-content">
            <div className="settings-card">
                <div className="card-header">
                    <FaCog className="card-icon" />
                    <h3>{t('🔧_ses_kalitesi')}</h3>
                </div>
                <div className="advanced-options">
                    <div className="option-row">
                        <label>{t('bit_hızı_bitrate')}</label>
                        <select
                            value={settings.audio_bitrate}
                            onChange={(e) =>
                                updateSetting('audio_bitrate', parseInt(e.target.value))
                            }
                        >
                            <option value="32000">{t('32_kbps_low')}</option>
                            <option value="64000">{t('64_kbps_normal')}</option>
                            <option value="96000">{t('96_kbps_high')}</option>
                            <option value="128000">{t('128_kbps_en_i̇yi')}</option>
                        </select>
                    </div>
                    <div className="option-row">
                        <label>{t('örnaddme_hızı')}</label>
                        <select
                            value={settings.sample_rate}
                            onChange={(e) => updateSetting('sample_rate', parseInt(e.target.value))}
                        >
                            <option value="24000">{t('24_khz')}</option>
                            <option value="48000">{t('48_khz_önerilen')}</option>
                        </select>
                    </div>
                    <div className="toggle-row">
                        <div>
                            <span>{t('stereo_ses')}</span>
                            <span className="option-desc">{t('müzik_shareı_for')}</span>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.stereo_audio}
                                onChange={(e) => updateSetting('stereo_audio', e.target.checked)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="settings-card danger-card">
                <div className="card-header">
                    <FaSync className="card-icon" />
                    <h3>{t('🔄_ayarları_sıfırla')}</h3>
                </div>
                <p className="card-description">
                    {t('tüm_audio_settingsını_varsailan_değerlerine_döndürür')}
                </p>
                <button className="reset-btn" onClick={resetSettings}>
                    <FaSync />
                    {t('defaulta_dön')}
                </button>
            </div>
        </div>
    );
};

AdvancedTab.propTypes = {
    settings: PropTypes.object,
    updateSetting: PropTypes.func,
    resetSettings: PropTypes.func,
};
export default AdvancedTab;

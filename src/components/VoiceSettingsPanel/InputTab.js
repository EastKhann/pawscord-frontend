import {
    FaMicrophone,
    FaSlidersH,
    FaWaveSquare,
    FaExclamationTriangle,
    FaPlay,
    FaStop,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const InputTab = ({
    settings,
    updateSetting,
    devices,
    micLevel,
    isTesting,
    startMicTest,
    stopMicTest,
}) => {
    const { t } = useTranslation();
    return (
        <div className="tab-content">
            <div className="settings-card">
                <div className="card-header">
                    <FaMicrophone className="card-icon" />
                    <h3>{t('mikrofon_cihazı')}</h3>
                </div>
                <select
                    value={settings.input_device}
                    onChange={(e) => updateSetting('input_device', e.target.value)}
                    className="device-select"
                >
                    <option value="default">{t('🎙️_default_mikrofon')}</option>
                    {devices.input.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                            {device.label || t('voice.unknownMic')}
                        </option>
                    ))}
                </select>
            </div>

            <div className="settings-card">
                <div className="card-header">
                    <FaSlidersH className="card-icon" />
                    <h3>{t('mikrofon_levelsi')}</h3>
                    <span className="value-badge">{settings.input_volume}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={settings.input_volume}
                    onChange={(e) => updateSetting('input_volume', parseInt(e.target.value))}
                    className="premium-slider"
                />
                <div className="slider-labels">
                    <span>0%</span>
                    <span>100%</span>
                    <span>200%</span>
                </div>
            </div>

            <div className="settings-card mic-test-card">
                <div className="card-header">
                    <FaWaveSquare className="card-icon" />
                    <h3>{t('mikrofon_testi')}</h3>
                </div>
                <div className="mic-test-area">
                    <div className="mic-level-container">
                        <div className="mic-level-bar" style={{ width: `${micLevel}%` }}>
                            <div className="mic-level-glow"></div>
                        </div>
                        <div className="mic-level-markers">
                            {[...Array(10)].map((_, i) => (
                                <div
                                    key={`item-${i}`}
                                    className={`marker ${micLevel > i * 10 ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mic-level-info">
                        <span className="level-text">{Math.round(micLevel)}%</span>
                        {micLevel > 80 && <FaExclamationTriangle className="warning-icon" />}
                    </div>
                    <button
                        className={`test-btn ${isTesting ? 'testing' : ''}`}
                        onClick={isTesting ? stopMicTest : startMicTest}
                    >
                        {isTesting ? (
                            <>
                                <FaStop />
                                {t('testi_stop')}
                            </>
                        ) : (
                            <>
                                <FaPlay />
                                {t('mikrofonu_test_et')}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

InputTab.propTypes = {
    settings: PropTypes.object,
    updateSetting: PropTypes.func,
    devices: PropTypes.array,
    micLevel: PropTypes.object,
    isTesting: PropTypes.bool,
    startMicTest: PropTypes.object,
    stopMicTest: PropTypes.object,
};
export default InputTab;

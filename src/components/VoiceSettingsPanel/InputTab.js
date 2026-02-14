import { FaMicrophone, FaSlidersH, FaWaveSquare, FaExclamationTriangle, FaPlay, FaStop } from 'react-icons/fa';

const InputTab = ({ settings, updateSetting, devices, micLevel, isTesting, startMicTest, stopMicTest }) => (
    <div className="tab-content">
        <div className="settings-card">
            <div className="card-header">
                <FaMicrophone className="card-icon" />
                <h3>Mikrofon Cihazı</h3>
            </div>
            <select value={settings.input_device} onChange={(e) => updateSetting('input_device', e.target.value)} className="device-select">
                <option value="default">🎙️ Varsayılan Mikrofon</option>
                {devices.input.map(device => (
                    <option key={device.deviceId} value={device.deviceId}>{device.label || 'Bilinmeyen Mikrofon'}</option>
                ))}
            </select>
        </div>

        <div className="settings-card">
            <div className="card-header">
                <FaSlidersH className="card-icon" />
                <h3>Mikrofon Seviyesi</h3>
                <span className="value-badge">{settings.input_volume}%</span>
            </div>
            <input type="range" min="0" max="200" value={settings.input_volume}
                onChange={(e) => updateSetting('input_volume', parseInt(e.target.value))} className="premium-slider" />
            <div className="slider-labels"><span>0%</span><span>100%</span><span>200%</span></div>
        </div>

        <div className="settings-card mic-test-card">
            <div className="card-header">
                <FaWaveSquare className="card-icon" />
                <h3>Mikrofon Testi</h3>
            </div>
            <div className="mic-test-area">
                <div className="mic-level-container">
                    <div className="mic-level-bar" style={{ width: `${micLevel}%` }}>
                        <div className="mic-level-glow"></div>
                    </div>
                    <div className="mic-level-markers">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className={`marker ${micLevel > i * 10 ? 'active' : ''}`} />
                        ))}
                    </div>
                </div>
                <div className="mic-level-info">
                    <span className="level-text">{Math.round(micLevel)}%</span>
                    {micLevel > 80 && <FaExclamationTriangle className="warning-icon" />}
                </div>
                <button className={`test-btn ${isTesting ? 'testing' : ''}`} onClick={isTesting ? stopMicTest : startMicTest}>
                    {isTesting ? <><FaStop /> Testi Durdur</> : <><FaPlay /> Mikrofonu Test Et</>}
                </button>
            </div>
        </div>
    </div>
);

export default InputTab;

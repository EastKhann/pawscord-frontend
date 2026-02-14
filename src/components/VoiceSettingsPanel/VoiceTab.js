import { toast } from 'react-toastify';
import { FaMicrophone, FaWaveSquare, FaKeyboard, FaSlidersH, FaMicrophoneSlash } from 'react-icons/fa';

const VoiceTab = ({ settings, updateSetting, updateSettings, micLevel, voice }) => {
    const { isPTTMode, togglePTTMode, vadSensitivity, updateVadSensitivity, pttKey, updatePTTKey } = voice;

    return (
        <div className="tab-content">
            {/* Giriş Modu */}
            <div className="settings-card">
                <div className="card-header">
                    <FaMicrophone className="card-icon" />
                    <h3>🎙️ Giriş Modu</h3>
                </div>
                <div className="input-mode-selector">
                    <label className={`mode-card ${!isPTTMode && settings.voice_activity ? 'selected' : ''}`}>
                        <input type="radio" checked={!isPTTMode}
                            onChange={() => {
                                updateSettings({ ...settings, voice_activity: true, push_to_talk: false });
                                if (isPTTMode && togglePTTMode) togglePTTMode();
                                toast.success('🎤 Ses aktivasyonu açıldı');
                            }} />
                        <div className="mode-content">
                            <FaWaveSquare className="mode-icon" />
                            <span className="mode-title">Ses Aktivasyonu</span>
                            <span className="mode-desc">Konuştuğunuzda otomatik aktif olur</span>
                        </div>
                    </label>

                    <label className={`mode-card ${isPTTMode || settings.push_to_talk ? 'selected' : ''}`}>
                        <input type="radio" checked={isPTTMode}
                            onChange={() => {
                                updateSettings({ ...settings, voice_activity: false, push_to_talk: true });
                                if (!isPTTMode && togglePTTMode) togglePTTMode();
                                toast.success('⌨️ Bas Konuş modu açıldı');
                            }} />
                        <div className="mode-content">
                            <FaKeyboard className="mode-icon" />
                            <span className="mode-title">Bas Konuş</span>
                            <span className="mode-desc">Tuşa basılı tutarak konuşun</span>
                        </div>
                    </label>
                </div>
            </div>

            {/* Ses Aktivasyonu Ayarları */}
            {!isPTTMode && (
                <div className="settings-card">
                    <div className="card-header">
                        <FaSlidersH className="card-icon" />
                        <h3>Hassasiyet Ayarları</h3>
                    </div>
                    <div className="sensitivity-control">
                        <div className="sensitivity-header">
                            <span>Mikrofon Hassasiyeti</span>
                            <span className="value-badge">{vadSensitivity || settings.input_sensitivity}%</span>
                        </div>
                        <input type="range" min="20" max="80" value={vadSensitivity || settings.input_sensitivity}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                updateSetting('input_sensitivity', val);
                                if (updateVadSensitivity) updateVadSensitivity(val);
                            }} className="premium-slider sensitivity" />
                        <div className="sensitivity-hint">
                            <FaMicrophoneSlash />
                            <span>Düşük = Daha sessiz sesleri algılar</span>
                        </div>
                        <div className="sensitivity-visualizer">
                            <div className="threshold-line" style={{ left: `${((vadSensitivity || settings.input_sensitivity) - 20) / 60 * 100}%` }} />
                            <div className="level-indicator" style={{ width: `${micLevel}%` }} />
                        </div>
                        <div className="visualizer-labels"><span>Sessiz</span><span>Yüksek</span></div>
                    </div>
                </div>
            )}

            {/* Bas Konuş Ayarları */}
            {isPTTMode && (
                <div className="settings-card">
                    <div className="card-header">
                        <FaKeyboard className="card-icon" />
                        <h3>Bas Konuş Ayarları</h3>
                    </div>
                    <div className="ptt-settings">
                        <div className="ptt-key-bind">
                            <label>Tuş Ataması</label>
                            <input type="text" value={pttKey || settings.push_to_talk_key}
                                onKeyDown={(e) => {
                                    e.preventDefault();
                                    updateSetting('push_to_talk_key', e.code);
                                    if (updatePTTKey) updatePTTKey(e.code);
                                    toast.info(`⌨️ Tuş: ${e.code}`);
                                }}
                                placeholder="Bir tuşa basın..." className="key-input" readOnly />
                        </div>
                        <div className="ptt-delay">
                            <label>Bırakma Gecikmesi</label>
                            <select value={settings.ptt_release_delay}
                                onChange={(e) => updateSetting('ptt_release_delay', parseInt(e.target.value))}>
                                <option value="0">0ms (Anında)</option>
                                <option value="100">100ms</option>
                                <option value="200">200ms (Önerilen)</option>
                                <option value="300">300ms</option>
                                <option value="500">500ms</option>
                            </select>
                            <span className="hint">Tuşu bıraktıktan sonra mikrofon açık kalma süresi</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceTab;

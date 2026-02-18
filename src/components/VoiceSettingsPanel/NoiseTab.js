import { useCallback, memo } from 'react';
import { toast } from 'react-toastify';
import { FaShieldAlt, FaWaveSquare, FaBolt, FaSlidersH } from 'react-icons/fa';

const NoiseTab = memo(({ settings, updateSetting, applyAudioConstraints, voice }) => {
    const { isNoiseSuppressionEnabled, toggleNoiseSuppression, updateNoiseSuppressionLevel, noiseSuppressionLevel } = voice;

    const handleNoiseSuppressionToggle = useCallback((e) => {
        updateSetting('noise_suppression', e.target.checked);
        if (toggleNoiseSuppression && isNoiseSuppressionEnabled !== e.target.checked) toggleNoiseSuppression();
        toast.success(e.target.checked ? '🛡️ Gürültü engelleme açıldı' : '🔇 Gürültü engelleme kapatıldı');
    }, [updateSetting, toggleNoiseSuppression, isNoiseSuppressionEnabled]);

    const handleNoiseLevel = useCallback((levelId, levelLabel) => {
        updateSetting('noise_suppression_level', levelId);
        if (updateNoiseSuppressionLevel) updateNoiseSuppressionLevel(levelId);
        toast.info(`🎚️ Gürültü seviyesi: ${levelLabel}`);
    }, [updateSetting, updateNoiseSuppressionLevel]);

    const handleEchoCancellationToggle = useCallback((e) => {
        updateSetting('echo_cancellation', e.target.checked);
        applyAudioConstraints({ echoCancellation: e.target.checked });
    }, [updateSetting, applyAudioConstraints]);

    const handleEchoCancellationLevel = useCallback(e => updateSetting('echo_cancellation_level', e.target.value), [updateSetting]);
    const handleNoiseGateToggle = useCallback(e => updateSetting('noise_gate', e.target.checked), [updateSetting]);
    const handleNoiseGateThreshold = useCallback(e => updateSetting('noise_gate_threshold', parseInt(e.target.value)), [updateSetting]);
    const handleNoiseGateAttack = useCallback(e => updateSetting('noise_gate_attack', parseInt(e.target.value)), [updateSetting]);
    const handleNoiseGateRelease = useCallback(e => updateSetting('noise_gate_release', parseInt(e.target.value)), [updateSetting]);
    const handleAGCToggle = useCallback(e => updateSetting('automatic_gain_control', e.target.checked), [updateSetting]);
    const handleHighPassToggle = useCallback(e => updateSetting('high_pass_filter', e.target.checked), [updateSetting]);
    const handleHighPassFrequency = useCallback(e => updateSetting('high_pass_frequency', parseInt(e.target.value)), [updateSetting]);

    return (
        <div className="tab-content">
            {/* Gürültü Bastırma */}
            <div className="settings-card highlight-card">
                <div className="card-header">
                    <FaShieldAlt className="card-icon premium" />
                    <h3>🛡️ Gürültü Bastırma</h3>
                    <label className="toggle-switch">
                        <input type="checkbox" checked={isNoiseSuppressionEnabled ?? settings.noise_suppression}
                            onChange={handleNoiseSuppressionToggle} />
                        <span className="slider"></span>
                    </label>
                </div>
                <p className="card-description">Fan sesi, klima, klavye sesi gibi arka plan gürültülerini engeller</p>

                {(isNoiseSuppressionEnabled ?? settings.noise_suppression) && (
                    <div className="noise-levels">
                        <span className="level-label">Seviye:</span>
                        <div className="level-buttons">
                            {[
                                { id: 'low', label: 'Düşük', desc: 'Minimal işleme' },
                                { id: 'medium', label: 'Orta', desc: 'Dengeli' },
                                { id: 'high', label: 'Yüksek', desc: 'Önerilen' },
                                { id: 'aggressive', label: 'Agresif', desc: 'Maksimum' }
                            ].map(level => (
                                <button key={level.id}
                                    className={`level-btn ${(noiseSuppressionLevel || settings.noise_suppression_level) === level.id ? 'active' : ''}`}
                                    onClick={() => handleNoiseLevel(level.id, level.label)}>
                                    <span className="level-name">{level.label}</span>
                                    <span className="level-desc">{level.desc}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Yankı Önleme */}
            <div className="settings-card">
                <div className="card-header">
                    <FaWaveSquare className="card-icon" />
                    <h3>🔇 Yankı Önleme</h3>
                    <label className="toggle-switch">
                        <input type="checkbox" checked={settings.echo_cancellation}
                            onChange={handleEchoCancellationToggle} />
                        <span className="slider"></span>
                    </label>
                </div>
                <p className="card-description">Hoparlörden gelen sesin mikrofona geri dönmesini engeller</p>
                {settings.echo_cancellation && (
                    <div className="level-selector">
                        <select value={settings.echo_cancellation_level}
                            onChange={handleEchoCancellationLevel} className="inline-select">
                            <option value="low">Düşük</option>
                            <option value="medium">Orta</option>
                            <option value="high">Yüksek (Önerilen)</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Noise Gate */}
            <div className="settings-card">
                <div className="card-header">
                    <FaBolt className="card-icon" />
                    <h3>⚡ Gürültü Kapısı (Noise Gate)</h3>
                    <label className="toggle-switch">
                        <input type="checkbox" checked={settings.noise_gate}
                            onChange={handleNoiseGateToggle} />
                        <span className="slider"></span>
                    </label>
                </div>
                <p className="card-description">Belirli ses seviyesinin altındaki sesleri tamamen engeller</p>
                {settings.noise_gate && (
                    <div className="gate-settings">
                        <div className="gate-slider">
                            <label>Eşik Değeri: <strong>{settings.noise_gate_threshold} dB</strong></label>
                            <input type="range" min="-80" max="-20" value={settings.noise_gate_threshold}
                                onChange={handleNoiseGateThreshold} className="premium-slider" />
                            <div className="slider-hint"><span>Hassas (-80)</span><span>Sert (-20)</span></div>
                        </div>
                        <div className="gate-timing">
                            <div className="timing-item">
                                <label>Açılış Süresi</label>
                                <select value={settings.noise_gate_attack}
                                    onChange={handleNoiseGateAttack}>
                                    <option value="5">5ms (Hızlı)</option>
                                    <option value="10">10ms (Normal)</option>
                                    <option value="20">20ms (Yumuşak)</option>
                                </select>
                            </div>
                            <div className="timing-item">
                                <label>Kapanış Süresi</label>
                                <select value={settings.noise_gate_release}
                                    onChange={handleNoiseGateRelease}>
                                    <option value="50">50ms (Hızlı)</option>
                                    <option value="100">100ms (Normal)</option>
                                    <option value="200">200ms (Yumuşak)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* AGC */}
            <div className="settings-card">
                <div className="card-header">
                    <FaSlidersH className="card-icon" />
                    <h3>🎚️ Otomatik Ses Ayarlama (AGC)</h3>
                    <label className="toggle-switch">
                        <input type="checkbox" checked={settings.automatic_gain_control}
                            onChange={handleAGCToggle} />
                        <span className="slider"></span>
                    </label>
                </div>
                <p className="card-description">Ses seviyenizi otomatik olarak dengeler</p>
                {settings.automatic_gain_control && (
                    <div className="agc-options">
                        {[
                            { id: 'moderate', label: 'Dengeli', desc: 'Doğal ses' },
                            { id: 'aggressive', label: 'Agresif', desc: 'Sabit seviye' }
                        ].map(opt => (
                            <label key={opt.id} className={`radio-card ${settings.agc_level === opt.id ? 'selected' : ''}`}>
                                <input type="radio" checked={settings.agc_level === opt.id}
                                    onChange={() => updateSetting('agc_level', opt.id)} />
                                <div className="radio-content">
                                    <span className="radio-label">{opt.label}</span>
                                    <span className="radio-desc">{opt.desc}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* High Pass Filter */}
            <div className="settings-card">
                <div className="card-header">
                    <FaWaveSquare className="card-icon" />
                    <h3>🔉 Düşük Frekans Filtresi</h3>
                    <label className="toggle-switch">
                        <input type="checkbox" checked={settings.high_pass_filter}
                            onChange={handleHighPassToggle} />
                        <span className="slider"></span>
                    </label>
                </div>
                <p className="card-description">Düşük frekanslı gürültüleri keser</p>
                {settings.high_pass_filter && (
                    <div className="frequency-selector">
                        <label>Kesim Frekansı:</label>
                        <select value={settings.high_pass_frequency}
                            onChange={handleHighPassFrequency}>
                            <option value="50">50 Hz (Minimal)</option>
                            <option value="80">80 Hz (Önerilen)</option>
                            <option value="100">100 Hz (Agresif)</option>
                            <option value="150">150 Hz (Çok Agresif)</option>
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
});

export default NoiseTab;

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaShieldAlt, FaWaveSquare, FaBolt, FaSlidersH } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const NoiseTab = memo(({ settings, updateSetting, applyAudioConstraints, voice }) => {
    const { t } = useTranslation();
    const {
        isNoiseSuppressionEnabled,
        toggleNoiseSuppression,
        updateNoiseSuppressionLevel,
        noiseSuppressionLevel,
    } = voice;

    const handleNoiseSuppressionToggle = useCallback(
        (e) => {
            updateSetting('noise_suppression', e.target.checked);
            if (toggleNoiseSuppression && isNoiseSuppressionEnabled !== e.target.checked)
                toggleNoiseSuppression();
            toast.success(
                e.target.checked
                    ? t('voice.noiseSuppressionEnabled', '🛡️ Gürültü bastırma etkinleştirildi')
                    : t('voice.noiseSuppressionDisabled', '🔇 Gürültü bastırma devre dışı')
            );
        },
        [updateSetting, toggleNoiseSuppression, isNoiseSuppressionEnabled, t]
    );

    const handleNoiseLevel = useCallback(
        (levelId, levelLabel) => {
            updateSetting('noise_suppression_level', levelId);
            if (updateNoiseSuppressionLevel) updateNoiseSuppressionLevel(levelId);
            toast.info(`${t('voice.noiseLevel', 'Gürültü seviyesi')}: ${levelLabel}`);
        },
        [updateSetting, updateNoiseSuppressionLevel, t]
    );

    const handleEchoCancellationToggle = useCallback(
        (e) => {
            updateSetting('echo_cancellation', e.target.checked);
            applyAudioConstraints({ echoCancellation: e.target.checked });
        },
        [updateSetting, applyAudioConstraints]
    );

    const handleEchoCancellationLevel = useCallback(
        (e) => updateSetting('echo_cancellation_level', e.target.value),
        [updateSetting]
    );
    const handleNoiseGateToggle = useCallback(
        (e) => updateSetting('noise_gate', e.target.checked),
        [updateSetting]
    );
    const handleNoiseGateThreshold = useCallback(
        (e) => updateSetting('noise_gate_threshold', parseInt(e.target.value)),
        [updateSetting]
    );
    const handleNoiseGateAttack = useCallback(
        (e) => updateSetting('noise_gate_attack', parseInt(e.target.value)),
        [updateSetting]
    );
    const handleNoiseGateRelease = useCallback(
        (e) => updateSetting('noise_gate_release', parseInt(e.target.value)),
        [updateSetting]
    );
    const handleAGCToggle = useCallback(
        (e) => updateSetting('automatic_gain_control', e.target.checked),
        [updateSetting]
    );
    const handleHighPassToggle = useCallback(
        (e) => updateSetting('high_pass_filter', e.target.checked),
        [updateSetting]
    );
    const handleHighPassFrequency = useCallback(
        (e) => updateSetting('high_pass_frequency', parseInt(e.target.value)),
        [updateSetting]
    );

    return (
        <div className="tab-content">
            {/* Noise Suppression */}
            <div className="settings-card highlight-card">
                <div className="card-header">
                    <FaShieldAlt className="card-icon premium" />
                    <h3>{t('🛡️_noise_suppression')}</h3>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={isNoiseSuppressionEnabled ?? settings.noise_suppression}
                            onChange={handleNoiseSuppressionToggle}
                            aria-label="checkbox"
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <p className="card-description">
                    {t('suppresses_background_noise_like_fans_ac_and_keyboard_sounds')}
                </p>

                {(isNoiseSuppressionEnabled ?? settings.noise_suppression) && (
                    <div className="noise-levels">
                        <span className="level-label">{t('level')}</span>
                        <div className="level-buttons">
                            {[
                                {
                                    id: 'low',
                                    label: t('voice.levelLow', 'Düşük'),
                                    desc: t('voice.levelLowDesc', 'Minimal işleme'),
                                },
                                {
                                    id: 'medium',
                                    label: t('voice.levelMedium', 'Orta'),
                                    desc: t('voice.levelMediumDesc', 'Dengeli'),
                                },
                                {
                                    id: 'high',
                                    label: t('voice.levelHigh', 'Yüksek'),
                                    desc: t('voice.levelHighDesc', 'Önerilen'),
                                },
                                {
                                    id: 'aggressive',
                                    label: t('voice.levelAggressive', 'Agresif'),
                                    desc: t('voice.levelAggressiveDesc', 'Maksimum'),
                                },
                            ].map((level) => (
                                <button
                                    key={level.id}
                                    className={`level-btn ${(noiseSuppressionLevel || settings.noise_suppression_level) === level.id ? 'active' : ''}`}
                                    onClick={() => handleNoiseLevel(level.id, level.label)}
                                >
                                    <span className="level-name">{level.label}</span>
                                    <span className="level-desc">{level.desc}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Echo Cancellation */}
            <div className="settings-card">
                <div className="card-header">
                    <FaWaveSquare className="card-icon" />
                    <h3>{t('🔇_echo_cancellation')}</h3>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.echo_cancellation}
                            onChange={handleEchoCancellationToggle}
                            aria-label="checkbox"
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <p className="card-description">
                    {t('prevents_speaker_audio_from_feeding_back_into_the_microphone')}
                </p>
                {settings.echo_cancellation && (
                    <div className="level-selector">
                        <select
                            value={settings.echo_cancellation_level}
                            onChange={handleEchoCancellationLevel}
                            className="inline-select"
                            aria-label="select"
                        >
                            <option value="low">{t('low')}</option>
                            <option value="medium">{t('orta')}</option>
                            <option value="high">{t('high_önerilen')}</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Noise Gate */}
            <div className="settings-card">
                <div className="card-header">
                    <FaBolt className="card-icon" />
                    <h3>{t('⚡_noise_gate')}</h3>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.noise_gate}
                            onChange={handleNoiseGateToggle}
                            aria-label="checkbox"
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <p className="card-description">
                    {t('deleteences_audio_below_a_certain_level_threshold')}
                </p>
                {settings.noise_gate && (
                    <div className="gate-settings">
                        <div className="gate-slider">
                            <label>
                                {t('threshold')}
                                <strong>{settings.noise_gate_threshold} dB</strong>
                            </label>
                            <input
                                type="range"
                                min="-80"
                                max="-20"
                                value={settings.noise_gate_threshold}
                                onChange={handleNoiseGateThreshold}
                                className="premium-slider"
                                aria-label="range"
                            />
                            <div className="slider-hint">
                                <span>{t('hassas_-80')}</span>
                                <span>{t('sert_-20')}</span>
                            </div>
                        </div>
                        <div className="gate-timing">
                            <div className="timing-item">
                                <label>{t('attack_duration')}</label>
                                <select
                                    value={settings.noise_gate_attack}
                                    onChange={handleNoiseGateAttack}
                                    aria-label="select"
                                >
                                    <option value="5">{t('5ms_hızlı')}</option>
                                    <option value="10">{t('10ms_normal')}</option>
                                    <option value="20">{t('20ms_yumuşak')}</option>
                                </select>
                            </div>
                            <div className="timing-item">
                                <label>{t('kapanış_durationsi')}</label>
                                <select
                                    value={settings.noise_gate_release}
                                    onChange={handleNoiseGateRelease}
                                    aria-label="select"
                                >
                                    <option value="50">{t('50ms_hızlı')}</option>
                                    <option value="100">{t('100ms_normal')}</option>
                                    <option value="200">{t('200ms_yumuşak')}</option>
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
                    <h3>{t('🎚️_otomatik_ses_ayarlama_agc')}</h3>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.automatic_gain_control}
                            onChange={handleAGCToggle}
                            aria-label="checkbox"
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <p className="card-description">{t('ses_seviyenizi_otomatik_olarak_dengeler')}</p>
                {settings.automatic_gain_control && (
                    <div className="agc-options">
                        {[
                            {
                                id: 'moderate',
                                label: t('voice.balanced'),
                                desc: t('ui.dogal_audio'),
                            },
                            {
                                id: 'aggressive',
                                label: t('voice.levelAggressive', 'Agresif'),
                                desc: t('voice.fixedLevel'),
                            },
                        ].map((opt) => (
                            <label
                                key={opt.id}
                                className={`radio-card ${settings.agc_level === opt.id ? 'selected' : ''}`}
                            >
                                <input
                                    type="radio"
                                    checked={settings.agc_level === opt.id}
                                    onChange={() => updateSetting('agc_level', opt.id)}
                                />
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
                    <h3>{t('🔉_low_frekans_filtresi')}</h3>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.high_pass_filter}
                            onChange={handleHighPassToggle}
                            aria-label="checkbox"
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <p className="card-description">{t('low_frekanslı_gürültüleri_cuter')}</p>
                {settings.high_pass_filter && (
                    <div className="frequency-selector">
                        <label>{t('kesim_frekansı')}</label>
                        <select
                            value={settings.high_pass_frequency}
                            onChange={handleHighPassFrequency}
                            aria-label="select"
                        >
                            <option value="50">{t('50_hz_minimal')}</option>
                            <option value="80">{t('80_hz_önerilen')}</option>
                            <option value="100">{t('100_hz_agresif')}</option>
                            <option value="150">{t('150_hz_çok_agresif')}</option>
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
});

NoiseTab.propTypes = {
    settings: PropTypes.object,
    updateSetting: PropTypes.func,
    applyAudioConstraints: PropTypes.array,
    voice: PropTypes.object,
};
export default NoiseTab;

import { FaMusic, FaMagic, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const EffectsTab = ({
    equalizerPreset,
    setEqualizerPreset,
    voiceEffect,
    setVoiceEffect,
    availableEffects,
}) => {
    const { t } = useTranslation();
    return (
        <div aria-label={t('voiceSettings.effectsTab', 'Effects tab')} className="tab-content">
            <div className="settings-card">
                <div className="card-header">
                    <FaMusic className="card-icon" />
                    <h3>{t('🎚️_equalizer')}</h3>
                </div>
                <div className="equalizer-presets">
                    {[
                        { id: 'default', label: 'Default', icon: '🎵' },
                        { id: 'bass_boost', label: 'Bass Boost', icon: '🔊' },
                        { id: 'treble_boost', label: 'Treble Boost', icon: '🎼' },
                        { id: 'voice', label: t('ui.ses_iywithstirme'), icon: '🗣️' },
                        { id: 'crisp', label: 'Kristal Netlik', icon: '✨' },
                    ].map((preset) => (
                        <button
                            key={preset.id}
                            className={`eq-preset-btn ${equalizerPreset === preset.id ? 'active' : ''}`}
                            onClick={() => setEqualizerPreset(preset.id)}
                        >
                            <span className="preset-icon">{preset.icon}</span>
                            <span className="preset-label">{preset.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="settings-card">
                <div className="card-header">
                    <FaMagic className="card-icon" />
                    <h3>{t('🎭_ses_efektleri')}</h3>
                    {voiceEffect && (
                        <button className="remove-effect-btn" onClick={() => setVoiceEffect(null)}>
                            <FaTimes /> Remove
                        </button>
                    )}
                </div>
                <div className="effects-grid">
                    {availableEffects.map((effect) => (
                        <button
                            key={effect.id}
                            className={`effect-btn ${voiceEffect === effect.id ? 'active' : ''}`}
                            onClick={() => setVoiceEffect(effect.id)}
                        >
                            <span className="effect-icon">{effect.icon}</span>
                            <span className="effect-name">{effect.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

EffectsTab.propTypes = {
    equalizerPreset: PropTypes.object,
    setEqualizerPreset: PropTypes.func,
    voiceEffect: PropTypes.object,
    setVoiceEffect: PropTypes.func,
    availableEffects: PropTypes.array,
};
export default EffectsTab;

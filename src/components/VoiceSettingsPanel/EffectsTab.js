import { FaMusic, FaMagic, FaTimes } from 'react-icons/fa';

const EffectsTab = ({ equalizerPreset, setEqualizerPreset, voiceEffect, setVoiceEffect, availableEffects }) => (
    <div className="tab-content">
        <div className="settings-card">
            <div className="card-header">
                <FaMusic className="card-icon" />
                <h3>🎚️ Equalizer</h3>
            </div>
            <div className="equalizer-presets">
                {[
                    { id: 'default', label: 'Varsayılan', icon: '🎵' },
                    { id: 'bass_boost', label: 'Bass Boost', icon: '🔊' },
                    { id: 'treble_boost', label: 'Treble Boost', icon: '🎼' },
                    { id: 'voice', label: 'Ses İyileştirme', icon: '🗣️' },
                    { id: 'crisp', label: 'Kristal Netlik', icon: '✨' }
                ].map(preset => (
                    <button key={preset.id}
                        className={`eq-preset-btn ${equalizerPreset === preset.id ? 'active' : ''}`}
                        onClick={() => setEqualizerPreset(preset.id)}>
                        <span className="preset-icon">{preset.icon}</span>
                        <span className="preset-label">{preset.label}</span>
                    </button>
                ))}
            </div>
        </div>

        <div className="settings-card">
            <div className="card-header">
                <FaMagic className="card-icon" />
                <h3>🎭 Ses Efektleri</h3>
                {voiceEffect && (
                    <button className="remove-effect-btn" onClick={() => setVoiceEffect(null)}>
                        <FaTimes /> Kaldır
                    </button>
                )}
            </div>
            <div className="effects-grid">
                {availableEffects.map(effect => (
                    <button key={effect.id}
                        className={`effect-btn ${voiceEffect === effect.id ? 'active' : ''}`}
                        onClick={() => setVoiceEffect(effect.id)}>
                        <span className="effect-icon">{effect.icon}</span>
                        <span className="effect-name">{effect.name}</span>
                    </button>
                ))}
            </div>
        </div>
    </div>
);

export default EffectsTab;

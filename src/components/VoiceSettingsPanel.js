import './VoiceSettingsPanel.css';
import { FaMicrophone, FaHeadphones, FaShieldAlt, FaWaveSquare, FaMagic, FaCog, FaTimes } from 'react-icons/fa';
import useVoiceSettings from './VoiceSettingsPanel/hooks/useVoiceSettings';
import InputTab from './VoiceSettingsPanel/InputTab';
import OutputTab from './VoiceSettingsPanel/OutputTab';
import NoiseTab from './VoiceSettingsPanel/NoiseTab';
import VoiceTab from './VoiceSettingsPanel/VoiceTab';
import EffectsTab from './VoiceSettingsPanel/EffectsTab';
import AdvancedTab from './VoiceSettingsPanel/AdvancedTab';

const TABS = [
    { id: 'input', icon: <FaMicrophone />, label: 'Giriş' },
    { id: 'output', icon: <FaHeadphones />, label: 'Çıkış' },
    { id: 'noise', icon: <FaShieldAlt />, label: 'Gürültü Engelleme' },
    { id: 'voice', icon: <FaWaveSquare />, label: 'Ses Algılama' },
    { id: 'effects', icon: <FaMagic />, label: 'Efektler' },
    { id: 'advanced', icon: <FaCog />, label: 'Gelişmiş' }
];

const VoiceSettingsPanel = ({ onClose, channelId }) => {
    const api = useVoiceSettings({ channelId });

    return (
        <div className="voice-settings-overlay" onClick={onClose}>
            <div className="voice-settings-panel premium" onClick={(e) => e.stopPropagation()}>
                <div className="voice-settings-header">
                    <h2>🎙️ Ses Ayarları</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <div className="settings-tabs">
                    {TABS.map(tab => (
                        <button key={tab.id}
                            className={`tab-btn ${api.activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => api.setActiveTab(tab.id)}>
                            {tab.icon}<span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="voice-settings-content">
                    {api.activeTab === 'input' && (
                        <InputTab settings={api.settings} updateSetting={api.updateSetting}
                            devices={api.devices} micLevel={api.micLevel} isTesting={api.isTesting}
                            startMicTest={api.startMicTest} stopMicTest={api.stopMicTest} />
                    )}
                    {api.activeTab === 'output' && (
                        <OutputTab settings={api.settings} updateSetting={api.updateSetting} devices={api.devices} />
                    )}
                    {api.activeTab === 'noise' && (
                        <NoiseTab settings={api.settings} updateSetting={api.updateSetting}
                            applyAudioConstraints={api.applyAudioConstraints} voice={api.voice} />
                    )}
                    {api.activeTab === 'voice' && (
                        <VoiceTab settings={api.settings} updateSetting={api.updateSetting}
                            updateSettings={api.updateSettings} micLevel={api.micLevel} voice={api.voice} />
                    )}
                    {api.activeTab === 'effects' && (
                        <EffectsTab equalizerPreset={api.equalizerPreset} setEqualizerPreset={api.setEqualizerPreset}
                            voiceEffect={api.voiceEffect} setVoiceEffect={api.setVoiceEffect}
                            availableEffects={api.availableEffects} />
                    )}
                    {api.activeTab === 'advanced' && (
                        <AdvancedTab settings={api.settings} updateSetting={api.updateSetting}
                            resetSettings={api.resetSettings} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default VoiceSettingsPanel;
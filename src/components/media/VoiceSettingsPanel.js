import { useState } from 'react';
import PropTypes from 'prop-types';
import './VoiceSettingsPanel.css';
import {
    FaMicrophone,
    FaHeadphones,
    FaShieldAlt,
    FaWaveSquare,
    FaMagic,
    FaCog,
    FaTimes,
} from 'react-icons/fa';
import useVoiceSettings from '../VoiceSettingsPanel/hooks/useVoiceSettings';
import InputTab from '../VoiceSettingsPanel/InputTab';
import OutputTab from '../VoiceSettingsPanel/OutputTab';
import NoiseTab from '../VoiceSettingsPanel/NoiseTab';
import VoiceTab from '../VoiceSettingsPanel/VoiceTab';
import EffectsTab from '../VoiceSettingsPanel/EffectsTab';
import AdvancedTab from '../VoiceSettingsPanel/AdvancedTab';
import { useTranslation } from 'react-i18next';

const TABS = [
    { id: 'input', icon: <FaMicrophone />, label: 'voiceTabs.input' },
    { id: 'output', icon: <FaHeadphones />, label: 'voiceTabs.output' },
    { id: 'noise', icon: <FaShieldAlt />, label: 'voiceTabs.noise' },
    { id: 'voice', icon: <FaWaveSquare />, label: 'voiceTabs.voice' },
    { id: 'effects', icon: <FaMagic />, label: 'voiceTabs.effects' },
    { id: 'advanced', icon: <FaCog />, label: 'voiceTabs.advanced' },
];

const VoiceSettingsPanel = ({ onClose, channelId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const api = useVoiceSettings({ channelId });

    return (
        <div
            className="voice-settings-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="voice-settings-panel premium"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="voice-settings-header">
                    <h2>🎙️ {t('voiceTabs.title')}</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="settings-tabs">
                    {TABS.map((tab) => (
                        <button
                            aria-label={t(tab.label)}
                            key={tab.id}
                            className={`tab-btn ${api.activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => api.setActiveTab(tab.id)}
                        >
                            {tab.icon}
                            <span>{t(tab.label)}</span>
                        </button>
                    ))}
                </div>

                <div className="voice-settings-content">
                    {api.activeTab === 'input' && (
                        <InputTab
                            settings={api.settings}
                            updateSetting={api.updateSetting}
                            devices={api.devices}
                            micLevel={api.micLevel}
                            isTesting={api.isTesting}
                            startMicTest={api.startMicTest}
                            stopMicTest={api.stopMicTest}
                        />
                    )}
                    {api.activeTab === 'output' && (
                        <OutputTab
                            settings={api.settings}
                            updateSetting={api.updateSetting}
                            devices={api.devices}
                        />
                    )}
                    {api.activeTab === 'noise' && (
                        <NoiseTab
                            settings={api.settings}
                            updateSetting={api.updateSetting}
                            applyAudioConstraints={api.applyAudioConstraints}
                            voice={api.voice}
                        />
                    )}
                    {api.activeTab === 'voice' && (
                        <VoiceTab
                            settings={api.settings}
                            updateSetting={api.updateSetting}
                            updateSettings={api.updateSettings}
                            micLevel={api.micLevel}
                            voice={api.voice}
                        />
                    )}
                    {api.activeTab === 'effects' && (
                        <EffectsTab
                            equalizerPreset={api.equalizerPreset}
                            setEqualizerPreset={api.setEqualizerPreset}
                            voiceEffect={api.voiceEffect}
                            setVoiceEffect={api.setVoiceEffect}
                            availableEffects={api.availableEffects}
                        />
                    )}
                    {api.activeTab === 'advanced' && (
                        <AdvancedTab
                            settings={api.settings}
                            updateSetting={api.updateSetting}
                            resetSettings={api.resetSettings}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

VoiceSettingsPanel.propTypes = {
    onClose: PropTypes.func,
    channelId: PropTypes.string,
};
export default VoiceSettingsPanel;

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMicrophone, FaVolumeUp } from 'react-icons/fa';
import PropTypes from 'prop-types';
import SettingSection from '../components/SettingSection';
import ToggleSwitch from '../components/ToggleSwitch';
import S from '../styles';
import ut from './UserTabs.module.css';

const VoiceTab = () => {
    const { t } = useTranslation();
    const [inputVolume, setInputVolume] = useState(100);
    const [outputVolume, setOutputVolume] = useState(100);
    const [noiseSuppression, setNoiseSuppression] = useState(true);
    const [echoCancellation, setEchoCancellation] = useState(true);

    return (
        <div>
            <SettingSection title={t('settings.tabs.voice.inputVolume')}>
                <div style={S.volumeRow}>
                    <FaMicrophone className="icon-muted" />
                    <input
                        type="range"
                        min={0}
                        max={200}
                        value={inputVolume}
                        onChange={(e) => setInputVolume(+e.target.value)}
                        className={ut.rangeAccent}
                    />
                    <span className={ut.whiteRight40}>{inputVolume}%</span>
                </div>
            </SettingSection>
            <SettingSection title={t('settings.tabs.voice.outputVolume')}>
                <div style={S.volumeRow}>
                    <FaVolumeUp className="icon-muted" />
                    <input
                        type="range"
                        min={0}
                        max={200}
                        value={outputVolume}
                        onChange={(e) => setOutputVolume(+e.target.value)}
                        className={ut.rangeAccent}
                    />
                    <span className={ut.whiteRight40}>{outputVolume}%</span>
                </div>
            </SettingSection>
            <SettingSection title={t('common.advanced')}>
                <ToggleSwitch
                    label={t('settings.tabs.voice.noiseSuppression')}
                    value={noiseSuppression}
                    onChange={setNoiseSuppression}
                />
                <ToggleSwitch
                    label={t('settings.tabs.voice.echoCancellation')}
                    value={echoCancellation}
                    onChange={setEchoCancellation}
                />
            </SettingSection>
        </div>
    );
};

VoiceTab.propTypes = {};
export default VoiceTab;

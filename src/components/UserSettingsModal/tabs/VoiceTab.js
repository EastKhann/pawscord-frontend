import { useState } from 'react';
import { FaMicrophone, FaVolumeUp } from 'react-icons/fa';
import SettingSection from '../components/SettingSection';
import ToggleSwitch from '../components/ToggleSwitch';
import S from '../styles';

const VoiceTab = () => {
    const [inputVolume, setInputVolume] = useState(100);
    const [outputVolume, setOutputVolume] = useState(100);
    const [noiseSuppression, setNoiseSuppression] = useState(true);
    const [echoCancellation, setEchoCancellation] = useState(true);

    return (
        <div>
            <SettingSection title="Ses Giriş">
                <div style={S.volumeRow}>
                    <FaMicrophone style={{ color: '#949ba4' }} />
                    <input type="range" min={0} max={200} value={inputVolume} onChange={e => setInputVolume(+e.target.value)} style={{ flex: 1, accentColor: '#5865f2' }} />
                    <span style={{ color: '#fff', minWidth: 40, textAlign: 'right' }}>{inputVolume}%</span>
                </div>
            </SettingSection>
            <SettingSection title="Ses Çıkış">
                <div style={S.volumeRow}>
                    <FaVolumeUp style={{ color: '#949ba4' }} />
                    <input type="range" min={0} max={200} value={outputVolume} onChange={e => setOutputVolume(+e.target.value)} style={{ flex: 1, accentColor: '#5865f2' }} />
                    <span style={{ color: '#fff', minWidth: 40, textAlign: 'right' }}>{outputVolume}%</span>
                </div>
            </SettingSection>
            <SettingSection title="Gelişmiş">
                <ToggleSwitch label="Gürültü Bastırma" value={noiseSuppression} onChange={setNoiseSuppression} />
                <ToggleSwitch label="Yankı Önleme" value={echoCancellation} onChange={setEchoCancellation} />
            </SettingSection>
        </div>
    );
};

export default VoiceTab;

import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import SettingSection from '../components/SettingSection';
import ToggleSwitch from '../components/ToggleSwitch';
import S from '../styles';

const AppearanceTab = () => {
    const [theme, setTheme] = useState('dark');
    const [fontSize, setFontSize] = useState(16);
    const [compact, setCompact] = useState(false);

    return (
        <div>
            <SettingSection title="Tema">
                <div style={{ display: 'flex', gap: 12 }}>
                    {['dark', 'light', 'amoled'].map(t => (
                        <button key={t} type="button" onClick={() => setTheme(t)} style={{
                            ...S.themeBtn,
                            borderColor: theme === t ? '#5865f2' : 'rgba(255,255,255,0.1)',
                            backgroundColor: t === 'dark' ? '#36393f' : t === 'light' ? '#fff' : '#000',
                        }}>
                            <span style={{ color: t === 'light' ? '#000' : '#fff', fontSize: 12, fontWeight: 600 }}>
                                {t === 'dark' ? 'Koyu' : t === 'light' ? 'Açık' : 'AMOLED'}
                            </span>
                            {theme === t && <FaCheck style={{ color: '#5865f2', position: 'absolute', top: 4, right: 4, fontSize: 10 }} />}
                        </button>
                    ))}
                </div>
            </SettingSection>
            <SettingSection title="Yazı Boyutu">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: '#949ba4', fontSize: 12 }}>12px</span>
                    <input type="range" min={12} max={24} value={fontSize} onChange={e => setFontSize(+e.target.value)} style={{ flex: 1, accentColor: '#5865f2' }} />
                    <span style={{ color: '#949ba4', fontSize: 12 }}>24px</span>
                    <span style={{ color: '#fff', fontSize: 14, fontWeight: 600, minWidth: 40 }}>{fontSize}px</span>
                </div>
            </SettingSection>
            <ToggleSwitch label="Kompakt Mod" value={compact} onChange={setCompact} />
        </div>
    );
};

export default AppearanceTab;

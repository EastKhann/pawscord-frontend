import SettingSection from '../components/SettingSection';
import S from '../styles';

const SHORTCUTS = [
    { keys: 'Ctrl + K', desc: 'H\u0131zl\u0131 Ge\u00E7i\u015F' },
    { keys: 'Ctrl + Shift + M', desc: 'Mikrofon A\u00E7/Kapa' },
    { keys: 'Ctrl + Shift + D', desc: 'Kulakl\u0131k A\u00E7/Kapa' },
    { keys: 'Ctrl + Enter', desc: 'Mesaj G\u00F6nder' },
    { keys: 'Shift + Enter', desc: 'Yeni Sat\u0131r' },
    { keys: '\u2191 (bo\u015F input)', desc: 'Son Mesaj\u0131 D\u00FCzenle' },
    { keys: 'Escape', desc: 'D\u00FCzenleme/Yan\u0131t \u0130ptal' },
    { keys: 'Ctrl + T', desc: '\u015Eablonlar' },
    { keys: 'Ctrl + B', desc: 'Kal\u0131n Metin' },
    { keys: 'Ctrl + I', desc: '\u0130talik Metin' },
    { keys: 'Ctrl + U', desc: 'Alt\u0131 \u00C7izili' },
];

const KeybindsTab = () => (
    <div>
        <SettingSection title="Klavye K\u0131sayollar\u0131">
            {SHORTCUTS.map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ color: '#dcddde', fontSize: 14 }}>{s.desc}</span>
                    <kbd style={S.kbd}>{s.keys}</kbd>
                </div>
            ))}
        </SettingSection>
    </div>
);

export default KeybindsTab;

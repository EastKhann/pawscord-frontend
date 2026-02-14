import SettingSection from '../components/SettingSection';
import S from '../styles';

const SHORTCUTS = [
    { keys: 'Ctrl + K', desc: 'Hızlı Geçiş' },
    { keys: 'Ctrl + Shift + M', desc: 'Mikrofon Aç/Kapa' },
    { keys: 'Ctrl + Shift + D', desc: 'Kulaklık Aç/Kapa' },
    { keys: 'Ctrl + Enter', desc: 'Mesaj Gönder' },
    { keys: 'Shift + Enter', desc: 'Yeni Satır' },
    { keys: '↑ (boş input)', desc: 'Son Mesajı Düzenle' },
    { keys: 'Escape', desc: 'Düzenleme/Yanıt İptal' },
    { keys: 'Ctrl + T', desc: 'Şablonlar' },
    { keys: 'Ctrl + B', desc: 'Kalın Metin' },
    { keys: 'Ctrl + I', desc: 'İtalik Metin' },
    { keys: 'Ctrl + U', desc: 'Altı Çizili' },
];

const KeybindsTab = () => (
    <div>
        <SettingSection title="Klavye Kısayolları">
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

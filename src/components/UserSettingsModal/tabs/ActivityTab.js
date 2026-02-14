import { useState } from 'react';
import { FaGamepad } from 'react-icons/fa';
import SettingSection from '../components/SettingSection';
import ToggleSwitch from '../components/ToggleSwitch';
import { createToggle } from '../helpers';

const ActivityTab = () => {
    const [showActivity, setShowActivity] = useState(() => localStorage.getItem('pawscord_show_activity') !== 'false');
    const [showGame, setShowGame] = useState(() => localStorage.getItem('pawscord_show_game') !== 'false');
    const [showSpotify, setShowSpotify] = useState(() => localStorage.getItem('pawscord_show_spotify') !== 'false');
    const [showStatus, setShowStatus] = useState(() => localStorage.getItem('pawscord_show_status') !== 'false');

    return (
        <div>
            <SettingSection title="Aktivite Gizliliği">
                <p style={{ color: '#949ba4', fontSize: 13, marginBottom: 12 }}>
                    Diğer kullanıcıların ne gördüğünü kontrol et.
                </p>
                <ToggleSwitch label="Aktivite durumunu göster" value={showActivity} onChange={createToggle('pawscord_show_activity', setShowActivity)} />
                <ToggleSwitch label="Oynadığım oyunu göster" value={showGame} onChange={createToggle('pawscord_show_game', setShowGame)} />
                <ToggleSwitch label="Spotify dinlediğimi göster" value={showSpotify} onChange={createToggle('pawscord_show_spotify', setShowSpotify)} />
                <ToggleSwitch label="Özel durum mesajını göster" value={showStatus} onChange={createToggle('pawscord_show_status', setShowStatus)} />
            </SettingSection>
            <SettingSection title="Oyun Algılama">
                <div style={{ padding: 16, backgroundColor: '#1e1f22', borderRadius: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <FaGamepad style={{ color: '#5865f2', fontSize: 24 }} />
                        <div>
                            <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Otomatik Algılama</div>
                            <div style={{ color: '#949ba4', fontSize: 12 }}>Çalışan uygulamalar otomatik algılanır (Electron/APK)</div>
                        </div>
                    </div>
                    <ToggleSwitch label="Oyun algılamayı etkinleştir" value={showGame} onChange={createToggle('pawscord_show_game', setShowGame)} />
                </div>
            </SettingSection>
        </div>
    );
};

export default ActivityTab;

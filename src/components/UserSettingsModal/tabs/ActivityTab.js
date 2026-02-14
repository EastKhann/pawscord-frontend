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
            <SettingSection title="Aktivite Gizlili\u011Fi">
                <p style={{ color: '#949ba4', fontSize: 13, marginBottom: 12 }}>
                    Di\u011Fer kullan\u0131c\u0131lar\u0131n ne g\u00F6rd\u00FC\u011F\u00FCn\u00FC kontrol et.
                </p>
                <ToggleSwitch label="Aktivite durumunu g\u00F6ster" value={showActivity} onChange={createToggle('pawscord_show_activity', setShowActivity)} />
                <ToggleSwitch label="Oynad\u0131\u011F\u0131m oyunu g\u00F6ster" value={showGame} onChange={createToggle('pawscord_show_game', setShowGame)} />
                <ToggleSwitch label="Spotify dinledi\u011Fimi g\u00F6ster" value={showSpotify} onChange={createToggle('pawscord_show_spotify', setShowSpotify)} />
                <ToggleSwitch label="\u00D6zel durum mesaj\u0131n\u0131 g\u00F6ster" value={showStatus} onChange={createToggle('pawscord_show_status', setShowStatus)} />
            </SettingSection>
            <SettingSection title="Oyun Alg\u0131lama">
                <div style={{ padding: 16, backgroundColor: '#1e1f22', borderRadius: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <FaGamepad style={{ color: '#5865f2', fontSize: 24 }} />
                        <div>
                            <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Otomatik Alg\u0131lama</div>
                            <div style={{ color: '#949ba4', fontSize: 12 }}>\u00C7al\u0131\u015Fan uygulamalar otomatik alg\u0131lan\u0131r (Electron/APK)</div>
                        </div>
                    </div>
                    <ToggleSwitch label="Oyun alg\u0131lamay\u0131 etkinle\u015Ftir" value={showGame} onChange={createToggle('pawscord_show_game', setShowGame)} />
                </div>
            </SettingSection>
        </div>
    );
};

export default ActivityTab;

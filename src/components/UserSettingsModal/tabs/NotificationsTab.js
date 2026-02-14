import { useState } from 'react';
import SettingSection from '../components/SettingSection';
import ToggleSwitch from '../components/ToggleSwitch';

const NotificationsTab = () => {
    const [desktop, setDesktop] = useState(true);
    const [sound, setSound] = useState(true);
    const [mentions, setMentions] = useState(true);
    const [dms, setDms] = useState(true);
    const [everyone, setEveryone] = useState(false);

    return (
        <div>
            <SettingSection title="Bildirim Ayarları">
                <ToggleSwitch label="Masaüstü Bildirimleri" value={desktop} onChange={setDesktop} />
                <ToggleSwitch label="Bildirim Sesleri" value={sound} onChange={setSound} />
                <ToggleSwitch label="Mention Bildirimleri" value={mentions} onChange={setMentions} />
                <ToggleSwitch label="DM Bildirimleri" value={dms} onChange={setDms} />
                <ToggleSwitch label="@everyone / @here Bildirimleri" value={everyone} onChange={setEveryone} />
            </SettingSection>
        </div>
    );
};

export default NotificationsTab;

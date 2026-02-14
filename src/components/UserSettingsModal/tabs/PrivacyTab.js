import { useState } from 'react';
import SettingSection from '../components/SettingSection';
import ToggleSwitch from '../components/ToggleSwitch';
import S from '../styles';

const PrivacyTab = () => {
    const [dmFromServer, setDmFromServer] = useState(true);
    const [friendRequests, setFriendRequests] = useState(true);
    const [showActivity, setShowActivity] = useState(true);
    const [readReceipts, setReadReceipts] = useState(true);

    return (
        <div>
            <SettingSection title="DM & Arkadaş">
                <ToggleSwitch label="Sunucu üyelerinden DM al" value={dmFromServer} onChange={setDmFromServer} />
                <ToggleSwitch label="Herkesten arkadaşlık isteği al" value={friendRequests} onChange={setFriendRequests} />
            </SettingSection>
            <SettingSection title="Gizlilik">
                <ToggleSwitch label="Aktivite durumunu göster" value={showActivity} onChange={setShowActivity} />
                <ToggleSwitch label="Okundu bilgisi gönder" value={readReceipts} onChange={setReadReceipts} />
            </SettingSection>
            <SettingSection title="Veri">
                <button type="button" style={S.actionBtn}>Verilerimi İndir (GDPR)</button>
            </SettingSection>
        </div>
    );
};

export default PrivacyTab;

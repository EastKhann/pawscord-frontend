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
            <SettingSection title="DM & Arkada\u015F">
                <ToggleSwitch label="Sunucu \u00FCyelerinden DM al" value={dmFromServer} onChange={setDmFromServer} />
                <ToggleSwitch label="Herkesten arkada\u015Fl\u0131k iste\u011Fi al" value={friendRequests} onChange={setFriendRequests} />
            </SettingSection>
            <SettingSection title="Gizlilik">
                <ToggleSwitch label="Aktivite durumunu g\u00F6ster" value={showActivity} onChange={setShowActivity} />
                <ToggleSwitch label="Okundu bilgisi g\u00F6nder" value={readReceipts} onChange={setReadReceipts} />
            </SettingSection>
            <SettingSection title="Veri">
                <button type="button" style={S.actionBtn}>Verilerimi \u0130ndir (GDPR)</button>
            </SettingSection>
        </div>
    );
};

export default PrivacyTab;

import { FaCamera, FaTrash } from 'react-icons/fa';
import SettingSection from '../components/SettingSection';
import SettingField from '../components/SettingField';
import S from '../styles';

const AccountTab = ({ user, onAvatarChange }) => (
    <div>
        <SettingSection title="Profil">
            <div style={{ backgroundColor: '#1e1f22', borderRadius: 8, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ position: 'relative' }}>
                        <img src={user?.avatar || '/default-avatar.png'} alt="" style={{ width: 80, height: 80, borderRadius: '50%', border: '4px solid #2b2d31' }} />
                        <button
                            type="button"
                            onClick={onAvatarChange}
                            style={{
                                position: 'absolute', bottom: 0, right: 0, width: 28, height: 28,
                                borderRadius: '50%', backgroundColor: '#5865f2', border: '3px solid #1e1f22',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: '#fff', fontSize: 11,
                            }}
                        >
                            <FaCamera />
                        </button>
                    </div>
                    <div>
                        <div style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>{user?.display_name || user?.username}</div>
                        <div style={{ color: '#949ba4', fontSize: 14 }}>@{user?.username}</div>
                    </div>
                </div>
                <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <SettingField label="KULLANICI ADI" value={user?.username} />
                    <SettingField label="E-POSTA" value={user?.email || 'Ayarlanmamış'} masked />
                    <SettingField label="TELEFON" value={user?.phone || 'Eklenmemiş'} />
                </div>
            </div>
        </SettingSection>
        <SettingSection title="Parola">
            <button type="button" style={S.actionBtn}>Parolayı Değiştir</button>
        </SettingSection>
        <SettingSection title="Hesap Silme">
            <button type="button" style={{ ...S.actionBtn, backgroundColor: 'rgba(218,55,60,0.1)', color: '#da373c', borderColor: '#da373c' }}>
                <FaTrash /> Hesabı Sil
            </button>
        </SettingSection>
    </div>
);

export default AccountTab;

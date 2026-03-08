import { useState } from 'react';
import { FaDesktop } from 'react-icons/fa';
import SettingSection from '../components/SettingSection';
import S from '../styles';

const DevicesTab = () => {
    const [sessions] = useState([
        {
            id: 1, device: '💻 Windows PC', browser: 'Chrome 132', ip: '88.238.xx.xxx',
            location: 'İstanbul, Türkiye', lastActive: 'Şu an aktif', current: true,
        },
        {
            id: 2, device: '📱 Android', browser: 'Chrome Mobile 144', ip: '88.238.xx.xxx',
            location: 'İstanbul, Türkiye', lastActive: '2 saat önce', current: false,
        },
    ]);

    return (
        <div>
            <SettingSection title="Aktif Oturumlar">
                <p style={{ color: '#949ba4', fontSize: 13, marginBottom: 16 }}>
                    Hesabınızın giriş yaptığı cihazlar.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {sessions.map(s => (
                        <div key={s.id} style={{
                            padding: '14px 16px', backgroundColor: '#0d0e10', borderRadius: 8,
                            border: s.current ? '1px solid rgba(59,165,92,0.3)' : '1px solid transparent',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ color: '#fff', fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                                        {s.device} {s.current && <span style={{ color: '#3ba55c', fontSize: 11, fontWeight: 400 }}>{'●'} Şu anki oturum</span>}
                                    </div>
                                    <div style={{ color: '#949ba4', fontSize: 13 }}>{s.browser}</div>
                                    <div style={{ color: '#949ba4', fontSize: 12, marginTop: 4 }}>
                                        {s.location} {'•'} {s.ip} {'•'} {s.lastActive}
                                    </div>
                                </div>
                                {!s.current && (
                                    <button type="button" style={{
                                        padding: '6px 12px', borderRadius: 4, border: 'none', cursor: 'pointer',
                                        backgroundColor: 'rgba(218,55,60,0.15)', color: '#da373c', fontSize: 12, fontWeight: 600,
                                    }}>
                                        Sonlandır
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </SettingSection>
            <SettingSection title="">
                <button type="button" style={{
                    ...S.actionBtn, backgroundColor: 'rgba(218,55,60,0.1)', color: '#da373c', borderColor: '#da373c',
                }}>
                    <FaDesktop style={{ fontSize: 14 }} /> Diğer Tüm Oturumları Sonlandır
                </button>
            </SettingSection>
        </div>
    );
};

export default DevicesTab;

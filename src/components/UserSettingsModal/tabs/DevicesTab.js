import { useState } from 'react';
import { FaDesktop } from 'react-icons/fa';
import SettingSection from '../components/SettingSection';
import S from '../styles';

const DevicesTab = () => {
    const [sessions] = useState([
        {
            id: 1, device: '\uD83D\uDCBB Windows PC', browser: 'Chrome 132', ip: '88.238.xx.xxx',
            location: '\u0130stanbul, T\u00FCrkiye', lastActive: '\u015Eu an aktif', current: true,
        },
        {
            id: 2, device: '\uD83D\uDCF1 Android', browser: 'Chrome Mobile 144', ip: '88.238.xx.xxx',
            location: '\u0130stanbul, T\u00FCrkiye', lastActive: '2 saat \u00F6nce', current: false,
        },
    ]);

    return (
        <div>
            <SettingSection title="Aktif Oturumlar">
                <p style={{ color: '#949ba4', fontSize: 13, marginBottom: 16 }}>
                    Hesab\u0131n\u0131z\u0131n giri\u015F yapt\u0131\u011F\u0131 cihazlar.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {sessions.map(s => (
                        <div key={s.id} style={{
                            padding: '14px 16px', backgroundColor: '#1e1f22', borderRadius: 8,
                            border: s.current ? '1px solid rgba(59,165,92,0.3)' : '1px solid transparent',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ color: '#fff', fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                                        {s.device} {s.current && <span style={{ color: '#3ba55c', fontSize: 11, fontWeight: 400 }}>{'\u25CF'} \u015Eu anki oturum</span>}
                                    </div>
                                    <div style={{ color: '#949ba4', fontSize: 13 }}>{s.browser}</div>
                                    <div style={{ color: '#949ba4', fontSize: 12, marginTop: 4 }}>
                                        {s.location} {'\u2022'} {s.ip} {'\u2022'} {s.lastActive}
                                    </div>
                                </div>
                                {!s.current && (
                                    <button type="button" style={{
                                        padding: '6px 12px', borderRadius: 4, border: 'none', cursor: 'pointer',
                                        backgroundColor: 'rgba(218,55,60,0.15)', color: '#da373c', fontSize: 12, fontWeight: 600,
                                    }}>
                                        Sonland\u0131r
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
                    <FaDesktop style={{ fontSize: 14 }} /> Di\u011Fer T\u00FCm Oturumlar\u0131 Sonland\u0131r
                </button>
            </SettingSection>
        </div>
    );
};

export default DevicesTab;

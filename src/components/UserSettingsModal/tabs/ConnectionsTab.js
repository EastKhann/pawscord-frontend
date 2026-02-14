import { useState } from 'react';
import { FaSteam, FaSpotify, FaInstagram, FaTwitter, FaXbox, FaPlaystation, FaGithub } from 'react-icons/fa';
import SettingSection from '../components/SettingSection';

const CONNECTIONS = [
    { id: 'steam', name: 'Steam', icon: FaSteam, color: '#171a21' },
    { id: 'spotify', name: 'Spotify', icon: FaSpotify, color: '#1DB954' },
    { id: 'instagram', name: 'Instagram', icon: FaInstagram, color: '#E4405F' },
    { id: 'twitter', name: 'X (Twitter)', icon: FaTwitter, color: '#1DA1F2' },
    { id: 'xbox', name: 'Xbox', icon: FaXbox, color: '#107C10' },
    { id: 'playstation', name: 'PlayStation', icon: FaPlaystation, color: '#003791' },
    { id: 'github', name: 'GitHub', icon: FaGithub, color: '#333' },
];

const ConnectionsTab = () => {
    const [connectedIds, setConnectedIds] = useState(() => {
        try { return JSON.parse(localStorage.getItem('pawscord_connections') || '[]'); } catch { return []; }
    });

    const toggleConnection = (id) => {
        setConnectedIds(prev => {
            const next = prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id];
            localStorage.setItem('pawscord_connections', JSON.stringify(next));
            return next;
        });
    };

    return (
        <div>
            <SettingSection title="Ba\u011Fl\u0131 Hesaplar">
                <p style={{ color: '#949ba4', fontSize: 13, marginBottom: 16 }}>
                    Profilinde g\u00F6sterilecek ba\u011Fl\u0131 hesaplar\u0131n\u0131 y\u00F6net.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {CONNECTIONS.map(c => {
                        const isConnected = connectedIds.includes(c.id);
                        const Icon = c.icon;
                        return (
                            <div key={c.id} style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '12px 16px', backgroundColor: '#1e1f22', borderRadius: 8,
                                border: isConnected ? `1px solid ${c.color}44` : '1px solid transparent',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <Icon style={{ fontSize: 24, color: isConnected ? c.color : '#949ba4' }} />
                                    <div>
                                        <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                                        <div style={{ color: isConnected ? '#3ba55c' : '#949ba4', fontSize: 12 }}>
                                            {isConnected ? '\u2713 Ba\u011Fl\u0131' : 'Ba\u011Fl\u0131 de\u011Fil'}
                                        </div>
                                    </div>
                                </div>
                                <button type="button" onClick={() => toggleConnection(c.id)} style={{
                                    padding: '6px 16px', borderRadius: 4, border: 'none', cursor: 'pointer',
                                    fontSize: 13, fontWeight: 600,
                                    backgroundColor: isConnected ? 'rgba(218,55,60,0.15)' : 'rgba(88,101,242,0.15)',
                                    color: isConnected ? '#da373c' : '#5865f2',
                                }}>
                                    {isConnected ? 'Kald\u0131r' : 'Ba\u011Fla'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </SettingSection>
        </div>
    );
};

export default ConnectionsTab;

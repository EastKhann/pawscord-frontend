import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes, FaCompass } from '../utils/iconOptimization';
import { styles } from '../SidebarStyles';
import toast from '../utils/toast';
import useModalA11y from '../hooks/useModalA11y';

const DiscoveryModal = ({ isOpen, onClose, publicServers, onJoinServer, fetchWithAuth, apiUrl }) => {
    const [inviteCodeInput, setInviteCodeInput] = useState('');

    const handleJoinViaCode = async (e) => {
        e.preventDefault();
        if (!inviteCodeInput.trim()) return;
        try {
            const res = await fetchWithAuth(`${apiUrl}/invites/join/`, {
                method: 'POST',
                body: JSON.stringify({ code: inviteCodeInput })
            });
            const data = await res.json();
            if (res.ok) {
                setInviteCodeInput('');
                onClose();
                toast.success(`✅ "${data.server_name}" sunucusuna katıldın!`);
            } else {
                console.error("❌ Sunucuya katılma hatası:", data.error || "Sunucuya katılınamadı.");
            }
        } catch (error) {
            console.error("❌ Davet kodu hatası:", error);
        }
    };

    if (!isOpen) return null;

    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Sunucuya Katıl' });

    return createPortal(
        <div style={{ ...styles.modalOverlay, display: 'flex', justifyContent: 'center', alignItems: 'center' }} {...overlayProps}>
            <div style={{ ...styles.selectionModalContent, width: '600px', maxWidth: '90vw', maxHeight: '80vh', overflowY: 'auto' }} {...dialogProps}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 15, borderBottom: '1px solid #1e1f22' }}>
                    <h3 style={{ color: 'white', margin: 0, fontSize: '1.5em' }}>🌍 Sunucuya Katıl</h3>
                    <FaTimes style={{ cursor: 'pointer', color: '#b9bbbe', fontSize: '1.3em' }} onClick={onClose} />
                </div>

                <div style={{ backgroundColor: '#202225', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                    <p style={{ color: '#b9bbbe', fontSize: '0.9em', marginTop: 0 }}>Elinizde bir davet kodu veya linki varsa aşağıya yapıştırın.</p>
                    <form onSubmit={handleJoinViaCode} style={{ display: 'flex', gap: '10px' }}>
                        <input value={inviteCodeInput} onChange={(e) => setInviteCodeInput(e.target.value)} aria-label="Davet kodu" placeholder="https://www.pawscord.com/invite/..." style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #1e1f22', backgroundColor: '#313338', color: 'white', outline: 'none' }} />
                        <button type="submit" style={{ backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '4px', padding: '0 20px', fontWeight: 'bold', cursor: 'pointer' }}>Katıl</button>
                    </form>
                </div>

                <h4 style={{ textAlign: 'left', color: '#dbdee1', borderBottom: '1px solid #4f545c', paddingBottom: '5px', marginBottom: '10px' }}>
                    <FaCompass style={{ marginRight: 8 }} /> Toplulukları Keşfet
                </h4>

                {publicServers.length === 0 ? (
                    <p style={{ color: '#b9bbbe', fontStyle: 'italic' }}>Şu an katılabileceğin halka açık sunucu yok.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {publicServers.map(srv => (
                            <div key={srv.id} style={{ backgroundColor: '#2b2d31', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #1f2023' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {srv.icon ? (<img src={`https://www.pawscord.com${srv.icon}`} alt={`${srv.name} sunucu ikonu`} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />) : (<div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#5865f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>{srv.name.substring(0, 2).toUpperCase()}</div>)}
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ color: 'white', fontWeight: 'bold' }}>{srv.name}</div>
                                        <div style={{ color: '#b9bbbe', fontSize: '0.8em' }}>{srv.member_count} Üye • Kurucu: {srv.owner}</div>
                                    </div>
                                </div>
                                <button onClick={() => onJoinServer(srv.id)} style={{ backgroundColor: '#23a559', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Katıl</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default DiscoveryModal;

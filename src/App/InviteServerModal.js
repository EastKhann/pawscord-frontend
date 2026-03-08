/**
 * 🎫 InviteServerModal — Portal modal for inviting a user to a server
 * Extracted from App.js inline JSX
 */
import React from 'react';
import ReactDOM from 'react-dom';
import toast from '../utils/toast';
import useModalA11y from '../hooks/useModalA11y';

export default function InviteServerModal({
    inviteToServerUser, setInviteToServerUser,
    categories, fetchWithAuth, API_BASE_URL,
}) {
    const handleClose = () => setInviteToServerUser(null);
    const { overlayProps, dialogProps } = useModalA11y({ onClose: handleClose, isOpen: !!inviteToServerUser, label: 'Sunucuya Davet' });
    if (!inviteToServerUser) return null;

    return ReactDOM.createPortal(
        <div
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.85)',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                zIndex: 999999
            }}
            onClick={() => setInviteToServerUser(null)}
            {...overlayProps}
        >
            <div
                {...dialogProps}
                style={{
                    backgroundColor: '#111214', borderRadius: '12px',
                    width: '400px', maxHeight: '80vh', overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                }}
            >
                {/* Header */}
                <div style={{ padding: '20px', borderBottom: '1px solid #182135', textAlign: 'center' }}>
                    <h2 style={{ color: '#f2f3f5', margin: 0, fontSize: '18px' }}>🎫 Sunucuya Davet Et</h2>
                    <p style={{ color: '#b5bac1', margin: '8px 0 0', fontSize: '14px' }}>
                        <strong>{inviteToServerUser.username}</strong> kullanıcısını hangi sunucuya davet etmek istiyorsunuz?
                    </p>
                </div>

                {/* Server List */}
                <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '12px' }}>
                    {categories.map(server => (
                        <div
                            key={server.id}
                            onClick={async () => {
                                try {
                                    const res = await fetchWithAuth(`${API_BASE_URL}/servers/${server.id}/invite/`, {
                                        method: 'POST', body: JSON.stringify({ target_username: inviteToServerUser.username })
                                    });
                                    if (res.ok) {
                                        toast.success(`🎫 ${inviteToServerUser.username} kullanıcısına davetiye gönderildi!`);
                                    } else {
                                        const data = await res.json();
                                        if (data.error?.includes('zaten')) toast.info(`ℹ️ ${inviteToServerUser.username} zaten bu sunucunun üyesi!`);
                                        else toast.error(`❌ ${data.error || 'Davet gönderilemedi'}`);
                                    }
                                } catch (error) { toast.error('❌ Bağlantı hatası'); }
                                setInviteToServerUser(null);
                            }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '12px', borderRadius: '8px', cursor: 'pointer',
                                transition: 'all 0.2s', backgroundColor: 'rgba(255,255,255,0.02)', marginBottom: '8px'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(88, 101, 242, 0.2)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'; }}
                        >
                            {server.icon ? (
                                <img src={server.icon} alt={server.name}
                                    style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{
                                    width: 40, height: 40, borderRadius: '50%',
                                    backgroundColor: '#5865f2', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 'bold', color: 'white', fontSize: '16px'
                                }}>
                                    {server.name?.substring(0, 2).toUpperCase()}
                                </div>
                            )}
                            <div style={{ flex: 1 }}>
                                <div style={{ color: '#f2f3f5', fontWeight: '600' }}>{server.name}</div>
                                <div style={{ color: '#b5bac1', fontSize: '12px' }}>{server.member_count || 0} üye</div>
                            </div>
                            <div style={{ color: '#5865f2', fontSize: '20px' }}>→</div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div style={{ padding: '16px 20px', borderTop: '1px solid #182135', textAlign: 'center' }}>
                    <button onClick={() => setInviteToServerUser(null)}
                        style={{
                            backgroundColor: '#4e5058', color: '#f2f3f5', border: 'none',
                            padding: '10px 24px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600'
                        }}>İptal</button>
                </div>
            </div>
        </div>,
        document.body
    );
}

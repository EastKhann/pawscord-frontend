import { useState, useEffect, useCallback } from 'react';
import { FaBan, FaCheck, FaUndo, FaCalendarAlt } from 'react-icons/fa';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';
import styles from './styles';

const BansTab = ({ server, fetchWithAuth, apiBaseUrl }) => {
    const [bans, setBans] = useState([]);
    const [bansLoading, setBansLoading] = useState(false);

    const loadBans = useCallback(async () => {
        setBansLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/bans/`);
            if (res.ok) {
                const data = await res.json();
                setBans(data.bans || []);
            }
        } catch (e) {
            console.error('Ban list load error:', e);
        } finally {
            setBansLoading(false);
        }
    }, [fetchWithAuth, apiBaseUrl, server.id]);

    useEffect(() => { loadBans(); }, [loadBans]);

    const handleUnban = async (username) => {
        if (!await confirmDialog(`${username} kullanıcısının yasağını kaldırmak istediğinize emin misiniz?`)) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/unban/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, server_id: server.id })
            });
            if (res.ok) {
                toast.success(`${username} yasağı kaldırıldı!`);
                loadBans();
            } else {
                const data = await res.json().catch(() => ({}));
                toast.error(data.error || 'İşlem başarısız');
            }
        } catch (e) {
            toast.error('Yasak kaldırılırken bir hata oluştu');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', backgroundColor: '#1e1f22', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FaBan style={{ fontSize: '24px', color: '#ed4245' }} />
                    <div>
                        <h3 style={{ margin: 0, color: '#fff', fontSize: '16px' }}>Yasaklı Kullanıcılar</h3>
                        <p style={{ margin: '2px 0 0', color: '#b9bbbe', fontSize: '12px' }}>{bans.length} yasaklı kullanıcı</p>
                    </div>
                </div>
                <button onClick={loadBans} style={{ ...styles.actionBtn, backgroundColor: '#5865f2', padding: '8px 16px', fontSize: '13px' }}>
                    <FaUndo /> Yenile
                </button>
            </div>

            {bansLoading ? (
                <div style={{ textAlign: 'center', color: '#b9bbbe', padding: '40px' }}>Yükleniyor...</div>
            ) : bans.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#2b2d31', borderRadius: '12px' }}>
                    <FaCheck style={{ fontSize: '48px', color: '#43b581', marginBottom: '16px' }} />
                    <h4 style={{ color: '#fff', margin: '0 0 8px' }}>Temiz!</h4>
                    <p style={{ color: '#b9bbbe', fontSize: '14px' }}>Henüz yasaklanmış kullanıcı yok.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {bans.map(ban => (
                        <div key={ban.id} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '14px 18px', backgroundColor: '#2b2d31', borderRadius: '8px',
                            border: '1px solid #1e1f22', transition: 'background-color 0.15s'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '50%',
                                    backgroundColor: '#ed4245', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '14px'
                                }}>
                                    {ban.username?.[0]?.toUpperCase() || '?'}
                                </div>
                                <div>
                                    <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{ban.username}</div>
                                    <div style={{ color: '#72767d', fontSize: '12px', marginTop: '2px' }}>
                                        {ban.reason || 'Sebep belirtilmemiş'} • Yasaklayan: {ban.banned_by || 'Sistem'}
                                    </div>
                                    <div style={{ color: '#4e5058', fontSize: '11px', marginTop: '2px' }}>
                                        <FaCalendarAlt style={{ marginRight: '4px', fontSize: '10px' }} />
                                        {ban.created_at ? new Date(ban.created_at).toLocaleDateString('tr-TR', {
                                            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                        }) : 'Tarih yok'}
                                        {ban.expires_at && !ban.is_permanent && (
                                            <span style={{ marginLeft: '8px', color: '#faa61a' }}>⏰ Bitiş: {new Date(ban.expires_at).toLocaleDateString('tr-TR')}</span>
                                        )}
                                        {ban.is_permanent && (
                                            <span style={{ marginLeft: '8px', color: '#ed4245' }}>♾️ Kalıcı</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => handleUnban(ban.username)}
                                style={{ padding: '8px 14px', backgroundColor: 'transparent', border: '1px solid #43b581', borderRadius: '6px', color: '#43b581', cursor: 'pointer', fontWeight: '600', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.15s' }}
                                onMouseEnter={(e) => { e.target.style.backgroundColor = '#43b581'; e.target.style.color = '#fff'; }}
                                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#43b581'; }}
                            >
                                <FaUndo /> Yasağı Kaldır
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BansTab;

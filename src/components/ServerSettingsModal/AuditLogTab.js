import { useState, useEffect, useCallback } from 'react';
import { FaHistory, FaUndo } from 'react-icons/fa';
import styles from './styles';

const AuditLogTab = ({ server, fetchWithAuth, apiBaseUrl }) => {
    const [auditLogs, setAuditLogs] = useState([]);
    const [auditLoading, setAuditLoading] = useState(false);
    const [auditFilter, setAuditFilter] = useState('');

    const loadAuditLogs = useCallback(async (filter = '') => {
        setAuditLoading(true);
        try {
            const url = filter
                ? `${apiBaseUrl}/audit-logs/?action_type=${filter}&limit=100`
                : `${apiBaseUrl}/audit-logs/?limit=100`;
            const res = await fetchWithAuth(url);
            if (res.ok) {
                const data = await res.json();
                setAuditLogs(Array.isArray(data) ? data : []);
            }
        } catch (e) {
            console.error('Audit log load error:', e);
        } finally {
            setAuditLoading(false);
        }
    }, [fetchWithAuth, apiBaseUrl]);

    useEffect(() => { loadAuditLogs(); }, [loadAuditLogs]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', backgroundColor: '#1e1f22', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FaHistory style={{ fontSize: '24px', color: '#7289da' }} />
                    <div>
                        <h3 style={{ margin: 0, color: '#fff', fontSize: '16px' }}>Aksiyon Geçmişi</h3>
                        <p style={{ margin: '2px 0 0', color: '#b9bbbe', fontSize: '12px' }}>Tüm moderatör ve admin aksiyonları</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <select value={auditFilter} onChange={(e) => { setAuditFilter(e.target.value); loadAuditLogs(e.target.value); }}
                        style={{ padding: '8px 12px', backgroundColor: '#2b2d31', border: '1px solid #40444b', borderRadius: '6px', color: '#dcddde', fontSize: '12px', outline: 'none', cursor: 'pointer' }}>
                        <option value="">Tüm Aksiyonlar</option>
                        <option value="BAN">Yasaklama</option>
                        <option value="UNBAN">Yasak Kaldırma</option>
                        <option value="KICK">Atma</option>
                        <option value="ROLE_CHANGE">Rol Değişikliği</option>
                        <option value="CHANNEL_CREATE">Kanal Oluşturma</option>
                        <option value="CHANNEL_DELETE">Kanal Silme</option>
                        <option value="MESSAGE_DELETE">Mesaj Silme</option>
                        <option value="SERVER_UPDATE">Sunucu Güncelleme</option>
                        <option value="EMAIL_VERIFIED">E-posta Doğrulama</option>
                    </select>
                    <button onClick={() => loadAuditLogs(auditFilter)} style={{ ...styles.actionBtn, backgroundColor: '#5865f2', padding: '8px 14px', fontSize: '12px' }}>
                        <FaUndo />
                    </button>
                </div>
            </div>

            {auditLoading ? (
                <div style={{ textAlign: 'center', color: '#b9bbbe', padding: '40px' }}>Yükleniyor...</div>
            ) : auditLogs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#2b2d31', borderRadius: '12px' }}>
                    <FaHistory style={{ fontSize: '48px', color: '#4e5058', marginBottom: '16px' }} />
                    <h4 style={{ color: '#fff', margin: '0 0 8px' }}>Kayıt Yok</h4>
                    <p style={{ color: '#b9bbbe', fontSize: '14px' }}>Henüz kayıtlı aksiyon bulunamadı.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {auditLogs.map((log, idx) => {
                        const actionColors = {
                            'BAN': '#ed4245', 'UNBAN': '#43b581', 'KICK': '#faa61a',
                            'MESSAGE_DELETE': '#f47b67', 'ROLE_CHANGE': '#5865f2',
                            'CHANNEL_CREATE': '#43b581', 'CHANNEL_DELETE': '#ed4245',
                            'SERVER_UPDATE': '#7289da', 'EMAIL_VERIFIED': '#43b581'
                        };
                        const actionColor = actionColors[log.action_type] || '#b9bbbe';
                        return (
                            <div key={log.id || idx} style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '12px 16px', backgroundColor: '#2b2d31',
                                borderRadius: '6px', borderLeft: `3px solid ${actionColor}`,
                            }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: actionColor, flexShrink: 0 }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                        <span style={{ color: '#fff', fontWeight: '600', fontSize: '13px' }}>
                                            {log.actor_username || log.actor || 'Sistem'}
                                        </span>
                                        <span style={{ backgroundColor: `${actionColor}22`, color: actionColor, padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '600' }}>
                                            {log.action_type}
                                        </span>
                                    </div>
                                    {log.details && (
                                        <div style={{ color: '#72767d', fontSize: '12px', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {typeof log.details === 'object' ? JSON.stringify(log.details).substring(0, 120) : String(log.details).substring(0, 120)}
                                        </div>
                                    )}
                                </div>
                                <div style={{ color: '#4e5058', fontSize: '11px', flexShrink: 0, whiteSpace: 'nowrap' }}>
                                    {log.timestamp ? new Date(log.timestamp).toLocaleString('tr-TR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AuditLogTab;

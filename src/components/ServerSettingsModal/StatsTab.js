import { useState, useEffect, useCallback } from 'react';
import { FaChartBar, FaUsers, FaComments, FaHashtag, FaShieldAlt, FaChartLine, FaChartPie, FaUndo } from 'react-icons/fa';
import styles from './styles';

const StatsTab = ({ server, fetchWithAuth, apiBaseUrl, roles }) => {
    const [serverStats, setServerStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(false);

    const loadServerStats = useCallback(async () => {
        setStatsLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/stats/overview/`);
            if (res.ok) {
                const data = await res.json();
                setServerStats(data);
            }
        } catch (e) {
            console.error('Stats load error:', e);
        } finally {
            setStatsLoading(false);
        }
    }, [fetchWithAuth, apiBaseUrl, server.id]);

    useEffect(() => { loadServerStats(); }, [loadServerStats]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', backgroundColor: '#0d0e10', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FaChartBar style={{ fontSize: '24px', color: '#5865f2' }} />
                    <div>
                        <h3 style={{ margin: 0, color: '#fff', fontSize: '16px' }}>Sunucu İstatistikleri</h3>
                        <p style={{ margin: '2px 0 0', color: '#b5bac1', fontSize: '12px' }}>Sunucunuzun performans özeti</p>
                    </div>
                </div>
                <button onClick={loadServerStats} style={{ ...styles.actionBtn, backgroundColor: '#5865f2', padding: '8px 16px', fontSize: '13px' }}>
                    <FaUndo /> Yenile
                </button>
            </div>

            {statsLoading ? (
                <div style={{ textAlign: 'center', color: '#b5bac1', padding: '40px' }}>Yükleniyor...</div>
            ) : !serverStats ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#111214', borderRadius: '12px' }}>
                    <FaChartBar style={{ fontSize: '48px', color: '#4e5058', marginBottom: '16px' }} />
                    <h4 style={{ color: '#fff', margin: '0 0 8px' }}>İstatistikler yüklenemedi</h4>
                    <p style={{ color: '#b5bac1', fontSize: '14px' }}>Yenile butonuna basarak tekrar deneyin.</p>
                </div>
            ) : (
                <>
                    {/* Ana Metrikler */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                        <div style={{ backgroundColor: '#111214', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #5865f2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <FaUsers style={{ color: '#5865f2', fontSize: '18px' }} />
                                <span style={{ color: '#b5bac1', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Toplam Üye</span>
                            </div>
                            <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>{serverStats.total_members ?? serverStats.members ?? 0}</div>
                            {serverStats.online_members !== undefined && (
                                <div style={{ fontSize: '12px', color: '#23a559', marginTop: '4px' }}>🟢 {serverStats.online_members} çevrimiçi</div>
                            )}
                        </div>
                        <div style={{ backgroundColor: '#111214', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #23a559' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <FaComments style={{ color: '#23a559', fontSize: '18px' }} />
                                <span style={{ color: '#b5bac1', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Toplam Mesaj</span>
                            </div>
                            <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>{(serverStats.total_messages ?? 0).toLocaleString('tr-TR')}</div>
                            {serverStats.messages_last_7_days !== undefined && (
                                <div style={{ fontSize: '12px', color: '#f0b232', marginTop: '4px' }}>📈 Son 7 gün: {serverStats.messages_last_7_days}</div>
                            )}
                        </div>
                        <div style={{ backgroundColor: '#111214', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #f0b232' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <FaHashtag style={{ color: '#f0b232', fontSize: '18px' }} />
                                <span style={{ color: '#b5bac1', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Kanal Sayısı</span>
                            </div>
                            <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>{serverStats.total_channels ?? serverStats.rooms ?? 0}</div>
                        </div>
                    </div>

                    {/* Detay Bilgileri */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div style={{ backgroundColor: '#111214', padding: '18px', borderRadius: '10px' }}>
                            <h4 style={{ margin: '0 0 14px', color: '#fff', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <FaShieldAlt style={{ color: '#5865f2' }} /> Sunucu Bilgileri
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {[
                                    { label: 'Sunucu Adı', value: serverStats.server_name || server.name },
                                    { label: 'Oluşturulma', value: serverStats.created_at ? new Date(serverStats.created_at).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }) : (server.created_at ? new Date(server.created_at).toLocaleDateString('tr-TR') : 'Bilinmiyor') },
                                    { label: 'Gizlilik', value: server.is_public ? '🌐 Herkese Açık' : '🔒 Özel', color: server.is_public ? '#23a559' : '#f0b232' },
                                    { label: 'Rol Sayısı', value: roles?.length ?? 0 },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#0d0e10', borderRadius: '6px' }}>
                                        <span style={{ color: '#b5bac1', fontSize: '13px' }}>{item.label}</span>
                                        <span style={{ color: item.color || '#fff', fontSize: '13px', fontWeight: '600' }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#111214', padding: '18px', borderRadius: '10px' }}>
                            <h4 style={{ margin: '0 0 14px', color: '#fff', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <FaChartLine style={{ color: '#23a559' }} /> Aktivite Özeti
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {[
                                    { label: 'Kategori Sayısı', value: server.categories?.length || 0 },
                                    { label: 'Çevrimiçi Üye', value: serverStats.online_members ?? '—', color: '#23a559' },
                                    { label: 'Haftalık Mesaj', value: serverStats.messages_last_7_days ?? '—' },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#0d0e10', borderRadius: '6px' }}>
                                        <span style={{ color: '#b5bac1', fontSize: '13px' }}>{item.label}</span>
                                        <span style={{ color: item.color || '#fff', fontSize: '13px', fontWeight: '600' }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sağlık Göstergeleri */}
                    <div style={{ backgroundColor: '#111214', padding: '18px', borderRadius: '10px' }}>
                        <h4 style={{ margin: '0 0 14px', color: '#fff', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaChartPie style={{ color: '#f0b232' }} /> Sağlık Göstergeleri
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                            {[
                                { label: 'Üye Aktivitesi', value: serverStats.online_members && serverStats.total_members ? Math.round((serverStats.online_members / serverStats.total_members) * 100) : null, color: '#23a559', suffix: '%' },
                                { label: 'Günlük Ort. Mesaj', value: serverStats.messages_last_7_days ? Math.round(serverStats.messages_last_7_days / 7) : null, color: '#5865f2', suffix: '' },
                                { label: 'Üye/Kanal Oranı', value: serverStats.total_channels ? Math.round((serverStats.total_members || 0) / serverStats.total_channels) : null, color: '#f0b232', suffix: ':1' }
                            ].map((metric, i) => (
                                <div key={i} style={{ padding: '14px', backgroundColor: '#0d0e10', borderRadius: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '800', color: metric.color }}>{metric.value ?? '—'}{metric.value !== null ? metric.suffix : ''}</div>
                                    <div style={{ fontSize: '11px', color: '#949ba4', marginTop: '4px' }}>{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default StatsTab;

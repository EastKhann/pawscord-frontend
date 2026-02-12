import React from 'react';
import { FaComment, FaCrown, FaExclamationTriangle, FaFile, FaGlobe, FaImage, FaMicrophone, FaPaperPlane, FaServer, FaShieldAlt, FaSync, FaUsers, FaVideo } from 'react-icons/fa';

// Extracted from AdminPanelModal.js
    const renderDashboard = () => (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h2 style={{ color: '#fff', margin: 0, fontSize: '20px' }}>📊 Admin Dashboard</h2>
                    <p style={{ color: '#6b7280', margin: '4px 0 0', fontSize: '12px' }}>
                        Son güncelleme: {new Date().toLocaleTimeString('tr-TR')} | Auto-refresh: 10s
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => { fetchDetailedStats(); fetchLiveActivity(); fetchSecurityAlerts(); }}
                        style={{ ...styles.actionBtn('#5865f2'), padding: '8px 14px' }}>
                        <FaSync size={12} /> Yenile
                    </button>
                    <button onClick={() => setBroadcastModal(true)} style={{ ...styles.actionBtn('#23a559'), padding: '8px 14px' }}>
                        <FaPaperPlane size={12} /> Duyuru
                    </button>
                </div>
            </div>

            {/* Realtime Stats Bar - GERÇEK VERİLER */}
            <div style={{
                background: 'linear-gradient(90deg, #1e3a5f 0%, #2d1b4e 100%)',
                borderRadius: '10px', padding: '14px 20px', marginBottom: '20px',
                display: 'flex', justifyContent: 'space-around', alignItems: 'center'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#23a559' }}>
                        {detailedStats?.users?.online || 0}
                    </div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>🟢 Çevrimiçi</div>
                </div>
                <div style={{ width: '1px', height: '40px', backgroundColor: '#ffffff20' }} />
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#ffc107' }}>
                        {detailedStats?.users?.idle || 0}
                    </div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>🌙 Boşta</div>
                </div>
                <div style={{ width: '1px', height: '40px', backgroundColor: '#ffffff20' }} />
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#5865f2' }}>
                        {detailedStats?.messages?.last_1h || 0}
                    </div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>💬 Son 1 saat mesaj</div>
                </div>
                <div style={{ width: '1px', height: '40px', backgroundColor: '#ffffff20' }} />
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#e74c3c' }}>
                        {securityAlerts?.length || 0}
                    </div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>⚠️ Güvenlik Uyarısı</div>
                </div>
            </div>

            {/* Main Stats Grid - GERÇEK VERİLER */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', marginBottom: '20px' }}>
                {[
                    { icon: <FaUsers color="#5865f2" />, value: detailedStats?.users?.total || stats?.totalUsers, label: 'Toplam Kullanıcı', color: '#5865f2' },
                    { icon: <FaGlobe color="#23a559" />, value: detailedStats?.users?.active || stats?.onlineUsers, label: 'Aktif (24s)', color: '#23a559' },
                    { icon: <FaServer color="#f0b132" />, value: detailedStats?.servers?.total || stats?.totalServers, label: 'Sunucu', color: '#f0b132' },
                    { icon: <FaComment color="#e74c3c" />, value: (detailedStats?.messages?.total || stats?.totalMessages)?.toLocaleString(), label: 'Mesaj', color: '#e74c3c' },
                    { icon: <FaShieldAlt color="#9b59b6" />, value: detailedStats?.users?.verified || 0, label: 'Doğrulanmış', color: '#9b59b6' },
                    { icon: <FaCrown color="#ffd700" />, value: detailedStats?.premium?.total || stats?.premiumUsers, label: 'Premium', color: '#ffd700' },
                ].map((stat, idx) => (
                    <div key={idx} style={styles.statCard}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ fontSize: '20px' }}>{stat.icon}</div>
                            <div>
                                <div style={{ ...styles.statValue, fontSize: '22px' }}>{stat.value || '---'}</div>
                                <div style={styles.statLabel}>{stat.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Kullanıcı Büyüme + Sistem Sağlığı */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                {/* Kullanıcı Büyümesi */}
                <div style={styles.statCard}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>📈 Kullanıcı Büyümesi</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                        {[
                            { value: `+${detailedStats?.users?.new_1h || 0}`, label: 'Son 1 Saat', color: '#23a559' },
                            { value: `+${detailedStats?.users?.new_24h || 0}`, label: 'Son 24 Saat', color: '#5865f2' },
                            { value: `+${detailedStats?.users?.new_7d || 0}`, label: 'Son 7 Gün', color: '#f0b132' },
                            { value: `+${detailedStats?.users?.new_30d || 0}`, label: 'Son 30 Gün', color: '#e74c3c' },
                        ].map((item, idx) => (
                            <div key={idx} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '22px', fontWeight: '700', color: item.color }}>{item.value}</div>
                                <div style={{ fontSize: '10px', color: '#6b7280' }}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sistem Sağlığı - GERÇEK */}
                <div style={styles.statCard}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>⚡ Sistem Sağlığı</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                        {[
                            {
                                value: `${detailedStats?.system?.cpu_percent?.toFixed(1) || 0}%`,
                                label: 'CPU',
                                color: (detailedStats?.system?.cpu_percent || 0) > 80 ? '#e74c3c' : '#23a559'
                            },
                            {
                                value: `${detailedStats?.system?.memory_percent?.toFixed(1) || 0}%`,
                                label: 'RAM',
                                color: (detailedStats?.system?.memory_percent || 0) > 80 ? '#e74c3c' : '#3498db'
                            },
                            {
                                value: `${detailedStats?.system?.disk_percent?.toFixed(1) || 0}%`,
                                label: 'Disk',
                                color: (detailedStats?.system?.disk_percent || 0) > 90 ? '#e74c3c' : '#9b59b6'
                            },
                            {
                                value: detailedStats?.system?.uptime || '---',
                                label: 'Çalışma',
                                color: '#ffd700'
                            },
                        ].map((item, idx) => (
                            <div key={idx} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: item.color }}>{item.value}</div>
                                <div style={{ fontSize: '10px', color: '#6b7280' }}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mesaj & Premium İstatistikleri */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                {/* Mesaj İstatistikleri */}
                <div style={styles.statCard}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>💬 Mesaj İstatistikleri</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                        {[
                            { value: (detailedStats?.messages?.total || 0).toLocaleString(), label: 'Toplam Mesaj', color: '#5865f2' },
                            { value: (detailedStats?.messages?.direct_messages || 0).toLocaleString(), label: 'DM', color: '#23a559' },
                            { value: (detailedStats?.messages?.reactions || 0).toLocaleString(), label: 'Reaksiyon', color: '#f0b132' },
                            { value: detailedStats?.messages?.pinned || 0, label: 'Sabitlenmiş', color: '#e74c3c' },
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                textAlign: 'center', backgroundColor: '#111113', padding: '10px', borderRadius: '8px'
                            }}>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: item.color }}>{item.value}</div>
                                <div style={{ fontSize: '10px', color: '#6b7280' }}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Premium Gelir */}
                <div style={styles.statCard}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>💎 Premium & Gelir</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                        {[
                            { value: detailedStats?.premium?.monthly || 0, label: 'Aylık', color: '#5865f2' },
                            { value: detailedStats?.premium?.yearly || 0, label: 'Yıllık', color: '#23a559' },
                            { value: detailedStats?.premium?.lifetime || 0, label: 'Ömür Boyu', color: '#ffd700' },
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                textAlign: 'center', backgroundColor: '#111113', padding: '10px', borderRadius: '8px'
                            }}>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: item.color }}>{item.value}</div>
                                <div style={{ fontSize: '10px', color: '#6b7280' }}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '12px', textAlign: 'center', padding: '10px', backgroundColor: '#1a472a', borderRadius: '8px' }}>
                        <div style={{ fontSize: '22px', fontWeight: '700', color: '#23a559' }}>
                            ${(detailedStats?.premium?.estimated_revenue || 0).toLocaleString()}
                        </div>
                        <div style={{ fontSize: '11px', color: '#6b7280' }}>Tahmini Aylık Gelir</div>
                    </div>
                </div>
            </div>

            {/* Live Activity + Top Sunucular */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '20px' }}>
                {/* Canlı Aktivite */}
                <div style={styles.statCard}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>
                        📡 Canlı Aktivite
                        <span style={{ fontSize: '10px', color: '#23a559', marginLeft: '8px' }}>● CANLI</span>
                    </h3>
                    <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
                        {liveActivities.length === 0 ? (
                            <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
                                Aktivite bekleniyor...
                            </div>
                        ) : (
                            liveActivities.map((activity, idx) => (
                                <div key={idx} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '8px', borderBottom: '1px solid #2a2a2e'
                                }}>
                                    <div style={{
                                        width: '8px', height: '8px', borderRadius: '50%',
                                        backgroundColor: activity.type === 'user_join' ? '#23a559' :
                                            activity.type === 'message' ? '#5865f2' :
                                                activity.type === 'server_create' ? '#f0b132' :
                                                    activity.type === 'premium' ? '#ffd700' : '#9b59b6'
                                    }} />
                                    <div style={{ flex: 1, color: '#e5e7eb', fontSize: '12px' }}>
                                        <strong style={{ color: '#fff' }}>{activity.user}</strong> {activity.action}
                                        {activity.target && <span style={{ color: '#6b7280' }}> → {activity.target}</span>}
                                    </div>
                                    <div style={{ color: '#6b7280', fontSize: '10px' }}>{activity.time_ago}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Top Sunucular */}
                <div style={styles.statCard}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>🏆 Top 5 Sunucu</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {(detailedStats?.servers?.top_servers || []).slice(0, 5).map((server, idx) => (
                            <div key={idx} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '8px 10px', backgroundColor: '#111113', borderRadius: '6px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ color: idx === 0 ? '#ffd700' : idx === 1 ? '#c0c0c0' : idx === 2 ? '#cd7f32' : '#6b7280' }}>
                                        #{idx + 1}
                                    </span>
                                    <span style={{ color: '#e5e7eb', fontSize: '12px' }}>{server.name}</span>
                                </div>
                                <span style={{ color: '#5865f2', fontWeight: '700', fontSize: '12px' }}>
                                    {server.member_count} üye
                                </span>
                            </div>
                        ))}
                        {(!detailedStats?.servers?.top_servers || detailedStats.servers.top_servers.length === 0) && (
                            <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
                                Sunucu verisi yok
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Güvenlik Uyarıları + Dosya İstatistikleri */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Güvenlik Uyarıları */}
                <div style={{ ...styles.statCard, borderColor: securityAlerts.length > 0 ? '#e74c3c' : '#2a2a2e' }}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>
                        🛡️ Güvenlik Uyarıları
                        {securityAlerts.length > 0 && (
                            <span style={{
                                marginLeft: '8px', backgroundColor: '#e74c3c', color: '#fff',
                                padding: '2px 8px', borderRadius: '10px', fontSize: '10px'
                            }}>
                                {securityAlerts.length}
                            </span>
                        )}
                    </h3>
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        {securityAlerts.length === 0 ? (
                            <div style={{ textAlign: 'center', color: '#23a559', padding: '20px' }}>
                                ✅ Güvenlik uyarısı yok
                            </div>
                        ) : (
                            securityAlerts.map((alert, idx) => (
                                <div key={idx} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '8px', borderBottom: '1px solid #2a2a2e',
                                    backgroundColor: alert.severity === 'high' ? '#e74c3c20' : '#f0b13220'
                                }}>
                                    <FaExclamationTriangle color={alert.severity === 'high' ? '#e74c3c' : '#f0b132'} size={14} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ color: '#e5e7eb', fontSize: '12px' }}>{alert.message}</div>
                                        <div style={{ color: '#6b7280', fontSize: '10px' }}>{alert.time}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Dosya İstatistikleri */}
                <div style={styles.statCard}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>📁 Dosya & Depolama</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                        {[
                            { icon: <FaImage color="#e74c3c" />, label: 'Resim', value: detailedStats?.files?.images || 0 },
                            { icon: <FaVideo color="#5865f2" />, label: 'Video', value: detailedStats?.files?.videos || 0 },
                            { icon: <FaMicrophone color="#23a559" />, label: 'Ses', value: detailedStats?.files?.audio || 0 },
                            { icon: <FaFile color="#f0b132" />, label: 'Diğer', value: detailedStats?.files?.other || 0 },
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                padding: '8px', backgroundColor: '#111113', borderRadius: '6px'
                            }}>
                                {item.icon}
                                <div>
                                    <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{item.value}</div>
                                    <div style={{ color: '#6b7280', fontSize: '10px' }}>{item.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#111113', borderRadius: '6px', textAlign: 'center' }}>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#9b59b6' }}>
                            {detailedStats?.files?.total_storage || '0 MB'}
                        </div>
                        <div style={{ fontSize: '10px', color: '#6b7280' }}>Toplam Depolama</div>
                    </div>
                </div>
            </div>
        </div>
    );

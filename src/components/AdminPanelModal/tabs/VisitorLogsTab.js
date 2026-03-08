// frontend/src/components/AdminPanelModal/tabs/VisitorLogsTab.js
import { useState } from 'react';
import { FaSync, FaSearch, FaGlobe, FaUser, FaRoute, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const s = {
    container: { color: '#d1d5db', fontFamily: 'monospace', fontSize: '13px' },
    statsRow: { display: 'flex', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' },
    statCard: {
        background: '#1e1f22', borderRadius: '8px', padding: '10px 16px', flex: '1',
        minWidth: '120px', textAlign: 'center', border: '1px solid #2e2f35'
    },
    statNum: { fontSize: '22px', fontWeight: 700, color: '#5865f2', display: 'block' },
    statLabel: { fontSize: '11px', color: '#6b7280', marginTop: '2px' },
    filterRow: {
        display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center'
    },
    input: {
        background: '#1e1f22', border: '1px solid #3a3b40', borderRadius: '6px',
        color: '#d1d5db', padding: '5px 10px', fontSize: '12px', width: '130px'
    },
    btn: {
        background: '#5865f2', border: 'none', borderRadius: '6px', color: '#fff',
        padding: '5px 12px', fontSize: '12px', cursor: 'pointer', display: 'flex',
        alignItems: 'center', gap: '5px'
    },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' },
    th: {
        padding: '7px 8px', textAlign: 'left', background: '#1e1f22',
        color: '#9ca3af', borderBottom: '1px solid #2e2f35', whiteSpace: 'nowrap'
    },
    td: { padding: '6px 8px', borderBottom: '1px solid #232428', verticalAlign: 'middle' },
    ipBadge: {
        background: '#1a1b1e', border: '1px solid #3a3b40', borderRadius: '4px',
        padding: '2px 6px', fontFamily: 'monospace', fontSize: '11px', color: '#a3e635'
    },
    pathBadge: {
        background: '#1a1b1e', borderRadius: '4px', padding: '2px 6px',
        color: '#60a5fa', fontSize: '11px', maxWidth: '200px',
        display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    },
    section: { marginBottom: '16px' },
    sectionTitle: { fontSize: '12px', color: '#9ca3af', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' },
    paginationRow: { display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px', alignItems: 'center' },
    pageBtn: (active) => ({
        background: active ? '#5865f2' : '#2e2f35', border: 'none', borderRadius: '4px',
        color: '#d1d5db', padding: '4px 10px', cursor: 'pointer', fontSize: '12px'
    }),
    twoCol: { display: 'flex', gap: '16px', marginBottom: '16px' },
    col: { flex: 1, minWidth: 0 },
    miniTable: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' },
    miniTd: { padding: '5px 6px', borderBottom: '1px solid #232428' },
};

const deviceIcon = (device) => device === 'Mobil' ? '📱' : device === 'Tablet' ? '🖥️' : '💻';

const formatDuration = (sec) => {
    if (!sec) return '—';
    if (sec < 60) return `${sec}s`;
    const m = Math.floor(sec / 60), s2 = sec % 60;
    return `${m}d ${s2}s`;
};

const formatTs = (iso) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
};

export default function VisitorLogsTab({
    visitorLogs, fetchVisitorLogs,
    visitorIpFilter, setVisitorIpFilter,
    visitorUsernameFilter, setVisitorUsernameFilter,
    visitorPathFilter, setVisitorPathFilter,
    visitorPage, setVisitorPage,
    visitorLoading,
}) {
    const [localIp, setLocalIp] = useState(visitorIpFilter || '');
    const [localUser, setLocalUser] = useState(visitorUsernameFilter || '');
    const [localPath, setLocalPath] = useState(visitorPathFilter || '');

    const applyFilters = () => {
        setVisitorIpFilter(localIp);
        setVisitorUsernameFilter(localUser);
        setVisitorPathFilter(localPath);
        setVisitorPage(1);
        fetchVisitorLogs({ ip: localIp, username: localUser, path: localPath, page: 1 });
    };

    const handleKeyDown = (e) => { if (e.key === 'Enter') applyFilters(); };

    const goPage = (p) => {
        setVisitorPage(p);
        fetchVisitorLogs({ ip: localIp, username: localUser, path: localPath, page: p });
    };

    const { logs = [], total = 0, total_pages = 1, ip_summary = [], top_paths = [] } = visitorLogs || {};

    return (
        <div style={s.container}>
            {/* Stats Cards */}
            {visitorLogs?.stats && (
                <div style={s.statsRow}>
                    <div style={s.statCard}>
                        <span style={s.statNum}>{visitorLogs.stats.total_today ?? '—'}</span>
                        <span style={s.statLabel}>Bugün Toplam Ziyaret</span>
                    </div>
                    <div style={s.statCard}>
                        <span style={s.statNum}>{visitorLogs.stats.unique_ips_today ?? '—'}</span>
                        <span style={s.statLabel}>Benzersiz IP (24s)</span>
                    </div>
                    <div style={s.statCard}>
                        <span style={s.statNum}>{total}</span>
                        <span style={s.statLabel}>Filtredeki Kayıt</span>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div style={s.filterRow}>
                <input style={s.input} placeholder="🔍 IP ara..." value={localIp}
                    onChange={e => setLocalIp(e.target.value)} onKeyDown={handleKeyDown} />
                <input style={s.input} placeholder="👤 Kullanıcı..." value={localUser}
                    onChange={e => setLocalUser(e.target.value)} onKeyDown={handleKeyDown} />
                <input style={{ ...s.input, width: '160px' }} placeholder="📄 /path..." value={localPath}
                    onChange={e => setLocalPath(e.target.value)} onKeyDown={handleKeyDown} />
                <button style={s.btn} onClick={applyFilters}>
                    <FaSearch size={11} /> Filtrele
                </button>
                <button style={{ ...s.btn, background: '#374151' }} onClick={() => {
                    setLocalIp(''); setLocalUser(''); setLocalPath('');
                    setVisitorIpFilter(''); setVisitorUsernameFilter(''); setVisitorPathFilter('');
                    setVisitorPage(1);
                    fetchVisitorLogs({ ip: '', username: '', path: '', page: 1 });
                }}>
                    Temizle
                </button>
                <button style={{ ...s.btn, background: '#374151', marginLeft: 'auto' }}
                    onClick={() => fetchVisitorLogs({ ip: localIp, username: localUser, path: localPath, page: visitorPage })}>
                    <FaSync size={11} />
                </button>
            </div>

            {/* Top summaries */}
            <div style={s.twoCol}>
                {/* Top IPs */}
                <div style={s.col}>
                    <div style={s.sectionTitle}><FaGlobe size={10} style={{ marginRight: 4 }} />En Aktif IP'ler (filtreye göre)</div>
                    <table style={s.miniTable}>
                        <thead>
                            <tr>
                                <td style={{ ...s.miniTd, color: '#6b7280' }}>IP</td>
                                <td style={{ ...s.miniTd, color: '#6b7280' }}>Ziyaret</td>
                                <td style={{ ...s.miniTd, color: '#6b7280' }}>Farklı Sayfa</td>
                                <td style={{ ...s.miniTd, color: '#6b7280' }}>İlk Giriş</td>
                                <td style={{ ...s.miniTd, color: '#6b7280' }}>Son Giriş</td>
                            </tr>
                        </thead>
                        <tbody>
                            {ip_summary.length === 0 && (
                                <tr><td colSpan={5} style={{ ...s.miniTd, color: '#6b7280', textAlign: 'center' }}>Veri yok</td></tr>
                            )}
                            {ip_summary.map((row, i) => (
                                <tr key={i}>
                                    <td style={s.miniTd}><span style={s.ipBadge}>{row.ip}</span></td>
                                    <td style={s.miniTd}>{row.visits}</td>
                                    <td style={s.miniTd}>{row.unique_paths}</td>
                                    <td style={s.miniTd}>{formatTs(row.first_seen)}</td>
                                    <td style={s.miniTd}>{formatTs(row.last_seen)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Top Paths */}
                <div style={{ ...s.col, maxWidth: '280px' }}>
                    <div style={s.sectionTitle}><FaRoute size={10} style={{ marginRight: 4 }} />En Çok Ziyaret Edilen Sayfalar</div>
                    <table style={s.miniTable}>
                        <thead>
                            <tr>
                                <td style={{ ...s.miniTd, color: '#6b7280' }}>Sayfa</td>
                                <td style={{ ...s.miniTd, color: '#6b7280' }}>Ziyaret</td>
                            </tr>
                        </thead>
                        <tbody>
                            {top_paths.length === 0 && (
                                <tr><td colSpan={2} style={{ ...s.miniTd, color: '#6b7280', textAlign: 'center' }}>Veri yok</td></tr>
                            )}
                            {top_paths.map((row, i) => (
                                <tr key={i}>
                                    <td style={s.miniTd}><span style={s.pathBadge} title={row.path}>{row.path}</span></td>
                                    <td style={s.miniTd}>{row.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Main log table */}
            <div style={s.section}>
                <div style={s.sectionTitle}>
                    <FaMapMarkerAlt size={10} style={{ marginRight: 4 }} />
                    Ayak İzi Detayları ({total} kayıt)
                </div>
                {visitorLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
                        <FaSync className="spin" size={18} /> Yükleniyor...
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={s.table}>
                            <thead>
                                <tr>
                                    <th style={s.th}><FaClock size={10} /> Zaman</th>
                                    <th style={s.th}><FaGlobe size={10} /> IP</th>
                                    <th style={s.th}><FaUser size={10} /> Kullanıcı</th>
                                    <th style={s.th}><FaRoute size={10} /> Sayfa</th>
                                    <th style={s.th}>Cihaz</th>
                                    <th style={s.th}>Tarayıcı</th>
                                    <th style={s.th}>Referrer</th>
                                    <th style={s.th}>Session ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length === 0 && (
                                    <tr><td colSpan={8} style={{ ...s.td, textAlign: 'center', color: '#6b7280' }}>Kayıt bulunamadı</td></tr>
                                )}
                                {logs.map((log) => (
                                    <tr key={log.id} style={{ transition: 'background 0.1s' }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#1a1b1e'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                        <td style={s.td}>{formatTs(log.timestamp)}</td>
                                        <td style={s.td}><span style={s.ipBadge}>{log.ip}</span></td>
                                        <td style={s.td}>{log.username || <span style={{ color: '#6b7280' }}>anonim</span>}</td>
                                        <td style={s.td}><span style={s.pathBadge} title={log.path}>{log.path}</span></td>
                                        <td style={s.td}>{deviceIcon(log.device)} {log.device}</td>
                                        <td style={s.td}>{log.browser}</td>
                                        <td style={s.td}>
                                            {log.referrer && log.referrer !== '—'
                                                ? <span style={{ color: '#9ca3af', fontSize: '11px' }}>{log.referrer.slice(0, 40)}</span>
                                                : <span style={{ color: '#374151' }}>—</span>}
                                        </td>
                                        <td style={{ ...s.td, color: '#6b7280', fontSize: '11px' }}>
                                            {log.session_id ? log.session_id.slice(0, 12) + '…' : '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {total_pages > 1 && (
                    <div style={s.paginationRow}>
                        <button style={s.pageBtn(false)} onClick={() => goPage(1)} disabled={visitorPage <= 1}>«</button>
                        <button style={s.pageBtn(false)} onClick={() => goPage(Math.max(visitorPage - 1, 1))} disabled={visitorPage <= 1}>‹</button>
                        {Array.from({ length: Math.min(total_pages, 7) }, (_, i) => {
                            const start = Math.max(1, visitorPage - 3);
                            const p = start + i;
                            if (p > total_pages) return null;
                            return (
                                <button key={p} style={s.pageBtn(p === visitorPage)} onClick={() => goPage(p)}>{p}</button>
                            );
                        })}
                        <button style={s.pageBtn(false)} onClick={() => goPage(Math.min(visitorPage + 1, total_pages))} disabled={visitorPage >= total_pages}>›</button>
                        <button style={s.pageBtn(false)} onClick={() => goPage(total_pages)} disabled={visitorPage >= total_pages}>»</button>
                        <span style={{ color: '#6b7280', fontSize: '11px' }}>{visitorPage}/{total_pages}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

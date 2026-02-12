import React from 'react';
import { FaCode, FaDownload, FaSync, FaTimes } from 'react-icons/fa';

// Extracted from AdminPanelModal.js
    const renderLogs = () => (
        <div>
            {/* Header & Filters */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <h2 style={{ color: '#fff', margin: 0, fontSize: '18px' }}>📋 Gelişmiş Sistem Logları</h2>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <select
                        value={logType}
                        onChange={(e) => setLogType(e.target.value)}
                        style={{ ...styles.searchInput, width: '120px' }}
                    >
                        <option value="all">🔄 Tümü</option>
                        <option value="audit">📝 Audit</option>
                        <option value="login">🔐 Login</option>
                        <option value="error">❌ Error</option>
                        <option value="security">🛡️ Security</option>
                        <option value="moderation">⚖️ Moderation</option>
                        <option value="api">🌐 API</option>
                    </select>
                    <select
                        value={logSeverity}
                        onChange={(e) => setLogSeverity(e.target.value)}
                        style={{ ...styles.searchInput, width: '100px' }}
                    >
                        <option value="">Severity</option>
                        <option value="info">ℹ️ Info</option>
                        <option value="warning">⚠️ Warning</option>
                        <option value="error">🔴 Error</option>
                        <option value="critical">💀 Critical</option>
                    </select>
                    <input
                        type="text"
                        placeholder="🔍 Ara..."
                        value={logSearch}
                        onChange={(e) => setLogSearch(e.target.value)}
                        style={{ ...styles.searchInput, width: '150px' }}
                    />
                    <button onClick={fetchSystemLogs} style={styles.actionBtn('#5865f2')} disabled={logLoading}>
                        <FaSync className={logLoading ? 'spin' : ''} /> Yenile
                    </button>
                    <div style={{ position: 'relative' }}>
                        <button style={styles.actionBtn('#23a559')} onClick={() => handleExportLogs('csv')}>
                            <FaDownload /> CSV
                        </button>
                    </div>
                    <button style={styles.actionBtn('#f0b132')} onClick={() => handleExportLogs('json')}>
                        <FaCode /> JSON
                    </button>
                </div>
            </div>

            {/* Date Range Filters */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', alignItems: 'center' }}>
                <span style={{ color: '#a0a0a0', fontSize: '12px' }}>📅 Tarih:</span>
                <input
                    type="date"
                    value={logDateFrom}
                    onChange={(e) => setLogDateFrom(e.target.value)}
                    style={{ ...styles.searchInput, width: '140px' }}
                />
                <span style={{ color: '#666' }}>→</span>
                <input
                    type="date"
                    value={logDateTo}
                    onChange={(e) => setLogDateTo(e.target.value)}
                    style={{ ...styles.searchInput, width: '140px' }}
                />
                {(logDateFrom || logDateTo) && (
                    <button
                        onClick={() => { setLogDateFrom(''); setLogDateTo(''); }}
                        style={{ ...styles.actionBtn('#e74c3c'), padding: '4px 8px' }}
                    >
                        ✕ Temizle
                    </button>
                )}
            </div>

            {/* Stats Cards */}
            {logStats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '16px' }}>
                    {[
                        { label: 'Audit', count: logStats.audit_count, color: '#5865f2', icon: '📝' },
                        { label: 'Login', count: logStats.login_count, color: '#23a559', icon: '🔐' },
                        { label: 'Errors', count: logStats.error_count, color: '#e74c3c', icon: '❌' },
                        { label: 'Security', count: logStats.security_count, color: '#f0b132', icon: '🛡️' },
                        { label: 'Moderation', count: logStats.moderation_count, color: '#9b59b6', icon: '⚖️' },
                        { label: 'API', count: logStats.api_count, color: '#3498db', icon: '🌐' },
                    ].map((stat, idx) => (
                        <div key={idx} style={{
                            backgroundColor: '#1a1a1e', borderRadius: '8px', padding: '10px',
                            textAlign: 'center', border: `1px solid ${stat.color}30`
                        }}>
                            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{stat.icon}</div>
                            <div style={{ color: stat.color, fontWeight: '700', fontSize: '18px' }}>
                                {(stat.count || 0).toLocaleString()}
                            </div>
                            <div style={{ color: '#888', fontSize: '11px' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Logs Table */}
            <div style={{
                backgroundColor: '#0a0a0c', borderRadius: '10px',
                fontFamily: 'JetBrains Mono, Consolas, monospace', maxHeight: '450px',
                overflowY: 'auto', border: '1px solid #1f2023'
            }}>
                {logLoading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                        <FaSync className="spin" style={{ fontSize: '24px', marginBottom: '10px' }} />
                        <div>Loading logs...</div>
                    </div>
                ) : systemLogs.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                        📭 No logs found
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ position: 'sticky', top: 0, backgroundColor: '#0a0a0c' }}>
                            <tr>
                                <th style={{ ...styles.th, width: '150px' }}>Zaman</th>
                                <th style={{ ...styles.th, width: '80px' }}>Tip</th>
                                <th style={{ ...styles.th, width: '70px' }}>Severity</th>
                                <th style={{ ...styles.th, width: '120px' }}>Actor</th>
                                <th style={styles.th}>Action / Details</th>
                                <th style={{ ...styles.th, width: '120px' }}>IP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {systemLogs.map((log, idx) => (
                                <tr key={log.id || idx} style={{ borderBottom: '1px solid #1a1a1e' }}>
                                    <td style={{ ...styles.td, color: '#666', fontSize: '11px' }}>
                                        {new Date(log.timestamp).toLocaleString('tr-TR')}
                                    </td>
                                    <td style={styles.td}>
                                        <span style={{
                                            padding: '2px 6px', borderRadius: '4px', fontSize: '10px',
                                            backgroundColor:
                                                log.type === 'error' ? '#f8514920' :
                                                    log.type === 'security' ? '#f0b13220' :
                                                        log.type === 'login' ? '#23a55920' :
                                                            log.type === 'moderation' ? '#9b59b620' :
                                                                log.type === 'api' ? '#3498db20' : '#5865f220',
                                            color:
                                                log.type === 'error' ? '#f85149' :
                                                    log.type === 'security' ? '#f0b132' :
                                                        log.type === 'login' ? '#23a559' :
                                                            log.type === 'moderation' ? '#9b59b6' :
                                                                log.type === 'api' ? '#3498db' : '#5865f2'
                                        }}>
                                            {log.type}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <span style={{
                                            padding: '2px 6px', borderRadius: '4px', fontSize: '10px',
                                            backgroundColor:
                                                log.severity === 'error' || log.severity === 'critical' ? '#f8514920' :
                                                    log.severity === 'warning' ? '#d2992220' : '#23a55920',
                                            color:
                                                log.severity === 'error' || log.severity === 'critical' ? '#f85149' :
                                                    log.severity === 'warning' ? '#d29922' : '#3fb950'
                                        }}>
                                            {log.severity}
                                        </span>
                                    </td>
                                    <td style={{ ...styles.td, fontSize: '12px' }}>
                                        <span
                                            style={{ color: '#58a6ff', cursor: 'pointer' }}
                                            onClick={() => log.actor !== 'System' && log.actor !== 'Anonymous' && log.actor !== 'AutoMod' && fetchUserActivity(log.actor)}
                                        >
                                            {log.actor || 'System'}
                                        </span>
                                    </td>
                                    <td style={{ ...styles.td, fontSize: '11px' }}>
                                        <div style={{ color: '#e5e7eb' }}>{log.action}</div>
                                        {log.details && typeof log.details === 'object' && (
                                            <div style={{ color: '#666', fontSize: '10px', marginTop: '2px' }}>
                                                {Object.entries(log.details).slice(0, 3).map(([k, v]) => (
                                                    <span key={k} style={{ marginRight: '8px' }}>
                                                        {k}: {typeof v === 'object' ? JSON.stringify(v).slice(0, 30) : String(v).slice(0, 30)}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ ...styles.td, color: '#888', fontSize: '11px' }}>
                                        {log.ip_address || '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* User Activity Modal */}
            {userActivityModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 9999
                }}>
                    <div style={{
                        backgroundColor: '#1a1a1e', borderRadius: '12px', padding: '20px',
                        maxWidth: '700px', width: '90%', maxHeight: '80vh', overflow: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ color: '#fff', margin: 0 }}>
                                👤 {userActivityModal.user?.username}'s Activity Timeline
                            </h3>
                            <button onClick={() => setUserActivityModal(null)} style={styles.actionBtn('#e74c3c')}>
                                <FaTimes />
                            </button>
                        </div>

                        {/* User Info */}
                        <div style={{ backgroundColor: '#0a0a0c', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                <div><span style={{ color: '#888' }}>Email:</span> <span style={{ color: '#fff' }}>{userActivityModal.user?.email}</span></div>
                                <div><span style={{ color: '#888' }}>Joined:</span> <span style={{ color: '#fff' }}>{new Date(userActivityModal.user?.date_joined).toLocaleDateString()}</span></div>
                                <div><span style={{ color: '#888' }}>Last Login:</span> <span style={{ color: '#fff' }}>{userActivityModal.user?.last_login ? new Date(userActivityModal.user.last_login).toLocaleString() : 'Never'}</span></div>
                            </div>
                        </div>

                        {/* Activities */}
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {userActivityModal.activities?.map((activity, idx) => (
                                <div key={idx} style={{
                                    display: 'flex', gap: '12px', padding: '10px',
                                    borderBottom: '1px solid #2a2a2e'
                                }}>
                                    <div style={{
                                        width: '30px', height: '30px', borderRadius: '50%',
                                        backgroundColor:
                                            activity.type === 'login' ? '#23a55930' :
                                                activity.type === 'message' ? '#5865f230' :
                                                    activity.type === 'moderation' ? '#e74c3c30' : '#f0b13230',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {activity.type === 'login' ? '🔐' :
                                            activity.type === 'message' ? '💬' :
                                                activity.type === 'moderation' ? '⚖️' :
                                                    activity.type === 'server' ? '🏠' : '📝'}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ color: '#fff', fontSize: '13px' }}>{activity.action}</div>
                                        <div style={{ color: '#888', fontSize: '11px' }}>
                                            {new Date(activity.timestamp).toLocaleString()}
                                        </div>
                                        {activity.details && (
                                            <div style={{ color: '#666', fontSize: '11px', marginTop: '4px' }}>
                                                {JSON.stringify(activity.details).slice(0, 100)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

import React from 'react';
import { FaBan, FaFlag, FaHistory, FaShieldAlt, FaUnlock } from 'react-icons/fa';
import styles from '../styles';

const ModerationTab = ({ bannedUsers, handleUserAction, onOpenAuditLogs, onOpenModTools, onOpenReports }) => {
    return (
        <div>
                    <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>🛡️ Moderasyon Merkezi</h2>

                    {/* Quick Actions */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
                        {[
                            { icon: <FaShieldAlt />, title: 'Mod Araçları', color: '#e74c3c', action: onOpenModTools },
                            { icon: <FaFlag />, title: 'Raporlar', color: '#f0b132', badge: '3', action: onOpenReports },
                            { icon: <FaHistory />, title: 'Denetim Log', color: '#5865f2', action: onOpenAuditLogs },
                            { icon: <FaBan />, title: 'Ban Listesi', color: '#9b59b6', badge: bannedUsers.length.toString() },
                        ].map((item, idx) => (
                            <div key={idx} style={{ ...styles.statCard, cursor: 'pointer' }} onClick={() => { item.action?.(); }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ fontSize: '24px', color: item.color }}>{item.icon}</div>
                                    <div>
                                        <div style={{ color: '#fff', fontWeight: '600', fontSize: '13px' }}>{item.title}</div>
                                        {item.badge && <span style={styles.badge(item.color)}>{item.badge}</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Banned Users */}
                    <div style={styles.statCard}>
                        <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>🚫 Yasaklı Kullanıcılar</h3>
                        <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>Kullanıcı</th>
                                        <th style={styles.th}>Sebep</th>
                                        <th style={styles.th}>Tarih</th>
                                        <th style={styles.th}>Yasaklayan</th>
                                        <th style={styles.th}>İşlem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bannedUsers.map(user => (
                                        <tr key={user.id}>
                                            <td style={styles.td}>{user.username}</td>
                                            <td style={styles.td}>{user.reason}</td>
                                            <td style={styles.td}>{user.banned_at}</td>
                                            <td style={styles.td}>{user.banned_by}</td>
                                            <td style={styles.td}>
                                                <button style={styles.actionBtn('#23a559')} onClick={() => handleUserAction('unban', user.id)}>
                                                    <FaUnlock /> Kaldır
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
    );
};

export default ModerationTab;

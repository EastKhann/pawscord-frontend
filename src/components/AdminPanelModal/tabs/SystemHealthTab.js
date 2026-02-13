import React from 'react';
import { FaChartLine, FaClock, FaDatabase, FaMemory, FaWifi } from 'react-icons/fa';
import styles from '../styles';

const SystemHealthTab = ({ systemHealth }) => {
    return (
        <div>
                    <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>💚 Sistem Sağlığı</h2>

                    {/* Health Bars */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                        {[
                            { label: 'CPU', value: systemHealth?.cpu || 0, color: '#23a559' },
                            { label: 'Bellek', value: systemHealth?.memory || 0, color: '#5865f2' },
                            { label: 'Disk', value: systemHealth?.disk || 0, color: '#f0b132' },
                        ].map((item, idx) => (
                            <div key={idx} style={styles.statCard}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#fff', fontWeight: '600', fontSize: '13px' }}>{item.label}</span>
                                    <span style={{ color: item.value > 80 ? '#e74c3c' : item.color, fontWeight: '700' }}>{item.value}%</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', backgroundColor: '#2a2a2e', borderRadius: '4px' }}>
                                    <div style={{
                                        width: `${item.value}%`, height: '100%', borderRadius: '4px',
                                        backgroundColor: item.value > 80 ? '#e74c3c' : item.color,
                                        transition: 'width 0.5s'
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* System Info */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                        {[
                            { label: 'Uptime', value: systemHealth?.uptime, icon: <FaClock color="#5865f2" /> },
                            { label: 'Bağlantı', value: systemHealth?.activeConnections, icon: <FaWifi color="#23a559" /> },
                            { label: 'İstek/dk', value: systemHealth?.requestsPerMinute, icon: <FaChartLine color="#f0b132" /> },
                            { label: 'DB Bağlantı', value: systemHealth?.dbConnections, icon: <FaDatabase color="#9b59b6" /> },
                            { label: 'Cache Hit', value: `${systemHealth?.cacheHitRate}%`, icon: <FaMemory color="#e74c3c" /> },
                        ].map((item, idx) => (
                            <div key={idx} style={{ ...styles.statCard, textAlign: 'center' }}>
                                <div style={{ marginBottom: '8px' }}>{item.icon}</div>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>{item.value || '---'}</div>
                                <div style={{ fontSize: '10px', color: '#6b7280' }}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
    );
};

export default SystemHealthTab;

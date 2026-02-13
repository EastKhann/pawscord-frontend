import React from 'react';
import { FaCheckCircle, FaLock, FaUnlock } from 'react-icons/fa';
import styles from '../styles';

const SecurityTab = ({ maintenanceMode, toggleMaintenance }) => {
    return (
        <div>
                    <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>🔒 Güvenlik Merkezi</h2>

                    <div style={{
                        ...styles.statCard, marginBottom: '16px',
                        background: maintenanceMode ? 'linear-gradient(135deg, #f0b13220, #e74c3c20)' : 'linear-gradient(135deg, #23a55920, #5865f220)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <FaCheckCircle size={24} color={maintenanceMode ? '#f0b132' : '#23a559'} />
                                <div>
                                    <div style={{ color: maintenanceMode ? '#f0b132' : '#23a559', fontWeight: '600' }}>
                                        {maintenanceMode ? '🔧 Bakım Modu Aktif' : '✅ Sistem Güvenli'}
                                    </div>
                                    <div style={{ color: '#6b7280', fontSize: '12px' }}>Son tarama: 5 dakika önce</div>
                                </div>
                            </div>
                            <button onClick={toggleMaintenance} style={styles.actionBtn(maintenanceMode ? '#23a559' : '#f0b132')}>
                                {maintenanceMode ? <FaUnlock /> : <FaLock />} {maintenanceMode ? 'Kapat' : 'Bakım Modu'}
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                        {[
                            { label: 'Giriş Denemesi', value: '247', sub: 'Son 24 saat', color: '#5865f2' },
                            { label: 'Başarısız Giriş', value: '12', sub: 'Son 24 saat', color: '#f0b132' },
                            { label: 'Engellenen IP', value: '15', sub: 'Aktif', color: '#e74c3c' },
                        ].map((item, idx) => (
                            <div key={idx} style={styles.statCard}>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: item.color }}>{item.value}</div>
                                <div style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>{item.label}</div>
                                <div style={{ color: '#6b7280', fontSize: '11px' }}>{item.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
    );
};

export default SecurityTab;

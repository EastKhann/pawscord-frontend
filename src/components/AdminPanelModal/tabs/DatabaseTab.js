import React from 'react';
import { FaBroom, FaCloudDownloadAlt, FaCloudUploadAlt, FaDatabase } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import styles from '../styles';
import toast from '../../../utils/toast';

const DatabaseTab = ({ backupStatus, dbStats, handleBackup, handleClearCache, handleDeleteOldLogs }) => {
    return (
        <div>
                    <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>🗄️ Veritabanı Yönetimi</h2>

                    {/* DB Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                        {dbStats && Object.entries(dbStats).filter(([k]) => k !== 'total_size').map(([key, val], idx) => (
                            <div key={idx} style={styles.statCard}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px', textTransform: 'capitalize' }}>{key.replace('_', ' ')}</div>
                                        <div style={{ color: '#6b7280', fontSize: '11px' }}>{val.size}</div>
                                    </div>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#5865f2' }}>{val.count?.toLocaleString()}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total & Actions */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                        <div style={{ ...styles.statCard, textAlign: 'center' }}>
                            <FaDatabase size={40} color="#5865f2" />
                            <div style={{ fontSize: '28px', fontWeight: '700', color: '#fff', marginTop: '10px' }}>
                                {dbStats?.total_size || '---'}
                            </div>
                            <div style={{ color: '#6b7280', fontSize: '12px' }}>Toplam Boyut</div>
                        </div>
                        <div style={styles.statCard}>
                            <h3 style={{ color: '#fff', marginTop: 0, fontSize: '14px' }}>🔧 Veritabanı İşlemleri</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '14px' }}>
                                <button onClick={handleBackup} style={{ ...styles.actionBtn('#5865f2'), padding: '12px' }}>
                                    <FaCloudUploadAlt /> Yedekle
                                </button>
                                <button style={{ ...styles.actionBtn('#23a559'), padding: '12px' }} onClick={() => toast.info('📦 Geri yükleme özelliği yakında!')}>
                                    <FaCloudDownloadAlt /> Geri Yükle
                                </button>
                                <button onClick={handleClearCache} style={{ ...styles.actionBtn('#f0b132'), padding: '12px' }}>
                                    <FaBroom /> Cache Temizle
                                </button>
                                <button style={{ ...styles.actionBtn('#e74c3c'), padding: '12px' }} onClick={handleDeleteOldLogs}>
                                    <MdDelete /> Eski Logları Sil
                                </button>
                            </div>
                            {backupStatus && (
                                <div style={{
                                    marginTop: '12px', padding: '10px', borderRadius: '6px',
                                    backgroundColor: backupStatus === 'success' ? '#23a55920' : backupStatus === 'error' ? '#e74c3c20' : '#5865f220',
                                    color: backupStatus === 'success' ? '#23a559' : backupStatus === 'error' ? '#e74c3c' : '#5865f2'
                                }}>
                                    {backupStatus === 'running' && '⏳ Yedekleme devam ediyor...'}
                                    {backupStatus === 'success' && '✅ Yedekleme tamamlandı!'}
                                    {backupStatus === 'error' && '❌ Yedekleme başarısız!'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
    );
};

export default DatabaseTab;

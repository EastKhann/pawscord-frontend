import React from 'react';
import { FaBroom, FaBug, FaCloudUploadAlt, FaFileExport, FaSync, FaTerminal } from 'react-icons/fa';
import toast from '../../utils/toast';

// Extracted from AdminPanelModal.js
    const renderTools = () => (
        <div>
            <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>🔧 Admin Araçları</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[
                    { icon: <FaCloudUploadAlt />, title: 'Yedekleme', desc: 'Veritabanı yedekle', color: '#5865f2', action: handleBackup },
                    { icon: <FaBroom />, title: 'Cache Temizle', desc: 'Önbellek temizle', color: '#f0b132', action: handleClearCache },
                    { icon: <FaSync />, title: 'Yeniden Başlat', desc: 'Servisleri yeniden başlat', color: '#e74c3c', action: () => toast.info('🔄 Bu özellik güvenlik nedeniyle sunucu üzerinden yapılmalıdır') },
                    { icon: <FaTerminal />, title: 'Konsol', desc: 'Admin konsolu', color: '#23a559', action: () => toast.info('🖥️ Konsol erişimi SSH üzerinden yapılmalıdır') },
                    { icon: <FaBug />, title: 'Debug Modu', desc: 'Hata ayıklama', color: '#5865f2', action: () => toast.info('🐛 Debug modu güvenlik nedeniyle devre dışı') },
                    { icon: <FaFileExport />, title: 'Export', desc: 'Veri dışa aktar', color: '#1abc9c', action: handleBackup },
                ].map((item, idx) => (
                    <div key={idx} style={{ ...styles.statCard, cursor: 'pointer' }} onClick={item.action}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ fontSize: '24px', color: item.color }}>{item.icon}</div>
                            <div>
                                <div style={{ color: '#fff', fontWeight: '600', fontSize: '13px' }}>{item.title}</div>
                                <div style={{ color: '#6b7280', fontSize: '11px' }}>{item.desc}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

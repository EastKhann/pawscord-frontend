import React from 'react';
import { FaClock, FaPaperPlane } from 'react-icons/fa';
import toast from '../../utils/toast';

// Extracted from AdminPanelModal.js
    const renderBroadcast = () => (
        <div>
            <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>📢 Duyuru Merkezi</h2>

            <div style={styles.statCard}>
                <h3 style={{ color: '#fff', marginTop: 0, fontSize: '14px' }}>Yeni Duyuru</h3>
                <textarea
                    value={announceText}
                    onChange={(e) => setAnnounceText(e.target.value)}
                    placeholder="Tüm kullanıcılara göndermek istediğiniz mesajı yazın..."
                    style={{
                        width: '100%', minHeight: '120px', padding: '12px',
                        backgroundColor: '#111113', border: '1px solid #2a2a2e',
                        borderRadius: '8px', color: '#fff', fontSize: '14px',
                        resize: 'vertical', outline: 'none', marginBottom: '12px'
                    }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleBroadcast} style={{ ...styles.actionBtn('#5865f2'), padding: '10px 20px' }}>
                        <FaPaperPlane /> Gönder
                    </button>
                    <button style={{ ...styles.actionBtn('#6b7280'), padding: '10px 20px' }} onClick={() => toast.info('⏰ Zamanlı duyuru özelliği yakında!')}>
                        <FaClock /> Zamanla
                    </button>
                </div>
            </div>
        </div>
    );

import React from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';

// Extracted from AdminPanelModal.js
    const renderServers = () => (
        <div>
            <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>🏠 Sunucu Yönetimi</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
                {servers.map(server => (
                    <div key={server.id} style={{ ...styles.statCard, position: 'relative' }}>
                        {server.is_verified && (
                            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                <span style={styles.badge('#23a559')}>✓ Onaylı</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '12px',
                                background: `linear-gradient(135deg, hsl(${server.id * 50}, 60%, 45%), hsl(${server.id * 50 + 40}, 60%, 35%))`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#fff', fontWeight: '700', fontSize: '18px'
                            }}>
                                {server.name?.charAt(0)}
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', color: '#fff', fontSize: '14px' }}>{server.name}</div>
                                <div style={{ fontSize: '11px', color: '#6b7280' }}>Sahip: {server.owner}</div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px' }}>
                            <div style={styles.miniCard}>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#5865f2' }}>{server.members}</div>
                                <div style={{ fontSize: '9px', color: '#6b7280' }}>Üye</div>
                            </div>
                            <div style={styles.miniCard}>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#23a559' }}>{server.channels}</div>
                                <div style={{ fontSize: '9px', color: '#6b7280' }}>Kanal</div>
                            </div>
                            <div style={styles.miniCard}>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#9b59b6' }}>{server.voice_channels}</div>
                                <div style={{ fontSize: '9px', color: '#6b7280' }}>Ses</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <button style={{ ...styles.actionBtn('#5865f2'), flex: 1, padding: '8px' }} onClick={() => handleServerDetails(server)}>
                                <FaEye /> Görüntüle
                            </button>
                            <button style={{ ...styles.actionBtn('#e74c3c'), flex: 1, padding: '8px' }} onClick={() => setDeleteConfirm({ type: 'server', id: server.id, name: server.name })}>
                                <FaTrash /> Sil
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

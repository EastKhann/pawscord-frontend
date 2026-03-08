import React from 'react';

// Extracted from AdminPanelModal.js
    const renderQuickActions = () => (
        <div>
            <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>⚡ Hızlı İşlemler</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
                {[
                    { icon: '📊', title: 'Analytics', desc: 'İstatistikleri görüntüle', color: '#f0b132', action: onOpenAnalytics },
                    { icon: '🪝', title: 'Webhooks', desc: 'Webhook ayarları', color: '#5865f2', action: onOpenWebhooks },
                    { icon: '🤖', title: 'Oto Yanıtlayıcı', desc: 'Otomatik yanıtlar', color: '#5865f2', action: onOpenAutoResponder },
                    { icon: '🔗', title: 'Vanity URL', desc: 'Özel URL\'ler', color: '#1abc9c', action: onOpenVanityURL },
                ].map((item, idx) => (
                    <div
                        key={idx}
                        onClick={() => { item.action?.(); onClose(); }}
                        style={{ ...styles.statCard, cursor: 'pointer', borderLeft: `4px solid ${item.color}` }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{ fontSize: '28px' }}>{item.icon}</div>
                            <div>
                                <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{item.title}</div>
                                <div style={{ color: '#6b7280', fontSize: '11px' }}>{item.desc}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

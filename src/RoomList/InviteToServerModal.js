import React from 'react';
import { createPortal } from 'react-dom';

const InviteToServerModal = ({ inviteToServerModal, servers, onSendInvite, onClose }) => {
    if (!inviteToServerModal || !inviteToServerModal.isOpen) return null;

    return createPortal(
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.85)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 999999
            }}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: '#2b2d31',
                    borderRadius: '12px',
                    width: '400px',
                    maxHeight: '80vh',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                }}
            >
                {/* Header */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #3f4147',
                    textAlign: 'center'
                }}>
                    <h2 style={{ color: '#f2f3f5', margin: 0, fontSize: '18px' }}>
                        🎫 Sunucuya Davet Et
                    </h2>
                    <p style={{ color: '#b9bbbe', margin: '8px 0 0', fontSize: '14px' }}>
                        <strong>{inviteToServerModal.username}</strong> kullanıcısını hangi sunucuya davet etmek istiyorsunuz?
                    </p>
                </div>

                {/* Server List */}
                <div style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    padding: '12px'
                }}>
                    {servers.map(server => (
                        <div
                            key={server.id}
                            onClick={() => onSendInvite(server.id, inviteToServerModal.username)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                backgroundColor: 'rgba(255,255,255,0.02)',
                                marginBottom: '8px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(88, 101, 242, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                            }}
                        >
                            {server.icon ? (
                                <img
                                    src={server.icon}
                                    alt={server.name}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <div style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    backgroundColor: '#5865f2',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontSize: '16px'
                                }}>
                                    {server.name?.substring(0, 2).toUpperCase()}
                                </div>
                            )}
                            <div style={{ flex: 1 }}>
                                <div style={{ color: '#f2f3f5', fontWeight: '600' }}>
                                    {server.name}
                                </div>
                                <div style={{ color: '#b9bbbe', fontSize: '12px' }}>
                                    {server.member_count || server.categories?.length || 0} üye
                                </div>
                            </div>
                            <div style={{ color: '#5865f2', fontSize: '20px' }}>→</div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '16px 20px',
                    borderTop: '1px solid #3f4147',
                    textAlign: 'center'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            backgroundColor: '#4f545c',
                            color: '#f2f3f5',
                            border: 'none',
                            padding: '10px 24px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        İptal
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default InviteToServerModal;

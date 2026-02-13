import React from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from '../styles';

const ServerDetailModal = ({ selectedServer, setSelectedServer }) => {
    return (
        <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
                                justifyContent: 'center', alignItems: 'center', zIndex: 15
                            }} onClick={() => setSelectedServer(null)}>
                                <div style={{
                                    backgroundColor: '#1a1a1e', borderRadius: '12px',
                                    padding: '24px', width: '600px', maxHeight: '80vh', overflowY: 'auto',
                                    border: '1px solid #2a2a2e'
                                }} onClick={e => e.stopPropagation()}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                        <h3 style={{ color: '#fff', margin: 0 }}>🏠 {selectedServer.name}</h3>
                                        <button onClick={() => setSelectedServer(null)} style={styles.actionBtn('#e74c3c')}>
                                            <FaTimes />
                                        </button>
                                    </div>

                                    {/* Server Info */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                                        <div style={styles.miniCard}>
                                            <div style={{ fontSize: '20px', fontWeight: '700', color: '#5865f2' }}>{selectedServer.member_count}</div>
                                            <div style={{ fontSize: '10px', color: '#6b7280' }}>Üye</div>
                                        </div>
                                        <div style={styles.miniCard}>
                                            <div style={{ fontSize: '20px', fontWeight: '700', color: '#23a559' }}>{selectedServer.channel_count}</div>
                                            <div style={{ fontSize: '10px', color: '#6b7280' }}>Kanal</div>
                                        </div>
                                        <div style={styles.miniCard}>
                                            <div style={{ fontSize: '20px', fontWeight: '700', color: '#f0b132' }}>{selectedServer.owner}</div>
                                            <div style={{ fontSize: '10px', color: '#6b7280' }}>Sahip</div>
                                        </div>
                                    </div>

                                    {/* Members */}
                                    <div style={{ marginBottom: '16px' }}>
                                        <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '8px' }}>👥 Üyeler ({selectedServer.members?.length || 0})</h4>
                                        <div style={{ maxHeight: '200px', overflowY: 'auto', backgroundColor: '#111113', borderRadius: '8px' }}>
                                            {selectedServer.members?.map((member, idx) => (
                                                <div key={idx} style={{
                                                    display: 'flex', justifyContent: 'space-between', padding: '8px 12px',
                                                    borderBottom: '1px solid #2a2a2e', fontSize: '12px'
                                                }}>
                                                    <span style={{ color: '#fff' }}>{member.username}</span>
                                                    <span style={styles.badge(member.role === 'admin' ? '#e74c3c' : '#5865f2')}>{member.role}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Channels */}
                                    <div>
                                        <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '8px' }}>📁 Kanallar ({selectedServer.channels?.length || 0})</h4>
                                        <div style={{ maxHeight: '200px', overflowY: 'auto', backgroundColor: '#111113', borderRadius: '8px' }}>
                                            {selectedServer.channels?.map((channel, idx) => (
                                                <div key={idx} style={{
                                                    display: 'flex', justifyContent: 'space-between', padding: '8px 12px',
                                                    borderBottom: '1px solid #2a2a2e', fontSize: '12px'
                                                }}>
                                                    <span style={{ color: '#fff' }}>#{channel.name}</span>
                                                    <span style={styles.badge('#5865f2')}>{channel.type}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
    );
};

export default ServerDetailModal;

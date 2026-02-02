// components/RoleAuditsViewer.js
// 📜 Role Changes Audit Log

import React, { useState, useEffect } from 'react';
import { FaShieldAlt, FaUserShield, FaClock } from 'react-icons/fa';

const RoleAuditsViewer = ({ serverId, fetchWithAuth, apiBaseUrl }) => {
    const [audits, setAudits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAudits();
    }, [serverId]);

    const loadAudits = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/role_audits/`);
            if (res.ok) {
                const data = await res.json();
                setAudits(data);
            }
        } catch (e) {
            console.error('Audits load error:', e);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('tr-TR', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <div style={{ padding: '20px', color: '#b9bbbe' }}>Loading audit logs...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaShieldAlt style={{ color: '#5865f2', fontSize: '20px' }} />
                <h4 style={{ margin: 0, color: '#dcddde' }}>Role Changes</h4>
            </div>

            {audits.length === 0 ? (
                <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: '#72767d',
                    backgroundColor: '#2f3136',
                    borderRadius: '8px'
                }}>
                    No role changes recorded
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto' }}>
                    {audits.map((audit, idx) => (
                        <div
                            key={idx}
                            style={{
                                padding: '14px',
                                backgroundColor: '#2f3136',
                                borderRadius: '6px',
                                borderLeft: '3px solid #5865f2'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FaUserShield style={{ color: '#5865f2' }} />
                                    <span style={{ color: '#dcddde', fontWeight: '500' }}>
                                        {audit.moderator || 'System'}
                                    </span>
                                </div>
                                <div style={{ color: '#72767d', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <FaClock />
                                    {formatTime(audit.timestamp)}
                                </div>
                            </div>

                            <div style={{ color: '#b9bbbe', fontSize: '14px', paddingLeft: '28px' }}>
                                {audit.action === 'assign' ? 'Assigned' : 'Removed'} role{' '}
                                <span style={{
                                    color: audit.role_color || '#99aab5',
                                    fontWeight: 'bold',
                                    padding: '2px 6px',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    borderRadius: '3px'
                                }}>
                                    {audit.role_name}
                                </span>
                                {' '}{audit.action === 'assign' ? 'to' : 'from'}{' '}
                                <span style={{ color: '#dcddde', fontWeight: '500' }}>
                                    {audit.target_user}
                                </span>
                            </div>

                            {audit.reason && (
                                <div style={{
                                    marginTop: '8px',
                                    paddingLeft: '28px',
                                    color: '#72767d',
                                    fontSize: '13px',
                                    fontStyle: 'italic'
                                }}>
                                    Reason: {audit.reason}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoleAuditsViewer;




// components/InviteApprovalPanel.js
// 👮 Invite Approval System

import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaCheck, FaTimes, FaEnvelope, FaClock } from 'react-icons/fa';

const InviteApprovalPanel = ({ serverId, fetchWithAuth, apiBaseUrl }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRequests();
    }, [serverId]);

    const loadRequests = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/invites/requests/?server_id=${serverId}`);
            if (res.ok) {
                const data = await res.json();
                setRequests(data.filter(r => r.status === 'pending'));
            }
        } catch (e) {
            console.error('Invite requests load error:', e);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (requestId) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/invites/approve/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ request_id: requestId, approved: true })
            });

            if (res.ok) {
                setRequests(prev => prev.filter(r => r.id !== requestId));
                toast.success('✅ Invite approved!');
            }
        } catch (e) {
            toast.error('❌ Failed to approve invite');
        }
    };

    const handleDeny = async (requestId) => {
        const reason = prompt('Reason for denial (optional):');

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/invites/approve/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    request_id: requestId,
                    approved: false,
                    reason
                })
            });

            if (res.ok) {
                setRequests(prev => prev.filter(r => r.id !== requestId));
                toast.success('✅ Invite denied');
            }
        } catch (e) {
            toast.error('❌ Failed to deny invite');
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

    if (loading) return <div style={{ padding: '20px', color: '#b9bbbe' }}>Loading requests...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaEnvelope style={{ color: '#faa61a', fontSize: '20px' }} />
                <h4 style={{ margin: 0, color: '#dcddde' }}>Pending Invite Requests</h4>
                {requests.length > 0 && (
                    <span style={{
                        padding: '2px 8px',
                        backgroundColor: '#f04747',
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}>
                        {requests.length}
                    </span>
                )}
            </div>

            {requests.length === 0 ? (
                <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: '#72767d',
                    backgroundColor: '#2f3136',
                    borderRadius: '8px'
                }}>
                    ✅ No pending requests
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
                    {requests.map(request => (
                        <div
                            key={request.id}
                            style={{
                                padding: '16px',
                                backgroundColor: '#2f3136',
                                borderRadius: '8px',
                                border: '1px solid #40444b'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                <div>
                                    <div style={{ color: '#dcddde', fontWeight: 'bold', fontSize: '15px', marginBottom: '4px' }}>
                                        {request.requester}
                                    </div>
                                    <div style={{ color: '#72767d', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <FaClock />
                                        {formatTime(request.created_at)}
                                    </div>
                                </div>
                            </div>

                            {request.reason && (
                                <div style={{
                                    padding: '10px',
                                    backgroundColor: '#1e1f22',
                                    borderRadius: '4px',
                                    marginBottom: '12px'
                                }}>
                                    <div style={{ color: '#b9bbbe', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>
                                        REASON:
                                    </div>
                                    <div style={{ color: '#dcddde', fontSize: '14px' }}>
                                        {request.reason}
                                    </div>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => handleApprove(request.id)}
                                    style={{
                                        flex: 1,
                                        padding: '8px 16px',
                                        backgroundColor: '#43b581',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    <FaCheck /> Approve
                                </button>
                                <button
                                    onClick={() => handleDeny(request.id)}
                                    style={{
                                        flex: 1,
                                        padding: '8px 16px',
                                        backgroundColor: '#f04747',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    <FaTimes /> Deny
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InviteApprovalPanel;




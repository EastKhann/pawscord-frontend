// components/JoinLeaveLogs.js
// 📊 Server Join/Leave Activity Logs

import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaUserMinus, FaClock } from 'react-icons/fa';

const JoinLeaveLogs = ({ serverId, fetchWithAuth, apiBaseUrl }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, joins, leaves

    useEffect(() => {
        loadLogs();
    }, [serverId, filter]);

    const loadLogs = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/logs/`);
            if (res.ok) {
                const data = await res.json();
                const filtered = filter === 'all' ? data :
                               filter === 'joins' ? data.filter(l => l.action === 'join') :
                               data.filter(l => l.action === 'leave');
                setLogs(filtered);
            }
        } catch (e) {
            console.error('Logs load error:', e);
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

    if (loading) return <div style={{ padding: '20px', color: '#b9bbbe' }}>Loading logs...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, color: '#dcddde' }}>Member Activity</h4>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['all', 'joins', 'leaves'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: filter === f ? '#5865f2' : '#2f3136',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                textTransform: 'capitalize',
                                fontSize: '13px'
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {logs.length === 0 ? (
                <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: '#72767d',
                    backgroundColor: '#2f3136',
                    borderRadius: '8px'
                }}>
                    No activity logs
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto' }}>
                    {logs.map((log, idx) => (
                        <div
                            key={idx}
                            style={{
                                padding: '12px',
                                backgroundColor: '#2f3136',
                                borderRadius: '6px',
                                borderLeft: `3px solid ${log.action === 'join' ? '#43b581' : '#f04747'}`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}
                        >
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: log.action === 'join' ? '#43b581' : '#f04747',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '16px',
                                flexShrink: 0
                            }}>
                                {log.action === 'join' ? <FaUserPlus /> : <FaUserMinus />}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ color: '#dcddde', fontWeight: '500' }}>
                                    {log.username}
                                </div>
                                <div style={{ color: '#b9bbbe', fontSize: '13px' }}>
                                    {log.action === 'join' ? 'Joined the server' : 'Left the server'}
                                </div>
                            </div>
                            <div style={{ color: '#72767d', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <FaClock />
                                {formatTime(log.timestamp)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JoinLeaveLogs;




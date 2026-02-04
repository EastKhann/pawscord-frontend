import React, { useState, useEffect } from 'react';
import { emergencyBroadcastApi } from '../services/niceToHaveApi';
import './EmergencyBroadcastPanel.css';

const SEVERITY_OPTIONS = [
    { id: 'info', label: 'Info', color: '#3498db', icon: 'ℹ️' },
    { id: 'warning', label: 'Warning', color: '#f39c12', icon: '⚠️' },
    { id: 'critical', label: 'Critical', color: '#e74c3c', icon: '🚨' },
    { id: 'emergency', label: 'Emergency', color: '#c0392b', icon: '🆘' },
];

function EmergencyBroadcastPanel({ serverId, onClose }) {
    const [broadcasts, setBroadcasts] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('warning');
    const [requireAck, setRequireAck] = useState(false);
    const [ignoreDnd, setIgnoreDnd] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadBroadcasts();
    }, [serverId]);

    const loadBroadcasts = async () => {
        try {
            const data = await emergencyBroadcastApi.getBroadcasts(serverId);
            setBroadcasts(data.broadcasts || []);
        } catch (err) {
            console.error('Failed to load broadcasts:', err);
        }
    };

    const handleCreate = async () => {
        if (!title || !message) return;

        setLoading(true);
        try {
            await emergencyBroadcastApi.createBroadcast(serverId, {
                title,
                message,
                severity,
                require_acknowledgment: requireAck,
                ignore_dnd: ignoreDnd
            });

            setTitle('');
            setMessage('');
            setShowCreate(false);
            loadBroadcasts();
        } catch (err) {
            alert('Failed to create broadcast: ' + err.message);
        }
        setLoading(false);
    };

    const handleAcknowledge = async (broadcastId) => {
        try {
            await emergencyBroadcastApi.acknowledge(broadcastId);
            loadBroadcasts();
        } catch (err) {
            alert('Failed to acknowledge');
        }
    };

    const getSeverityInfo = (sev) => SEVERITY_OPTIONS.find(s => s.id === sev) || SEVERITY_OPTIONS[0];

    return (
        <div className="emergency-broadcast-panel">
            <div className="panel-header">
                <h2>🚨 Emergency Broadcast</h2>
                <button className="create-btn" onClick={() => setShowCreate(!showCreate)}>
                    {showCreate ? 'Cancel' : '+ New Broadcast'}
                </button>
            </div>

            {showCreate && (
                <div className="create-form">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Emergency announcement title..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Describe the situation..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Severity Level</label>
                        <div className="severity-options">
                            {SEVERITY_OPTIONS.map(opt => (
                                <button
                                    key={opt.id}
                                    className={`severity-option ${severity === opt.id ? 'selected' : ''}`}
                                    style={{ '--severity-color': opt.color }}
                                    onClick={() => setSeverity(opt.id)}
                                >
                                    <span className="icon">{opt.icon}</span>
                                    <span className="label">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="checkbox-row">
                            <input
                                type="checkbox"
                                id="require-ack"
                                checked={requireAck}
                                onChange={(e) => setRequireAck(e.target.checked)}
                            />
                            <label htmlFor="require-ack">Require acknowledgment from all members</label>
                        </div>
                        <div className="checkbox-row">
                            <input
                                type="checkbox"
                                id="ignore-dnd"
                                checked={ignoreDnd}
                                onChange={(e) => setIgnoreDnd(e.target.checked)}
                            />
                            <label htmlFor="ignore-dnd">Override Do Not Disturb status</label>
                        </div>
                    </div>

                    <button
                        className="send-broadcast-btn"
                        onClick={handleCreate}
                        disabled={loading || !title || !message}
                        style={{ background: getSeverityInfo(severity).color }}
                    >
                        {loading ? 'Sending...' : `${getSeverityInfo(severity).icon} Send ${getSeverityInfo(severity).label} Broadcast`}
                    </button>
                </div>
            )}

            <div className="broadcasts-list">
                {broadcasts.length === 0 ? (
                    <div className="empty-state">
                        <span className="emoji">📢</span>
                        <p>No active broadcasts</p>
                    </div>
                ) : (
                    broadcasts.map(broadcast => {
                        const sevInfo = getSeverityInfo(broadcast.severity);
                        return (
                            <div
                                key={broadcast.id}
                                className="broadcast-item"
                                style={{ '--broadcast-color': sevInfo.color }}
                            >
                                <div className="broadcast-header">
                                    <span className="severity-badge" style={{ background: sevInfo.color }}>
                                        {sevInfo.icon} {sevInfo.label}
                                    </span>
                                    <span className="timestamp">
                                        {new Date(broadcast.created_at).toLocaleString()}
                                    </span>
                                </div>
                                <h3>{broadcast.title}</h3>
                                <p>{broadcast.message}</p>
                                <div className="broadcast-footer">
                                    <span className="sender">By: {broadcast.sender}</span>
                                    {broadcast.require_acknowledgment && !broadcast.acknowledged && (
                                        <button
                                            className="ack-btn"
                                            onClick={() => handleAcknowledge(broadcast.id)}
                                        >
                                            ✓ Acknowledge
                                        </button>
                                    )}
                                    {broadcast.acknowledged && (
                                        <span className="acked">✓ Acknowledged</span>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default EmergencyBroadcastPanel;

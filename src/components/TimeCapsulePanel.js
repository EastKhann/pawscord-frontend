import React, { useState, useEffect } from 'react';
import { timeCapsuleApi } from '../services/niceToHaveApi';
import './TimeCapsulePanel.css';

function TimeCapsulePanel({ onClose }) {
    const [activeTab, setActiveTab] = useState('create');
    const [capsules, setCapsules] = useState({ delivered: [], pending: [] });
    const [content, setContent] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [deliverAt, setDeliverAt] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);
    const [recipientId, setRecipientId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCapsules();
    }, []);

    const loadCapsules = async () => {
        try {
            const data = await timeCapsuleApi.getCapsules();
            setCapsules(data);
        } catch (err) {
            console.error('Failed to load capsules:', err);
        }
    };

    const handleCreate = async () => {
        if (!content || !deliverAt) {
            alert('Please fill in the message and delivery date');
            return;
        }

        setLoading(true);
        try {
            await timeCapsuleApi.createCapsule({
                content,
                media_url: mediaUrl,
                deliver_at: deliverAt,
                is_private: isPrivate,
                recipient_id: recipientId || null
            });

            setContent('');
            setMediaUrl('');
            setDeliverAt('');
            setRecipientId('');

            loadCapsules();
            alert('Time capsule created! 🔮');
            setActiveTab('pending');
        } catch (err) {
            alert('Failed to create capsule: ' + err.message);
        }
        setLoading(false);
    };

    const setPresetDate = (days) => {
        const date = new Date();
        date.setDate(date.getDate() + days);
        setDeliverAt(date.toISOString().slice(0, 16));
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTimeLeft = (dateStr) => {
        const now = new Date();
        const target = new Date(dateStr);
        const diff = target - now;

        if (diff < 0) return 'Ready!';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h`;
        return 'Soon...';
    };

    return (
        <div className="time-capsule-panel">
            <h2>🔮 Time Capsule</h2>

            <div className="capsule-tabs">
                <button
                    className={`capsule-tab ${activeTab === 'create' ? 'active' : ''}`}
                    onClick={() => setActiveTab('create')}
                >
                    Create New
                </button>
                <button
                    className={`capsule-tab ${activeTab === 'pending' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pending')}
                >
                    Pending ({capsules.pending?.length || 0})
                </button>
                <button
                    className={`capsule-tab ${activeTab === 'delivered' ? 'active' : ''}`}
                    onClick={() => setActiveTab('delivered')}
                >
                    Opened ({capsules.delivered?.length || 0})
                </button>
            </div>

            {activeTab === 'create' && (
                <div className="create-capsule-form">
                    <div className="form-group">
                        <label>Your Message to the Future</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write a message for your future self or someone else..."
                            maxLength={2000}
                        />
                    </div>

                    <div className="form-group">
                        <label>Media URL (Optional)</label>
                        <input
                            type="url"
                            value={mediaUrl}
                            onChange={(e) => setMediaUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="form-group">
                        <label>Open Date</label>
                        <input
                            type="datetime-local"
                            value={deliverAt}
                            onChange={(e) => setDeliverAt(e.target.value)}
                            min={new Date().toISOString().slice(0, 16)}
                        />
                        <div className="date-presets">
                            <button className="date-preset" onClick={() => setPresetDate(7)}>1 Week</button>
                            <button className="date-preset" onClick={() => setPresetDate(30)}>1 Month</button>
                            <button className="date-preset" onClick={() => setPresetDate(90)}>3 Months</button>
                            <button className="date-preset" onClick={() => setPresetDate(180)}>6 Months</button>
                            <button className="date-preset" onClick={() => setPresetDate(365)}>1 Year</button>
                            <button className="date-preset" onClick={() => setPresetDate(1825)}>5 Years</button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Send to User (Optional - Leave empty for yourself)</label>
                        <input
                            type="number"
                            value={recipientId}
                            onChange={(e) => setRecipientId(e.target.value)}
                            placeholder="User ID (leave empty to send to yourself)"
                        />
                    </div>

                    <div className="form-group">
                        <div className="checkbox-row">
                            <input
                                type="checkbox"
                                id="private"
                                checked={isPrivate}
                                onChange={(e) => setIsPrivate(e.target.checked)}
                            />
                            <label htmlFor="private" style={{ margin: 0 }}>
                                Keep private (only visible to recipient)
                            </label>
                        </div>
                    </div>

                    <button
                        className="create-capsule-btn"
                        onClick={handleCreate}
                        disabled={loading || !content || !deliverAt}
                    >
                        {loading ? 'Creating...' : '🔮 Seal Time Capsule'}
                    </button>
                </div>
            )}

            {activeTab === 'pending' && (
                <div className="capsules-list">
                    {capsules.pending?.length === 0 ? (
                        <div className="empty-state">
                            <div className="emoji">⏳</div>
                            <p>No pending capsules</p>
                            <p style={{ fontSize: '12px' }}>Create one to send a message to the future!</p>
                        </div>
                    ) : (
                        capsules.pending?.map(capsule => (
                            <div key={capsule.id} className="capsule-card pending">
                                <div className="capsule-header">
                                    <div className="capsule-icon">⏳</div>
                                    <div className="capsule-date">
                                        <div className="label">Opens on</div>
                                        <div className="value">{formatDate(capsule.deliver_at)}</div>
                                    </div>
                                </div>

                                <div className="capsule-content hidden">
                                    🔒 Content hidden until delivery
                                </div>

                                <div className="capsule-countdown">
                                    <div className="time-left">{getTimeLeft(capsule.deliver_at)}</div>
                                    <div className="label">remaining</div>
                                </div>

                                <div className="capsule-meta">
                                    <span>Created: {formatDate(capsule.created_at)}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === 'delivered' && (
                <div className="capsules-list">
                    {capsules.delivered?.length === 0 ? (
                        <div className="empty-state">
                            <div className="emoji">📬</div>
                            <p>No delivered capsules yet</p>
                            <p style={{ fontSize: '12px' }}>Your time capsules will appear here when they're opened</p>
                        </div>
                    ) : (
                        capsules.delivered?.map(capsule => (
                            <div key={capsule.id} className="capsule-card">
                                <div className="capsule-header">
                                    <div className="capsule-icon">🔮</div>
                                    <div className="capsule-date">
                                        <div className="label">Delivered on</div>
                                        <div className="value">{formatDate(capsule.delivered_at)}</div>
                                    </div>
                                </div>

                                <div className="capsule-content">
                                    {capsule.content}
                                </div>

                                {capsule.media_url && (
                                    <img
                                        src={capsule.media_url}
                                        alt="Capsule media"
                                        style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '15px' }}
                                    />
                                )}

                                <div className="capsule-meta">
                                    <span>Created: {formatDate(capsule.created_at)}</span>
                                    <span>{capsule.is_private ? '🔒 Private' : '🌐 Public'}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default TimeCapsulePanel;

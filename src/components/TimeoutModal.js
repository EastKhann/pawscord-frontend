import React, { useState } from 'react';
import toast from '../utils/toast';
import './TimeoutModal.css';

/**
 * Timeout/Mute User Modal
 */
const TimeoutModal = ({ user, serverId, onClose, onTimeout }) => {
    const [duration, setDuration] = useState(60); // minutes
    const [reason, setReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const durationPresets = [
        { label: '1 minute', value: 1 },
        { label: '5 minutes', value: 5 },
        { label: '10 minutes', value: 10 },
        { label: '1 hour', value: 60 },
        { label: '1 day', value: 1440 },
        { label: '1 week', value: 10080 }
    ];

    const handleSubmit = async () => {
        if (!reason.trim()) {
            toast.error('❌ Please provide a reason');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/moderation/timeout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    server_id: serverId,
                    user_id: user.id,
                    duration: duration,
                    reason: reason.trim()
                })
            });

            const data = await response.json();

            if (data.success) {
                onTimeout?.(data);
                onClose();
            } else {
                toast.error('❌ Timeout başarısız: ' + (data.error || 'Bilinmeyen hata'));
            }
        } catch (error) {
            console.error('Timeout error:', error);
            toast.error('❌ Timeout başarısız. Lütfen tekrar deneyin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content timeout-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>⏱️ Timeout User</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    <div className="user-info">
                        <img
                            src={user.avatar || '/default-avatar.png'}
                            alt={user.username}
                            className="user-avatar"
                        />
                        <div>
                            <h3>{user.username}</h3>
                            <p>User will be muted and unable to send messages</p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Duration</label>
                        <div className="duration-presets">
                            {durationPresets.map(preset => (
                                <button
                                    key={preset.value}
                                    className={`preset-btn ${duration === preset.value ? 'active' : ''}`}
                                    onClick={() => setDuration(preset.value)}
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                            min="1"
                            className="duration-input"
                            placeholder="Custom duration (minutes)"
                        />
                    </div>

                    <div className="form-group">
                        <label>Reason (required)</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Why are you timing out this user?"
                            rows={3}
                            className="reason-input"
                        />
                    </div>

                    <div className="timeout-info">
                        ⚠️ This action will be logged and visible to server admins
                    </div>
                </div>

                <div className="modal-footer">
                    <button
                        onClick={onClose}
                        className="btn-cancel"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="btn-timeout"
                        disabled={isSubmitting || !reason.trim()}
                    >
                        {isSubmitting ? 'Processing...' : '⏱️ Timeout User'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeoutModal;



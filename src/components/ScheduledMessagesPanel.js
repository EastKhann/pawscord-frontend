// frontend/src/components/ScheduledMessagesPanel.js
import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import './ScheduledMessagesPanel.css';

const ScheduledMessagesPanel = ({ apiBaseUrl, roomSlug, onClose }) => {
    const [scheduledMessages, setScheduledMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newMessage, setNewMessage] = useState({
        content: '',
        scheduled_time: '',
        room_slug: roomSlug || ''
    });

    useEffect(() => {
        fetchScheduledMessages();
    }, []);

    const fetchScheduledMessages = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/scheduled/list/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setScheduledMessages(data.scheduled_messages || []);
            } else {
                toast.error('❌ Zamanlanmış mesajlar yüklenemedi');
            }
        } catch (error) {
            console.error('Fetch scheduled messages error:', error);
            toast.error('❌ Bağlantı hatası');
        } finally {
            setLoading(false);
        }
    };

    const createScheduledMessage = async () => {
        if (!newMessage.content.trim()) {
            toast.error('❌ Mesaj içeriği boş olamaz');
            return;
        }

        if (!newMessage.scheduled_time) {
            toast.error('❌ Tarih ve saat seçiniz');
            return;
        }

        if (!newMessage.room_slug) {
            toast.error('❌ Kanal seçiniz');
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/scheduled/create/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMessage)
            });

            if (response.ok) {
                const data = await response.json();
                setScheduledMessages([...scheduledMessages, data.scheduled_message]);
                setShowCreateForm(false);
                setNewMessage({ content: '', scheduled_time: '', room_slug: roomSlug || '' });
                toast.success('✅ Mesaj zamanlandı');
            } else {
                const error = await response.json();
                toast.error(`❌ ${error.error || 'İşlem başarısız'}`);
            }
        } catch (error) {
            console.error('Create scheduled message error:', error);
            toast.error('❌ Bağlantı hatası');
        }
    };

    const cancelScheduledMessage = async (schedId) => {
        if (!confirm('Bu zamanlanmış mesajı iptal etmek istediğinize emin misiniz?')) {
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/scheduled/cancel/${schedId}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setScheduledMessages(scheduledMessages.filter(msg => msg.id !== schedId));
                toast.success('✅ Zamanlanmış mesaj iptal edildi');
            } else {
                toast.error('❌ İptal başarısız');
            }
        } catch (error) {
            console.error('Cancel scheduled message error:', error);
            toast.error('❌ Bağlantı hatası');
        }
    };

    const getTimeRemaining = (scheduledTime) => {
        const now = new Date();
        const scheduled = new Date(scheduledTime);
        const diff = scheduled - now;

        if (diff < 0) {
            return 'Gönderildi';
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 24) {
            const days = Math.floor(hours / 24);
            return `${days} gün ${hours % 24} saat`;
        } else if (hours > 0) {
            return `${hours} saat ${minutes} dakika`;
        } else {
            return `${minutes} dakika`;
        }
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (scheduledTime) => {
        const now = new Date();
        const scheduled = new Date(scheduledTime);
        const diff = scheduled - now;

        if (diff < 0) return 'status-sent';
        if (diff < 3600000) return 'status-imminent'; // Less than 1 hour
        if (diff < 86400000) return 'status-soon'; // Less than 24 hours
        return 'status-scheduled';
    };

    const getMinDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 1);
        return now.toISOString().slice(0, 16);
    };

    return (
        <div className="scheduled-messages-overlay" onClick={onClose}>
            <div className="scheduled-messages-panel" onClick={e => e.stopPropagation()}>
                <div className="scheduled-messages-header">
                    <h2>⏰ Zamanlanmış Mesajlar</h2>
                    <div className="header-actions">
                        <button 
                            className="create-btn"
                            onClick={() => setShowCreateForm(!showCreateForm)}
                        >
                            {showCreateForm ? '✕ İptal' : '+ Yeni Mesaj'}
                        </button>
                        <button className="close-btn" onClick={onClose}>✕</button>
                    </div>
                </div>

                {showCreateForm && (
                    <div className="create-form">
                        <h3>📝 Yeni Zamanlanmış Mesaj</h3>
                        
                        <div className="form-group">
                            <label>Mesaj İçeriği</label>
                            <textarea
                                className="message-textarea"
                                placeholder="Mesajınızı yazın..."
                                value={newMessage.content}
                                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                                rows={4}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Kanal</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="room-slug"
                                    value={newMessage.room_slug}
                                    onChange={(e) => setNewMessage({ ...newMessage, room_slug: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Gönderim Zamanı</label>
                                <input
                                    type="datetime-local"
                                    className="form-input"
                                    value={newMessage.scheduled_time}
                                    min={getMinDateTime()}
                                    onChange={(e) => setNewMessage({ ...newMessage, scheduled_time: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button 
                                className="cancel-form-btn"
                                onClick={() => {
                                    setShowCreateForm(false);
                                    setNewMessage({ content: '', scheduled_time: '', room_slug: roomSlug || '' });
                                }}
                            >
                                İptal
                            </button>
                            <button 
                                className="submit-btn"
                                onClick={createScheduledMessage}
                            >
                                ⏰ Zamanla
                            </button>
                        </div>
                    </div>
                )}

                <div className="scheduled-messages-content">
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Yükleniyor...</p>
                        </div>
                    ) : scheduledMessages.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">⏰</div>
                            <h3>Zamanlanmış mesaj yok</h3>
                            <p>Gelecekte gönderilmek üzere mesaj zamanlamadınız</p>
                            <button 
                                className="create-first-btn"
                                onClick={() => setShowCreateForm(true)}
                            >
                                + İlk Mesajı Zamanla
                            </button>
                        </div>
                    ) : (
                        <div className="messages-list">
                            {scheduledMessages.map(msg => (
                                <div key={msg.id} className={`scheduled-message-card ${getStatusColor(msg.scheduled_time)}`}>
                                    <div className="message-header">
                                        <div className="message-info">
                                            <span className="room-badge"># {msg.room_slug}</span>
                                            <span className="time-badge">{formatDateTime(msg.scheduled_time)}</span>
                                        </div>
                                        <button 
                                            className="cancel-btn"
                                            onClick={() => cancelScheduledMessage(msg.id)}
                                            title="İptal Et"
                                        >
                                            🗑️
                                        </button>
                                    </div>

                                    <div className="message-content">
                                        {msg.content}
                                    </div>

                                    <div className="message-footer">
                                        <div className="countdown">
                                            <span className="countdown-icon">⏳</span>
                                            <span className="countdown-text">{getTimeRemaining(msg.scheduled_time)}</span>
                                        </div>
                                        {msg.sent && (
                                            <div className="sent-badge">✅ Gönderildi</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScheduledMessagesPanel;

import React, { useState, useEffect } from 'react';
import {
    FaThumbtack, FaTimes, FaBell, FaClock, FaPlus, FaTrash, FaEdit,
    FaCalendarAlt, FaHashtag, FaSearch, FaCheckCircle, FaEye,
    FaExclamationCircle, FaHistory, FaToggleOn, FaToggleOff
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './PinRemindersPanel.css';

const PinRemindersPanel = ({ serverId, onClose }) => {
    const [activeTab, setActiveTab] = useState('active');
    const [reminders, setReminders] = useState([]);
    const [pinnedMessages, setPinnedMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchReminders();
        fetchPinnedMessages();
    }, [serverId]);

    const fetchReminders = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/servers/${serverId}/pin-reminders/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setReminders(data.reminders || []);
            } else {
                setReminders([]);
            }
        } catch (error) {
            console.error('Error fetching pin reminders:', error);
            setReminders([]);
        }
        setLoading(false);
    };

    const fetchPinnedMessages = async () => {
        try {
            const response = await fetch(`/api/servers/${serverId}/pinned-messages/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setPinnedMessages(data.messages || []);
            }
        } catch (error) {
            console.error('Error fetching pinned messages:', error);
        }
    };

    const handleCreateReminder = async (reminderData) => {
        try {
            const response = await fetch(`/api/servers/${serverId}/pin-reminders/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reminderData)
            });

            if (response.ok) {
                toast.success('Pin hatırlatıcı oluşturuldu');
                fetchReminders();
                setShowCreateModal(false);
            }
        } catch (error) {
            toast.error('Hatırlatıcı oluşturulamadı');
        }
    };

    const handleDeleteReminder = async (reminderId) => {
        if (!window.confirm('Bu hatırlatıcıyı silmek istediğinize emin misiniz?')) return;

        try {
            const response = await fetch(`/api/servers/${serverId}/pin-reminders/${reminderId}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('Hatırlatıcı silindi');
                fetchReminders();
            }
        } catch (error) {
            toast.error('Hatırlatıcı silinemedi');
        }
    };

    const handleToggleReminder = async (reminderId, isActive) => {
        try {
            const response = await fetch(`/api/servers/${serverId}/pin-reminders/${reminderId}/toggle/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ is_active: !isActive })
            });

            if (response.ok) {
                toast.success(isActive ? 'Hatırlatıcı devre dışı' : 'Hatırlatıcı aktif');
                fetchReminders();
            }
        } catch (error) {
            toast.error('İşlem başarısız');
        }
    };

    const filteredReminders = reminders.filter(reminder => {
        const matchesSearch = reminder.pin_content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reminder.channel?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = activeTab === 'all' ||
            (activeTab === 'active' && reminder.is_active) ||
            (activeTab === 'inactive' && !reminder.is_active);
        return matchesSearch && matchesTab;
    });

    const getIntervalLabel = (interval) => {
        switch (interval) {
            case 'once': return 'Tek Sefer';
            case 'daily': return 'Günlük';
            case 'weekly': return 'Haftalık';
            case 'monthly': return 'Aylık';
            default: return interval;
        }
    };

    return (
        <div className="pin-reminders-overlay" onClick={(e) => e.target.className === 'pin-reminders-overlay' && onClose()}>
            <div className="pin-reminders-panel">
                <div className="panel-header">
                    <h2><FaThumbtack /> Pin Hatırlatıcıları</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <div className="tabs-bar">
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === 'active' ? 'active' : ''}`}
                            onClick={() => setActiveTab('active')}
                        >
                            <FaBell /> Aktif
                        </button>
                        <button
                            className={`tab ${activeTab === 'inactive' ? 'active' : ''}`}
                            onClick={() => setActiveTab('inactive')}
                        >
                            <FaClock /> Pasif
                        </button>
                        <button
                            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveTab('all')}
                        >
                            <FaHistory /> Tümü
                        </button>
                    </div>
                    <button className="create-btn" onClick={() => setShowCreateModal(true)}>
                        <FaPlus /> Yeni Hatırlatıcı
                    </button>
                </div>

                <div className="toolbar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Hatırlatıcı ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : filteredReminders.length === 0 ? (
                        <div className="empty-state">
                            <FaThumbtack />
                            <p>Hatırlatıcı bulunamadı</p>
                            <span className="hint">Pin mesajları için hatırlatıcı oluşturun</span>
                        </div>
                    ) : (
                        <div className="reminders-list">
                            {filteredReminders.map(reminder => (
                                <div key={reminder.id} className={`reminder-card ${!reminder.is_active ? 'inactive' : ''}`}>
                                    <div className="reminder-content">
                                        <div className="pin-preview">
                                            <FaThumbtack />
                                            <p>{reminder.pin_content}</p>
                                        </div>
                                        <div className="reminder-meta">
                                            <span className="channel">
                                                <FaHashtag /> {reminder.channel?.name}
                                            </span>
                                            <span className="interval">
                                                <FaClock /> {getIntervalLabel(reminder.interval)}
                                            </span>
                                            {reminder.remind_at && (
                                                <span className="next-trigger">
                                                    <FaCalendarAlt /> {new Date(reminder.remind_at).toLocaleString('tr-TR')}
                                                </span>
                                            )}
                                        </div>
                                        {reminder.last_triggered && (
                                            <div className="last-triggered">
                                                <FaCheckCircle /> Son tetikleme: {new Date(reminder.last_triggered).toLocaleString('tr-TR')}
                                            </div>
                                        )}
                                    </div>

                                    <div className="reminder-actions">
                                        <button
                                            className={`toggle-btn ${reminder.is_active ? 'active' : ''}`}
                                            onClick={() => handleToggleReminder(reminder.id, reminder.is_active)}
                                            title={reminder.is_active ? 'Devre dışı bırak' : 'Etkinleştir'}
                                        >
                                            {reminder.is_active ? <FaToggleOn /> : <FaToggleOff />}
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteReminder(reminder.id)}
                                            title="Sil"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {showCreateModal && (
                    <CreateReminderModal
                        pinnedMessages={pinnedMessages}
                        serverId={serverId}
                        token={token}
                        onClose={() => setShowCreateModal(false)}
                        onCreate={handleCreateReminder}
                    />
                )}
            </div>
        </div>
    );
};

const CreateReminderModal = ({ pinnedMessages, serverId, token, onClose, onCreate }) => {
    const [selectedPin, setSelectedPin] = useState('');
    const [interval, setInterval] = useState('once');
    const [remindAt, setRemindAt] = useState('');
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState('');
    const [customMessage, setCustomMessage] = useState('');

    useEffect(() => {
        fetchChannels();
    }, []);

    const fetchChannels = async () => {
        try {
            const response = await fetch(`/api/servers/${serverId}/channels/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setChannels(data.channels || []);
            }
        } catch (error) {
            console.error('Error fetching channels:', error);
        }
    };

    const handleSubmit = () => {
        if (!selectedPin && !customMessage) {
            toast.warning('Pin seçin veya özel mesaj girin');
            return;
        }

        if (interval === 'once' && !remindAt) {
            toast.warning('Hatırlatma zamanı belirtin');
            return;
        }

        onCreate({
            pin_id: selectedPin || null,
            custom_message: customMessage,
            channel_id: selectedChannel,
            interval,
            remind_at: interval === 'once' ? remindAt : null
        });
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
            <div className="create-reminder-modal">
                <h3><FaPlus /> Yeni Pin Hatırlatıcısı</h3>

                <div className="form-group">
                    <label><FaHashtag /> Kanal</label>
                    <select value={selectedChannel} onChange={(e) => setSelectedChannel(e.target.value)}>
                        <option value="">Kanal seçin...</option>
                        {channels.map(ch => (
                            <option key={ch.id} value={ch.id}>#{ch.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label><FaThumbtack /> Pinli Mesaj (Opsiyonel)</label>
                    <select value={selectedPin} onChange={(e) => setSelectedPin(e.target.value)}>
                        <option value="">Pinli mesaj seçin...</option>
                        {pinnedMessages.map(pin => (
                            <option key={pin.id} value={pin.id}>
                                {pin.content?.substring(0, 50)}...
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Veya Özel Mesaj</label>
                    <textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder="Hatırlatılacak mesajı yazın..."
                        rows={3}
                    />
                </div>

                <div className="form-group">
                    <label><FaClock /> Tekrar Aralığı</label>
                    <select value={interval} onChange={(e) => setInterval(e.target.value)}>
                        <option value="once">Tek Sefer</option>
                        <option value="daily">Günlük</option>
                        <option value="weekly">Haftalık</option>
                        <option value="monthly">Aylık</option>
                    </select>
                </div>

                {interval === 'once' && (
                    <div className="form-group">
                        <label><FaCalendarAlt /> Hatırlatma Zamanı</label>
                        <input
                            type="datetime-local"
                            value={remindAt}
                            onChange={(e) => setRemindAt(e.target.value)}
                        />
                    </div>
                )}

                <div className="info-box">
                    <FaExclamationCircle />
                    <p>
                        {interval === 'once'
                            ? 'Belirtilen tarihte bir kez hatırlatma gönderilecek.'
                            : `Her ${interval === 'daily' ? 'gün' : interval === 'weekly' ? 'hafta' : 'ay'} otomatik hatırlatma gönderilecek.`}
                    </p>
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button className="create-submit-btn" onClick={handleSubmit}>
                        <FaPlus /> Oluştur
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PinRemindersPanel;

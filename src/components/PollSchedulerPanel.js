// frontend/src/components/PollSchedulerPanel.js - Schedule Polls for Later
import React, { useState, useEffect } from 'react';
import {
    FaPoll, FaTimes, FaPlus, FaClock, FaCalendar, FaTrash,
    FaEdit, FaCheck, FaHashtag, FaPlay, FaStop, FaCog,
    FaUsers, FaChartBar, FaHistory, FaSync
} from 'react-icons/fa';
import toast from '../utils/toast';
import './PollSchedulerPanel.css';

const PollSchedulerPanel = ({ serverId, apiBaseUrl, onClose }) => {
    const [activeView, setActiveView] = useState('scheduled'); // 'scheduled', 'create', 'history'
    const [scheduledPolls, setScheduledPolls] = useState([]);
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form state
    const [formData, setFormData] = useState({
        question: '',
        options: ['', ''],
        channel_id: '',
        scheduled_at: '',
        duration_minutes: 60,
        allow_multiple: false,
        anonymous: false,
        show_results_during: true,
        notify_on_end: true,
        repeat: 'none', // 'none', 'daily', 'weekly'
        description: ''
    });

    useEffect(() => {
        fetchScheduledPolls();
        fetchChannels();
    }, [serverId]);

    const fetchScheduledPolls = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/polls/${serverId}/scheduled/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setScheduledPolls(data.polls || []);
            }
        } catch (error) {
            console.error('Fetch scheduled polls error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChannels = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setChannels(data.channels?.filter(c => c.type === 'text') || []);
            }
        } catch (error) {
            console.error('Fetch channels error:', error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        const validOptions = formData.options.filter(opt => opt.trim());
        if (validOptions.length < 2) {
            toast.error('En az 2 seçenek gerekli');
            return;
        }

        if (!formData.question.trim()) {
            toast.error('Soru gerekli');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/polls/${serverId}/schedule/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    options: validOptions
                })
            });

            if (response.ok) {
                toast.success('✅ Anket zamanlandı');
                fetchScheduledPolls();
                setActiveView('scheduled');
                resetForm();
            } else {
                const err = await response.json();
                toast.error(err.error || 'Zamanlama başarısız');
            }
        } catch (error) {
            console.error('Create scheduled poll error:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const handleDelete = async (pollId) => {
        if (!window.confirm('Bu zamanlanmış anketi silmek istiyor musunuz?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/polls/scheduled/${pollId}/delete/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('🗑️ Anket silindi');
                setScheduledPolls(prev => prev.filter(p => p.id !== pollId));
            }
        } catch (error) {
            console.error('Delete poll error:', error);
        }
    };

    const handleStartNow = async (pollId) => {
        if (!window.confirm('Bu anketi şimdi başlatmak istiyor musunuz?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/polls/scheduled/${pollId}/start-now/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('▶️ Anket başlatıldı');
                fetchScheduledPolls();
            }
        } catch (error) {
            console.error('Start poll error:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            question: '',
            options: ['', ''],
            channel_id: '',
            scheduled_at: '',
            duration_minutes: 60,
            allow_multiple: false,
            anonymous: false,
            show_results_during: true,
            notify_on_end: true,
            repeat: 'none',
            description: ''
        });
    };

    const addOption = () => {
        if (formData.options.length < 10) {
            setFormData(prev => ({ ...prev, options: [...prev.options, ''] }));
        }
    };

    const removeOption = (index) => {
        if (formData.options.length > 2) {
            setFormData(prev => ({
                ...prev,
                options: prev.options.filter((_, i) => i !== index)
            }));
        }
    };

    const updateOption = (index, value) => {
        setFormData(prev => ({
            ...prev,
            options: prev.options.map((opt, i) => i === index ? value : opt)
        }));
    };

    const pendingPolls = scheduledPolls.filter(p => p.status === 'pending');
    const historyPolls = scheduledPolls.filter(p => p.status !== 'pending');

    return (
        <div className="poll-scheduler-overlay" onClick={onClose}>
            <div className="poll-scheduler-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaPoll /> Anket Zamanlayıcı</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="panel-tabs">
                    <button
                        className={`tab ${activeView === 'scheduled' ? 'active' : ''}`}
                        onClick={() => setActiveView('scheduled')}
                    >
                        <FaClock /> Zamanlanmış
                        {pendingPolls.length > 0 && <span className="badge">{pendingPolls.length}</span>}
                    </button>
                    <button
                        className={`tab ${activeView === 'create' ? 'active' : ''}`}
                        onClick={() => setActiveView('create')}
                    >
                        <FaPlus /> Yeni Anket
                    </button>
                    <button
                        className={`tab ${activeView === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveView('history')}
                    >
                        <FaHistory /> Geçmiş
                    </button>
                </div>

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : activeView === 'scheduled' ? (
                        <ScheduledPollsList
                            polls={pendingPolls}
                            onDelete={handleDelete}
                            onStartNow={handleStartNow}
                        />
                    ) : activeView === 'history' ? (
                        <PollHistory polls={historyPolls} />
                    ) : (
                        <CreatePollForm
                            formData={formData}
                            setFormData={setFormData}
                            channels={channels}
                            onSubmit={handleCreate}
                            addOption={addOption}
                            removeOption={removeOption}
                            updateOption={updateOption}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

// Scheduled Polls List
const ScheduledPollsList = ({ polls, onDelete, onStartNow }) => {
    if (polls.length === 0) {
        return (
            <div className="no-polls">
                <FaPoll className="empty-icon" />
                <p>Zamanlanmış anket bulunmuyor</p>
            </div>
        );
    }

    return (
        <div className="polls-list">
            {polls.map(poll => (
                <div key={poll.id} className="poll-card">
                    <div className="poll-header">
                        <h4 className="poll-question">{poll.question}</h4>
                        <span className="poll-channel">
                            <FaHashtag /> {poll.channel_name}
                        </span>
                    </div>

                    <div className="poll-options-preview">
                        {poll.options.slice(0, 3).map((opt, idx) => (
                            <span key={idx} className="option-preview">{opt}</span>
                        ))}
                        {poll.options.length > 3 && (
                            <span className="more-options">+{poll.options.length - 3} daha</span>
                        )}
                    </div>

                    <div className="poll-meta">
                        <span className="scheduled-time">
                            <FaCalendar /> {new Date(poll.scheduled_at).toLocaleString('tr-TR')}
                        </span>
                        <span className="duration">
                            <FaClock /> {poll.duration_minutes} dk
                        </span>
                        {poll.repeat !== 'none' && (
                            <span className="repeat-badge">
                                <FaSync /> {poll.repeat === 'daily' ? 'Günlük' : 'Haftalık'}
                            </span>
                        )}
                    </div>

                    <div className="poll-actions">
                        <button
                            className="start-btn"
                            onClick={() => onStartNow(poll.id)}
                        >
                            <FaPlay /> Şimdi Başlat
                        </button>
                        <button
                            className="delete-btn"
                            onClick={() => onDelete(poll.id)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Poll History
const PollHistory = ({ polls }) => {
    if (polls.length === 0) {
        return (
            <div className="no-polls">
                <FaHistory className="empty-icon" />
                <p>Anket geçmişi bulunmuyor</p>
            </div>
        );
    }

    return (
        <div className="polls-list history">
            {polls.map(poll => (
                <div key={poll.id} className={`poll-card ${poll.status}`}>
                    <div className="poll-header">
                        <h4 className="poll-question">{poll.question}</h4>
                        <span className={`status-badge ${poll.status}`}>
                            {poll.status === 'completed' && 'Tamamlandı'}
                            {poll.status === 'cancelled' && 'İptal Edildi'}
                            {poll.status === 'failed' && 'Başarısız'}
                        </span>
                    </div>

                    {poll.status === 'completed' && poll.results && (
                        <div className="poll-results">
                            <div className="result-summary">
                                <span><FaUsers /> {poll.total_votes} oy</span>
                                <span className="winner">
                                    🏆 {poll.winner}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="poll-meta">
                        <span>
                            <FaCalendar /> {new Date(poll.executed_at).toLocaleString('tr-TR')}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Create Poll Form
const CreatePollForm = ({ formData, setFormData, channels, onSubmit, addOption, removeOption, updateOption }) => {
    const minDateTime = new Date().toISOString().slice(0, 16);

    return (
        <form className="poll-form" onSubmit={onSubmit}>
            <div className="form-group">
                <label><FaPoll /> Soru *</label>
                <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                    placeholder="Anket sorusu..."
                    required
                />
            </div>

            <div className="form-group">
                <label>Açıklama (isteğe bağlı)</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Anket hakkında ek bilgi..."
                    rows="2"
                />
            </div>

            <div className="form-group">
                <label>Seçenekler *</label>
                <div className="options-list">
                    {formData.options.map((opt, idx) => (
                        <div key={idx} className="option-input">
                            <span className="option-num">{idx + 1}</span>
                            <input
                                type="text"
                                value={opt}
                                onChange={(e) => updateOption(idx, e.target.value)}
                                placeholder={`Seçenek ${idx + 1}`}
                            />
                            {formData.options.length > 2 && (
                                <button
                                    type="button"
                                    className="remove-option"
                                    onClick={() => removeOption(idx)}
                                >
                                    <FaTimes />
                                </button>
                            )}
                        </div>
                    ))}
                    {formData.options.length < 10 && (
                        <button type="button" className="add-option" onClick={addOption}>
                            <FaPlus /> Seçenek Ekle
                        </button>
                    )}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label><FaHashtag /> Kanal *</label>
                    <select
                        value={formData.channel_id}
                        onChange={(e) => setFormData(prev => ({ ...prev, channel_id: e.target.value }))}
                        required
                    >
                        <option value="">Kanal seçin</option>
                        {channels.map(ch => (
                            <option key={ch.id} value={ch.id}>#{ch.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label><FaClock /> Süre (dakika)</label>
                    <input
                        type="number"
                        value={formData.duration_minutes}
                        onChange={(e) => setFormData(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) }))}
                        min="5"
                        max="10080"
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label><FaCalendar /> Başlangıç Zamanı *</label>
                    <input
                        type="datetime-local"
                        value={formData.scheduled_at}
                        onChange={(e) => setFormData(prev => ({ ...prev, scheduled_at: e.target.value }))}
                        min={minDateTime}
                        required
                    />
                </div>

                <div className="form-group">
                    <label><FaSync /> Tekrar</label>
                    <select
                        value={formData.repeat}
                        onChange={(e) => setFormData(prev => ({ ...prev, repeat: e.target.value }))}
                    >
                        <option value="none">Tekrar Etme</option>
                        <option value="daily">Her Gün</option>
                        <option value="weekly">Her Hafta</option>
                    </select>
                </div>
            </div>

            <div className="form-group checkboxes">
                <label>
                    <input
                        type="checkbox"
                        checked={formData.allow_multiple}
                        onChange={(e) => setFormData(prev => ({ ...prev, allow_multiple: e.target.checked }))}
                    />
                    Çoklu seçime izin ver
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={formData.anonymous}
                        onChange={(e) => setFormData(prev => ({ ...prev, anonymous: e.target.checked }))}
                    />
                    Anonim oylama
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={formData.show_results_during}
                        onChange={(e) => setFormData(prev => ({ ...prev, show_results_during: e.target.checked }))}
                    />
                    Oylama sırasında sonuçları göster
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={formData.notify_on_end}
                        onChange={(e) => setFormData(prev => ({ ...prev, notify_on_end: e.target.checked }))}
                    />
                    Bittiğinde bildirim gönder
                </label>
            </div>

            <button type="submit" className="submit-btn">
                <FaCalendar /> Anketi Zamanla
            </button>
        </form>
    );
};

export default PollSchedulerPanel;

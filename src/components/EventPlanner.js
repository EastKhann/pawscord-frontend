// 📅 EVENT PLANNER - Etkinlik Oluşturma, Takvim, RSVP
// Discord Events benzeri

import React, { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../utils/apiEndpoints';
import './EventPlanner.css';

// Event Types
const EVENT_TYPES = [
    { id: 'voice', icon: '🔊', label: 'Sesli Kanal' },
    { id: 'stage', icon: '🎙️', label: 'Sahne' },
    { id: 'external', icon: '🌐', label: 'Harici' },
    { id: 'somewhere_else', icon: '📍', label: 'Başka Bir Yer' }
];

// Event Card Component
const EventCard = ({ event, onRSVP, onView }) => {
    const isUpcoming = new Date(event.start_time) > new Date();
    const isLive = event.status === 'active';

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('tr-TR', options);
    };

    return (
        <div className={`event-card ${isLive ? 'live' : ''}`} onClick={() => onView(event)}>
            {event.cover && (
                <div className="event-cover" style={{ backgroundImage: `url(${event.cover})` }} />
            )}
            <div className="event-content">
                <div className="event-time">
                    {isLive ? (
                        <span className="live-badge">🔴 CANLI</span>
                    ) : (
                        <span className="date">{formatDate(event.start_time)}</span>
                    )}
                </div>
                <h3 className="event-name">{event.name}</h3>
                <p className="event-description">{event.description}</p>
                <div className="event-meta">
                    <span className="event-location">
                        {EVENT_TYPES.find(t => t.id === event.location_type)?.icon}
                        {event.location_name || event.location_type}
                    </span>
                    <span className="event-creator">
                        Oluşturan: {event.creator}
                    </span>
                </div>
                <div className="event-footer">
                    <span className="interested-count">
                        👥 {event.interested_count || 0} ilgileniyor
                    </span>
                    <button
                        className={`rsvp-btn ${event.user_interested ? 'interested' : ''}`}
                        onClick={(e) => { e.stopPropagation(); onRSVP(event); }}
                    >
                        {event.user_interested ? '✓ İlgileniyorum' : '+ İlgileniyorum'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Create Event Modal
const CreateEventModal = ({ serverId, voiceChannels, onClose, onCreate }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location_type: 'voice',
        voice_channel: null,
        external_url: '',
        start_time: '',
        end_time: '',
        cover: null,
        recurring: null
    });
    const [creating, setCreating] = useState(false);

    const API_URL = API_BASE_URL;

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCreate = async () => {
        if (!formData.name || !formData.start_time) {
            alert('Etkinlik adı ve başlangıç zamanı gerekli');
            return;
        }

        setCreating(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/events/servers/${serverId}/events/create/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                onCreate?.(data);
                onClose();
            } else {
                const error = await response.json();
                alert(error.error || 'Etkinlik oluşturulamadı');
            }
        } catch (e) {
            console.error('Create event failed:', e);
        }
        setCreating(false);
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="create-event-modal">
                <div className="modal-header">
                    <h2>📅 Etkinlik Oluştur</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="modal-content">
                    {/* Step 1: Location Type */}
                    {step === 1 && (
                        <div className="step-content">
                            <h3>Etkinlik nerede olacak?</h3>
                            <div className="location-options">
                                {EVENT_TYPES.map((type) => (
                                    <div
                                        key={type.id}
                                        className={`location-option ${formData.location_type === type.id ? 'selected' : ''}`}
                                        onClick={() => handleChange('location_type', type.id)}
                                    >
                                        <span className="option-icon">{type.icon}</span>
                                        <span className="option-label">{type.label}</span>
                                    </div>
                                ))}
                            </div>

                            {formData.location_type === 'voice' && voiceChannels && (
                                <div className="channel-select">
                                    <label>Sesli Kanal Seç</label>
                                    <select
                                        value={formData.voice_channel || ''}
                                        onChange={(e) => handleChange('voice_channel', e.target.value)}
                                    >
                                        <option value="">Kanal seç...</option>
                                        {voiceChannels.map((ch) => (
                                            <option key={ch.id} value={ch.id}>
                                                🔊 {ch.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {formData.location_type === 'external' && (
                                <div className="url-input">
                                    <label>Etkinlik URL</label>
                                    <input
                                        type="url"
                                        placeholder="https://..."
                                        value={formData.external_url}
                                        onChange={(e) => handleChange('external_url', e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 2: Event Details */}
                    {step === 2 && (
                        <div className="step-content">
                            <h3>Etkinlik Detayları</h3>

                            <div className="form-group">
                                <label>Etkinlik Adı *</label>
                                <input
                                    type="text"
                                    placeholder="Oyun Gecesi, Film İzleme..."
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    maxLength={100}
                                />
                            </div>

                            <div className="form-group">
                                <label>Açıklama</label>
                                <textarea
                                    placeholder="Etkinlik hakkında bilgi..."
                                    value={formData.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    rows={4}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Başlangıç Zamanı *</label>
                                    <input
                                        type="datetime-local"
                                        value={formData.start_time}
                                        onChange={(e) => handleChange('start_time', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Bitiş Zamanı</label>
                                    <input
                                        type="datetime-local"
                                        value={formData.end_time}
                                        onChange={(e) => handleChange('end_time', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Kapak Resmi URL (opsiyonel)</label>
                                <input
                                    type="url"
                                    placeholder="https://..."
                                    value={formData.cover || ''}
                                    onChange={(e) => handleChange('cover', e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    {step > 1 && (
                        <button className="back-btn" onClick={() => setStep(s => s - 1)}>
                            ← Geri
                        </button>
                    )}
                    <div className="step-indicator">
                        {[1, 2].map((s) => (
                            <span key={s} className={`dot ${step >= s ? 'active' : ''}`} />
                        ))}
                    </div>
                    {step < 2 ? (
                        <button className="next-btn" onClick={() => setStep(s => s + 1)}>
                            İleri →
                        </button>
                    ) : (
                        <button
                            className="create-btn"
                            onClick={handleCreate}
                            disabled={creating}
                        >
                            {creating ? 'Oluşturuluyor...' : 'Etkinlik Oluştur'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// Calendar View Component
const CalendarView = ({ events, onEventClick }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        return { daysInMonth, startingDay };
    };

    const getEventsForDay = (day) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return events.filter(event => {
            const eventDate = new Date(event.start_time);
            return eventDate.getFullYear() === year &&
                eventDate.getMonth() === month &&
                eventDate.getDate() === day;
        });
    };

    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < startingDay; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEvents = getEventsForDay(day);
        const isToday = new Date().getDate() === day &&
            new Date().getMonth() === currentMonth.getMonth() &&
            new Date().getFullYear() === currentMonth.getFullYear();

        days.push(
            <div key={day} className={`calendar-day ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}>
                <span className="day-number">{day}</span>
                {dayEvents.length > 0 && (
                    <div className="day-events">
                        {dayEvents.slice(0, 2).map((event) => (
                            <div
                                key={event.id}
                                className="mini-event"
                                onClick={() => onEventClick(event)}
                            >
                                {event.name}
                            </div>
                        ))}
                        {dayEvents.length > 2 && (
                            <span className="more-events">+{dayEvents.length - 2}</span>
                        )}
                    </div>
                )}
            </div>
        );
    }

    const monthNames = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];

    return (
        <div className="calendar-view">
            <div className="calendar-header">
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
                    ←
                </button>
                <h3>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
                    →
                </button>
            </div>
            <div className="calendar-weekdays">
                {['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'].map((day) => (
                    <div key={day} className="weekday">{day}</div>
                ))}
            </div>
            <div className="calendar-grid">
                {days}
            </div>
        </div>
    );
};

// Main Event Planner Component
const EventPlanner = ({ serverId, serverName, voiceChannels, onClose }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [view, setView] = useState('list'); // list, calendar
    const [filter, setFilter] = useState('upcoming'); // upcoming, past, all
    const [selectedEvent, setSelectedEvent] = useState(null);

    const API_URL = API_BASE_URL;

    const loadEvents = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/events/servers/${serverId}/events/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setEvents(data.events || []);
            }
        } catch (e) {
            console.error('Failed to load events:', e);
        }
        setLoading(false);
    }, [API_URL, serverId]);

    const handleRSVP = async (event) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/events/${event.id}/rsvp/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                loadEvents();
            }
        } catch (e) {
            console.error('RSVP failed:', e);
        }
    };

    useEffect(() => {
        loadEvents();
    }, [loadEvents]);

    const filteredEvents = events.filter(event => {
        const now = new Date();
        const eventDate = new Date(event.start_time);

        if (filter === 'upcoming') return eventDate >= now;
        if (filter === 'past') return eventDate < now;
        return true;
    });

    if (loading) {
        return (
            <div className="event-planner">
                <div className="loading-container">
                    <div className="loading-spinner" />
                    <p>Etkinlikler yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="event-planner">
            {/* Header */}
            <div className="planner-header">
                <div className="header-left">
                    <h1>📅 {serverName} Etkinlikleri</h1>
                    <p>{events.length} etkinlik</p>
                </div>
                <div className="header-right">
                    <button className="create-event-btn" onClick={() => setShowCreate(true)}>
                        + Etkinlik Oluştur
                    </button>
                    {onClose && <button className="close-btn" onClick={onClose}>×</button>}
                </div>
            </div>

            {/* Toolbar */}
            <div className="planner-toolbar">
                <div className="view-toggle">
                    <button
                        className={view === 'list' ? 'active' : ''}
                        onClick={() => setView('list')}
                    >
                        📋 Liste
                    </button>
                    <button
                        className={view === 'calendar' ? 'active' : ''}
                        onClick={() => setView('calendar')}
                    >
                        📅 Takvim
                    </button>
                </div>

                <div className="filter-group">
                    <button
                        className={filter === 'upcoming' ? 'active' : ''}
                        onClick={() => setFilter('upcoming')}
                    >
                        Yaklaşan
                    </button>
                    <button
                        className={filter === 'past' ? 'active' : ''}
                        onClick={() => setFilter('past')}
                    >
                        Geçmiş
                    </button>
                    <button
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilter('all')}
                    >
                        Tümü
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="planner-content">
                {view === 'list' ? (
                    <div className="events-list">
                        {filteredEvents.length === 0 ? (
                            <div className="no-events">
                                <span className="no-events-icon">📅</span>
                                <h3>Etkinlik Yok</h3>
                                <p>Bu sunucuda henüz etkinlik planlanmamış</p>
                                <button onClick={() => setShowCreate(true)}>
                                    İlk Etkinliği Oluştur
                                </button>
                            </div>
                        ) : (
                            filteredEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onRSVP={handleRSVP}
                                    onView={setSelectedEvent}
                                />
                            ))
                        )}
                    </div>
                ) : (
                    <CalendarView
                        events={events}
                        onEventClick={setSelectedEvent}
                    />
                )}
            </div>

            {/* Create Event Modal */}
            {showCreate && (
                <CreateEventModal
                    serverId={serverId}
                    voiceChannels={voiceChannels}
                    onClose={() => setShowCreate(false)}
                    onCreate={() => loadEvents()}
                />
            )}
        </div>
    );
};

export default EventPlanner;

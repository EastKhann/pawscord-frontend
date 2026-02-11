// frontend/src/components/ServerEvents/ServerEvents.js
/**
 * 📅 PAWSCORD - Server Events & Calendar Component
 * ════════════════════════════════════════════════════════════════════════════════
 * Discord-style sunucu etkinlikleri ve takvim
 * ════════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useMemo } from 'react';
import {
    FaCalendarAlt, FaPlus, FaClock, FaMapMarkerAlt, FaUsers,
    FaCheck, FaStar, FaTimes, FaChevronLeft, FaChevronRight,
    FaGamepad, FaMicrophone, FaTv, FaTrophy, FaExternalLinkAlt,
    FaComments, FaBell, FaEllipsisV, FaEdit, FaTrash
} from 'react-icons/fa';
import { API_BASE_URL } from '../../utils/constants';
import toast from '../../utils/toast';
import './ServerEvents.css';

// ════════════════════════════════════════════════════════════════════════════════
// 🎯 EVENT TYPE ICONS
// ════════════════════════════════════════════════════════════════════════════════

const EVENT_ICONS = {
    voice: <FaMicrophone />,
    stage: <FaMicrophone />,
    external: <FaExternalLinkAlt />,
    game: <FaGamepad />,
    watch: <FaTv />,
    tournament: <FaTrophy />,
    meetup: <FaUsers />,
    other: <FaCalendarAlt />,
};

const EVENT_COLORS = {
    voice: '#5e81f4',
    stage: '#9146ff',
    external: '#43b581',
    game: '#faa61a',
    watch: '#f04747',
    tournament: '#ffc107',
    meetup: '#7289da',
    other: '#99aab5',
};

// ════════════════════════════════════════════════════════════════════════════════
// 📋 EVENT CARD
// ════════════════════════════════════════════════════════════════════════════════

export const EventCard = ({ event, onRSVP, onView, compact = false }) => {
    const eventDate = new Date(event.start_time);
    const isOngoing = event.is_ongoing;
    const isPast = !event.is_upcoming && !isOngoing;

    const formatTime = (date) => {
        return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (date) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Bugün';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Yarın';
        }
        return date.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric', month: 'short' });
    };

    if (compact) {
        return (
            <div
                className={`event-card-compact ${isPast ? 'past' : ''}`}
                onClick={() => onView?.(event)}
                style={{ borderLeftColor: EVENT_COLORS[event.event_type] }}
            >
                <span className="ecc-icon">{EVENT_ICONS[event.event_type]}</span>
                <span className="ecc-name">{event.name}</span>
                <span className="ecc-time">{formatTime(eventDate)}</span>
            </div>
        );
    }

    return (
        <div className={`event-card ${isPast ? 'past' : ''} ${isOngoing ? 'ongoing' : ''}`}>
            {/* Cover Image */}
            {event.cover_image_url && (
                <div className="ec-cover">
                    <img src={event.cover_image_url} alt={event.name} />
                    {isOngoing && <span className="ec-live-badge">CANLI</span>}
                </div>
            )}

            {/* Content */}
            <div className="ec-content">
                <div className="ec-header">
                    <span
                        className="ec-type-badge"
                        style={{ backgroundColor: EVENT_COLORS[event.event_type] }}
                    >
                        {EVENT_ICONS[event.event_type]}
                        <span>{event.event_type}</span>
                    </span>
                    <span className="ec-date">{formatDate(eventDate)}</span>
                </div>

                <h3 className="ec-name" onClick={() => onView?.(event)}>{event.name}</h3>

                {event.description && (
                    <p className="ec-description">{event.description}</p>
                )}

                <div className="ec-meta">
                    <span className="ec-time">
                        <FaClock />
                        {formatTime(eventDate)}
                        {event.end_time && ` - ${formatTime(new Date(event.end_time))}`}
                    </span>

                    {event.external_location && (
                        <span className="ec-location">
                            <FaMapMarkerAlt />
                            {event.external_location.length > 30
                                ? event.external_location.substring(0, 30) + '...'
                                : event.external_location
                            }
                        </span>
                    )}
                </div>

                <div className="ec-footer">
                    <div className="ec-attendees">
                        <FaUsers />
                        <span>
                            {event.going_count} katılıyor
                            {event.interested_count > 0 && ` • ${event.interested_count} ilgileniyor`}
                        </span>
                    </div>

                    {!isPast && (
                        <div className="ec-actions">
                            <button
                                className={`rsvp-btn ${event.user_status === 'interested' ? 'active' : ''}`}
                                onClick={() => onRSVP?.(event.id, 'interested')}
                            >
                                <FaStar /> İlgileniyorum
                            </button>
                            <button
                                className={`rsvp-btn primary ${event.user_status === 'going' ? 'active' : ''}`}
                                onClick={() => onRSVP?.(event.id, 'going')}
                            >
                                <FaCheck /> Katılacağım
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ════════════════════════════════════════════════════════════════════════════════
// 📅 CALENDAR VIEW
// ════════════════════════════════════════════════════════════════════════════════

export const CalendarView = ({ serverId, events, onSelectDate, onEventClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        const day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1; // Pazartesi başlangıçlı
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const getEventsForDay = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events[dateStr] || [];
    };

    const handleDayClick = (day) => {
        const date = new Date(year, month, day);
        setSelectedDate(date);
        onSelectDate?.(date);
    };

    const today = new Date();
    const isToday = (day) => {
        return day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
    };

    // Generate calendar days
    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i);
    }

    return (
        <div className="calendar-view">
            {/* Header */}
            <div className="cv-header">
                <button onClick={prevMonth}><FaChevronLeft /></button>
                <h3>{monthNames[month]} {year}</h3>
                <button onClick={nextMonth}><FaChevronRight /></button>
            </div>

            {/* Day names */}
            <div className="cv-day-names">
                {dayNames.map(day => (
                    <span key={day}>{day}</span>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="cv-grid">
                {calendarDays.map((day, idx) => {
                    if (!day) {
                        return <div key={idx} className="cv-day empty" />;
                    }

                    const dayEvents = getEventsForDay(day);
                    const hasEvents = dayEvents.length > 0;

                    return (
                        <div
                            key={idx}
                            className={`cv-day ${isToday(day) ? 'today' : ''} ${hasEvents ? 'has-events' : ''}`}
                            onClick={() => handleDayClick(day)}
                        >
                            <span className="cv-day-number">{day}</span>
                            {hasEvents && (
                                <div className="cv-day-events">
                                    {dayEvents.slice(0, 3).map((e, i) => (
                                        <div
                                            key={i}
                                            className="cv-event-dot"
                                            style={{ backgroundColor: EVENT_COLORS[e.event_type] }}
                                            title={e.name}
                                        />
                                    ))}
                                    {dayEvents.length > 3 && (
                                        <span className="cv-more">+{dayEvents.length - 3}</span>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Selected date events */}
            {selectedDate && (
                <div className="cv-selected-events">
                    <h4>{selectedDate.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}</h4>
                    {getEventsForDay(selectedDate.getDate()).map((event, idx) => (
                        <EventCard
                            key={idx}
                            event={event}
                            compact
                            onView={onEventClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// ════════════════════════════════════════════════════════════════════════════════
// ➕ CREATE EVENT MODAL
// ════════════════════════════════════════════════════════════════════════════════

export const CreateEventModal = ({ serverId, onClose, onCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        event_type: 'other',
        start_date: '',
        start_time: '',
        end_time: '',
        external_location: '',
        max_attendees: '',
        recurrence: 'none',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.start_date || !formData.start_time) {
            toast.error('Lütfen gerekli alanları doldurun');
            return;
        }

        setIsLoading(true);
        try {
            const token = localStorage.getItem('access_token');

            const startTime = new Date(`${formData.start_date}T${formData.start_time}`).toISOString();
            const endTime = formData.end_time
                ? new Date(`${formData.start_date}T${formData.end_time}`).toISOString()
                : null;

            const response = await fetch(`${API_BASE_URL}/servers/${serverId}/events/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    start_time: startTime,
                    end_time: endTime,
                    max_attendees: formData.max_attendees ? parseInt(formData.max_attendees) : null,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Etkinlik oluşturuldu! 🎉');
                onCreated?.(data.event);
                onClose();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Etkinlik oluşturulamadı');
            }
        } catch (error) {
            console.error('Create event error:', error);
            toast.error('Bağlantı hatası');
        } finally {
            setIsLoading(false);
        }
    };

    const EVENT_TYPES = [
        { value: 'voice', label: '🎤 Sesli Etkinlik' },
        { value: 'stage', label: '🎙️ Sahne Etkinliği' },
        { value: 'game', label: '🎮 Oyun Gecesi' },
        { value: 'watch', label: '📺 İzleme Partisi' },
        { value: 'tournament', label: '🏆 Turnuva' },
        { value: 'meetup', label: '👥 Buluşma' },
        { value: 'external', label: '🌐 Harici Etkinlik' },
        { value: 'other', label: '📌 Diğer' },
    ];

    return (
        <div className="event-modal-overlay" onClick={onClose}>
            <div className="event-modal" onClick={e => e.stopPropagation()}>
                <div className="em-header">
                    <h2>📅 Etkinlik Oluştur</h2>
                    <button className="em-close" onClick={onClose}><FaTimes /></button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="em-field">
                        <label>Etkinlik Adı *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={e => handleChange('name', e.target.value)}
                            placeholder="Oyun Gecesi"
                            maxLength={100}
                            required
                        />
                    </div>

                    <div className="em-field">
                        <label>Etkinlik Türü</label>
                        <select
                            value={formData.event_type}
                            onChange={e => handleChange('event_type', e.target.value)}
                        >
                            {EVENT_TYPES.map(t => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="em-field">
                        <label>Açıklama</label>
                        <textarea
                            value={formData.description}
                            onChange={e => handleChange('description', e.target.value)}
                            placeholder="Etkinlik hakkında detaylar..."
                            rows={3}
                        />
                    </div>

                    <div className="em-row">
                        <div className="em-field">
                            <label>Tarih *</label>
                            <input
                                type="date"
                                value={formData.start_date}
                                onChange={e => handleChange('start_date', e.target.value)}
                                required
                            />
                        </div>
                        <div className="em-field">
                            <label>Başlangıç *</label>
                            <input
                                type="time"
                                value={formData.start_time}
                                onChange={e => handleChange('start_time', e.target.value)}
                                required
                            />
                        </div>
                        <div className="em-field">
                            <label>Bitiş</label>
                            <input
                                type="time"
                                value={formData.end_time}
                                onChange={e => handleChange('end_time', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="em-field">
                        <label>Konum / Link</label>
                        <input
                            type="text"
                            value={formData.external_location}
                            onChange={e => handleChange('external_location', e.target.value)}
                            placeholder="https://... veya adres"
                        />
                    </div>

                    <div className="em-row">
                        <div className="em-field">
                            <label>Maks. Katılımcı</label>
                            <input
                                type="number"
                                value={formData.max_attendees}
                                onChange={e => handleChange('max_attendees', e.target.value)}
                                placeholder="Sınırsız"
                                min={1}
                            />
                        </div>
                        <div className="em-field">
                            <label>Tekrar</label>
                            <select
                                value={formData.recurrence}
                                onChange={e => handleChange('recurrence', e.target.value)}
                            >
                                <option value="none">Tekrarlamaz</option>
                                <option value="daily">Her gün</option>
                                <option value="weekly">Her hafta</option>
                                <option value="biweekly">İki haftada bir</option>
                                <option value="monthly">Her ay</option>
                            </select>
                        </div>
                    </div>

                    <div className="em-actions">
                        <button type="button" className="em-cancel" onClick={onClose}>
                            İptal
                        </button>
                        <button type="submit" className="em-submit" disabled={isLoading}>
                            {isLoading ? 'Oluşturuluyor...' : 'Etkinlik Oluştur'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ════════════════════════════════════════════════════════════════════════════════
// 🎮 MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════════════════

const ServerEvents = ({ serverId }) => {
    const [events, setEvents] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState('list'); // 'list' | 'calendar'
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const token = localStorage.getItem('access_token');

    // Fetch events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/servers/${serverId}/events/?upcoming=true`,
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );

                if (response.ok) {
                    const data = await response.json();
                    setEvents(data.events);
                }
            } catch (error) {
                console.error('Fetch events error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [serverId, token]);

    // Fetch calendar events
    useEffect(() => {
        if (view !== 'calendar') return;

        const fetchCalendarEvents = async () => {
            try {
                const now = new Date();
                const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

                const response = await fetch(
                    `${API_BASE_URL}/servers/${serverId}/events/calendar/?month=${month}`,
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );

                if (response.ok) {
                    const data = await response.json();
                    setCalendarEvents(data.events);
                }
            } catch (error) {
                console.error('Fetch calendar error:', error);
            }
        };

        fetchCalendarEvents();
    }, [serverId, view, token]);

    const handleRSVP = async (eventId, status) => {
        try {
            const response = await fetch(`${API_BASE_URL}/events/${eventId}/rsvp/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                const data = await response.json();
                setEvents(prev => prev.map(e =>
                    e.id === eventId ? { ...e, ...data.event, user_status: status } : e
                ));
                toast.success(status === 'going' ? 'Katılıyorsun! 🎉' : 'İlgi gösterildi ⭐');
            }
        } catch (error) {
            console.error('RSVP error:', error);
            toast.error('İşlem başarısız');
        }
    };

    const handleEventCreated = (newEvent) => {
        setEvents(prev => [newEvent, ...prev].sort((a, b) =>
            new Date(a.start_time) - new Date(b.start_time)
        ));
    };

    if (isLoading) {
        return <div className="events-loading">Etkinlikler yükleniyor...</div>;
    }

    return (
        <div className="server-events">
            {/* Header */}
            <div className="se-header">
                <div className="se-title">
                    <FaCalendarAlt />
                    <h2>Etkinlikler</h2>
                </div>

                <div className="se-actions">
                    <div className="se-view-toggle">
                        <button
                            className={view === 'list' ? 'active' : ''}
                            onClick={() => setView('list')}
                        >
                            Liste
                        </button>
                        <button
                            className={view === 'calendar' ? 'active' : ''}
                            onClick={() => setView('calendar')}
                        >
                            Takvim
                        </button>
                    </div>

                    <button
                        className="se-create-btn"
                        onClick={() => setShowCreateModal(true)}
                    >
                        <FaPlus /> Etkinlik Oluştur
                    </button>
                </div>
            </div>

            {/* Content */}
            {view === 'list' ? (
                <div className="se-list">
                    {events.length > 0 ? (
                        events.map(event => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onRSVP={handleRSVP}
                                onView={setSelectedEvent}
                            />
                        ))
                    ) : (
                        <div className="se-empty">
                            <FaCalendarAlt />
                            <p>Henüz etkinlik yok</p>
                            <button onClick={() => setShowCreateModal(true)}>
                                İlk etkinliği oluştur
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <CalendarView
                    serverId={serverId}
                    events={calendarEvents}
                    onEventClick={setSelectedEvent}
                />
            )}

            {/* Create Modal */}
            {showCreateModal && (
                <CreateEventModal
                    serverId={serverId}
                    onClose={() => setShowCreateModal(false)}
                    onCreated={handleEventCreated}
                />
            )}
        </div>
    );
};

export default ServerEvents;

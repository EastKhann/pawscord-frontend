// frontend/src/components/EventsCalendar.js
import React, { useState, useEffect } from 'react';
import { FaCalendar, FaPlus, FaClock, FaMapMarkerAlt, FaUsers, FaCheck, FaTimes, FaBell, FaEdit, FaTrash } from 'react-icons/fa';
import toast from '../utils/toast';
import './EventsCalendar.css';

const EventsCalendar = ({ serverId, onClose }) => {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('month'); // month, week, day
    const [showCreateEvent, setShowCreateEvent] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        max_attendees: null,
        is_recurring: false,
        recurrence_rule: ''
    });

    useEffect(() => {
        fetchEvents();
    }, [serverId, selectedDate, view]);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const startDate = getViewStartDate();
            const endDate = getViewEndDate();
            
            const response = await fetch(`/api/events/${serverId}/?start=${startDate}&end=${endDate}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setEvents(data.events || []);
            }
        } catch (error) {
            toast.error('❌ Etkinlikler yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const createEvent = async () => {
        if (!newEvent.title.trim() || !newEvent.start_time) {
            toast.error('❌ Başlık ve başlangıç zamanı gerekli');
            return;
        }

        try {
            const response = await fetch(`/api/events/${serverId}/create/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEvent)
            });

            if (response.ok) {
                const data = await response.json();
                setEvents([...events, data.event]);
                setShowCreateEvent(false);
                resetNewEvent();
                toast.success('✅ Etkinlik oluşturuldu');
            } else {
                toast.error('❌ Etkinlik oluşturulamadı');
            }
        } catch (error) {
            toast.error('❌ Bağlantı hatası');
        }
    };

    const rsvpEvent = async (eventId, status) => {
        try {
            const response = await fetch(`/api/events/${eventId}/rsvp/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                const data = await response.json();
                setEvents(events.map(e => 
                    e.id === eventId ? {...e, user_rsvp: status, attendees_count: data.attendees_count} : e
                ));
                toast.success(status === 'going' ? '✅ Katılacaksın!' : '❌ Katılmayacaksın');
            }
        } catch (error) {
            toast.error('❌ İşlem başarısız');
        }
    };

    const deleteEvent = async (eventId) => {
        if (!confirm('Bu etkinliği silmek istediğinizden emin misiniz?')) return;

        try {
            const response = await fetch(`/api/events/${eventId}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                setEvents(events.filter(e => e.id !== eventId));
                toast.success('✅ Etkinlik silindi');
            }
        } catch (error) {
            toast.error('❌ Silme başarısız');
        }
    };

    const getViewStartDate = () => {
        const date = new Date(selectedDate);
        if (view === 'month') {
            return new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
        } else if (view === 'week') {
            const day = date.getDay();
            const diff = date.getDate() - day;
            return new Date(date.setDate(diff)).toISOString();
        }
        return date.toISOString();
    };

    const getViewEndDate = () => {
        const date = new Date(selectedDate);
        if (view === 'month') {
            return new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
        } else if (view === 'week') {
            const day = date.getDay();
            const diff = date.getDate() - day + 6;
            return new Date(date.setDate(diff)).toISOString();
        }
        return new Date(date.setDate(date.getDate() + 1)).toISOString();
    };

    const resetNewEvent = () => {
        setNewEvent({
            title: '',
            description: '',
            start_time: '',
            end_time: '',
            location: '',
            max_attendees: null,
            is_recurring: false,
            recurrence_rule: ''
        });
    };

    const formatEventTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('tr-TR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getEventColor = (event) => {
        if (event.is_past) return '#6c6d7d';
        if (event.is_today) return '#8b5cf6';
        return '#34c759';
    };

    const navigateMonth = (direction) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + direction);
        setSelectedDate(newDate);
    };

    const renderCalendarGrid = () => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const days = [];
        
        // Empty cells before first day
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }
        
        // Days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateStr = date.toISOString().split('T')[0];
            const dayEvents = events.filter(e => e.start_time.startsWith(dateStr));
            const isToday = date.toDateString() === new Date().toDateString();
            
            days.push(
                <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
                    <div className="day-number">{day}</div>
                    <div className="day-events">
                        {dayEvents.slice(0, 3).map(event => (
                            <div 
                                key={event.id} 
                                className="day-event"
                                style={{ backgroundColor: getEventColor(event) }}
                                onClick={() => {/* Open event details */}}
                            >
                                {event.title}
                            </div>
                        ))}
                        {dayEvents.length > 3 && (
                            <div className="more-events">+{dayEvents.length - 3} daha</div>
                        )}
                    </div>
                </div>
            );
        }
        
        return days;
    };

    return (
        <div className="events-calendar-overlay" onClick={onClose}>
            <div className="events-calendar-panel" onClick={(e) => e.stopPropagation()}>
                <div className="calendar-header">
                    <div className="header-controls">
                        <h2>
                            <FaCalendar /> Etkinlik Takvimi
                        </h2>
                        <div className="view-controls">
                            <button 
                                className={`view-btn ${view === 'month' ? 'active' : ''}`}
                                onClick={() => setView('month')}
                            >
                                Ay
                            </button>
                            <button 
                                className={`view-btn ${view === 'week' ? 'active' : ''}`}
                                onClick={() => setView('week')}
                            >
                                Hafta
                            </button>
                            <button 
                                className={`view-btn ${view === 'day' ? 'active' : ''}`}
                                onClick={() => setView('day')}
                            >
                                Gün
                            </button>
                        </div>
                    </div>
                    <div className="navigation-controls">
                        <button className="nav-btn" onClick={() => navigateMonth(-1)}>‹</button>
                        <span className="current-month">
                            {selectedDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                        </span>
                        <button className="nav-btn" onClick={() => navigateMonth(1)}>›</button>
                        <button className="btn-create-event" onClick={() => setShowCreateEvent(true)}>
                            <FaPlus /> Etkinlik Oluştur
                        </button>
                    </div>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Yükleniyor...</p>
                    </div>
                ) : (
                    <>
                        {view === 'month' && (
                            <div className="calendar-grid">
                                <div className="weekday-header">
                                    {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
                                        <div key={day} className="weekday">{day}</div>
                                    ))}
                                </div>
                                <div className="days-grid">
                                    {renderCalendarGrid()}
                                </div>
                            </div>
                        )}

                        {(view === 'week' || view === 'day') && (
                            <div className="events-list">
                                {events.length === 0 ? (
                                    <div className="empty-state">
                                        <FaCalendar size={48} />
                                        <h3>Etkinlik Yok</h3>
                                        <p>Bu tarihte hiç etkinlik yok</p>
                                    </div>
                                ) : (
                                    events.map(event => (
                                        <div key={event.id} className="event-card">
                                            <div className="event-time">
                                                <FaClock />
                                                <span>{formatEventTime(event.start_time)}</span>
                                            </div>
                                            <div className="event-details">
                                                <h3>{event.title}</h3>
                                                {event.description && <p>{event.description}</p>}
                                                {event.location && (
                                                    <div className="event-location">
                                                        <FaMapMarkerAlt /> {event.location}
                                                    </div>
                                                )}
                                                <div className="event-attendees">
                                                    <FaUsers /> {event.attendees_count || 0}
                                                    {event.max_attendees && ` / ${event.max_attendees}`} katılımcı
                                                </div>
                                            </div>
                                            <div className="event-actions">
                                                {event.user_rsvp !== 'going' && (
                                                    <button 
                                                        className="btn-rsvp going"
                                                        onClick={() => rsvpEvent(event.id, 'going')}
                                                    >
                                                        <FaCheck /> Katılacağım
                                                    </button>
                                                )}
                                                {event.user_rsvp !== 'not_going' && (
                                                    <button 
                                                        className="btn-rsvp not-going"
                                                        onClick={() => rsvpEvent(event.id, 'not_going')}
                                                    >
                                                        <FaTimes /> Katılmayacağım
                                                    </button>
                                                )}
                                                {event.is_creator && (
                                                    <button 
                                                        className="btn-delete"
                                                        onClick={() => deleteEvent(event.id)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </>
                )}

                {showCreateEvent && (
                    <div className="create-event-modal" onClick={() => setShowCreateEvent(false)}>
                        <div className="create-event-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Yeni Etkinlik Oluştur</h3>
                                <button onClick={() => setShowCreateEvent(false)}>×</button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Başlık *</label>
                                    <input
                                        type="text"
                                        value={newEvent.title}
                                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                        placeholder="Etkinlik başlığı..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Açıklama</label>
                                    <textarea
                                        value={newEvent.description}
                                        onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                                        placeholder="Etkinlik hakkında bilgi..."
                                        rows={4}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Başlangıç *</label>
                                        <input
                                            type="datetime-local"
                                            value={newEvent.start_time}
                                            onChange={(e) => setNewEvent({...newEvent, start_time: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Bitiş</label>
                                        <input
                                            type="datetime-local"
                                            value={newEvent.end_time}
                                            onChange={(e) => setNewEvent({...newEvent, end_time: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Konum</label>
                                    <input
                                        type="text"
                                        value={newEvent.location}
                                        onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                                        placeholder="Ses kanalı veya link..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Maksimum Katılımcı</label>
                                    <input
                                        type="number"
                                        value={newEvent.max_attendees || ''}
                                        onChange={(e) => setNewEvent({...newEvent, max_attendees: e.target.value ? parseInt(e.target.value) : null})}
                                        placeholder="Sınırsız"
                                        min="1"
                                    />
                                </div>

                                <div className="form-group checkbox-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={newEvent.is_recurring}
                                            onChange={(e) => setNewEvent({...newEvent, is_recurring: e.target.checked})}
                                        />
                                        <span>Tekrarlanan etkinlik</span>
                                    </label>
                                </div>

                                {newEvent.is_recurring && (
                                    <div className="form-group">
                                        <label>Tekrar Kuralı</label>
                                        <select
                                            value={newEvent.recurrence_rule}
                                            onChange={(e) => setNewEvent({...newEvent, recurrence_rule: e.target.value})}
                                        >
                                            <option value="">Seçiniz</option>
                                            <option value="daily">Her gün</option>
                                            <option value="weekly">Her hafta</option>
                                            <option value="monthly">Her ay</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="modal-actions">
                                <button className="btn-cancel" onClick={() => setShowCreateEvent(false)}>
                                    İptal
                                </button>
                                <button className="btn-submit" onClick={createEvent}>
                                    Oluştur
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsCalendar;

// frontend/src/components/EventCalendar.js
import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaUsers, FaClock, FaMapMarkerAlt, FaPlus } from 'react-icons/fa';

const EventCalendar = ({ serverId, apiBaseUrl, fetchWithAuth }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        if (serverId) {
            loadEvents();
        }
    }, [serverId]);

    const loadEvents = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/events/?server=${serverId}`);
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            }
        } catch (error) {
            console.error('Failed to load events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRSVP = async (eventId, status) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/events/${eventId}/rsvp/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (response.ok) {
                loadEvents(); // Reload to update counts
            }
        } catch (error) {
            console.error('RSVP failed:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = date - now;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Bugün';
        if (diffDays === 1) return 'Yarın';
        if (diffDays > 0 && diffDays < 7) return `${diffDays} gün sonra`;

        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return <div style={styles.loading}>Etkinlikler yükleniyor...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>
                    <FaCalendarAlt /> Etkinlikler
                </h2>
                <button onClick={() => setShowCreateModal(true)} style={styles.createButton}>
                    <FaPlus /> Etkinlik Oluştur
                </button>
            </div>

            {events.length === 0 ? (
                <div style={styles.empty}>
                    <FaCalendarAlt style={styles.emptyIcon} />
                    <p>Henüz etkinlik yok</p>
                    <p style={styles.emptySubtext}>İlk etkinliği sen oluştur!</p>
                </div>
            ) : (
                <div style={styles.eventsList}>
                    {events.map(event => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onRSVP={handleRSVP}
                            formatDate={formatDate}
                            formatTime={formatTime}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const EventCard = ({ event, onRSVP, formatDate, formatTime }) => {
    const [userRsvp, setUserRsvp] = useState(null);

    const handleRsvpClick = (status) => {
        setUserRsvp(status);
        onRSVP(event.id, status);
    };

    return (
        <div style={styles.eventCard}>
            <div style={styles.eventHeader}>
                <h3 style={styles.eventTitle}>{event.title}</h3>
                <span style={styles.eventDate}>{formatDate(event.start_time)}</span>
            </div>

            {event.description && (
                <p style={styles.eventDescription}>{event.description}</p>
            )}

            <div style={styles.eventDetails}>
                <div style={styles.detail}>
                    <FaClock style={styles.detailIcon} />
                    <span>{formatTime(event.start_time)} - {formatTime(event.end_time)}</span>
                </div>

                <div style={styles.detail}>
                    <FaMapMarkerAlt style={styles.detailIcon} />
                    <span>
                        {event.location_type === 'voice'
                            ? event.voice_channel_name || 'Sesli Kanal'
                            : 'Dış Link'
                        }
                    </span>
                </div>

                <div style={styles.detail}>
                    <FaUsers style={styles.detailIcon} />
                    <span>
                        {event.going_count} katılacak,
                        {event.interested_count} ilgileniyor
                    </span>
                </div>
            </div>

            <div style={styles.rsvpButtons}>
                <button
                    onClick={() => handleRsvpClick('going')}
                    style={{
                        ...styles.rsvpButton,
                        ...(userRsvp === 'going' ? styles.rsvpButtonActive : {})
                    }}
                >
                    ✓ Katılacağım
                </button>
                <button
                    onClick={() => handleRsvpClick('interested')}
                    style={{
                        ...styles.rsvpButton,
                        ...(userRsvp === 'interested' ? styles.rsvpButtonInterested : {})
                    }}
                >
                    ⭐ İlgileniyorum
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        minHeight: '400px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '1px solid #1e1f22',
        paddingBottom: '15px'
    },
    title: {
        color: '#fff',
        fontSize: '20px',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    createButton: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'background-color 0.2s'
    },
    loading: {
        color: '#b9bbbe',
        textAlign: 'center',
        padding: '40px'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#b9bbbe'
    },
    emptyIcon: {
        fontSize: '64px',
        opacity: 0.3,
        marginBottom: '20px'
    },
    emptySubtext: {
        fontSize: '14px',
        opacity: 0.7
    },
    eventsList: {
        display: 'grid',
        gap: '15px'
    },
    eventCard: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid transparent',
        transition: 'border-color 0.2s'
    },
    eventHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '10px'
    },
    eventTitle: {
        color: '#fff',
        fontSize: '18px',
        margin: 0
    },
    eventDate: {
        color: '#5865f2',
        fontSize: '14px',
        fontWeight: 'bold'
    },
    eventDescription: {
        color: '#b9bbbe',
        fontSize: '14px',
        marginBottom: '12px'
    },
    eventDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '16px'
    },
    detail: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#b9bbbe',
        fontSize: '13px'
    },
    detailIcon: {
        color: '#72767d',
        fontSize: '12px'
    },
    rsvpButtons: {
        display: 'flex',
        gap: '10px'
    },
    rsvpButton: {
        flex: 1,
        padding: '10px',
        border: '1px solid #4e5058',
        borderRadius: '6px',
        backgroundColor: 'transparent',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.2s'
    },
    rsvpButtonActive: {
        backgroundColor: '#23a559',
        borderColor: '#23a559',
        color: '#fff'
    },
    rsvpButtonInterested: {
        backgroundColor: '#f0b132',
        borderColor: '#f0b132',
        color: '#1e1f22'
    }
};

export default EventCalendar;




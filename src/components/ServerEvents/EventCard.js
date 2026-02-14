import { FaClock, FaMapMarkerAlt, FaUsers, FaCheck, FaStar } from 'react-icons/fa';
import { EVENT_ICONS, EVENT_COLORS } from './eventConstants';

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
            {event.cover_image_url && (
                <div className="ec-cover">
                    <img src={event.cover_image_url} alt={event.name} />
                    {isOngoing && <span className="ec-live-badge">CANLI</span>}
                </div>
            )}

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
                            {event.going_count} kat{'ı'}l{'ı'}yor
                            {event.interested_count > 0 && ` • ${event.interested_count} ilgileniyor`}
                        </span>
                    </div>

                    {!isPast && (
                        <div className="ec-actions">
                            <button
                                className={`rsvp-btn ${event.user_status === 'interested' ? 'active' : ''}`}
                                onClick={() => onRSVP?.(event.id, 'interested')}
                            >
                                <FaStar /> {'İ'}lgileniyorum
                            </button>
                            <button
                                className={`rsvp-btn primary ${event.user_status === 'going' ? 'active' : ''}`}
                                onClick={() => onRSVP?.(event.id, 'going')}
                            >
                                <FaCheck /> Kat{'ı'}lacağ{'ı'}m
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

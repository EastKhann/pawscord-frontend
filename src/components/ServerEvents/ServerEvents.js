// frontend/src/components/ServerEvents/ServerEvents.js
/**
 * 📅 PAWSCORD - Server Events & Calendar Component
 */

import { FaCalendarAlt, FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './ServerEvents.css';
import { useServerEvents } from './hooks/useServerEvents';
import { EventCard } from './EventCard';
import { CalendarView } from './CalendarView';
import { CreateEventModal } from './CreateEventModal';
import { useTranslation } from 'react-i18next';

const ServerEvents = ({ serverId }) => {
    const { t } = useTranslation();

    const {
        events, calendarEvents, isLoading, view, setView,
        showCreateModal, setShowCreateModal, setSelectedEvent,
        handleRSVP, handleEventCreated
    } = useServerEvents(serverId);

    if (isLoading) {
        return <div className="events-loading">{t('events_yükleniyor')}</div>;
    }

    return (
        <div aria-label="server events" className="server-events">
            {/* Header */}
            <div className="se-header">
                <div className="se-title">
                    <FaCalendarAlt />
                    <h2>{t('events')}</h2>
                </div>

                <div className="se-actions">
                    <div className="se-view-toggle">
                        <button
                            className={view === 'list' ? 'active' : ''}
                            onClick={() => setView('list')}
                            Liste
                        </button>
                        <button
                            className={view === 'calendar' ? 'active' : ''}
                            onClick={() => setView('calendar')}
                            Takvim
                        </button>
                    </div>

                    <button
                        className="se-create-btn"
                        onClick={() => setShowCreateModal(true)}>
                        <FaPlus /> Event Create
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
                            <p>{t('not_yet_etkinlik_yok')}</p>
                            <button onClick={() => setShowCreateModal(true)}>
                                İlk etkinliği oluştur
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <CalendarView
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

ServerEvents.propTypes = {
    serverId: PropTypes.string,
};
export default ServerEvents;
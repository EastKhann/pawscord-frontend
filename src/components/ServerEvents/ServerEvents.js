// frontend/src/components/ServerEvents/ServerEvents.js
/**
 * 📅 PAWSCORD - Server Events & Calendar Component
 */

import { FaCalendarAlt, FaPlus } from 'react-icons/fa';
import './ServerEvents.css';
import { useServerEvents } from './hooks/useServerEvents';
import { EventCard } from './EventCard';
import { CalendarView } from './CalendarView';
import { CreateEventModal } from './CreateEventModal';

const ServerEvents = ({ serverId }) => {
    const {
        events, calendarEvents, isLoading, view, setView,
        showCreateModal, setShowCreateModal, setSelectedEvent,
        handleRSVP, handleEventCreated
    } = useServerEvents(serverId);

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
                                {'İ'}lk etkinliği oluştur
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

export default ServerEvents;

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getToken } from '../../../utils/tokenStorage';
import { API_BASE_URL } from '../../../utils/constants';
import toast from '../../../utils/toast';
import logger from '../../../utils/logger';

export const useServerEvents = (serverId) => {
    const { t } = useTranslation();
    const [events, setEvents] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState('list');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const token = getToken();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/servers/${serverId}/events/?upcoming=true`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.ok) {
                    const data = await response.json();
                    setEvents(data.events);
                }
            } catch (error) {
                logger.error('Fetch events error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [serverId, token]);

    useEffect(() => {
        if (view !== 'calendar') return;

        const fetchCalendarEvents = async () => {
            try {
                const now = new Date();
                const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

                const response = await fetch(
                    `${API_BASE_URL}/servers/${serverId}/events/calendar/?month=${month}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.ok) {
                    const data = await response.json();
                    setCalendarEvents(data.events);
                }
            } catch (error) {
                logger.error('Fetch calendar error:', error);
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
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                const data = await response.json();
                setEvents((prev) =>
                    prev.map((e) =>
                        e.id === eventId ? { ...e, ...data.event, user_status: status } : e
                    )
                );
                toast.success(status === 'going' ? 'Joining! 🎉' : 'Interest shown ⭐');
            }
        } catch (error) {
            logger.error('RSVP error:', error);
            toast.error(t('serverEvents.operationFailed'));
        }
    };

    const handleEventCreated = (newEvent) => {
        setEvents((prev) =>
            [newEvent, ...prev].sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
        );
    };

    return {
        events,
        calendarEvents,
        isLoading,
        view,
        setView,
        showCreateModal,
        setShowCreateModal,
        selectedEvent,
        setSelectedEvent,
        handleRSVP,
        handleEventCreated,
    };
};

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../utils/constants';
import toast from '../../../utils/toast';

export const useServerEvents = (serverId) => {
    const [events, setEvents] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState('list');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const token = localStorage.getItem('access_token');

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

    return {
        events, calendarEvents, isLoading, view, setView,
        showCreateModal, setShowCreateModal, selectedEvent, setSelectedEvent,
        handleRSVP, handleEventCreated
    };
};

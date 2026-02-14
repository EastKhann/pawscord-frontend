import { useState, useEffect } from 'react';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';

const useScheduledAnnouncements = (fetchWithAuth, apiBaseUrl) => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Form state
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [channelId, setChannelId] = useState('');
    const [recurring, setRecurring] = useState(false);
    const [recurringType, setRecurringType] = useState('daily');

    const loadScheduledAnnouncements = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/announcements/scheduled/`);
            const data = await response.json();
            setAnnouncements(data.announcements || []);
        } catch (error) {
            console.error('Failed to load scheduled announcements:', error);
            toast.error('Failed to load announcements');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadScheduledAnnouncements();
    }, []);

    const resetForm = () => {
        setTitle('');
        setMessage('');
        setScheduledDate('');
        setScheduledTime('');
        setChannelId('');
        setRecurring(false);
        setRecurringType('daily');
    };

    const handleScheduleAnnouncement = async (e) => {
        e.preventDefault();
        if (!title || !message || !scheduledDate || !scheduledTime) {
            toast.error('Please fill in all required fields');
            return;
        }
        const scheduledAt = `${scheduledDate}T${scheduledTime}:00`;
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/announcements/schedule/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title, message,
                    scheduled_at: scheduledAt,
                    channel_id: channelId || null,
                    recurring,
                    recurring_type: recurring ? recurringType : null
                })
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Announcement scheduled successfully!');
                loadScheduledAnnouncements();
                resetForm();
                setShowCreateForm(false);
            } else {
                toast.error(data.error || 'Failed to schedule announcement');
            }
        } catch (error) {
            console.error('Schedule error:', error);
            toast.error('Failed to schedule announcement');
        }
    };

    const deleteAnnouncement = async (announcementId) => {
        if (!await confirmDialog('Delete this scheduled announcement?')) return;
        try {
            await fetchWithAuth(`${apiBaseUrl}/announcements/${announcementId}/delete/`, { method: 'DELETE' });
            toast.success('Announcement deleted');
            loadScheduledAnnouncements();
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete announcement');
        }
    };

    const getStatusColor = (scheduledAt) => {
        const now = new Date();
        const scheduled = new Date(scheduledAt);
        const diffHours = (scheduled - now) / (1000 * 60 * 60);
        if (diffHours < 0) return '#f04747';
        if (diffHours < 24) return '#faa61a';
        return '#43b581';
    };

    return {
        announcements, loading, showCreateForm, setShowCreateForm,
        title, setTitle, message, setMessage,
        scheduledDate, setScheduledDate, scheduledTime, setScheduledTime,
        channelId, setChannelId, recurring, setRecurring,
        recurringType, setRecurringType,
        handleScheduleAnnouncement, deleteAnnouncement, resetForm, getStatusColor
    };
};

export default useScheduledAnnouncements;

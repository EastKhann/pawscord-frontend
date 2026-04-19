import { useState, useEffect } from 'react';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';
import logger from '../../utils/logger';
import { useTranslation } from 'react-i18next';

const useScheduledAnnouncements = (fetchWithAuth, apiBaseUrl) => {
    const { t } = useTranslation();
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
            if (!response.ok) return;
            const data = await response.json();
            setAnnouncements(data.announcements || []);
        } catch (error) {
            logger.error('Failed to load scheduled announcements:', error);
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
            toast.error(t('announcement.requiredFields'));
            return;
        }
        const scheduledAt = `${scheduledDate}T${scheduledTime}:00`;
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/announcements/schedule/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    message,
                    scheduled_at: scheduledAt,
                    channel_id: channelId || null,
                    recurring,
                    recurring_type: recurring ? recurringType : null,
                }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success(t('announcement.scheduled'));
                loadScheduledAnnouncements();
                resetForm();
                setShowCreateForm(false);
            } else {
                toast.error(data.error || t('announcement.scheduleFailed'));
            }
        } catch (error) {
            logger.error('Schedule error:', error);
            toast.error(t('announcement.scheduleFailed'));
        }
    };

    const deleteAnnouncement = async (announcementId) => {
        if (!(await confirmDialog('Bu zamanlanmış duyuruyu silmek istediğinizden emin misiniz?')))
            return;
        try {
            await fetchWithAuth(`${apiBaseUrl}/announcements/${announcementId}/delete/`, {
                method: 'DELETE',
            });
            toast.success(t('announcement.deleted'));
            loadScheduledAnnouncements();
        } catch (error) {
            logger.error('Delete error:', error);
            toast.error(t('announcement.deleteFailed'));
        }
    };

    const getStatusColor = (scheduledAt) => {
        const now = new Date();
        const scheduled = new Date(scheduledAt);
        const diffHours = (scheduled - now) / (1000 * 60 * 60);
        if (diffHours < 0) return '#f23f42';
        if (diffHours < 24) return '#f0b232';
        return '#23a559';
    };

    return {
        announcements,
        loading,
        showCreateForm,
        setShowCreateForm,
        title,
        setTitle,
        message,
        setMessage,
        scheduledDate,
        setScheduledDate,
        scheduledTime,
        setScheduledTime,
        channelId,
        setChannelId,
        recurring,
        setRecurring,
        recurringType,
        setRecurringType,
        handleScheduleAnnouncement,
        deleteAnnouncement,
        resetForm,
        getStatusColor,
    };
};

export default useScheduledAnnouncements;

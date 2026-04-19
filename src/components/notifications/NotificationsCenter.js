/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useState, useEffect, useCallback, memo } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import './NotificationsCenter.css';
import {
    FaBell,
    FaTimes,
    FaCog,
    FaCheck,
    FaEnvelope,
    FaMobileAlt,
    FaBellSlash,
    FaFilter,
} from 'react-icons/fa';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const NotificationsCenter = ({ userId, onClose }) => {
    const { t } = useTranslation();

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [filter, setFilter] = useState('all'); // all, unread, mentions, servers
    const [settings, setSettings] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [loading, setLoading] = useState(true);

    // Settings state
    const [pushEnabled, setPushEnabled] = useState(true);
    const [emailEnabled, setEmailEnabled] = useState(true);
    const [mentionsOnly, setMentionsOnly] = useState(false);
    const [dndEnabled, setDndEnabled] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const handleToggleSettings = useCallback(() => setShowSettings((prev) => !prev), []);
    const handleFilterAll = useCallback(() => setFilter('all'), []);
    const handleFilterUnread = useCallback(() => setFilter('unread'), []);
    const handleFilterMentions = useCallback(() => setFilter('mentions'), []);
    const handleFilterServers = useCallback(() => setFilter('servers'), []);
    const handlePushChange = useCallback((e) => setPushEnabled(e.target.checked), []);
    const handleEmailChange = useCallback((e) => setEmailEnabled(e.target.checked), []);
    const handleSoundChange = useCallback((e) => setSoundEnabled(e.target.checked), []);
    const handleMentionsChange = useCallback((e) => setMentionsOnly(e.target.checked), []);
    const handleDndChange = useCallback((e) => setDndEnabled(e.target.checked), []);

    useEffect(() => {
        fetchNotifications();
        fetchSettings();
    }, [userId, filter]);

    const fetchWithAuth = async (url, options = {}) => {
        const token = getToken();
        const response = await fetch(url, {
            ...options,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    };

    const fetchNotifications = async () => {
        try {
            const data = await fetchWithAuth(
                `${getApiBase()}/notifications/${userId}/list/?filter=${filter}`
            );
            setNotifications(data.notifications || []);
            setUnreadCount(data.unread_count || 0);
        } catch (error) {
            logger.error('Notifications fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSettings = async () => {
        try {
            const data = await fetchWithAuth(`${getApiBase()}/notifications/${userId}/settings/`);
            setSettings(data);
            setPushEnabled(data.push_enabled);
            setEmailEnabled(data.email_enabled);
            setMentionsOnly(data.mentions_only);
            setDndEnabled(data.dnd_enabled);
            setSoundEnabled(data.sound_enabled);
        } catch (error) {
            logger.error('Settings fetch error:', error);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await fetchWithAuth(`${getApiBase()}/notifications/${userId}/${notificationId}/read/`, {
                method: 'POST',
            });
            setNotifications(
                notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
            );
            setUnreadCount(Math.max(0, unreadCount - 1));
        } catch (error) {
            logger.error('Mark as read error:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetchWithAuth(`${getApiBase()}/notifications/${userId}/read-all/`, {
                method: 'POST',
            });
            setNotifications(notifications.map((n) => ({ ...n, read: true })));
            setUnreadCount(0);
            showToast('Tüm bildirimler okundu olarak işaretlendi!');
        } catch (error) {
            logger.error('Mark all as read error:', error);
            showToast('Okundu olarak işaretlenemedi', 'error');
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            await fetchWithAuth(
                `${getApiBase()}/notifications/${userId}/${notificationId}/delete/`,
                {
                    method: 'DELETE',
                }
            );
            setNotifications(notifications.filter((n) => n.id !== notificationId));
            showToast('Bildirim silindi!');
        } catch (error) {
            logger.error('Delete notification error:', error);
            showToast('Bildirim silinemedi', 'error');
        }
    };

    const clearAll = async () => {
        if (!(await confirmDialog('Tüm bildirimleri temizlemek istediğinizden emin misiniz?')))
            return;

        try {
            await fetchWithAuth(`${getApiBase()}/notifications/${userId}/clear/`, {
                method: 'POST',
            });
            setNotifications([]);
            setUnreadCount(0);
            showToast('Tüm bildirimler temizlendi!');
        } catch (error) {
            logger.error('Clear all error:', error);
            showToast('Bildirimler temizlenemedi', 'error');
        }
    };

    const updateSettings = async () => {
        try {
            await fetchWithAuth(`${getApiBase()}/notifications/${userId}/settings/update/`, {
                method: 'PUT',
                body: JSON.stringify({
                    push_enabled: pushEnabled,
                    email_enabled: emailEnabled,
                    mentions_only: mentionsOnly,
                    dnd_enabled: dndEnabled,
                    sound_enabled: soundEnabled,
                }),
            });
            showToast('Ayarlar güncellendi!');
            setShowSettings(false);
        } catch (error) {
            logger.error('Settings update error:', error);
            showToast('Ayarlar güncellenemedi', 'error');
        }
    };

    const testNotification = async () => {
        try {
            await fetchWithAuth(`${getApiBase()}/notifications/${userId}/test/`, {
                method: 'POST',
            });
            showToast('Test bildirimi gönderildi!');
        } catch (error) {
            logger.error('Test notification error:', error);
            showToast('Test bildirimi gönderilemedi', 'error');
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'mention':
                return '💬';
            case 'reply':
                return '↩️';
            case 'like':
                return '❤️';
            case 'follow':
                return '👤';
            case 'server_invite':
                return '📧';
            case 'role_update':
                return '🏷️';
            case 'announcement':
                return '📢';
            default:
                return '🔔';
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    };

    const showToast = (message, type = 'success') => {};

    if (loading) {
        return (
            <div className="notifications-overlay">
                <div className="notifications-panel loading">
                    <div className="spinner" />
                    <p>{t('loading_notifications')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="notifications-overlay">
            <div
                className="notifications-panel"
                role="region"
                aria-label="Notifications"
                aria-live="polite"
            >
                <div className="panel-header">
                    <div>
                        <h2>
                            <FaBell />
                            {t('notifications')}
                        </h2>
                        {unreadCount > 0 && <span className="unread-badge">{unreadCount} new</span>}
                    </div>
                    <div className="header-actions">
                        <button onClick={handleToggleSettings} className="btn-settings">
                            <FaCog />
                        </button>
                        <button onClick={onClose} className="btn-close">
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div className="filter-bar">
                    <button className={filter === 'all' ? 'active' : ''} onClick={handleFilterAll}>
                        All
                    </button>
                    <button
                        className={filter === 'unread' ? 'active' : ''}
                        onClick={handleFilterUnread}
                    >
                        Unread
                    </button>
                    <button
                        className={filter === 'mentions' ? 'active' : ''}
                        onClick={handleFilterMentions}
                    >
                        Mentions
                    </button>
                    <button
                        className={filter === 'servers' ? 'active' : ''}
                        onClick={handleFilterServers}
                    >
                        Servers
                    </button>
                </div>

                {showSettings && (
                    <div className="settings-panel">
                        <h3>{t('notification_settings')}</h3>

                        <div className="setting-item">
                            <div className="setting-info">
                                <FaMobileAlt />
                                <div>
                                    <h4>{t('push_notifications')}</h4>
                                    <p>{t('receive_notifications_on_your_device')}</p>
                                </div>
                            </div>
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={pushEnabled}
                                    onChange={handlePushChange}
                                    aria-label="checkbox"
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <FaEnvelope />
                                <div>
                                    <h4>{t('email_notifications')}</h4>
                                    <p>{t('receive_notifications_via_email')}</p>
                                </div>
                            </div>
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={emailEnabled}
                                    onChange={handleEmailChange}
                                    aria-label="checkbox"
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <FaBell />
                                <div>
                                    <h4>{t('sound_effects')}</h4>
                                    <p>{t('play_sound_when_you_receive_notifications')}</p>
                                </div>
                            </div>
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={soundEnabled}
                                    onChange={handleSoundChange}
                                    aria-label="checkbox"
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <FaFilter />
                                <div>
                                    <h4>{t('mentions_only')}</h4>
                                    <p>{t('only_notify_when_you_re_mentioned')}</p>
                                </div>
                            </div>
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={mentionsOnly}
                                    onChange={handleMentionsChange}
                                    aria-label="checkbox"
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <FaBellSlash />
                                <div>
                                    <h4>{t('do_not_disturb')}</h4>
                                    <p>{t('mute_all_notifications_temporarily')}</p>
                                </div>
                            </div>
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={dndEnabled}
                                    onChange={handleDndChange}
                                    aria-label="checkbox"
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="settings-actions">
                            <button onClick={testNotification} className="btn-test">
                                Test Notification
                            </button>
                            <button onClick={updateSettings} className="btn-save">
                                Save Settings
                            </button>
                        </div>
                    </div>
                )}

                <div className="panel-actions">
                    {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="btn-mark-read">
                            <FaCheck /> Mark All as Read
                        </button>
                    )}
                    {notifications.length > 0 && (
                        <button onClick={clearAll} className="btn-clear">
                            Clear All
                        </button>
                    )}
                </div>

                <div className="notifications-content">
                    {notifications.length === 0 ? (
                        <div className="empty-state">
                            <FaBell size={64} />
                            <h3>{t('no_notifications')}</h3>
                            <p>{t('you_re_all_caught_up')}</p>
                        </div>
                    ) : (
                        <div
                            className="notifications-list"
                            role="list"
                            aria-label="Notification items"
                        >
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                                    onClick={() =>
                                        !notification.read && markAsRead(notification.id)
                                    }
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' &&
                                        !notification.read &&
                                        markAsRead(notification.id)
                                    }
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`${notification.title}: ${notification.message}${!notification.read ? ' (unread)' : ''}`}
                                >
                                    <div className="notification-icon">
                                        {getNotificationIcon(notification.type)}
                                    </div>
                                    <div className="notification-body">
                                        <div className="notification-header">
                                            <h4>{notification.title}</h4>
                                            <span className="notification-time">
                                                {formatTimestamp(notification.created_at)}
                                            </span>
                                        </div>
                                        <p className="notification-message">
                                            {notification.message}
                                        </p>
                                        {notification.server_name && (
                                            <span className="notification-server">
                                                in {notification.server_name}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNotification(notification.id);
                                        }}
                                        className="btn-delete-notification"
                                    >
                                        <FaTimes />
                                    </button>
                                    {!notification.read && <div className="unread-dot" />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

NotificationsCenter.propTypes = {
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func,
};
export default memo(NotificationsCenter);

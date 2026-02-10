import React, { useState, useEffect } from 'react';
import './NotificationsCenter.css';
import { FaBell, FaTimes, FaCog, FaCheck, FaEnvelope, FaMobileAlt, FaBellSlash, FaFilter } from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import confirmDialog from '../utils/confirmDialog';

const NotificationsCenter = ({ userId, onClose }) => {
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

    useEffect(() => {
        fetchNotifications();
        fetchSettings();
    }, [userId, filter]);

    const fetchWithAuth = async (url, options = {}) => {
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    };

    const fetchNotifications = async () => {
        try {
            const data = await fetchWithAuth(`${getApiBase()}/notifications/${userId}/list/?filter=${filter}`);
            setNotifications(data.notifications || []);
            setUnreadCount(data.unread_count || 0);
        } catch (error) {
            console.error('Notifications fetch error:', error);
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
            console.error('Settings fetch error:', error);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await fetchWithAuth(`${getApiBase()}/notifications/${userId}/${notificationId}/read/`, {
                method: 'POST'
            });
            setNotifications(notifications.map(n =>
                n.id === notificationId ? { ...n, read: true } : n
            ));
            setUnreadCount(Math.max(0, unreadCount - 1));
        } catch (error) {
            console.error('Mark as read error:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetchWithAuth(`${getApiBase()}/notifications/${userId}/read-all/`, {
                method: 'POST'
            });
            setNotifications(notifications.map(n => ({ ...n, read: true })));
            setUnreadCount(0);
            showToast('All notifications marked as read!');
        } catch (error) {
            console.error('Mark all as read error:', error);
            showToast('Failed to mark as read', 'error');
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            await fetchWithAuth(`${getApiBase()}/notifications/${userId}/${notificationId}/delete/`, {
                method: 'DELETE'
            });
            setNotifications(notifications.filter(n => n.id !== notificationId));
            showToast('Notification deleted!');
        } catch (error) {
            console.error('Delete notification error:', error);
            showToast('Failed to delete notification', 'error');
        }
    };

    const clearAll = async () => {
        if (!await confirmDialog('Are you sure you want to clear all notifications?')) return;

        try {
            await fetchWithAuth(`${getApiBase()}/notifications/${userId}/clear/`, {
                method: 'POST'
            });
            setNotifications([]);
            setUnreadCount(0);
            showToast('All notifications cleared!');
        } catch (error) {
            console.error('Clear all error:', error);
            showToast('Failed to clear notifications', 'error');
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
                    sound_enabled: soundEnabled
                })
            });
            showToast('Settings updated!');
            setShowSettings(false);
        } catch (error) {
            console.error('Settings update error:', error);
            showToast('Failed to update settings', 'error');
        }
    };

    const testNotification = async () => {
        try {
            await fetchWithAuth(`${getApiBase()}/notifications/${userId}/test/`, {
                method: 'POST'
            });
            showToast('Test notification sent!');
        } catch (error) {
            console.error('Test notification error:', error);
            showToast('Failed to send test notification', 'error');
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'mention': return '💬';
            case 'reply': return '↩️';
            case 'like': return '❤️';
            case 'follow': return '👤';
            case 'server_invite': return '📧';
            case 'role_update': return '🏷️';
            case 'announcement': return '📢';
            default: return '🔔';
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

    const showToast = (message, type = 'success') => {
    };

    if (loading) {
        return (
            <div className="notifications-overlay">
                <div className="notifications-panel loading">
                    <div className="spinner" />
                    <p>Loading Notifications...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="notifications-overlay">
            <div className="notifications-panel">
                <div className="panel-header">
                    <div>
                        <h2><FaBell /> Notifications</h2>
                        {unreadCount > 0 && <span className="unread-badge">{unreadCount} new</span>}
                    </div>
                    <div className="header-actions">
                        <button onClick={() => setShowSettings(!showSettings)} className="btn-settings">
                            <FaCog />
                        </button>
                        <button onClick={onClose} className="btn-close">
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div className="filter-bar">
                    <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
                        All
                    </button>
                    <button className={filter === 'unread' ? 'active' : ''} onClick={() => setFilter('unread')}>
                        Unread
                    </button>
                    <button className={filter === 'mentions' ? 'active' : ''} onClick={() => setFilter('mentions')}>
                        Mentions
                    </button>
                    <button className={filter === 'servers' ? 'active' : ''} onClick={() => setFilter('servers')}>
                        Servers
                    </button>
                </div>

                {showSettings && (
                    <div className="settings-panel">
                        <h3>Notification Settings</h3>
                        
                        <div className="setting-item">
                            <div className="setting-info">
                                <FaMobileAlt />
                                <div>
                                    <h4>Push Notifications</h4>
                                    <p>Receive notifications on your device</p>
                                </div>
                            </div>
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={pushEnabled}
                                    onChange={(e) => setPushEnabled(e.target.checked)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <FaEnvelope />
                                <div>
                                    <h4>Email Notifications</h4>
                                    <p>Receive notifications via email</p>
                                </div>
                            </div>
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={emailEnabled}
                                    onChange={(e) => setEmailEnabled(e.target.checked)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <FaBell />
                                <div>
                                    <h4>Sound Effects</h4>
                                    <p>Play sound when you receive notifications</p>
                                </div>
                            </div>
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={soundEnabled}
                                    onChange={(e) => setSoundEnabled(e.target.checked)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <FaFilter />
                                <div>
                                    <h4>Mentions Only</h4>
                                    <p>Only notify when you're mentioned</p>
                                </div>
                            </div>
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={mentionsOnly}
                                    onChange={(e) => setMentionsOnly(e.target.checked)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <FaBellSlash />
                                <div>
                                    <h4>Do Not Disturb</h4>
                                    <p>Mute all notifications temporarily</p>
                                </div>
                            </div>
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={dndEnabled}
                                    onChange={(e) => setDndEnabled(e.target.checked)}
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
                            <h3>No Notifications</h3>
                            <p>You're all caught up!</p>
                        </div>
                    ) : (
                        <div className="notifications-list">
                            {notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                                    onClick={() => !notification.read && markAsRead(notification.id)}
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
                                        <p className="notification-message">{notification.message}</p>
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

export default NotificationsCenter;

// frontend/src/components/NotificationDropdown.js
import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaTimes, FaCheck, FaCheckDouble, FaTrash } from 'react-icons/fa';
import confirmDialog from '../utils/confirmDialog';

const NotificationDropdown = ({
    fetchWithAuth,
    apiBaseUrl,
    currentUser,
    onClose
}) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef(null);

    useEffect(() => {
        loadNotifications();
    }, []);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const loadNotifications = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/notifications/`);
            if (response.ok) {
                const data = await response.json();
                setNotifications(data.results || data);
            }
        } catch (error) {
            console.error('Notification yükleme hatası:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/notifications/${notificationId}/read/`, {
                method: 'POST'
            });

            setNotifications(prev =>
                prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
            );
        } catch (error) {
            console.error('Mark as read hatası:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/notifications/mark_all_read/`, {
                method: 'POST'
            });

            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        } catch (error) {
            console.error('Mark all as read hatası:', error);
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/notifications/${notificationId}/`, {
                method: 'DELETE'
            });

            setNotifications(prev => prev.filter(n => n.id !== notificationId));
        } catch (error) {
            console.error('Notification silme hatası:', error);
        }
    };

    const clearAll = async () => {
        if (!await confirmDialog('Tüm bildirimleri silmek istediğinize emin misiniz?')) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/notifications/clear_all/`, {
                method: 'POST'
            });

            setNotifications([]);
        } catch (error) {
            console.error('Clear all hatası:', error);
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'message': return '💬';
            case 'mention': return '@';
            case 'friend_request': return '👥';
            case 'server_invite': return '🏠';
            case 'reaction': return '👍';
            case 'reply': return '↩️';
            default: return '🔔';
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Az önce';
        if (diffMins < 60) return `${diffMins} dakika önce`;
        if (diffHours < 24) return `${diffHours} saat önce`;
        if (diffDays < 7) return `${diffDays} gün önce`;
        return date.toLocaleDateString();
    };

    const unreadCount = notifications.filter(n => !n.is_read).length;

    return (
        <div ref={dropdownRef} style={styles.dropdown}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaBell />
                    <span style={styles.headerTitle}>Bildirimler</span>
                    {unreadCount > 0 && (
                        <span style={styles.badge}>{unreadCount}</span>
                    )}
                </div>
                <button onClick={onClose} style={styles.closeButton}>
                    <FaTimes />
                </button>
            </div>

            {/* Actions */}
            {notifications.length > 0 && (
                <div style={styles.actions}>
                    {unreadCount > 0 && (
                        <button onClick={markAllAsRead} style={styles.actionButton}>
                            <FaCheckDouble /> Tümünü okundu işaretle
                        </button>
                    )}
                    <button onClick={clearAll} style={{...styles.actionButton, color: '#ed4245'}}>
                        <FaTrash /> Tümünü temizle
                    </button>
                </div>
            )}

            {/* Notifications List */}
            <div style={styles.list}>
                {loading ? (
                    <div style={styles.loading}>Yükleniyor...</div>
                ) : notifications.length === 0 ? (
                    <div style={styles.empty}>
                        <div style={styles.emptyIcon}>🔔</div>
                        <div>Bildirim yok</div>
                        <div style={styles.emptySubtext}>Yeni bildirimler burada görünecek</div>
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            style={{
                                ...styles.notificationItem,
                                backgroundColor: notification.is_read ? 'transparent' : 'rgba(88, 101, 242, 0.05)'
                            }}
                            onClick={() => !notification.is_read && markAsRead(notification.id)}
                        >
                            <div style={styles.notificationIcon}>
                                {getNotificationIcon(notification.notification_type)}
                            </div>

                            <div style={styles.notificationContent}>
                                <div style={styles.notificationMessage}>
                                    {notification.message}
                                </div>
                                <div style={styles.notificationTime}>
                                    {formatTime(notification.created_at)}
                                </div>
                            </div>

                            <div style={styles.notificationActions}>
                                {!notification.is_read && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            markAsRead(notification.id);
                                        }}
                                        style={styles.iconButton}
                                        title="Okundu işaretle"
                                    >
                                        <FaCheck />
                                    </button>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteNotification(notification.id);
                                    }}
                                    style={styles.iconButton}
                                    title="Sil"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    dropdown: {
        position: 'absolute',
        top: '100%',
        right: 0,
        marginTop: '8px',
        width: '420px',
        maxWidth: '90vw',
        maxHeight: '600px',
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    header: {
        padding: '16px',
        borderBottom: '1px solid #1e1f22',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1e1f22',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#fff',
        fontSize: '1em',
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: '1em',
        fontWeight: '600',
    },
    badge: {
        backgroundColor: '#ed4245',
        color: '#fff',
        fontSize: '0.75em',
        fontWeight: 'bold',
        padding: '2px 6px',
        borderRadius: '10px',
        minWidth: '18px',
        textAlign: 'center',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '1.2em',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        transition: 'all 0.15s',
    },
    actions: {
        padding: '12px',
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid #1e1f22',
        flexWrap: 'wrap',
    },
    actionButton: {
        background: 'none',
        border: '1px solid #40444b',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '0.85em',
        padding: '6px 12px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.15s',
    },
    list: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    loading: {
        padding: '40px',
        textAlign: 'center',
        color: '#b9bbbe',
    },
    empty: {
        padding: '40px 20px',
        textAlign: 'center',
        color: '#b9bbbe',
    },
    emptyIcon: {
        fontSize: '3em',
        marginBottom: '12px',
        opacity: 0.5,
    },
    emptySubtext: {
        fontSize: '0.85em',
        color: '#72767d',
        marginTop: '8px',
    },
    notificationItem: {
        padding: '12px 16px',
        display: 'flex',
        gap: '12px',
        borderBottom: '1px solid #1e1f22',
        cursor: 'pointer',
        transition: 'background-color 0.15s',
    },
    notificationIcon: {
        fontSize: '1.5em',
        flexShrink: 0,
    },
    notificationContent: {
        flex: 1,
        minWidth: 0,
    },
    notificationMessage: {
        color: '#dbdee1',
        fontSize: '0.9em',
        lineHeight: '1.4',
        marginBottom: '4px',
    },
    notificationTime: {
        color: '#72767d',
        fontSize: '0.75em',
    },
    notificationActions: {
        display: 'flex',
        gap: '4px',
        flexShrink: 0,
    },
    iconButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '0.9em',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        transition: 'all 0.15s',
    },
};

// CSS for hover effects
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .notification-item:hover {
        background-color: rgba(255, 255, 255, 0.05) !important;
    }
    .icon-button-notification:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: #fff;
    }
    .close-button-notification:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: #fff;
    }
    .action-button-notification:hover {
        background-color: rgba(88, 101, 242, 0.1);
        color: #fff;
        border-color: #5865f2;
    }
`;
document.head.appendChild(styleSheet);

export default NotificationDropdown;




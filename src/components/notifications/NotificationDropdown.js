/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// frontend/src/components/NotificationDropdown.js
import { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { FaBell, FaTimes, FaCheck, FaCheckDouble, FaTrash } from 'react-icons/fa';
import confirmDialog from '../../utils/confirmDialog';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
import { useUIStore } from '../../stores/useUIStore';

/**
 * @param {Object} props
 * @param {Function} props.fetchWithAuth - Authenticated fetch wrapper
 * @param {string} props.apiBaseUrl - API base URL
 * @param {Object} props.currentUser - Current user object
 * @param {Function} props.onClose - Close dropdown handler
 */
const NotificationDropdown = ({ fetchWithAuth, apiBaseUrl, currentUser, onClose }) => {
    const { t } = useTranslation();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef(null);
    const setUnreadNotifCount = useUIStore((s) => s.setUnreadNotifCount);

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
                const items = data.results || data;
                setNotifications(items);
                const unread = items.filter((n) => !n.is_read).length;
                setUnreadNotifCount(unread);
            }
        } catch (error) {
            logger.error(t('ui.notification_load_hatasi'), error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/notifications/${notificationId}/read/`, {
                method: 'POST',
            });

            setNotifications((prev) =>
                prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
            );
        } catch (error) {
            logger.error(t('ui.mark_as_read_hatasi'), error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/notifications/mark_all_read/`, {
                method: 'POST',
            });

            setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
            setUnreadNotifCount(0);
        } catch (error) {
            logger.error(t('ui.mark_all_as_read_hatasi'), error);
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/notifications/${notificationId}/`, {
                method: 'DELETE',
            });

            setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
        } catch (error) {
            logger.error(t('ui.notification_silme_hatasi'), error);
        }
    };

    const clearAll = async () => {
        if (!(await confirmDialog('Tüm bildirimleri silmek istediğinizden emin misiniz?'))) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/notifications/clear_all/`, {
                method: 'POST',
            });

            setNotifications([]);
            setUnreadNotifCount(0);
        } catch (error) {
            logger.error(t('ui.clear_all_hatasi'), error);
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'message':
                return '💬';
            case 'mention':
                return '@';
            case 'friend_request':
                return '👥';
            case 'server_invite':
                return '🏠';
            case 'reaction':
                return '👍';
            case 'reply':
                return '↩️';
            default:
                return '🔔';
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minutes ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    const unreadCount = notifications.filter((n) => !n.is_read).length;

    return (
        <div
            ref={dropdownRef}
            style={styles.dropdown}
            role="dialog"
            aria-label="Notifications"
            aria-modal="true"
        >
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaBell />
                    <span style={styles.headerTitle}>{t('notifications')}</span>
                    {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
                </div>
                <button
                    onClick={onClose}
                    style={styles.closeButton}
                    aria-label={t('common.close')}
                >
                    <FaTimes />
                </button>
            </div>

            {/* Actions */}
            {notifications.length > 0 && (
                <div style={styles.actions}>
                    {unreadCount > 0 && (
                        <button onClick={markAllAsRead} style={styles.actionButton}>
                            <FaCheckDouble /> {t('notifications.markAllRead', 'Tümünü okundu işaretle')}
                        </button>
                    )}
                    <button onClick={clearAll} style={S.txt}>
                        <FaTrash /> {t('notifications.clearAll', 'Tümünü temizle')}
                    </button>
                </div>
            )}

            {/* Notifications List */}
            <div style={styles.list} role="list" aria-live="polite" aria-label={t('notifications')}>
                {loading ? (
                    <div style={styles.loading}>{t('common.loading')}</div>
                ) : notifications.length === 0 ? (
                    <div style={styles.empty}>
                        <div style={styles.emptyIcon}>🔔</div>
                        <div>{t('reportim_yok')}</div>
                        <div style={styles.emptySubtext}>
                            {t('yeni_notificationler_burada_görünecek')}
                        </div>
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            style={{
                                ...styles.notificationItem,
                                backgroundColor: notification.is_read
                                    ? 'transparent'
                                    : 'rgba(88, 101, 242, 0.05)',
                            }}
                            role="button"
                            tabIndex={0}
                            onClick={() => !notification.is_read && markAsRead(notification.id)}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') &&
                                !notification.is_read &&
                                markAsRead(notification.id)
                            }
                            aria-label={`${notification.message} — ${formatTime(notification.created_at)}${notification.is_read ? '' : ' (okunmamış)'}`}
                        >
                            <div style={styles.notificationIcon}>
                                {getNotificationIcon(notification.notification_type)}
                            </div>

                            <div style={styles.notificationContent}>
                                <div style={styles.notificationMessage}>{notification.message}</div>
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
                                        title={t('read_işaretle')}
                                        aria-label={t('ui.read_isaretle')}
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
                                    title={t('delete')}
                                    aria-label="Reportimi delete"
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
        backgroundColor: '#111214',
        borderRadius: '8px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    header: {
        padding: '16px',
        borderBottom: '1px solid #0b0e1b',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0d0e10',
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
        backgroundColor: '#f23f42',
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
        color: '#b5bac1',
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
        borderBottom: '1px solid #0b0e1b',
        flexWrap: 'wrap',
    },
    actionButton: {
        background: 'none',
        border: '1px solid #182135',
        color: '#b5bac1',
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
        color: '#b5bac1',
    },
    empty: {
        padding: '40px 20px',
        textAlign: 'center',
        color: '#b5bac1',
    },
    emptyIcon: {
        fontSize: '3em',
        marginBottom: '12px',
        opacity: 0.5,
    },
    emptySubtext: {
        fontSize: '0.85em',
        color: '#949ba4',
        marginTop: '8px',
    },
    notificationItem: {
        padding: '12px 16px',
        display: 'flex',
        gap: '12px',
        borderBottom: '1px solid #0b0e1b',
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
        color: '#949ba4',
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
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '0.9em',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        transition: 'all 0.15s',
    },
};

const S = {
    txt: { ...styles.actionButton, color: '#f23f42' },
};

// CSS for hover effects
if (typeof document !== 'undefined') {
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
}

const MemoizedNotificationDropdown = memo(NotificationDropdown);

MemoizedNotificationDropdown.displayName = 'NotificationDropdown';

MemoizedNotificationDropdown.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    currentUser: PropTypes.object,
    onClose: PropTypes.func,
};
export default MemoizedNotificationDropdown;

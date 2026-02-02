// frontend/src/components/Widgets.js
// 📱 WIDGETS SYSTEM - Desktop & Mobile Widgets

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import api from '../api';
import './Widgets.css';

// ========================================
// 🎵 MINI PLAYER WIDGET
// ========================================
export const MiniPlayerWidget = ({ data, onAction }) => {
    const { connected, track, artist, album_art, is_playing } = data || {};

    if (!connected) {
        return (
            <div className="widget mini-player-widget disconnected">
                <span className="widget-icon">🎵</span>
                <span className="widget-message">Spotify bağlı değil</span>
            </div>
        );
    }

    return (
        <div className="widget mini-player-widget">
            <div className="player-art">
                {album_art ? (
                    <img src={album_art} alt={track} />
                ) : (
                    <span className="no-art">🎵</span>
                )}
            </div>
            <div className="player-info">
                <span className="player-track">{track || 'Çalmıyor'}</span>
                <span className="player-artist">{artist}</span>
            </div>
            <div className="player-controls">
                <button onClick={() => onAction?.('prev')}>⏮</button>
                <button className="play-btn" onClick={() => onAction?.('toggle_play')}>
                    {is_playing ? '⏸' : '▶'}
                </button>
                <button onClick={() => onAction?.('next')}>⏭</button>
            </div>
        </div>
    );
};

// ========================================
// 🔵 QUICK STATUS WIDGET
// ========================================
export const QuickStatusWidget = ({ data, onAction }) => {
    const { current_status, custom_status, available_statuses } = data || {};
    const [showPicker, setShowPicker] = useState(false);

    const handleStatusChange = (statusId) => {
        onAction?.('set_status', { status: statusId });
        setShowPicker(false);
    };

    const currentStatusInfo = available_statuses?.find(s => s.id === current_status);

    return (
        <div className="widget quick-status-widget">
            <div
                className="status-display"
                onClick={() => setShowPicker(!showPicker)}
            >
                <span
                    className="status-dot"
                    style={{ backgroundColor: currentStatusInfo?.color || '#43b581' }}
                />
                <span className="status-label">
                    {currentStatusInfo?.label || 'Çevrimiçi'}
                </span>
                <span className="status-arrow">▼</span>
            </div>

            {custom_status && (
                <span className="custom-status">{custom_status}</span>
            )}

            {showPicker && (
                <div className="status-picker">
                    {available_statuses?.map(status => (
                        <button
                            key={status.id}
                            className={`status-option ${status.id === current_status ? 'active' : ''}`}
                            onClick={() => handleStatusChange(status.id)}
                        >
                            <span
                                className="status-dot"
                                style={{ backgroundColor: status.color }}
                            />
                            {status.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// ========================================
// 💬 SERVER ACTIVITY WIDGET
// ========================================
export const ServerActivityWidget = ({ data }) => {
    const { servers } = data || {};

    return (
        <div className="widget server-activity-widget">
            <h4 className="widget-title">💬 Sunucu Aktivitesi</h4>
            <div className="servers-list">
                {servers?.map(server => (
                    <div key={server.id} className="server-activity-item">
                        <div className="server-header">
                            {server.icon ? (
                                <img src={server.icon} alt={server.name} className="server-icon" />
                            ) : (
                                <span className="server-icon-placeholder">
                                    {server.name[0]}
                                </span>
                            )}
                            <span className="server-name">{server.name}</span>
                        </div>
                        <div className="messages-preview">
                            {server.recent_messages?.slice(0, 2).map(msg => (
                                <div key={msg.id} className="message-preview">
                                    <span className="msg-author">{msg.author}:</span>
                                    <span className="msg-content">{msg.content}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {(!servers || servers.length === 0) && (
                    <p className="empty-message">Henüz aktivite yok</p>
                )}
            </div>
        </div>
    );
};

// ========================================
// 👥 FRIEND LIST WIDGET
// ========================================
export const FriendListWidget = ({ data }) => {
    const { friends, total_online } = data || {};

    return (
        <div className="widget friend-list-widget">
            <div className="widget-header">
                <h4 className="widget-title">👥 Arkadaşlar</h4>
                <span className="online-count">{total_online} çevrimiçi</span>
            </div>
            <div className="friends-list">
                {friends?.map(friend => (
                    <div key={friend.id} className="friend-item">
                        <div className="friend-avatar-container">
                            {friend.avatar ? (
                                <img src={friend.avatar} alt={friend.username} className="friend-avatar" />
                            ) : (
                                <span className="friend-avatar-placeholder">👤</span>
                            )}
                            <span
                                className={`friend-status-dot status-${friend.status}`}
                            />
                        </div>
                        <div className="friend-info">
                            <span className="friend-name">{friend.username}</span>
                            {friend.custom_status && (
                                <span className="friend-custom-status">{friend.custom_status}</span>
                            )}
                            {friend.activity && (
                                <span className="friend-activity">{friend.activity}</span>
                            )}
                        </div>
                    </div>
                ))}
                {(!friends || friends.length === 0) && (
                    <p className="empty-message">Arkadaş yok</p>
                )}
            </div>
        </div>
    );
};

// ========================================
// 🔔 NOTIFICATIONS WIDGET
// ========================================
export const NotificationsWidget = ({ data, onAction }) => {
    const { unread_count, recent } = data || {};

    return (
        <div className="widget notifications-widget">
            <div className="widget-header">
                <h4 className="widget-title">🔔 Bildirimler</h4>
                {unread_count > 0 && (
                    <span className="unread-badge">{unread_count}</span>
                )}
            </div>
            <div className="notifications-list">
                {recent?.slice(0, 3).map(notif => (
                    <div key={notif.id} className="notification-item">
                        <span className="notif-icon">
                            {notif.type === 'mention' ? '@' : notif.type === 'dm' ? '✉️' : '📢'}
                        </span>
                        <span className="notif-content">{notif.content}</span>
                    </div>
                ))}
            </div>
            {unread_count > 0 && (
                <button
                    className="mark-read-btn"
                    onClick={() => onAction?.('mark_all_read')}
                >
                    Tümünü okundu işaretle
                </button>
            )}
        </div>
    );
};

// ========================================
// 📅 CALENDAR WIDGET
// ========================================
export const CalendarWidget = ({ data }) => {
    const { upcoming_events } = data || {};

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="widget calendar-widget">
            <h4 className="widget-title">📅 Yaklaşan Etkinlikler</h4>
            <div className="events-list">
                {upcoming_events?.map(event => (
                    <div key={event.id} className="event-item">
                        <div className="event-date">
                            {formatDate(event.start_time)}
                        </div>
                        <div className="event-info">
                            <span className="event-title">{event.title}</span>
                            <span className="event-server">{event.server}</span>
                        </div>
                        {event.rsvp_count > 0 && (
                            <span className="event-rsvp">{event.rsvp_count} katılımcı</span>
                        )}
                    </div>
                ))}
                {(!upcoming_events || upcoming_events.length === 0) && (
                    <p className="empty-message">Yaklaşan etkinlik yok</p>
                )}
            </div>
        </div>
    );
};

// ========================================
// ⭐ LEVEL PROGRESS WIDGET
// ========================================
export const LevelProgressWidget = ({ data }) => {
    const { level, xp, xp_for_next, progress, rank, total_messages } = data || {};
    const progressPercent = Math.min((progress / (xp_for_next || 100)) * 100, 100);

    return (
        <div className="widget level-progress-widget">
            <div className="level-header">
                <span className="level-badge">LVL {level || 1}</span>
                <span className="level-rank">{rank}</span>
            </div>
            <div className="xp-progress">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                <span className="xp-text">{xp || 0} / {xp_for_next || 100} XP</span>
            </div>
            <div className="level-stats">
                <span>📝 {total_messages || 0} mesaj</span>
            </div>
        </div>
    );
};

// ========================================
// 🎤 VOICE ROOMS WIDGET
// ========================================
export const VoiceRoomsWidget = ({ data }) => {
    const { rooms } = data || {};

    return (
        <div className="widget voice-rooms-widget">
            <h4 className="widget-title">🎤 Aktif Sesli Odalar</h4>
            <div className="rooms-list">
                {rooms?.map(room => (
                    <div key={room.id} className="room-item">
                        <div className="room-info">
                            <span className="room-name">{room.name}</span>
                            <span className="room-server">{room.server}</span>
                        </div>
                        <div className="room-participants">
                            <span className="participant-count">
                                👥 {room.participants}/{room.max_participants || '∞'}
                            </span>
                        </div>
                    </div>
                ))}
                {(!rooms || rooms.length === 0) && (
                    <p className="empty-message">Aktif oda yok</p>
                )}
            </div>
        </div>
    );
};

// ========================================
// ⚡ QUICK ACTIONS WIDGET
// ========================================
export const QuickActionsWidget = ({ data, onNavigate }) => {
    const { actions } = data || {};

    return (
        <div className="widget quick-actions-widget">
            <div className="actions-grid">
                {actions?.map(action => (
                    <button
                        key={action.id}
                        className="action-btn"
                        onClick={() => onNavigate?.(action.id)}
                    >
                        <span className="action-icon">{action.icon}</span>
                        <span className="action-label">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

// ========================================
// 📊 STATS OVERVIEW WIDGET
// ========================================
export const StatsOverviewWidget = ({ data }) => {
    const {
        servers_count,
        friends_count,
        messages_today,
        voice_minutes_today,
        level,
        xp
    } = data || {};

    return (
        <div className="widget stats-overview-widget">
            <h4 className="widget-title">📊 İstatistikler</h4>
            <div className="stats-grid">
                <div className="stat-item">
                    <span className="stat-value">{servers_count || 0}</span>
                    <span className="stat-label">Sunucu</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{friends_count || 0}</span>
                    <span className="stat-label">Arkadaş</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{messages_today || 0}</span>
                    <span className="stat-label">Bugün</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{voice_minutes_today || 0}dk</span>
                    <span className="stat-label">Sesli</span>
                </div>
            </div>
        </div>
    );
};

// ========================================
// 📱 WIDGET RENDERER
// ========================================
const WidgetRenderer = ({ widgetId, data, onAction, onNavigate }) => {
    const widgets = {
        mini_player: MiniPlayerWidget,
        quick_status: QuickStatusWidget,
        server_activity: ServerActivityWidget,
        friend_list: FriendListWidget,
        notifications: NotificationsWidget,
        calendar: CalendarWidget,
        level_progress: LevelProgressWidget,
        voice_rooms: VoiceRoomsWidget,
        quick_actions: QuickActionsWidget,
        stats_overview: StatsOverviewWidget
    };

    const WidgetComponent = widgets[widgetId];

    if (!WidgetComponent) {
        return (
            <div className="widget unknown-widget">
                <span>❓ Bilinmeyen widget: {widgetId}</span>
            </div>
        );
    }

    return (
        <WidgetComponent
            data={data}
            onAction={onAction}
            onNavigate={onNavigate}
        />
    );
};

// ========================================
// 📱 WIDGET ADD MODAL
// ========================================
const WidgetAddModal = ({ available, currentWidgets, onAdd, onClose }) => {
    const notAdded = available.filter(w => !currentWidgets.includes(w.id));

    return (
        <div className="widget-add-modal-overlay" onClick={onClose}>
            <div className="widget-add-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>➕ Widget Ekle</h3>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>
                <div className="modal-content">
                    {notAdded.length === 0 ? (
                        <p className="empty-message">Tüm widget'lar zaten ekli</p>
                    ) : (
                        <div className="widgets-grid">
                            {notAdded.map(widget => (
                                <button
                                    key={widget.id}
                                    className="widget-option"
                                    onClick={() => {
                                        onAdd(widget.id);
                                        onClose();
                                    }}
                                >
                                    <span className="widget-icon">{widget.icon}</span>
                                    <div className="widget-info">
                                        <span className="widget-name">{widget.name}</span>
                                        <span className="widget-desc">{widget.description}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ========================================
// 📱 MAIN WIDGETS DASHBOARD
// ========================================
const WidgetsDashboard = ({ platform = 'desktop', onNavigate }) => {
    const [config, setConfig] = useState(null);
    const [widgetData, setWidgetData] = useState({});
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    // Load user widgets
    useEffect(() => {
        const loadWidgets = async () => {
            try {
                const response = await api.get('/widgets/user/');
                setConfig(response.data);
            } catch (error) {
                console.error('Failed to load widgets:', error);
            }
            setLoading(false);
        };
        loadWidgets();
    }, []);

    // Load widget data
    useEffect(() => {
        if (!config) return;

        const loadWidgetData = async () => {
            const widgets = config.widgets?.[platform] || [];
            const dataPromises = widgets.map(async (widgetId) => {
                try {
                    const response = await api.get(`/widgets/${widgetId}/data/`);
                    return { id: widgetId, data: response.data.data };
                } catch (error) {
                    console.error(`Failed to load ${widgetId} data:`, error);
                    return { id: widgetId, data: null };
                }
            });

            const results = await Promise.all(dataPromises);
            const dataMap = {};
            results.forEach(r => { dataMap[r.id] = r.data; });
            setWidgetData(dataMap);
        };

        loadWidgetData();
        const interval = setInterval(loadWidgetData, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, [config, platform]);

    const handleAction = useCallback(async (widgetId, action, params = {}) => {
        try {
            await api.post(`/widgets/${widgetId}/action/${action}/`, params);
            // Refresh widget data after action
            const response = await api.get(`/widgets/${widgetId}/data/`);
            setWidgetData(prev => ({ ...prev, [widgetId]: response.data.data }));
        } catch (error) {
            console.error('Widget action failed:', error);
        }
    }, []);

    const handleAddWidget = async (widgetId) => {
        try {
            const response = await api.post('/widgets/add/', { platform, widget_id: widgetId });
            setConfig(prev => ({ ...prev, widgets: response.data.widgets }));
        } catch (error) {
            console.error('Failed to add widget:', error);
        }
    };

    const handleRemoveWidget = async (widgetId) => {
        try {
            const response = await api.post('/widgets/remove/', { platform, widget_id: widgetId });
            setConfig(prev => ({ ...prev, widgets: response.data.widgets }));
        } catch (error) {
            console.error('Failed to remove widget:', error);
        }
    };

    const currentWidgets = useMemo(() => {
        return config?.widgets?.[platform] || [];
    }, [config, platform]);

    if (loading) {
        return (
            <div className="widgets-dashboard loading">
                <div className="loading-spinner">📱</div>
                <p>Widget'lar yükleniyor...</p>
            </div>
        );
    }

    return (
        <div className="widgets-dashboard">
            <div className="dashboard-header">
                <h2>📱 Widget'larım</h2>
                <div className="dashboard-actions">
                    <button
                        className={`edit-btn ${editMode ? 'active' : ''}`}
                        onClick={() => setEditMode(!editMode)}
                    >
                        {editMode ? '✓ Bitti' : '✏️ Düzenle'}
                    </button>
                    <button
                        className="add-btn"
                        onClick={() => setShowAddModal(true)}
                    >
                        ➕ Ekle
                    </button>
                </div>
            </div>

            <div className={`widgets-grid platform-${platform} ${editMode ? 'edit-mode' : ''}`}>
                {currentWidgets.map(widgetId => (
                    <div key={widgetId} className="widget-container">
                        {editMode && (
                            <button
                                className="remove-widget-btn"
                                onClick={() => handleRemoveWidget(widgetId)}
                            >
                                ✕
                            </button>
                        )}
                        <WidgetRenderer
                            widgetId={widgetId}
                            data={widgetData[widgetId]}
                            onAction={(action, params) => handleAction(widgetId, action, params)}
                            onNavigate={onNavigate}
                        />
                    </div>
                ))}

                {currentWidgets.length === 0 && (
                    <div className="empty-widgets">
                        <span className="empty-icon">📱</span>
                        <p>Henüz widget eklenmedi</p>
                        <button onClick={() => setShowAddModal(true)}>
                            Widget Ekle
                        </button>
                    </div>
                )}
            </div>

            {showAddModal && (
                <WidgetAddModal
                    available={config?.available || []}
                    currentWidgets={currentWidgets}
                    onAdd={handleAddWidget}
                    onClose={() => setShowAddModal(false)}
                />
            )}
        </div>
    );
};

export default WidgetsDashboard;

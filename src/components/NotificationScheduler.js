// frontend/src/components/NotificationScheduler.js
// 🔔 Notification Scheduler - Schedule future notifications

import React, { useState, useEffect, useCallback } from 'react';
import {
    FaBell, FaClock, FaCalendarAlt, FaPlus, FaTrash,
    FaEdit, FaPause, FaPlay, FaUsers, FaGlobe, FaUser,
    FaCheck, FaTimes, FaHistory, FaFilter, FaSearch
} from 'react-icons/fa';

/**
 * NotificationScheduler Component
 * Schedule and manage automated notifications
 */
const NotificationScheduler = ({ fetchWithAuth, apiBaseUrl, currentUser }) => {
    const [scheduledNotifications, setScheduledNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingNotification, setEditingNotification] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all'); // all, active, paused, sent
    const [searchQuery, setSearchQuery] = useState('');

    const [newNotification, setNewNotification] = useState({
        title: '',
        message: '',
        type: 'general', // general, reminder, event, announcement
        targetType: 'all', // all, specific_users, role, channel
        targetId: '',
        scheduledDate: '',
        scheduledTime: '',
        repeat: 'none', // none, daily, weekly, monthly
        priority: 'normal' // low, normal, high, urgent
    });

    const fetchScheduledNotifications = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/notifications/scheduled/`);
            if (response.ok) {
                const data = await response.json();
                setScheduledNotifications(data);
            } else {
                // Demo data
                setScheduledNotifications([
                    {
                        id: 1,
                        title: 'Sunucu Bakım Bildirimi',
                        message: 'Sunucu bakımı 02:00-04:00 arasında yapılacaktır.',
                        type: 'announcement',
                        targetType: 'all',
                        scheduledAt: '2026-01-27T02:00:00',
                        repeat: 'none',
                        priority: 'high',
                        status: 'scheduled',
                        createdBy: 'admin'
                    },
                    {
                        id: 2,
                        title: 'Haftalık Toplantı Hatırlatıcı',
                        message: 'Haftalık takım toplantısı yarın saat 14:00\'te!',
                        type: 'reminder',
                        targetType: 'role',
                        targetId: 'moderators',
                        scheduledAt: '2026-01-28T13:00:00',
                        repeat: 'weekly',
                        priority: 'normal',
                        status: 'active',
                        createdBy: 'admin'
                    },
                    {
                        id: 3,
                        title: 'Etkinlik Başlangıcı',
                        message: 'Büyük oyun turnuvası 1 saat içinde başlıyor!',
                        type: 'event',
                        targetType: 'all',
                        scheduledAt: '2026-01-29T19:00:00',
                        repeat: 'none',
                        priority: 'urgent',
                        status: 'scheduled',
                        createdBy: 'event_manager'
                    },
                    {
                        id: 4,
                        title: 'Günlük İstatistik Raporu',
                        message: 'Günlük sunucu istatistikleri hazır!',
                        type: 'general',
                        targetType: 'role',
                        targetId: 'admins',
                        scheduledAt: '2026-01-26T09:00:00',
                        repeat: 'daily',
                        priority: 'low',
                        status: 'paused',
                        createdBy: 'bot'
                    },
                    {
                        id: 5,
                        title: 'Premium Abonelik Hatırlatıcı',
                        message: 'Premium aboneliğiniz 3 gün içinde sona eriyor!',
                        type: 'reminder',
                        targetType: 'specific_users',
                        targetId: 'premium_expiring',
                        scheduledAt: '2026-01-30T10:00:00',
                        repeat: 'none',
                        priority: 'high',
                        status: 'scheduled',
                        createdBy: 'system'
                    }
                ]);
            }
        } catch (err) {
            console.error('Failed to fetch scheduled notifications:', err);
        } finally {
            setLoading(false);
        }
    }, [fetchWithAuth, apiBaseUrl]);

    useEffect(() => {
        fetchScheduledNotifications();
    }, [fetchScheduledNotifications]);

    const handleCreateNotification = async () => {
        if (!newNotification.title || !newNotification.message || !newNotification.scheduledDate || !newNotification.scheduledTime) {
            return;
        }

        const scheduledAt = `${newNotification.scheduledDate}T${newNotification.scheduledTime}:00`;

        const notification = {
            ...newNotification,
            id: Date.now(),
            scheduledAt,
            status: 'scheduled',
            createdBy: currentUser?.username || 'admin'
        };

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/notifications/scheduled/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(notification)
            });

            if (response.ok) {
                const created = await response.json();
                setScheduledNotifications(prev => [...prev, created]);
            } else {
                setScheduledNotifications(prev => [...prev, notification]);
            }
        } catch (err) {
            setScheduledNotifications(prev => [...prev, notification]);
        }

        setShowCreateModal(false);
        resetForm();
    };

    const handleToggleStatus = async (notificationId, currentStatus) => {
        const newStatus = currentStatus === 'active' || currentStatus === 'scheduled' ? 'paused' : 'active';

        setScheduledNotifications(prev => prev.map(n =>
            n.id === notificationId ? { ...n, status: newStatus } : n
        ));

        try {
            await fetchWithAuth(`${apiBaseUrl}/api/notifications/scheduled/${notificationId}/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
        } catch (err) {
            console.error('Failed to toggle notification status:', err);
        }
    };

    const handleDeleteNotification = async (notificationId) => {
        setScheduledNotifications(prev => prev.filter(n => n.id !== notificationId));

        try {
            await fetchWithAuth(`${apiBaseUrl}/api/notifications/scheduled/${notificationId}/`, {
                method: 'DELETE'
            });
        } catch (err) {
            console.error('Failed to delete notification:', err);
        }
    };

    const resetForm = () => {
        setNewNotification({
            title: '',
            message: '',
            type: 'general',
            targetType: 'all',
            targetId: '',
            scheduledDate: '',
            scheduledTime: '',
            repeat: 'none',
            priority: 'normal'
        });
        setEditingNotification(null);
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'announcement': return '📢';
            case 'reminder': return '⏰';
            case 'event': return '🎉';
            default: return '🔔';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'announcement': return '#5865f2';
            case 'reminder': return '#faa61a';
            case 'event': return '#43b581';
            default: return '#72767d';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return '#f04747';
            case 'high': return '#faa61a';
            case 'normal': return '#43b581';
            case 'low': return '#72767d';
            default: return '#72767d';
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            scheduled: { bg: 'rgba(88, 101, 242, 0.2)', color: '#5865f2', text: 'Planlandı' },
            active: { bg: 'rgba(67, 181, 129, 0.2)', color: '#43b581', text: 'Aktif' },
            paused: { bg: 'rgba(250, 166, 26, 0.2)', color: '#faa61a', text: 'Duraklatıldı' },
            sent: { bg: 'rgba(114, 118, 125, 0.2)', color: '#72767d', text: 'Gönderildi' }
        };
        const style = styles[status] || styles.scheduled;
        return (
            <span style={{
                padding: '2px 8px',
                borderRadius: '10px',
                backgroundColor: style.bg,
                color: style.color,
                fontSize: '11px',
                fontWeight: '500'
            }}>
                {style.text}
            </span>
        );
    };

    const getTargetIcon = (targetType) => {
        switch (targetType) {
            case 'all': return <FaGlobe size={12} />;
            case 'specific_users': return <FaUser size={12} />;
            case 'role': return <FaUsers size={12} />;
            default: return <FaBell size={12} />;
        }
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getRepeatText = (repeat) => {
        switch (repeat) {
            case 'daily': return 'Her gün';
            case 'weekly': return 'Her hafta';
            case 'monthly': return 'Her ay';
            default: return 'Tek seferlik';
        }
    };

    const filteredNotifications = scheduledNotifications.filter(n => {
        const matchesStatus = filterStatus === 'all' || n.status === filterStatus;
        const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.message.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <FaClock className="pulse" size={32} color="#5865f2" />
                    <span>Planlanmış bildirimler yükleniyor...</span>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaBell size={24} color="#5865f2" />
                    <div>
                        <h2 style={styles.title}>Bildirim Zamanlayıcı</h2>
                        <p style={styles.subtitle}>{scheduledNotifications.length} planlanmış bildirim</p>
                    </div>
                </div>
                <button
                    style={styles.createButton}
                    onClick={() => setShowCreateModal(true)}
                >
                    <FaPlus /> Yeni Bildirim Planla
                </button>
            </div>

            {/* Filters */}
            <div style={styles.filters}>
                <div style={styles.searchBox}>
                    <FaSearch size={14} color="#72767d" />
                    <input
                        type="text"
                        style={styles.searchInput}
                        placeholder="Bildirim ara..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <div style={styles.filterButtons}>
                    {['all', 'scheduled', 'active', 'paused', 'sent'].map(status => (
                        <button
                            key={status}
                            style={{
                                ...styles.filterButton,
                                ...(filterStatus === status ? styles.filterButtonActive : {})
                            }}
                            onClick={() => setFilterStatus(status)}
                        >
                            {status === 'all' ? 'Tümü' :
                                status === 'scheduled' ? 'Planlandı' :
                                    status === 'active' ? 'Aktif' :
                                        status === 'paused' ? 'Duraklatıldı' : 'Gönderildi'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notifications List */}
            <div style={styles.notificationsList}>
                {filteredNotifications.length === 0 ? (
                    <div style={styles.emptyState}>
                        <FaBell size={48} color="#40444b" />
                        <p>Henüz planlanmış bildirim yok</p>
                        <button
                            style={styles.emptyButton}
                            onClick={() => setShowCreateModal(true)}
                        >
                            İlk Bildirimi Oluştur
                        </button>
                    </div>
                ) : (
                    filteredNotifications.map(notification => (
                        <div key={notification.id} style={styles.notificationCard}>
                            <div style={styles.notificationHeader}>
                                <div style={styles.notificationTypeIcon}>
                                    <span style={{
                                        fontSize: '20px',
                                        filter: notification.status === 'paused' ? 'grayscale(1)' : 'none'
                                    }}>
                                        {getTypeIcon(notification.type)}
                                    </span>
                                </div>
                                <div style={styles.notificationInfo}>
                                    <h3 style={styles.notificationTitle}>{notification.title}</h3>
                                    <p style={styles.notificationMessage}>{notification.message}</p>
                                </div>
                                <div style={styles.notificationActions}>
                                    <button
                                        style={styles.actionButton}
                                        onClick={() => handleToggleStatus(notification.id, notification.status)}
                                        title={notification.status === 'paused' ? 'Devam Et' : 'Duraklat'}
                                    >
                                        {notification.status === 'paused' ? <FaPlay /> : <FaPause />}
                                    </button>
                                    <button
                                        style={styles.actionButton}
                                        onClick={() => {
                                            setEditingNotification(notification);
                                            setShowCreateModal(true);
                                        }}
                                        title="Düzenle"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        style={{ ...styles.actionButton, color: '#f04747' }}
                                        onClick={() => handleDeleteNotification(notification.id)}
                                        title="Sil"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            <div style={styles.notificationMeta}>
                                <div style={styles.metaItem}>
                                    <FaClock size={12} />
                                    <span>{formatDateTime(notification.scheduledAt)}</span>
                                </div>
                                <div style={styles.metaItem}>
                                    {getTargetIcon(notification.targetType)}
                                    <span>{notification.targetType === 'all' ? 'Herkese' :
                                        notification.targetType === 'role' ? notification.targetId :
                                            'Belirli Kullanıcılar'}</span>
                                </div>
                                <div style={styles.metaItem}>
                                    <FaHistory size={12} />
                                    <span>{getRepeatText(notification.repeat)}</span>
                                </div>
                                <div style={{
                                    ...styles.priorityBadge,
                                    backgroundColor: `${getPriorityColor(notification.priority)}20`,
                                    color: getPriorityColor(notification.priority)
                                }}>
                                    {notification.priority.toUpperCase()}
                                </div>
                                {getStatusBadge(notification.status)}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Create/Edit Modal */}
            {showCreateModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <div style={styles.modalHeader}>
                            <h3 style={styles.modalTitle}>
                                {editingNotification ? 'Bildirimi Düzenle' : 'Yeni Bildirim Planla'}
                            </h3>
                            <button
                                style={styles.closeButton}
                                onClick={() => { setShowCreateModal(false); resetForm(); }}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div style={styles.modalBody}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Başlık</label>
                                <input
                                    type="text"
                                    style={styles.input}
                                    value={newNotification.title}
                                    onChange={e => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Bildirim başlığı"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Mesaj</label>
                                <textarea
                                    style={styles.textarea}
                                    value={newNotification.message}
                                    onChange={e => setNewNotification(prev => ({ ...prev, message: e.target.value }))}
                                    placeholder="Bildirim içeriği"
                                    rows={3}
                                />
                            </div>

                            <div style={styles.formRow}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Tür</label>
                                    <select
                                        style={styles.select}
                                        value={newNotification.type}
                                        onChange={e => setNewNotification(prev => ({ ...prev, type: e.target.value }))}
                                    >
                                        <option value="general">Genel</option>
                                        <option value="announcement">Duyuru</option>
                                        <option value="reminder">Hatırlatıcı</option>
                                        <option value="event">Etkinlik</option>
                                    </select>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Öncelik</label>
                                    <select
                                        style={styles.select}
                                        value={newNotification.priority}
                                        onChange={e => setNewNotification(prev => ({ ...prev, priority: e.target.value }))}
                                    >
                                        <option value="low">Düşük</option>
                                        <option value="normal">Normal</option>
                                        <option value="high">Yüksek</option>
                                        <option value="urgent">Acil</option>
                                    </select>
                                </div>
                            </div>

                            <div style={styles.formRow}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Hedef</label>
                                    <select
                                        style={styles.select}
                                        value={newNotification.targetType}
                                        onChange={e => setNewNotification(prev => ({ ...prev, targetType: e.target.value }))}
                                    >
                                        <option value="all">Herkese</option>
                                        <option value="role">Rol</option>
                                        <option value="specific_users">Belirli Kullanıcılar</option>
                                        <option value="channel">Kanal</option>
                                    </select>
                                </div>

                                {newNotification.targetType !== 'all' && (
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Hedef ID</label>
                                        <input
                                            type="text"
                                            style={styles.input}
                                            value={newNotification.targetId}
                                            onChange={e => setNewNotification(prev => ({ ...prev, targetId: e.target.value }))}
                                            placeholder="Rol veya kullanıcı ID"
                                        />
                                    </div>
                                )}
                            </div>

                            <div style={styles.formRow}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Tarih</label>
                                    <input
                                        type="date"
                                        style={styles.input}
                                        value={newNotification.scheduledDate}
                                        onChange={e => setNewNotification(prev => ({ ...prev, scheduledDate: e.target.value }))}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Saat</label>
                                    <input
                                        type="time"
                                        style={styles.input}
                                        value={newNotification.scheduledTime}
                                        onChange={e => setNewNotification(prev => ({ ...prev, scheduledTime: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Tekrar</label>
                                <select
                                    style={styles.select}
                                    value={newNotification.repeat}
                                    onChange={e => setNewNotification(prev => ({ ...prev, repeat: e.target.value }))}
                                >
                                    <option value="none">Tek Seferlik</option>
                                    <option value="daily">Her Gün</option>
                                    <option value="weekly">Her Hafta</option>
                                    <option value="monthly">Her Ay</option>
                                </select>
                            </div>
                        </div>
                        <div style={styles.modalFooter}>
                            <button
                                style={styles.cancelButton}
                                onClick={() => { setShowCreateModal(false); resetForm(); }}
                            >
                                İptal
                            </button>
                            <button
                                style={styles.submitButton}
                                onClick={handleCreateNotification}
                            >
                                <FaCheck /> {editingNotification ? 'Güncelle' : 'Planla'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        padding: '20px',
        color: '#dcddde'
    },
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '60px',
        color: '#b9bbbe'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    title: {
        margin: 0,
        fontSize: '18px',
        fontWeight: '600',
        color: '#fff'
    },
    subtitle: {
        margin: '4px 0 0',
        fontSize: '13px',
        color: '#72767d'
    },
    createButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer'
    },
    filters: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '16px'
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        backgroundColor: '#202225',
        borderRadius: '4px',
        flex: 1,
        maxWidth: '300px'
    },
    searchInput: {
        flex: 1,
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#dcddde',
        fontSize: '14px'
    },
    filterButtons: {
        display: 'flex',
        gap: '8px'
    },
    filterButton: {
        padding: '6px 12px',
        backgroundColor: '#202225',
        border: 'none',
        borderRadius: '4px',
        color: '#72767d',
        fontSize: '13px',
        cursor: 'pointer'
    },
    filterButtonActive: {
        backgroundColor: '#5865f2',
        color: '#fff'
    },
    notificationsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        color: '#72767d'
    },
    emptyButton: {
        marginTop: '16px',
        padding: '10px 20px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        cursor: 'pointer'
    },
    notificationCard: {
        backgroundColor: '#202225',
        borderRadius: '8px',
        padding: '16px'
    },
    notificationHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        marginBottom: '12px'
    },
    notificationTypeIcon: {
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2f3136',
        borderRadius: '8px'
    },
    notificationInfo: {
        flex: 1
    },
    notificationTitle: {
        margin: '0 0 4px',
        fontSize: '15px',
        fontWeight: '600',
        color: '#fff'
    },
    notificationMessage: {
        margin: 0,
        fontSize: '13px',
        color: '#b9bbbe',
        lineHeight: '1.4'
    },
    notificationActions: {
        display: 'flex',
        gap: '8px'
    },
    actionButton: {
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2f3136',
        border: 'none',
        borderRadius: '4px',
        color: '#b9bbbe',
        cursor: 'pointer'
    },
    notificationMeta: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap'
    },
    metaItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        color: '#72767d'
    },
    priorityBadge: {
        padding: '2px 8px',
        borderRadius: '10px',
        fontSize: '10px',
        fontWeight: '600'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    modal: {
        width: '500px',
        maxHeight: '90vh',
        backgroundColor: '#36393f',
        borderRadius: '8px',
        overflow: 'hidden'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid #202225'
    },
    modalTitle: {
        margin: 0,
        fontSize: '16px',
        fontWeight: '600',
        color: '#fff'
    },
    closeButton: {
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '4px',
        color: '#72767d',
        cursor: 'pointer'
    },
    modalBody: {
        padding: '20px',
        maxHeight: '60vh',
        overflowY: 'auto'
    },
    formGroup: {
        marginBottom: '16px',
        flex: 1
    },
    formRow: {
        display: 'flex',
        gap: '12px'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '12px',
        fontWeight: '600',
        color: '#b9bbbe',
        textTransform: 'uppercase'
    },
    input: {
        width: '100%',
        padding: '10px 12px',
        backgroundColor: '#202225',
        border: '1px solid #40444b',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px',
        outline: 'none',
        boxSizing: 'border-box'
    },
    textarea: {
        width: '100%',
        padding: '10px 12px',
        backgroundColor: '#202225',
        border: '1px solid #40444b',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px',
        outline: 'none',
        resize: 'vertical',
        fontFamily: 'inherit',
        boxSizing: 'border-box'
    },
    select: {
        width: '100%',
        padding: '10px 12px',
        backgroundColor: '#202225',
        border: '1px solid #40444b',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px',
        outline: 'none',
        cursor: 'pointer',
        boxSizing: 'border-box'
    },
    modalFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        padding: '16px 20px',
        borderTop: '1px solid #202225'
    },
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer'
    },
    submitButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer'
    }
};

export default NotificationScheduler;

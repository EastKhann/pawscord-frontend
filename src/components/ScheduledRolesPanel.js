// frontend/src/components/ScheduledRolesPanel.js - Scheduled Role Assignments
import React, { useState, useEffect } from 'react';
import {
    FaClock, FaTimes, FaPlus, FaUser, FaUserTag, FaCalendar,
    FaTrash, FaEdit, FaCheck, FaSearch, FaFilter, FaHistory,
    FaSync, FaExclamationTriangle, FaBell
} from 'react-icons/fa';
import toast from '../utils/toast';
import './ScheduledRolesPanel.css';
import confirmDialog from '../utils/confirmDialog';

const ScheduledRolesPanel = ({ serverId, apiBaseUrl, onClose }) => {
    const [activeTab, setActiveTab] = useState('scheduled'); // 'scheduled', 'history', 'create'
    const [schedules, setSchedules] = useState([]);
    const [roles, setRoles] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        user_id: '',
        role_id: '',
        action: 'add', // 'add' or 'remove'
        scheduled_at: '',
        reason: '',
        notify_user: true,
        repeat: 'none' // 'none', 'daily', 'weekly', 'monthly'
    });

    useEffect(() => {
        fetchSchedules();
        fetchRoles();
        fetchMembers();
    }, [serverId]);

    const fetchSchedules = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/roles/${serverId}/scheduled/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setSchedules(data.schedules || []);
            }
        } catch (error) {
            console.error('Fetch schedules error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/roles/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setRoles(data.roles || []);
            }
        } catch (error) {
            console.error('Fetch roles error:', error);
        }
    };

    const fetchMembers = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/members/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setMembers(data.members || []);
            }
        } catch (error) {
            console.error('Fetch members error:', error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!formData.user_id || !formData.role_id || !formData.scheduled_at) {
            toast.error('Lütfen tüm zorunlu alanları doldurun');
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/roles/${serverId}/schedule/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success('✅ Rol zamanlaması oluşturuldu');
                fetchSchedules();
                setActiveTab('scheduled');
                setFormData({
                    user_id: '',
                    role_id: '',
                    action: 'add',
                    scheduled_at: '',
                    reason: '',
                    notify_user: true,
                    repeat: 'none'
                });
            } else {
                const err = await response.json();
                toast.error(err.error || 'Zamanlama oluşturulamadı');
            }
        } catch (error) {
            console.error('Create schedule error:', error);
            toast.error('Zamanlama oluşturulurken hata oluştu');
        }
    };

    const handleDelete = async (scheduleId) => {
        if (!await confirmDialog('Bu zamanlamayı silmek istediğinize emin misiniz?')) return;

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/roles/scheduled/${scheduleId}/delete/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('🗑️ Zamanlama silindi');
                setSchedules(prev => prev.filter(s => s.id !== scheduleId));
            }
        } catch (error) {
            console.error('Delete schedule error:', error);
        }
    };

    const handleExecuteNow = async (scheduleId) => {
        if (!await confirmDialog('Bu zamanlamayı şimdi çalıştırmak istiyor musunuz?')) return;

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/roles/scheduled/${scheduleId}/execute/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('✅ Rol ataması yapıldı');
                fetchSchedules();
            }
        } catch (error) {
            console.error('Execute schedule error:', error);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: '#f59e0b',
            executed: '#10b981',
            failed: '#ef4444',
            cancelled: '#6b7280'
        };
        return colors[status] || '#6b7280';
    };

    const filteredSchedules = schedules.filter(s =>
        s.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.role_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pendingSchedules = filteredSchedules.filter(s => s.status === 'pending');
    const historySchedules = filteredSchedules.filter(s => s.status !== 'pending');

    return (
        <div className="scheduled-roles-overlay" onClick={onClose}>
            <div className="scheduled-roles-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaClock /> Zamanlanmış Rol Atamaları</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="panel-tabs">
                    <button
                        className={`tab ${activeTab === 'scheduled' ? 'active' : ''}`}
                        onClick={() => setActiveTab('scheduled')}
                    >
                        <FaClock /> Bekleyenler
                        {pendingSchedules.length > 0 && (
                            <span className="badge">{pendingSchedules.length}</span>
                        )}
                    </button>
                    <button
                        className={`tab ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        <FaHistory /> Geçmiş
                    </button>
                    <button
                        className={`tab ${activeTab === 'create' ? 'active' : ''}`}
                        onClick={() => setActiveTab('create')}
                    >
                        <FaPlus /> Yeni Zamanlama
                    </button>
                </div>

                <div className="panel-content">
                    {activeTab !== 'create' && (
                        <div className="search-bar">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Kullanıcı veya rol ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    )}

                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : activeTab === 'scheduled' ? (
                        <SchedulesList
                            schedules={pendingSchedules}
                            roles={roles}
                            onDelete={handleDelete}
                            onExecute={handleExecuteNow}
                            getStatusColor={getStatusColor}
                            showActions={true}
                        />
                    ) : activeTab === 'history' ? (
                        <SchedulesList
                            schedules={historySchedules}
                            roles={roles}
                            onDelete={handleDelete}
                            getStatusColor={getStatusColor}
                            showActions={false}
                        />
                    ) : (
                        <CreateScheduleForm
                            formData={formData}
                            setFormData={setFormData}
                            roles={roles}
                            members={members}
                            onSubmit={handleCreate}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

// Schedules List Component
const SchedulesList = ({ schedules, roles, onDelete, onExecute, getStatusColor, showActions }) => {
    if (schedules.length === 0) {
        return (
            <div className="no-schedules">
                <FaClock className="empty-icon" />
                <p>Zamanlama bulunamadı</p>
            </div>
        );
    }

    return (
        <div className="schedules-list">
            {schedules.map(schedule => (
                <div key={schedule.id} className="schedule-card">
                    <div className="schedule-header">
                        <div className="user-info">
                            <img
                                src={schedule.user_avatar || '/default-avatar.png'}
                                alt={schedule.username}
                                className="avatar"
                            />
                            <div>
                                <span className="username">{schedule.username}</span>
                                <span className={`action-badge ${schedule.action}`}>
                                    {schedule.action === 'add' ? '+ Rol Ekle' : '- Rol Kaldır'}
                                </span>
                            </div>
                        </div>
                        <span
                            className="status-badge"
                            style={{ background: getStatusColor(schedule.status) }}
                        >
                            {schedule.status}
                        </span>
                    </div>

                    <div className="schedule-details">
                        <div className="role-info">
                            <FaUserTag />
                            <span
                                className="role-name"
                                style={{ color: schedule.role_color || '#8b5cf6' }}
                            >
                                {schedule.role_name}
                            </span>
                        </div>

                        <div className="schedule-time">
                            <FaCalendar />
                            <span>{new Date(schedule.scheduled_at).toLocaleString('tr-TR')}</span>
                        </div>

                        {schedule.repeat !== 'none' && (
                            <div className="repeat-info">
                                <FaSync />
                                <span>
                                    {schedule.repeat === 'daily' && 'Her gün'}
                                    {schedule.repeat === 'weekly' && 'Her hafta'}
                                    {schedule.repeat === 'monthly' && 'Her ay'}
                                </span>
                            </div>
                        )}

                        {schedule.notify_user && (
                            <div className="notify-badge">
                                <FaBell /> Bildirim aktif
                            </div>
                        )}
                    </div>

                    {schedule.reason && (
                        <div className="schedule-reason">
                            <small>Sebep: {schedule.reason}</small>
                        </div>
                    )}

                    {showActions && schedule.status === 'pending' && (
                        <div className="schedule-actions">
                            <button
                                className="execute-btn"
                                onClick={() => onExecute(schedule.id)}
                                title="Şimdi Çalıştır"
                            >
                                <FaCheck /> Şimdi Uygula
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => onDelete(schedule.id)}
                                title="Sil"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    )}

                    {schedule.status === 'failed' && schedule.error_message && (
                        <div className="error-message">
                            <FaExclamationTriangle />
                            <span>{schedule.error_message}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// Create Schedule Form
const CreateScheduleForm = ({ formData, setFormData, roles, members, onSubmit }) => {
    const minDateTime = new Date().toISOString().slice(0, 16);

    return (
        <form className="schedule-form" onSubmit={onSubmit}>
            <div className="form-group">
                <label><FaUser /> Kullanıcı *</label>
                <select
                    value={formData.user_id}
                    onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                    required
                >
                    <option value="">Kullanıcı seçin</option>
                    {members.map(member => (
                        <option key={member.id} value={member.id}>
                            {member.username}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label><FaUserTag /> Rol *</label>
                <select
                    value={formData.role_id}
                    onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
                    required
                >
                    <option value="">Rol seçin</option>
                    {roles.map(role => (
                        <option
                            key={role.id}
                            value={role.id}
                            style={{ color: role.color }}
                        >
                            {role.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>İşlem</label>
                <div className="action-buttons">
                    <button
                        type="button"
                        className={`action-btn ${formData.action === 'add' ? 'active add' : ''}`}
                        onClick={() => setFormData({ ...formData, action: 'add' })}
                    >
                        <FaPlus /> Rol Ekle
                    </button>
                    <button
                        type="button"
                        className={`action-btn ${formData.action === 'remove' ? 'active remove' : ''}`}
                        onClick={() => setFormData({ ...formData, action: 'remove' })}
                    >
                        <FaTimes /> Rol Kaldır
                    </button>
                </div>
            </div>

            <div className="form-group">
                <label><FaCalendar /> Tarih ve Saat *</label>
                <input
                    type="datetime-local"
                    value={formData.scheduled_at}
                    onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                    min={minDateTime}
                    required
                />
            </div>

            <div className="form-group">
                <label><FaSync /> Tekrar</label>
                <select
                    value={formData.repeat}
                    onChange={(e) => setFormData({ ...formData, repeat: e.target.value })}
                >
                    <option value="none">Tekrar Etme</option>
                    <option value="daily">Her Gün</option>
                    <option value="weekly">Her Hafta</option>
                    <option value="monthly">Her Ay</option>
                </select>
            </div>

            <div className="form-group">
                <label>Sebep</label>
                <input
                    type="text"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="Neden bu zamanlama yapılıyor?"
                />
            </div>

            <div className="form-group checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        checked={formData.notify_user}
                        onChange={(e) => setFormData({ ...formData, notify_user: e.target.checked })}
                    />
                    <FaBell /> Kullanıcıya bildirim gönder
                </label>
            </div>

            <button type="submit" className="submit-btn">
                <FaPlus /> Zamanlama Oluştur
            </button>
        </form>
    );
};

export default ScheduledRolesPanel;

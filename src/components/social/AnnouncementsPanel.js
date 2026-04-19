/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useCallback, memo } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import './AnnouncementsPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
const AnnouncementsPanel = ({ serverId, onClose }) => {
    const { t } = useTranslation();
    const apiBaseUrl = getApiBase();

    const [announcements, setAnnouncements] = useState([]);
    const [channels, setChannels] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: '',
        content: '',
        channel_id: '',
        mention_role_id: '',
        schedule_time: '',
        embed: false,
        embed_color: '#5865f2',
        repeat: 'once',
    });

    useEffect(() => {
        fetchAnnouncements();
        fetchChannels();
        fetchRoles();
    }, [serverId]);

    const fetchAnnouncements = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/announcements/server/${serverId}/`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                const data = await response.json();
                setAnnouncements(data);
            }
        } catch (error) {
            logger.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChannels = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                const data = await response.json();
                setChannels(data.filter((ch) => ch.type === 'text'));
            }
        } catch (error) {
            logger.error('Error:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/roles/server/${serverId}/`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                const data = await response.json();
                setRoles(data);
            }
        } catch (error) {
            logger.error('Error:', error);
        }
    };

    const createAnnouncement = async () => {
        if (!newAnnouncement.title || !newAnnouncement.content || !newAnnouncement.channel_id) {
            toast.error(t('ui.please_gerekli_alanlari_doldurun_3'));
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/announcements/create/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ server_id: serverId, ...newAnnouncement }),
            });

            if (response.ok) {
                toast.success(t('announcements.created'));
                setShowCreateModal(false);
                fetchAnnouncements();
                setNewAnnouncement({
                    title: '',
                    content: '',
                    channel_id: '',
                    mention_role_id: '',
                    schedule_time: '',
                    embed: false,
                    embed_color: '#5865f2',
                    repeat: 'once',
                });
            } else {
                toast.error(t('ui.duyuru_olusturulamadi'));
            }
        } catch (error) {
            toast.error(t('common.connectionError'));
        }
    };

    const sendNow = async (id) => {
        try {
            const response = await fetch(`${apiBaseUrl}/announcements/${id}/send/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                toast.success(t('announcements.sent'));
                fetchAnnouncements();
            }
        } catch (error) {
            toast.error(t('ui.sendim_hatasi_3'));
        }
    };

    const deleteAnnouncement = async (id) => {
        if (!(await confirmDialog('Bu duyuruyu silmek istediğinizden emin misiniz?'))) return;
        try {
            const response = await fetch(`${apiBaseUrl}/announcements/${id}/delete/`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                toast.success(t('announcements.deleted'));
                fetchAnnouncements();
            }
        } catch (error) {
            toast.error(t('common.deleteFailed'));
        }
    };

    // 🎯 Performance: Memoized event handlers
    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleShowCreateModal = useCallback(() => setShowCreateModal(true), []);
    const handleHideCreateModal = useCallback(() => setShowCreateModal(false), []);
    const handleTitleChange = useCallback(
        (e) => setNewAnnouncement((prev) => ({ ...prev, title: e.target.value })),
        []
    );
    const handleContentChange = useCallback(
        (e) => setNewAnnouncement((prev) => ({ ...prev, content: e.target.value })),
        []
    );
    const handleChannelChange = useCallback(
        (e) => setNewAnnouncement((prev) => ({ ...prev, channel_id: e.target.value })),
        []
    );
    const handleMentionChange = useCallback(
        (e) => setNewAnnouncement((prev) => ({ ...prev, mention_role_id: e.target.value })),
        []
    );
    const handleScheduleChange = useCallback(
        (e) => setNewAnnouncement((prev) => ({ ...prev, schedule_time: e.target.value })),
        []
    );
    const handleRepeatChange = useCallback(
        (e) => setNewAnnouncement((prev) => ({ ...prev, repeat: e.target.value })),
        []
    );
    const handleEmbedToggle = useCallback(
        (e) => setNewAnnouncement((prev) => ({ ...prev, embed: e.target.checked })),
        []
    );

    return (
        <div
            className="announcements-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="announcements-panel"
                role="button"
                tabIndex={0}
                onClick={handleStopPropagation}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="announcements-header">
                    <h2>📢 Announcements</h2>
                    <button aria-label="Close" className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="announcements-content">
                    <button
                        aria-label="handle Show Create Modal"
                        className="create-announcement-btn"
                        onClick={handleShowCreateModal}
                    >
                        + Yeni Duyuru Oluştur
                    </button>

                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>{t('common.loading')}</p>
                        </div>
                    ) : announcements.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">📢</span>
                            <p>Henüz duyuru yok</p>
                        </div>
                    ) : (
                        <div className="announcements-list">
                            {announcements.map((ann) => (
                                <div key={ann.id} className="announcement-card">
                                    <h3>{ann.title}</h3>
                                    <p>{ann.content}</p>
                                    <div className="announcement-meta">
                                        <span>
                                            📍 {channels.find((c) => c.id === ann.channel_id)?.name}
                                        </span>
                                        {ann.schedule_time && (
                                            <span>
                                                ⏰{' '}
                                                {new Date(ann.schedule_time).toLocaleString(
                                                    'tr-TR'
                                                )}
                                            </span>
                                        )}
                                        {ann.repeat !== 'once' && <span>🔄 {ann.repeat}</span>}
                                    </div>
                                    <div className="announcement-actions">
                                        <button
                                            aria-label="📤 Şimdi Gönder"
                                            onClick={() => sendNow(ann.id)}
                                        >
                                            📤 Şimdi Gönder
                                        </button>
                                        <button
                                            aria-label="🗑️ Delete"
                                            onClick={() => deleteAnnouncement(ann.id)}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {showCreateModal && (
                    <div
                        className="create-modal-overlay"
                        role="button"
                        tabIndex={0}
                        onClick={handleHideCreateModal}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                        <div
                            className="create-modal"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Create Announcement"
                            onClick={handleStopPropagation}
                        >
                            <div className="modal-header">
                                <h3>Yeni Duyuru</h3>
                                <button
                                    aria-label="Close"
                                    className="close-btn"
                                    onClick={handleHideCreateModal}
                                >
                                    ×
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Title *</label>
                                    <input
                                        value={newAnnouncement.title}
                                        onChange={handleTitleChange}
                                        aria-label="input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Content *</label>
                                    <textarea
                                        value={newAnnouncement.content}
                                        onChange={handleContentChange}
                                        rows="4"
                                        aria-label="textarea"
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Channel *</label>
                                        <select
                                            value={newAnnouncement.channel_id}
                                            onChange={handleChannelChange}
                                            aria-label="select"
                                        >
                                            <option value="">Selectin</option>
                                            {channels.map((ch) => (
                                                <option key={ch.id} value={ch.id}>
                                                    {ch.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Bahset</label>
                                        <select
                                            value={newAnnouncement.mention_role_id}
                                            onChange={handleMentionChange}
                                            aria-label="select"
                                        >
                                            <option value="">Role yok</option>
                                            {roles.map((r) => (
                                                <option key={r.id} value={r.id}>
                                                    @{r.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Zamanlama</label>
                                        <input
                                            type="datetime-local"
                                            value={newAnnouncement.schedule_time}
                                            onChange={handleScheduleChange}
                                            aria-label="datetime-local"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Tekrar</label>
                                        <select
                                            value={newAnnouncement.repeat}
                                            onChange={handleRepeatChange}
                                            aria-label="select"
                                        >
                                            <option value="once">Bir kez</option>
                                            <option value="daily">Günlük</option>
                                            <option value="weekly">Haftalık</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={newAnnouncement.embed}
                                            onChange={handleEmbedToggle}
                                            aria-label="checkbox"
                                        />
                                        <span>Embed olarak gönder</span>
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    aria-label="handle Hide Create Modal"
                                    className="cancel-btn"
                                    onClick={handleHideCreateModal}
                                >
                                    {t('common.cancel')}
                                </button>
                                <button
                                    aria-label="create Announcement"
                                    className="submit-btn"
                                    onClick={createAnnouncement}
                                >
                                    📢 Oluştur
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

AnnouncementsPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default memo(AnnouncementsPanel);

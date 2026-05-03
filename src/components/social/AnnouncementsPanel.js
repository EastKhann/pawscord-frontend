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
        if (!(await confirmDialog(t('announcements.deleteConfirm', 'Are you sure you want to delete this announcement?')))) return;
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
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="announcements-content">
                    <button
                        aria-label={t('announcements.create', 'Create announcement')}
                        className="create-announcement-btn"
                        onClick={handleShowCreateModal}
                    >
                        {t('announcements.create', '+ Create New Announcement')}
                    </button>

                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>{t('common.loading')}</p>
                        </div>
                    ) : announcements.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">📢</span>
                            <p>{t('announcements.none', 'No announcements yet')}</p>
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
                                            aria-label={t('announcements.send', 'Send Now')}
                                            onClick={() => sendNow(ann.id)}
                                        >
                                            {t('announcements.send', 'Send Now')}
                                        </button>
                                        <button
                                            aria-label={t('common.delete', 'Delete')}
                                            onClick={() => deleteAnnouncement(ann.id)}
                                        >
                                            🗑️ {t('common.delete', 'Delete')}
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
                            aria-label={t('announcements.createModal', 'Create announcement')}
                            onClick={handleStopPropagation}
                        >
                            <div className="modal-header">
                                <h3>Yeni Duyuru</h3>
                                <button
                                    aria-label={t('common.close', 'Close')}
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
                                        aria-label={t('announcements.titleInput', 'Announcement title')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Content *</label>
                                    <textarea
                                        value={newAnnouncement.content}
                                        onChange={handleContentChange}
                                        rows="4"
                                        aria-label={t('announcements.contentInput', 'Announcement content')}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Channel *</label>
                                        <select
                                            value={newAnnouncement.channel_id}
                                            onChange={handleChannelChange}
                                            aria-label={t('announcements.channelSelect', 'Select channel')}
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
                                            aria-label={t('announcements.mentionSelect', 'Select role to mention')}
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
                                            aria-label={t('announcements.scheduleInput', 'Schedule date and time')}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Tekrar</label>
                                        <select
                                            value={newAnnouncement.repeat}
                                            onChange={handleRepeatChange}
                                            aria-label={t('announcements.repeatSelect', 'Repeat schedule')}
                                        >
                                            <option value="once">{t('common.once', 'Once')}</option>
                                            <option value="daily">{t('common.daily', 'Daily')}</option>
                                            <option value="weekly">{t('common.weekly', 'Weekly')}</option>
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
                                            aria-label={t('announcements.sendAsEmbed', 'Send as embed')}
                                        />
                                        <span>{t('announcements.sendAsEmbed', 'Send as embed')}</span>
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    aria-label={t('common.cancel', 'Cancel')}
                                    className="cancel-btn"
                                    onClick={handleHideCreateModal}
                                >
                                    {t('common.cancel')}
                                </button>
                                <button
                                    aria-label={t('announcements.create', 'Create announcement')}
                                    className="submit-btn"
                                    onClick={createAnnouncement}
                                >
                                    {t('announcements.send', '📢 Create')}
                                </button>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </div >
    );
};

AnnouncementsPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default memo(AnnouncementsPanel);

import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaBullhorn, FaCalendar, FaTrash, FaPlus } from 'react-icons/fa';
import useScheduledAnnouncements from '../ScheduledAnnouncementsPanel/useScheduledAnnouncements';
import { styles } from '../ScheduledAnnouncementsPanel/scheduledAnnouncementsStyles';
import AnnouncementForm from '../ScheduledAnnouncementsPanel/AnnouncementForm';

import { useTranslation } from 'react-i18next';

// -- dynamic style helpers (pass 2) --
const _st1181 = {
    width: '4px',
    backgroundColor: '#5865f2',
    borderRadius: '4px',
    minHeight: '60px',
};

const ScheduledAnnouncementsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const a = useScheduledAnnouncements(fetchWithAuth, apiBaseUrl);

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.modal}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaBullhorn className="icon-primary-24" />
                        <h2 className="m0-fs20">Zamanlanmış Duyurular</h2>
                    </div>
                    <div style={styles.headerRight}>
                        {!a.showCreateForm && (
                            <button
                                aria-label="Create"
                                onClick={() => a.setShowCreateForm(true)}
                                style={styles.addBtn}
                            >
                                <FaPlus /> Yeni Zamanla
                            </button>
                        )}
                        <button aria-label="Close" onClick={onClose} style={styles.closeBtn}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div style={styles.content}>
                    {a.showCreateForm ? (
                        <AnnouncementForm {...a} />
                    ) : a.loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : a.announcements.length === 0 ? (
                        <div style={styles.empty}>
                            <FaBullhorn className="icon-48-949-mb16" />
                            <p>Zamanlanmış duyuru yok</p>
                            <p className="text-949-14">Başlatmak için ilk duyurunuzu zamanlayın</p>
                        </div>
                    ) : (
                        <div style={styles.announcementsList}>
                            {a.announcements.map((ann) => (
                                <div key={ann.id} style={styles.announcementCard}>
                                    <div style={_st1181} />
                                    <div style={styles.announcementContent}>
                                        <h3 style={styles.announcementTitle}>{ann.title}</h3>
                                        <p style={styles.announcementMessage}>{ann.message}</p>
                                        <div style={styles.announcementMeta}>
                                            <span>
                                                <FaCalendar />{' '}
                                                {new Date(ann.scheduled_at).toLocaleString()}
                                            </span>
                                            {ann.recurring && (
                                                <>
                                                    <span className="m-0-8">•</span>
                                                    <span>🔁 {ann.recurring_type}</span>
                                                </>
                                            )}
                                            {ann.channel_id && (
                                                <>
                                                    <span className="m-0-8">•</span>
                                                    <span>📺 Channel: {ann.channel_id}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div style={styles.announcementActions}>
                                        <button
                                            aria-label="Delete"
                                            onClick={() => a.deleteAnnouncement(ann.id)}
                                            style={styles.deleteIconBtn}
                                            title={t('common.delete')}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

ScheduledAnnouncementsPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    serverId: PropTypes.string,
};
export default ScheduledAnnouncementsPanel;

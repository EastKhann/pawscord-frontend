import { FaTimes, FaBullhorn, FaCalendar, FaTrash, FaPlus } from 'react-icons/fa';
import useScheduledAnnouncements from './ScheduledAnnouncementsPanel/useScheduledAnnouncements';
import { styles } from './ScheduledAnnouncementsPanel/scheduledAnnouncementsStyles';
import AnnouncementForm from './ScheduledAnnouncementsPanel/AnnouncementForm';

const ScheduledAnnouncementsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const a = useScheduledAnnouncements(fetchWithAuth, apiBaseUrl);

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaBullhorn style={{ fontSize: '24px', color: '#5865f2' }} />
                        <h2 style={{ margin: 0, fontSize: '20px' }}>Scheduled Announcements</h2>
                    </div>
                    <div style={styles.headerRight}>
                        {!a.showCreateForm && (
                            <button onClick={() => a.setShowCreateForm(true)} style={styles.addBtn}>
                                <FaPlus /> Schedule New
                            </button>
                        )}
                        <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                    </div>
                </div>

                <div style={styles.content}>
                    {a.showCreateForm ? (
                        <AnnouncementForm {...a} />
                    ) : a.loading ? (
                        <div style={styles.loading}>Loading...</div>
                    ) : a.announcements.length === 0 ? (
                        <div style={styles.empty}>
                            <FaBullhorn style={{ fontSize: '48px', color: '#99aab5', marginBottom: '16px' }} />
                            <p>No scheduled announcements</p>
                            <p style={{ fontSize: '14px', color: '#99aab5' }}>Schedule your first announcement to get started</p>
                        </div>
                    ) : (
                        <div style={styles.announcementsList}>
                            {a.announcements.map(ann => (
                                <div key={ann.id} style={styles.announcementCard}>
                                    <div style={{ ...styles.statusIndicator, backgroundColor: a.getStatusColor(ann.scheduled_at) }} />
                                    <div style={styles.announcementContent}>
                                        <h3 style={styles.announcementTitle}>{ann.title}</h3>
                                        <p style={styles.announcementMessage}>{ann.message}</p>
                                        <div style={styles.announcementMeta}>
                                            <span><FaCalendar /> {new Date(ann.scheduled_at).toLocaleString()}</span>
                                            {ann.recurring && (
                                                <><span style={{ margin: '0 8px' }}>{'\u2022'}</span><span>{'\ud83d\udd01'} {ann.recurring_type}</span></>
                                            )}
                                            {ann.channel_id && (
                                                <><span style={{ margin: '0 8px' }}>{'\u2022'}</span><span>{'\ud83d\udcfa'} Channel: {ann.channel_id}</span></>
                                            )}
                                        </div>
                                    </div>
                                    <div style={styles.announcementActions}>
                                        <button onClick={() => a.deleteAnnouncement(ann.id)} style={styles.deleteIconBtn} title="Delete">
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

export default ScheduledAnnouncementsPanel;

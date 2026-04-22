import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaLink, FaMousePointer, FaDownload } from 'react-icons/fa';
import { toast } from '../../utils/toast';
import { useTranslation } from 'react-i18next';

const LinkClickTrackingPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
    const { t } = useTranslation();
    const [linkStats, setLinkStats] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchLinkStats();
    }, [roomSlug]);

    const fetchLinkStats = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/links/stats/?room=${roomSlug}`);
            const data = await response.json();
            setLinkStats(data.stats || []);
        } catch (error) {
            toast.error(t('linkTracking.loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const exportStats = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/links/export/?room=${roomSlug}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `link_stats_${new Date().toISOString()}.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            toast.success(t('linkTracking.exported'));
        } catch (error) {
            toast.error(t('linkTracking.exportFailed'));
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaLink className="icon-primary-mr10" />
                        <h2 style={styles.title}>{t('linkTracking.title', 'Link Click Tracking')}</h2>
                    </div>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.toolbar}>
                    <button
                        aria-label={t('linkTracking.exportStats', 'Export link statistics')}
                        onClick={exportStats}
                        style={styles.exportButton}
                    >
                        <FaDownload className="mr-5" />
                        CSV'ye Aktar
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('linkTracking.loading', 'Loading link statistics...')}</div>
                    ) : linkStats.length === 0 ? (
                        <div style={styles.empty}>{t('linkTracking.noData', 'No click data found')}</div>
                    ) : (
                        <div style={styles.statsTable}>
                            {linkStats.map((stat, idx) => (
                                <div key={`item-${idx}`} style={styles.statRow}>
                                    <div style={styles.linkInfo}>
                                        <FaMousePointer className="primary-mr10" />
                                        <div className="flex-1">
                                            <div style={styles.linkUrl}>{stat.url}</div>
                                            <div style={styles.linkMeta}>
                                                Shared by {stat.user?.username} on{' '}
                                                {new Date(stat.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={styles.clickCount}>{stat.click_count} clicks</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #0e1222',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#949ba4',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    toolbar: {
        padding: '15px 20px',
        borderBottom: '1px solid #0e1222',
    },
    exportButton: {
        padding: '8px 16px',
        backgroundColor: '#23a559',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    loading: {
        textAlign: 'center',
        color: '#949ba4',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#949ba4',
        padding: '40px',
    },
    statsTable: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    statRow: {
        backgroundColor: '#111214',
        borderRadius: '6px',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    linkInfo: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
    },
    linkUrl: {
        fontSize: '14px',
        color: '#5865f2',
        fontWeight: '500',
        wordBreak: 'break-all',
        marginBottom: '4px',
    },
    linkMeta: {
        fontSize: '12px',
        color: '#949ba4',
    },
    clickCount: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#ffffff',
        minWidth: '100px',
        textAlign: 'right',
    },
};

LinkClickTrackingPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    roomSlug: PropTypes.string,
};
export default LinkClickTrackingPanel;

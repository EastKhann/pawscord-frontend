import React, { useState, useEffect } from 'react';
import { FaTimes, FaLink, FaMousePointer, FaDownload } from 'react-icons/fa';
import { toast } from '../utils/toast';

const LinkClickTrackingPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
    const [linkStats, setLinkStats] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchLinkStats();
    }, [roomSlug]);

    const fetchLinkStats = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/links/stats/?room=${roomSlug}`);
            const data = await response.json();
            setLinkStats(data.stats || []);
        } catch (error) {
            toast.error('Failed to load link stats');
        } finally {
            setLoading(false);
        }
    };

    const exportStats = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/links/export/?room=${roomSlug}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `link_stats_${new Date().toISOString()}.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            toast.success('Stats exported successfully');
        } catch (error) {
            toast.error('Failed to export stats');
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaLink style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Link Click Tracking</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.toolbar}>
                    <button onClick={exportStats} style={styles.exportButton}>
                        <FaDownload style={{ marginRight: '5px' }} />
                        Export CSV
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading link stats...</div>
                    ) : linkStats.length === 0 ? (
                        <div style={styles.empty}>No link click data available</div>
                    ) : (
                        <div style={styles.statsTable}>
                            {linkStats.map((stat, idx) => (
                                <div key={idx} style={styles.statRow}>
                                    <div style={styles.linkInfo}>
                                        <FaMousePointer style={{ color: '#5865f2', marginRight: '10px' }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={styles.linkUrl}>{stat.url}</div>
                                            <div style={styles.linkMeta}>
                                                Shared by {stat.user?.username} on {new Date(stat.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={styles.clickCount}>
                                        {stat.click_count} clicks
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
        borderBottom: '1px solid #2c2f33',
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
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    toolbar: {
        padding: '15px 20px',
        borderBottom: '1px solid #2c2f33',
    },
    exportButton: {
        padding: '8px 16px',
        backgroundColor: '#43b581',
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
        color: '#99aab5',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    statsTable: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    statRow: {
        backgroundColor: '#2c2f33',
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
        color: '#99aab5',
    },
    clickCount: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#ffffff',
        minWidth: '100px',
        textAlign: 'right',
    },
};

export default LinkClickTrackingPanel;

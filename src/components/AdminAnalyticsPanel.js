// frontend/src/components/AdminAnalyticsPanel.js
import { useState, useEffect } from 'react';
import { FaChartLine, FaUsers, FaCrown, FaServer, FaDownload, FaTimes } from 'react-icons/fa';
import OverviewTab from './AdminAnalyticsPanel/OverviewTab';
import UsersTab from './AdminAnalyticsPanel/UsersTab';
import PremiumTab from './AdminAnalyticsPanel/PremiumTab';
import ServersTab from './AdminAnalyticsPanel/ServersTab';
import styles from './AdminAnalyticsPanel/styles';

const AdminAnalyticsPanel = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/admin/analytics/`);
            if (response.ok) setStats(await response.json());
        } catch (error) {
            console.error('Analytics fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const exportData = () => {
        if (!stats) return;
        const dataBlob = new Blob([JSON.stringify(stats, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `analytics_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    };

    if (loading) return (
        <div style={styles.overlay}><div style={styles.modal}><div style={styles.loading}>Y\u00FCkleniyor...</div></div></div>
    );
    if (!stats) return (
        <div style={styles.overlay}><div style={styles.modal}><div style={styles.error}>Analytics verisi y\u00FCklenemedi</div></div></div>
    );

    const TABS = [
        { key: 'overview', icon: <FaChartLine />, label: 'Genel' },
        { key: 'users', icon: <FaUsers />, label: 'Kullan\u0131c\u0131lar' },
        { key: 'premium', icon: <FaCrown />, label: 'Premium' },
        { key: 'servers', icon: <FaServer />, label: 'Sunucular' }
    ];

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaChartLine size={24} />
                        <h2 style={styles.title}>Admin Analytics</h2>
                    </div>
                    <div style={styles.headerRight}>
                        <button onClick={exportData} style={styles.exportButton} title="Export JSON"><FaDownload /></button>
                        <button onClick={onClose} style={styles.closeButton}><FaTimes /></button>
                    </div>
                </div>

                <div style={styles.tabs}>
                    {TABS.map(t => (
                        <button key={t.key} onClick={() => setActiveTab(t.key)}
                            style={{ ...styles.tab, ...(activeTab === t.key && styles.activeTab) }}>
                            {t.icon} {t.label}
                        </button>
                    ))}
                </div>

                <div style={styles.content}>
                    {activeTab === 'overview' && <OverviewTab stats={stats} />}
                    {activeTab === 'users' && <UsersTab stats={stats} />}
                    {activeTab === 'premium' && <PremiumTab stats={stats} />}
                    {activeTab === 'servers' && <ServersTab stats={stats} />}
                </div>
            </div>
        </div>
    );
};

export default AdminAnalyticsPanel;
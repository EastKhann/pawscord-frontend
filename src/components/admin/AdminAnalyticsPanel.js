// frontend/src/components/AdminAnalyticsPanel.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaChartLine, FaUsers, FaCrown, FaServer, FaDownload, FaTimes } from 'react-icons/fa';
import OverviewTab from '../AdminAnalyticsPanel/OverviewTab';
import UsersTab from '../AdminAnalyticsPanel/UsersTab';
import PremiumTab from '../AdminAnalyticsPanel/PremiumTab';
import ServersTab from '../AdminAnalyticsPanel/ServersTab';
import styles from '../AdminAnalyticsPanel/styles';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const AdminAnalyticsPanel = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
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
            logger.error('Analytics fetch error:', error);
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

    if (loading)
        return (
            <div style={styles.overlay}>
                <div style={styles.modal}>
                    <div style={styles.loading}>{t('common.loading')}</div>
                </div>
            </div>
        );
    if (!stats)
        return (
            <div style={styles.overlay}>
                <div style={styles.modal}>
                    <div style={styles.error}>{t('adminAnalytics.loadError','Failed to load analytics data')}</div>
                </div>
            </div>
        );

    const TABS = [
        { key: 'overview', icon: <FaChartLine />, label: 'General' },
        { key: 'users', icon: <FaUsers />, label: 'Users' },
        { key: 'premium', icon: <FaCrown />, label: 'Premium' },
        { key: 'servers', icon: <FaServer />, label: 'Servers' },
    ];

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
                        <FaChartLine size={24} />
                        <h2 style={styles.title}>Admin Analitik</h2>
                    </div>
                    <div style={styles.headerRight}>
                        <button
                            onClick={exportData}
                            style={styles.exportButton}
                            title={t('admin.exportAsJson', 'Export as JSON')}
                            aria-label={t('admin.exportAsJson', 'Export as JSON')}
                        >
                            <FaDownload />
                        </button>
                        <button aria-label={t('common.close')} onClick={onClose} style={styles.closeButton}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div style={styles.tabs}>
                    {TABS.map((t) => (
                        <button
                            aria-label={t.label}
                            key={t.key}
                            onClick={() => setActiveTab(t.key)}
                            style={{ ...styles.tab, ...(activeTab === t.key && styles.activeTab) }}
                        >
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

AdminAnalyticsPanel.propTypes = {
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default AdminAnalyticsPanel;

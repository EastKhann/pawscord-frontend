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

        fetchStats();
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, [fetchWithAuth, apiBaseUrl]);

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
                    <div style={styles.error}>{t('adminAnalytics.loadError', 'Failed to load analytics data')}</div>
                </div>
            </div>
        );

    const TABS = [
        { key: 'overview', icon: <FaChartLine />, labelKey: 'admin.overviewTab', label: 'General' },
        { key: 'users', icon: <FaUsers />, labelKey: 'admin.usersTab', label: 'Users' },
        { key: 'premium', icon: <FaCrown />, labelKey: 'admin.premiumTab', label: 'Premium' },
        { key: 'servers', icon: <FaServer />, labelKey: 'admin.serversTab', label: 'Servers' },
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
                        <h2 style={styles.title}>{t('admin.analytics', 'Admin Analitik')}</h2>
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
                    {TABS.map((tab) => (
                        <button
                            aria-label={t(tab.labelKey, tab.label)}
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            style={{ ...styles.tab, ...(activeTab === tab.key && styles.activeTab) }}
                        >
                            {tab.icon} {t(tab.labelKey, tab.label)}
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

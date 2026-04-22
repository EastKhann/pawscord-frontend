// frontend/src/components/SpamDetectionPanel.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaShieldAlt, FaRobot, FaChartBar, FaCog, FaHistory } from 'react-icons/fa';
import useSpamDetection from '../SpamDetectionPanel/hooks/useSpamDetection';
import OverviewTab from '../SpamDetectionPanel/OverviewTab';
import SettingsTab from '../SpamDetectionPanel/SettingsTab';
import LogsTab from '../SpamDetectionPanel/LogsTab';
import styles from '../SpamDetectionPanel/styles';
import { useTranslation } from 'react-i18next';

const SpamDetectionPanel = ({ serverId, fetchWithAuth, apiBaseUrl, isAdmin = false }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const api = useSpamDetection({ serverId, fetchWithAuth, apiBaseUrl });

    if (api.loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <FaRobot className="pulse" size={32} color="#5865f2" />
                    <span>{t('spamDetect.loading', 'Loading spam protection system...')}</span>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaShieldAlt size={24} color="#23a559" />
                    <div>
                        <h2 style={styles.title}>Spam Koruma Sistemi</h2>
                        <p style={styles.subtitle}>{t('spamDetect.subtitle', 'ML-based intelligent spam detection')}</p>
                    </div>
                </div>
                <div style={styles.headerRight}>
                    <div
                        style={{
                            ...styles.statusBadge,
                            backgroundColor: api.settings.enabled
                                ? 'rgba(67, 181, 129, 0.2)'
                                : 'rgba(240, 71, 71, 0.2)',
                            color: api.settings.enabled ? '#23a559' : '#f23f42',
                        }}
                    >
                        {api.settings.enabled ? '✓ Active' : '✗ Closed'}
                    </div>
                </div>
            </div>

            <div style={styles.tabs}>
                {['overview', 'settings', 'logs'].map((tab) => (
                    <button
                        aria-label={t('spamDetection.viewDetails', 'View details')}
                        key={tab}
                        style={{
                            ...styles.tab,
                            backgroundColor: api.activeTab === tab ? '#5865f2' : 'transparent',
                            color: api.activeTab === tab ? '#fff' : '#b5bac1',
                        }}
                        onClick={() => api.setActiveTab(tab)}
                    >
                        {tab === 'overview' && <FaChartBar />}
                        {tab === 'settings' && <FaCog />}
                        {tab === 'logs' && <FaHistory />}
                        {tab === 'overview'
                            ? t('ui.general_bakis')
                            : tab === 'settings'
                                ? 'Ayarlar'
                                : 'Records'}
                    </button>
                ))}
            </div>

            {api.activeTab === 'overview' && (
                <OverviewTab stats={api.stats} settings={api.settings} />
            )}
            {api.activeTab === 'settings' && (
                <SettingsTab
                    settings={api.settings}
                    isAdmin={isAdmin}
                    onSensitivityChange={api.handleSensitivityChange}
                    onPatternToggle={api.handlePatternToggle}
                    onActionToggle={api.handleActionToggle}
                    onToggleEnabled={api.toggleEnabled}
                    onSave={api.saveSettings}
                />
            )}
            {api.activeTab === 'logs' && <LogsTab stats={api.stats} />}
        </div>
    );
};

SpamDetectionPanel.propTypes = {
    serverId: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    isAdmin: PropTypes.bool,
};
export default SpamDetectionPanel;

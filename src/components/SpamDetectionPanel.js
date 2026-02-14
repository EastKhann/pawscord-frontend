// frontend/src/components/SpamDetectionPanel.js
import { FaShieldAlt, FaRobot, FaChartBar, FaCog, FaHistory } from 'react-icons/fa';
import useSpamDetection from './SpamDetectionPanel/hooks/useSpamDetection';
import OverviewTab from './SpamDetectionPanel/OverviewTab';
import SettingsTab from './SpamDetectionPanel/SettingsTab';
import LogsTab from './SpamDetectionPanel/LogsTab';
import styles from './SpamDetectionPanel/styles';

const SpamDetectionPanel = ({ serverId, fetchWithAuth, apiBaseUrl, isAdmin = false }) => {
    const api = useSpamDetection({ serverId, fetchWithAuth, apiBaseUrl });

    if (api.loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <FaRobot className="pulse" size={32} color="#5865f2" />
                    <span>Spam koruma sistemi yükleniyor...</span>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaShieldAlt size={24} color="#43b581" />
                    <div>
                        <h2 style={styles.title}>Spam Koruma Sistemi</h2>
                        <p style={styles.subtitle}>ML tabanlı akıllı spam algılama</p>
                    </div>
                </div>
                <div style={styles.headerRight}>
                    <div style={{
                        ...styles.statusBadge,
                        backgroundColor: api.settings.enabled ? 'rgba(67, 181, 129, 0.2)' : 'rgba(240, 71, 71, 0.2)',
                        color: api.settings.enabled ? '#43b581' : '#f04747'
                    }}>
                        {api.settings.enabled ? '✓ Aktif' : '✗ Kapalı'}
                    </div>
                </div>
            </div>

            <div style={styles.tabs}>
                {['overview', 'settings', 'logs'].map(tab => (
                    <button key={tab}
                        style={{ ...styles.tab, backgroundColor: api.activeTab === tab ? '#5865f2' : 'transparent', color: api.activeTab === tab ? '#fff' : '#b9bbbe' }}
                        onClick={() => api.setActiveTab(tab)}
                    >
                        {tab === 'overview' && <FaChartBar />}
                        {tab === 'settings' && <FaCog />}
                        {tab === 'logs' && <FaHistory />}
                        {tab === 'overview' ? 'Genel Bakış' : tab === 'settings' ? 'Ayarlar' : 'Kayıtlar'}
                    </button>
                ))}
            </div>

            {api.activeTab === 'overview' && <OverviewTab stats={api.stats} settings={api.settings} />}
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

export default SpamDetectionPanel;
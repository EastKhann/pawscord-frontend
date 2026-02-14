import { FaTimes, FaRobot, FaCode } from 'react-icons/fa';
import useOAuthApps from './OAuthAppsPanel/useOAuthApps';
import { styles } from './OAuthAppsPanel/oauthStyles';
import AppsTab from './OAuthAppsPanel/AppsTab';
import BotsTab from './OAuthAppsPanel/BotsTab';

const OAuthAppsPanel = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const o = useOAuthApps(fetchWithAuth, apiBaseUrl);

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaRobot style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Developer Portal</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}><FaTimes /></button>
                </div>

                <div style={styles.tabs}>
                    <button onClick={() => o.setActiveTab('apps')}
                        style={{ ...styles.tab, ...(o.activeTab === 'apps' && styles.tabActive) }}>
                        <FaCode style={{ marginRight: '5px' }} /> OAuth Apps ({o.apps.length})
                    </button>
                    <button onClick={() => o.setActiveTab('bots')}
                        style={{ ...styles.tab, ...(o.activeTab === 'bots' && styles.tabActive) }}>
                        <FaRobot style={{ marginRight: '5px' }} /> Bots ({o.bots.length})
                    </button>
                </div>

                <div style={styles.content}>
                    {o.loading ? (
                        <div style={styles.loading}>Loading...</div>
                    ) : o.activeTab === 'apps' ? (
                        <AppsTab o={o} />
                    ) : (
                        <BotsTab o={o} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default OAuthAppsPanel;

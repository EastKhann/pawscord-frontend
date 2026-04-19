import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaRobot, FaCode } from 'react-icons/fa';
import useOAuthApps from '../OAuthAppsPanel/useOAuthApps';
import { styles } from '../OAuthAppsPanel/oauthStyles';
import AppsTab from '../OAuthAppsPanel/AppsTab';
import BotsTab from '../OAuthAppsPanel/BotsTab';
import { useTranslation } from 'react-i18next';

// -- dynamic style helpers (pass 2) --

const _st1161 = {
    padding: '12px 20px',
    backgroundColor: '#111214',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: '#dbdee1',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
};
const _st1162 = {
    padding: '12px 20px',
    backgroundColor: '#111214',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: '#dbdee1',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
};

const OAuthAppsPanel = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const o = useOAuthApps(fetchWithAuth, apiBaseUrl);

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaRobot className="icon-primary-mr10" />
                        <h2 style={styles.title}>Geliştirici Portalı</h2>
                    </div>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.tabs}>
                    <button
                        aria-label="Switch tab"
                        onClick={() => o.setActiveTab('apps')}
                        style={_st1161}
                    >
                        <FaCode className="mr-5" /> OAuth Apps ({o.apps.length})
                    </button>
                    <button
                        aria-label="Switch tab"
                        onClick={() => o.setActiveTab('bots')}
                        style={_st1162}
                    >
                        <FaRobot className="mr-5" /> Bots ({o.bots.length})
                    </button>
                </div>

                <div style={styles.content}>
                    {o.loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
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

OAuthAppsPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};
export default OAuthAppsPanel;

// frontend/src/components/ServerSettingsModal.js
// Refactored: All tabs extracted as self-contained components

import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import useModalA11y from '../../hooks/useModalA11y';
import {
    FaTimes,
    FaUsers,
    FaShieldAlt,
    FaCog,
    FaRobot,
    FaLink,
    FaHandPaper,
    FaChartBar,
    FaHistory,
    FaBan,
    FaGavel,
} from 'react-icons/fa';
import ServerMembers from './ServerMembers';
import AutoResponderManager from '../bot/AutoResponderManager';
import VanityURLManager from './VanityURLManager';
import styles from '../ServerSettingsModal/styles';
import { useTranslation } from 'react-i18next';

// Extracted Tab Components
import WelcomeTemplateEditor from '../ServerSettingsModal/WelcomeTemplateEditor';
import SystemBotEditor from '../ServerSettingsModal/SystemBotEditor';
import RolesTab from '../ServerSettingsModal/RolesTab';
import ManagementTab from '../ServerSettingsModal/ManagementTab';
import ModerationTab from '../ServerSettingsModal/ModerationTab';
import BansTab from '../ServerSettingsModal/BansTab';
import AuditLogTab from '../ServerSettingsModal/AuditLogTab';
import StatsTab from '../ServerSettingsModal/StatsTab';
import logger from '../../utils/logger';

/**
 * @param {Object} props
 * @param {Function} props.onClose - Close modal handler
 * @param {Object} props.server - Server object being configured
 * @param {string} props.currentUsername - Current user's username
 * @param {Function} props.fetchWithAuth - Authenticated fetch wrapper
 * @param {string} props.apiBaseUrl - API base URL
 * @param {Array} props.serverMembers - List of server members
 * @param {Function} props.onRefreshServers - Callback to refresh server list
 */
const ServerSettingsModal = ({
    onClose,
    server,
    currentUsername,
    fetchWithAuth,
    apiBaseUrl,
    serverMembers,
    onRefreshServers,
}) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('roles');
    const [isLoading, setIsLoading] = useState(false);
    const isOwner = server.my_permissions?.is_owner || server.owner_username === currentUsername;

    // Roles — shared between ServerMembers and StatsTab
    const [roles, setRoles] = useState([]);

    // Load roles for ServerMembers and StatsTab
    const loadRoles = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/roles/`);
            if (res.ok) {
                const data = await res.json();
                setRoles(Array.isArray(data) ? data : data.roles || []);
            }
        } catch (e) {
            logger.error('Roles load error:', e);
        }
    }, [fetchWithAuth, apiBaseUrl, server.id]);

    useEffect(() => {
        loadRoles();
    }, [loadRoles]);

    // Escape to close
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Sidebar hover styles
    useEffect(() => {
        const id = 'server-settings-sidebar-css';
        if (!document.getElementById(id)) {
            const s = document.createElement('style');
            s.id = id;
            s.textContent = `
                .ss-nav-item:hover:not(.ss-nav-active) { background: rgba(255,255,255,0.06) !important; color: #dbdee1 !important; }
                .ss-nav-active { background: rgba(88,101,242,0.15) !important; color: #fff !important; }
                .ss-sidebar::-webkit-scrollbar { width: 4px; }
                .ss-sidebar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
                .ss-sidebar::-webkit-scrollbar-track { background: transparent; }
                .ss-close-btn:hover { color: #fff !important; }
            `;
            document.head.appendChild(s);
        }
        return () => {
            const el = document.getElementById(id);
            if (el) el.remove();
        };
    }, []);

    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Server Settings' });

    if (!isOwner) return null;

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                {/* DISCORD-STYLE LAYOUT: Sidebar + Content */}
                <div style={styles.layoutContainer}>
                    {/* ═════ LEFT SIDEBAR ═════ */}
                    <div style={styles.sidebar}>
                        <div style={styles.sidebarHeader}>
                            <div style={styles.sidebarServerIcon}>
                                {server.icon ? (
                                    <img src={server.icon} alt="" className="w-100-h-100-cover" />
                                ) : (
                                    <span className="fs-18">{server.name?.[0]?.toUpperCase()}</span>
                                )}
                            </div>
                            <div style={styles.sidebarServerInfo}>
                                <span style={styles.sidebarServerName}>{server.name}</span>
                                <span style={styles.sidebarServerSub}>
                                    {t('serverSettings.title')}
                                </span>
                            </div>
                        </div>

                        <div className="ss-sidebar" style={styles.sidebarNav}>
                            {/* Yönetim Section */}
                            <div style={styles.navSection}>
                                <span style={styles.navSectionLabel}>
                                    {t('serverSettings.management')}
                                </span>
                                <button
                                    aria-label="Switch tab"
                                    className={`ss-nav-item${activeTab === 'management' ? ' ss-nav-active' : ''}`}
                                    style={{
                                        ...styles.navItem,
                                        ...(activeTab === 'management' ? styles.navItemActive : {}),
                                    }}
                                    onClick={() => setActiveTab('management')}
                                >
                                    <FaCog style={styles.navIcon} />{' '}
                                    {t('serverSettings.generalSettings')}
                                </button>
                                <button
                                    aria-label="Switch tab"
                                    className={`ss-nav-item${activeTab === 'roles' ? ' ss-nav-active' : ''}`}
                                    style={{
                                        ...styles.navItem,
                                        ...(activeTab === 'roles' ? styles.navItemActive : {}),
                                    }}
                                    onClick={() => setActiveTab('roles')}
                                >
                                    <FaShieldAlt style={styles.navIcon} />{' '}
                                    {t('serverSettings.roles')}
                                </button>
                                <button
                                    aria-label="Switch tab"
                                    className={`ss-nav-item${activeTab === 'members' ? ' ss-nav-active' : ''}`}
                                    style={{
                                        ...styles.navItem,
                                        ...(activeTab === 'members' ? styles.navItemActive : {}),
                                    }}
                                    onClick={() => setActiveTab('members')}
                                >
                                    <FaUsers style={styles.navIcon} /> {t('serverSettings.members')}
                                </button>
                            </div>

                            <div style={styles.navDivider} />

                            {/* Features Section */}
                            <div style={styles.navSection}>
                                <span style={styles.navSectionLabel}>
                                    {t('serverSettings.features')}
                                </span>
                                <button
                                    aria-label="Switch tab"
                                    className={`ss-nav-item${activeTab === 'autoresponders' ? ' ss-nav-active' : ''}`}
                                    style={{
                                        ...styles.navItem,
                                        ...(activeTab === 'autoresponders'
                                            ? styles.navItemActive
                                            : {}),
                                    }}
                                    onClick={() => setActiveTab('autoresponders')}
                                >
                                    <FaRobot style={styles.navIcon} /> {t('autoResponder.title')}
                                </button>
                                <button
                                    aria-label="Switch tab"
                                    className={`ss-nav-item${activeTab === 'vanity' ? ' ss-nav-active' : ''}`}
                                    style={{
                                        ...styles.navItem,
                                        ...(activeTab === 'vanity' ? styles.navItemActive : {}),
                                    }}
                                    onClick={() => setActiveTab('vanity')}
                                >
                                    <FaLink style={styles.navIcon} />{' '}
                                    {t('serverSettings.vanityUrl')}
                                </button>
                                <button
                                    aria-label="Switch tab"
                                    className={`ss-nav-item${activeTab === 'welcome' ? ' ss-nav-active' : ''}`}
                                    style={{
                                        ...styles.navItem,
                                        ...(activeTab === 'welcome' ? styles.navItemActive : {}),
                                    }}
                                    onClick={() => setActiveTab('welcome')}
                                >
                                    <FaHandPaper style={styles.navIcon} />{' '}
                                    {t('serverSettings.welcomeMessage')}
                                </button>
                                <button
                                    aria-label="Switch tab"
                                    className={`ss-nav-item${activeTab === 'systembot' ? ' ss-nav-active' : ''}`}
                                    style={{
                                        ...styles.navItem,
                                        ...(activeTab === 'systembot' ? styles.navItemActive : {}),
                                    }}
                                    onClick={() => setActiveTab('systembot')}
                                >
                                    <FaRobot style={styles.navIcon} />{' '}
                                    {t('serverSettings.systemBot')}
                                </button>
                            </div>

                            <div style={styles.navDivider} />

                            {/* Security Section */}
                            <div style={styles.navSection}>
                                <span style={styles.navSectionLabel}>
                                    {t('serverSettings.security')}
                                </span>
                                <button
                                    aria-label="Switch tab"
                                    className={`ss-nav-item${activeTab === 'moderation' ? ' ss-nav-active' : ''}`}
                                    style={{
                                        ...styles.navItem,
                                        ...(activeTab === 'moderation' ? styles.navItemActive : {}),
                                    }}
                                    onClick={() => setActiveTab('moderation')}
                                >
                                    <FaGavel style={styles.navIcon} />{' '}
                                    {t('serverSettings.moderation')}
                                </button>
                                <button
                                    aria-label="Switch tab"
                                    className={`ss-nav-item${activeTab === 'bans' ? ' ss-nav-active' : ''}`}
                                    style={{
                                        ...styles.navItem,
                                        ...(activeTab === 'bans' ? styles.navItemActive : {}),
                                    }}
                                    onClick={() => setActiveTab('bans')}
                                >
                                    <FaBan style={styles.navIcon} />{' '}
                                    {t('serverSettings.banManagement')}
                                </button>
                                <button
                                    aria-label="Switch tab"
                                    className={`ss-nav-item${activeTab === 'auditlog' ? ' ss-nav-active' : ''}`}
                                    style={{
                                        ...styles.navItem,
                                        ...(activeTab === 'auditlog' ? styles.navItemActive : {}),
                                    }}
                                    onClick={() => setActiveTab('auditlog')}
                                >
                                    <FaHistory style={styles.navIcon} /> Audit Log
                                </button>
                            </div>

                            <div style={styles.navDivider} />

                            {/* Analytics Section */}
                            <div style={styles.navSection}>
                                <span style={styles.navSectionLabel}>
                                    {t('serverSettings.analytics')}
                                </span>
                                <button
                                    aria-label="Switch tab"
                                    className={`ss-nav-item${activeTab === 'stats' ? ' ss-nav-active' : ''}`}
                                    style={{
                                        ...styles.navItem,
                                        ...(activeTab === 'stats' ? styles.navItemActive : {}),
                                    }}
                                    onClick={() => setActiveTab('stats')}
                                >
                                    <FaChartBar style={styles.navIcon} />{' '}
                                    {t('serverSettings.statistics')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ═════ RIGHT CONTENT ═════ */}
                    <div style={styles.mainContent}>
                        {/* Content Header */}
                        <div style={styles.contentHeader}>
                            <h2 style={styles.contentTitle}>
                                {activeTab === 'roles' && `🛡️ ${t('serverSettings.roles')}`}
                                {activeTab === 'members' && `👥 ${t('serverSettings.members')}`}
                                {activeTab === 'management' &&
                                    `⚙️ ${t('serverSettings.generalSettings')}`}
                                {activeTab === 'autoresponders' && `🤖 ${t('autoResponder.title')}`}
                                {activeTab === 'vanity' && t('ui.ozel_davet_url')}
                                {activeTab === 'welcome' && t('ui.hos_geldin_mesaji')}
                                {activeTab === 'moderation' &&
                                    `🛡️ ${t('serverSettings.moderation')}`}
                                {activeTab === 'bans' && t('ui.ban_yonetimi')}
                                {activeTab === 'auditlog' && `📜 ${t('serverSettings.auditLog')}`}
                                {activeTab === 'stats' && t('ui.server_istatistikleri')}
                                {activeTab === 'systembot' && `🤖 ${t('serverSettings.systemBot')}`}
                            </h2>
                            <button
                                aria-label="on Close"
                                className="ss-close-btn"
                                onClick={onClose}
                                style={styles.closeBtn}
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        {/* Content Body */}
                        <div style={styles.content}>
                            {activeTab === 'roles' && (
                                <RolesTab
                                    server={server}
                                    fetchWithAuth={fetchWithAuth}
                                    apiBaseUrl={apiBaseUrl}
                                    onRolesChange={setRoles}
                                />
                            )}

                            {activeTab === 'members' && (
                                <ServerMembers
                                    members={serverMembers || []}
                                    roles={roles}
                                    serverId={server.id}
                                    fetchWithAuth={fetchWithAuth}
                                    apiBaseUrl={apiBaseUrl}
                                    onRefresh={() => {}}
                                />
                            )}

                            {activeTab === 'management' && (
                                <ManagementTab
                                    server={server}
                                    isOwner={isOwner}
                                    fetchWithAuth={fetchWithAuth}
                                    apiBaseUrl={apiBaseUrl}
                                    onRefreshServers={onRefreshServers}
                                    onClose={onClose}
                                />
                            )}

                            {activeTab === 'autoresponders' && (
                                <div>
                                    <h3 style={styles.sectionTitle}>
                                        🤖 {t('autoResponder.title')}
                                    </h3>
                                    <p className="text-b5-mb20">
                                        {t('serverSettings.autoResponderDesc')}
                                    </p>
                                    <AutoResponderManager
                                        serverId={server.id}
                                        fetchWithAuth={fetchWithAuth}
                                        apiBaseUrl={apiBaseUrl}
                                        embedded={true}
                                    />
                                </div>
                            )}

                            {activeTab === 'vanity' && (
                                <div>
                                    <h3 style={styles.sectionTitle}>
                                        🔗 {t('serverSettings.vanityUrl')}
                                    </h3>
                                    <p className="text-b5-mb20">
                                        {t('serverSettings.vanityUrlDesc')}
                                    </p>
                                    <VanityURLManager
                                        serverId={server.id}
                                        fetchWithAuth={fetchWithAuth}
                                        apiBaseUrl={apiBaseUrl}
                                        embedded={true}
                                    />
                                </div>
                            )}

                            {activeTab === 'welcome' && (
                                <div>
                                    <h3 style={styles.sectionTitle}>
                                        👋 {t('serverSettings.welcomeMessage')}
                                    </h3>
                                    <p className="text-b5-mb20">
                                        {t('serverSettings.welcomeMessageDesc')}
                                    </p>
                                    <WelcomeTemplateEditor
                                        serverId={server.id}
                                        fetchWithAuth={fetchWithAuth}
                                        apiBaseUrl={apiBaseUrl}
                                    />
                                </div>
                            )}

                            {activeTab === 'systembot' && (
                                <div>
                                    <SystemBotEditor
                                        serverId={server.id}
                                        serverIcon={server.icon}
                                        fetchWithAuth={fetchWithAuth}
                                        apiBaseUrl={apiBaseUrl}
                                    />
                                </div>
                            )}

                            {activeTab === 'moderation' && (
                                <ModerationTab
                                    server={server}
                                    serverMembers={serverMembers}
                                    fetchWithAuth={fetchWithAuth}
                                    apiBaseUrl={apiBaseUrl}
                                    onClose={onClose}
                                />
                            )}

                            {activeTab === 'bans' && (
                                <BansTab
                                    server={server}
                                    fetchWithAuth={fetchWithAuth}
                                    apiBaseUrl={apiBaseUrl}
                                />
                            )}

                            {activeTab === 'auditlog' && (
                                <AuditLogTab
                                    server={server}
                                    fetchWithAuth={fetchWithAuth}
                                    apiBaseUrl={apiBaseUrl}
                                />
                            )}

                            {activeTab === 'stats' && (
                                <StatsTab
                                    server={server}
                                    fetchWithAuth={fetchWithAuth}
                                    apiBaseUrl={apiBaseUrl}
                                    roles={roles}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ServerSettingsModal.displayName = 'ServerSettingsModal';

ServerSettingsModal.propTypes = {
    onClose: PropTypes.func,
    server: PropTypes.string,
    currentUsername: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    serverMembers: PropTypes.object,
    onRefreshServers: PropTypes.func,
};
export default ServerSettingsModal;

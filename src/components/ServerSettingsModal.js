// frontend/src/components/ServerSettingsModal.js
// Refactored: All tabs extracted as self-contained components

import { useState, useEffect, useCallback } from 'react';
import { FaTimes, FaUsers, FaShieldAlt, FaCog, FaRobot, FaLink, FaHandPaper, FaChartBar, FaHistory, FaBan, FaGavel } from 'react-icons/fa';
import ServerMembers from './ServerMembers';
import AutoResponderManager from './AutoResponderManager';
import VanityURLManager from './VanityURLManager';
import styles from './ServerSettingsModal/styles';

// Extracted Tab Components
import WelcomeTemplateEditor from './ServerSettingsModal/WelcomeTemplateEditor';
import SystemBotEditor from './ServerSettingsModal/SystemBotEditor';
import RolesTab from './ServerSettingsModal/RolesTab';
import ManagementTab from './ServerSettingsModal/ManagementTab';
import ModerationTab from './ServerSettingsModal/ModerationTab';
import BansTab from './ServerSettingsModal/BansTab';
import AuditLogTab from './ServerSettingsModal/AuditLogTab';
import StatsTab from './ServerSettingsModal/StatsTab';

const ServerSettingsModal = ({ onClose, server, currentUsername, fetchWithAuth, apiBaseUrl, serverMembers, onRefreshServers }) => {

    const [activeTab, setActiveTab] = useState('roles');
    const isOwner = server.my_permissions?.is_owner || server.owner_username === currentUsername;

    // Roles â€” shared between ServerMembers and StatsTab
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
            console.error('Roles load error:', e);
        }
    }, [fetchWithAuth, apiBaseUrl, server.id]);

    useEffect(() => { loadRoles(); }, [loadRoles]);

    // Escape to close
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
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
        return () => { const el = document.getElementById(id); if (el) el.remove(); };
    }, []);

    if (!isOwner) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>

                {/* DISCORD-STYLE LAYOUT: Sidebar + Content */}
                <div style={styles.layoutContainer}>

                    {/* â•â•â•â•â• LEFT SIDEBAR â•â•â•â•â• */}
                    <div style={styles.sidebar}>
                        <div style={styles.sidebarHeader}>
                            <div style={styles.sidebarServerIcon}>
                                {server.icon ? (
                                    <img src={server.icon} alt="" style={{ width: '100%', height: '100%', borderRadius: '12px', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ fontSize: '18px' }}>{server.name?.[0]?.toUpperCase()}</span>
                                )}
                            </div>
                            <div style={styles.sidebarServerInfo}>
                                <span style={styles.sidebarServerName}>{server.name}</span>
                                <span style={styles.sidebarServerSub}>Sunucu AyarlarÄ±</span>
                            </div>
                        </div>

                        <div className="ss-sidebar" style={styles.sidebarNav}>
                            {/* YÃ¶netim Section */}
                            <div style={styles.navSection}>
                                <span style={styles.navSectionLabel}>YÃ–NETÄ°M</span>
                                <button className={`ss-nav-item${activeTab === 'management' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'management' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('management')}>
                                    <FaCog style={styles.navIcon} /> Genel Ayarlar
                                </button>
                                <button className={`ss-nav-item${activeTab === 'roles' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'roles' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('roles')}>
                                    <FaShieldAlt style={styles.navIcon} /> Roller
                                </button>
                                <button className={`ss-nav-item${activeTab === 'members' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'members' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('members')}>
                                    <FaUsers style={styles.navIcon} /> Ãœyeler
                                </button>
                            </div>

                            <div style={styles.navDivider} />

                            {/* Ã–zellikler Section */}
                            <div style={styles.navSection}>
                                <span style={styles.navSectionLabel}>Ã–ZELLÄ°KLER</span>
                                <button className={`ss-nav-item${activeTab === 'autoresponders' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'autoresponders' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('autoresponders')}>
                                    <FaRobot style={styles.navIcon} /> Otomatik YanÄ±tlar
                                </button>
                                <button className={`ss-nav-item${activeTab === 'vanity' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'vanity' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('vanity')}>
                                    <FaLink style={styles.navIcon} /> Ã–zel URL
                                </button>
                                <button className={`ss-nav-item${activeTab === 'welcome' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'welcome' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('welcome')}>
                                    <FaHandPaper style={styles.navIcon} /> HoÅŸ Geldin MesajÄ±
                                </button>
                                <button className={`ss-nav-item${activeTab === 'systembot' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'systembot' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('systembot')}>
                                    <FaRobot style={styles.navIcon} /> Sistem Botu
                                </button>
                            </div>

                            <div style={styles.navDivider} />

                            {/* GÃ¼venlik Section */}
                            <div style={styles.navSection}>
                                <span style={styles.navSectionLabel}>GÃœVENLÄ°K</span>
                                <button className={`ss-nav-item${activeTab === 'moderation' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'moderation' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('moderation')}>
                                    <FaGavel style={styles.navIcon} /> Moderasyon
                                </button>
                                <button className={`ss-nav-item${activeTab === 'bans' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'bans' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('bans')}>
                                    <FaBan style={styles.navIcon} /> Ban YÃ¶netimi
                                </button>
                                <button className={`ss-nav-item${activeTab === 'auditlog' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'auditlog' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('auditlog')}>
                                    <FaHistory style={styles.navIcon} /> Audit Log
                                </button>
                            </div>

                            <div style={styles.navDivider} />

                            {/* Analitik Section */}
                            <div style={styles.navSection}>
                                <span style={styles.navSectionLabel}>ANALÄ°TÄ°K</span>
                                <button className={`ss-nav-item${activeTab === 'stats' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'stats' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('stats')}>
                                    <FaChartBar style={styles.navIcon} /> Ä°statistikler
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* â•â•â•â•â• RIGHT CONTENT â•â•â•â•â• */}
                    <div style={styles.mainContent}>
                        {/* Content Header */}
                        <div style={styles.contentHeader}>
                            <h2 style={styles.contentTitle}>
                                {activeTab === 'roles' && 'ðŸ›¡ï¸ Roller'}
                                {activeTab === 'members' && 'ðŸ‘¥ Ãœyeler'}
                                {activeTab === 'management' && 'âš™ï¸ Genel Ayarlar'}
                                {activeTab === 'autoresponders' && 'ðŸ¤– Otomatik YanÄ±tlar'}
                                {activeTab === 'vanity' && 'ðŸ”— Ã–zel Davet URL'}
                                {activeTab === 'welcome' && 'ðŸ‘‹ HoÅŸ Geldin MesajÄ±'}
                                {activeTab === 'moderation' && 'ðŸ›¡ï¸ Moderasyon'}
                                {activeTab === 'bans' && 'ðŸš« Ban YÃ¶netimi'}
                                {activeTab === 'auditlog' && 'ðŸ“œ Audit Log'}
                                {activeTab === 'stats' && 'ðŸ“Š Sunucu Ä°statistikleri'}
                                {activeTab === 'systembot' && 'ðŸ¤– Sistem Botu AyarlarÄ±'}
                            </h2>
                            <button className="ss-close-btn" onClick={onClose} style={styles.closeBtn}><FaTimes size={20} /></button>
                        </div>

                        {/* Content Body */}
                        <div style={styles.content}>
                            {activeTab === 'roles' && (
                                <RolesTab server={server} fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} onRolesChange={setRoles} />
                            )}

                            {activeTab === 'members' && (
                                <ServerMembers
                                    members={serverMembers || []}
                                    roles={roles}
                                    serverId={server.id}
                                    fetchWithAuth={fetchWithAuth}
                                    apiBaseUrl={apiBaseUrl}
                                    onRefresh={() => { }}
                                />
                            )}

                            {activeTab === 'management' && (
                                <ManagementTab server={server} isOwner={isOwner} fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} onRefreshServers={onRefreshServers} onClose={onClose} />
                            )}

                            {activeTab === 'autoresponders' && (
                                <div>
                                    <h3 style={styles.sectionTitle}>ðŸ¤– Otomatik YanÄ±tlar</h3>
                                    <p style={{ color: '#b9bbbe', marginBottom: '20px' }}>
                                        Belirli anahtar kelimeler iÃ§in otomatik yanÄ±tlar oluÅŸturun.
                                    </p>
                                    <AutoResponderManager serverId={server.id} fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} embedded={true} />
                                </div>
                            )}

                            {activeTab === 'vanity' && (
                                <div>
                                    <h3 style={styles.sectionTitle}>ðŸ”— Ã–zel Davet URL'i</h3>
                                    <p style={{ color: '#b9bbbe', marginBottom: '20px' }}>
                                        Sunucunuz iÃ§in hatÄ±rlanmasÄ± kolay Ã¶zel bir URL oluÅŸturun.
                                    </p>
                                    <VanityURLManager serverId={server.id} fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} embedded={true} />
                                </div>
                            )}

                            {activeTab === 'welcome' && (
                                <div>
                                    <h3 style={styles.sectionTitle}>ðŸ‘‹ HoÅŸ Geldin MesajÄ±</h3>
                                    <p style={{ color: '#b9bbbe', marginBottom: '20px' }}>
                                        Yeni Ã¼yeler iÃ§in Ã¶zel hoÅŸ geldin mesajÄ± oluÅŸturun.
                                    </p>
                                    <WelcomeTemplateEditor serverId={server.id} fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} />
                                </div>
                            )}

                            {activeTab === 'systembot' && (
                                <div>
                                    <SystemBotEditor serverId={server.id} serverIcon={server.icon} fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} />
                                </div>
                            )}

                            {activeTab === 'moderation' && (
                                <ModerationTab server={server} serverMembers={serverMembers} fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} onClose={onClose} />
                            )}

                            {activeTab === 'bans' && (
                                <BansTab server={server} fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} />
                            )}

                            {activeTab === 'auditlog' && (
                                <AuditLogTab server={server} fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} />
                            )}

                            {activeTab === 'stats' && (
                                <StatsTab server={server} fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} roles={roles} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerSettingsModal;


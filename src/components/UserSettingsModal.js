// frontend/src/components/UserSettingsModal.js
// 🔥 FEATURE 10: Unified User Settings Modal
// Discord-style settings with sidebar navigation

import { useState, useEffect, memo } from 'react';
import { FaSignOutAlt, FaTimes } from 'react-icons/fa';
import TABS from './UserSettingsModal/constants';
import S from './UserSettingsModal/styles';
import AccountTab from './UserSettingsModal/tabs/AccountTab';
import PrivacyTab from './UserSettingsModal/tabs/PrivacyTab';
import ConnectionsTab from './UserSettingsModal/tabs/ConnectionsTab';
import AppearanceTab from './UserSettingsModal/tabs/AppearanceTab';
import VoiceTab from './UserSettingsModal/tabs/VoiceTab';
import NotificationsTab from './UserSettingsModal/tabs/NotificationsTab';
import KeybindsTab from './UserSettingsModal/tabs/KeybindsTab';
import LanguageTab from './UserSettingsModal/tabs/LanguageTab';
import ActivityTab from './UserSettingsModal/tabs/ActivityTab';
import DevicesTab from './UserSettingsModal/tabs/DevicesTab';
import AdvancedTab from './UserSettingsModal/tabs/AdvancedTab';

const TAB_COMPONENTS = {
    account: AccountTab,
    privacy: PrivacyTab,
    connections: ConnectionsTab,
    appearance: AppearanceTab,
    voice: VoiceTab,
    notifications: NotificationsTab,
    keybinds: KeybindsTab,
    language: LanguageTab,
    activity: ActivityTab,
    devices: DevicesTab,
    advanced: AdvancedTab,
};

const UserSettingsModal = ({ onClose, user }) => {
    const [activeTab, setActiveTab] = useState('account');

    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [onClose]);

    const ActiveComponent = TAB_COMPONENTS[activeTab] || AccountTab;

    // Group tabs by section
    const sections = {};
    TABS.forEach(tab => {
        if (!sections[tab.section]) sections[tab.section] = [];
        sections[tab.section].push(tab);
    });

    return (
        <div style={S.overlay} onClick={onClose}>
            <div style={S.modal} onClick={e => e.stopPropagation()}>
                <div style={S.sidebar}>
                    <div style={S.sidebarScroll}>
                        {Object.entries(sections).map(([section, tabs]) => (
                            <div key={section}>
                                <div style={S.sectionLabel}>{section}</div>
                                {tabs.map(tab => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            style={{
                                                ...S.tabBtn,
                                                backgroundColor: isActive ? 'rgba(88,101,242,0.2)' : 'transparent',
                                                color: isActive ? '#fff' : '#949ba4',
                                            }}
                                            onClick={() => setActiveTab(tab.id)}
                                            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }}
                                            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
                                        >
                                            <Icon style={{ fontSize: 14, flexShrink: 0 }} />
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}
                                <div style={S.divider} />
                            </div>
                        ))}
                        <button type="button" style={{ ...S.tabBtn, color: '#da373c' }} onClick={onClose}>
                            <FaSignOutAlt style={{ fontSize: 14 }} />
                            <span>{'Çıkış Yap'}</span>
                        </button>
                    </div>
                </div>
                <div style={S.content}>
                    <div style={S.contentHeader}>
                        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: 0 }}>
                            {TABS.find(t => t.id === activeTab)?.label || 'Ayarlar'}
                        </h2>
                        <button type="button" style={S.closeBtn} onClick={onClose}>
                            <FaTimes />
                            <span style={{ fontSize: 11, color: '#949ba4' }}>ESC</span>
                        </button>
                    </div>
                    <div style={S.contentBody}>
                        <ActiveComponent user={user} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(UserSettingsModal);

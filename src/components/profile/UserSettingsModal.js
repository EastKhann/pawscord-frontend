// frontend/src/components/UserSettingsModal.js
// 🔥 FEATURE 10: Unified User Settings Modal
// Discord-style settings with sidebar navigation

import { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import confirmDialog from '../../utils/confirmDialog';
import TABS from '../UserSettingsModal/constants';
import S from '../UserSettingsModal/styles';
import AccountTab from '../UserSettingsModal/tabs/AccountTab';
import PrivacyTab from '../UserSettingsModal/tabs/PrivacyTab';
import ConnectionsTab from '../UserSettingsModal/tabs/ConnectionsTab';
import AppearanceTab from '../UserSettingsModal/tabs/AppearanceTab';
import VoiceTab from '../UserSettingsModal/tabs/VoiceTab';
import NotificationsTab from '../UserSettingsModal/tabs/NotificationsTab';
import KeybindsTab from '../UserSettingsModal/tabs/KeybindsTab';
import LanguageTab from '../UserSettingsModal/tabs/LanguageTab';
import ActivityTab from '../UserSettingsModal/tabs/ActivityTab';
import DevicesTab from '../UserSettingsModal/tabs/DevicesTab';
import AdvancedTab from '../UserSettingsModal/tabs/AdvancedTab';
import useModalA11y from '../../hooks/useModalA11y';

const M = {
    txt3: { fontSize: 11, color: '#949ba4' },
    txt2: { color: '#fff', fontSize: 20, fontWeight: 700, margin: 0 },
    txt: { ...S.tabBtn, color: '#da373c' },
    font: { fontSize: 14, flexShrink: 0 },
};

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

/**
 * @param {Object} props
 * @param {Function} props.onClose - Close modal handler
 * @param {Object} props.user - Current user object with profile data
 */
const UserSettingsModal = ({ onClose, user }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'User Settings' });
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('account');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDirty, setIsDirty] = useState(false);

    const handleDirtyChange = useCallback((dirty) => setIsDirty(dirty), []);

    const handleTabChange = useCallback(
        async (tabId) => {
            if (isDirty) {
                const ok = await confirmDialog(
                    t('settings.unsavedChanges', 'You have unsaved changes. Discard them?')
                );
                if (!ok) return;
                setIsDirty(false);
            }
            setActiveTab(tabId);
        },
        [isDirty, t]
    );

    const handleClose = useCallback(async () => {
        if (isDirty) {
            const ok = await confirmDialog(
                t('settings.unsavedChanges', 'You have unsaved changes. Discard them?')
            );
            if (!ok) return;
        }
        onClose?.();
    }, [isDirty, onClose, t]);

    const ActiveComponent = TAB_COMPONENTS[activeTab] || AccountTab;

    // Group tabs by section
    const sections = {};
    TABS.forEach((tab) => {
        const sectionLabel = tab.sectionKey ? t(tab.sectionKey, tab.section) : tab.section;
        if (!sections[sectionLabel]) sections[sectionLabel] = [];
        sections[sectionLabel].push(tab);
    });

    return (
        <div style={S.overlay} {...overlayProps}>
            <div style={S.modal} {...dialogProps}>
                <div style={S.sidebar}>
                    <div style={S.sidebarScroll}>
                        {Object.entries(sections).map(([section, tabs]) => (
                            <div key={section}>
                                <div style={S.sectionLabel}>{section}</div>
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    const tabLabel = tab.labelKey
                                        ? t(tab.labelKey, tab.label)
                                        : tab.label;
                                    return (
                                        <button
                                            aria-label={tabLabel}
                                            aria-current={isActive ? 'page' : undefined}
                                            key={tab.id}
                                            type="button"
                                            style={{
                                                ...S.tabBtn,
                                                backgroundColor: isActive
                                                    ? 'rgba(88,101,242,0.2)'
                                                    : 'transparent',
                                                color: isActive ? '#fff' : '#949ba4',
                                            }}
                                            onClick={() => handleTabChange(tab.id)}
                                            onMouseEnter={(e) => {
                                                if (!isActive)
                                                    e.currentTarget.style.backgroundColor =
                                                        'rgba(255,255,255,0.04)';
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive)
                                                    e.currentTarget.style.backgroundColor =
                                                        'transparent';
                                            }}
                                        >
                                            <Icon style={M.font} />
                                            <span>{tabLabel}</span>
                                        </button>
                                    );
                                })}
                                <div style={S.divider} />
                            </div>
                        ))}
                        <button aria-label="on Close" type="button" style={M.txt} onClick={handleClose}>
                            <FaSignOutAlt className="fs-14" />
                            <span>{t('common.logout', 'Log Out')}</span>
                        </button>
                    </div>
                </div>
                <div style={S.content}>
                    <div style={S.contentHeader}>
                        <h2 style={M.txt2}>
                            {(() => {
                                const tab = TABS.find((t2) => t2.id === activeTab);
                                return tab?.labelKey
                                    ? t(tab.labelKey, tab.label)
                                    : tab?.label || 'Settings';
                            })()}
                        </h2>
                        <button
                            aria-label="on Close"
                            type="button"
                            style={S.closeBtn}
                            onClick={handleClose}
                        >
                            <FaTimes />
                            <span style={M.txt3}>ESC</span>
                        </button>
                    </div>
                    <div style={S.contentBody}>
                        <ActiveComponent user={user} onDirtyChange={handleDirtyChange} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const MemoizedUserSettingsModal = memo(UserSettingsModal);

MemoizedUserSettingsModal.displayName = 'UserSettingsModal';

MemoizedUserSettingsModal.propTypes = {
    onClose: PropTypes.func,
    user: PropTypes.object,
};
export default MemoizedUserSettingsModal;

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import profileStyles from './styles';

// -- dynamic style helpers (pass 2) --
/**
 * Sidebar navigation for UserProfilePanel.
 * Contains all category/tab navigation buttons and logout action.
 */
const _st1096 = {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
};
const _st1097 = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(240,71,71,0.1)',
    color: '#f04747',
    border: '1px solid rgba(240,71,71,0.3)',
    borderRadius: '6px',
    cursor: 'pointer',
};

const ProfileSidebar = ({
    activeTab,
    setActiveTab,
    setActiveCategory,
    isOwnProfile,
    onLogout,
    setShowLogoutModal,
}) => {
    const styles = profileStyles;
    const { t } = useTranslation();
    const handleNav = useCallback(
        (tab, cat) => {
            setActiveTab(tab);
            setActiveCategory(cat);
        },
        [setActiveTab, setActiveCategory]
    );
    const handleLogout = useCallback(() => setShowLogoutModal(true), [setShowLogoutModal]);

    return (
        <div style={styles.sidebar} className="user-profile-sidebar">
            <div style={styles.sidebarSection}>
                <div style={styles.sidebarHeader}>👤 {t('profile.myAccount')}</div>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'profile')}
                    onClick={() => handleNav('profile', 'account')}
                    aria-label={t('profile.profile')}
                    aria-current={activeTab === 'profile' ? 'page' : undefined}
                >
                    {t('profile.profile')}
                </button>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'badges')}
                    onClick={() => handleNav('badges', 'account')}
                    aria-label={t('profile.badges')}
                    aria-current={activeTab === 'badges' ? 'page' : undefined}
                >
                    {t('profile.badges')}
                </button>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'inventory')}
                    onClick={() => handleNav('inventory', 'account')}
                    aria-label={t('profile.inventory')}
                    aria-current={activeTab === 'inventory' ? 'page' : undefined}
                >
                    {t('profile.inventory')}
                </button>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'endorsements')}
                    onClick={() => handleNav('endorsements', 'account')}
                    aria-label={t('profile.endorsements')}
                    aria-current={activeTab === 'endorsements' ? 'page' : undefined}
                >
                    {t('profile.endorsements')}
                </button>
            </div>

            <div style={styles.sidebarSection}>
                <div style={styles.sidebarHeader}>🔐 {t('profile.privacySecurity')}</div>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'security')}
                    onClick={() => handleNav('security', 'security')}
                    aria-label={t('profile.security')}
                    aria-current={activeTab === 'security' ? 'page' : undefined}
                >
                    {t('profile.security')}
                </button>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'privacy')}
                    onClick={() => handleNav('privacy', 'security')}
                    aria-label={t('profile.privacy')}
                    aria-current={activeTab === 'privacy' ? 'page' : undefined}
                >
                    {t('profile.privacy')}
                </button>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'gdpr')}
                    onClick={() => handleNav('gdpr', 'security')}
                    aria-label={t('profile.gdpr')}
                    aria-current={activeTab === 'gdpr' ? 'page' : undefined}
                >
                    {t('profile.gdpr')}
                </button>
            </div>

            <div style={styles.sidebarSection}>
                <div style={styles.sidebarHeader}>👥 {t('profile.social')}</div>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'friends')}
                    onClick={() => handleNav('friends', 'social')}
                    aria-label={t('profile.friends')}
                    aria-current={activeTab === 'friends' ? 'page' : undefined}
                >
                    {t('profile.friends')}
                </button>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'activity')}
                    onClick={() => handleNav('activity', 'social')}
                    aria-label={t('profile.activity')}
                    aria-current={activeTab === 'activity' ? 'page' : undefined}
                >
                    {t('profile.activity')}
                </button>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'status')}
                    onClick={() => handleNav('status', 'social')}
                    aria-label={t('profile.customStatus')}
                    aria-current={activeTab === 'status' ? 'page' : undefined}
                >
                    {t('profile.customStatus')}
                </button>
            </div>

            <div style={styles.sidebarSection}>
                <div style={styles.sidebarHeader}>🎨 {t('profile.appearance')}</div>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'appearance')}
                    onClick={() => handleNav('appearance', 'appearance')}
                    aria-label={t('profile.theme')}
                    aria-current={activeTab === 'appearance' ? 'page' : undefined}
                >
                    {t('profile.theme')}
                </button>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'sounds')}
                    onClick={() => handleNav('sounds', 'appearance')}
                    aria-label={t('profile.sounds')}
                    aria-current={activeTab === 'sounds' ? 'page' : undefined}
                >
                    {t('profile.sounds')}
                </button>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'notifications')}
                    onClick={() => handleNav('notifications', 'appearance')}
                    aria-label={t('profile.notifications')}
                    aria-current={activeTab === 'notifications' ? 'page' : undefined}
                >
                    {t('profile.notifications')}
                </button>
            </div>

            <div style={styles.sidebarSection}>
                <div style={styles.sidebarHeader}>📱 {t('profile.app')}</div>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'language')}
                    onClick={() => handleNav('language', 'app')}
                    aria-label={t('profile.language', 'Language')}
                    aria-current={activeTab === 'language' ? 'page' : undefined}
                >
                    {t('profile.language', 'Language')}
                </button>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'drafts')}
                    onClick={() => handleNav('drafts', 'app')}
                    aria-label={t('profile.drafts')}
                    aria-current={activeTab === 'drafts' ? 'page' : undefined}
                >
                    {t('profile.drafts')}
                </button>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'bookmarks')}
                    onClick={() => handleNav('bookmarks', 'app')}
                    aria-label={t('profile.bookmarks')}
                    aria-current={activeTab === 'bookmarks' ? 'page' : undefined}
                >
                    {t('profile.bookmarks')}
                </button>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'history')}
                    onClick={() => handleNav('history', 'app')}
                    aria-label={t('profile.history')}
                    aria-current={activeTab === 'history' ? 'page' : undefined}
                >
                    {t('profile.history')}
                </button>
            </div>

            <div style={styles.sidebarSection}>
                <div style={styles.sidebarHeader}>🔧 {t('profile.advanced')}</div>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'premium')}
                    onClick={() => handleNav('premium', 'advanced')}
                    aria-label={t('profile.premium')}
                    aria-current={activeTab === 'premium' ? 'page' : undefined}
                >
                    {t('profile.premium')}
                </button>
                <button
                    className="sidebar-btn"
                    style={styles.sidebarBtn(activeTab === 'developer')}
                    onClick={() => handleNav('developer', 'advanced')}
                    aria-label={t('profile.developer')}
                    aria-current={activeTab === 'developer' ? 'page' : undefined}
                >
                    {t('profile.developer')}
                </button>
            </div>

            {/* 🚪 Logout Button */}
            {isOwnProfile && onLogout && (
                <div style={_st1096}>
                    <button
                        className="sidebar-btn logout-btn"
                        style={_st1097}
                        onClick={handleLogout}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.background = 'rgba(240, 71, 71, 0.1)')
                        }
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        aria-label={t('profile.logOut')}
                    >
                        🚪 {t('profile.logOut')}
                    </button>
                </div>
            )}
        </div>
    );
};

ProfileSidebar.propTypes = {
    activeTab: PropTypes.bool,
    setActiveTab: PropTypes.func,
    setActiveCategory: PropTypes.func,
    isOwnProfile: PropTypes.bool,
    onLogout: PropTypes.func,
    setShowLogoutModal: PropTypes.func,
};
export default React.memo(ProfileSidebar);

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import AvatarCropper from '../components/profile/AvatarCropper';
import LogoutModal from '../components/shared/LogoutModal';
import './UserProfilePanel.css';
import profileStyles from './styles';
import useProfileAPI from './hooks/useProfileAPI';
import ProfileHeader from './ProfileHeader';
import ProfileSidebar from './ProfileSidebar';
import ProfileTabContent from './ProfileTabContent';
import logger from '../utils/logger';

// -- extracted inline style constants --
const _st1 = {
    background: '#111214',
    padding: '32px',
    borderRadius: '12px',
    textAlign: 'center',
    color: '#fff',
};
const _st2 = { color: '#b5bac1' };
const _st3 = {
    background: '#5865f2',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '16px',
};

const UserProfilePanel = ({ user, onClose, onUpdate, onLogout }) => {
    // Safety check
    if (!user) {
        logger.error('[UserProfilePanel] User prop is null/undefined');
        return null;
    }

    // Ownership detection
    const currentUsername = localStorage.getItem('chat_username');
    const currentUserId = localStorage.getItem('user_id');
    const viewingUsername = user?.username || user?.user?.username || user?.name;
    const isOwnProfile =
        viewingUsername === currentUsername || user?.id?.toString() === currentUserId;

    // Tab navigation state
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState('account');
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // All API state + functions from custom hook
    const api = useProfileAPI({ user, isOwnProfile, onUpdate });

    // Lazy loading: Fetch data when category changes
    useEffect(() => {
        api.fetchDataForCategory(activeCategory);
    }, [activeCategory]);

    const styles = profileStyles;
    const { t } = useTranslation();

    // Mobile-responsive panel sizing
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 480;
    const panelStyle = isMobile
        ? {
            ...styles.panel,
            width: '100vw',
            maxWidth: '100vw',
            height: '100dvh',
            maxHeight: '100dvh',
            borderRadius: 0,
        }
        : styles.panel;

    try {
        return (
            <div
                aria-label="user profile panel"
                role="presentation"
                style={styles.overlay}
                onClick={onClose}
                onKeyDown={(e) => e.key === 'Escape' && onClose()}
            >
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="User Profile"
                    style={panelStyle}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                >
                    {/* Banner Header */}
                    <ProfileHeader
                        formData={api.formData}
                        premiumStatus={api.premiumStatus}
                        badges={api.badges}
                        userStats={api.userStats}
                        customStatus={api.customStatus}
                        friends={api.friends}
                        onClose={onClose}
                        styles={styles}
                    />

                    <div style={styles.body}>
                        {/* Sidebar Navigation */}
                        <ProfileSidebar
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            setActiveCategory={setActiveCategory}
                            isOwnProfile={isOwnProfile}
                            onLogout={onLogout}
                            setShowLogoutModal={setShowLogoutModal}
                        />

                        {/* Tab Content */}
                        <div style={styles.content} className="user-profile-content">
                            <ProfileTabContent
                                activeTab={activeTab}
                                api={api}
                                isOwnProfile={isOwnProfile}
                                user={user}
                            />
                        </div>
                    </div>
                </div>

                {/* Avatar Cropper Modal */}
                {api.showCropper && (
                    <AvatarCropper
                        imageFile={api.tempImageFile}
                        onCropComplete={api.handleCropComplete}
                        onCancel={() => {
                            api.setShowCropper(false);
                            api.setTempImageFile(null);
                        }}
                    />
                )}

                {/* Logout Modal */}
                <LogoutModal
                    isOpen={showLogoutModal}
                    onClose={() => setShowLogoutModal(false)}
                    onConfirm={() => {
                        onLogout();
                        onClose();
                    }}
                    username={user?.username || currentUsername}
                />
            </div>
        );
    } catch (error) {
        logger.error('[UserProfilePanel] Render error:', error);
        return (
            <div
                role="presentation"
                style={styles.overlay}
                onClick={onClose}
                onKeyDown={(e) => e.key === 'Escape' && onClose()}
            >
                <div style={_st1}>
                    <h3>{t('profile.loadFailed')}</h3>
                    <p style={_st2}>{t('common.errorOccurred')}</p>
                    <button onClick={onClose} style={_st3}>
                        {t('common.close')}
                    </button>
                </div>
            </div>
        );
    }
};

UserProfilePanel.propTypes = {
    user: PropTypes.object,
    onClose: PropTypes.func,
    onUpdate: PropTypes.func,
    onLogout: PropTypes.func,
};
export default UserProfilePanel;

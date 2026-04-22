import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ABSOLUTE_HOST_URL } from '../utils/constants';
import logger from '../utils/logger';

// -- dynamic style helpers (pass 2) --
const _st1095 = {
    background: 'transparent',
    border: 'none',
    fontSize: '2em',
    color: '#949ba4',
    cursor: 'pointer',
    padding: 0,
};

const BASE_URL = ABSOLUTE_HOST_URL;

const ProfileHeader = ({
    formData,
    premiumStatus,
    badges,
    userStats,
    customStatus,
    friends,
    onClose,
    styles,
}) => {
    const { t } = useTranslation();
    return (
        <div className="profile-header-banner">
            <div className="profile-header-content">
                <div className="profile-avatar-wrapper">
                    <img
                        src={
                            formData?.avatar_url && typeof formData.avatar_url === 'string'
                                ? (formData.avatar_url.startsWith('http')
                                    ? formData.avatar_url
                                    : `${BASE_URL}${formData.avatar_url}`) + `?t=${Date.now()}`
                                : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Crect fill="%235865f2" width="120" height="120" rx="60"/%3E%3Ctext x="60" y="60" font-size="50" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E??%3C/text%3E%3C/svg%3E'
                        }
                        alt={formData?.username || 'User'}
                        className="profile-avatar-large"
                        onError={(e) => {
                            if (!e.target.dataset.errorHandled) {
                                e.target.dataset.errorHandled = 'true';
                                logger.error('? [Avatar Load Error]', e.target.src);
                                e.target.src =
                                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Crect fill="%235865f2" width="120" height="120" rx="60"/%3E%3Ctext x="60" y="60" font-size="50" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E??%3C/text%3E%3C/svg%3E';
                            }
                        }}
                    />
                    <div
                        className={`profile-status-indicator ${customStatus?.status || 'online'}`}
                    ></div>
                </div>
                <div className="profile-header-info">
                    <h1 className="profile-username">
                        {formData?.username || 'User'}
                        {premiumStatus?.is_premium && <span className="profile-badge">??</span>}
                        {Array.isArray(badges) && badges.includes('verified') && (
                            <span className="profile-badge">?</span>
                        )}
                        {Array.isArray(badges) && badges.includes('developer') && (
                            <span className="profile-badge">?????</span>
                        )}
                    </h1>
                    {formData?.status_message && (
                        <p className="profile-status-message">"{formData.status_message}"</p>
                    )}
                    <div className="profile-stats-bar">
                        <div className="profile-stat-item">
                            <span className="profile-stat-icon">?</span>
                            <span className="profile-stat-value">
                                {t('profile.level', 'Level')} {userStats?.level || 1}
                            </span>
                        </div>
                        <div className="profile-stat-item">
                            <span className="profile-stat-icon">??</span>
                            <span className="profile-stat-value">{userStats?.xp || 0}</span>
                            <span className="profile-stat-label">{t('profile.xp')}</span>
                        </div>
                        <div className="profile-stat-item">
                            <span className="profile-stat-icon">??</span>
                            <span className="profile-stat-value">{userStats?.coins || 0}</span>
                            <span className="profile-stat-label">{t('profile.coins')}</span>
                        </div>
                        <div className="profile-stat-item">
                            <span className="profile-stat-icon">??</span>
                            <span className="profile-stat-value">
                                {Array.isArray(friends) ? friends.length : 0}
                            </span>
                            <span className="profile-stat-label">{t('profile.friends')}</span>
                        </div>
                    </div>
                </div>
                <button style={_st1095} onClick={onClose} aria-label={t('profile.closeProfile')}>
                    �
                </button>
            </div>
        </div>
    );
};

ProfileHeader.propTypes = {
    formData: PropTypes.array,
    premiumStatus: PropTypes.array,
    badges: PropTypes.array,
    userStats: PropTypes.array,
    customStatus: PropTypes.array,
    friends: PropTypes.array,
    onClose: PropTypes.func,
    styles: PropTypes.array,
};
export default ProfileHeader;

/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaCommentDots, FaServer, FaUserFriends, FaUser } from 'react-icons/fa';
import './MobileNav.css';

/**
 * Mobile bottom navigation bar with tab switching.
 * Auto-hides when the virtual keyboard is visible.
 * @param {Object} props
 * @param {'chats'|'servers'|'friends'|'profile'} [props.activeTab='chats'] - Currently active tab ID
 * @param {(tabId: string) => void} props.onTabChange - Callback fired when a tab is selected
 */
const MobileNav = ({ activeTab = 'chats', onTabChange }) => {
    const { t } = useTranslation();
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Hide navbar when keyboard is visible
        const handleResize = () => {
            const viewportHeight = window.visualViewport?.height || window.innerHeight;
            const windowHeight = window.innerHeight;
            setIsKeyboardVisible(viewportHeight < windowHeight * 0.75);
        };

        window.visualViewport?.addEventListener('resize', handleResize);
        window.addEventListener('resize', handleResize);

        return () => {
            window.visualViewport?.removeEventListener('resize', handleResize);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isKeyboardVisible) {
        return null; // Hide nav when keyboard is visible
    }

    const tabs = [
        { id: 'chats', icon: <FaCommentDots aria-hidden="true" />, label: t('nav.chats', 'Chats') },
        {
            id: 'servers',
            icon: <FaServer aria-hidden="true" />,
            label: t('nav.servers', 'Servers'),
        },
        {
            id: 'friends',
            icon: <FaUserFriends aria-hidden="true" />,
            label: t('nav.friends', 'Friends'),
        },
        { id: 'profile', icon: <FaUser aria-hidden="true" />, label: t('nav.profile', 'Profile') },
    ];

    const handleTabChange = useCallback(
        (tabId) => {
            onTabChange(tabId);
        },
        [onTabChange]
    );

    return (
        <nav className="mobile-nav" role="navigation" aria-label="Mobile navigation">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => handleTabChange(tab.id)}
                    aria-label={tab.label}
                    aria-current={activeTab === tab.id ? 'page' : undefined}
                >
                    <span className="tab-icon" aria-hidden="true">
                        {tab.icon}
                    </span>
                    <span className="tab-label">{tab.label}</span>
                    {activeTab === tab.id && <div className="tab-indicator" aria-hidden="true" />}
                </button>
            ))}
        </nav>
    );
};

const MemoizedMobileNav = memo(MobileNav);
MemoizedMobileNav.displayName = 'MobileNav';

MemoizedMobileNav.propTypes = {
    activeTab: PropTypes.string,
    onTabChange: PropTypes.func,
};
export default MemoizedMobileNav;

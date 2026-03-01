import { useEffect, useState, useCallback, memo } from 'react';
import './MobileNav.css';

/**
 * Mobile bottom navigation bar with tab switching.
 * Auto-hides when the virtual keyboard is visible.
 * @param {Object} props
 * @param {'chats'|'servers'|'friends'|'profile'} [props.activeTab='chats'] - Currently active tab ID
 * @param {(tabId: string) => void} props.onTabChange - Callback fired when a tab is selected
 */
const MobileNav = ({ activeTab = 'chats', onTabChange }) => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

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
        { id: 'chats', icon: '💬', label: 'Chats' },
        { id: 'servers', icon: '🏠', label: 'Servers' },
        { id: 'friends', icon: '👥', label: 'Friends' },
        { id: 'profile', icon: '👤', label: 'Profile' }
    ];

    const handleTabChange = useCallback((tabId) => {
        onTabChange(tabId);
    }, [onTabChange]);

    return (
        <nav className="mobile-nav" role="navigation" aria-label="Mobile navigation">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => handleTabChange(tab.id)}
                    aria-label={tab.label}
                    aria-current={activeTab === tab.id ? 'page' : undefined}
                >
                    <span className="tab-icon" aria-hidden="true">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                    {activeTab === tab.id && <div className="tab-indicator" aria-hidden="true" />}
                </button>
            ))}
        </nav>
    );
};

const MemoizedMobileNav = memo(MobileNav);
MemoizedMobileNav.displayName = 'MobileNav';

export default MemoizedMobileNav;



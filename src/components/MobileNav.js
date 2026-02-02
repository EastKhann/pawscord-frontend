import React, { useEffect, useState } from 'react';
import './MobileNav.css';

const MobileNav = ({ activeTab, onTabChange }) => {
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

    return (
        <nav className="mobile-nav">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                    {activeTab === tab.id && <div className="tab-indicator" />}
                </button>
            ))}
        </nav>
    );
};

export default MobileNav;



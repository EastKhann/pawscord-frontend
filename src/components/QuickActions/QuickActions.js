// frontend/src/components/QuickActions/QuickActions.js

import { useState, useEffect, useRef, useCallback } from 'react';
import './QuickActions.css';

/**
 * 🚀 Quick Actions - Spotlight-style command palette
 * Keyboard shortcut: Ctrl+K / Cmd+K
 * 
 * Features:
 * - Quick navigation to servers/channels
 * - Message actions (star, bookmark, translate)
 * - User actions (DM, profile)
 * - Server actions (settings, invite)
 * - AI commands (/ask, /summarize)
 */

const QuickActions = ({
    isOpen,
    onClose,
    servers = [],
    currentServer,
    currentRoom,
    user,
    onNavigate,
    onAction
}) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [results, setResults] = useState([]);
    const [category, setCategory] = useState('all');
    const inputRef = useRef(null);

    // Action definitions
    const actions = [
        // Navigation
        { id: 'home', icon: '🏠', label: 'Go to Home', category: 'navigation', keywords: ['home', 'ana sayfa'] },
        { id: 'discover', icon: '🔍', label: 'Discover Servers', category: 'navigation', keywords: ['discover', 'keşfet', 'explore'] },
        { id: 'friends', icon: '👥', label: 'Friends List', category: 'navigation', keywords: ['friends', 'arkadaşlar', 'dm'] },
        { id: 'settings', icon: '⚙️', label: 'User Settings', category: 'navigation', keywords: ['settings', 'ayarlar', 'preferences'] },

        // AI Commands
        { id: 'ai-ask', icon: '🤖', label: 'Ask AI Assistant', category: 'ai', keywords: ['ask', 'sor', 'ai', 'chatgpt'] },
        { id: 'ai-summarize', icon: '📝', label: 'Summarize Channel', category: 'ai', keywords: ['summarize', 'özet', 'tldr'] },
        { id: 'ai-translate', icon: '🌐', label: 'Translate Message', category: 'ai', keywords: ['translate', 'çevir', 'translation'] },

        // Channel Actions
        { id: 'create-channel', icon: '➕', label: 'Create Channel', category: 'channel', keywords: ['create', 'oluştur', 'kanal', 'channel'] },
        { id: 'invite', icon: '📨', label: 'Create Invite Link', category: 'channel', keywords: ['invite', 'davet', 'link'] },
        { id: 'pin-message', icon: '📌', label: 'Pin a Message', category: 'channel', keywords: ['pin', 'sabitle', 'message'] },

        // Server Actions
        { id: 'server-settings', icon: '🔧', label: 'Server Settings', category: 'server', keywords: ['server', 'sunucu', 'settings'] },
        { id: 'server-members', icon: '👤', label: 'Member List', category: 'server', keywords: ['members', 'üyeler', 'users'] },
        { id: 'server-roles', icon: '🎭', label: 'Manage Roles', category: 'server', keywords: ['roles', 'roller', 'permissions'] },

        // User Actions
        { id: 'profile', icon: '👤', label: 'Edit Profile', category: 'user', keywords: ['profile', 'profil', 'avatar'] },
        { id: 'status', icon: '🟢', label: 'Set Status', category: 'user', keywords: ['status', 'durum', 'online', 'afk'] },
        { id: 'theme', icon: '🎨', label: 'Change Theme', category: 'user', keywords: ['theme', 'tema', 'dark', 'light'] },

        // Moderation
        { id: 'mod-logs', icon: '📋', label: 'Moderation Logs', category: 'moderation', keywords: ['mod', 'logs', 'kayıtlar'] },
        { id: 'automod', icon: '🛡️', label: 'AutoMod Settings', category: 'moderation', keywords: ['automod', 'filter', 'spam'] },

        // Fun
        { id: 'giveaway', icon: '🎁', label: 'Create Giveaway', category: 'fun', keywords: ['giveaway', 'çekiliş', 'prize'] },
        { id: 'poll', icon: '📊', label: 'Create Poll', category: 'fun', keywords: ['poll', 'anket', 'vote'] },
        { id: 'event', icon: '📅', label: 'Create Event', category: 'fun', keywords: ['event', 'etkinlik', 'schedule'] },
    ];

    // Search and filter results
    useEffect(() => {
        if (!isOpen) return;

        let filtered = [...actions];

        // Add servers to results
        const serverResults = servers.map(server => ({
            id: `server-${server.id}`,
            icon: server.icon || '🏠',
            label: server.name,
            category: 'servers',
            keywords: [server.name.toLowerCase()],
            data: server
        }));

        filtered = [...filtered, ...serverResults];

        // Filter by query
        if (query) {
            const lowerQuery = query.toLowerCase();
            filtered = filtered.filter(action => {
                const matchLabel = action.label.toLowerCase().includes(lowerQuery);
                const matchKeywords = action.keywords?.some(k => k.includes(lowerQuery));
                return matchLabel || matchKeywords;
            });
        }

        // Filter by category
        if (category !== 'all') {
            filtered = filtered.filter(action => action.category === category);
        }

        setResults(filtered.slice(0, 10));
        setSelectedIndex(0);
    }, [query, category, servers, actions, isOpen]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Keyboard navigation
    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(i => Math.min(i + 1, results.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(i => Math.max(i - 1, 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (results[selectedIndex]) {
                    handleSelect(results[selectedIndex]);
                }
                break;
            case 'Escape':
                e.preventDefault();
                onClose();
                break;
            default:
                break;
        }
    }, [isOpen, results, selectedIndex, onClose]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Handle action selection
    const handleSelect = (action) => {
        if (action.category === 'servers' && action.data) {
            onNavigate?.('server', action.data);
        } else {
            onAction?.(action.id, action.data);
        }
        setQuery('');
        onClose();
    };

    // Category tabs
    const categories = [
        { id: 'all', label: 'All', icon: '🔍' },
        { id: 'navigation', label: 'Navigate', icon: '🧭' },
        { id: 'servers', label: 'Servers', icon: '🏠' },
        { id: 'ai', label: 'AI', icon: '🤖' },
        { id: 'channel', label: 'Channel', icon: '💬' },
        { id: 'moderation', label: 'Moderation', icon: '🛡️' },
    ];

    if (!isOpen) return null;

    return (
        <div className="quick-actions-overlay" onClick={onClose}>
            <div className="quick-actions-modal" onClick={e => e.stopPropagation()}>
                {/* Search Input */}
                <div className="quick-actions-search">
                    <span className="search-icon">🔍</span>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type a command or search..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        autoFocus
                    />
                    <span className="shortcut-hint">ESC</span>
                </div>

                {/* Category Tabs */}
                <div className="quick-actions-categories">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`category-tab ${category === cat.id ? 'active' : ''}`}
                            onClick={() => setCategory(cat.id)}
                        >
                            {cat.icon} {cat.label}
                        </button>
                    ))}
                </div>

                {/* Results */}
                <div className="quick-actions-results">
                    {results.length > 0 ? (
                        results.map((action, index) => (
                            <div
                                key={action.id}
                                className={`result-item ${index === selectedIndex ? 'selected' : ''}`}
                                onClick={() => handleSelect(action)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <span className="result-icon">{action.icon}</span>
                                <span className="result-label">{action.label}</span>
                                <span className="result-category">{action.category}</span>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <span>😕</span>
                            <p>No results found</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="quick-actions-footer">
                    <span>↑↓ Navigate</span>
                    <span>↵ Select</span>
                    <span>ESC Close</span>
                </div>
            </div>
        </div>
    );
};

export default QuickActions;

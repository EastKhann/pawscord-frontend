/* eslint-disable jsx-a11y/no-autofocus */
// frontend/src/components/QuickActions/QuickActions.js

import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import './QuickActions.css';

import { useTranslation } from 'react-i18next';
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
    onAction,
}) => {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [results, setResults] = useState([]);
    const [category, setCategory] = useState('all');
    const inputRef = useRef(null);

    // Action definitions
    const actions = [
        // Navigation
        {
            id: 'home',
            icon: '🏠',
            label: t('nav.home', 'Ana Sayfa'),
            category: 'navigation',
            keywords: ['home', 'ana sayfa'],
        },
        {
            id: 'discover',
            icon: '🔍',
            label: t('server.findServer', 'Sunucu Keşfet'),
            category: 'navigation',
            keywords: ['discover', t('ui.kesfet'), 'explore'],
        },
        {
            id: 'friends',
            icon: '👥',
            label: t('home.friends_title', 'Arkadaşlar'),
            category: 'navigation',
            keywords: ['friends', t('ui.arkadaslar'), 'dm'],
        },
        {
            id: 'settings',
            icon: '⚙️',
            label: t('common.settings', 'Ayarlar'),
            category: 'navigation',
            keywords: ['settings', 'ayarlar', 'preferences'],
        },

        // AI Commands
        {
            id: 'ai-ask',
            icon: '🤖',
            label: t('quickActions.askAI'),
            category: 'ai',
            keywords: ['ask', 'sor', 'ai', 'chatgpt'],
        },
        {
            id: 'ai-summarize',
            icon: '📝',
            label: t('quickActions.summarizeChannel'),
            category: 'ai',
            keywords: ['summarize', t('ui.ozet'), 'tldr'],
        },
        {
            id: 'ai-translate',
            icon: '🌐',
            label: t('quickActions.translateMessage'),
            category: 'ai',
            keywords: ['translate', t('ui.cevir'), 'translation'],
        },

        // Channel Actions
        {
            id: 'create-channel',
            icon: '➕',
            label: t('quickActions.createChannel'),
            category: 'channel',
            keywords: ['create', t('ui.olustur'), 'kanal', 'channel'],
        },
        {
            id: 'invite',
            icon: '📨',
            label: t('quickActions.createInvite'),
            category: 'channel',
            keywords: ['invite', 'davet', 'link'],
        },
        {
            id: 'pin-message',
            icon: '📌',
            label: t('quickActions.pinMessage'),
            category: 'channel',
            keywords: ['pin', 'sabitle', 'message'],
        },

        // Server Actions
        {
            id: 'server-settings',
            icon: '🔧',
            label: t('quickActions.serverSettings'),
            category: 'server',
            keywords: ['server', 'sunucu', 'settings'],
        },
        {
            id: 'server-members',
            icon: '👤',
            label: t('quickActions.memberList'),
            category: 'server',
            keywords: ['members', 'users'],
        },
        {
            id: 'server-roles',
            icon: '🎭',
            label: t('quickActions.manageRoles'),
            category: 'server',
            keywords: ['roles', 'roller', 'permissions'],
        },

        // User Actions
        {
            id: 'profile',
            icon: '👤',
            label: t('quickActions.editProfile'),
            category: 'user',
            keywords: ['profile', 'profil', 'avatar'],
        },
        {
            id: 'status',
            icon: '🟢',
            label: t('quickActions.setStatus'),
            category: 'user',
            keywords: ['status', 'durum', 'online', 'afk'],
        },
        {
            id: 'theme',
            icon: '🎨',
            label: t('quickActions.changeTheme'),
            category: 'user',
            keywords: ['theme', 'tema', 'dark', 'light'],
        },

        // Moderation
        {
            id: 'mod-logs',
            icon: '📋',
            label: t('quickActions.modLogs'),
            category: 'moderation',
            keywords: ['mod', 'logs', t('ui.kayitlar_2')],
        },
        {
            id: 'automod',
            icon: '🛡️',
            label: t('quickActions.autoMod'),
            category: 'moderation',
            keywords: ['automod', 'filter', 'spam'],
        },

        // Fun
        {
            id: 'giveaway',
            icon: '🎁',
            label: t('quickActions.createGiveaway'),
            category: 'fun',
            keywords: ['giveaway', t('ui.cekilis'), 'prize'],
        },
        {
            id: 'poll',
            icon: '📊',
            label: t('quickActions.createPoll'),
            category: 'fun',
            keywords: ['poll', 'anket', 'vote'],
        },
        {
            id: 'event',
            icon: '📅',
            label: t('quickActions.createEvent'),
            category: 'fun',
            keywords: ['event', 'etkinlik', 'schedule'],
        },
    ];

    // Search and filter results
    useEffect(() => {
        if (!isOpen) return;

        let filtered = [...actions];

        // Add servers to results
        const serverResults = servers.map((server) => ({
            id: `server-${server.id}`,
            icon: server.icon || '🏠',
            label: server.name,
            category: 'servers',
            keywords: [server.name.toLowerCase()],
            data: server,
        }));

        filtered = [...filtered, ...serverResults];

        // Filter by query
        if (query) {
            const lowerQuery = query.toLowerCase();
            filtered = filtered.filter((action) => {
                const matchLabel = action.label.toLowerCase().includes(lowerQuery);
                const matchKeywords = action.keywords?.some((k) => k.includes(lowerQuery));
                return matchLabel || matchKeywords;
            });
        }

        // Filter by category
        if (category !== 'all') {
            filtered = filtered.filter((action) => action.category === category);
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
    const handleKeyDown = useCallback(
        (e) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex((i) => Math.max(i - 1, 0));
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
        },
        [isOpen, results, selectedIndex, onClose]
    );

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
        { id: 'all', label: t('quickActions.all'), icon: '🔍' },
        { id: 'navigation', label: t('quickActions.navigation'), icon: '🧭' },
        { id: 'servers', label: t('nav.servers'), icon: '🏠' },
        { id: 'ai', label: t('quickActions.ai'), icon: '🤖' },
        { id: 'channel', label: t('quickActions.channel'), icon: '💬' },
        { id: 'moderation', label: t('quickActions.moderation'), icon: '🛡️' },
    ];

    if (!isOpen) return null;

    return (
        <div
            className="quick-actions-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="quick-actions-modal"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                {/* Search Input */}
                <div className="quick-actions-search">
                    <span className="search-icon">🔍</span>
                    {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={t('quickActions.searchPlaceholder')}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <span className="shortcut-hint">ESC</span>
                </div>

                {/* Category Tabs */}
                <div className="quick-actions-categories">
                    {categories.map((cat) => (
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
                                role="button"
                                tabIndex={0}
                                onClick={() => handleSelect(action)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                onKeyDown={(e) =>
                                    (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                                }
                            >
                                <span className="result-icon">{action.icon}</span>
                                <span className="result-label">{action.label}</span>
                                <span className="result-category">{action.category}</span>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <span>😕</span>
                            <p>{t('panels.noResults')}</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="quick-actions-footer">
                    <span>↑↓ {t('quickActions.navigate')}</span>
                    <span>↵ {t('quickActions.select')}</span>
                    <span>ESC {t('quickActions.close')}</span>
                </div>
            </div>
        </div>
    );
};

QuickActions.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    servers: PropTypes.array,
    currentServer: PropTypes.object,
    currentRoom: PropTypes.object,
    user: PropTypes.object,
    onNavigate: PropTypes.func,
    onAction: PropTypes.func,
};
export default QuickActions;

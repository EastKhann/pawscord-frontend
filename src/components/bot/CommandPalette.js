// components/CommandPalette.js
// 🎨 Command Palette - All shortcuts and commands in one place

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaTimes, FaKeyboard } from 'react-icons/fa';
import { SHORTCUTS, getShortcutKey } from '../../hooks/useKeyboardShortcuts';
import './CommandPalette.css';

const CommandPalette = ({ onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const [filter, setFilter] = useState('all'); // all, keyboard, actions
    const cmdKey = getShortcutKey();

    const commands = [
        {
            category: t('shortcuts.navigation'),
            items: [
                {
                    name: t('shortcuts.quickSwitcher'),
                    shortcut: `${cmdKey}+K`,
                    description: t('ui.channel_or_kullanici_search'),
                },
                {
                    name: t('shortcuts.previousChannel'),
                    shortcut: 'Alt+↑',
                    description: t('ui.onceki_kanala_git'),
                },
                {
                    name: t('shortcuts.nextChannel'),
                    shortcut: 'Alt+↓',
                    description: t('shortcuts.goToNextChannel'),
                },
            ],
        },
        {
            category: t('shortcuts.search'),
            items: [
                {
                    name: t('shortcuts.advancedSearch'),
                    shortcut: `${cmdKey}+F`,
                    description: t('ui.mesajlarda_gelismis_search'),
                },
            ],
        },
        {
            category: t('shortcuts.messaging'),
            items: [
                {
                    name: t('shortcuts.sendMessage'),
                    shortcut: `${cmdKey}+Enter`,
                    description: t('ui.mesaji_gonder'),
                },
                {
                    name: t('shortcuts.editLastMessage'),
                    shortcut: '↑',
                    description: t('shortcuts.editLastMessageDesc'),
                },
                {
                    name: t('shortcuts.toggleEmojiPicker'),
                    shortcut: `${cmdKey}+E`,
                    description: t('ui.emoji_picker_toggle'),
                },
            ],
        },
        {
            category: t('shortcuts.voice'),
            items: [
                {
                    name: t('shortcuts.muteUnmute'),
                    shortcut: `${cmdKey}+Shift+M`,
                    description: t('shortcuts.toggleMic'),
                },
                {
                    name: t('shortcuts.deafenUndeafen'),
                    shortcut: `${cmdKey}+Shift+D`,
                    description: t('ui.kulakligi_closeopen'),
                },
            ],
        },
        {
            category: t('shortcuts.interface'),
            items: [
                {
                    name: t('shortcuts.toggleSidebar'),
                    shortcut: `${cmdKey}+B`,
                    description: t('ui.kenar_cubugunu_openkapa'),
                },
                {
                    name: t('shortcuts.toggleUserInfo'),
                    shortcut: `${cmdKey}+I`,
                    description: t('shortcuts.toggleUserInfoDesc'),
                },
                {
                    name: t('shortcuts.toggleTheme'),
                    shortcut: `${cmdKey}+Shift+T`,
                    description: t('ui.karanlikaydinlik_mod'),
                },
                {
                    name: t('shortcuts.commandList'),
                    shortcut: `${cmdKey}+/`,
                    description: t('shortcuts.openThisList'),
                },
                {
                    name: t('shortcuts.closeCancel'),
                    shortcut: 'Esc',
                    description: t('shortcuts.closeCancelDesc'),
                },
            ],
        },
    ];

    return (
        <div
            className="command-palette-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="command-palette"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                {/* Header */}
                <div className="palette-header">
                    <div className="palette-title">
                        <FaKeyboard /> {t('shortcuts.title')}
                    </div>
                    <button aria-label={t('common.close')} className="palette-close" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Filter Tabs */}
                <div className="palette-filters">
                    <button
                        aria-label={t('bot.showAll', 'Show all')}
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilter('all')}
                    >
                        {t('shortcuts.all')}
                    </button>
                    <button
                        aria-label={t('bot.showKeyboard', 'Show keyboard commands')}
                        className={filter === 'keyboard' ? 'active' : ''}
                        onClick={() => setFilter('keyboard')}
                    >
                        {t('shortcuts.keyboard')}
                    </button>
                    <button
                        aria-label={t('bot.showActions', 'Show action commands')}
                        className={filter === 'actions' ? 'active' : ''}
                        onClick={() => setFilter('actions')}
                    >
                        {t('shortcuts.actions')}
                    </button>
                </div>

                {/* Commands List */}
                <div className="commands-list">
                    {commands.map((category, idx) => (
                        <div key={`item-${idx}`} className="command-category">
                            <h3>{category.category}</h3>
                            <div className="command-items">
                                {category.items.map((cmd, cmdIdx) => (
                                    <div key={cmdIdx} className="command-item">
                                        <div className="command-info">
                                            <div className="command-name">{cmd.name}</div>
                                            <div className="command-description">
                                                {cmd.description}
                                            </div>
                                        </div>
                                        <div className="command-shortcut">
                                            {cmd.shortcut.split('+').map((key, i) => (
                                                <React.Fragment key={`item-${i}`}>
                                                    {i > 0 && <span className="plus">+</span>}
                                                    <kbd>{key}</kbd>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="palette-footer">
                    <div className="footer-hint">
                        <kbd>{cmdKey}</kbd> + <kbd>/</kbd> {t('shortcuts.openAnytime')}
                    </div>
                </div>
            </div>
        </div>
    );
};

CommandPalette.propTypes = {
    onClose: PropTypes.func,
};
export default CommandPalette;

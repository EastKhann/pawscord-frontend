/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// frontend/src/components/UserContextMenu.js
import { useState, useEffect, useRef, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next'; // 🔥 Portal for
import {
    FaUser,
    FaComments,
    FaArrowRight,
    FaBan,
    FaUserShield,
    FaVolumeMute,
} from 'react-icons/fa';

const S = {
    fixed: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2147483646,
        background: 'transparent',
        pointerEvents: 'auto',
    },
};

const UserContextMenu = ({
    x,
    y,
    user,
    currentUser,
    onClose,
    onAction,
    voiceChannels = [],
    isAdmin = false,
    isInVoiceRoom = false,
    friendsList = [],
    conversationId = null, // 🔥 YENİ: DM conversation ID
}) => {
    const { t } = useTranslation();
    const menuRef = useRef(null);
    const [showMoveSubmenu, setShowMoveSubmenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [focusedIndex, setFocusedIndex] = useState(0);

    // Friend durumunu kontrol et - FIX: Daha kapsamlı kontrol
    const isFriend =
        friendsList &&
        friendsList.length > 0 &&
        friendsList.some((f) => {
            // friendsList forde username, sender_username, receiver_username olabilir
            const friendUsername =
                f.username ||
                f.sender_username ||
                f.receiver_username ||
                f.display_name ||
                f.friend?.username;
            const targetUsername = user.username || user.display_name;

            return friendUsername === targetUsername && friendUsername !== currentUser.username;
        });

    // 🎯 Performance: useCallback with memoize
    const handleAction = useCallback(
        (action, extraData = null) => {
            onAction(action, user, extraData);
            onClose();
        },
        [onAction, user, onClose]
    );

    // 🎯 Performance: Memoized click handlers
    const handleProfileClick = useCallback(() => handleAction('profile'), [handleAction]);
    const handleMessageClick = useCallback(() => handleAction('message'), [handleAction]);
    const handleInviteClick = useCallback(() => handleAction('invite_to_server'), [handleAction]);
    const handleRemoveFriendClick = useCallback(
        () => handleAction('remove_friend'),
        [handleAction]
    );
    const handleAddFriendClick = useCallback(() => handleAction('add_friend'), [handleAction]);
    const handleMuteClick = useCallback(() => handleAction('mute_user'), [handleAction]);
    const handleBlockClick = useCallback(() => handleAction('block_user'), [handleAction]);
    const handleKickClick = useCallback(() => handleAction('kick'), [handleAction]);
    const handleServerMuteClick = useCallback(() => handleAction('server_mute'), [handleAction]);

    // 🎯 Performance: Memoized keydown handlers
    const handleProfileKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAction('profile');
            }
        },
        [handleAction]
    );
    const handleMessageKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAction('message');
            }
        },
        [handleAction]
    );
    const handleInviteKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAction('invite_to_server');
            }
        },
        [handleAction]
    );
    const handleRemoveFriendKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAction('remove_friend');
            }
        },
        [handleAction]
    );
    const handleAddFriendKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAction('add_friend');
            }
        },
        [handleAction]
    );
    const handleMuteKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAction('mute_user');
            }
        },
        [handleAction]
    );
    const handleBlockKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAction('block_user');
            }
        },
        [handleAction]
    );
    const handleKickKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAction('kick');
            }
        },
        [handleAction]
    );
    const handleServerMuteKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAction('server_mute');
            }
        },
        [handleAction]
    );

    // 🎯 Performance: Memoized focus index handlers
    const handleFocus0 = useCallback(() => setFocusedIndex(0), []);
    const handleFocus1 = useCallback(() => setFocusedIndex(1), []);
    const handleFocus2 = useCallback(() => setFocusedIndex(2), []);
    const handleFocus3 = useCallback(() => setFocusedIndex(3), []);
    const handleFocus4 = useCallback(() => setFocusedIndex(4), []);
    const handleFocus5 = useCallback(() => setFocusedIndex(5), []);
    const handleFocus6 = useCallback(() => setFocusedIndex(6), []);

    // 🎯 Performance: Submenu handlers
    const handleShowMoveSubmenu = useCallback(() => {
        setShowMoveSubmenu(true);
        setFocusedIndex(4);
    }, []);
    const handleHideMoveSubmenu = useCallback(() => setShowMoveSubmenu(false), []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onClose();
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setFocusedIndex((prev) => Math.min(prev + 1, getMenuItemCount() - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setFocusedIndex((prev) => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerFocusedAction();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        // 🎯 Auto-focus menu
        if (menuRef.current) {
            menuRef.current.focus();
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const getMenuItemCount = () => {
        let count = 2; // Profile + Message
        if (isInVoiceRoom) count += 1; // Volume
        if (isAdmin && isInVoiceRoom) count += 3; // Move, Kick, Mute
        return count;
    };

    const triggerFocusedAction = () => {
        const actions = ['profile', 'message'];
        if (isInVoiceRoom) actions.push('volume');
        if (isAdmin && isInVoiceRoom) {
            actions.push('move', 'kick', 'server_mute');
        }

        if (actions[focusedIndex]) {
            handleAction(actions[focusedIndex]);
        }
    };

    // Menü konumunu ayarla (ekran dına taşmasın)
    const adjustedX = Math.min(x, window.innerWidth - 220);
    const adjustedY = Math.min(y, window.innerHeight - 300);

    // 🔥 Portal root element — fall back to document.body if portal-root div doesn't exist
    const portalRoot = document.getElementById('portal-root') || document.body;

    const menuStyle = {
        ...styles.menu,
        left: `${adjustedX}px`,
        top: `${adjustedY}px`,
        zIndex: 2147483647,
        position: 'fixed',
        pointerEvents: 'auto',
    };
    const item0Style = {
        ...styles.menuItem,
        background: focusedIndex === 0 ? 'rgba(88, 101, 242, 0.2)' : 'transparent',
    };
    const item1Style = {
        ...styles.menuItem,
        background: focusedIndex === 1 ? 'rgba(88, 101, 242, 0.2)' : 'transparent',
    };
    const item2Style = {
        ...styles.menuItem,
        background: focusedIndex === 2 ? 'rgba(88, 101, 242, 0.2)' : 'transparent',
    };
    const item3DangerStyle = {
        ...styles.menuItemDanger,
        background: focusedIndex === 3 ? 'rgba(237, 66, 69, 0.15)' : 'transparent',
    };
    const item3Style = {
        ...styles.menuItem,
        background: focusedIndex === 3 ? 'rgba(88, 101, 242, 0.2)' : 'transparent',
    };
    const item4Style = {
        ...styles.menuItem,
        background: focusedIndex === 4 ? 'rgba(88, 101, 242, 0.2)' : 'transparent',
    };
    const item5DangerStyle = {
        ...styles.menuItemDanger,
        background: focusedIndex === 5 ? 'rgba(237, 66, 69, 0.15)' : 'transparent',
    };
    const item6Style = {
        ...styles.menuItem,
        background: focusedIndex === 6 ? 'rgba(88, 101, 242, 0.2)' : 'transparent',
    };

    return ReactDOM.createPortal(
        <>
            {/* 🔥 BACKDROP - Arka plan tıklaması for */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div role="presentation" style={S.fixed} onClick={onClose} />

            {/* 🔥 ANA MENÜ */}
            <div
                ref={menuRef}
                role="menu"
                aria-label={`${user} for eylemler`}
                tabIndex={-1}
                style={menuStyle}
            >
                {/* View Profile */}
                <div
                    role="menuitem"
                    tabIndex={0}
                    className="user-context-menu-item"
                    style={item0Style}
                    onClick={handleProfileClick}
                    onKeyDown={handleProfileKeyDown}
                    onMouseEnter={handleFocus0}
                >
                    <FaUser /> {t('contextMenu.viewProfile', 'View Profile')}
                </div>

                {/* Send Message */}
                <div
                    role="menuitem"
                    tabIndex={0}
                    className="user-context-menu-item"
                    style={item1Style}
                    onClick={handleMessageClick}
                    onKeyDown={handleMessageKeyDown}
                    onMouseEnter={handleFocus1}
                >
                    <FaComments /> {t('contextMenu.sendMessage', 'Send Message')}
                </div>

                {/* 🎫 Invite to Server */}
                <div
                    role="menuitem"
                    tabIndex={0}
                    className="user-context-menu-item"
                    style={item2Style}
                    onClick={handleInviteClick}
                    onKeyDown={handleInviteKeyDown}
                    onMouseEnter={handleFocus2}
                >
                    <FaArrowRight /> {t('contextMenu.inviteToServer', 'Invite to Server')}
                </div>

                {/* Arkadaş Ekle/Çıkar */}
                {isFriend ? (
                    <div
                        role="menuitem"
                        tabIndex={0}
                        className="user-context-menu-item-danger"
                        style={item3DangerStyle}
                        onClick={handleRemoveFriendClick}
                        onKeyDown={handleRemoveFriendKeyDown}
                        onMouseEnter={handleFocus3}
                    >
                        <FaBan /> {t('contextMenu.removeFriend', 'Remove Friend')}
                    </div>
                ) : (
                    <div
                        role="menuitem"
                        tabIndex={0}
                        className="user-context-menu-item"
                        style={item3Style}
                        onClick={handleAddFriendClick}
                        onKeyDown={handleAddFriendKeyDown}
                        onMouseEnter={handleFocus3}
                    >
                        <FaUser /> {t('contextMenu.addFriend', 'Add Friend')}
                    </div>
                )}

                {/* 🔥 Ayropen */}
                <div role="separator" style={styles.separator} />

                {/* 🔇 Mute */}
                <div
                    role="menuitem"
                    tabIndex={0}
                    className="user-context-menu-item"
                    style={item4Style}
                    onClick={handleMuteClick}
                    onKeyDown={handleMuteKeyDown}
                    onMouseEnter={handleFocus4}
                >
                    <FaVolumeMute /> {t('contextMenu.mute', 'Mute')}
                </div>

                {/* 🚫 Block User */}
                <div
                    role="menuitem"
                    tabIndex={0}
                    className="user-context-menu-item-danger"
                    style={item5DangerStyle}
                    onClick={handleBlockClick}
                    onKeyDown={handleBlockKeyDown}
                    onMouseEnter={handleFocus5}
                >
                    <FaBan /> {t('contextMenu.blockUser', 'Block User')}
                </div>

                {/* Admin/Mod Eylemleri */}
                {isAdmin && isInVoiceRoom && (
                    <>
                        <div role="separator" style={styles.separator} />
                        <div style={styles.sectionTitle} aria-label={t('ui.moderasyon_secenaddri')}>
                            {t('contextMenu.moderation', 'Moderation')}
                        </div>

                        {/* Channela Ta */}
                        <div
                            role="menuitem"
                            tabIndex={0}
                            aria-haspopup="true"
                            aria-expanded={showMoveSubmenu}
                            className="user-context-menu-item"
                            style={item4Style}
                            onMouseEnter={handleShowMoveSubmenu}
                            onMouseLeave={handleHideMoveSubmenu}
                        >
                            <FaArrowRight /> {t('contextMenu.moveToChannel', 'Move to Channel')}
                            {showMoveSubmenu && voiceChannels.length > 0 && (
                                <div role="menu" aria-label="Hedef kanallar" style={styles.submenu}>
                                    {voiceChannels.map((channel) => (
                                        <div
                                            key={channel.slug}
                                            role="menuitem"
                                            tabIndex={0}
                                            className="user-context-submenu-item"
                                            style={styles.submenuItem}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAction('move', channel.slug);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleAction('move', channel.slug);
                                                }
                                            }}
                                        >
                                            {channel.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Channeldan At */}
                        <div
                            role="menuitem"
                            tabIndex={0}
                            className="user-context-menu-item-danger"
                            style={item5DangerStyle}
                            onClick={handleKickClick}
                            onKeyDown={handleKickKeyDown}
                            onMouseEnter={handleFocus5}
                        >
                            <FaBan /> {t('contextMenu.kickFromChannel', 'Kick from Channel')}
                        </div>

                        {/* Mikrofonu Close */}
                        <div
                            role="menuitem"
                            tabIndex={0}
                            className="user-context-menu-item"
                            style={item6Style}
                            onClick={handleServerMuteClick}
                            onKeyDown={handleServerMuteKeyDown}
                            onMouseEnter={handleFocus6}
                        >
                            <FaUserShield /> {t('contextMenu.serverMute', 'Server Mute')}
                        </div>
                    </>
                )}
            </div>
        </>,
        portalRoot // 🔥 Portal target
    );
};

const styles = {
    menu: {
        background: '#111214',
        borderRadius: '4px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
        minWidth: '200px',
        padding: '6px 0',
        color: '#dbdee1',
        fontSize: '14px',
        border: '1px solid #0b0e1b',
        // position ve zIndex inline style'da tanımlı
    },
    menuItem: {
        padding: '8px 12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'background 0.1s',
        position: 'relative',
    },
    menuItemDanger: {
        padding: '8px 12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'background 0.1s',
        color: '#f23f42',
        position: 'relative',
    },
    separator: {
        height: '1px',
        background: '#0d0e10',
        margin: '6px 0',
    },
    sectionTitle: {
        fontSize: '11px',
        textTransform: 'uppercase',
        color: '#949ba4',
        padding: '6px 12px 4px',
        fontWeight: '600',
    },
    submenu: {
        position: 'absolute',
        left: '100%',
        top: 0,
        background: '#111214',
        borderRadius: '4px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
        minWidth: '180px',
        padding: '6px 0',
        border: '1px solid #0b0e1b',
        marginLeft: '4px',
    },
    submenuItem: {
        padding: '8px 12px',
        cursor: 'pointer',
        transition: 'background 0.1s',
    },
};

// CSS for hover effects - Only inject once
if (!document.getElementById('user-context-menu-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'user-context-menu-styles';
    styleSheet.textContent = `
        .user-context-menu-item:hover {
            background: rgba(88, 101, 242, 0.3) !important;
        }
        .user-context-menu-item-danger:hover {
            background: rgba(237, 66, 69, 0.2) !important;
        }
        .user-context-submenu-item:hover {
            background: rgba(88, 101, 242, 0.3) !important;
        }
        
        /* ✨ Keyboard Navigation Focus Styles */
        .user-context-menu-item:focus,
        .user-context-menu-item-danger:focus,
        .user-context-submenu-item:focus {
            outline: 2px solid rgba(88, 101, 242, 0.8);
            outline-offset: -2px;
        }
        
        /* ✨ Menu Container Focus */
        [role="menu"]:focus {
            outline: none;
        }
        
        /* ✨ Smooth Transitions */
        .user-context-menu-item,
        .user-context-menu-item-danger,
        .user-context-submenu-item {
            transition: background 0.15s ease, outline 0.15s ease;
        }
    `;
    document.head.appendChild(styleSheet);
}

UserContextMenu.propTypes = {
    x: PropTypes.object,
    y: PropTypes.object,
    user: PropTypes.object,
    currentUser: PropTypes.object,
    onClose: PropTypes.func,
    onAction: PropTypes.func,
    voiceChannels: PropTypes.array,
    isAdmin: PropTypes.bool,
    isInVoiceRoom: PropTypes.bool,
    friendsList: PropTypes.object,
};
export default memo(UserContextMenu);

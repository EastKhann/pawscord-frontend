/**
 * ⋮ ToolbarMenu — Dropdown menu in chat header
 * Extracted from App.js inline JSX
 */
import React, { useCallback, memo } from 'react';
import {
    FaLock,
    FaThumbtack,
    FaLink,
    FaBell,
    FaBellSlash,
    FaInbox,
    FaSmile,
    FaFilm,
    FaCoffee,
    FaCode,
    FaMagic,
    FaBroom,
    FaTrash,
} from 'react-icons/fa';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

// -- dynamic style helpers (pass 2) --
// -- extracted inline style constants --

const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '14px',
    backgroundColor: 'transparent',
    color: '#dbdee1',
    transition: 'all 0.15s ease',
};

const _st1059 = { ...menuItemStyle, color: '#f23f42' };
const _st1060 = { ...menuItemStyle, color: '#f23f42', fontWeight: '600' };
const _st1061 = { ...menuItemStyle, color: '#5865f2', fontWeight: '600' };

function ToolbarMenu({
    activeChat,
    hasKey,
    modals,
    soundSettings,
    isInVoice,
    username,
    openModal,
    closeModal,
    toggleModal,
    handleCopyLink,
    toggleNotifications,
    handleSummarize,
    handleClearChat,
    handleAdminDeleteConversation,
}) {
    const { t } = useTranslation();
    const hoverOn = (e) => {
        e.currentTarget.style.backgroundColor = '#5865f2';
        e.currentTarget.style.color = '#ffffff';
    };
    const hoverOff = (e, color = '#dbdee1') => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = color;
    };

    const handleEncModal = useCallback(() => {
        openModal('encModal');
        closeModal('toolbarMenu');
    }, [openModal, closeModal]);
    const handlePinned = useCallback(() => {
        toggleModal('pinned');
        closeModal('toolbarMenu');
    }, [toggleModal, closeModal]);
    const handleCopy = useCallback(() => {
        handleCopyLink();
        closeModal('toolbarMenu');
    }, [handleCopyLink, closeModal]);
    const handleNotif = useCallback(() => {
        toggleNotifications();
        closeModal('toolbarMenu');
    }, [toggleNotifications, closeModal]);
    const handleMentions = useCallback(() => {
        openModal('mentionsInbox');
        closeModal('toolbarMenu');
    }, [openModal, closeModal]);
    const handleStatus = useCallback(() => {
        openModal('customStatus');
        closeModal('toolbarMenu');
    }, [openModal, closeModal]);
    const handleCinema = useCallback(() => {
        openModal('cinema');
        closeModal('toolbarMenu');
    }, [openModal, closeModal]);
    const handleDJ = useCallback(() => {
        openModal('dJ');
        closeModal('toolbarMenu');
    }, [openModal, closeModal]);
    const handleWhiteboard = useCallback(() => {
        openModal('whiteboard');
        closeModal('toolbarMenu');
    }, [openModal, closeModal]);
    const handleSoundboard = useCallback(() => {
        openModal('soundboard');
        closeModal('toolbarMenu');
    }, [openModal, closeModal]);
    const handleSummarizeClick = useCallback(() => {
        handleSummarize();
        closeModal('toolbarMenu');
    }, [handleSummarize, closeModal]);
    const handleClearChatClick = useCallback(() => {
        handleClearChat();
        closeModal('toolbarMenu');
    }, [handleClearChat, closeModal]);
    const handleAdminDelete = useCallback(() => {
        handleAdminDeleteConversation(activeChat.id);
        closeModal('toolbarMenu');
    }, [handleAdminDeleteConversation, activeChat.id, closeModal]);
    const handleFeatureHub = useCallback(() => {
        openModal('featureHub');
        closeModal('toolbarMenu');
    }, [openModal, closeModal]);

    return (
        <div role="menu" aria-label="Chat tools menu">
            {/* 🔐 Encryptme (Sadece DM) */}
            {activeChat.type === 'dm' && (
                <button
                    onClick={handleEncModal}
                    style={{ ...menuItemStyle, color: hasKey ? '#23a559' : '#dbdee1' }}
                    onMouseEnter={hoverOn}
                    onMouseLeave={(e) => hoverOff(e, hasKey ? '#23a559' : '#dbdee1')}
                    role="menuitem"
                >
                    {hasKey ? <FaLock /> : <FaLock />}
                    <span>{hasKey ? t('toolbar.encrypted') : t('toolbar.encrypt')}</span>
                </button>
            )}

            {/* 📌 Pinned Messages */}
            <button
                onClick={handlePinned}
                style={{ ...menuItemStyle, color: modals.pinned ? '#f5a524' : '#dbdee1' }}
                onMouseEnter={hoverOn}
                onMouseLeave={(e) => hoverOff(e, modals.pinned ? '#f5a524' : '#dbdee1')}
                role="menuitem"
            >
                <FaThumbtack />
                <span>{t('toolbar.pinnedMessages')}</span>
            </button>

            {/* 🔗 Link Copy */}
            <button
                onClick={handleCopy}
                style={menuItemStyle}
                onMouseEnter={hoverOn}
                onMouseLeave={(e) => hoverOff(e)}
                role="menuitem"
            >
                <FaLink />
                <span>{t('toolbar.copyLink')}</span>
            </button>

            {/* 🔕 Mute */}
            <button
                onClick={handleNotif}
                style={{
                    ...menuItemStyle,
                    color: soundSettings.notifications ? '#23a559' : '#f23f42',
                }}
                onMouseEnter={hoverOn}
                onMouseLeave={(e) =>
                    hoverOff(e, soundSettings.notifications ? '#23a559' : '#f23f42')
                }
                role="menuitem"
            >
                {soundSettings.notifications ? <FaBell /> : <FaBellSlash />}
                <span>{soundSettings.notifications ? t('toolbar.mute') : t('toolbar.unmute')}</span>
            </button>

            <div />

            {/* 📬 Bahsedilmeler */}
            <button
                onClick={handleMentions}
                style={menuItemStyle}
                onMouseEnter={hoverOn}
                onMouseLeave={(e) => hoverOff(e)}
                role="menuitem"
            >
                <FaInbox />
                <span>{t('toolbar.mentions')}</span>
            </button>

            {/* 🎭 Set Status */}
            <button
                onClick={handleStatus}
                style={menuItemStyle}
                onMouseEnter={hoverOn}
                onMouseLeave={(e) => hoverOff(e)}
                role="menuitem"
            >
                <FaSmile />
                <span>{t('toolbar.setStatus')}</span>
            </button>

            <div />

            {/* 🎬 Sinema */}
            <button
                onClick={handleCinema}
                style={menuItemStyle}
                onMouseEnter={hoverOn}
                onMouseLeave={(e) => hoverOff(e)}
                role="menuitem"
            >
                <FaFilm />
                <span>{t('toolbar.cinemaMode')}</span>
            </button>

            {/* 🎵 DJ Modu */}
            <button
                onClick={handleDJ}
                style={menuItemStyle}
                onMouseEnter={hoverOn}
                onMouseLeave={(e) => hoverOff(e)}
                role="menuitem"
            >
                <FaCoffee />
                <span>{t('toolbar.djMode')}</span>
            </button>

            {/* 🖍️ Beyaz Tahta */}
            <button
                onClick={handleWhiteboard}
                style={menuItemStyle}
                onMouseEnter={hoverOn}
                onMouseLeave={(e) => hoverOff(e)}
                role="menuitem"
            >
                <FaCode />
                <span>{t('toolbar.whiteboard')}</span>
            </button>

            {/* 🎤 Sound Effects */}
            {isInVoice && (
                <button
                    onClick={handleSoundboard}
                    style={menuItemStyle}
                    onMouseEnter={hoverOn}
                    onMouseLeave={(e) => hoverOff(e)}
                    role="menuitem"
                >
                    <FaMagic />
                    <span>{t('toolbar.soundEffects')}</span>
                </button>
            )}

            {/* 📊 Özetle + Clear (Oda ise) */}
            {activeChat.type === 'room' && (
                <>
                    <div />
                    <button
                        onClick={handleSummarizeClick}
                        style={menuItemStyle}
                        onMouseEnter={hoverOn}
                        onMouseLeave={(e) => hoverOff(e)}
                        role="menuitem"
                    >
                        <FaMagic />
                        <span>{t('toolbar.summarizeChat')}</span>
                    </button>
                    <button
                        onClick={handleClearChatClick}
                        style={_st1059}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f23f42';
                            e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => hoverOff(e, '#f23f42')}
                        role="menuitem"
                    >
                        <FaBroom />
                        <span>{t('toolbar.clearChat')}</span>
                    </button>
                    {username === 'admin' && activeChat.type === 'dm' && (
                        <>
                            <div />
                            <button
                                onClick={handleAdminDelete}
                                style={_st1060}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f23f42';
                                    e.currentTarget.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e) => hoverOff(e, '#f23f42')}
                                title="Yönetici: Konuşmayı kalıcı sil"
                                role="menuitem"
                            >
                                <FaTrash />
                                <span>⚠️ KALIİCI SİL (YÖNETİCİ)</span>
                            </button>
                        </>
                    )}
                </>
            )}

            {/* 🚀 All Features */}
            <div />
            <button
                onClick={handleFeatureHub}
                style={_st1061}
                onMouseEnter={hoverOn}
                onMouseLeave={(e) => hoverOff(e, '#5865f2')}
                role="menuitem"
            >
                🚀<span>{t('toolbar.allFeatures')}</span>
            </button>
        </div>
    );
}

ToolbarMenu.propTypes = {
    activeChat: PropTypes.object,
    hasKey: PropTypes.bool,
    modals: PropTypes.object,
    soundSettings: PropTypes.object,
    isInVoice: PropTypes.bool,
    username: PropTypes.string,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    toggleModal: PropTypes.func,
    handleCopyLink: PropTypes.func,
    toggleNotifications: PropTypes.func,
    handleSummarize: PropTypes.func,
    handleClearChat: PropTypes.func,
    handleAdminDeleteConversation: PropTypes.func,
};

export default memo(ToolbarMenu);

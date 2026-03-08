/**
 * ⋮ ToolbarMenu — Dropdown menu in chat header
 * Extracted from App.js inline JSX
 */
import React, { useCallback, memo } from 'react';
import { FaLock, FaThumbtack, FaLink, FaBell, FaBellSlash, FaInbox, FaSmile, FaFilm, FaCoffee, FaCode, FaMagic, FaBroom, FaTrash } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

const menuItemStyle = {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '10px 16px', border: 'none', width: '100%',
    textAlign: 'left', cursor: 'pointer', fontSize: '14px',
    backgroundColor: 'transparent', color: '#dbdee1',
    transition: 'all 0.15s ease'
};

export default memo(function ToolbarMenu({
    activeChat, hasKey, modals, soundSettings,
    isInVoice, username,
    openModal, closeModal, toggleModal,
    handleCopyLink, toggleNotifications,
    handleSummarize, handleClearChat, handleAdminDeleteConversation,
}) {
    const hoverOn = (e) => { e.currentTarget.style.backgroundColor = '#5865f2'; e.currentTarget.style.color = '#ffffff'; };
    const hoverOff = (e, color = '#dbdee1') => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = color; };

    const handleEncModal = useCallback(() => { openModal('encModal'); closeModal('toolbarMenu'); }, [openModal, closeModal]);
    const handlePinned = useCallback(() => { toggleModal('pinned'); closeModal('toolbarMenu'); }, [toggleModal, closeModal]);
    const handleCopy = useCallback(() => { handleCopyLink(); closeModal('toolbarMenu'); }, [handleCopyLink, closeModal]);
    const handleNotif = useCallback(() => { toggleNotifications(); closeModal('toolbarMenu'); }, [toggleNotifications, closeModal]);
    const handleMentions = useCallback(() => { openModal('mentionsInbox'); closeModal('toolbarMenu'); }, [openModal, closeModal]);
    const handleStatus = useCallback(() => { openModal('customStatus'); closeModal('toolbarMenu'); }, [openModal, closeModal]);
    const handleCinema = useCallback(() => { openModal('cinema'); closeModal('toolbarMenu'); }, [openModal, closeModal]);
    const handleDJ = useCallback(() => { openModal('dJ'); closeModal('toolbarMenu'); }, [openModal, closeModal]);
    const handleWhiteboard = useCallback(() => { openModal('whiteboard'); closeModal('toolbarMenu'); }, [openModal, closeModal]);
    const handleSoundboard = useCallback(() => { openModal('soundboard'); closeModal('toolbarMenu'); }, [openModal, closeModal]);
    const handleSummarizeClick = useCallback(() => { handleSummarize(); closeModal('toolbarMenu'); }, [handleSummarize, closeModal]);
    const handleClearChatClick = useCallback(() => { handleClearChat(); closeModal('toolbarMenu'); }, [handleClearChat, closeModal]);
    const handleAdminDelete = useCallback(() => { handleAdminDeleteConversation(activeChat.id); closeModal('toolbarMenu'); }, [handleAdminDeleteConversation, activeChat.id, closeModal]);
    const handleFeatureHub = useCallback(() => { openModal('featureHub'); closeModal('toolbarMenu'); }, [openModal, closeModal]);

    return (
        <div style={{
            position: 'absolute', top: '50px', right: '0',
            backgroundColor: '#111214', borderRadius: '8px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.4)', minWidth: '220px',
            zIndex: 1000, overflow: 'hidden', border: '1px solid #0b0e1b'
        }} role="menu" aria-label="Sohbet araçları menüsü">
            {/* 🔐 Şifreleme (Sadece DM) */}
            {activeChat.type === 'dm' && (
                <button onClick={handleEncModal}
                    style={{ ...menuItemStyle, color: hasKey ? '#23a559' : '#dbdee1' }}
                    onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e, hasKey ? '#23a559' : '#dbdee1')}
                    role="menuitem">
                    {hasKey ? <FaLock /> : <FaLock style={{ opacity: 0.5 }} />}
                    <span>{hasKey ? 'Şifreli' : 'Şifrele'}</span>
                </button>
            )}

            {/* 📌 Sabitli Mesajlar */}
            <button onClick={handlePinned}
                style={{ ...menuItemStyle, color: modals.pinned ? '#f5a524' : '#dbdee1' }}
                onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e, modals.pinned ? '#f5a524' : '#dbdee1')}
                role="menuitem">
                <FaThumbtack /><span>Sabitli Mesajlar</span>
            </button>

            {/* 🔗 Link Kopyala */}
            <button onClick={handleCopy}
                style={menuItemStyle} onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e)}
                role="menuitem">
                <FaLink /><span>Bağlantıyı Kopyala</span>
            </button>

            {/* 🔕 Sessize Al */}
            <button onClick={handleNotif}
                style={{ ...menuItemStyle, color: soundSettings.notifications ? '#23a559' : '#f23f42' }}
                onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e, soundSettings.notifications ? '#23a559' : '#f23f42')}
                role="menuitem">
                {soundSettings.notifications ? <FaBell /> : <FaBellSlash />}
                <span>{soundSettings.notifications ? 'Sessize Al' : 'Sesi Aç'}</span>
            </button>

            <div style={{ height: '1px', backgroundColor: '#1e2024', margin: '4px 0' }} />

            {/* 📬 Bahsedilmeler */}
            <button onClick={handleMentions}
                style={menuItemStyle} onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e)}
                role="menuitem">
                <FaInbox /><span>Bahsedilmeler</span>
            </button>

            {/* 🎭 Durumunu Ayarla */}
            <button onClick={handleStatus}
                style={menuItemStyle} onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e)}
                role="menuitem">
                <FaSmile /><span>Durumunu Ayarla</span>
            </button>

            <div style={{ height: '1px', backgroundColor: '#1e2024', margin: '4px 0' }} />

            {/* 🎬 Sinema */}
            <button onClick={handleCinema}
                style={menuItemStyle} onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e)}
                role="menuitem">
                <FaFilm /><span>Sinema Modu</span>
            </button>

            {/* 🎵 DJ Modu */}
            <button onClick={handleDJ}
                style={menuItemStyle} onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e)}
                role="menuitem">
                <FaCoffee /><span>DJ Modu</span>
            </button>

            {/* 🖍️ Beyaz Tahta */}
            <button onClick={handleWhiteboard}
                style={menuItemStyle} onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e)}
                role="menuitem">
                <FaCode /><span>Beyaz Tahta</span>
            </button>

            {/* 🎤 Ses Efektleri */}
            {isInVoice && (
                <button onClick={handleSoundboard}
                    style={menuItemStyle} onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e)}
                    role="menuitem">
                    <FaMagic /><span>Ses Efektleri</span>
                </button>
            )}

            {/* 📊 Özetle + Temizle (Oda ise) */}
            {activeChat.type === 'room' && (
                <>
                    <div style={{ height: '1px', backgroundColor: '#1e2024', margin: '4px 0' }} />
                    <button onClick={handleSummarizeClick}
                        style={menuItemStyle} onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e)}
                        role="menuitem">
                        <FaMagic /><span>Sohbeti Özetle</span>
                    </button>
                    <button onClick={handleClearChatClick}
                        style={{ ...menuItemStyle, color: '#f23f42' }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f23f42'; e.currentTarget.style.color = '#ffffff'; }}
                        onMouseLeave={(e) => hoverOff(e, '#f23f42')}
                        role="menuitem">
                        <FaBroom /><span>Sohbeti Temizle</span>
                    </button>
                    {username === 'admin' && activeChat.type === 'dm' && (
                        <>
                            <div style={{ height: '1px', backgroundColor: '#1e2024', margin: '4px 0' }} />
                            <button onClick={handleAdminDelete}
                                style={{ ...menuItemStyle, color: '#f23f42', fontWeight: 'bold' }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f23f42'; e.currentTarget.style.color = '#ffffff'; }}
                                onMouseLeave={(e) => hoverOff(e, '#f23f42')} title="Admin: Konuşmayı kalıcı olarak sil"
                                role="menuitem">
                                <FaTrash /><span>⚠️ KALICI SİL (ADMİN)</span>
                            </button>
                        </>
                    )}
                </>
            )}

            {/* 🚀 Tüm Özellikler */}
            <div style={{ height: '1px', backgroundColor: '#1e2024', margin: '4px 0' }} />
            <button onClick={handleFeatureHub}
                style={{ ...menuItemStyle, color: '#5865f2', fontWeight: 'bold' }}
                onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e, '#5865f2')}
                role="menuitem">
                🚀<span>Tüm Özellikler</span>
            </button>
        </div>
    );
});

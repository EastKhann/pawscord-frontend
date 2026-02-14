/**
 * ⋮ ToolbarMenu — Dropdown menu in chat header
 * Extracted from App.js inline JSX
 */
import React, { Suspense } from 'react';
import { FaLock, FaThumbtack, FaLink, FaBell, FaBellSlash, FaInbox, FaSmile, FaFilm, FaCoffee, FaCode, FaMagic, FaBroom, FaTrash } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

const menuItemStyle = {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '10px 16px', border: 'none', width: '100%',
    textAlign: 'left', cursor: 'pointer', fontSize: '14px',
    backgroundColor: 'transparent', color: '#dcddde',
    transition: 'all 0.15s ease'
};

export default function ToolbarMenu({
    activeChat, hasKey, modals, soundSettings,
    isInVoice, username,
    openModal, closeModal, toggleModal,
    handleCopyLink, toggleNotifications,
    handleSummarize, handleClearChat, handleAdminDeleteConversation,
}) {
    const hoverOn = (e) => { e.currentTarget.style.backgroundColor = '#5865f2'; e.currentTarget.style.color = '#ffffff'; };
    const hoverOff = (e, color = '#dcddde') => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = color; };

    return (
        <div style={{
            position: 'absolute', top: '50px', right: '0',
            backgroundColor: '#2f3136', borderRadius: '8px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.4)', minWidth: '220px',
            zIndex: 1000, overflow: 'hidden', border: '1px solid #202225'
        }}>
            {/* 🔐 Şifreleme (Sadece DM) */}
            {activeChat.type === 'dm' && (
                <button onClick={() => { openModal('encModal'); closeModal('toolbarMenu'); }}
                    style={{ ...menuItemStyle, color: hasKey ? '#43b581' : '#dcddde' }}
                    onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e, hasKey ? '#43b581' : '#dcddde')}>
                    {hasKey ? <FaLock /> : <FaLock style={{ opacity: 0.5 }} />}
                    <span>{hasKey ? 'Şifreli' : 'Şifrele'}</span>
                </button>
            )}

            {/* 📌 Sabitli Mesajlar */}
            <button onClick={() => { toggleModal('pinned'); closeModal('toolbarMenu'); }}
                style={{ ...menuItemStyle, color: modals.pinned ? '#f5a524' : '#dcddde' }}
                onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e, modals.pinned ? '#f5a524' : '#dcddde')}>
                <FaThumbtack /><span>Sabitli Mesajlar</span>
            </button>

            {/* 🔗 Link Kopyala */}
            <button onClick={() => { handleCopyLink(); closeModal('toolbarMenu'); }}
                style={menuItemStyle} onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e)}>
                <FaLink /><span>Bağlantıyı Kopyala</span>
            </button>

            {/* 🔕 Sessize Al */}
            <button onClick={() => { toggleNotifications(); closeModal('toolbarMenu'); }}
                style={{ ...menuItemStyle, color: soundSettings.notifications ? '#43b581' : '#f04747' }}
                onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e, soundSettings.notifications ? '#43b581' : '#f04747')}>
                {soundSettings.notifications ? <FaBell /> : <FaBellSlash />}
                <span>{soundSettings.notifications ? 'Sessize Al' : 'Sesi Aç'}</span>
            </button>

            <div style={{ height: '1px', backgroundColor: '#40444b', margin: '4px 0' }} />

            {/* 📬 Bahsedilmeler */}
            <button onClick={() => { openModal('mentionsInbox'); closeModal('toolbarMenu'); }}
                style={menuItemStyle} onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e)}>
                <FaInbox /><span>Bahsedilmeler</span>
            </button>

            {/* 🎭 Durumunu Ayarla */}
            <button onClick={() => { openModal('customStatus'); closeModal('toolbarMenu'); }}
                style={menuItemStyle} onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e)}>
                <FaSmile /><span>Durumunu Ayarla</span>
            </button>

            <div style={{ height: '1px', backgroundColor: '#40444b', margin: '4px 0' }} />

            {/* 🎬 Sinema */}
            <button onClick={() => { openModal('cinema'); closeModal('toolbarMenu'); }}
                style={menuItemStyle} onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e)}>
                <FaFilm /><span>Sinema Modu</span>
            </button>

            {/* 🎵 DJ Modu */}
            <button onClick={() => { openModal('dJ'); closeModal('toolbarMenu'); }}
                style={menuItemStyle} onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e)}>
                <FaCoffee /><span>DJ Modu</span>
            </button>

            {/* 🖍️ Beyaz Tahta */}
            <button onClick={() => { openModal('whiteboard'); closeModal('toolbarMenu'); }}
                style={menuItemStyle} onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e)}>
                <FaCode /><span>Beyaz Tahta</span>
            </button>

            {/* 🎤 Ses Efektleri */}
            {isInVoice && (
                <button onClick={() => { openModal('soundboard'); closeModal('toolbarMenu'); }}
                    style={menuItemStyle} onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e)}>
                    <FaMagic /><span>Ses Efektleri</span>
                </button>
            )}

            {/* 📊 Özetle + Temizle (Oda ise) */}
            {activeChat.type === 'room' && (
                <>
                    <div style={{ height: '1px', backgroundColor: '#40444b', margin: '4px 0' }} />
                    <button onClick={() => { handleSummarize(); closeModal('toolbarMenu'); }}
                        style={menuItemStyle} onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e)}>
                        <FaMagic /><span>Sohbeti Özetle</span>
                    </button>
                    <button onClick={() => { handleClearChat(); closeModal('toolbarMenu'); }}
                        style={{ ...menuItemStyle, color: '#f04747' }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f04747'; e.currentTarget.style.color = '#ffffff'; }}
                        onMouseLeave={(e) => hoverOff(e, '#f04747')}>
                        <FaBroom /><span>Sohbeti Temizle</span>
                    </button>
                    {username === 'admin' && activeChat.type === 'dm' && (
                        <>
                            <div style={{ height: '1px', backgroundColor: '#40444b', margin: '4px 0' }} />
                            <button onClick={() => { handleAdminDeleteConversation(activeChat.id); closeModal('toolbarMenu'); }}
                                style={{ ...menuItemStyle, color: '#ed4245', fontWeight: 'bold' }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ed4245'; e.currentTarget.style.color = '#ffffff'; }}
                                onMouseLeave={(e) => hoverOff(e, '#ed4245')} title="Admin: Konuşmayı kalıcı olarak sil">
                                <FaTrash /><span>⚠️ KALICI SİL (ADMİN)</span>
                            </button>
                        </>
                    )}
                </>
            )}

            {/* 🚀 Tüm Özellikler */}
            <div style={{ height: '1px', backgroundColor: '#40444b', margin: '4px 0' }} />
            <button onClick={() => { openModal('featureHub'); closeModal('toolbarMenu'); }}
                style={{ ...menuItemStyle, color: '#5865f2', fontWeight: 'bold' }}
                onMouseEnter={hoverOn} onMouseLeave={(e) => hoverOff(e, '#5865f2')}>
                🚀<span>Tüm Özellikler</span>
            </button>
        </div>
    );
}

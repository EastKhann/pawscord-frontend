// frontend/src/FriendsTab.js (CANLI BİLDİRİM EKLENDİ)

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaCheck, FaTimes, FaUserFriends, FaPaperPlane, FaBell } from './utils/iconOptimization'; // ⚡ OPTIMIZATION
import { useGlobalWebSocket } from './GlobalWebSocketContext';
import LazyImage from './components/LazyImage'; // ⚡ OPTIMIZATION: Progressive image loading
import confirmDialog from './utils/confirmDialog';

// 🚫 Oyun olarak gösterilmeyecek uygulamalar
const IGNORED_APPS = new Set([
    'fps monitor', 'msi afterburner', 'rivatuner', 'fraps', 'nvidia geforce experience',
    'amd radeon software', 'obs', 'obs studio', 'streamlabs', 'xsplit', 'nvidia shadowplay',
    'movavi video suite', 'movavi', 'camtasia', 'bandicam', 'soundpad', 'voicemod',
    'discord overlay', 'teamspeak', 'mumble', 'overwolf', 'razer cortex',
    'steam', 'epic games launcher', 'origin', 'uplay', 'battle.net', 'gog galaxy',
    'ea app', 'xbox app', 'microsoft store',
]);

const isIgnoredApp = (appName) => {
    if (!appName) return false;
    const lower = appName.toLowerCase().trim();
    for (const ignored of IGNORED_APPS) {
        if (lower.includes(ignored) || ignored.includes(lower)) {
            return true;
        }
    }
    return false;
};

const FriendsTab = ({ fetchWithAuth, apiBaseUrl, getDeterministicAvatar, onStartDM, onClose, onPendingCountChange, onlineUsers = [] }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [outgoing, setOutgoing] = useState([]);
    const [addUsername, setAddUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [statusMsg, setStatusMsg] = useState(null);

    // ✨ YENİ: WebSocket Bağlantısı
    const { globalData } = useGlobalWebSocket();

    const fetchFriendData = useCallback(async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/friends/list/`);
            if (response.ok) {
                const data = await response.json();
                setFriends(data.friends || []);
                setRequests(data.incoming_requests || []);
                setOutgoing(data.outgoing_requests || []);

                // 🔥 YENİ: Bekleyen istek sayısını parent'a bildir
                if (onPendingCountChange) {
                    onPendingCountChange((data.incoming_requests || []).length);
                }
            }
        } catch (error) {
            console.error("Arkadaş listesi çekilemedi:", error);
        } finally {
            setLoading(false);
        }
    }, [apiBaseUrl, fetchWithAuth, onPendingCountChange]);

    // İlk açılışta veriyi çek
    useEffect(() => {
        fetchFriendData();
    }, [fetchFriendData]);

    // ✨ WebSocket'ten sinyal gelince listeyi yenile ve Bildirim Göster
    useEffect(() => {
        if (globalData?.type === 'friend_list_update') {
            fetchFriendData();

            // Kullanıcıya görsel bildirim ver
            setStatusMsg({
                type: 'info',
                text: '🔔 Arkadaş listeniz güncellendi! "Bekleyenler" sekmesini kontrol edin.'
            });

            // 3 saniye sonra bildirimi kaldır
            setTimeout(() => setStatusMsg(null), 5000);
        }
    }, [globalData, fetchFriendData]);

    const handleSendRequest = useCallback(async (e) => {
        e.preventDefault();
        if (!addUsername.trim()) return;

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/friends/send/`, {
                method: 'POST',
                body: JSON.stringify({ username: addUsername.trim() })
            });
            const data = await response.json();

            if (response.ok) {
                setStatusMsg({ type: 'success', text: `✅ İstek gönderildi: ${addUsername}` });
                setAddUsername('');
                fetchFriendData();
            } else {
                setStatusMsg({ type: 'error', text: `❌ ${data.error || 'Hata.'}` });
            }
        } catch (error) {
            setStatusMsg({ type: 'error', text: '❌ Sunucu hatası.' });
        }
    }, [addUsername, apiBaseUrl, fetchWithAuth, fetchFriendData]);

    const handleRespond = useCallback(async (requestId, action) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/friends/respond/${requestId}/`, {
                method: 'POST',
                body: JSON.stringify({ action })
            });
            if (response.ok) {
                fetchFriendData();
                setStatusMsg({ type: 'success', text: action === 'accept' ? 'Arkadaşlık kabul edildi!' : 'İstek reddedildi.' });
            }
        } catch (error) {
            console.error("İşlem başarısız:", error);
        }
    }, [apiBaseUrl, fetchWithAuth, fetchFriendData]);

    // 🔥 YENİ: Arkadaşlıktan Çıkarma
    const handleRemoveFriend = useCallback(async (friendId, friendUsername) => {
        if (!await confirmDialog(`${friendUsername} ile arkadaşlığı sonlandırmak istediğinize emin misiniz?`)) {
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/friends/remove/${friendId}/`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchFriendData();
                setStatusMsg({ type: 'success', text: '❌ Arkadaşlık sonlandırıldı.' });
            } else {
                setStatusMsg({ type: 'error', text: '❌ Silme başarısız.' });
            }
        } catch (error) {
            console.error("Arkadaş silme hatası:", error);
            setStatusMsg({ type: 'error', text: '❌ Sunucu hatası.' });
        }
    }, [apiBaseUrl, fetchWithAuth, fetchFriendData]);

    return (
        <div style={localStyles.container}>
            <div style={localStyles.topBar}>
                <div style={localStyles.headerLeft}>
                    <div style={localStyles.title}>
                        <FaUserFriends style={{ marginRight: '10px' }} />
                        Arkadaşlar
                    </div>
                    <div style={localStyles.tabButtons}>
                        <button style={{ ...localStyles.tabBtn, ...(activeTab === 'all' ? localStyles.activeTabBtn : {}) }} onClick={() => { setActiveTab('all'); setStatusMsg(null); }}>
                            Tümü ({friends.length})
                        </button>
                        <button style={{ ...localStyles.tabBtn, ...(activeTab === 'pending' ? localStyles.activeTabBtn : {}) }} onClick={() => { setActiveTab('pending'); setStatusMsg(null); }}>
                            Bekleyenler
                            {requests.length > 0 && (
                                <span style={localStyles.badgePulse}>{requests.length}</span>
                            )}
                        </button>
                        <button style={{ ...localStyles.addFriendBtn, ...(activeTab === 'add' ? localStyles.activeAddFriendBtn : {}) }} onClick={() => { setActiveTab('add'); setStatusMsg(null); }}>
                            Arkadaş Ekle
                        </button>
                    </div>
                </div>

                <button onClick={onClose} style={localStyles.closeHeaderBtn} title="Kapat">
                    <FaTimes />
                </button>
            </div>

            <div style={localStyles.contentArea}>
                {/* ✨ BİLDİRİM ALANI */}
                {statusMsg && (
                    <div style={{
                        marginBottom: '20px',
                        padding: '12px',
                        borderRadius: '8px',
                        backgroundColor: statusMsg.type === 'success' ? 'rgba(67, 181, 129, 0.2)' : (statusMsg.type === 'info' ? 'rgba(88, 101, 242, 0.2)' : 'rgba(240, 71, 71, 0.2)'),
                        color: statusMsg.type === 'success' ? '#43b581' : (statusMsg.type === 'info' ? '#dee0fc' : '#f04747'),
                        border: `1px solid ${statusMsg.type === 'success' ? '#43b581' : (statusMsg.type === 'info' ? '#5865f2' : '#f04747')}`,
                        display: 'flex', alignItems: 'center', gap: '10px', animation: 'fadeIn 0.3s ease'
                    }}>
                        {statusMsg.type === 'info' && <FaBell />}
                        {statusMsg.text}
                    </div>
                )}

                {activeTab === 'add' && (
                    <div style={localStyles.addSection}>
                        <h3 style={{ color: '#fff', marginBottom: '10px' }}>ARKADAŞ EKLE</h3>
                        <p style={{ color: '#b9bbbe', fontSize: '0.9em', marginBottom: '20px' }}>Kullanıcı adını girerek arkadaş ekleyebilirsin.</p>
                        <form onSubmit={handleSendRequest} style={localStyles.addForm}>
                            <input
                                type="text"
                                value={addUsername}
                                onChange={(e) => setAddUsername(e.target.value)}
                                placeholder="Kullanıcı Adı veya Arkadaş Kodu (Örn: 8392014)"
                                style={localStyles.input}
                                autoFocus
                            />
                            <button type="submit" style={localStyles.sendRequestBtn}><FaPaperPlane style={{ marginRight: '5px' }} /> Gönder</button>
                        </form>
                    </div>
                )}

                {activeTab === 'all' && (
                    <div style={localStyles.listContainer}>
                        <h4 style={localStyles.listHeader}>ARKADAŞLAR — {friends.length}</h4>
                        {friends.length === 0 ? (
                            <div style={localStyles.emptyState}><div style={{ fontSize: '3em', marginBottom: '10px' }}>🥺</div><p style={localStyles.emptyText}>Henüz kimseyle arkadaş değilsin.</p><button onClick={() => setActiveTab('add')} style={localStyles.emptyBtn}>Arkadaş Ekle</button></div>
                        ) : (
                            friends.map(friend => {
                                // 🔥 FIX: Backend FLAT structure gönderiyor (sender_username, receiver_username, ...)
                                const myUsername = localStorage.getItem('chat_username') || '';

                                // Ben sender mıyım yoksa receiver mıyım?
                                const iAmSender = friend.sender_username === myUsername;

                                // Arkadaşımın verileri (flat structure'dan direkt al)
                                const friendUsername = iAmSender ? friend.receiver_username : friend.sender_username;
                                const displayAvatar = iAmSender ? friend.receiver_avatar : friend.sender_avatar;
                                const friendActivity = iAmSender ? friend.receiver_activity : friend.sender_activity;

                                // 🔥 DÜZELTME: Gerçek zamanlı online durumu kontrolü
                                const isReallyOnline = Array.isArray(onlineUsers) && onlineUsers.includes(friendUsername);
                                const friendStatus = isReallyOnline ? 'online' : 'offline';


                                // Status display
                                const statusText = {
                                    online: 'Çevrimiçi',
                                    idle: 'Boşta',
                                    dnd: 'Rahatsız Etmeyin',
                                    invisible: 'Görünmez',
                                    offline: 'Çevrimdışı'
                                }[friendStatus] || 'Çevrimdışı';

                                const statusColor = {
                                    online: '#23a559',
                                    idle: '#f0b232',
                                    dnd: '#f23f43',
                                    invisible: '#80848e',
                                    offline: '#80848e'
                                }[friendStatus] || '#80848e';

                                return (
                                    <div key={friend.id} style={localStyles.listItem}>
                                        <div style={localStyles.userInfo} onClick={() => onStartDM(friendUsername)}>
                                            <LazyImage src={displayAvatar || getDeterministicAvatar(friendUsername)} style={localStyles.avatar} alt="avatar" />
                                            <div style={{ marginLeft: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                                <div style={localStyles.username}>{friendUsername}</div>
                                                <div style={{ ...localStyles.status, color: statusColor }}>{statusText}</div>
                                                {/* ✨ Rich Presence: Spotify/Steam Activity (Her ikisi de gösterilebilir) */}
                                                {friendActivity?.spotify && (
                                                    <span style={{ fontSize: '10px', color: '#1db954', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                                                        🎵 {friendActivity.spotify.track}
                                                    </span>
                                                )}
                                                {friendActivity?.steam && !isIgnoredApp(friendActivity.steam.game) && (
                                                    <span style={{ fontSize: '10px', color: '#66c0f4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                                                        🎮 {friendActivity.steam.game}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div style={localStyles.actions}>
                                            <button
                                                style={localStyles.iconButton}
                                                title="Mesaj At"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onStartDM(friendUsername);
                                                }}
                                            >
                                                <FaUserFriends />
                                            </button>
                                            <button
                                                style={{ ...localStyles.iconButton, backgroundColor: '#ed4245' }}
                                                title="Arkadaşlıktan Çıkar"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveFriend(friend.id, friendUsername);
                                                }}
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}

                {activeTab === 'pending' && (
                    <div style={localStyles.listContainer}>
                        <h4 style={localStyles.listHeader}>BEKLEYEN İSTEKLER — {requests.length}</h4>
                        {requests.length === 0 && outgoing.length === 0 && <p style={localStyles.emptyText}>Bekleyen istek yok.</p>}

                        {/* BANA GELENLER (Incoming Requests) */}
                        {requests.map(req => {
                            // 🔥 Backend flat structure: sender_username, sender_avatar
                            const senderUsername = req.sender_username || 'Unknown';
                            const senderAvatar = req.sender_avatar;

                            return (
                                <div key={req.id} style={{ ...localStyles.listItem, backgroundColor: 'rgba(250, 166, 26, 0.1)' }}>
                                    <div style={localStyles.userInfo}>
                                        <LazyImage src={senderAvatar || getDeterministicAvatar(senderUsername)} style={localStyles.avatar} alt="avatar" />
                                        <div style={{ marginLeft: '12px' }}>
                                            <strong style={{ color: 'white', display: 'block' }}>{senderUsername}</strong>
                                            <span style={{ fontSize: '0.8em', color: '#faa61a' }}>Sana istek gönderdi!</span>
                                        </div>
                                    </div>
                                    <div style={localStyles.actions}>
                                        <button onClick={() => handleRespond(req.id, 'accept')} style={localStyles.acceptBtn} title="Kabul Et"><FaCheck /></button>
                                        <button onClick={() => handleRespond(req.id, 'reject')} style={localStyles.rejectBtn} title="Reddet"><FaTimes /></button>
                                    </div>
                                </div>
                            );
                        })}

                        {/* BENİM GÖNDERDİKLERİM (Outgoing Requests) */}
                        {outgoing.length > 0 && (
                            <>
                                <h4 style={{ ...localStyles.listHeader, marginTop: '30px' }}>GÖNDERDİKLERİM — {outgoing.length}</h4>
                                {outgoing.map(req => {
                                    // 🔥 Backend flat structure: receiver_username, receiver_avatar
                                    const receiverUsername = req.receiver_username || 'Unknown';
                                    const receiverAvatar = req.receiver_avatar;


                                    return (
                                        <div key={req.id} style={localStyles.listItem}>
                                            <div style={localStyles.userInfo}>
                                                <LazyImage src={receiverAvatar || getDeterministicAvatar(receiverUsername)} style={localStyles.avatar} alt="avatar" />
                                                <span style={{ marginLeft: '12px', color: '#b9bbbe' }}>{receiverUsername} (Bekliyor...)</span>
                                            </div>
                                            <button onClick={() => handleRespond(req.id, 'reject')} style={localStyles.rejectBtn} title="İptal Et"><FaTimes /></button>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const localStyles = {
    container: { display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#313338', color: '#dcddde' },
    topBar: {
        padding: '10px 15px',
        borderBottom: '1px solid #1f2023',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#313338',
        height: '50px',
        boxSizing: 'border-box'
    },
    headerLeft: { display: 'flex', alignItems: 'center', flex: 1, overflow: 'hidden' },
    title: {
        fontSize: '1em', fontWeight: 'bold', color: '#fff', display: 'flex', alignItems: 'center',
        marginRight: '10px', paddingRight: '10px', borderRight: '1px solid #4f545c', whiteSpace: 'nowrap'
    },
    tabButtons: { display: 'flex', gap: '10px', overflowX: 'auto' },
    tabBtn: { background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer', fontSize: '0.9em', padding: '2px 8px', borderRadius: '4px', fontWeight: '500', transition: 'all 0.2s', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '5px' },
    activeTabBtn: { color: '#fff', backgroundColor: 'rgba(79,84,92,0.32)' },
    addFriendBtn: { backgroundColor: '#23a559', color: '#fff', border: 'none', borderRadius: '4px', padding: '2px 10px', fontSize: '0.9em', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' },
    activeAddFriendBtn: { backgroundColor: 'transparent', color: '#23a559', border: '1px solid transparent' },

    closeHeaderBtn: { background: 'none', border: 'none', color: '#b9bbbe', fontSize: '1.5em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', borderRadius: '50%' },

    contentArea: { flexGrow: 1, padding: '20px', overflowY: 'auto' },
    addSection: { maxWidth: '100%', borderBottom: '1px solid #4f545c', paddingBottom: '20px' },
    addForm: {
        display: 'flex', flexDirection: window.innerWidth <= 768 ? 'column' : 'row', gap: '10px',
        backgroundColor: '#1e1f22', padding: '10px', borderRadius: '8px', border: '1px solid #1e1f22',
        alignItems: 'stretch', marginTop: '10px'
    },
    input: { flexGrow: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: '1em', outline: 'none', minHeight: '40px' },
    sendRequestBtn: { backgroundColor: '#5865f2', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' },

    listContainer: {},
    listHeader: { fontSize: '0.8em', color: '#b9bbbe', textTransform: 'uppercase', marginBottom: '15px', borderBottom: '1px solid #4f545c', paddingBottom: '10px' },
    emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '50px' },
    emptyText: { color: '#72767d', fontStyle: 'italic', marginBottom: '20px', textAlign: 'center' },
    emptyBtn: { padding: '10px 20px', backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderTop: '1px solid #4f545c', cursor: 'pointer', transition: 'background-color 0.2s' },
    userInfo: { display: 'flex', alignItems: 'center' },
    avatar: { width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' },
    username: { color: '#fff', fontWeight: '600' },
    status: { fontSize: '0.8em', color: '#b9bbbe' },
    actions: { display: 'flex', gap: '10px' },
    iconButton: { padding: '8px', borderRadius: '50%', backgroundColor: '#2f3136', border: 'none', color: '#b9bbbe', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    acceptBtn: { padding: '8px', borderRadius: '50%', backgroundColor: '#2f3136', border: 'none', color: '#43b581', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    rejectBtn: { padding: '8px', borderRadius: '50%', backgroundColor: '#2f3136', border: 'none', color: '#f04747', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },

    // ✨ Titreyen Kırmızı Rozet
    badgePulse: {
        backgroundColor: '#f04747', color: '#fff', borderRadius: '50%', padding: '1px 6px', fontSize: '0.75em', marginLeft: '5px',
        animation: 'pulseBadge 1.5s infinite'
    }
};

// CSS Animasyon
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes pulseBadge {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(240, 71, 71, 0.7); }
    70% { transform: scale(1.1); box-shadow: 0 0 0 6px rgba(240, 71, 71, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(240, 71, 71, 0); }
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(styleSheet);

export default React.memo(FriendsTab);


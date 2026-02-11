import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { FaCopy, FaTimes, FaCheck, FaSearch, FaLink, FaUserFriends, FaHashtag, FaSync } from 'react-icons/fa';
import toast from '../utils/toast';

const InviteModal = ({ onClose, server, fetchWithAuth, apiBaseUrl, currentUser }) => {
    const [friends, setFriends] = useState([]);
    const [loadingFriends, setLoadingFriends] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [invitedUsers, setInvitedUsers] = useState(new Set());
    const [inviteLink, setInviteLink] = useState('');
    const [copied, setCopied] = useState(false);
    const [loadingLink, setLoadingLink] = useState(true);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const searchRef = useRef(null);

    // Modal açılınca: arkadaşları çek + mevcut sınırsız linki kontrol et/oluştur
    useEffect(() => {
        fetchFriends();
        getOrCreatePermanentLink();
        setTimeout(() => searchRef.current?.focus(), 100);
    }, []);

    // Otomatik sınırsız link oluştur
    const getOrCreatePermanentLink = async () => {
        if (!server?.id) { setLoadingLink(false); return; }
        setLoadingLink(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/invites/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_id: server.id,
                    max_uses: 0,
                    expires_in_hours: 0
                })
            });
            if (res.ok) {
                const data = await res.json();
                const link = data.url || data.invite_link || `https://www.pawscord.com/#/invite/${data.code}`;
                setInviteLink(link);
            } else {
                const err = await res.json().catch(() => ({}));
                console.error('[InviteModal] Create failed:', err);
            }
        } catch (e) {
            console.error('[InviteModal] Create error:', e);
        } finally {
            setLoadingLink(false);
        }
    };

    // 🔄 Yeni link oluştur (eski linki geçersiz kılmadan yeni bir tane)
    const regenerateLink = async () => {
        if (!server?.id) return;
        setIsRegenerating(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/invites/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_id: server.id,
                    max_uses: 0,
                    expires_in_hours: 0
                })
            });
            if (res.ok) {
                const data = await res.json();
                const link = data.url || data.invite_link || `https://www.pawscord.com/#/invite/${data.code}`;
                setInviteLink(link);
                toast.success('🔗 Yeni davet linki oluşturuldu!');
            } else {
                toast.error('Link oluşturulamadı');
            }
        } catch (e) {
            toast.error('Link oluşturulurken hata: ' + e.message);
        } finally {
            setIsRegenerating(false);
        }
    };

    const fetchFriends = async () => {
        setLoadingFriends(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/friends/list/`);
            if (res.ok) {
                const data = await res.json();
                const friendsList = Array.isArray(data) ? data : (data.friends || []);
                setFriends(friendsList);
            }
        } catch (e) {
            console.error("Arkadaş listesi hatası:", e);
        } finally {
            setLoadingFriends(false);
        }
    };

    const sendInviteToFriend = async (friendUsername) => {
        setInvitedUsers(prev => new Set(prev).add(friendUsername));
        try {
            // Eğer link yoksa önce oluştur
            let link = inviteLink;
            if (!link) {
                const inviteRes = await fetchWithAuth(`${apiBaseUrl}/invites/create/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ server_id: server.id, max_uses: 1, expires_in_hours: 24 })
                });
                if (!inviteRes.ok) throw new Error('Davet oluşturulamadı');
                const inviteData = await inviteRes.json();
                link = inviteData.url || inviteData.invite_link;
            }

            // DM conversation bul/oluştur
            const convRes = await fetchWithAuth(`${apiBaseUrl}/conversations/find_or_create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ target_username: friendUsername })
            });
            if (!convRes.ok) throw new Error('DM oluşturulamadı');
            const convData = await convRes.json();

            // DM gönder
            const msgRes = await fetchWithAuth(`${apiBaseUrl}/messages/send_dm/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversation_id: convData.conversation_id,
                    content: `Hey! Seni **${server?.name || 'sunucu'}** sunucusuna davet ediyorum! 🎉\n${link}`
                })
            });

            if (msgRes.ok) {
                toast.success(`✅ ${friendUsername} kullanıcısına davet gönderildi!`);
            } else {
                navigator.clipboard.writeText(link);
                toast.success(`Link kopyalandı! ${friendUsername} ile paylaşabilirsiniz.`);
            }
        } catch (e) {
            setInvitedUsers(prev => {
                const next = new Set(prev);
                next.delete(friendUsername);
                return next;
            });
            toast.error("Davet gönderilemedi: " + e.message);
        }
    };

    const getFriendName = (friendship) => {
        if (!currentUser) return friendship.receiver_username;
        return friendship.sender_username === currentUser
            ? friendship.receiver_username
            : friendship.sender_username;
    };

    const getFriendAvatar = (friendship) => {
        const name = getFriendName(friendship);
        return friendship.sender_username === name
            ? friendship.sender_avatar
            : friendship.receiver_avatar;
    };

    const filteredFriends = friends.filter(f => {
        const name = getFriendName(f);
        return name?.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        toast.success('📋 Davet linki kopyalandı!');
        setTimeout(() => setCopied(false), 2000);
    };

    const modalContent = (
        <div style={st.overlay} onClick={onClose}>
            <div style={st.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={st.header}>
                    <div>
                        <div style={st.headerRow}>
                            <FaHashtag style={{ color: '#b5bac1', fontSize: '14px' }} />
                            <span style={st.serverLabel}>{server?.name || 'Sunucu'}</span>
                        </div>
                        <h2 style={st.title}>Arkadaşlarını Davet Et</h2>
                    </div>
                    <button onClick={onClose} style={st.closeBtn}><FaTimes /></button>
                </div>

                {/* Search */}
                <div style={st.searchWrap}>
                    <div style={st.searchBox}>
                        <FaSearch style={st.searchIcon} />
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder="Arkadaş ara..."
                            style={st.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Friends List */}
                <div style={st.friendList}>
                    {loadingFriends ? (
                        <div style={st.emptyState}>
                            <div style={st.spinner} />
                            <span style={st.emptyText}>Yükleniyor...</span>
                        </div>
                    ) : filteredFriends.length === 0 ? (
                        <div style={st.emptyState}>
                            <FaUserFriends style={{ fontSize: '32px', color: '#4e5058', marginBottom: '8px' }} />
                            <span style={st.emptyText}>
                                {searchQuery ? 'Sonuç bulunamadı.' : friends.length === 0 ? 'Henüz arkadaşın yok.' : 'Eşleşen arkadaş yok.'}
                            </span>
                        </div>
                    ) : (
                        filteredFriends.map(f => {
                            const name = getFriendName(f);
                            const avatar = getFriendAvatar(f);
                            const isInvited = invitedUsers.has(name);
                            return (
                                <div key={f.id} style={st.friendItem} className="invite-friend-item">
                                    <div style={st.friendInfo}>
                                        <div style={st.friendAvatar}>
                                            {avatar ? (
                                                <img src={avatar} alt={name} style={st.avatarImg} />
                                            ) : (
                                                <span style={st.avatarLetter}>{name?.charAt(0).toUpperCase()}</span>
                                            )}
                                        </div>
                                        <span style={st.friendName}>{name}</span>
                                    </div>
                                    <button
                                        onClick={() => !isInvited && sendInviteToFriend(name)}
                                        style={{
                                            ...st.inviteBtn,
                                            ...(isInvited ? st.inviteBtnSent : {})
                                        }}
                                        disabled={isInvited}
                                    >
                                        {isInvited ? (
                                            <><FaCheck style={{ marginRight: '4px' }} /> Gönderildi</>
                                        ) : (
                                            'Davet Et'
                                        )}
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Bottom Link Section */}
                <div style={st.linkSection}>
                    <div style={st.linkLabel}>VEYA BİR SUNUCU DAVET LİNKİ GÖNDER</div>
                    <div style={st.linkBox}>
                        {loadingLink ? (
                            <div style={st.linkLoading}>
                                <div style={st.spinner} />
                                <span style={{ color: '#b5bac1', fontSize: '13px' }}>Link hazırlanıyor...</span>
                            </div>
                        ) : inviteLink ? (
                            <>
                                <div style={st.linkInputWrap}>
                                    <FaLink style={{ color: '#b5bac1', marginRight: '8px', flexShrink: 0 }} />
                                    <input
                                        type="text"
                                        value={inviteLink}
                                        readOnly
                                        style={st.linkInput}
                                        onClick={(e) => e.target.select()}
                                    />
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    style={{
                                        ...st.copyBtn,
                                        ...(copied ? st.copyBtnDone : {})
                                    }}
                                >
                                    {copied ? 'Kopyalandı!' : 'Kopyala'}
                                </button>
                            </>
                        ) : (
                            <div style={st.linkError}>
                                <span style={{ color: '#f0b232', fontSize: '13px' }}>Link oluşturulamadı</span>
                                <button onClick={getOrCreatePermanentLink} style={st.retryBtn}>Tekrar Dene</button>
                            </div>
                        )}
                    </div>
                    {inviteLink && !loadingLink && (
                        <button
                            onClick={regenerateLink}
                            disabled={isRegenerating}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#b5bac1',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                cursor: isRegenerating ? 'wait' : 'pointer',
                                fontSize: '12px',
                                marginTop: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.06)'; e.target.style.color = '#fff'; }}
                            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#b5bac1'; }}
                        >
                            <FaSync style={{ fontSize: '11px', animation: isRegenerating ? 'inviteSpin 1s linear infinite' : 'none' }} />
                            {isRegenerating ? 'Oluşturuluyor...' : 'Yeni Link Oluştur'}
                        </button>
                    )}
                    <div style={st.linkNote}>
                        Bu davet linki süresiz geçerli ve sınırsız kullanımlı.
                    </div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

// Hover styles
if (typeof document !== 'undefined') {
    const id = 'invite-modal-styles';
    if (!document.getElementById(id)) {
        const tag = document.createElement('style');
        tag.id = id;
        tag.textContent = `
            .invite-friend-item:hover { background: rgba(88, 101, 242, 0.06) !important; }
            @keyframes inviteSpin { to { transform: rotate(360deg); } }
        `;
        document.head.appendChild(tag);
    }
}

const st = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        backdropFilter: 'blur(4px)',
    },
    modal: {
        backgroundColor: '#313338',
        borderRadius: '12px',
        width: '460px',
        maxWidth: '92vw',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
        overflow: 'hidden',
        animation: 'contextMenuIn 0.15s ease-out',
    },
    header: {
        padding: '20px 20px 8px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginBottom: '4px',
    },
    serverLabel: {
        color: '#b5bac1',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
    },
    title: {
        margin: 0,
        color: '#f2f3f5',
        fontSize: '18px',
        fontWeight: '700',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '4px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchWrap: {
        padding: '8px 20px 4px 20px',
    },
    searchBox: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '0 12px',
        display: 'flex',
        alignItems: 'center',
    },
    searchIcon: {
        color: '#6d6f78',
        marginRight: '10px',
        fontSize: '14px',
        flexShrink: 0,
    },
    searchInput: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#f2f3f5',
        padding: '10px 0',
        flex: 1,
        outline: 'none',
        fontSize: '14px',
    },
    friendList: {
        flex: 1,
        overflowY: 'auto',
        padding: '8px 12px',
        minHeight: '120px',
        maxHeight: '280px',
    },
    friendItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 10px',
        borderRadius: '8px',
        transition: 'background 0.15s',
        cursor: 'default',
    },
    friendInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minWidth: 0,
    },
    friendAvatar: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: '#5865f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
    },
    avatarImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    avatarLetter: {
        color: '#fff',
        fontSize: '15px',
        fontWeight: '600',
    },
    friendName: {
        color: '#f2f3f5',
        fontSize: '14px',
        fontWeight: '500',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    inviteBtn: {
        padding: '6px 16px',
        backgroundColor: 'transparent',
        border: '1px solid #248046',
        color: '#2dc770',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500',
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
    },
    inviteBtnSent: {
        border: '1px solid #4e5058',
        color: '#b5bac1',
        cursor: 'default',
        backgroundColor: 'transparent',
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        gap: '4px',
    },
    emptyText: {
        color: '#6d6f78',
        fontSize: '14px',
        textAlign: 'center',
    },
    spinner: {
        width: '20px',
        height: '20px',
        border: '2px solid #4e5058',
        borderTopColor: '#5865f2',
        borderRadius: '50%',
        animation: 'inviteSpin 0.6s linear infinite',
    },
    linkSection: {
        backgroundColor: '#2b2d31',
        padding: '16px 20px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
    },
    linkLabel: {
        color: '#b5bac1',
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
        marginBottom: '10px',
    },
    linkBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '4px 4px 4px 12px',
        minHeight: '44px',
    },
    linkInputWrap: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        minWidth: 0,
    },
    linkInput: {
        flex: 1,
        backgroundColor: 'transparent',
        border: 'none',
        color: '#00a8fc',
        fontSize: '13px',
        outline: 'none',
        textOverflow: 'ellipsis',
        minWidth: 0,
    },
    linkLoading: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flex: 1,
        padding: '4px 0',
    },
    linkError: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        padding: '4px 0',
    },
    copyBtn: {
        padding: '8px 16px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
        transition: 'background 0.15s',
        whiteSpace: 'nowrap',
        flexShrink: 0,
    },
    copyBtnDone: {
        backgroundColor: '#248046',
    },
    retryBtn: {
        padding: '6px 12px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '500',
    },
    linkNote: {
        color: '#6d6f78',
        fontSize: '11px',
        marginTop: '8px',
    },
};

export default InviteModal;


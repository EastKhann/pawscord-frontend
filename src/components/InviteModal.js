import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaCopy, FaClock, FaUserCheck, FaCalendarAlt, FaTimes, FaCheck, FaSearch, FaPaperPlane, FaUserPlus } from 'react-icons/fa';
import toast from '../utils/toast';

const InviteModal = ({ onClose, server, fetchWithAuth, apiBaseUrl, currentUser }) => {
    // --- MEVCUT STATE'LER ---
    const [inviteLink, setInviteLink] = useState('');
    const [maxUses, setMaxUses] = useState(0);
    const [expiresAfter, setExpiresAfter] = useState(0);
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // --- YENİ EKLENEN STATE'LER (ARKADAŞLAR İÇİN) ---
    const [friends, setFriends] = useState([]);
    const [loadingFriends, setLoadingFriends] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [invitedUsers, setInvitedUsers] = useState(new Set());
    const [myUsername, setMyUsername] = useState(currentUser || '');

    // Modal açılınca verileri çek
    useEffect(() => {
        fetchMyUser();
        fetchFriends();
    }, []);

    // Eğer currentUser prop olarak gelmediyse, API'den kendimizi öğrenelim
    const fetchMyUser = async () => {
        if (myUsername) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/users/me/`);
            if (res.ok) {
                const data = await res.json();
                setMyUsername(data.username);
            }
        } catch (e) { console.error(e); }
    };

    // Arkadaş listesini getir
    const fetchFriends = async () => {
        setLoadingFriends(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/friends/list/`);
            if (res.ok) {
                const data = await res.json();
                console.log('[InviteModal] Friends response:', data);

                // Backend response array olarak geliyor (Friendship objelerinin listesi)
                // Her obje: { id, sender_username, receiver_username, ... }
                const friendsList = Array.isArray(data) ? data : (data.friends || []);
                setFriends(friendsList);

                console.log('[InviteModal] Friends loaded:', friendsList.length);
            }
        } catch (e) {
            console.error("Arkadaş listesi hatası:", e);
        } finally {
            setLoadingFriends(false);
        }
    };

    // Arkadaşa davet linki gönder (YENİ SİSTEM - ServerInvite)
    const sendInviteToFriend = async (friendUsername) => {
        console.log(`📨 [InviteModal] Sending invite to: ${friendUsername}`);
        setInvitedUsers(prev => new Set(prev).add(friendUsername));

        try {
            // 1. Önce bir davet linki oluştur
            const invitePayload = {
                server_id: server.id,
                max_uses: 1, // Sadece bu arkadaş kullanabilsin
                expires_in_hours: 24 // 24 saat geçerli
            };

            console.log('📤 [InviteModal] Creating invite:', invitePayload);

            const inviteRes = await fetchWithAuth(`${apiBaseUrl}/invites/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(invitePayload)
            });

            if (!inviteRes.ok) {
                const errorData = await inviteRes.json();
                throw new Error(errorData.error || 'Davet oluşturulamadı');
            }

            const inviteData = await inviteRes.json();
            const inviteCode = inviteData.code;
            const inviteUrl = inviteData.url || inviteData.invite_link;

            console.log('✅ [InviteModal] Invite created:', { code: inviteCode, url: inviteUrl });

            // 2. Arkadaşa DM olarak davet linkini gönder
            // find_or_create endpoint'ini kullan
            const conversationRes = await fetchWithAuth(`${apiBaseUrl}/conversations/find_or_create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    target_username: friendUsername
                })
            });

            if (!conversationRes.ok) {
                throw new Error('DM oluşturulamadı');
            }

            const conversationData = await conversationRes.json();
            const conversationId = conversationData.conversation_id;

            console.log('💬 [InviteModal] Conversation created/found:', conversationId);

            // 3. Mesajı gönder
            const messagePayload = {
                conversation_id: conversationId,
                content: `Hey! Seni **${server.name}** sunucusuna davet ediyorum. Katılmak için:\n${inviteUrl}`
            };

            const messageRes = await fetchWithAuth(`${apiBaseUrl}/messages/send_dm/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messagePayload)
            });

            if (!messageRes.ok) {
                // Mesaj gönderilemedi ama link oluşturuldu
                console.warn('⚠️ [InviteModal] Message send failed');
                navigator.clipboard.writeText(inviteUrl);
                toast.success(`Davet linki oluşturuldu ve panoya kopyalandı!\n\n${friendUsername} ile manuel olarak paylaşabilirsiniz:\n\n${inviteUrl}`, 5000);
            } else {
                console.log('✅ [InviteModal] Message sent successfully');
                toast.success(`${friendUsername} kullanıcısına davet DM olarak gönderildi!`);
            }

        } catch (e) {
            console.error('❌ [InviteModal] Error:', e);
            setInvitedUsers(prev => {
                const next = new Set(prev);
                next.delete(friendUsername);
                return next;
            });
            toast.error("Davet gönderilemedi: " + e.message);
        }
    };

    // Arkadaşın ismini bulma (Friendship objesinde gönderen mi alıcı mı biziz?)
    const getFriendName = (friendship) => {
        if (!myUsername) return friendship.receiver_username; // Fallback
        return friendship.sender_username === myUsername
            ? friendship.receiver_username
            : friendship.sender_username;
    };

    // Listeyi filtrele
    const filteredFriends = friends.filter(f => {
        const name = getFriendName(f);
        return name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // --- MEVCUT FONKSİYONLAR ---
    const generateInvite = async () => {
        console.log('🎬 [InviteModal] Starting invite creation...', {
            server: server ? { id: server.id, name: server.name } : null,
            maxUses,
            expiresAfter
        });

        if (!server || !server.id) {
            toast.error('Hata: Sunucu bilgisi bulunamadı!');
            console.error('❌ [InviteModal] No server provided!');
            return;
        }

        setIsGenerating(true);
        try {
            // YENİ SİSTEM: ServerInvite API
            const payload = {
                server_id: server.id,
                max_uses: maxUses === 0 ? 0 : maxUses,
                expires_in_hours: Math.floor(expiresAfter / 60) // dakikadan saate çevir
            };

            console.log('📤 [InviteModal] Payload:', payload);

            const response = await fetchWithAuth(`${apiBaseUrl}/invites/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            console.log('📥 [InviteModal] Response status:', response.status);
            const data = await response.json();
            console.log('📋 [InviteModal] Response data:', data);

            if (response.ok) {
                // Backend'den gelen tam URL'i al
                const link = data.url || data.invite_link || `https://www.pawscord.com/#/invite/${data.code}`;

                console.log('✅ [InviteModal] Invite created:', {
                    code: data.code,
                    url: link,
                    rawData: data
                });

                if (!link) {
                    console.error('❌ [InviteModal] No URL in response!', data);
                    toast.error('Hata: Davet linki oluşturulamadı (URL yok)');
                    return;
                }

                setInviteLink(link);
                console.log('🔗 [InviteModal] Link set to:', link);
                toast.success(`Davet linki oluşturuldu!\n${link}`, 4000);
            } else {
                console.error('❌ [InviteModal] Error:', data.error);
                toast.error(data.error || "Davet oluşturulamadı.");
            }
        } catch (error) {
            console.error("❌ [InviteModal] Exception:", error);
            toast.error("Bağlantı hatası: " + error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const presetOptions = [
        { label: '30 Dk', value: 30 },
        { label: '1 Gün', value: 1440 },
        { label: 'Süresiz', value: 0 },
    ];

    const modalContent = (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2 style={styles.title}>
                        Arkadaşlarını Davet Et
                    </h2>
                    <button onClick={onClose} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>

                    {/* --- ÜST KISIM: ARKADAŞ LİSTESİ --- */}
                    <div style={styles.friendSection}>
                        <div style={styles.searchBox}>
                            <FaSearch style={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Arkadaş ara..."
                                style={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div style={styles.friendList}>
                            {loadingFriends ? (
                                <div style={styles.loadingText}>Yükleniyor...</div>
                            ) : filteredFriends.length === 0 ? (
                                <div style={styles.emptyText}>Arkadaş bulunamadı.</div>
                            ) : (
                                filteredFriends.map(f => {
                                    const name = getFriendName(f);
                                    const isInvited = invitedUsers.has(name);
                                    // Avatar (API'den geliyorsa kullan, yoksa harf)
                                    const avatar = f.sender_username === name ? f.sender_avatar : f.receiver_avatar;

                                    return (
                                        <div key={f.id} style={styles.friendItem}>
                                            <div style={styles.friendInfo}>
                                                <div style={styles.friendAvatar}>
                                                    {avatar ? (
                                                        <img src={avatar} alt={name} style={styles.avatarImg} />
                                                    ) : (
                                                        <span>{name.charAt(0).toUpperCase()}</span>
                                                    )}
                                                </div>
                                                <span style={styles.friendName}>{name}</span>
                                            </div>
                                            <button
                                                onClick={() => !isInvited && sendInviteToFriend(name)}
                                                style={{
                                                    ...styles.inviteBtn,
                                                    ...(isInvited ? styles.inviteBtnSent : {})
                                                }}
                                                disabled={isInvited}
                                            >
                                                {isInvited ? 'Gönderildi' : 'Davet Et'}
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <div style={styles.divider}>
                        <span>VEYA LİNK OLUŞTUR</span>
                    </div>

                    {/* --- ALT KISIM: LİNK OLUŞTURMA (Eski Kod) --- */}
                    <div style={styles.linkSection}>
                        <div style={styles.optionsRow}>
                            {presetOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setExpiresAfter(option.value)}
                                    style={{
                                        ...styles.miniOptionBtn,
                                        ...(expiresAfter === option.value && styles.optionBtnActive)
                                    }}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>

                        {/* Link Kutusu */}
                        <div style={styles.linkBoxContainer}>
                            {inviteLink ? (
                                <div style={styles.linkBox}>
                                    <input
                                        type="text"
                                        value={inviteLink}
                                        readOnly
                                        style={styles.linkInput}
                                    />
                                    <button
                                        onClick={copyToClipboard}
                                        style={{
                                            ...styles.copyBtn,
                                            ...(copied && styles.copyBtnSuccess)
                                        }}
                                    >
                                        {copied ? <FaCheck /> : <FaCopy />}
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={generateInvite}
                                    disabled={isGenerating}
                                    style={styles.generateBtn}
                                >
                                    {isGenerating ? 'Link Oluşturuluyor...' : 'Davet Linki Oluştur'}
                                </button>
                            )}
                        </div>

                        {inviteLink && (
                            <div style={styles.footerLinkOpts}>
                                <small style={{ color: '#b9bbbe' }}>
                                    {expiresAfter === 0 ? 'Süre sınırı yok' : `${expiresAfter} dakika geçerli`}
                                </small>
                                <button onClick={() => setInviteLink('')} style={styles.textBtn}>
                                    Yeni Link
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        backdropFilter: 'blur(5px)',
        margin: 0,
        padding: 0
    },
    modal: {
        backgroundColor: '#313338',
        borderRadius: '8px',
        width: '440px',
        maxWidth: '90%',
        maxHeight: '85%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        position: 'relative',
        margin: 0
    },
    header: {
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        color: '#f2f3f5',
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '20px',
    },
    content: {
        padding: '0 20px 20px 20px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden', // Scroll friend list inside
    },
    // --- ARKADAŞ LİSTESİ STİLLERİ ---
    friendSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '200px',
        marginBottom: '10px',
    },
    searchBox: {
        backgroundColor: '#1e1f22',
        borderRadius: '4px',
        padding: '0 10px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        border: '1px solid #1e1f22',
    },
    searchIcon: {
        color: '#b5bac1',
        marginRight: '8px',
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
        paddingRight: '5px',
    },
    friendItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 0',
        borderBottom: '1px solid #3f4147',
    },
    friendInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    friendAvatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#5865f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '14px',
        overflow: 'hidden',
    },
    avatarImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    friendName: {
        color: '#f2f3f5',
        fontSize: '14px',
        fontWeight: '500',
    },
    inviteBtn: {
        padding: '6px 16px',
        backgroundColor: 'transparent',
        border: '1px solid #23a559',
        color: '#23a559',
        borderRadius: '3px',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '500',
        transition: 'all 0.2s',
    },
    inviteBtnSent: {
        backgroundColor: 'transparent',
        border: '1px solid #b5bac1',
        color: '#b5bac1',
        cursor: 'default',
    },
    loadingText: {
        color: '#b5bac1',
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '13px',
    },
    emptyText: {
        color: '#b5bac1',
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '13px',
    },

    // --- ALT KISIM ---
    divider: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '15px 0',
        color: '#b5bac1',
        fontSize: '11px',
        fontWeight: 'bold',
        position: 'relative',
    },
    linkSection: {
        backgroundColor: '#2b2d31',
        margin: '0 -20px -20px -20px', // Content padding'i iptal et
        padding: '20px',
        borderTop: '1px solid #1e1f22',
    },
    optionsRow: {
        display: 'flex',
        gap: '10px',
        marginBottom: '15px',
    },
    miniOptionBtn: {
        flex: 1,
        padding: '8px',
        backgroundColor: '#1e1f22',
        border: 'none',
        borderRadius: '4px',
        color: '#b5bac1',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    optionBtnActive: {
        backgroundColor: '#404249',
        color: '#f2f3f5',
    },
    linkBoxContainer: {
        display: 'flex',
        gap: '10px',
    },
    linkBox: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#1e1f22',
        borderRadius: '4px',
        padding: '2px',
        border: '1px solid #1e1f22',
        alignItems: 'center',
    },
    linkInput: {
        flex: 1,
        backgroundColor: 'transparent',
        border: 'none',
        color: '#f2f3f5',
        padding: '10px',
        fontSize: '13px',
        outline: 'none',
        textOverflow: 'ellipsis',
    },
    copyBtn: {
        padding: '8px 20px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '3px',
        color: 'white',
        cursor: 'pointer',
        height: '100%',
        marginRight: '2px',
    },
    copyBtnSuccess: {
        backgroundColor: '#23a559',
    },
    generateBtn: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '3px',
        color: 'white',
        fontWeight: '500',
        cursor: 'pointer',
        fontSize: '13px',
    },
    footerLinkOpts: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
        alignItems: 'center',
    },
    textBtn: {
        background: 'none',
        border: 'none',
        color: '#00a8fc',
        fontSize: '12px',
        cursor: 'pointer',
        padding: 0,
    }
};

export default InviteModal;


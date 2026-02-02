// frontend/src/components/CreateInviteModal.js
import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaTimes, FaCopy, FaCheck, FaClock, FaUserCheck, FaSearch, FaPaperPlane } from 'react-icons/fa';

const CreateInviteModal = ({ server, room, onClose, apiBaseUrl, fetchWithAuth }) => {
    // --- LINK OLUŞTURMA STATE'LERİ ---
    const [expiresAfter, setExpiresAfter] = useState(1440); // Dakika (varsayılan 1 gün)
    const [maxUses, setMaxUses] = useState(0); // 0 = Sınırsız
    const [inviteLink, setInviteLink] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    // --- MEVCUT DAVETLERİ GETİR ---
    const [existingInvites, setExistingInvites] = useState([]);
    const [vanityUrl, setVanityUrl] = useState('');
    const [loadingExisting, setLoadingExisting] = useState(true);

    // --- ARKADAŞ DAVET ETME STATE'LERİ ---
    const [friends, setFriends] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingFriends, setLoadingFriends] = useState(true);
    const [invitedUsers, setInvitedUsers] = useState(new Set()); // Davet edilenler listesi (buton durumu için)

    // Modal açılınca mevcut davetleri ve arkadaşları çek
    useEffect(() => {
        const fetchExistingInvites = async () => {
            try {
                // Mevcut süresiz davetleri getir
                const res = await fetchWithAuth(`${apiBaseUrl}/invites/list/?server_id=${server.id}`);
                if (res.ok) {
                    const data = await res.json();
                    // Sadece süresiz (expires_in_hours = 0) olanları filtrele
                    const permanent = (data.invites || []).filter(inv => inv.max_uses === 0 && (inv.expires_in_hours === 0 || !inv.expires_at));
                    setExistingInvites(permanent);
                }

                // Vanity URL kontrolü
                if (server.vanity_url) {
                    setVanityUrl(`https://pawscord.com/invite/${server.vanity_url}`);
                }
            } catch (err) {
                console.error("Mevcut davetler alınamadı:", err);
            } finally {
                setLoadingExisting(false);
            }
        };

        const fetchFriends = async () => {
            try {
                const res = await fetchWithAuth(`${apiBaseUrl}/friends/list/`);
                if (res.ok) {
                    const data = await res.json();
                    // data.friends, kabul edilmiş arkadaşları içerir
                    setFriends(data.friends || []);
                }
            } catch (err) {
                console.error("Arkadaş listesi alınamadı:", err);
            } finally {
                setLoadingFriends(false);
            }
        };

        fetchExistingInvites();
        fetchFriends();
    }, [apiBaseUrl, fetchWithAuth, server.id, server.vanity_url]);

    const generateInvite = async () => {
        console.log('🎬 [CreateInvite] Starting...', {
            server: server ? { id: server.id, name: server.name } : null,
            room: room ? { slug: room.slug, name: room.name } : null,
            maxUses,
            expiresAfter
        });

        if (!server || !server.id) {
            toast.error('❌ Hata: Sunucu bilgisi bulunamadı!');
            console.error('❌ [CreateInvite] No server provided!');
            return;
        }

        setIsGenerating(true);
        try {
            const payload = {
                server_id: server.id,
                max_uses: maxUses === 0 ? 0 : maxUses,
                expires_in_hours: Math.floor(expiresAfter / 60)
            };

            console.log('📤 [CreateInvite] Payload:', payload);

            const response = await fetchWithAuth(`${apiBaseUrl}/invites/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            console.log('📥 [CreateInvite] Response status:', response.status);
            const data = await response.json();
            console.log('📋 [CreateInvite] Response data:', data);

            if (response.ok) {
                // Backend'den gelen tam URL'i al
                const link = data.url || data.invite_link || `https://pawscord.com/#/invite/${data.code}`;

                console.log('✅ [CreateInvite] Invite created:', {
                    code: data.code,
                    url: link,
                    rawData: data
                });

                if (!link) {
                    console.error('❌ [CreateInvite] No URL in response!', data);
                    toast.error('❌ Hata: Davet linki oluşturulamadı (URL yok)');
                    return;
                }

                setInviteLink(link);
                console.log('🔗 [CreateInvite] Link set to:', link);
                toast.success(`✅ Davet linki oluşturuldu!\n${link}`);
            } else {
                console.error('❌ [CreateInvite] Error:', data.error);
                toast.error('❌ Hata: ' + (data.error || 'Davet oluşturulamadı'));
            }
        } catch (error) {
            console.error('❌ [CreateInvite] Exception:', error);
            toast.error('❌ Bağlantı hatası: ' + error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // GEÇICI OLARAK DEVRE DIŞI - ESKİ SİSTEM KULLANIYOR!
    const handleInviteFriend = async (username) => {
        toast.info('📋 Bu özellik şu an devre dışı. Lütfen linki kopyalayıp arkadaşınıza gönderin.');
        return;

        /* ESKİ KOD - UUID formatında link oluşturuyor, yeni sistem kullanmıyor!
        setInvitedUsers(prev => new Set(prev).add(username));

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/invites/send_to_friends/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                room_slug: room ? room.slug : null,
                server_id: server ? server.id : null,
                usernames: [username]
            })
        });

            if (!response.ok) {
                setInvitedUsers(prev => {
                    const next = new Set(prev);
                    next.delete(username);
                    return next;
                });
                toast.error("❌ Davet gönderilemedi.");
            }
        } catch (error) {
            console.error(error);
            setInvitedUsers(prev => {
                const next = new Set(prev);
                next.delete(username);
                return next;
            });
        }
        */
    };

    const presetOptions = [
        { label: '30 Dakika', value: 30, icon: <FaClock /> },
        { label: '1 Gün', value: 1440, icon: <FaClock /> }, // İkon düzeltildi
        { label: 'Süresiz', value: 0, icon: <FaClock /> },
    ];

    const filteredFriends = friends.filter(f => {
        // Arkadaş objesinin yapısına göre (FriendshipSerializer'dan gelen veri)
        // Genelde { sender_username: '...', receiver_username: '...' } döner
        // Burada basitçe username'i bulup filtreliyoruz.
        const name = f.sender_username || f.receiver_username || f.username;
        return name && name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2 style={styles.title}>
                        <b>{room.name}</b> odasına davet et
                    </h2>
                    <button onClick={onClose} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {/* --- VANITY URL --- */}
                    {vanityUrl && (
                        <div style={{ ...styles.section, backgroundColor: '#2b2d31', padding: '15px', borderRadius: '6px', marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ color: '#23a559', fontSize: '0.75em', fontWeight: 'bold', marginBottom: '5px' }}>✨ ÖZEL URL</div>
                                    <div style={{ color: '#f2f3f5', fontWeight: '500', fontSize: '0.9em' }}>{vanityUrl}</div>
                                </div>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(vanityUrl);
                                        toast.success('Özel URL kopyalandı!');
                                    }}
                                    style={{ ...styles.copyBtn, width: '60px' }}
                                >
                                    <FaCopy />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* --- MEVCUT SÜRESIZ DAVETLER --- */}
                    {existingInvites.length > 0 && (
                        <div style={{ ...styles.section, marginBottom: '15px' }}>
                            <div style={{ color: '#b5bac1', fontSize: '0.85em', marginBottom: '8px', fontWeight: '500' }}>⏰ Mevcut Süresiz Davetler</div>
                            {existingInvites.map(inv => {
                                const url = inv.url || `https://pawscord.com/invite/${inv.code}`;
                                return (
                                    <div key={inv.code} style={{ ...styles.linkContainer, marginBottom: '5px', backgroundColor: '#1e1f22' }}>
                                        <input
                                            type="text"
                                            value={url}
                                            readOnly
                                            style={{ ...styles.linkInput, fontSize: '0.85em' }}
                                        />
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(url);
                                                toast.success('Link kopyalandı!');
                                            }}
                                            style={{ ...styles.copyBtn, width: '60px', height: '32px' }}
                                        >
                                            <FaCopy />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* --- YENİ LINK OLUŞTURMA --- */}
                    <div style={{ color: '#b5bac1', fontSize: '0.85em', marginBottom: '8px', fontWeight: '500' }}>➕ Yeni Davet Linki Oluştur</div>
                    <div style={styles.section}>
                        <div style={styles.linkContainer}>
                            <input
                                type="text"
                                value={inviteLink || "Link henüz oluşturulmadı"}
                                readOnly
                                style={styles.linkInput}
                            />
                            {inviteLink ? (
                                <button
                                    onClick={copyToClipboard}
                                    style={{ ...styles.copyBtn, ...(copied && styles.copyBtnSuccess) }}
                                >
                                    {copied ? <FaCheck /> : <FaCopy />}
                                </button>
                            ) : (
                                <button
                                    onClick={generateInvite}
                                    disabled={isGenerating}
                                    style={styles.generateBtn}
                                >
                                    {isGenerating ? '...' : 'Oluştur'}
                                </button>
                            )}
                        </div>

                        <div style={styles.optionsRow}>
                            <label style={styles.smallLabel}>Süre:</label>
                            <select
                                value={expiresAfter}
                                onChange={(e) => setExpiresAfter(Number(e.target.value))}
                                style={styles.select}
                            >
                                {presetOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>

                            <label style={{ ...styles.smallLabel, marginLeft: 15 }}>Kullanım:</label>
                            <select
                                value={maxUses}
                                onChange={(e) => setMaxUses(Number(e.target.value))}
                                style={styles.select}
                            >
                                <option value={0}>Sınırsız</option>
                                <option value={1}>1 Kullanım</option>
                                <option value={5}>5 Kullanım</option>
                                <option value={10}>10 Kullanım</option>
                            </select>
                        </div>
                    </div>

                    {/* --- ALT TARAF: ARKADAŞ LİSTESİ --- */}
                    <div style={styles.friendsSection}>
                        <div style={styles.searchBox}>
                            <FaSearch color="#999" />
                            <input
                                placeholder="Arkadaşlarını ara..."
                                style={styles.searchInput}
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div style={styles.friendsList}>
                            {loadingFriends ? (
                                <p style={styles.emptyText}>Yükleniyor...</p>
                            ) : filteredFriends.length > 0 ? (
                                filteredFriends.map((friend, idx) => {
                                    // Arkadaş ismini belirle (API yapısına göre)
                                    // FriendshipSerializer'da 'sender_username' ve 'receiver_username' olabilir.
                                    // Eğer bu user objesi ise 'username' olabilir.
                                    // Basit bir kontrol yapıyoruz:
                                    let friendName = friend.username;
                                    if (!friendName) {
                                        // Eğer user objesi değilse friendship objesidir, karşı tarafı bulalım.
                                        // Not: Bu kısım API'nin dönüş yapısına bağlıdır.
                                        // `list_friends` view'ı `FriendshipSerializer` döndürüyorsa:
                                        // friendName = friend.sender_username === currentUsername ? friend.receiver_username : friend.sender_username;
                                        // Ancak frontend'de currentUsername'i bilmiyorsak basitçe ikisini de deneriz
                                        // Genelde friend listesi temizlenmiş isimler olarak gelmesi daha iyidir.
                                        // Burada API yanıtının {friends: [{username: '...', ...}]} şeklinde normalize edildiğini varsayıyoruz
                                        // EĞER API direkt friendship objesi dönüyorsa, `ChatUserList.js` mantığını kullanabilirsiniz.
                                        // Şimdilik `friend.username` veya `friend` string ise onu kullanıyoruz.
                                        if (typeof friend === 'string') friendName = friend;
                                        else friendName = friend.sender_username || friend.receiver_username; // Fallback
                                    }

                                    const isInvited = invitedUsers.has(friendName);

                                    return (
                                        <div key={idx} style={styles.friendItem}>
                                            <div style={styles.friendInfo}>
                                                <div style={styles.friendAvatar}>
                                                    {friendName.substring(0, 2).toUpperCase()}
                                                </div>
                                                <span style={styles.friendName}>{friendName}</span>
                                            </div>
                                            <button
                                                onClick={() => !isInvited && handleInviteFriend(friendName)}
                                                style={{
                                                    ...styles.inviteBtn,
                                                    ...(isInvited ? styles.inviteBtnSent : {})
                                                }}
                                                disabled={isInvited}
                                            >
                                                {isInvited ? 'Davet Edildi' : 'Davet Et'}
                                            </button>
                                        </div>
                                    );
                                })
                            ) : (
                                <p style={styles.emptyText}>Arkadaş bulunamadı.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 10000, backdropFilter: 'blur(5px)',
    },
    modal: {
        backgroundColor: '#313338', borderRadius: '8px',
        maxWidth: '600px', width: '90%',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column'
    },
    header: {
        padding: '20px', borderBottom: '1px solid #1e1f22',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    },
    title: { margin: 0, color: '#f2f3f5', fontSize: '1em' },
    closeBtn: {
        background: 'none', border: 'none', color: '#b5bac1',
        fontSize: '1.2em', cursor: 'pointer'
    },
    content: { padding: '10px 20px 20px 20px' },
    section: { marginBottom: '20px' },
    linkContainer: {
        display: 'flex',
        gap: '8px',
        marginBottom: '10px',
        backgroundColor: '#1e1f22',
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #1e1f22',
        alignItems: 'center'
    },
    linkInput: {
        flex: 1,
        background: 'transparent',
        border: 'none',
        color: '#dbdee1',
        padding: '8px',
        fontSize: '0.9em',
        outline: 'none',
        minWidth: 0 // Flex shrinking için
    },
    generateBtn: {
        padding: '8px 16px',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.85em',
        flexShrink: 0, // Buton boyutunu koru
        whiteSpace: 'nowrap' // Metin kırılmasın
    },
    copyBtn: {
        width: '80px', // Biraz genişlettik
        height: '36px', // Yükseklik ekledik
        backgroundColor: '#23a559',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0 // Buton boyutunu koru
    },
    copyBtnSuccess: { backgroundColor: '#23a559' },
    optionsRow: { display: 'flex', alignItems: 'center', fontSize: '0.8em' },
    smallLabel: { color: '#b5bac1', marginRight: '8px' },
    select: {
        background: 'transparent', color: '#dbdee1', border: 'none',
        outline: 'none', cursor: 'pointer', fontWeight: '500'
    },

    // Arkadaş Listesi Stilleri
    friendsSection: {
        marginTop: '10px'
    },
    searchBox: {
        display: 'flex', alignItems: 'center', gap: '10px',
        backgroundColor: '#1e1f22', padding: '8px 12px',
        borderRadius: '4px', marginBottom: '10px',
        border: '1px solid #1e1f22'
    },
    searchInput: {
        background: 'transparent', border: 'none', color: 'white',
        width: '100%', outline: 'none'
    },
    friendsList: {
        maxHeight: '200px', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: '2px'
    },
    friendItem: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px', borderRadius: '4px',
        transition: 'background 0.2s',
        ':hover': { backgroundColor: '#3f4147' } // React inline style hover desteklemez ama yapı bu şekildedir
    },
    friendInfo: { display: 'flex', alignItems: 'center', gap: '10px' },
    friendAvatar: {
        width: '32px', height: '32px', borderRadius: '50%',
        backgroundColor: '#5865f2', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontWeight: 'bold', fontSize: '0.8em'
    },
    friendName: { color: '#f2f3f5', fontWeight: '500' },
    inviteBtn: {
        padding: '6px 16px', border: '1px solid #23a559',
        backgroundColor: 'transparent', color: '#23a559',
        borderRadius: '3px', cursor: 'pointer', fontSize: '0.8em',
        transition: 'all 0.2s'
    },
    inviteBtnSent: {
        backgroundColor: '#23a559', color: 'white', borderColor: '#23a559', cursor: 'default'
    },
    emptyText: { color: '#949ba4', textAlign: 'center', fontSize: '0.9em', marginTop: '20px' }
};

export default CreateInviteModal;


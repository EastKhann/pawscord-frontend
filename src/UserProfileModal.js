// frontend/src/UserProfileModal.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import toast from './utils/toast';
import { FaUserPlus, FaCheck, FaCoins, FaDesktop, FaClock } from 'react-icons/fa';
import { AchievementsPanel } from './components/AchievementBadge';
import SessionManagerModal from './components/SessionManagerModal';

const getIconForLink = (key) => {
    if (key.includes('steam')) return 'fab fa-steam';
    if (key.includes('x')) return 'fab fa-twitter';
    if (key.includes('instagram')) return 'fab fa-instagram';
    return 'fa fa-link';
};

const formatUrl = (url, key) => {
    if (!url || url.trim() === '') return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (key === 'x') return `https://x.com/${url.replace('@', '')}`;
    if (key === 'instagram') return `https://instagram.com/${url.replace('@', '')}`;
    return `https://${url}`;
};

const UserProfileModal = ({ user, onClose, onStartDM, onImageClick, getDeterministicAvatar, fetchWithAuth, apiBaseUrl, currentUser, friendsList }) => {

    const [requestStatus, setRequestStatus] = useState('idle');
    const [showSessionManager, setShowSessionManager] = useState(false);
    const [activeTab, setActiveTab] = useState('profile'); // 🆕 Tab management
    const [presenceHistory, setPresenceHistory] = useState([]); // 🆕 Presence history

    // 🆕 Fetch presence history
    useEffect(() => {
        if (activeTab === 'activity' && user.username) {
            const fetchPresenceHistory = async () => {
                try {
                    const response = await fetchWithAuth(`${apiBaseUrl}/presence/${user.username}/`);
                    if (response.ok) {
                        const data = await response.json();
                        // Backend returns {presence: [...]} but we need just the array
                        setPresenceHistory(data.presence || []);
                    }
                } catch (error) {
                    console.error('Failed to fetch presence history:', error);
                    setPresenceHistory([]);
                }
            };
            fetchPresenceHistory();
        }
    }, [activeTab, user.username, fetchWithAuth, apiBaseUrl]);

    if (!user) return null;

    // 🔥 DÜZELTME: Arkadaş kontrolü - friendsList artık {username, avatar, ...} objeler array'i
    const isFriend = friendsList && Array.isArray(friendsList) && (
        friendsList.some(f => {
            // String kontrolü (eski format)
            if (typeof f === 'string') return f === user.username;
            // Object kontrolü - direkt username (yeni format) veya sender/receiver (eski friend request format)
            return f.username === user.username ||
                f.sender_username === user.username ||
                f.receiver_username === user.username;
        })
    );
    const isSelf = user.username === currentUser;

    console.log('🔍 [ProfileModal Debug]:', {
        username: user.username,
        currentUser,
        isFriend,
        isSelf,
        friendsListLength: friendsList?.length,
        friendsList: friendsList?.slice(0, 3) // İlk 3 arkadaşı göster
    });

    const handleAddFriend = async () => {
        setRequestStatus('loading');
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/friends/send/`, {
                method: 'POST',
                body: JSON.stringify({ username: user.username })
            });

            if (response.ok) {
                setRequestStatus('success');
            } else {
                toast.error("❌ İstek gönderilemedi. Zaten ekli veya bekliyor olabilir.");
                setRequestStatus('idle');
            }
        } catch (error) {
            console.error("Arkadaş ekleme hatası:", error);
            setRequestStatus('idle');
        }
    };

    const copyToClipboard = (text, key) => {
        try {
            navigator.clipboard.writeText(text);
            toast.success(`✅ '${key}' panoya kopyalandı`);
        } catch (err) {
            toast.error('❌ Kopyalama hatası.');
        }
    };

    const linkDisplayNames = {
        steam_trade: 'Steam Trade URL',
        steam_profile: 'Steam Profili',
        steam_friend_code: 'Steam Arkadaş Kodu',
        x: 'X (Twitter)',
        instagram: 'Instagram'
    };

    const handleSendMoney = async () => {
        const amount = prompt(`Ne kadar Coin göndermek istiyorsun? (${user.username} kişisine)`);
        if (!amount) return;

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/store/transfer/`, {
                method: 'POST',
                body: JSON.stringify({ target_username: user.username, amount: amount })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
            } else {
                toast.error(data.error);
            }
        } catch (e) { toast.error("❌ Hata."); }
    };

    const socialLinks = user.social_links || {};
    const validLinks = Object.entries(socialLinks).filter(([key, value]) => value && value.trim() !== '');

    const handleMessageClick = () => {
        onStartDM(user.username);
    };

    const rawAvatarUrl = user.avatar || getDeterministicAvatar(user.username);
    // 🔥 FIX: rawAvatarUrl string olmalı
    const avatarUrl = (typeof rawAvatarUrl === 'string' && rawAvatarUrl.startsWith('http'))
        ? rawAvatarUrl
        : (typeof rawAvatarUrl === 'string' ? `${apiBaseUrl}${rawAvatarUrl}` : getDeterministicAvatar(user.username));
    // Cache busting for avatar updates
    const avatarSrc = avatarUrl + (user.avatar && typeof user.avatar === 'string' ? `?t=${Date.now()}` : '');

    const modalContent = (
        <div style={{ ...styles.overlay, zIndex: 9999 }} onClick={onClose}>
            <div style={{ ...styles.modal, zIndex: 10000, position: 'relative' }} onClick={e => e.stopPropagation()}>

                {/* 🎨 MODERN PROFILE BANNER */}
                <div style={{
                    position: 'relative',
                    height: '180px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '16px 16px 0 0',
                    overflow: 'visible' // 🔥 FIX: Avatar'ın görünmesi için overflow:visible
                }}>
                    {/* Banner pattern */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'rgba(255,255,255,0.1)\' d=\'M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\'%3E%3C/path%3E%3C/svg%3E")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'bottom',
                        backgroundSize: 'cover',
                        opacity: 0.3,
                        zIndex: 1,
                        borderRadius: '16px 16px 0 0', // 🔥 Pattern için de border radius
                        overflow: 'hidden'
                    }} />

                    {/* Avatar in banner - Fixed positioning */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-50px', // Adjusted for better visibility
                        left: '32px',
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        border: '5px solid #2f3136',
                        overflow: 'hidden',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        zIndex: 1000,
                        backgroundColor: '#2f3136' // Background color for loading state
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        onClick={() => onImageClick(avatarUrl)}
                    >
                        <img
                            src={avatarSrc}
                            key={avatarUrl}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            alt={`${user.username} avatar`}
                            onError={(e) => {
                                console.error('❌ [UserProfileModal] Avatar load failed:', e.target.src);
                                e.target.src = getDeterministicAvatar(user.username);
                            }}
                        />
                    </div>

                    {/* Action buttons in banner */}
                    <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        display: 'flex',
                        gap: '8px',
                        zIndex: 1000 // 🔥 FIX: z-index eklendi
                    }}>
                        {/* Close button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onClose();
                            }}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                background: 'rgba(0, 0, 0, 0.6)',
                                color: '#fff',
                                fontSize: '20px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                                zIndex: 1001
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(240, 71, 71, 0.8)';
                                e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >×</button>
                    </div>
                </div>

                {/* User info section - Adjusted padding for avatar */}
                <div style={{
                    padding: '70px 32px 24px 32px', // Reduced top padding since avatar is higher
                    background: '#2f3136'
                }}>
                    <h2 style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        margin: '0 0 12px 0',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        {user.username}
                        {user.is_premium && <span style={{ fontSize: '20px' }}>💎</span>}
                        {user.is_verified && <span style={{ fontSize: '20px' }}>✅</span>}
                    </h2>

                    {/* Action buttons row */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        {/* 🔥 Sadece arkadaş olmayan ve kendisi olmayan kişilerde "Ekle" butonu göster */}
                        {!isFriend && !isSelf && (
                            <button
                                onClick={handleAddFriend}
                                style={{
                                    ...styles.actionButton,
                                    backgroundColor: requestStatus === 'success' ? '#43b581' : '#5865f2',
                                    cursor: requestStatus === 'success' || requestStatus === 'loading' ? 'default' : 'pointer',
                                    flex: 1
                                }}
                                disabled={requestStatus !== 'idle'}
                            >
                                {requestStatus === 'loading' ? '...' : (
                                    requestStatus === 'success' ? <FaCheck /> : <FaUserPlus />
                                )}
                                {requestStatus === 'success' ? ' Gönderildi' : ' Arkadaş Ekle'}
                            </button>
                        )}

                        {/* 🔥 Coin gönderme - kendisi değilse */}
                        {!isSelf && (
                            <button onClick={handleSendMoney} style={{ ...styles.actionButton, backgroundColor: '#f0b232', flex: 1 }}>
                                <FaCoins /> Coin Gönder
                            </button>
                        )}

                        {isSelf && (
                            <button
                                onClick={() => setShowSessionManager(true)}
                                style={{ ...styles.actionButton, backgroundColor: '#43b581', flex: 1 }}
                                title="Aktif Oturumları Yönet"
                            >
                                <FaDesktop /> Oturumlar
                            </button>
                        )}

                        {!isSelf && (
                            <button onClick={handleMessageClick} style={{ ...styles.messageButton, flex: 1 }}>
                                💬 Mesaj Gönder
                            </button>
                        )}
                    </div>
                </div>

                {/* Content area */}
                <div style={{
                    ...styles.content,
                    padding: '24px 32px',
                    overflowY: 'auto'
                }}>
                    {/* 🔥 ARKADAŞ KODU BÖLÜMÜ */}
                    {user.friend_code && (
                        <div
                            onClick={() => copyToClipboard(user.friend_code, 'Arkadaş Kodu')}
                            style={{
                                ...styles.friendCodeContainer,
                                background: 'rgba(88, 101, 242, 0.1)',
                                border: '1px solid rgba(88, 101, 242, 0.3)',
                                borderRadius: '8px',
                                padding: '12px 16px',
                                marginBottom: '16px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(88, 101, 242, 0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(88, 101, 242, 0.1)'}
                            title="Kodu Kopyalamak İçin Tıkla"
                        >
                            <span style={styles.friendCodeLabel}>Arkadaş Kodu</span>
                            <span style={styles.friendCodeValue}>{user.friend_code}</span>
                        </div>
                    )}

                    {user.status_message && (
                        <div style={styles.section}>
                            <h4 style={styles.sectionTitle}>Durum</h4>
                            <p style={styles.statusText}>{user.status_message}</p>
                        </div>
                    )}

                    {/* 🆕 Tabs */}
                    <div style={styles.tabsContainer}>
                        <button
                            onClick={() => setActiveTab('profile')}
                            style={{ ...styles.tabButton, ...(activeTab === 'profile' && styles.activeTab) }}
                        >
                            Profile
                        </button>
                        <button
                            onClick={() => setActiveTab('activity')}
                            style={{ ...styles.tabButton, ...(activeTab === 'activity' && styles.activeTab) }}
                        >
                            <FaClock /> Activity
                        </button>
                    </div>

                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <>
                            <AchievementsPanel
                                username={user.username}
                                fetchWithAuth={fetchWithAuth}
                                apiBaseUrl={apiBaseUrl}
                            />

                            {validLinks.length > 0 && (
                                <div style={styles.section}>
                                    <h4 style={styles.sectionTitle}>Bağlantılar</h4>
                                    <div style={styles.linksContainer}>
                                        {validLinks.map(([key, value]) => {
                                            const displayName = linkDisplayNames[key] || (key.charAt(0).toUpperCase() + key.slice(1));
                                            const icon = getIconForLink(key);
                                            const isCopyButton = (key === 'steam_friend_code' || key === 'steam_trade');

                                            if (isCopyButton) {
                                                return (
                                                    <button
                                                        key={key}
                                                        onClick={() => copyToClipboard(value, displayName)}
                                                        style={styles.linkButton}
                                                        title={`Kopyala: ${value}`}
                                                    >
                                                        <i className={icon}></i>
                                                        <span style={styles.linkText}>{displayName}</span>
                                                        <i className="fa fa-copy" style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}></i>
                                                    </button>
                                                );
                                            }
                                            return (
                                                <a
                                                    key={key}
                                                    href={formatUrl(value, key)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={styles.linkButton}
                                                    title={value}
                                                >
                                                    <i className={icon}></i>
                                                    <span style={styles.linkText}>{displayName}</span>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* 🆕 Activity Tab - Presence History */}
                    {activeTab === 'activity' && (
                        <div style={styles.section}>
                            <h4 style={styles.sectionTitle}>Activity Timeline</h4>
                            {presenceHistory.length === 0 ? (
                                <p style={styles.noDataText}>No activity data available</p>
                            ) : (
                                <div style={styles.presenceTimeline}>
                                    {presenceHistory.map((entry, idx) => (
                                        <div key={idx} style={styles.presenceEntry}>
                                            <div style={{
                                                ...styles.presenceStatus,
                                                backgroundColor: entry.status === 'online' ? '#43b581' :
                                                    entry.status === 'idle' ? '#faa61a' :
                                                        entry.status === 'dnd' ? '#f04747' : '#747f8d'
                                            }} />
                                            <div style={styles.presenceDetails}>
                                                <span style={styles.presenceStatusText}>
                                                    {entry.status === 'online' ? '🟢 Online' :
                                                        entry.status === 'idle' ? '🟡 Idle' :
                                                            entry.status === 'dnd' ? '🔴 Do Not Disturb' : '⚫ Offline'}
                                                </span>
                                                <span style={styles.presenceTime}>
                                                    {new Date(entry.timestamp).toLocaleString('tr-TR', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {showSessionManager && (
                <SessionManagerModal
                    onClose={() => setShowSessionManager(false)}
                    fetchWithAuth={fetchWithAuth}
                    apiBaseUrl={apiBaseUrl}
                />
            )}
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(8px)'
    },
    modal: {
        width: '500px',
        maxWidth: '90vw',
        backgroundColor: '#2f3136',
        borderRadius: '16px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        maxHeight: '90vh',
        border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    actionButton: {
        padding: '12px 20px',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontSize: '14px',
        transition: 'all 0.2s',
        cursor: 'pointer'
    },
    messageButton: {
        padding: '12px 20px',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.9em'
    },
    content: {
        padding: '20px',
        maxHeight: '60vh',
        overflowY: 'auto'
    },
    username: {
        color: 'var(--text-primary)',
        margin: '0 0 10px 0',
        fontSize: '1.8em'
    },
    // 🔥 YENİ: Arkadaş Kodu Stilleri
    friendCodeContainer: {
        backgroundColor: 'rgba(88, 101, 242, 0.1)',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px dashed #5865f2',
        marginBottom: '15px',
        transition: 'background-color 0.2s'
    },
    friendCodeLabel: {
        fontSize: '0.75em',
        color: '#949ba4',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: '4px'
    },
    friendCodeValue: {
        fontSize: '1.3em',
        color: '#5865f2',
        fontWeight: '800',
        letterSpacing: '2px'
    },
    section: {
        marginTop: '20px'
    },
    sectionTitle: {
        color: 'var(--text-secondary)',
        fontSize: '0.8em',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        margin: '0 0 8px 0',
        borderBottom: '1px solid var(--border-primary)',
        paddingBottom: '5px'
    },
    statusText: {
        color: 'var(--text-primary)',
        margin: 0,
        fontSize: '0.9em'
    },
    linksContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    linkButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 12px',
        backgroundColor: 'var(--background-secondary)',
        borderRadius: '4px',
        color: 'var(--text-primary)',
        textDecoration: 'none',
        transition: 'background-color 0.2s ease',
        border: 'none',
        fontFamily: 'inherit',
        fontSize: '1em',
        width: 'auto',
        cursor: 'pointer',
        textAlign: 'left',
        alignSelf: 'flex-start'
    },
    linkText: {
        marginLeft: '10px',
        fontWeight: '500'
    },
    // 🆕 Tabs styles
    tabsContainer: {
        display: 'flex',
        gap: '10px',
        borderBottom: '2px solid var(--background-tertiary)',
        marginBottom: '20px'
    },
    tabButton: {
        background: 'none',
        border: 'none',
        padding: '10px 20px',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        fontWeight: '500',
        borderBottom: '2px solid transparent',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    activeTab: {
        color: 'var(--brand-color)',
        borderBottomColor: 'var(--brand-color)'
    },
    // 🆕 Presence History styles
    presenceTimeline: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginTop: '15px'
    },
    presenceEntry: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px',
        backgroundColor: 'var(--background-secondary)',
        borderRadius: '6px',
        transition: 'background-color 0.2s'
    },
    presenceStatus: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        flexShrink: 0
    },
    presenceDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        flex: 1
    },
    presenceStatusText: {
        color: 'var(--text-primary)',
        fontWeight: '500',
        fontSize: '0.95em'
    },
    presenceTime: {
        color: 'var(--text-secondary)',
        fontSize: '0.85em'
    },
    noDataText: {
        color: 'var(--text-secondary)',
        textAlign: 'center',
        padding: '20px',
        fontStyle: 'italic'
    }
};

export default UserProfileModal


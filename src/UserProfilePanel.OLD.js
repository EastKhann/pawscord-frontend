// frontend/src/UserProfilePanel.js
// --- TAM DOSYA İÇERİĞİ (KAYDIRMA VE STEAM GÜNCELLEMESİYLE) ---

import React, { useState, useRef, useEffect, useCallback } from 'react';
import AvatarCropper from './components/AvatarCropper'; // 📸 AVATAR CROPPER
import { compressAvatar } from './utils/imageCompression'; // 🖼️ IMAGE COMPRESSION
import { useCachedImage } from './utils/imageCaching'; // ⚡ OPTIMIZATION: Image caching

const UserProfilePanel = ({
    user, onClose, onProfileUpdate, updateProfileUrl, changeUsernameUrl, getDeterministicAvatar,
    soundSettings, onUpdateSoundSettings, onLogout, onImageClick, fetchWithAuth, apiBaseUrl
}) => {
    const [statusMessage, setStatusMessage] = useState(user?.status_message || '');
    const [newUsername, setNewUsername] = useState(user?.username || '');
    const [xboxGamertag, setXboxGamertag] = useState(user?.xbox_gamertag || ''); // 🔥 Xbox State
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    // Tam profil verisini (arkadaş kodu vb. dahil) tutmak için state
    // Başlangıçta 'user' props'u ile dolduruyoruz, sonra API'den güncelliyoruz
    const [fullUser, setFullUser] = useState(user || {});

    // Sosyal linkler için state (GÜNCELLENDİ)
    const [socials, setSocials] = useState(() => {
        const existing = user?.social_links || {}; // Veritabanından geleni al
        return {
            steam_trade: existing.steam_trade || '',
            steam_profile: existing.steam_profile || '', // 'steam_friend' -> 'steam_profile' oldu
            steam_friend_code: existing.steam_friend_code || '',
            x: existing.x || '',
            instagram: existing.instagram || ''
        };
    });

    // 🔥 YENİ: Kullanıcı panelini açınca tam profil verisini çek (Arkadaş kodu için)
    useEffect(() => {
        // API'den çekmek yerine, props'tan gelen user'ı kullan
        setFullUser(user || {});

        if (user?.social_links) {
            setSocials(prev => ({
                ...prev,
                steam_trade: user.social_links.steam_trade || prev.steam_trade,
                steam_profile: user.social_links.steam_profile || prev.steam_profile,
                steam_friend_code: user.social_links.steam_friend_code || prev.steam_friend_code,
                x: user.social_links.x || prev.x,
                instagram: user.social_links.instagram || prev.instagram
            }));
        }
    }, [user]);


    // Sosyal link input'larını güncelleyen yardımcı fonksiyon
    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setSocials(prev => ({ ...prev, [name]: value }));
    };

    // 📸 AVATAR CROPPER state
    const [showCropper, setShowCropper] = useState(false);
    const [tempImageFile, setTempImageFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            // Önce cropper modal'ını aç
            setTempImageFile(file);
            setShowCropper(true);
        }
    };

    // 📸 Kırpma tamamlandığında
    const handleCropComplete = async (croppedFile) => {
        try {
            // 🖼️ Compress avatar before setting
            const compressedFile = await compressAvatar(croppedFile);
            const finalFile = new File([compressedFile], croppedFile.name, { type: 'image/webp' });

            setSelectedFile(finalFile);
            setPreview(URL.createObjectURL(finalFile));
            setShowCropper(false);
            setTempImageFile(null);

            console.log('🖼️ [Avatar] Compressed:', {
                original: `${(croppedFile.size / 1024).toFixed(2)}KB`,
                compressed: `${(compressedFile.size / 1024).toFixed(2)}KB`,
                format: 'WebP'
            });
        } catch (error) {
            console.error('❌ [Avatar] Compression failed:', error);
            // Fallback to original
            setSelectedFile(croppedFile);
            setPreview(URL.createObjectURL(croppedFile));
            setShowCropper(false);
            setTempImageFile(null);
        }
    };

    // 📸 Kırpma iptal edildiğinde
    const handleCropCancel = () => {
        setShowCropper(false);
        setTempImageFile(null);
        // Dosya input'unu sıfırla
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleChangeUsername = async () => {
        const trimmedNewUsername = newUsername.trim();
        if (!user || trimmedNewUsername === user.username || trimmedNewUsername === '') return;

        setIsLoading(true);
        try {
            const response = await fetchWithAuth(changeUsernameUrl, {
                method: 'POST',
                body: JSON.stringify({
                    old_username: user.username,
                    new_username: trimmedNewUsername
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Kullanıcı adınız başarıyla ${trimmedNewUsername} olarak değiştirildi. Lütfen yeniden giriş yapın.`);
                onLogout(); // Otomatik çıkış yaptır
            } else {
                alert(`Kullanıcı adı değiştirilemedi: ${data.error}`);
            }
        } catch (error) {
            console.error("Kullanıcı adı değiştirme hatası:", error);
            alert("Bir ağ hatası oluştu.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!user) return;
        setIsLoading(true);

        const formData = new FormData();
        formData.append('username', user.username);
        formData.append('status_message', statusMessage);
        if (selectedFile) {
            formData.append('avatar', selectedFile);
        }
        formData.append('xbox_gamertag', xboxGamertag); // 🔥 Xbox Gamertag Eklendi

        // Sosyal linkleri JSON string olarak ekle
        formData.append('social_links', JSON.stringify(socials));

        try {
            const response = await fetchWithAuth(updateProfileUrl, {
                method: 'POST',
                body: formData,
            });
            const updatedData = await response.json();
            if (response.ok) {
                onProfileUpdate(updatedData);
                onClose();
            } else {
                alert(`Hata: ${updatedData.error || 'Profil güncellenemedi.'}`);
            }
        } catch (error) {
            console.error("Profil güncelleme hatası:", error);
            alert("Bir ağ hatası oluştu.");
        } finally {
            setIsLoading(false);
        }
    };
    // ... diğer state ve fonksiyonlar ...

    const handleConnectSpotify = async () => {
        try {
            const API_BASE = apiBaseUrl || "https://pawscord.com/api";
            // 1. URL'i al
            const response = await fetchWithAuth(`${API_BASE}/auth/spotify/start/`);
            if (response.ok) {
                const data = await response.json();

                // 2. Yönlendirme (Electron kontrolü ile)
                if (window.require) {
                    try {
                        const { shell } = window.require('electron');
                        shell.openExternal(data.url);
                    } catch (e) {
                        console.error("Electron shell hatası:", e);
                        window.location.href = data.url;
                    }
                } else {
                    window.location.href = data.url;
                }
            } else {
                alert("Spotify bağlantı linki alınamadı.");
            }
        } catch (error) {
            console.error("Spotify login hatası:", error);
            alert("Bir hata oluştu.");
        }
    };

    const handleConnectSteam = async () => {
        try {
            const API_BASE = apiBaseUrl || "https://pawscord.com/api";
            // 1. URL'i al
            const response = await fetchWithAuth(`${API_BASE}/auth/steam/start/`);
            if (response.ok) {
                const data = await response.json();

                // 2. Yönlendirme (Electron kontrolü ile)
                if (window.require) {
                    try {
                        const { shell } = window.require('electron');
                        shell.openExternal(data.url);
                    } catch (e) {
                        console.error("Electron shell hatası:", e);
                        window.location.href = data.url;
                    }
                } else {
                    window.location.href = data.url;
                }
            } else {
                alert("Steam bağlantı linki alınamadı.");
            }
        } catch (error) {
            console.error("Steam login hatası:", error);
            alert("Bir hata oluştu.");
        }
    };

    // Rich Presence State
    const [richPresence, setRichPresence] = useState(null);

    useEffect(() => {
        if (!user?.username) return;

        const fetchRichPresence = async () => {
            const API_BASE = apiBaseUrl || "https://pawscord.com/api";
            try {
                const res = await fetchWithAuth(`${API_BASE}/users/rich_presence/${user.username}/`);
                if (res.ok) {
                    setRichPresence(await res.json());
                }
            } catch (err) {
                console.error("RP Fetch Error", err);
            }
        };

        fetchRichPresence();
        const interval = setInterval(fetchRichPresence, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, [user, apiBaseUrl]);

    // ... return (...)

    const avatarUrl = preview || fullUser?.avatar || getDeterministicAvatar(fullUser?.username);

    // 🔥 Avatar URL düzeltme
    let finalAvatarUrlBase = avatarUrl;
    if (finalAvatarUrlBase && !finalAvatarUrlBase.startsWith('http') && !finalAvatarUrlBase.startsWith('blob') && !finalAvatarUrlBase.includes('ui-avatars.com')) {
        const path = finalAvatarUrlBase.startsWith('/') ? finalAvatarUrlBase : `/${finalAvatarUrlBase}`;
        finalAvatarUrlBase = `https://pawscord.com${path}`;
    }

    // ⚡ OPTIMIZATION: Progressive avatar loading
    const { url: finalAvatarUrl } = useCachedImage(finalAvatarUrlBase);

    console.log('👤 [UserProfilePanel] Avatar Debug:', {
        preview,
        userAvatar: fullUser?.avatar,
        finalAvatarUrl,
        friendCode: fullUser?.friend_code
    });

    const handleSoundSettingChange = (setting, value) => {
        onUpdateSoundSettings({ ...soundSettings, [setting]: value });
    };
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Kopyalandı: " + text);
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.panel} onClick={e => e.stopPropagation()}>
                <button style={styles.closeButton} onClick={onClose}>×</button>

                {/* 1. SABİT BAŞLIK */}
                <h2 style={styles.panelHeader}>Profili Düzenle</h2>

                {/* 2. KAYDIRILABİLİR İÇERİK ALANI */}
                <div style={styles.scrollableContent}>
                    <div style={styles.avatarSection}>
                        <img
                            src={finalAvatarUrl}
                            style={{ ...styles.avatar, cursor: 'pointer' }} // Tıklanabilir avatar
                            alt="Avatar"
                            onClick={() => onImageClick(finalAvatarUrl)} // Büyütme fonksiyonu
                            onError={(e) => {
                                console.error('❌ Avatar load error:', finalAvatarUrl);
                                e.target.onerror = null;
                                e.target.src = getDeterministicAvatar(fullUser?.username);
                            }}
                        />

                        {/* 🔥 ARKADAŞ KODU ALANI - HER ZAMAN GÖSTER (Yükleniyorsa bile) */}
                        <div
                            onClick={() => fullUser?.friend_code && copyToClipboard(fullUser.friend_code)}
                            style={{
                                marginTop: '10px',
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                padding: '8px 15px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                border: '1px dashed #5865f2',
                                minWidth: '150px'
                            }}
                            title="Kodu Kopyalamak İçin Tıkla"
                        >
                            <span style={{ fontSize: '0.8em', color: '#949ba4', textTransform: 'uppercase', fontWeight: 'bold' }}>Arkadaş Kodun</span>
                            <span style={{ fontSize: '1.4em', color: '#fff', fontWeight: '800', letterSpacing: '2px' }}>
                                {fullUser?.friend_code || "..."}
                            </span>
                        </div>

                        <button onClick={() => fileInputRef.current.click()} style={styles.changeAvatarButton}>
                            Resmi Değiştir
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="username">Kullanıcı Adı</label>
                        <input
                            id="username"
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder="Yeni kullanıcı adınız"
                            maxLength="25"
                            style={styles.input}
                        />
                        <button
                            onClick={handleChangeUsername}
                            disabled={isLoading || newUsername.trim() === user?.username || newUsername.trim() === ''}
                            style={{ ...styles.changeUsernameButton, marginTop: '10px' }}
                        >
                            {isLoading ? 'Değiştiriliyor...' : 'Kullanıcı Adını Değiştir'}
                        </button>
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="status">Durum Mesajı</label>
                        <input
                            id="status"
                            type="text"
                            value={statusMessage}
                            onChange={(e) => setStatusMessage(e.target.value)}
                            placeholder="Ne düşünüyorsun?"
                            maxLength="100"
                            style={styles.input}
                        />
                    </div>

                    {/* ----- GÜNCELLENMİŞ SOSYAL LİNKLER BÖLÜMÜ ----- */}
                    <div style={styles.inputGroup}>
                        <h3 style={styles.sectionHeader}>Sosyal Linkler</h3>

                        <label htmlFor="steam_trade">Steam Trade URL</label>
                        <input
                            id="steam_trade"
                            name="steam_trade"
                            type="text"
                            value={socials.steam_trade}
                            onChange={handleSocialChange}
                            placeholder="https://steamcommunity.com/tradeoffer/..."
                            style={styles.input}
                        />

                        <label htmlFor="steam_profile" style={{ marginTop: '10px' }}>Steam Profil Linki</label>
                        <input
                            id="steam_profile"
                            name="steam_profile" // <-- 'steam_friend' -> 'steam_profile'
                            type="text"
                            value={socials.steam_profile}
                            onChange={handleSocialChange}
                            placeholder="https://steamcommunity.com/id/..."
                            style={styles.input}
                        />

                        <label htmlFor="steam_friend_code" style={{ marginTop: '10px' }}>Steam Arkadaş Kodu</label>
                        <input
                            id="steam_friend_code"
                            name="steam_friend_code"
                            type="text"
                            value={socials.steam_friend_code}
                            onChange={handleSocialChange}
                            placeholder="123456789"
                            style={styles.input}
                        />

                        <label htmlFor="x" style={{ marginTop: '10px' }}>X (Twitter) Kullanıcı Adı</label>
                        <input
                            id="x"
                            name="x"
                            type="text"
                            value={socials.x}
                            onChange={handleSocialChange}
                            placeholder="@kullaniciadi"
                            style={styles.input}
                        />

                        <label htmlFor="instagram" style={{ marginTop: '10px' }}>Instagram Kullanıcı Adı</label>
                        <input
                            id="instagram"
                            name="instagram"
                            type="text"
                            value={socials.instagram}
                            onChange={handleSocialChange}
                            placeholder="kullaniciadi"
                            style={styles.input}
                        />
                    </div>
                    <div style={{ ...styles.inputGroup, marginTop: '15px', paddingTop: '15px', borderTop: '1px solid var(--border-primary)' }}>
                        <h3 style={styles.sectionHeader}>Entegrasyonlar</h3>

                        {user?.spotify_access_token ? (
                            <div style={styles.connectedBadge}>
                                <span style={{ fontSize: '1.2em' }}>✅</span>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 'bold', color: '#1db954' }}>Spotify Bağlı</span>
                                    <span style={{ fontSize: '0.8em', color: '#b9bbbe' }}>
                                        {richPresence?.spotify ? `Listening: ${richPresence.spotify.track}` : 'Müziğin profilinde görünecek.'}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={handleConnectSpotify}
                                style={{
                                    ...styles.actionButton,
                                    backgroundColor: '#1db954',
                                    width: '100%',
                                    justifyContent: 'center',
                                    padding: '10px',
                                    marginBottom: '10px'
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ marginRight: '8px' }}>
                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.4-1.02 15.96 1.74.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.24z" />
                                </svg>
                                Spotify ile Bağlan
                            </button>
                        )}

                        {user?.steam_id ? (
                            <div style={{ ...styles.connectedBadge, borderColor: '#171a21', backgroundColor: 'rgba(23, 26, 33, 0.3)', marginTop: '10px' }}>
                                <span style={{ fontSize: '1.2em' }}>🎮</span>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 'bold', color: '#66c0f4' }}>Steam Bağlı</span>
                                    <span style={{ fontSize: '0.8em', color: '#b9bbbe' }}>
                                        {richPresence?.steam ? `Playing: ${richPresence.steam.game}` : 'Oyun bilgisi görünecek.'}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={handleConnectSteam}
                                style={{
                                    ...styles.actionButton,
                                    backgroundColor: '#171a21',
                                    width: '100%',
                                    justifyContent: 'center',
                                    padding: '10px'
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ marginRight: '8px' }}>
                                    <path d="M21.75 12.75l-9-9-9 9h9v9h9v-9h-9z" /> {/* Placeholder Steam Icon */}
                                </svg>
                                Steam ile Bağlan
                            </button>
                        )}
                    </div>

                    {/* 🔥 XBOX INTEGRATION SECTION */}
                    <div style={{ ...styles.inputGroup, marginTop: '15px', paddingTop: '15px', borderTop: '1px solid var(--border-primary)' }}>
                        <h3 style={styles.sectionHeader}>Xbox Entegrasyonu</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {user?.xbox_gamertag ? (
                                <div style={{ ...styles.connectedBadge, borderColor: '#107c10', backgroundColor: 'rgba(16, 124, 16, 0.1)' }}>
                                    <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#107c10' }}>Xbox</span>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 'bold', color: '#fff' }}>{user.xbox_gamertag}</span>
                                            <button
                                                onClick={() => setXboxGamertag('')} // Basitçe silme arayüzü
                                                style={{ border: 'none', background: 'transparent', color: '#da373c', cursor: 'pointer', fontSize: '0.8em' }}
                                            >
                                                Kaldır
                                            </button>
                                        </div>
                                        <span style={{ fontSize: '0.8em', color: '#b9bbbe' }}>
                                            {richPresence?.xbox ? `Oynuyor: ${richPresence.xbox.name}` : 'Oyun durumu bekleniyor...'}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label htmlFor="xbox_gamertag" style={{ fontSize: '0.9em', color: '#b9bbbe', marginBottom: '5px', display: 'block' }}>
                                        Xbox Gamertag (Kullanıcı Adı)
                                    </label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input
                                            id="xbox_gamertag"
                                            type="text"
                                            value={xboxGamertag}
                                            onChange={(e) => setXboxGamertag(e.target.value)}
                                            placeholder="Örn: Major Nelson"
                                            style={{ ...styles.input, marginTop: 0 }}
                                        />
                                    </div>
                                    <p style={{ fontSize: '0.75em', color: '#72767d', marginTop: '5px' }}>
                                        Oyun durumunu göstermek için Gamertag girin.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ ...styles.inputGroup, marginTop: '25px', paddingTop: '15px', borderTop: '1px solid var(--border-primary)' }}>
                        <h3 style={styles.sectionHeader}>Bildirim Ayarları</h3>
                        <div style={styles.checkboxGroup}>
                            <input type="checkbox" id="notifications" checked={soundSettings.notifications} onChange={(e) => handleSoundSettingChange('notifications', e.target.checked)} />
                            <label htmlFor="notifications">Yeni Mesaj Sesi</label>
                        </div>
                        <div style={styles.checkboxGroup}>
                            <input type="checkbox" id="mentions" checked={soundSettings.mentions} onChange={(e) => handleSoundSettingChange('mentions', e.target.checked)} />
                            <label htmlFor="mentions">Etiketlenme Sesi</label>
                        </div>
                        <div style={styles.checkboxGroup}>
                            <input type="checkbox" id="userJoinLeave" checked={soundSettings.userJoinLeave} onChange={(e) => handleSoundSettingChange('userJoinLeave', e.target.checked)} />
                            <label htmlFor="userJoinLeave">Giriş/Çıkış Sesleri</label>
                        </div>
                    </div>
                </div>

                {/* 3. SABİT FOOTER (ALT KISIM) */}
                <div style={styles.panelFooter}>
                    <button onClick={handleSave} disabled={isLoading} style={styles.saveButton}>
                        {isLoading ? 'Kaydediliyor...' : 'Tüm Değişiklikleri Kaydet'}
                    </button>
                    <button onClick={onLogout} style={styles.logoutButton}>
                        Çıkış Yap
                    </button>
                </div>

            </div>

            {/* 📸 AVATAR CROPPER MODAL */}
            {showCropper && (
                <AvatarCropper
                    imageFile={tempImageFile}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCropCancel}
                />
            )}
        </div>
    );
};

// Stiller
const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    panel: {
        backgroundColor: 'var(--background-primary)',
        borderRadius: '8px',
        color: 'var(--text-primary)',
        width: '440px',
        maxWidth: '95vw',
        position: 'relative',
        boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh',
        padding: '0'
    },
    panelHeader: {
        padding: '20px 25px',
        margin: '0',
        borderBottom: '1px solid var(--border-primary)',
        flexShrink: 0,
        color: 'var(--text-primary)'
    },
    scrollableContent: {
        overflowY: 'auto',
        overflowX: 'hidden',
        flexGrow: 1,
        padding: '20px 25px'
    },
    panelFooter: {
        padding: '20px 25px',
        borderTop: '1px solid var(--border-primary)',
        backgroundColor: 'var(--background-secondary)',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        flexShrink: 0
    },
    closeButton: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: 'none',
        border: 'none',
        color: 'var(--text-secondary)',
        fontSize: '2em',
        cursor: 'pointer',
        zIndex: 10
    },
    avatarSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px'
    },
    avatar: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        marginBottom: '10px',
        objectFit: 'cover',
        border: '2px solid var(--background-accent)'
    },
    changeAvatarButton: {
        padding: '8px 12px',
        backgroundColor: 'var(--button-primary)',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer',
        marginTop: '10px'
    },
    inputGroup: {
        marginBottom: '20px'
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: 'var(--background-secondary)',
        border: '1px solid var(--background-tertiary)',
        borderRadius: '4px',
        color: 'var(--text-primary)',
        marginTop: '5px',
        boxSizing: 'border-box'
    },
    saveButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: 'var(--text-positive)',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontSize: '1em',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '0'
    },
    changeUsernameButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: 'var(--text-warning)',
        border: 'none',
        borderRadius: '4px',
        color: 'black',
        fontSize: '0.9em',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    logoutButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: 'var(--button-danger)',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontSize: '1em',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '0'
    },
    checkboxGroup: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px',
        color: 'var(--text-primary)'
    },
    sectionHeader: {
        color: 'var(--text-primary)',
        fontSize: '1.1em',
        fontWeight: '600',
        borderBottom: '1px solid var(--border-primary)',
        paddingBottom: '5px',
        marginBottom: '15px'
    }, connectedBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: 'rgba(29, 185, 84, 0.1)',
        border: '1px solid #1db954',
        padding: '10px',
        borderRadius: '6px'
    },
    actionButton: {
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer'
    }
};

export default React.memo(UserProfilePanel);


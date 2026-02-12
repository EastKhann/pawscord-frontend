import { FaCog, FaDownload } from 'react-icons/fa';
import { styles } from '../SidebarStyles';
import { PRODUCTION_URL } from '../utils/constants';

const UserFooter = ({
    currentUserProfile,
    currentUsername,
    getDeterministicAvatar,
    onProfileClick,
    updateAvailable = false, // 🔥 YENİ: Güncelleme durumu
    onUpdateClick, // 🔥 YENİ: Güncelleme butonu click handler
}) => {
    // 🔥 DÜZELTME 1: URL Kontrolü
    let avatarUrl = currentUserProfile?.avatar || getDeterministicAvatar(currentUsername);

    // 🔥 FIX: avatarUrl string olmalı
    if (avatarUrl && typeof avatarUrl === 'string' && !avatarUrl.startsWith('http') && !avatarUrl.startsWith('blob') && !avatarUrl.includes('ui-avatars.com')) {
        // Başında slash yoksa ekle
        const path = avatarUrl.startsWith('/') ? avatarUrl : `/${avatarUrl}`;
        avatarUrl = `${PRODUCTION_URL}${path}`;
    } else if (!avatarUrl || typeof avatarUrl !== 'string') {
        avatarUrl = getDeterministicAvatar(currentUsername);
    }

    // 🔥 DÜZELTME 2: Friend Code
    const friendCode = currentUserProfile?.friend_code || '0000';

    return (
        <div style={styles.bottomSection}>

            {/* 🔥 GÜNCELLEME BİLDİRİMİ */}
            {updateAvailable && (
                <div
                    onClick={onUpdateClick}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#5865f2',
                        color: 'white',
                        textAlign: 'center',
                        borderRadius: '8px',
                        marginBottom: '10px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.9em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 12px rgba(88, 101, 242, 0.4)',
                        animation: 'pulse 2s infinite'
                    }}
                >
                    <FaDownload />
                    <span>Güncelleme Mevcut!</span>
                </div>
            )}

            {/* 🔥 SES KONTROLLERI KALDIRILDI - RoomList'te zaten mevcut */}

            {/* Kullanıcı Paneli */}
            <div style={styles.userPanel} onClick={onProfileClick}>
                <div style={{ position: 'relative' }}>
                    <img
                        src={avatarUrl}
                        style={styles.avatar}
                        alt="me"
                        onError={(e) => {
                            e.target.onerror = null;
                            // Eğer resim yüklenemezse deterministik (harfli) avatarı kullan
                            e.target.src = getDeterministicAvatar(currentUsername);
                        }}
                    />
                    {/* Online Noktası */}
                    <div style={{
                        position: 'absolute',
                        bottom: '2px',
                        right: '8px',
                        width: '10px',
                        height: '10px',
                        backgroundColor: '#23a559',
                        borderRadius: '50%',
                        border: '2px solid #232428'
                    }}></div>
                </div>

                <div style={styles.userInfo}>
                    <span style={styles.usernameText}>
                        {currentUsername || 'Yükleniyor...'}
                    </span>
                    <span style={styles.statusText}>
                        #{friendCode}
                    </span>
                </div>

                <button
                    style={styles.settingsButton}
                    onClick={(e) => { e.stopPropagation(); onProfileClick(); }}
                >
                    <FaCog />
                </button>
            </div>
        </div>
    );
};

export default UserFooter;


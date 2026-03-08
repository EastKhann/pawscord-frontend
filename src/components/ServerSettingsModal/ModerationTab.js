import { useCallback, memo } from 'react';
import { FaShieldAlt, FaUsers, FaExclamationTriangle, FaBan, FaRobot, FaCog, FaGavel, FaFileAlt, FaHistory, FaClock, FaUserSlash, FaTrash, FaBell, FaLock } from 'react-icons/fa';
import confirmDialog from '../../utils/confirmDialog';
import toast from '../../utils/toast';
import styles from './styles';

const ModerationTab = memo(({ server, serverMembers, fetchWithAuth, apiBaseUrl, onClose }) => {
    const handleAutoModeration = useCallback(() => { onClose(); window.showAutoModeration?.(); }, [onClose]);
    const handleRaidProtection = useCallback(() => { onClose(); window.showRaidProtection?.(); }, [onClose]);
    const handleUserWarnings = useCallback(() => { onClose(); window.showUserWarnings?.(); }, [onClose]);
    const handleReportSystem = useCallback(() => { onClose(); window.showReportSystem?.(); }, [onClose]);
    const handleAuditLog = useCallback(() => { onClose(); window.showAuditLog?.(); }, [onClose]);
    const handleSlowMode = useCallback(() => { onClose(); window.showSlowMode?.(); }, [onClose]);
    const handleLockdown = useCallback(async () => {
        if (!await confirmDialog('Sunucuyu kilitlemek istediğinize emin misiniz? Sadece yöneticiler mesaj yazabilir.')) return;
        try {
            await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/update/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ metadata: { ...server.metadata, lockdown: true } })
            });
            toast.success('🔒 Sunucu lockdown moduna alındı!');
        } catch (e) { toast.error('İşlem başarısız'); }
    }, [fetchWithAuth, apiBaseUrl, server]);
    const handleClearMessages = useCallback(() => toast.info('🚧 Bu özellik yakında eklenecek'), []);
    const handleDisableJoin = useCallback(async () => {
        if (!await confirmDialog('Yeni üyelikleri durdurmak istediğinize emin misiniz?')) return;
        try {
            await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/update/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ metadata: { ...server.metadata, join_disabled: true } })
            });
            toast.success('🚫 Yeni üyelikler durduruldu!');
        } catch (e) { toast.error('İşlem başarısız'); }
    }, [fetchWithAuth, apiBaseUrl, server]);
    const handleAnnouncement = useCallback(() => toast.info('🚧 Bu özellik yakında eklenecek'), []);

    return (
        <div style={styles.moderationTab}>
            {/* HEADER */}
            <div style={styles.moderationHeader}>
                <div style={styles.moderationTitleSection}>
                    <FaShieldAlt style={{ fontSize: '28px', color: '#5865f2' }} />
                    <div>
                        <h3 style={{ margin: 0, color: '#fff', fontSize: '18px' }}>Moderasyon Merkezi</h3>
                        <p style={{ margin: '4px 0 0', color: '#b5bac1', fontSize: '13px' }}>
                            Sunucunuzu güvende tutmak için gelişmiş araçlar
                        </p>
                    </div>
                </div>
                <div style={styles.serverStats}>
                    <div style={styles.statItem}>
                        <span style={styles.statNumber}>{serverMembers?.length || 0}</span>
                        <span style={styles.statLabel}>Üye</span>
                    </div>
                    <div style={styles.statItem}>
                        <span style={styles.statNumber}>{server.categories?.reduce((acc, cat) => acc + (cat.rooms?.length || 0), 0) || 0}</span>
                        <span style={styles.statLabel}>Kanal</span>
                    </div>
                </div>
            </div>

            {/* HIZLI İSTATİSTİKLER */}
            <div style={styles.quickStatsGrid}>
                <div style={{ ...styles.quickStatCard, borderLeft: '4px solid #23a559' }}>
                    <FaUsers style={{ fontSize: '20px', color: '#23a559' }} />
                    <div>
                        <div style={styles.quickStatValue}>Aktif</div>
                        <div style={styles.quickStatLabel}>Moderasyon Durumu</div>
                    </div>
                </div>
                <div style={{ ...styles.quickStatCard, borderLeft: '4px solid #f0b232' }}>
                    <FaExclamationTriangle style={{ fontSize: '20px', color: '#f0b232' }} />
                    <div>
                        <div style={styles.quickStatValue}>0</div>
                        <div style={styles.quickStatLabel}>Bekleyen Rapor</div>
                    </div>
                </div>
                <div style={{ ...styles.quickStatCard, borderLeft: '4px solid #f23f42' }}>
                    <FaBan style={{ fontSize: '20px', color: '#f23f42' }} />
                    <div>
                        <div style={styles.quickStatValue}>0</div>
                        <div style={styles.quickStatLabel}>Yasaklı Kullanıcı</div>
                    </div>
                </div>
            </div>

            {/* MODERASYON KARTLARI */}
            <div style={styles.moderationCardsGrid}>
                {/* Otomatik Moderasyon */}
                <div style={styles.modCard}>
                    <div style={styles.modCardHeader}>
                        <div style={{ ...styles.modCardIcon, backgroundColor: 'rgba(88, 101, 242, 0.2)' }}>
                            <FaRobot style={{ color: '#5865f2', fontSize: '20px' }} />
                        </div>
                        <div style={styles.modCardBadge}>AI Destekli</div>
                    </div>
                    <h4 style={styles.modCardTitle}>Otomatik Moderasyon</h4>
                    <p style={styles.modCardDesc}>
                        Spam, küfür, toxic içerik ve zararlı linkleri otomatik tespit edip aksiyonlar alır.
                    </p>
                    <div style={styles.modCardFeatures}>
                        <span style={styles.modCardFeature}>🚫 Spam Filtresi</span>
                        <span style={styles.modCardFeature}>🔗 Link Koruması</span>
                        <span style={styles.modCardFeature}>💬 Toxic Algılama</span>
                    </div>
                    <button style={styles.modCardBtn} onClick={handleAutoModeration}>
                        <FaCog /> Ayarları Yapılandır
                    </button>
                </div>

                {/* Raid Koruması */}
                <div style={styles.modCard}>
                    <div style={styles.modCardHeader}>
                        <div style={{ ...styles.modCardIcon, backgroundColor: 'rgba(237, 66, 69, 0.2)' }}>
                            <FaShieldAlt style={{ color: '#f23f42', fontSize: '20px' }} />
                        </div>
                        <div style={{ ...styles.modCardBadge, backgroundColor: 'rgba(237, 66, 69, 0.2)', color: '#f23f42' }}>Kritik</div>
                    </div>
                    <h4 style={styles.modCardTitle}>Raid Koruması</h4>
                    <p style={styles.modCardDesc}>
                        Toplu katılım saldırılarını tespit eder, otomatik lockdown modunu aktifleştirir.
                    </p>
                    <div style={styles.modCardFeatures}>
                        <span style={styles.modCardFeature}>🔒 Lockdown Modu</span>
                        <span style={styles.modCardFeature}>⏱️ Join Limiti</span>
                        <span style={styles.modCardFeature}>🛡️ Anti-Bot</span>
                    </div>
                    <button style={{ ...styles.modCardBtn, backgroundColor: '#f23f42' }} onClick={handleRaidProtection}>
                        <FaShieldAlt /> Korumayı Yönet
                    </button>
                </div>

                {/* Kullanıcı Uyarıları */}
                <div style={styles.modCard}>
                    <div style={styles.modCardHeader}>
                        <div style={{ ...styles.modCardIcon, backgroundColor: 'rgba(250, 166, 26, 0.2)' }}>
                            <FaGavel style={{ color: '#f0b232', fontSize: '20px' }} />
                        </div>
                    </div>
                    <h4 style={styles.modCardTitle}>Uyarı Sistemi</h4>
                    <p style={styles.modCardDesc}>
                        3 aşamalı uyarı sistemi. Otomatik mute ve ban aksiyonları.
                    </p>
                    <div style={styles.modCardFeatures}>
                        <span style={styles.modCardFeature}>⚠️ 3-Strike Sistem</span>
                        <span style={styles.modCardFeature}>🔇 Otomatik Mute</span>
                        <span style={styles.modCardFeature}>📝 Uyarı Geçmişi</span>
                    </div>
                    <button style={{ ...styles.modCardBtn, backgroundColor: '#f0b232' }} onClick={handleUserWarnings}>
                        <FaGavel /> Uyarıları Yönet
                    </button>
                </div>

                {/* Rapor Sistemi */}
                <div style={styles.modCard}>
                    <div style={styles.modCardHeader}>
                        <div style={{ ...styles.modCardIcon, backgroundColor: 'rgba(67, 181, 129, 0.2)' }}>
                            <FaFileAlt style={{ color: '#23a559', fontSize: '20px' }} />
                        </div>
                    </div>
                    <h4 style={styles.modCardTitle}>Rapor Merkezi</h4>
                    <p style={styles.modCardDesc}>
                        Kullanıcı raporlarını incele, aksiyonları takip et ve istatistikleri görüntüle.
                    </p>
                    <div style={styles.modCardFeatures}>
                        <span style={styles.modCardFeature}>📋 Rapor Listesi</span>
                        <span style={styles.modCardFeature}>✅ Çözüm Takibi</span>
                        <span style={styles.modCardFeature}>📊 İstatistikler</span>
                    </div>
                    <button style={{ ...styles.modCardBtn, backgroundColor: '#23a559' }} onClick={handleReportSystem}>
                        <FaFileAlt /> Raporları Görüntüle
                    </button>
                </div>

                {/* Audit Log */}
                <div style={styles.modCard}>
                    <div style={styles.modCardHeader}>
                        <div style={{ ...styles.modCardIcon, backgroundColor: 'rgba(114, 137, 218, 0.2)' }}>
                            <FaHistory style={{ color: '#5865f2', fontSize: '20px' }} />
                        </div>
                    </div>
                    <h4 style={styles.modCardTitle}>Audit Log</h4>
                    <p style={styles.modCardDesc}>
                        Tüm admin ve moderatör aksiyonlarını kronolojik olarak görüntüle.
                    </p>
                    <div style={styles.modCardFeatures}>
                        <span style={styles.modCardFeature}>📜 Aksiyon Geçmişi</span>
                        <span style={styles.modCardFeature}>🔍 Filtreleme</span>
                        <span style={styles.modCardFeature}>📥 Dışa Aktar</span>
                    </div>
                    <button style={{ ...styles.modCardBtn, backgroundColor: '#5865f2' }} onClick={handleAuditLog}>
                        <FaHistory /> Logları Görüntüle
                    </button>
                </div>

                {/* Slow Mode / Timeout */}
                <div style={styles.modCard}>
                    <div style={styles.modCardHeader}>
                        <div style={{ ...styles.modCardIcon, backgroundColor: 'rgba(153, 170, 181, 0.2)' }}>
                            <FaClock style={{ color: '#949ba4', fontSize: '20px' }} />
                        </div>
                    </div>
                    <h4 style={styles.modCardTitle}>Slow Mode & Timeout</h4>
                    <p style={styles.modCardDesc}>
                        Kanal bazlı slow mode ve kullanıcı timeout yönetimi.
                    </p>
                    <div style={styles.modCardFeatures}>
                        <span style={styles.modCardFeature}>⏳ Slow Mode</span>
                        <span style={styles.modCardFeature}>🔇 Timeout</span>
                        <span style={styles.modCardFeature}>⏰ Süre Yönetimi</span>
                    </div>
                    <button style={{ ...styles.modCardBtn, backgroundColor: '#949ba4' }} onClick={handleSlowMode}>
                        <FaClock /> Ayarları Yapılandır
                    </button>
                </div>
            </div>

            {/* HIZLI AKSİYONLAR */}
            <div style={styles.quickActionsSection}>
                <h4 style={styles.quickActionsTitle}>
                    <FaGavel /> Hızlı Aksiyonlar
                </h4>
                <div style={styles.quickActionsGrid}>
                    <button style={styles.quickActionBtn} onClick={handleLockdown}>
                        <FaLock /> Sunucuyu Kilitle
                    </button>
                    <button style={styles.quickActionBtn} onClick={handleClearMessages}>
                        <FaTrash /> Tüm Mesajları Temizle
                    </button>
                    <button style={styles.quickActionBtn} onClick={handleDisableJoin}>
                        <FaUserSlash /> Yeni Üyeliği Durdur
                    </button>
                    <button style={styles.quickActionBtn} onClick={handleAnnouncement}>
                        <FaBell /> Duyuru Gönder
                    </button>
                </div>
            </div>
        </div>
    );
});

ModerationTab.displayName = 'ModerationTab';
export default ModerationTab;

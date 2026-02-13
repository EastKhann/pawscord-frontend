// frontend/src/components/ChannelSettingsModal/AdvancedTab.js

import { FaHistory, FaClock, FaChartLine, FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';
import styles from './styles';

const AdvancedTab = ({
    room,
    serverRoles,
    deleteHistoryDays, setDeleteHistoryDays,
    fetchWithAuth,
    apiBaseUrl,
    updateChannelRestriction,
    handleDelete
}) => {
    return (
        <>
            <div style={styles.integrationHeader}>
                <h4 style={{ margin: 0, color: '#fff' }}>
                    <FaHistory /> Gelişmiş Ayarlar
                </h4>
                <p style={{ color: '#72767d', fontSize: '13px', marginTop: '8px' }}>
                    Kanal geçmişi, arşiv ve tehlikeli işlemler
                </p>
            </div>

            {/* Mesaj Geçmişi */}
            <div style={styles.advancedSection}>
                <h5 style={styles.advancedSectionTitle}>
                    <FaHistory /> Mesaj Geçmişi
                </h5>
                <div style={styles.advancedOption}>
                    <div>
                        <p style={styles.advancedOptionTitle}>Mesaj Geçmişini Sil</p>
                        <p style={styles.advancedOptionDesc}>Son X günün mesajlarını toplu olarak sil</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <select
                            style={{ ...styles.input, width: '100px' }}
                            value={deleteHistoryDays}
                            onChange={(e) => setDeleteHistoryDays(e.target.value)}
                        >
                            <option value="1">1 Gün</option>
                            <option value="7">7 Gün</option>
                            <option value="30">30 Gün</option>
                            <option value="all">Tümü</option>
                        </select>
                        <button
                            style={styles.dangerBtnSmall}
                            onClick={async () => {
                                if (!await confirmDialog(`Son ${deleteHistoryDays === 'all' ? 'tüm' : deleteHistoryDays + ' günlük'} mesajları silmek istediğinize emin misiniz? Bu işlem geri alınamaz!`)) return;
                                try {
                                    const res = await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/clear-history/`, {
                                        method: 'POST',
                                        body: JSON.stringify({ days: deleteHistoryDays })
                                    });
                                    if (res.ok) {
                                        toast.success('Mesaj geçmişi silindi!');
                                    } else {
                                        toast.error('Mesaj geçmişi silinemedi');
                                    }
                                } catch (err) {
                                    console.error('Mesaj geçmişi silme hatası:', err);
                                    toast.error('Hata oluştu');
                                }
                            }}
                        >Sil</button>
                    </div>
                </div>
            </div>

            {/* Slow Mode Detaylı */}
            <div style={styles.advancedSection}>
                <h5 style={styles.advancedSectionTitle}>
                    <FaClock /> Slow Mode
                </h5>
                <div style={styles.advancedOption}>
                    <div>
                        <p style={styles.advancedOptionTitle}>Mesaj Bekleme Süresi</p>
                        <p style={styles.advancedOptionDesc}>Kullanıcılar arasındaki minimum bekleme süresi</p>
                    </div>
                    <select
                        style={{ ...styles.input, width: '150px' }}
                        onChange={async (e) => {
                            await updateChannelRestriction({ slow_mode_seconds: parseInt(e.target.value) });
                            toast.success('Slow mode güncellendi!');
                        }}
                    >
                        <option value="0">Kapalı</option>
                        <option value="5">5 Saniye</option>
                        <option value="10">10 Saniye</option>
                        <option value="30">30 Saniye</option>
                        <option value="60">1 Dakika</option>
                        <option value="300">5 Dakika</option>
                        <option value="900">15 Dakika</option>
                        <option value="3600">1 Saat</option>
                    </select>
                </div>
            </div>

            {/* İstatistikler */}
            <div style={styles.advancedSection}>
                <h5 style={styles.advancedSectionTitle}>
                    <FaChartLine /> Kanal İstatistikleri
                </h5>
                <div style={styles.statsGrid}>
                    <div style={styles.statBox}>
                        <span style={styles.statValue}>{room.message_count || 0}</span>
                        <span style={styles.statLabel}>Toplam Mesaj</span>
                    </div>
                    <div style={styles.statBox}>
                        <span style={styles.statValue}>{room.member_count || serverRoles?.length || 0}</span>
                        <span style={styles.statLabel}>Erişebilen Üye</span>
                    </div>
                    <div style={styles.statBox}>
                        <span style={styles.statValue}>{room.file_count || 0}</span>
                        <span style={styles.statLabel}>Paylaşılan Dosya</span>
                    </div>
                </div>
            </div>

            {/* Tehlikeli Bölge */}
            <div style={styles.dangerZone}>
                <h5 style={styles.dangerZoneTitle}>
                    <FaExclamationTriangle /> Tehlikeli Bölge
                </h5>
                <div style={styles.advancedOption}>
                    <div>
                        <p style={styles.advancedOptionTitle}>Kanalı Sil</p>
                        <p style={styles.advancedOptionDesc}>Bu işlem geri alınamaz! Tüm mesajlar silinir.</p>
                    </div>
                    <button onClick={handleDelete} style={styles.dangerBtnLarge}>
                        <FaTrash /> Kanalı Sil
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdvancedTab;

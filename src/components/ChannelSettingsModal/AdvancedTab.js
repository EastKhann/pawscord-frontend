// frontend/src/components/ChannelSettingsModal/AdvancedTab.js

import { FaHistory, FaClock, FaChartLine, FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';
import styles from './styles';
import css from './ChannelTabs.module.css';
import logger from '../../utils/logger';

const S = {
    size2: { ...styles.input, width: '150px' },
    size: { ...styles.input, width: '100px' },
};

const AdvancedTab = ({
    room,
    serverRoles,
    deleteHistoryDays,
    setDeleteHistoryDays,
    fetchWithAuth,
    apiBaseUrl,
    updateChannelRestriction,
    handleDelete,
}) => {
    const { t } = useTranslation();
    return (
        <>
            <div style={styles.integrationHeader}>
                <h4 className={css.headingWhite}>
                    <FaHistory /> Advanced Settings
                </h4>
                <p className={css.labelMuted}>Channel history, archive and dangerous operations</p>
            </div>

            {/* Message History */}
            <div style={styles.advancedSection}>
                <h5 style={styles.advancedSectionTitle}>
                    <FaHistory /> Message History
                </h5>
                <div style={styles.advancedOption}>
                    <div>
                        <p style={styles.advancedOptionTitle}>{t('message_historyni_delete')}</p>
                        <p style={styles.advancedOptionDesc}>
                            {t('bulk_delete_messages_from_the_last_x_days')}
                        </p>
                    </div>
                    <div className={css.flexGap8}>
                        <select
                            style={S.size}
                            value={deleteHistoryDays}
                            onChange={(e) => setDeleteHistoryDays(e.target.value)}
                        >
                            <option value="1">{t('1_gün')}</option>
                            <option value="7">{t('7_gün')}</option>
                            <option value="30">{t('30_gün')}</option>
                            <option value="all">{t('all')}</option>
                        </select>
                        <button
                            aria-label="Delete message history"
                            style={styles.dangerBtnSmall}
                            onClick={async () => {
                                if (
                                    !(await confirmDialog(
                                        `Son ${deleteHistoryDays === 'all' ? t('ui.tum') : deleteHistoryDays + ' daily'} mesajları silmek istediğinize emin misiniz? Bu işlem geri alınamaz!`
                                    ))
                                )
                                    return;
                                try {
                                    const res = await fetchWithAuth(
                                        `${apiBaseUrl}/rooms/${room.slug}/clear-history/`,
                                        {
                                            method: 'POST',
                                            body: JSON.stringify({ days: deleteHistoryDays }),
                                        }
                                    );
                                    if (res.ok) {
                                        toast.success(t('ui.mesaj_gecmisi_deleted'));
                                    } else {
                                        toast.error(t('advancedTab.historyDeleteFailed'));
                                    }
                                } catch (err) {
                                    logger.error(t('ui.mesaj_gecmisi_silme_hatasi'), err);
                                    toast.error(t('common.error'));
                                }
                            }}
                        >
                            {t('delete')}
                        </button>
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
                        <p style={styles.advancedOptionTitle}>{t('mesaj_bekleme_durationsi')}</p>
                        <p style={styles.advancedOptionDesc}>
                            {t('users_searchsındaki_minimum_bekleme_süresi')}
                        </p>
                    </div>
                    <select
                        style={S.size2}
                        onChange={async (e) => {
                            await updateChannelRestriction({
                                slow_mode_seconds: parseInt(e.target.value),
                            });
                            toast.success(t('advancedTab.slowModeUpdated'));
                        }}
                    >
                        <option value="0">{t('closed')}</option>
                        <option value="5">{t('5_saniye')}</option>
                        <option value="10">{t('10_saniye')}</option>
                        <option value="30">{t('30_saniye')}</option>
                        <option value="60">{t('1_dakika')}</option>
                        <option value="300">{t('5_dakika')}</option>
                        <option value="900">{t('15_dakika')}</option>
                        <option value="3600">{t('1_saat')}</option>
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
                        <span style={styles.statLabel}>{t('toplam_mesaj')}</span>
                    </div>
                    <div style={styles.statBox}>
                        <span style={styles.statValue}>
                            {room.member_count || serverRoles?.length || 0}
                        </span>
                        <span style={styles.statLabel}>{t('erişebilen_member')}</span>
                    </div>
                    <div style={styles.statBox}>
                        <span style={styles.statValue}>{room.file_count || 0}</span>
                        <span style={styles.statLabel}>{t('paylaşılan_file')}</span>
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
                        <p style={styles.advancedOptionTitle}>{t('channelı_delete')}</p>
                        <p style={styles.advancedOptionDesc}>
                            {t('bu_işlem_geri alınamaz_tüm_messagelar_silinir')}
                        </p>
                    </div>
                    <button onClick={handleDelete} style={styles.dangerBtnLarge}>
                        <FaTrash /> Kanalı Sil
                    </button>
                </div>
            </div>
        </>
    );
};

AdvancedTab.propTypes = {
    room: PropTypes.string,
    serverRoles: PropTypes.array,
    deleteHistoryDays: PropTypes.func,
    setDeleteHistoryDays: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    updateChannelRestriction: PropTypes.func,
    handleDelete: PropTypes.func,
};
export default AdvancedTab;

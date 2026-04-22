import { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import {
    FaShieldAlt,
    FaUsers,
    FaExclamationTriangle,
    FaBan,
    FaRobot,
    FaCog,
    FaGavel,
    FaFileAlt,
    FaHistory,
    FaClock,
    FaUserSlash,
    FaTrash,
    FaBell,
    FaLock,
} from 'react-icons/fa';
import confirmDialog from '../../utils/confirmDialog';
import toast from '../../utils/toast';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import css from './ServerTabs.module.css';

const S = {
    txt5: { color: '#949ba4', fontSize: '20px' },
    txt4: { color: '#f23f42', fontSize: '20px' },
    txt3: { fontSize: '20px', color: '#f23f42' },
    txt2: { fontSize: '20px', color: '#23a559' },
    txt: { fontSize: '28px', color: '#5865f2' },
};

const ModerationTab = memo(({ server, serverMembers, fetchWithAuth, apiBaseUrl, onClose }) => {
    const { t } = useTranslation();
    const handleAutoModeration = useCallback(() => {
        onClose();
        window.showAutoModeration?.();
    }, [onClose]);
    const handleRaidProtection = useCallback(() => {
        onClose();
        window.showRaidProtection?.();
    }, [onClose]);
    const handleUserWarnings = useCallback(() => {
        onClose();
        window.showUserWarnings?.();
    }, [onClose]);
    const handleReportSystem = useCallback(() => {
        onClose();
        window.showReportSystem?.();
    }, [onClose]);
    const handleAuditLog = useCallback(() => {
        onClose();
        window.showAuditLog?.();
    }, [onClose]);
    const handleSlowMode = useCallback(() => {
        onClose();
        window.showSlowMode?.();
    }, [onClose]);
    const handleLockdown = useCallback(async () => {
        if (
            !(await confirmDialog(
                t('modTab.lockConfirm', 'Are you sure you want to lock the server? Only administrators will be able to send messages.')
            ))
        )
            return;
        try {
            await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/update/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ metadata: { ...server.metadata, lockdown: true } }),
            });
            toast.success(t('moderation.lockdownActivated'));
        } catch (e) {
            toast.error(t('moderation.operationFailed'));
        }
    }, [fetchWithAuth, apiBaseUrl, server]);
    const handleClearMessages = useCallback(() => toast.info(t('common.comingSoon')), []);
    const handleDisableJoin = useCallback(async () => {
        if (!(await confirmDialog(t('modTab.pauseJoinsConfirm', 'Are you sure you want to pause new memberships?'))))
            return;
        try {
            await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/update/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ metadata: { ...server.metadata, join_disabled: true } }),
            });
            toast.success(t('moderation.joinDisabled'));
        } catch (e) {
            toast.error(t('moderation.operationFailed'));
        }
    }, [fetchWithAuth, apiBaseUrl, server]);
    const handleAnnouncement = useCallback(() => toast.info(t('common.comingSoon')), []);

    return (
        <div style={styles.moderationTab}>
            {/* HEADER */}
            <div style={styles.moderationHeader}>
                <div style={styles.moderationTitleSection}>
                    <FaShieldAlt style={S.txt} />
                    <div>
                        <h3 className={css.headerWhite18}>{t('moderation_center')}</h3>
                        <p className={css.chatText13}>Advanced tools to keep your server safe</p>
                    </div>
                </div>
                <div style={styles.serverStats}>
                    <div style={styles.statItem}>
                        <span style={styles.statNumber}>{serverMembers?.length || 0}</span>
                        <span style={styles.statLabel}>{t('member')}</span>
                    </div>
                    <div style={styles.statItem}>
                        <span style={styles.statNumber}>
                            {server.categories?.reduce(
                                (acc, cat) => acc + (cat.rooms?.length || 0),
                                0
                            ) || 0}
                        </span>
                        <span style={styles.statLabel}>{t('channel')}</span>
                    </div>
                </div>
            </div>

            {/* QUICK STATS */}
            <div style={styles.quickStatsGrid}>
                <div className={css.quickStatSuccess}>
                    <FaUsers style={S.txt2} />
                    <div>
                        <div style={styles.quickStatValue}>{t('active')}</div>
                        <div style={styles.quickStatLabel}>{t('moderation_status')}</div>
                    </div>
                </div>
                <div className={css.quickStatWarning}>
                    <FaExclamationTriangle className="text-f0b-20" />
                    <div>
                        <div style={styles.quickStatValue}>0</div>
                        <div style={styles.quickStatLabel}>{t('pending_reports')}</div>
                    </div>
                </div>
                <div className={css.quickStatDanger}>
                    <FaBan style={S.txt3} />
                    <div>
                        <div style={styles.quickStatValue}>0</div>
                        <div style={styles.quickStatLabel}>{t('banned_users')}</div>
                    </div>
                </div>
            </div>

            {/* MODERASYON KARTLARI */}
            <div style={styles.moderationCardsGrid}>
                {/* Auto Moderation */}
                <div style={styles.modCard}>
                    <div style={styles.modCardHeader}>
                        <div className={css.modIconPrimary}>
                            <FaRobot className={css.primaryIcon20} />
                        </div>
                        <div style={styles.modCardBadge}>{t('ai_powered')}</div>
                    </div>
                    <h4 style={styles.modCardTitle}>{t('auto_moderation')}</h4>
                    <p style={styles.modCardDesc}>
                        Automatically detects spam, profanity, toxic content and harmful links.
                    </p>
                    <div style={styles.modCardFeatures}>
                        <span style={styles.modCardFeature}>{t('🚫_spam_filtresi')}</span>
                        <span style={styles.modCardFeature}>{t('🔗_link_koruması')}</span>
                        <span style={styles.modCardFeature}>{t('💬_toxic_algılama')}</span>
                    </div>
                    <button
                        aria-label={t('modTab.configAutoMod', 'Configure auto moderation')}
                        style={styles.modCardBtn}
                        onClick={handleAutoModeration}
                    >
                        <FaCog /> Configure Settings
                    </button>
                </div>

                {/* Raid Protection */}
                <div style={styles.modCard}>
                    <div style={styles.modCardHeader}>
                        <div className={css.modIconDanger}>
                            <FaShieldAlt style={S.txt4} />
                        </div>
                        <div className={css.modBadgeDanger}>{t('critical')}</div>
                    </div>
                    <h4 style={styles.modCardTitle}>{t('raid_protection')}</h4>
                    <p style={styles.modCardDesc}>
                        Detects mass join attacks and automatically activates lockdown mode.
                    </p>
                    <div style={styles.modCardFeatures}>
                        <span style={styles.modCardFeature}>{t('🔒_lockdown_modu')}</span>
                        <span style={styles.modCardFeature}>{t('⏱️_join_limiti')}</span>
                        <span style={styles.modCardFeature}>{t('🛡️_anti-bot')}</span>
                    </div>
                    <button
                        aria-label={t('modTab.configRaid', 'Configure raid protection')}
                        className={css.modBtnDanger}
                        onClick={handleRaidProtection}
                    >
                        <FaShieldAlt /> Manage Protection
                    </button>
                </div>

                {/* User Warnings */}
                <div style={styles.modCard}>
                    <div style={styles.modCardHeader}>
                        <div className={css.modIconWarning}>
                            <FaGavel className="text-f0b-20" />
                        </div>
                    </div>
                    <h4 style={styles.modCardTitle}>{t('warning_system')}</h4>
                    <p style={styles.modCardDesc}>
                        3-stage warning system. Automatic mute and ban actions.
                    </p>
                    <div style={styles.modCardFeatures}>
                        <span style={styles.modCardFeature}>{t('⚠️_3-strike_sistem')}</span>
                        <span style={styles.modCardFeature}>{t('🔇_otomatik_mute')}</span>
                        <span style={styles.modCardFeature}>{t('📝_uyarı_geçmişi')}</span>
                    </div>
                    <button
                        aria-label={t('modTab.manageWarnings', 'Manage warnings')}
                        className={css.modBtnWarning}
                        onClick={handleUserWarnings}
                    >
                        <FaGavel /> Manage Warnings
                    </button>
                </div>

                {/* Rapor Sistemi */}
                <div style={styles.modCard}>
                    <div style={styles.modCardHeader}>
                        <div className={css.modIconSuccess}>
                            <FaFileAlt className="icon-success" />
                        </div>
                    </div>
                    <h4 style={styles.modCardTitle}>{t('report_center')}</h4>
                    <p style={styles.modCardDesc}>
                        Review user reports, track actions and view statistics.
                    </p>
                    <div style={styles.modCardFeatures}>
                        <span style={styles.modCardFeature}>{t('📋_rapor_listesi')}</span>
                        <span style={styles.modCardFeature}>{t('✅_züm_takibi')}</span>
                        <span style={styles.modCardFeature}>{t('📊_i̇statistikler')}</span>
                    </div>
                    <button
                        aria-label={t('modTab.viewReports', 'View reports')}
                        className={css.modBtnSuccess}
                        onClick={handleReportSystem}
                    >
                        <FaFileAlt /> View Reports
                    </button>
                </div>

                {/* Audit Log */}
                <div style={styles.modCard}>
                    <div style={styles.modCardHeader}>
                        <div className={css.modIconBlue}>
                            <FaHistory className={css.primaryIcon20} />
                        </div>
                    </div>
                    <h4 style={styles.modCardTitle}>{t('audit_log')}</h4>
                    <p style={styles.modCardDesc}>
                        View all admin and moderator actions chronologically.
                    </p>
                    <div style={styles.modCardFeatures}>
                        <span style={styles.modCardFeature}>{t('📜_aksiyon_geçmişi')}</span>
                        <span style={styles.modCardFeature}>{t('🔍_filtreleme')}</span>
                        <span style={styles.modCardFeature}>{t('📥_export')}</span>
                    </div>
                    <button
                        aria-label={t('modTab.viewAuditLogs', 'View audit logs')}
                        className={css.modBtnPrimary}
                        onClick={handleAuditLog}
                    >
                        <FaHistory /> View Logs
                    </button>
                </div>

                {/* Slow Mode / Timeout */}
                <div style={styles.modCard}>
                    <div style={styles.modCardHeader}>
                        <div className={css.modIconMuted}>
                            <FaClock style={S.txt5} />
                        </div>
                    </div>
                    <h4 style={styles.modCardTitle}>{t('slow_mode_timeout')}</h4>
                    <p style={styles.modCardDesc}>
                        Channel-level slow mode and user timeout management.
                    </p>
                    <div style={styles.modCardFeatures}>
                        <span style={styles.modCardFeature}>{t('⏳_slow_mode')}</span>
                        <span style={styles.modCardFeature}>{t('🔇_timeout')}</span>
                        <span style={styles.modCardFeature}>{t('⏰_duration_yönetimi')}</span>
                    </div>
                    <button
                        aria-label={t('modTab.configSlowMode', 'Configure slow mode')}
                        className={css.modBtnMuted}
                        onClick={handleSlowMode}
                    >
                        <FaClock /> Configure Settings
                    </button>
                </div>
            </div>

            {/* QUICK ACTIONS */}
            <div style={styles.quickActionsSection}>
                <h4 style={styles.quickActionsTitle}>
                    <FaGavel /> Quick Actions
                </h4>
                <div style={styles.quickActionsGrid}>
                    <button
                        aria-label={t('modTab.lockServer', 'Lock server')}
                        style={styles.quickActionBtn}
                        onClick={handleLockdown}
                    >
                        <FaLock /> Lock Server
                    </button>
                    <button
                        aria-label={t('modTab.clearMessages', 'Clear all messages')}
                        style={styles.quickActionBtn}
                        onClick={handleClearMessages}
                    >
                        <FaTrash /> Clear All Messages
                    </button>
                    <button
                        aria-label={t('modTab.pauseJoins', 'Stop new memberships')}
                        style={styles.quickActionBtn}
                        onClick={handleDisableJoin}
                    >
                        <FaUserSlash /> {t('modTab.pauseJoins', 'Stop New Memberships')}
                    </button>
                    <button
                        aria-label={t('modTab.sendAnnouncement', 'Send announcement')}
                        style={styles.quickActionBtn}
                        onClick={handleAnnouncement}
                    >
                        <FaBell /> {t('modTab.sendAnnouncement', 'Send Announcement')}
                    </button>
                </div>
            </div>
        </div>
    );
});

ModerationTab.displayName = 'ModerationTab';
ModerationTab.propTypes = {
    server: PropTypes.string,
    serverMembers: PropTypes.object,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};
export default ModerationTab;

/* eslint-disable jsx-a11y/label-has-associated-control */
import '../AdvancedModerationPanel.css';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useAdvancedModeration, { getLogIcon } from './useAdvancedModeration';

const AdvancedModerationPanel = ({ serverId, onClose }) => {
    const m = useAdvancedModeration(serverId);
    const { t } = useTranslation();

    return (
        <div aria-label={t('aria.advancedModerationPanel', 'Advanced Moderation Panel')} className="advanced-moderation-panel">
            <div className="panel-header">
                <h2>
                    <i className="fas fa-shield-alt"></i>{' '}
                    {t('moderation.title', 'Gelişmiş Moderasyon')}
                </h2>
                <button className="close-btn" onClick={onClose} aria-label={t('common.close')}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <div className="panel-content">
                {/* User Timeout */}
                <div className="mod-section">
                    <h3>
                        <i className="fas fa-user-clock"></i>{' '}
                        {t('moderation.userTimeout', 'Kullanıcı Zaman Aşımı')}
                    </h3>
                    <div className="timeout-controls">
                        <div className="form-group">
                            <label>{t('moderation.selectUser', 'Kullanıcı Seç')}</label>
                            <input
                                type="text"
                                className="user-search"
                                placeholder={t('moderation.searchUser', 'Kullanıcı ara...')}
                                onChange={(e) =>
                                    m.setSelectedUser({ id: 1, username: e.target.value })
                                }
                            />
                            {m.selectedUser && (
                                <div className="selected-user">
                                    <i className="fas fa-user"></i> {m.selectedUser.username}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>{t('moderation.duration', 'Süre (dakika)')}</label>
                            <div className="duration-presets">
                                {[5, 15, 30, 60, 120, 1440].map((mins) => (
                                    <button
                                        key={mins}
                                        className={`preset-btn ${m.timeoutDuration === mins ? 'active' : ''}`}
                                        onClick={() => m.setTimeoutDuration(mins)}
                                    >
                                        {m.formatDuration(mins)}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="number"
                                className="duration-input"
                                value={m.timeoutDuration}
                                onChange={(e) => m.setTimeoutDuration(parseInt(e.target.value))}
                                min="1"
                            />
                        </div>
                        <div className="form-group">
                            <label>{t('moderation.reasonOptional', 'Sebep (Opsiyonel)')}</label>
                            <textarea
                                className="reason-input"
                                placeholder={t('moderation.timeoutReason', 'Zaman aşımı sebebi...')}
                                value={m.timeoutReason}
                                onChange={(e) => m.setTimeoutReason(e.target.value)}
                            />
                        </div>
                        <button className="btn-timeout" onClick={m.timeoutUser}>
                            <i className="fas fa-clock"></i>{' '}
                            {t('moderation.applyTimeout', 'Zaman Aşımı Uygula')}
                        </button>
                    </div>
                </div>

                {/* Mass Moderation */}
                <div className="mod-section">
                    <h3>
                        <i className="fas fa-users-cog"></i>{' '}
                        {t('moderation.massModeration', 'Toplu Moderasyon')}
                    </h3>
                    <div className="mass-action-controls">
                        <div className="form-group">
                            <label>{t('moderation.actionType', 'Eylem Tipi')}</label>
                            <select
                                className="action-select"
                                value={m.massActionType}
                                onChange={(e) => m.setMassActionType(e.target.value)}
                            >
                                <option value="">
                                    {t('moderation.selectAction', 'Eylem seç...')}
                                </option>
                                <option value="kick">
                                    {t('moderation.kickUsers', 'Kullanıcıları At')}
                                </option>
                                <option value="ban">
                                    {t('moderation.banUsers', 'Kullanıcıları Banla')}
                                </option>
                                <option value="remove_role">
                                    {t('moderation.removeRole', 'Rol Kaldır')}
                                </option>
                                <option value="add_role">
                                    {t('moderation.addRole', 'Rol Ekle')}
                                </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>{t('moderation.criteria', 'Kriter')}</label>
                            <select
                                className="criteria-select"
                                value={m.massActionCriteria}
                                onChange={(e) => m.setMassActionCriteria(e.target.value)}
                            >
                                <option value="">
                                    {t('moderation.selectCriteria', 'Kriter seç...')}
                                </option>
                                <option value="no_avatar">
                                    {t('moderation.noAvatar', 'Avatar Yok')}
                                </option>
                                <option value="new_members">
                                    {t('moderation.newMembers', 'Yeni Üyeler (7 gün)')}
                                </option>
                                <option value="inactive">
                                    {t('moderation.inactive', 'Pasif (30+ gün)')}
                                </option>
                                <option value="no_roles">
                                    {t('moderation.noRoles', 'Rol Yok')}
                                </option>
                            </select>
                        </div>
                        <button
                            className="btn-mass-action"
                            onClick={m.executeMassAction}
                            disabled={!m.massActionType || !m.massActionCriteria}
                        >
                            <i className="fas fa-bolt"></i>{' '}
                            {t('moderation.applyMassAction', 'Toplu Eylemi Uygula')}
                        </button>
                        <div className="warning-box">
                            <i className="fas fa-exclamation-triangle"></i>
                            <span>
                                {t(
                                    'moderation.massWarning',
                                    t('advModPanel.bulkWarning','Bulk actions affect multiple users. Use with caution!')
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Raid Protection */}
                <div className="mod-section">
                    <h3>
                        <i className="fas fa-shield-virus"></i>{' '}
                        {t('moderation.raidProtection', 'Baskın Koruması')}
                    </h3>
                    <div className="raid-protection-controls">
                        <div className="toggle-container">
                            <label
                                className="toggle-switch"
                                aria-label={t('moderation.raidProtection', 'Raid Protection')}
                            >
                                <input
                                    type="checkbox"
                                    checked={m.raidProtection}
                                    onChange={m.toggleRaidProtection}
                                />
                                <span className="slider"></span>
                            </label>
                            <span className="toggle-label">
                                {t('moderation.raidProtection', 'Baskın Koruması')}{' '}
                                {m.raidProtection
                                    ? t('common.active', 'Aktif')
                                    : t('common.disabled', 'Devre Dışı')}
                            </span>
                        </div>
                        {m.raidProtection && (
                            <div className="raid-settings">
                                <div className="form-group">
                                    <label>{t('moderation.joinThreshold', 'Katılım Eşiği')}</label>
                                    <input
                                        type="number"
                                        className="settings-input"
                                        value={m.raidSettings.threshold}
                                        onChange={(e) =>
                                            m.setRaidSettings({
                                                ...m.raidSettings,
                                                threshold: parseInt(e.target.value),
                                            })
                                        }
                                        min="5"
                                    />
                                    <span className="input-hint">
                                        {t(
                                            'moderation.thresholdHint',
                                            t('advModPanel.joinRateDesc','Number of users joining in the time window')
                                        )}
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label>
                                        {t('moderation.timeWindow', 'Zaman Penceresi (saniye)')}
                                    </label>
                                    <input
                                        type="number"
                                        className="settings-input"
                                        value={m.raidSettings.timeWindow}
                                        onChange={(e) =>
                                            m.setRaidSettings({
                                                ...m.raidSettings,
                                                timeWindow: parseInt(e.target.value),
                                            })
                                        }
                                        min="10"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{t('moderation.onDetection', 'Tespit Üzerine')}</label>
                                    <select
                                        className="settings-select"
                                        value={m.raidSettings.action}
                                        onChange={(e) =>
                                            m.setRaidSettings({
                                                ...m.raidSettings,
                                                action: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="kick">{t('moderation.kick', 'At')}</option>
                                        <option value="ban">{t('moderation.ban', 'Banla')}</option>
                                        <option value="timeout">
                                            {t('moderation.timeout', 'Zaman Aşımı')}
                                        </option>
                                    </select>
                                </div>
                                <button
                                    className="btn-save-settings"
                                    onClick={m.updateRaidSettings}
                                >
                                    <i className="fas fa-save"></i> {t('common.save')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Warning History */}
                <div className="mod-section">
                    <h3>
                        <i className="fas fa-exclamation-circle"></i>{' '}
                        {t('moderation.warningHistory', 'Uyarı Geçmişi')}
                    </h3>
                    <div className="warnings-list">
                        {m.warnings.length === 0 ? (
                            <div className="empty-state">
                                <i className="fas fa-check-circle"></i>
                                <p>{t('moderation.noWarnings', 'Henüz uyarı verilmedi')}</p>
                            </div>
                        ) : (
                            m.warnings.map((warning) => (
                                <div key={warning.id} className="warning-item">
                                    <div className="warning-header">
                                        <div className="warning-user">
                                            <i className="fas fa-user"></i> {warning.user?.username}
                                        </div>
                                        <div className="warning-count">
                                            {warning.count} {t('moderation.warnings', 'uyarı')}
                                        </div>
                                    </div>
                                    <div className="warning-details">
                                        <div className="warning-reason">
                                            {warning.latest_reason}
                                        </div>
                                        <div className="warning-time">
                                            {new Date(warning.latest_date).toLocaleString()}
                                        </div>
                                    </div>
                                    <button
                                        className="btn-clear-warnings"
                                        onClick={() => m.clearWarnings(warning.user?.id)}
                                    >
                                        {t('common.clear', 'Temizle')}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Moderation Logs */}
                <div className="mod-section">
                    <h3>
                        <i className="fas fa-clipboard-list"></i>{' '}
                        {t('moderation.logs', 'Moderasyon Kayıtları')}
                    </h3>
                    <div className="logs-list">
                        {m.moderationLogs.slice(0, 20).map((log) => (
                            <div key={log.id} className="log-item">
                                <div className="log-icon">
                                    <i className={`fas fa-${getLogIcon(log.action)}`}></i>
                                </div>
                                <div className="log-content">
                                    <div className="log-action">{log.action}</div>
                                    <div className="log-details">
                                        {log.moderator?.username} → {log.target?.username}
                                        {log.reason && ` - ${log.reason}`}
                                    </div>
                                    <div className="log-time">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

AdvancedModerationPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default AdvancedModerationPanel;

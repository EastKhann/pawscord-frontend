/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/ChannelSettingsModal/GeneralTab.js

import {
    FaLock,
    FaGlobe,
    FaExclamationTriangle,
    FaUserFriends,
    FaBroadcastTower,
    FaClock,
    FaTrash,
    FaSave,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import css from './ChannelTabs.module.css';

const S = {
    txt: { fontSize: '0.9em', color: '#ccc' },
};

const GeneralTab = ({
    name,
    setName,
    isPrivate,
    handlePrivateChange,
    isNsfw,
    handleNsfwChange,
    isLocked,
    handleLockedChange,
    isReadOnly,
    handleReadOnlyChange,
    isVoiceChannel,
    userLimit,
    handleUserLimitChange,
    bitrate,
    setBitrate,
    selectedRoles,
    toggleRole,
    serverRoles,
    handleDelete,
    handleSave,
}) => {
    const { t } = useTranslation();
    return (
        <>
            <div style={styles.section}>
                <label style={styles.label}>{t('channel_name')}</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                />
            </div>

            <div style={styles.section}>
                <label style={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={isPrivate}
                        onChange={handlePrivateChange}
                        aria-label="checkbox"
                    />
                    {isPrivate ? <FaLock color="#f23f42" /> : <FaGlobe color="#23a559" />}
                    <span>
                        {isPrivate ? t('ui.ozel_channel_izinli_roller') : '🌍 Public Channel'}
                    </span>
                </label>
            </div>

            {isPrivate && (
                <div style={styles.rolesList}>
                    <p style={S.txt}>{t('who_can_access')}</p>
                    {serverRoles.map((role) => (
                        <div
                            key={role.id}
                            style={styles.roleItem}
                            role="button"
                            tabIndex={0}
                            onClick={() => toggleRole(role.id)}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                            }
                        >
                            <div className="flex-align-8">
                                <div
                                    style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        backgroundColor: role.color,
                                    }}
                                ></div>
                                <span>{role.name}</span>
                            </div>
                            <input
                                type="checkbox"
                                checked={selectedRoles.includes(role.id)}
                                readOnly
                                aria-label="checkbox"
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* 🔥 NSFW CHANNEL */}
            <div style={styles.section}>
                <label style={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={isNsfw}
                        onChange={handleNsfwChange}
                        aria-label="checkbox"
                    />
                    <FaExclamationTriangle color="#f23f42" size={16} />
                    <span>{t('🔞_nsfw_18_content')}</span>
                </label>
                <p className={css.hintMuted}>Yetişkin içerik uyarısı gösterilir.</p>
            </div>

            {/* 🔥 LOCKED CHANNEL */}
            <div style={styles.section}>
                <label style={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={isLocked}
                        onChange={handleLockedChange}
                        aria-label="checkbox"
                    />
                    <FaLock color="#f23f42" size={14} />
                    <span>{t('🔒_channel_kilitli')}</span>
                </label>
                <p className={css.hintMuted}>Kimse mesaj gönderemez (geçici kilitleme).</p>
            </div>

            {/* 🔥 READ-ONLY CHANNEL */}
            <div style={styles.section}>
                <label style={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={isReadOnly}
                        onChange={handleReadOnlyChange}
                        aria-label="checkbox"
                    />
                    <FaBroadcastTower color="#f0b232" size={16} />
                    <span>{t('📢_duyuru_channelı_sadece_admin_yazar')}</span>
                </label>
                <p className={css.hintMuted}>Hercut okuyabilir, sadece adminler yazabilir.</p>
            </div>

            {/* 🔥 VOICE SETTINGS */}
            {isVoiceChannel && (
                <>
                    <div style={styles.section}>
                        <label style={styles.labelFlex}>
                            <FaUserFriends size={14} /> User Limiti
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="99"
                            value={userLimit}
                            onChange={handleUserLimitChange}
                            style={styles.input}
                            placeholder={t('0_sınırsız')}
                            aria-label="0 = unlimited"
                        />
                        <p className={css.hintMuted}>Max kişi sayısı (0 = limitsiz)</p>
                    </div>

                    <div style={styles.section}>
                        <label style={styles.labelFlex}>
                            <FaClock size={14} /> Ses Kalitesi (Bitrate)
                        </label>
                        <select
                            value={bitrate}
                            onChange={(e) => setBitrate(parseInt(e.target.value))}
                            style={styles.input}
                        >
                            <option value={8}>{t('8_kbps_low')}</option>
                            <option value={32}>{t('32_kbps')}</option>
                            <option value={64}>{t('64_kbps_normal')}</option>
                            <option value={96}>{t('96_kbps_i̇yi')}</option>
                            <option value={128}>{t('128_kbps_high')}</option>
                            <option value={256}>{t('256_kbps_çok_high')}</option>
                            <option value={384}>{t('384_kbps_maksimum')}</option>
                        </select>
                        <p className={css.hintSmall}>High bitrate = daha iyi audio</p>
                    </div>
                </>
            )}

            <div style={styles.footer}>
                <button aria-label="Delete channel" onClick={handleDelete} style={styles.deleteBtn}>
                    <FaTrash />
                    {t('delete_channel')}
                </button>
                <button
                    aria-label="Save channel settings"
                    onClick={handleSave}
                    style={styles.saveBtn}
                >
                    <FaSave />
                    {t('save')}
                </button>
            </div>
        </>
    );
};

GeneralTab.propTypes = {
    name: PropTypes.string,
    setName: PropTypes.func,
    isPrivate: PropTypes.bool,
    handlePrivateChange: PropTypes.func,
    isNsfw: PropTypes.bool,
    handleNsfwChange: PropTypes.func,
    isLocked: PropTypes.bool,
    handleLockedChange: PropTypes.func,
    isReadOnly: PropTypes.bool,
    handleReadOnlyChange: PropTypes.func,
    isVoiceChannel: PropTypes.bool,
    userLimit: PropTypes.object,
    handleUserLimitChange: PropTypes.func,
    bitrate: PropTypes.object,
    setBitrate: PropTypes.func,
    selectedRoles: PropTypes.bool,
    toggleRole: PropTypes.func,
    serverRoles: PropTypes.array,
    handleDelete: PropTypes.func,
    handleSave: PropTypes.func,
};
export default GeneralTab;

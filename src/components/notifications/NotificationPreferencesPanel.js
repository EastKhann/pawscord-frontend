/* eslint-disable no-irregular-whitespace */
/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/NotificationPreferencesPanel.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaBell, FaToggleOn, FaToggleOff, FaClock } from 'react-icons/fa';
import toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

/**
 * 🔔 Notification Preferences Panel
 * Granular notification settingsı
 */

const NotificationPreferencesPanel = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const { t } = useTranslation();

    const [preferences, setPreferences] = useState({
        all_messages: true,
        mentions_only: false,
        direct_messages: true,
        server_notifications: true,
        keyword_notifications: [],
        muted_channels: [],
        muted_servers: [],
        sound_enabled: true,
        desktop_enabled: true,
        email_enabled: false,
        dnd_enabled: false,
        dnd_start: '22:00',
        dnd_end: '08:00',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPreferences();
    }, []);

    const loadPreferences = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/notifications/preferences/`);
            if (response.ok) {
                const data = await response.json();
                setPreferences({ ...preferences, ...data });
            }
        } catch (error) {
            logger.error(t('ui.tercih_load_hatasi'), error);
        } finally {
            setLoading(false);
        }
    };

    const savePreferences = async () => {
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/notifications/preferences/update/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(preferences),
                }
            );

            if (response.ok) {
                toast.success(t('notif.preferencesSaved'));
            } else {
                toast.error(t('notif.preferencesFailed'));
            }
        } catch (error) {
            logger.error('Save error:', error);
            toast.error(t('common.error'));
        }
    };

    const togglePref = (key) => {
        setPreferences({ ...preferences, [key]: !preferences[key] });
    };

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.modal}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={styles.header}>
                    <div className="flex-align-10">
                        <FaBell className="icon-success" />
                        <h2 className="m-0">{t('reportim_tercihleri')}</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.content}>
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>{t('mesaj_notificationsi')}</h3>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <strong>{t('tüm_mesajlar')}</strong>
                                <p style={styles.settingDesc}>
                                    {t('her_yeni_messagedan_notification_al')}
                                </p>
                            </div>
                            <button
                                onClick={() => togglePref('all_messages')}
                                style={styles.toggle}
                            >
                                {preferences.all_messages ? (
                                    <FaToggleOn className="icon-success-32" />
                                ) : (
                                    <FaToggleOff className="icon-gray-32" />
                                )}
                            </button>
                        </div>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <strong>{t('sadece_mention_lar')}</strong>
                                <p style={styles.settingDesc}>
                                    {t('yalnızca_etiketlendiğinizde_notification')}
                                </p>
                            </div>
                            <button
                                onClick={() => togglePref('mentions_only')}
                                style={styles.toggle}
                            >
                                {preferences.mentions_only ? (
                                    <FaToggleOn className="icon-success-32" />
                                ) : (
                                    <FaToggleOff className="icon-gray-32" />
                                )}
                            </button>
                        </div>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <strong>{t('direkt_mesajlar')}</strong>
                                <p style={styles.settingDesc}>{t('dm_lerden_notification_al')}</p>
                            </div>
                            <button
                                onClick={() => togglePref('direct_messages')}
                                style={styles.toggle}
                            >
                                {preferences.direct_messages ? (
                                    <FaToggleOn className="icon-success-32" />
                                ) : (
                                    <FaToggleOff className="icon-gray-32" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>{t('reportim_channelları')}</h3>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <strong>{t('ses_notificationsi')}</strong>
                                <p style={styles.settingDesc}>
                                    {t('reportim_geldiğinde_audio_çal')}
                                </p>
                            </div>
                            <button
                                onClick={() => togglePref('sound_enabled')}
                                style={styles.toggle}
                            >
                                {preferences.sound_enabled ? (
                                    <FaToggleOn className="icon-success-32" />
                                ) : (
                                    <FaToggleOff className="icon-gray-32" />
                                )}
                            </button>
                        </div>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <strong>{t('masaüstü_notificationsi')}</strong>
                                <p style={styles.settingDesc}>{t('tarayıcı_notificationleri')}</p>
                            </div>
                            <button
                                onClick={() => togglePref('desktop_enabled')}
                                style={styles.toggle}
                            >
                                {preferences.desktop_enabled ? (
                                    <FaToggleOn className="icon-success-32" />
                                ) : (
                                    <FaToggleOff className="icon-gray-32" />
                                )}
                            </button>
                        </div>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <strong>{t('email_notificationsi')}</strong>
                                <p style={styles.settingDesc}>
                                    {t('important_notificationleri_email_le_al')}
                                </p>
                            </div>
                            <button
                                onClick={() => togglePref('email_enabled')}
                                style={styles.toggle}
                            >
                                {preferences.email_enabled ? (
                                    <FaToggleOn className="icon-success-32" />
                                ) : (
                                    <FaToggleOff className="icon-gray-32" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>
                            <FaClock className="mr-8" />
                            Rahatsız Etme Saatleri
                        </h3>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <strong>{t('rahatsız_etme_modu')}</strong>
                                <p style={styles.settingDesc}>
                                    {t('belirli_hourlerde_notificationleri_close')}
                                </p>
                            </div>
                            <button onClick={() => togglePref('dnd_enabled')} style={styles.toggle}>
                                {preferences.dnd_enabled ? (
                                    <FaToggleOn className="icon-success-32" />
                                ) : (
                                    <FaToggleOff className="icon-gray-32" />
                                )}
                            </button>
                        </div>

                        {preferences.dnd_enabled && (
                            <div style={styles.timeRange}>
                                <div style={styles.timeInput}>
                                    <label>{t('başlangıç')}</label>
                                    <input
                                        type="time"
                                        value={preferences.dnd_start}
                                        onChange={(e) =>
                                            setPreferences({
                                                ...preferences,
                                                dnd_start: e.target.value,
                                            })
                                        }
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.timeInput}>
                                    <label>{t('bitiş')}</label>
                                    <input
                                        type="time"
                                        value={preferences.dnd_end}
                                        onChange={(e) =>
                                            setPreferences({
                                                ...preferences,
                                                dnd_end: e.target.value,
                                            })
                                        }
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div style={styles.footer}>
                    <button onClick={savePreferences} style={styles.saveBtn}>
                        Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #333',
    },
    closeBtn: {
        cursor: 'pointer',
        fontSize: '24px',
        color: '#888',
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
    },
    section: {
        marginBottom: '30px',
    },
    sectionTitle: {
        color: '#5865f2',
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
    },
    setting: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        backgroundColor: '#111214',
        borderRadius: '8px',
        marginBottom: '10px',
    },
    settingInfo: {
        flex: 1,
    },
    settingDesc: {
        fontSize: '12px',
        color: '#888',
        margin: '4px 0 0 0',
    },
    toggle: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
    },
    timeRange: {
        display: 'flex',
        gap: '20px',
        padding: '15px',
        backgroundColor: '#111214',
        borderRadius: '8px',
        marginTop: '10px',
    },
    timeInput: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    input: {
        padding: '8px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
    },
    footer: {
        padding: '20px',
        borderTop: '1px solid #333',
    },
    saveBtn: {
        width: '100%',
        backgroundColor: '#23a559',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
    },
};

NotificationPreferencesPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};
export default NotificationPreferencesPanel;

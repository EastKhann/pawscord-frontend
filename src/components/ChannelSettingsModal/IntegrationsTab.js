// frontend/src/components/ChannelSettingsModal/IntegrationsTab.js

import { FaLink, FaRobot, FaBell, FaEye, FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import toast from '../../utils/toast';
import styles from './styles';
import css from './ChannelTabs.module.css';
import logger from '../../utils/logger';

const S = {
    bg3: { ...styles.integrationBtn, backgroundColor: '#23a559' },
    bg2: { ...styles.integrationIcon, backgroundColor: 'rgba(67, 181, 129, 0.2)' },
    size: { ...styles.input, maxWidth: '200px' },
    bg: { ...styles.integrationIcon, backgroundColor: 'rgba(250, 166, 26, 0.2)' },
    txt: { color: '#5865f2', fontSize: '20px' },
};

const IntegrationsTab = ({
    room,
    fetchWithAuth,
    apiBaseUrl,
    notificationPref,
    setNotificationPref,
}) => {
    const { t } = useTranslation();
    return (
        <>
            <div style={styles.integrationHeader}>
                <h4 className={css.headingWhite}>
                    <FaLink /> Channel Integrations
                </h4>
                <p className={css.labelMuted}>Webhooks, bots and external service integrations</p>
            </div>

            {/* Webhook Bölümü */}
            <div style={styles.integrationCard}>
                <div style={styles.integrationCardHeader}>
                    <div style={styles.integrationIcon}>
                        <FaRobot style={S.txt} />
                    </div>
                    <div>
                        <h5 style={styles.integrationTitle}>{t('webhook')}</h5>
                        <p style={styles.integrationDesc}>
                            {t('create_a_webhook_url_to_send_messages_to_this_channel')}
                        </p>
                    </div>
                </div>
                <button
                    aria-label="Create webhook"
                    style={styles.integrationBtn}
                    onClick={async () => {
                        try {
                            const res = await fetchWithAuth(`${apiBaseUrl}/webhooks/create/`, {
                                method: 'POST',
                                body: JSON.stringify({
                                    room_id: room.id,
                                    name: `${room.name} Webhook`,
                                }),
                            });
                            if (res.ok) {
                                const data = await res.json();
                                navigator.clipboard.writeText(data.url);
                                toast.success(t('integrations.webhookCreated'));
                            } else {
                                toast.error(t('integrations.webhookFailed'));
                            }
                        } catch (e) {
                            logger.error(e);
                            toast.error(t('common.error'));
                        }
                    }}
                >
                    <FaPlus /> Webhook Create
                </button>
            </div>

            {/* Notifications */}
            <div style={styles.integrationCard}>
                <div style={styles.integrationCardHeader}>
                    <div style={S.bg}>
                        <FaBell className="text-f0b-20" />
                    </div>
                    <div>
                        <h5 style={styles.integrationTitle}>{t('notification_settings')}</h5>
                        <p style={styles.integrationDesc}>
                            {t('this_channel_for_notification_tercihlerini_yapılandırın')}
                        </p>
                    </div>
                </div>
                <select
                    style={S.size}
                    value={notificationPref}
                    onChange={async (e) => {
                        const val = e.target.value;
                        setNotificationPref(val);
                        try {
                            await fetchWithAuth(
                                `${apiBaseUrl}/channels/${room.slug}/notification-preference/`,
                                {
                                    method: 'POST',
                                    body: JSON.stringify({ preference: val }),
                                }
                            );
                            toast.success(t('integrations.notifUpdated'));
                        } catch (err) {
                            logger.error('Reportim tercihi daycellenemedi:', err);
                            toast.error(t('integrations.notifFailed'));
                        }
                    }}
                >
                    <option value="all">{t('tüm_mesajlar')}</option>
                    <option value="mentions">{t('sadece_mention')}</option>
                    <option value="none">{t('reportimsiz')}</option>
                </select>
            </div>

            {/* Channel Takip */}
            <div style={styles.integrationCard}>
                <div style={styles.integrationCardHeader}>
                    <div style={S.bg2}>
                        <FaEye className="icon-success" />
                    </div>
                    <div>
                        <h5 style={styles.integrationTitle}>{t('channel_takibi')}</h5>
                        <p style={styles.integrationDesc}>
                            {t('this_channelı_başka_bir_sunucuya_yansıtın_mirror')}
                        </p>
                    </div>
                </div>
                <button
                    style={S.bg3}
                    onClick={async () => {
                        try {
                            const res = await fetchWithAuth(
                                `${apiBaseUrl}/channels/${room.slug}/follow-link/`,
                                {
                                    method: 'POST',
                                }
                            );
                            if (res.ok) {
                                const data = await res.json();
                                if (data.url) {
                                    navigator.clipboard.writeText(data.url);
                                    toast.success(t('integrations.followLinkCreated'));
                                } else {
                                    toast.success(t('integrations.channelFollowed'));
                                }
                            } else {
                                toast.error(t('ui.takip_linki_olusturulamadi'));
                            }
                        } catch (err) {
                            logger.error(t('ui.takip_linki_hatasi'), err);
                            toast.error(t('common.error'));
                        }
                    }}
                >
                    <FaLink /> Takip Linki Create
                </button>
            </div>
        </>
    );
};

IntegrationsTab.propTypes = {
    room: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    notificationPref: PropTypes.func,
    setNotificationPref: PropTypes.func,
};
export default IntegrationsTab;

// frontend/src/components/ChannelSettingsModal/IntegrationsTab.js

import { FaLink, FaRobot, FaBell, FaEye, FaPlus } from 'react-icons/fa';
import toast from '../../utils/toast';
import styles from './styles';

const IntegrationsTab = ({
    room,
    fetchWithAuth,
    apiBaseUrl,
    notificationPref, setNotificationPref
}) => {
    return (
        <>
            <div style={styles.integrationHeader}>
                <h4 style={{ margin: 0, color: '#fff' }}>
                    <FaLink /> Kanal Entegrasyonları
                </h4>
                <p style={{ color: '#72767d', fontSize: '13px', marginTop: '8px' }}>
                    Webhooklar, botlar ve dış servisler ile entegrasyon ayarları
                </p>
            </div>

            {/* Webhook Bölümü */}
            <div style={styles.integrationCard}>
                <div style={styles.integrationCardHeader}>
                    <div style={styles.integrationIcon}>
                        <FaRobot style={{ color: '#5865f2', fontSize: '20px' }} />
                    </div>
                    <div>
                        <h5 style={styles.integrationTitle}>Webhook</h5>
                        <p style={styles.integrationDesc}>Bu kanala mesaj göndermek için webhook URL'i oluşturun</p>
                    </div>
                </div>
                <button
                    style={styles.integrationBtn}
                    onClick={async () => {
                        try {
                            const res = await fetchWithAuth(`${apiBaseUrl}/webhooks/create/`, {
                                method: 'POST',
                                body: JSON.stringify({ room_id: room.id, name: `${room.name} Webhook` })
                            });
                            if (res.ok) {
                                const data = await res.json();
                                navigator.clipboard.writeText(data.url);
                                toast.success('Webhook oluşturuldu ve kopyalandı!');
                            } else {
                                toast.error('Webhook oluşturulamadı');
                            }
                        } catch (e) {
                            console.error(e);
                            toast.error('Hata oluştu');
                        }
                    }}
                >
                    <FaPlus /> Webhook Oluştur
                </button>
            </div>

            {/* Bildirimler */}
            <div style={styles.integrationCard}>
                <div style={styles.integrationCardHeader}>
                    <div style={{ ...styles.integrationIcon, backgroundColor: 'rgba(250, 166, 26, 0.2)' }}>
                        <FaBell style={{ color: '#faa61a', fontSize: '20px' }} />
                    </div>
                    <div>
                        <h5 style={styles.integrationTitle}>Bildirim Ayarları</h5>
                        <p style={styles.integrationDesc}>Bu kanal için bildirim tercihlerini yapılandırın</p>
                    </div>
                </div>
                <select
                    style={{ ...styles.input, maxWidth: '200px' }}
                    value={notificationPref}
                    onChange={async (e) => {
                        const val = e.target.value;
                        setNotificationPref(val);
                        try {
                            await fetchWithAuth(`${apiBaseUrl}/channels/${room.slug}/notification-preference/`, {
                                method: 'POST',
                                body: JSON.stringify({ preference: val })
                            });
                            toast.success('Bildirim tercihi güncellendi!');
                        } catch (err) {
                            console.error('Bildirim tercihi güncellenemedi:', err);
                            toast.error('Bildirim tercihi güncellenemedi');
                        }
                    }}
                >
                    <option value="all">Tüm Mesajlar</option>
                    <option value="mentions">Sadece Mention</option>
                    <option value="none">Bildirimsiz</option>
                </select>
            </div>

            {/* Kanal Takip */}
            <div style={styles.integrationCard}>
                <div style={styles.integrationCardHeader}>
                    <div style={{ ...styles.integrationIcon, backgroundColor: 'rgba(67, 181, 129, 0.2)' }}>
                        <FaEye style={{ color: '#43b581', fontSize: '20px' }} />
                    </div>
                    <div>
                        <h5 style={styles.integrationTitle}>Kanal Takibi</h5>
                        <p style={styles.integrationDesc}>Bu kanalı başka bir sunucuya yansıtın (mirror)</p>
                    </div>
                </div>
                <button
                    style={{ ...styles.integrationBtn, backgroundColor: '#43b581' }}
                    onClick={async () => {
                        try {
                            const res = await fetchWithAuth(`${apiBaseUrl}/channels/${room.slug}/follow-link/`, {
                                method: 'POST'
                            });
                            if (res.ok) {
                                const data = await res.json();
                                if (data.url) {
                                    navigator.clipboard.writeText(data.url);
                                    toast.success('Takip linki oluşturuldu ve kopyalandı!');
                                } else {
                                    toast.success('Kanal takibi aktif edildi!');
                                }
                            } else {
                                toast.error('Takip linki oluşturulamadı');
                            }
                        } catch (err) {
                            console.error('Takip linki hatası:', err);
                            toast.error('Hata oluştu');
                        }
                    }}
                >
                    <FaLink /> Takip Linki Oluştur
                </button>
            </div>
        </>
    );
};

export default IntegrationsTab;

// frontend/src/components/NotificationPreferencesPanel.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaBell, FaToggleOn, FaToggleOff, FaClock } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * 🔔 Notification Preferences Panel
 * Granular bildirim ayarları
 */

const NotificationPreferencesPanel = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
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
        dnd_end: '08:00'
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
            console.error('Tercih yükleme hatası:', error);
        } finally {
            setLoading(false);
        }
    };

    const savePreferences = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/notifications/preferences/update/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(preferences)
            });

            if (response.ok) {
                toast.success('Tercihler kaydedildi');
            } else {
                toast.error('Tercihler kaydedilemedi');
            }
        } catch (error) {
            console.error('Kaydetme hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const togglePref = (key) => {
        setPreferences({ ...preferences, [key]: !preferences[key] });
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaBell style={{ color: '#43b581' }} />
                        <h2 style={{ margin: 0 }}>Bildirim Tercihleri</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.content}>
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Mesaj Bildirimleri</h3>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <strong>Tüm Mesajlar</strong>
                                <p style={styles.settingDesc}>Her yeni mesajdan bildirim al</p>
                            </div>
                            <button
                                onClick={() => togglePref('all_messages')}
                                style={styles.toggle}
                            >
                                {preferences.all_messages ?
                                    <FaToggleOn style={{ color: '#43b581', fontSize: '32px' }} /> :
                                    <FaToggleOff style={{ color: '#888', fontSize: '32px' }} />
                                }
                            </button>
                        </div>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <strong>Sadece Mention'lar</strong>
                                <p style={styles.settingDesc}>Yalnızca etiketlendiğinizde bildirim</p>
                            </div>
                            <button
                                onClick={() => togglePref('mentions_only')}
                                style={styles.toggle}
                            >
                                {preferences.mentions_only ?
                                    <FaToggleOn style={{ color: '#43b581', fontSize: '32px' }} /> :
                                    <FaToggleOff style={{ color: '#888', fontSize: '32px' }} />
                                }
                            </button>
                        </div>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <strong>Direkt Mesajlar</strong>
                                <p style={styles.settingDesc}>DM'lerden bildirim al</p>
                            </div>
                            <button
                                onClick={() => togglePref('direct_messages')}
                                style={styles.toggle}
                            >
                                {preferences.direct_messages ?
                                    <FaToggleOn style={{ color: '#43b581', fontSize: '32px' }} /> :
                                    <FaToggleOff style={{ color: '#888', fontSize: '32px' }} />
                                }
                            </button>
                        </div>
                    </div>

                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Bildirim Kanalları</h3>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <strong>Ses Bildirimleri</strong>
                                <p style={styles.settingDesc}>Bildirim geldiğinde ses çal</p>
                            </div>
                            <button
                                onClick={() => togglePref('sound_enabled')}
                                style={styles.toggle}
                            >
                                {preferences.sound_enabled ?
                                    <FaToggleOn style={{ color: '#43b581', fontSize: '32px' }} /> :
                                    <FaToggleOff style={{ color: '#888', fontSize: '32px' }} />
                                }
                            </button>
                        </div>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <strong>Masaüstü Bildirimleri</strong>
                                <p style={styles.settingDesc}>Tarayıcı bildirimleri</p>
                            </div>
                            <button
                                onClick={() => togglePref('desktop_enabled')}
                                style={styles.toggle}
                            >
                                {preferences.desktop_enabled ?
                                    <FaToggleOn style={{ color: '#43b581', fontSize: '32px' }} /> :
                                    <FaToggleOff style={{ color: '#888', fontSize: '32px' }} />
                                }
                            </button>
                        </div>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <strong>Email Bildirimleri</strong>
                                <p style={styles.settingDesc}>Önemli bildirimleri email'le al</p>
                            </div>
                            <button
                                onClick={() => togglePref('email_enabled')}
                                style={styles.toggle}
                            >
                                {preferences.email_enabled ?
                                    <FaToggleOn style={{ color: '#43b581', fontSize: '32px' }} /> :
                                    <FaToggleOff style={{ color: '#888', fontSize: '32px' }} />
                                }
                            </button>
                        </div>
                    </div>

                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>
                            <FaClock style={{ marginRight: '8px' }} />
                            Rahatsız Etme Saatleri
                        </h3>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <strong>Rahatsız Etme Modu</strong>
                                <p style={styles.settingDesc}>Belirli saatlerde bildirimleri kapat</p>
                            </div>
                            <button
                                onClick={() => togglePref('dnd_enabled')}
                                style={styles.toggle}
                            >
                                {preferences.dnd_enabled ?
                                    <FaToggleOn style={{ color: '#43b581', fontSize: '32px' }} /> :
                                    <FaToggleOff style={{ color: '#888', fontSize: '32px' }} />
                                }
                            </button>
                        </div>

                        {preferences.dnd_enabled && (
                            <div style={styles.timeRange}>
                                <div style={styles.timeInput}>
                                    <label>Başlangıç:</label>
                                    <input
                                        type="time"
                                        value={preferences.dnd_start}
                                        onChange={(e) => setPreferences({ ...preferences, dnd_start: e.target.value })}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.timeInput}>
                                    <label>Bitiş:</label>
                                    <input
                                        type="time"
                                        value={preferences.dnd_end}
                                        onChange={(e) => setPreferences({ ...preferences, dnd_end: e.target.value })}
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
        zIndex: 999999
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #333'
    },
    closeBtn: {
        cursor: 'pointer',
        fontSize: '24px',
        color: '#888'
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    section: {
        marginBottom: '30px'
    },
    sectionTitle: {
        color: '#5865f2',
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center'
    },
    setting: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        marginBottom: '10px'
    },
    settingInfo: {
        flex: 1
    },
    settingDesc: {
        fontSize: '12px',
        color: '#888',
        margin: '4px 0 0 0'
    },
    toggle: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '0'
    },
    timeRange: {
        display: 'flex',
        gap: '20px',
        padding: '15px',
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        marginTop: '10px'
    },
    timeInput: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    input: {
        padding: '8px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px'
    },
    footer: {
        padding: '20px',
        borderTop: '1px solid #333'
    },
    saveBtn: {
        width: '100%',
        backgroundColor: '#43b581',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600'
    }
};

export default NotificationPreferencesPanel;

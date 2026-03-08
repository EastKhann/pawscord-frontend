// frontend/src/components/WelcomeTemplatesPanel.js
import { useState, useEffect } from 'react';
import { FaTimes, FaEnvelope, FaSave, FaEye } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * 👋 Welcome Templates Panel
 * Hoşgeldin mesajı şablonları
 */

const WelcomeTemplatesPanel = ({ fetchWithAuth, apiBaseUrl, serverId, onClose }) => {
    const [template, setTemplate] = useState({
        enabled: false,
        message: '',
        channel_id: '',
        dm_enabled: false,
        dm_message: ''
    });
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);

    const placeholders = [
        { key: '{user}', desc: 'Kullanıcı adı' },
        { key: '{mention}', desc: 'Kullanıcıyı etiketle' },
        { key: '{server}', desc: 'Sunucu adı' },
        { key: '{membercount}', desc: 'Üye sayısı' },
        { key: '{date}', desc: 'Tarih' }
    ];

    useEffect(() => {
        loadTemplate();
        loadChannels();
    }, []);

    const loadTemplate = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/welcome/`);
            if (response.ok) {
                const data = await response.json();
                if (data) setTemplate(data);
            }
        } catch (error) {
            console.error('Şablon yükleme hatası:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadChannels = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/channels/`);
            if (response.ok) {
                const data = await response.json();
                setChannels(data);
            }
        } catch (error) {
            console.error('Kanal yükleme hatası:', error);
        }
    };

    const saveTemplate = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/welcome/set/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_id: serverId,
                    ...template
                })
            });

            if (response.ok) {
                toast.success('Hoşgeldin şablonu kaydedildi');
            } else {
                toast.error('Şablon kaydedilemedi');
            }
        } catch (error) {
            console.error('Şablon kaydetme hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const insertPlaceholder = (placeholder) => {
        setTemplate({
            ...template,
            message: template.message + placeholder
        });
    };

    const previewMessage = () => {
        let preview = template.message
            .replace('{user}', 'KullanıcıAdı')
            .replace('{mention}', '@KullanıcıAdı')
            .replace('{server}', 'Sunucu Adı')
            .replace('{membercount}', '1,234')
            .replace('{date}', new Date().toLocaleDateString('tr-TR'));

        toast.info(preview);
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaEnvelope style={{ color: '#23a559' }} />
                        <h2 style={{ margin: 0 }}>Hoşgeldin Mesajları</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.content}>
                    <div style={styles.toggle}>
                        <label style={styles.toggleLabel}>
                            <input
                                type="checkbox"
                                checked={template.enabled}
                                onChange={(e) => setTemplate({ ...template, enabled: e.target.checked })}
                            />
                            <span>Hoşgeldin mesajlarını etkinleştir</span>
                        </label>
                    </div>

                    {template.enabled && (
                        <>
                            <div style={styles.field}>
                                <label style={styles.label}>Hoşgeldin Kanalı</label>
                                <select
                                    value={template.channel_id}
                                    onChange={(e) => setTemplate({ ...template, channel_id: e.target.value })}
                                    style={styles.select}
                                >
                                    <option value="">Kanal Seçin</option>
                                    {channels.map(ch => (
                                        <option key={ch.id} value={ch.id}>{ch.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Mesaj Şablonu</label>
                                <div style={styles.placeholders}>
                                    {placeholders.map(ph => (
                                        <button
                                            key={ph.key}
                                            onClick={() => insertPlaceholder(ph.key)}
                                            style={styles.placeholderBtn}
                                            title={ph.desc}
                                        >
                                            {ph.key}
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    value={template.message}
                                    onChange={(e) => setTemplate({ ...template, message: e.target.value })}
                                    placeholder="Hoş geldin {user}! {server} sunucusuna katıldın. Şu anda {membercount} üyeyiz! 🎉"
                                    style={styles.textarea}
                                    rows={5}
                                />
                                <button onClick={previewMessage} style={styles.previewBtn}>
                                    <FaEye /> Önizleme
                                </button>
                            </div>

                            <div style={styles.toggle}>
                                <label style={styles.toggleLabel}>
                                    <input
                                        type="checkbox"
                                        checked={template.dm_enabled}
                                        onChange={(e) => setTemplate({ ...template, dm_enabled: e.target.checked })}
                                    />
                                    <span>DM ile hoşgeldin mesajı gönder</span>
                                </label>
                            </div>

                            {template.dm_enabled && (
                                <div style={styles.field}>
                                    <label style={styles.label}>DM Mesajı</label>
                                    <textarea
                                        value={template.dm_message}
                                        onChange={(e) => setTemplate({ ...template, dm_message: e.target.value })}
                                        placeholder="Merhaba {user}! {server} sunucusuna hoş geldin!"
                                        style={styles.textarea}
                                        rows={3}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div style={styles.footer}>
                    <button onClick={saveTemplate} style={styles.saveBtn}>
                        <FaSave /> Kaydet
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
        maxWidth: '700px',
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
    toggle: {
        marginBottom: '20px'
    },
    toggleLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        fontSize: '16px'
    },
    field: {
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        color: '#dbdee1',
        fontSize: '14px',
        fontWeight: '600'
    },
    select: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#111214',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px'
    },
    placeholders: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '10px'
    },
    placeholderBtn: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px',
        fontFamily: 'monospace'
    },
    textarea: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#111214',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        resize: 'vertical',
        marginBottom: '10px'
    },
    previewBtn: {
        backgroundColor: '#111214',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    footer: {
        padding: '20px',
        borderTop: '1px solid #333'
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
    }
};

export default WelcomeTemplatesPanel;

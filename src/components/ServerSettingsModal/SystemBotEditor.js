import React, { useState, useEffect } from 'react';
import { FaRobot } from 'react-icons/fa';
import toast from '../../utils/toast';

const SystemBotEditor = ({ serverId, serverIcon, fetchWithAuth, apiBaseUrl }) => {
    const [botAvatar, setBotAvatar] = useState(null);
    const [botAvatarFile, setBotAvatarFile] = useState(null);
    const [botAvatarPreview, setBotAvatarPreview] = useState(null);
    const [botName, setBotName] = useState('🎉 Sistem');
    const [isCustomAvatar, setIsCustomAvatar] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadBotSettings = async () => {
            try {
                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/system-bot/`);
                if (res.ok) {
                    const data = await res.json();
                    setBotAvatar(data.bot_avatar || null);
                    setIsCustomAvatar(data.is_custom_avatar || false);
                    setBotName(data.bot_name || '🎉 Sistem');
                }
            } catch (e) {
                console.error('System bot settings load error:', e);
            } finally {
                setLoading(false);
            }
        };
        loadBotSettings();
    }, [serverId, fetchWithAuth, apiBaseUrl]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const formData = new FormData();
            if (botAvatarFile) {
                formData.append('system_bot_avatar', botAvatarFile);
            }
            formData.append('bot_name', botName);

            // Eğer avatar kaldırıldıysa
            if (!botAvatarFile && !botAvatar && !botAvatarPreview) {
                formData.append('remove_bot_avatar', 'true');
            }

            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/system-bot/`, {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                const data = await res.json();
                setBotAvatar(data.bot_avatar || null);
                setIsCustomAvatar(data.is_custom_avatar || false);
                setBotAvatarFile(null);
                setBotAvatarPreview(null);
                toast.success('Sistem botu ayarları kaydedildi!');
            } else {
                const data = await res.json().catch(() => ({}));
                toast.error(data.error || 'Kaydetme başarısız');
            }
        } catch (e) {
            console.error('Save error:', e);
            toast.error('Kaydederken hata oluştu');
        } finally {
            setSaving(false);
        }
    };

    const handleRemoveAvatar = () => {
        setBotAvatar(null);
        setBotAvatarFile(null);
        setBotAvatarPreview(null);
        setIsCustomAvatar(false);
    };

    if (loading) return <div style={{ padding: '20px', color: '#b5bac1', textAlign: 'center' }}>Yükleniyor...</div>;

    const displayAvatar = botAvatarPreview || botAvatar || serverIcon;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Bilgi Kartı */}
            <div style={{ padding: '16px', backgroundColor: '#111214', borderRadius: '10px', border: '1px solid #182135' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <FaRobot style={{ color: '#5865f2', fontSize: '18px' }} />
                    <span style={{ color: '#dbdee1', fontWeight: '600', fontSize: '15px' }}>Sistem Botu Hakkında</span>
                </div>
                <p style={{ color: '#949ba4', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
                    Sistem botu, hoş geldin mesajları ve otomatik bildirimler gibi tüm sistem mesajlarını gönderir.
                    Burada botun profil fotoğrafını ve adını özelleştirebilirsiniz.
                    Varsayılan olarak sunucu ikonu kullanılır.
                </p>
            </div>

            {/* Bot Avatar */}
            <div>
                <label style={{ color: '#b5bac1', fontSize: '12px', fontWeight: '700', display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Bot Profil Fotoğrafı
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '16px', backgroundColor: '#111214', borderRadius: '10px' }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%',
                        overflow: 'hidden', border: '3px solid #5865f2',
                        cursor: 'pointer', position: 'relative',
                        backgroundColor: '#0d0e10',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}
                        onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                if (file.size > 5 * 1024 * 1024) {
                                    toast.warning('Dosya boyutu çok büyük! Maksimum 5MB.');
                                    return;
                                }
                                setBotAvatarFile(file);
                                setBotAvatarPreview(URL.createObjectURL(file));
                            };
                            input.click();
                        }}
                    >
                        {displayAvatar ? (
                            <img
                                src={displayAvatar}
                                alt="Bot Avatar"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <span style={{ fontSize: '32px' }}>🤖</span>
                        )}
                        <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            backgroundColor: 'rgba(0,0,0,0.7)', padding: '3px 0',
                            fontSize: '10px', color: '#fff', textAlign: 'center'
                        }}>
                            Değiştir
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ color: '#dbdee1', fontSize: '15px', fontWeight: '600' }}>
                            {botName}
                        </div>
                        <div style={{ color: '#949ba4', fontSize: '12px', marginTop: '6px' }}>
                            {botAvatarPreview ? '📷 Yeni fotoğraf seçildi (kaydettiğinizde uygulanır)' :
                                isCustomAvatar ? '✓ Özel avatar ayarlanmış' : '🖼️ Sunucu ikonu kullanılıyor (varsayılan)'}
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                            {(isCustomAvatar || botAvatarPreview) && (
                                <button
                                    onClick={handleRemoveAvatar}
                                    style={{
                                        padding: '5px 12px',
                                        backgroundColor: 'transparent', border: '1px solid #da373c',
                                        borderRadius: '4px', color: '#da373c', cursor: 'pointer',
                                        fontSize: '12px', transition: 'all 0.2s'
                                    }}
                                >
                                    ✗ Avatarı Kaldır
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bot Adı */}
            <div>
                <label style={{ color: '#b5bac1', fontSize: '12px', fontWeight: '700', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Bot Adı
                </label>
                <input
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                    maxLength={50}
                    placeholder="🎉 Sistem"
                    style={{
                        width: '100%', padding: '10px 14px',
                        backgroundColor: '#0d0e10', border: '1px solid #182135',
                        borderRadius: '8px', color: '#dbdee1', fontSize: '14px',
                        outline: 'none', transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#5865f2'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#1e2024'; }}
                />
                <div style={{ fontSize: '11px', color: '#949ba4', marginTop: '4px' }}>
                    Sistem mesajlarında görünecek bot adı
                </div>
            </div>

            {/* Önizleme */}
            <div>
                <label style={{ color: '#b5bac1', fontSize: '12px', fontWeight: '700', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Önizleme
                </label>
                <div style={{ padding: '14px', backgroundColor: '#0d0e10', borderRadius: '8px', border: '1px solid #182135' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            overflow: 'hidden', backgroundColor: '#111214',
                            flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            {displayAvatar ? (
                                <img src={displayAvatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span style={{ fontSize: '18px' }}>🤖</span>
                            )}
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ color: '#5865f2', fontWeight: '600', fontSize: '14px' }}>{botName || '🎉 Sistem'}</span>
                                <span style={{
                                    backgroundColor: '#5865f2', color: '#fff', fontSize: '10px',
                                    padding: '1px 5px', borderRadius: '3px', fontWeight: '600'
                                }}>BOT</span>
                                <span style={{ color: '#949ba4', fontSize: '11px' }}>Bugün {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div style={{ color: '#dbdee1', fontSize: '14px', marginTop: '4px', lineHeight: '1.4' }}>
                                Hoş geldin Kullanıcı! 🎉 Sunucuya katıldın!
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Kullanım Alanları */}
            <div>
                <label style={{ color: '#b5bac1', fontSize: '12px', fontWeight: '700', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Bu Bot Nerede Kullanılır?
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {[
                        { icon: '👋', text: 'Hoş geldin mesajları' },
                        { icon: '👋', text: 'Ayrılma mesajları' },
                        { icon: '📢', text: 'Sistem bildirimleri' },
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', backgroundColor: '#111214', borderRadius: '6px' }}>
                            <span>{item.icon}</span>
                            <span style={{ color: '#dbdee1', fontSize: '13px' }}>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Kaydet */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                        padding: '12px 24px', backgroundColor: '#5865f2', color: 'white',
                        border: 'none', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer',
                        fontWeight: '600', fontSize: '14px', opacity: saving ? 0.5 : 1,
                        display: 'flex', alignItems: 'center', gap: '8px',
                        transition: 'opacity 0.2s'
                    }}
                >
                    {saving ? '⏳ Kaydediliyor...' : '💾 Sistem Botu Ayarlarını Kaydet'}
                </button>
            </div>
        </div>
    );
};

export default SystemBotEditor;

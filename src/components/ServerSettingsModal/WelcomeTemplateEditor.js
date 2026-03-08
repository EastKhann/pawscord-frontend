import React, { useState, useEffect } from 'react';
import { FaRobot } from 'react-icons/fa';
import toast from '../../utils/toast';

const WelcomeTemplateEditor = ({ serverId, fetchWithAuth, apiBaseUrl }) => {
    const [template, setTemplate] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState('');
    const [welcomeChannelId, setWelcomeChannelId] = useState('');
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const loadTemplate = async () => {
            try {
                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/welcome/`);
                if (res.ok) {
                    const data = await res.json();
                    // Yeni config formatını destekle + eski format uyumu
                    if (data.config) {
                        setTemplate(data.config.welcome_message || data.template || '');
                        setEnabled(data.config.welcome_enabled ?? data.enabled ?? false);
                        setWelcomeChannelId(data.config.welcome_channel_id || '');
                    } else {
                        setTemplate(data.template || '');
                        setEnabled(data.enabled || false);
                    }
                }
            } catch (e) {
                console.error('Welcome template load error:', e);
            } finally {
                setLoading(false);
            }
        };
        const loadChannels = async () => {
            try {
                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/channels/`);
                if (res.ok) {
                    const data = await res.json();
                    setChannels(data.channels || []);
                }
            } catch (e) {
                console.error('Channels load error:', e);
            }
        };
        loadTemplate();
        loadChannels();
    }, [serverId, fetchWithAuth, apiBaseUrl]);

    // Live preview
    useEffect(() => {
        if (!template) { setPreview(''); return; }
        let p = template
            .replace(/\{user\}/g, 'Kullanıcı')
            .replace(/\{user_mention\}/g, '@Kullanıcı')
            .replace(/\{server\}/g, 'Sunucu')
            .replace(/\{member_count\}/g, '42')
            .replace(/\{user_id\}/g, '1')
            // Eski format uyumluluğu
            .replace(/\{username\}/g, 'Kullanıcı')
            .replace(/\{mention\}/g, '@Kullanıcı')
            .replace(/\{memberCount\}/g, '42')
            .replace(/\{date\}/g, new Date().toLocaleDateString('tr-TR'));
        setPreview(p);
    }, [template]);

    const handleSave = async () => {
        setSaving(true);
        try {
            let res;
            res = await fetchWithAuth(`${apiBaseUrl}/servers/welcome/set/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_id: serverId,
                    template,
                    welcome_message: template,
                    enabled,
                    welcome_enabled: enabled,
                    welcome_channel_id: welcomeChannelId || null
                })
            });
            if (res.ok) {
                toast.success('Hoş geldin mesajı kaydedildi!');
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

    const variables = [
        { key: '{user}', label: 'Kullanıcı Adı' },
        { key: '{user_mention}', label: '@Etiket' },
        { key: '{server}', label: 'Sunucu Adı' },
        { key: '{member_count}', label: 'Üye Sayısı' },
    ];

    if (loading) return <div style={{ padding: '20px', color: '#b5bac1', textAlign: 'center' }}>Yükleniyor...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Enable Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', backgroundColor: '#111214', borderRadius: '8px' }}>
                <div
                    onClick={() => setEnabled(!enabled)}
                    style={{
                        width: '44px', height: '24px', borderRadius: '12px',
                        backgroundColor: enabled ? '#23a559' : '#949ba4',
                        cursor: 'pointer', position: 'relative', transition: 'background-color 0.2s'
                    }}
                >
                    <div style={{
                        width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff',
                        position: 'absolute', top: '2px',
                        left: enabled ? '22px' : '2px',
                        transition: 'left 0.2s'
                    }} />
                </div>
                <div>
                    <div style={{ color: '#dbdee1', fontWeight: '600' }}>
                        {enabled ? '✓ Hoş Geldin Mesajları Aktif' : '✗ Hoş Geldin Mesajları Kapalı'}
                    </div>
                    <div style={{ color: '#949ba4', fontSize: '12px', marginTop: '2px' }}>
                        Yeni üyeler katıldığında otomatik mesaj gönderilir
                    </div>
                </div>
            </div>

            {/* Bot avatar artık "Sistem Botu" sekmesinden ayarlanıyor */}
            <div style={{ padding: '10px 14px', backgroundColor: '#111214', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaRobot style={{ color: '#5865f2', fontSize: '16px' }} />
                <div style={{ color: '#949ba4', fontSize: '12px' }}>
                    Bot profil fotoğrafı <strong style={{ color: '#dbdee1' }}>Sistem Botu</strong> sekmesinden ayarlanır.
                </div>
            </div>

            {/* Channel Selector */}
            <div>
                <label style={{ color: '#b5bac1', fontSize: '12px', fontWeight: '700', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Hoş Geldin Kanalı
                </label>
                <select
                    value={welcomeChannelId}
                    onChange={(e) => setWelcomeChannelId(e.target.value)}
                    style={{
                        width: '100%', padding: '10px 14px',
                        backgroundColor: '#0d0e10', border: '1px solid #182135',
                        borderRadius: '8px', color: '#dbdee1', fontSize: '14px',
                        outline: 'none', cursor: 'pointer',
                        transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#5865f2'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#1e2024'; }}
                >
                    <option value="">Otomatik (Varsayılan kanal)</option>
                    {channels.map(ch => (
                        <option key={ch.id} value={ch.id}>
                            {ch.name} {ch.category ? `(${ch.category})` : ''}
                        </option>
                    ))}
                </select>
                <div style={{ fontSize: '11px', color: '#949ba4', marginTop: '4px' }}>
                    Hoş geldin mesajlarının gönderileceği kanalı seçin
                </div>
            </div>

            {/* Template Editor */}
            <div>
                <label style={{ color: '#b5bac1', fontSize: '12px', fontWeight: '700', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Mesaj Şablonu
                </label>
                <textarea
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    placeholder="Hoş geldin {mention}! {server} sunucusuna katıldın! Sen #{memberCount}. üyesin! 🎉"
                    maxLength={500}
                    style={{
                        width: '100%', minHeight: '120px', padding: '12px',
                        backgroundColor: '#0d0e10', border: '1px solid #182135',
                        borderRadius: '8px', color: '#dbdee1', fontFamily: 'inherit',
                        resize: 'vertical', fontSize: '14px', lineHeight: '1.5',
                        outline: 'none', transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#5865f2'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#1e2024'; }}
                />
                <div style={{ fontSize: '11px', color: '#949ba4', marginTop: '4px', textAlign: 'right' }}>
                    {template.length}/500 karakter
                </div>
            </div>

            {/* Variables */}
            <div>
                <label style={{ color: '#b5bac1', fontSize: '12px', fontWeight: '700', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Kullanılabilir Değişkenler
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {variables.map(v => (
                        <button
                            key={v.key}
                            onClick={() => setTemplate(prev => prev + (prev.endsWith(' ') || !prev ? '' : ' ') + v.key)}
                            title={v.label}
                            style={{
                                padding: '6px 12px', backgroundColor: '#0d0e10',
                                border: '1px solid #182135', borderRadius: '6px',
                                color: '#5865f2', cursor: 'pointer',
                                fontFamily: 'monospace', fontSize: '13px',
                                transition: 'all 0.15s'
                            }}
                            onMouseEnter={(e) => { e.target.style.backgroundColor = '#5865f2'; e.target.style.color = '#fff'; }}
                            onMouseLeave={(e) => { e.target.style.backgroundColor = '#0d0e10'; e.target.style.color = '#5865f2'; }}
                        >
                            {v.key}
                        </button>
                    ))}
                </div>
            </div>

            {/* Live Preview */}
            {preview && (
                <div>
                    <label style={{ color: '#b5bac1', fontSize: '12px', fontWeight: '700', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                        Önizleme
                    </label>
                    <div style={{
                        padding: '14px', backgroundColor: '#0d0e10', borderRadius: '8px',
                        border: '1px solid #182135', color: '#dbdee1', fontSize: '14px',
                        lineHeight: '1.5', fontStyle: 'italic'
                    }}>
                        {preview}
                    </div>
                </div>
            )}

            {/* Save Button */}
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
                    {saving ? '⏳ Kaydediliyor...' : '💾 Hoş Geldin Mesajını Kaydet'}
                </button>
            </div>
        </div>
    );
};

export default WelcomeTemplateEditor;

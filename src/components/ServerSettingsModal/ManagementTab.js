import { useState, useEffect } from 'react';
import { FaVolumeUp, FaVolumeMute, FaEdit, FaImage, FaLock, FaGlobe, FaComments, FaFileAlt, FaTrash } from 'react-icons/fa';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';
import styles from './styles';

const ManagementTab = ({ server, isOwner, fetchWithAuth, apiBaseUrl, onRefreshServers, onClose }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [serverName, setServerName] = useState(server.name || '');
    const [isRenamingServer, setIsRenamingServer] = useState(false);
    const [serverDescription, setServerDescription] = useState(server.description || '');
    const [isSavingDescription, setIsSavingDescription] = useState(false);
    const [defaultChannelSlug, setDefaultChannelSlug] = useState(server.metadata?.default_channel_slug || '');
    const [isSavingDefaultChannel, setIsSavingDefaultChannel] = useState(false);

    // Load mute status
    useEffect(() => {
        const loadMuteStatus = async () => {
            try {
                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/mute-status/`);
                if (res.ok) {
                    const data = await res.json();
                    setIsMuted(data.is_muted || false);
                }
            } catch (e) {
                console.error('Mute status load error:', e);
            }
        };
        loadMuteStatus();
    }, [server.id, fetchWithAuth, apiBaseUrl]);

    const handleToggleMute = async () => {
        try {
            const endpoint = isMuted ? 'unmute' : 'mute';
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/${endpoint}/`, { method: 'POST' });
            if (res.ok) {
                setIsMuted(!isMuted);
                toast.success(isMuted ? 'Sunucu bildirimleri açıldı!' : 'Sunucu bildirimleri kapatıldı!');
            } else {
                const data = await res.json();
                toast.error(data.error || 'İşlem başarısız.');
            }
        } catch (e) {
            console.error('Mute hatası:', e);
            toast.error('Bir hata oluştu.');
        }
    };

    const handleDeleteServer = async () => {
        if (deleteConfirmation !== server.name) {
            toast.warning('Sunucu adını doğru yazmadınız!');
            return;
        }
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/delete/`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Sunucu başarıyla silindi!');
                onClose();
                if (onRefreshServers) onRefreshServers();
                setTimeout(() => { window.location.href = '/'; }, 500);
            } else {
                const data = await res.json();
                toast.error(data.error || 'Sunucu silinemedi.');
            }
        } catch (e) {
            console.error('Delete hatası:', e);
            toast.error('Sunucu silinirken bir hata oluştu.');
        }
    };

    const handleSaveDescription = async () => {
        setIsSavingDescription(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/update/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description: serverDescription })
            });
            if (res.ok) {
                toast.success('Sunucu açıklaması güncellendi!');
                if (onRefreshServers) onRefreshServers();
            } else {
                const data = await res.json();
                toast.error(data.error || 'Açıklama kaydedilemedi.');
            }
        } catch (e) {
            console.error('Description hatası:', e);
            toast.error('Açıklama kaydedilirken bir hata oluştu.');
        } finally {
            setIsSavingDescription(false);
        }
    };

    const handleSaveDefaultChannel = async () => {
        setIsSavingDefaultChannel(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/default-channel/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ channel_slug: defaultChannelSlug })
            });
            if (res.ok) {
                toast.success('Varsayılan kanal güncellendi!');
                if (onRefreshServers) onRefreshServers();
            } else {
                const data = await res.json().catch(() => ({}));
                toast.error(data.error || 'Varsayılan kanal kaydedilemedi.');
            }
        } catch (e) {
            console.error('Default channel hatası:', e);
            toast.error('Varsayılan kanal kaydedilirken bir hata oluştu.');
        } finally {
            setIsSavingDefaultChannel(false);
        }
    };

    const handleRenameServer = async () => {
        const trimmed = serverName.trim();
        if (!trimmed || trimmed === server.name) {
            toast.warning('Geçerli bir isim girin.');
            return;
        }
        setIsRenamingServer(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/update/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: trimmed })
            });
            if (res.ok) {
                toast.success('Sunucu adı güncellendi!');
                if (onRefreshServers) onRefreshServers();
            } else {
                const data = await res.json();
                toast.error(data.error || 'Sunucu adı değiştirilemedi.');
            }
        } catch (e) {
            console.error('Rename hatası:', e);
            toast.error('Sunucu adı değiştirilirken bir hata oluştu.');
        } finally {
            setIsRenamingServer(false);
        }
    };

    return (
        <div style={styles.managementTab}>
            <h3 style={styles.sectionTitle}>🔔 Bildirim Ayarları</h3>
            <div style={styles.settingBox}>
                <div style={styles.settingInfo}>
                    <div style={styles.settingLabel}>
                        {isMuted ? '🔇 Sunucu Sessize Alındı' : '🔊 Bildirimler Aktif'}
                    </div>
                    <div style={styles.settingDesc}>
                        {isMuted ? 'Bu sunucudan hiçbir bildirim almıyorsunuz.' : 'Bu sunucudan tüm bildirimleri alıyorsunuz.'}
                    </div>
                </div>
                <button onClick={handleToggleMute} style={{ ...styles.actionBtn, backgroundColor: isMuted ? '#23a559' : '#5865f2' }}>
                    {isMuted ? <FaVolumeUp /> : <FaVolumeMute />}
                    {isMuted ? ' Bildirimleri Aç' : ' Sessize Al'}
                </button>
            </div>

            <div style={styles.divider}></div>

            {isOwner && (
                <>
                    <h3 style={styles.sectionTitle}>🎨 Sunucu Özelleştirme</h3>

                    {/* Sunucu Adı */}
                    <div style={styles.settingBox}>
                        <div style={styles.settingInfo}>
                            <div style={styles.settingLabel}><FaEdit style={{ marginRight: '8px' }} />Sunucu Adı</div>
                            <div style={styles.settingDesc}>Sunucunuzun görünen adını değiştirin</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input
                                type="text" value={serverName} onChange={(e) => setServerName(e.target.value)} maxLength={100}
                                style={{ padding: '10px 14px', backgroundColor: '#1e1f22', border: '1px solid #40444b', borderRadius: '8px', color: '#dcddde', fontSize: '14px', outline: 'none', width: '220px', transition: 'border-color 0.2s' }}
                                onFocus={(e) => { e.target.style.borderColor = '#5865f2'; }}
                                onBlur={(e) => { e.target.style.borderColor = '#40444b'; }}
                                placeholder="Sunucu adı..."
                            />
                            <button onClick={handleRenameServer} disabled={isRenamingServer || serverName.trim() === server.name}
                                style={{ ...styles.actionBtn, backgroundColor: serverName.trim() !== server.name ? '#5865f2' : '#4e5058', opacity: isRenamingServer || serverName.trim() === server.name ? 0.5 : 1, cursor: isRenamingServer || serverName.trim() === server.name ? 'not-allowed' : 'pointer' }}>
                                {isRenamingServer ? '...' : 'Kaydet'}
                            </button>
                        </div>
                    </div>

                    {/* Sunucu Açıklaması */}
                    <div style={{ ...styles.settingBox, flexDirection: 'column', alignItems: 'stretch' }}>
                        <div style={styles.settingInfo}>
                            <div style={styles.settingLabel}><FaFileAlt style={{ marginRight: '8px' }} />Sunucu Açıklaması</div>
                            <div style={styles.settingDesc}>Sunucunuz hakkında kısa bir açıklama yazın</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                            <textarea value={serverDescription} onChange={(e) => setServerDescription(e.target.value)} maxLength={300}
                                placeholder="Bu sunucu hakkında bir açıklama yazın..."
                                style={{ flex: 1, padding: '10px 14px', backgroundColor: '#1e1f22', border: '1px solid #40444b', borderRadius: '8px', color: '#dcddde', fontSize: '14px', outline: 'none', resize: 'vertical', minHeight: '60px', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
                                onFocus={(e) => { e.target.style.borderColor = '#5865f2'; }}
                                onBlur={(e) => { e.target.style.borderColor = '#40444b'; }}
                            />
                            <button onClick={handleSaveDescription} disabled={isSavingDescription || serverDescription === (server.description || '')}
                                style={{ ...styles.actionBtn, backgroundColor: serverDescription !== (server.description || '') ? '#5865f2' : '#4e5058', opacity: isSavingDescription || serverDescription === (server.description || '') ? 0.5 : 1, cursor: isSavingDescription || serverDescription === (server.description || '') ? 'not-allowed' : 'pointer', alignSelf: 'flex-start' }}>
                                {isSavingDescription ? '...' : 'Kaydet'}
                            </button>
                        </div>
                        <div style={{ fontSize: '11px', color: '#72767d', marginTop: '4px', textAlign: 'right' }}>
                            {serverDescription.length}/300 karakter
                        </div>
                    </div>

                    {/* İkon Değiştirme */}
                    <div style={styles.settingBox}>
                        <div style={styles.settingInfo}>
                            <div style={styles.settingLabel}><FaImage style={{ marginRight: '8px' }} />Sunucu İkonu</div>
                            <div style={styles.settingDesc}>Sunucunuzun profil resmini değiştirin (Maks 5MB)</div>
                        </div>
                        <button onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file'; input.accept = 'image/*';
                            input.onchange = async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                if (file.size > 5 * 1024 * 1024) { toast.warning('Dosya boyutu çok büyük! Maksimum 5MB olmalıdır.'); return; }
                                const formData = new FormData();
                                formData.append('icon', file);
                                try {
                                    const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/icon/`, { method: 'POST', body: formData });
                                    if (res.ok) { toast.success('Sunucu ikonu güncellendi!'); if (onRefreshServers) onRefreshServers(); }
                                    else { const error = await res.json(); toast.error(`Hata: ${error.error || 'Bilinmeyen hata'}`); }
                                } catch (error) { console.error('❌ İkon yükleme hatası:', error); toast.error('İkon yüklenirken bir hata oluştu.'); }
                            };
                            input.click();
                        }} style={styles.actionBtn}>
                            <FaImage /> İkon Değiştir
                        </button>
                    </div>

                    {/* Gizlilik Ayarı */}
                    <div style={styles.settingBox}>
                        <div style={styles.settingInfo}>
                            <div style={styles.settingLabel}>
                                {server.is_public ? <FaGlobe style={{ marginRight: '8px' }} /> : <FaLock style={{ marginRight: '8px' }} />}
                                {server.is_public ? 'Herkese Açık Sunucu' : 'Özel Sunucu'}
                            </div>
                            <div style={styles.settingDesc}>
                                {server.is_public ? 'Herkes bu sunucuyu bulabilir ve katılabilir.' : 'Sadece davet edilen kişiler katılabilir.'}
                            </div>
                        </div>
                        <button onClick={async () => {
                            const newPrivacy = !server.is_public;
                            const message = newPrivacy ? 'Sunucuyu herkese açık yapmak istediğinize emin misiniz?' : 'Sunucuyu özel yapmak istediğinize emin misiniz?';
                            if (!await confirmDialog(message)) return;
                            try {
                                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/privacy/`, {
                                    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_public: newPrivacy })
                                });
                                if (res.ok) { toast.success(`Sunucu ${newPrivacy ? 'herkese açık' : 'özel'} yapıldı!`); if (onRefreshServers) onRefreshServers(); }
                                else { const error = await res.json(); toast.error(`Hata: ${error.error || 'Bilinmeyen hata'}`); }
                            } catch (error) { console.error('❌ Gizlilik ayarı hatası:', error); toast.error('Gizlilik ayarı değiştirilirken bir hata oluştu.'); }
                        }} style={{ ...styles.actionBtn, backgroundColor: server.is_public ? '#ed4245' : '#43b581' }}>
                            {server.is_public ? <FaLock /> : <FaGlobe />}
                            {server.is_public ? ' Özel Yap' : ' Herkese Açık Yap'}
                        </button>
                    </div>

                    {/* Varsayılan Kanal */}
                    <div style={styles.settingBox}>
                        <div style={styles.settingInfo}>
                            <div style={styles.settingLabel}><FaComments style={{ marginRight: '8px' }} />Varsayılan Kanal</div>
                            <div style={styles.settingDesc}>Kullanıcılar sunucuya girdiğinde ilk gösterilecek kanal</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <select value={defaultChannelSlug} onChange={(e) => setDefaultChannelSlug(e.target.value)}
                                style={{ padding: '10px 14px', backgroundColor: '#1e1f22', border: '1px solid #40444b', borderRadius: '8px', color: '#dcddde', fontSize: '14px', outline: 'none', width: '220px', cursor: 'pointer' }}>
                                <option value="">Otomatik (İlk metin kanalı)</option>
                                {server.categories?.map(cat => cat.rooms?.filter(r => r.room_type !== 'voice' && r.channel_type !== 'voice').map(room => (
                                    <option key={room.slug} value={room.slug}>{room.name}</option>
                                )))}
                            </select>
                            <button onClick={handleSaveDefaultChannel} disabled={isSavingDefaultChannel || defaultChannelSlug === (server.metadata?.default_channel_slug || '')}
                                style={{ ...styles.actionBtn, backgroundColor: defaultChannelSlug !== (server.metadata?.default_channel_slug || '') ? '#5865f2' : '#4e5058', opacity: isSavingDefaultChannel || defaultChannelSlug === (server.metadata?.default_channel_slug || '') ? 0.5 : 1, cursor: isSavingDefaultChannel || defaultChannelSlug === (server.metadata?.default_channel_slug || '') ? 'not-allowed' : 'pointer' }}>
                                {isSavingDefaultChannel ? '...' : 'Kaydet'}
                            </button>
                        </div>
                    </div>

                    <div style={styles.divider}></div>
                </>
            )}

            {/* Tehlikeli Bölge */}
            {isOwner && (
                <>
                    <h3 style={styles.sectionTitle}>⚠️ Tehlikeli Bölge</h3>
                    <div style={styles.dangerBox}>
                        <div style={styles.settingInfo}>
                            <div style={styles.settingLabel}>🗑️ Sunucuyu Sil</div>
                            <div style={styles.settingDesc}>Bu işlem geri alınamaz! Tüm kanallar, mesajlar ve ayarlar kalıcı olarak silinir.</div>
                            {showDeleteModal && (
                                <div style={styles.deleteConfirmation}>
                                    <p style={{ margin: '10px 0', color: '#dcddde' }}>Silmek için sunucu adını yazın: <strong>{server.name}</strong></p>
                                    <input type="text" value={deleteConfirmation} onChange={(e) => setDeleteConfirmation(e.target.value)} placeholder={server.name} style={styles.confirmInput} />
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        <button onClick={handleDeleteServer} disabled={deleteConfirmation !== server.name}
                                            style={{ ...styles.dangerBtn, opacity: deleteConfirmation !== server.name ? 0.5 : 1, cursor: deleteConfirmation !== server.name ? 'not-allowed' : 'pointer' }}>
                                            <FaTrash /> Sunucuyu KALİCİ OLARAK Sil
                                        </button>
                                        <button onClick={() => { setShowDeleteModal(false); setDeleteConfirmation(''); }} style={styles.cancelBtn}>İptal</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {!showDeleteModal && (
                            <button onClick={() => setShowDeleteModal(true)} style={styles.dangerBtn}><FaTrash /> Sunucuyu Sil</button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ManagementTab;

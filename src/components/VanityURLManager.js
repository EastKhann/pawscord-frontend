// frontend/src/components/VanityURLManager.js
import { useState, useEffect } from 'react';
import { FaTimes, FaLink, FaCopy, FaTrash } from 'react-icons/fa';
import toast from '../utils/toast';
import confirmDialog from '../utils/confirmDialog';
import { PRODUCTION_URL } from '../utils/constants';

const VanityURLManager = ({ onClose, fetchWithAuth, apiBaseUrl, serverId, embedded = false }) => {
    const [vanityPath, setVanityPath] = useState('');
    const [loading, setLoading] = useState(false);
    const [existingVanity, setExistingVanity] = useState(null);
    const [loadingExisting, setLoadingExisting] = useState(true);

    // Mevcut vanity URL'i yükle
    useEffect(() => {
        loadExistingVanity();
    }, [serverId]);

    const loadExistingVanity = async () => {
        if (!serverId) { setLoadingExisting(false); return; }
        setLoadingExisting(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/vanity/get/${serverId}/`);
            if (res.ok) {
                const contentType = res.headers.get('content-type') || '';
                if (!contentType.includes('application/json')) {
                    console.warn('[Vanity] Non-JSON response:', contentType);
                    setExistingVanity(null);
                    return;
                }
                const data = await res.json();
                if (data.exists) {
                    setExistingVanity(data);
                    setVanityPath(data.path);
                } else {
                    setExistingVanity(null);
                }
            }
        } catch (error) {
            console.error('Vanity URL yükleme hatası:', error);
        } finally {
            setLoadingExisting(false);
        }
    };

    const handleCreate = async () => {
        if (!vanityPath.trim()) {
            toast.warning('Lütfen bir vanity path girin');
            return;
        }

        if (vanityPath.length < 3) {
            toast.warning('Path en az 3 karakter olmalı');
            return;
        }

        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/vanity/create/`, {
                method: 'POST',
                body: JSON.stringify({
                    path: vanityPath,
                    server_id: serverId
                })
            });

            if (res.ok) {
                const data = await res.json();
                toast.success('Vanity URL oluşturuldu!');
                loadExistingVanity(); // Listeyi yenile
            } else {
                const data = await res.json();
                toast.error('Hata: ' + (data.error || 'Bu path zaten kullanılıyor'));
            }
        } catch (error) {
            console.error('Vanity URL error:', error);
            toast.error('Sunucu hatası');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!await confirmDialog('Vanity URL\'i silmek istediğinize emin misiniz?')) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/vanity/delete/${serverId}/`, {
                method: 'DELETE'
            });

            if (res.ok) {
                toast.success('Vanity URL silindi!');
                setExistingVanity(null);
                setVanityPath('');
            } else {
                const data = await res.json();
                toast.error('Hata: ' + (data.error || 'Silme başarısız'));
            }
        } catch (error) {
            console.error('Vanity URL silme hatası:', error);
            toast.error('Sunucu hatası');
        } finally {
            setLoading(false);
        }
    };

    const copyUrl = () => {
        const fullUrl = `${PRODUCTION_URL}/join/${existingVanity.path}`;
        navigator.clipboard.writeText(fullUrl);
        toast.success('URL kopyalandı!');
    };

    // İçerik alanını oluştur
    const content = (
        <>
            {loadingExisting ? (
                <div style={styles.description}>Yükleniyor...</div>
            ) : (
                <>
                    <div style={styles.description}>
                        Sunucunuz için özel bir davet URL'i oluşturun.
                        <br />
                        <span style={{ fontSize: '0.9em', color: '#949ba4' }}>
                            Format: <strong style={{ color: '#5865f2' }}>pawscord.com/join/yourpath</strong>
                        </span>
                    </div>

                    {existingVanity && (
                        <div style={styles.existingSection}>
                            <div style={styles.existingLabel}>📌 Mevcut Vanity URL:</div>
                            <div style={styles.existingUrl}>
                                <span style={styles.urlText}>pawscord.com/join/{existingVanity.path}</span>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={copyUrl} style={styles.copyButton}>
                                        <FaCopy /> Kopyala
                                    </button>
                                    <button onClick={handleDelete} style={styles.deleteButton} disabled={loading}>
                                        <FaTrash /> Sil
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div style={styles.inputGroup}>
                        <span style={styles.prefix}>pawscord.com/join/</span>
                        <input
                            type="text"
                            value={vanityPath}
                            onChange={(e) => setVanityPath(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                            placeholder="myserver"
                            style={styles.input}
                            maxLength={32}
                        />
                    </div>

                    <div style={{ fontSize: '0.85em', color: '#949ba4', marginTop: '8px', marginBottom: '15px' }}>
                        • En az 3, en fazla 32 karakter<br />
                        • Sadece küçük harf, rakam ve tire (-) kullanılabilir<br />
                        • Sistem kelimeleri (api, admin, vb.) kullanılamaz
                    </div>

                    <button
                        onClick={handleCreate}
                        disabled={loading || !vanityPath.trim()}
                        style={styles.createButton}
                    >
                        {loading ? 'İşleniyor...' : (existingVanity ? '🔗 Vanity URL Güncelle' : '🔗 Vanity URL Oluştur')}
                    </button>
                </>
            )}
        </>
    );

    // Embedded mode: sadece içeriği render et
    if (embedded) {
        return <div style={styles.content}>{content}</div>;
    }

    // Standalone mode: overlay ve modal ile render et
    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h3 style={styles.title}>
                        <FaLink /> Vanity URL Oluştur
                    </h3>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>
                <div style={styles.content}>{content}</div>
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
    },
    modal: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #182135'
    },
    title: {
        color: 'white',
        margin: 0,
        fontSize: '1.3em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '1.3em'
    },
    content: {
        padding: '20px'
    },
    description: {
        color: '#b5bac1',
        fontSize: '0.9em',
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#1e2024',
        borderRadius: '4px'
    },
    existingSection: {
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#111214',
        borderRadius: '8px',
        border: '1px solid #5865f2'
    },
    existingLabel: {
        color: '#5865f2',
        fontWeight: 'bold',
        marginBottom: '10px',
        fontSize: '0.9em'
    },
    existingUrl: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
    },
    urlText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '1em'
    },
    inputGroup: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1e2024',
        borderRadius: '4px',
        padding: '5px',
        marginBottom: '15px'
    },
    prefix: {
        color: '#b5bac1',
        padding: '0 10px',
        fontWeight: 'bold'
    },
    input: {
        flex: 1,
        padding: '10px',
        backgroundColor: 'transparent',
        border: 'none',
        color: 'white',
        fontSize: '1em',
        outline: 'none'
    },
    copyButton: {
        padding: '8px 12px',
        backgroundColor: '#23a559',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontWeight: 'bold'
    },
    deleteButton: {
        padding: '8px 12px',
        backgroundColor: '#f23f42',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontWeight: 'bold'
    },
    createButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '1em'
    }
};

export default VanityURLManager;



// frontend/src/components/CustomEmojiManager.js

/**
 * 😊 Custom Emoji Manager
 * Upload and manage custom server emojis
 */

import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaPlus, FaTimes, FaUpload, FaTrash, FaEdit, FaFire, FaSearch } from 'react-icons/fa';

const CustomEmojiManager = ({
    serverId,
    apiBaseUrl,
    fetchWithAuth,
    onClose,
    isAdmin = false
}) => {
    const [emojis, setEmojis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploadMode, setUploadMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Upload form
    const [emojiName, setEmojiName] = useState('');
    const [emojiFile, setEmojiFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadEmojis();
    }, [serverId]);

    const loadEmojis = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/servers/${serverId}/emojis/`
            );

            if (response.ok) {
                const data = await response.json();
                setEmojis(data.emojis || []);
            }
        } catch (error) {
            console.error('Failed to load emojis:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.warning('Sadece resim dosyaları yüklenebilir');
            return;
        }

        // Validate file size (max 512KB)
        if (file.size > 512 * 1024) {
            toast.warning('Dosya boyutu en fazla 512KB olabilir');
            return;
        }

        setEmojiFile(file);

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);
    };

    const handleUpload = async () => {
        if (!emojiName || !emojiFile) {
            toast.warning('Lütfen emoji adı ve dosya seçin');
            return;
        }

        // Validate emoji name (alphanumeric + underscore)
        if (!/^[a-zA-Z0-9_]+$/.test(emojiName)) {
            toast.warning('Emoji adı sadece harf, rakam ve _ içerebilir');
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('name', emojiName);
            formData.append('image', emojiFile);

            const response = await fetchWithAuth(
                `${apiBaseUrl}/servers/${serverId}/emojis/upload/`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (response.ok) {
                const newEmoji = await response.json();
                setEmojis([...emojis, newEmoji]);

                // Reset form
                setEmojiName('');
                setEmojiFile(null);
                setPreview(null);
                setUploadMode(false);

                toast.success('Emoji yüklendi!');
            } else {
                const error = await response.json();
                toast.error(error.error || 'Yükleme başarısız');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Bir hata oluştu');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (emojiId) => {
        if (!confirm('Bu emojiyi silmek istediğinizden emin misiniz?')) return;

        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/servers/${serverId}/emojis/${emojiId}/`,
                { method: 'DELETE' }
            );

            if (response.ok) {
                setEmojis(emojis.filter(e => e.id !== emojiId));
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const filteredEmojis = emojis.filter(emoji =>
        emoji.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                {/* Header */}
                <div style={styles.header}>
                    <h2 style={styles.title}>😊 Sunucu Emojileri</h2>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                {/* Search & Upload Button */}
                <div style={styles.toolbar}>
                    <div style={styles.searchBox}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Emoji ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>

                    {isAdmin && !uploadMode && (
                        <button onClick={() => setUploadMode(true)} style={styles.uploadButton}>
                            <FaPlus style={{ marginRight: '6px' }} />
                            Emoji Ekle
                        </button>
                    )}
                </div>

                {/* Upload Form */}
                {uploadMode && (
                    <div style={styles.uploadForm}>
                        <h3 style={styles.uploadTitle}>Yeni Emoji Yükle</h3>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Emoji Adı</label>
                            <input
                                type="text"
                                placeholder="emoji_adi"
                                value={emojiName}
                                onChange={(e) => setEmojiName(e.target.value)}
                                style={styles.input}
                                maxLength={32}
                            />
                            <span style={styles.hint}>
                                Kullanım: :{emojiName || 'emoji_adi'}:
                            </span>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Resim Dosyası</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={styles.fileInput}
                            />
                            {preview && (
                                <div style={styles.preview}>
                                    <img src={preview} alt="Preview" style={styles.previewImage} />
                                </div>
                            )}
                        </div>

                        <div style={styles.formActions}>
                            <button onClick={() => setUploadMode(false)} style={styles.cancelButton}>
                                İptal
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={uploading || !emojiName || !emojiFile}
                                style={{
                                    ...styles.submitButton,
                                    opacity: uploading || !emojiName || !emojiFile ? 0.5 : 1
                                }}
                            >
                                <FaUpload style={{ marginRight: '6px' }} />
                                {uploading ? 'Yükleniyor...' : 'Yükle'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Emoji List */}
                <div style={styles.emojiList}>
                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : filteredEmojis.length === 0 ? (
                        <div style={styles.empty}>
                            <span style={styles.emptyIcon}>😔</span>
                            <p>Henüz emoji eklenmemiş</p>
                        </div>
                    ) : (
                        <div style={styles.emojiGrid}>
                            {filteredEmojis.map(emoji => (
                                <div key={emoji.id} style={styles.emojiCard}>
                                    <div style={styles.emojiImageContainer}>
                                        <img
                                            src={emoji.image_url || emoji.image}
                                            alt={emoji.name}
                                            style={styles.emojiImage}
                                        />
                                        {emoji.is_animated && (
                                            <span style={styles.animatedBadge}>GIF</span>
                                        )}
                                    </div>

                                    <div style={styles.emojiInfo}>
                                        <span style={styles.emojiName}>:{emoji.name}:</span>
                                        <div style={styles.emojiStats}>
                                            <span style={styles.usageCount}>
                                                <FaFire style={{ fontSize: '10px', marginRight: '3px' }} />
                                                {emoji.usage_count || 0}
                                            </span>
                                        </div>
                                    </div>

                                    {isAdmin && (
                                        <button
                                            onClick={() => handleDelete(emoji.id)}
                                            style={styles.deleteButton}
                                            title="Sil"
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <div style={styles.footer}>
                    <span style={styles.footerText}>
                        {emojis.length} emoji • Max 50 emoji
                    </span>
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        width: '90%',
        maxWidth: '700px',
        maxHeight: '90vh',
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
        borderBottom: '1px solid #1e1f22'
    },
    title: {
        margin: 0,
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#fff'
    },
    closeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '8px'
    },
    toolbar: {
        display: 'flex',
        gap: '12px',
        padding: '16px 24px',
        borderBottom: '1px solid #1e1f22'
    },
    searchBox: {
        flex: 1,
        position: 'relative'
    },
    searchIcon: {
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#72767d',
        fontSize: '14px'
    },
    searchInput: {
        width: '100%',
        padding: '10px 10px 10px 36px',
        backgroundColor: '#202225',
        border: '1px solid #1e1f22',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px'
    },
    uploadButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 16px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer'
    },
    uploadForm: {
        padding: '20px 24px',
        backgroundColor: '#36393f',
        borderBottom: '1px solid #1e1f22'
    },
    uploadTitle: {
        margin: '0 0 16px 0',
        fontSize: '16px',
        color: '#fff'
    },
    formGroup: {
        marginBottom: '16px'
    },
    label: {
        display: 'block',
        marginBottom: '6px',
        fontSize: '13px',
        fontWeight: '600',
        color: '#b9bbbe',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#202225',
        border: '1px solid #1e1f22',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px'
    },
    hint: {
        display: 'block',
        marginTop: '4px',
        fontSize: '12px',
        color: '#72767d'
    },
    fileInput: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#202225',
        border: '1px solid #1e1f22',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px'
    },
    preview: {
        marginTop: '12px',
        display: 'flex',
        justifyContent: 'center'
    },
    previewImage: {
        maxWidth: '128px',
        maxHeight: '128px',
        borderRadius: '8px'
    },
    formActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '16px'
    },
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px',
        cursor: 'pointer',
        fontWeight: '500'
    },
    submitButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    emojiList: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px 24px'
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#b9bbbe'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#72767d'
    },
    emptyIcon: {
        fontSize: '48px',
        display: 'block',
        marginBottom: '12px'
    },
    emojiGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '12px'
    },
    emojiCard: {
        position: 'relative',
        backgroundColor: '#36393f',
        borderRadius: '8px',
        padding: '12px',
        transition: 'background-color 0.2s'
    },
    emojiImageContainer: {
        position: 'relative',
        width: '100%',
        paddingBottom: '100%',
        marginBottom: '8px'
    },
    emojiImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: '4px'
    },
    animatedBadge: {
        position: 'absolute',
        top: '4px',
        right: '4px',
        backgroundColor: '#5865f2',
        color: '#fff',
        fontSize: '10px',
        fontWeight: 'bold',
        padding: '2px 6px',
        borderRadius: '3px'
    },
    emojiInfo: {
        textAlign: 'center'
    },
    emojiName: {
        display: 'block',
        fontSize: '12px',
        color: '#dcddde',
        fontWeight: '500',
        marginBottom: '4px'
    },
    emojiStats: {
        display: 'flex',
        justifyContent: 'center',
        gap: '8px'
    },
    usageCount: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '11px',
        color: '#72767d'
    },
    deleteButton: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        backgroundColor: '#f04747',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        padding: '6px',
        cursor: 'pointer',
        fontSize: '12px',
        opacity: 0,
        transition: 'opacity 0.2s'
    },
    footer: {
        padding: '12px 24px',
        borderTop: '1px solid #1e1f22',
        textAlign: 'center'
    },
    footerText: {
        fontSize: '12px',
        color: '#72767d'
    }
};

// Hover effect for emoji card
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    .emoji-card:hover {
      background-color: #40444b !important;
    }
    .emoji-card:hover .delete-button {
      opacity: 1 !important;
    }
  `;
    document.head.appendChild(styleSheet);
}

export default CustomEmojiManager;



// frontend/src/components/EmojiManagementPanel.js
import { useState, useEffect } from 'react';
import { FaTimes, FaSmile, FaPlus, FaTrash, FaStar, FaUpload } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * 😀 Emoji Management Panel
 * Sunucu özel emoji yönetimi
 */

const EmojiManagementPanel = ({ fetchWithAuth, apiBaseUrl, serverId, onClose }) => {
    const [emojis, setEmojis] = useState([]);
    const [trendingEmojis, setTrendingEmojis] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [uploadFile, setUploadFile] = useState(null);
    const [emojiName, setEmojiName] = useState('');
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('custom');

    useEffect(() => {
        loadEmojis();
        if (activeTab === 'trending') loadTrending();
        if (activeTab === 'suggestions') loadSuggestions();
    }, [activeTab]);

    const loadEmojis = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/emoji/list/?server_id=${serverId}`);
            if (response.ok) {
                const data = await response.json();
                setEmojis(data);
            }
        } catch (error) {
            console.error('Emoji yükleme hatası:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadTrending = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/emoji/trending/?server_id=${serverId}`);
            if (response.ok) {
                const data = await response.json();
                setTrendingEmojis(data);
            }
        } catch (error) {
            console.error('Trending yükleme hatası:', error);
        }
    };

    const loadSuggestions = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/emoji/suggestions/?server_id=${serverId}`);
            if (response.ok) {
                const data = await response.json();
                setSuggestions(data);
            }
        } catch (error) {
            console.error('Öneriler yükleme hatası:', error);
        }
    };

    const uploadEmoji = async () => {
        if (!uploadFile || !emojiName.trim()) {
            toast.error('Emoji dosyası ve ismi gerekli');
            return;
        }

        const formData = new FormData();
        formData.append('file', uploadFile);
        formData.append('name', emojiName);
        formData.append('server_id', serverId);

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/emoji/upload/`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                toast.success('Emoji yüklendi');
                setUploadFile(null);
                setEmojiName('');
                loadEmojis();
            } else {
                toast.error('Emoji yüklenemedi');
            }
        } catch (error) {
            console.error('Upload hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const deleteEmoji = async (emojiId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/emoji/${emojiId}/delete/`, {
                method: 'DELETE'
            });

            if (response.ok) {
                toast.success('Emoji silindi');
                loadEmojis();
            } else {
                toast.error('Emoji silinemedi');
            }
        } catch (error) {
            console.error('Delete hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const suggestEmoji = async (name, url) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/emoji/suggest/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_id: serverId,
                    emoji_name: name,
                    emoji_url: url
                })
            });

            if (response.ok) {
                toast.success('Emoji önerisi gönderildi');
            } else {
                toast.error('Öneri gönderilemedi');
            }
        } catch (error) {
            console.error('Suggest hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaSmile style={{ color: '#f0b232' }} />
                        <h2 style={{ margin: 0 }}>Emoji Yönetimi</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.tabs}>
                    <button
                        onClick={() => setActiveTab('custom')}
                        style={{ ...styles.tab, ...(activeTab === 'custom' ? styles.activeTab : {}) }}
                    >
                        Özel Emojiler
                    </button>
                    <button
                        onClick={() => setActiveTab('trending')}
                        style={{ ...styles.tab, ...(activeTab === 'trending' ? styles.activeTab : {}) }}
                    >
                        <FaStar /> Trend Olanlar
                    </button>
                    <button
                        onClick={() => setActiveTab('suggestions')}
                        style={{ ...styles.tab, ...(activeTab === 'suggestions' ? styles.activeTab : {}) }}
                    >
                        Öneriler
                    </button>
                </div>

                {activeTab === 'custom' && (
                    <>
                        <div style={styles.uploadSection}>
                            <input
                                type="file"
                                accept="image/png,image/gif,image/jpeg"
                                onChange={(e) => setUploadFile(e.target.files[0])}
                                style={styles.fileInput}
                            />
                            <input
                                type="text"
                                value={emojiName}
                                onChange={(e) => setEmojiName(e.target.value)}
                                placeholder="Emoji ismi (örn: pog, kekw)"
                                style={styles.input}
                            />
                            <button onClick={uploadEmoji} style={styles.uploadBtn}>
                                <FaUpload /> Yükle
                            </button>
                        </div>

                        <div style={styles.content}>
                            {loading ? (
                                <div style={styles.loading}>Yükleniyor...</div>
                            ) : emojis.length === 0 ? (
                                <div style={styles.empty}>
                                    <FaSmile style={{ fontSize: '48px', color: '#555', marginBottom: '10px' }} />
                                    <p>Henüz özel emoji yok</p>
                                </div>
                            ) : (
                                <div style={styles.emojiGrid}>
                                    {emojis.map((emoji) => (
                                        <div key={emoji.id} style={styles.emojiCard}>
                                            <img src={emoji.url} alt={emoji.name} style={styles.emojiImage} />
                                            <div style={styles.emojiName}>:{emoji.name}:</div>
                                            <button
                                                onClick={() => deleteEmoji(emoji.id)}
                                                style={styles.deleteEmojiBtn}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'trending' && (
                    <div style={styles.content}>
                        <div style={styles.emojiGrid}>
                            {trendingEmojis.map((emoji, index) => (
                                <div key={index} style={styles.emojiCard}>
                                    <img src={emoji.url} alt={emoji.name} style={styles.emojiImage} />
                                    <div style={styles.emojiName}>:{emoji.name}:</div>
                                    <div style={styles.usageCount}>{emoji.usage_count} kullanım</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'suggestions' && (
                    <div style={styles.content}>
                        <div style={styles.emojiGrid}>
                            {suggestions.map((suggestion, index) => (
                                <div key={index} style={styles.suggestionCard}>
                                    <img src={suggestion.emoji_url} alt={suggestion.emoji_name} style={styles.emojiImage} />
                                    <div style={styles.emojiName}>:{suggestion.emoji_name}:</div>
                                    <div style={styles.suggester}>Öneren: {suggestion.suggested_by}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
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
        maxWidth: '800px',
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
    tabs: {
        display: 'flex',
        gap: '10px',
        padding: '15px 20px',
        borderBottom: '1px solid #333'
    },
    tab: {
        backgroundColor: 'transparent',
        color: '#888',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    activeTab: {
        backgroundColor: '#5865f2',
        color: '#fff'
    },
    uploadSection: {
        display: 'flex',
        gap: '10px',
        padding: '20px',
        borderBottom: '1px solid #333'
    },
    fileInput: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#111214',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px'
    },
    input: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#111214',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px'
    },
    uploadBtn: {
        backgroundColor: '#23a559',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    emojiGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '15px'
    },
    emojiCard: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        padding: '15px',
        textAlign: 'center',
        position: 'relative'
    },
    emojiImage: {
        width: '64px',
        height: '64px',
        objectFit: 'contain',
        marginBottom: '10px'
    },
    emojiName: {
        fontSize: '13px',
        fontWeight: '500',
        color: '#dbdee1',
        marginBottom: '4px',
        fontFamily: 'monospace'
    },
    usageCount: {
        fontSize: '11px',
        color: '#888'
    },
    deleteEmojiBtn: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        backgroundColor: '#f23f42',
        color: '#fff',
        border: 'none',
        padding: '6px 8px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px'
    },
    suggestionCard: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        padding: '15px',
        textAlign: 'center'
    },
    suggester: {
        fontSize: '11px',
        color: '#888',
        marginTop: '6px'
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#888'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#888'
    }
};

export default EmojiManagementPanel;

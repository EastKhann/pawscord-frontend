// frontend/src/components/KeywordMutesPanel.js
import { useState, useEffect } from 'react';
import { FaTimes, FaFilter, FaPlus, FaTrash } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * 🔇 Keyword Mutes Panel
 * Kelime bazlı mesaj filtreleme
 */

const KeywordMutesPanel = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const [keywords, setKeywords] = useState([]);
    const [newKeyword, setNewKeyword] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadKeywords();
    }, []);

    const loadKeywords = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/mutekeyword/list/`);
            if (response.ok) {
                const data = await response.json();
                setKeywords(data);
            }
        } catch (error) {
            console.error('Keyword yükleme hatası:', error);
        } finally {
            setLoading(false);
        }
    };

    const addKeyword = async () => {
        if (!newKeyword.trim()) {
            toast.error('Kelime girin');
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/mutekeyword/add/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keyword: newKeyword.trim() })
            });

            if (response.ok) {
                toast.success('Kelime eklendi');
                setNewKeyword('');
                loadKeywords();
            } else {
                toast.error('Kelime eklenemedi');
            }
        } catch (error) {
            console.error('Keyword ekleme hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const removeKeyword = async (keywordId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/mutekeyword/remove/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keyword_id: keywordId })
            });

            if (response.ok) {
                toast.success('Kelime kaldırıldı');
                loadKeywords();
            } else {
                toast.error('Kelime kaldırılamadı');
            }
        } catch (error) {
            console.error('Keyword kaldırma hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaFilter style={{ color: '#f04747' }} />
                        <h2 style={{ margin: 0 }}>Kelime Filtreleri</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.addSection}>
                    <input
                        type="text"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                        placeholder="Filtrelenecek kelime/ifade girin..."
                        style={styles.input}
                    />
                    <button onClick={addKeyword} style={styles.addBtn}>
                        <FaPlus /> Ekle
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : keywords.length === 0 ? (
                        <div style={styles.empty}>
                            <FaFilter style={{ fontSize: '48px', color: '#555', marginBottom: '10px' }} />
                            <p>Henüz filtrelenmiş kelime yok</p>
                            <p style={{ fontSize: '12px', color: '#888' }}>
                                Bu kelimeler içeren mesajlar sizden gizlenecek
                            </p>
                        </div>
                    ) : (
                        <div style={styles.keywordList}>
                            {keywords.map((kw) => (
                                <div key={kw.id} style={styles.keywordItem}>
                                    <div style={styles.keywordText}>
                                        <FaFilter style={{ color: '#888', fontSize: '14px' }} />
                                        <span>{kw.keyword}</span>
                                    </div>
                                    <button
                                        onClick={() => removeKeyword(kw.id)}
                                        style={styles.removeBtn}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={styles.footer}>
                    <div style={styles.hint}>
                        💡 İpucu: Bu kelimeleri içeren mesajlar size gösterilmeyecek
                    </div>
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
    addSection: {
        display: 'flex',
        gap: '10px',
        padding: '20px',
        borderBottom: '1px solid #333'
    },
    input: {
        flex: 1,
        padding: '12px',
        backgroundColor: '#2c2f33',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px'
    },
    addBtn: {
        backgroundColor: '#43b581',
        color: '#fff',
        border: 'none',
        padding: '12px 20px',
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
    keywordList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    keywordItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        backgroundColor: '#2c2f33',
        borderRadius: '8px'
    },
    keywordText: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flex: 1
    },
    removeBtn: {
        backgroundColor: '#f04747',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
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
    },
    footer: {
        padding: '15px 20px',
        borderTop: '1px solid #333'
    },
    hint: {
        fontSize: '13px',
        color: '#888',
        textAlign: 'center'
    }
};

export default KeywordMutesPanel;

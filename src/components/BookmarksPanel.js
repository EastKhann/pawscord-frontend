// frontend/src/components/BookmarksPanel.js
import { useState, useEffect } from 'react';
import { FaBookmark, FaStar, FaTimes, FaFolder } from 'react-icons/fa';

const BookmarksPanel = ({ apiBaseUrl, fetchWithAuth, username }) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [categories, setCategories] = useState(['Tümü', 'Önemli', 'Yapılacak', 'İlham']);
    const [activeCategory, setActiveCategory] = useState('Tümü');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBookmarks();
    }, []);

    const loadBookmarks = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/`);
            if (response.ok) {
                const data = await response.json();
                setBookmarks(data);
            }
        } catch (error) {
            console.error('Failed to load bookmarks:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeBookmark = async (bookmarkId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/${bookmarkId}/`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
            }
        } catch (error) {
            console.error('Failed to remove bookmark:', error);
        }
    };

    const filteredBookmarks = activeCategory === 'Tümü'
        ? bookmarks
        : bookmarks.filter(b => b.category === activeCategory);

    if (loading) {
        return <div style={styles.loading}>Yükleniyor...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>
                    <FaBookmark /> Kaydedilenler
                </h2>
            </div>

            <div style={styles.categories}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            ...styles.categoryButton,
                            ...(activeCategory === cat ? styles.categoryButtonActive : {})
                        }}
                    >
                        {cat === 'Önemli' && <FaStar style={styles.categoryIcon} />}
                        {cat === 'Tümü' && <FaFolder style={styles.categoryIcon} />}
                        {cat}
                    </button>
                ))}
            </div>

            <div style={styles.bookmarksList}>
                {filteredBookmarks.length === 0 ? (
                    <div style={styles.empty}>
                        <FaBookmark style={styles.emptyIcon} />
                        <p>Henüz kaydedilen mesaj yok</p>
                    </div>
                ) : (
                    filteredBookmarks.map(bookmark => (
                        <BookmarkCard
                            key={bookmark.id}
                            bookmark={bookmark}
                            onRemove={removeBookmark}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

const BookmarkCard = ({ bookmark, onRemove }) => {
    return (
        <div style={styles.bookmarkCard}>
            <div style={styles.bookmarkHeader}>
                <span style={styles.bookmarkCategory}>{bookmark.category}</span>
                <button
                    onClick={() => onRemove(bookmark.id)}
                    style={styles.removeButton}
                >
                    <FaTimes />
                </button>
            </div>
            <div style={styles.bookmarkContent}>
                <strong style={styles.bookmarkAuthor}>{bookmark.message_author}</strong>
                <p style={styles.bookmarkText}>{bookmark.message_content}</p>
            </div>
            <div style={styles.bookmarkFooter}>
                <span style={styles.bookmarkTime}>
                    {new Date(bookmark.created_at).toLocaleDateString('tr-TR')}
                </span>
                <span style={styles.bookmarkChannel}>#{bookmark.channel_name}</span>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        minHeight: '500px'
    },
    header: {
        marginBottom: '20px',
        borderBottom: '1px solid #1e1f22',
        paddingBottom: '15px'
    },
    title: {
        color: '#fff',
        fontSize: '20px',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    categories: {
        display: 'flex',
        gap: '8px',
        marginBottom: '20px',
        flexWrap: 'wrap'
    },
    categoryButton: {
        padding: '6px 12px',
        border: '1px solid #4e5058',
        borderRadius: '16px',
        backgroundColor: 'transparent',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s'
    },
    categoryButtonActive: {
        backgroundColor: '#5865f2',
        borderColor: '#5865f2',
        color: '#fff'
    },
    categoryIcon: {
        fontSize: '11px'
    },
    loading: {
        color: '#b9bbbe',
        textAlign: 'center',
        padding: '40px'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#b9bbbe'
    },
    emptyIcon: {
        fontSize: '64px',
        opacity: 0.3,
        marginBottom: '20px'
    },
    bookmarksList: {
        display: 'grid',
        gap: '12px'
    },
    bookmarkCard: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid transparent',
        transition: 'border-color 0.2s'
    },
    bookmarkHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
    },
    bookmarkCategory: {
        fontSize: '11px',
        color: '#5865f2',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    removeButton: {
        background: 'none',
        border: 'none',
        color: '#72767d',
        cursor: 'pointer',
        padding: '4px',
        fontSize: '14px',
        transition: 'color 0.2s'
    },
    bookmarkContent: {
        marginBottom: '8px'
    },
    bookmarkAuthor: {
        color: '#fff',
        fontSize: '14px',
        marginBottom: '4px',
        display: 'block'
    },
    bookmarkText: {
        color: '#b9bbbe',
        fontSize: '13px',
        margin: 0
    },
    bookmarkFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '11px',
        color: '#72767d'
    }
};

export default BookmarksPanel;




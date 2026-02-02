// frontend/src/components/GifPicker.js
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

// Tenor API Key - Ücretsiz key al: https://tenor.com/developer/dashboard
const TENOR_API_KEY = 'AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ'; // Demo key
const TENOR_API_URL = 'https://tenor.googleapis.com/v2';

const GifPicker = ({ onSelect }) => {
    const [gifs, setGifs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('trending');

    const categories = ['trending', 'funny', 'love', 'happy', 'sad', 'angry', 'dance', 'wow'];

    useEffect(() => {
        fetchGifs(selectedCategory);
    }, [selectedCategory]);

    const fetchGifs = async (query) => {
        setIsLoading(true);
        try {
            const endpoint = query === 'trending' ? 'featured' : 'search';
            const params = new URLSearchParams({
                key: TENOR_API_KEY,
                limit: '20',
                ...(query !== 'trending' && { q: query }),
            });

            const response = await fetch(`${TENOR_API_URL}/${endpoint}?${params}`);
            const data = await response.json();

            setGifs(data.results || []);
        } catch (error) {
            console.error('GIF yükleme hatası:', error);
            // Fallback: Local GIF'ler veya placeholder
            setGifs([]);
        }
        setIsLoading(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            fetchGifs(searchTerm);
            setSelectedCategory('');
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSearchTerm('');
    };

    return (
        <div style={styles.container}>
            {/* Search Bar */}
            <form onSubmit={handleSearch} style={styles.searchBar}>
                <FaSearch style={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="GIF ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                />
            </form>

            {/* Categories */}
            <div style={styles.categories}>
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        style={{
                            ...styles.categoryButton,
                            ...(selectedCategory === category && styles.activeCategoryButton)
                        }}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            {/* GIF Grid */}
            <div style={styles.gifGrid}>
                {isLoading ? (
                    <div style={styles.loading}>Yükleniyor...</div>
                ) : gifs.length > 0 ? (
                    gifs.map((gif, index) => (
                        <div
                            key={index}
                            onClick={() => onSelect(gif.media_formats?.gif?.url || gif.url)}
                            style={styles.gifItem}
                        >
                            <img
                                src={gif.media_formats?.tinygif?.url || gif.media_formats?.gif?.url}
                                alt={gif.content_description || 'GIF'}
                                style={styles.gifImage}
                            />
                        </div>
                    ))
                ) : (
                    <div style={styles.noResults}>GIF bulunamadı</div>
                )}
            </div>

            {/* Powered by Tenor */}
            <div style={styles.footer}>
                <span style={styles.footerText}>Powered by Tenor</span>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '400px',
        height: '450px',
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    searchBar: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px',
        borderBottom: '1px solid #202225',
        backgroundColor: '#202225',
    },
    searchIcon: {
        color: '#b9bbbe',
        fontSize: '16px',
    },
    searchInput: {
        flex: 1,
        background: 'none',
        border: 'none',
        color: '#dcddde',
        fontSize: '14px',
        outline: 'none',
    },
    categories: {
        display: 'flex',
        gap: '6px',
        padding: '12px',
        borderBottom: '1px solid #202225',
        overflowX: 'auto',
        scrollbarWidth: 'thin',
    },
    categoryButton: {
        padding: '6px 12px',
        background: '#40444b',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '12px',
        borderRadius: '12px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s',
    },
    activeCategoryButton: {
        backgroundColor: '#5865f2',
        color: 'white',
    },
    gifGrid: {
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
        padding: '12px',
        overflowY: 'auto',
        alignContent: 'start',
    },
    gifItem: {
        cursor: 'pointer',
        borderRadius: '4px',
        overflow: 'hidden',
        aspectRatio: '1',
        backgroundColor: '#202225',
        transition: 'transform 0.2s',
    },
    gifImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    loading: {
        gridColumn: '1 / -1',
        textAlign: 'center',
        padding: '40px',
        color: '#b9bbbe',
    },
    noResults: {
        gridColumn: '1 / -1',
        textAlign: 'center',
        padding: '40px',
        color: '#b9bbbe',
    },
    footer: {
        padding: '8px 12px',
        borderTop: '1px solid #202225',
        textAlign: 'center',
    },
    footerText: {
        fontSize: '11px',
        color: '#72767d',
    },
};

export default GifPicker;




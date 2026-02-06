import React, { useState, useEffect } from 'react';
import './GIFPickerPanel.css';
import { FaImage, FaSearch, FaTh, FaList, FaHeart } from 'react-icons/fa';

function GIFPickerPanel({ apiBaseUrl, fetchWithAuth, onSelectGIF }) {
  const [gifs, setGifs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadGIFs();
    loadCategories();
    loadFavorites();
  }, [selectedCategory, searchQuery]);

  const loadGIFs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetchWithAuth(`${apiBaseUrl}/gifs/list_local/?${params}`);
      if (response.ok) {
        const data = await response.json();
        setGifs(data.gifs || []);
      }
    } catch (err) {
      console.error('Error loading GIFs:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/gifs/categories/`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const loadFavorites = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/gifs/favorites/`);
      if (response.ok) {
        const data = await response.json();
        setFavorites(new Set(data.gif_ids || []));
      }
    } catch (err) {
      console.error('Error loading favorites:', err);
    }
  };

  const toggleFavorite = async (gifId) => {
    try {
      const isFav = favorites.has(gifId);
      const url = isFav 
        ? `${apiBaseUrl}/gifs/favorites/remove/`
        : `${apiBaseUrl}/gifs/favorites/add/`;

      const response = await fetchWithAuth(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gif_id: gifId })
      });

      if (response.ok) {
        const newFavs = new Set(favorites);
        if (isFav) {
          newFavs.delete(gifId);
        } else {
          newFavs.add(gifId);
        }
        setFavorites(newFavs);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  return (
    <div className="gif-picker-panel">
      <div className="gif-header">
        <h2><FaImage /> GIF Library</h2>
        <div className="view-controls">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <FaTh />
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <FaList />
          </button>
        </div>
      </div>

      <div className="gif-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search GIFs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="gif-categories">
        <button
          className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className={`gif-grid ${viewMode}`}>
        {loading ? (
          <div className="gif-loading">Loading GIFs...</div>
        ) : gifs.length === 0 ? (
          <div className="empty-gifs">
            <FaImage className="empty-icon" />
            <p>No GIFs found</p>
          </div>
        ) : (
          gifs.map(gif => (
            <div key={gif.id} className="gif-item">
              <img 
                src={gif.url} 
                alt={gif.name}
                onClick={() => onSelectGIF && onSelectGIF(gif)}
                className="gif-image"
              />
              <div className="gif-overlay">
                <button
                  className={`fav-btn ${favorites.has(gif.id) ? 'favorited' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(gif.id);
                  }}
                >
                  <FaHeart />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GIFPickerPanel;

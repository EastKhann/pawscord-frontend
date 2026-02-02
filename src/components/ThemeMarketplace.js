// frontend/src/components/ThemeMarketplace.js
// 🎨 Theme Marketplace - User-created theme store

import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import axios from 'axios';
import './ThemeMarketplace.css';

const ThemeMarketplace = () => {
    const [themes, setThemes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('popular'); // popular, new, top-rated
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchThemes();
    }, [filter]);

    const fetchThemes = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/themes/marketplace/?filter=${filter}`);
            setThemes(response.data.themes);
        } catch (error) {
            console.error('Failed to fetch themes:', error);
        } finally {
            setLoading(false);
        }
    };

    const installTheme = async (themeId) => {
        try {
            const response = await axios.post(`/api/themes/install/`, { theme_id: themeId });
            if (response.data.success) {
                toast.success('✅ Theme installed successfully!');
                // Apply theme immediately
                applyTheme(response.data.theme);
            }
        } catch (error) {
            console.error('Failed to install theme:', error);
            toast.error('❌ Installation failed');
        }
    };

    const applyTheme = (theme) => {
        const root = document.documentElement;
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
        localStorage.setItem('current_theme', JSON.stringify(theme));
    };

    const filteredThemes = themes.filter(theme =>
        theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="theme-marketplace">
            <div className="marketplace-header">
                <h1>🎨 Theme Marketplace</h1>
                <p>Discover and install community-created themes</p>
            </div>

            <div className="marketplace-controls">
                <input
                    type="text"
                    placeholder="Search themes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="theme-search"
                />

                <div className="theme-filters">
                    <button
                        className={filter === 'popular' ? 'active' : ''}
                        onClick={() => setFilter('popular')}
                    >
                        🔥 Popular
                    </button>
                    <button
                        className={filter === 'new' ? 'active' : ''}
                        onClick={() => setFilter('new')}
                    >
                        ✨ New
                    </button>
                    <button
                        className={filter === 'top-rated' ? 'active' : ''}
                        onClick={() => setFilter('top-rated')}
                    >
                        ⭐ Top Rated
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading">Loading themes...</div>
            ) : (
                <div className="theme-grid">
                    {filteredThemes.map(theme => (
                        <ThemeCard
                            key={theme.id}
                            theme={theme}
                            onInstall={() => installTheme(theme.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const ThemeCard = ({ theme, onInstall }) => {
    const [preview, setPreview] = useState(false);

    const previewTheme = () => {
        setPreview(true);
        const root = document.documentElement;
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}-preview`, value);
        });
    };

    return (
        <div className="theme-card">
            <div
                className="theme-preview"
                style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
                }}
            >
                {theme.screenshot && (
                    <img src={theme.screenshot} alt={theme.name} />
                )}
            </div>

            <div className="theme-info">
                <h3>{theme.name}</h3>
                <p className="theme-author">by {theme.author}</p>
                <p className="theme-description">{theme.description}</p>

                <div className="theme-stats">
                    <span>⭐ {theme.rating.toFixed(1)}</span>
                    <span>📥 {theme.downloads.toLocaleString()} installs</span>
                </div>

                <div className="theme-actions">
                    <button onClick={previewTheme} className="btn-preview">
                        👁️ Preview
                    </button>
                    <button onClick={onInstall} className="btn-install">
                        📥 Install
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThemeMarketplace;



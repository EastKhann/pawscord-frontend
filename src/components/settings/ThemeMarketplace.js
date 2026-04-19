// frontend/src/components/ThemeMarketplace.js
// 🎨 Theme Marketplace - User-created theme store

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from '../../utils/toast';
import { authFetch } from '../../utils/authFetch';
import logger from '../../utils/logger';
import './ThemeMarketplace.css';
import { useTranslation } from 'react-i18next';

const ThemeMarketplace = () => {
    const { t } = useTranslation();
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
            const res = await authFetch(`/api/themes/marketplace/?filter=${filter}`);
            const json = await res.json();
            setThemes(json.themes);
        } catch (error) {
            logger.error('Failed to fetch themes:', error);
        } finally {
            setLoading(false);
        }
    };

    const installTheme = async (themeId) => {
        try {
            const res = await authFetch(`/api/themes/install/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ theme_id: themeId }),
            });
            const json = await res.json();
            if (json.success) {
                toast.success(t('theme.installed'));
                // Apply theme immediately
                applyTheme(json.theme);
            }
        } catch (error) {
            logger.error('Failed to install theme:', error);
            toast.error(t('theme.installFailed'));
        }
    };

    const applyTheme = (theme) => {
        const root = document.documentElement;
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
        localStorage.setItem('current_theme', JSON.stringify(theme));
    };

    const filteredThemes = themes.filter(
        (theme) =>
            theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            theme.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="theme-marketplace">
            <div className="marketplace-header">
                <h1>🎨 Tema Pazaryeri</h1>
                <p>Topluluk tarafından oluşturulan temaları keşfedin ve yükleyin</p>
            </div>

            <div className="marketplace-controls">
                <input
                    type="text"
                    placeholder="Tema ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="theme-search"
                />

                <div className="theme-filters">
                    <button
                        aria-label="Action button"
                        className={filter === 'popular' ? 'active' : ''}
                        onClick={() => setFilter('popular')}
                    >
                        🔥 Popular
                    </button>
                    <button
                        aria-label="Action button"
                        className={filter === 'new' ? 'active' : ''}
                        onClick={() => setFilter('new')}
                    >
                        ✨ New
                    </button>
                    <button
                        aria-label="Action button"
                        className={filter === 'top-rated' ? 'active' : ''}
                        onClick={() => setFilter('top-rated')}
                    >
                        ⭐ Top Rated
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading">Temalar yükleniyor...</div>
            ) : (
                <div className="theme-grid">
                    {filteredThemes.map((theme) => (
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
                    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                }}
            >
                {theme.screenshot && <img src={theme.screenshot} alt={theme.name} />}
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
                    <button
                        aria-label="preview Theme"
                        onClick={previewTheme}
                        className="btn-preview"
                    >
                        👁️ Preview
                    </button>
                    <button aria-label="on Install" onClick={onInstall} className="btn-install">
                        📥 Install
                    </button>
                </div>
            </div>
        </div>
    );
};

ThemeMarketplace.propTypes = {};

ThemeCard.propTypes = {
    theme: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        author: PropTypes.string,
        description: PropTypes.string,
        screenshot: PropTypes.string,
        rating: PropTypes.number,
        downloads: PropTypes.number,
        colors: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
    onInstall: PropTypes.func.isRequired,
};

export default ThemeMarketplace;

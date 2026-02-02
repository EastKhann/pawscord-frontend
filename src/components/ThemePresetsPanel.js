// frontend/src/components/ThemePresetsPanel.js - Browse and Apply Theme Presets
import React, { useState, useEffect } from 'react';
import {
    FaPalette, FaTimes, FaStar, FaDownload, FaCheck, FaHeart,
    FaSearch, FaEye, FaMoon, FaSun, FaCloudMoon, FaFire,
    FaSnowflake, FaLeaf, FaMagic, FaCrown, FaPlus, FaSave,
    FaShare, FaTrash, FaPaintBrush
} from 'react-icons/fa';
import toast from '../utils/toast';
import './ThemePresetsPanel.css';

const ThemePresetsPanel = ({ serverId, apiBaseUrl, onClose, onApplyTheme }) => {
    const [activeTab, setActiveTab] = useState('presets'); // 'presets', 'custom', 'create'
    const [presets, setPresets] = useState([]);
    const [customThemes, setCustomThemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [previewTheme, setPreviewTheme] = useState(null);

    // Custom theme form
    const [customTheme, setCustomTheme] = useState({
        name: '',
        primary_color: '#6366f1',
        secondary_color: '#8b5cf6',
        accent_color: '#f59e0b',
        background_color: '#1a1a2e',
        surface_color: '#16213e',
        text_color: '#ffffff',
        muted_color: '#a0a0a0',
        sidebar_color: '#0f0f1a',
        chat_background: '#1a1a2e'
    });

    const categories = [
        { id: 'all', label: 'Tümü', icon: <FaPalette /> },
        { id: 'dark', label: 'Karanlık', icon: <FaMoon /> },
        { id: 'light', label: 'Aydınlık', icon: <FaSun /> },
        { id: 'nature', label: 'Doğa', icon: <FaLeaf /> },
        { id: 'gaming', label: 'Oyun', icon: <FaFire /> },
        { id: 'minimal', label: 'Minimal', icon: <FaSnowflake /> },
        { id: 'premium', label: 'Premium', icon: <FaCrown /> }
    ];

    const defaultPresets = [
        {
            id: 'midnight-purple',
            name: 'Gece Yarısı Moru',
            category: 'dark',
            popular: true,
            colors: {
                primary: '#8b5cf6',
                secondary: '#6366f1',
                accent: '#f59e0b',
                background: '#0f0f1a',
                surface: '#1a1a2e',
                text: '#ffffff'
            }
        },
        {
            id: 'ocean-blue',
            name: 'Okyanus Mavisi',
            category: 'dark',
            colors: {
                primary: '#3b82f6',
                secondary: '#60a5fa',
                accent: '#06b6d4',
                background: '#0c1929',
                surface: '#1e3a5f',
                text: '#ffffff'
            }
        },
        {
            id: 'forest-green',
            name: 'Orman Yeşili',
            category: 'nature',
            colors: {
                primary: '#10b981',
                secondary: '#34d399',
                accent: '#84cc16',
                background: '#0f1d15',
                surface: '#1a2e1f',
                text: '#ffffff'
            }
        },
        {
            id: 'sunset-orange',
            name: 'Gün Batımı',
            category: 'nature',
            popular: true,
            colors: {
                primary: '#f97316',
                secondary: '#fb923c',
                accent: '#fbbf24',
                background: '#1f1410',
                surface: '#2d1f18',
                text: '#ffffff'
            }
        },
        {
            id: 'crimson-red',
            name: 'Kızıl Alev',
            category: 'gaming',
            colors: {
                primary: '#ef4444',
                secondary: '#f87171',
                accent: '#fbbf24',
                background: '#1a0a0a',
                surface: '#2d1515',
                text: '#ffffff'
            }
        },
        {
            id: 'neon-cyber',
            name: 'Neon Siber',
            category: 'gaming',
            popular: true,
            colors: {
                primary: '#00ffff',
                secondary: '#ff00ff',
                accent: '#00ff00',
                background: '#0a0a0f',
                surface: '#12121a',
                text: '#00ffff'
            }
        },
        {
            id: 'cotton-candy',
            name: 'Pamuk Şeker',
            category: 'light',
            colors: {
                primary: '#ec4899',
                secondary: '#f472b6',
                accent: '#a855f7',
                background: '#fdf2f8',
                surface: '#fce7f3',
                text: '#831843'
            }
        },
        {
            id: 'arctic-snow',
            name: 'Kutup Karı',
            category: 'minimal',
            colors: {
                primary: '#64748b',
                secondary: '#94a3b8',
                accent: '#0ea5e9',
                background: '#f8fafc',
                surface: '#f1f5f9',
                text: '#1e293b'
            }
        },
        {
            id: 'royal-gold',
            name: 'Kraliyet Altını',
            category: 'premium',
            premium: true,
            colors: {
                primary: '#fbbf24',
                secondary: '#f59e0b',
                accent: '#a855f7',
                background: '#1a1510',
                surface: '#2a2015',
                text: '#fef3c7'
            }
        },
        {
            id: 'aurora-borealis',
            name: 'Kutup Işıkları',
            category: 'premium',
            premium: true,
            colors: {
                primary: '#22d3ee',
                secondary: '#a78bfa',
                accent: '#34d399',
                background: '#0f172a',
                surface: '#1e293b',
                text: '#ffffff'
            }
        }
    ];

    useEffect(() => {
        fetchPresets();
        fetchCustomThemes();
    }, [serverId]);

    const fetchPresets = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/themes/presets/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setPresets(data.presets?.length > 0 ? data.presets : defaultPresets);
            } else {
                setPresets(defaultPresets);
            }
        } catch (error) {
            console.error('Fetch presets error:', error);
            setPresets(defaultPresets);
        } finally {
            setLoading(false);
        }
    };

    const fetchCustomThemes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/themes/custom/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setCustomThemes(data.themes || []);
            }
        } catch (error) {
            console.error('Fetch custom themes error:', error);
        }
    };

    const applyTheme = async (theme) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/themes/${serverId}/apply/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ theme_id: theme.id, colors: theme.colors })
            });

            if (response.ok) {
                toast.success(`✅ "${theme.name}" teması uygulandı`);
                if (onApplyTheme) onApplyTheme(theme);
                setPreviewTheme(null);
            }
        } catch (error) {
            console.error('Apply theme error:', error);
            toast.error('Tema uygulanırken hata oluştu');
        }
    };

    const saveCustomTheme = async () => {
        if (!customTheme.name.trim()) {
            toast.error('Tema adı gerekli');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/themes/custom/create/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customTheme)
            });

            if (response.ok) {
                toast.success('🎨 Özel tema kaydedildi');
                fetchCustomThemes();
                setActiveTab('custom');
            }
        } catch (error) {
            console.error('Save custom theme error:', error);
        }
    };

    const deleteCustomTheme = async (themeId) => {
        if (!window.confirm('Bu temayı silmek istiyor musunuz?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/themes/custom/${themeId}/delete/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('🗑️ Tema silindi');
                setCustomThemes(prev => prev.filter(t => t.id !== themeId));
            }
        } catch (error) {
            console.error('Delete theme error:', error);
        }
    };

    const filteredPresets = presets.filter(preset => {
        const matchesSearch = preset.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || preset.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="theme-presets-overlay" onClick={onClose}>
            <div className="theme-presets-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaPalette /> Tema Galerisi</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="panel-tabs">
                    <button
                        className={`tab ${activeTab === 'presets' ? 'active' : ''}`}
                        onClick={() => setActiveTab('presets')}
                    >
                        <FaStar /> Hazır Temalar
                    </button>
                    <button
                        className={`tab ${activeTab === 'custom' ? 'active' : ''}`}
                        onClick={() => setActiveTab('custom')}
                    >
                        <FaPaintBrush /> Özel Temalar
                    </button>
                    <button
                        className={`tab ${activeTab === 'create' ? 'active' : ''}`}
                        onClick={() => setActiveTab('create')}
                    >
                        <FaPlus /> Tema Oluştur
                    </button>
                </div>

                {activeTab === 'presets' && (
                    <div className="search-filter-bar">
                        <div className="search-box">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Tema ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="category-pills">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`pill ${selectedCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat.id)}
                                >
                                    {cat.icon} {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Temalar yükleniyor...</div>
                    ) : activeTab === 'presets' ? (
                        <ThemeGrid
                            themes={filteredPresets}
                            onApply={applyTheme}
                            onPreview={setPreviewTheme}
                        />
                    ) : activeTab === 'custom' ? (
                        <CustomThemesList
                            themes={customThemes}
                            onApply={applyTheme}
                            onDelete={deleteCustomTheme}
                        />
                    ) : (
                        <ThemeCreator
                            theme={customTheme}
                            setTheme={setCustomTheme}
                            onSave={saveCustomTheme}
                        />
                    )}
                </div>

                {previewTheme && (
                    <ThemePreview
                        theme={previewTheme}
                        onClose={() => setPreviewTheme(null)}
                        onApply={() => applyTheme(previewTheme)}
                    />
                )}
            </div>
        </div>
    );
};

// Theme Grid
const ThemeGrid = ({ themes, onApply, onPreview }) => {
    if (themes.length === 0) {
        return (
            <div className="no-themes">
                <FaPalette className="empty-icon" />
                <p>Tema bulunamadı</p>
            </div>
        );
    }

    return (
        <div className="themes-grid">
            {themes.map(theme => (
                <div key={theme.id} className="theme-card">
                    <div
                        className="theme-preview-colors"
                        style={{
                            background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.surface} 100%)`
                        }}
                    >
                        <div
                            className="color-accent-1"
                            style={{ background: theme.colors.primary }}
                        />
                        <div
                            className="color-accent-2"
                            style={{ background: theme.colors.secondary }}
                        />
                        <div
                            className="color-accent-3"
                            style={{ background: theme.colors.accent }}
                        />
                        {theme.popular && (
                            <span className="popular-badge">
                                <FaFire /> Popüler
                            </span>
                        )}
                        {theme.premium && (
                            <span className="premium-badge">
                                <FaCrown /> Premium
                            </span>
                        )}
                    </div>
                    <div className="theme-info">
                        <h4>{theme.name}</h4>
                        <div className="theme-actions">
                            <button
                                className="preview-btn"
                                onClick={() => onPreview(theme)}
                            >
                                <FaEye />
                            </button>
                            <button
                                className="apply-btn"
                                onClick={() => onApply(theme)}
                            >
                                <FaCheck /> Uygula
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Custom Themes List
const CustomThemesList = ({ themes, onApply, onDelete }) => {
    if (themes.length === 0) {
        return (
            <div className="no-themes">
                <FaPaintBrush className="empty-icon" />
                <p>Henüz özel tema oluşturmadınız</p>
                <span>Tema Oluştur sekmesinden yeni bir tema yapabilirsiniz</span>
            </div>
        );
    }

    return (
        <div className="custom-themes-list">
            {themes.map(theme => (
                <div key={theme.id} className="custom-theme-item">
                    <div
                        className="theme-color-bar"
                        style={{
                            background: `linear-gradient(90deg, ${theme.primary_color}, ${theme.secondary_color}, ${theme.accent_color})`
                        }}
                    />
                    <div className="theme-details">
                        <h4>{theme.name}</h4>
                        <span className="theme-date">
                            {new Date(theme.created_at).toLocaleDateString('tr-TR')}
                        </span>
                    </div>
                    <div className="theme-actions">
                        <button className="apply-btn" onClick={() => onApply(theme)}>
                            <FaCheck /> Uygula
                        </button>
                        <button className="delete-btn" onClick={() => onDelete(theme.id)}>
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Theme Creator
const ThemeCreator = ({ theme, setTheme, onSave }) => {
    const colorFields = [
        { key: 'primary_color', label: 'Ana Renk', icon: <FaMagic /> },
        { key: 'secondary_color', label: 'İkincil Renk', icon: <FaPalette /> },
        { key: 'accent_color', label: 'Vurgu Rengi', icon: <FaStar /> },
        { key: 'background_color', label: 'Arka Plan', icon: <FaMoon /> },
        { key: 'surface_color', label: 'Yüzey Rengi', icon: <FaCloudMoon /> },
        { key: 'text_color', label: 'Metin Rengi', icon: <FaPaintBrush /> },
        { key: 'muted_color', label: 'Soluk Metin', icon: <FaSnowflake /> },
        { key: 'sidebar_color', label: 'Kenar Çubuğu', icon: <FaLeaf /> },
        { key: 'chat_background', label: 'Sohbet Arka Plan', icon: <FaFire /> }
    ];

    return (
        <div className="theme-creator">
            <div className="creator-form">
                <div className="form-group">
                    <label>Tema Adı</label>
                    <input
                        type="text"
                        value={theme.name}
                        onChange={(e) => setTheme(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Harika Temam"
                    />
                </div>

                <div className="colors-grid">
                    {colorFields.map(field => (
                        <div key={field.key} className="color-field">
                            <label>
                                {field.icon} {field.label}
                            </label>
                            <div className="color-input-wrapper">
                                <input
                                    type="color"
                                    value={theme[field.key]}
                                    onChange={(e) => setTheme(prev => ({ ...prev, [field.key]: e.target.value }))}
                                />
                                <input
                                    type="text"
                                    value={theme[field.key]}
                                    onChange={(e) => setTheme(prev => ({ ...prev, [field.key]: e.target.value }))}
                                    placeholder="#000000"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button className="save-theme-btn" onClick={onSave}>
                    <FaSave /> Temayı Kaydet
                </button>
            </div>

            <div className="creator-preview">
                <h4>Önizleme</h4>
                <div
                    className="preview-window"
                    style={{
                        background: theme.background_color,
                        color: theme.text_color
                    }}
                >
                    <div
                        className="preview-sidebar"
                        style={{ background: theme.sidebar_color }}
                    >
                        <div className="preview-server" style={{ background: theme.primary_color }} />
                        <div className="preview-server" style={{ background: theme.secondary_color }} />
                    </div>
                    <div className="preview-main">
                        <div
                            className="preview-header"
                            style={{ background: theme.surface_color }}
                        >
                            <span style={{ color: theme.text_color }}>#{theme.name || 'kanal'}</span>
                        </div>
                        <div
                            className="preview-chat"
                            style={{ background: theme.chat_background }}
                        >
                            <div className="preview-message">
                                <div
                                    className="avatar"
                                    style={{ background: theme.accent_color }}
                                />
                                <div className="content">
                                    <span style={{ color: theme.primary_color }}>Kullanıcı</span>
                                    <p style={{ color: theme.text_color }}>Merhaba!</p>
                                </div>
                            </div>
                            <div className="preview-message">
                                <div
                                    className="avatar"
                                    style={{ background: theme.secondary_color }}
                                />
                                <div className="content">
                                    <span style={{ color: theme.secondary_color }}>Başka biri</span>
                                    <p style={{ color: theme.muted_color }}>Bu bir önizleme</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Theme Preview Modal
const ThemePreview = ({ theme, onClose, onApply }) => {
    return (
        <div className="theme-preview-modal">
            <div className="preview-modal-content">
                <h3>"{theme.name}" Önizlemesi</h3>
                <div
                    className="full-preview"
                    style={{
                        background: theme.colors.background
                    }}
                >
                    <div
                        className="preview-panel"
                        style={{ background: theme.colors.surface }}
                    >
                        <div
                            className="preview-btn-sample"
                            style={{ background: theme.colors.primary }}
                        >
                            Ana Buton
                        </div>
                        <div
                            className="preview-btn-sample secondary"
                            style={{ background: theme.colors.secondary }}
                        >
                            İkincil Buton
                        </div>
                        <div
                            className="preview-btn-sample accent"
                            style={{ background: theme.colors.accent }}
                        >
                            Vurgu
                        </div>
                        <p style={{ color: theme.colors.text }}>
                            Örnek metin içeriği
                        </p>
                    </div>
                </div>
                <div className="preview-modal-actions">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button className="apply-btn" onClick={onApply}>
                        <FaCheck /> Temayı Uygula
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThemePresetsPanel;

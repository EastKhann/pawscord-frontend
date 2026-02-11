// frontend/src/components/ProfileCustomization.js
/**
 * 🎨 PROFILE CUSTOMIZATION - Custom banners, themes, and profile styling
 */

import { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaPalette, FaUpload, FaSave, FaUndo } from 'react-icons/fa';

const ProfileCustomization = ({ userId, fetchWithAuth, apiBaseUrl }) => {
    const [customization, setCustomization] = useState({
        banner_url: '',
        banner_color: '#5865f2',
        theme_color: '#5865f2',
        accent_color: '#5865f2',
        bio_text: '',
        bio_background_color: '#2b2d31',
        show_badges: true,
        show_activity: true
    });
    const [previewMode, setPreviewMode] = useState(false);
    const [loading, setLoading] = useState(true);

    const themePresets = [
        { name: 'Discord Purple', primary: '#5865f2', accent: '#4752c4', bg: '#2b2d31' },
        { name: 'Sunset Orange', primary: '#f26522', accent: '#e04e1b', bg: '#2d2420' },
        { name: 'Forest Green', primary: '#3ba55d', accent: '#2d7d46', bg: '#1f2b23' },
        { name: 'Ocean Blue', primary: '#3498db', accent: '#2980b9', bg: '#1e2838' },
        { name: 'Rose Pink', primary: '#e91e63', accent: '#c2185b', bg: '#2d1f26' },
        { name: 'Golden Yellow', primary: '#faa61a', accent: '#f57c00', bg: '#2d2819' },
        { name: 'Dark Red', primary: '#ed4245', accent: '#c03537', bg: '#2d1e1f' },
        { name: 'Cyber Purple', primary: '#9b59b6', accent: '#8e44ad', bg: '#251f2d' }
    ];

    useEffect(() => {
        loadCustomization();
    }, [userId]);

    const loadCustomization = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/users/${userId}/customization/`);
            const data = await response.json();
            if (data.customization) {
                setCustomization(data.customization);
            }
        } catch (error) {
            console.error('Failed to load customization:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveCustomization = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/users/${userId}/customization/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customization)
            });

            if (response.ok) {
                toast.success('✅ Profil özelleştirmeleri kaydedildi!');
            }
        } catch (error) {
            console.error('Failed to save customization:', error);
        }
    };

    const applyPreset = (preset) => {
        setCustomization({
            ...customization,
            theme_color: preset.primary,
            accent_color: preset.accent,
            bio_background_color: preset.bg,
            banner_color: preset.primary
        });
    };

    const uploadBanner = async (file) => {
        const formData = new FormData();
        formData.append('banner', file);

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/users/${userId}/upload-banner/`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.banner_url) {
                setCustomization({ ...customization, banner_url: data.banner_url });
            }
        } catch (error) {
            console.error('Failed to upload banner:', error);
        }
    };

    if (loading) return <div style={styles.loading}>Yükleniyor...</div>;

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h2 style={styles.title}><FaPalette /> Profil Özelleştirme</h2>
                <div style={styles.headerActions}>
                    <button
                        onClick={() => setPreviewMode(!previewMode)}
                        style={previewMode ? styles.previewButtonActive : styles.previewButton}
                    >
                        {previewMode ? 'Düzenleme' : 'Önizleme'}
                    </button>
                    <button onClick={saveCustomization} style={styles.saveButton}>
                        <FaSave /> Kaydet
                    </button>
                </div>
            </div>

            {previewMode ? (
                /* PREVIEW MODE */
                <div style={styles.preview}>
                    <div style={{
                        ...styles.previewBanner,
                        backgroundColor: customization.banner_color,
                        backgroundImage: customization.banner_url ? `url(${customization.banner_url})` : 'none'
                    }}>
                    </div>
                    <div style={styles.previewContent}>
                        <div style={{
                            ...styles.previewAvatar,
                            border: `4px solid ${customization.theme_color}`
                        }}>
                            👤
                        </div>
                        <div style={styles.previewInfo}>
                            <h3 style={{ color: customization.theme_color }}>Kullanıcı Adı</h3>
                            <p style={{
                                backgroundColor: customization.bio_background_color,
                                color: '#fff',
                                padding: '12px',
                                borderRadius: '8px',
                                borderLeft: `3px solid ${customization.accent_color}`
                            }}>
                                {customization.bio_text || 'Buraya biyografi metni gelecek...'}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                /* EDIT MODE */
                <div style={styles.editContainer}>
                    {/* Banner Settings */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>🖼️ Banner</h3>
                        <div style={styles.bannerOptions}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Banner Resmi</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => e.target.files[0] && uploadBanner(e.target.files[0])}
                                    style={styles.fileInput}
                                />
                                <button
                                    onClick={() => document.querySelector('input[type="file"]').click()}
                                    style={styles.uploadButton}
                                >
                                    <FaUpload /> Resim Yükle
                                </button>
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Banner Rengi (resim yoksa)</label>
                                <input
                                    type="color"
                                    value={customization.banner_color}
                                    onChange={(e) => setCustomization({ ...customization, banner_color: e.target.value })}
                                    style={styles.colorInput}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Theme Presets */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>🎨 Hazır Temalar</h3>
                        <div style={styles.presetGrid}>
                            {themePresets.map((preset, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => applyPreset(preset)}
                                    style={{
                                        ...styles.presetCard,
                                        background: `linear-gradient(135deg, ${preset.primary}, ${preset.accent})`
                                    }}
                                >
                                    <span style={styles.presetName}>{preset.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Color Settings */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>🎨 Renkler</h3>
                        <div style={styles.colorGrid}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Ana Tema Rengi</label>
                                <input
                                    type="color"
                                    value={customization.theme_color}
                                    onChange={(e) => setCustomization({ ...customization, theme_color: e.target.value })}
                                    style={styles.colorInput}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Vurgu Rengi</label>
                                <input
                                    type="color"
                                    value={customization.accent_color}
                                    onChange={(e) => setCustomization({ ...customization, accent_color: e.target.value })}
                                    style={styles.colorInput}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Biyografi Arka Plan</label>
                                <input
                                    type="color"
                                    value={customization.bio_background_color}
                                    onChange={(e) => setCustomization({ ...customization, bio_background_color: e.target.value })}
                                    style={styles.colorInput}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bio Settings */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>📝 Biyografi</h3>
                        <textarea
                            value={customization.bio_text}
                            onChange={(e) => setCustomization({ ...customization, bio_text: e.target.value })}
                            placeholder="Biyografini buraya yaz..."
                            style={styles.bioTextarea}
                            maxLength={190}
                        />
                        <div style={styles.charCount}>
                            {customization.bio_text.length} / 190 karakter
                        </div>
                    </div>

                    {/* Display Settings */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>⚙️ Görünüm Ayarları</h3>
                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={customization.show_badges}
                                onChange={(e) => setCustomization({ ...customization, show_badges: e.target.checked })}
                            />
                            <span>Rozetleri göster</span>
                        </label>
                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={customization.show_activity}
                                onChange={(e) => setCustomization({ ...customization, show_activity: e.target.checked })}
                            />
                            <span>Aktiviteyi göster</span>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#313338',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid #1e1f22',
        backgroundColor: '#2b2d31'
    },
    title: {
        margin: 0,
        color: '#fff',
        fontSize: '20px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    headerActions: {
        display: 'flex',
        gap: '12px'
    },
    previewButton: {
        backgroundColor: '#383a40',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500'
    },
    previewButtonActive: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500'
    },
    saveButton: {
        backgroundColor: '#3ba55d',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    editContainer: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    section: {
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '16px'
    },
    sectionTitle: {
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '16px'
    },
    inputGroup: {
        marginBottom: '16px'
    },
    label: {
        display: 'block',
        color: '#b5bac1',
        fontSize: '14px',
        marginBottom: '8px',
        fontWeight: '500'
    },
    colorInput: {
        width: '100%',
        height: '50px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    fileInput: {
        display: 'none'
    },
    uploadButton: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    presetGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '12px'
    },
    presetCard: {
        padding: '20px',
        borderRadius: '8px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'transform 0.2s'
    },
    presetName: {
        color: '#fff',
        fontSize: '13px',
        fontWeight: '600',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    },
    colorGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px'
    },
    bioTextarea: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#1e1f22',
        border: '1px solid #1e1f22',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        resize: 'vertical',
        minHeight: '100px',
        fontFamily: 'inherit'
    },
    charCount: {
        textAlign: 'right',
        color: '#b5bac1',
        fontSize: '12px',
        marginTop: '8px'
    },
    checkbox: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: '#b5bac1',
        fontSize: '14px',
        marginBottom: '12px',
        cursor: 'pointer'
    },
    preview: {
        flex: 1,
        overflowY: 'auto',
        padding: '40px'
    },
    previewBanner: {
        width: '100%',
        height: '200px',
        borderRadius: '8px 8px 0 0',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    previewContent: {
        backgroundColor: '#2b2d31',
        borderRadius: '0 0 8px 8px',
        padding: '60px 20px 20px',
        position: 'relative'
    },
    previewAvatar: {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        backgroundColor: '#5865f2',
        position: 'absolute',
        top: '-60px',
        left: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px'
    },
    previewInfo: {
        marginTop: '20px'
    },
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#b5bac1'
    }
};

export default ProfileCustomization;



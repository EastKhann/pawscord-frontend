/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPalette, FaUpload, FaSave } from 'react-icons/fa';
import useProfileCustomization from '../ProfileCustomization/useProfileCustomization';
import { styles, THEME_PRESETS } from '../ProfileCustomization/profileCustomizationStyles';
import { useTranslation } from 'react-i18next';

const ProfileCustomization = ({ userId, fetchWithAuth, apiBaseUrl }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const {
        customization,
        previewMode,
        setPreviewMode,
        loading,
        saveCustomization,
        applyPreset,
        uploadBanner,
        updateField,
    } = useProfileCustomization(userId, fetchWithAuth, apiBaseUrl);

    if (loading) return <div style={styles.loading}>{t('common.loading')}</div>;
    const previewBannerStyle = {
        ...styles.previewBanner,
        backgroundColor: customization.banner_color,
        backgroundImage: customization.banner_url ? `url(${customization.banner_url})` : 'none',
    };
    const previewAvatarStyle = {
        ...styles.previewAvatar,
        border: `4px solid ${customization.theme_color}`,
    };
    const previewNameStyle = { color: customization.theme_color };
    const previewBioStyle = {
        backgroundColor: customization.bio_background_color,
        color: '#fff',
        padding: '12px',
        borderRadius: '8px',
        borderLeft: `3px solid ${customization.accent_color}`,
    };
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>
                    <FaPalette /> {t('profile.customization')}
                </h2>
                <div style={styles.headerActions}>
                    <button
                        aria-label={previewMode ? t('profile.editMode', 'Edit mode') : t('profile.previewMode', 'Preview mode')}
                    style={previewMode ? styles.previewButtonActive : styles.previewButton}
                    >
                    {previewMode ? t('profile.edit') : t('profile.preview')}
                </button>
                <button
                    aria-label={t('profile.saveCustomization', 'Save customization')}
                    onClick={saveCustomization}
                    style={styles.saveButton}
                >
                    <FaSave /> {t('common.save')}
                </button>
            </div>
        </div>

            {
        previewMode ? (
            <div style={styles.preview}>
                <div style={previewBannerStyle} />
                <div style={styles.previewContent}>
                    <div style={previewAvatarStyle}>👤</div>
                    <div style={styles.previewInfo}>
                        <h3 style={previewNameStyle}>{t('profile.username')}</h3>
                        <p style={previewBioStyle}>
                            {customization.bio_text || t('profile.bioPlaceholder')}
                        </p>
                    </div>
                </div>
            </div>
        ) : (
            <div style={styles.editContainer}>
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>🖼️ {t('profile.banner')}</h3>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>{t('profile.bannerImage')}</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                e.target.files[0] && uploadBanner(e.target.files[0])
                            }
                            style={styles.fileInput}
                        />
                        <button
                            aria-label={t('profile.uploadBanner', 'Upload banner image')}
                            onClick={() => document.querySelector('input[type="file"]').click()}
                            style={styles.uploadButton}
                        >
                            <FaUpload /> {t('profile.uploadImage')}
                        </button>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>{t('profile.bannerColor')}</label>
                        <input
                            type="color"
                            value={customization.banner_color}
                            onChange={(e) => updateField('banner_color', e.target.value)}
                            style={styles.colorInput}
                        />
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>🎨 {t('profile.themePresets')}</h3>
                    <div style={styles.presetGrid}>
                        {THEME_PRESETS.map((preset, idx) => {
                            const presetCardStyle = {
                                ...styles.presetCard,
                                background: `linear-gradient(135deg, ${preset.primary}, ${preset.accent})`,
                            };
                            return (
                                <div
                                    key={`item-${idx}`}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => applyPreset(preset)}
                                    style={presetCardStyle}
                                    onKeyDown={(e) =>
                                        (e.key === 'Enter' || e.key === ' ') &&
                                        e.currentTarget.click()
                                    }
                                >
                                    <span style={styles.presetName}>{preset.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>🎨 {t('profile.colors')}</h3>
                    <div style={styles.colorGrid}>
                        {[
                            { field: 'theme_color', label: t('profile.themeColor') },
                            { field: 'accent_color', label: t('profile.accentColor') },
                            {
                                field: 'bio_background_color',
                                label: t('profile.bioBackground'),
                            },
                        ].map((c) => (
                            <div key={c.field} style={styles.inputGroup}>
                                <label style={styles.label}>{c.label}</label>
                                <input
                                    type="color"
                                    value={customization[c.field]}
                                    onChange={(e) => updateField(c.field, e.target.value)}
                                    style={styles.colorInput}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>📝 {t('profile.bio')}</h3>
                    <textarea
                        value={customization.bio_text}
                        onChange={(e) => updateField('bio_text', e.target.value)}
                        placeholder={t('profile.bioWritePlaceholder')}
                        style={styles.bioTextarea}
                        maxLength={190}
                    />
                    <div style={styles.charCount}>
                        {customization.bio_text.length} / 190 {t('profile.characters')}
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>⚙️ {t('profile.appearanceSettings')}</h3>
                    {[
                        { field: 'show_badges', label: t('ui.rozetleri_goster') },
                        { field: 'show_activity', label: t('ui.aktiviteyi_goster') },
                    ].map((opt) => (
                        <label key={opt.field} style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={customization[opt.field]}
                                onChange={(e) => updateField(opt.field, e.target.checked)}
                            />
                            <span>{opt.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        )
    }
        </div >
    );
};

ProfileCustomization.propTypes = {
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default ProfileCustomization;

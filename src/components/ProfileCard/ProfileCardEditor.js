/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback, memo } from 'react';
import useProfileCardEditor from './useProfileCardEditor';
import { ProfileCard } from '../profile/ProfileCard';
import '../profile/ProfileCard.css';

import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

export const ProfileCardEditor = memo(({ onClose, onSave }) => {
    const { t } = useTranslation();
    const e = useProfileCardEditor(onClose, onSave);
    const { setActiveTab, setFormData, setNewLink } = e;

    const handleOverlayClick = useCallback(
        (ev) => {
            if (ev.target === ev.currentTarget) onClose();
        },
        [onClose]
    );
    const handleTabAppearance = useCallback(() => setActiveTab('appearance'), [setActiveTab]);
    const handleTabBadges = useCallback(() => setActiveTab('badges'), [setActiveTab]);
    const handleTabLinks = useCallback(() => setActiveTab('links'), [setActiveTab]);
    const handleBannerChange = useCallback(
        (ev) => setFormData((prev) => ({ ...prev, banner: ev.target.value })),
        [setFormData]
    );
    const handleBannerColorChange = useCallback(
        (ev) => setFormData((prev) => ({ ...prev, banner_color: ev.target.value })),
        [setFormData]
    );
    const handleThemeSelect = useCallback(
        (themeId) => setFormData((prev) => ({ ...prev, theme: themeId })),
        [setFormData]
    );
    const handleBioChange = useCallback(
        (ev) => setFormData((prev) => ({ ...prev, bio: ev.target.value.slice(0, 500) })),
        [setFormData]
    );
    const handleLinkNameChange = useCallback(
        (ev) => setNewLink((prev) => ({ ...prev, name: ev.target.value })),
        [setNewLink]
    );
    const handleLinkUrlChange = useCallback(
        (ev) => setNewLink((prev) => ({ ...prev, url: ev.target.value })),
        [setNewLink]
    );

    if (e.loading) {
        return (
            <div className="profile-editor-modal">
                <div className="editor-loading">
                    <div className="loading-spinner" />
                </div>
            </div>
        );
    }

    return (
        <div
            className="profile-editor-overlay"
            role="button"
            tabIndex={0}
            onClick={handleOverlayClick}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div className="profile-editor-modal">
                {/* Header */}
                <div className="editor-header">
                    <h2>🎨 {t('profileCard.editTitle', 'Profil Kartı Edit')}</h2>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                {/* Tabs */}
                <div className="editor-tabs">
                    <button
                        className={e.activeTab === 'appearance' ? 'active' : ''}
                        onClick={handleTabAppearance}
                    >
                        🎨 {t('profileCard.appearance', 'Appearance')}
                    </button>
                    <button
                        className={e.activeTab === 'badges' ? 'active' : ''}
                        onClick={handleTabBadges}
                    >
                        🏅 {t('profileCard.badges', 'Rozetler')}
                    </button>
                    <button
                        className={e.activeTab === 'links' ? 'active' : ''}
                        onClick={handleTabLinks}
                    >
                        🔗 {t('profileCard.connections', 'Connections')}
                    </button>
                </div>

                {/* Content */}
                <div className="editor-content">
                    {e.activeTab === 'appearance' && (
                        <div className="appearance-tab">
                            <div className="form-group">
                                <label>Banner URL</label>
                                <input
                                    type="url"
                                    placeholder="https://..."
                                    value={e.formData.banner}
                                    onChange={handleBannerChange}
                                    aria-label="https://..."
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    {t('profileCard.bannerColor', 'Banner Rengi (image yoksa)')}
                                </label>
                                <div className="color-picker">
                                    <input
                                        type="color"
                                        value={e.formData.banner_color}
                                        onChange={handleBannerColorChange}
                                        aria-label="color"
                                    />
                                    <span>{e.formData.banner_color}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>{t('profileCard.theme', 'Tema')}</label>
                                <div className="theme-grid">
                                    {e.themes.map((theme) => {
                                        const themeStyle = {
                                            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                                        };
                                        const accentStyle = { backgroundColor: theme.accent };
                                        return (
                                            <div
                                                key={theme.id}
                                                className={`theme-option ${e.formData.theme === theme.id ? 'selected' : ''}`}
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => handleThemeSelect(theme.id)}
                                                style={themeStyle}
                                                onKeyDown={(e) =>
                                                    (e.key === 'Enter' || e.key === ' ') &&
                                                    e.currentTarget.click()
                                                }
                                            >
                                                <span className="theme-name">{theme.id}</span>
                                                <div className="theme-colors">
                                                    <span style={accentStyle} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>{t('profileCard.bio', 'Biyografi')}</label>
                                <textarea
                                    placeholder={t('ui.write_about_yourself')}
                                    value={e.formData.bio}
                                    onChange={handleBioChange}
                                    rows={4}
                                    maxLength={500}
                                    aria-label="Write something about yourself..."
                                />
                                <span className="char-count">{e.formData.bio.length}/500</span>
                            </div>
                        </div>
                    )}

                    {e.activeTab === 'badges' && (
                        <div className="badges-tab">
                            <p className="badges-hint">
                                {t(
                                    'profileCard.badgesHint',
                                    'Profilinizde görüntülenecek en fazla 3 rozet seçin'
                                )}
                            </p>
                            <div className="badges-grid">
                                {e.badges.map((badge) => {
                                    const badgeStyle = { backgroundColor: badge.color };
                                    return (
                                        <div
                                            key={badge.id}
                                            className={`badge-option ${!badge.owned ? 'locked' : ''} ${e.selectedBadges.includes(badge.id) ? 'selected' : ''}`}
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => badge.owned && e.toggleBadge(badge.id)}
                                            onKeyDown={(e) =>
                                                (e.key === 'Enter' || e.key === ' ') &&
                                                e.currentTarget.click()
                                            }
                                        >
                                            <span className="badge-icon" style={badgeStyle}>
                                                {badge.icon}
                                            </span>
                                            <span className="badge-name">{badge.name}</span>
                                            {!badge.owned && <span className="lock-icon">🔒</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {e.activeTab === 'links' && (
                        <div className="links-tab">
                            <p className="links-hint">
                                {t('profileCard.linksHint', 'En fazla 5 bağlantı addyebilirsiniz')}
                            </p>
                            <div className="current-links">
                                {e.formData.links.map((link, idx) => (
                                    <div key={`item-${idx}`} className="link-row">
                                        <span className="link-icon">{link.icon}</span>
                                        <span className="link-name">{link.name}</span>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="link-url"
                                        >
                                            {link.url.slice(0, 40)}...
                                        </a>
                                        <button
                                            className="remove-link"
                                            onClick={() => e.handleRemoveLink(idx)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {e.formData.links.length < 5 && (
                                <div className="add-link-form">
                                    <input
                                        type="text"
                                        placeholder="Ad (opsiyonel)"
                                        value={e.newLink.name}
                                        onChange={handleLinkNameChange}
                                        aria-label="Ad (opsiyonel)"
                                    />
                                    <input
                                        type="url"
                                        placeholder="URL"
                                        value={e.newLink.url}
                                        onChange={handleLinkUrlChange}
                                        aria-label="URL"
                                    />
                                    <button onClick={e.handleAddLink}>
                                        {t('common.add', 'Add')}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Preview */}
                <div className="editor-preview">
                    <h4>{t('profileCard.preview', 'Previewme')}</h4>
                    <ProfileCard username={e.profile?.username} compact />
                </div>

                {/* Footer */}
                <div className="editor-footer">
                    <button className="cancel-btn" onClick={onClose}>
                        {t('common.cancel')}
                    </button>
                    <button className="save-btn" onClick={e.handleSave} disabled={e.saving}>
                        {e.saving
                            ? t('common.saving', 'Kaydediliyor...')
                            : t('common.save', 'Kaydet')}
                    </button>
                </div>
            </div>
        </div>
    );
});

ProfileCardEditor.displayName = 'ProfileCardEditor';

ProfileCardEditor.propTypes = {};

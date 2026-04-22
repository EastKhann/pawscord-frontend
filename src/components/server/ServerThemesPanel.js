/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/ServerThemesPanel.js
import { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaPalette, FaPlus, FaCheck } from 'react-icons/fa';
import toast from '../../utils/toast';
import logger from '../../utils/logger';
import { useTranslation } from 'react-i18next';

// -- dynamic style helpers (pass 2) --

/**
 * 🎨 Server Themes Panel
 * Server tema privateleştirme
 */

const _st1169 = { flex: 1, height: '100%', borderRadius: '4px 0 0 4px' };
const _st1170 = { flex: 1, height: '100%' };
const _st1171 = { flex: 1, height: '100%' };
const _st1172 = { flex: 1, height: '100%', borderRadius: '0 4px 4px 0' };

const ServerThemesPanel = ({ fetchWithAuth, apiBaseUrl, serverId, onClose }) => {
    const { t } = useTranslation();
    const [themes, setThemes] = useState([]);
    const [activeTheme, setActiveTheme] = useState(null);
    const [customTheme, setCustomTheme] = useState({
        name: '',
        primary_color: '#5865f2',
        secondary_color: '#111214',
        background_color: '#1e1e1e',
        text_color: '#ffffff',
        accent_color: '#23a559',
    });
    const [loading, setLoading] = useState(true);

    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleNameChange = useCallback(
        (e) => setCustomTheme((prev) => ({ ...prev, name: e.target.value })),
        []
    );
    const handlePrimaryChange = useCallback(
        (e) => setCustomTheme((prev) => ({ ...prev, primary_color: e.target.value })),
        []
    );
    const handleSecondaryChange = useCallback(
        (e) => setCustomTheme((prev) => ({ ...prev, secondary_color: e.target.value })),
        []
    );
    const handleBgChange = useCallback(
        (e) => setCustomTheme((prev) => ({ ...prev, background_color: e.target.value })),
        []
    );
    const handleTextColorChange = useCallback(
        (e) => setCustomTheme((prev) => ({ ...prev, text_color: e.target.value })),
        []
    );
    const handleAccentChange = useCallback(
        (e) => setCustomTheme((prev) => ({ ...prev, accent_color: e.target.value })),
        []
    );

    const presetThemes = [
        {
            name: 'Discord Classic',
            primary_color: '#5865f2',
            secondary_color: '#111214',
            background_color: '#1e1e1e',
            text_color: '#ffffff',
            accent_color: '#23a559',
        },
        {
            name: 'Dark Purple',
            primary_color: '#5865f2',
            secondary_color: '#111214',
            background_color: '#0d0e10',
            text_color: '#ffffff',
            accent_color: '#949ba4',
        },
        {
            name: 'Ocean Blue',
            primary_color: '#4a9eff',
            secondary_color: '#1a3a52',
            background_color: '#0d2137',
            text_color: '#e3f2fd',
            accent_color: '#00bcd4',
        },
        {
            name: 'Forest Green',
            primary_color: '#4caf50',
            secondary_color: '#1b5e20',
            background_color: '#0d3b0d',
            text_color: '#e8f5e9',
            accent_color: '#8bc34a',
        },
        {
            name: 'Sunset Orange',
            primary_color: '#ff9800',
            secondary_color: '#e65100',
            background_color: '#3e2723',
            text_color: '#fff3e0',
            accent_color: '#ffb74d',
        },
        {
            name: 'Midnight Black',
            primary_color: '#424242',
            secondary_color: '#212121',
            background_color: '#000000',
            text_color: '#e0e0e0',
            accent_color: '#757575',
        },
    ];

    useEffect(() => {
        loadThemes();
    }, []);

    const loadThemes = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/themes/`);
            if (response.ok) {
                const data = await response.json();
                setThemes(data.themes || []);
                setActiveTheme(data.active_theme);
            }
        } catch (error) {
            logger.error('Theme load error:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyTheme = async (theme) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/theme/apply/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(theme),
            });

            if (response.ok) {
                toast.success(t('theme.applied'));
                setActiveTheme(theme);
            } else {
                toast.error(t('theme.applyFailed'));
            }
        } catch (error) {
            logger.error('Theme apply error:', error);
            toast.error(t('common.errorOccurred'));
        }
    };

    const saveCustomTheme = async () => {
        if (!customTheme.name.trim()) {
            toast.error(t('theme.nameRequired'));
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/theme/save/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customTheme),
            });

            if (response.ok) {
                toast.success(t('theme.customSaved'));
                loadThemes();
                setCustomTheme({
                    name: '',
                    primary_color: '#5865f2',
                    secondary_color: '#111214',
                    background_color: '#1e1e1e',
                    text_color: '#ffffff',
                    accent_color: '#23a559',
                });
            } else {
                toast.error(t('theme.saveFailed'));
            }
        } catch (error) {
            logger.error('Theme save error:', error);
            toast.error(t('common.errorOccurred'));
        }
    };

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.modal}
                role="button"
                tabIndex={0}
                onClick={handleStopPropagation}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={styles.header}>
                    <div className="flex-align-10">
                        <FaPalette className="icon-primary" />
                        <h2 className="m-0">{t('serverThemes.title', 'Server Themes')}</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.content}>
                    <section style={styles.section}>
                        <h3 style={styles.sectionTitle}>{t('serverThemes.presets', 'Preset Themes')}</h3>
                        <div style={styles.themeGrid}>
                            {presetThemes.map((theme, index) => (
                                <div
                                    key={`item-${index}`}
                                    style={styles.themeCard}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => applyTheme(theme)}
                                    onKeyDown={(e) =>
                                        (e.key === 'Enter' || e.key === ' ') &&
                                        e.currentTarget.click()
                                    }
                                >
                                    <div style={styles.themePreview}>
                                        <div style={_st1169} />
                                        <div style={_st1170} />
                                        <div style={_st1171} />
                                        <div style={_st1172} />
                                    </div>
                                    <div style={styles.themeName}>{theme.name}</div>
                                    {activeTheme?.name === theme.name && (
                                        <FaCheck style={styles.activeCheck} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={styles.section}>
                        <h3 style={styles.sectionTitle}>{t('serverThemes.createCustom', 'Create Custom Theme')}</h3>
                        <div style={styles.customForm}>
                            <input
                                type="text"
                                placeholder={t('serverThemes.themeName', 'Theme Name')}
                                value={customTheme.name}
                                onChange={handleNameChange}
                                style={styles.input}
                                aria-label={t('serverThemes.themeName', 'Theme name')}
                            />
                            <div style={styles.colorGrid}>
                                <div style={styles.colorField}>
                                    <label>Ana Renk</label>
                                    <input
                                        type="color"
                                        value={customTheme.primary_color}
                                        onChange={handlePrimaryChange}
                                        style={styles.colorInput}
                                        aria-label={t('serverThemes.primaryColor', 'Primary color')}
                                    />
                                    <input
                                        type="color"
                                        value={customTheme.secondary_color}
                                        onChange={handleSecondaryChange}
                                        style={styles.colorInput}
                                        aria-label={t('serverThemes.secondaryColor', 'Secondary color')}
                                    />
                                    <input
                                        type="color"
                                        value={customTheme.background_color}
                                        onChange={handleBgChange}
                                        style={styles.colorInput}
                                        aria-label={t('serverThemes.backgroundColor', 'Background color')}
                                    />
                                    <input
                                        type="color"
                                        value={customTheme.text_color}
                                        onChange={handleTextColorChange}
                                        style={styles.colorInput}
                                        aria-label={t('serverThemes.textColor', 'Text color')}
                                    />
                                    <input
                                        type="color"
                                        value={customTheme.accent_color}
                                        onChange={handleAccentChange}
                                        style={styles.colorInput}
                                        aria-label={t('serverThemes.accentColor', 'Accent color')}
                                    />
                                    <button
                                        onClick={saveCustomTheme}
                                        style={styles.saveBtn}
                                    >
                                        <FaPlus /> {t('serverThemes.saveTheme', 'Save Theme')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
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
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #333',
    },
    closeBtn: {
        cursor: 'pointer',
        fontSize: '24px',
        color: '#888',
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
    },
    section: {
        marginBottom: '30px',
    },
    sectionTitle: {
        color: '#dbdee1',
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '15px',
    },
    themeGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '15px',
    },
    themeCard: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        padding: '15px',
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.2s',
    },
    themePreview: {
        display: 'flex',
        height: '60px',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '10px',
    },
    colorStrip: {
        flex: 1,
    },
    themeName: {
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: '500',
    },
    activeCheck: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        color: '#23a559',
        fontSize: '20px',
    },
    customForm: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        padding: '20px',
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        marginBottom: '15px',
    },
    colorGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '15px',
        marginBottom: '15px',
    },
    colorField: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    colorInput: {
        width: '100%',
        height: '50px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    saveBtn: {
        width: '100%',
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
    },
};

ServerThemesPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default memo(ServerThemesPanel);

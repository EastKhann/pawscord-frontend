import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaUser, FaPalette, FaSave, FaRandom, FaCoins, FaBookmark } from 'react-icons/fa';
import useAvatarStudio from '../AvatarStudioPanel/useAvatarStudio';
import AvatarPreview from '../AvatarStudioPanel/AvatarPreview';
import { styles, CATEGORIES } from '../AvatarStudioPanel/avatarStudioStyles';
import { useTranslation } from 'react-i18next';
import { STORE_PURCHASES_ENABLED } from '../../constants/featureFlags';

// -- dynamic style helpers (pass 2) --

const AvatarStudioPanel = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const s = useAvatarStudio(fetchWithAuth, apiBaseUrl);

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaUser className="icon-primary-mr10" />
                        <h2 style={styles.title}>{t('avatar.title', 'Avatar Studio')}</h2>
                    </div>
                    <div style={styles.coinsDisplay}>
                        <FaCoins className="icon-warning" />
                        <span>{s.userCoins}</span>
                    </div>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.tabs}>
                    <button
                        aria-label={t('avatar.customize', 'Customize')}
                        onClick={() => s.setView('customize')}
                        style={s.view === 'customize' ? styles.activeTab : styles.tab}
                    >
                        <FaPalette /> {t('avatar.customize', 'Customize')}
                    </button>
                    <button
                        aria-label={t('avatar.presets', 'Presets')}
                        onClick={() => s.setView('presets')}
                        style={s.view === 'presets' ? styles.activeTab : styles.tab}
                    >
                        <FaBookmark /> {t('avatar.presets', 'Presets')}
                    </button>
                </div>

                <div style={styles.mainContent}>
                    {s.view === 'customize' && (
                        <>
                            <div style={styles.previewSection}>
                                <AvatarPreview avatar={s.avatar} parts={s.parts} />
                                <div style={styles.previewActions}>
                                    <button
                                        aria-label={t('avatar.randomize', 'Randomize avatar')}
                                        onClick={s.randomizeAvatar}
                                        style={styles.actionBtn}
                                    >
                                        <FaRandom /> {t('avatar.random', 'Random')}
                                    </button>
                                    <button
                                        aria-label={t('avatar.savePreset', 'Save preset')}
                                        onClick={s.savePreset}
                                        style={styles.actionBtn}
                                    >
                                        <FaBookmark /> {t('avatar.savePreset', 'Save Preset')}
                                    </button>
                                    <button
                                        aria-label={t('avatar.saveAvatar', 'Save avatar')}
                                        onClick={s.saveAvatar}
                                        style={styles.saveBtn}
                                        disabled={s.loading}
                                    >
                                        <FaSave />{' '}
                                        {s.loading ? t('panels.saving') : t('panels.saveAvatar')}
                                    </button>
                                </div>
                            </div>

                            <div style={styles.customizeSection}>
                                <div style={styles.categoryTabs}>
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            aria-label={t('avatar.switchCategory', cat.name)}
                                            key={cat.id}
                                            onClick={() => s.setActiveCategory(cat.id)}
                                            style={
                                                s.activeCategory === cat.id
                                                    ? styles.catActive
                                                    : styles.catBtn
                                            }
                                        >
                                            <span>{cat.icon}</span>
                                            <span style={styles.catName}>{cat.name}</span>
                                        </button>
                                    ))}
                                </div>

                                <div style={styles.itemsGrid}>
                                    {(s.parts[s.activeCategory] || []).map((item) => {
                                        const isOwned = item.free || s.ownedItems.includes(item.id);
                                        const isSelected = Object.values(s.avatar).includes(
                                            item.id
                                        );
                                        return (
                                            <div
                                                key={item.id}
                                                style={{
                                                    ...styles.itemCard,
                                                    ...(isSelected ? styles.itemSelected : {}),
                                                    ...(!isOwned ? styles.itemLocked : {}),
                                                }}
                                                role="button"
                                                tabIndex={0}
                                                onClick={() =>
                                                    isOwned &&
                                                    s.selectPart(s.activeCategory, item.id)
                                                }
                                                onKeyDown={(e) =>
                                                    (e.key === 'Enter' || e.key === ' ') &&
                                                    e.currentTarget.click()
                                                }
                                            >
                                                {item.color &&
                                                    !['gradient', 'galaxy', 'rainbow'].includes(
                                                        item.color
                                                    ) ? (
                                                    <div />
                                                ) : (
                                                    <span style={styles.itemPreview}>
                                                        {(item.name || item.id)
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                )}
                                                <span style={styles.itemName}>
                                                    {item.name || item.id}
                                                </span>
                                                {!isOwned &&
                                                    (STORE_PURCHASES_ENABLED ? (
                                                        <button
                                                            aria-label={t('avatar.purchaseItem', 'Purchase item')}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                s.purchaseItem(
                                                                    s.activeCategory,
                                                                    item.id
                                                                );
                                                            }}
                                                            style={styles.buyBtn}
                                                            disabled={
                                                                s.loading ||
                                                                s.userCoins < (item.coins || 0)
                                                            }
                                                        >
                                                            <FaCoins /> {item.coins}
                                                        </button>
                                                    ) : (
                                                        <button disabled>🔒 Soon</button>
                                                    ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}

                    {s.view === 'presets' && (
                        <div style={styles.presetsGrid}>
                            {s.presets.map((preset) => (
                                <div key={preset.id} style={styles.presetCard}>
                                    <AvatarPreview avatar={preset.config} parts={s.parts} mini />
                                    <span style={styles.presetName}>{preset.name}</span>
                                    <button
                                        aria-label={t('avatar.loadPreset', 'Load preset')}
                                        onClick={() => s.loadPreset(preset)}
                                        style={styles.loadBtn}
                                    >
                                        Y\u00fckle
                                    </button>
                                </div>
                            ))}
                            {s.presets.length === 0 && (
                                <p style={styles.emptyText}>{t('avatarStudio.noPresets', 'No saved presets yet')}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

AvatarStudioPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};
export default AvatarStudioPanel;

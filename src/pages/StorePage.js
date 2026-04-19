import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useStorePage, { CATEGORIES, getRarityColor } from './StorePage/useStorePage';
import ItemDetailModal from './StorePage/ItemDetailModal';

// -- extracted inline style constants --

const StorePage = () => {
    const s = useStorePage();
    const { t } = useTranslation();
    const [error, setError] = useState(null);

    return (
        <div>
            {/* HEADER */}
            <div>
                <h1>🛒 {t('store.title')}</h1>
                <div>
                    <div>
                        <span>💰</span>
                        <span>
                            {s.userCoins.toLocaleString()} {t('store.coins')}
                        </span>
                    </div>
                    {s.premiumTier !== 'free' && (
                        <div
                            style={{
                                background:
                                    s.premiumTier === 'elite'
                                        ? 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)'
                                        : 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
                                padding: '12px 24px',
                                borderRadius: '13px',
                                fontWeight: 700,
                                boxShadow:
                                    s.premiumTier === 'elite'
                                        ? '0 4px 0 #922722, 0 8px 20px rgba(231,76,60,0.35)'
                                        : '0 4px 0 #3b45c7, 0 8px 20px rgba(88,101,242,0.35)',
                            }}
                        >
                            {s.premiumTier === 'elite' ? t('store.elite') : t('store.premium')}
                        </div>
                    )}
                </div>
            </div>

            {/* CATEGORIES */}
            <div>
                <div>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            aria-label={cat.name}
                            aria-pressed={s.activeCategory === cat.id}
                            onClick={() => s.setActiveCategory(cat.id)}
                            style={{
                                background:
                                    s.activeCategory === cat.id
                                        ? 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)'
                                        : 'rgba(255,255,255,0.05)',
                                border:
                                    s.activeCategory === cat.id
                                        ? '1px solid #5865F2'
                                        : '1px solid rgba(255,255,255,0.08)',
                                color: '#fff',
                                padding: '12px 24px',
                                borderRadius: '13px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: 600,
                                transition: 'all 0.2s',
                                boxShadow:
                                    s.activeCategory === cat.id
                                        ? '0 4px 0 #3b45c7, 0 8px 20px rgba(88,101,242,0.30)'
                                        : 'none',
                            }}
                            onMouseEnter={(e) => {
                                if (s.activeCategory !== cat.id)
                                    e.target.style.background = 'rgba(255,255,255,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                if (s.activeCategory !== cat.id)
                                    e.target.style.background = 'rgba(255,255,255,0.05)';
                            }}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* ITEMS GRID */}
            <div>
                {s.loading ? (
                    <div>⏳ {t('common.loading')}</div>
                ) : s.items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{ fontSize: '80px', marginBottom: '16px' }}>🏪</div>
                        <h3 style={{ color: '#fff', margin: '0 0 8px', fontSize: '20px' }}>
                            {t('store.comingSoon')}
                        </h3>
                        <p style={{ color: '#949ba4', margin: 0, fontSize: '15px' }}>
                            {t('store.noItems')}
                        </p>
                    </div>
                ) : (
                    <div>
                        {s.items.map((item) => {
                            const owned = s.isOwned(item.item_id);
                            return (
                                <div
                                    key={item.id}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => s.setSelectedItem(item)}
                                    style={{
                                        background: 'rgba(30,31,35,0.88)',
                                        backdropFilter: 'blur(48px) saturate(180%)',
                                        WebkitBackdropFilter: 'blur(48px) saturate(180%)',
                                        borderRadius: '22px',
                                        padding: '20px',
                                        border: `1px solid ${getRarityColor(item.rarity)}30`,
                                        boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 0 24px ${getRarityColor(item.rarity)}20, 0 8px 32px rgba(0,0,0,0.4)`,
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        position: 'relative',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                    onKeyDown={(e) =>
                                        (e.key === 'Enter' || e.key === ' ') &&
                                        e.currentTarget.click()
                                    }
                                >
                                    {owned && <div>✅ {t('store.owned')}</div>}
                                    {item.premium_required && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '10px',
                                                left: '10px',
                                                background:
                                                    item.premium_required === 'elite'
                                                        ? '#E74C3C'
                                                        : '#5865F2',
                                                padding: '4px 12px',
                                                borderRadius: '8px',
                                                fontSize: '12px',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {item.premium_required === 'elite'
                                                ? t('store.elite')
                                                : t('store.premium')}
                                        </div>
                                    )}
                                    <div
                                        style={{
                                            height: '150px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '80px',
                                            marginTop: item.premium_required ? '30px' : '0',
                                        }}
                                    >
                                        {item.preview_url || '🎁'}
                                    </div>
                                    <h3
                                        style={{
                                            margin: '16px 0 8px',
                                            fontSize: '20px',
                                            color: getRarityColor(item.rarity),
                                        }}
                                    >
                                        {item.name}
                                    </h3>
                                    <p>{item.description}</p>
                                    <div
                                        style={{
                                            fontSize: '12px',
                                            color: getRarityColor(item.rarity),
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        {item.rarity}
                                    </div>
                                    <div>
                                        <div>
                                            {item.price === 0
                                                ? t('store.free')
                                                : `${item.price} 💰`}
                                        </div>
                                        {!owned && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    s.handlePurchase(item);
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.transform = 'scale(1.05)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.transform = 'scale(1)';
                                                }}
                                                aria-label={t('store.buyNow')}
                                            >
                                                {t('store.buyNow')}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {s.selectedItem && (
                <ItemDetailModal
                    item={s.selectedItem}
                    isOwned={s.isOwned(s.selectedItem.item_id)}
                    onPurchase={s.handlePurchase}
                    onClose={() => s.setSelectedItem(null)}
                />
            )}
        </div>
    );
};

StorePage.propTypes = {};
export default StorePage;

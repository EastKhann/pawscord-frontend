import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useStorePage, { CATEGORIES, getRarityColor } from './StorePage/useStorePage';
import ItemDetailModal from './StorePage/ItemDetailModal';

// ── Style constants ──────────────────────────────────────────────────────────
const S = {
    page: {
        minHeight: '100%',
        background: 'linear-gradient(160deg, #0d0e12 0%, #111318 60%, #0a0b0f 100%)',
        color: '#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        overflowY: 'auto',
    },
    // Header banner
    header: {
        background: 'linear-gradient(135deg, #5865f2 0%, #4752c4 50%, #3b45c7 100%)',
        padding: '32px 28px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: '0 4px 24px rgba(88,101,242,0.35)',
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    headerTitle: {
        margin: 0,
        fontSize: '26px',
        fontWeight: 800,
        letterSpacing: '-0.5px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    headerSub: {
        margin: 0,
        fontSize: '13px',
        color: 'rgba(255,255,255,0.75)',
    },
    coinBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(0,0,0,0.25)',
        borderRadius: '12px',
        padding: '10px 18px',
        fontSize: '16px',
        fontWeight: 700,
        color: '#FFD700',
        backdropFilter: 'blur(8px)',
    },
    premiumBadge: {
        borderRadius: '12px',
        padding: '10px 18px',
        fontWeight: 700,
        fontSize: '13px',
        color: '#fff',
        letterSpacing: '0.3px',
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
    },
    // Category tabs
    tabBar: {
        padding: '20px 28px 0',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        paddingBottom: '0',
    },
    tabBtn: (active) => ({
        background: active ? 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)' : 'transparent',
        border: active ? '1px solid #5865F2' : '1px solid rgba(255,255,255,0.08)',
        color: active ? '#fff' : '#949ba4',
        padding: '9px 18px',
        borderRadius: '10px 10px 0 0',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: active ? 700 : 500,
        transition: 'all 0.2s',
        boxShadow: active ? '0 4px 0 #3b45c7, 0 8px 20px rgba(88,101,242,0.25)' : 'none',
        marginBottom: '-1px',
    }),
    // Grid
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '20px',
        padding: '24px',
    },
    // Empty / loading
    emptyWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        gap: '12px',
    },
    emptyIcon: { fontSize: '72px' },
    emptyTitle: { color: '#fff', margin: '0 0 4px', fontSize: '20px', fontWeight: 700 },
    emptyDesc: { color: '#949ba4', margin: 0, fontSize: '14px' },
    loadingWrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        gap: '8px',
        color: '#949ba4',
        fontSize: '15px',
    },
    // Item card
    card: (rarityColor) => ({
        background: 'rgba(30,31,35,0.9)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        borderRadius: '18px',
        padding: '20px',
        border: `1px solid ${rarityColor}30`,
        boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 0 20px ${rarityColor}18, 0 8px 28px rgba(0,0,0,0.45)`,
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    }),
    ownedBadge: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: '#23a559',
        color: '#fff',
        borderRadius: '8px',
        padding: '3px 10px',
        fontSize: '11px',
        fontWeight: 700,
    },
    premiumTag: (tier) => ({
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: tier === 'elite' ? '#E74C3C' : '#5865F2',
        color: '#fff',
        borderRadius: '8px',
        padding: '3px 10px',
        fontSize: '11px',
        fontWeight: 700,
    }),
    cardPreview: (hasTag) => ({
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '64px',
        marginTop: hasTag ? '26px' : '0',
        marginBottom: '4px',
    }),
    cardName: (rarityColor) => ({
        margin: '12px 0 4px',
        fontSize: '16px',
        fontWeight: 700,
        color: rarityColor,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }),
    cardDesc: {
        margin: '0 0 8px',
        fontSize: '12px',
        color: '#949ba4',
        lineHeight: 1.4,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        flexGrow: 1,
    },
    rarityLabel: (rarityColor) => ({
        fontSize: '10px',
        color: rarityColor,
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '1.2px',
        marginBottom: '12px',
    }),
    cardFooter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'auto',
        paddingTop: '12px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
    },
    priceLabel: {
        fontWeight: 700,
        fontSize: '15px',
        color: '#FFD700',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    buyBtn: {
        background: 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
        border: 'none',
        color: '#fff',
        borderRadius: '8px',
        padding: '8px 16px',
        fontSize: '12px',
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'transform 0.15s ease',
    },
};

const StorePage = () => {
    const s = useStorePage();
    const { t } = useTranslation();
    // error is tracked by useStorePage but kept here for future inline display
    const [_error, _setError] = useState(null);

    return (
        <div style={S.page}>
            {/* ── Header ── */}
            <div style={S.header}>
                <div style={S.headerLeft}>
                    <h1 style={S.headerTitle}>
                        🛒 {t('store.title', 'Pawscord Store')}
                    </h1>
                    <p style={S.headerSub}>
                        {t('store.subtitle', 'Spend your coins on exclusive items')}
                    </p>
                </div>
                <div style={S.headerRight}>
                    <div style={S.coinBadge}>
                        <span>💰</span>
                        <span>{s.userCoins.toLocaleString()}</span>
                        <span style={{ fontSize: '13px', color: 'rgba(255,215,0,0.8)' }}>
                            {t('store.coins', 'coins')}
                        </span>
                    </div>
                    {s.premiumTier !== 'free' && (
                        <div
                            style={{
                                ...S.premiumBadge,
                                background:
                                    s.premiumTier === 'elite'
                                        ? 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)'
                                        : 'linear-gradient(135deg, #f9a825 0%, #e65100 100%)',
                                boxShadow:
                                    s.premiumTier === 'elite'
                                        ? '0 4px 0 #922722, 0 8px 20px rgba(231,76,60,0.35)'
                                        : '0 4px 0 #bf360c, 0 8px 20px rgba(249,168,37,0.35)',
                            }}
                        >
                            {s.premiumTier === 'elite'
                                ? `⚡ ${t('store.elite', 'Elite')}`
                                : `✨ ${t('store.premium', 'Premium')}`}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Category Tabs ── */}
            <div style={S.tabBar} role="tablist" aria-label={t('store.categories', 'Categories')}>
                {CATEGORIES.map((cat) => {
                    const active = s.activeCategory === cat.id;
                    return (
                        <button
                            key={cat.id}
                            role="tab"
                            aria-selected={active}
                            aria-label={cat.name}
                            onClick={() => s.setActiveCategory(cat.id)}
                            style={S.tabBtn(active)}
                            onMouseEnter={(e) => {
                                if (!active) e.currentTarget.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                if (!active) e.currentTarget.style.color = '#949ba4';
                            }}
                        >
                            {cat.icon && <span style={{ marginRight: '8px' }}>{cat.icon}</span>}
                            {cat.name}
                        </button>
                    );
                })}
            </div>

            {/* ── Items Grid ── */}
            {s.loading ? (
                <div style={S.loadingWrap}>
                    <span style={{ fontSize: '22px' }}>⏳</span>
                    {t('common.loading', 'Loading...')}
                </div>
            ) : s.items.length === 0 ? (
                <div style={S.emptyWrap}>
                    <div style={S.emptyIcon}>🏪</div>
                    <h3 style={S.emptyTitle}>{t('store.comingSoon', 'Coming Soon!')}</h3>
                    <p style={S.emptyDesc}>{t('store.noItems', 'No items in this category yet.')}</p>
                </div>
            ) : (
                <div style={S.grid} role="list">
                    {s.items.map((item) => {
                        const owned = s.isOwned(item.item_id);
                        const rarityColor = getRarityColor(item.rarity);
                        return (
                            <div
                                key={item.id}
                                role="button"
                                tabIndex={0}
                                onClick={() => s.setSelectedItem(item)}
                                style={S.card(rarityColor)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.boxShadow = `0 0 0 1px rgba(255,255,255,0.06), 0 0 28px ${rarityColor}28, 0 16px 40px rgba(0,0,0,0.55)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = `0 0 0 1px rgba(255,255,255,0.04), 0 0 20px ${rarityColor}18, 0 8px 28px rgba(0,0,0,0.45)`;
                                }}
                                onKeyDown={(e) =>
                                    (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                                }
                                aria-label={`${item.name} — ${item.rarity}`}
                            >
                                {owned && (
                                    <span style={S.ownedBadge}>✅ {t('store.owned', 'Owned')}</span>
                                )}
                                {item.premium_required && (
                                    <span style={S.premiumTag(item.premium_required)}>
                                        {item.premium_required === 'elite'
                                            ? `⚡ ${t('store.elite', 'Elite')}`
                                            : `✨ ${t('store.premium', 'Premium')}`}
                                    </span>
                                )}
                                <div style={S.cardPreview(!!item.premium_required)}>
                                    {item.preview_url ? (
                                        <img
                                            src={item.preview_url}
                                            alt={item.name}
                                            style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }}
                                        />
                                    ) : (
                                        '🎁'
                                    )}
                                </div>
                                <div style={S.rarityLabel(rarityColor)}>{item.rarity}</div>
                                <h3 style={S.cardName(rarityColor)}>{item.name}</h3>
                                <p style={S.cardDesc}>{item.description}</p>
                                <div style={S.cardFooter}>
                                    <span style={S.priceLabel}>
                                        {item.price === 0 ? t('store.free', 'Free') : `${item.price} 💰`}
                                    </span>
                                    {!owned && (
                                        <button
                                            style={S.buyBtn}
                                            aria-label={t('store.buyNow', 'Buy Now')}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                s.handlePurchase(item);
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                        >
                                            {t('store.buyNow', 'Buy Now')}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

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

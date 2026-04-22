import React from 'react';
import PropTypes from 'prop-types';
import {
    FaTimes,
    FaShoppingCart,
    FaCoins,
    FaFire,
    FaCrown,
    FaPalette,
    FaMedal,
    FaGift,
    FaLock,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { STORE_PURCHASES_ENABLED } from '../../constants/featureFlags';
import useStoreAPI from '../StoreModal/useStoreAPI';
import ItemDetailModal from '../StoreModal/ItemDetailModal';
import s, { CATEGORIES } from '../StoreModal/storeModalStyles';
import useModalA11y from '../../hooks/useModalA11y';

if (typeof document !== 'undefined') {
    const _soonCssId = 'store-soon-badge-css';
    if (!document.getElementById(_soonCssId)) {
        const _s = document.createElement('style');
        _s.id = _soonCssId;
        _s.textContent = `
@keyframes soonShimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}
.store-soon-badge {
    background: linear-gradient(90deg,
        rgba(240,178,50,0.10) 0%,
        rgba(240,178,50,0.15) 30%,
        rgba(240,178,50,0.40) 50%,
        rgba(240,178,50,0.15) 70%,
        rgba(240,178,50,0.10) 100%) !important;
    background-size: 200% 100% !important;
    animation: soonShimmer 2.2s linear infinite;
}`;
        document.head.appendChild(_s);
    }
}

const ITEM_ICON_STYLE = { fontSize: '48px', color: '#949ba4' };
const _st1145 = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '6px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};
const ICON_MAP = { FaShoppingCart, FaPalette, FaMedal, FaFire, FaCrown };
const EMPTY_STATE_STYLE = {
    textAlign: 'center',
    padding: '48px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
    background: 'linear-gradient(180deg, rgba(88,101,242,0.04) 0%, transparent 100%)',
    borderRadius: '12px',
    border: '1px dashed rgba(255,255,255,0.08)',
};
const EMPTY_ICON_WRAP = {
    width: 96,
    height: 96,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.04)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
};
const EMPTY_TITLE_STYLE = { margin: 0, fontSize: '20px', fontWeight: 700, color: '#fff' };
const EMPTY_DESC_STYLE = {
    margin: 0,
    fontSize: '14px',
    color: '#b5bac1',
    lineHeight: 1.6,
    maxWidth: '420px',
};

const ItemCard = ({ item, onClick }) => {
    const { t } = useTranslation();
    return (
        <div
            style={{
                ...s.itemCard,
                ...(item.preview ? { opacity: 0.75, position: 'relative', cursor: 'default' } : {}),
            }}
            role="button"
            tabIndex={0}
            aria-label={item.name}
            onClick={() => !item.preview && onClick(item)}
            onKeyDown={(e) => !item.preview && (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            {item.preview && (
                <div
                    className="store-soon-badge"
                    style={{
                        position: 'absolute', top: 6, right: 6,
                        border: '1px solid rgba(240,178,50,0.4)', borderRadius: '6px',
                        padding: '2px 6px', fontSize: '10px', fontWeight: 700, color: '#f0b232',
                        letterSpacing: '0.05em', zIndex: 1,
                    }}
                >{t('store.soon', 'SOON')}</div>
            )}
            {item.emoji ? (
                <div style={{ ...s.itemPlaceholder, fontSize: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.emoji}
                </div>
            ) : item.image ? (
                <img src={item.image} alt={item.name} style={s.itemImage} />
            ) : (
                <div style={s.itemPlaceholder}>
                    <FaGift style={ITEM_ICON_STYLE} />
                </div>
            )}
            <div style={s.itemInfo}>
                <div style={_st1145}>{item.name}</div>
                <div style={s.itemPrice}>
                    <FaCoins className="icon-warning" />
                    {(item.price ?? 0).toLocaleString()}
                </div>
            </div>
            {item.limited && <div style={s.limitedBadge}>{t('store.limited', 'LIMITED')}</div>}
        </div>
    );
};

const StoreModal = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: t('store.title', 'Ürün Mağazası') });
    const store = useStoreAPI({ fetchWithAuth, apiBaseUrl });

    return (
        <div style={s.overlay} {...overlayProps}>
            <div style={s.modal} {...dialogProps}>
                <div style={s.header}>
                    <div style={s.headerLeft}>
                        <FaShoppingCart className="icon-primary-24" />
                        <h2 className="m0-fs20">{t('store.title', 'Ürün Mağazası')}</h2>
                    </div>
                    <div style={s.headerRight}>
                        <div style={s.balance}>
                            <FaCoins className="icon-warning" />
                            <span>{store.balance.toLocaleString()}</span>
                        </div>
                        <button aria-label={t('common.close', 'Close')} onClick={onClose} style={s.closeBtn}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div style={s.categories}>
                    {CATEGORIES.map((cat) => {
                        const Icon = ICON_MAP[cat.icon];
                        const categoryButtonStyle = {
                            ...s.categoryBtn,
                            ...(store.selectedCategory === cat.id ? s.activeCategoryBtn : {}),
                        };

                        return (
                            <button
                                aria-label={t('store.category.' + cat.id, cat.name)}
                                key={cat.id}
                                onClick={() => store.setSelectedCategory(cat.id)}
                                style={categoryButtonStyle}
                            >
                                <Icon />
                                <span>{t('store.category.' + cat.id, cat.name)}</span>
                            </button>
                        );
                    })}
                </div>

                <div style={s.content}>
                    {store.loading ? (
                        <div style={s.loading}>{t('store.loading', 'Mağaza yükleniyor...')}</div>
                    ) : (
                        <>
                            {store.selectedCategory === 'all' && store.featuredItems.length > 0 && (
                                <div style={s.section}>
                                    <h3 style={s.sectionTitle}>
                                        <FaFire className="icon-danger" />{' '}
                                        {t('store.featured', 'Öne Çıkanlar')}
                                    </h3>
                                    <div style={s.itemsGrid}>
                                        {store.featuredItems.map((item) => (
                                            <ItemCard
                                                key={item.id}
                                                item={item}
                                                onClick={store.setSelectedItem}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div style={s.section}>
                                <h3 style={s.sectionTitle}>
                                    {t(
                                        'store.category.' + store.selectedCategory,
                                        CATEGORIES.find((c) => c.id === store.selectedCategory)
                                            ?.name || 'All Items'
                                    )}
                                </h3>
                                {store.filteredItems.length === 0 ? (
                                    <div style={EMPTY_STATE_STYLE}>
                                        <div style={EMPTY_ICON_WRAP}>
                                            {STORE_PURCHASES_ENABLED ? (
                                                <FaGift size={48} color="#5865f2" />
                                            ) : (
                                                <FaLock size={44} color="#f0b232" />
                                            )}
                                        </div>
                                        <h3 style={EMPTY_TITLE_STYLE}>
                                            {STORE_PURCHASES_ENABLED
                                                ? t('store.empty.title', 'Henüz ürün yok')
                                                : t('store.comingSoon.title', 'Çok Yakında!')}
                                        </h3>
                                        <p style={EMPTY_DESC_STYLE}>
                                            {STORE_PURCHASES_ENABLED
                                                ? t(
                                                    'store.empty.desc',
                                                    t('store.comingSoon', 'New items will be added to this category soon.')
                                                )
                                                : t(
                                                    'store.comingSoon.desc',
                                                    t('store.devNotice', 'The store feature is currently in development. Amazing cosmetic items, badges and special items will be here soon!')
                                                )}
                                        </p>
                                    </div>
                                ) : (
                                    <div style={s.itemsGrid}>
                                        {store.filteredItems.map((item) => (
                                            <ItemCard
                                                key={item.id}
                                                item={item}
                                                onClick={store.setSelectedItem}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                <ItemDetailModal
                    item={store.selectedItem}
                    balance={store.balance}
                    onClose={() => store.setSelectedItem(null)}
                    onPurchase={store.handlePurchase}
                />
            </div>
        </div>
    );
};

StoreModal.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    username: PropTypes.string,
};

ItemCard.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func,
};

export default StoreModal;

import { useTranslation } from 'react-i18next';
import React from 'react';
import PropTypes from 'prop-types';
import profileStyles from '../styles';
const _s = (o) => o;

// -- dynamic style helpers (pass 2) --
const _st1112 = {
    ...profileStyles.button('secondary'),
    padding: '6px 12px',
    fontSize: '12px',
    marginTop: '8px',
};
const _st1113 = {
    ...profileStyles.button('primary'),
    padding: '6px 12px',
    fontSize: '12px',
    marginTop: '8px',
};

// -- extracted inline style constants --
const _st1 = { marginBottom: '24px' };
const _st2 = { color: '#fff', marginBottom: '12px' };
const _st3 = { color: '#b5bac1', fontSize: '14px' };
const _st4 = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' };
const _st5 = {
    padding: '16px',
    background:
        'linear-gradient(135deg, rgba(67, 181, 129, 0.2) 0%, rgba(67, 181, 129, 0.05) 100%)',
    border: '2px solid #23a559',
    borderRadius: '12px',
    textAlign: 'center',
};
const _st6 = { fontSize: '48px', marginBottom: '8px' };
const _st7 = { color: '#fff', margin: '0 0 4px 0', fontSize: '14px' };
const _st8 = {
    padding: '48px',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
};
const _st9 = { fontSize: '64px', marginBottom: '16px' };
const _st10 = { color: '#fff', margin: '0 0 8px 0' };
const _st11 = { color: '#b5bac1', margin: 0 };
const _st12 = { color: '#b5bac1', margin: '4px 0', fontSize: '12px' };

const InventoryTab = ({ equipItem, equippedItems: rawEq, inventory: rawInv, unequipItem }) => {
    const equippedItems = rawEq || [];
    const inventory = rawInv || [];
    const styles = profileStyles;
    const { t } = useTranslation();
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div style={styles.card}>
            <h3 style={styles.sectionTitle}>🎒 {t('inventory.title', 'Inventory & Equipment')}</h3>

            <div style={_st1}>
                <h4 style={_st2}>⚡ Equipped Items</h4>
                {equippedItems.length === 0 ? (
                    <p style={_st3}>{t('inventory.noEquipped', 'No equipped items yet.')}</p>
                ) : (
                    <div style={_st4}>
                        {equippedItems.map((item, idx) => (
                            <div key={`item-${idx}`} style={_st5}>
                                <div style={_st6}>{item.icon || '🎁'}</div>
                                <h5 style={_st7}>{item.name}</h5>
                                <button
                                    style={_st1112}
                                    aria-label={t('inventory.unequip', 'Remove item')}
                                    onClick={() => unequipItem(item.id)}
                                >
                                    ❌ {t('inventory.remove', 'Remove')}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <h4 style={_st2}>{t('inventory.allItems', '📦 All Items')}</h4>
                {inventory.length === 0 ? (
                    <div style={_st8}>
                        <div style={_st9}>🎒</div>
                        <h4 style={_st10}>{t('inventory.empty', 'Inventory empty')}</h4>
                        <p style={_st11}>{t('inventory.buyHint', 'You can purchase items from the Premium Store')}</p>
                    </div>
                ) : (
                    <div style={_st4}>
                        {inventory.map((item, idx) => (
                            <div
                                key={`item-${idx}`}
                                style={_s({
                                    padding: '16px',
                                    background: item.is_equipped
                                        ? 'linear-gradient(135deg, rgba(67, 181, 129, 0.2) 0%, rgba(67, 181, 129, 0.05) 100%)'
                                        : 'rgba(255, 255, 255, 0.05)',
                                    border: item.is_equipped
                                        ? '2px solid #23a559'
                                        : '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    textAlign: 'center',
                                })}
                            >
                                <div style={_st6}>{item.icon || '🎁'}</div>
                                <h5 style={_st7}>{item.name}</h5>
                                <p style={_st12}>{item.description}</p>
                                {!item.is_equipped && (
                                    <button
                                        style={_st1113}
                                        aria-label={t('inventory.equip', 'Equip item')}
                                        onClick={() => equipItem(item.id)}
                                    >
                                        ✅ {t('inventory.equipBtn', 'Equip')}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

InventoryTab.propTypes = {
    equipItem: PropTypes.object,
    equippedItems: PropTypes.array,
    inventory: PropTypes.object,
    unequipItem: PropTypes.object,
};
export default InventoryTab;

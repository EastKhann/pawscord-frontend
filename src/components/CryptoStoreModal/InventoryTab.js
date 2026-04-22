import React from 'react';
import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';
import styles from './cryptoStoreStyles';
import { useTranslation } from 'react-i18next';

const InventoryTab = ({ inventory, loading, handleEquip }) => {
    const { t } = useTranslation();
    return (
        <div aria-label={t('cryptoStore.inventoryTab', 'Inventory')} style={styles.grid}>
            {inventory.map((entry) => (
                <div
                    key={entry.id}
                    style={{
                        ...styles.itemCard,
                        border: entry.is_equipped ? '1px solid #23a559' : '1px solid #0b0e1b',
                    }}
                >
                    <div style={styles.iconPlace}>
                        {entry.preview_image ? (
                            <img src={entry.preview_image} alt={entry.name} className="size-50" />
                        ) : (
                            <span className="fs-2em">🎒</span>
                        )}
                    </div>
                    <h4>{entry.name}</h4>
                    <p className="text-999-08em">{entry.item_type}</p>
                    {entry.is_equipped ? (
                        <button style={styles.equippedBtn} disabled>
                            <FaCheck />
                            {t('store.equipped', 'Equipped')}
                        </button>
                    ) : (
                        <button
                            onClick={() => handleEquip(entry.id)}
                            style={styles.useBtn}
                            disabled={loading}
                        >
                            {t('store.equip', 'Equip')}
                        </button>
                    )}
                </div>
            ))}
            {inventory.length === 0 && (
                <p className="text-ccc">
                    {t('store.emptyInventory', "You haven't purchased anything yet")}
                </p>
            )}
        </div>
    );
};

InventoryTab.propTypes = {
    inventory: PropTypes.array,
    loading: PropTypes.bool,
    handleEquip: PropTypes.func,
};
export default InventoryTab;

/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { FaTimes, FaCube, FaGift, FaTshirt, FaCrown } from 'react-icons/fa';
import { toast } from '../../utils/toast';

// -- dynamic style helpers (pass 2) --

const _st1144 = {
    fontSize: '12px',
    fontWeight: '700',
    padding: '4px 8px',
    borderRadius: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
    color: '#ffd700',
    backgroundColor: 'rgba(255,215,0,0.1)',
};

const InventoryPanel = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const { t } = useTranslation();
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');

    const itemTypes = [
        { value: 'all', label: 'All Items', icon: FaCube },
        { value: 'cosmetic', label: 'Cosmetics', icon: FaTshirt },
        { value: 'badge', label: 'Badges', icon: FaCrown },
        { value: 'gift', label: 'Gifts', icon: FaGift },
    ];

    useEffect(() => {
        fetchInventory();
    }, [filter]);

    const fetchInventory = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                username: username || '',
                type: filter !== 'all' ? filter : '',
            });
            const response = await fetchWithAuth(`${apiBaseUrl}/inventory/?${params}`);
            const data = await response.json();
            setInventory(data.items || []);
        } catch (error) {
            toast.error(t('inventory.loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const equipItem = async (itemId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/inventory/${itemId}/equip/`, {
                method: 'POST',
            });
            toast.success(t('inventory.equipped'));
            fetchInventory();
        } catch (error) {
            toast.error(t('inventory.equipFailed'));
        }
    };

    const unequipItem = async (itemId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/inventory/${itemId}/unequip/`, {
                method: 'POST',
            });
            toast.success(t('inventory.unequipped'));
            fetchInventory();
        } catch (error) {
            toast.error(t('inventory.unequipFailed'));
        }
    };

    const useItem = async (itemId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/inventory/${itemId}/use/`, {
                method: 'POST',
            });
            toast.success(t('inventory.used'));
            fetchInventory();
        } catch (error) {
            toast.error(t('inventory.useFailed'));
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaCube className="icon-primary-mr10" />
                        <h2 style={styles.title}>Inventory</h2>
                    </div>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.filterBar}>
                    {itemTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                            <button
                                aria-label={t('inventory.filterBtn', 'Filter by category')}
                                onClick={() => setFilter(type.value)}
                                style={
                                    filter === type.value
                                        ? styles.activeFilter
                                        : styles.filterButton
                                }
                            >
                                <Icon className="mr-6" />
                                {type.label}
                            </button>
                        );
                    })}
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('inventory.loading', 'Loading inventory...')}</div>
                    ) : inventory.length === 0 ? (
                        <div style={styles.empty}>{t('inventory.empty', 'No items in inventory')}</div>
                    ) : (
                        <div style={styles.itemsGrid}>
                            {inventory.map((item, idx) => (
                                <div key={`item-${idx}`} style={styles.itemCard}>
                                    {item.image_url && (
                                        <div style={styles.itemImage}>
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="img-cover"
                                            />
                                        </div>
                                    )}
                                    {item.equipped && (
                                        <div style={styles.equippedBadge}>
                                            <FaCrown className="fs-12" /> Equipped
                                        </div>
                                    )}
                                    <div style={styles.itemInfo}>
                                        <div style={styles.itemName}>{item.name}</div>
                                        {item.rarity && (
                                            <div style={_st1144}>{item.rarity.toUpperCase()}</div>
                                        )}
                                        {item.description && (
                                            <div style={styles.itemDescription}>
                                                {item.description}
                                            </div>
                                        )}
                                        {item.quantity > 1 && (
                                            <div style={styles.itemQuantity}>
                                                Quantity: {item.quantity}
                                            </div>
                                        )}
                                        <div style={styles.itemActions}>
                                            {item.type === 'cosmetic' && (
                                                <>
                                                    {item.equipped ? (
                                                        <button
                                                            aria-label={t('inventory.unequipBtn', 'Unequip item')}
                                                            onClick={() => unequipItem(item.id)}
                                                            style={styles.unequipButton}
                                                        >
                                                            Unequip
                                                        </button>
                                                    ) : (
                                                        <button
                                                            aria-label={t('inventory.equipBtn', 'Equip item')}
                                                            onClick={() => equipItem(item.id)}
                                                            style={styles.equipButton}
                                                        >
                                                            Equip
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                            {item.usable && (
                                                <button
                                                    aria-label={t('inventory.useBtn', 'Use item')}
                                                    onClick={() => useItem(item.id)}
                                                    style={styles.useButton}
                                                >
                                                    Use
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const getRarityColor = (rarity) => {
    const colors = {
        common: '#949ba4',
        uncommon: '#23a559',
        rare: '#5865f2',
        epic: '#a020f0',
        legendary: '#f0b232',
    };
    return colors[rarity?.toLowerCase()] || '#949ba4';
};
const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '1100px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #0e1222',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#949ba4',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    filterBar: {
        display: 'flex',
        gap: '8px',
        padding: '16px 20px',
        borderBottom: '1px solid #0e1222',
        overflowX: 'auto',
    },
    filterButton: {
        padding: '8px 16px',
        backgroundColor: '#111214',
        border: 'none',
        borderRadius: '4px',
        color: '#dbdee1',
        cursor: 'pointer',
        fontSize: '13px',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
    },
    activeFilter: {
        padding: '8px 16px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '13px',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    loading: {
        textAlign: 'center',
        color: '#949ba4',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#949ba4',
        padding: '40px',
    },
    itemsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
    },
    itemCard: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
    },
    itemImage: {
        width: '100%',
        height: '150px',
        backgroundColor: '#1e1e1e',
    },
    equippedBadge: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        backgroundColor: '#f0b232',
        color: '#ffffff',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    itemInfo: {
        padding: '12px',
    },
    itemName: {
        fontSize: '15px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '6px',
    },
    itemRarity: {
        fontSize: '11px',
        fontWeight: '700',
        marginBottom: '6px',
        textTransform: 'uppercase',
    },
    itemDescription: {
        fontSize: '12px',
        color: '#dbdee1',
        marginBottom: '8px',
        lineHeight: '1.4',
    },
    itemQuantity: {
        fontSize: '12px',
        color: '#949ba4',
        marginBottom: '8px',
    },
    itemActions: {
        display: 'flex',
        gap: '8px',
    },
    equipButton: {
        flex: 1,
        padding: '8px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '600',
    },
    unequipButton: {
        flex: 1,
        padding: '8px',
        backgroundColor: '#949ba4',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '600',
    },
    useButton: {
        flex: 1,
        padding: '8px',
        backgroundColor: '#23a559',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '600',
    },
};

InventoryPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    username: PropTypes.string,
};
export default InventoryPanel;

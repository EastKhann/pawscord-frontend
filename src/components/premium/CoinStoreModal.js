import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaCoins } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import useCoinStore from '../CoinStoreModal/useCoinStore';
import PackageCard from '../CoinStoreModal/PackageCard';
import { styles, ANIMATIONS_CSS, INFO_ITEMS } from '../CoinStoreModal/coinStoreStyles';
import useModalA11y from '../../hooks/useModalA11y';

const S = {
    pad: { padding: '32px' },
};

const CoinStoreModal = ({ onClose, currentCoins, onPurchaseComplete }) => {
    const [error, setError] = useState(null);
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Coin Store' });
    const { packages, loading, selectedPackage, handlePurchase } = useCoinStore(
        onPurchaseComplete,
        onClose
    );
    const { t } = useTranslation();

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                {/* Header */}
                <div style={styles.header}>
                    <div>
                        <h2 style={styles.headerTitle}>
                            <FaCoins style={styles.coinIcon} />
                            💰 {t('store.coinStore', 'Coin Mağazası')}
                        </h2>
                        <p style={styles.balanceText}>
                            {t('store.currentBalance', 'Mevcut Bakiye')}:{' '}
                            <span style={styles.balanceAmount}>
                                {currentCoins?.toLocaleString() || 0}
                            </span>{' '}
                            coin
                        </p>
                    </div>
                    <button
                        aria-label="on Close"
                        onClick={onClose}
                        style={styles.closeBtn}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.color = '#ffffff';
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.target.style.color = '#b5bac1';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        <FaTimes className="fs-24" />
                    </button>
                </div>

                {/* Packages Grid */}
                <div style={S.pad}>
                    <div style={styles.packagesGrid}>
                        {packages.map((pkg) => (
                            <PackageCard
                                key={pkg.id}
                                pkg={pkg}
                                loading={loading}
                                selectedPackage={selectedPackage}
                                onPurchase={handlePurchase}
                            />
                        ))}
                    </div>

                    {/* Info Box */}
                    <div style={styles.infoBox}>
                        <div style={styles.infoList}>
                            {INFO_ITEMS.map((item, i) => (
                                <p key={`info-${i}`} style={styles.infoItem}>
                                    <span style={{ color: item.color, fontSize: '16px' }}>
                                        {item.icon}
                                    </span>
                                    <span
                                        style={
                                            item.small
                                                ? { color: '#b5bac1', fontSize: '12px' }
                                                : undefined
                                        }
                                    >
                                        {t(item.textKey)}
                                    </span>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                <style>{ANIMATIONS_CSS}</style>
            </div>
        </div>
    );
};

CoinStoreModal.propTypes = {
    onClose: PropTypes.func,
    currentCoins: PropTypes.number,
    onPurchaseComplete: PropTypes.func,
};
export default CoinStoreModal;

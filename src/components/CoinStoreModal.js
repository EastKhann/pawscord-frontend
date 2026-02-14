import { FaTimes, FaCoins } from 'react-icons/fa';
import useCoinStore from './CoinStoreModal/useCoinStore';
import PackageCard from './CoinStoreModal/PackageCard';
import { styles, ANIMATIONS_CSS, INFO_ITEMS } from './CoinStoreModal/coinStoreStyles';

const CoinStoreModal = ({ onClose, currentCoins, onPurchaseComplete }) => {
  const { packages, loading, selectedPackage, handlePurchase } = useCoinStore(onPurchaseComplete, onClose);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.headerTitle}>
              <FaCoins style={styles.coinIcon} />
              💰 Coin Mağazası
            </h2>
            <p style={styles.balanceText}>
              Mevcut bakiye: <span style={styles.balanceAmount}>{currentCoins?.toLocaleString() || 0}</span> coin
            </p>
          </div>
          <button
            onClick={onClose}
            style={styles.closeBtn}
            onMouseEnter={(e) => { e.target.style.background = 'rgba(255, 255, 255, 0.1)'; e.target.style.color = '#ffffff'; e.target.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => { e.target.style.background = 'rgba(255, 255, 255, 0.05)'; e.target.style.color = '#b9bbbe'; e.target.style.transform = 'scale(1)'; }}
          >
            <FaTimes style={{ fontSize: '24px' }} />
          </button>
        </div>

        {/* Packages Grid */}
        <div style={{ padding: '32px' }}>
          <div style={styles.packagesGrid}>
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} loading={loading} selectedPackage={selectedPackage} onPurchase={handlePurchase} />
            ))}
          </div>

          {/* Info Box */}
          <div style={styles.infoBox}>
            <div style={styles.infoList}>
              {INFO_ITEMS.map((item, i) => (
                <p key={i} style={styles.infoItem}>
                  <span style={{ color: item.color, fontSize: '16px' }}>{item.icon}</span>
                  <span style={item.small ? { color: '#b9bbbe', fontSize: '12px' } : undefined}>{item.text}</span>
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

export default CoinStoreModal;

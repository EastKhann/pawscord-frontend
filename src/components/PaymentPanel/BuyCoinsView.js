// PaymentPanel/BuyCoinsView.js
import { FaCoins, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import { COIN_PACKAGES } from './hooks/usePayment';

const PAYMENT_METHODS = [
    { key: 'crypto', icon: '\uD83E\uDE99', title: 'Cryptocurrency', desc: 'Bitcoin, Ethereum, USDC', badge: 'Global \u2022 Fast' },
    { key: 'stripe', icon: '\uD83D\uDCB3', title: 'Credit/Debit Card', desc: 'Stripe - Visa, Mastercard', badge: 'Global \u2022 Secure' },
    { key: 'iyzico', icon: '\uD83C\uDDF9\uD83C\uDDF7', title: 'Turkish Payment', desc: '\u0130yzico - TL payments', badge: 'Turkey \u2022 TRY' }
];

const PAYMENT_LABELS = { crypto: '\uD83E\uDE99 Crypto', stripe: '\uD83D\uDCB3 Card (Stripe)', iyzico: '\uD83C\uDDF9\uD83C\uDDF7 \u0130yzico (TRY)' };
const PAYMENT_NOTES = {
    crypto: '\uD83D\uDD12 Secure cryptocurrency payment via Coinbase Commerce',
    stripe: '\uD83D\uDD12 Secure card payment via Stripe',
    iyzico: '\uD83D\uDD12 G\u00FCvenli \u00F6deme - \u0130yzico ile korunur'
};
const PURCHASE_LABELS = { crypto: ' Pay with Crypto', stripe: ' Pay with Card', iyzico: ' \u0130yzico ile \u00D6de' };

const BuyCoinsView = ({ styles, amount, setAmount, paymentMethod, setPaymentMethod, handlePurchase }) => (
    <div style={styles.buyView}>
        <h3 style={styles.sectionTitle}>Choose Payment Method</h3>
        <div style={styles.paymentMethods}>
            {PAYMENT_METHODS.map(m => (
                <div key={m.key} onClick={() => setPaymentMethod(m.key)}
                    style={{ ...styles.paymentMethodCard, ...(paymentMethod === m.key && styles.selectedPaymentMethod) }}>
                    <div style={styles.pmIcon}>{m.icon}</div>
                    <div style={styles.pmTitle}>{m.title}</div>
                    <div style={styles.pmDesc}>{m.desc}</div>
                    <div style={styles.pmBadge}>{m.badge}</div>
                </div>
            ))}
        </div>

        <h3 style={styles.sectionTitle}>Select Coin Package</h3>
        <div style={styles.packages}>
            {COIN_PACKAGES.map((pkg, idx) => (
                <div key={idx} onClick={() => setAmount(pkg.amount)}
                    style={{ ...styles.package, ...(amount === pkg.amount && styles.selectedPackage) }}>
                    <FaCoins style={{ fontSize: '32px', color: '#faa61a' }} />
                    <div style={styles.pkgAmount}>{pkg.amount.toLocaleString()}</div>
                    {pkg.bonus > 0 && <div style={styles.bonus}>+{pkg.bonus} BONUS</div>}
                    <div style={styles.price}>${pkg.price}</div>
                    {amount === pkg.amount && <FaCheckCircle style={{ position: 'absolute', top: '10px', right: '10px', color: '#43b581' }} />}
                </div>
            ))}
        </div>

        <div style={styles.purchaseSection}>
            <div style={styles.paymentInfo}>
                <div style={styles.paymentInfoRow}>
                    <span>Selected Package:</span>
                    <strong>{amount.toLocaleString()} coins</strong>
                </div>
                <div style={styles.paymentInfoRow}>
                    <span>Payment Method:</span>
                    <strong>{PAYMENT_LABELS[paymentMethod]}</strong>
                </div>
                <div style={styles.paymentInfoRow}>
                    <span>Total Price:</span>
                    <strong style={{ color: '#faa61a', fontSize: '18px' }}>
                        {COIN_PACKAGES.find(p => p.amount === amount)?.price && (
                            paymentMethod === 'iyzico'
                                ? `\u20BA${(COIN_PACKAGES.find(p => p.amount === amount).price * 35).toFixed(0)}`
                                : `$${COIN_PACKAGES.find(p => p.amount === amount).price}`
                        )}
                    </strong>
                </div>
            </div>
            <button onClick={handlePurchase} style={styles.purchaseBtn}>
                <FaCreditCard />{PURCHASE_LABELS[paymentMethod]}
            </button>
            <div style={styles.paymentNote}>{PAYMENT_NOTES[paymentMethod]}</div>
        </div>
    </div>
);

export default BuyCoinsView;

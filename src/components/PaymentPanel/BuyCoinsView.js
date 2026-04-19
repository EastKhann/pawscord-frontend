/* eslint-disable no-undef */
// PaymentPanel/BuyCoinsView.js
import { FaCoins, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { COIN_PACKAGES } from './hooks/usePayment';
import { useTranslation } from 'react-i18next';

const S = {
    abs: { position: 'absolute', top: '10px', right: '10px', color: '#23a559' },
    txt: { fontSize: '32px', color: '#f0b232' },
};

// Payment labels/notes are now translated inside the component via t()

const BuyCoinsView = ({
    styles,
    amount,
    setAmount,
    paymentMethod,
    setPaymentMethod,
    handlePurchase,
}) => {
    const { t } = useTranslation();
    const PAYMENT_METHODS = [
        {
            key: 'crypto',
            icon: '🪙',
            title: t('payment.cryptocurrency'),
            desc: t('payment.btcEthUsdc'),
            badge: t('payment.globalFast'),
        },
        {
            key: 'stripe',
            icon: '💳',
            title: t('payment.creditDebitCard'),
            desc: t('payment.stripeVisaMc'),
            badge: t('payment.globalSecure'),
        },
        {
            key: 'iyzico',
            icon: '🇹🇷',
            title: t('payment.turkishPayment'),
            desc: t('ui.iyzico_tl_payments'),
            badge: t('payment.turkeyTry'),
        },
    ];

    return (
        <div aria-label="buy coins view" style={styles.buyView}>
            <h3 style={styles.sectionTitle}>{t('choose_payment_method')}</h3>
            <div style={styles.paymentMethods}>
                {PAYMENT_METHODS.map((m) => (
                    <div
                        key={m.key}
                        role="button"
                        tabIndex={0}
                        onClick={() => setPaymentMethod(m.key)}
                        style={{
                            ...styles.paymentMethodCard,
                            ...(paymentMethod === m.key && styles.selectedPaymentMethod),
                        }}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <div style={styles.pmIcon}>{m.icon}</div>
                        <div style={styles.pmTitle}>{m.title}</div>
                        <div style={styles.pmDesc}>{m.desc}</div>
                        <div style={styles.pmBadge}>{m.badge}</div>
                    </div>
                ))}
            </div>

            <h3 style={styles.sectionTitle}>{t('select_coin_package')}</h3>
            <div style={styles.packages}>
                {COIN_PACKAGES.map((pkg, idx) => (
                    <div
                        key={`item-${idx}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => setAmount(pkg.amount)}
                        style={{
                            ...styles.package,
                            ...(amount === pkg.amount && styles.selectedPackage),
                        }}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <FaCoins style={S.txt} />
                        <div style={styles.pkgAmount}>{pkg.amount.toLocaleString()}</div>
                        {pkg.bonus > 0 && <div style={styles.bonus}>+{pkg.bonus} BONUS</div>}
                        <div style={styles.price}>${pkg.price}</div>
                        {amount === pkg.amount && <FaCheckCircle style={S.abs} />}
                    </div>
                ))}
            </div>

            <div style={styles.purchaseSection}>
                <div style={styles.paymentInfo}>
                    <div style={styles.paymentInfoRow}>
                        <span>{t('selected_package')}</span>
                        <strong>{amount.toLocaleString()} coins</strong>
                    </div>
                    <div style={styles.paymentInfoRow}>
                        <span>{t('payment_method')}</span>
                        <strong>{PAYMENT_LABELS[paymentMethod]}</strong>
                    </div>
                    <div style={styles.paymentInfoRow}>
                        <span>{t('total_price')}</span>
                        <strong className="icon-warning">
                            {COIN_PACKAGES.find((p) => p.amount === amount)?.price &&
                                (paymentMethod === 'iyzico'
                                    ? `₺${(COIN_PACKAGES.find((p) => p.amount === amount).price * 35).toFixed(0)}`
                                    : `$${COIN_PACKAGES.find((p) => p.amount === amount).price}`)}
                        </strong>
                    </div>
                </div>
                <button onClick={handlePurchase} style={styles.purchaseBtn}>
                    <FaCreditCard />
                    {PURCHASE_LABELS[paymentMethod]}
                </button>
                <div style={styles.paymentNote}>{PAYMENT_NOTES[paymentMethod]}</div>
            </div>
        </div>
    );
};

BuyCoinsView.propTypes = {
    styles: PropTypes.array,
    amount: PropTypes.number,
    setAmount: PropTypes.func,
    paymentMethod: PropTypes.func,
    setPaymentMethod: PropTypes.func,
    handlePurchase: PropTypes.func,
};
export default BuyCoinsView;

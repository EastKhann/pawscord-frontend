// frontend/src/components/PaymentPanel.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaCoins, FaCreditCard, FaHistory, FaWallet, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * 💰 Payment Panel - Stripe Integration
 * Complete payment and balance management system
 * 
 * Features:
 * - View current balance
 * - Purchase coins with Stripe
 * - Transaction history
 * - Transfer coins to other users
 * - Payment methods management
 */
const PaymentPanel = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const [activeTab, setActiveTab] = useState('balance'); // balance, buy, transfer, history
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Buy coins
    const [amount, setAmount] = useState(100);
    const [paymentMethod, setPaymentMethod] = useState('stripe'); // stripe, crypto, iyzico

    // Transfer coins
    const [transferRecipient, setTransferRecipient] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [transferNote, setTransferNote] = useState('');

    useEffect(() => {
        loadBalance();
        loadTransactions();
    }, []);

    const loadBalance = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/users/balance/`);
            const data = await response.json();
            setBalance(data.balance || 0);
        } catch (error) {
            console.error('Failed to load balance:', error);
            toast.error('Failed to load balance');
        } finally {
            setLoading(false);
        }
    };

    const loadTransactions = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/payments/history/`);
            const data = await response.json();
            setTransactions(data.transactions || []);
        } catch (error) {
            console.error('Failed to load transactions:', error);
        }
    };

    const handlePurchase = async () => {
        if (amount < 100) {
            toast.error('Minimum purchase is 100 coins');
            return;
        }

        if (!paymentMethod) {
            toast.error('Please select a payment method');
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/payments/coins/purchase/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    coin_amount: parseInt(amount),
                    payment_method: paymentMethod
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Payment failed');
            }

            const data = await response.json();

            if (data.success) {
                // Redirect to payment provider (Stripe/Coinbase/İyzico)
                if (data.redirect_url) {
                    toast.info('Redirecting to payment page...');
                    window.location.href = data.redirect_url;
                } else if (data.payment_page_url) {
                    toast.info('Redirecting to payment page...');
                    window.location.href = data.payment_page_url;
                } else {
                    toast.success(`Payment initiated!`);
                }
            } else {
                toast.error(data.error || 'Payment failed');
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error(error.message || 'Payment processing failed');
        }
    };

    const handleTransfer = async () => {
        if (!transferRecipient || !transferAmount) {
            toast.error('Please fill in all fields');
            return;
        }

        const amt = parseInt(transferAmount);
        if (amt <= 0 || amt > balance) {
            toast.error('Invalid transfer amount');
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/coins/transfer/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipient: transferRecipient,
                    amount: amt,
                    note: transferNote
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success(`Transferred ${amt} coins to ${transferRecipient}`);
                loadBalance();
                loadTransactions();
                setTransferRecipient('');
                setTransferAmount('');
                setTransferNote('');
                setActiveTab('balance');
            } else {
                toast.error(data.error || 'Transfer failed');
            }
        } catch (error) {
            console.error('Transfer error:', error);
            toast.error('Transfer failed');
        }
    };

    const coinPackages = [
        { amount: 100, price: 0.99, bonus: 0 },
        { amount: 500, price: 4.99, bonus: 50 },
        { amount: 1000, price: 9.99, bonus: 150 },
        { amount: 2500, price: 19.99, bonus: 500 },
        { amount: 5000, price: 39.99, bonus: 1000 }
    ];

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaWallet style={{ fontSize: '24px', color: '#faa61a' }} />
                        <h2 style={{ margin: 0, fontSize: '20px' }}>Payment Center</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                {/* Tabs */}
                <div style={styles.tabs}>
                    <button
                        onClick={() => setActiveTab('balance')}
                        style={{
                            ...styles.tab,
                            ...(activeTab === 'balance' && styles.activeTab)
                        }}
                    >
                        <FaCoins /> Balance
                    </button>
                    <button
                        onClick={() => setActiveTab('buy')}
                        style={{
                            ...styles.tab,
                            ...(activeTab === 'buy' && styles.activeTab)
                        }}
                    >
                        <FaCreditCard /> Buy Coins
                    </button>
                    <button
                        onClick={() => setActiveTab('transfer')}
                        style={{
                            ...styles.tab,
                            ...(activeTab === 'transfer' && styles.activeTab)
                        }}
                    >
                        <FaCoins /> Transfer
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        style={{
                            ...styles.tab,
                            ...(activeTab === 'history' && styles.activeTab)
                        }}
                    >
                        <FaHistory /> History
                    </button>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading...</div>
                    ) : activeTab === 'balance' ? (
                        <div style={styles.balanceView}>
                            <div style={styles.balanceCard}>
                                <FaCoins style={{ fontSize: '48px', color: '#faa61a' }} />
                                <div style={styles.balanceAmount}>{balance.toLocaleString()}</div>
                                <div style={styles.balanceLabel}>Current Balance</div>
                            </div>

                            <div style={styles.quickActions}>
                                <button
                                    onClick={() => setActiveTab('buy')}
                                    style={styles.actionBtn}
                                >
                                    <FaCreditCard /> Buy Coins
                                </button>
                                <button
                                    onClick={() => setActiveTab('transfer')}
                                    style={styles.actionBtn}
                                >
                                    <FaCoins /> Transfer Coins
                                </button>
                            </div>
                        </div>
                    ) : activeTab === 'buy' ? (
                        <div style={styles.buyView}>
                            {/* Payment Method Selection */}
                            <h3 style={styles.sectionTitle}>Choose Payment Method</h3>
                            <div style={styles.paymentMethods}>
                                <div
                                    onClick={() => setPaymentMethod('crypto')}
                                    style={{
                                        ...styles.paymentMethodCard,
                                        ...(paymentMethod === 'crypto' && styles.selectedPaymentMethod)
                                    }}
                                >
                                    <div style={styles.pmIcon}>🪙</div>
                                    <div style={styles.pmTitle}>Cryptocurrency</div>
                                    <div style={styles.pmDesc}>Bitcoin, Ethereum, USDC</div>
                                    <div style={styles.pmBadge}>Global • Fast</div>
                                </div>
                                <div
                                    onClick={() => setPaymentMethod('stripe')}
                                    style={{
                                        ...styles.paymentMethodCard,
                                        ...(paymentMethod === 'stripe' && styles.selectedPaymentMethod)
                                    }}
                                >
                                    <div style={styles.pmIcon}>💳</div>
                                    <div style={styles.pmTitle}>Credit/Debit Card</div>
                                    <div style={styles.pmDesc}>Stripe - Visa, Mastercard</div>
                                    <div style={styles.pmBadge}>Global • Secure</div>
                                </div>
                                <div
                                    onClick={() => setPaymentMethod('iyzico')}
                                    style={{
                                        ...styles.paymentMethodCard,
                                        ...(paymentMethod === 'iyzico' && styles.selectedPaymentMethod)
                                    }}
                                >
                                    <div style={styles.pmIcon}>🇹🇷</div>
                                    <div style={styles.pmTitle}>Turkish Payment</div>
                                    <div style={styles.pmDesc}>İyzico - TL payments</div>
                                    <div style={styles.pmBadge}>Turkey • TRY</div>
                                </div>
                            </div>

                            <h3 style={styles.sectionTitle}>Select Coin Package</h3>
                            <div style={styles.packages}>
                                {coinPackages.map((pkg, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setAmount(pkg.amount)}
                                        style={{
                                            ...styles.package,
                                            ...(amount === pkg.amount && styles.selectedPackage)
                                        }}
                                    >
                                        <FaCoins style={{ fontSize: '32px', color: '#faa61a' }} />
                                        <div style={styles.pkgAmount}>{pkg.amount.toLocaleString()}</div>
                                        {pkg.bonus > 0 && (
                                            <div style={styles.bonus}>+{pkg.bonus} BONUS</div>
                                        )}
                                        <div style={styles.price}>${pkg.price}</div>
                                        {amount === pkg.amount && (
                                            <FaCheckCircle style={{ position: 'absolute', top: '10px', right: '10px', color: '#43b581' }} />
                                        )}
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
                                        <strong>
                                            {paymentMethod === 'crypto' && '🪙 Crypto'}
                                            {paymentMethod === 'stripe' && '💳 Card (Stripe)'}
                                            {paymentMethod === 'iyzico' && '🇹🇷 İyzico (TRY)'}
                                        </strong>
                                    </div>
                                    <div style={styles.paymentInfoRow}>
                                        <span>Total Price:</span>
                                        <strong style={{ color: '#faa61a', fontSize: '18px' }}>
                                            {coinPackages.find(p => p.amount === amount)?.price && (
                                                paymentMethod === 'iyzico'
                                                    ? `₺${(coinPackages.find(p => p.amount === amount).price * 35).toFixed(0)}`
                                                    : `$${coinPackages.find(p => p.amount === amount).price}`
                                            )}
                                        </strong>
                                    </div>
                                </div>

                                <button onClick={handlePurchase} style={styles.purchaseBtn}>
                                    <FaCreditCard />
                                    {paymentMethod === 'crypto' && ' Pay with Crypto'}
                                    {paymentMethod === 'stripe' && ' Pay with Card'}
                                    {paymentMethod === 'iyzico' && ' İyzico ile Öde'}
                                </button>

                                <div style={styles.paymentNote}>
                                    {paymentMethod === 'crypto' && '🔒 Secure cryptocurrency payment via Coinbase Commerce'}
                                    {paymentMethod === 'stripe' && '🔒 Secure card payment via Stripe'}
                                    {paymentMethod === 'iyzico' && '🔒 Güvenli ödeme - İyzico ile korunur'}
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'transfer' ? (
                        <div style={styles.transferView}>
                            <h3 style={styles.sectionTitle}>Transfer Coins</h3>

                            <div style={styles.form}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Recipient Username</label>
                                    <input
                                        type="text"
                                        value={transferRecipient}
                                        onChange={(e) => setTransferRecipient(e.target.value)}
                                        placeholder="@username"
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Amount</label>
                                    <input
                                        type="number"
                                        value={transferAmount}
                                        onChange={(e) => setTransferAmount(e.target.value)}
                                        placeholder="0"
                                        min="1"
                                        max={balance}
                                        style={styles.input}
                                    />
                                    <div style={styles.hint}>Available: {balance} coins</div>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Note (Optional)</label>
                                    <input
                                        type="text"
                                        value={transferNote}
                                        onChange={(e) => setTransferNote(e.target.value)}
                                        placeholder="Add a message..."
                                        style={styles.input}
                                    />
                                </div>

                                <button onClick={handleTransfer} style={styles.transferBtn}>
                                    <FaCoins /> Transfer Coins
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div style={styles.historyView}>
                            <h3 style={styles.sectionTitle}>Transaction History</h3>
                            {transactions.length === 0 ? (
                                <div style={styles.empty}>No transactions yet</div>
                            ) : (
                                <div style={styles.transactions}>
                                    {transactions.map((tx, idx) => (
                                        <div key={idx} style={styles.transaction}>
                                            <div style={styles.txIcon}>
                                                {tx.type === 'purchase' ? (
                                                    <FaCreditCard style={{ color: '#5865f2' }} />
                                                ) : tx.type === 'transfer_sent' ? (
                                                    <FaCoins style={{ color: '#f04747' }} />
                                                ) : (
                                                    <FaCoins style={{ color: '#43b581' }} />
                                                )}
                                            </div>
                                            <div style={styles.txDetails}>
                                                <div style={styles.txTitle}>{tx.description}</div>
                                                <div style={styles.txDate}>{new Date(tx.created_at).toLocaleString()}</div>
                                            </div>
                                            <div style={{
                                                ...styles.txAmount,
                                                color: tx.amount > 0 ? '#43b581' : '#f04747'
                                            }}>
                                                {tx.amount > 0 ? '+' : ''}{tx.amount}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
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
        zIndex: 999999
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff'
    },
    header: {
        padding: '20px',
        borderBottom: '1px solid #444',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '8px'
    },
    tabs: {
        display: 'flex',
        borderBottom: '1px solid #444',
        padding: '0 20px'
    },
    tab: {
        background: 'none',
        border: 'none',
        color: '#99aab5',
        padding: '12px 20px',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderBottom: '2px solid transparent',
        transition: 'all 0.2s'
    },
    activeTab: {
        color: '#5865f2',
        borderBottomColor: '#5865f2'
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#99aab5'
    },
    balanceView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px'
    },
    balanceCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
    },
    balanceAmount: {
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#faa61a'
    },
    balanceLabel: {
        fontSize: '14px',
        color: '#99aab5'
    },
    quickActions: {
        display: 'flex',
        gap: '12px',
        width: '100%',
        maxWidth: '400px'
    },
    actionBtn: {
        flex: 1,
        padding: '12px 20px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'background 0.2s'
    },
    buyView: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '600',
        margin: 0,
        marginBottom: '12px'
    },
    packages: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '12px'
    },
    package: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        border: '2px solid transparent',
        transition: 'all 0.2s',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
    },
    selectedPackage: {
        borderColor: '#5865f2',
        backgroundColor: '#2c3136'
    },
    pkgAmount: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#faa61a'
    },
    bonus: {
        fontSize: '10px',
        color: '#43b581',
        fontWeight: 'bold',
        padding: '2px 8px',
        backgroundColor: 'rgba(67, 181, 129, 0.1)',
        borderRadius: '4px'
    },
    pkgPrice: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#fff'
    },
    purchaseSection: {
        marginTop: '24px'
    },
    paymentMethods: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
    },
    paymentMethodCard: {
        padding: '20px',
        background: '#2b2d31',
        border: '2px solid #40444b',
        borderRadius: '12px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    selectedPaymentMethod: {
        background: '#5865f2',
        borderColor: '#5865f2',
        transform: 'scale(1.05)',
        boxShadow: '0 4px 16px rgba(88, 101, 242, 0.3)'
    },
    pmIcon: {
        fontSize: '48px',
        marginBottom: '12px'
    },
    pmTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: 'white',
        marginBottom: '6px'
    },
    pmDesc: {
        fontSize: '13px',
        color: '#b9bbbe',
        marginBottom: '8px'
    },
    pmBadge: {
        display: 'inline-block',
        padding: '4px 12px',
        background: '#40444b',
        borderRadius: '12px',
        fontSize: '11px',
        color: '#43b581',
        fontWeight: '600'
    },
    paymentInfo: {
        background: '#2b2d31',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px'
    },
    paymentInfoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 0',
        fontSize: '14px',
        color: '#b9bbbe',
        borderBottom: '1px solid #40444b'
    },
    paymentNote: {
        textAlign: 'center',
        fontSize: '12px',
        color: '#43b581',
        marginTop: '12px'
    },
    price: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#fff'
    },
    paymentMethod: {
        marginTop: '12px'
    },
    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '8px',
        color: '#dcddde'
    },
    select: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#2c2f33',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px'
    },
    purchaseBtn: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#43b581',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '12px'
    },
    transferView: {
        maxWidth: '500px',
        margin: '0 auto'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    input: {
        padding: '10px',
        backgroundColor: '#2c2f33',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px'
    },
    hint: {
        fontSize: '12px',
        color: '#99aab5'
    },
    transferBtn: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '12px'
    },
    historyView: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    transactions: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    transaction: {
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    txIcon: {
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txDetails: {
        flex: 1
    },
    txTitle: {
        fontSize: '14px',
        fontWeight: '600'
    },
    txDate: {
        fontSize: '12px',
        color: '#99aab5',
        marginTop: '4px'
    },
    txAmount: {
        fontSize: '18px',
        fontWeight: 'bold'
    },
    empty: {
        textAlign: 'center',
        padding: '40px',
        color: '#99aab5'
    }
};

export default PaymentPanel;

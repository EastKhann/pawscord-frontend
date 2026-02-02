import React, { useState, useEffect, useRef } from 'react';
import toast from '../utils/toast';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';
import './PremiumCheckoutDual.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PremiumCheckoutDual = ({ plan, onClose }) => {
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'crypto'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <div className="premium-checkout-modal">
            <div className="checkout-header">
                <h2>Upgrade to {plan.name}</h2>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="plan-summary">
                <div className="plan-price">${plan.price}</div>
                <div className="plan-interval">per {plan.interval}</div>
                <div className="plan-features">
                    {plan.features.map((feature, idx) => (
                        <div key={idx} className="feature-item">
                            ✓ {feature}
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Method Selector */}
            <div className="payment-method-selector">
                <button
                    className={`method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                >
                    <span className="icon">💳</span>
                    Credit Card
                    <span className="fee">2.9% fee</span>
                </button>
                <button
                    className={`method-btn ${paymentMethod === 'crypto' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('crypto')}
                >
                    <span className="icon">₿</span>
                    Cryptocurrency
                    <span className="fee">1% fee</span>
                </button>
            </div>

            {/* Payment Form */}
            {paymentMethod === 'card' ? (
                <Elements stripe={stripePromise}>
                    <StripeCheckoutForm
                        plan={plan}
                        setLoading={setLoading}
                        setError={setError}
                    />
                </Elements>
            ) : (
                <CryptoCheckoutForm
                    plan={plan}
                    setLoading={setLoading}
                    setError={setError}
                />
            )}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    Processing payment...
                </div>
            )}
        </div>
    );
};

// Stripe Card Payment Component
const StripeCheckoutForm = ({ plan, setLoading, setError }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Backend'den PaymentIntent al
            const { data } = await axios.post('/api/payments/create-stripe-payment/', {
                plan_id: plan.id,
            });

            // Card bilgisini onayla
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                data.client_secret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                }
            );

            if (stripeError) {
                setError(stripeError.message);
                setLoading(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                // Premium aktif et
                await axios.post('/api/payments/confirm-payment/', {
                    payment_id: paymentIntent.id,
                    payment_type: 'stripe',
                });

                toast.success('🎉 Premium activated!');
                window.location.href = '/premium/success';
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Payment failed');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="stripe-form">
            <div className="card-element-wrapper">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#ffffff',
                                fontFamily: '"Whitney", "Helvetica Neue", Helvetica, Arial, sans-serif',
                                '::placeholder': { color: '#72767d' },
                            },
                            invalid: {
                                color: '#ed4245',
                            },
                        },
                    }}
                />
            </div>

            <button
                type="submit"
                disabled={!stripe}
                className="submit-btn stripe-btn"
            >
                Pay ${plan.price} with Card
            </button>

            <div className="payment-info">
                🔒 Secure payment powered by Stripe
            </div>
        </form>
    );
};

// Crypto Payment Component
const CryptoCheckoutForm = ({ plan, setLoading, setError }) => {
    const [cryptoCharge, setCryptoCharge] = useState(null);
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const [selectedCrypto, setSelectedCrypto] = useState('BTC');
    const pollIntervalRef = useRef(null);
    const timeoutRef = useRef(null);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleCryptoPayment = async () => {
        // Clear any existing intervals before starting new one
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        setLoading(true);
        setError(null);

        try {
            // Backend'den crypto charge oluştur
            const { data } = await axios.post('/api/payments/create-crypto-payment/', {
                plan_id: plan.id,
                crypto: selectedCrypto,
            });

            setCryptoCharge(data);
            setQrCodeUrl(data.qr_code_url);
            setWalletAddress(data.wallet_address);

            // Polling: Ödeme tamamlanana kadar kontrol et
            pollIntervalRef.current = setInterval(async () => {
                try {
                    const { data: statusData } = await axios.get(
                        `/api/payments/check-crypto-payment/${data.charge_id}/`
                    );

                    if (statusData.status === 'confirmed') {
                        clearInterval(pollIntervalRef.current);
                        pollIntervalRef.current = null;

                        // Premium aktif et
                        await axios.post('/api/payments/confirm-payment/', {
                            payment_id: data.charge_id,
                            payment_type: 'crypto',
                        });

                        toast.success('🎉 Crypto payment confirmed! Premium activated!');
                        window.location.href = '/premium/success';
                    } else if (statusData.status === 'failed') {
                        clearInterval(pollIntervalRef.current);
                        pollIntervalRef.current = null;
                        setError('Payment failed or expired');
                        setLoading(false);
                    }
                } catch (err) {
                    // Polling error - continue
                }
            }, 5000); // Her 5 saniyede bir kontrol et

            // 30 dakika sonra timeout
            timeoutRef.current = setTimeout(() => {
                if (pollIntervalRef.current) {
                    clearInterval(pollIntervalRef.current);
                    pollIntervalRef.current = null;
                }
                setError('Payment timeout. Please try again.');
                setLoading(false);
            }, 30 * 60 * 1000);

            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create crypto payment');
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('✅ Copied to clipboard!');
    };

    if (!cryptoCharge) {
        return (
            <div className="crypto-form">
                {/* Crypto Selection */}
                <div className="crypto-selector">
                    <label>Select Cryptocurrency:</label>
                    <div className="crypto-options">
                        {['BTC', 'ETH', 'USDT', 'USDC'].map((crypto) => (
                            <button
                                key={crypto}
                                type="button"
                                className={`crypto-option ${selectedCrypto === crypto ? 'active' : ''}`}
                                onClick={() => setSelectedCrypto(crypto)}
                            >
                                {crypto}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleCryptoPayment}
                    className="submit-btn crypto-btn"
                >
                    Generate {selectedCrypto} Payment
                </button>

                <div className="payment-info">
                    ₿ No registration required • 1% fee • Anonymous
                </div>
            </div>
        );
    }

    return (
        <div className="crypto-payment-details">
            <div className="payment-status">
                <div className="status-indicator pending">
                    <div className="pulse"></div>
                    Waiting for payment...
                </div>
            </div>

            <div className="qr-code-section">
                <img src={qrCodeUrl} alt="QR Code" className="qr-code" />
                <p>Scan with {selectedCrypto} wallet</p>
            </div>

            <div className="wallet-address-section">
                <label>Or send manually to:</label>
                <div className="address-box">
                    <code>{walletAddress}</code>
                    <button
                        type="button"
                        onClick={() => copyToClipboard(walletAddress)}
                        className="copy-btn"
                    >
                        📋 Copy
                    </button>
                </div>
            </div>

            <div className="amount-section">
                <label>Amount:</label>
                <div className="amount-box">
                    <strong>{cryptoCharge.amount} {selectedCrypto}</strong>
                    <span className="usd-equivalent">(≈ ${plan.price})</span>
                </div>
            </div>

            <div className="payment-instructions">
                <h4>Instructions:</h4>
                <ol>
                    <li>Open your {selectedCrypto} wallet</li>
                    <li>Scan QR code or paste address</li>
                    <li>Send exactly <strong>{cryptoCharge.amount} {selectedCrypto}</strong></li>
                    <li>Wait for confirmation (1-3 blocks)</li>
                </ol>
            </div>

            <div className="payment-timer">
                ⏱️ Payment expires in 30 minutes
            </div>
        </div>
    );
};

export default PremiumCheckoutDual;



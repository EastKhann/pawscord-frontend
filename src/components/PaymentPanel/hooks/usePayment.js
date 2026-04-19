// PaymentPanel/hooks/usePayment.js
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../../../utils/toast';
import logger from '../../../utils/logger';

export const COIN_PACKAGES = [
    { amount: 100, price: 0.99, bonus: 0 },
    { amount: 500, price: 4.99, bonus: 50 },
    { amount: 1000, price: 9.99, bonus: 150 },
    { amount: 2500, price: 19.99, bonus: 500 },
    { amount: 5000, price: 39.99, bonus: 1000 },
];

const usePayment = (fetchWithAuth, apiBaseUrl) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('balance');
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(100);
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const [transferRecipient, setTransferRecipient] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [transferNote, setTransferNote] = useState('');

    const loadBalance = useCallback(async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/users/balance/`);
            if (!response.ok) {
                setBalance(0);
                return;
            }
            const data = await response.json();
            setBalance(data.balance || 0);
        } catch (error) {
            logger.error('Failed to load balance:', error);
        } finally {
            setLoading(false);
        }
    }, [fetchWithAuth, apiBaseUrl]);

    const loadTransactions = useCallback(async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/payments/history/`);
            if (!response.ok) return;
            const data = await response.json();
            setTransactions(data.transactions || []);
        } catch (error) {
            logger.error('Failed to load transactions:', error);
        }
    }, [fetchWithAuth, apiBaseUrl]);

    useEffect(() => {
        loadBalance();
        loadTransactions();
    }, [loadBalance, loadTransactions]);

    const handlePurchase = async () => {
        if (amount < 100) {
            toast.error(t('payment.minCoins'));
            return;
        }
        if (!paymentMethod) {
            toast.error(t('payment.selectMethod'));
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/payments/coins/purchase/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    coin_amount: parseInt(amount),
                    payment_method: paymentMethod,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Payment failed');
            }

            const data = await response.json();
            if (data.success) {
                if (data.redirect_url) {
                    toast.info(t('payment.redirecting'));
                    window.location.href = data.redirect_url;
                } else if (data.payment_page_url) {
                    toast.info(t('payment.redirecting'));
                    window.location.href = data.payment_page_url;
                } else {
                    toast.success(t('payment.initiated'));
                }
            } else {
                toast.error(data.error || t('payment.failed'));
            }
        } catch (error) {
            logger.error('Payment error:', error);
            toast.error(error.message || t('payment.processingFailed'));
        }
    };

    const handleTransfer = async () => {
        if (!transferRecipient || !transferAmount) {
            toast.error(t('payment.fillFields'));
            return;
        }
        const amt = parseInt(transferAmount);
        if (amt <= 0 || amt > balance) {
            toast.error(t('payment.invalidAmount'));
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/coins/transfer/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipient: transferRecipient,
                    amount: amt,
                    note: transferNote,
                }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success(
                    t('payment.transferred', { amount: amt, recipient: transferRecipient })
                );
                loadBalance();
                loadTransactions();
                setTransferRecipient('');
                setTransferAmount('');
                setTransferNote('');
                setActiveTab('balance');
            } else {
                toast.error(data.error || t('payment.transferFailed'));
            }
        } catch (error) {
            logger.error('Transfer error:', error);
            toast.error(t('payment.transferFailed'));
        }
    };

    return {
        activeTab,
        setActiveTab,
        balance,
        transactions,
        loading,
        amount,
        setAmount,
        paymentMethod,
        setPaymentMethod,
        transferRecipient,
        setTransferRecipient,
        transferAmount,
        setTransferAmount,
        transferNote,
        setTransferNote,
        handlePurchase,
        handleTransfer,
    };
};

export default usePayment;

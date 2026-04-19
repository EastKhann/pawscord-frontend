// frontend/src/hooks/usePaymentVerification.js
// Extracted from App.js - handles Stripe/Coinbase payment callback verification
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import logger from '../utils/logger';

/**
 * On mount, checks URL params for payment success/cancel callbacks.
 * Verifies with backend and shows toast notifications.
 * Cleans up URL params after processing.
 */
export default function usePaymentVerification() {
    const { t } = useTranslation();
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const success = params.get('success');
        const coins = params.get('coins');
        const sessionId = params.get('session_id');
        const canceled = params.get('canceled');

        if (success === 'true' && coins) {
            const verifyPayment = async () => {
                try {
                    const token = localStorage.getItem('access_token');
                    const apiBase = 'https://api.pawscord.com/api';

                    if (sessionId) {
                        const response = await fetch(`${apiBase}/payments/verify/`, {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                session_id: sessionId,
                                coin_amount: parseInt(coins),
                            }),
                        });

                        const data = await response.json();

                        if (data.success) {
                            if (data.already_processed) {
                                toast.info(
                                    t('payment.alreadyProcessed', { balance: data.balance })
                                );
                            } else {
                                toast.success(
                                    t('payment.coinsAdded', { coins, balance: data.balance })
                                );
                            }
                        } else {
                            toast.error(data.error || t('payment.verifyError'));
                        }
                    } else {
                        toast.success(t('payment.successful', { coins }));
                    }
                } catch (error) {
                    logger.error('Payment verification error:', error);
                    toast.success(t('payment.confirmed', { coins }));
                }
            };

            verifyPayment();
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        if (canceled === 'true') {
            toast.info(t('payment.cancelled'));
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);
}

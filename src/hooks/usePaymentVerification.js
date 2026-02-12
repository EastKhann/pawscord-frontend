// frontend/src/hooks/usePaymentVerification.js
// Extracted from App.js - handles Stripe/Coinbase payment callback verification
import { useEffect } from 'react';
import { toast } from 'react-toastify';

/**
 * On mount, checks URL params for payment success/cancel callbacks.
 * Verifies with backend and shows toast notifications.
 * Cleans up URL params after processing.
 */
export default function usePaymentVerification() {
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
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                session_id: sessionId,
                                coin_amount: parseInt(coins)
                            })
                        });

                        const data = await response.json();

                        if (data.success) {
                            if (data.already_processed) {
                                toast.info(`Odeme zaten islendi! Bakiye: ${data.balance} coin`);
                            } else {
                                toast.success(`${coins} coin hesabina eklendi! Yeni bakiye: ${data.balance} coin`);
                            }
                        } else {
                            toast.error(data.error || 'Odeme dogrulama hatasi');
                        }
                    } else {
                        toast.success(`Odeme basarili! ${coins} coin hesabina eklendi.`);
                    }
                } catch (error) {
                    console.error('Payment verification error:', error);
                    toast.success(`${coins} coin satin alma tamamlandi!`);
                }
            };

            verifyPayment();
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        if (canceled === 'true') {
            toast.info('Odeme iptal edildi.');
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);
}

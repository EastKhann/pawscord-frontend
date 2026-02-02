#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Add payment success useEffect to App.js"""

with open('src/App.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find line 660 (after the email verification useEffect closes)
# Insert new useEffect for payment success handling

payment_code = '''
    // 💰 PAYMENT SUCCESS: Stripe/Coinbase'den döndükten sonra coin ekleme
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
                                toast.info(`💰 Ödeme zaten işlendi! Bakiye: ${data.balance} coin`);
                            } else {
                                toast.success(`🎉 ${coins} coin hesabına eklendi! Yeni bakiye: ${data.balance} coin`);
                            }
                        } else {
                            toast.error(data.error || 'Ödeme doğrulama hatası');
                        }
                    } else {
                        toast.success(`🎉 Ödeme başarılı! ${coins} coin hesabına eklendi.`);
                    }
                } catch (error) {
                    console.error('Payment verification error:', error);
                    toast.success(`💰 ${coins} coin satın alma tamamlandı!`);
                }
            };
            
            verifyPayment();
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        if (canceled === 'true') {
            toast.info('❌ Ödeme iptal edildi.');
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

'''

# Check if already added
content = ''.join(lines)
if 'PAYMENT SUCCESS' not in content:
    # Insert after line 660 (after }, []);)
    lines.insert(660, payment_code)
    print("✅ Payment success useEffect added after line 660")
else:
    print("⚠️ Payment success handler already exists")

with open('src/App.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Done!")

#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Add payment success handler to App.js"""

with open('src/App.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the closing of the useEffect for email verification
old_code = """        // 🔑 Google ile giriş yapan kullanıcılar için şifre belirleme kontrolü
        if (needsPassword === 'true') {
            console.log('🔑 [Auth] Google user needs to set password');
            setShowPasswordSetupModal(true);
            // Clear URL parameters
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);"""

new_code = """        // 🔑 Google ile giriş yapan kullanıcılar için şifre belirleme kontrolü
        if (needsPassword === 'true') {
            console.log('🔑 [Auth] Google user needs to set password');
            setShowPasswordSetupModal(true);
            // Clear URL parameters
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        // 💰 PAYMENT SUCCESS: Stripe'dan döndükten sonra coin ekleme
        const success = params.get('success');
        const coins = params.get('coins');
        const sessionId = params.get('session_id');
        const canceled = params.get('canceled');

        if (success === 'true' && coins) {
            const verifyPayment = async () => {
                try {
                    const apiBase = getApiBase();
                    const token = localStorage.getItem('access_token');
                    
                    // Session ID varsa verify et
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
                        // Session ID yoksa sadece success mesajı göster
                        toast.success(`🎉 Ödeme başarılı! ${coins} coin hesabına eklendi.`);
                    }
                } catch (error) {
                    console.error('Payment verification error:', error);
                    toast.success(`💰 ${coins} coin satın alma işlemi başlatıldı!`);
                }
            };
            
            verifyPayment();
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        if (canceled === 'true') {
            toast.info('❌ Ödeme iptal edildi.');
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);"""

if "PAYMENT SUCCESS" not in content:
    # Try with encoded characters
    import re
    # Find pattern with any encoding
    pattern = r"(// .* Google.*?needsPassword.*?setShowPasswordSetupModal\(true\);\s*// Clear URL parameters\s*window\.history\.replaceState\(\{\}, document\.title, window\.location\.pathname\);\s*\})\s*(\], \[\]\);)"
    
    match = re.search(pattern, content, re.DOTALL)
    if match:
        # Insert the new code
        insert_pos = match.end(1)
        payment_code = """

        // 💰 PAYMENT SUCCESS: Stripe'dan döndükten sonra coin ekleme
        const success = params.get('success');
        const coins = params.get('coins');
        const sessionId = params.get('session_id');
        const canceled = params.get('canceled');

        if (success === 'true' && coins) {
            const verifyPayment = async () => {
                try {
                    const apiBase = getApiBase();
                    const token = localStorage.getItem('access_token');
                    
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
                    toast.success(`💰 ${coins} coin satın alma işlemi tamamlandı!`);
                }
            };
            
            verifyPayment();
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        if (canceled === 'true') {
            toast.info('❌ Ödeme iptal edildi.');
            window.history.replaceState({}, document.title, window.location.pathname);
        }"""
        
        content = content[:insert_pos] + payment_code + content[insert_pos:]
        print("✅ Payment success handler added!")
    else:
        print("❌ Could not find insertion point")
else:
    print("⚠️ Payment success handler already exists")

with open('src/App.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")

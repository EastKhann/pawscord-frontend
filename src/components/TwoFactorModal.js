// frontend/src/components/TwoFactorModal.js
import React, { useState } from 'react';
import FaLock from 'react-icons/fa/FaLock';
import FaTimes from 'react-icons/fa/FaTimes';
import FaShieldAlt from 'react-icons/fa/FaShieldAlt';

/**
 * 🔐 2FA (Two-Factor Authentication) Modal
 * İki faktörlü kimlik doğrulama ekranı
 */
const TwoFactorModal = ({
    isOpen,
    onClose,
    onVerify,
    method = 'totp', // 'totp', 'sms', 'email'
    isLoading = false
}) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Kod validasyonu
        if (code.length !== 6) {
            setError('Lütfen 6 haneli kodu girin');
            return;
        }

        if (!/^\d+$/.test(code)) {
            setError('Kod sadece rakamlardan oluşmalı');
            return;
        }

        // Doğrulama callback'i çağır
        onVerify(code);
    };

    const handlePaste = (e) => {
        const pastedText = e.clipboardData.getData('text');
        const numbers = pastedText.replace(/\D/g, '');
        if (numbers.length === 6) {
            setCode(numbers);
        }
    };

    const methodText = {
        totp: 'Authenticator uygulamanızdaki kodu girin',
        sms: 'Telefonunuza gönderilen kodu girin',
        email: 'E-postanıza gönderilen kodu girin'
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: '#2f3136',
                borderRadius: '8px',
                padding: '24px',
                width: '400px',
                maxWidth: '90%',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaShieldAlt style={{ color: '#5865f2', fontSize: '24px' }} />
                        <h2 style={{ margin: 0, color: '#fff', fontSize: '20px' }}>
                            İki Faktörlü Doğrulama
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#b9bbbe',
                            cursor: 'pointer',
                            fontSize: '20px'
                        }}
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Info Text */}
                <p style={{
                    color: '#b9bbbe',
                    fontSize: '14px',
                    marginBottom: '20px'
                }}>
                    {methodText[method]}
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            color: '#b9bbbe',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            display: 'block',
                            marginBottom: '8px'
                        }}>
                            Doğrulama Kodu
                        </label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                setCode(value);
                                setError('');
                            }}
                            onPaste={handlePaste}
                            placeholder="000000"
                            maxLength={6}
                            autoFocus
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: '#202225',
                                border: error ? '2px solid #ed4245' : '2px solid #40444b',
                                borderRadius: '4px',
                                color: '#fff',
                                fontSize: '20px',
                                letterSpacing: '8px',
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                transition: 'border-color 0.2s'
                            }}
                        />
                        {error && (
                            <p style={{
                                color: '#ed4245',
                                fontSize: '12px',
                                marginTop: '8px',
                                marginBottom: 0
                            }}>
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'flex-end'
                    }}>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            style={{
                                padding: '10px 20px',
                                background: 'transparent',
                                border: 'none',
                                color: '#b9bbbe',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                borderRadius: '4px',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || code.length !== 6}
                            style={{
                                padding: '10px 20px',
                                background: code.length === 6 ? '#5865f2' : '#4752c4',
                                border: 'none',
                                color: '#fff',
                                cursor: (isLoading || code.length !== 6) ? 'not-allowed' : 'pointer',
                                borderRadius: '4px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                opacity: (isLoading || code.length !== 6) ? 0.5 : 1,
                                transition: 'all 0.2s'
                            }}
                        >
                            {isLoading ? (
                                <span>Doğrulanıyor...</span>
                            ) : (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FaLock /> Doğrula
                                </span>
                            )}
                        </button>
                    </div>
                </form>

                {/* Help Text */}
                <div style={{
                    marginTop: '20px',
                    padding: '12px',
                    background: 'rgba(88, 101, 242, 0.1)',
                    borderRadius: '4px',
                    borderLeft: '3px solid #5865f2'
                }}>
                    <p style={{
                        margin: 0,
                        fontSize: '12px',
                        color: '#b9bbbe'
                    }}>
                        💡 <strong>İpucu:</strong> Kodu kopyala-yapıştır yapabilirsiniz
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TwoFactorModal;



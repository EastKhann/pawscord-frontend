import React, { useState } from 'react';
import './TwoFactorLogin.css';

const TwoFactorLogin = ({ onVerify, onCancel, username }) => {
    const [code, setCode] = useState('');
    const [useBackupCode, setUseBackupCode] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (code.length < 6) {
            setError('Geçersiz kod uzunluğu');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await onVerify(code, useBackupCode);
        } catch (err) {
            setError(err.message || 'Doğrulama başarısız');
            setCode('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="twofa-login-overlay">
            <div className="twofa-login-content">
                <button className="twofa-login-close" onClick={onCancel}>×</button>

                <h2>🔐 İki Faktörlü Doğrulama</h2>
                <p className="twofa-login-subtitle">
                    {username} hesabına giriş yapılıyor
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="twofa-login-input-group">
                        <label>
                            {useBackupCode ? 'Yedek Kod' : 'Authenticator Kodu'}
                        </label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                            placeholder={useBackupCode ? "12345678" : "000000"}
                            maxLength={useBackupCode ? 8 : 6}
                            className="twofa-login-input"
                            autoFocus
                            disabled={loading}
                        />
                    </div>

                    {error && (
                        <div className="twofa-login-error">
                            ❌ {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="twofa-login-submit"
                        disabled={loading || code.length < 6}
                    >
                        {loading ? 'Doğrulanıyor...' : 'Giriş Yap'}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setUseBackupCode(!useBackupCode);
                            setCode('');
                            setError('');
                        }}
                        className="twofa-login-toggle"
                    >
                        {useBackupCode
                            ? '← Authenticator Kodu Kullan'
                            : 'Yedek Kod Kullan →'}
                    </button>
                </form>

                <div className="twofa-login-help">
                    <p>💡 <strong>İpucu:</strong></p>
                    <ul>
                        <li>Google Authenticator veya Authy uygulamasını açın</li>
                        <li>PAWSCORD için gösterilen 6 haneli kodu girin</li>
                        <li>Telefonunuza erişemiyorsanız yedek kodlarınızı kullanın</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TwoFactorLogin;



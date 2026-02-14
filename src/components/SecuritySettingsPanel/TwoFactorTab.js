import React from 'react';

const TwoFactorTab = ({
    twoFactorEnabled, qrCode, verificationCode, setVerificationCode,
    backupCodes, enable2FA, verify2FASetup, disable2FA, getBackupCodes, downloadBackupCodes
}) => (
    <div className="tab-content">
        <h3>{'İ'}ki Faktörlü Kimlik Doğrulama (2FA)</h3>
        <p>Hesabınızı ekstra bir güvenlik katmanıyla koruyun</p>

        {!twoFactorEnabled && !qrCode ? (
            <div className="enable-2fa">
                <button className="enable-btn" onClick={enable2FA}>2FA'yı Etkinleştir</button>
            </div>
        ) : twoFactorEnabled ? (
            <div className="enabled-2fa">
                <div className="success-message">
                    <span className="success-icon">{'✅'}</span>
                    <span>2FA aktif - Hesabınız korunuyor</span>
                </div>
                <button className="disable-btn" onClick={disable2FA}>2FA'yı Devre Dışı Bırak</button>
                <button className="backup-btn" onClick={getBackupCodes}>Yeni Yedek Kodlar Oluştur</button>
            </div>
        ) : (
            <div className="setup-2fa">
                <div className="qr-section">
                    <h4>1. QR Kodu Tarayın</h4>
                    {qrCode && <img src={qrCode} alt="2FA QR Code" className="qr-code" />}
                    <p>Authenticator uygulamanızla QR kodu tarayın</p>
                </div>
                <div className="verify-section">
                    <h4>2. Doğrulama Kodunu Girin</h4>
                    <input type="text" placeholder="6 haneli kod" value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)} maxLength={6} className="verification-input" />
                    <button className="verify-btn" onClick={verify2FASetup}>Doğrula ve Etkinleştir</button>
                </div>
                {backupCodes.length > 0 && (
                    <div className="backup-codes">
                        <h4>3. Yedek Kodlarınız</h4>
                        <p>Bu kodları güvenli bir yerde saklayın!</p>
                        <div className="codes-grid">
                            {backupCodes.map((code, index) => (
                                <div key={index} className="backup-code">{code}</div>
                            ))}
                        </div>
                        <button className="download-btn" onClick={downloadBackupCodes}>{'📥'} Kodları {'İ'}ndir</button>
                    </div>
                )}
            </div>
        )}
    </div>
);

export default TwoFactorTab;

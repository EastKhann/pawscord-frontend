import React from 'react';

const TwoFactorTab = ({
    twoFactorEnabled, qrCode, verificationCode, setVerificationCode,
    backupCodes, enable2FA, verify2FASetup, disable2FA, getBackupCodes, downloadBackupCodes
}) => (
    <div className="tab-content">
        <h3>{'\u0130'}ki Fakt\u00F6rl\u00FC Kimlik Do\u011Frulama (2FA)</h3>
        <p>Hesab\u0131n\u0131z\u0131 ekstra bir g\u00FCvenlik katman\u0131yla koruyun</p>

        {!twoFactorEnabled && !qrCode ? (
            <div className="enable-2fa">
                <button className="enable-btn" onClick={enable2FA}>2FA'y\u0131 Etkinle\u015Ftir</button>
            </div>
        ) : twoFactorEnabled ? (
            <div className="enabled-2fa">
                <div className="success-message">
                    <span className="success-icon">{'\u2705'}</span>
                    <span>2FA aktif - Hesab\u0131n\u0131z korunuyor</span>
                </div>
                <button className="disable-btn" onClick={disable2FA}>2FA'y\u0131 Devre D\u0131\u015F\u0131 B\u0131rak</button>
                <button className="backup-btn" onClick={getBackupCodes}>Yeni Yedek Kodlar Olu\u015Ftur</button>
            </div>
        ) : (
            <div className="setup-2fa">
                <div className="qr-section">
                    <h4>1. QR Kodu Taray\u0131n</h4>
                    {qrCode && <img src={qrCode} alt="2FA QR Code" className="qr-code" />}
                    <p>Authenticator uygulaman\u0131zla QR kodu taray\u0131n</p>
                </div>
                <div className="verify-section">
                    <h4>2. Do\u011Frulama Kodunu Girin</h4>
                    <input type="text" placeholder="6 haneli kod" value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)} maxLength={6} className="verification-input" />
                    <button className="verify-btn" onClick={verify2FASetup}>Do\u011Frula ve Etkinle\u015Ftir</button>
                </div>
                {backupCodes.length > 0 && (
                    <div className="backup-codes">
                        <h4>3. Yedek Kodlar\u0131n\u0131z</h4>
                        <p>Bu kodlar\u0131 g\u00FCvenli bir yerde saklay\u0131n!</p>
                        <div className="codes-grid">
                            {backupCodes.map((code, index) => (
                                <div key={index} className="backup-code">{code}</div>
                            ))}
                        </div>
                        <button className="download-btn" onClick={downloadBackupCodes}>{'\uD83D\uDCE5'} Kodlar\u0131 {'\u0130'}ndir</button>
                    </div>
                )}
            </div>
        )}
    </div>
);

export default TwoFactorTab;

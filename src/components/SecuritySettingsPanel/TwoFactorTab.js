import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const TwoFactorTab = ({
    twoFactorEnabled,
    qrCode,
    verificationCode,
    setVerificationCode,
    backupCodes,
    enable2FA,
    verify2FASetup,
    disable2FA,
    getBackupCodes,
    downloadBackupCodes,
}) => {
    const { t } = useTranslation();
    return (
        <div className="tab-content">
            <h3>İki Faktörlü Kimlik Verification (2FA)</h3>
            <p>{t('hesabınızı_ekstra_bir_güvenlik_katmanıyla_koruyun')}</p>

            {!twoFactorEnabled && !qrCode ? (
                <div className="enable-2fa">
                    <button className="enable-btn" onClick={enable2FA}>
                        {t('2fa_yı_etkinleştir')}
                    </button>
                </div>
            ) : twoFactorEnabled ? (
                <div className="enabled-2fa">
                    <div className="success-message">
                        <span className="success-icon">✅</span>
                        <span>{t('2fa_aktif_-_hesabınız_korunuyor')}</span>
                    </div>
                    <button className="disable-btn" onClick={disable2FA}>
                        {t('2fa_yı_devre_dı_bırak')}
                    </button>
                    <button className="backup-btn" onClick={getBackupCodes}>
                        {t('yeni_yedek_kodlar_create')}
                    </button>
                </div>
            ) : (
                <div className="setup-2fa">
                    <div className="qr-section">
                        <h4>{t('1_qr_kodu_tarayın')}</h4>
                        {qrCode && <img src={qrCode} alt="2FA QR Code" className="qr-code" />}
                        <p>{t('authenticator_uygulamanızla_qr_kodu_tarayın')}</p>
                    </div>
                    <div className="verify-section">
                        <h4>{t('2_doğrulama_kodunu_girin')}</h4>
                        <input
                            type="text"
                            placeholder={t('6_haneli_kod')}
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            maxLength={6}
                            className="verification-input"
                        />
                        <button className="verify-btn" onClick={verify2FASetup}>
                            {t('doğrula_ve_etkinleştir')}
                        </button>
                    </div>
                    {backupCodes.length > 0 && (
                        <div className="backup-codes">
                            <h4>{t('3_yedek_kodlarınız')}</h4>
                            <p>{t('bu_kodları_güvenli_bir_yerde_saklayın')}</p>
                            <div className="codes-grid">
                                {backupCodes.map((code, index) => (
                                    <div key={`item-${index}`} className="backup-code">
                                        {code}
                                    </div>
                                ))}
                            </div>
                            <button className="download-btn" onClick={downloadBackupCodes}>
                                📥 {t('ui.kodlari_indir')}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

TwoFactorTab.propTypes = {
    twoFactorEnabled: PropTypes.bool,
    qrCode: PropTypes.string,
    verificationCode: PropTypes.string,
    setVerificationCode: PropTypes.func,
    backupCodes: PropTypes.array,
    enable2FA: PropTypes.func,
    verify2FASetup: PropTypes.func,
    disable2FA: PropTypes.func,
    getBackupCodes: PropTypes.func,
    downloadBackupCodes: PropTypes.func,
};
export default TwoFactorTab;

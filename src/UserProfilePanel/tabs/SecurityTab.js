import React from 'react';
import profileStyles from '../styles';

const SecurityTab = ({
  backupCodes,
  disable2FA,
  enable2FA,
  handlePasswordChange,
  hasPassword,
  loading,
  passwordData,
  revokeAllSessions,
  revokeSession,
  sessions,
  setPasswordData,
  setVerificationCode,
  twoFactorData,
  twoFactorEnabled,
  user,
  verificationCode,
  verify2FASetup,
}) => {
  const styles = profileStyles;

  return (
    <>
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>🔒 İki Faktörlü Kimlik Doğrulama (2FA)</h3>

        {!twoFactorEnabled && !twoFactorData && (
          <div>
            <p style={{ color: '#b5bac1', marginBottom: '16px' }}>
              Hesabınızı ekstra bir güvenlik katmanıyla koruyun. Giriş yaparken telefonunuzdaki
              doğrulama kodunu girmeniz istenecek.
            </p>
            <button
              style={styles.button('primary')}
              onClick={enable2FA}
              disabled={loading.enable2fa}
            >
              {loading.enable2fa ? '⏳ Etkinleştiriliyor...' : '🔐 2FA Etkinleştir'}
            </button>
          </div>
        )}

        {twoFactorData && (
          <div>
            <p style={{ color: '#b5bac1', marginBottom: '16px' }}>
              Aşağıdaki QR kodunu Google Authenticator, Authy veya benzer bir uygulamayla tarayın:
            </p>

            <div style={styles.qrCode}>
              {twoFactorData.qr_code ? (
                <img src={twoFactorData.qr_code} alt="QR Code" style={{ width: '200px', height: '200px' }} />
              ) : (
                <QRCodeSVG value={`otpauth://totp/Pawscord:${user.email}?secret=${twoFactorData.secret}&issuer=Pawscord`} size={200} />
              )}
              <p style={{ color: '#b5bac1', fontSize: '12px', marginTop: '12px' }}>
                Manuel kod: <code style={{ background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px' }}>{twoFactorData.secret}</code>
              </p>
            </div>

            <div style={{ marginTop: '24px' }}>
              <label style={styles.label}>Doğrulama Kodu</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="6 haneli kod"
                style={styles.input}
                maxLength={6}
              />
              <button
                style={{ ...styles.button('primary'), marginTop: '12px' }}
                onClick={verify2FASetup}
                disabled={loading.verify2fa || verificationCode.length !== 6}
              >
                {loading.verify2fa ? '⏳ Doğrulanıyor...' : '✅ Doğrula ve Etkinleştir'}
              </button>
            </div>

            {backupCodes.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <h4 style={{ color: '#fff', marginBottom: '12px' }}>🔑 Yedek Kodlar (Kaydedin!)</h4>
                <p style={{ color: '#f0b232', fontSize: '13px', marginBottom: '12px' }}>
                  ⚠️ Bu kodları güvenli bir yerde saklayın! Telefonunuza erişemezseniz kullanabilirsiniz.
                </p>
                <div style={styles.backupCodesGrid}>
                  {backupCodes.map((code, idx) => (
                    <div key={idx} style={styles.backupCode}>{code}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {twoFactorEnabled && (
          <div>
            <p style={{ color: '#23a559', marginBottom: '16px' }}>
              ✅ 2FA aktif! Hesabınız korunuyor.
            </p>
            <button
              style={styles.button('danger')}
              onClick={disable2FA}
              disabled={loading.disable2fa}
            >
              {loading.disable2fa ? '⏳ Devre Dışı Bırakılıyor...' : '🔓 2FA Devre Dışı Bırak'}
            </button>
          </div>
        )}
      </div>

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>
          🔑 {hasPassword ? 'Şifre Değiştir' : 'Şifre Belirle'}
        </h3>

        {/* 🆕 Google/OAuth kullanıcıları için bilgilendirme */}
        {!hasPassword && (
          <div style={{
            background: 'rgba(88, 101, 242, 0.1)',
            border: '1px solid rgba(88, 101, 242, 0.3)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px',
            fontSize: '14px',
            color: '#b5bac1'
          }}>
            <strong style={{ color: '#5865f2' }}>ℹ️ Bilgi:</strong> Google ile giriş yaptınız.
            Şifre belirleyerek normal giriş de yapabilirsiniz.
          </div>
        )}

        <form onSubmit={handlePasswordChange}>
          {/* 🆕 Eski şifre alanı sadece şifresi olan kullanıcılara göster */}
          {hasPassword && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Eski Şifre</label>
              <input
                type="password"
                value={passwordData.old_password}
                onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })}
                style={styles.input}
                required={hasPassword}
              />
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Yeni Şifre</label>
            <input
              type="password"
              value={passwordData.new_password}
              onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
              style={styles.input}
              required
              minLength={12}
            />
            <small style={{ color: '#80848e', fontSize: '11px', marginTop: '4px', display: 'block' }}>
              En az 12 karakter, büyük/küçük harf, rakam ve özel karakter (!@#$%)
            </small>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Yeni Şifre (Tekrar)</label>
            <input
              type="password"
              value={passwordData.confirm_password}
              onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
              style={styles.input}
              required
              minLength={12}
            />
          </div>

          <button
            type="submit"
            style={styles.button('primary')}
            disabled={loading.changePassword}
          >
            {loading.changePassword ? '⏳ Kaydediliyor...' : (hasPassword ? '🔐 Şifreyi Değiştir' : '🔐 Şifre Belirle')}
          </button>
        </form>
      </div>

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>🖥️ Aktif Oturumlar</h3>

        {sessions.length === 0 && (
          <p style={{ color: '#b5bac1' }}>Aktif oturum bulunamadı.</p>
        )}

        {sessions.map((session) => (
          <div key={session.id} style={styles.sessionCard}>
            <div>
              <p style={{ color: '#fff', margin: 0, fontWeight: '600' }}>
                {session.device_name || 'Bilinmeyen Cihaz'}
              </p>
              <p style={{ color: '#b5bac1', fontSize: '12px', margin: '4px 0 0 0' }}>
                IP: {session.ip_address} • {new Date(session.created_at).toLocaleDateString('tr-TR')}
              </p>
            </div>
            <button
              style={styles.button('danger')}
              onClick={() => revokeSession(session.id)}
            >
              ❌ Sonlandır
            </button>
          </div>
        ))}

        {sessions.length > 0 && (
          <button
            style={{ ...styles.button('danger'), marginTop: '16px' }}
            onClick={revokeAllSessions}
          >
            🚨 Tüm Oturumları Sonlandır
          </button>
        )}
      </div>
    </>
  );
};

export default SecurityTab;

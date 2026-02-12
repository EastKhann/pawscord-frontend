import React from 'react';
import profileStyles from '../styles';

const AppearanceTab = ({ applyTheme, availableLanguages, currentTheme, language, themes, updateLanguage }) => {
  const styles = profileStyles;

  return (
    <>
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>🎨 Temalar</h3>

        <p style={{ color: '#b9bbbe', marginBottom: '16px' }}>
          Profil temanızı seçin ve görünümünüzü kişiselleştirin.
        </p>

        <div style={styles.themeGrid}>
          <div
            style={styles.themeCard(currentTheme === 'dark')}
            onClick={() => applyTheme('dark')}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🌙</div>
            <p style={{ color: '#fff', margin: 0, fontWeight: '600' }}>Karanlık</p>
          </div>

          <div
            style={styles.themeCard(currentTheme === 'light')}
            onClick={() => applyTheme('light')}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>☀️</div>
            <p style={{ color: '#fff', margin: 0, fontWeight: '600' }}>Aydınlık</p>
          </div>

          <div
            style={styles.themeCard(currentTheme === 'custom')}
            onClick={() => applyTheme('custom')}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎨</div>
            <p style={{ color: '#fff', margin: 0, fontWeight: '600' }}>Özel</p>
          </div>

          {themes.map((theme) => (
            <div
              key={theme.id}
              style={styles.themeCard(currentTheme === theme.name)}
              onClick={() => applyTheme(theme.name)}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{theme.icon || '🎭'}</div>
              <p style={{ color: '#fff', margin: 0, fontWeight: '600' }}>{theme.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>🌍 Dil Tercihi</h3>

        <p style={{ color: '#b9bbbe', marginBottom: '16px' }}>
          Uygulama dilini seçin. Mesajlar otomatik çevrilecektir.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {availableLanguages.map((lang) => (
            <div
              key={lang.code}
              style={{
                padding: '16px',
                background: language === lang.code ? 'linear-gradient(135deg, #5865f2 0%, #7289da 100%)' : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s',
                border: language === lang.code ? '2px solid #fff' : '2px solid transparent',
              }}
              onClick={() => updateLanguage(lang.code)}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{lang.flag || '🌐'}</div>
              <p style={{ color: '#fff', margin: 0, fontWeight: '600', fontSize: '14px' }}>{lang.name}</p>
            </div>
          ))}
        </div>

        {availableLanguages.length === 0 && (
          <p style={{ color: '#b9bbbe' }}>Diller yükleniyor...</p>
        )}
      </div>
    </>
  );
};

export default AppearanceTab;

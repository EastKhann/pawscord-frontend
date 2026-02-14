import { FaPalette, FaUpload, FaSave } from 'react-icons/fa';
import useProfileCustomization from './ProfileCustomization/useProfileCustomization';
import { styles, THEME_PRESETS } from './ProfileCustomization/profileCustomizationStyles';

const ProfileCustomization = ({ userId, fetchWithAuth, apiBaseUrl }) => {
  const { customization, previewMode, setPreviewMode, loading, saveCustomization, applyPreset, uploadBanner, updateField } = useProfileCustomization(userId, fetchWithAuth, apiBaseUrl);

  if (loading) return <div style={styles.loading}>Y{'\u00FC'}kleniyor...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}><FaPalette /> Profil {'\u00D6'}zelle{'\u015F'}tirme</h2>
        <div style={styles.headerActions}>
          <button onClick={() => setPreviewMode(!previewMode)} style={previewMode ? styles.previewButtonActive : styles.previewButton}>
            {previewMode ? 'D\u00FCzenleme' : '\u00D6nizleme'}
          </button>
          <button onClick={saveCustomization} style={styles.saveButton}><FaSave /> Kaydet</button>
        </div>
      </div>

      {previewMode ? (
        <div style={styles.preview}>
          <div style={{ ...styles.previewBanner, backgroundColor: customization.banner_color, backgroundImage: customization.banner_url ? `url(${customization.banner_url})` : 'none' }} />
          <div style={styles.previewContent}>
            <div style={{ ...styles.previewAvatar, border: `4px solid ${customization.theme_color}` }}>{'\uD83D\uDC64'}</div>
            <div style={styles.previewInfo}>
              <h3 style={{ color: customization.theme_color }}>Kullan{'\u0131'}c{'\u0131'} Ad{'\u0131'}</h3>
              <p style={{ backgroundColor: customization.bio_background_color, color: '#fff', padding: '12px', borderRadius: '8px', borderLeft: `3px solid ${customization.accent_color}` }}>
                {customization.bio_text || 'Buraya biyografi metni gelecek...'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.editContainer}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{'\uD83D\uDDBC\uFE0F'} Banner</h3>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Banner Resmi</label>
              <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && uploadBanner(e.target.files[0])} style={styles.fileInput} />
              <button onClick={() => document.querySelector('input[type="file"]').click()} style={styles.uploadButton}><FaUpload /> Resim Y{'\u00FC'}kle</button>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Banner Rengi (resim yoksa)</label>
              <input type="color" value={customization.banner_color} onChange={(e) => updateField('banner_color', e.target.value)} style={styles.colorInput} />
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{'\uD83C\uDFA8'} Haz{'\u0131'}r Temalar</h3>
            <div style={styles.presetGrid}>
              {THEME_PRESETS.map((preset, idx) => (
                <div key={idx} onClick={() => applyPreset(preset)} style={{ ...styles.presetCard, background: `linear-gradient(135deg, ${preset.primary}, ${preset.accent})` }}>
                  <span style={styles.presetName}>{preset.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{'\uD83C\uDFA8'} Renkler</h3>
            <div style={styles.colorGrid}>
              {[
                { field: 'theme_color', label: 'Ana Tema Rengi' },
                { field: 'accent_color', label: 'Vurgu Rengi' },
                { field: 'bio_background_color', label: 'Biyografi Arka Plan' }
              ].map(c => (
                <div key={c.field} style={styles.inputGroup}>
                  <label style={styles.label}>{c.label}</label>
                  <input type="color" value={customization[c.field]} onChange={(e) => updateField(c.field, e.target.value)} style={styles.colorInput} />
                </div>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{'\uD83D\uDCDD'} Biyografi</h3>
            <textarea value={customization.bio_text} onChange={(e) => updateField('bio_text', e.target.value)} placeholder="Biyografini buraya yaz..." style={styles.bioTextarea} maxLength={190} />
            <div style={styles.charCount}>{customization.bio_text.length} / 190 karakter</div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{'\u2699\uFE0F'} G{'\u00F6'}r{'\u00FC'}n{'\u00FC'}m Ayarlar{'\u0131'}</h3>
            {[
              { field: 'show_badges', label: 'Rozetleri g\u00F6ster' },
              { field: 'show_activity', label: 'Aktiviteyi g\u00F6ster' }
            ].map(opt => (
              <label key={opt.field} style={styles.checkbox}>
                <input type="checkbox" checked={customization[opt.field]} onChange={(e) => updateField(opt.field, e.target.checked)} />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCustomization;

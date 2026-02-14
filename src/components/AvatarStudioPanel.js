import { FaTimes, FaUser, FaPalette, FaSave, FaRandom, FaCoins, FaBookmark } from 'react-icons/fa';
import useAvatarStudio from './AvatarStudioPanel/useAvatarStudio';
import AvatarPreview from './AvatarStudioPanel/AvatarPreview';
import { styles, CATEGORIES } from './AvatarStudioPanel/avatarStudioStyles';

const AvatarStudioPanel = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
  const s = useAvatarStudio(fetchWithAuth, apiBaseUrl);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <FaUser style={{ marginRight: '10px', color: '#5865f2' }} />
            <h2 style={styles.title}>Avatar Studio</h2>
          </div>
          <div style={styles.coinsDisplay}><FaCoins style={{ color: '#faa61a' }} /><span>{s.userCoins}</span></div>
          <button onClick={onClose} style={styles.closeButton}><FaTimes /></button>
        </div>

        <div style={styles.tabs}>
          <button onClick={() => s.setView('customize')} style={s.view === 'customize' ? styles.activeTab : styles.tab}><FaPalette /> Customize</button>
          <button onClick={() => s.setView('presets')} style={s.view === 'presets' ? styles.activeTab : styles.tab}><FaBookmark /> Presets</button>
        </div>

        <div style={styles.mainContent}>
          {s.view === 'customize' && (
            <>
              <div style={styles.previewSection}>
                <AvatarPreview avatar={s.avatar} parts={s.parts} />
                <div style={styles.previewActions}>
                  <button onClick={s.randomizeAvatar} style={styles.actionBtn}><FaRandom /> Random</button>
                  <button onClick={s.savePreset} style={styles.actionBtn}><FaBookmark /> Save Preset</button>
                  <button onClick={s.saveAvatar} style={styles.saveBtn} disabled={s.loading}><FaSave /> {s.loading ? 'Saving...' : 'Save Avatar'}</button>
                </div>
              </div>

              <div style={styles.customizeSection}>
                <div style={styles.categoryTabs}>
                  {CATEGORIES.map(cat => (
                    <button key={cat.id} onClick={() => s.setActiveCategory(cat.id)} style={s.activeCategory === cat.id ? styles.catActive : styles.catBtn}>
                      <span>{cat.icon}</span><span style={styles.catName}>{cat.name}</span>
                    </button>
                  ))}
                </div>

                <div style={styles.itemsGrid}>
                  {(s.parts[s.activeCategory] || []).map(item => {
                    const isOwned = item.free || s.ownedItems.includes(item.id);
                    const isSelected = Object.values(s.avatar).includes(item.id);
                    return (
                      <div key={item.id} style={{ ...styles.itemCard, ...(isSelected ? styles.itemSelected : {}), ...(!isOwned ? styles.itemLocked : {}) }} onClick={() => isOwned && s.selectPart(s.activeCategory, item.id)}>
                        {item.color && !['gradient', 'galaxy', 'rainbow'].includes(item.color) ? (
                          <div style={{ ...styles.colorSwatch, background: item.color }} />
                        ) : (
                          <span style={styles.itemPreview}>{(item.name || item.id).charAt(0).toUpperCase()}</span>
                        )}
                        <span style={styles.itemName}>{item.name || item.id}</span>
                        {!isOwned && (
                          <button onClick={(e) => { e.stopPropagation(); s.purchaseItem(s.activeCategory, item.id); }} style={styles.buyBtn} disabled={s.loading || s.userCoins < (item.coins || 0)}>
                            <FaCoins /> {item.coins}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {s.view === 'presets' && (
            <div style={styles.presetsGrid}>
              {s.presets.map(preset => (
                <div key={preset.id} style={styles.presetCard}>
                  <AvatarPreview avatar={preset.config} parts={s.parts} mini />
                  <span style={styles.presetName}>{preset.name}</span>
                  <button onClick={() => s.loadPreset(preset)} style={styles.loadBtn}>Load</button>
                </div>
              ))}
              {s.presets.length === 0 && <p style={styles.emptyText}>No presets saved yet</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvatarStudioPanel;

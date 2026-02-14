import { FaShieldAlt, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { getStyles } from './AIModerationPanel/aiModerationStyles';
import useAIModeration from './AIModerationPanel/useAIModeration';
import FlagCard from './AIModerationPanel/FlagCard';

const TOGGLES = [
  { key: 'spamDetection', label: 'Spam Detection', desc: 'Detect repeated or mass messages' },
  { key: 'profanityFilter', label: 'Profanity Filter', desc: 'Block offensive language' },
  { key: 'nsfwDetection', label: 'NSFW Detection', desc: 'Detect inappropriate images' },
];

const STAT_ITEMS = [
  { key: 'messagesScanned', label: 'Messages Scanned', fmt: v => v.toLocaleString() },
  { key: 'flaggedToday', label: 'Flagged Today' },
  { key: 'autoModActions', label: 'Auto Actions' },
  { key: 'accuracy', label: 'Accuracy', suffix: '%' },
];

const AIModerationPanel = ({ serverSlug, token, isMobile }) => {
  const { settings, setSettings, recentFlags, stats, saveSettings, handleAction } = useAIModeration(serverSlug, token);
  const styles = getStyles(isMobile);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}><FaShieldAlt /> AI Moderation</h1>
        <p style={styles.subtitle}>Automated content filtering powered by machine learning</p>
      </div>

      <div style={styles.statsGrid}>
        {STAT_ITEMS.map(s => (
          <div key={s.key} style={styles.statCard}>
            <div style={styles.statValue}>{s.fmt ? s.fmt(stats[s.key]) : stats[s.key]}{s.suffix || ''}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>{'⚙️'} Detection Settings</h2>
        {TOGGLES.map(t => (
          <div key={t.key} style={styles.setting}>
            <div style={styles.settingInfo}>
              <div style={styles.settingLabel}>{t.label}</div>
              <div style={styles.settingDesc}>{t.desc}</div>
            </div>
            <div style={styles.switch(settings[t.key])} onClick={() => setSettings({ ...settings, [t.key]: !settings[t.key] })}>
              <div style={styles.switchKnob(settings[t.key])} />
            </div>
          </div>
        ))}
        <div style={styles.setting}>
          <div style={styles.settingInfo}>
            <div style={styles.settingLabel}>Toxicity Threshold: {settings.toxicityThreshold}%</div>
            <div style={styles.settingDesc}>Sensitivity level for toxic content</div>
          </div>
          <input type="range" min="0" max="100" value={settings.toxicityThreshold} onChange={(e) => setSettings({ ...settings, toxicityThreshold: parseInt(e.target.value) })} style={styles.slider} />
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}><FaExclamationTriangle /> Recent Flags ({recentFlags.length})</h2>
        {recentFlags.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.5)' }}>
            <FaCheckCircle size={48} />
            <p style={{ marginTop: '16px' }}>No recent violations detected</p>
          </div>
        ) : (
          <div style={styles.flagsList}>
            {recentFlags.map(flag => <FlagCard key={flag.id} flag={flag} styles={styles} onAction={handleAction} />)}
          </div>
        )}
      </div>

      <button onClick={saveSettings} style={styles.saveBtn}>{'💾'} Save Settings</button>
    </div>
  );
};

export default AIModerationPanel;

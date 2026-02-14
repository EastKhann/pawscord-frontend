import { FaTimes, FaRocket, FaCrown, FaStar, FaGift, FaHistory, FaUsers } from 'react-icons/fa';
import { styles } from './ServerBoostPanel/serverBoostStyles';
import useServerBoost, { PERKS, getBoostLevel } from './ServerBoostPanel/useServerBoost';

const ServerBoostPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
  const {
    boosts, serverStats, loading, activeTab, setActiveTab,
    boostServer, currentBoostCount, currentLevel, progress
  } = useServerBoost(fetchWithAuth, apiBaseUrl, serverId);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <FaRocket style={{ marginRight: '10px', color: '#5865f2' }} />
            <h2 style={styles.title}>Server Boost</h2>
          </div>
          <button onClick={onClose} style={styles.closeButton}><FaTimes /></button>
        </div>

        <div style={styles.tabs}>
          {[
            { key: 'overview', icon: <FaRocket style={{ marginRight: '5px' }} />, label: 'Overview' },
            { key: 'boosts', icon: <FaHistory style={{ marginRight: '5px' }} />, label: `Boosts (${boosts.length})` },
            { key: 'perks', icon: <FaGift style={{ marginRight: '5px' }} />, label: 'Perks' },
          ].map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              style={{ ...styles.tab, ...(activeTab === t.key && styles.tabActive) }}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        <div style={styles.content}>
          {loading ? (
            <div style={styles.loading}>Loading...</div>
          ) : activeTab === 'overview' ? (
            <div style={styles.overview}>
              <div style={styles.boostCard}>
                <div style={{ ...styles.boostLevel, backgroundColor: currentLevel.color }}>
                  <FaCrown style={{ fontSize: '32px' }} />
                  <div style={styles.levelText}>{currentLevel.name}</div>
                  <div style={styles.boostCountText}>{currentBoostCount} Boosts</div>
                </div>
                <div style={styles.progressSection}>
                  <div style={styles.progressHeader}>
                    <span>Progress to Next Level</span>
                    <span>{progress.current} / {progress.target}</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${Math.min(progress.percentage, 100)}%`, backgroundColor: currentLevel.color }} />
                  </div>
                  {currentBoostCount < 30 && (
                    <div style={styles.progressFooter}>{progress.target - progress.current} more boosts needed</div>
                  )}
                </div>
                <button onClick={boostServer} style={styles.boostButton}>
                  <FaRocket style={{ marginRight: '8px' }} /> Boost This Server
                </button>
              </div>
              <div style={styles.statsGrid}>
                {[
                  { icon: <FaUsers style={styles.statIcon} />, value: serverStats?.total_boosters || 0, label: 'Boosters' },
                  { icon: <FaStar style={styles.statIcon} />, value: serverStats?.total_boosts || 0, label: 'Total Boosts' },
                  { icon: <FaCrown style={styles.statIcon} />, value: currentLevel.level, label: 'Current Level' },
                ].map((s, i) => (
                  <div key={i} style={styles.statCard}>
                    {s.icon}
                    <div style={styles.statValue}>{s.value}</div>
                    <div style={styles.statLabel}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'boosts' ? (
            <div style={styles.boostsList}>
              {boosts.length === 0 ? (
                <div style={styles.empty}>No boosts yet. Be the first to boost this server!</div>
              ) : boosts.map((boost, index) => (
                <div key={index} style={styles.boostItem}>
                  <div style={styles.boostUser}>
                    <FaRocket style={{ color: '#5865f2', marginRight: '10px' }} />
                    <div>
                      <div style={styles.boostUsername}>{boost.user?.username || 'Anonymous'}</div>
                      <div style={styles.boostDate}>Boosted {new Date(boost.boosted_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                  {boost.expires_at && (
                    <div style={styles.boostExpires}>Expires {new Date(boost.expires_at).toLocaleDateString()}</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.perksList}>
              {[1, 2, 3].map(level => (
                <div key={level} style={styles.perkLevel}>
                  <div style={styles.perkLevelHeader}>
                    <FaCrown style={{ marginRight: '8px', color: getBoostLevel(level === 1 ? 2 : level === 2 ? 15 : 30).color }} />
                    Level {level} Perks
                    <span style={styles.perkRequirement}>({level === 1 ? '2' : level === 2 ? '15' : '30'} boosts required)</span>
                  </div>
                  <div style={styles.perksGrid}>
                    {PERKS.filter(p => p.level === level).map((perk, idx) => (
                      <div key={idx} style={{ ...styles.perkCard, opacity: currentLevel.level >= level ? 1 : 0.5 }}>
                        <div style={styles.perkIcon}>{perk.icon}</div>
                        <div style={styles.perkName}>{perk.name}</div>
                        <div style={styles.perkDescription}>{perk.description}</div>
                        {currentLevel.level >= level && <div style={styles.perkUnlocked}>{'\u2713'} Unlocked</div>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServerBoostPanel;

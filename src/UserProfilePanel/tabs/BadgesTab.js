import React from 'react';
import profileStyles from '../styles';

const BadgesTab = ({ achievements, badges, calculateXPProgress, storeBalance, userStats }) => {
  const styles = profileStyles;

  return (
    <>
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>🏆 Rozetler & XP</h3>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>
              Seviye {userStats.level}
            </span>
            <span style={{ color: '#b9bbbe', fontSize: '14px' }}>
              {userStats.xp} / {userStats.next_level_xp} XP
            </span>
          </div>
          <div style={styles.progressBar}>
            <div style={styles.progressFill(calculateXPProgress())} />
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ color: '#fff', marginBottom: '12px' }}>💰 Coin: {userStats.coins}</h4>
          <h4 style={{ color: '#fff', marginBottom: '12px' }}>🏪 Mağaza Bakiyesi: ${storeBalance.toFixed(2)}</h4>
        </div>

        <h4 style={{ color: '#fff', marginBottom: '16px' }}>🎖️ Kazanılan Rozetler</h4>

        {badges.length === 0 && (
          <p style={{ color: '#b9bbbe' }}>Henüz rozet kazanılmadı. Daha fazla aktivite gösterin!</p>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {badges.map((badge, idx) => (
            <div key={idx} style={styles.badge} title={badge.description}>
              {badge.icon} {badge.name}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>🎯 Başarılar (Achievements)</h3>

        {achievements.length === 0 && (
          <p style={{ color: '#b9bbbe' }}>Henüz başarı kazanılmadı.</p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '16px' }}>
          {achievements.map((achievement, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px',
                background: achievement.completed
                  ? 'linear-gradient(135deg, rgba(67, 181, 129, 0.2) 0%, rgba(67, 181, 129, 0.05) 100%)'
                  : 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                border: achievement.completed
                  ? '1px solid rgba(67, 181, 129, 0.3)'
                  : '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ fontSize: '32px' }}>{achievement.icon || '🏆'}</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>
                    {achievement.name}
                    {achievement.completed && <span style={{ marginLeft: '8px', color: '#43b581' }}>✅</span>}
                  </h4>
                  <p style={{ color: '#b9bbbe', margin: '4px 0 0 0', fontSize: '12px' }}>
                    {achievement.description}
                  </p>
                </div>
              </div>
              {achievement.progress !== undefined && (
                <div>
                  <div style={{ ...styles.progressBar, height: '6px' }}>
                    <div style={styles.progressFill((achievement.progress / achievement.target) * 100)} />
                  </div>
                  <p style={{ color: '#b9bbbe', fontSize: '11px', marginTop: '4px' }}>
                    {achievement.progress} / {achievement.target}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BadgesTab;

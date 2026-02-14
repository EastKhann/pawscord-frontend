import { getRankColor, getLevelForXP, getXPForLevel } from './useLevelingSystem';

const LeaderboardSection = ({ leaderboard, resetUserXP }) => (
  <div className="leaderboard-section">
    <h3>{'\u{1F3C6}'} S{'ı'}ralama</h3>
    {leaderboard.length > 0 ? (
      <div className="leaderboard-list">
        {leaderboard.map((user, idx) => {
          const rank = idx + 1;
          const level = getLevelForXP(user.xp);
          const nextLevelXP = getXPForLevel(level + 1);
          const currentLevelXP = getXPForLevel(level);
          const progress = ((user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

          return (
            <div key={user.user_id} className="leaderboard-item">
              <span className="rank" style={{ color: getRankColor(rank) }}>#{rank}</span>
              <img className="user-avatar" src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}`} alt={user.username} />
              <div className="user-info">
                <span className="username">{user.username}</span>
                <div className="xp-bar-container">
                  <div className="xp-bar" style={{ width: `${Math.min(progress, 100)}%`, background: `linear-gradient(90deg, #5865f2, #7289da)` }} />
                </div>
                <span className="xp-text">Seviye {level} {'•'} {user.xp} XP</span>
              </div>
              <button className="reset-xp-btn" onClick={() => resetUserXP(user.user_id)}>
                {'\u{1F504}'} S{'ı'}f{'ı'}rla
              </button>
            </div>
          );
        })}
      </div>
    ) : (
      <p className="no-data">Hen{'ü'}z veri yok</p>
    )}
  </div>
);

export default LeaderboardSection;
